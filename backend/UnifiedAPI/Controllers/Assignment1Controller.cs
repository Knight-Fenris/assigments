using UnifiedAPI.Models;
using UnifiedAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace UnifiedAPI.Controllers;

// Assignment 1 - Basic Task Manager
[ApiController]
[Route("api/assignment1/tasks")]
public class Assignment1Controller : ControllerBase
{
    private readonly TaskStorageService _taskService;

    public Assignment1Controller(TaskStorageService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<TaskItem>> GetTasks()
    {
        return Ok(_taskService.GetAll());
    }

    [HttpPost]
    public ActionResult<TaskItem> CreateTask([FromBody] TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Description))
        {
            return BadRequest("Description is required");
        }

        var createdTask = _taskService.Create(task);
        return CreatedAtAction(nameof(GetTasks), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    public ActionResult<TaskItem> UpdateTask(Guid id, [FromBody] TaskItem task)
    {
        if (string.IsNullOrWhiteSpace(task.Description))
        {
            return BadRequest("Description is required");
        }

        var updatedTask = _taskService.Update(id, task);
        if (updatedTask == null)
        {
            return NotFound();
        }

        return Ok(updatedTask);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(Guid id)
    {
        var result = _taskService.Delete(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}
