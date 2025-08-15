const CACHE_NAME = 'intelliroute-v2.1.0';
const STATIC_CACHE = 'intelliroute-static-v2.1.0';
const DYNAMIC_CACHE = 'intelliroute-dynamic-v2.1.0';

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/dashboard',
  '/dashboard/ai',
  '/dashboard/advanced-analytics',
  '/dashboard/supply-chain',
  '/dashboard/orders',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/images/icon-192.png',
  '/images/icon-512.png'
];

// API endpoints that should be cached
const CACHEABLE_APIS = [
  '/api/analytics/live-vehicles',
  '/api/analytics/kenyan-routes',
  '/api/ai/recommendations',
  '/api/users/me',
  '/api/supply-chain/inventory',
  '/api/orders/status',
  '/api/demand-forecasting'
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
        role: 'supply_chain_manager',
        tier: 'multi-tier',
        isOffline: true
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.pathname.includes('/api/supply-chain/')) {
      return new Response(JSON.stringify({
        producers: { active: 0, inventory: { total: 0, low: 0, critical: 0 }},
        wholesalers: { active: 0, inventory: { total: 0, low: 0, critical: 0 }},
        retailers: { active: 0, inventory: { total: 0, low: 0, critical: 0 }},
        isOffline: true,
        message: 'Offline mode - Supply chain data unavailable'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.pathname.includes('/api/orders/')) {
      return new Response(JSON.stringify({
        orders: [],
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
        isOffline: true,
        message: 'Offline mode - Order data unavailable'
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
  return CACHEABLE_APIS.some(api => pathname.includes(api));
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'supply-chain-updates') {
    event.waitUntil(syncSupplyChainUpdates());
  }
  
  if (event.tag === 'order-submissions') {
    event.waitUntil(syncOrderSubmissions());
  }
  
  if (event.tag === 'inventory-alerts') {
    event.waitUntil(syncInventoryAlerts());
  }
  
  if (event.tag === 'chat-messages') {
    event.waitUntil(syncChatMessages());
  }
});

// Sync supply chain updates when online
async function syncSupplyChainUpdates() {
  try {
    const queuedUpdates = JSON.parse(localStorage.getItem('offline_supply_chain_updates') || '[]');
    
    for (const update of queuedUpdates) {
      await fetch('/api/supply-chain/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update)
      });
    }
    
    localStorage.removeItem('offline_supply_chain_updates');
    console.log('[SW] Supply chain updates synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync supply chain updates:', error);
  }
}

// Sync order submissions made offline
async function syncOrderSubmissions() {
  try {
    const pendingOrders = JSON.parse(localStorage.getItem('pending_orders') || '[]');
    
    for (const order of pendingOrders) {
      const response = await fetch('/api/orders/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      
      if (response.ok) {
        const updatedQueue = pendingOrders.filter(o => o.id !== order.id);
        localStorage.setItem('pending_orders', JSON.stringify(updatedQueue));
      }
    }
    
    console.log('[SW] Order submissions synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync order submissions:', error);
  }
}

// Sync inventory alerts and updates
async function syncInventoryAlerts() {
  try {
    const inventoryUpdates = JSON.parse(localStorage.getItem('offline_inventory_updates') || '[]');
    
    for (const update of inventoryUpdates) {
      await fetch('/api/inventory/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update)
      });
    }
    
    localStorage.removeItem('offline_inventory_updates');
    console.log('[SW] Inventory updates synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync inventory updates:', error);
  }
}

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
    
    localStorage.removeItem('offline_chat_messages');
    console.log('[SW] Chat messages synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync chat messages:', error);
  }
}

// Sample push notifications for supply chain scenarios
const sampleNotifications = {
  inventory: [
    {
      title: "Critical Stock Alert - Maize Supply",
      body: "Producer 'Nakuru Grains Ltd' has only 2 days of stock remaining",
      icon: "/images/icon-192.png",
      badge: "/images/badge-72.png",
      data: { type: "inventory", severity: "critical", productId: "MAIZE001" },
      actions: [
        { action: "restock", title: "Place Order" },
        { action: "view", title: "View Details" }
      ]
    },
    {
      title: "Seasonal Demand Surge",
      body: "40% increase in personal care products demand across Nairobi retailers",
      icon: "/images/icon-192.png",
      badge: "/images/badge-72.png",
      data: { type: "demand", category: "personal_care", region: "Nairobi" },
      actions: [
        { action: "forecast", title: "View Forecast" },
        { action: "dismiss", title: "OK" }
      ]
    }
  ],
  orders: [
    {
      title: "New Wholesale Order Received",
      body: "East Africa Distributors placed order worth KES 280,000",
      icon: "/images/icon-192.png",
      badge: "/images/badge-72.png",
      data: { type: "order", orderId: "ORD-2024-002", tier: "wholesaler" },
      actions: [
        { action: "process", title: "Process Order" },
        { action: "view", title: "View Details" }
      ]
    },
    {
      title: "Order Status Update",
      body: "Fresh produce order to Nakuru Markets has been shipped",
      icon: "/images/icon-192.png",
      badge: "/images/badge-72.png",
      data: { type: "order_update", orderId: "ORD-2024-001", status: "shipped" }
    }
  ],
  supply_chain: [
    {
      title: "Supply Chain Disruption Alert",
      body: "Border delays affecting coffee bean imports from Uganda",
      icon: "/images/icon-192.png",
      badge: "/images/badge-72.png",
      data: { type: "disruption", product: "coffee_beans", region: "Uganda" },
      actions: [
        { action: "alternative", title: "Find Alternatives" },
        { action: "track", title: "Track Shipment" }
      ]
    },
    {
      title: "New Partner Onboarded",
      body: "Mombasa Fresh Foods joined as wholesaler with 500+ SKUs",
      icon: "/images/icon-192.png",
      badge: "/images/badge-72.png",
      data: { type: "partner", partnerId: "WSL-2024-15", tier: "wholesaler" }
    }
  ],
  logistics: [
    {
      title: "Delivery Optimization",
      body: "Route to Kisumu optimized - 1.5 hours saved, KES 2,400 fuel reduction",
      icon: "/images/icon-192.png",
      badge: "/images/badge-72.png",
      data: { type: "route", routeId: "RT001", savings: 2400 },
      actions: [
        { action: "view", title: "View Route" },
        { action: "apply", title: "Apply Changes" }
      ]
    }
  ]
};

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'IntelliRoute Africa - Supply Chain Update';
  
  // Get user role from cache to personalize notifications
  const defaultOptions = {
    body: data.body || 'New supply chain update available',
    icon: '/images/icon-192.png',
    badge: '/images/badge-72.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'supply-chain',
    data: data,
    requireInteraction: data.severity === 'critical',
    actions: data.actions || [
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
    ]
  };
  
  // Add role-specific customization
  if (data.userRole) {
    if (data.userRole === 'producer') {
      defaultOptions.badge = '/images/producer-badge.png';
    } else if (data.userRole === 'wholesaler') {
      defaultOptions.badge = '/images/wholesaler-badge.png';
    } else if (data.userRole === 'retailer') {
      defaultOptions.badge = '/images/retailer-badge.png';
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(title, defaultOptions)
  );
});

