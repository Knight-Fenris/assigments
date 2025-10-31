namespace UnifiedAPI.Models;

public class OTP
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string HashedOtp { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public int Attempts { get; set; }
}
