using UnifiedAPI.DTOs;

namespace UnifiedAPI.Services;

public interface IProjectService
{
    Task<List<ProjectDto>> GetUserProjects(int userId);
    Task<ProjectDetailDto?> GetProjectById(int projectId, int userId);
    Task<ProjectDto> CreateProject(CreateProjectDto dto, int userId);
    Task<bool> DeleteProject(int projectId, int userId);
}
