// API Endpoints for Trip Nova application

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    SIGNUP: '/api/user/Auth/signup',
    LOGIN: '/api/user/Auth/login',
    LOGOUT: '/api/user/Auth/logout',
    REFRESH_TOKEN: '/api/user/Auth/refresh',
    VERIFY_EMAIL: '/api/user/Auth/verify-email',
    FORGOT_PASSWORD: '/api/user/Auth/forgot-password',
    RESET_PASSWORD: '/api/user/Auth/reset-password',
  },

  // User Management
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
    CHANGE_PASSWORD: '/api/user/change-password',
    UPLOAD_AVATAR: '/api/user/avatar',
    DELETE_ACCOUNT: '/api/user/delete',
  },

  // Travel Packages
  PACKAGES: {
    LIST: '/api/packages',
    GET_BY_ID: '/api/packages',
    SEARCH: '/api/packages/search',
    FILTER: '/api/packages/filter',
    CATEGORIES: '/api/packages/categories',
    POPULAR: '/api/packages/popular',
    RECOMMENDED: '/api/packages/recommended',
  },

  // Trips
  TRIPS: {
    GET_ALL: '/api/trips/getAllTrips',
    GET_BY_THEME: '/api/user/filter/get-trips-by-theme',
  },

  // Bookings
  BOOKINGS: {
    CREATE: '/api/bookings',
    USER_BOOKINGS: '/api/bookings/user',
    GET_BY_ID: '/api/bookings',
    UPDATE: '/api/bookings',
    CANCEL: '/api/bookings',
    PAYMENT_STATUS: '/api/bookings/payment-status',
  },

  // Destinations
  DESTINATIONS: {
    LIST: '/api/destinations',
    GET_BY_ID: '/api/destinations',
    SEARCH: '/api/destinations/search',
    POPULAR: '/api/destinations/popular',
    NEARBY: '/api/destinations/nearby',
  },

  // Reviews & Ratings
  REVIEWS: {
    LIST: '/api/reviews',
    CREATE: '/api/reviews',
    UPDATE: '/api/reviews',
    DELETE: '/api/reviews',
    PACKAGE_REVIEWS: '/api/reviews/package',
    USER_REVIEWS: '/api/reviews/user',
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: '/api/notifications/read',
    MARK_ALL_READ: '/api/notifications/read-all',
    UNSUBSCRIBE: '/api/notifications/unsubscribe',
    PREFERENCES: '/api/notifications/preferences',
  },

  // Wishlist
  WISHLIST: {
    LIST: '/api/wishlist',
    ADD: '/api/wishlist/add',
    REMOVE: '/api/wishlist/remove',
    CHECK: '/api/wishlist/check',
  },

  // Payments
  PAYMENTS: {
    CREATE_INTENT: '/api/payments/create-intent',
    CONFIRM: '/api/payments/confirm',
    HISTORY: '/api/payments/history',
    REFUND: '/api/payments/refund',
  },

  // Support
  SUPPORT: {
    CONTACT: '/api/support/contact',
    FAQ: '/api/support/faq',
    TICKETS: '/api/support/tickets',
    CREATE_TICKET: '/api/support/tickets',
  },
};

export default API_ENDPOINTS;
