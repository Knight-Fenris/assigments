import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MagicLamp from './components/MagicLamp';
import ClickSpark from './components/ClickSpark';
import Home from './pages/Home';
import Assignment1 from './pages/Assignment1';
import Assignment2 from './pages/Assignment2';
import Assignment3 from './pages/Assignment3';
import Login from './pages/Assignment2/Login';
import Register from './pages/Assignment2/Register';
import Dashboard from './pages/Assignment2/Dashboard';
import ProjectDetail from './pages/Assignment2/ProjectDetail';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App dark min-h-screen bg-background text-foreground relative">
          <ClickSpark>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assignment1" element={<Assignment1 />} />
              <Route path="/assignment2" element={<Assignment2 />} />
              <Route path="/assignment2/login" element={<Login />} />
              <Route path="/assignment2/register" element={<Register />} />
              <Route path="/assignment2/dashboard" element={<Dashboard />} />
              <Route path="/assignment2/project/:id" element={<ProjectDetail />} />
              <Route path="/assignment3" element={<Assignment3 />} />
            </Routes>
          </ClickSpark>
          <MagicLamp />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
