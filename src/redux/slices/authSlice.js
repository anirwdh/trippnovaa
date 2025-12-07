import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Async thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationData, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(verificationData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  signupSuccess: false,
  emailVerificationRequired: false,
  isInitialized: false,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSignupSuccess: (state) => {
      state.signupSuccess = false;
    },
    setEmailVerificationRequired: (state, action) => {
      state.emailVerificationRequired = action.payload;
    },
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      const isAuthenticated = authService.isAuthenticated();
      const user = authService.getCurrentUser();
      
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signupSuccess = true;
        state.emailVerificationRequired = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Signup failed';
        state.signupSuccess = false;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.error = null;
        state.emailVerificationRequired = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.signupSuccess = false;
        state.emailVerificationRequired = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Logout failed';
      })
      
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emailVerificationRequired = false;
        state.error = null;
        
        // If verification includes user data and token, automatically log the user in
        if (action.payload.success && action.payload.data?.user && action.payload.data?.token) {
          console.log('AuthSlice: Auto-login after OTP verification:', action.payload.data.user);
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
          state.signupSuccess = false; // Clear signup success since user is now logged in
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Email verification failed';
      });
  },
});

export const { 
  clearError, 
  clearSignupSuccess, 
  setEmailVerificationRequired,
  initializeAuth 
} = authSlice.actions;

export default authSlice.reducer;
