using UnifiedAPI.DTOs;
using UnifiedAPI.Services;
using UnifiedAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace UnifiedAPI.Controllers;

// Assignment 2 - Projects
[Authorize]
[ApiController]
[Route("api/assignment2/projects")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly ISchedulerService _schedulerService;

    public ProjectsController(IProjectService projectService, ISchedulerService schedulerService)
    {
        _projectService = projectService;
        _schedulerService = schedulerService;
    }

    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim ?? "0");
    }

    [HttpGet]
    public async Task<ActionResult<List<ProjectDto>>> GetProjects()
    {
        var userId = GetUserId();
        var projects = await _projectService.GetUserProjects(userId);
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDetailDto>> GetProject(int id)
    {
        var userId = GetUserId();
        var project = await _projectService.GetProjectById(id, userId);
        
        if (project == null)
            return NotFound();

        return Ok(project);
    }

    [HttpPost]
    public async Task<ActionResult<ProjectDto>> CreateProject([FromBody] CreateProjectDto dto)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
            return BadRequest(new { error = string.Join(", ", errors) });
        }

        try
        {
            var userId = GetUserId();
            var project = await _projectService.CreateProject(dto, userId);
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Failed to create project: {ex.Message}" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var userId = GetUserId();
        var result = await _projectService.DeleteProject(id, userId);
        
        if (!result)
            return NotFound();

        return NoContent();
    }

    // Assignment 3 - Smart Scheduler Integration
    [HttpPost("{projectId}/schedule")]
    public async Task<ActionResult<ScheduleResponse>> ScheduleProjectTasks(int projectId)
    {
        var userId = GetUserId();
        
        // Get project with tasks
        var project = await _projectService.GetProjectById(projectId, userId);
        
        if (project == null)
            return NotFound(new { error = "Project not found" });

        if (project.Tasks == null || project.Tasks.Count == 0)
            return BadRequest(new { error = "No tasks found in this project. Please add tasks first." });

        try
        {
            // Convert TaskDto to ScheduleTaskItem
            var scheduleRequest = new TaskScheduleRequest
            {
                Tasks = project.Tasks.Select(t => new ScheduleTaskItem
                {
                    Title = t.Title,
                    EstimatedHours = t.EstimatedHours,
                    DueDate = t.DueDate?.ToString("yyyy-MM-dd"),
                    Dependencies = t.Dependencies ?? new List<string>()
                }).ToList()
            };

            // Schedule tasks using the scheduler service
            var result = _schedulerService.ScheduleTasks(scheduleRequest);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"An error occurred while scheduling tasks: {ex.Message}" });
        }
    }
}
