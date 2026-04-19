import React, { useState } from 'react';
import { Users, UserPlus, Settings, LogOut, Search, ChevronDown, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'User' });
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const handleCreateUser = (e) => {
    e.preventDefault();
    const created = {
      id: users.length + 1,
      ...newUser,
      status: 'Active'
    };
    setUsers([...users, created]);
    setNewUser({ name: '', email: '', password: '', role: 'User' });
    // In a real app, you would make an API call to the backend here
  };

  const handleLogout = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col backdrop-blur-xl">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-500">
            Admin Portal
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center space-x-3 bg-white/10 text-white px-4 py-3 rounded-xl transition-all">
            <UserPlus className="w-5 h-5 text-rose-400" />
            <span className="font-medium">User Management</span>
          </button>
          <button className="w-full flex items-center space-x-3 hover:bg-white/5 text-zinc-400 hover:text-white px-4 py-3 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 text-zinc-400 hover:text-rose-400 transition-colors py-2">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative overflow-y-auto">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
            <p className="text-zinc-400 mt-1">Create and manage user accounts</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-rose-500 transition-colors text-sm w-64"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create User Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-rose-500/20 rounded-lg">
                  <UserPlus className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-xl font-semibold">Create New User</h3>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsRoleOpen(!isRoleOpen)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-left focus:outline-none focus:border-rose-500 transition-colors text-white flex items-center justify-between shadow-sm"
                    >
                      <span className="font-medium">{newUser.role}</span>
                      <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isRoleOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isRoleOpen && (
                      <div className="absolute z-50 w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl ring-1 ring-black ring-opacity-5 animate-in fade-in slide-in-from-top-2 duration-200">
                        {['User', 'Admin'].map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => {
                              setNewUser({...newUser, role});
                              setIsRoleOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between ${
                              newUser.role === role 
                                ? 'text-rose-400 bg-rose-500/10 font-semibold' 
                                : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {role}
                            {newUser.role === role && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg shadow-rose-500/20"
                >
                  Create User
                </button>
              </form>
            </div>
          </div>

          {/* User List Table */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-6 border-b border-white/5 flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Active Users</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-zinc-400 text-sm">
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Email</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                        <td className="px-6 py-4 text-zinc-400">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.role === 'Admin' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-zinc-300">{user.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-zinc-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
