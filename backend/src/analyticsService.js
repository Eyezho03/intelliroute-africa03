import { v4 as uuidv4 } from 'uuid';

// Analytics service for IntelliRoute Africa
class AnalyticsService {
  constructor() {
    this.metrics = new Map();
    this.reports = new Map();
    this.kpiCache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Generate comprehensive analytics
  async generateAnalytics(type, period, filters = {}) {
    const cacheKey = `${type}-${period}-${JSON.stringify(filters)}`;
    
    if (this.kpiCache.has(cacheKey)) {
      const cached = this.kpiCache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }
    }

    let analytics;
    switch (type) {
      case 'dashboard':
        analytics = await this.generateDashboardMetrics(period, filters);
        break;
      case 'delivery':
        analytics = await this.generateDeliveryAnalytics(period, filters);
        break;
      case 'inventory':
        analytics = await this.generateInventoryAnalytics(period, filters);
        break;
      case 'route':
        analytics = await this.generateRouteAnalytics(period, filters);
        break;
      case 'financial':
        analytics = await this.generateFinancialAnalytics(period, filters);
        break;
      case 'supply_chain':
        analytics = await this.generateSupplyChainAnalytics(period, filters);
        break;
      default:
        analytics = await this.generateGeneralAnalytics(period, filters);
    }

    this.kpiCache.set(cacheKey, { data: analytics, timestamp: Date.now() });
    return analytics;
  }

  // Dashboard metrics for different user roles
  async generateDashboardMetrics(period, filters) {
    const { userRole = 'admin', userId } = filters;
    
    const baseMetrics = {
      totalDeliveries: this.getRandomMetric(150, 200),
      completedDeliveries: this.getRandomMetric(120, 180),
      activeDeliveries: this.getRandomMetric(15, 35),
      totalRevenue: this.getRandomMetric(2500000, 3500000), // KES
      averageDeliveryTime: this.getRandomMetric(45, 75), // minutes
      customerSatisfaction: this.getRandomMetric(4.2, 4.8),
      fuelEfficiency: this.getRandomMetric(12, 18), // km/L
      costSavings: this.getRandomMetric(150000, 250000), // KES
      onTimeDeliveryRate: this.getRandomMetric(85, 95), // percentage
      activeDrivers: this.getRandomMetric(8, 15),
      activeVehicles: this.getRandomMetric(12, 20)
    };

    // Role-specific metrics
    const roleMetrics = {
      admin: {
        ...baseMetrics,
        systemUptime: 99.8,
        totalUsers: this.getRandomMetric(25, 50),
        monthlyGrowth: this.getRandomMetric(15, 25) // percentage
      },
      fleet_manager: {
        ...baseMetrics,
        vehicleUtilization: this.getRandomMetric(75, 90),
        maintenanceAlerts: this.getRandomMetric(2, 8),
        driverPerformance: this.getRandomMetric(4.0, 4.9)
      },
      operation_manager: {
        ...baseMetrics,
        routeEfficiency: this.getRandomMetric(88, 96),
        deliveryAccuracy: this.getRandomMetric(92, 98),
        operationalCosts: this.getRandomMetric(180000, 220000)
      },
      driver: {
        deliveriesCompleted: this.getRandomMetric(8, 15),
        totalDistance: this.getRandomMetric(200, 350), // km
        fuelConsumption: this.getRandomMetric(25, 40), // L
        rating: this.getRandomMetric(4.0, 4.9),
        earnings: this.getRandomMetric(15000, 25000) // KES
      }
    };

    return {
      period,
      role: userRole,
      metrics: roleMetrics[userRole] || baseMetrics,
      trends: this.generateTrends(period),
      alerts: this.generateAlerts(userRole),
      lastUpdated: new Date().toISOString()
    };
  }

