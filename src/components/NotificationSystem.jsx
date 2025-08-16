import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertTriangle, Info, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Role-specific notification generator
  const generateRoleSpecificNotifications = (userRole) => {
    const baseNotifications = {
      'Supply Chain Manager': [
        {
          id: 1,
          type: 'success',
          title: 'Supply Chain Optimized',
          message: 'Inventory levels optimized across all warehouses - 12% cost reduction',
          timestamp: new Date(),
          read: false
        },
        {
          id: 2,
          type: 'warning',
          title: 'Stock Level Alert',
          message: 'Low inventory detected for Product SKU-2024-001 in Lagos warehouse',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: false
        },
        {
          id: 3,
          type: 'info',
          title: 'Supplier Update',
          message: 'New preferred supplier added for West African region',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          read: true
        }
      ],
      'Fleet Manager': [
        {
          id: 1,
          type: 'warning',
          title: 'Vehicle Maintenance Due',
          message: 'Vehicle KTN-001 requires scheduled maintenance in 2 days',
          timestamp: new Date(),
          read: false
        },
        {
          id: 2,
          type: 'success',
          title: 'Fuel Efficiency Improved',
          message: 'Fleet average fuel efficiency increased by 8% this month',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          read: false
        },
        {
          id: 3,
          type: 'info',
          title: 'Driver Performance Update',
          message: 'Monthly driver performance reports are now available',
          timestamp: new Date(Date.now() - 1000 * 60 * 90),
          read: true
        }
      ],
      'Operations Manager': [
        {
          id: 1,
          type: 'success',
          title: 'Route Optimized',
          message: 'Lagos to Accra route optimized - 15% time reduction achieved',
          timestamp: new Date(),
          read: false
        },
        {
          id: 2,
          type: 'warning',
          title: 'Delivery Delay Alert',
          message: 'Shipment SH-2024-003 delayed due to traffic congestion',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          read: false
        },
        {
          id: 3,
          type: 'info',
          title: 'Performance Metrics',
          message: 'Weekly operational efficiency report is ready for review',
          timestamp: new Date(Date.now() - 1000 * 60 * 120),
          read: true
        }
      ],
      'Driver': [
        {
          id: 1,
          type: 'info',
          title: 'New Route Assignment',
          message: 'You have been assigned route RT-2024-156 for tomorrow',
          timestamp: new Date(),
          read: false
        },
        {
          id: 2,
          type: 'warning',
          title: 'Weather Alert',
          message: 'Heavy rain expected on your route - drive safely',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          read: false
        },
        {
          id: 3,
          type: 'success',
          title: 'Performance Bonus',
          message: 'Congratulations! You earned a safety bonus this month',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          read: true
        }
      ],
      'Admin': [
        {
          id: 1,
          type: 'warning',
          title: 'System Maintenance',
          message: 'Scheduled system maintenance planned for this weekend',
          timestamp: new Date(),
          read: false
        },
        {
          id: 2,
          type: 'info',
          title: 'New User Registration',
          message: '5 new users registered in the past 24 hours',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          read: false
        },
        {
          id: 3,
          type: 'success',
          title: 'Backup Completed',
          message: 'Daily system backup completed successfully',
          timestamp: new Date(Date.now() - 1000 * 60 * 120),
          read: true
        }
      ]
    };

    // Default notifications for unknown roles
    const defaultNotifications = [
      {
        id: 1,
        type: 'info',
        title: 'Welcome to IntelliRoute',
        message: 'Explore our AI-powered logistics platform',
        timestamp: new Date(),
        read: false
      },
      {
        id: 2,
        type: 'success',
        title: 'Platform Update',
        message: 'New features have been added to improve your experience',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: true
      }
    ];

    return baseNotifications[userRole] || defaultNotifications;
  };

  // Mock real-time notifications
  useEffect(() => {
    const userRole = user?.role || 'Guest';
    const roleSpecificNotifications = generateRoleSpecificNotifications(userRole);
    setNotifications(roleSpecificNotifications);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: 'info',
        title: 'Real-time Update',
        message: `Traffic update: Route efficiency improved by ${Math.floor(Math.random() * 20 + 5)}%`,
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, [user]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800">
                View All Notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