// Handle notification clicks with supply chain context
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    let url = '/dashboard';
    
    // Route based on notification type
    if (event.notification.data?.type) {
      switch (event.notification.data.type) {
        case 'inventory':
        case 'demand':
          url = '/dashboard/supply-chain';
          break;
        case 'order':
        case 'order_update':
          url = '/dashboard/orders';
          break;
        case 'disruption':
          url = '/dashboard/advanced-analytics';
          break;
        case 'route':
          url = '/dashboard';
          break;
        default:
          url = '/dashboard';
      }
    }
    
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Check if app is already open
          for (const client of clientList) {
            if (client.url.includes(url.split('?')[0]) && 'focus' in client) {
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
  
  // Handle action-specific responses
  if (event.action === 'restock') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        if (clientList.length > 0) {
          clientList[0].postMessage({
            type: 'RESTOCK_ACTION',
            productId: event.notification.data?.productId
          });
        }
      })
    );
  }
  
  if (event.action === 'process') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        if (clientList.length > 0) {
          clientList[0].postMessage({
            type: 'PROCESS_ORDER',
            orderId: event.notification.data?.orderId
          });
        }
      })
    );
  }
});

// Periodic background sync for critical supply chain updates
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync triggered:', event.tag);
  
  if (event.tag === 'update-inventory-status') {
    event.waitUntil(updateInventoryStatus());
  }
  
  if (event.tag === 'sync-order-updates') {
    event.waitUntil(syncOrderUpdates());
  }
  
  if (event.tag === 'check-supply-disruptions') {
    event.waitUntil(checkSupplyDisruptions());
  }
});

