using UnifiedAPI.Models;

namespace UnifiedAPI.Services;

public interface ISchedulerService
{
    ScheduleResponse ScheduleTasks(TaskScheduleRequest request);
}
