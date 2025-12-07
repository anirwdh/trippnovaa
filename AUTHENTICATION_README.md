# Trip Nova Authentication System

## Overview
This document describes the authentication system implemented for Trip Nova, which provides persistent login state across all user pages until logout.

## Architecture

### 1. AuthContext (Global State Management)
- **Location**: `src/contexts/AuthContext.jsx`
- **Purpose**: Manages global authentication state across the entire application
- **Features**:
  - Persistent login state using localStorage
  - Automatic state restoration on page refresh
  - Global login/logout functions

### 2. Components Using AuthContext

#### User Pages
- `UserHome.jsx` - Main landing page
- `UserExplore.jsx` - Explore destinations page  
- `UserdetailBooking.jsx` - Booking details page

#### Shared Components
- `Header.jsx` - Navigation header with user menu
- `Login.jsx` - Login modal
- `App.jsx` - Main app wrapper with AuthProvider

## How It Works

### 1. Login Flow
1. User clicks "Log in" button
2. Login modal opens
3. User enters email and password
4. `Login.jsx` calls `login(email, name)` from AuthContext
5. AuthContext updates global state and saves to localStorage
6. User is now logged in across all pages

### 2. Persistent State
- Login state is automatically saved to `localStorage` as `tripNovaAuth`
- State persists across page navigation and browser refresh
- State includes: `isLoggedIn`, `userName`, `userEmail`, `lastUpdated`

### 3. Logout Flow
1. User clicks logout button in header dropdown
2. `Header.jsx` calls `logout()` from AuthContext
3. AuthContext clears all state and removes localStorage data
4. User is logged out across all pages

### 4. State Synchronization
- All user pages automatically reflect the current authentication state
- No need to pass authentication props between components
- Header automatically shows login/signup buttons or user profile based on state

## Key Benefits

1. **Persistent Login**: Users stay logged in across all pages until logout
2. **No State Loss**: Authentication persists through page navigation and refresh
3. **Centralized Management**: Single source of truth for auth state
4. **Automatic UI Updates**: Header and components automatically reflect login state
5. **Clean Code**: No need to pass auth props through component hierarchies

## Usage Examples

### In Components
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { isLoggedIn, userName, login, logout } = useAuth();
  
  // Use authentication state and functions
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, {userName}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Login Function
```jsx
const { login } = useAuth();
login('user@example.com', 'John Doe');
```

### Logout Function
```jsx
const { logout } = useAuth();
logout();
```

## Data Structure

### localStorage Key: `tripNovaAuth`
```json
{
  "isLoggedIn": true,
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "lastUpdated": "2024-01-01T12:00:00.000Z"
}
```

## Security Notes

- Authentication is currently client-side only (demo purposes)
- In production, implement proper backend authentication with JWT tokens
- Add token expiration and refresh mechanisms
- Implement proper password hashing and validation
- Add CSRF protection and secure session management

## Future Enhancements

1. **Backend Integration**: Connect to real authentication API
2. **Token Management**: Implement JWT token handling
3. **Role-based Access**: Add user roles and permissions
4. **Session Management**: Add session timeout and auto-logout
5. **Multi-factor Auth**: Add 2FA support
6. **Social Login**: Integrate Google, Facebook, etc.
