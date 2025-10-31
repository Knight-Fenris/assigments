using UnifiedAPI.DTOs;
using UnifiedAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace UnifiedAPI.Controllers;

// Assignment 2 - Authentication
[ApiController]
[Route("api/assignment2/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.Register(dto);
        if (result == null)
        {
            return BadRequest("User already exists");
        }

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.Login(dto);
        if (result == null)
        {
            return Unauthorized("Invalid credentials");
        }

        return Ok(result);
    }
}
