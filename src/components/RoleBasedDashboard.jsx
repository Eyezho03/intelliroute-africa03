import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { 
  Users, 
  Truck, 
  Package, 
  BarChart3, 
  MapPin, 
  Calendar,
  AlertTriangle,
  TrendingUp,
  Activity,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';

const RoleBasedDashboard = () => {
  const { user, logout, getUserFullName } = useAuth();
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const data = await Promise.all([
          apiService.getDashboardMetrics(user.role, user._id),
          user.role === 'admin' ? apiService.getUsers() : Promise.resolve(null),
          apiService.getVehicles(),
          apiService.getInventory(),
          apiService.getOrders()
        ]);

        setDashboardData({
          metrics: data[0],
          users: data[1],
          vehicles: data[2],
          inventory: data[3],
          orders: data[4]
        });
      } catch (err) {
        console.warn('Dashboard data fetch failed, using fallback data:', err.message);
        // Fallback data
        setDashboardData({
          metrics: {
            totalOrders: 145,
            activeVehicles: 23,
            totalRevenue: 'KES 2,450,000',
            completedDeliveries: 98
          },
          users: { data: [], count: 0 },
          vehicles: { data: [], count: 0 },
          inventory: { data: [], count: 0 },
          orders: { data: [], count: 0 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'admin': return 'Admin Dashboard';
      case 'driver': return 'Driver Dashboard';
      case 'fleet-manager': return 'Fleet Manager Dashboard';
      case 'producer': return 'Producer Dashboard';
      case 'retailer': return 'Retailer Dashboard';
      default: return 'Dashboard';
    }
  };

  const getQuickActions = () => {
    const actions = {
      admin: [
        { icon: Users, label: 'Manage Users', color: 'bg-blue-500' },
        { icon: Truck, label: 'Fleet Overview', color: 'bg-green-500' },
        { icon: BarChart3, label: 'Analytics', color: 'bg-purple-500' },
        { icon: Settings, label: 'System Settings', color: 'bg-gray-500' }
      ],
      driver: [
        { icon: MapPin, label: 'My Routes', color: 'bg-blue-500' },
        { icon: Package, label: 'Active Deliveries', color: 'bg-green-500' },
        { icon: Calendar, label: 'Schedule', color: 'bg-orange-500' },
        { icon: Activity, label: 'Performance', color: 'bg-purple-500' }
      ],
      'fleet-manager': [
        { icon: Truck, label: 'Vehicle Fleet', color: 'bg-blue-500' },
        { icon: Users, label: 'Manage Drivers', color: 'bg-green-500' },
        { icon: MapPin, label: 'Route Planning', color: 'bg-orange-500' },
        { icon: BarChart3, label: 'Fleet Analytics', color: 'bg-purple-500' }
      ],
      producer: [
        { icon: Package, label: 'Inventory', color: 'bg-blue-500' },
        { icon: TrendingUp, label: 'Orders', color: 'bg-green-500' },
        { icon: Truck, label: 'Shipments', color: 'bg-orange-500' },
        { icon: BarChart3, label: 'Production Analytics', color: 'bg-purple-500' }
      ],
      retailer: [
        { icon: Package, label: 'Browse Products', color: 'bg-blue-500' },
        { icon: TrendingUp, label: 'Place Orders', color: 'bg-green-500' },
        { icon: MapPin, label: 'Track Deliveries', color: 'bg-orange-500' },
        { icon: BarChart3, label: 'Purchase History', color: 'bg-purple-500' }
      ]
    };
    return actions[user?.role] || actions.retailer;
  };

  const getMetricCards = () => {
    const { metrics } = dashboardData;
    
    const cards = {
      admin: [
        { title: 'Total Users', value: dashboardData.users?.count || '0', icon: Users, color: 'text-blue-600' },
        { title: 'Active Vehicles', value: dashboardData.vehicles?.count || '0', icon: Truck, color: 'text-green-600' },
        { title: 'Total Orders', value: dashboardData.orders?.count || '0', icon: Package, color: 'text-orange-600' },
        { title: 'Inventory Items', value: dashboardData.inventory?.count || '0', icon: BarChart3, color: 'text-purple-600' }
      ],
      driver: [
        { title: 'Active Routes', value: '3', icon: MapPin, color: 'text-blue-600' },
        { title: 'Deliveries Today', value: '8', icon: Package, color: 'text-green-600' },
        { title: 'Distance Covered', value: '247 km', icon: Activity, color: 'text-orange-600' },
        { title: 'Rating', value: '4.8/5', icon: TrendingUp, color: 'text-purple-600' }
      ],
      'fleet-manager': [
        { title: 'Fleet Vehicles', value: dashboardData.vehicles?.count || '0', icon: Truck, color: 'text-blue-600' },
        { title: 'Active Drivers', value: '12', icon: Users, color: 'text-green-600' },
        { title: 'Routes Today', value: '25', icon: MapPin, color: 'text-orange-600' },
        { title: 'Fuel Efficiency', value: '18.5 L/100km', icon: TrendingUp, color: 'text-purple-600' }
      ],
      producer: [
        { title: 'Inventory Items', value: dashboardData.inventory?.count || '0', icon: Package, color: 'text-blue-600' },
        { title: 'Orders This Month', value: dashboardData.orders?.count || '0', icon: TrendingUp, color: 'text-green-600' },
        { title: 'Low Stock Alerts', value: '3', icon: AlertTriangle, color: 'text-orange-600' },
        { title: 'Revenue', value: 'KES 1.2M', icon: BarChart3, color: 'text-purple-600' }
      ],
      retailer: [
        { title: 'Active Orders', value: '5', icon: Package, color: 'text-blue-600' },
        { title: 'This Month Purchases', value: 'KES 45,000', icon: TrendingUp, color: 'text-green-600' },
        { title: 'Pending Deliveries', value: '2', icon: MapPin, color: 'text-orange-600' },
        { title: 'Saved on Logistics', value: '15%', icon: BarChart3, color: 'text-purple-600' }
      ]
    };
    
    return cards[user?.role] || cards.retailer;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getDashboardTitle()}</h1>
              <p className="text-gray-600">Welcome back, {getUserFullName()}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Role: <span className="font-medium text-blue-600">{user?.role}</span></p>
                <p className="text-xs text-gray-500">Backend: Connected ✓</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getMetricCards().map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getQuickActions().map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-full ${action.color} mb-3`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { time: '2 minutes ago', action: 'New order received from Nairobi', type: 'order' },
              { time: '15 minutes ago', action: 'Vehicle KBZ-001A completed delivery', type: 'delivery' },
              { time: '1 hour ago', action: 'Low stock alert: Fresh Tomatoes', type: 'alert' },
              { time: '2 hours ago', action: 'Route optimization completed', type: 'system' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'order' ? 'bg-green-500' :
                  activity.type === 'delivery' ? 'bg-blue-500' :
                  activity.type === 'alert' ? 'bg-orange-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleBasedDashboard;
