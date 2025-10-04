import { v4 as uuidv4 } from 'uuid';

// Route optimization engine for IntelliRoute Africa
class RouteOptimizer {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Calculate distance between two points using Haversine formula
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

  // Get cached route or calculate new one
  async getOptimizedRoute(origin, destination, options = {}) {
    const cacheKey = `${origin.lat},${origin.lng}-${destination.lat},${destination.lng}-${JSON.stringify(options)}`;
    
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    const route = await this.calculateRoute(origin, destination, options);
    this.cache.set(cacheKey, { data: route, timestamp: Date.now() });
    return route;
  }

  // Calculate optimized route with multiple stops
  async calculateRoute(origin, destination, options = {}) {
    const { waypoints = [], vehicleType = 'truck', avoidTolls = false, avoidHighways = false } = options;
    
    // Simulate API call to routing service (Google Maps, OpenRouteService, etc.)
    const distance = this.calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng);
    const baseTime = distance * 2; // Rough estimate: 2 minutes per km
    
    // Apply traffic factor (simulate real-time traffic)
    const trafficFactor = this.getTrafficFactor(origin, destination);
    const estimatedTime = Math.round(baseTime * trafficFactor);
    
    // Apply vehicle type adjustments
    const vehicleAdjustments = {
      'motorcycle': 0.8,
      'car': 1.0,
      'van': 1.2,
      'truck': 1.4,
      'heavy_truck': 1.6
    };
    
    const adjustedTime = Math.round(estimatedTime * (vehicleAdjustments[vehicleType] || 1.0));
    
    // Generate waypoints if none provided
    const optimizedWaypoints = waypoints.length > 0 ? waypoints : this.generateWaypoints(origin, destination);
    
