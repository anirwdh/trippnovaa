import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_CONFIG } from '../config/adminConfig';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize admin auth state from localStorage on mount
  useEffect(() => {
    try {
      const adminAuthData = localStorage.getItem(ADMIN_CONFIG.SESSION.AUTH_KEY);
      if (adminAuthData) {
        const parsedAuth = JSON.parse(adminAuthData);
        const now = new Date();
        const lastUpdated = new Date(parsedAuth.lastUpdated);
        
        // Check if the session is still valid (24 hours)
        const hoursSinceLastUpdate = (now - lastUpdated) / (1000 * 60 * 60);
        if (hoursSinceLastUpdate < 24) {
          setIsAdminLoggedIn(true);
          setAdminUser(parsedAuth.adminUser);
          setAdminToken(parsedAuth.adminToken);
          console.log('AdminAuthContext: Admin session restored from localStorage');
        } else {
          // Session expired, clear it
          localStorage.removeItem(ADMIN_CONFIG.SESSION.AUTH_KEY);
          console.log('AdminAuthContext: Admin session expired, cleared localStorage');
        }
      } else {
        console.log('AdminAuthContext: No saved admin auth data found in localStorage');
      }
    } catch (error) {
      console.error('AdminAuthContext: Error reading from localStorage:', error);
      localStorage.removeItem(ADMIN_CONFIG.SESSION.AUTH_KEY);
    }
    
    setIsInitialized(true);
    console.log('AdminAuthContext: Admin initialization complete');
  }, []);

  // Save admin authentication state to localStorage whenever it changes
  useEffect(() => {
    // Don't save until we've initialized
    if (!isInitialized) {
      console.log('AdminAuthContext: Skipping save - not yet initialized');
      return;
    }
    
    console.log('AdminAuthContext: Admin state changed, current state:', { isAdminLoggedIn, adminUser });
    
    if (isAdminLoggedIn && adminUser && adminToken) {
      const adminAuthData = {
        isAdminLoggedIn: true,
        adminUser,
        adminToken,
        lastUpdated: new Date().toISOString()
      };
      console.log('AdminAuthContext: Saving valid admin auth data to localStorage:', adminAuthData);
      localStorage.setItem(ADMIN_CONFIG.SESSION.AUTH_KEY, JSON.stringify(adminAuthData));
    } else if (!isAdminLoggedIn) {
      console.log('AdminAuthContext: Admin logged out, clearing localStorage');
      localStorage.removeItem(ADMIN_CONFIG.SESSION.AUTH_KEY);
    } else {
      console.log('AdminAuthContext: Incomplete admin auth state, not saving to localStorage');
    }
  }, [isAdminLoggedIn, adminUser, adminToken, isInitialized]);

  const adminLogin = (adminData) => {
    console.log('AdminAuthContext: Admin login called with:', adminData);
    
    // Get token from localStorage
    const token = localStorage.getItem(ADMIN_CONFIG.SESSION.TOKEN_KEY);
    
    setIsAdminLoggedIn(true);
    setAdminUser(adminData);
    setAdminToken(token);
    
    console.log('AdminAuthContext: Admin login state updated:', { 
      isAdminLoggedIn: true, 
      adminUser: adminData,
      adminToken: token
    });
  };

  const adminLogout = () => {
    console.log('AdminAuthContext: Admin logout called');
    
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    setAdminToken(null);
    
    // Clear admin token from localStorage
    localStorage.removeItem(ADMIN_CONFIG.SESSION.TOKEN_KEY);
    
    console.log('AdminAuthContext: Admin logout state updated');
  };

  const value = {
    isAdminLoggedIn,
    adminUser,
    adminToken,
    isInitialized,
    adminLogin,
    adminLogout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
