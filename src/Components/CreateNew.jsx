import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signup, clearError, clearSignupSuccess, verifyEmail } from '../redux/slices/authSlice';
import OtpVerify from './OtpVerify';

function CreateNew({ isOpen, onClose, onOpenLogin }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Get auth state from Redux
  const { isLoading, error, signupSuccess, emailVerificationRequired } = useAppSelector(
    (state) => state.auth
  );
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [showOtpVerify, setShowOtpVerify] = useState(false);

  // Clear errors when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(clearError());
      dispatch(clearSignupSuccess());
    }
  }, [isOpen, dispatch]);

  // Show OTP verification when signup is successful
  useEffect(() => {
    if (signupSuccess && emailVerificationRequired) {
      setShowOtpVerify(true);
    }
  }, [signupSuccess, emailVerificationRequired]);

  const handleCreateAccount = async () => {
    // Validate required fields
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return;
    }
    
    if (!agreeToTerms) {
      return;
    }

    // Dispatch signup action
    const result = await dispatch(signup({
      name: fullName.trim(),
      email: email.trim(),
      password: password
    }));

    // If signup failed, error will be set in Redux state
    if (signup.fulfilled.match(result)) {
      console.log('Signup successful:', result.payload);
    }
  };

  const handleOtpVerification = async (verificationData) => {
    try {
      console.log('CreateNew: Starting OTP verification with:', verificationData);
      
      // Dispatch verifyEmail action with the verification data
      const result = await dispatch(verifyEmail(verificationData));
      
      if (verifyEmail.fulfilled.match(result)) {
        console.log('CreateNew: OTP verification successful:', result.payload);
        
        // Check if verification was successful and contains user data and token
        if (result.payload.success && result.payload.data?.user && result.payload.data?.token) {
          console.log('CreateNew: User automatically logged in after OTP verification');
          console.log('CreateNew: User data:', result.payload.data.user);
          console.log('CreateNew: Token received:', result.payload.data.token);
          
          // Close OTP modal
          setShowOtpVerify(false);
          // Close signup modal
          onClose();
          // Show success message
          alert('Email verified successfully! You are now logged in.');
          
          // The Redux state will automatically update with the user data
          // No need to refresh the page - the auth state is already updated
        } else {
          console.log('CreateNew: OTP verification successful but no user data/token');
          // OTP verification successful but no user data/token
          setShowOtpVerify(false);
          onClose();
          alert('Email verified successfully! Please log in to continue.');
          // Open login modal
          onOpenLogin();
        }
      } else if (verifyEmail.rejected.match(result)) {
        console.error('CreateNew: OTP verification failed:', result.payload);
        // Error will be handled by the OtpVerify component
        throw new Error(result.payload?.message || 'OTP verification failed');
      }
      
    } catch (error) {
      console.error('CreateNew: OTP verification failed:', error);
      throw error; // Re-throw to let OtpVerify component handle the error
    }
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
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Sign up</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <svg className="w-5 h-5 sm:w-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {signupSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                Account created successfully! Please verify your email with the OTP sent.
              </div>
            )}

            {/* Full Name Input */}
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                  disabled={isLoading}
                />
                {password && (
                  <button
                    onClick={() => setPassword('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Terms and Policies */}
            <div className="flex items-start gap-2 sm:gap-3">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-red-500 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                disabled={isLoading}
              />
              <label htmlFor="agree-terms" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                I agree to Trippnova's{' '}
                <button 
                  className="text-red-500 hover:text-red-600 font-medium"
                  onClick={() => navigate('/terms')}
                  disabled={isLoading}
                >
                  Terms of Service
                </button>
                ,{' '}
                <button 
                  className="text-red-500 hover:text-red-600 font-medium"
                  onClick={() => navigate('/privacy')}
                  disabled={isLoading}
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Create Account Button */}
            <button 
              onClick={handleCreateAccount}
              disabled={isLoading}
              className={`w-full py-2.5 sm:py-3 px-4 rounded-lg font-medium text-sm sm:text-base transition-colors ${
                isLoading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>

            {/* Already have account link */}
            <div className="text-center text-xs sm:text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <button 
                className="text-red-500 font-medium hover:text-red-600 transition-colors"
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                disabled={isLoading}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <OtpVerify
        isOpen={showOtpVerify}
        onClose={() => setShowOtpVerify(false)}
        onVerify={handleOtpVerification}
        email={email}
      />
    </>
  );
}

export default CreateNew;
