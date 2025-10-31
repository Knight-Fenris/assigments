namespace UnifiedAPI.Models;

// Assignment 3 - Smart Scheduler Models
public class TaskScheduleRequest
{
    public List<ScheduleTaskItem> Tasks { get; set; } = new();
}

public class ScheduleTaskItem
{
    public string Title { get; set; } = string.Empty;
    public int EstimatedHours { get; set; }
    public string? DueDate { get; set; }
    public List<string> Dependencies { get; set; } = new();
}

public class ScheduleResponse
{
    public List<string> RecommendedOrder { get; set; } = new();
}
