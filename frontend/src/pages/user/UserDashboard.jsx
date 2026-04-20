import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Phone, Calendar, User, Briefcase, TrendingUp, StopCircle, RefreshCw, PlayCircle, MoreHorizontal } from 'lucide-react';

const UserDashboard = () => {
  // Mock data for the dashboard layout
  const contactStats = [
    { label: 'No Response', total: 0, today: 0, icon: AlertCircle, color: 'text-zinc-400' },
    { label: 'Trying', total: 0, today: 0, icon: Phone, color: 'text-blue-500' },
    { label: 'New', total: 1, today: 1, icon: User, color: 'text-emerald-500' },
  ];

  const customerStats = [
    { label: 'Stopped', total: 0, today: 0, icon: StopCircle, color: 'text-rose-500' },
    { label: 'Irregular', total: 0, today: 0, icon: RefreshCw, color: 'text-amber-500' },
    { label: 'Running', total: 0, today: 0, icon: PlayCircle, color: 'text-emerald-500' },
  ];

  const reminderStats = [
    { label: 'Total Reminder', value: 1, color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600' },
    { label: 'Done Reminder', value: 0, color: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600' },
    { label: 'Pending Reminder', value: 0, color: 'bg-rose-100 dark:bg-rose-500/10 text-rose-600' },
    { label: "Today's Talk", value: 1, color: 'bg-blue-100 dark:bg-blue-500/10 text-blue-600' },
    { label: 'Total pending Reminder', value: 1, color: 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600' },
  ];

  const talkList = [
    { name: 'ABC CERAMIC PVT LTD', role: 'SALES - Order - fdrykjgutdyt', response: 'GOOD', date: '20 Apr 2026', type: 'REMINDER' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact & Customer Groups */}
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 shadow-sm backdrop-blur-sm">
            <div className="space-y-8">
              {/* Contact Group */}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center">
                   <Phone className="w-3 h-3 mr-2" /> Contact
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

              {/* Customer Group */}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center">
                   <Briefcase className="w-3 h-3 mr-2" /> Customer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {customerStats.map((stat, idx) => (
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
            
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/5 flex justify-end">
               <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 transition-colors">See All</button>
            </div>
          </div>
        </div>

        {/* Clock In/Out Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-6 shadow-sm backdrop-blur-sm">
             <div className="flex gap-3 mb-6">
                <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all transform active:scale-95">
                   <Clock className="w-4 h-4 mr-2" /> Clock In
                </button>
                <button className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-sm flex items-center justify-center shadow-lg shadow-rose-500/20 transition-all transform active:scale-95">
                   <CheckCircle2 className="w-4 h-4 mr-2" /> Clock Out
                </button>
             </div>
             <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">Today's Activity</h4>
                <div className="py-10 text-center border-2 border-dashed border-zinc-100 dark:border-white/5 rounded-2xl">
                   <p className="text-xs text-zinc-500 font-bold">No activity yet today.</p>
                </div>
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
              <h3 className="text-xl font-black">Today's Talk List</h3>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{talkList.length} talk tracked</span>
           </div>
           <div className="space-y-4">
              {talkList.map((talk, idx) => (
                <div key={idx} className="p-4 bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                      {talk.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{talk.name}</h4>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{talk.role}</p>
                      <p className="text-[10px] text-zinc-400 mt-1">Doc Sent - Response: <span className="text-emerald-500">{talk.response}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-500/20 text-amber-600 text-[9px] font-black rounded uppercase tracking-widest">{talk.type}</span>
                    <p className="text-[10px] text-zinc-400 mt-1 font-bold">{talk.date}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-zinc-50/50 dark:bg-emerald-500/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 shadow-sm backdrop-blur-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black">Today's Reminder List</h3>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">0 reminders</span>
           </div>
           <div className="py-20 text-center">
              <p className="text-xs text-zinc-500 font-bold">No reminders for today.</p>
           </div>
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;
