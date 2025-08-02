import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AdminHeader({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const groupedNavigation = navigationItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 ease-in-out fixed h-full z-30 lg:relative lg:translate-x-0 ${!sidebarOpen ? '-translate-x-48 lg:translate-x-0' : ''}`}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">T</span>
            </div>
            {sidebarOpen && (
              <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-purple-700">Trippnova</span>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
          {Object.entries(groupedNavigation).map(([category, items]) => (
            <div key={category}>
              {sidebarOpen && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                  {category}
                </h3>
              )}
              <div className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    } ${item.special ? 'bg-purple-50 text-purple-600 hover:bg-purple-100' : ''}`}
                  >
                    <span className="text-base sm:text-lg mr-2 sm:mr-3">{item.icon}</span>
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-16'} flex-1 transition-all duration-300 ease-in-out lg:ml-0`}>
        {/* Top Header Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Page title and search */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
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
              {/* Notification icons */}
              <button className="text-gray-500 hover:text-gray-700 p-1 sm:p-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700 p-1 sm:p-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </button>
              <button className="text-gray-500 hover:text-gray-700 p-1 sm:p-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* User profile */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs sm:text-sm">A</span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium hidden sm:block">Admin</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <hr className="my-2" />
                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminHeader; 