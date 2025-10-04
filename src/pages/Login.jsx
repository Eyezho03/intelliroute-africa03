// Login.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [users, setUsers] = useState([]);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
      const user = await login(email, password);
      
      // Role-based navigation
      let redirectPath;
      const from = location.state?.from?.pathname;
      
      if (from) {
        redirectPath = from;
      } else {
        // Default redirects based on user role
        switch (user.role) {
          case 'admin':
            redirectPath = '/dashboard/admin';
            break;
          case 'driver':
            redirectPath = '/dashboard/driver';
            break;
          case 'fleet-manager':
            redirectPath = '/dashboard/fleet-manager';
            break;
          case 'producer':
            redirectPath = '/dashboard/manufacturer';
            break;
          case 'wholesaler':
            redirectPath = '/dashboard/wholesaler';
            break;
          case 'retailer':
            redirectPath = '/dashboard/retailer';
            break;
          default:
            redirectPath = '/dashboard';
        }
      }
      
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.warn('Login error:', err);
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

  const createDemoUsers = () => {
    const demoUsers = [
      {
        id: Date.now() + 1,
        fullName: 'Admin User',
        email: 'admin@intelliroute.com',
        password: 'admin123',
        role: 'admin',
        company: 'IntelliRoute Africa',
        createdAt: new Date().toISOString()
      },
      {
        id: Date.now() + 2,
        fullName: 'John Driver',
        email: 'driver@intelliroute.com',
        password: 'driver123',
        role: 'driver',
        company: 'IntelliRoute Logistics',
        vehicleId: 'KBZ-123A',
        createdAt: new Date().toISOString()
      },
      {
        id: Date.now() + 3,
        fullName: 'Fleet Manager',
        email: 'fleet@intelliroute.com',
        password: 'fleet123',
        role: 'fleet-manager',
        company: 'IntelliRoute Fleet Services',
        createdAt: new Date().toISOString()
      },
      {
        id: Date.now() + 4,
        fullName: 'Producer Mike',
        email: 'producer@intelliroute.com',
        password: 'producer123',
        role: 'producer',
        company: 'Nakuru Grains Ltd',
        businessType: 'Agricultural Producer',
        createdAt: new Date().toISOString()
      },
      {
        id: Date.now() + 5,
        fullName: 'Wholesaler Sarah',
        email: 'wholesaler@intelliroute.com',
        password: 'wholesale123',
        role: 'wholesaler',
        company: 'East Africa Distributors',
        businessType: 'Wholesale Distribution',
        createdAt: new Date().toISOString()
      },
      {
        id: Date.now() + 6,
        fullName: 'Retailer Jane',
        email: 'retailer@intelliroute.com',
        password: 'retail123',
        role: 'retailer',
        company: 'Nairobi Fresh Markets',
        businessType: 'Retail Store',
        createdAt: new Date().toISOString()
      }
    ];
    
    const currentUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Filter out existing demo users to avoid duplicates
    const nonDemoUsers = currentUsers.filter(u => !u.email.includes('@intelliroute.com'));
    const updatedUsers = [...nonDemoUsers, ...demoUsers];
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    alert(`✅ Created ${demoUsers.length} demo users!\n\nAdmin: admin@intelliroute.com / admin123\nDriver: driver@intelliroute.com / driver123\nFleet Manager: fleet@intelliroute.com / fleet123\nProducer: producer@intelliroute.com / producer123\nWholesaler: wholesaler@intelliroute.com / wholesale123\nRetailer: retailer@intelliroute.com / retail123`);
  };
  
  const fillDemoCredentials = (role) => {
    const credentials = {
      admin: { email: 'admin@intelliroute.com', password: 'admin123' },
      driver: { email: 'driver@intelliroute.com', password: 'driver123' },
      'fleet-manager': { email: 'fleet@intelliroute.com', password: 'fleet123' },
      producer: { email: 'producer@intelliroute.com', password: 'producer123' },
      wholesaler: { email: 'wholesaler@intelliroute.com', password: 'wholesale123' },
      retailer: { email: 'retailer@intelliroute.com', password: 'retail123' }
    };
    
    if (credentials[role]) {
      setEmail(credentials[role].email);
      setPassword(credentials[role].password);
    }
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Enter your email"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Enter your password"
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
              <div className="space-y-2">
                <div className="flex gap-1 flex-wrap">
                  <button
                    onClick={createDemoUsers}
                    className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                  >
                    Create All Demo Users
                  </button>
                  <button
                    onClick={clearStorage}
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                  >
                    Clear Storage
                  </button>
                </div>
                
                <div className="border-t pt-2">
                  <p className="text-gray-600 mb-1 font-medium">Quick Login:</p>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      onClick={() => fillDemoCredentials('admin')}
                      className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => fillDemoCredentials('driver')}
                      className="px-2 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
                    >
                      Driver
                    </button>
                    <button
                      onClick={() => fillDemoCredentials('fleet-manager')}
                      className="px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600"
                    >
                      Fleet
                    </button>
                    <button
                      onClick={() => fillDemoCredentials('producer')}
                      className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                    >
                      Producer
                    </button>
                    <button
                      onClick={() => fillDemoCredentials('wholesaler')}
                      className="px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
                    >
                      Wholesaler
                    </button>
                    <button
                      onClick={() => fillDemoCredentials('retailer')}
                      className="px-2 py-1 bg-pink-500 text-white text-xs rounded hover:bg-pink-600"
                    >
                      Retailer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;