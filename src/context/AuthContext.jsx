// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

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

  // Refresh authentication
  const refreshAuth = async () => {
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
      setAuth({ isAuthenticated: false, user: null, loading: false, error: err.message });
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));
      
      // In a real app, this would call your authentication API
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const user = users.find(u => u.email === email && u.password === password);
          
          if (user) {
            const token = `token-${Date.now()}-${Math.random()}`;
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify(user));
            setAuth({ isAuthenticated: true, user, loading: false, error: null });
            resolve(user);
          } else {
            const error = new Error('Invalid email or password. Please check your credentials.');
            setAuth({ isAuthenticated: false, user: null, loading: false, error: error.message });
            reject(error);
          }
        }, 1000);
      });
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setAuth({ isAuthenticated: false, user: null, loading: false, error: errorMessage });
      throw err;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          
          // Check if user already exists
          const existingUser = users.find(u => u.email === userData.email);
          if (existingUser) {
            const error = new Error('User with this email already exists');
            setAuth({ isAuthenticated: false, user: null, loading: false, error: error.message });
            reject(error);
            return;
          }
          
          // Create new user
          const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
          };
          
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          
          // Auto login after registration
          const token = `token-${Date.now()}-${Math.random()}`;
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          setAuth({ isAuthenticated: true, user: newUser, loading: false, error: null });
          resolve(newUser);
        }, 1000);
      });
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setAuth({ isAuthenticated: false, user: null, loading: false, error: errorMessage });
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setAuth({ isAuthenticated: false, user: null, loading: false, error: null });
  };

  // Initialize authentication
  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, register, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);