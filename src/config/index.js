// Configuration file for Trip Nova application

const config = {
  // API Configuration
  // In Vite, use import.meta.env instead of process.env
  // Environment variables must be prefixed with VITE_ to be exposed to the client
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001', 
  
  // API Endpoints
  API_ENDPOINTS: {
    // Authentication
    SIGNUP: '/api/user/Auth/signup',
    LOGIN: '/api/user/Auth/login',
    LOGOUT: '/api/user/Auth/logout',
    REFRESH_TOKEN: '/api/user/Auth/refresh',
    VERIFY_EMAIL: '/api/user/Auth/verify-email',
    
    // User Management
    GET_USER_PROFILE: '/api/user/profile',
    UPDATE_USER_PROFILE: '/api/user/profile',
    CHANGE_PASSWORD: '/api/user/change-password',
    
    // Travel Packages
    GET_PACKAGES: '/api/packages',
    GET_PACKAGE_BY_ID: '/api/packages',
    SEARCH_PACKAGES: '/api/packages/search',
    
    // Bookings
    CREATE_BOOKING: '/api/bookings',
    GET_USER_BOOKINGS: '/api/bookings/user',
    GET_BOOKING_BY_ID: '/api/bookings',
    CANCEL_BOOKING: '/api/bookings',
    
    // Notifications
    GET_NOTIFICATIONS: '/api/notifications',
    MARK_READ: '/api/notifications/read',
    UNSUBSCRIBE: '/api/notifications/unsubscribe',
  },
  
  // Authentication Configuration
  AUTH_TOKEN_KEY: 'tripNovaAuthToken',
  AUTH_REFRESH_TOKEN_KEY: 'tripNovaRefreshToken',
  AUTH_EXPIRY_KEY: 'tripNovaAuthExpiry',
  
  // Local Storage Keys
  LOCAL_STORAGE_KEYS: {
    AUTH: 'tripNovaAuth',
    USER_PREFERENCES: 'tripNovaUserPrefs',
    CART: 'tripNovaCart',
    RECENT_SEARCHES: 'tripNovaRecentSearches'
  },
  
  // Feature Flags
  FEATURES: {
    ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    ENABLE_PUSH_NOTIFICATIONS: import.meta.env.VITE_ENABLE_PUSH === 'true',
    ENABLE_OFFLINE_MODE: import.meta.env.VITE_ENABLE_OFFLINE === 'true'
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100
  },
  
  // File Upload
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    MAX_FILES: 10
  },
  
  // Cache Configuration
  CACHE: {
    AUTH_TTL: 24 * 60 * 60 * 1000, // 24 hours
    API_TTL: 5 * 60 * 1000, // 5 minutes
    USER_DATA_TTL: 60 * 60 * 1000 // 1 hour
  }
};

/**
 * Helper function to build full API URL from endpoint
 * This ensures all API calls use the centralized backend URL
 * @param {string} endpoint - API endpoint path (e.g., '/api/user/Auth/login')
 * @returns {string} Full API URL (e.g., 'http://localhost:5000/api/user/Auth/login')
 */
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  // Remove trailing slash from base URL if present
  const cleanBaseUrl = config.API_BASE_URL.endsWith('/') 
    ? config.API_BASE_URL.slice(0, -1) 
    : config.API_BASE_URL;
  return `${cleanBaseUrl}${cleanEndpoint}`;
};

export default config;
