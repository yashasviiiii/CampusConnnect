import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  ShoppingBag, 
  Calendar, 
  Users, 
  BookOpen, 
  Shield, 
  ArrowRight,
  Zap,
  Globe,
  CheckCircle,
  Sparkles,
  Heart,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LandingPage: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    collegeId: '',
    email: '',
    password: '',
    course: '',
    year: '',
    collegeName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(loginData.email, loginData.password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(registerData);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: MessageSquare,
      title: "Smart Discussion Forum",
      description: "Doubt resolution with peer collaboration.",
      color: "from-primary-400 to-primary-600",
      bgColor: "bg-gradient-to-br from-primary-50 to-primary-100"
    },
    {
      icon: ShoppingBag,
      title: "Secure Marketplace",
      description: "Buy and sell with confidence using our verified student network.",
      color: "from-accent-400 to-accent-600",
      bgColor: "bg-gradient-to-br from-accent-50 to-accent-100"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Connect instantly with classmates and build lasting friendships.",
      color: "from-secondary-400 to-secondary-600",
      bgColor: "bg-gradient-to-br from-secondary-50 to-secondary-100"
    },
    {
      icon: Calendar,
      title: "Event Discovery",
      description: "Never miss campus events, workshops, or important announcements.",
      color: "from-warm-400 to-warm-600",
      bgColor: "bg-gradient-to-br from-warm-50 to-warm-100"
    }
  ];

  const stats = [
    { number: "400+", label: "Active Students", color: "text-primary-600" },
    { number: "100+", label: "Daily Discussions", color: "text-secondary-600" },
    { number: "100+", label: "Items Traded", color: "text-accent-600" },
    { number: "100+", label: "Campus Events", color: "text-warm-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-primary-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                CampusConnect
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">Features</a>
              <a href="#about" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">About</a>
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
              >
                Login
              </button>
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 rounded-3xl flex items-center justify-center shadow-2xl animate-bounce-gentle">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-warm-400 to-coral-400 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-display">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Campus
              </span>
              <span className="bg-gradient-to-r from-warm-500 to-coral-500 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-2xl text-gray-600 mb-4 font-medium">
              STAY LINKED
            </p>
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              The most beautiful and intuitive platform that brings your entire campus community together. 
              Connect, collaborate, and create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-10 py-4 rounded-2xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 text-lg font-semibold shadow-xl"
              >
                <span>Join Your Campus</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-display">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From academic discussions to real-time chat, CampusConnect brings your entire college experience together in one beautiful platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 font-display">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 font-display">
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Built for Students,
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent-600 to-warm-600 bg-clip-text text-transparent">
                  By Students
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                CampusConnect was created to solve the real challenges students face every day. We've built a platform 
                that truly understands campus life and makes it more connected, collaborative, and colorful.
              </p>
              
              <div className="space-y-4">
                {[
                  "Secure college ID verification system",
                  "Real-time messaging and collaboration",
                  "Trusted marketplace for campus trading",
                  "Comprehensive event management",
                  "Doubt resolution and a special feature HearInCampus"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 rounded-3xl shadow-lg">
                <Shield className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2 font-display">Secure & Trusted</h3>
                <p className="text-sm text-gray-600">College ID verification ensures a safe community</p>
              </div>
              <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 p-8 rounded-3xl shadow-lg">
                <Zap className="w-10 h-10 text-secondary-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2 font-display">Lightning Fast</h3>
                <p className="text-sm text-gray-600">Real-time updates and instant messaging</p>
              </div>
              <div className="bg-gradient-to-br from-accent-100 to-accent-200 p-8 rounded-3xl shadow-lg">
                <Globe className="w-10 h-10 text-accent-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2 font-display">Campus-Wide</h3>
                <p className="text-sm text-gray-600">Connect with your entire college community</p>
              </div>
              <div className="bg-gradient-to-br from-warm-100 to-warm-200 p-8 rounded-3xl shadow-lg">
                <BookOpen className="w-10 h-10 text-warm-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2 font-display">Academic Focus</h3>
                <p className="text-sm text-gray-600">Built specifically for student needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-white mb-6 font-display">Ready to Connect Your Campus?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join CampusConnect today and become part of a thriving, colorful digital campus community.
          </p>
          <button 
            onClick={() => setIsRegisterOpen(true)}
            className="bg-white text-primary-600 px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 text-lg font-bold shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CampusConnect</span>
              </div>
              <p className="text-gray-400">Connecting campus communities, one student at a time.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discussion Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Real-time Chat</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li>
              <a href="/Privacy_policy" className="hover:text-white transition-colors">
               Privacy Policy
              </a>
              </li>
              <li>
              <a href="/terms-of-service" className="hover:text-white transition-colors">
               Terms of Service
              </a>
              </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CampusConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent font-display">Welcome Back</h2>
            </div>
            {error && (
              <div className="bg-coral-50 border border-coral-200 text-coral-700 px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College Email</label>
                <input 
                  type="email" 
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your college email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 font-semibold disabled:opacity-50 shadow-lg"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsRegisterOpen(true);
                  setError('');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Don't have an account? Register here
              </button>
            </div>
            <button 
              onClick={() => {
                setIsLoginOpen(false);
                setError('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-warm-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-warm-600 bg-clip-text text-transparent font-display">Join CampusConnect</h2>
            </div>
            {error && (
              <div className="bg-coral-50 border border-coral-200 text-coral-700 px-4 py-3 rounded-xl mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College Name</label>
                <input 
                  type="text" 
                  value={registerData.collegeName}
                  onChange={(e) => setRegisterData({...registerData, collegeName: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your college name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College ID</label>
                <input 
                  type="text" 
                  value={registerData.collegeId}
                  onChange={(e) => setRegisterData({...registerData, collegeId: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your college ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">College Email</label>
                <input 
                  type="email" 
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your college email"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                  <select 
                    value={registerData.course}
                    onChange={(e) => setRegisterData({...registerData, course: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Select course</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Mathematics and Computation">Mathematics and Computation</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                  <select 
                    value={registerData.year}
                    onChange={(e) => setRegisterData({...registerData, year: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                  placeholder="Create a password"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent-500 to-warm-500 text-white py-3 rounded-xl hover:from-accent-600 hover:to-warm-600 transition-all duration-300 font-semibold disabled:opacity-50 shadow-lg"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            <div className="mt-6 text-center">
              <button 
                onClick={() => {
                  setIsRegisterOpen(false);
                  setIsLoginOpen(true);
                  setError('');
                }}
                className="text-accent-600 hover:text-accent-700 font-medium"
              >
                Already have an account? Sign in
              </button>
            </div>
            <button 
              onClick={() => {
                setIsRegisterOpen(false);
                setError('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;