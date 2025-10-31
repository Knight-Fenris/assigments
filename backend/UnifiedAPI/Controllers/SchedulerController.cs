using UnifiedAPI.Models;
using UnifiedAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace UnifiedAPI.Controllers;

// Assignment 3 - Smart Scheduler
[ApiController]
[Route("api/assignment3")]
public class SchedulerController : ControllerBase
{
    private readonly ISchedulerService _schedulerService;

    public SchedulerController(ISchedulerService schedulerService)
    {
        _schedulerService = schedulerService;
    }

    [HttpPost("schedule")]
    public ActionResult<ScheduleResponse> ScheduleTasks([FromBody] TaskScheduleRequest request)
    {
        if (request.Tasks == null || request.Tasks.Count == 0)
        {
            return BadRequest(new { error = "At least one task is required" });
        }

        try
        {
            var result = _schedulerService.ScheduleTasks(request);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"An error occurred: {ex.Message}" });
        }
    }
}
