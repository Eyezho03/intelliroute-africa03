import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import db, { migrate } from './db.js';
import routeOptimizer from './routeOptimizer.js';
import trackingService from './trackingService.js';
import analyticsService from './analyticsService.js';

const PORT_HTTP = process.env.PORT || 5002; // REST expected by frontend default
const PORT_NOTIFICATIONS = process.env.WS_NOTIFICATIONS_PORT || 5001; // matches notificationService
const PORT_MOBILE = process.env.WS_MOBILE_PORT || 3001; // matches mobileIntegration

const app = express();
app.use(cors());
app.use(express.json());

// Run migrations and ensure seed
migrate();

// Start tracking service
trackingService.start();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Health
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!row || row.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: row.id, email: row.email, role: row.role }, JWT_SECRET, { expiresIn: '12h' });
  return res.json({ token, user: { id: row.id, email: row.email, role: row.role, name: row.name, fullName: row.name } });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, name, role = 'business' } = req.body || {};
  const exists = db.prepare('SELECT 1 FROM users WHERE email = ?').get(email);
  if (exists) return res.status(422).json({ message: 'User exists' });
  const id = uuidv4();
  db.prepare('INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)')
    .run(id, email, password, name, role);
  const token = jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: '12h' });
  return res.json({ token, user: { id, email, role, name } });
});

app.post('/api/auth/logout', (_req, res) => res.json({ success: true }));
app.post('/api/auth/refresh', (_req, res) => res.json({ token: jwt.sign({ sys: 'refresh' }, JWT_SECRET, { expiresIn: '12h' }) }));
app.get('/api/auth/me', authMiddleware, (req, res) => res.json({ id: req.user.id, email: req.user.email, role: req.user.role }));
app.put('/api/auth/profile', authMiddleware, (req, res) => {
  const { name } = req.body || {};
  const userEntry = [...users.values()].find(u => u.id === req.user.id);
  if (userEntry) userEntry.name = name || userEntry.name;
  return res.json({ success: true, user: { id: req.user.id, email: req.user.email, role: req.user.role, name: userEntry?.name } });
});

// Users (stubs)
app.get('/api/users/drivers', authMiddleware, (_req, res) => res.json([]));
app.get('/api/users/fleet-managers', authMiddleware, (_req, res) => res.json([]));
app.get('/api/users/business-users', authMiddleware, (_req, res) => res.json([]));
app.get('/api/users', authMiddleware, (_req, res) => {
  const rows = db.prepare('SELECT id, email, name, role, created_at FROM users').all();
  res.json(rows);
});

// Products
app.get('/api/products', authMiddleware, (_req, res) => {
  const rows = db.prepare('SELECT * FROM products').all();
  res.json(rows);
});
app.get('/api/products/:id', authMiddleware, (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.json(row || null);
});
app.post('/api/products', authMiddleware, (req, res) => {
  const id = uuidv4();
  const { name, sku, price = 0 } = req.body || {};
  db.prepare('INSERT INTO products (id, name, sku, price) VALUES (?, ?, ?, ?)')
    .run(id, name, sku, price);
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  res.json(row);
});
app.put('/api/products/:id', authMiddleware, (req, res) => {
  const { name, sku, price } = req.body || {};
  db.prepare('UPDATE products SET name = COALESCE(?, name), sku = COALESCE(?, sku), price = COALESCE(?, price) WHERE id = ?')
    .run(name, sku, price, req.params.id);
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  res.json(row);
});
app.delete('/api/products/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Inventory
app.get('/api/inventory', authMiddleware, (_req, res) => {
  const rows = db.prepare('SELECT * FROM inventory').all();
  res.json(rows);
});
app.put('/api/inventory/:productId', authMiddleware, (req, res) => {
  const { productId } = req.params;
  const { quantity, reorder_level, location } = req.body || {};
  db.prepare('INSERT INTO inventory (product_id, quantity, reorder_level, location, updated_at) VALUES (?, COALESCE(?,0), COALESCE(?,0), ?, CURRENT_TIMESTAMP) ON CONFLICT(product_id) DO UPDATE SET quantity = COALESCE(?, inventory.quantity), reorder_level = COALESCE(?, inventory.reorder_level), location = COALESCE(?, inventory.location), updated_at = CURRENT_TIMESTAMP')
    .run(productId, quantity, reorder_level, location, quantity, reorder_level, location);
  const row = db.prepare('SELECT * FROM inventory WHERE product_id = ?').get(productId);
  res.json(row);
});
app.get('/api/inventory/alerts', authMiddleware, (_req, res) => res.json([]));

// Orders
app.get('/api/orders', authMiddleware, (_req, res) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  res.json(rows);
});
app.get('/api/orders/:id', authMiddleware, (req, res) => {
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  res.json(row || null);
});
app.post('/api/orders', authMiddleware, (req, res) => {
  const id = uuidv4();
  const { customer_name, total = 0 } = req.body || {};
  db.prepare('INSERT INTO orders (id, customer_name, status, total) VALUES (?, ?, ?, ?)')
    .run(id, customer_name, 'created', total);
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  res.json(row);
});
app.patch('/api/orders/:id/status', authMiddleware, (req, res) => {
  const { status } = req.body || {};
  db.prepare('UPDATE orders SET status = COALESCE(?, status) WHERE id = ?').run(status, req.params.id);
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  res.json(row);
});
app.post('/api/orders/:id/cancel', authMiddleware, (req, res) => {
  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run('cancelled', req.params.id);
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  res.json(row);
});
app.post('/api/orders/:id/assign-driver', authMiddleware, (req, res) => {
  const { driverId } = req.body || {};
  db.prepare('UPDATE orders SET assigned_driver_id = ? WHERE id = ?').run(driverId, req.params.id);
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  res.json(row);
});

