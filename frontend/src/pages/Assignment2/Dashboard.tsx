import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Plus, Folder, Calendar, LogOut, AlertCircle, Sparkles } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  taskCount: number;
}

const API_URL = 'https://my-dotnet-api-demo.azurewebsites.net/api/assignment2/projects';

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/assignment2/login');
      return;
    }
    fetchProjects();
  }, [isAuthenticated, navigate]);

  const fetchProjects = async () => {
    console.log('fetchProjects called');
    console.log('User:', user);
    console.log('Token:', user?.token);
    
    if (!user || !user.token) {
      console.error('No user or token available');
      setError('Not authenticated. Please log in again.');
      navigate('/assignment2/login');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Fetching projects from:', API_URL);
      console.log('Authorization header:', `Bearer ${user.token.substring(0, 20)}...`);
      
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      
      console.log('Projects fetched:', response.data);
      setProjects(response.data);
      setError('');
    } catch (err: any) {
      console.error('Fetch projects error:', err);
      console.error('Error response:', err.response);
      
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
        logout();
        navigate('/assignment2/login');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch projects');
      }
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Project title is required');
      return;
    }
    
    if (title.trim().length < 3) {
      setError('Project title must be at least 3 characters');
      return;
    }
    
    try {
      setSubmitting(true);
      setError('');
      
      console.log('Creating project with:', { title: title.trim(), description: description.trim() });
      console.log('Using token:', user?.token ? 'Token exists' : 'No token');
      
      const response = await axios.post(
        API_URL,
        { title: title.trim(), description: description.trim() },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      
      console.log('Project created:', response.data);
      
      setTitle('');
      setDescription('');
      setShowModal(false);
      setSuccess('Project created successfully! ✨');
      setTimeout(() => setSuccess(''), 3000);
      fetchProjects();
    } catch (err: any) {
      console.error('Create project error:', err);
      console.error('Error response:', err.response);
      
      const errorMessage = err.response?.data?.error 
        || err.response?.data?.errors 
        || err.response?.data 
        || err.message 
        || 'Failed to create project';
      
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (id: number) => {
    if (!window.confirm('🗑️ Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setSuccess('Project deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
      fetchProjects();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete project');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/assignment2');
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#140655' }}>
      {/* Starlight background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>
                Project Galaxy 🌌
              </h1>
              <p className="text-slate-300 text-lg">
                Welcome back, <span className="text-purple-400 font-semibold">{user?.email}</span>! ✨
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <Plus size={20} />
                <span>New Project</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
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

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-slate-400/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-300">Loading projects...</p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-12 text-center">
            <Folder className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-2xl font-semibold text-white mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6">
              Create your first project to organize your tasks!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Create First Project</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Folder className="text-purple-400 group-hover:text-purple-300 transition-colors" size={32} />
                  <span className="text-xs text-gray-500">
                    {project.taskCount} {project.taskCount === 1 ? 'task' : 'tasks'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {project.description || 'No description'}
                </p>
                
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <Calendar size={14} className="mr-1" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/assignment2/project/${project.id}`}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-center text-sm"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/50 rounded-lg font-medium transition-all duration-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
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
                ✨ Create New Project
              </h2>

              <form onSubmit={createProject} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Project Title *
                  </label>
                  <div className="relative" style={{
                    background: 'linear-gradient(90deg, #2a0a56, #4321a9, #642aa5, #b53da1)',
                    borderRadius: '0.75rem',
                    padding: '2px',
                  }}>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setError('');
                      }}
                      placeholder="My awesome project"
                      required
                      minLength={3}
                      maxLength={100}
                      disabled={submitting}
                      className="w-full px-4 py-3 rounded-[calc(0.75rem-2px)] focus:outline-none transition-all font-medium text-slate-100 placeholder-slate-500 disabled:opacity-50 bg-blue-900/40 border-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Description (Optional)
                  </label>
                  <div className="relative" style={{
                    background: 'linear-gradient(90deg, #2a0a56, #4321a9, #642aa5, #b53da1)',
                    borderRadius: '0.75rem',
                    padding: '2px',
                  }}>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What's this project about?"
                      maxLength={500}
                      rows={4}
                      disabled={submitting}
                      className="w-full px-4 py-3 rounded-[calc(0.75rem-2px)] focus:outline-none transition-all font-medium text-slate-100 placeholder-slate-500 disabled:opacity-50 bg-blue-900/40 border-0 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setTitle('');
                      setDescription('');
                      setError('');
                    }}
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !title.trim()}
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
                      '✨ Create Project'
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

export default Dashboard;
