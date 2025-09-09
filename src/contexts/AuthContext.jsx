import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    console.log('AuthContext: Component mounted, checking localStorage...');
    
    try {
      const savedAuth = localStorage.getItem('tripNovaAuth');
      console.log('AuthContext: Raw localStorage data:', savedAuth);
      
      if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        console.log('AuthContext: Parsed auth data:', authData);
        
        // Only restore if the data is valid and complete
        if (authData.isLoggedIn === true && authData.userEmail && authData.userName) {
          console.log('AuthContext: Valid auth data found, restoring state...');
          setIsLoggedIn(true);
          setUserName(authData.userName);
          setUserEmail(authData.userEmail);
          console.log('AuthContext: Successfully restored auth state:', { 
            isLoggedIn: true, 
            userName: authData.userName, 
            userEmail: authData.userEmail 
          });
        } else {
          console.log('AuthContext: Invalid or incomplete auth data, clearing localStorage');
          console.log('AuthContext: Data validation:', {
            isLoggedIn: authData.isLoggedIn,
            hasEmail: !!authData.userEmail,
            hasName: !!authData.userName
          });
          localStorage.removeItem('tripNovaAuth');
        }
      } else {
        console.log('AuthContext: No saved auth data found in localStorage');
      }
    } catch (error) {
      console.error('AuthContext: Error reading from localStorage:', error);
      localStorage.removeItem('tripNovaAuth');
    }
    
    setIsInitialized(true);
    console.log('AuthContext: Initialization complete');
  }, []);

  // Save authentication state to localStorage whenever it changes
  useEffect(() => {
    // Don't save until we've initialized
    if (!isInitialized) {
      console.log('AuthContext: Skipping save - not yet initialized');
      return;
    }
    
    console.log('AuthContext: State changed, current state:', { isLoggedIn, userName, userEmail });
    
    if (isLoggedIn && userEmail && userName) {
      const authData = {
        isLoggedIn: true,
        userName,
        userEmail,
        lastUpdated: new Date().toISOString()
      };
      console.log('AuthContext: Saving valid auth data to localStorage:', authData);
      localStorage.setItem('tripNovaAuth', JSON.stringify(authData));
    } else if (!isLoggedIn) {
      console.log('AuthContext: User logged out, clearing localStorage');
      localStorage.removeItem('tripNovaAuth');
    } else {
      console.log('AuthContext: Incomplete auth state, not saving to localStorage');
    }
  }, [isLoggedIn, userName, userEmail, isInitialized]);

  const login = (email, name) => {
    console.log('AuthContext: Login called with:', { email, name });
    const displayName = name || email.split('@')[0];
    
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserName(displayName);
    
    console.log('AuthContext: Login state updated:', { 
      isLoggedIn: true, 
      userName: displayName, 
      userEmail: email 
    });
  };

  const logout = () => {
    console.log('AuthContext: Logout called');
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    localStorage.removeItem('tripNovaAuth');
    console.log('AuthContext: Logout complete, state cleared');
  };

  const value = {
    isLoggedIn,
    userName,
    userEmail,
    login,
    logout,
    isInitialized
  };

  console.log('AuthContext: Providing value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
