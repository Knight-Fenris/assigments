using System.ComponentModel.DataAnnotations;

namespace UnifiedAPI.Models;

// Assignment 2 - Project Task
public class ProjectTask
{
    public int Id { get; set; }
    
    [Required]
    public string Title { get; set; } = string.Empty;
    
    public DateTime? DueDate { get; set; }
    
    public bool IsCompleted { get; set; }
    
    public int ProjectId { get; set; }
    public Project Project { get; set; } = null!;

    // For Assignment 3 - Smart Scheduler
    public int EstimatedHours { get; set; }
    public string Dependencies { get; set; } = string.Empty; // Comma-separated task titles
}
