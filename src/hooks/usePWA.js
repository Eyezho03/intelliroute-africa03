import { useState, useEffect } from 'react';

/**
 * Custom hook for PWA functionality
 * Handles service worker registration, installation prompts, and offline status
 */
export const usePWA = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstallable, setIsInstallable] = useState(false);
  const [installation, setInstallation] = useState(null);
  const [swRegistration, setSWRegistration] = useState(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Check if app is installed
  useEffect(() => {
    // Check if running in standalone mode (installed PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = window.navigator.standalone === true;
    const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches;
    
    setIsInstalled(isStandalone || isInWebAppiOS || isInWebAppChrome);
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('🌐 App is back online');
      
      // Trigger background sync when back online
      if (swRegistration?.sync) {
        try {
          swRegistration.sync.register('sync-offline-data');
        } catch (error) {
          console.warn('Background sync not supported');
        }
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('📱 App is now offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [swRegistration]);

  // Service Worker registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    } else {
      console.warn('Service workers not supported');
    }
  }, []);

  // Install prompt handling
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      console.log('💾 PWA install prompt available');
      event.preventDefault();
      setInstallation(event);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log('✅ PWA installed successfully');
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallation(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Register service worker
  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('✅ Service Worker registered successfully');
      setSWRegistration(registration);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('🔄 New service worker available');
            setUpdateAvailable(true);
          }
        });
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', handleSWMessage);

      return registration;
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
      throw error;
    }
  };

  // Handle messages from service worker
  const handleSWMessage = (event) => {
    const { data } = event;
    
    switch (data.type) {
      case 'CACHE_UPDATED':
        console.log('📦 Cache updated:', data.url);
        break;
        
      case 'OFFLINE_BACKUP':
        console.log('💾 Data backed up for offline use');
        break;
        
      case 'SYNC_COMPLETED':
        console.log('🔄 Background sync completed');
        break;
        
      default:
        console.log('📨 Message from SW:', data);
    }
  };

  // Install PWA
  const installPWA = async () => {
    if (!installation) {
      throw new Error('Installation not available');
    }

    try {
      console.log('📱 Triggering PWA installation...');
      
      const result = await installation.prompt();
      console.log('💾 Installation result:', result.outcome);

      if (result.outcome === 'accepted') {
        setIsInstallable(false);
        setInstallation(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('❌ Installation failed:', error);
      throw error;
    }
  };

  // Update service worker
  const updateSW = async () => {
    if (!swRegistration?.waiting) {
      throw new Error('No update available');
    }

    try {
      console.log('🔄 Updating service worker...');
      
      // Tell the waiting service worker to skip waiting
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload page after update
      window.location.reload();
    } catch (error) {
      console.error('❌ Service worker update failed:', error);
      throw error;
    }
  };

  // Cache important data for offline use
  const cacheForOffline = (url, data) => {
    if (swRegistration) {
      swRegistration.active?.postMessage({
        type: 'CACHE_ROUTE',
        url,
        data
      });
    }
  };

  // Request permission for notifications
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported');
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  };

  // Subscribe to push notifications
  const subscribeToPushNotifications = async () => {
    if (!swRegistration?.pushManager) {
      throw new Error('Push messaging not supported');
    }

    try {
      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
      });

      console.log('🔔 Push notification subscription successful');
      return subscription;
    } catch (error) {
      console.error('❌ Push subscription failed:', error);
      throw error;
    }
  };

  // Show local notification
  const showNotification = (title, options = {}) => {
    if (swRegistration) {
      swRegistration.showNotification(title, {
        icon: '/images/icon-192.png',
        badge: '/images/badge-72.png',
        vibrate: [200, 100, 200],
        tag: 'intelliroute-notification',
        ...options
      });
    }
  };

  // Get app info for debugging
  const getAppInfo = () => ({
    isOnline,
    isInstalled,
    isInstallable,
    updateAvailable,
    swRegistered: !!swRegistration,
    notificationsSupported: 'Notification' in window,
    notificationPermission: Notification?.permission,
    pushSupported: !!swRegistration?.pushManager,
    standalone: window.matchMedia('(display-mode: standalone)').matches
  });

  return {
    // State
    isOnline,
    isInstalled,
    isInstallable,
    updateAvailable,
    swRegistration,
    
    // Actions
    installPWA,
    updateSW,
    cacheForOffline,
    requestNotificationPermission,
    subscribeToPushNotifications,
    showNotification,
    
    // Utils
    getAppInfo
  };
};

export default usePWA;
