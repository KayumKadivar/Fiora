import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Eye, 
  EyeOff, 
  Mail, 
  User, 
  Loader2, 
  X, 
  Plus, 
  Pencil, 
  Trash2,
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import toast from 'react-hot-toast';
import CustomDropdown from '../../components/CustomDropdown';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState(null);

  const initialUserState = {
    role: 'User',
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    status: 'Active'
  };

  const [formData, setFormData] = useState(initialUserState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      // Filter out Super Admin
      const filteredUsers = data.filter(u => u.email !== 'admin@gmail.com');
      setUsers(filteredUsers);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Could not load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData(initialUserState);
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      role: user.role,
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber || '',
      password: '', // Keep password empty unless changing
      status: user.status
    });
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Mobile Validation (Max 10 digits)
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile Number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = 'Mobile number must be exactly 10 digits';
    }

    if (!editingUser && !formData.password.trim()) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setIsSubmitting(true);
      const url = editingUser ? `/api/users/${editingUser._id || editingUser.id}` : '/api/users';
      const method = editingUser ? 'PUT' : 'POST';

      // Only send password if it's provided (for edit)
      const dataToSend = { ...formData };
      if (editingUser && !dataToSend.password) {
        delete dataToSend.password;
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${editingUser ? 'update' : 'create'} user`);
      }

      toast.success(`User ${editingUser ? 'updated' : 'created'} successfully!`);
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    const deleteToast = toast.loading('Deleting user...');
    try {
      const response = await fetch(`/api/users/${userToDelete}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      
      toast.success('User deleted successfully', { id: deleteToast });
      setUsers(users.filter(u => (u._id || u.id) !== userToDelete));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      toast.error(err.message, { id: deleteToast });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Active Team Section */}
      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md overflow-hidden shadow-xl backdrop-blur-sm">
        <div className="p-8 border-b border-zinc-100 dark:border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-rose-500/10 rounded-md">
              <Users className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Active Team</h2>
              <p className="text-zinc-500 dark:text-white/60 text-xl font-bold uppercase tracking-wider">Manage your organization's users and roles</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-zinc-950 dark:text-white bg-zinc-100 dark:bg-white/5 px-3 py-1 rounded-full">Total: {users.length}</span>
            <button
              onClick={openCreateModal}
              className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xl rounded-md transition-all duration-300 shadow-lg shadow-rose-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
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
          <table className="w-full text-left border-collapse premium-table">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-white/5 text-zinc-950 dark:text-white text-base font-black uppercase tracking-[0.2em]">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5 text-xl font-medium">
              {!loading && users.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-8 py-10 text-center text-zinc-500 dark:text-white font-bold">
                    No users found. Create one to get started!
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user._id || user.id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-white/10 dark:to-white/5 flex items-center justify-center font-black text-zinc-950 dark:text-white group-hover:scale-110 transition-transform uppercase text-xl shadow-sm border border-white/5">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-black text-zinc-900 dark:text-white group-hover:text-rose-500 transition-colors text-xl">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-lg text-zinc-500 dark:text-white font-bold flex items-center">
                      <Mail className="w-4 h-4 mr-2 opacity-50" /> {user.email}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-lg text-zinc-500 dark:text-white font-bold flex items-center">
                      <Smartphone className="w-4 h-4 mr-2 opacity-50" /> {user.mobileNumber || 'N/A'}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-4 py-1 rounded-md text-sm font-black uppercase tracking-wider border ${
                      user.role === 'Admin' 
                        ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20' 
                        : 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50' : 'bg-zinc-400'}`}></div>
                      <span className="text-zinc-950 dark:text-zinc-300 font-black uppercase tracking-wider text-base">{user.status}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => openEditModal(user)}
                        className="p-2.5 bg-zinc-100 dark:bg-white/5 hover:bg-blue-500/10 text-zinc-500 dark:text-white hover:text-blue-500 rounded-md transition-all border border-zinc-200 dark:border-white/5"
                        title="Edit User"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setUserToDelete(user._id || user.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2.5 bg-zinc-100 dark:bg-white/5 hover:bg-rose-500/10 text-zinc-500 dark:text-white hover:text-rose-500 rounded-md transition-all border border-zinc-200 dark:border-white/5"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup for User Management */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)}></div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-md w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl relative z-10 animate-in zoom-in-95 fade-in duration-300 custom-scrollbar">
            <div className="p-6 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-rose-500/10 rounded-md">
                    {editingUser ? <Pencil className="w-6 h-6 text-rose-500" /> : <UserPlus className="w-6 h-6 text-rose-500" />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black">{editingUser ? 'Edit User' : 'Create New User'}</h2>
                    <p className="text-zinc-500 dark:text-white/60 text-xl font-bold uppercase tracking-wider">
                      {editingUser ? `Updating account for ${editingUser.name}` : 'Set up a new team member account'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-md text-zinc-500 dark:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomDropdown
                      label="Select Role"
                      options={['User', 'Admin']}
                      value={formData.role}
                      onChange={(val) => handleInputChange('role', val)}
                      theme="rose"
                    />

                    <div className="space-y-1.5">
                      <label className="block text-xl font-bold text-zinc-950 dark:text-white px-1 uppercase tracking-wider">
                        Full Name <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${fieldErrors.name ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-md p-4 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-xl font-bold`}
                      />
                      {fieldErrors.name && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xl font-bold text-zinc-950 dark:text-white px-1 uppercase tracking-wider">
                        Email Address <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${fieldErrors.email ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-md p-4 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-xl font-bold`}
                      />
                      {fieldErrors.email && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xl font-bold text-zinc-950 dark:text-white px-1 uppercase tracking-wider">
                        Mobile Number <span className="text-rose-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter 10-digit mobile no"
                        value={formData.mobileNumber}
                        maxLength={10}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          handleInputChange('mobileNumber', val);
                        }}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${fieldErrors.mobileNumber ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-md p-4 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-xl font-bold`}
                      />
                      {fieldErrors.mobileNumber && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.mobileNumber}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xl font-bold text-zinc-950 dark:text-white px-1 uppercase tracking-wider">
                        {editingUser ? 'New Password (Optional)' : 'Password'} <span className={editingUser ? '' : 'text-rose-500 ml-1'}>{editingUser ? '' : '*'}</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder={editingUser ? "Leave blank to keep current" : "Enter password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full bg-zinc-50 dark:bg-black/40 border ${fieldErrors.password ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-md p-4 focus:outline-none focus:border-rose-500 transition-colors dark:text-white text-xl font-bold`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-white hover:text-rose-500 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {fieldErrors.password && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.password}</p>}
                    </div>

                    <CustomDropdown
                      label="Account Status"
                      options={['Active', 'Inactive', 'Blocked']}
                      value={formData.status}
                      onChange={(val) => handleInputChange('status', val)}
                      theme="rose"
                    />
                  </div>
                </div>

                {editingUser && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-md flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-base font-black text-amber-500 uppercase tracking-wider leading-tight">
                      Editing this user will update their access immediately.
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-zinc-100 dark:border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 rounded-md border border-zinc-200 dark:border-white/10 text-zinc-950 dark:text-white font-black text-xl hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors uppercase tracking-widest"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-3 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xl rounded-md transition-all duration-300 shadow-lg shadow-rose-500/25 transform hover:scale-[1.02] active:scale-[0.98] flex items-center uppercase tracking-widest"
                  >
                    {isSubmitting && <Loader2 className="w-5 h-5 mr-3 animate-spin" />}
                    {isSubmitting ? (editingUser ? 'Updating...' : 'Creating...') : (editingUser ? 'Save Changes' : 'Create User')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsDeleteModalOpen(false)}></div>
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-md w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 fade-in duration-300 p-8 text-center">
            <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-rose-500" />
            </div>
            
            <h2 className="text-3xl font-black mb-2">Are you sure?</h2>
            <p className="text-zinc-500 dark:text-white/60 text-xl font-bold uppercase tracking-wider mb-8">
              This action will permanently delete this user account. This cannot be undone.
            </p>
            
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleDeleteUser}
                className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-black text-xl rounded-md transition-all shadow-lg shadow-rose-500/25 uppercase tracking-widest"
              >
                Yes, Delete User
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-4 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-950 dark:text-white font-black text-xl rounded-md transition-all uppercase tracking-widest"
              >
                No, Keep User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
