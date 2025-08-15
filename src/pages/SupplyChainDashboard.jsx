import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Search,
  Calendar,
  DollarSign,
  Globe,
  Warehouse
} from 'lucide-react';
import SupplyChainOverview from '../components/SupplyChainOverview';
import InventoryManagement from '../components/InventoryManagement';
import ShipmentTracking from '../components/ShipmentTracking';
import SupplierManagement from '../components/SupplierManagement';
import DemandForecasting from '../components/DemandForecasting';
import SupplyChainAnalytics from '../components/SupplyChainAnalytics';

const SupplyChainDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Sample supply chain data
  const [supplyChainMetrics, setSupplyChainMetrics] = useState({
    totalShipments: 2847,
    activeSuppliers: 156,
    inventoryValue: 4250000,
    onTimeDelivery: 94.2,
    totalOrders: 1456,
    pendingOrders: 89,
    completedDeliveries: 1367,
    averageLeadTime: 5.8,
    supplierPerformance: 91.5,
    warehouseUtilization: 78.3
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Simulate notifications
    setNotifications([
      { id: 1, type: 'warning', message: 'Low stock alert: Medical supplies in Nairobi warehouse', time: '5 min ago' },
      { id: 2, type: 'success', message: 'Shipment SC-2024-001 delivered successfully to Lagos', time: '15 min ago' },
      { id: 3, type: 'info', message: 'New supplier onboarded: East African Logistics Ltd', time: '1 hour ago' }
    ]);

    return () => clearTimeout(timer);
  }, []);

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'shipments', label: 'Shipments', icon: Truck },
    { id: 'suppliers', label: 'Suppliers', icon: Users },
    { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <SupplyChainOverview metrics={supplyChainMetrics} />;
      case 'inventory':
        return <InventoryManagement />;
      case 'shipments':
        return <ShipmentTracking />;
      case 'suppliers':
        return <SupplierManagement />;
      case 'forecasting':
        return <DemandForecasting />;
      case 'analytics':
        return <SupplyChainAnalytics />;
      default:
        return <SupplyChainOverview metrics={supplyChainMetrics} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading Supply Chain Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-emerald-400" />
                <h1 className="text-2xl font-bold text-white">Supply Chain Control Center</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
                <Calendar className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              
              {/* Notification Bell */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
                  <AlertTriangle className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Key Metrics Bar */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">
                {supplyChainMetrics.totalShipments.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Shipments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {supplyChainMetrics.activeSuppliers}
              </div>
              <div className="text-sm text-gray-400">Active Suppliers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                ${(supplyChainMetrics.inventoryValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-400">Inventory Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {supplyChainMetrics.onTimeDelivery}%
              </div>
              <div className="text-sm text-gray-400">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {supplyChainMetrics.averageLeadTime}
              </div>
              <div className="text-sm text-gray-400">Avg Lead Time (days)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {supplyChainMetrics.warehouseUtilization}%
              </div>
              <div className="text-sm text-gray-400">Warehouse Usage</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-1 bg-gray-800/30 p-1 rounded-lg border border-gray-700 mb-6 overflow-x-auto"
        >
          {tabItems.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pb-8"
        >
          {renderTabContent()}
        </motion.div>
      </div>

      {/* Notifications Sidebar (if notifications exist) */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 w-80 space-y-2 z-50">
          {notifications.slice(0, 3).map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`p-4 rounded-lg shadow-lg backdrop-blur-lg border ${
                notification.type === 'warning' 
                  ? 'bg-yellow-900/20 border-yellow-500/30 text-yellow-200'
                  : notification.type === 'success'
                  ? 'bg-green-900/20 border-green-500/30 text-green-200'
                  : 'bg-blue-900/20 border-blue-500/30 text-blue-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                {notification.type === 'warning' && <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />}
                {notification.type === 'success' && <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />}
                {notification.type === 'info' && <Clock className="h-5 w-5 mt-0.5 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs opacity-70 mt-1">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplyChainDashboard;
