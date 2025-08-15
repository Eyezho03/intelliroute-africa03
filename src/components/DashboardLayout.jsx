import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Bell, Settings, User, ChevronDown, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import RoleBasedNavigation from './RoleBasedNavigation';
import NotificationSystem from './NotificationSystem';
import LoadingSpinner from './LoadingSpinner';
import { ROLE_DISPLAY_NAMES } from '../utils/roleManagement';
import { apiService } from '../services/api';
import IntelliRouteLogo from '../assets/intellirouteafrica3.jpg';


const DashboardLayout = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [userLocation, setUserLocation] = useState('Nairobi, KE');

  useEffect(() => {
    // Check backend health and load initial data
    const initializeDashboard = async () => {
      try {
        const healthStatus = await apiService.healthCheck();
        setBackendStatus(healthStatus.status || 'offline');
        
        if (user) {
          // Load dashboard metrics
          try {
            const metrics = await apiService.getDashboardMetrics(user.role, user.id);
            setDashboardMetrics(metrics);
          } catch (error) {
            console.warn('Failed to load dashboard metrics:', error.message);
          }
          
          // Load notifications
          try {
            const userNotifications = await apiService.getNotifications();
            setNotifications(userNotifications);
          } catch (error) {
            console.warn('Failed to load notifications:', error.message);
            // Fallback to mock notifications
            setNotifications([
              { 
                id: 1, 
                message: 'Welcome to IntelliRoute Africa! Your dashboard is ready', 
                type: 'info', 
                unread: true, 
                timestamp: new Date(),
                action: '/onboarding'
              },
              { 
                id: 2, 
                message: 'New route optimization available for your delivery', 
                type: 'success', 
                unread: true, 
                timestamp: new Date(),
                action: '/routes'
              }
            ]);
          }
        }
      } catch (error) {
        console.error('Dashboard initialization error:', error);
        setBackendStatus('offline');
      }
    };

    if (isAuthenticated && user) {
      initializeDashboard();
      // Simulate location detection
      setTimeout(() => {
        setUserLocation('Nairobi, KE');
      }, 1000);
    }
  }, [user, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

 const handleSearch = (e) => {
  e.preventDefault();
  console.log('Search query:', searchQuery);
};

const handleNotificationClick = async (notification) => {
    try {
      if (notification.unread) {
        await apiService.markNotificationRead(notification.id);
        setNotifications(prev => 
          prev.map(n => 
            n.id === notification.id ? { ...n, unread: false } : n
          )
        );
      }
    } catch (error) {
      console.warn('Failed to mark notification as read:', error.message);
    }
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const displayName = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
      breadcrumbs.push({ name: displayName, path: currentPath });
    });
    
    return breadcrumbs;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const breadcrumbs = getBreadcrumbs();
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex">
      {/* Navigation Sidebar */}
      <RoleBasedNavigation
        isCollapsed={isNavCollapsed}
        onToggleCollapsed={() => setIsNavCollapsed(!isNavCollapsed)}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-blue-900/80 backdrop-blur-lg border-b border-blue-700 px-6 py-3 shadow-xl"
        >
          <div className="flex items-center justify-between">
            {/* Left Section - Breadcrumbs */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                className="lg:hidden p-2 rounded-lg bg-blue-800 hover:bg-blue-700 text-blue-200 hover:text-white transition-colors"
              >
                {isNavCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
              </button>
              
              {/* Logo for mobile */}
              <div className="lg:hidden">
               <img src={IntelliRouteLogo} alt="logo" />
              </div>
              
              <nav className="hidden sm:flex items-center space-x-2 text-sm">
                {breadcrumbs.map((item, index) => (
                  <div key={item.path} className="flex items-center">
                    {index > 0 && <span className="text-blue-300 mx-2">/</span>}
                    <span 
                      className={`${
                        index === breadcrumbs.length - 1 
                          ? 'text-white font-medium' 
                          : 'text-blue-200 hover:text-white'
                      } transition-colors`}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </nav>
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-lg mx-4 md:mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
                <input
                  type="text"
                  placeholder="Search orders, products, customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-blue-800/50 border border-blue-600 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </form>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-3">
              {/* Location Indicator */}
              <div className="hidden md:flex items-center text-blue-100 text-sm bg-blue-800/50 px-3 py-1 rounded-md">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{userLocation}</span>
              </div>
              
              {/* Backend Status Indicator */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className={`h-2 w-2 rounded-full ${
                  backendStatus === 'online' ? 'bg-green-400' : 
                  backendStatus === 'offline' ? 'bg-red-400' : 'bg-amber-400'
                }`} />
                <span className="text-xs text-blue-200">
                  {backendStatus === 'online' ? 'Connected' : 
                   backendStatus === 'offline' ? 'Offline' : 'Connecting...'}
                </span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg bg-blue-800 hover:bg-blue-700 text-blue-200 hover:text-white transition-colors relative"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-blue-800 border border-blue-600 rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      <NotificationSystem 
                        notifications={notifications}
                        onNotificationClick={handleNotificationClick}
                        onClose={() => setShowNotifications(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-blue-800 hover:bg-blue-700 text-white transition-colors"
                >
                  <div className="h-8 w-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt="User" className="rounded-full" />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">{user.name || user.email}</div>
                    <div className="text-xs text-blue-200">{ROLE_DISPLAY_NAMES[user.role]}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-blue-300" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-blue-800 border border-blue-600 rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      <div className="py-1">
                        <button className="flex items-center w-full px-4 py-2 text-sm text-blue-100 hover:bg-blue-700 hover:text-white transition-colors">
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-sm text-blue-100 hover:bg-blue-700 hover:text-white transition-colors">
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </button>
                        <hr className="border-blue-700 my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-amber-400 hover:bg-amber-600/20 hover:text-amber-300 transition-colors"
                        >
                          <X className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-b from-blue-50 to-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 md:p-6"
          >
            <Outlet context={{ dashboardMetrics, backendStatus }} />
          </motion.div>
        </main>
      </div>

      {/* Click outside handlers */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default DashboardLayout;