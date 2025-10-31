using UnifiedAPI.DTOs;

namespace UnifiedAPI.Services;

public interface IAuthService
{
    Task<AuthResponseDto?> Register(RegisterDto dto);
    Task<AuthResponseDto?> Login(LoginDto dto);
}
