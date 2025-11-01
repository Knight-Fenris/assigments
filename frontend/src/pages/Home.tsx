import { Link } from 'react-router-dom';
import { Code, Database, Shield, Zap } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#140655] to-[#0a0a0a] text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent animate-pulse" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>
            The Cosmic Realm
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Three magical adventures through task management, project galaxies, and time manipulation ✨
          </p>
        </div>

        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Task Wizard - Assignment 1 */}
          <Link to="/assignment1" className="group">
            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              {/* Assignment Number Badge */}
              <div className="absolute top-4 right-4 bg-purple-500/20 border border-purple-500/50 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-purple-300 font-bold text-xl">1</span>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl">✨</span>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-white text-center" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>Task Wizard</h2>
              <p className="text-purple-300 text-sm font-semibold mb-3 text-center">Assignment 1: Task Manager</p>
              <p className="text-slate-300 mb-6 text-center">
                Where your to-dos vanish with a magical click! Master the art of task organization.
              </p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Conjure and dismiss tasks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Filter by enchantment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Instant spell search
                </li>
              </ul>
              <div className="flex items-center justify-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform">
                Enter the Realm →
              </div>
            </div>
          </Link>

          {/* Project Galaxy - Assignment 2 */}
          <Link to="/assignment2/login" className="group">
            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
              {/* Assignment Number Badge */}
              <div className="absolute top-4 right-4 bg-pink-500/20 border border-pink-500/50 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-pink-300 font-bold text-xl">2</span>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl">🌌</span>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-white text-center" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>Project Galaxy</h2>
              <p className="text-pink-300 text-sm font-semibold mb-3 text-center">Assignment 2: Project Manager</p>
              <p className="text-slate-300 mb-6 text-center">
                Navigate through cosmic projects with AI-powered smart scheduling! ✨
              </p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  OTP-powered portal access
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Constellations of projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  Task dependencies & scheduling
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                  🤖 AI Smart Scheduler (Time Bender)
                </li>
              </ul>
              <div className="flex items-center justify-center text-pink-400 font-semibold group-hover:translate-x-2 transition-transform">
                Launch into Space →
              </div>
            </div>
          </Link>

          {/* Time Bender - Assignment 3 */}
          <Link to="/assignment3" className="group">
            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              {/* Assignment Number Badge */}
              <div className="absolute top-4 right-4 bg-blue-500/20 border border-blue-500/50 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-blue-300 font-bold text-xl">3</span>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl">🧙‍♂️</span>
              </div>
              <h2 className="text-3xl font-bold mb-2 text-white text-center" style={{ fontFamily: 'Protest Guerrilla, sans-serif' }}>Time Bender Demo</h2>
              <p className="text-blue-300 text-sm font-semibold mb-3 text-center">Assignment 3: Smart Scheduler</p>
              <p className="text-slate-300 mb-6 text-center">
                Standalone demo of the AI scheduler. Try it here or use it in Project Galaxy!
              </p>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Temporal dependency chains
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Automatic chronology sorting
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Circular dependency detection
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  ✨ Integrated in Project Galaxy
                </li>
              </ul>
              <div className="flex items-center justify-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                Try Standalone Demo →
              </div>
            </div>
          </Link>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-10">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Backend */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Database className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Backend</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <Code className="w-5 h-5 text-purple-400" />
                  <span>C# .NET 8 REST API</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Database className="w-5 h-5 text-purple-400" />
                  <span>Entity Framework Core</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span>JWT Authentication</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span>In-Memory Database</span>
                </li>
              </ul>
            </div>

            {/* Frontend */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-8 h-8 text-pink-400" />
                <h3 className="text-2xl font-bold text-white">Frontend</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <Code className="w-5 h-5 text-pink-400" />
                  <span>React 18 + TypeScript</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Zap className="w-5 h-5 text-pink-400" />
                  <span>Vite Build Tool</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Code className="w-5 h-5 text-pink-400" />
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <Database className="w-5 h-5 text-pink-400" />
                  <span>Axios HTTP Client</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