// Enhanced Deliveries with Tracking
app.get('/api/deliveries', authMiddleware, (_req, res) => {
  const activeDeliveries = trackingService.getActiveDeliveries();
  res.json(activeDeliveries);
});

app.get('/api/deliveries/:id', authMiddleware, (req, res) => {
  const tracking = trackingService.getDeliveryTracking(req.params.id);
  res.json(tracking || { error: 'Delivery not found' });
});

app.post('/api/deliveries/:id/start-tracking', authMiddleware, (req, res) => {
  const { driverId, vehicleId, route } = req.body || {};
  const tracking = trackingService.startDeliveryTracking(req.params.id, driverId, vehicleId, route);
  res.json(tracking);
});

app.patch('/api/deliveries/:id/status', authMiddleware, (req, res) => {
  const { status, location } = req.body || {};
  if (status === 'completed' && location) {
    trackingService.completeDelivery(req.params.id, location);
  }
  const tracking = trackingService.getDeliveryTracking(req.params.id);
  res.json(tracking || { id: req.params.id, status });
});

// Real-time location updates
app.post('/api/tracking/location', authMiddleware, (req, res) => {
  const { driverId, location } = req.body || {};
  trackingService.updateDriverLocation(driverId, location);
  res.json({ success: true });
});

app.post('/api/tracking/vehicle-status', authMiddleware, (req, res) => {
  const { vehicleId, status } = req.body || {};
  trackingService.updateVehicleStatus(vehicleId, status);
  res.json({ success: true });
});

app.get('/api/tracking/analytics', authMiddleware, (_req, res) => {
  const analytics = trackingService.getAnalytics();
  res.json(analytics);
});

app.get('/api/tracking/driver/:driverId', authMiddleware, (req, res) => {
  const location = trackingService.getDriverLocation(req.params.driverId);
  res.json(location || { error: 'Driver not found' });
});

app.get('/api/tracking/vehicle/:vehicleId', authMiddleware, (req, res) => {
  const status = trackingService.getVehicleStatus(req.params.vehicleId);
  res.json(status || { error: 'Vehicle not found' });
});

// Routes
app.get('/api/routes', authMiddleware, (_req, res) => {
  const rows = db.prepare('SELECT * FROM routes').all();
  res.json(rows);
});
app.get('/api/routes/:id', authMiddleware, (req, res) => {
  const row = db.prepare('SELECT * FROM routes WHERE id = ?').get(req.params.id);
  res.json(row || null);
});
app.post('/api/routes', authMiddleware, (req, res) => {
  const id = uuidv4();
  const { origin, destination, waypoints = [], estimated_time = 0, distance_km = 0 } = req.body || {};
  db.prepare('INSERT INTO routes (id, origin, destination, waypoints, estimated_time, distance_km) VALUES (?, ?, ?, ?, ?, ?)')
    .run(id, origin, destination, JSON.stringify(waypoints), estimated_time, distance_km);
  const row = db.prepare('SELECT * FROM routes WHERE id = ?').get(id);
  res.json(row);
});

