using UnifiedAPI.DTOs;

namespace UnifiedAPI.Services;

public interface ITaskService
{
    Task<TaskDto?> CreateTask(int projectId, CreateTaskDto dto, int userId);
    Task<TaskDto?> UpdateTask(int taskId, UpdateTaskDto dto, int userId);
    Task<bool> DeleteTask(int taskId, int userId);
    Task<List<string>?> ScheduleTasks(int projectId, int userId);
}
