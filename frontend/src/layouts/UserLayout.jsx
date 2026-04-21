import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipboardCheck, Search, Settings, TrendingUp, History } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { 
      icon: TrendingUp, 
      label: "Dashboard", 
      active: location.pathname === '/dashboard', 
      onClick: () => navigate('/dashboard') 
    },
    { 
      icon: ClipboardCheck, 
      label: "Daily Task", 
      active: location.pathname === '/dashboard/task', 
      onClick: () => navigate('/dashboard/task') 
    },
    { 
      icon: Search, 
      label: "Search Data", 
      active: location.pathname === '/dashboard/search', 
      onClick: () => navigate('/dashboard/search') 
    },
    { 
      icon: History, 
      label: "My Work Logs", 
      active: location.pathname === '/dashboard/logs', 
      onClick: () => navigate('/dashboard/logs') 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      active: location.pathname === '/dashboard/settings', 
      onClick: () => navigate('/dashboard/settings') 
    }
  ];

  const getActiveTitle = () => {
    if (location.pathname === '/dashboard/search') return 'Search Data';
    if (location.pathname === '/dashboard/logs') return 'My Task History';
    if (location.pathname === '/dashboard/settings') return 'Settings';
    return 'Daily Work Submission';
  };

  const user = JSON.parse(localStorage.getItem('user') || '{"name": "User", "email": "user@fiora.com"}');

  return (
    <DashboardLayout
      logo={ClipboardCheck}
      logoText="Fiora"
      navItems={navItems}
      theme="blue"
      user={user}
      onLogoutPath="/"
      activeTitle={getActiveTitle()}
    />
  );
};

export default UserLayout;
