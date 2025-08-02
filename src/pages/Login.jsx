// Login.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [users, setUsers] = useState([]);
  const { login } = useAuth();

  // Load users from localStorage for debugging
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Attempting login with:', { email, password });
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      console.log('Stored users:', storedUsers);
      
      await login(email, password);
      console.log('Login successful, redirecting to dashboard');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearStorage = () => {
    localStorage.removeItem('users');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setUsers([]);
    alert('Storage cleared!');
  };

  const createDemoUser = () => {
    const demoUser = {
      id: Date.now(),
      fullName: 'Demo User',
      email: 'demo@intelliroute.com',
      password: 'demo123',
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    
    const currentUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = [...currentUsers, demoUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    // Auto-fill the form
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    
    alert('Demo user created! Email: demo@intelliroute.com, Password: demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register now
            </a>
          </p>
        </div>
        
        {/* Debug Panel */}
        <div className="mt-6 border-t pt-4">
          <button
            type="button"
            onClick={() => setShowDebug(!showDebug)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {showDebug ? 'Hide' : 'Show'} Debug Info
          </button>
          
          {showDebug && (
            <div className="mt-3 p-3 bg-gray-50 rounded text-xs">
              <div className="mb-2">
                <strong>Registered Users ({users.length}):</strong>
                {users.length === 0 ? (
                  <p className="text-gray-500 mt-1">No users registered yet</p>
                ) : (
                  <ul className="mt-1 space-y-1">
                    {users.map((user, index) => (
                      <li key={index} className="bg-white p-2 rounded">
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Name:</strong> {user.fullName}</div>
                        <div><strong>Role:</strong> {user.role}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={createDemoUser}
                  className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                >
                  Create Demo User
                </button>
                <button
                  onClick={clearStorage}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Clear Storage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;