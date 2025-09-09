import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';

function AdminHeader({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminUser, adminToken, adminLogout } = useAdminAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/adminlanding',
      category: 'My View'
    },
    {
      id: 'usermanagement',
      label: 'User Management',
      icon: '👥',
      path: '/usermanagement',
      category: 'Admin View'
    },
    {
      id: 'bookingmanagement',
      label: 'Booking Management',
      icon: '🧳',
      path: '/bookingmanagement',
      category: 'Admin View'
    },
    {
      id: 'inquiries',
      label: 'Inquiry Management',
      icon: '📧',
      path: '/inquiries',
      category: 'Admin View'
    },
    {
      id: 'blogupload',
      label: 'Blog Management',
      icon: '📝',
      path: '/blogupload',
      category: 'Admin View'
    },
    {
      id: 'packages',
      label: 'Packages',
      icon: '📦',
      path: '/AgencyPackages',
      category: 'Admin View'
    },
    {
      id: 'addpackage',
      label: 'Add New Package',
      icon: '➕',
      path: '/adminlanding',
      category: 'Admin View',
      special: true
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and page title */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">T</span>
              </div>
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-purple-700">Trippnova</span>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              {navigationItems.find(item => isActive(item.path))?.label || 'Admin Dashboard'}
            </h1>
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Q Search..."
                className="w-48 sm:w-64 px-3 sm:px-4 py-2 pl-8 sm:pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-xs sm:text-sm"
              />
              <svg className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Right side - Notifications and user profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            

            {/* Admin profile */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-gray-900"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-xs sm:text-sm">A</span>
                </div>
                <span className="text-xs sm:text-sm font-medium hidden sm:block">
                  {adminUser?.name || 'Admin'}
                </span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Admin dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                    <div className="font-medium">{adminUser?.name || 'Admin User'}</div>
                    <div className="text-xs">{adminUser?.email || 'admin@trippnova.com'}</div>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      adminLogout();
                      navigate('/loginadmin');
                      setUserDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
              
              
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-3 sm:p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}

export default AdminHeader; 