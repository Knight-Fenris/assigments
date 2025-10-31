import { Link } from 'react-router-dom';
import { Home, Sparkles, Rocket } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-white hover:text-gray-300 transition-colors">
            <span style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>The Cosmic Realm</span>
          </Link>
          <ul className="flex items-center space-x-1">
            <li>
              <Link 
                to="/" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/assignment1" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                <Sparkles size={18} />
                <span>Task Wizard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/assignment2" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
              >
                <Rocket size={18} />
                <span>Project Galaxy</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
