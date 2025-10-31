using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UnifiedAPI.Data;
using UnifiedAPI.DTOs;
using UnifiedAPI.Models;
using UnifiedAPI.Services;
using System.Security.Cryptography;
using System.Text;

namespace UnifiedAPI.Controllers;

[ApiController]
[Route("api/assignment2/auth")]
public class OtpController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly EmailService _emailService;
    private readonly ILogger<OtpController> _logger;
    private readonly ITokenService _tokenService; // Inject ITokenService

    public OtpController(ApplicationDbContext context, EmailService emailService, ILogger<OtpController> logger, ITokenService tokenService)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
        _tokenService = tokenService; // Initialize ITokenService
    }

    [HttpPost("send-otp")]
    public async Task<IActionResult> SendOtp([FromBody] OtpRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains('@'))
        {
            return BadRequest(new { error = "Valid email is required" });
        }

        var normalizedEmail = request.Email.ToLower().Trim();
        var now = DateTime.UtcNow;

        // Check for existing OTP
        var existingOtp = await _context.OTPs.FirstOrDefaultAsync(o => o.Email == normalizedEmail);

        // Check cooldown period (60 seconds between attempts)
        if (existingOtp != null)
        {
            var timeSinceLastAttempt = (now - existingOtp.CreatedAt).TotalMilliseconds;
            if (timeSinceLastAttempt < 60000)
            {
                var remainingCooldown = Math.Ceiling((60000 - timeSinceLastAttempt) / 1000);
                return StatusCode(429, new { error = $"Please wait {remainingCooldown} seconds before requesting another OTP." });
            }
        }

        // Generate 6-digit OTP
        var otp = Random.Shared.Next(100000, 999999).ToString();
        var expiresAt = now.AddMinutes(10); // 10 minutes

        // Hash OTP
        var hashedOtp = HashOtp(otp);

        // Update or create OTP in database
        if (existingOtp != null)
        {
            existingOtp.HashedOtp = hashedOtp;
            existingOtp.CreatedAt = now;
            existingOtp.ExpiresAt = expiresAt;
            existingOtp.Attempts = 0;
        }
        else
        {
            _context.OTPs.Add(new OTP
            {
                Email = normalizedEmail,
                HashedOtp = hashedOtp,
                CreatedAt = now,
                ExpiresAt = expiresAt,
                Attempts = 0
            });
        }

        await _context.SaveChangesAsync();

        // Send email
        try
        {
            await _emailService.SendOtpEmailAsync(normalizedEmail, otp);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send OTP email to {Email}", normalizedEmail);
            return StatusCode(500, new { error = "Failed to send OTP email. Please try again." });
        }

        return Ok(new { message = "OTP sent successfully" });
    }

    [HttpPost("verify-otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpDto request)
    {
        var normalizedEmail = request.Email?.ToLower().Trim() ?? "";
        var sanitizedOtp = new string(request.Otp?.Where(char.IsDigit).ToArray() ?? Array.Empty<char>());

        if (string.IsNullOrWhiteSpace(normalizedEmail) || sanitizedOtp.Length != 6)
        {
            return BadRequest(new { error = "Email and 6-digit OTP are required" });
        }

        var storedOtp = await _context.OTPs.FirstOrDefaultAsync(o => o.Email == normalizedEmail);

        if (storedOtp == null)
        {
            return BadRequest(new { error = "OTP not found or expired. Please request a new one." });
        }

        // Check if OTP has expired
        if (storedOtp.ExpiresAt < DateTime.UtcNow)
        {
            _context.OTPs.Remove(storedOtp);
            await _context.SaveChangesAsync();
            return BadRequest(new { error = "OTP has expired. Please request a new one." });
        }

        // Check for max attempts (3 attempts)
        if (storedOtp.Attempts >= 3)
        {
            _context.OTPs.Remove(storedOtp);
            await _context.SaveChangesAsync();
            return BadRequest(new { error = "Maximum attempts reached. Please request a new OTP.", remainingAttempts = 0 });
        }

        // Verify OTP
        var isMatch = VerifyOtp(sanitizedOtp, storedOtp.HashedOtp);
        if (!isMatch)
        {
            storedOtp.Attempts++;
            await _context.SaveChangesAsync();

            var remainingAttempts = 3 - storedOtp.Attempts;
            return BadRequest(new
            {
                error = $"Invalid OTP. {remainingAttempts} attempts remaining before account lockout.",
                remainingAttempts = remainingAttempts,
                attemptsUsed = storedOtp.Attempts
            });
        }

        // OTP is valid, find or create user
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == normalizedEmail);
        if (user == null)
        {
            // Auto-register user if not exists
            user = new User
            {
                Email = normalizedEmail
                // Removed Name and Password assignments
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        // Remove used OTP
        _context.OTPs.Remove(storedOtp);
        await _context.SaveChangesAsync();

        // Generate JWT token
        var token = _tokenService.GenerateToken(user);

        return Ok(new
        {
            message = "Login successful",
            userId = user.Id,
            username = user.Username,
            email = user.Email,
            token = token
        });
    }

    private string HashOtp(string otp)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(otp));
        return Convert.ToBase64String(hashedBytes);
    }

    private bool VerifyOtp(string otp, string hashedOtp)
    {
        var computedHash = HashOtp(otp);
        return computedHash == hashedOtp;
    }
}
