import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// User Pages
import UserDailyTask from './pages/user/UserDailyTask';
import UserSearch from './pages/user/UserSearch';
import UserSettings from './pages/user/UserSettings';

// Admin Pages
import AdminWorkLogs from './pages/admin/AdminWorkLogs';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* User Portal with Nested Routing */}
        <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDailyTask />} />
          <Route path="search" element={<UserSearch />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>

        {/* Admin Portal with Nested Routing */}
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminWorkLogs />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;