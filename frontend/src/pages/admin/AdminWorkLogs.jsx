import React, { useState } from 'react';

const AdminWorkLogs = () => {
  const [workLogs] = useState([
    { id: 1, agent: 'John Sales', customer: 'Aryan Tiles Co.', phone: '9876543210', tileType: 'Porcelain', status: 'Order Placed', time: '10:30 AM' },
    { id: 2, agent: 'John Sales', customer: 'Modern Builders', phone: '9123456789', tileType: 'Vitrified', status: 'Interested', time: '11:45 AM' },
    { id: 3, agent: 'John Sales', customer: 'S.K. Enterprises', phone: '9988776655', tileType: 'Ceramic', status: 'Follow-up', time: '02:15 PM' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2">Visits Today</h3>
          <p className="text-3xl font-black">42</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2">New Orders</h3>
          <p className="text-3xl font-black text-emerald-500">12</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-sm">
          <h3 className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2">Pending</h3>
          <p className="text-3xl font-black text-rose-500">08</p>
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-md font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Agent</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5 text-sm">
              {workLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center text-md font-black text-rose-600 dark:text-rose-400">
                        {log.agent.charAt(0)}
                      </div>
                      <span className="font-bold">{log.agent}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-zinc-900 dark:text-white">{log.customer}</div>
                    <div className="text-[10px] text-zinc-500">{log.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300 font-medium">{log.tileType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${log.status === 'Order Placed' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                        log.status === 'Interested' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 font-bold">{log.time}</td>
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