// Update inventory status in background
async function updateInventoryStatus() {
  try {
    const inventoryResponse = await fetch('/api/supply-chain/inventory/status');
    if (inventoryResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put('/api/supply-chain/inventory/status', inventoryResponse.clone());
      
      // Check for critical alerts
      const inventoryData = await inventoryResponse.json();
      if (inventoryData.criticalAlerts && inventoryData.criticalAlerts.length > 0) {
        // Show notification for critical inventory levels
        self.registration.showNotification('Critical Inventory Alert', {
          body: `${inventoryData.criticalAlerts.length} items need immediate attention`,
          icon: '/images/icon-192.png',
          badge: '/images/critical-badge.png',
          tag: 'critical-inventory',
          requireInteraction: true
        });
      }
    }
    
    console.log('[SW] Inventory status updated successfully');
  } catch (error) {
    console.error('[SW] Failed to update inventory status:', error);
  }
}

// Sync order updates in background
async function syncOrderUpdates() {
  try {
    const ordersResponse = await fetch('/api/orders/recent-updates');
    if (ordersResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put('/api/orders/recent-updates', ordersResponse.clone());
    }
    
    console.log('[SW] Order updates synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync order updates:', error);
  }
}

// Check for supply chain disruptions
async function checkSupplyDisruptions() {
  try {
    const disruptionsResponse = await fetch('/api/supply-chain/disruptions');
    if (disruptionsResponse.ok) {
      const disruptionsData = await disruptionsResponse.json();
      
      if (disruptionsData.activeDisruptions && disruptionsData.activeDisruptions.length > 0) {
        // Show notification for supply chain disruptions
        self.registration.showNotification('Supply Chain Alert', {
          body: `${disruptionsData.activeDisruptions.length} active disruptions detected`,
          icon: '/images/icon-192.png',
          badge: '/images/warning-badge.png',
          tag: 'supply-disruption',
          actions: [
            { action: 'view_disruptions', title: 'View Disruptions' },
            { action: 'dismiss', title: 'OK' }
          ]
        });
      }
    }
    
    console.log('[SW] Supply disruption check completed');
  } catch (error) {
    console.error('[SW] Failed to check supply disruptions:', error);
  }
}

// Handle messages from the main app
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CACHE_SUPPLY_CHAIN_DATA') {
    const { url, data } = event.data;
    caches.open(DYNAMIC_CACHE).then(cache => {
      cache.put(url, new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      }));
    });
  }
  
  if (event.data.type === 'UPDATE_USER_ROLE') {
    // Store user role for personalized notifications
    self.userRole = event.data.role;
  }
  
  if (event.data.type === 'SIMULATE_NOTIFICATION') {
    // For testing purposes
    const notificationType = event.data.notificationType || 'inventory';
    const notifications = sampleNotifications[notificationType];
    if (notifications && notifications.length > 0) {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      self.registration.showNotification(randomNotification.title, randomNotification);
    }
  }
});

console.log('[SW] Enhanced Supply Chain Service Worker loaded successfully');
