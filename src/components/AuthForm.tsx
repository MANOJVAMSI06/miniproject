import React, { useState } from 'react';
import { User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (userData: { name?: string; email: string; password: string }) => void;
  onToggleMode: () => void;
  theme: 'light' | 'dark';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit, onToggleMode, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const isLogin = mode === 'login';
  const bgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputClass = theme === 'dark' 
    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`w-full max-w-md ${bgClass} rounded-2xl shadow-2xl p-8 transform transition-all duration-500`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full mb-4">
            {isLogin ? <LogIn className="text-white" size={24} /> : <UserPlus className="text-white" size={24} />}
          </div>
          <h2 className={`text-3xl font-bold ${textClass} mb-2`}>
            {isLogin ? 'Welcome Back!' : 'Join ExpenseTracker'}
          </h2>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {isLogin ? 'Track your expenses like a pro' : 'Start managing your money today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
              required
            />
          </div>

          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3 border ${inputClass} rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-teal-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={onToggleMode}
              className="ml-2 text-purple-500 hover:text-purple-600 font-semibold transition-colors duration-300"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;