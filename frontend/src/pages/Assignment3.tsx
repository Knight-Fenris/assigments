import { useState } from 'react';
import axios from 'axios';
import { Calendar, Plus, Trash2, Sparkles, AlertCircle } from 'lucide-react';

interface Task {
  title: string;
  estimatedHours: number;
  dueDate: string;
  dependencies: string[];
}

const API_URL = 'https://my-dotnet-api-demo.azurewebsites.net/api/assignment3';

function Assignment3() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [dependencies, setDependencies] = useState('');
  const [scheduledOrder, setScheduledOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addTask = () => {
    if (!taskTitle.trim()) {
      setError('Task title is required');
      return;
    }

    const newTask: Task = {
      title: taskTitle.trim(),
      estimatedHours,
      dueDate,
      dependencies: dependencies.split(',').map(d => d.trim()).filter(d => d),
    };

    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setEstimatedHours(0);
    setDueDate('');
    setDependencies('');
    setError('');
    setScheduledOrder([]); // Clear scheduled order when adding new task
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const scheduleTasksAutomatically = async () => {
    if (tasks.length === 0) {
      setError('Please add at least one task');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await axios.post(`${API_URL}/schedule`, {
        tasks: tasks,
      });
      setScheduledOrder(response.data.recommendedOrder);
      setError(''); // Clear any previous errors
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data || 'Failed to schedule tasks. Check for circular dependencies.';
      setError(errorMessage);
      console.error('Schedule error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setTasks([
      {
        title: 'Design API',
        estimatedHours: 5,
        dueDate: '2025-10-25',
        dependencies: [],
      },
      {
        title: 'Implement Backend',
        estimatedHours: 12,
        dueDate: '2025-10-28',
        dependencies: ['Design API'],
      },
      {
        title: 'Build Frontend',
        estimatedHours: 10,
        dueDate: '2025-10-30',
        dependencies: ['Design API'],
      },
      {
        title: 'End-to-End Test',
        estimatedHours: 8,
        dueDate: '2025-10-31',
        dependencies: ['Implement Backend', 'Build Frontend'],
      },
    ]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#140655] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>
            Time Bender 🧙‍♂️
          </h1>
          <p className="text-slate-300 text-lg">
            Master the art of task scheduling with AI-powered topological sorting
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="text-red-500 mt-0.5" size={20} />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Add Task Section */}
        <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <Plus size={20} />
            <span>Add Task</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task name..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Estimated Hours
              </label>
              <input
                type="number"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(parseInt(e.target.value) || 0)}
                min="0"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Dependencies (comma-separated)
              </label>
              <input
                type="text"
                value={dependencies}
                onChange={(e) => setDependencies(e.target.value)}
                placeholder="e.g., Design API, Build Frontend"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={addTask}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus size={18} />
              <span>Add Task</span>
            </button>
            <button
              onClick={loadExample}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Load Example
            </button>
          </div>
        </div>

        {/* Tasks List */}
        {tasks.length > 0 && (
          <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center justify-between">
              <span>Tasks ({tasks.length})</span>
              <button
                onClick={scheduleTasksAutomatically}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
              >
                <Sparkles size={18} />
                <span>{loading ? 'Scheduling...' : 'Schedule Tasks'}</span>
              </button>
            </h2>

            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-2">{task.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        {task.estimatedHours > 0 && (
                          <span className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{task.estimatedHours}h</span>
                          </span>
                        )}
                        {task.dueDate && (
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        )}
                        {task.dependencies.length > 0 && (
                          <span>Dependencies: {task.dependencies.join(', ')}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(index)}
                      className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scheduled Order */}
        {scheduledOrder.length > 0 && (
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Sparkles className="text-purple-400" size={20} />
              <span>Recommended Task Order</span>
            </h2>
            <p className="text-gray-400 mb-4">
              Based on dependencies, here's the optimal execution order:
            </p>
            <ol className="space-y-2">
              {scheduledOrder.map((taskName, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 text-lg"
                >
                  <span className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full text-white font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-white font-medium">{taskName}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Info Section */}
        {tasks.length === 0 && (
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-8 text-center">
            <Sparkles className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
            <p className="text-gray-400 mb-4">
              Add tasks with dependencies to see the smart scheduler in action
            </p>
            <button
              onClick={loadExample}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Load Example Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignment3;
