// Mobile App Integration Service for IntelliRoute Africa
// Handles communication between web dashboard and mobile driver apps

class MobileIntegrationService {
  constructor() {
    this.wsConnection = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.driverLocations = new Map();
    this.vehicleStatuses = new Map();
    this.eventListeners = new Map();
  }

  // WebSocket connection management
  async initializeConnection() {
    try {
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001/mobile';
      this.wsConnection = new WebSocket(wsUrl);
      
      this.wsConnection.onopen = () => {
        console.log('✅ Mobile integration connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.authenticate();
      };

      this.wsConnection.onmessage = (event) => {
        this.handleMessage(JSON.parse(event.data));
      };

      this.wsConnection.onclose = () => {
        console.warn('📱 Mobile integration disconnected');
        this.isConnected = false;
        this.scheduleReconnect();
      };

      this.wsConnection.onerror = (error) => {
        console.error('Mobile integration error:', error);
      };

    } catch (error) {
      console.error('Failed to initialize mobile connection:', error);
      this.fallbackToPolling();
    }
  }

  // Authentication with mobile services
  authenticate() {
    const token = localStorage.getItem('token');
    if (this.isConnected && token) {
      this.send({
        type: 'auth',
        token: token,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Message handling from mobile apps
  handleMessage(message) {
    const { type, data, driverId, vehicleId, timestamp } = message;

    switch (type) {
      case 'location_update':
        this.updateDriverLocation(driverId, data);
        break;
        
      case 'delivery_status':
        this.updateDeliveryStatus(data);
        break;
        
      case 'vehicle_status':
        this.updateVehicleStatus(vehicleId, data);
        break;
        
      case 'emergency_alert':
        this.handleEmergencyAlert(data);
        break;
        
      case 'route_deviation':
        this.handleRouteDeviation(driverId, data);
        break;
        
      case 'driver_break':
        this.handleDriverBreak(driverId, data);
        break;
        
      default:
        console.log('Unknown mobile message type:', type);
    }

    // Emit to registered listeners
    this.emitEvent(type, { data, driverId, vehicleId, timestamp });
  }

  // Send commands to mobile apps
  sendToDriver(driverId, command, data) {
    if (this.isConnected) {
      this.send({
        type: 'driver_command',
        driverId: driverId,
        command: command,
        data: data,
        timestamp: new Date().toISOString()
      });
      return true;
    } else {
      // Queue for later delivery
      this.queueMessage({ driverId, command, data });
      return false;
    }
  }

  // Route assignment to driver mobile app
  assignRoute(driverId, routeData) {
    return this.sendToDriver(driverId, 'new_route', {
      routeId: routeData.id,
      origin: routeData.origin,
      destination: routeData.destination,
      waypoints: routeData.waypoints || [],
      estimatedTime: routeData.estimatedTime,
      priority: routeData.priority || 'normal',
      specialInstructions: routeData.instructions || '',
      customerInfo: routeData.customerInfo || {},
      packages: routeData.packages || []
    });
  }

  // Emergency alert to all drivers in area
  sendEmergencyAlert(location, radius, alertData) {
    const nearbyDrivers = this.getDriversInRadius(location, radius);
    
    nearbyDrivers.forEach(driverId => {
      this.sendToDriver(driverId, 'emergency_alert', {
        type: alertData.type,
        message: alertData.message,
        severity: alertData.severity,
        location: location,
        instructions: alertData.instructions,
        timestamp: new Date().toISOString()
      });
    });

    return nearbyDrivers.length;
  }

  // Weather alerts for specific routes
  sendWeatherAlert(routeIds, weatherData) {
    const affectedDrivers = this.getDriversOnRoutes(routeIds);
    
    affectedDrivers.forEach(driverId => {
      this.sendToDriver(driverId, 'weather_alert', {
        severity: weatherData.severity,
        conditions: weatherData.conditions,
        expectedDuration: weatherData.duration,
        alternativeRoutes: weatherData.alternatives || [],
        safetyInstructions: weatherData.safetyTips || [],
        timestamp: new Date().toISOString()
      });
    });

    return affectedDrivers.length;
  }

  // Real-time traffic updates
  sendTrafficUpdate(routeId, trafficData) {
    const driversOnRoute = this.getDriversOnRoute(routeId);
    
    driversOnRoute.forEach(driverId => {
      this.sendToDriver(driverId, 'traffic_update', {
        routeId: routeId,
        congestionLevel: trafficData.level,
        estimatedDelay: trafficData.delay,
        alternativeRoute: trafficData.alternative,
        bypassInstructions: trafficData.bypass,
        timestamp: new Date().toISOString()
      });
    });

    return driversOnRoute.length;
  }

  // Driver location tracking
  updateDriverLocation(driverId, locationData) {
    const location = {
      latitude: locationData.lat,
      longitude: locationData.lng,
      accuracy: locationData.accuracy || 10,
      speed: locationData.speed || 0,
      heading: locationData.heading || 0,
      timestamp: locationData.timestamp || new Date().toISOString()
    };

    this.driverLocations.set(driverId, location);
    
    // Check for route deviations
    this.checkRouteDeviation(driverId, location);
    
    // Update ETA calculations
    this.updateETACalculations(driverId, location);
  }

  // Vehicle status monitoring
  updateVehicleStatus(vehicleId, statusData) {
    const status = {
      fuelLevel: statusData.fuel || 0,
      engineTemp: statusData.engineTemp || 0,
      batteryLevel: statusData.battery || 100,
      mileage: statusData.mileage || 0,
      maintenanceAlerts: statusData.alerts || [],
      lastUpdate: new Date().toISOString()
    };

    this.vehicleStatuses.set(vehicleId, status);

    // Check for maintenance alerts
    this.checkMaintenanceAlerts(vehicleId, status);
  }

  // Emergency situation handling
  handleEmergencyAlert(alertData) {
    const emergency = {
      type: alertData.type, // 'accident', 'breakdown', 'medical', 'security'
      severity: alertData.severity, // 'low', 'medium', 'high', 'critical'
      location: alertData.location,
      driverId: alertData.driverId,
      vehicleId: alertData.vehicleId,
      description: alertData.description,
      timestamp: new Date().toISOString(),
      status: 'active'
    };

    // Notify emergency services if critical
    if (emergency.severity === 'critical') {
      this.notifyEmergencyServices(emergency);
    }

    // Dispatch help to location
    this.dispatchHelp(emergency);

    // Notify management
    this.notifyManagement(emergency);

    return emergency;
  }

  // Driver performance tracking
  trackDriverPerformance(driverId, performanceData) {
    const metrics = {
      onTimeDeliveries: performanceData.onTime || 0,
      totalDeliveries: performanceData.total || 0,
      customerRating: performanceData.rating || 5.0,
      fuelEfficiency: performanceData.fuelEfficiency || 0,
      safetyScore: performanceData.safetyScore || 100,
      routeAdherence: performanceData.routeAdherence || 100,
      lastUpdate: new Date().toISOString()
    };

    // Store performance data
    localStorage.setItem(`driver_performance_${driverId}`, JSON.stringify(metrics));

    return metrics;
  }

  // Kenyan-specific features
  getKenyanTrafficConditions() {
    return {
      nairobiCBD: {
        status: 'heavy',
        avgSpeed: 12, // km/h
        estimatedDelay: 35, // minutes
        alternativeRoutes: ['Outer Ring Road', 'Thika Road bypass']
      },
      nairobiMombasaHighway: {
        status: 'moderate',
        avgSpeed: 65,
        estimatedDelay: 0,
        weatherConditions: 'clear'
      },
      border_namanga: {
        status: 'normal',
        waitTime: 25, // minutes
        documentsRequired: ['passport', 'cargo_manifest', 'insurance'],
        peakHours: '08:00-10:00, 16:00-18:00'
      }
    };
  }

  getBorderCrossingInfo(borderPoint) {
    const borders = {
      namanga: {
        name: 'Namanga Border (Kenya-Tanzania)',
        operatingHours: '06:00 - 18:00',
        currentWaitTime: Math.floor(Math.random() * 60) + 10,
        requiredDocs: ['Passport', 'Cargo Manifest', 'Insurance Certificate'],
        contacts: {
          kenyan: '+254 700 123 456',
          tanzanian: '+255 700 123 456'
        }
      },
      busia: {
        name: 'Busia Border (Kenya-Uganda)',
        operatingHours: '06:00 - 22:00',
        currentWaitTime: Math.floor(Math.random() * 45) + 5,
        requiredDocs: ['Passport', 'Vehicle Permit', 'Cargo Declaration'],
        contacts: {
          kenyan: '+254 700 123 457',
          ugandan: '+256 700 123 456'
        }
      }
    };

    return borders[borderPoint] || null;
  }

  // Utility methods
  getDriversInRadius(center, radiusKm) {
    const drivers = [];
    
    this.driverLocations.forEach((location, driverId) => {
      const distance = this.calculateDistance(center, location);
      if (distance <= radiusKm) {
        drivers.push(driverId);
      }
    });

    return drivers;
  }

  calculateDistance(point1, point2) {
    const R = 6371; // Earth's radius in km
    const dLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const dLon = (point2.longitude - point1.longitude) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.latitude * Math.PI / 180) * Math.cos(point2.latitude * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Event listeners
  addEventListener(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  removeEventListener(event, callback) {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emitEvent(event, data) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => {
        callback(data);
      });
    }
  }

  // Connection management
  send(data) {
    if (this.isConnected && this.wsConnection.readyState === WebSocket.OPEN) {
      this.wsConnection.send(JSON.stringify(data));
    }
  }

  scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = Math.pow(2, this.reconnectAttempts) * 1000; // Exponential backoff
      setTimeout(() => {
        this.reconnectAttempts++;
        this.initializeConnection();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
      this.fallbackToPolling();
    }
  }

  fallbackToPolling() {
    console.warn('Falling back to polling mode');
    // Implement HTTP polling as fallback
    this.pollingInterval = setInterval(() => {
      this.pollForUpdates();
    }, 30000); // Poll every 30 seconds
  }

  // Cleanup
  disconnect() {
    if (this.wsConnection) {
      this.wsConnection.close();
    }
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    this.isConnected = false;
  }

  // Additional helper methods
  checkRouteDeviation(driverId, location) {
    // Implementation for checking if driver is off route
  }

  updateETACalculations(driverId, location) {
    // Implementation for updating ETA based on current location
  }

  checkMaintenanceAlerts(vehicleId, status) {
    // Implementation for checking maintenance needs
  }

  notifyEmergencyServices(emergency) {
    // Implementation for contacting emergency services
  }

  dispatchHelp(emergency) {
    // Implementation for dispatching help
  }

  notifyManagement(emergency) {
    // Implementation for notifying management
  }

  getDriversOnRoutes(routeIds) {
    // Implementation for finding drivers on specific routes
    return [];
  }

  getDriversOnRoute(routeId) {
    // Implementation for finding drivers on a specific route
    return [];
  }

  queueMessage(message) {
    // Implementation for queuing messages when offline
    const queue = JSON.parse(localStorage.getItem('mobile_message_queue') || '[]');
    queue.push({
      ...message,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('mobile_message_queue', JSON.stringify(queue));
  }

  pollForUpdates() {
    // Implementation for HTTP polling fallback
  }
}

// Export singleton instance
export const mobileIntegration = new MobileIntegrationService();
export default mobileIntegration;
