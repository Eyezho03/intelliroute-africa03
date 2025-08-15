// IntelliRoute Africa Service Worker
// Provides offline functionality and intelligent caching

const CACHE_NAME = 'intelliroute-v1.0.0';
const STATIC_CACHE = 'intelliroute-static-v1.0.0';
const DYNAMIC_CACHE = 'intelliroute-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/dashboard/ai',
  '/dashboard/advanced-analytics',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// API endpoints that should be cached
const CACHEABLE_APIS = [
  '/api/analytics/live-vehicles',
  '/api/analytics/kenyan-routes',
  '/api/ai/recommendations',
  '/api/users/me'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Failed to cache static assets:', err);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== CACHE_NAME
            )
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests with intelligent caching
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request));
    return;
  }

  // Handle static assets and pages
  event.respondWith(handleStaticRequest(request));
});

// Handle API requests with network-first strategy
async function handleAPIRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Try network first for fresh data
    const networkResponse = await fetch(request);
    
    // Cache successful responses for cacheable endpoints
    if (networkResponse.ok && shouldCacheAPI(url.pathname)) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache for:', request.url);
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for critical endpoints
    if (url.pathname.includes('/api/users/me')) {
      return new Response(JSON.stringify({
        id: 'offline-user',
        name: 'Offline User',
        role: 'user',
        isOffline: true
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.pathname.includes('/api/analytics/')) {
      return new Response(JSON.stringify({
        activeVehicles: 0,
        dailyDeliveries: 0,
        savedCosts: 0,
        efficiency: 0,
        isOffline: true,
        message: 'Offline mode - cached data unavailable'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    throw error;
  }
}

// Handle static requests with cache-first strategy
async function handleStaticRequest(request) {
  // Try cache first for static assets
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Try network for new assets
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    throw error;
  }
}

// Check if API endpoint should be cached
function shouldCacheAPI(pathname) {
  return CACHEABLE_APIs.some(api => pathname.includes(api));
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'chat-messages') {
    event.waitUntil(syncChatMessages());
  }
  
  if (event.tag === 'business-applications') {
    event.waitUntil(syncBusinessApplications());
  }
  
  if (event.tag === 'analytics-data') {
    event.waitUntil(syncAnalyticsData());
  }
});

// Sync queued chat messages when online
async function syncChatMessages() {
  try {
    const queuedMessages = JSON.parse(localStorage.getItem('offline_chat_messages') || '[]');
    
    for (const message of queuedMessages) {
      await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
    }
    
    // Clear synced messages
    localStorage.removeItem('offline_chat_messages');
    console.log('[SW] Chat messages synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync chat messages:', error);
  }
}

// Sync business applications submitted offline
async function syncBusinessApplications() {
  try {
    const pendingApplications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');
    
    for (const application of pendingApplications) {
      const response = await fetch('/api/onboarding/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application)
      });
      
      if (response.ok) {
        // Remove from pending queue
        const updatedQueue = pendingApplications.filter(app => app.id !== application.id);
        localStorage.setItem('pendingApplications', JSON.stringify(updatedQueue));
      }
    }
    
    console.log('[SW] Business applications synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync business applications:', error);
  }
}

// Sync analytics data collection
async function syncAnalyticsData() {
  try {
    const offlineAnalytics = JSON.parse(localStorage.getItem('offline_analytics') || '[]');
    
    for (const data of offlineAnalytics) {
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    
    localStorage.removeItem('offline_analytics');
    console.log('[SW] Analytics data synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync analytics data:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'IntelliRoute Africa';
  const options = {
    body: data.body || 'New update available',
    icon: '/images/icon-192.png',
    badge: '/images/badge-72.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'general',
    actions: [
      {
        action: 'open',
        title: 'View Details',
        icon: '/images/action-open.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/images/action-dismiss.png'
      }
    ],
    data: data
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data?.url || '/dashboard';
    
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Check if app is already open
          for (const client of clientList) {
            if (client.url.includes(url) && 'focus' in client) {
              return client.focus();
            }
          }
          
          // Open new window
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        })
    );
  }
});

// Periodic background sync for critical updates
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync triggered:', event.tag);
  
  if (event.tag === 'update-critical-data') {
    event.waitUntil(updateCriticalData());
  }
});

// Update critical data in background
async function updateCriticalData() {
  try {
    // Update vehicle statuses
    const vehicleResponse = await fetch('/api/analytics/live-vehicles');
    if (vehicleResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put('/api/analytics/live-vehicles', vehicleResponse.clone());
    }
    
    // Update route data
    const routeResponse = await fetch('/api/analytics/kenyan-routes');
    if (routeResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put('/api/analytics/kenyan-routes', routeResponse.clone());
    }
    
    console.log('[SW] Critical data updated successfully');
  } catch (error) {
    console.error('[SW] Failed to update critical data:', error);
  }
}

// Handle messages from the main app
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CACHE_ROUTE') {
    const { url, data } = event.data;
    caches.open(DYNAMIC_CACHE).then(cache => {
      cache.put(url, new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      }));
    });
  }
});
