import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertCircle, Phone, Calendar, User, Briefcase, TrendingUp, StopCircle, RefreshCw, PlayCircle, Users } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    good: 0,
    medium: 0,
    bad: 0,
    logs: []
  });

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/worklogs');
      const data = await response.json();
      setStats({
        total: data.length,
        good: data.filter(l => l.status === 'Good').length,
        medium: data.filter(l => l.status === 'Medium').length,
        bad: data.filter(l => l.status === 'Bad').length,
        logs: data.slice(0, 5) // Show latest 5
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const contactStats = [
    { label: 'No Response', total: stats.bad, today: stats.bad, icon: AlertCircle, color: 'text-rose-400' },
    { label: 'Trying', total: stats.medium, today: stats.medium, icon: Phone, color: 'text-amber-500' },
    { label: 'New', total: stats.good, today: stats.good, icon: User, color: 'text-emerald-500' },
  ];

  const reminderStats = [
    { label: 'Total Logs', value: stats.total, color: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600' },
    { label: 'Good Status', value: stats.good, color: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600' },
    { label: 'Medium Status', value: stats.medium, color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600' },
    { label: 'Bad Status', value: stats.bad, color: 'bg-rose-100 dark:bg-rose-500/10 text-rose-600' },
    { label: 'Active Agents', value: 1, color: 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 shadow-sm backdrop-blur-sm">
            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center">
                   <Users className="w-3 h-3 mr-2" /> Global Contact Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contactStats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 hover:border-blue-500/30 transition-all group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{stat.label}</span>
                        <stat.icon className={`w-4 h-4 ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                      </div>
                      <div className="flex items-end justify-between">
                         <div className="text-2xl font-black">{stat.total} <span className="text-[10px] text-zinc-500">total</span></div>
                         <div className="px-2 py-1 bg-white dark:bg-white/5 rounded-lg text-[9px] font-black text-blue-500 shadow-sm border border-blue-500/10">Today: {stat.today}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Activity Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-6 shadow-sm backdrop-blur-sm h-full">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Live Activity Monitor</h4>
             <div className="space-y-4">
                {stats.logs.length === 0 ? (
                  <div className="py-10 text-center border-2 border-dashed border-zinc-100 dark:border-white/5 rounded-2xl">
                    <p className="text-xs text-zinc-500 font-bold">No recent activity.</p>
                  </div>
                ) : (
                  stats.logs.map((log, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                       <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-[10px] font-black text-blue-500">
                          {log.userName.charAt(0)}
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black truncate">{log.userName}</p>
                          <p className="text-[9px] text-zinc-500 truncate">Contacted {log.contactName}</p>
                       </div>
                       <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${log.status === 'Good' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                          {log.status}
                       </span>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Reminder Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {reminderStats.map((stat, idx) => (
          <div key={idx} className={`${stat.color} rounded-[1.5rem] p-6 shadow-sm border border-white/5 text-center transform hover:scale-105 transition-all cursor-pointer`}>
             <h3 className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">{stat.label}</h3>
             <p className="text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 shadow-sm backdrop-blur-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black">Latest Submissions</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-blue-500">View All Logs</button>
           </div>
           <div className="space-y-4">
              {stats.logs.map((log, idx) => (
                <div key={idx} className="p-4 bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                      {log.contactName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{log.contactName}</h4>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Agent: {log.userName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${log.status === 'Good' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>{log.status}</span>
                    <p className="text-[10px] text-zinc-400 mt-1 font-bold">{new Date(log.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-zinc-50/50 dark:bg-emerald-500/5 border border-zinc-200 dark:border-emerald-500/10 rounded-[2rem] p-8 shadow-sm backdrop-blur-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black">Reminders Overview</h3>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Global remidners</span>
           </div>
           <div className="py-20 text-center">
              <p className="text-xs text-zinc-500 font-bold">No active reminders across the organization.</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
