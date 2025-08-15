import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Users, Truck, Package, 
  MapPin, Clock, DollarSign, AlertTriangle, CheckCircle,
  BarChart3, PieChart, Activity, RefreshCw
} from 'lucide-react';
import { apiService } from '../services/api';
import { ErrorToast, InlineError } from './ErrorBoundary';
import { useAuth } from '../contexts/AuthContext';

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const [metrics, vehicles, orders, deliveries] = await Promise.all([
        apiService.getDashboardMetrics(user.role, user.id),
        apiService.getVehicles({ limit: 10 }),
        apiService.getOrders({ limit: 10, status: 'active' }),
        apiService.getDeliveries({ limit: 10, status: 'in_transit' })
      ]);

      setDashboardData({
        metrics: metrics.data || metrics,
        vehicles: vehicles.data || vehicles,
        orders: orders.data || orders,
        deliveries: deliveries.data || deliveries
      });
    } catch (error) {
      setError(error);
      // Fallback to mock data
      setDashboardData(getMockDashboardData(user.role));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
  };

  const getMockDashboardData = (role) => {
    const baseData = {
      totalOrders: Math.floor(Math.random() * 1000) + 500,
      totalRevenue: Math.floor(Math.random() * 1000000) + 500000,
      activeDeliveries: Math.floor(Math.random() * 100) + 50,
      completedDeliveries: Math.floor(Math.random() * 500) + 200,
      vehiclesOnRoad: Math.floor(Math.random() * 50) + 25,
      averageDeliveryTime: Math.floor(Math.random() * 60) + 30,
      customerSatisfaction: (Math.random() * 1 + 4).toFixed(1),
      fuelSavings: Math.floor(Math.random() * 50) + 20
    };

    return {
      metrics: baseData,
      vehicles: generateMockVehicles(),
      orders: generateMockOrders(),
      deliveries: generateMockDeliveries()
    };
  };

  const generateMockVehicles = () => Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    licensePlate: `KAA ${Math.floor(Math.random() * 900) + 100}A`,
    type: ['Truck', 'Van', 'Pickup'][Math.floor(Math.random() * 3)],
    status: ['active', 'maintenance', 'idle'][Math.floor(Math.random() * 3)],
    location: ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret'][Math.floor(Math.random() * 4)],
    driver: `Driver ${i + 1}`
  }));

  const generateMockOrders = () => Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    orderNumber: `ORD-${Date.now()}-${i}`,
    customer: `Customer ${i + 1}`,
    status: ['pending', 'confirmed', 'in_transit', 'delivered'][Math.floor(Math.random() * 4)],
    amount: Math.floor(Math.random() * 50000) + 10000,
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
  }));

  const generateMockDeliveries = () => Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    trackingNumber: `DEL-${Date.now()}-${i}`,
    origin: ['Nairobi', 'Mombasa'][Math.floor(Math.random() * 2)],
    destination: ['Kisumu', 'Eldoret', 'Nakuru'][Math.floor(Math.random() * 3)],
    status: ['picked_up', 'in_transit', 'out_for_delivery'][Math.floor(Math.random() * 3)],
    estimatedDelivery: new Date(Date.now() + Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString()
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-700">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.role === 'admin' ? 'Admin Dashboard' : 
                 user.role === 'driver' ? 'Driver Dashboard' :
                 user.role === 'fleet-manager' ? 'Fleet Management' :
                 'Business Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user.fullName || user.firstName}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <InlineError 
            error={error} 
            onRetry={handleRefresh}
            className="mb-6"
          />
        )}

        {dashboardData && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Orders"
                value={dashboardData.metrics.totalOrders}
                icon={Package}
                trend={{ value: 12, direction: 'up' }}
                color="blue"
              />
              <MetricCard
                title="Revenue"
                value={`KES ${dashboardData.metrics.totalRevenue?.toLocaleString()}`}
                icon={DollarSign}
                trend={{ value: 8, direction: 'up' }}
                color="green"
              />
              <MetricCard
                title="Active Deliveries"
                value={dashboardData.metrics.activeDeliveries}
                icon={Truck}
                trend={{ value: 3, direction: 'down' }}
                color="orange"
              />
              <MetricCard
                title="Vehicles on Road"
                value={dashboardData.metrics.vehiclesOnRoad}
                icon={MapPin}
                trend={{ value: 5, direction: 'up' }}
                color="purple"
              />
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <RecentActivity 
                  orders={dashboardData.orders}
                  deliveries={dashboardData.deliveries}
                />
              </div>
              <div>
                <PerformanceMetrics metrics={dashboardData.metrics} />
              </div>
            </div>

            {/* Vehicle Status */}
            <div className="mb-8">
              <VehicleStatus vehicles={dashboardData.vehicles} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, icon: Icon, trend, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-100',
    green: 'bg-green-500 text-green-100',
    orange: 'bg-orange-500 text-orange-100',
    purple: 'bg-purple-500 text-purple-100'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.direction === 'up' ? 
              <TrendingUp className="w-4 h-4 mr-1" /> : 
              <TrendingDown className="w-4 h-4 mr-1" />
            }
            {trend.value}%
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  );
};

// Recent Activity Component
const RecentActivity = ({ orders, deliveries }) => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'orders' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Recent Orders
          </button>
          <button
            onClick={() => setActiveTab('deliveries')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'deliveries' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Active Deliveries
          </button>
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'orders' ? (
          <div className="space-y-4">
            {orders?.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <h4 className="font-medium text-gray-900">{order.orderNumber}</h4>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.replace('_', ' ')}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    KES {order.amount?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {deliveries?.slice(0, 5).map(delivery => (
              <div key={delivery.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <h4 className="font-medium text-gray-900">{delivery.trackingNumber}</h4>
                  <p className="text-sm text-gray-600">
                    {delivery.origin} → {delivery.destination}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    delivery.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    delivery.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                    delivery.status === 'in_transit' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {delivery.status.replace('_', ' ')}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">
                    ETA: {new Date(delivery.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Performance Metrics Component
const PerformanceMetrics = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Avg. Delivery Time</span>
          <span className="font-medium">{metrics.averageDeliveryTime}h</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Customer Satisfaction</span>
          <span className="font-medium">{metrics.customerSatisfaction}/5.0</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fuel Savings</span>
          <span className="font-medium text-green-600">{metrics.fuelSavings}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">On-time Delivery</span>
          <span className="font-medium text-green-600">94%</span>
        </div>
      </div>
    </div>
  );
};

// Vehicle Status Component
const VehicleStatus = ({ vehicles }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Vehicle Fleet Status</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles?.map(vehicle => (
              <tr key={vehicle.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {vehicle.licensePlate}
                    </div>
                    <div className="text-sm text-gray-500">{vehicle.type}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vehicle.driver}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vehicle.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    vehicle.status === 'active' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'maintenance' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
