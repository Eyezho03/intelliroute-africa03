// API Service Layer for IntelliRoute Africa
// Handles all backend communication and data management

import { ErrorHandler, RetryHandler, ERROR_TYPES, AppError } from '../utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }
  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? { ...this.defaultHeaders, Authorization: `Bearer ${token}` } : this.defaultHeaders;
  }

  // Generic API request method with enhanced error handling
  async request(endpoint, options = {}, retryOptions = {}) {
    const { withRetry = true, maxAttempts = 3 } = retryOptions;
    
    const makeRequest = async () => {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: this.getAuthHeaders(),
        ...options,
      };

      try {
        const response = await fetch(url, config);
        
        // Handle different response types
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ 
            message: 'Network error occurred',
            status: response.status 
          }));
          
          // Create appropriate error type
          let errorType = ERROR_TYPES.SERVER;
          if (response.status === 401) errorType = ERROR_TYPES.AUTH;
          else if (response.status === 403) errorType = ERROR_TYPES.PERMISSION;
          else if (response.status === 422) errorType = ERROR_TYPES.VALIDATION;
          else if (response.status >= 400 && response.status < 500) errorType = ERROR_TYPES.CLIENT;
          
          const error = new AppError(
            errorData.message || `HTTP error! status: ${response.status}`,
            errorType,
            response.status,
            errorData
          );
          
          ErrorHandler.logError(error, {
            endpoint,
            method: config.method || 'GET',
            url
          });
          
          throw error;
        }

        // Return raw response for non-JSON responses
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          return response;
        }

        return await response.json();
      } catch (error) {
        // Handle network errors
        if (!error.response && error.name === 'TypeError') {
          const networkError = new AppError(
            'Network connection failed. Please check your internet connection.',
            ERROR_TYPES.NETWORK
          );
          ErrorHandler.logError(networkError, { endpoint, url });
          throw networkError;
        }
        
        // Re-throw AppErrors as-is
        if (error instanceof AppError) {
          throw error;
        }
        
        // Wrap other errors
        const wrappedError = new AppError(
          error.message || 'An unexpected error occurred',
          ERROR_TYPES.CLIENT
        );
        ErrorHandler.logError(wrappedError, { endpoint, originalError: error });
        throw wrappedError;
      }
    };

    // Use retry logic for retryable requests
    if (withRetry) {
      return await RetryHandler.withRetry(makeRequest, {
        maxAttempts,
        shouldRetry: (error) => {
          // Retry for network errors and server errors (5xx)
          return ErrorHandler.shouldRetry(error) && 
                 error.type !== ERROR_TYPES.AUTH && 
                 error.type !== ERROR_TYPES.PERMISSION;
        }
      });
    }
    
    return await makeRequest();
  }

  // Authentication API calls
  async login(credentials) {
    try {
      const response = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data || response.user));
      }
      
      return response;
    } catch (error) {
      // Fallback to localStorage for development
      if (process.env.NODE_ENV === 'development') {
        console.warn('API login failed, falling back to localStorage auth:', error.message);
      }
      return this.fallbackLogin(credentials);
    }
  }

  async register(userData) {
    try {
      const response = await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data || response.user));
      }
      
      return response;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('API register failed, falling back to localStorage auth:', error.message);
      }
      return this.fallbackRegister(userData);
    }
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('API logout failed:', error.message);
      }
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
  }

  async refreshToken() {
    try {
      const response = await this.request('/auth/refresh', { method: 'POST' });
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      console.warn('Token refresh failed:', error.message);
      throw error;
    }
  }

  // User Management API calls
  async getCurrentUser() {
    try {
      return await this.request('/auth/me');
    } catch (error) {
      // Fallback to localStorage
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
  }

  async getDrivers() {
    return await this.request('/users/drivers');
  }

  async getFleetManagers() {
    return await this.request('/users/fleet-managers');
  }

  async getBusinessUsers() {
    return await this.request('/users/business-users');
  }

  async updateProfile(userData) {
    return await this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`/users${queryString ? `?${queryString}` : ''}`);
  }

  // Product Management API calls
  async getProducts(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return await this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(productId) {
    return await this.request(`/products/${productId}`);
  }

  async createProduct(productData) {
    return await this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(productId, productData) {
    return await this.request(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(productId) {
    return await this.request(`/products/${productId}`, {
      method: 'DELETE',
    });
  }

  // Order Management API calls
  async getOrders(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return await this.request(`/orders${queryString ? `?${queryString}` : ''}`);
  }

  async getOrder(orderId) {
    return await this.request(`/orders/${orderId}`);
  }

  async createOrder(orderData) {
    return await this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrderStatus(orderId, status, additionalData = {}) {
    return await this.request(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, ...additionalData }),
    });
  }

  async cancelOrder(orderId, reason) {
    return await this.request(`/orders/${orderId}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async assignDriver(orderId, driverId) {
    return await this.request(`/orders/${orderId}/assign-driver`, {
      method: 'POST',
      body: JSON.stringify({ driverId }),
    });
  }

  // Inventory Management API calls
  async getInventory(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return await this.request(`/inventory${queryString ? `?${queryString}` : ''}`);
  }

  async updateInventory(productId, inventoryData) {
    return await this.request(`/inventory/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(inventoryData),
    });
  }

  async getInventoryAlerts() {
    return await this.request('/inventory/alerts');
  }

  // Delivery & Logistics API calls
  async getDeliveries(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return await this.request(`/deliveries${queryString ? `?${queryString}` : ''}`);
  }

  async getDelivery(deliveryId) {
    return await this.request(`/deliveries/${deliveryId}`);
  }

  async updateDeliveryStatus(deliveryId, status, location = null) {
    return await this.request(`/deliveries/${deliveryId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, location }),
    });
  }

  async getRouteOptimization(origin, destination, options = {}) {
    return await this.request('/logistics/route-optimization', {
      method: 'POST',
      body: JSON.stringify({ origin, destination, ...options }),
    });
  }

  async getAvailableDrivers(location, radius = 50) {
    return await this.request(`/drivers/available?location=${location}&radius=${radius}`);
  }

  // Analytics API calls
  async getAnalytics(type, period, filters = {}) {
    const params = new URLSearchParams({ type, period, ...filters });
    return await this.request(`/analytics?${params.toString()}`);
  }

  async getDashboardMetrics(userRole, userId) {
    return await this.request(`/analytics/dashboard?role=${userRole}&userId=${userId}`);
  }

  async getSupplyChainMetrics() {
    return await this.request('/analytics/supply-chain');
  }

  // Real-time data API calls
  async getTrafficData(route) {
    return await this.request('/realtime/traffic', {
      method: 'POST',
      body: JSON.stringify({ route }),
    });
  }

  async getWeatherData(locations) {
    return await this.request('/realtime/weather', {
      method: 'POST',
      body: JSON.stringify({ locations }),
    });
  }

  async getVehicleStatus(vehicleId) {
    return await this.request(`/realtime/vehicles/${vehicleId}`);
  }

  // AI Engine API calls
  async getAIRecommendations(type, data) {
    return await this.request('/ai/recommendations', {
      method: 'POST',
      body: JSON.stringify({ type, data }),
    });
  }

  async getPredictiveAnalytics(type, parameters) {
    return await this.request('/ai/predictive', {
      method: 'POST',
      body: JSON.stringify({ type, parameters }),
    });
  }

  async getMaintenancePredictions(vehicleId) {
    return await this.request(`/ai/maintenance/${vehicleId}`);
  }

  // File Upload API calls
  async uploadFile(file, type = 'general') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return await this.request('/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      body: formData,
    });
  }

  // Notification API calls
  async getNotifications() {
    return await this.request('/notifications');
  }

  async markNotificationRead(notificationId) {
    return await this.request(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  }

  async sendNotification(recipientId, message, type = 'info') {
    return await this.request('/notifications/send', {
      method: 'POST',
      body: JSON.stringify({ recipientId, message, type }),
    });
  }

  // Payment API calls
  async processPayment(paymentData) {
    return await this.request('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPaymentHistory(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return await this.request(`/payments${queryString ? `?${queryString}` : ''}`);
  }

  async refundPayment(paymentId, amount, reason) {
    return await this.request(`/payments/${paymentId}/refund`, {
      method: 'POST',
      body: JSON.stringify({ amount, reason }),
    });
  }

  // Fallback methods for development without backend
  async fallbackLogin(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        
        if (user) {
          const token = `token-${Date.now()}-${Math.random()}`;
          const response = { user, token, message: 'Login successful' };
          resolve(response);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  async fallbackRegister(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.email === userData.email)) {
          reject(new Error('User already exists'));
          return;
        }
        
        const newUser = {
          id: Date.now(),
          ...userData,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        const token = `token-${Date.now()}-${Math.random()}`;
        const response = { user: newUser, token, message: 'Registration successful' };
        resolve(response);
      }, 1000);
    });
  }

  // AI Chatbot API calls
  async sendChatMessage(message, context = {}) {
    try {
      return await this.request('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message, context, timestamp: new Date().toISOString() }),
      });
    } catch (error) {
      // Fallback to local processing if backend unavailable
      return this.fallbackChatResponse(message, context);
    }
  }

  async getChatHistory(sessionId) {
    try {
      return await this.request(`/ai/chat/history/${sessionId}`);
    } catch (error) {
      return { messages: [], sessionId: `local-${Date.now()}` };
    }
  }

  async getAIChatRecommendations(userProfile) {
    try {
      return await this.request('/ai/chat/recommendations', {
        method: 'POST',
        body: JSON.stringify({ userProfile }),
      });
    } catch (error) {
      return this.fallbackRecommendations(userProfile);
    }
  }

  // Live tracking and analytics API calls
  async getLiveVehicleStats() {
    try {
      return await this.request('/analytics/live-vehicles');
    } catch (error) {
      return {
        activeVehicles: Math.floor(Math.random() * 500) + 1200,
        dailyDeliveries: Math.floor(Math.random() * 5000) + 15000,
        savedCosts: Math.floor(Math.random() * 1000000) + 2500000
      };
    }
  }

  async getKenyanRouteInsights() {
    try {
      return await this.request('/analytics/kenyan-routes');
    } catch (error) {
      return {
        popularRoutes: ['Nairobi-Mombasa', 'Nairobi-Kisumu', 'Mombasa-Kampala'],
        averageDelay: 2.3,
        fuelSavings: 18.5,
        weatherImpact: 'moderate'
      };
    }
  }

  // Enhanced business onboarding
  async submitBusinessOnboarding(businessData) {
    try {
      return await this.request('/onboarding/business', {
        method: 'POST',
        body: JSON.stringify({
          ...businessData,
          source: 'ai-chatbot',
          timestamp: new Date().toISOString()
        }),
      });
    } catch (error) {
      // Store locally for later sync when backend is available
      const localApplications = JSON.parse(localStorage.getItem('pendingApplications') || '[]');
      const application = {
        id: `pending-${Date.now()}`,
        ...businessData,
        status: 'pending-sync',
        timestamp: new Date().toISOString()
      };
      localApplications.push(application);
      localStorage.setItem('pendingApplications', JSON.stringify(localApplications));
      
      return {
        success: true,
        applicationId: application.id,
        message: 'Application submitted successfully! You will receive confirmation within 24 hours.',
        status: 'pending-sync'
      };
    }
  }

  // Fallback methods for offline functionality
  async fallbackChatResponse(message, context) {
    const responses = {
      greeting: "Hello! I'm IntelliBot. How can I assist you with IntelliRoute Africa today?",
      features: "Our platform offers AI route optimization, real-time tracking, predictive maintenance, and supply chain analytics.",
      pricing: "We have flexible pricing: Basic (KES 2,500/month), Pro (KES 5,000/month), and Enterprise (custom pricing).",
      contact: "You can reach our support team at support@intelliroute.africa or call +254 700 123 456."
    };

    const messageKey = Object.keys(responses).find(key => 
      message.toLowerCase().includes(key) || 
      (key === 'greeting' && (message.includes('hello') || message.includes('hi')))
    );

    return {
      response: responses[messageKey] || responses.greeting,
      suggestions: ['Tell me about features', 'Pricing information', 'Contact support', 'Start onboarding'],
      confidence: 0.85,
      source: 'fallback'
    };
  }

  async fallbackRecommendations(userProfile) {
    const businessType = userProfile?.businessType?.toLowerCase() || 'general';
    
    const recommendations = {
      producer: [
        "Set up inventory management for production planning",
        "Connect with wholesalers in your region",
        "Optimize delivery routes to reduce costs"
      ],
      wholesaler: [
        "Use demand forecasting to optimize stock levels",
        "Set up multi-retailer delivery optimization",
        "Monitor supplier performance metrics"
      ],
      retailer: [
        "Connect with local wholesalers for better prices",
        "Set up last-mile delivery tracking",
        "Use customer analytics for inventory planning"
      ],
      general: [
        "Start with our free 14-day trial",
        "Schedule a personalized demo",
        "Join our Kenya logistics community"
      ]
    };

    return {
      recommendations: recommendations[businessType] || recommendations.general,
      nextSteps: ['Book a demo', 'Start free trial', 'Contact sales team']
    };
  }

  // Vehicle Management API calls
  async getVehicles(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return await this.request(`/vehicles${queryString ? `?${queryString}` : ''}`);
  }

  async getVehicle(vehicleId) {
    return await this.request(`/vehicles/${vehicleId}`);
  }

  async createVehicle(vehicleData) {
    return await this.request('/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    });
  }

  async updateVehicle(vehicleId, vehicleData) {
    return await this.request(`/vehicles/${vehicleId}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    });
  }

  async deleteVehicle(vehicleId) {
    return await this.request(`/vehicles/${vehicleId}`, {
      method: 'DELETE',
    });
  }

  // Routes Management API calls
  async getRoutes(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    return await this.request(`/routes${queryString ? `?${queryString}` : ''}`);
  }

  async getRoute(routeId) {
    return await this.request(`/routes/${routeId}`);
  }

  async createRoute(routeData) {
    return await this.request('/routes', {
      method: 'POST',
      body: JSON.stringify(routeData),
    });
  }

  // Health check
  async healthCheck() {
    try {
      return await this.request('/health');
    } catch (error) {
      return { status: 'offline', message: 'Backend unavailable' };
    }
  }
}

// Export singleton instance
export const apiService = new APIService();
export default apiService;
