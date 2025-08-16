import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  MapPin,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Users,
  Calendar,
  ArrowRight,
  Warehouse,
  Globe
} from 'lucide-react';

const SupplyChainOverview = ({ metrics }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [recentActivities, setRecentActivities] = useState([]);
  const [criticalAlerts, setCriticalAlerts] = useState([]);

  useEffect(() => {
    // Simulate recent activities
    setRecentActivities([
      {
        id: 1,
        type: 'shipment',
        title: 'Shipment SC-2024-045 departed Lagos',
        description: 'Medical supplies en route to Abuja',
        timestamp: '2 hours ago',
        status: 'in_transit'
      },
      {
        id: 2,
        type: 'inventory',
        title: 'Low stock alert triggered',
        description: 'Electronics inventory below minimum threshold',
        timestamp: '4 hours ago',
        status: 'warning'
      },
      {
        id: 3,
        type: 'supplier',
        title: 'New supplier contract signed',
        description: 'West African Distributors Ltd onboarded',
        timestamp: '6 hours ago',
        status: 'success'
      },
      {
        id: 4,
        type: 'delivery',
        title: 'Bulk delivery completed',
        description: '500 units delivered to Nairobi warehouse',
        timestamp: '8 hours ago',
        status: 'completed'
      },
      {
        id: 5,
        type: 'maintenance',
        title: 'Fleet maintenance scheduled',
        description: '12 vehicles scheduled for service',
        timestamp: '1 day ago',
        status: 'scheduled'
      }
    ]);

    // Simulate critical alerts
    setCriticalAlerts([
      {
        id: 1,
        level: 'high',
        title: 'Delayed Shipment',
        message: 'SC-2024-032 delayed by 6 hours due to border crossing issues',
        impact: 'Customer satisfaction risk'
      },
      {
        id: 2,
        level: 'medium',
        title: 'Supplier Performance',
        message: 'Global Logistics Inc. performance dropped to 78%',
        impact: 'Review supplier agreement'
      },
      {
        id: 3,
        level: 'low',
        title: 'Warehouse Capacity',
        message: 'Dar es Salaam warehouse at 92% capacity',
        impact: 'Consider redistribution'
      }
    ]);
  }, []);

  const performanceCards = [
    {
      title: 'Total Shipments',
      value: metrics.totalShipments,
      change: +12.5,
      period: 'vs last month',
      icon: Truck,
      color: 'emerald',
      format: 'number'
    },
    {
      title: 'Inventory Value',
      value: metrics.inventoryValue,
      change: +8.3,
      period: 'vs last month',
      icon: Package,
      color: 'blue',
      format: 'currency'
    },
    {
      title: 'Active Suppliers',
      value: metrics.activeSuppliers,
      change: +15.2,
      period: 'vs last month',
      icon: Users,
      color: 'purple',
      format: 'number'
    },
    {
      title: 'On-Time Delivery',
      value: metrics.onTimeDelivery,
      change: +2.1,
      period: 'vs last month',
      icon: CheckCircle,
      color: 'green',
      format: 'percentage'
    }
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return `$${(value / 1000000).toFixed(1)}M`;
      case 'percentage':
        return `${value}%`;
      case 'number':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'shipment':
        return Truck;
      case 'inventory':
        return Package;
      case 'supplier':
        return Users;
      case 'delivery':
        return MapPin;
      case 'maintenance':
        return Activity;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'in_transit':
        return 'text-blue-400';
      case 'completed':
        return 'text-emerald-400';
      case 'scheduled':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getAlertColor = (level) => {
    switch (level) {
      case 'high':
        return 'border-red-500/30 bg-red-900/20 text-red-200';
      case 'medium':
        return 'border-yellow-500/30 bg-yellow-900/20 text-yellow-200';
      case 'low':
        return 'border-blue-500/30 bg-blue-900/20 text-blue-200';
      default:
        return 'border-gray-500/30 bg-gray-900/20 text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Time Frame Selector */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Supply Chain Overview</h2>
        <div className="flex space-x-1 bg-gray-800/30 p-1 rounded-lg border border-gray-700">
          {['7d', '30d', '90d', '1y'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                selectedTimeframe === period
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${card.color}-500/10 rounded-lg border border-${card.color}-500/20`}>
                  <Icon className={`h-6 w-6 text-${card.color}-400`} />
                </div>
                <div className="flex items-center space-x-1">
                  {card.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`text-sm ${card.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {card.change > 0 ? '+' : ''}{card.change}%
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">
                  {formatValue(card.value, card.format)}
                </h3>
                <p className="text-gray-400 text-sm">{card.title}</p>
                <p className="text-xs text-gray-500">{card.period}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Activity className="mr-2 h-5 w-5 text-emerald-400" />
              Recent Activities
            </h3>
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                      <Icon className={`h-5 w-5 ${getStatusColor(activity.status)}`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium">{activity.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
                    <span className="text-xs text-gray-500 mt-2 block">{activity.timestamp}</span>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(activity.status)} bg-gray-800/50`}>
                    {activity.status.replace('_', ' ')}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Critical Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-red-400" />
              Critical Alerts
            </h3>
            <span className="bg-red-900/30 text-red-400 text-xs px-2 py-1 rounded-full border border-red-500/30">
              {criticalAlerts.length} active
            </span>
          </div>
          
          <div className="space-y-4">
            {criticalAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`p-4 rounded-lg border ${getAlertColor(alert.level)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{alert.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    alert.level === 'high' ? 'bg-red-500/20 text-red-300' :
                    alert.level === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {alert.level}
                  </span>
                </div>
                <p className="text-sm mb-3 opacity-90">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-70">{alert.impact}</span>
                  <button className="text-xs hover:underline opacity-80">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button className="w-full mt-4 p-3 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white rounded-lg transition-all flex items-center justify-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span>Manage All Alerts</span>
          </button>
        </motion.div>
      </div>

      {/* Additional Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Supply Chain Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Supply Chain Health</h4>
            <Zap className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Overall Score</span>
              <span className="text-green-400 font-semibold">87%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full w-[87%]"></div>
            </div>
            <div className="text-sm text-gray-500">Based on delivery times, supplier performance, and inventory levels</div>
          </div>
        </motion.div>

        {/* Geographic Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Coverage</h4>
            <Globe className="h-5 w-5 text-blue-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Countries</span>
              <span className="text-blue-400 font-semibold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Cities</span>
              <span className="text-blue-400 font-semibold">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Warehouses</span>
              <span className="text-blue-400 font-semibold">42</span>
            </div>
          </div>
        </motion.div>

        {/* Cost Efficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Cost Efficiency</h4>
            <DollarSign className="h-5 w-5 text-green-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Cost per Delivery</span>
              <span className="text-green-400 font-semibold">$45.20</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm">12% reduction</span>
            </div>
            <div className="text-sm text-gray-500">vs last quarter</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupplyChainOverview;
