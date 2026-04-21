import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Users, ClipboardList, Settings, TrendingUp } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { 
      icon: TrendingUp, 
      label: "Dashboard", 
      active: location.pathname === '/admin/dashboard', 
      onClick: () => navigate('/admin/dashboard') 
    },
    { 
      icon: ClipboardList, 
      label: "Work Logs", 
      active: location.pathname === '/admin/dashboard/logs', 
      onClick: () => navigate('/admin/dashboard/logs') 
    },
    { 
      icon: Users, 
      label: "Users", 
      active: location.pathname === '/admin/dashboard/users', 
      onClick: () => navigate('/admin/dashboard/users') 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      active: location.pathname === '/admin/dashboard/settings', 
      onClick: () => navigate('/admin/dashboard/settings') 
    }
  ];

  const getActiveTitle = () => {
    if (location.pathname === '/admin/dashboard/users') return 'User Accounts';
    if (location.pathname === '/admin/dashboard/settings') return 'Admin Settings';
    return 'Work Logs Management';
  };

  return (
    <DashboardLayout
      logo={ClipboardList}
      logoText="Fiora Admin"
      navItems={navItems}
      theme="rose"
      user={{ name: "Admin User", email: "admin@fiora.com" }}
      onLogoutPath="/admin"
      activeTitle={getActiveTitle()}
    />
  );
};

export default AdminLayout;
