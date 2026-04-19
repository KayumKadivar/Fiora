import React, { useState } from 'react';
import { Users, UserPlus, ClipboardList, Search, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import CustomDropdown from '../components/CustomDropdown';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem('adminActiveTab') || 'tasks');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const [users, setUsers] = useState([
    { id: 1, name: 'John Sales', email: 'john@fiora.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Admin', email: 'jane@fiora.com', role: 'Admin', status: 'Active' },
  ]);

  const [workLogs, setWorkLogs] = useState([
    { id: 1, agent: 'John Sales', customer: 'Aryan Tiles Co.', phone: '9876543210', tileType: 'Porcelain', status: 'Order Placed', time: '10:30 AM' },
    { id: 2, agent: 'John Sales', customer: 'Modern Builders', phone: '9123456789', tileType: 'Vitrified', status: 'Interested', time: '11:45 AM' },
    { id: 3, agent: 'John Sales', customer: 'S.K. Enterprises', phone: '9988776655', tileType: 'Ceramic', status: 'Follow-up', time: '02:15 PM' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'User' });

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    const created = { id: users.length + 1, ...newUser, status: 'Active' };
    setUsers([...users, created]);
    setNewUser({ name: '', email: '', password: '', role: 'User' });
  };

  const handleLogout = () => {
    navigate('/admin');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    sessionStorage.setItem('adminActiveTab', tab);
  };

  const navItems = [
    { icon: ClipboardList, label: "Work Logs", active: activeTab === 'tasks', onClick: () => handleTabChange('tasks') },
    { icon: Users, label: "Users", active: activeTab === 'users', onClick: () => handleTabChange('users') },
    { icon: Settings, label: "Settings", active: activeTab === 'settings', onClick: () => handleTabChange('settings') }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex text-zinc-900 dark:text-white transition-colors duration-500 font-sans overflow-hidden">

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        logo={ClipboardList}
        logoText="Fiora Admin"
        navItems={navItems}
        onLogout={handleLogout}
        theme="rose"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title={activeTab === 'tasks' ? 'Work Logs Management' : 'User Accounts'}
          user={{ name: "Admin User", email: "admin@fiora.com" }}
          onLogout={handleLogout}
          isDark={isDark}
          toggleTheme={toggleTheme}
          theme="rose"
        />

        <main className="flex-1 p-6 lg:p-10 relative overflow-y-auto bg-slate-50 dark:bg-zinc-950 transition-all duration-300 custom-scrollbar">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

          {activeTab === 'tasks' ? (
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
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-6 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-rose-500/10 dark:bg-rose-500/20 rounded-xl">
                      <UserPlus className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h3 className="text-lg font-black">Add User</h3>
                  </div>

                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-md font-bold text-zinc-500 dark:text-zinc-400 px-0.5 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-sm font-semibold"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-md font-bold text-zinc-500 dark:text-zinc-400 px-0.5 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-sm font-semibold"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-md font-bold text-zinc-500 dark:text-zinc-400 px-0.5 uppercase tracking-wider">Password</label>
                      <input
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-sm font-semibold"
                        required
                      />
                    </div>
                    <CustomDropdown
                      label="Role"
                      options={['User', 'Admin']}
                      value={newUser.role}
                      onChange={(val) => setNewUser({ ...newUser, role: val })}
                      theme="rose"
                    />
                    <button type="submit" className="w-full mt-4 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-sm py-3 rounded-xl transition-all duration-300 shadow-lg shadow-rose-500/20 transform hover:scale-[1.01] active:scale-[0.99]">
                      Create Account
                    </button>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-sm">
                  <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-xl">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-black">Active Team</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-white/5 text-sm">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold text-zinc-900 dark:text-white">{user.name}</div>
                              <div className="text-[10px] text-zinc-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === 'Admin' ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-zinc-600 dark:text-zinc-300 font-bold text-md">{user.status}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
