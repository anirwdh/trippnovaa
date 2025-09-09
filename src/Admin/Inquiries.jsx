import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLogin from '../Components/AdminLogin';
import AdminHeader from '../Components/AdminHeader';

function Inquiries() {
  const navigate = useNavigate();
  const { isAdminLoggedIn, isInitialized } = useAdminAuth();
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  // Mock inquiry data
  const inquiries = [
    {
      id: 1,
      inquiryId: 'INQ001',
      userName: 'Aniruddh Singh',
      userEmail: 'aniruddhsingh9397@gmail.com',
      userMobile: '+91 9876543210',
      subject: 'Manali Package Inquiry',
      message: 'I would like to know more about the Manali Adventure package. What are the accommodation options and meal plans included? Also, is there any flexibility in the travel dates?',
      date: '2024-05-15',
      time: '14:30',
      status: 'replied',
      priority: 'high',
      category: 'package_inquiry',
      assignedTo: 'Admin',
      replyMessage: 'Thank you for your inquiry about the Manali Adventure package. We offer 3-star and 4-star accommodation options with MAP (Modified American Plan) meal plans. Travel dates can be customized based on availability. Please let us know your preferred dates and we\'ll check availability for you.',
      replyDate: '2024-05-16',
      followUpStatus: 'completed'
    },
    {
      id: 2,
      inquiryId: 'INQ002',
      userName: 'Priya Sharma',
      userEmail: 'priya.sharma@email.com',
      userMobile: '+91 8765432109',
      subject: 'Payment Options Query',
      message: 'What payment methods do you accept? Can I pay in installments? Also, do you provide any discounts for group bookings?',
      date: '2024-05-10',
      time: '11:45',
      status: 'pending',
      priority: 'medium',
      category: 'payment_query',
      assignedTo: 'Admin',
      replyMessage: '',
      replyDate: '',
      followUpStatus: 'pending'
    },
    {
      id: 3,
      inquiryId: 'INQ003',
      userName: 'Rahul Kumar',
      userEmail: 'rahul.kumar@email.com',
      userMobile: '+91 7654321098',
      subject: 'Custom Tour Request',
      message: 'I\'m looking for a custom 7-day tour covering Rajasthan. Can you create a personalized itinerary for 4 people? We have specific requirements for hotels and activities.',
      date: '2024-05-08',
      time: '16:20',
      status: 'in_progress',
      priority: 'high',
      category: 'custom_tour',
      assignedTo: 'Tour Manager',
      replyMessage: 'We\'d be happy to create a custom Rajasthan tour for you. Our team is working on a personalized 7-day itinerary. We\'ll send you the detailed proposal within 24 hours.',
      replyDate: '2024-05-09',
      followUpStatus: 'in_progress'
    },
    {
      id: 4,
      inquiryId: 'INQ004',
      userName: 'Sneha Patel',
      userEmail: 'sneha.patel@email.com',
      userMobile: '+91 6543210987',
      subject: 'Cancellation Policy',
      message: 'I need to cancel my upcoming Kashmir tour. What is your cancellation policy and will I get a refund?',
      date: '2024-05-12',
      time: '09:15',
      status: 'replied',
      priority: 'urgent',
      category: 'cancellation',
      assignedTo: 'Customer Service',
      replyMessage: 'We understand your situation. Our cancellation policy allows for a 70% refund if cancelled 15 days before travel. Since your tour is in 20 days, you\'re eligible for the refund. Please provide your booking ID for processing.',
      replyDate: '2024-05-12',
      followUpStatus: 'completed'
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

  // Filter inquiries based on search and status
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleReply = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowReplyModal(true);
  };

  const sendReply = () => {
    // In real app, this would send the reply and update the database
    console.log(`Sending reply to inquiry ${selectedInquiry.inquiryId}: ${replyMessage}`);
    setShowReplyModal(false);
    setReplyMessage('');
    setSelectedInquiry(null);
  };

  const updateInquiryStatus = (inquiryId, newStatus) => {
    // In real app, this would update the database
    console.log(`Updating inquiry ${inquiryId} status to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'replied': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
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

      {/* Show Inquiry Management Dashboard after successful login */}
      {isAdminLoggedIn && (
        <AdminHeader>
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search inquiries by user name, subject, or message..."
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
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="replied">Replied</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-lg sm:text-xl lg:text-2xl">📧</span>
                  </div>
                  <div className="ml-2 sm:ml-3 lg:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Inquiries</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold text-gray-900">{inquiries.length}</p>
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
                      {inquiries.filter(i => i.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-lg sm:text-xl lg:text-2xl">✅</span>
                  </div>
                  <div className="ml-2 sm:ml-3 lg:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Replied</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold text-green-600">
                      {inquiries.filter(i => i.status === 'replied').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 lg:p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <span className="text-lg sm:text-xl lg:text-2xl">🚨</span>
                  </div>
                  <div className="ml-2 sm:ml-3 lg:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Urgent</p>
                    <p className="text-base sm:text-lg lg:text-2xl font-bold text-red-600">
                      {inquiries.filter(i => i.priority === 'urgent').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiries List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiry Details</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">User Info</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Message</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-2 sm:px-3 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{inquiry.inquiryId}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{inquiry.date} at {inquiry.time}</div>
                          <div className="text-xs sm:text-sm text-gray-500">Category: {inquiry.category}</div>
                          <div className="text-xs sm:text-sm text-gray-500">Assigned: {inquiry.assignedTo}</div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                          <div className="text-xs sm:text-sm font-medium text-gray-900">{inquiry.userName}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{inquiry.userEmail}</div>
                          <div className="text-xs sm:text-sm text-gray-500">{inquiry.userMobile}</div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 hidden md:table-cell">
                          <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">{inquiry.subject}</div>
                          <div className="text-xs sm:text-sm text-gray-500 max-w-xs truncate">{inquiry.message}</div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="space-y-1 sm:space-y-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                              {inquiry.status}
                            </span>
                            <br />
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(inquiry.priority)}`}>
                              {inquiry.priority}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                          <div className="flex flex-col space-y-1 sm:space-y-2">
                            <button
                              onClick={() => handleReply(inquiry)}
                              className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium hover:bg-blue-200"
                            >
                              Reply
                            </button>
                            <select
                              value={inquiry.status}
                              onChange={(e) => updateInquiryStatus(inquiry.inquiryId, e.target.value)}
                              className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="replied">Replied</option>
                            </select>
                            <button className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium hover:bg-green-200">
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

          {/* Reply Modal */}
          {showReplyModal && selectedInquiry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Reply to Inquiry</h2>
                  <button 
                    onClick={() => setShowReplyModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Original Inquiry</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>From:</strong> {selectedInquiry.userName} ({selectedInquiry.userEmail})
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Subject:</strong> {selectedInquiry.subject}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Date:</strong> {selectedInquiry.date} at {selectedInquiry.time}
                      </div>
                      <div className="text-sm text-gray-900 mt-3">
                        <strong>Message:</strong><br />
                        {selectedInquiry.message}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Type your reply here..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowReplyModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={sendReply}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AdminHeader>
      )}
    </>
  );
}

export default Inquiries; 