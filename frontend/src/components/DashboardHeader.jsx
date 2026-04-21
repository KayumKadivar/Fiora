import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Settings, LogOut, ChevronDown, Sun, Moon, Menu } from 'lucide-react';

const DashboardHeader = ({
  title,
  user,
  onLogout,
  isDark,
  toggleTheme,
  theme = 'blue',
  toggleMobileMenu
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeStyles = {
    blue: {
      profileBg: 'bg-blue-500',
      textHover: 'hover:text-blue-600',
      borderHover: 'hover:border-blue-500/50',
      gradient: 'from-blue-600 to-indigo-600'
    },
    rose: {
      profileBg: 'bg-rose-500',
      textHover: 'hover:text-rose-500',
      borderHover: 'hover:border-rose-500/50',
      gradient: 'from-rose-500 to-orange-500'
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.blue;

  return (
    <header className="h-16 bg-white/80 dark:bg-black/40 border-b border-zinc-200 dark:border-white/5 backdrop-blur-xl z-[100] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-sm">
      <div className="flex items-center space-x-3 sm:space-x-6">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl lg:hidden text-zinc-500"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-sm sm:text-lg font-bold tracking-tight text-zinc-500 dark:text-zinc-400 truncate max-w-[150px] sm:max-w-none">
          {title}
        </h2>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="p-2 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl hover:bg-zinc-200 dark:hover:bg-white/10 transition-all text-zinc-500"
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>

        <button className="p-2 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl hover:bg-zinc-200 dark:hover:bg-white/10 transition-all relative group">
          <Bell className="w-5 h-5 text-zinc-500 group-hover:text-blue-500 transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white dark:border-zinc-950"></span>
        </button>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center space-x-2 p-1 pr-3 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl ${currentTheme.borderHover} transition-all`}
          >
            <div className={`w-8 h-8 rounded-lg ${currentTheme.profileBg} flex items-center justify-center text-white font-black text-sm shadow-md`}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block text-left leading-none">
              <p className="text-md font-bold">{user?.name || 'User'}</p>
            </div>
            <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl p-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center space-x-3 mb-4 p-2 border-b border-zinc-100 dark:border-white/5 pb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center text-white text-lg font-black`}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-sm truncate">{user?.name || 'User'}</h3>
                  <p className="text-[10px] text-zinc-500 truncate">{user?.email || 'user@fiora.com'}</p>
                </div>
              </div>
              <div className="space-y-1">
                <button className={`w-full flex items-center space-x-2 p-2.5 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-all text-zinc-600 dark:text-zinc-400 ${currentTheme.textHover} text-sm font-medium`}>
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>
                <button className={`w-full flex items-center space-x-2 p-2.5 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-all text-zinc-600 dark:text-zinc-400 ${currentTheme.textHover} text-sm font-medium`}>
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button onClick={onLogout} className="w-full flex items-center space-x-2 p-2.5 hover:bg-rose-500/10 rounded-xl transition-all text-zinc-600 dark:text-zinc-400 hover:text-rose-500 text-sm font-medium">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
