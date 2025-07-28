import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";


const Dashboard = () => {
  const { user, loading, refreshAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Refresh authentication state on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await refreshAuth();
      } catch (error) {
        console.error('Authentication refresh failed:', error);
      }
    };

    verifyAuth();
  }, [refreshAuth]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <LoadingSpinner size="xl" />
        <span className="ml-3 text-gray-600">Verifying your credentials...</span>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based redirection
  let redirectPath = '/';
  switch (user.role) {
    case 'fleet_manager':
      redirectPath = '/dashboard/fleet-manager';
      break;
    case 'driver':
      redirectPath = '/dashboard/driver';
      break;
    case 'admin':
      redirectPath = '/dashboard/admin';
      break;
    case 'operations':
      redirectPath = '/dashboard/operations';
      break;
    case 'finance':
      redirectPath = '/dashboard/finance';
      break;
    default:
      // Log unrecognized roles for debugging
      console.warn(`Unrecognized role: ${user.role}`);
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
            <p className="text-gray-700 mb-6">
              Your account role ({user.role}) doesn't have assigned dashboard access. 
              Please contact your administrator.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      );
  }

  return <Navigate to={redirectPath} replace />;
};

export default Dashboard;