import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import logoImg from '../assets/Images/lhlh.png';

function Header({ onLoginClick, onSignupClick, onSearchResults, isInHeroSection = false }) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);
  
  // Debug logging
  console.log('Header: Auth state:', { isAuthenticated, user, isLoading });

  // Get token for debugging
  const token = localStorage.getItem('tripNovaAuthToken');
  const tokenPreview = token ? `${token.substring(0, 20)}...` : 'No token';
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const userDropdownRef = useRef(null);
  const calendarRef = useRef(null);

  const handleLogout = () => {
    console.log('Header: Logout button clicked');
    dispatch(logout());
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Filter API function
  const searchTrips = async (destination) => {
    if (!destination || destination.trim() === '') {
      console.log('No destination provided for search');
      return;
    }

    setIsSearching(true);
    try {
      console.log('Searching for trips with destination:', destination);
      
      const token = localStorage.getItem('tripNovaAuthToken');
      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`https://tripnova-backend.onrender.com/api/user/filter/filter-trips?destination=${encodeURIComponent(destination)}`, {
        method: 'GET',
        headers: headers,
      });

      const result = await response.json();
      console.log('Search API response:', result);
      
      if (result.success) {
        console.log('Search results:', result.data);
        setSearchResults(result.data || []);
        // Pass search results to parent component
        if (onSearchResults) {
          onSearchResults(result.data || [], destination);
        }
        if (result.data && result.data.length > 0) {
          console.log('Found trips, passing to parent component');
        } else {
          console.log('No trips found for destination:', destination);
        }
      } else {
        console.error('Search failed:', result.message);
        setSearchResults([]);
        if (onSearchResults) {
          onSearchResults([], destination);
        }
      }
    } catch (error) {
      console.error('Error searching trips:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchTrips(searchQuery.trim());
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    };

    if (userDropdownOpen || calendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen, calendarOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1002] flex items-center justify-between px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-2 xs:py-3 transition-all duration-300 ${
      isInHeroSection 
        ? 'bg-transparent backdrop-blur-none shadow-none' 
        : 'bg-gradient-to-r from-white via-pink-100 to-blue-200 backdrop-blur-md bg-opacity-90 shadow-lg'
    }`}>
      {/* Logo */}
      <div className="flex items-center gap-1 xs:gap-2">
        <img src={logoImg} alt="Logo" className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 object-contain" />
        <span 
          className="text-sm xs:text-base sm:text-lg md:text-l lg:text-xl font-bold tracking-tight"
          style={{
            background: 'linear-gradient(to right, #fca5a5, #ef4444, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          Trippnova
        </span>
        
       
      </div>
      
      {/* Location + Search - Responsive for tablet */}
      <div className={`hidden sm:flex items-center rounded-full px-2 py-1 w-[280px] xs:w-[320px] sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[600px] max-w-full shadow-inner relative transition-all duration-300 ${
        isInHeroSection 
          ? 'bg-white/20 backdrop-blur-sm border border-white/30' 
          : 'bg-gray-100'
      }`}>
        {/* Date Picker */}
        <div className="relative" ref={calendarRef}>
          <button
            className={`flex items-center gap-1 px-2 xs:px-3 py-2 bg-transparent rounded-full font-medium focus:outline-none transition-colors ${
              isInHeroSection 
                ? 'text-white hover:bg-white/20' 
                : 'text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setCalendarOpen((open) => !open)}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 xs:w-5 xs:h-5 text-pink-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
            </svg>
            <span className="text-xs xs:text-sm sm:text-base">
              {startDate && endDate ? `${startDate} - ${endDate}` : 'Select Dates'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 xs:w-4 xs:h-4 ml-1 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {calendarOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-700">Select Travel Dates</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setStartDate('');
                      setEndDate('');
                      setCalendarOpen(false);
                    }}
                    className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setCalendarOpen(false)}
                    className="px-3 py-1 text-xs bg-pink-500 text-white rounded hover:bg-pink-600"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Divider */}
        <span className="mx-1 xs:mx-2 text-gray-300 text-sm xs:text-base sm:text-xl">|</span>
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex items-center flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500 ml-1 xs:ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Your Dream Destination"
            className={`flex-1 bg-transparent border-none outline-none px-2 xs:px-3 py-2 text-xs xs:text-sm sm:text-base ${
              isInHeroSection 
                ? 'text-white placeholder-white/70' 
                : 'text-gray-700 placeholder-gray-400'
            }`}
            disabled={isSearching}
          />
          {isSearching && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          )}
        </form>
      </div>
      
      {/* Log in / Sign up or User Profile */}
      <div className="hidden sm:flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6">
        {isAuthenticated ? (
          <div className="relative" ref={userDropdownRef}>
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition-colors"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{user?.name?.charAt(0)}</span>
              </div>
              <span className="text-gray-700 font-medium text-xs xs:text-sm sm:text-base">{user?.name}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* User Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
                <div className="p-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <button 
              className={`font-medium transition-colors text-xs xs:text-sm sm:text-base ${
                isInHeroSection 
                  ? 'text-white hover:text-yellow-300' 
                  : 'text-gray-700 hover:text-pink-600'
              }`}
              onClick={onLoginClick || (() => {})}
            >
              Log in
            </button>
            <button 
              className={`font-medium transition-colors text-xs xs:text-sm sm:text-base ${
                isInHeroSection 
                  ? 'text-white hover:text-yellow-300' 
                  : 'text-gray-700 hover:text-pink-600'
              }`}
              onClick={onSignupClick || (() => {})}
            >
              Sign up
            </button>
          </>
        )}
      </div>
      
      {/* Mobile Search and Menu Buttons - Far Right */}
      <div className="sm:hidden flex items-center gap-1">
        <button 
          className={`p-1 xs:p-2 transition-colors ${
            isInHeroSection 
              ? 'text-white hover:text-yellow-300' 
              : 'text-gray-700 hover:text-pink-600'
          }`}
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 xs:w-6 xs:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </button>
        <button 
          className={`p-1 xs:p-2 transition-colors ${
            isInHeroSection 
              ? 'text-white hover:text-yellow-300' 
              : 'text-gray-700 hover:text-pink-600'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 xs:w-6 xs:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {mobileSearchOpen && (
        <div 
          className="sm:hidden fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-30 z-[1001] flex items-start justify-center pt-4"
          onClick={() => setMobileSearchOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-[90%] max-w-md mx-4 mt-4 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Search Destinations</h3>
              <button 
                onClick={() => setMobileSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Date Picker */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Travel Dates</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Search Input */}
            <form onSubmit={handleSearch} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Your Dream Destination"
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                  disabled={isSearching}
                />
                {isSearching && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 ml-2"></div>
                )}
              </div>
            </form>
            
            {/* Search Button */}
            <button 
              type="button"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 px-4 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-30 z-[1001] flex items-start justify-end">
          <div className="bg-white h-full w-[80%] max-w-sm shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 p-4 bg-white">
              <div className="space-y-4">
                {isAuthenticated ? (
                  <>
                    {/* User Profile */}
                    <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{user?.name?.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-700 font-medium">{user?.name}</div>
                        <div className="text-xs text-gray-500">Logged in</div>
                      </div>
                    </div>
                    
                    {/* Logout Option */}
                    <button 
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={handleLogout}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-gray-700 font-medium">Log out</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Login Option */}
                    <button 
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onLoginClick) onLoginClick();
                      }}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700 font-medium">Log in</span>
                    </button>
                    
                    {/* Signup Option */}
                    <button 
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (onSignupClick) onSignupClick();
                      }}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span className="text-gray-700 font-medium">Sign up</span>
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="text-center text-sm text-gray-500">
                © 2024 Trippnova. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;