  // Delivery analytics
  async generateDeliveryAnalytics(period, filters) {
    const deliveries = this.generateDeliveryData(period);
    
    return {
      period,
      summary: {
        total: deliveries.length,
        completed: deliveries.filter(d => d.status === 'completed').length,
        inProgress: deliveries.filter(d => d.status === 'in_progress').length,
        cancelled: deliveries.filter(d => d.status === 'cancelled').length
      },
      performance: {
        averageDeliveryTime: this.calculateAverage(deliveries, 'deliveryTime'),
        onTimeRate: this.calculateOnTimeRate(deliveries),
        customerSatisfaction: this.calculateAverage(deliveries, 'rating'),
        distanceCovered: deliveries.reduce((sum, d) => sum + d.distance, 0)
      },
      trends: this.generateDeliveryTrends(deliveries),
      topRoutes: this.getTopRoutes(deliveries),
      driverPerformance: this.getDriverPerformance(deliveries)
    };
  }

  // Inventory analytics
  async generateInventoryAnalytics(period, filters) {
    const inventory = this.generateInventoryData(period);
    
    return {
      period,
      summary: {
        totalProducts: inventory.length,
        lowStock: inventory.filter(i => i.quantity < i.reorderLevel).length,
        outOfStock: inventory.filter(i => i.quantity === 0).length,
        totalValue: inventory.reduce((sum, i) => sum + (i.quantity * i.price), 0)
      },
      turnover: {
        fastMoving: inventory.filter(i => i.turnoverRate > 10).length,
        slowMoving: inventory.filter(i => i.turnoverRate < 2).length,
        averageTurnover: this.calculateAverage(inventory, 'turnoverRate')
      },
      alerts: this.generateInventoryAlerts(inventory),
      recommendations: this.generateInventoryRecommendations(inventory)
    };
  }

  // Route analytics
  async generateRouteAnalytics(period, filters) {
    const routes = this.generateRouteData(period);
    
    return {
      period,
      summary: {
        totalRoutes: routes.length,
        optimizedRoutes: routes.filter(r => r.optimized).length,
        averageDistance: this.calculateAverage(routes, 'distance'),
        averageTime: this.calculateAverage(routes, 'duration')
      },
      efficiency: {
        fuelSavings: routes.reduce((sum, r) => sum + r.fuelSavings, 0),
        timeSavings: routes.reduce((sum, r) => sum + r.timeSavings, 0),
        costReduction: routes.reduce((sum, r) => sum + r.costReduction, 0)
      },
      popularRoutes: this.getPopularRoutes(routes),
      trafficImpact: this.getTrafficImpact(routes)
    };
  }

  // Financial analytics
  async generateFinancialAnalytics(period, filters) {
    const financials = this.generateFinancialData(period);
    
    return {
      period,
      revenue: {
        total: financials.revenue,
        growth: financials.revenueGrowth,
        byService: financials.revenueByService
      },
      costs: {
        total: financials.totalCosts,
        fuel: financials.fuelCosts,
        maintenance: financials.maintenanceCosts,
        labor: financials.laborCosts
      },
      profitability: {
        grossMargin: financials.grossMargin,
        netMargin: financials.netMargin,
        roi: financials.roi
      },
      trends: this.generateFinancialTrends(financials)
    };
  }

  // Supply chain analytics
  async generateSupplyChainAnalytics(period, filters) {
    return {
      period,
      network: {
        totalSuppliers: this.getRandomMetric(15, 25),
        activeSuppliers: this.getRandomMetric(12, 20),
        totalRetailers: this.getRandomMetric(50, 100),
        activeRetailers: this.getRandomMetric(40, 80)
      },
      performance: {
        orderFulfillmentRate: this.getRandomMetric(88, 96),
        supplierReliability: this.getRandomMetric(85, 95),
        inventoryTurnover: this.getRandomMetric(6, 12),
        leadTime: this.getRandomMetric(2, 5) // days
      },
      insights: {
        topSuppliers: this.getTopSuppliers(),
        topRetailers: this.getTopRetailers(),
        bottlenecks: this.getBottlenecks(),
        opportunities: this.getOpportunities()
      }
    };
  }

  // Generate trends data
  generateTrends(period) {
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 365;
    const trends = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      trends.push({
        date: date.toISOString().split('T')[0],
        deliveries: this.getRandomMetric(10, 25),
        revenue: this.getRandomMetric(50000, 120000),
        efficiency: this.getRandomMetric(85, 95)
      });
    }
    
