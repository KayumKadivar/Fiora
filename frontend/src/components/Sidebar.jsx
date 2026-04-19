import React from 'react';
import { LogOut, PanelLeftClose, Menu } from 'lucide-react';

const Sidebar = ({ 
  isCollapsed, 
  setIsCollapsed, 
  logo: Logo, 
  logoText, 
  navItems, 
  onLogout,
  theme = 'blue'
}) => {
  
  const themeStyles = {
    blue: {
      gradient: 'from-blue-600 to-indigo-600',
      activeBg: 'bg-blue-600/10',
      activeText: 'text-blue-600 dark:text-white',
      ring: 'ring-blue-500/10',
      hoverText: 'hover:text-blue-600'
    },
    rose: {
      gradient: 'from-rose-500 to-orange-500',
      activeBg: 'bg-rose-500/10',
      activeText: 'text-rose-600 dark:text-rose-400',
      ring: 'ring-rose-500/10',
      hoverText: 'hover:text-rose-600'
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.blue;

  const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <div className="relative group flex items-center px-3">
      <button 
        onClick={onClick}
        className={`w-full flex items-center ${isCollapsed ? 'justify-center py-4' : 'space-x-3 px-4 py-3'} rounded-xl transition-all duration-300 ${
          active ? `${currentTheme.activeBg} ${currentTheme.activeText} shadow-md ring-1 ${currentTheme.ring}` : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white'
        }`}
      >
        <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0 transition-all duration-300 ${active ? 'scale-110' : ''}`} />
        {!isCollapsed && <span className="font-bold text-sm truncate transition-opacity duration-300">{label}</span>}
      </button>
      
      {isCollapsed && (
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap z-[200] shadow-xl border border-white/10 pointer-events-none">
          {label}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-[5px] border-transparent border-r-zinc-900 dark:border-r-zinc-800"></div>
        </div>
      )}
    </div>
  );

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-black/40 border-r border-zinc-200 dark:border-white/5 flex flex-col backdrop-blur-xl transition-all duration-300 relative z-[110] h-screen shrink-0 shadow-2xl shadow-zinc-500/5`}>
      <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-200 dark:border-white/5 overflow-visible shrink-0">
         <div 
           className={`flex items-center space-x-3 group/logo relative ${isCollapsed ? 'cursor-col-resize' : 'cursor-pointer'}`}
           onClick={() => isCollapsed && setIsCollapsed(false)}
         >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0 transition-transform ${isCollapsed ? 'group-hover:scale-110' : ''}`}>
               <Logo className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <h1 className={`text-xl font-black bg-clip-text text-transparent bg-gradient-to-r ${currentTheme.gradient} whitespace-nowrap`}>
                {logoText}
              </h1>
            )}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg opacity-0 invisible group-hover/logo:opacity-100 group-hover/logo:visible translate-x-[-10px] group-hover/logo:translate-x-0 transition-all duration-300 whitespace-nowrap z-[200] shadow-xl border border-white/10 pointer-events-none">
                Open Sidebar
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-[5px] border-transparent border-r-zinc-900 dark:border-r-zinc-800"></div>
              </div>
            )}
         </div>

         {!isCollapsed && (
           <button 
             onClick={() => setIsCollapsed(true)}
             className="p-1.5 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg text-zinc-400 hover:text-blue-500 transition-all"
           >
             <PanelLeftClose className="w-5 h-5" />
           </button>
         )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar scrollbar-hide py-4">
        {navItems.map((item, idx) => (
          <NavItem 
            key={idx} 
            icon={item.icon} 
            label={item.label} 
            active={item.active} 
            onClick={item.onClick} 
          />
        ))}
      </nav>

      <div className="mt-auto shrink-0 border-t border-b border-zinc-100 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
        <div className="p-3">
          <div className="relative group flex items-center">
            <button 
              onClick={onLogout}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center py-4' : 'space-x-3 px-4 py-3'} rounded-xl transition-all duration-300 text-zinc-500 dark:text-zinc-400 hover:bg-rose-500/10 hover:text-rose-600 group/logout`}
            >
              <LogOut className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0 group-hover/logout:rotate-12 transition-transform`} />
              {!isCollapsed && <span className="font-bold text-sm truncate">Logout</span>}
            </button>
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap z-[200] shadow-xl border border-white/10 pointer-events-none">
                Logout
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-[5px] border-transparent border-r-zinc-900 dark:border-r-zinc-800"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
