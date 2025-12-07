# Trip Nova - Folder Structure & Architecture

## 📁 **New Folder Structure**

```
src/
├── api/                    # API layer
│   ├── client.js          # Axios client with interceptors
│   └── endpoints.js       # API endpoint definitions
├── config/                 # Configuration files
│   └── index.js           # App configuration & constants
├── redux/                  # State management
│   ├── store.js           # Redux store configuration
│   ├── hooks.js           # Typed Redux hooks
│   └── slices/            # Redux slices
│       └── authSlice.js   # Authentication state management
├── services/               # Business logic services
│   └── authService.js     # Authentication service
└── contexts/               # React contexts (existing)
    └── AuthContext.jsx    # Authentication context
```

## 🚀 **What's Been Implemented**

### 1. **API Layer** (`src/api/`)
- **`client.js`**: Axios instance with auth interceptors and token refresh
- **`endpoints.js`**: Centralized API endpoint definitions

### 2. **Configuration** (`src/config/`)
- **`index.js`**: Environment variables, API URLs, feature flags, and app constants

### 3. **Redux Store** (`src/redux/`)
- **`store.js`**: Redux Toolkit store with middleware configuration
- **`hooks.js`**: Typed Redux hooks for TypeScript support
- **`slices/authSlice.js`**: Authentication state management with async thunks

### 4. **Services** (`src/services/`)
- **`authService.js`**: Authentication business logic and API calls

## 🔧 **How to Use**

### **API Integration**

```javascript
// In your components
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signup } from '../redux/slices/authSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const { isLoading, error, signupSuccess } = useAppSelector(state => state.auth);

  const handleSignup = async () => {
    const result = await dispatch(signup({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    }));
  };
}
```

### **API Client Usage**

```javascript
import apiClient from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

// Make API calls
const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
```

### **Configuration Usage**

```javascript
import config from '../config';

// Use configuration values
const apiUrl = config.API_BASE_URL;
const maxFileSize = config.FILE_UPLOAD.MAX_SIZE;
```

## 📡 **API Endpoints Structure**

The API endpoints are organized by feature:

```javascript
API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/user/Auth/signup',
    LOGIN: '/api/user/Auth/login',
    // ... more auth endpoints
  },
  USER: {
    PROFILE: '/api/user/profile',
    // ... more user endpoints
  },
  PACKAGES: {
    LIST: '/api/packages',
    // ... more package endpoints
  },
  // ... more feature categories
}
```

## 🔐 **Authentication Flow**

1. **Signup**: User fills form → Redux action dispatched → API call → Success/Error state updated
2. **Login**: User credentials → Redux action → API call → Tokens stored → User authenticated
3. **Token Refresh**: Automatic token refresh on 401 errors
4. **Logout**: Clear all auth data and redirect

## 🛠 **Setup Requirements**

### **Install Dependencies**

```bash
npm install @reduxjs/toolkit react-redux axios
```

### **Environment Variables**

Create `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_PUSH=true
```

## 🔄 **Integration with Existing Code**

The new structure integrates with your existing `AuthContext`:

- **Redux**: Manages API state and async operations
- **Context**: Provides global auth state to components
- **Services**: Handle business logic and API calls
- **API Client**: Manages HTTP requests and interceptors

## 📝 **Next Steps**

1. **Update App.jsx** to include Redux Provider
2. **Create more Redux slices** for other features (packages, bookings, etc.)
3. **Add more services** for different business logic
4. **Implement error boundaries** and loading states
5. **Add TypeScript** for better type safety

## 🎯 **Benefits**

- **Centralized API Management**: All endpoints in one place
- **Type Safety**: Redux Toolkit with TypeScript support
- **Error Handling**: Consistent error handling across the app
- **State Management**: Predictable state updates with Redux
- **Service Layer**: Separation of concerns and reusability
- **Configuration**: Environment-based configuration management

## 🚨 **Important Notes**

- The signup API endpoint is now: `{{baseUrl}}/api/user/Auth/signup`
- All API calls go through the centralized `apiClient`
- Redux manages loading states and errors
- Services handle business logic and API integration
- Configuration is centralized and environment-aware
