import React, { useState, useEffect } from 'react';
import { X, Bell, Check, AlertTriangle, Info, Truck, Package } from 'lucide-react';
import { NOTIFICATION_TYPES } from '../services/notificationService';

const NotificationToast = ({ notification, onClose, onMarkAsRead }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      if (onMarkAsRead) onMarkAsRead(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return <Check className="w-5 h-5 text-green-600" />;
      case NOTIFICATION_TYPES.ERROR:
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case NOTIFICATION_TYPES.WARNING:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case NOTIFICATION_TYPES.DELIVERY:
        return <Truck className="w-5 h-5 text-blue-600" />;
      case NOTIFICATION_TYPES.ORDER:
        return <Package className="w-5 h-5 text-purple-600" />;
      case NOTIFICATION_TYPES.VEHICLE:
        return <Truck className="w-5 h-5 text-orange-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return 'bg-green-50 border-green-200';
      case NOTIFICATION_TYPES.ERROR:
        return 'bg-red-50 border-red-200';
      case NOTIFICATION_TYPES.WARNING:
        return 'bg-yellow-50 border-yellow-200';
      case NOTIFICATION_TYPES.DELIVERY:
        return 'bg-blue-50 border-blue-200';
      case NOTIFICATION_TYPES.ORDER:
        return 'bg-purple-50 border-purple-200';
      case NOTIFICATION_TYPES.VEHICLE:
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 max-w-sm w-full bg-white border rounded-lg shadow-lg z-50
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getBackgroundColor()}
      `}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">
              {notification.title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {notification.message}
            </p>
            {notification.timestamp && (
              <p className="mt-1 text-xs text-gray-400">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
