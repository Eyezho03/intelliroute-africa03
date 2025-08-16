// Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import DriverDashboard from '../pages/DriverDashboard';
import ManufacturerDashboard from '../pages/ManufacturerDashboard';
import WholesalerDashboard from '../pages/WholesalerDashboard';
import RetailerDashboard from '../pages/RetailerDashboard';
import AdminDashboard from '../pages/AdminPanel';

const Dashboard = () => {
  const { isAuthenticated, user, loading, error } = useAuth();

  // Normalize role names
  const normalizeRole = (role) => {
    if (!role) return 'unassigned';
    
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes('admin')) return 'admin';
    if (lowerRole === 'driver' || lowerRole.includes('driver')) return 'driver';
    if (lowerRole === 'producer' || lowerRole.includes('manufacturer') || lowerRole.includes('production')) return 'manufacturer';
    if (lowerRole === 'wholesaler' || lowerRole.includes('wholesaler') || lowerRole.includes('distribution')) return 'wholesaler';
    if (lowerRole === 'retailer' || lowerRole.includes('retailer') || lowerRole.includes('retail') || lowerRole.includes('store')) return 'retailer';
    if (lowerRole === 'fleet-manager' || lowerRole.includes('fleet')) return 'driver'; // Fleet managers use driver dashboard
    return role;
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Handle authentication errors
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
          <div className="text-red-500 text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Retry Authentication
          </button>
          <div className="mt-6">
            <button 
              className="text-blue-600 hover:underline"
              onClick={() => window.location.href = '/contact-support'}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle unauthenticated access
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
          <div className="text-red-500 text-5xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-6">
            You must be logged in to access this dashboard.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Get normalized role
  const role = normalizeRole(user?.role);
  
  // Render appropriate dashboard
  switch (role) {
    case 'driver':
      return <DriverDashboard user={user} />;
    case 'manufacturer':
      return <ManufacturerDashboard user={user} />;
    case 'wholesaler':
      return <WholesalerDashboard user={user} />;
    case 'retailer':
      return <RetailerDashboard user={user} />;
    case 'admin':
      return <AdminDashboard user={user} />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold text-red-600 mb-2">Unauthorized Access</h1>
            <p className="text-lg text-gray-700 mb-2">
              Your account role ({user?.role || 'unassigned'}) doesn't have dashboard access.
            </p>
            <p className="text-gray-600 mb-6">
              Please contact your administrator for assistance.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                onClick={() => window.location.href = '/contact-support'}
              >
                Contact Support
              </button>
              <button 
                className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition"
                onClick={() => window.location.href = '/'}
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
  }
};

export default Dashboard;