    return {
      routeId: uuidv4(),
      origin: {
        lat: origin.lat,
        lng: origin.lng,
        address: await this.reverseGeocode(origin.lat, origin.lng)
      },
      destination: {
        lat: destination.lat,
        lng: destination.lng,
        address: await this.reverseGeocode(destination.lat, destination.lng)
      },
      waypoints: optimizedWaypoints,
      distance: Math.round(distance * 100) / 100,
      estimatedTime: adjustedTime,
      estimatedTimeWithTraffic: adjustedTime,
      fuelCost: this.calculateFuelCost(distance, vehicleType),
      tollCost: avoidTolls ? 0 : this.calculateTollCost(origin, destination),
      totalCost: 0, // Will be calculated
      instructions: this.generateInstructions(origin, destination, optimizedWaypoints),
      traffic: {
        level: this.getTrafficLevel(trafficFactor),
        delay: Math.round((trafficFactor - 1) * baseTime)
      },
      weather: await this.getWeatherConditions(origin, destination),
      createdAt: new Date().toISOString(),
      provider: 'intelliroute-optimizer'
    };
  }

  // Generate intermediate waypoints for better routing
  generateWaypoints(origin, destination) {
    const waypoints = [];
    const steps = 3; // Number of intermediate points
    
    for (let i = 1; i < steps; i++) {
      const ratio = i / steps;
      const lat = origin.lat + (destination.lat - origin.lat) * ratio;
      const lng = origin.lng + (destination.lng - origin.lng) * ratio;
      
      // Add some randomness to simulate real road routing
      const offset = 0.01; // ~1km offset
      waypoints.push({
        lat: lat + (Math.random() - 0.5) * offset,
        lng: lng + (Math.random() - 0.5) * offset,
        type: 'waypoint',
        order: i
      });
    }
    
    return waypoints;
  }

  // Get traffic factor based on location and time
  getTrafficFactor(origin, destination) {
    const now = new Date();
    const hour = now.getHours();
    
    // Peak hours in Kenya: 7-9 AM, 5-7 PM
    const isPeakHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
    
    // Nairobi CBD has more traffic
    const isNairobiCBD = this.isInNairobiCBD(origin) || this.isInNairobiCBD(destination);
    
    let factor = 1.0;
    if (isPeakHour) factor += 0.3;
    if (isNairobiCBD) factor += 0.2;
    
    // Add some randomness for realistic simulation
    factor += (Math.random() - 0.5) * 0.2;
    
    return Math.max(1.0, factor);
  }

  // Check if coordinates are in Nairobi CBD
  isInNairobiCBD(point) {
    const nairobiCBD = { lat: -1.2921, lng: 36.8219 };
    const distance = this.calculateDistance(point.lat, point.lng, nairobiCBD.lat, nairobiCBD.lng);
    return distance < 5; // Within 5km of CBD
  }

  // Get traffic level description
  getTrafficLevel(factor) {
    if (factor < 1.1) return 'light';
    if (factor < 1.3) return 'moderate';
    if (factor < 1.5) return 'heavy';
    return 'severe';
  }

  // Calculate fuel cost
  calculateFuelCost(distance, vehicleType) {
    const fuelRates = {
      'motorcycle': 0.05, // KES per km
      'car': 0.15,
      'van': 0.25,
      'truck': 0.35,
      'heavy_truck': 0.50
    };
    
    const rate = fuelRates[vehicleType] || 0.25;
    return Math.round(distance * rate * 100) / 100;
  }

  // Calculate toll costs
  calculateTollCost(origin, destination) {
    // Simulate toll costs for major highways
    const distance = this.calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng);
    if (distance > 50) { // Long distance routes
      return Math.round(distance * 0.1); // 10 KES per km for tolls
    }
    return 0;
  }

  // Generate turn-by-turn instructions
  generateInstructions(origin, destination, waypoints) {
    const instructions = [
      `Start from ${origin.address || 'origin'}`,
      'Head towards destination',
      ...waypoints.map((wp, i) => `Pass waypoint ${i + 1}`),
      `Arrive at ${destination.address || 'destination'}`
    ];
    
    return instructions;
  }

  // Simulate reverse geocoding
  async reverseGeocode(lat, lng) {
    // In a real implementation, this would call Google Maps or similar API
    const locations = [
      'Nairobi CBD, Kenya',
      'Mombasa Port, Kenya',
      'Kisumu City, Kenya',
      'Nakuru Town, Kenya',
      'Eldoret City, Kenya'
    ];
    
    return locations[Math.floor(Math.random() * locations.length)];
  }

  // Get weather conditions
  async getWeatherConditions(origin, destination) {
    // Simulate weather API call
    const conditions = ['sunny', 'partly_cloudy', 'cloudy', 'rainy'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      condition,
      temperature: 20 + Math.floor(Math.random() * 15), // 20-35°C
      windSpeed: Math.floor(Math.random() * 20), // 0-20 km/h
      visibility: condition === 'rainy' ? 'poor' : 'good'
    };
  }

  // Optimize multiple deliveries (TSP - Traveling Salesman Problem)
  async optimizeMultipleDeliveries(deliveries, startLocation) {
    if (deliveries.length <= 1) return deliveries;
    
    // Simple nearest neighbor algorithm for TSP
    const optimized = [];
    const remaining = [...deliveries];
    let current = startLocation;
    
    while (remaining.length > 0) {
      let nearestIndex = 0;
      let nearestDistance = this.calculateDistance(
        current.lat, current.lng,
        remaining[0].lat, remaining[0].lng
      );
      
      for (let i = 1; i < remaining.length; i++) {
        const distance = this.calculateDistance(
          current.lat, current.lng,
          remaining[i].lat, remaining[i].lng
        );
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }
      
      const nearest = remaining.splice(nearestIndex, 1)[0];
      optimized.push({
        ...nearest,
        order: optimized.length + 1,
        distanceFromPrevious: nearestDistance
      });
      current = nearest;
    }
    
    return optimized;
  }

  // Get real-time traffic data
  async getTrafficData(route) {
    // Simulate real-time traffic API
    return {
      congestionLevel: this.getTrafficLevel(this.getTrafficFactor(route.origin, route.destination)),
      averageSpeed: Math.floor(60 / this.getTrafficFactor(route.origin, route.destination)),
      incidents: this.generateTrafficIncidents(route),
      lastUpdated: new Date().toISOString()
    };
  }

  // Generate simulated traffic incidents
  generateTrafficIncidents(route) {
    const incidents = [];
    const hasIncident = Math.random() < 0.1; // 10% chance of incident
   
    if (hasIncident) {
      incidents.push({
        id: uuidv4(),
        type: ['accident', 'construction', 'road_closed', 'police_check'][Math.floor(Math.random() * 4)],
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
        description: 'Traffic incident affecting route',
        location: route.waypoints[Math.floor(Math.random() * route.waypoints.length)],
        estimatedDuration: Math.floor(Math.random() * 60) + 15, // 15-75 minutes
        reportedAt: new Date().toISOString()
      });
    }
    
    return incidents;
  }

  // Clear expired cache entries
  clearExpiredCache() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.cache.delete(key);
      }
    }
  }
}

export default new RouteOptimizer();
