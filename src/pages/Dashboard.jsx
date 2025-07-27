import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Example roles: 'fleet_manager', 'driver', 'admin'
  switch (user.role) {
    case 'fleet_manager':
      return <Navigate to="/dashboard/fleet-manager" />;
    case 'driver':
      return <Navigate to="/dashboard/driver" />;
    case 'admin':
      return <Navigate to="/dashboard/admin" />;
    default:
      return <div>Unauthorized: Unknown role.</div>;
  }
};

export default Dashboard;
