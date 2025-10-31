using UnifiedAPI.Models;

namespace UnifiedAPI.Services;

public interface ITokenService
{
    string GenerateToken(User user);
}
