import apiClient from '../api/client';

class AuthService {
  // User signup
  async signup(userData) {
    try {
      const response = await apiClient.post('/api/user/Auth/signup', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // User login
  async login(credentials) {
    try {
      const response = await apiClient.post('/api/user/Auth/login', credentials);
      
      if (response.data.success) {
        // Store token in localStorage (API returns 'token' not 'accessToken')
        const { token } = response.data.data;
        localStorage.setItem('tripNovaAuthToken', token);
        
        // Store user data
        localStorage.setItem('tripNovaAuth', JSON.stringify({
          isLoggedIn: true,
          user: response.data.data.user,
          lastUpdated: new Date().toISOString()
        }));
        
        console.log('AuthService: Token stored successfully:', token);
        console.log('AuthService: User data stored:', response.data.data.user);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // User logout
  async logout() {
    try {
      // Call logout API if user is authenticated
      const token = localStorage.getItem('tripNovaAuthToken');
      if (token) {
        await apiClient.post('/api/user/Auth/logout');
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear all auth data regardless of API call success
      this.clearAuthData();
    }
  }

  // Refresh access token
  async refreshToken() {
    try {
      // Since the current API doesn't provide refresh tokens, we'll handle this differently
      // For now, we'll just check if the current token is still valid
      const currentToken = localStorage.getItem('tripNovaAuthToken');
      if (!currentToken) {
        throw new Error('No auth token available');
      }

      // You can implement token validation logic here
      // For now, we'll assume the token is still valid
      console.log('AuthService: Token refresh not implemented yet');
      return currentToken;
    } catch (error) {
      // Refresh failed, clear auth data
      this.clearAuthData();
      throw this.handleError(error);
    }
  }

  // Verify email with OTP
  async verifyEmail(verificationData) {
    try {
      // API expects: { "email": "user@example.com", "otp": 123456 }
      const response = await apiClient.post('/api/user/Auth/verify-otp', verificationData);
      
      // If verification is successful and includes user data and token, store them
      if (response.data.success && response.data.data?.user && response.data.data?.token) {
        // Store token in localStorage (same as login)
        localStorage.setItem('tripNovaAuthToken', response.data.data.token);
        
        // Store user data
        localStorage.setItem('tripNovaAuth', JSON.stringify({
          isLoggedIn: true,
          user: response.data.data.user,
          lastUpdated: new Date().toISOString()
        }));
        
        console.log('AuthService: User data stored after OTP verification:', response.data.data.user);
        console.log('AuthService: Token stored after OTP verification:', response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/api/user/Auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post('/api/user/Auth/reset-password', {
        token,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('tripNovaAuthToken');
    const authData = localStorage.getItem('tripNovaAuth');
    
    if (!token || !authData) {
      return false;
    }

    try {
      const parsedAuth = JSON.parse(authData);
      return parsedAuth.isLoggedIn === true;
    } catch (error) {
      console.error('Error parsing auth data:', error);
      return false;
    }
  }

  // Get current user data
  getCurrentUser() {
    try {
      const authData = localStorage.getItem('tripNovaAuth');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.user || null;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Clear all authentication data
  clearAuthData() {
    localStorage.removeItem('tripNovaAuthToken');
    localStorage.removeItem('tripNovaAuth');
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      // Request made but no response received
      return {
        message: 'Network error. Please check your connection.',
        status: 0
      };
    } else {
      // Something else happened
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0
      };
    }
  }
}

export default new AuthService();
