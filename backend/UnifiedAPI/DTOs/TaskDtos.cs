using System.ComponentModel.DataAnnotations;

namespace UnifiedAPI.DTOs;

public class CreateTaskDto
{
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public DateTime? DueDate { get; set; }
    
    public int EstimatedHours { get; set; }
    
    public List<string> Dependencies { get; set; } = new();
}

public class UpdateTaskDto
{
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public DateTime? DueDate { get; set; }
    
    public bool IsCompleted { get; set; }
    
    public int EstimatedHours { get; set; }
    
    public List<string> Dependencies { get; set; } = new();
}

public class TaskDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime? DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public int ProjectId { get; set; }
    public int EstimatedHours { get; set; }
    public List<string> Dependencies { get; set; } = new();
}
