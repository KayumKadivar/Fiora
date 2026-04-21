import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Phone,
  ArrowRight,
  Loader2,
  CalendarDays
} from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

const UserWorkLogs = () => {
  const [workLogs, setWorkLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [stats, setStats] = useState({ total: 0, good: 0, medium: 0, bad: 0 });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchUserLogs();
  }, [selectedDate, statusFilter]);

  const fetchUserLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/worklogs');
      // Filter logs for the current user using name
      let filteredLogs = res.data.filter(log => log.userName === user.name);

      // Apply Date Filter
      if (selectedDate) {
        const selectedStr = selectedDate.toLocaleDateString();
        filteredLogs = filteredLogs.filter(log =>
          new Date(log.createdAt).toLocaleDateString() === selectedStr
        );
      }

      // Apply Status Filter
      if (statusFilter !== 'All') {
        filteredLogs = filteredLogs.filter(log => log.status === statusFilter);
      }

      setWorkLogs(filteredLogs);

      // Calculate stats for the user's filtered logs
      const s = filteredLogs.reduce((acc, log) => {
        acc.total++;
        if (log.status === 'Good') acc.good++;
        if (log.status === 'Medium') acc.medium++;
        if (log.status === 'Bad') acc.bad++;
        return acc;
      }, { total: 0, good: 0, medium: 0, bad: 0 });
      setStats(s);

    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error('Failed to load work logs');
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    'Good': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Medium': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Bad': 'bg-rose-500/10 text-rose-500 border-rose-500/20'
  };

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-4 lg:p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-950 dark:text-white text-base font-black uppercase tracking-widest mb-2">Total</h3>
          <p className="text-2xl lg:text-3xl font-black">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-4 lg:p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-950 dark:text-white text-base font-black uppercase tracking-widest mb-2">Good</h3>
          <p className="text-2xl lg:text-3xl font-black text-emerald-500">{stats.good}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-4 lg:p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-950 dark:text-white text-base font-black uppercase tracking-widest mb-2">Medium</h3>
          <p className="text-2xl lg:text-3xl font-black text-amber-500">{stats.medium}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-4 lg:p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-950 dark:text-white text-base font-black uppercase tracking-widest mb-2">Bad</h3>
          <p className="text-2xl lg:text-3xl font-black text-rose-500">{stats.bad}</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-4 lg:p-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
            {/* Date Filter */}
            <div className="relative flex-1 sm:max-w-[250px]">
              <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 z-10" />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Filter by Date"
                className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5 rounded-md pl-12 pr-10 py-3 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                isClearable
                portalId="root-portal"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2 bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/5 rounded-md p-1">
              {['All', 'Good', 'Medium', 'Bad'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-md text-base font-black transition-all ${statusFilter === status
                      ? 'bg-blue-600 text-zinc-950 dark:text-white shadow-lg shadow-blue-500/20'
                      : 'text-zinc-500 dark:text-white/60 hover:bg-zinc-200 dark:hover:bg-white/5'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setSelectedDate(null); setStatusFilter('All'); }}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-900 dark:text-white rounded-md transition-all font-black text-lg"
          >
            <Filter className="w-5 h-5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Logs Table/List Section */}
      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse premium-table">
            <thead>
              <tr className="bg-zinc-50/5 dark:bg-white/5 text-zinc-950 dark:text-white text-base font-black uppercase tracking-[0.2em] border-b border-zinc-100 dark:border-white/5">
                <th className="p-4">Contact Details</th>
                <th className="p-4">Status</th>
                <th className="p-4">Remarks</th>
                <th className="p-4">Next Follow-up</th>
                <th className="p-4">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5 text-lg font-bold">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                      <p className="text-zinc-500 dark:text-white/60 uppercase tracking-widest font-black">Fetching your logs...</p>
                    </div>
                  </td>
                </tr>
              ) : workLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center space-y-4 opacity-50">
                      <Search className="w-12 h-12 text-zinc-400" />
                      <p className="text-zinc-950 dark:text-white text-xl font-black">No matching tasks found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                workLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-black text-zinc-900 dark:text-white text-xl">{log.contactName}</div>
                      <div className="text-base text-zinc-950 dark:text-white/60 flex items-center mt-1">
                        <Phone className="w-3 h-3 mr-2 opacity-50" /> {log.contactNumber}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-4 py-1.5 rounded-md text-sm font-black uppercase tracking-wider border ${statusColors[log.status]}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-base text-zinc-950 dark:text-white max-w-xs truncate italic" title={log.remarks}>
                        "{log.remarks}"
                      </div>
                    </td>
                    <td className="p-4">
                      {log.nextFollowUpDate ? (
                        <div className="text-base text-blue-500 font-black flex items-center">
                          <ArrowRight className="w-3 h-3 mr-2" />
                          {new Date(log.nextFollowUpDate).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-zinc-400 text-sm">N/A</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-base text-white font-black flex items-center">
                        <Clock className="w-3 h-3 mr-2 opacity-50" />
                        {new Date(log.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserWorkLogs;
