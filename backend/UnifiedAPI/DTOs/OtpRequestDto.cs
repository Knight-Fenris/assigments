namespace UnifiedAPI.DTOs;

public class OtpRequestDto
{
    public required string Email { get; set; }
}

public class VerifyOtpDto
{
    public required string Email { get; set; }
    public required string Otp { get; set; }
}
