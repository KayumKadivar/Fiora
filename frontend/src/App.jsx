import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import UserDailyTask from './pages/user/UserDailyTask';
import UserSearch from './pages/user/UserSearch';
import UserSettings from './pages/user/UserSettings';
import UserWorkLogs from './pages/user/UserWorkLogs';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWorkLogs from './pages/admin/AdminWorkLogs';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';

import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* User Portal with Nested Routing */}
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="task" element={<UserDailyTask />} />
          <Route path="search" element={<UserSearch />} />
          <Route path="logs" element={<UserWorkLogs />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>

        {/* Admin Portal with Nested Routing */}
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="logs" element={<AdminWorkLogs />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Router>
    </>
  );
};

export default App;