    return trends;
  }

  // Generate alerts based on role
  generateAlerts(userRole) {
    const alerts = [];
    
    if (userRole === 'fleet_manager') {
      alerts.push({
        id: uuidv4(),
        type: 'maintenance',
        severity: 'medium',
        message: 'Vehicle KCA 123A requires scheduled maintenance',
        timestamp: new Date().toISOString()
      });
    }
    
    if (userRole === 'operation_manager') {
      alerts.push({
        id: uuidv4(),
        type: 'performance',
        severity: 'low',
        message: 'Route efficiency below target for Nairobi-Mombasa',
        timestamp: new Date().toISOString()
      });
    }
    
    alerts.push({
      id: uuidv4(),
      type: 'system',
      severity: 'info',
      message: 'System performance is optimal',
      timestamp: new Date().toISOString()
    });
    
    return alerts;
  }

  // Helper methods
  getRandomMetric(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  calculateAverage(data, field) {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, item) => acc + (item[field] || 0), 0);
    return Math.round((sum / data.length) * 100) / 100;
  }

  calculateOnTimeRate(deliveries) {
    const completed = deliveries.filter(d => d.status === 'completed');
    if (completed.length === 0) return 0;
    const onTime = completed.filter(d => d.onTime).length;
    return Math.round((onTime / completed.length) * 100);
  }

  // Generate sample data
  generateDeliveryData(period) {
    const count = period === 'week' ? 50 : period === 'month' ? 200 : 1000;
    const deliveries = [];
    
    for (let i = 0; i < count; i++) {
      deliveries.push({
        id: uuidv4(),
        status: ['completed', 'in_progress', 'cancelled'][Math.floor(Math.random() * 3)],
        deliveryTime: this.getRandomMetric(30, 90),
        distance: this.getRandomMetric(5, 50),
        rating: 3 + Math.random() * 2,
        onTime: Math.random() > 0.2,
        driverId: `driver_${this.getRandomMetric(1, 10)}`,
        route: `route_${this.getRandomMetric(1, 20)}`
      });
    }
    
    return deliveries;
  }

  generateInventoryData(period) {
    const products = ['Coca Cola', 'Bread', 'Milk', 'Rice', 'Sugar', 'Cooking Oil', 'Soap', 'Toothpaste'];
    const inventory = [];
    
    products.forEach(product => {
      inventory.push({
        id: uuidv4(),
        name: product,
        quantity: this.getRandomMetric(0, 100),
        reorderLevel: this.getRandomMetric(10, 20),
        price: this.getRandomMetric(50, 500),
        turnoverRate: this.getRandomMetric(1, 15)
      });
    });
    
    return inventory;
  }

  generateRouteData(period) {
    const routes = [];
    const routeNames = ['Nairobi-Mombasa', 'Nairobi-Kisumu', 'Mombasa-Kampala', 'Nairobi-Nakuru'];
    
    routeNames.forEach(name => {
      routes.push({
        id: uuidv4(),
        name,
        distance: this.getRandomMetric(100, 500),
        duration: this.getRandomMetric(120, 480),
        optimized: Math.random() > 0.3,
        fuelSavings: this.getRandomMetric(500, 2000),
        timeSavings: this.getRandomMetric(10, 60),
        costReduction: this.getRandomMetric(1000, 5000)
      });
    });
    
    return routes;
  }

  generateFinancialData(period) {
    return {
      revenue: this.getRandomMetric(2000000, 4000000),
      revenueGrowth: this.getRandomMetric(10, 25),
      revenueByService: {
        delivery: this.getRandomMetric(1500000, 2500000),
        storage: this.getRandomMetric(300000, 600000),
        consulting: this.getRandomMetric(200000, 400000)
      },
      totalCosts: this.getRandomMetric(1200000, 2000000),
      fuelCosts: this.getRandomMetric(400000, 600000),
      maintenanceCosts: this.getRandomMetric(200000, 350000),
      laborCosts: this.getRandomMetric(600000, 1000000),
      grossMargin: this.getRandomMetric(25, 35),
      netMargin: this.getRandomMetric(15, 25),
      roi: this.getRandomMetric(20, 40)
    };
  }

  // Additional helper methods for specific analytics
  generateDeliveryTrends(deliveries) {
    return {
      daily: this.generateDailyTrends(deliveries),
      weekly: this.generateWeeklyTrends(deliveries),
      monthly: this.generateMonthlyTrends(deliveries)
    };
  }

  getTopRoutes(deliveries) {
    const routeCounts = {};
    deliveries.forEach(d => {
      routeCounts[d.route] = (routeCounts[d.route] || 0) + 1;
    });
    
    return Object.entries(routeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([route, count]) => ({ route, count }));
  }

  getDriverPerformance(deliveries) {
    const driverStats = {};
    deliveries.forEach(d => {
      if (!driverStats[d.driverId]) {
        driverStats[d.driverId] = { deliveries: 0, rating: 0, onTime: 0 };
      }
      driverStats[d.driverId].deliveries++;
      driverStats[d.driverId].rating += d.rating;
      if (d.onTime) driverStats[d.driverId].onTime++;
    });
    
    return Object.entries(driverStats).map(([driverId, stats]) => ({
      driverId,
      deliveries: stats.deliveries,
      averageRating: Math.round((stats.rating / stats.deliveries) * 100) / 100,
      onTimeRate: Math.round((stats.onTime / stats.deliveries) * 100)
    }));
  }

  generateInventoryAlerts(inventory) {
    return inventory
      .filter(item => item.quantity <= item.reorderLevel)
      .map(item => ({
        id: uuidv4(),
        type: 'low_stock',
        severity: item.quantity === 0 ? 'high' : 'medium',
        message: `${item.name} is ${item.quantity === 0 ? 'out of stock' : 'running low'}`,
        productId: item.id
      }));
  }

  generateInventoryRecommendations(inventory) {
    return [
      {
        type: 'reorder',
        message: 'Consider reordering fast-moving items',
        priority: 'medium'
      },
      {
        type: 'optimization',
        message: 'Optimize storage for slow-moving items',
        priority: 'low'
      }
    ];
  }

  getPopularRoutes(routes) {
    return routes
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 5)
      .map(route => ({
        name: route.name,
        usage: route.usage,
        efficiency: route.efficiency
      }));
  }

  getTrafficImpact(routes) {
    return {
      averageDelay: this.getRandomMetric(5, 15),
      affectedRoutes: this.getRandomMetric(2, 5),
      timeLost: this.getRandomMetric(30, 120) // minutes
    };
  }

  generateFinancialTrends(financials) {
    return {
      revenueGrowth: financials.revenueGrowth,
      costReduction: this.getRandomMetric(5, 15),
      profitMargin: this.getRandomMetric(15, 25)
    };
  }

  getTopSuppliers() {
    return [
      { name: 'Nairobi Wholesale Ltd', performance: 95, orders: 45 },
      { name: 'Mombasa Distributors', performance: 92, orders: 38 },
      { name: 'Kisumu Supply Co', performance: 88, orders: 32 }
    ];
  }

  getTopRetailers() {
    return [
      { name: 'Supermarket Chain A', orders: 120, value: 250000 },
      { name: 'Retail Store B', orders: 95, value: 180000 },
      { name: 'Convenience Store C', orders: 78, value: 150000 }
    ];
  }

  getBottlenecks() {
    return [
      'Border crossing delays at Namanga',
      'Nairobi CBD traffic congestion',
      'Warehouse capacity constraints'
    ];
  }

  getOpportunities() {
    return [
      'Expand to new regions',
      'Implement predictive analytics',
      'Optimize last-mile delivery'
    ];
  }

  generateDailyTrends(deliveries) {
    // Generate 7 days of data
    const trends = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      trends.push({
        date: date.toISOString().split('T')[0],
        deliveries: this.getRandomMetric(15, 30),
        efficiency: this.getRandomMetric(85, 95)
      });
    }
    return trends;
  }

  generateWeeklyTrends(deliveries) {
    // Generate 4 weeks of data
    const trends = [];
    for (let i = 3; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      trends.push({
        week: `Week ${4 - i}`,
        deliveries: this.getRandomMetric(100, 150),
        efficiency: this.getRandomMetric(88, 96)
      });
    }
    return trends;
  }

  generateMonthlyTrends(deliveries) {
    // Generate 12 months of data
    const trends = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      trends.push({
        month: date.toLocaleString('default', { month: 'short' }),
        deliveries: this.getRandomMetric(400, 600),
        efficiency: this.getRandomMetric(90, 98)
      });
    }
    return trends;
  }
}

export default new AnalyticsService();
