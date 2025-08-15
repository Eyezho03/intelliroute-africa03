import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Factory,
  Package,
  TrendingUp,
  ShoppingCart,
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
  Building2,
  Truck
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

const ManufacturerDashboard = ({ user }) => {
  const [timeframe, setTimeframe] = useState('month');
  const [manufacturerData, setManufacturerData] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Simulate manufacturer data
    const sampleData = {
      overview: {
        totalProducts: 1247,
        activeOrders: 23,
        pendingDeliveries: 18,
        monthlyRevenue: 2847500, // KES
        productionCapacity: 85, // %
        qualityScore: 96.2,
        wholesalerCount: 12,
        avgDeliveryTime: 3.2 // days
      },
      orders: [
        {
          id: 'WO-001',
          wholesaler: 'Nairobi Wholesale Ltd',
          products: ['Maize Flour 50kg', 'Rice 25kg', 'Cooking Oil 20L'],
          quantity: 500,
          value: 125000,
          status: 'confirmed',
          orderDate: '2024-08-07',
          deliveryDate: '2024-08-12',
          location: 'Nairobi, Kenya',
          priority: 'high'
        },
        {
          id: 'WO-002', 
          wholesaler: 'Lagos Distribution Co.',
          products: ['Maize Flour 50kg', 'Sugar 2kg'],
          quantity: 750,
          value: 187500,
          status: 'in_production',
          orderDate: '2024-08-06',
          deliveryDate: '2024-08-14',
          location: 'Lagos, Nigeria',
          priority: 'medium'
        },
        {
          id: 'WO-003',
          wholesaler: 'Accra Supply Chain',
          products: ['Rice 25kg', 'Cooking Oil 20L', 'Tea Leaves 500g'],
          quantity: 350,
          value: 87500,
          status: 'pending_approval',
          orderDate: '2024-08-08',
          deliveryDate: '2024-08-15',
          location: 'Accra, Ghana',
          priority: 'low'
        }
      ],
      production: {
        daily: [120, 135, 128, 142, 150, 138, 145],
        weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        monthly: [2400, 2650, 2300, 2800, 2950, 2700, 2900, 3100],
        monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
      },
      inventory: {
        rawMaterials: 78,
        finishedGoods: 234,
        inProduction: 45,
        qualityCheck: 12
      },
      wholesalers: [
        {
          id: 'WS-001',
          name: 'Nairobi Wholesale Ltd',
          location: 'Nairobi, Kenya',
          totalOrders: 45,
          monthlyValue: 875000,
          rating: 4.8,
          lastOrder: '2024-08-07',
          status: 'active'
        },
        {
          id: 'WS-002',
          name: 'Lagos Distribution Co.',
          location: 'Lagos, Nigeria', 
          totalOrders: 32,
          monthlyValue: 650000,
          rating: 4.6,
          lastOrder: '2024-08-06',
          status: 'active'
        },
        {
          id: 'WS-003',
          name: 'Accra Supply Chain',
          location: 'Accra, Ghana',
          totalOrders: 28,
          monthlyValue: 520000,
          rating: 4.4,
          lastOrder: '2024-08-08',
          status: 'active'
        }
      ],
      qualityMetrics: {
        passRate: 96.2,
        defectRate: 3.8,
        returnRate: 1.2,
        customerSatisfaction: 94.5
      },
      alerts: [
        {
          id: 'ALERT-001',
          type: 'Low Stock',
          message: 'Raw material inventory below threshold',
          severity: 'high',
          timestamp: '2 hours ago'
        },
        {
          id: 'ALERT-002',
          type: 'Quality Issue',
          message: 'Batch QC-2024-08-09 requires inspection',
          severity: 'medium',
          timestamp: '4 hours ago'
        }
      ]
    };

    setManufacturerData(sampleData);
  }, [timeframe]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'in_production':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'pending_approval':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'delivered':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
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

  if (!manufacturerData) return <div className="text-white">Loading...</div>;

  // Chart data
  const productionData = {
    labels: manufacturerData.production.weekly,
    datasets: [{
      label: 'Daily Production',
      data: manufacturerData.production.daily,
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };

  const inventoryData = {
    labels: ['Raw Materials', 'Finished Goods', 'In Production', 'Quality Check'],
    datasets: [{
      data: Object.values(manufacturerData.inventory),
      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
      borderWidth: 0
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200 p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Factory className="text-emerald-400" size={32} />
            <span className="text-emerald-400">Manufacturer</span>
            <span className="text-gray-300">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Package size={16} />
            Production management and wholesale order fulfillment
          </p>
          <p className="text-sm text-gray-500">Welcome back, {user?.name || user?.fullName}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
          
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{manufacturerData.overview.totalProducts.toLocaleString()}</h3>
              <p className="text-gray-400 text-sm">Total Products</p>
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
              <h3 className="text-2xl font-bold text-white">{manufacturerData.overview.activeOrders}</h3>
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
              <h3 className="text-2xl font-bold text-white">KES {(manufacturerData.overview.monthlyRevenue / 1000000).toFixed(1)}M</h3>
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
              <Building2 className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{manufacturerData.overview.wholesalerCount}</h3>
              <p className="text-gray-400 text-sm">Active Wholesalers</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Production Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Production Overview</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <Line data={productionData} options={{
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

      {/* Wholesaler Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Wholesaler Orders</h3>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition">
            <Plus className="h-4 w-4" />
            <span>New Order</span>
          </button>
        </div>

        <div className="space-y-4">
          {manufacturerData.orders.map((order, index) => (
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
                  <p className="text-gray-400 text-sm">{order.id} • {order.location}</p>
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Quantity</p>
                  <p className="text-white font-medium">{order.quantity} units</p>
                </div>
                <div>
                  <p className="text-gray-400">Value</p>
                  <p className="text-white font-medium">KES {order.value.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Order Date</p>
                  <p className="text-white font-medium">{order.orderDate}</p>
                </div>
                <div>
                  <p className="text-gray-400">Delivery Date</p>
                  <p className="text-white font-medium">{order.deliveryDate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">Delivery Schedule</span>
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

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Production Alerts</h3>
          <AlertTriangle className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-3">
          {manufacturerData.alerts.map((alert, index) => (
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
    </div>
  );
};

export default ManufacturerDashboard;
