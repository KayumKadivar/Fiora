import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Eye, EyeOff, Smartphone, Clock, ShieldCheck, Mail, User, Briefcase, Activity, Loader2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import CustomDropdown from '../../components/CustomDropdown';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const [newUser, setNewUser] = useState({
    role: 'User',
    name: '',
    email: '',
    mobilePrefix: '+91',
    mobileNumber: '',
    password: '',
    status: 'Active',
    designation: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (field, value) => {
    setNewUser({ ...newUser, [field]: value });
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Manual Validation
    const errors = {};
    if (!newUser.name.trim()) errors.name = 'Full Name is required';
    if (!newUser.email.trim()) errors.email = 'Email is required';
    if (!newUser.mobileNumber.trim()) errors.mobileNumber = 'Mobile Number is required';
    if (!newUser.password.trim()) errors.password = 'Password is required';
    if (!newUser.designation.trim()) errors.designation = 'Designation is required';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }

      const createdUser = await response.json();
      setUsers([createdUser, ...users]);
      toast.success('User created successfully!');

      // Reset form and close modal
      setNewUser({
        role: 'User',
        name: '',
        email: '',
        mobilePrefix: '+91',
        mobileNumber: '',
        password: '',
        status: 'Active',
        designation: ''
      });
      setError(null);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Active Team Section - NOW FIRST */}
      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="p-8 border-b border-zinc-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-rose-500/10 rounded-2xl">
              <Users className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h2 className="text-xl font-black">Active Team</h2>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Manage your organization's users and roles</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-md font-bold text-zinc-500 bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full">Total: {users.length}</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-md rounded-xl transition-all duration-300 shadow-lg shadow-rose-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Create User</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[200px] relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-black/20 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
            </div>
          )}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[14px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-5">Name & Email</th>
                <th className="px-8 py-5">Designation</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5 text-md font-medium">
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-8 py-10 text-center text-zinc-500 font-bold">
                    No users found. Create one to get started!
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-white/10 dark:to-white/5 flex items-center justify-center font-black text-zinc-500 group-hover:scale-110 transition-transform uppercase">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-white group-hover:text-rose-500 transition-colors">{user.name}</div>
                        <div className="text-[11px] text-zinc-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1 opacity-50" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-zinc-600 dark:text-zinc-300 font-bold flex items-center">
                      <Briefcase className="w-3 h-3 mr-2 opacity-50" />
                      {user.designation || 'N/A'}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[14px] font-black uppercase tracking-wider ${user.role === 'Admin' ? 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`}></div>
                      <span className="text-zinc-600 dark:text-zinc-300 font-bold">{user.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup for User Creation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)}></div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl sm:rounded-[2.5rem] w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl relative z-10 animate-in zoom-in-95 fade-in duration-300 custom-scrollbar">
            <div className="p-4 sm:p-8">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-rose-500/10 rounded-2xl">
                    <UserPlus className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">Create New User</h2>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Set up a new team member account</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl text-zinc-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} noValidate className="space-y-8">
                {/* User Information Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 border-b border-zinc-100 dark:border-white/5 pb-2">
                    <User className="w-4 h-4 text-zinc-400" />
                    <h3 className="text-md font-black uppercase tracking-widest text-zinc-400">User Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CustomDropdown
                      label="Select Role"
                      options={['Admin', 'User', 'Manager', 'Sales']}
                      value={newUser.role}
                      onChange={(val) => setNewUser({ ...newUser, role: val })}
                      theme="rose"
                    />

                    <div className="space-y-1.5">
                      <label className="block text-md font-bold text-zinc-500 dark:text-zinc-400 px-0.5 uppercase tracking-wider flex items-center">
                        Full Name <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={newUser.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${fieldErrors.name ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-md font-bold`}
                      />
                      {fieldErrors.name && <p className="text-rose-500 text-[14px] font-bold mt-1 ml-1">{fieldErrors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-md font-bold text-zinc-500 dark:text-zinc-400 px-0.5 uppercase tracking-wider flex items-center">
                        Email Address <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={newUser.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${fieldErrors.email ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-md font-bold`}
                      />
                      {fieldErrors.email && <p className="text-rose-500 text-[14px] font-bold mt-1 ml-1">{fieldErrors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-md font-bold text-zinc-500 dark:text-zinc-400 px-0.5 uppercase tracking-wider flex items-center">
                        Mobile Number <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <div className="flex space-x-2">
                        <select
                          value={newUser.mobilePrefix}
                          onChange={(e) => setNewUser({ ...newUser, mobilePrefix: e.target.value })}
                          className="w-20 bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-white/5 rounded-xl px-2 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-md font-bold"
                        >
                          <option>+91</option>
                          <option>+1</option>
                          <option>+44</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="Enter mobile no"
                          value={newUser.mobileNumber}
                          onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                          className={`flex-1 bg-zinc-50 dark:bg-black/40 border ${fieldErrors.mobileNumber ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-md font-bold`}
                        />
                      </div>
                      {fieldErrors.mobileNumber && <p className="text-rose-500 text-[14px] font-bold mt-1 ml-1">{fieldErrors.mobileNumber}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-md font-bold text-zinc-500 dark:text-zinc-400 px-0.5 uppercase tracking-wider flex items-center">
                        Password <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={newUser.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full bg-zinc-50 dark:bg-black/40 border ${fieldErrors.password ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-md font-bold`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-rose-500 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {fieldErrors.password && <p className="text-rose-500 text-[14px] font-bold mt-1 ml-1">{fieldErrors.password}</p>}
                    </div>

                    <CustomDropdown
                      label="Status"
                      options={['Active', 'Inactive', 'Blocked']}
                      value={newUser.status}
                      onChange={(val) => setNewUser({ ...newUser, status: val })}
                      theme="rose"
                    />

                    <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
                      <label className="block text-md font-bold text-zinc-500 dark:text-zinc-400 px-0.5 uppercase tracking-wider flex items-center">
                        Designation <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Designation"
                        value={newUser.designation}
                        onChange={(e) => handleInputChange('designation', e.target.value)}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${fieldErrors.designation ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-xl px-4 py-2.5 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-md font-bold`}
                      />
                      {fieldErrors.designation && <p className="text-rose-500 text-[14px] font-bold mt-1 ml-1">{fieldErrors.designation}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-white/5">
                  <div className="flex-1">
                    {error && (
                      <p className="text-rose-500 text-xs font-bold animate-pulse">{error}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 font-bold text-md hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-2.5 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-bold text-md rounded-xl transition-all duration-300 shadow-lg shadow-rose-500/20 transform hover:scale-[1.02] active:scale-[0.98] flex items-center"
                    >
                      {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {isSubmitting ? 'Creating...' : 'Create User'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
