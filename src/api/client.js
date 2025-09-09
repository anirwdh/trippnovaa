import axios from 'axios';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'https://tripnova-backend.onrender.com', // Default API base URL
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tripNovaAuthToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Since we don't have refresh tokens, we'll just clear auth data on 401
        console.log('API Client: 401 Unauthorized, clearing auth data');
        localStorage.removeItem('tripNovaAuthToken');
        localStorage.removeItem('tripNovaAuth');
        
        // You can implement a redirect to login page here
        // window.location.href = '/login';
      } catch (clearError) {
        console.error('API Client: Error clearing auth data:', clearError);
        localStorage.removeItem('tripNovaAuthToken');
        localStorage.removeItem('tripNovaAuth');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
