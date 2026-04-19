import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipboardCheck, Search, Settings } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { 
      icon: ClipboardCheck, 
      label: "Daily Task", 
      active: location.pathname === '/dashboard', 
      onClick: () => navigate('/dashboard') 
    },
    { 
      icon: Search, 
      label: "Search Data", 
      active: location.pathname === '/dashboard/search', 
      onClick: () => navigate('/dashboard/search') 
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
    if (location.pathname === '/dashboard/settings') return 'Settings';
    return 'Daily Work Submission';
  };

  return (
    <DashboardLayout
      logo={ClipboardCheck}
      logoText="Fiora"
      navItems={navItems}
      theme="blue"
      user={{ name: "User Agent", email: "user@fiora.com" }}
      onLogoutPath="/"
      activeTitle={getActiveTitle()}
    />
  );
};

export default UserLayout;
