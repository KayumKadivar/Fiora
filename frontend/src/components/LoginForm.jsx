import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

const LoginForm = ({ title, subtitle, role, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-2xl relative overflow-hidden transition-all duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300/40 dark:bg-purple-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/40 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight transition-colors">{title}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm transition-colors">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 z-10 relative">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block text-left transition-colors">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-11 pr-4 py-3.5 border border-zinc-200 dark:border-white/10 rounded-2xl bg-white dark:bg-black/20 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm"
              placeholder={role === 'admin' ? "admin@fiora.com" : "user@example.com"}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block text-left transition-colors">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-11 pr-4 py-3.5 border border-zinc-200 dark:border-white/10 rounded-2xl bg-white dark:bg-black/20 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] ${
            role === 'admin' 
              ? 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 focus:ring-rose-500 shadow-rose-500/25' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:ring-purple-500 shadow-purple-500/25'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900`}
        >
          <LogIn className="w-5 h-5 mr-2" />
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
