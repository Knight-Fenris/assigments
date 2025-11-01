import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Plus, Calendar, Clock, Sparkles, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  dueDate?: string;
  isCompleted: boolean;
  estimatedHours: number;
  dependencies: string[];
}

interface ProjectDetail {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  tasks: Task[];
}

const API_URL = 'https://my-dotnet-api-demo.azurewebsites.net/api/assignment2';

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [dependencies, setDependencies] = useState('');
  const [scheduledOrder, setScheduledOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/assignment2/login');
      return;
    }
    fetchProject();
  }, [id, isAuthenticated, navigate]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/projects/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProject(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const deps = dependencies.split(',').map((d) => d.trim()).filter((d) => d);
      await axios.post(
        `${API_URL}/projects/${id}/tasks`,
        {
          title: taskTitle.trim(),
          dueDate: dueDate || null,
          estimatedHours,
          dependencies: deps,
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setTaskTitle('');
      setDueDate('');
      setEstimatedHours(0);
      setDependencies('');
      setShowModal(false);
      setSuccess('Task created successfully! ✨');
      setTimeout(() => setSuccess(''), 3000);
      fetchProject();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create task');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleTask = async (task: Task) => {
    try {
      await axios.put(
        `${API_URL}/tasks/${task.id}`,
        { ...task, isCompleted: !task.isCompleted },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      fetchProject();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update task');
      console.error(err);
    }
  };

  const deleteTask = async (taskId: number) => {
    if (!window.confirm('🗑️ Are you sure you want to delete this task?')) return;

    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setSuccess('Task deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
      fetchProject();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete task');
      console.error(err);
    }
  };

  const scheduleTasksAutomatically = async () => {
    if (!project || project.tasks.length === 0) {
      setError('No tasks to schedule');
      return;
    }

    try {
      setScheduling(true);
      setError('');
      const response = await axios.post(
        `${API_URL}/projects/${id}/schedule`,
        {},
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setScheduledOrder(response.data.recommendedOrder);
      setSuccess('Tasks scheduled successfully! ✨');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to schedule tasks. Check for circular dependencies.');
      console.error(err);
    } finally {
      setScheduling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#140655' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-400/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#140655' }}>
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
          <p className="text-white text-xl">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#140655' }}>
      {/* Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/assignment2/dashboard"
            className="inline-flex items-center space-x-2 text-slate-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>
            {project.title}
          </h1>
          <p className="text-slate-300 text-lg">{project.description || 'No description'}</p>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="text-red-500 mt-0.5" size={20} />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <Sparkles className="text-green-500 mt-0.5" size={20} />
            <p className="text-green-400">{success}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Plus size={20} />
            <span>Add Task</span>
          </button>
          <button
            onClick={scheduleTasksAutomatically}
            disabled={scheduling || project.tasks.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold transition-all duration-200 flex items-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={20} />
            <span>{scheduling ? 'Scheduling...' : '🤖 Smart Schedule'}</span>
          </button>
        </div>

        {/* Scheduled Order */}
        {scheduledOrder.length > 0 && (
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-6">
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

        {/* Tasks List */}
        {project.tasks.length === 0 ? (
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-12 text-center">
            <CheckCircle2 className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-white mb-2">No tasks yet</h3>
            <p className="text-gray-400 mb-6">
              Add your first task to get started!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Create First Task</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-gray-900/50 backdrop-blur-md border rounded-xl p-5 transition-all duration-200 ${
                  task.isCompleted
                    ? 'border-green-500/30 bg-green-900/10'
                    : 'border-gray-800 hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => toggleTask(task)}
                    className="w-5 h-5 mt-1 accent-purple-600 cursor-pointer"
                  />
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-2 ${task.isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      {task.estimatedHours > 0 && (
                        <span className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{task.estimatedHours}h</span>
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        </span>
                      )}
                      {task.dependencies.length > 0 && (
                        <span>Dependencies: {task.dependencies.join(', ')}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-red-400 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(20, 6, 85, 0.95)' }}>
          <div className="w-full max-w-md relative z-10">
            <div className="rounded-3xl shadow-2xl p-8 border-2 border-slate-400/25 backdrop-blur-md" style={{ backgroundColor: '#0f0444' }}>
              {/* Ornamental corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-slate-300 rounded-br-xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-slate-300 rounded-bl-xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-slate-300 rounded-tr-xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-slate-300 rounded-tl-xl"></div>

              <h2 className="text-3xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>
                ✨ Add New Task
              </h2>

              <form onSubmit={createTask} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Task Title *
                  </label>
                  <div style={{
                    background: 'linear-gradient(90deg, #2a0a56, #4321a9, #642aa5, #b53da1)',
                    borderRadius: '0.75rem',
                    padding: '2px',
                  }}>
                    <input
                      type="text"
                      value={taskTitle}
                      onChange={(e) => {
                        setTaskTitle(e.target.value);
                        setError('');
                      }}
                      placeholder="Task name..."
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 rounded-[calc(0.75rem-2px)] focus:outline-none transition-all font-medium text-slate-100 placeholder-slate-500 disabled:opacity-50 bg-blue-900/40 border-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Estimated Hours
                    </label>
                    <div style={{
                      background: 'linear-gradient(90deg, #2a0a56, #4321a9, #642aa5, #b53da1)',
                      borderRadius: '0.75rem',
                      padding: '2px',
                    }}>
                      <input
                        type="number"
                        value={estimatedHours}
                        onChange={(e) => setEstimatedHours(parseInt(e.target.value) || 0)}
                        min="0"
                        disabled={submitting}
                        className="w-full px-4 py-3 rounded-[calc(0.75rem-2px)] focus:outline-none transition-all font-medium text-slate-100 disabled:opacity-50 bg-blue-900/40 border-0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Due Date
                    </label>
                    <div style={{
                      background: 'linear-gradient(90deg, #2a0a56, #4321a9, #642aa5, #b53da1)',
                      borderRadius: '0.75rem',
                      padding: '2px',
                    }}>
                      <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        disabled={submitting}
                        className="w-full px-4 py-3 rounded-[calc(0.75rem-2px)] focus:outline-none transition-all font-medium text-slate-100 disabled:opacity-50 bg-blue-900/40 border-0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Dependencies (comma-separated)
                  </label>
                  <div style={{
                    background: 'linear-gradient(90deg, #2a0a56, #4321a9, #642aa5, #b53da1)',
                    borderRadius: '0.75rem',
                    padding: '2px',
                  }}>
                    <input
                      type="text"
                      value={dependencies}
                      onChange={(e) => setDependencies(e.target.value)}
                      placeholder="e.g., Design API, Build Frontend"
                      disabled={submitting}
                      className="w-full px-4 py-3 rounded-[calc(0.75rem-2px)] focus:outline-none transition-all font-medium text-slate-100 placeholder-slate-500 disabled:opacity-50 bg-blue-900/40 border-0"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setTaskTitle('');
                      setDueDate('');
                      setEstimatedHours(0);
                      setDependencies('');
                      setError('');
                    }}
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !taskTitle.trim()}
                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{
                      background: submitting ? '#4a5568' : 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)',
                    }}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating...
                      </span>
                    ) : (
                      '✨ Add Task'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
