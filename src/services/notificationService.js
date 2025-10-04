// Real-time Notification Service
import { ErrorHandler } from '../utils/errorHandler';

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DELIVERY: 'delivery',
  ORDER: 'order',
  VEHICLE: 'vehicle',
  SYSTEM: 'system'
};

class NotificationService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.subscribers = new Map();
    this.notificationQueue = [];
    this.maxRetries = 3;
    this.retryDelay = 5000;
    this.heartbeatInterval = null;
  }

  // Initialize WebSocket connection
  async connect(token) {
    try {
      const base = import.meta.env.VITE_WS_NOTIFICATIONS_URL || 'ws://localhost:5001/ws';
      const wsUrl = `${base}?token=${token}`;
      this.socket = new WebSocket(wsUrl);

      return new Promise((resolve, reject) => {
        this.socket.onopen = () => {
          console.log('📡 WebSocket connected');
          this.isConnected = true;
          this.startHeartbeat();
          this.processQueuedNotifications();
          resolve();
        };

        this.socket.onmessage = (event) => {
          try {
            const notification = JSON.parse(event.data);
            this.handleIncomingNotification(notification);
          } catch (error) {
            console.error('Error parsing notification:', error);
          }
        };

        this.socket.onclose = (event) => {
          console.log('📡 WebSocket disconnected', event.code, event.reason);
          this.isConnected = false;
          this.stopHeartbeat();
          
          // Attempt to reconnect unless it was a manual close
          if (event.code !== 1000) {
            this.scheduleReconnect(token);
          }
        };

        this.socket.onerror = (error) => {
          console.error('📡 WebSocket error:', error);
          this.isConnected = false;
          reject(error);
        };

        // Timeout after 10 seconds
        setTimeout(() => {
          if (!this.isConnected) {
            reject(new Error('WebSocket connection timeout'));
          }
        }, 10000);
      });
    } catch (error) {
      ErrorHandler.logError(error, { context: 'NotificationService.connect' });
      throw error;
    }
  }

  // Disconnect WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.close(1000, 'Manual disconnect');
      this.socket = null;
    }
    this.isConnected = false;
    this.stopHeartbeat();
  }

  // Schedule reconnection with exponential backoff
  scheduleReconnect(token, attempt = 1) {
    if (attempt > this.maxRetries) {
      console.error('📡 Max reconnection attempts reached');
      this.notifySubscribers('CONNECTION_LOST', {
        type: NOTIFICATION_TYPES.ERROR,
        title: 'Connection Lost',
        message: 'Unable to maintain real-time connection. Please refresh the page.',
        persistent: true
      });
      return;
    }

    const delay = this.retryDelay * Math.pow(2, attempt - 1);
    console.log(`📡 Scheduling reconnection attempt ${attempt} in ${delay}ms`);

    setTimeout(async () => {
      try {
        await this.connect(token);
        console.log('📡 Reconnection successful');
      } catch (error) {
        console.error(`📡 Reconnection attempt ${attempt} failed:`, error);
        this.scheduleReconnect(token, attempt + 1);
      }
    }, delay);
  }

  // Start heartbeat to keep connection alive
  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected && this.socket) {
        this.socket.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // Every 30 seconds
  }

  // Stop heartbeat
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // Handle incoming notifications
  handleIncomingNotification(notification) {
    // Add timestamp if not present
    if (!notification.timestamp) {
      notification.timestamp = new Date().toISOString();
    }

    // Store in localStorage for persistence
    this.storeNotification(notification);

    // Notify all subscribers
    this.notifySubscribers('NOTIFICATION_RECEIVED', notification);

    // Show browser notification if permitted
    this.showBrowserNotification(notification);
  }

  // Subscribe to notifications
  subscribe(callback) {
    const id = Math.random().toString(36).substr(2, 9);
    this.subscribers.set(id, callback);
    
    return () => {
      this.subscribers.delete(id);
    };
  }

  // Notify all subscribers
  notifySubscribers(event, data) {
    this.subscribers.forEach(callback => {
      try {
        callback(event, data);
      } catch (error) {
        console.error('Error in notification subscriber:', error);
      }
    });
  }

  // Send notification (for testing purposes)
  sendNotification(notification) {
    if (this.isConnected && this.socket) {
      this.socket.send(JSON.stringify({
        type: 'notification',
        ...notification
      }));
    } else {
      // Queue for when connection is restored
      this.notificationQueue.push(notification);
    }
  }

  // Process queued notifications
  processQueuedNotifications() {
    while (this.notificationQueue.length > 0) {
      const notification = this.notificationQueue.shift();
      this.sendNotification(notification);
    }
  }

  // Store notification in localStorage
  storeNotification(notification) {
    try {
      const stored = JSON.parse(localStorage.getItem('notifications') || '[]');
      stored.unshift(notification);
      
      // Keep only last 50 notifications
      if (stored.length > 50) {
        stored.splice(50);
      }
      
      localStorage.setItem('notifications', JSON.stringify(stored));
    } catch (error) {
      console.error('Error storing notification:', error);
    }
  }

  // Get stored notifications
  getStoredNotifications() {
    try {
      return JSON.parse(localStorage.getItem('notifications') || '[]');
    } catch (error) {
      console.error('Error retrieving notifications:', error);
      return [];
    }
  }

  // Clear stored notifications
  clearStoredNotifications() {
    localStorage.removeItem('notifications');
  }

  // Show browser notification
  async showBrowserNotification(notification) {
    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(notification.title || 'IntelliRoute Alert', {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id || 'default',
        requireInteraction: notification.persistent
      });
    } else if (Notification.permission !== 'denied') {
      // Request permission
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.showBrowserNotification(notification);
      }
    }
  }

  // Request notification permission
  async requestPermission() {
    if (!('Notification' in window)) {
      return 'notsupported';
    }

    if (Notification.permission === 'default') {
      return await Notification.requestPermission();
    }

    return Notification.permission;
  }

  // Create different types of notifications
  createDeliveryNotification(delivery) {
    return {
      id: `delivery-${delivery.id}`,
      type: NOTIFICATION_TYPES.DELIVERY,
      title: 'Delivery Update',
      message: `Delivery #${delivery.trackingNumber} is now ${delivery.status}`,
      data: delivery,
      timestamp: new Date().toISOString()
    };
  }

  createOrderNotification(order) {
    return {
      id: `order-${order.id}`,
      type: NOTIFICATION_TYPES.ORDER,
      title: 'New Order',
      message: `Order #${order.orderNumber} has been placed`,
      data: order,
      timestamp: new Date().toISOString()
    };
  }

  createVehicleNotification(vehicle, status) {
    return {
      id: `vehicle-${vehicle.id}`,
      type: NOTIFICATION_TYPES.VEHICLE,
      title: 'Vehicle Alert',
      message: `Vehicle ${vehicle.licensePlate} status: ${status}`,
      data: { vehicle, status },
      timestamp: new Date().toISOString()
    };
  }

  createSystemNotification(message, level = 'info') {
    return {
      id: `system-${Date.now()}`,
      type: NOTIFICATION_TYPES.SYSTEM,
      title: 'System Notification',
      message,
      level,
      timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const notificationService = new NotificationService();

// Notification Hooks for React
export const useNotifications = () => {
  const [notifications, setNotifications] = React.useState([]);
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    // Load stored notifications
    setNotifications(notificationService.getStoredNotifications());

    // Subscribe to new notifications
    const unsubscribe = notificationService.subscribe((event, data) => {
      switch (event) {
        case 'NOTIFICATION_RECEIVED':
          setNotifications(prev => [data, ...prev.slice(0, 49)]);
          break;
        case 'CONNECTION_LOST':
          setIsConnected(false);
          setNotifications(prev => [data, ...prev]);
          break;
        default:
          break;
      }
    });

    setIsConnected(notificationService.isConnected);

    return unsubscribe;
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId 
          ? { ...n, read: true }
          : n
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
    notificationService.clearStoredNotifications();
  };

  const requestPermission = async () => {
    return await notificationService.requestPermission();
  };

  return {
    notifications,
    isConnected,
    markAsRead,
    clearAll,
    requestPermission,
    unreadCount: notifications.filter(n => !n.read).length
  };
};
