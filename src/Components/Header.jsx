import React, { useState, useEffect, useRef } from 'react';
import logoImg from '../assets/Images/logo.png';

function Header({ onLoginClick, onSignupClick, isLoggedIn, userName, onLoginSuccess }) {
  const [location, setLocation] = useState('National');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const locationOptions = ['National', 'International', 'Pilgrims'];

  const userDropdownRef = useRef(null);

  const handleLogout = () => {
    // Reset login state by calling the parent's logout handler
    if (onLoginSuccess) {
      // We'll use onLoginSuccess as a toggle - when called with false, it means logout
      onLoginSuccess(false);
    }
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1002] bg-gradient-to-r from-white via-pink-100 to-blue-200 backdrop-blur-md bg-opacity-90 shadow-lg flex items-center justify-between px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 py-2 xs:py-3">
      {/* Logo */}
      <div className="flex items-center gap-1 xs:gap-2">
        <img src={logoImg} alt="Logo" className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 object-contain" />
        <span 
          className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white-800 tracking-tight"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 230, 128, 0.3)'
          }}
        >
          trippnova
        </span>
      </div>
      
      {/* Location + Search - Responsive for tablet */}
      <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-2 py-1 w-[280px] xs:w-[320px] sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[600px] max-w-full shadow-inner relative">
        {/* Location Selector Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-2 xs:px-3 py-2 bg-transparent rounded-full text-gray-700 font-medium hover:bg-gray-200 focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 xs:w-5 xs:h-5 text-pink-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-xs xs:text-sm sm:text-base">{location}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 xs:w-4 xs:h-4 ml-1 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
              {locationOptions.map((opt) => (
                <button
                  key={opt}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${location === opt ? 'bg-gray-100 font-semibold' : ''}`}
                  onClick={() => {
                    setLocation(opt);
                    setDropdownOpen(false);
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Divider */}
        <span className="mx-1 xs:mx-2 text-gray-300 text-sm xs:text-base sm:text-xl">|</span>
        
        {/* Search Input */}
        <div className="flex items-center flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 xs:w-5 xs:h-5 text-gray-500 ml-1 xs:ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
          <input
            type="text"
            placeholder="Enter Your Dream Destination"
            className="flex-1 bg-transparent border-none outline-none px-2 xs:px-3 py-2 text-xs xs:text-sm sm:text-base text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
      
      {/* Log in / Sign up or User Profile */}
      <div className="hidden sm:flex items-center gap-2 xs:gap-3 sm:gap-4 md:gap-6">
        {isLoggedIn ? (
          <div className="relative" ref={userDropdownRef}>
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition-colors"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{userName.charAt(0)}</span>
              </div>
              <span className="text-gray-700 font-medium text-xs xs:text-sm sm:text-base">{userName}</span>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* User Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">{userName}</div>
                  <div className="text-xs text-gray-500">aniruddhsingh9397@gmail.com</div>
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
              className="text-gray-700 font-medium hover:text-pink-600 transition-colors text-xs xs:text-sm sm:text-base"
              onClick={onLoginClick}
            >
              Log in
            </button>
            <button 
              className="text-gray-700 font-medium hover:text-pink-600 transition-colors text-xs xs:text-sm sm:text-base"
              onClick={onSignupClick}
            >
              Sign up
            </button>
          </>
        )}
      </div>
      
      {/* Mobile Search and Menu Buttons - Far Right */}
      <div className="sm:hidden flex items-center gap-1">
        <button 
          className="p-1 xs:p-2 text-gray-700 hover:text-pink-600 transition-colors"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 xs:w-6 xs:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </button>
        <button 
          className="p-1 xs:p-2 text-gray-700 hover:text-pink-600 transition-colors"
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
            
            {/* Location Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 focus:outline-none"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>{location}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {locationOptions.map((opt) => (
                      <button
                        key={opt}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${location === opt ? 'bg-gray-100 font-semibold' : ''}`}
                        onClick={() => {
                          setLocation(opt);
                          setDropdownOpen(false);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Search Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
                <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter Your Dream Destination"
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
            
            {/* Search Button */}
            <button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white py-2 px-4 rounded-md font-medium hover:from-pink-600 hover:to-blue-600 transition-all">
              Search
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
                {isLoggedIn ? (
                  <>
                    {/* User Profile */}
                    <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{userName.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-700 font-medium">{userName}</div>
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
                        onLoginClick();
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
                        onSignupClick();
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