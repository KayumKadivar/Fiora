import React, { useState, useEffect } from 'react';
import { ClipboardList, User, Phone, MessageSquare, Clock, Loader2 } from 'lucide-react';

const AdminWorkLogs = () => {
  const [workLogs, setWorkLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/worklogs');
      if (!response.ok) throw new Error('Failed to fetch work logs');
      const data = await response.json();
      setWorkLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkLogs();
  }, []);

  const stats = {
    total: workLogs.length,
    good: workLogs.filter(log => log.status === 'Good').length,
    medium: workLogs.filter(log => log.status === 'Medium').length,
    bad: workLogs.filter(log => log.status === 'Bad').length,
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-500 dark:text-zinc-400 text-[14px] font-bold uppercase tracking-widest mb-2">Total Submissions</h3>
          <p className="text-3xl font-black">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-500 dark:text-zinc-400 text-[14px] font-bold uppercase tracking-widest mb-2">Good Status</h3>
          <p className="text-3xl font-black text-emerald-500">{stats.good}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-500 dark:text-zinc-400 text-[14px] font-bold uppercase tracking-widest mb-2">Medium Status</h3>
          <p className="text-3xl font-black text-amber-500">{stats.medium}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-500 dark:text-zinc-400 text-[14px] font-bold uppercase tracking-widest mb-2">Bad Status</h3>
          <p className="text-3xl font-black text-rose-500">{stats.bad}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-sm relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/20 backdrop-blur-[2px] z-10 flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[14px] font-bold uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Submitting Agent</th>
                <th className="px-8 py-5">Contact Details</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Next Follow-up</th>
                <th className="px-8 py-5">Remarks</th>
                <th className="px-8 py-5">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5 text-md font-medium">
              {!loading && workLogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-8 py-10 text-center text-zinc-500 font-bold">
                    No work logs submitted yet.
                  </td>
                </tr>
              )}
              {workLogs.map((log) => (
                <tr key={log._id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-xs font-black text-blue-600 dark:text-blue-400 uppercase">
                        {log.userName.charAt(0)}
                      </div>
                      <span className="font-bold">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">{log.contactName}</div>
                    <div className="text-[14px] text-zinc-500 flex items-center">
                      <Phone className="w-3 h-3 mr-1 opacity-50" /> {log.contactNumber}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[14px] font-black uppercase tracking-wider ${log.status === 'Good' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                      log.status === 'Medium' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400' :
                        'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
                      }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 font-bold">
                      {log.nextFollowUpDate ? new Date(log.nextFollowUpDate).toLocaleDateString() : 'None'}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 max-w-xs truncate" title={log.remarks}>
                      {log.remarks || 'No remarks'}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-[11px] text-zinc-400 font-bold flex items-center">
                      <Clock className="w-3 h-3 mr-1 opacity-50" />
                      {new Date(log.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkLogs;

