import React, { useState } from 'react';
import logoImg from '../assets/Images/logo.png';

function Header({ onLoginClick, onSignupClick }) {
  const [location, setLocation] = useState('National');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const locationOptions = ['National', 'International', 'Pilgrims'];

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-gradient-to-r from-white via-pink-100 to-blue-200 backdrop-blur-md bg-opacity-90 shadow-lg flex items-center justify-between px-4 md:px-8 py-3">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoImg} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
        <span 
          className="text-lg md:text-2xl font-bold text-white-800 tracking-tight"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 230, 128, 0.3)'
          }}
        >
          trippnova
        </span>
      </div>
      
      {/* Location + Search - Hidden on mobile */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-full px-2 py-1 w-[600px] max-w-full shadow-inner relative">
        {/* Location Selector Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-1 px-3 py-2 bg-transparent rounded-full text-gray-700 font-medium hover:bg-gray-200 focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-pink-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-base">{location}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 text-gray-500">
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
        <span className="mx-2 text-gray-300 text-xl">|</span>
        
        {/* Search Input */}
        <div className="flex items-center flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
          <input
            type="text"
            placeholder="Enter Your Dream Destination"
            className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-base text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
      
      {/* Log in / Sign up */}
      <div className="hidden sm:flex items-center gap-4 md:gap-6">
        <button 
          className="text-gray-700 font-medium hover:text-pink-600 transition-colors"
          onClick={onLoginClick}
        >
          Log in
        </button>
        <button 
          className="text-gray-700 font-medium hover:text-pink-600 transition-colors"
          onClick={onSignupClick}
        >
          Sign up
        </button>
      </div>
      
      {/* Mobile Search and Menu Buttons - Far Right */}
      <div className="sm:hidden flex items-center gap-1">
        <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </button>
        <button className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;