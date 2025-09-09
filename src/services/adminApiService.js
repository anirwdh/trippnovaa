// Admin API Service for making authenticated admin API calls
import { ADMIN_CONFIG, ADMIN_API_URLS } from '../config/adminConfig';

// Get admin token from localStorage
export const getAdminToken = () => {
  return localStorage.getItem(ADMIN_CONFIG.SESSION.TOKEN_KEY);
};

// Check if admin is authenticated
export const isAdminAuthenticated = () => {
  const token = getAdminToken();
  return !!token;
};

// Make authenticated admin API call
export const adminApiCall = async (endpoint, options = {}) => {
  const token = getAdminToken();
  
  if (!token) {
    throw new Error('Admin not authenticated');
  }

  console.log('Admin API: Making authenticated call to:', endpoint);
  console.log('Admin API: Token available:', !!token);
  console.log('Admin API: Token preview:', token.substring(0, 20) + '...');

  const defaultHeaders = {
    'Authorization': `Bearer ${token}`
  };

  // Only add Content-Type for non-FormData requests
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    console.log('Admin API: Making fetch request to:', endpoint);
    console.log('Admin API: Request config:', config);
    console.log('Admin API: Request body type:', typeof config.body);
    console.log('Admin API: Request body instanceof FormData:', config.body instanceof FormData);
    console.log('Admin API: Request headers:', config.headers);
    
    const response = await fetch(endpoint, config);
    
    console.log('Admin API: Response received');
    console.log('Admin API: Response status:', response.status);
    console.log('Admin API: Response ok:', response.ok);
    console.log('Admin API: Response statusText:', response.statusText);
    console.log('Admin API: Response headers:', Object.fromEntries(response.headers.entries()));
    console.log('Admin API: Response type:', response.type);
    console.log('Admin API: Response url:', response.url);
    
    if (!response.ok) {
      console.error('Admin API: Response not ok');
      console.error('Admin API: Status:', response.status);
      console.error('Admin API: Status text:', response.statusText);
      
      if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem(ADMIN_CONFIG.SESSION.TOKEN_KEY);
        throw new Error('Admin session expired. Please login again.');
      }
      
      // Try to get error details from response
      let errorMessage = `API call failed: ${response.status}`;
      try {
        const errorData = await response.text();
        console.error('Admin API: Error response body:', errorData);
        if (errorData) {
          try {
            const parsedError = JSON.parse(errorData);
            errorMessage = parsedError.message || parsedError.error || errorMessage;
          } catch (parseError) {
            errorMessage = errorData || errorMessage;
          }
        }
      } catch (textError) {
        console.error('Admin API: Could not read error response:', textError);
      }
      
      throw new Error(errorMessage);
    }

    console.log('Admin API: Response is ok, parsing JSON...');
    const responseData = await response.json();
    console.log('Admin API: Response data parsed successfully:', responseData);
    return responseData;
  } catch (error) {
    console.error('Admin API call error:', error);
    throw error;
  }
};

// Example admin API functions
export const adminApi = {
  // Get admin profile
  getProfile: () => adminApiCall(ADMIN_API_URLS.PROFILE),
  
  // Get users list
  getUsers: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiCall(`${ADMIN_API_URLS.USERS}?${queryString}`);
  },
  
  // Get bookings list
  getBookings: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiCall(`${ADMIN_API_URLS.BOOKINGS}?${queryString}`);
  },
  
  // Get inquiries list
  getInquiries: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return adminApiCall(`${ADMIN_API_URLS.INQUIRIES}?${queryString}`);
  },
  
  // Update user status
  updateUserStatus: (userId, status) => 
    adminApiCall(`${ADMIN_API_URLS.USERS}/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
  
  // Update booking status
  updateBookingStatus: (bookingId, status) => 
    adminApiCall(`${ADMIN_API_URLS.BOOKINGS}/${bookingId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
  
  // Reply to inquiry
  replyToInquiry: (inquiryId, reply) => 
    adminApiCall(`${ADMIN_API_URLS.INQUIRIES}/${inquiryId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ reply })
    }),
  
  // Upload blog
  uploadBlog: (blogData) => 
    adminApiCall(ADMIN_API_URLS.BLOGS, {
      method: 'POST',
      body: JSON.stringify(blogData)
    }),
  
  // Update trip details
  updateTripDetails: (tripId, tripData) => {
    const endpoint = `${ADMIN_API_URLS.TRIP_UPDATE}/${tripId}`;
    console.log('Admin API: Constructing trip update endpoint:', endpoint);
    console.log('Admin API: Base URL:', ADMIN_API_URLS.TRIP_UPDATE);
    console.log('Admin API: Trip ID:', tripId);
    console.log('Admin API: Full endpoint:', endpoint);
    console.log('Admin API: Data type:', tripData instanceof FormData ? 'FormData' : 'JSON');
    
    // If sending FormData, don't set Content-Type header (let browser set it)
    const options = {
      method: 'PUT',
      body: tripData
    };
    
    // Only add Content-Type header for JSON data
    if (!(tripData instanceof FormData)) {
      options.headers = {
        'Content-Type': 'application/json'
      };
    }
    
    return adminApiCall(endpoint, options);
  },
  
  // Delete trip details
  deleteTripDetails: (tripId) => {
    const endpoint = ADMIN_API_URLS.TRIP_DELETE;
    console.log('Admin API: Constructing trip delete endpoint:', endpoint);
    console.log('Admin API: Trip ID to delete:', tripId);
    
    const options = {
      method: 'DELETE',
      body: JSON.stringify({ id: tripId })
    };
    
    return adminApiCall(endpoint, options);
  }
};
