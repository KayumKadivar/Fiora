import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const DashboardLayout = ({ logo, logoText, navItems, theme, user, onLogoutPath, activeTitle }) => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <div className="h-screen bg-slate-50 dark:bg-zinc-950 flex text-zinc-900 dark:text-white transition-colors duration-500 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-[200] lg:relative lg:z-auto transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          logo={logo}
          logoText={logoText}
          navItems={navItems}
          onLogout={handleLogout}
          theme={theme}
          isMobile={true}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <DashboardHeader 
          title={activeTitle}
          user={user}
          onLogout={handleLogout}
          isDark={isDark}
          toggleTheme={toggleTheme}
          theme={theme}
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 relative overflow-y-auto bg-slate-50 dark:bg-zinc-950 transition-all duration-300 custom-scrollbar">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
