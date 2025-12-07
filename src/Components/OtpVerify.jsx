
import React, { useState, useRef, useEffect } from 'react';

function OtpVerify({ isOpen, onClose, onVerify, email }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setError('');
      setTimer(30);
      setCanResend(false);
      // Focus first input when modal opens
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Only allow single character
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if current input has value
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-focus previous input if current input is empty and backspace was pressed
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || '';
      }
      setOtp(newOtp);
      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex(val => !val);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Pass both email and OTP as required by the API
      const verificationData = {
        email: email,
        otp: parseInt(otpString) // Convert string to number as per API spec
      };
      
      await onVerify(verificationData);
    } catch (error) {
      setError(error.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimer(30);
    setError('');
    // Here you would typically call an API to resend OTP
    // For now, we'll just reset the timer
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-white/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Verify OTP</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Email Display */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 mb-1">We've sent a verification code to</p>
              <p className="text-sm sm:text-base font-medium text-gray-800">{email}</p>
            </div>

            {/* OTP Input Fields */}
            <div className="space-y-4">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    placeholder=""
                  />
                ))}
              </div>
              
              {/* Auto-fill suggestion */}
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Timer and Resend */}
            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-gray-600">
                  Resend code in <span className="font-medium text-red-500">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  Resend code
                </button>
              )}
            </div>

            {/* Verify Button */}
            <button 
              onClick={handleVerify}
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full bg-red-500 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors text-sm sm:text-base disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify OTP'
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <button
                onClick={onClose}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Back to Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpVerify;
