import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../redux/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTripsByCuratedCategory, getTripsByTheme, tripKeys } from '../api/trips';
import '../App.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import manaliImg from '../assets/Images/Manali.jpg';
import heroVideo from '../assets/Images/pkkp.mp4';

function UserExplore() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get filter name from navigation state
  const themeName = location.state?.themeName || 'all';
  const curatedCategory = location.state?.curatedCategory || null;
  const activeTitle = curatedCategory || themeName;
  const {
    data: trips = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: curatedCategory
      ? tripKeys.byCuratedCategory(curatedCategory)
      : tripKeys.byTheme(themeName),
    queryFn: () => curatedCategory
      ? getTripsByCuratedCategory(curatedCategory)
      : getTripsByTheme(themeName),
  });

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

  const handleCardClick = (trip) => {
    navigate('/userdetailbooking', { state: { trip } });
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`${activeTitle || 'Explore Trips'} | Trippnova`}</title>
        <meta name="description" content="Browse curated trips by theme on Trippnova. Compare packages, explore destinations, and find adventures tailored to your preferences." />
        <link rel="canonical" href={`https://trippnova.com/userexplore`} />
      </Helmet>
      {/* Header Component */}
      <Header 
        onLogoClick={() => navigate('/')}
      />

      {/* Breadcrumbs */}
     

      {/* Hero Section with jjj.png Image */}
      <section id="explore-hero-section" className="relative h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl overflow-hidden shadow-xl mx-4 md:mx-8 mt-20 mb-8">
        

        <div className="relative h-full flex items-center px-4 md:px-8">
          {/* Text Content */}
          <div className="text-white p-6 rounded-lg max-w-md z-10">
            <div className="text-sm uppercase tracking-wide mb-2 text-yellow-400">TRIPPNOVA COLLECTIONS</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{activeTitle === 'all' ? 'All Trips' : activeTitle}</h1>
           
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
        ) : isError ? (
          <div className="text-center py-12">
            <div className="text-lg text-red-600 mb-4">Error: {error?.message || 'Failed to fetch trips'}</div>
            <button 
              onClick={() => refetch()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 mb-4">No trips available at the moment</div>
            <button 
              onClick={() => refetch()}
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
                    {trip.curatedCategory && trip.curatedCategory !== 'Other' ? trip.curatedCategory : (trip.theme || trip.tripType || 'TRIP')}
                  </div>
                 
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{trip.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{trip.destination}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <span className="text-sm text-gray-600">
                        {trip.price ? 
                          `Package starts @ ₹${trip.price.toLocaleString()}` : 
                          'Price on request'
                        }
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{trip.duration}</span>
                  </div>
                  {trip.curatedCategory && trip.curatedCategory !== 'Other' && (
                    <div className="mt-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {trip.curatedCategory}
                      </span>
                    </div>
                  )}
                  {trip.homepageSections?.trending && (
                    <div className="mt-1">
                      <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        Trending
                      </span>
                    </div>
                  )}
                  {trip.homepageSections?.hiddenGem && (
                    <div className="mt-1">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Hidden Gem
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