// Enhanced Route Optimization
app.post('/api/logistics/route-optimization', authMiddleware, async (req, res) => {
  try {
    const { origin, destination, options = {} } = req.body || {};
    const route = await routeOptimizer.getOptimizedRoute(origin, destination, options);
    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Multiple deliveries optimization
app.post('/api/logistics/optimize-deliveries', authMiddleware, async (req, res) => {
  try {
    const { deliveries, startLocation } = req.body || {};
    const optimized = await routeOptimizer.optimizeMultipleDeliveries(deliveries, startLocation);
    res.json({ optimized, totalDistance: optimized.reduce((sum, d) => sum + (d.distanceFromPrevious || 0), 0) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Real-time traffic data
app.post('/api/logistics/traffic-data', authMiddleware, async (req, res) => {
  try {
    const { route } = req.body || {};
    const trafficData = await routeOptimizer.getTrafficData(route);
    res.json(trafficData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Real-time external data (stubs)
app.post('/api/realtime/traffic', authMiddleware, (_req, res) => res.json({ level: 'moderate', delay: 8 }));
app.post('/api/realtime/weather', authMiddleware, (_req, res) => res.json({ conditions: 'clear', severity: 'low' }));
app.get('/api/realtime/vehicles/:id', authMiddleware, (req, res) => res.json({ id: req.params.id, status: 'ok' }));

// AI stubs
app.post('/api/ai/recommendations', authMiddleware, (_req, res) => res.json({ recommendations: [] }));
app.post('/api/ai/predictive', authMiddleware, (_req, res) => res.json({ predictions: [] }));
app.get('/api/ai/maintenance/:vehicleId', authMiddleware, (req, res) => res.json({ vehicleId: req.params.vehicleId, dueInKm: 1500 }));
app.post('/api/ai/chat', authMiddleware, (_req, res) => res.json({ response: 'Hello from backend AI stub' }));
app.get('/api/ai/chat/history/:sessionId', authMiddleware, (req, res) => res.json({ sessionId: req.params.sessionId, messages: [] }));
app.post('/api/ai/chat/recommendations', authMiddleware, (_req, res) => res.json({ recommendations: [] }));

// Uploads
const upload = multer({ storage: multer.memoryStorage() });
app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
  return res.json({ success: true, filename: req.file?.originalname, type: req.body?.type || 'general' });
});

// Notifications
app.get('/api/notifications', authMiddleware, (_req, res) => res.json([]));
app.patch('/api/notifications/:id/read', authMiddleware, (req, res) => res.json({ id: req.params.id, read: true }));
app.post('/api/notifications/send', authMiddleware, (req, res) => res.json({ success: true }));

// Payments (stubs)
app.post('/api/payments/process', authMiddleware, (_req, res) => res.json({ success: true }));
app.get('/api/payments', authMiddleware, (_req, res) => res.json([]));
app.post('/api/payments/:id/refund', authMiddleware, (req, res) => res.json({ id: req.params.id, refunded: true }));

// Vehicles
app.get('/api/vehicles', authMiddleware, (_req, res) => {
  const rows = db.prepare('SELECT * FROM vehicles').all();
  res.json(rows);
});
app.get('/api/vehicles/:id', authMiddleware, (req, res) => {
  const row = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  res.json(row || null);
});
app.post('/api/vehicles', authMiddleware, (req, res) => {
  const id = uuidv4();
  const { license_plate, model, capacity } = req.body || {};
  db.prepare('INSERT INTO vehicles (id, license_plate, model, capacity) VALUES (?, ?, ?, ?)')
    .run(id, license_plate, model, capacity);
  const row = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(id);
  res.json(row);
});
app.put('/api/vehicles/:id', authMiddleware, (req, res) => {
  const { license_plate, model, capacity } = req.body || {};
  db.prepare('UPDATE vehicles SET license_plate = COALESCE(?, license_plate), model = COALESCE(?, model), capacity = COALESCE(?, capacity) WHERE id = ?')
    .run(license_plate, model, capacity, req.params.id);
  const row = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  res.json(row);
});
app.delete('/api/vehicles/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM vehicles WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Enhanced Analytics
app.get('/api/analytics', authMiddleware, async (req, res) => {
  try {
    const { type = 'dashboard', period = 'week', ...filters } = req.query;
    const analytics = await analyticsService.generateAnalytics(type, period, filters);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/dashboard', authMiddleware, async (req, res) => {
  try {
    const { role = 'admin', userId } = req.query;
    const analytics = await analyticsService.generateAnalytics('dashboard', 'week', { userRole: role, userId });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/supply-chain', authMiddleware, async (req, res) => {
  try {
    const analytics = await analyticsService.generateAnalytics('supply_chain', 'month');
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/live-vehicles', authMiddleware, (_req, res) => {
  const trackingAnalytics = trackingService.getAnalytics();
  res.json({
    activeVehicles: trackingAnalytics.activeDrivers,
    dailyDeliveries: trackingAnalytics.completedToday,
    savedCosts: 1000000,
    ...trackingAnalytics
  });
});

app.get('/api/analytics/kenyan-routes', authMiddleware, async (req, res) => {
  try {
    const analytics = await analyticsService.generateAnalytics('route', 'month');
    res.json({
      popularRoutes: analytics.popularRoutes || ['Nairobi-Mombasa', 'Nairobi-Kisumu'],
      averageDelay: analytics.efficiency?.timeSavings || 2.3,
      fuelSavings: analytics.efficiency?.fuelSavings || 18.5,
      weatherImpact: 'moderate',
      ...analytics
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Additional analytics endpoints
app.get('/api/analytics/delivery', authMiddleware, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const analytics = await analyticsService.generateAnalytics('delivery', period);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/inventory', authMiddleware, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const analytics = await analyticsService.generateAnalytics('inventory', period);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/financial', authMiddleware, async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    const analytics = await analyticsService.generateAnalytics('financial', period);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create HTTP server for Express
const httpServer = createServer(app);
httpServer.listen(PORT_HTTP, () => console.log(`REST API on http://localhost:${PORT_HTTP}`));

// Notifications WebSocket (ws://localhost:5001/ws?token=...)
const notificationsWss = new WebSocketServer({ port: PORT_NOTIFICATIONS, path: '/ws' });
notificationsWss.on('connection', (socket, req) => {
  const url = new URL(req.url, `http://localhost:${PORT_NOTIFICATIONS}`);
  const token = url.searchParams.get('token');
  try { 
    const payload = jwt.verify(token || '', JWT_SECRET);
    socket.userId = payload.id;
    socket.send(JSON.stringify({ type: 'connected', timestamp: new Date().toISOString() }));
    
    // Subscribe to tracking updates
    const unsubscribe = trackingService.subscribe('delivery_updated', (data) => {
      socket.send(JSON.stringify({ type: 'delivery_update', data }));
    });
    
    socket.on('close', () => {
      unsubscribe();
    });
  } catch { 
    socket.close(); 
    return; 
  }
});

// Mobile integration WebSocket (ws://localhost:3001/mobile)
const mobileWss = new WebSocketServer({ port: PORT_MOBILE, path: '/mobile' });
mobileWss.on('connection', (socket) => {
  socket.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      
      if (msg.type === 'auth') {
        socket.driverId = msg.driverId;
        socket.send(JSON.stringify({ type: 'auth_ok', timestamp: new Date().toISOString() }));
      } else if (msg.type === 'location_update') {
        // Handle location updates from mobile app
        trackingService.updateDriverLocation(msg.driverId, msg.location, msg.accuracy);
        socket.send(JSON.stringify({ type: 'location_ack', timestamp: new Date().toISOString() }));
      } else if (msg.type === 'delivery_status') {
        // Handle delivery status updates
        trackingService.updateDeliveryProgress(msg.deliveryId, msg.location);
        socket.send(JSON.stringify({ type: 'status_ack', timestamp: new Date().toISOString() }));
      } else if (msg.type === 'vehicle_status') {
        // Handle vehicle status updates
        trackingService.updateVehicleStatus(msg.vehicleId, msg.status);
        socket.send(JSON.stringify({ type: 'vehicle_ack', timestamp: new Date().toISOString() }));
      }
    } catch (error) {
      console.error('Mobile WebSocket error:', error);
    }
  });
  
  // Send route assignments to driver
  const unsubscribe = trackingService.subscribe('delivery_started', (data) => {
    if (socket.driverId === data.driverId) {
      socket.send(JSON.stringify({ 
        type: 'route_assignment', 
        data: {
          deliveryId: data.deliveryId,
          route: data.route,
          instructions: data.route.instructions
        }
      }));
    }
  });
  
  socket.on('close', () => {
    unsubscribe();
  });
});


