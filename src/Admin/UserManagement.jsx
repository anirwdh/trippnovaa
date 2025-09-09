import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from '../Components/AdminLogin';
import AdminHeader from '../Components/AdminHeader';

function UserManagement() {
  const navigate = useNavigate();
  const { isAdminLoggedIn, isInitialized } = useAdminAuth();
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'Aniruddh Singh',
      email: 'aniruddhsingh9397@gmail.com',
      mobile: '+91 9876543210',
      status: 'active',
      joinDate: '2024-01-15',
      bookings: 5,
      inquiries: 3,
      wallet: 2500,
      points: 1250,
      isBlacklisted: false
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      mobile: '+91 8765432109',
      status: 'active',
      joinDate: '2024-02-20',
      bookings: 3,
      inquiries: 2,
      wallet: 1800,
      points: 900,
      isBlacklisted: false
    },
    {
      id: 3,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      mobile: '+91 7654321098',
      status: 'suspended',
      joinDate: '2024-01-10',
      bookings: 1,
      inquiries: 5,
      wallet: 500,
      points: 250,
      isBlacklisted: true
    },
    {
      id: 4,
      name: 'Sneha Patel',
      email: 'sneha.patel@email.com',
      mobile: '+91 6543210987',
      status: 'active',
      joinDate: '2024-03-05',
      bookings: 8,
      inquiries: 1,
      wallet: 4200,
      points: 2100,
      isBlacklisted: false
    }
  ];

  // Mock booking history
  const bookingHistory = [
    {
      id: 1,
      userId: 1,
      userName: 'Aniruddh Singh',
      packageName: 'Manali Adventure',
      travelDate: '2024-06-15',
      bookingDate: '2024-05-20',
      amount: 25000,
      status: 'confirmed',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      userId: 1,
      userName: 'Aniruddh Singh',
      packageName: 'Kashmir Valley',
      travelDate: '2024-07-10',
      bookingDate: '2024-06-01',
      amount: 35000,
      status: 'pending',
      paymentStatus: 'pending'
    }
  ];

  // Mock inquiry history
  const inquiryHistory = [
    {
      id: 1,
      userId: 1,
      userName: 'Aniruddh Singh',
      subject: 'Package Inquiry',
      message: 'I would like to know more about the Manali package...',
      date: '2024-05-15',
      status: 'replied'
    },
    {
      id: 2,
      userId: 1,
      userName: 'Aniruddh Singh',
      subject: 'Payment Query',
      message: 'I have a question about the payment options...',
      date: '2024-05-10',
      status: 'pending'
    }
  ];

  // Handle login close
  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  // Show login modal only if not logged in and context is initialized
  useEffect(() => {
    if (isInitialized && !isAdminLoggedIn) {
      setShowLoginModal(true);
    } else if (isAdminLoggedIn) {
      setShowLoginModal(false);
    }
  }, [isAdminLoggedIn, isInitialized]);

  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.mobile.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleBlacklist = (userId) => {
    // In real app, this would update the database
    console.log(`Toggling blacklist for user ${userId}`);
  };

  const suspendUser = (userId) => {
    // In real app, this would update the database
    console.log(`Suspending user ${userId}`);
  };

  return (
    <>
      {/* Show Admin Login Modal if not logged in */}
      {showLoginModal && (
        <AdminLogin 
          isOpen={showLoginModal} 
          onClose={handleLoginClose}
        />
      )}

      {/* Show User Management Dashboard after successful login */}
      {isAdminLoggedIn && (
        <AdminHeader>
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="blacklisted">Blacklisted</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-4 sm:mb-6 lg:mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto space-x-2 sm:space-x-4 lg:space-x-8 px-3 sm:px-4 lg:px-6">
                  {[
                    { id: 'users', label: 'All Users', icon: '👥' },
                    { id: 'bookings', label: 'Bookings', icon: '🧳' },
                    { id: 'inquiries', label: 'Inquiries', icon: '📧' },
                    { id: 'wallet', label: 'Wallet', icon: '💰' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 sm:py-3 lg:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-1 sm:mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-3 sm:p-4 lg:p-6">
                {activeTab === 'users' && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Contact</th>
                          <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Stats</th>
                          <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Wallet</th>
                          <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                                                    <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <span className="text-white font-semibold text-xs sm:text-sm">
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-2 sm:ml-4 min-w-0 flex-1">
                              <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500">Joined {user.joinDate}</div>
                            </div>
                          </div>
                        </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                              <div className="text-xs sm:text-sm text-gray-900">{user.email}</div>
                              <div className="text-xs sm:text-sm text-gray-500">{user.mobile}</div>
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                              <div className="text-xs sm:text-sm text-gray-900">
                                <div>Bookings: {user.bookings}</div>
                                <div>Inquiries: {user.inquiries}</div>
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                              <div className="text-xs sm:text-sm text-gray-900">
                                <div>₹{user.wallet}</div>
                                <div className="text-purple-600">{user.points} pts</div>
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  user.status === 'active' ? 'bg-green-100 text-green-800' :
                                  user.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {user.status}
                                </span>
                                {user.isBlacklisted && (
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                    Blacklisted
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                              <div className="flex flex-col gap-1 sm:gap-2">
                                <button
                                  onClick={() => toggleBlacklist(user.id)}
                                  className={`px-2 sm:px-3 py-1 rounded text-xs font-medium ${
                                    user.isBlacklisted
                                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                                  }`}
                                >
                                  {user.isBlacklisted ? 'Unblacklist' : 'Blacklist'}
                                </button>
                                <button
                                  onClick={() => suspendUser(user.id)}
                                  className="px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium hover:bg-yellow-200"
                                >
                                  Suspend
                                </button>
                                <button className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium hover:bg-blue-200">
                                  View Details
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bookingHistory.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{booking.packageName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{booking.travelDate}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">₹{booking.amount}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'inquiries' && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {inquiryHistory.map((inquiry) => (
                          <tr key={inquiry.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{inquiry.userName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{inquiry.subject}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs truncate">{inquiry.message}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{inquiry.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                inquiry.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {inquiry.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium hover:bg-blue-200">
                                Reply
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'wallet' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {users.map((user) => (
                      <div key={user.id} className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 border border-gray-200">
                        <div className="flex items-center mb-3 sm:mb-4">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-semibold text-xs sm:text-sm lg:text-lg">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-2 sm:ml-3 lg:ml-4">
                            <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">{user.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                            <span className="text-xs sm:text-sm font-medium text-gray-700">Wallet Balance</span>
                            <span className="text-sm sm:text-base lg:text-lg font-bold text-green-600">₹{user.wallet}</span>
                          </div>
                          <div className="flex justify-between items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                            <span className="text-xs sm:text-sm font-medium text-gray-700">Points</span>
                            <span className="text-sm sm:text-base lg:text-lg font-bold text-purple-600">{user.points} pts</span>
                          </div>
                          <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                            <span className="text-xs sm:text-sm font-medium text-gray-700">Total Bookings</span>
                            <span className="text-sm sm:text-base lg:text-lg font-bold text-blue-600">{user.bookings}</span>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <button className="flex-1 px-2 sm:px-3 py-2 bg-green-100 text-green-800 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-200">
                            Add Funds
                          </button>
                          <button className="flex-1 px-2 sm:px-3 py-2 bg-purple-100 text-purple-800 rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-200">
                            Add Points
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AdminHeader>
      )}
    </>
  );
}

export default UserManagement; 