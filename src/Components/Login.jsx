import React, { useState } from 'react';

function Login({ isOpen, onClose, onOpenSignup, onLoginSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        {/* Modal */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Phone Login Section */}
            <div className="space-y-4">
              <div className="relative">
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  {/* Country Code Selector */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center gap-2 px-3 py-3 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm">🇮🇳</span>
                      <span className="text-sm font-medium">{selectedCountry}</span>
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Country Dropdown */}
                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-32">
                        <button
                          onClick={() => {
                            setSelectedCountry('+91');
                            setShowCountryDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                        >
                          <span>🇮🇳</span>
                          <span>+91</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCountry('+1');
                            setShowCountryDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                        >
                          <span>🇺🇸</span>
                          <span>+1</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCountry('+44');
                            setShowCountryDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2"
                        >
                          <span>🇬🇧</span>
                          <span>+44</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Phone Input */}
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3 py-3 border-none outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
              </div>
              
              <button 
                type="button"
                className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                onClick={() => {
                  if (onLoginSuccess) {
                    onLoginSuccess();
                  }
                }}
              >
                Send One Time Password
              </button>
            </div>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Email Login */}
            <button 
              type="button"
              className="w-full border border-gray-300 bg-white text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              onClick={() => {
                if (onLoginSuccess) {
                  onLoginSuccess();
                }
              }}
            >
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Continue with Email
            </button>

            {/* Google Sign-in */}
            <div className="border border-gray-300 rounded-lg p-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between" onClick={() => {
                if (onLoginSuccess) {
                  onLoginSuccess();
                }
              }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    A
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Sign in as Aniruddh</div>
                    <div className="text-xs text-gray-500">aniruddhsingh9397@gmail.com</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="w-6 h-6">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* New User Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">New to Trippnova? </span>
              <button 
                className="text-red-500 font-medium hover:text-red-600 transition-colors"
                onClick={() => {
                  onClose();
                  onOpenSignup();
                }}
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
