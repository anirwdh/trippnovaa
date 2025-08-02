import React, { useState } from 'react';
import addImg from '../assets/Images/add.jpg';
import Footer from './Footer';

function Contact() {
  const [formData, setFormData] = useState({
    helpType: '',
    fullName: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your feedback! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
            <div className="text-sm text-gray-500">We're here to help</div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div 
        className="relative w-full h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${addImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{
              fontFamily: 'Playfair Display, serif'
            }}
          >
            We would love to hear from you!
          </h2>
          <p className="text-lg md:text-xl">Your feedback helps us improve your travel experience</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Column - Feedback Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us your feedback</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* How can we help you? */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How can we help you? *
                </label>
                <select
                  name="helpType"
                  value={formData.helpType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="booking-issue">Booking Issue</option>
                  <option value="payment-problem">Payment Problem</option>
                  <option value="itinerary-change">Itinerary Change</option>
                  <option value="refund-request">Refund Request</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number (optional)
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your mobile number"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Please describe your issue or inquiry in detail..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Submit Feedback
              </button>
            </form>
          </div>

          {/* Right Column - Information Cards */}
          <div className="space-y-6">
            
            {/* Emergency Card */}
            <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Report a Travel Emergency</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    We are committed to the safety of everyone using Trippnova. If you're experiencing an emergency during your trip, please contact us immediately.
                  </p>
                  <button className="text-red-600 font-semibold hover:text-red-700 transition-colors">
                    Report here →
                  </button>
                </div>
              </div>
            </div>

            {/* Live Order Issue Card */}
            <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Issue with your live booking?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Click on the 'Support' or 'Booking help' section in your app to connect to our customer support team for immediate assistance.
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Get help now →
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Support Card */}
            <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Need immediate assistance?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Our customer support team is available 24/7 to help you with any travel-related queries or issues.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">24/7 Support</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Live Chat Available</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Quick Response Time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;
