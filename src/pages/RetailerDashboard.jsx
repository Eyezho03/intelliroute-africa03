import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrderManagement from '../components/OrderManagement';
import SupplierMarketplace from '../components/SupplierMarketplace';
import {
  Store,
  ShoppingCart,
  TrendingUp,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  BarChart3,
  Calendar,
  Download,
  RefreshCw,
  Plus,
  Eye,
  ArrowRight,
  Building,
  Truck,
  MapPin,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const RetailerDashboard = ({ user }) => {
  const [timeframe, setTimeframe] = useState('month');
  const [retailerData, setRetailerData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, orders, marketplace

  useEffect(() => {
    // Simulate retailer data
    const sampleData = {
      overview: {
        totalInventory: 2847,
        activeOrders: 8,
        monthlyRevenue: 1875000, // KES
        storeCount: 3,
        customerFootfall: 2350,
        averageOrderValue: 2450,
        inventoryTurnover: 8.2,
        profitMargin: 22.5
      },
      wholesalerOrders: [
        {
          id: 'WO-R001',
          wholesaler: 'Nairobi Wholesale Ltd',
          products: ['Maize Flour 50kg', 'Rice 25kg', 'Cooking Oil 20L'],
          quantity: 150,
          value: 45000,
          status: 'in_transit',
          orderDate: '2024-08-07',
          expectedDelivery: '2024-08-09',
          trackingNumber: 'TRK-2024-08-001',
          priority: 'high'
        },
        {
          id: 'WO-R002',
          wholesaler: 'Lagos Distribution Co.',
          products: ['Sugar 2kg', 'Tea Leaves 500g', 'Wheat Flour 50kg'],
          quantity: 200,
          value: 38000,
          status: 'confirmed',
          orderDate: '2024-08-08',
          expectedDelivery: '2024-08-11',
          trackingNumber: 'TRK-2024-08-002',
          priority: 'medium'
        },
        {
          id: 'WO-R003',
          wholesaler: 'Accra Supply Chain',
          products: ['Coffee 1kg', 'Spices Mix', 'Cooking Oil 5L'],
          quantity: 100,
          value: 28500,
          status: 'pending_approval',
          orderDate: '2024-08-08',
          expectedDelivery: '2024-08-12',
          trackingNumber: 'TRK-2024-08-003',
          priority: 'low'
        }
      ],
      customerSales: {
        daily: [12500, 15200, 11800, 16400, 18200, 14300, 13700],
        weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        monthly: [425000, 465000, 510000, 485000, 520000, 575000, 590000, 615000],
        monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
      },
      inventory: {
        grains: 547,
        dairy: 234,
        beverages: 189,
        snacks: 456,
        household: 321,
        lowStock: 25
      },
      topProducts: [
        {
          id: 'P001',
          name: 'Maize Flour 2kg',
          category: 'Grains',
          unitsSold: 345,
          revenue: 86250,
          margin: 25.5,
          stock: 78,
          trend: 'up'
        },
        {
          id: 'P002',
          name: 'Cooking Oil 1L',
          category: 'Oils',
          unitsSold: 289,
          revenue: 72250,
          margin: 22.0,
          stock: 42,
          trend: 'up'
        },
        {
          id: 'P003',
          name: 'Sugar 1kg',
          category: 'Pantry',
          unitsSold: 267,
          revenue: 53400,
          margin: 20.8,
          stock: 156,
          trend: 'down'
        },
        {
          id: 'P004',
          name: 'Rice 5kg',
          category: 'Grains',
          unitsSold: 198,
          revenue: 79200,
          margin: 28.2,
          stock: 23,
          trend: 'up'
        }
      ],
      deliveryTracking: [
        {
          id: 'WO-R001',
          status: 'in_transit',
          location: 'Nairobi Distribution Center',
          estimatedArrival: '2024-08-09 14:00',
          driver: 'John Mwangi',
          driverPhone: '+254712345678'
        },
        {
          id: 'WO-R004',
          status: 'out_for_delivery',
          location: '5km from destination',
          estimatedArrival: '2024-08-08 16:30',
          driver: 'Mary Achieng',
          driverPhone: '+254723456789'
        }
      ],
      alerts: [
        {
          id: 'ALERT-R001',
          type: 'Low Stock',
          message: 'Rice 5kg inventory critically low (23 units remaining)',
          severity: 'high',
          timestamp: '30 minutes ago'
        },
        {
          id: 'ALERT-R002',
          type: 'Delivery Delay',
          message: 'Order WO-R005 delayed due to traffic conditions',
          severity: 'medium',
          timestamp: '2 hours ago'
        },
        {
          id: 'ALERT-R003',
          type: 'New Promotion',
          message: 'Summer sale promotion available from Nairobi Wholesale',
          severity: 'low',
          timestamp: '4 hours ago'
        }
      ]
    };

    setRetailerData(sampleData);
  }, [timeframe]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'in_transit':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'out_for_delivery':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'confirmed':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'pending_approval':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️';
  };

  if (!retailerData) return <div className="text-white">Loading...</div>;

  // Chart data
  const salesData = {
    labels: retailerData.customerSales.weekly,
    datasets: [{
      label: 'Daily Sales',
      data: retailerData.customerSales.daily,
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };

  const inventoryData = {
    labels: ['Grains', 'Dairy', 'Beverages', 'Snacks', 'Household', 'Low Stock'],
    datasets: [{
      data: Object.values(retailerData.inventory),
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
      borderWidth: 0
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200 p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Store className="text-green-400" size={32} />
            <span className="text-green-400">Retailer</span>
            <span className="text-gray-300">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <ShoppingCart size={16} />
            Order management and customer sales interface
          </p>
          <p className="text-sm text-gray-500">Welcome back, {user?.name || user?.fullName}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          
          <div className="flex border border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === 'dashboard'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === 'orders'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeTab === 'marketplace'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              Marketplace
            </button>
          </div>
          
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <OrderManagement userRole="retailer" userId={user?.id} />
      )}
      
      {activeTab === 'marketplace' && (
        <SupplierMarketplace userRole="retailer" />
      )}
      
      {activeTab === 'dashboard' && (
        <>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{retailerData.overview.totalInventory.toLocaleString()}</h3>
              <p className="text-gray-400 text-sm">Total Inventory</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{retailerData.overview.activeOrders}</h3>
              <p className="text-gray-400 text-sm">Active Orders</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">KES {(retailerData.overview.monthlyRevenue / 1000000).toFixed(1)}M</h3>
              <p className="text-gray-400 text-sm">Monthly Revenue</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{retailerData.overview.customerFootfall.toLocaleString()}</h3>
              <p className="text-gray-400 text-sm">Monthly Footfall</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Weekly Sales Performance</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <Line data={salesData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } },
              x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
            }
          }} />
        </motion.div>

        {/* Inventory Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Inventory Distribution</h3>
            <Package className="h-5 w-5 text-gray-400" />
          </div>
          <Doughnut data={inventoryData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: '#d1d5db', font: { size: 12 } }
              }
            }
          }} />
        </motion.div>
      </div>

      {/* Orders and Tracking Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Wholesaler Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Wholesaler Orders</h3>
            <button 
              onClick={() => setOrderModalOpen(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition"
            >
              <Plus className="h-4 w-4" />
              <span>New Order</span>
            </button>
          </div>

          <div className="space-y-4">
            {retailerData.wholesalerOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{order.wholesaler}</h4>
                    <p className="text-gray-400 text-sm">{order.id} • {order.trackingNumber}</p>
                    <p className="text-gray-500 text-xs">{order.products.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </div>
                    <p className={`text-sm mt-1 ${getPriorityColor(order.priority)}`}>
                      {order.priority} priority
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Value</p>
                    <p className="text-white font-medium">KES {order.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Expected Delivery</p>
                    <p className="text-white font-medium">{order.expectedDelivery}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Track Delivery</span>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                  >
                    View Details <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Top Selling Products</h3>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {retailerData.topProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{product.name}</h4>
                    <p className="text-gray-400 text-sm">{product.category}</p>
                    <p className="text-gray-500 text-xs">{product.unitsSold} units sold</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl">{getTrendIcon(product.trend)}</span>
                    <p className="text-sm mt-1 text-green-400">
                      {product.margin}% margin
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Revenue</p>
                    <p className="text-white font-medium">KES {product.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Stock Level</p>
                    <p className={`font-medium ${product.stock < 50 ? 'text-red-400' : 'text-white'}`}>
                      {product.stock} units
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Delivery Tracking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Active Delivery Tracking</h3>
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {retailerData.deliveryTracking.map((delivery, index) => (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Order {delivery.id}</h4>
                    <p className="text-gray-400 text-sm">{delivery.location}</p>
                    <p className="text-gray-500 text-xs">Driver: {delivery.driver} • {delivery.driverPhone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(delivery.status)}`}>
                    {delivery.status.replace('_', ' ').toUpperCase()}
                  </div>
                  <p className="text-sm mt-1 text-gray-400">
                    ETA: {delivery.estimatedArrival}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Business Alerts</h3>
          <AlertTriangle className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-3">
          {retailerData.alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'border-red-500 bg-red-900/20' :
                alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-900/20' :
                'border-blue-500 bg-blue-900/20'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{alert.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.severity === 'high' ? 'bg-red-500 text-red-100' :
                      alert.severity === 'medium' ? 'bg-yellow-500 text-yellow-100' :
                      'bg-blue-500 text-blue-100'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-gray-300">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
        </>
      )}
    </div>
  );
};

export default RetailerDashboard;
