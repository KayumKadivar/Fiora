import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

import toast from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    console.log('Admin login attempt:', credentials.email);
    const loginToast = toast.loading('Authenticating Admin...');
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

      if (data.user.role !== 'Admin') {
        throw new Error('Access denied. Admin only.');
      }

      toast.success('Access Granted! Welcome Admin.', { id: loginToast });
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message, { id: loginToast });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500">
      <ThemeToggle />
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-slate-50 dark:from-rose-900/30 dark:via-zinc-950 dark:to-zinc-950 transition-colors duration-500"></div>
      
      <div className="z-10 w-full flex justify-center">
        <LoginForm 
          title="Admin Portal" 
          subtitle="Sign in to access the management dashboard."
          role="admin"
          onSubmit={handleLogin}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
