import React, { useState } from 'react';
import { User, Phone, ClipboardCheck, MessageSquare, Send, CheckCircle2, Loader2, UserCircle, Calendar } from 'lucide-react';
import CustomDropdown from '../../components/CustomDropdown';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';

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
  const [fieldErrors, setFieldErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manual Validation
    const errors = {};
    if (!formData.contactName.trim()) errors.contactName = 'Contact Name is required';
    if (!formData.contactNumber.trim()) errors.contactNumber = 'Contact Number is required';
    if (!formData.remarks.trim()) errors.remarks = 'Remarks are required';
    if (!formData.status) errors.status = 'Status is required';
    if (!formData.nextFollowUpDate) errors.nextFollowUpDate = 'Follow-up date is required';

    // Mobile Validation (Exactly 10 digits)
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = 'Mobile number must be exactly 10 digits';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error('Please fill all required fields');
      return;
    }

    const taskToast = toast.loading('Submitting your work log...');
    try {
      setIsSubmitting(true);
      setError(null);

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const submissionData = { ...formData, userName: user.name || 'Anonymous User' };

      const response = await fetch('/api/worklogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) throw new Error('Failed to submit task');

      toast.success('Task submitted successfully!', { id: taskToast });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ contactName: '', contactNumber: '', status: 'Good', remarks: '', nextFollowUpDate: null });
      }, 3000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message, { id: taskToast });
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
          <p className="text-zinc-950 dark:text-white text-xl font-medium leading-relaxed">Daily task recorded successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-8 shadow-2xl backdrop-blur-sm relative">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2.5 bg-blue-500/10 rounded-md">
            <ClipboardCheck className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Daily Work Submission</h2>
            <p className="text-zinc-500 dark:text-white/60 text-xl font-medium uppercase tracking-wider">Fill in the details of your visit</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xl font-bold text-zinc-950 dark:text-white flex items-center px- uppercase tracking-wider">
                Contact User Name <span className="text-rose-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Enter name"
                  className={`w-full bg-zinc-50 dark:bg-black/20 border ${fieldErrors.contactName ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-xl font-semibold shadow-sm`}
                />
              </div>
              {fieldErrors.contactName && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.contactName}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xl font-bold text-zinc-950 dark:text-white flex items-center px-0.5 uppercase tracking-wider">
                Contact Number <span className="text-rose-500 ml-1">*</span>
              </label>
              <input
                type="tel"
                value={formData.contactNumber}
                maxLength={10}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  handleInputChange('contactNumber', val);
                }}
                placeholder="Enter 10-digit number"
                className={`w-full bg-zinc-50 dark:bg-black/20 border ${fieldErrors.contactNumber ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-xl font-semibold shadow-sm`}
              />
              {fieldErrors.contactNumber && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.contactNumber}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xl font-bold text-zinc-950 dark:text-white flex items-center px-0.5 uppercase tracking-wider">
                Next Follow-up Date <span className="text-rose-500 ml-1">*</span>
              </label>
              <div className="relative group">
                <DatePicker
                  selected={formData.nextFollowUpDate}
                  onChange={(date) => setFormData({ ...formData, nextFollowUpDate: date })}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  className={`w-full bg-zinc-50 dark:bg-black/20 border ${fieldErrors.nextFollowUpDate ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-md pl-11 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:text-white text-xl font-semibold shadow-sm`}
                  portalId="root-portal"
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-950 dark:text-white/40 group-focus-within:text-blue-500 transition-colors" />
              </div>
              {fieldErrors.nextFollowUpDate && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.nextFollowUpDate}</p>}
            </div>
            <div className="space-y-1.5">
              <CustomDropdown
                label="Status"
                options={['Good', 'Medium', 'Bad']}
                value={formData.status}
                onChange={(val) => handleInputChange('status', val)}
                theme="blue"
                required={true}
              />
              {fieldErrors.status && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.status}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xl font-bold text-zinc-950 dark:text-white flex items-center px-0.5 uppercase tracking-wider">
              Remarks <span className="text-rose-500 ml-1">*</span>
            </label>
            <textarea
              rows="3"
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              placeholder="Describe the interaction..."
              className={`w-full bg-zinc-50 dark:bg-black/20 border ${fieldErrors.remarks ? 'border-rose-500' : 'border-zinc-100 dark:border-white/5'} rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none dark:text-white text-xl font-semibold shadow-sm`}
            ></textarea>
            {fieldErrors.remarks && <p className="text-rose-500 text-base font-bold mt-1 ml-1">{fieldErrors.remarks}</p>}
          </div>

          {error && <p className="text-rose-500 text-xl font-bold text-center">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-4 rounded-md transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed group"
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

