import React from 'react';
import LoginForm from '../components/LoginForm';
import ThemeToggle from '../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    const loginToast = toast.loading('Signing in...');
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      toast.success('Welcome back!', { id: loginToast });
      
      // Store user info (simple version)
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (data.user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.message, { id: loginToast });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      <ThemeToggle />
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-slate-50 dark:from-indigo-900/40 dark:via-zinc-950 dark:to-zinc-950 transition-colors duration-500"></div>
      
      <div className="z-10 w-full flex justify-center">
        <LoginForm 
          title="Welcome Back" 
          subtitle="Sign in to your user account to continue."
          role="user"
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
};

export default UserLogin;
