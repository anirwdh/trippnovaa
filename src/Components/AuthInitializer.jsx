import React, { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { initializeAuth } from '../redux/slices/authSlice';

function AuthInitializer({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize auth state from localStorage when component mounts
    dispatch(initializeAuth());
  }, [dispatch]);

  return children;
}

export default AuthInitializer;
