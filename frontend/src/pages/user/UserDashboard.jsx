import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Calendar,
  User,
  Briefcase,
  TrendingUp,
  RefreshCw,
  Loader2,
  ArrowRight,
  PlusCircle,
  History,
  LayoutDashboard,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);

    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/worklogs');
        if (!response.ok) throw new Error('Failed to fetch logs');
        const data = await response.json();

        // Filter logs for current user
        const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
        const userLogs = data.filter(log =>
          log.userName && log.userName === loggedInUser.name
        );
        setLogs(userLogs);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const today = new Date().toLocaleDateString();

  const stats = [
    {
      label: 'Total Submissions',
      value: logs.length,
      subValue: logs.filter(l => new Date(l.createdAt).toLocaleDateString() === today).length + " today",
      icon: LayoutDashboard,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Good Status',
      value: logs.filter(l => l.status === 'Good').length,
      subValue: "Positive feedback",
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      label: 'Follow-ups',
      value: logs.filter(l => l.nextFollowUpDate).length,
      subValue: "Scheduled visits",
      icon: Calendar,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      label: 'Performance',
      value: Math.round((logs.filter(l => l.status === 'Good').length / (logs.length || 1)) * 100) + '%',
      subValue: "Good rating avg",
      icon: Zap,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10'
    }
  ];

  const quickActions = [
    { label: 'Submit Daily Task', icon: PlusCircle, path: '/dashboard/task', color: 'bg-blue-600' },
    { label: 'View Work Logs', icon: History, path: '/dashboard/logs', color: 'bg-zinc-800' }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-zinc-950 dark:text-white font-black uppercase tracking-[0.2em] text-xl">Initializing Workspace...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">

      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-md p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Briefcase className="w-48 h-48 rotate-12" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2">Hello, {currentUser?.name?.split(' ')[0] || 'Agent'}!</h1>
          <p className="text-blue-100 text-xl font-bold uppercase tracking-widest max-w-lg opacity-80">
            Welcome back to your dashboard. You have {logs.filter(l => new Date(l.createdAt).toLocaleDateString() === today).length} tasks completed today.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => navigate(action.path)}
                className={`flex items-center space-x-3 px-6 py-3 ${action.color} rounded-md font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-lg border border-white/10`}
              >
                <action.icon className="w-5 h-5" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-6 shadow-sm flex items-center space-x-5 group hover:border-blue-500/50 transition-all">
            <div className={`p-4 ${stat.bg} rounded-md group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-zinc-500 dark:text-white/60 text-base font-black uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-zinc-950 dark:text-white">{stat.value}</h3>
              <p className="text-[10px] font-black uppercase text-blue-500 tracking-tighter mt-0.5">{stat.subValue}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Recent Activity Log */}
        <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <History className="w-5 h-5 text-blue-500" />
              <h2 className="text-2xl font-black">Recent Activity</h2>
            </div>
            <button
              onClick={() => navigate('/dashboard/logs')}
              className="text-sm font-black text-blue-500 hover:text-blue-600 flex items-center uppercase tracking-widest"
            >
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                <LayoutDashboard className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-xl font-bold uppercase tracking-widest">No activities logged yet</p>
              </div>
            ) : (
              logs.slice(0, 4).map((log, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-md hover:border-blue-500/30 transition-all group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center font-black text-blue-500 text-2xl uppercase border border-blue-500/20">
                      {log.contactName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-xl text-zinc-900 dark:text-white leading-none mb-1">{log.contactName}</h4>
                      <p className="text-base text-zinc-500 dark:text-white/60 font-bold">{log.contactNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${log.status === 'Good' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        log.status === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                          'bg-rose-500/10 text-rose-500 border-rose-500/20'
                      }`}>
                      {log.status}
                    </span>
                    <p className="text-[11px] font-black text-zinc-400 dark:text-white/40 mt-1 uppercase tracking-tighter">
                      {new Date(log.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reminders/Follow-ups Sidebar */}
        <div className="bg-zinc-50 dark:bg-emerald-500/5 border border-zinc-200 dark:border-white/10 rounded-md shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-zinc-200 dark:border-white/10 flex items-center space-x-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl font-black">Upcoming</h2>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {logs.filter(l => l.nextFollowUpDate).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
                <Calendar className="w-10 h-10 mb-4 opacity-20" />
                <p className="text-base font-bold uppercase tracking-widest text-center">No follow-ups<br />scheduled</p>
              </div>
            ) : (
              logs.filter(l => l.nextFollowUpDate).slice(0, 3).map((log, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded-md group hover:border-amber-500/50 transition-all shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">Follow Up</span>
                    <div className="text-zinc-950 dark:text-white font-black flex items-center text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(log.nextFollowUpDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <h4 className="font-black text-xl text-zinc-900 dark:text-white">{log.contactName}</h4>
                  <p className="text-base text-zinc-500 dark:text-white/60 font-bold mb-3">{log.contactNumber}</p>
                  <button className="w-full py-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-md text-sm font-black uppercase tracking-widest transition-all">
                    Action Now
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default UserDashboard;
