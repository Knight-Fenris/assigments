using UnifiedAPI.Models;
using System.Collections.Concurrent;

namespace UnifiedAPI.Services;

// Assignment 1 - In-Memory Task Storage
public class TaskStorageService
{
    private readonly ConcurrentDictionary<Guid, TaskItem> _tasks = new();

    public IEnumerable<TaskItem> GetAll()
    {
        return _tasks.Values;
    }

    public TaskItem? GetById(Guid id)
    {
        _tasks.TryGetValue(id, out var task);
        return task;
    }

    public TaskItem Create(TaskItem task)
    {
        task.Id = Guid.NewGuid();
        _tasks[task.Id] = task;
        return task;
    }

    public TaskItem? Update(Guid id, TaskItem task)
    {
        if (!_tasks.ContainsKey(id))
            return null;

        task.Id = id;
        _tasks[id] = task;
        return task;
    }

    public bool Delete(Guid id)
    {
        return _tasks.TryRemove(id, out _);
    }
}
