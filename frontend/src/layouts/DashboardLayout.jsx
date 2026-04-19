import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const DashboardLayout = ({ logo, logoText, navItems, theme, user, onLogoutPath, activeTitle }) => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    navigate(onLogoutPath);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex text-zinc-900 dark:text-white transition-colors duration-500 font-sans overflow-hidden">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        logo={logo}
        logoText={logoText}
        navItems={navItems}
        onLogout={handleLogout}
        theme={theme}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title={activeTitle}
          user={user}
          onLogout={handleLogout}
          isDark={isDark}
          toggleTheme={toggleTheme}
          theme={theme}
        />

        <main className="flex-1 p-6 lg:p-10 relative overflow-y-auto bg-slate-50 dark:bg-zinc-950 transition-all duration-300 custom-scrollbar">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
