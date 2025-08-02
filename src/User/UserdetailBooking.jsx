import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import addImg from '../assets/Images/add.jpg';
import manaliImg from '../assets/Images/Manali.jpg';
import kashmirImg from '../assets/Images/kashmir.jpg';
import goaImg from '../assets/Images/Goa.jpg';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Login from '../Components/Login';
import CreateNew from '../Components/CreateNew';

function UserdetailBooking() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState('August, 2025');
  const [travelers, setTravelers] = useState(2);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Aniruddh');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    promoCode: ''
  });

  const handleLoginSuccess = (loginState = true) => {
    if (loginState === false) {
      // Logout
      setIsLoggedIn(false);
    } else {
      // Login
      setIsLoggedIn(true);
      setShowLoginModal(false);
    }
  };

  // Gallery images array
  const galleryImages = [
    { src: addImg, alt: "Mon Chéri Cruise" },
    { src: manaliImg, alt: "Cruise in Bay" },
    { src: kashmirImg, alt: "Cruise Cabin" },
    { src: goaImg, alt: "Goa Beach" }
  ];

  // Price calculation
  const basePricePerAdult = 16036.10; // Base price per adult
  const totalPrice = basePricePerAdult * travelers;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'operator', label: 'Operator' },
    { id: 'reviews', label: 'Reviews' }
  ];

  const handleImageClick = (imageSrc, imageAlt, index = 0) => {
    setSelectedImage({ src: imageSrc, alt: imageAlt });
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
    setSelectedImage(galleryImages[currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1]);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
    setSelectedImage(galleryImages[currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Main Content with proper top margin to account for fixed header */}
      <div className="pt-16 sm:pt-20">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-600 overflow-x-auto">
           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            
            {/* Main Heading and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Manali Adventure
                </h1>
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4">
                <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 text-xs sm:text-sm md:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="hidden sm:inline">Review</span>
                </button>
                <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-red-600 text-xs sm:text-sm md:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>
            </div>

            {/* Rating and Recommendations */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-500 rounded-full"></div>
                ))}
                <span className="ml-2 text-xs sm:text-sm md:text-base font-semibold">5.0</span>
              </div>
              <span className="text-xs sm:text-sm md:text-base text-gray-600">(1,972 reviews)</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs sm:text-sm md:text-base font-semibold text-green-600">Recommended by 99% of travellers</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="col-span-1 sm:col-span-2 relative">
                <img 
                  src={addImg} 
                  alt="Mon Chéri Cruise" 
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(addImg, "Mon Chéri Cruise", 0)}
                />
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>2,680</span>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                  2025
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <img 
                  src={manaliImg} 
                  alt="Cruise in Bay" 
                  className="w-full h-24 sm:h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(manaliImg, "Cruise in Bay", 1)}
                />
                <img 
                  src={kashmirImg} 
                  alt="Cruise Cabin" 
                  className="w-full h-24 sm:h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(kashmirImg, "Cruise Cabin", 2)}
                />
              </div>
            </div>

            {/* Content Tabs */}
            <div className="border-b border-gray-200 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex overflow-x-auto space-x-4 sm:space-x-6 lg:space-x-8 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8 lg:mb-12">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">About</h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                    With a two-day cruise around Ha Long Bay, you not only have time to experience the top attractions in the picturesque bay but also visit caves at Cat Ba Island. Plus, this luxury cruise offers comfortable accommodations, delicious meals, and unforgettable experiences in one of Vietnam's most beautiful natural wonders.
                  </p>
                </div>
              )}
              {activeTab === 'details' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* What's included */}
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                          <h4 className="font-semibold text-gray-900">What's included</h4>
                          <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </div>
                        <div className="p-4">
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Lunch</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Breakfast</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Dinner</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Accommodation as per itinerary</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Overnight accommodation</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>All taxes, fees and handling charges</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Local taxes</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Bottled water</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Meals as per itinerary (B=breakfast, L=lunch, D=dinner)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Guide</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>All activities</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Local guide</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Entry/Admission - Lan Ha Bay</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* What's not included */}
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                          <h4 className="font-semibold text-gray-900">What's not included</h4>
                        </div>
                        <div className="p-4">
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Drinks</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Gratuities</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Limousine transfers from hotel in Hanoi Old Quarter to cruise 20USD/person/one way</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Departure and return */}
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                          <h4 className="font-semibold text-gray-900">Departure and return</h4>
                          <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </div>
                        <div className="p-4 space-y-4">
                          <div>
                            <div className="font-medium text-gray-900 mb-2">Start: Multiple pickup locations offered.</div>
                            <div className="flex items-start gap-2 text-sm text-gray-700">
                              <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>7PG8WX9M+784, WX9M+784 Ha Long, Quảng Ninh, Vietnam</span>
                            </div>
                            <div className="text-sm text-gray-700 mt-2">
                              Please come to our private lounge at No 34, Tuan Chau Marina Station, Quang Ninh Province.
                            </div>
                            <div className="text-sm text-gray-700 mt-1">
                              Contact by: +84 94698299
                            </div>
                          </div>

                          {/* Pickup details */}
                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-center gap-2 mb-3">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                              </svg>
                              <h5 className="font-medium text-gray-900">Pickup details</h5>
                            </div>
                            <div className="text-sm text-gray-700 space-y-2">
                              <p>Luxury sharing van car service: <span className="text-red-600">Excluded</span> - USD 35/pax for round trip</p>
                              <p>Applied in Hanoi Old Quarter Area only. Book 5 days in advance.</p>
                              <p>For self-arrival: Be ready at 11.30 am at No.34 Tuần Châu Marina, Quảng Ninh.</p>
                            </div>
                          </div>

                          {/* Hotel pickup */}
                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <h5 className="font-medium text-gray-900">Hotel pickup offered</h5>
                            </div>
                            <p className="text-sm text-gray-700">During checkout, you can select from the list of included hotels.</p>
                          </div>

                          {/* Port pickup */}
                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <h5 className="font-medium text-gray-900">Port pickup offered</h5>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">During checkout, you can select from the list of included ports.</p>
                            <p className="text-sm text-gray-600">Heritage Westlake Apartment, 677 Đ. Lạc Long Quân, Phú Thượng, Tây Hồ, Hà Nội 100000, Vietnam</p>
                          </div>

                          {/* Additional pickup options */}
                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <h5 className="font-medium text-gray-900">Additional pickup options</h5>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">During checkout, you can select from the list of included pickup points.</p>
                            <p className="text-sm text-gray-600">34 Tuần Châu, Hạ Long, Quảng Ninh, Vietnam</p>
                          </div>

                          {/* End */}
                          <div className="border-t border-gray-200 pt-4">
                            <h5 className="font-medium text-gray-900 mb-2">End</h5>
                            <p className="text-sm text-gray-700">This activity ends back at the meeting point.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Terms apply */}
                      <div className="text-right">
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Terms apply.</a>
                      </div>

                      {/* Have booking questions */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Have booking questions?</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-gray-700">000-800-050-1077</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-gray-700">Chat now</span>
                          </div>
                        </div>
                      </div>

                      {/* Accessibility */}
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                          <h4 className="font-semibold text-gray-900">Accessibility</h4>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'itinerary' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Itinerary</h3>
                  
                  <div className="flex gap-6">
                    {/* Left Sidebar - Day Timeline */}
                    <div className="w-48 flex-shrink-0">
                      <div className="space-y-3">
                        {['DAY-1', 'DAY-2', 'DAY-3', 'DAY-4', 'DAY-5'].map((day, index) => (
                          <button
                            key={day}
                            className={`w-full text-left p-3 rounded-lg transition-all ${
                              index === 0 
                                ? 'bg-red-600 text-white font-semibold' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{day}</span>
                              {index > 0 && (
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                      {/* Location and Duration Header */}
                      <div className="flex gap-3 mb-6">
                        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium">
                          Manali
                        </div>
                        <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium">
                          From: DAY-1 to DAY-3
                        </div>
                      </div>

                      {/* Day-wise Itinerary Details */}
                      <div className="space-y-6">
                        {/* DAY-1 */}
                        <div className="border-l-4 border-red-600 pl-6">
                          <div className="text-gray-600 font-medium mb-4">DAY-1</div>
                          
                          {/* Hotel Section */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">HOTEL</div>
                                <div className="text-sm text-gray-600 mb-2">CHECK IN FOR 3 NIGHTS</div>
                                <div className="flex gap-4">
                                  <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-white font-medium">
                                    IMAGE COMING SOON!
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 mb-1">The Hadimba Retreat Manali or Similar</div>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < 3 ? 'text-red-500 fill-current' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Sightseeing Section */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">SIGHTSEEING</div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                  <span className="text-gray-700">Arrival</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* DAY-2 */}
                        <div className="border-l-4 border-gray-300 pl-6">
                          <div className="text-gray-600 font-medium mb-4">DAY-2</div>
                          
                          {/* Hotel Section */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">HOTEL</div>
                                <div className="flex gap-4">
                                  <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-white font-medium">
                                    IMAGE COMING SOON!
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 mb-1">The Hadimba Retreat Manali or Similar</div>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < 3 ? 'text-red-500 fill-current' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* DAY-3 */}
                        <div className="border-l-4 border-gray-300 pl-6">
                          <div className="text-gray-600 font-medium mb-4">DAY-3</div>
                          
                          {/* Hotel Section */}
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-1">HOTEL</div>
                                <div className="flex gap-4">
                                  <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-white font-medium">
                                    IMAGE COMING SOON!
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900 mb-1">The Hadimba Retreat Manali or Similar</div>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < 3 ? 'text-red-500 fill-current' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Action Buttons */}
                  <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-3">
                    <button className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                    <button className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'operator' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Operator</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Information about the cruise operator, their experience, and commitment to providing excellent service.
                  </p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Read what other travelers have to say about their experience on this cruise.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 lg:sticky lg:top-6">
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">From ₹{totalPrice.toFixed(2)}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">per adult (price varies by group size)</div>
              </div>

              <div className="space-y-3 sm:space-y-4 lg:space-y-6 mb-4 sm:mb-6 lg:mb-8">
                <button className="w-full bg-blue-600 text-white py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base md:text-lg">
                  See Available Dates
                </button>
                
                <div className="border border-gray-300 rounded-lg p-2 sm:p-3 lg:p-4">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">Date</label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs sm:text-sm md:text-base border-none outline-none"
                  >
                    <option>August, 2025</option>
                    <option>September, 2025</option>
                    <option>October, 2025</option>
                  </select>
                </div>

                <div className="border border-gray-300 rounded-lg p-2 sm:p-3 lg:p-4">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">Travelers</label>
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 text-sm sm:text-base md:text-lg"
                    >
                      -
                    </button>
                    <span className="text-base sm:text-lg lg:text-xl font-semibold">{travelers}</span>
                    <button 
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 text-sm sm:text-base md:text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 sm:pt-4 lg:pt-6">
                <div className="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
                  <span className="text-xs sm:text-sm md:text-base text-gray-600">Total Price</span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">₹{totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-green-600 text-white py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base md:text-lg" onClick={() => setShowBookingModal(true)}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 lg:p-6">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] lg:max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 sm:p-6 lg:p-8 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">Complete Your Booking</h2>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col lg:flex-row">
              {/* Left Section - Contact Details */}
              <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8 border-r border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm lg:text-base font-semibold">1</div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">Contact details</h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 lg:mb-8">We'll use this information to send you confirmation and updates about your booking.</p>
                
                                  <form className="space-y-3 sm:space-y-4 lg:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">First Name*</label>
                        <input
                          type="text"
                          value={bookingForm.firstName}
                          onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
                          className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base md:text-lg"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">Last Name*</label>
                        <input
                          type="text"
                          value={bookingForm.lastName}
                          onChange={(e) => setBookingForm({...bookingForm, lastName: e.target.value})}
                          className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base md:text-lg"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      Email*
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      Phone Number*
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </label>
                    <div className="flex">
                      <select className="px-2 sm:px-3 py-2 border border-gray-300 border-r-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                        <option>+91</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                      <input
                        type="tel"
                        value={bookingForm.phoneNumber}
                        onChange={(e) => setBookingForm({...bookingForm, phoneNumber: e.target.value})}
                        className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  
               
                </form>
              </div>
              
              {/* Right Section - Booking Summary */}
              <div className="lg:w-1/2 p-4 sm:p-6 bg-gray-50">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Booking Summary</h3>
                
                <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <img src={addImg} alt="Manali Adventure" className="w-12 h-9 sm:w-16 sm:h-12 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Manali Adventure</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                        ))}
                        <span className="text-xs text-gray-600 ml-1">5.0 (1,972)</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">by Manali Travel Agency</p>
                      <p className="text-xs text-gray-600">3 days adventure tour</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">Saturday, 9 August, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">11:30 am</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travellers:</span>
                      <span className="font-medium">{travelers} Adults</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 sm:mt-3 p-2 bg-green-50 rounded">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-xs text-green-700">Free cancellation + Unlimited rescheduling before 11:30 am on 8 August</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">₹{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">24/7 global support</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-700">000-800-050-1077</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-blue-600 cursor-pointer">Chat now</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={async () => {
                    try {
                      // Prepare booking data
                      const bookingData = {
                        ...bookingForm,
                        travelers,
                        totalPrice,
                        selectedDate,
                        tourName: 'Manali Adventure',
                        bookingDate: new Date().toISOString(),
                        status: 'pending'
                      };

                      // Send booking data to backend
                      const response = await fetch('/api/bookings', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(bookingData)
                      });

                      if (response.ok) {
                        const result = await response.json();
                        console.log('Booking submitted successfully:', result);
                        
                        // Close modal and show success message
                        setShowBookingModal(false);
                        alert('Booking submitted successfully! We will contact you soon.');
                        
                        // Reset form
                        setBookingForm({
                          firstName: '',
                          lastName: '',
                          email: '',
                          phoneNumber: '',
                          promoCode: ''
                        });
                      } else {
                        throw new Error('Failed to submit booking');
                      }
                    } catch (error) {
                      console.error('Error submitting booking:', error);
                      alert('Failed to submit booking. Please try again.');
                    }
                  }}
                  className="w-full bg-green-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image */}
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg">
              <p className="text-sm font-medium">{selectedImage.alt}</p>
              <p className="text-xs opacity-75">{currentImageIndex + 1} of {galleryImages.length}</p>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
              onClick={previousImage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
              onClick={nextImage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Thumbnail Gallery */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setSelectedImage(image);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex 
                      ? 'border-white' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer Component */}
      <Footer />
      
      {/* Login Modal */}
      <Login 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onOpenSignup={() => setShowSignupModal(true)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {/* Signup Modal */}
      <CreateNew 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onOpenLogin={() => setShowLoginModal(true)}
      />
        </div>
    </div>
  );
}

export default UserdetailBooking;
