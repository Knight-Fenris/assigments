import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, CheckCircle, Circle, Filter } from 'lucide-react';

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

const API_URL = 'http://localhost:5000/api/assignment1/tasks';

function Assignment1() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks from server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('assignment1-tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('assignment1-tasks', JSON.stringify(tasks));
  };

  const addTask = async () => {
    if (!newTask.trim()) {
      setError('Task description cannot be empty');
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        description: newTask,
        isCompleted: false,
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
      setError('');
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      const updated = { ...task, isCompleted: !task.isCompleted };
      await axios.put(`${API_URL}/${task.id}`, updated);
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#140655] to-[#0a0a0a] text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>
            Task Wizard ✨
          </h1>
          <p className="text-slate-300 text-lg">
            Where your to-dos vanish with a magical click
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Add Task Section */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Enter a new task..."
              className="flex-1 bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              filter === 'all'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
            }`}
          >
            <Filter className="w-4 h-4" />
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              filter === 'active'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
            }`}
          >
            <Circle className="w-4 h-4" />
            Active ({tasks.filter((t) => !t.isCompleted).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
              filter === 'completed'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/50'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Completed ({tasks.filter((t) => t.isCompleted).length})
          </button>
        </div>

        {/* Task List */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-slate-400 mt-4">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <Circle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No tasks found</p>
              <p className="text-slate-500 text-sm mt-2">Add a task to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-purple-500/50 transition-all duration-200 flex items-center gap-4 group"
                >
                  <button
                    onClick={() => toggleTask(task)}
                    className="flex-shrink-0 transition-all duration-200"
                  >
                    {task.isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-400 group-hover:text-purple-400" />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-lg ${
                      task.isCompleted
                        ? 'text-slate-500 line-through'
                        : 'text-white'
                    }`}
                  >
                    {task.description}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 text-center text-slate-400 text-sm">
          <span className="font-semibold text-purple-400">{tasks.length}</span> total tasks · 
          <span className="font-semibold text-blue-400 ml-1">{tasks.filter(t => !t.isCompleted).length}</span> active · 
          <span className="font-semibold text-green-400 ml-1">{tasks.filter(t => t.isCompleted).length}</span> completed
        </div>
      </div>
    </div>
  );
}

export default Assignment1;
