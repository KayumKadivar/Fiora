import React, { useState, useEffect } from 'react';
import { ClipboardCheck, Search, Settings, User, Phone, Package, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import CustomDropdown from '../components/CustomDropdown';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    tileType: 'Ceramic Tiles',
    status: 'Interested / Follow-up',
    remarks: ''
  });

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ customerName: '', customerPhone: '', tileType: 'Ceramic Tiles', status: 'Interested / Follow-up', remarks: '' });
    }, 3000);
  };

  const navItems = [
    { icon: ClipboardCheck, label: "Daily Task", active: true, onClick: () => {} },
    { icon: Search, label: "Search Data", active: false, onClick: () => {} },
    { icon: Settings, label: "Settings", active: false, onClick: () => {} }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex text-zinc-900 dark:text-white transition-colors duration-500 font-sans overflow-hidden">
      
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        logo={ClipboardCheck}
        logoText="Fiora"
        navItems={navItems}
        onLogout={handleLogout}
        theme="blue"
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          title="Daily Work Submission"
          user={{ name: "User Agent", email: "user@fiora.com" }}
          onLogout={handleLogout}
          isDark={isDark}
          toggleTheme={toggleTheme}
          theme="blue"
        />

        <main className="flex-1 p-6 lg:p-10 relative overflow-y-auto bg-slate-50 dark:bg-zinc-950 transition-all duration-300 custom-scrollbar">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
          
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-12 text-center animate-in zoom-in duration-500 shadow-xl backdrop-blur-md">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-emerald-500 mb-3">Submission Successful!</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">Recorded successfully.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 shadow-xl backdrop-blur-sm relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center px-0.5 uppercase tracking-wider">
                        <User className="w-4 h-4 mr-2 text-blue-500" /> Customer Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                        placeholder="Rahul Sharma"
                        className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm font-semibold shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center px-0.5 uppercase tracking-wider">
                        <Phone className="w-4 h-4 mr-2 text-blue-500" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm font-semibold shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomDropdown
                      label="Tile Type"
                      icon={Package}
                      options={['Ceramic Tiles', 'Porcelain Tiles', 'Vitrified Tiles', 'Marble Finish', 'Granite Tiles']}
                      value={formData.tileType}
                      onChange={(val) => setFormData({...formData, tileType: val})}
                      theme="blue"
                    />
                    <CustomDropdown
                      label="Status"
                      icon={ClipboardCheck}
                      options={['Interested / Follow-up', 'Not Interested', 'Order Placed', 'Sample Sent']}
                      value={formData.status}
                      onChange={(val) => setFormData({...formData, status: val})}
                      theme="blue"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center px-0.5 uppercase tracking-wider">
                      <MessageSquare className="w-4 h-4 mr-2 text-blue-500" /> Remarks
                    </label>
                    <textarea
                      rows="4"
                      value={formData.remarks}
                      onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                      placeholder="Describe the interaction..."
                      className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none dark:text-white text-sm font-semibold shadow-sm"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] mt-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Daily Task
                  </button>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
