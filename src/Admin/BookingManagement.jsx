import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from '../Components/AdminLogin';
import AdminHeader from '../Components/AdminHeader';

function BookingManagement() {
  const navigate = useNavigate();
  const { isAdminLoggedIn, isInitialized } = useAdminAuth();
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock booking data
  const bookings = [
    {
      id: 1,
      bookingId: 'BK001',
      userName: 'Aniruddh Singh',
      userEmail: 'aniruddhsingh9397@gmail.com',
      userMobile: '+91 9876543210',
      packageName: 'Manali Adventure',
      packageId: 'PK001',
      travelDate: '2024-06-15',
      bookingDate: '2024-05-20',
      amount: 25000,
      status: 'confirmed',
      paymentStatus: 'paid',
      travelers: 2,
      pickupLocation: 'Delhi Airport',
      dropLocation: 'Chandigarh',
      specialRequests: 'Vegetarian meals preferred'
    },
    {
      id: 2,
      bookingId: 'BK002',
      userName: 'Priya Sharma',
      userEmail: 'priya.sharma@email.com',
      userMobile: '+91 8765432109',
      packageName: 'Kashmir Valley',
      packageId: 'PK002',
      travelDate: '2024-07-10',
      bookingDate: '2024-06-01',
      amount: 35000,
      status: 'pending',
      paymentStatus: 'pending',
      travelers: 3,
      pickupLocation: 'Mumbai Airport',
      dropLocation: 'Srinagar',
      specialRequests: 'Window seat preferred'
    },
    {
      id: 3,
      bookingId: 'BK003',
      userName: 'Rahul Kumar',
      userEmail: 'rahul.kumar@email.com',
      userMobile: '+91 7654321098',
      packageName: 'Goa Beach Holiday',
      packageId: 'PK003',
      travelDate: '2024-08-20',
      bookingDate: '2024-07-15',
      amount: 18000,
      status: 'cancelled',
      paymentStatus: 'refunded',
      travelers: 1,
      pickupLocation: 'Bangalore Airport',
      dropLocation: 'Goa Airport',
      specialRequests: 'None'
    },
    {
      id: 4,
      bookingId: 'BK004',
      userName: 'Sneha Patel',
      userEmail: 'sneha.patel@email.com',
      userMobile: '+91 6543210987',
      packageName: 'Kerala Backwaters',
      packageId: 'PK004',
      travelDate: '2024-09-05',
      bookingDate: '2024-08-10',
      amount: 22000,
      status: 'confirmed',
      paymentStatus: 'paid',
      travelers: 4,
      pickupLocation: 'Chennai Airport',
      dropLocation: 'Kochi Airport',
      specialRequests: 'Houseboat accommodation'
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

  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesPayment = filterPayment === 'all' || booking.paymentStatus === filterPayment;
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'upcoming' && new Date(booking.travelDate) > new Date()) ||
                       (dateFilter === 'past' && new Date(booking.travelDate) < new Date());
    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const updateBookingStatus = (bookingId, newStatus) => {
    // In real app, this would update the database
    console.log(`Updating booking ${bookingId} status to ${newStatus}`);
  };

  const updatePaymentStatus = (bookingId, newPaymentStatus) => {
    // In real app, this would update the database
    console.log(`Updating booking ${bookingId} payment status to ${newPaymentStatus}`);
  };

  const exportToExcel = () => {
    // In real app, this would generate and download Excel file
    console.log('Exporting bookings to Excel...');
  };

  const exportToCSV = () => {
    // In real app, this would generate and download CSV file
    console.log('Exporting bookings to CSV...');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

      {/* Show Booking Management Dashboard after successful login */}
      {isAdminLoggedIn && (
        <AdminHeader>
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
                <div className="sm:col-span-2 lg:col-span-2">
                  <input
                    type="text"
                    placeholder="Search by user name, package, or booking ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="all">All Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <select
                    value={filterPayment}
                    onChange={(e) => setFilterPayment(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="all">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                <div>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="all">All Dates</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-lg sm:text-xl lg:text-2xl">📈</span>
                  </div>
                  <div className="ml-2 sm:ml-3 lg:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">{bookings.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-lg sm:text-xl lg:text-2xl">✅</span>
                  </div>
                  <div className="ml-2 sm:ml-3 lg:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Confirmed</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold text-green-600">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <span className="text-lg sm:text-xl lg:text-2xl">⏳</span>
                  </div>
                  <div className="ml-2 sm:ml-3 lg:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold text-yellow-600">
                      {bookings.filter(b => b.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-lg sm:text-xl lg:text-2xl">💰</span>
                  </div>
                  <div className="ml-2 sm:ml-3 lg:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold text-blue-600">
                      ₹{bookings.reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Details</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">User Info</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Package</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Travel Info</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{booking.bookingId}</div>
                          <div className="text-xs sm:text-sm text-gray-500">Booked: {booking.bookingDate}</div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{booking.userName}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{booking.userEmail}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{booking.userMobile}</div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden md:table-cell">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{booking.packageName}</div>
                          <div className="text-xs sm:text-sm text-gray-500">ID: {booking.packageId}</div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="text-xs sm:text-sm text-gray-900">Travel: {booking.travelDate}</div>
                          <div className="text-xs sm:text-sm text-gray-500">Travelers: {booking.travelers}</div>
                          <div className="text-xs sm:text-sm text-gray-500">Pickup: {booking.pickupLocation}</div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">₹{booking.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="space-y-1 sm:space-y-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                            <br />
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentColor(booking.paymentStatus)}`}>
                              {booking.paymentStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                          <div className="flex flex-col space-y-1 sm:space-y-2">
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.bookingId, e.target.value)}
                              className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <select
                              value={booking.paymentStatus}
                              onChange={(e) => updatePaymentStatus(booking.bookingId, e.target.value)}
                              className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="pending">Payment Pending</option>
                              <option value="paid">Paid</option>
                              <option value="refunded">Refunded</option>
                            </select>
                            <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium hover:bg-blue-200">
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AdminHeader>
      )}
    </>
  );
}

export default BookingManagement; 