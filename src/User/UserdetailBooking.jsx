import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import addImg from '../assets/Images/add.jpg';
import manaliImg from '../assets/Images/Manali.jpg';
import kashmirImg from '../assets/Images/kashmir.jpg';
import goaImg from '../assets/Images/Goa.jpg';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Login from '../Components/Login';
import CreateNew from '../Components/CreateNew';

function UserdetailBooking() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for trip data
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState('August, 2025');
  const [travelers, setTravelers] = useState(2);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAvailableDatesModal, setShowAvailableDatesModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: ''
  });



  // Dynamic gallery images from backend
  const getGalleryImages = () => {
    if (trip?.gallery && trip.gallery.length > 0) {
      return trip.gallery.map((image, index) => ({
        src: image,
        alt: `${trip.title} Gallery ${index + 1}`
      }));
    }
    // Fallback to static images if no gallery from backend
    return [
      { src: addImg, alt: "Mon Chéri Cruise" },
      { src: manaliImg, alt: "Cruise in Bay" },
      { src: kashmirImg, alt: "Cruise Cabin" },
      { src: goaImg, alt: "Goa Beach" }
    ];
  };
  
  const galleryImages = getGalleryImages();

  // Price calculation
  const basePricePerAdult = trip?.price || 16036.10; // Base price per adult from trip data
  const totalPrice = basePricePerAdult * travelers;

  // Get current date and time for display
  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      date: now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  // Parse destination to get pickup and drop locations
  const getPickupAndDrop = () => {
    if (!trip?.destination) return { pickup: '', drop: '' };
    
    const destinations = trip.destination.split(',').map(d => d.trim());
    if (destinations.length >= 2) {
      return {
        pickup: destinations[0],
        drop: destinations[1]
      };
    }
    return {
      pickup: destinations[0] || '',
      drop: destinations[0] || ''
    };
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Booking form submitted!');
    console.log('Form data:', bookingForm);
    console.log('Trip ID:', trip?._id);
    
    // Check if user is logged in - use the correct token key
    const token = localStorage.getItem('tripNovaAuthToken');
    if (!token) {
      setBookingError('Please login to book a trip');
      setShowLoginModal(true);
      return;
    }
    
    console.log('User is logged in, token found:', token.substring(0, 20) + '...');
    
    // Validate form
    if (!bookingForm.firstName || !bookingForm.lastName || !bookingForm.email || !bookingForm.mobileNumber) {
      setBookingError('Please fill in all required fields');
      return;
    }
    
    // Validate trip ID
    if (!trip?._id) {
      setBookingError('Trip information is missing. Please refresh the page.');
      return;
    }

    setIsBookingSubmitting(true);
    setBookingError(null);

    try {
      console.log('Token from localStorage:', token);
      console.log('Token length:', token ? token.length : 0);
      
      const bookingData = {
        tripId: trip._id,
        firstName: bookingForm.firstName,
        lastName: bookingForm.lastName,
        email: bookingForm.email,
        mobileNumber: bookingForm.mobileNumber
      };

      console.log('Sending booking data:', bookingData);
      console.log('Request headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      const response = await fetch('https://tripnova-backend.onrender.com/api/user/trip/book-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok && result.success) {
        setBookingSuccess(true);
        // Reset form
        setBookingForm({
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: ''
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowBookingModal(false);
          setBookingSuccess(false);
        }, 2000);
      } else {
        // Handle specific error cases
        if (response.status === 401) {
          setBookingError('Session expired. Please login again.');
          // Clear token and redirect to login
          localStorage.removeItem('tripNovaAuthToken');
          localStorage.removeItem('tripNovaAuth');
        } else if (response.status === 403) {
          setBookingError('Access denied. Please check your permissions.');
        } else {
          setBookingError(result.message || 'Booking failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Booking error:', error);
      setBookingError('Network error. Please check your connection and try again.');
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'itinerary', label: 'Itinerary' }
  ];



  // Fetch trip details from API
  const fetchTripDetails = async (tripId) => {
    if (!tripId) {
      setError('No trip ID provided');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('tripNovaAuthToken');
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add Authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`https://tripnova-backend.onrender.com/api/trips/get-trip-details/${tripId}`, {
        method: 'GET',
        headers: headers,
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Trip details fetched successfully:', result.data);
        setTrip(result.data);
      } else {
        console.error('Failed to fetch trip details:', result.message);
        setError(result.message || 'Failed to fetch trip details');
      }
    } catch (error) {
      console.error('Error fetching trip details:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Console log authentication state and token
  useEffect(() => {
    console.log('UserdetailBooking: Authentication state:', { isAuthenticated, user });
    
    // Get token from localStorage
    const token = localStorage.getItem('tripNovaAuthToken');
    console.log('UserdetailBooking: Stored token:', token);
    
    // Get full auth data from localStorage
    const authData = localStorage.getItem('tripNovaAuth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        console.log('UserdetailBooking: Full auth data from localStorage:', parsedAuth);
      } catch (error) {
        console.error('UserdetailBooking: Error parsing auth data:', error);
      }
    }
  }, [isAuthenticated, user]);

  // Fetch trip details on component mount
  useEffect(() => {
    // Get trip ID from location state or URL params
    const tripId = location.state?.trip?._id || location.pathname.split('/').pop();
    console.log('Trip ID:', tripId);
    
    if (tripId) {
      fetchTripDetails(tripId);
    } else {
      setError('No trip ID found');
      setIsLoading(false);
    }
  }, [location]);

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onLoginClick={() => setShowLoginModal(true)}
          onSignupClick={() => setShowSignupModal(true)}
        />
        <div className="pt-16 sm:pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div className="text-lg text-gray-600">Loading trip details...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onLoginClick={() => setShowLoginModal(true)}
          onSignupClick={() => setShowSignupModal(true)}
        />
        <div className="pt-16 sm:pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-4">Error: {error}</div>
            <button 
              onClick={() => {
                const tripId = location.state?.trip?._id || location.pathname.split('/').pop();
                if (tripId) fetchTripDetails(tripId);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!trip) {
    return (
      <div className="min-h-screen bg-white">
        <Header 
          onLoginClick={() => setShowLoginModal(true)}
          onSignupClick={() => setShowSignupModal(true)}
        />
        <div className="pt-16 sm:pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-lg text-gray-600 mb-4">Trip not found</div>
            <button 
              onClick={() => navigate('/userexplore')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onSignupClick={() => setShowSignupModal(true)}
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
                  {trip.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍 {trip.destination}</span>
                  <span>•</span>
                  <span>⏱️ {trip.duration}</span>
                  {trip.tripType && (
                    <>
                      <span>•</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {trip.tripType}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-3 sm:space-x-4">
                <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 text-xs sm:text-sm md:text-base">
                
                 
                </button>
                <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-red-600 text-xs sm:text-sm md:text-base">
                
                
                </button>
              </div>
            </div>

            {/* Rating and Recommendations */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
              
              <span className="text-xs sm:text-sm md:text-base text-gray-600">(Premium Package)</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs sm:text-sm md:text-base font-semibold text-green-600">Recommended by 99% of travellers</span>
                
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="col-span-1 sm:col-span-2 relative">
                <img 
                  src={trip.coverImage || addImg} 
                  alt={trip.title} 
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(trip.coverImage || addImg, trip.title, 0)}
                />
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{trip.gallery?.length || 0}</span>
                </div>
                {trip.trending && (
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    🔥 Trending
                </div>
                )}
                {trip.hiddenGem && (
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    💎 Hidden Gem
                  </div>
                )}
              </div>
              <div className="space-y-3 sm:space-y-4">
                {trip.gallery && trip.gallery.length > 0 ? (
                  trip.gallery.slice(0, 3).map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${trip.title} Gallery ${index + 1}`} 
                      className="w-full h-24 sm:h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => handleImageClick(image, `${trip.title} Gallery ${index + 1}`, index + 1)}
                    />
                  ))
                ) : (
                  <>
                <img 
                  src={manaliImg} 
                      alt="Trip Gallery 1" 
                  className="w-full h-24 sm:h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => handleImageClick(manaliImg, "Trip Gallery 1", 1)}
                />
                <img 
                  src={kashmirImg} 
                      alt="Trip Gallery 2" 
                  className="w-full h-24 sm:h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => handleImageClick(kashmirImg, "Trip Gallery 2", 2)}
                />
                  </>
                )}
                {trip.gallery && trip.gallery.length > 3 && (
                  <div className="relative">
                    <img 
                      src={trip.gallery[3]} 
                      alt={`${trip.title} Gallery 4`} 
                      className="w-full h-24 sm:h-36 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => handleImageClick(trip.gallery[3], `${trip.title} Gallery 4`, 4)}
                    />
                    {trip.gallery.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg cursor-pointer"
                           onClick={() => handleImageClick(trip.gallery[4], `${trip.title} Gallery 5`, 5)}>
                        <span className="text-white text-lg font-semibold">+{trip.gallery.length - 4} more</span>
                      </div>
                    )}
                  </div>
                )}
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
                    {trip.description || `Experience the amazing ${trip.title} with our carefully curated package. This ${trip.duration} journey to ${trip.destination} offers unforgettable memories and incredible experiences.`}
                  </p>
                  
                  {/* Trip Highlights */}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Trip Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-gray-700">📍 {trip.destination}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-gray-700">⏱️ {trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <span className="text-gray-700">👥 Max {trip.maxGroupSize || 20} people</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                        </div>
                        <span className="text-gray-700">💰 From ₹{trip.price?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
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
                            {trip.inclusions?.included && trip.inclusions.included.length > 0 ? (
                              trip.inclusions.included.map((item, index) => (
                                <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>{item}</span>
                            </li>
                              ))
                            ) : (
                              <>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>Accommodation as per itinerary</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>Meals as per itinerary</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>Transportation</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>Guide services</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span>All activities</span>
                            </li>
                              </>
                            )}
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
                            {trip.inclusions?.notIncluded && trip.inclusions.notIncluded.length > 0 ? (
                              trip.inclusions.notIncluded.map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>{item}</span>
                                </li>
                              ))
                            ) : (
                              <>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>Personal expenses</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>Travel insurance</span>
                            </li>
                            <li className="flex items-start">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>Tips and gratuities</span>
                            </li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Trip Information */}
                      <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                          <h4 className="font-semibold text-gray-900">Trip Information</h4>
                        </div>
                        <div className="p-4 space-y-4">
                          {/* Travel Mode */}
                          {trip.travelMode && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                              </svg>
                            </div>
                              <div>
                                <div className="text-sm text-gray-500">Travel Mode</div>
                                <div className="font-medium text-gray-900">{trip.travelMode}</div>
                            </div>
                            </div>
                          )}

                          {/* Theme */}
                          {trip.theme && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                            </div>
                              <div>
                                <div className="text-sm text-gray-500">Theme</div>
                                <div className="font-medium text-gray-900 capitalize">{trip.theme}</div>
                            </div>
                          </div>
                          )}

                                                    {/* Pickup Location */}
                          {getPickupAndDrop().pickup && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Pickup Location</div>
                                <div className="font-medium text-gray-900">{getPickupAndDrop().pickup}</div>
                              </div>
                            </div>
                          )}

                          {/* Drop Location */}
                          {getPickupAndDrop().drop && getPickupAndDrop().drop !== getPickupAndDrop().pickup && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Drop Location</div>
                                <div className="font-medium text-gray-900">{getPickupAndDrop().drop}</div>
                              </div>
                            </div>
                          )}

                          {/* Departure Location (if different from pickup) */}
                          {trip.departureLocation && trip.departureLocation !== getPickupAndDrop().pickup && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Departure Location</div>
                                <div className="font-medium text-gray-900">{trip.departureLocation}</div>
                              </div>
                            </div>
                          )}

                          {/* Trip Dates */}
                          {(trip.startDate || trip.endDate) && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                              <div>
                                <div className="text-sm text-gray-500">Trip Dates</div>
                                <div className="font-medium text-gray-900">
                                  {trip.startDate && new Date(trip.startDate).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                  {trip.startDate && trip.endDate && ' - '}
                                  {trip.endDate && new Date(trip.endDate).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                          </div>
                              </div>
                            </div>
                          )}

                          {/* Available Dates */}
                          {trip.availableDates && trip.availableDates.length > 0 && (
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                              <div className="flex-1">
                                <div className="text-sm text-gray-500 mb-2">Available Dates</div>
                                <div className="grid grid-cols-1 gap-2">
                                  {trip.availableDates.map((date, index) => (
                                    <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                                      {new Date(date).toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      })}
                          </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Booking Deadline */}
                          {trip.bookingDeadline && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                          </div>
                              <div>
                                <div className="text-sm text-gray-500">Booking Deadline</div>
                                <div className="font-medium text-gray-900">
                                  {new Date(trip.bookingDeadline).toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Terms apply */}
                      

                      {/* Have booking questions */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Have booking questions?</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-gray-700">+91 6263 077 211 </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="text-gray-700"> team@trippnova.com</span>
                          </div>
                        </div>
                      </div>

                      {/* Accessibility */}
                     
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
                        {trip.itinerary && trip.itinerary.length > 0 ? (
                          trip.itinerary.map((day, index) => (
                          <button
                              key={day._id || day.day || index}
                            className={`w-full text-left p-3 rounded-lg transition-all ${
                              index === 0 
                                ? 'bg-red-600 text-white font-semibold' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">DAY-{day.day}</span>
                              {index > 0 && (
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </div>
                          </button>
                          ))
                        ) : (
                          <div className="text-center py-4">
                            <div className="text-gray-500 text-sm">No itinerary available</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                      {/* Location and Duration Header */}
                      <div className="flex gap-3 mb-6">
                        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium">
                          {trip.destination || 'Destination'}
                        </div>
                        <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium">
                          {trip.itinerary && trip.itinerary.length > 0 
                            ? `From: DAY-${trip.itinerary[0].day} to DAY-${trip.itinerary[trip.itinerary.length - 1].day}`
                            : 'Duration: ' + (trip.duration || 'N/A')
                          }
                        </div>
                      </div>

                      {/* Day-wise Itinerary Details */}
                      <div className="space-y-6">
                        {trip.itinerary && trip.itinerary.length > 0 ? (
                          trip.itinerary.map((day, index) => (
                            <div key={day._id || day.day || index} className="border-l-4 border-red-600 pl-6">
                              <div className="text-gray-600 font-medium mb-4">DAY-{day.day}</div>
                              
                              {/* Activities Section */}
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
                                    <div className="text-sm text-gray-500 mb-1">ACTIVITIES</div>
                                    <div className="text-gray-700">
                                      {day.activities}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                          ))
                        ) : (
                          /* Fallback static itinerary when no data */
                          <div className="text-center py-8">
                            <div className="text-gray-500 mb-4">No itinerary available</div>
                            <div className="text-sm text-gray-400">Itinerary details will be updated soon</div>
                                </div>
                        )}
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

            </div>
          </div>

          {/* Right Column - Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 lg:sticky lg:top-6">
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">From ₹{totalPrice.toFixed(2)}</div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600">per adult (price varies by group size)</div>
              </div>

              {/* Available Discounts */}
              {trip?.discounts && trip.discounts.length > 0 && (
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="text-green-600 text-lg">🎉</span>
                      <h3 className="text-sm sm:text-base font-semibold text-green-800">Available Discounts</h3>
                    </div>
                    <div className="space-y-2">
                      {trip.discounts.map((discount, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-600 text-sm">✓</span>
                          <span className="text-sm text-green-700 font-medium">{discount}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-green-600">
                      * Discounts will be applied at checkout
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 sm:space-y-4 lg:space-y-6 mb-4 sm:mb-6 lg:mb-8">
                <button 
                  onClick={() => setShowAvailableDatesModal(true)}
                  className="w-full bg-blue-600 text-white py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base md:text-lg"
                >
                  See Available Dates
                </button>
                
                <div className="border border-gray-300 rounded-lg p-2 sm:p-3 lg:p-4">
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">Date</label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs sm:text-sm md:text-base border-none outline-none"
                  >
                    {trip?.availableDates && trip.availableDates.length > 0 ? (
                      trip.availableDates.map((date, index) => {
                        const availableDate = new Date(date);
                        const monthYear = availableDate.toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        });
                        return (
                          <option key={index} value={monthYear}>
                            {monthYear}
                          </option>
                        );
                      })
                    ) : (
                      <>
                    <option>August, 2025</option>
                    <option>September, 2025</option>
                    <option>October, 2025</option>
                      </>
                    )}
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
                
                {/* Success Message */}
                {bookingSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-800 text-sm">Booking submitted successfully! We will contact you soon.</span>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {bookingError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-red-800 text-sm">{bookingError}</span>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleBookingSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-1 sm:mb-2">First Name*</label>
                        <input
                          type="text"
                          value={bookingForm.firstName}
                          onChange={(e) => setBookingForm({...bookingForm, firstName: e.target.value})}
                          className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base md:text-lg"
                          placeholder="Enter first name"
                          required
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
                          required
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
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                      Mobile Number*
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </label>
                    <input
                      type="tel"
                      value={bookingForm.mobileNumber}
                      onChange={(e) => setBookingForm({...bookingForm, mobileNumber: e.target.value})}
                      className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="Enter mobile number (e.g., +917042456538)"
                      required
                    />
                  </div>
                  
               
                </form>
              </div>
              
              {/* Right Section - Booking Summary */}
              <div className="lg:w-1/2 p-4 sm:p-6 bg-gray-50">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Booking Summary</h3>
                
                <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <img src={trip?.coverImage || addImg} alt={trip?.title || "Trip"} className="w-12 h-9 sm:w-16 sm:h-12 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">{trip?.title || "Trip"}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                        ))}
                        <span className="text-xs text-gray-600 ml-1">5.0 (1,972)</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">by TrippNova Travel Agency</p>
                      <p className="text-xs text-gray-600">{trip?.duration || "Adventure tour"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{getCurrentDateTime().date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{getCurrentDateTime().time}</span>
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
                    <span className="text-xs text-green-700">Free cancellation</span>
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
                      <span className="text-gray-700">+91 6263 077 211</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-blue-600 cursor-pointer">team@trippnova.com</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={handleBookingSubmit}
                  disabled={isBookingSubmitting}
                  className={`w-full py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-lg font-semibold transition-colors text-sm sm:text-base md:text-lg ${
                    isBookingSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {isBookingSubmitting ? 'Booking...' : 'Complete Booking'}
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
      />
      
      {/* Signup Modal */}
      <CreateNew 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onOpenLogin={() => setShowLoginModal(true)}
      />

      {/* Available Dates Modal */}
      {showAvailableDatesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Available Dates & Trip Information</h3>
                <button
                  onClick={() => setShowAvailableDatesModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Available Dates */}
                {trip?.availableDates && trip.availableDates.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Available Dates
                    </h4>
                    <div className="space-y-2">
                      {trip.availableDates.map((date, index) => (
                        <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                          <div className="font-medium text-indigo-900">
                            {new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trip Dates */}
                {(trip?.startDate || trip?.endDate) && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Trip Duration
                    </h4>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <div className="font-medium text-orange-900">
                        {trip.startDate && new Date(trip.startDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                        {trip.startDate && trip.endDate && ' - '}
                        {trip.endDate && new Date(trip.endDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Booking Deadline */}
                {trip?.bookingDeadline && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Booking Deadline
                    </h4>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="font-medium text-red-900">
                        {new Date(trip.bookingDeadline).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-sm text-red-700 mt-1">
                        Book before this date to secure your spot
                      </div>
                    </div>
                  </div>
                )}

                {/* Trip Duration Info */}
                {trip?.duration && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Trip Duration
                    </h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="font-medium text-green-900">{trip.duration}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowAvailableDatesModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
    </div>
  );
}

export default UserdetailBooking;
