import { v4 as uuidv4 } from 'uuid';

// Real-time tracking service for IntelliRoute Africa
class TrackingService {
  constructor() {
    this.activeDeliveries = new Map();
    this.driverLocations = new Map();
    this.vehicleStatuses = new Map();
    this.subscribers = new Map();
    this.updateInterval = 30000; // 30 seconds
    this.isRunning = false;
  }

  // Start tracking service
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.interval = setInterval(() => {
      this.updateAllTrackings();
    }, this.updateInterval);
    
    console.log('🚚 Tracking service started');
  }

  // Stop tracking service
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.isRunning = false;
    console.log('🚚 Tracking service stopped');
  }

  // Start tracking a delivery
  startDeliveryTracking(deliveryId, driverId, vehicleId, route) {
    const tracking = {
      id: uuidv4(),
      deliveryId,
      driverId,
      vehicleId,
      route,
      status: 'in_progress',
      startTime: new Date().toISOString(),
      currentLocation: route.origin,
      progress: 0,
      estimatedArrival: this.calculateETA(route.origin, route.destination),
      lastUpdate: new Date().toISOString(),
      checkpoints: [{
        location: route.origin,
        timestamp: new Date().toISOString(),
        status: 'departed'
      }]
    };

    this.activeDeliveries.set(deliveryId, tracking);
    this.notifySubscribers('delivery_started', tracking);
    
    return tracking;
  }

  // Update driver location
  updateDriverLocation(driverId, location, accuracy = 10) {
    const locationData = {
      lat: location.lat,
      lng: location.lng,
      accuracy,
      speed: location.speed || 0,
      heading: location.heading || 0,
      timestamp: new Date().toISOString()
    };

    this.driverLocations.set(driverId, locationData);

    // Update any active deliveries for this driver
    for (const [deliveryId, tracking] of this.activeDeliveries.entries()) {
      if (tracking.driverId === driverId) {
        this.updateDeliveryProgress(deliveryId, locationData);
      }
    }

    this.notifySubscribers('location_updated', { driverId, location: locationData });
  }

  // Update delivery progress
  updateDeliveryProgress(deliveryId, location) {
    const tracking = this.activeDeliveries.get(deliveryId);
    if (!tracking) return;

    tracking.currentLocation = location;
    tracking.lastUpdate = new Date().toISOString();
    
    // Calculate progress based on distance to destination
    const totalDistance = this.calculateDistance(
      tracking.route.origin.lat, tracking.route.origin.lng,
      tracking.route.destination.lat, tracking.route.destination.lng
    );
    
    const currentDistance = this.calculateDistance(
      location.lat, location.lng,
      tracking.route.destination.lat, tracking.route.destination.lng
    );
    
    tracking.progress = Math.max(0, Math.min(100, Math.round((1 - currentDistance / totalDistance) * 100)));
    
    // Update ETA based on current location
    tracking.estimatedArrival = this.calculateETA(location, tracking.route.destination);
    
    // Add checkpoint if significant progress made
    if (tracking.progress > 0 && tracking.progress % 25 === 0) {
      tracking.checkpoints.push({
        location,
        timestamp: new Date().toISOString(),
        status: 'in_transit',
        progress: tracking.progress
      });
    }

    this.activeDeliveries.set(deliveryId, tracking);
    this.notifySubscribers('delivery_updated', tracking);
  }

  // Complete delivery
  completeDelivery(deliveryId, finalLocation) {
    const tracking = this.activeDeliveries.get(deliveryId);
    if (!tracking) return;

    tracking.status = 'completed';
    tracking.endTime = new Date().toISOString();
    tracking.currentLocation = finalLocation;
    tracking.progress = 100;
    
    tracking.checkpoints.push({
      location: finalLocation,
      timestamp: new Date().toISOString(),
      status: 'delivered'
    });

    this.activeDeliveries.set(deliveryId, tracking);
    this.notifySubscribers('delivery_completed', tracking);
    
    // Remove from active tracking after 1 hour
    setTimeout(() => {
      this.activeDeliveries.delete(deliveryId);
    }, 60 * 60 * 1000);
  }

  // Update vehicle status
  updateVehicleStatus(vehicleId, status) {
    const vehicleStatus = {
      vehicleId,
      fuelLevel: status.fuelLevel || 100,
      engineTemp: status.engineTemp || 90,
      batteryLevel: status.batteryLevel || 100,
      mileage: status.mileage || 0,
      maintenanceAlerts: status.maintenanceAlerts || [],
      lastUpdate: new Date().toISOString(),
      location: status.location || null
    };

    this.vehicleStatuses.set(vehicleId, vehicleStatus);
    this.notifySubscribers('vehicle_status_updated', vehicleStatus);
  }

  // Get active deliveries
  getActiveDeliveries() {
    return Array.from(this.activeDeliveries.values());
  }

  // Get delivery tracking
  getDeliveryTracking(deliveryId) {
    return this.activeDeliveries.get(deliveryId);
  }

  // Get driver location
  getDriverLocation(driverId) {
    return this.driverLocations.get(driverId);
  }

  // Get vehicle status
  getVehicleStatus(vehicleId) {
    return this.vehicleStatuses.get(vehicleId);
  }

  // Subscribe to tracking updates
  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event).add(callback);
    
    return () => {
      const eventSubscribers = this.subscribers.get(event);
      if (eventSubscribers) {
        eventSubscribers.delete(callback);
      }
    };
  }

  // Notify subscribers
  notifySubscribers(event, data) {
    const eventSubscribers = this.subscribers.get(event);
    if (eventSubscribers) {
      eventSubscribers.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in tracking subscriber:', error);
        }
      });
    }
  }

  // Calculate distance between two points
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI/180);
  }

  // Calculate ETA
  calculateETA(currentLocation, destination) {
    const distance = this.calculateDistance(
      currentLocation.lat, currentLocation.lng,
      destination.lat, destination.lng
    );
    
    // Assume average speed of 50 km/h in urban areas
    const averageSpeed = 50;
    const etaMinutes = Math.round((distance / averageSpeed) * 60);
    
    const eta = new Date();
    eta.setMinutes(eta.getMinutes() + etaMinutes);
    
    return eta.toISOString();
  }

  // Update all active trackings (simulate real-time updates)
  updateAllTrackings() {
    for (const [deliveryId, tracking] of this.activeDeliveries.entries()) {
      if (tracking.status === 'in_progress') {
        // Simulate driver movement
        this.simulateDriverMovement(deliveryId, tracking);
      }
    }
  }

  // Simulate driver movement for demo purposes
  simulateDriverMovement(deliveryId, tracking) {
    const currentLocation = tracking.currentLocation;
    const destination = tracking.route.destination;
    
    // Calculate direction vector
    const latDiff = destination.lat - currentLocation.lat;
    const lngDiff = destination.lng - currentLocation.lng;
    const distance = this.calculateDistance(
      currentLocation.lat, currentLocation.lng,
      destination.lat, destination.lng
    );
    
    // If close to destination, complete delivery
    if (distance < 0.1) { // Within 100m
      this.completeDelivery(deliveryId, destination);
      return;
    }
    
    // Move towards destination (simulate 1km progress)
    const moveDistance = 0.01; // ~1km
    const ratio = moveDistance / distance;
    
    const newLocation = {
      lat: currentLocation.lat + (latDiff * ratio),
      lng: currentLocation.lng + (lngDiff * ratio),
      speed: 30 + Math.random() * 20, // 30-50 km/h
      heading: Math.atan2(lngDiff, latDiff) * 180 / Math.PI,
      timestamp: new Date().toISOString()
    };
    
    this.updateDriverLocation(tracking.driverId, newLocation);
  }

  // Get analytics data
  getAnalytics() {
    const activeDeliveries = this.getActiveDeliveries();
    const totalDeliveries = activeDeliveries.length;
    const completedToday = activeDeliveries.filter(d => d.status === 'completed').length;
    const inProgress = activeDeliveries.filter(d => d.status === 'in_progress').length;
    
    const averageProgress = activeDeliveries.length > 0 
      ? activeDeliveries.reduce((sum, d) => sum + d.progress, 0) / activeDeliveries.length 
      : 0;
    
    return {
      totalDeliveries,
      completedToday,
      inProgress,
      averageProgress: Math.round(averageProgress),
      activeDrivers: new Set(activeDeliveries.map(d => d.driverId)).size,
      lastUpdated: new Date().toISOString()
    };
  }

  // Emergency alert
  sendEmergencyAlert(driverId, alertType, location, description) {
    const alert = {
      id: uuidv4(),
      driverId,
      type: alertType,
      location,
      description,
      severity: 'high',
      timestamp: new Date().toISOString(),
      status: 'active'
    };
    
    this.notifySubscribers('emergency_alert', alert);
    return alert;
  }

  // Get delivery history
  getDeliveryHistory(driverId, limit = 50) {
    // In a real implementation, this would query the database
    return [];
  }
}

export default new TrackingService();
