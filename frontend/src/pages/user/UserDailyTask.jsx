import React, { useState } from 'react';
import { User, Phone, ClipboardCheck, MessageSquare, Send, CheckCircle2, Loader2, UserCircle } from 'lucide-react';
import CustomDropdown from '../../components/CustomDropdown';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const UserDailyTask = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    contactName: '',
    contactNumber: '',
    status: 'Good',
    remarks: '',
    nextFollowUpDate: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      // For now, we use a default user name since auth isn't fully implemented
      const submissionData = { ...formData, userName: 'User Agent' };
      const response = await fetch('http://localhost:5000/api/worklogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) throw new Error('Failed to submit task');

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ contactName: '', contactNumber: '', status: 'Good', remarks: '', nextFollowUpDate: null });
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-12 text-center shadow-xl backdrop-blur-md">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black text-emerald-500 mb-3">Submission Successful!</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">Daily task recorded successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        <div className="flex items-center space-x-3 mb-8">
           <div className="p-2.5 bg-blue-500/10 rounded-xl">
              <ClipboardCheck className="w-6 h-6 text-blue-500" />
           </div>
           <div>
              <h2 className="text-xl font-black">Daily Work Submission</h2>
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Fill in the details of your visit</p>
           </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-white flex items-center px-0.5 uppercase tracking-wider">
                Contact User Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Enter name"
                  className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-xl pl-4 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm font-semibold shadow-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-white flex items-center px-0.5 uppercase tracking-wider">
                Contact Number
              </label>
              <input
                type="tel"
                required
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="Enter number"
                className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm font-semibold shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-white flex items-center px-0.5 uppercase tracking-wider">
                Next Follow-up Date
              </label>
              <DatePicker
                selected={formData.nextFollowUpDate}
                onChange={(date) => setFormData({ ...formData, nextFollowUpDate: date })}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-sm font-semibold shadow-sm"
              />
            </div>
            <CustomDropdown
              label="Status"
              options={['Good', 'Medium', 'Bad']}
              value={formData.status}
              onChange={(val) => setFormData({ ...formData, status: val })}
              theme="blue"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-white flex items-center px-0.5 uppercase tracking-wider">
              Remarks
            </label>
            <textarea
              rows="3"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="Describe the interaction..."
              className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none dark:text-white text-sm font-semibold shadow-sm"
            ></textarea>
          </div>

          {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] mt-6"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
            {isSubmitting ? 'Submitting...' : 'Submit Daily Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDailyTask;

