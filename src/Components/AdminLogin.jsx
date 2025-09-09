import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { ADMIN_CONFIG } from '../config/adminConfig';

function AdminLogin({ isOpen, onClose }) {
  const { adminLogin } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check for existing admin token on component mount
  useEffect(() => {
    const existingToken = localStorage.getItem('tripNovaAdminToken');
    console.log('AdminLogin: Component mounted, checking for existing token...');
    console.log('AdminLogin: Existing token found:', existingToken);
    console.log('AdminLogin: Existing token length:', existingToken ? existingToken.length : 0);
    if (existingToken) {
      console.log('AdminLogin: Existing token preview:', existingToken.substring(0, 20) + '...');
    }
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${ADMIN_CONFIG.BASE_URL}${ADMIN_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();
      console.log('Admin Login: Full API response:', data);
      console.log('Admin Login: Response success status:', data.success);
      console.log('Admin Login: Response data:', data.data);

      if (data.success) {
        // Store admin token in localStorage
        const adminToken = data.data.token;
        console.log('Admin Login: Token received from API:', adminToken);
        console.log('Admin Login: Token length:', adminToken ? adminToken.length : 0);
        console.log('Admin Login: Token preview:', adminToken ? adminToken.substring(0, 20) + '...' : 'No token');
        
        localStorage.setItem('tripNovaAdminToken', adminToken);
        
        // Verify token was stored correctly
        const storedToken = localStorage.getItem('tripNovaAdminToken');
        console.log('Admin Login: Token stored in localStorage:', storedToken);
        console.log('Admin Login: Stored token matches received:', storedToken === adminToken);
        
        // Login through context with admin data
        adminLogin({
          email: data.data.admin.email,
          role: data.data.admin.role,
          name: 'Admin User'
        });
        
        onClose(); // Close the modal after successful login
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600 text-sm">Access TripNova Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="admin@trippnova.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter admin password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Authenticating...
              </div>
            ) : (
              'Login to Admin Dashboard'
            )}
          </button>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Admin Info */}
        
      </div>
    </div>
  );
}

export default AdminLogin;
