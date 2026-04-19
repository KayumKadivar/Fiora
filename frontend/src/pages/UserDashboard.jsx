import React from 'react';
import { Layout, Home, User, Settings, LogOut, Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex text-zinc-900 dark:text-white transition-colors duration-500 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-black/40 border-r border-zinc-200 dark:border-white/5 flex flex-col backdrop-blur-xl">
        <div className="p-6 border-b border-zinc-200 dark:border-white/5">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
            Fiora User
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center space-x-3 bg-blue-50 dark:bg-white/10 text-blue-600 dark:text-white px-4 py-3 rounded-xl transition-all">
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-4 py-3 rounded-xl transition-all">
            <User className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>
          <button className="w-full flex items-center space-x-3 hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-4 py-3 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-zinc-200 dark:border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 text-zinc-500 hover:text-rose-500 transition-colors py-2 font-medium">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative overflow-y-auto">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back, User!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Here is what's happening today.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2.5 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl hover:bg-zinc-50 dark:hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-zinc-500" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-zinc-950"></span>
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-sm w-64 shadow-sm"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">Total Activity</h3>
            <p className="text-3xl font-bold">1,284</p>
            <div className="mt-4 flex items-center text-emerald-500 text-sm font-medium">
              <span>+12.5%</span>
              <span className="ml-1 text-zinc-400 font-normal">from last week</span>
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold">94.2%</p>
            <div className="mt-4 flex items-center text-blue-500 text-sm font-medium">
              <span>Stable</span>
              <span className="ml-1 text-zinc-400 font-normal">performance</span>
            </div>
          </div>
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h3 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">Upcoming Tasks</h3>
            <p className="text-3xl font-bold">8</p>
            <div className="mt-4 flex items-center text-amber-500 text-sm font-medium">
              <span>Due soon</span>
              <span className="ml-1 text-zinc-400 font-normal">action required</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-8 shadow-sm backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 border-b border-zinc-100 dark:border-white/5 pb-6">
                  <p className="font-semibold">Activity {i}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">You updated your profile information and saved changes to your account settings.</p>
                  <p className="text-xs text-zinc-400 mt-2">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
