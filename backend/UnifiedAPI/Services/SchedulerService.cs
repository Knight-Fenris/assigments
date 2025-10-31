using UnifiedAPI.Models;

namespace UnifiedAPI.Services;

public class SchedulerService : ISchedulerService
{
    public ScheduleResponse ScheduleTasks(TaskScheduleRequest request)
    {
        if (request.Tasks == null || request.Tasks.Count == 0)
        {
            return new ScheduleResponse();
        }

        // Build dependency graph
        var graph = new Dictionary<string, List<string>>();
        var inDegree = new Dictionary<string, int>();

        // Initialize graph
        foreach (var task in request.Tasks)
        {
            if (!graph.ContainsKey(task.Title))
            {
                graph[task.Title] = new List<string>();
                inDegree[task.Title] = 0;
            }
        }

        // Build edges (dependencies)
        foreach (var task in request.Tasks)
        {
            foreach (var dependency in task.Dependencies)
            {
                if (!graph.ContainsKey(dependency))
                {
                    graph[dependency] = new List<string>();
                    inDegree[dependency] = 0;
                }
                
                // Add edge from dependency to task
                graph[dependency].Add(task.Title);
                inDegree[task.Title]++;
            }
        }

        // Topological sort using Kahn's algorithm
        var queue = new Queue<string>();
        var result = new List<string>();

        // Find all nodes with no dependencies
        foreach (var kvp in inDegree)
        {
            if (kvp.Value == 0)
            {
                queue.Enqueue(kvp.Key);
            }
        }

        // Process queue
        while (queue.Count > 0)
        {
            var current = queue.Dequeue();
            result.Add(current);

            // Reduce in-degree of neighbors
            foreach (var neighbor in graph[current])
            {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0)
                {
                    queue.Enqueue(neighbor);
                }
            }
        }

        // Check for circular dependencies
        if (result.Count != graph.Count)
        {
            throw new InvalidOperationException("Circular dependency detected in tasks");
        }

        return new ScheduleResponse
        {
            RecommendedOrder = result
        };
    }
}
