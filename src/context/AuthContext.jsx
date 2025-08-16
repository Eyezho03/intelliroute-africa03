// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
  });

  // Verify token function
  const verifyToken = async (token) => {
    try {
      if (!token) throw new Error('No token found');

      // In a real app, this would call your backend to verify the token
      return new Promise((resolve) => {
        setTimeout(() => {
          // Get user from localStorage
          const userData = localStorage.getItem('currentUser');
          if (userData) {
            resolve(JSON.parse(userData));
          } else {
            throw new Error('User data not found');
          }
        }, 500);
      });
    } catch (err) {
      throw new Error(`Token verification failed: ${err.message}`);
    }
  };

  // Refresh authentication (useCallback to prevent re-renders)
  const refreshAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuth({ isAuthenticated: false, user: null, loading: false, error: null });
        return;
      }

      const userData = await verifyToken(token);
      setAuth({ isAuthenticated: true, user: userData, loading: false, error: null });
    } catch (err) {
      console.error('Auth verification failed:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setAuth({ isAuthenticated: false, user: null, loading: false, error: err.message });
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));

      const response = await apiService.login({ email, password });

      if (response.user && response.token) {
        setAuth({
          isAuthenticated: true,
          user: response.user,
          loading: false,
          error: null
        });
        return response.user;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setAuth({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: errorMessage
      });
      throw err;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));

      const response = await apiService.register(userData);

      if (response.user && response.token) {
        setAuth({
          isAuthenticated: true,
          user: response.user,
          loading: false,
          error: null
        });
        return response.user;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setAuth({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: errorMessage
      });
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.warn('Logout API call failed:', error.message);
    } finally {
      setAuth({ isAuthenticated: false, user: null, loading: false, error: null });
    }
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      const updatedUser = await apiService.updateProfile(userData);
      setAuth(prev => ({ ...prev, user: updatedUser }));
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  // Initialize authentication
  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext.Provider value={{
      ...auth,
      login,
      logout,
      register,
      refreshAuth,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);