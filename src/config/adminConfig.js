// Admin Configuration
export const ADMIN_CONFIG = {
  // API Base URL
  BASE_URL: 'https://tripnova-backend.onrender.com',
  
  // Admin API Endpoints
  ENDPOINTS: {
    LOGIN: '/api/admin/admin-login',
    PROFILE: '/api/admin/profile',
    USERS: '/api/admin/users',
    BOOKINGS: '/api/admin/bookings',
    INQUIRIES: '/api/admin/inquiries',
    BLOGS: '/api/admin/blogs',
    TRIP_UPDATE: '/api/admin/trip/update-tripDetails',
    TRIP_DELETE: '/api/admin/trip/delete-tripDetails',
  },
  
  // Admin Credentials (for reference)
  CREDENTIALS: {
    EMAIL: 'admin@gmail.com',
    PASSWORD: 'admin'
  },
  
  // Session Configuration
  SESSION: {
    TOKEN_KEY: 'tripNovaAdminToken',
    AUTH_KEY: 'tripNovaAdminAuth',
    EXPIRY_HOURS: 24
  }
};

// Helper function to build full API URLs
export const buildAdminApiUrl = (endpoint) => {
  return `${ADMIN_CONFIG.BASE_URL}${endpoint}`;
};

// Get full endpoint URLs
export const ADMIN_API_URLS = {
  LOGIN: buildAdminApiUrl(ADMIN_CONFIG.ENDPOINTS.LOGIN),
  PROFILE: buildAdminApiUrl(ADMIN_CONFIG.ENDPOINTS.PROFILE),
  USERS: buildAdminApiUrl(ADMIN_CONFIG.ENDPOINTS.USERS),
  BOOKINGS: buildAdminApiUrl(ADMIN_CONFIG.ENDPOINTS.BOOKINGS),
  INQUIRIES: buildAdminApiUrl(ADMIN_CONFIG.ENDPOINTS.INQUIRIES),
  BLOGS: buildAdminApiUrl(ADMIN_CONFIG.ENDPOINTS.BLOGS),
  TRIP_UPDATE: buildAdminApiUrl(ADMIN_CONFIG.ENDPOINTS.TRIP_UPDATE),
  TRIP_DELETE: buildAdminApiUrl(ADMIN_CONFIG.ENDPOINTS.TRIP_DELETE),
};
