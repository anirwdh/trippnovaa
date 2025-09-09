import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '../redux/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import manaliImg from '../assets/Images/Manali.jpg';
import kashmirImg from '../assets/Images/kashmir.jpg';
import keralaImg from '../assets/Images/kerala.jpg';
import goaImg from '../assets/Images/Goa.jpg';
import spitiImg from '../assets/Images/spiti.jpg';
import jaipImg from '../assets/Images/jaip.jpg';
import kedarkanImg from '../assets/Images/kedarkan.jpg';
import himacImg from '../assets/Images/himac.jpg';
import ziroImg from '../assets/Images/ziro.jpg';
import girImg from '../assets/Images/gir.jpeg';
import choptaImg from '../assets/Images/chopta.jpg';
import jawaiImg from '../assets/Images/jawai.jpg';
import addImg from '../assets/Images/add.jpg';
import heroVideo from '../assets/Images/pkkp.mp4';

function UserExplore() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get theme name from navigation state
  const themeName = location.state?.themeName;
  
  // State for trips data
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Console log authentication state and token
  useEffect(() => {
    console.log('UserExplore: Authentication state:', { isAuthenticated, user });
    
    // Get token from localStorage
    const token = localStorage.getItem('tripNovaAuthToken');
    console.log('UserExplore: Stored token:', token);
    
    // Get full auth data from localStorage
    const authData = localStorage.getItem('tripNovaAuth');
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        console.log('UserExplore: Full auth data from localStorage:', parsedAuth);
      } catch (error) {
        console.error('UserExplore: Error parsing auth data:', error);
      }
    }
  }, [isAuthenticated, user]);

  // Fetch trips by theme from API
  const fetchTripsByTheme = async (theme) => {
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
      
      // Use the new API endpoint with theme parameter
      const response = await fetch(`https://tripnova-backend.onrender.com/api/user/filter/get-trips-by-theme/${encodeURIComponent(theme)}`, {
        method: 'GET',
        headers: headers,
      });

      const result = await response.json();
      
      if (result.success) {
        console.log(`Trips fetched successfully for theme "${theme}":`, result.data);
        setTrips(result.data || []);
      } else {
        console.error('Failed to fetch trips:', result.message);
        setError(result.message || 'Failed to fetch trips');
      }
    } catch (error) {
      console.error('Error fetching trips:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch trips on component mount
  useEffect(() => {
    if (themeName) {
      fetchTripsByTheme(themeName);
    } else {
      // Fallback to all trips if no theme is specified
      fetchTripsByTheme('all');
    }
  }, [themeName]);



  const handleCardClick = (trip) => {
    // Navigate to trip details page with trip data
    navigate('/userdetailbooking', { state: { trip } });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header 
        onLoginClick={() => {}} // Empty function since UserExplore doesn't have login modals
        onSignupClick={() => {}} // Empty function since UserExplore doesn't have signup modals
      />

      {/* Breadcrumbs */}
     

      {/* Hero Section with jjj.png Image */}
      <section id="explore-hero-section" className="relative h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl overflow-hidden shadow-xl mx-4 md:mx-8 mt-20 mb-8">
        

        <div className="relative h-full flex items-center px-4 md:px-8">
          {/* Text Content */}
          <div className="text-white p-6 rounded-lg max-w-md z-10">
            <div className="text-sm uppercase tracking-wide mb-2 text-yellow-400">TRIPPNOVA COLLECTIONS</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{themeName || 'All Trips'}</h1>
           
            <div className="text-lg font-semibold">{trips.length} Trips Available</div>
          </div>
        </div>
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            src={heroVideo} 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
         
          
        </div>
      </section>

      {/* Content Cards */}
      <section className="px-4 md:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 mb-4">Loading trips...</div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-lg text-red-600 mb-4">Error: {error}</div>
            <button 
              onClick={() => fetchTripsByTheme(themeName || 'all')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 mb-4">No trips available at the moment</div>
            <button 
              onClick={() => fetchTripsByTheme(themeName || 'all')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trips.map((trip) => (
              <div 
                key={trip._id} 
                className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleCardClick(trip)}
              >
                <div className="relative">
                  <img 
                    src={trip.coverImage || manaliImg} 
                    alt={trip.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium">
                    {trip.tripType || 'TRIP'}
                  </div>
                  <div className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    4.5
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{trip.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{trip.destination}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{trip.duration}</span>
                    <span className="text-lg font-bold text-blue-600">₹{trip.price?.toLocaleString()}</span>
                  </div>
                  {trip.curatedJourneyType && (
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {trip.curatedJourneyType}
                      </span>
                    </div>
                  )}
                  {trip.trending && (
                    <div className="mt-1">
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        🔥 Trending
                      </span>
                    </div>
                  )}
                  {trip.hiddenGem && (
                    <div className="mt-1">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        💎 Hidden Gem
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default UserExplore;
