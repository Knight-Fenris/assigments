import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Assignment2() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If authenticated, go to dashboard; otherwise go to login
    if (isAuthenticated) {
      navigate('/assignment2/dashboard');
    } else {
      navigate('/assignment2/login');
    }
  }, [isAuthenticated, navigate]);

  // Show a loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#140655' }}>
      <div className="text-center">
        <div className="w-20 h-20 border-4 border-slate-400/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Protest Guerrilla', sans-serif" }}>
          Navigating to Galaxy...
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          Preparing your cosmic journey
        </p>
      </div>
    </div>
  );
}

export default Assignment2;
