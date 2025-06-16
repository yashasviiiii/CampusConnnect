import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import DashboardHome from './dashboard/DashboardHome';
import DiscussionForum from './dashboard/DiscussionForum';
import Marketplace from './dashboard/Marketplace';
import Events from './dashboard/Events';
import Messages from './dashboard/Messages';

const Dashboard: React.FC = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, color: 'from-primary-400 to-primary-600' },
    { name: 'Discussions', href: '/dashboard/discussions', icon: MessageCircle, color: 'from-secondary-400 to-secondary-600' },
    { name: 'Marketplace', href: '/dashboard/marketplace', icon: ShoppingBag, color: 'from-accent-400 to-accent-600' },
    { name: 'Events', href: '/dashboard/events', icon: Calendar, color: 'from-warm-400 to-warm-600' },
    { name: 'Messages', href: '/dashboard/messages', icon: Users, color: 'from-coral-400 to-coral-600' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen lg:flex bg-gradient-to-br from-primary-50 via-white to-secondary-50">

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-xl shadow-2xl transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-primary-100`}>
        <div className="flex items-center justify-center h-20 px-6 border-b border-primary-100">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-3">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            CampusConnect
          </span>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-3">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center px-6 py-4 text-sm font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="mr-4 h-6 w-6" />
                {item.name}
              </button>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="space-y-3">
              <button className="w-full flex items-center px-6 py-4 text-sm font-semibold text-gray-600 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 transition-all duration-300">
                <Settings className="mr-4 h-6 w-6" />
                Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-6 py-4 text-sm font-semibold text-gray-600 rounded-2xl hover:bg-gradient-to-r hover:from-coral-50 hover:to-coral-100 hover:text-coral-700 transition-all duration-300"
              >
                <LogOut className="mr-4 h-6 w-6" />
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">

        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-primary-100 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="ml-4 flex-1 max-w-lg">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl leading-5 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Search discussions, events, marketplace..."
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-3 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-2xl transition-all duration-300">
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="flex items-center space-x-4 bg-white/50 backdrop-blur-sm rounded-2xl p-3 border border-primary-100">
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{profile?.name}</div>
                  <div className="text-xs text-gray-500">{profile?.course} • {profile?.year}</div>
                </div>
                <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {profile?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/discussions" element={<DiscussionForum />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/events" element={<Events />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;