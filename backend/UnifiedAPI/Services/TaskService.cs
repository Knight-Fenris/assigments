using UnifiedAPI.Data;
using UnifiedAPI.DTOs;
using UnifiedAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace UnifiedAPI.Services;

public class TaskService : ITaskService
{
    private readonly ApplicationDbContext _context;

    public TaskService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TaskDto?> CreateTask(int projectId, CreateTaskDto dto, int userId)
    {
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);

        if (project == null)
            return null;

        var task = new ProjectTask
        {
            Title = dto.Title,
            DueDate = dto.DueDate,
            ProjectId = projectId,
            EstimatedHours = dto.EstimatedHours,
            Dependencies = string.Join(",", dto.Dependencies)
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            IsCompleted = task.IsCompleted,
            ProjectId = task.ProjectId,
            EstimatedHours = task.EstimatedHours,
            Dependencies = dto.Dependencies
        };
    }

    public async Task<TaskDto?> UpdateTask(int taskId, UpdateTaskDto dto, int userId)
    {
        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);

        if (task == null)
            return null;

        task.Title = dto.Title;
        task.DueDate = dto.DueDate;
        task.IsCompleted = dto.IsCompleted;
        task.EstimatedHours = dto.EstimatedHours;
        task.Dependencies = string.Join(",", dto.Dependencies);

        await _context.SaveChangesAsync();

        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            DueDate = task.DueDate,
            IsCompleted = task.IsCompleted,
            ProjectId = task.ProjectId,
            EstimatedHours = task.EstimatedHours,
            Dependencies = dto.Dependencies
        };
    }

    public async Task<bool> DeleteTask(int taskId, int userId)
    {
        var task = await _context.Tasks
            .Include(t => t.Project)
            .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);

        if (task == null)
            return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<string>?> ScheduleTasks(int projectId, int userId)
    {
        var project = await _context.Projects
            .Include(p => p.Tasks)
            .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);

        if (project == null)
            return null;

        // Topological sort for task scheduling
        var tasks = project.Tasks.ToList();
        var graph = new Dictionary<string, List<string>>();
        var inDegree = new Dictionary<string, int>();

        // Build graph
        foreach (var task in tasks)
        {
            if (!graph.ContainsKey(task.Title))
            {
                graph[task.Title] = new List<string>();
                inDegree[task.Title] = 0;
            }

            var dependencies = string.IsNullOrEmpty(task.Dependencies)
                ? new List<string>()
                : task.Dependencies.Split(',').ToList();

            foreach (var dep in dependencies)
            {
                if (!graph.ContainsKey(dep))
                {
                    graph[dep] = new List<string>();
                    inDegree[dep] = 0;
                }
                graph[dep].Add(task.Title);
                inDegree[task.Title]++;
            }
        }

        // Topological sort using Kahn's algorithm
        var queue = new Queue<string>();
        foreach (var kvp in inDegree)
        {
            if (kvp.Value == 0)
                queue.Enqueue(kvp.Key);
        }

        var result = new List<string>();
        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            result.Add(current);

            foreach (var neighbor in graph[current])
            {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0)
                    queue.Enqueue(neighbor);
            }
        }

        return result;
    }
}
