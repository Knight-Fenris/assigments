using UnifiedAPI.DTOs;
using UnifiedAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace UnifiedAPI.Controllers;

// Assignment 2 - Tasks
[Authorize]
[ApiController]
[Route("api/assignment2")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim ?? "0");
    }

    [HttpPost("projects/{projectId}/tasks")]
    public async Task<ActionResult<TaskDto>> CreateTask(int projectId, [FromBody] CreateTaskDto dto)
    {
        var userId = GetUserId();
        var task = await _taskService.CreateTask(projectId, dto, userId);
        
        if (task == null)
            return NotFound("Project not found");

        return CreatedAtAction(nameof(CreateTask), new { projectId, id = task.Id }, task);
    }

    [HttpPut("tasks/{taskId}")]
    public async Task<ActionResult<TaskDto>> UpdateTask(int taskId, [FromBody] UpdateTaskDto dto)
    {
        var userId = GetUserId();
        var task = await _taskService.UpdateTask(taskId, dto, userId);
        
        if (task == null)
            return NotFound();

        return Ok(task);
    }

    [HttpDelete("tasks/{taskId}")]
    public async Task<IActionResult> DeleteTask(int taskId)
    {
        var userId = GetUserId();
        var result = await _taskService.DeleteTask(taskId, userId);
        
        if (!result)
            return NotFound();

        return NoContent();
    }
}
