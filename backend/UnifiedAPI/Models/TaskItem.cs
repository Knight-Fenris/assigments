namespace UnifiedAPI.Models;

// Assignment 1 - Simple Task
public class TaskItem
{
    public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}
