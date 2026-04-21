import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, 
  User, 
  Phone, 
  MessageSquare, 
  Clock, 
  Loader2, 
  Search, 
  Filter, 
  Calendar,
  X,
  UserCheck,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CustomDropdown from '../../components/CustomDropdown';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminWorkLogs = () => {
  const [workLogs, setWorkLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchWorkLogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/worklogs');
      if (!response.ok) throw new Error('Failed to fetch work logs');
      const data = await response.json();
      setWorkLogs(data);
      setFilteredLogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkLogs();
  }, []);

  // Apply Filters
  useEffect(() => {
    let result = [...workLogs];

    // Filter by Search Term (Agent Name or Contact Name)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(log => 
        (log.userName && log.userName.toLowerCase().includes(term)) ||
        (log.contactName && log.contactName.toLowerCase().includes(term)) ||
        (log.contactNumber && log.contactNumber.includes(term))
      );
    }

    // Filter by Status
    if (statusFilter !== 'All') {
      result = result.filter(log => log.status === statusFilter);
    }

    // Filter by Date (Submitted At)
    if (selectedDate) {
      const searchDate = selectedDate.toLocaleDateString();
      result = result.filter(log => 
        new Date(log.createdAt).toLocaleDateString() === searchDate
      );
    }

    setFilteredLogs(result);
  }, [searchTerm, statusFilter, selectedDate, workLogs]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setSelectedDate(null);
  };

  const handleExportExcel = () => {
    const dataToExport = filteredLogs.map(log => ({
      'Agent Name': log.userName,
      'Contact Name': log.contactName,
      'Contact Number': log.contactNumber,
      'Status': log.status,
      'Next Follow-up': log.nextFollowUpDate ? new Date(log.nextFollowUpDate).toLocaleDateString() : 'N/A',
      'Remarks': log.remarks || 'N/A',
      'Submitted At': new Date(log.createdAt).toLocaleString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Work Logs");
    XLSX.writeFile(workbook, `Fiora_WorkLogs_${new Date().toLocaleDateString()}.xlsx`);
    toast.success('Excel report downloaded!');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Fiora Work Logs Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

    const tableColumn = ["Agent", "Contact", "Status", "Follow-up", "Date"];
    const tableRows = filteredLogs.map(log => [
      log.userName,
      log.contactName,
      log.status,
      log.nextFollowUpDate ? new Date(log.nextFollowUpDate).toLocaleDateString() : 'N/A',
      new Date(log.createdAt).toLocaleDateString()
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [79, 70, 229] }
    });

    doc.save(`Fiora_WorkLogs_${new Date().toLocaleDateString()}.pdf`);
    toast.success('PDF report downloaded!');
  };

  const stats = {
    total: filteredLogs.length,
    good: filteredLogs.filter(log => log.status === 'Good').length,
    medium: filteredLogs.filter(log => log.status === 'Medium').length,
    bad: filteredLogs.filter(log => log.status === 'Bad').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-6 shadow-sm backdrop-blur-sm group hover:border-blue-500/50 transition-all">
          <h3 className="text-zinc-500 dark:text-white/60 text-base font-black uppercase tracking-widest mb-2">Total Logs</h3>
          <p className="text-4xl font-black">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-6 shadow-sm backdrop-blur-sm group hover:border-emerald-500/50 transition-all">
          <h3 className="text-zinc-500 dark:text-white/60 text-base font-black uppercase tracking-widest mb-2 text-emerald-500">Good Status</h3>
          <p className="text-4xl font-black text-emerald-500">{stats.good}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-6 shadow-sm backdrop-blur-sm group hover:border-amber-500/50 transition-all">
          <h3 className="text-zinc-500 dark:text-white/60 text-base font-black uppercase tracking-widest mb-2 text-amber-500">Medium Status</h3>
          <p className="text-4xl font-black text-amber-500">{stats.medium}</p>
        </div>
        <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-6 shadow-sm backdrop-blur-sm group hover:border-rose-500/50 transition-all">
          <h3 className="text-zinc-500 dark:text-white/60 text-base font-black uppercase tracking-widest mb-2 text-rose-500">Bad Status</h3>
          <p className="text-4xl font-black text-rose-500">{stats.bad}</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap lg:flex-row lg:items-end gap-6">
          {/* Search */}
          <div className="flex-1 space-y-2">
            <label className="text-base font-black uppercase tracking-widest text-zinc-950 dark:text-white flex items-center px-1">
              <Search className="w-3 h-3 mr-2" /> Search Agent / Contact
            </label>
            <div className="relative group">
              <input 
                type="text"
                placeholder="Search name or number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-white/5 rounded-md p-4 pl-12 focus:outline-none focus:border-blue-500 transition-all dark:text-white text-xl font-bold"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>

          {/* Date Filter */}
          <div className="w-full lg:w-64 space-y-2">
            <label className="text-base font-black uppercase tracking-widest text-zinc-950 dark:text-white flex items-center px-1">
              <Calendar className="w-3 h-3 mr-2" /> Submission Date
            </label>
            <div className="relative group">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Select Date"
                className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-100 dark:border-white/5 rounded-md p-4 pl-12 focus:outline-none focus:border-blue-500 transition-all dark:text-white text-xl font-bold"
                portalId="root-portal"
              />
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-64 space-y-2">
            <CustomDropdown 
              label="Filter Status"
              options={['All', 'Good', 'Medium', 'Bad']}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              theme="blue"
            />
          </div>

          {/* Clear Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={clearFilters}
              className="px-6 py-4 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-950 dark:text-white font-black text-xl rounded-md transition-all flex items-center justify-center space-x-2 border border-zinc-200 dark:border-white/10 uppercase tracking-widest"
              title="Clear Filters"
            >
              <X className="w-5 h-5" />
            </button>

            <button 
              onClick={handleExportExcel}
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xl rounded-md transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 uppercase tracking-widest"
              title="Download Excel"
            >
              <FileSpreadsheet className="w-6 h-6" />
              <span>XLS</span>
            </button>

            <button 
              onClick={handleExportPDF}
              className="px-6 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-xl rounded-md transition-all flex items-center justify-center space-x-2 shadow-lg shadow-rose-500/20 uppercase tracking-widest"
              title="Download PDF"
            >
              <FileText className="w-6 h-6" />
              <span>PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-md overflow-hidden shadow-2xl backdrop-blur-sm relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/20 backdrop-blur-[2px] z-10 flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        )}

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse premium-table">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-white/5 text-zinc-950 dark:text-white text-base font-black uppercase tracking-[0.2em]">
                <th className="p-4">Submitting Agent</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Status</th>
                <th className="p-4">Next Follow-up</th>
                <th className="p-4">Remarks</th>
                <th className="p-4">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5 text-xl font-medium">
              {!loading && filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-zinc-500 dark:text-white font-black uppercase tracking-widest text-2xl">
                    <div className="flex flex-col items-center space-y-4">
                      <Filter className="w-12 h-12 opacity-20" />
                      <span>No logs match your filters</span>
                    </div>
                  </td>
                </tr>
              )}
              {filteredLogs.map((log) => (
                <tr key={log._id} className="hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-2xl font-black text-blue-600 dark:text-blue-400 uppercase border border-blue-500/20">
                        {log.userName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-xl text-zinc-900 dark:text-white">{log.userName}</span>
                        <span className="text-[10px] uppercase tracking-widest text-blue-500 font-black">AGENT</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-black text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors text-xl mb-1">{log.contactName}</div>
                    <div className="text-base text-zinc-500 dark:text-white/60 flex items-center font-bold">
                      <Phone className="w-3 h-3 mr-2 opacity-50" /> {log.contactNumber}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-4 py-1 rounded-md text-base font-black uppercase tracking-wider border ${
                      log.status === 'Good' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' :
                      log.status === 'Medium' ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' :
                        'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20'
                      }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-lg text-zinc-900 dark:text-white font-black flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500 opacity-50" />
                      {log.nextFollowUpDate ? new Date(log.nextFollowUpDate).toLocaleDateString() : 'None'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-lg text-zinc-500 dark:text-white italic max-w-xs truncate" title={log.remarks}>
                      "{log.remarks || 'No remarks provided'}"
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="text-lg text-zinc-950 dark:text-white font-black flex flex-col items-end">
                      <div className="flex items-center text-blue-500">
                        <Clock className="w-3 h-3 mr-1 opacity-50" />
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-[11px] uppercase tracking-tighter opacity-50">
                        {new Date(log.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
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
