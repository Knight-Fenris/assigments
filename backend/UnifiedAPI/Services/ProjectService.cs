using UnifiedAPI.Data;
using UnifiedAPI.DTOs;
using UnifiedAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace UnifiedAPI.Services;

public class ProjectService : IProjectService
{
    private readonly ApplicationDbContext _context;

    public ProjectService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProjectDto>> GetUserProjects(int userId)
    {
        return await _context.Projects
            .Where(p => p.UserId == userId)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                CreatedAt = p.CreatedAt,
                TaskCount = p.Tasks.Count
            })
            .ToListAsync();
    }

    public async Task<ProjectDetailDto?> GetProjectById(int projectId, int userId)
    {
        var project = await _context.Projects
            .Include(p => p.Tasks)
            .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);

        if (project == null)
            return null;

        return new ProjectDetailDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            CreatedAt = project.CreatedAt,
            Tasks = project.Tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                DueDate = t.DueDate,
                IsCompleted = t.IsCompleted,
                ProjectId = t.ProjectId,
                EstimatedHours = t.EstimatedHours,
                Dependencies = string.IsNullOrEmpty(t.Dependencies) 
                    ? new List<string>() 
                    : t.Dependencies.Split(',').ToList()
            }).ToList()
        };
    }

    public async Task<ProjectDto> CreateProject(CreateProjectDto dto, int userId)
    {
        var project = new Project
        {
            Title = dto.Title,
            Description = dto.Description,
            UserId = userId
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            CreatedAt = project.CreatedAt,
            TaskCount = 0
        };
    }

    public async Task<bool> DeleteProject(int projectId, int userId)
    {
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);

        if (project == null)
            return false;

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return true;
    }
}
