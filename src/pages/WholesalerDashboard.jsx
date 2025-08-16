import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Warehouse,
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
  Store,
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

const WholesalerDashboard = ({ user }) => {
  const [timeframe, setTimeframe] = useState('month');
  const [wholesalerData, setWholesalerData] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    // Simulate wholesaler data
    const sampleData = {
      overview: {
        totalInventory: 3247,
        activeManufacturerOrders: 12,
        retailerAccounts: 28,
        monthlyRevenue: 4250000, // KES
        warehouseCapacity: 72, // %
        orderFulfillmentRate: 94.5,
        avgOrderValue: 45000,
        monthlyGrowth: 12.3
      },
      manufacturerOrders: [
        {
          id: 'MO-001',
          manufacturer: 'East Africa Mills Ltd',
          products: ['Maize Flour 50kg', 'Wheat Flour 50kg', 'Rice 25kg'],
          quantity: 800,
          value: 340000,
          status: 'in_transit',
          orderDate: '2024-08-05',
          expectedDelivery: '2024-08-10',
          location: 'Nairobi Factory',
          urgency: 'high'
        },
        {
          id: 'MO-002',
          manufacturer: 'Lagos Food Processing',
          products: ['Sugar 2kg', 'Cooking Oil 20L'],
          quantity: 1200,
          value: 280000,
          status: 'confirmed',
          orderDate: '2024-08-07',
          expectedDelivery: '2024-08-12',
          location: 'Lagos Manufacturing',
          urgency: 'medium'
        },
        {
          id: 'MO-003',
          manufacturer: 'Ghana Agro Foods',
          products: ['Tea Leaves 500g', 'Coffee 1kg', 'Spices Mix'],
          quantity: 600,
          value: 195000,
          status: 'pending',
          orderDate: '2024-08-08',
          expectedDelivery: '2024-08-15',
          location: 'Accra Processing',
          urgency: 'low'
        }
      ],
      retailerSales: [
        {
          id: 'RS-001',
          retailer: 'Nakumatt Supermarket',
          products: ['Maize Flour 50kg', 'Sugar 2kg', 'Rice 25kg'],
          quantity: 450,
          value: 135000,
          status: 'delivered',
          saleDate: '2024-08-06',
          deliveryDate: '2024-08-08',
          location: 'Nairobi CBD',
          margin: 18.5
        },
        {
          id: 'RS-002',
          retailer: 'ShopRite Express',
          products: ['Cooking Oil 20L', 'Tea Leaves 500g'],
          quantity: 320,
          value: 98000,
          status: 'pending_delivery',
          saleDate: '2024-08-07',
          deliveryDate: '2024-08-09',
          location: 'Lagos Victoria Island',
          margin: 22.0
        },
        {
          id: 'RS-003',
          retailer: 'Melcom Stores',
          products: ['Wheat Flour 50kg', 'Coffee 1kg'],
          quantity: 180,
          value: 67500,
          status: 'confirmed',
          saleDate: '2024-08-08',
          deliveryDate: '2024-08-11',
          location: 'Accra Tema',
          margin: 20.2
        }
      ],
      inventory: {
        grains: 1247,
        beverages: 432,
        oils: 678,
        packaged: 890,
        lowStock: 45,
        overstock: 23
      },
      salesMetrics: {
        daily: [85000, 92000, 78000, 105000, 112000, 89000, 96000],
        weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        monthly: [3200000, 3650000, 3900000, 4100000, 4250000, 4450000, 4650000, 4850000],
        monthlyLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
      },
      topRetailers: [
        {
          id: 'RT-001',
          name: 'Nakumatt Supermarket',
          location: 'Nairobi, Kenya',
          monthlyOrders: 35,
          monthlyValue: 1250000,
          rating: 4.9,
          lastOrder: '2024-08-06',
          creditLimit: 500000,
          outstanding: 125000
        },
        {
          id: 'RT-002',
          name: 'ShopRite Express',
          location: 'Lagos, Nigeria',
          monthlyOrders: 28,
          monthlyValue: 980000,
          rating: 4.7,
          lastOrder: '2024-08-07',
          creditLimit: 400000,
          outstanding: 89000
        },
        {
          id: 'RT-003',
          name: 'Melcom Stores',
          location: 'Accra, Ghana',
          monthlyOrders: 22,
          monthlyValue: 750000,
          rating: 4.6,
          lastOrder: '2024-08-08',
          creditLimit: 300000,
          outstanding: 67000
        }
      ],
      alerts: [
        {
          id: 'ALERT-001',
          type: 'Low Stock',
          message: 'Rice 25kg inventory below reorder level',
          severity: 'high',
          timestamp: '1 hour ago'
        },
        {
          id: 'ALERT-002',
          type: 'Payment Due',
          message: 'Outstanding payment from Nakumatt overdue',
          severity: 'medium',
          timestamp: '3 hours ago'
        },
        {
          id: 'ALERT-003',
          type: 'New Opportunity',
          message: 'New retailer inquiry from Kampala region',
          severity: 'low',
          timestamp: '5 hours ago'
        }
      ]
    };

    setWholesalerData(sampleData);
  }, [timeframe]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'in_transit':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'pending_delivery':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'confirmed':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'pending':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
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

  if (!wholesalerData) return <div className="text-white">Loading...</div>;

  // Chart data
  const salesData = {
    labels: wholesalerData.salesMetrics.weekly,
    datasets: [{
      label: 'Daily Sales',
      data: wholesalerData.salesMetrics.daily,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };

  const inventoryData = {
    labels: ['Grains', 'Beverages', 'Oils', 'Packaged Foods', 'Low Stock', 'Overstock'],
    datasets: [{
      data: Object.values(wholesalerData.inventory),
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
            <Warehouse className="text-blue-400" size={32} />
            <span className="text-blue-400">Wholesaler</span>
            <span className="text-gray-300">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Package size={16} />
            Distribution hub connecting manufacturers to retailers
          </p>
          <p className="text-sm text-gray-500">Welcome back, {user?.name || user?.fullName}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition">
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
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{wholesalerData.overview.totalInventory.toLocaleString()}</h3>
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
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Store className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{wholesalerData.overview.retailerAccounts}</h3>
              <p className="text-gray-400 text-sm">Retailer Accounts</p>
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
              <h3 className="text-2xl font-bold text-white">KES {(wholesalerData.overview.monthlyRevenue / 1000000).toFixed(1)}M</h3>
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
              <CheckCircle className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{wholesalerData.overview.orderFulfillmentRate}%</h3>
              <p className="text-gray-400 text-sm">Fulfillment Rate</p>
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
            <Warehouse className="h-5 w-5 text-gray-400" />
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

      {/* Orders & Sales Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Manufacturer Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Manufacturer Orders</h3>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition">
              <Plus className="h-4 w-4" />
              <span>New Order</span>
            </button>
          </div>

          <div className="space-y-4">
            {wholesalerData.manufacturerOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{order.manufacturer}</h4>
                    <p className="text-gray-400 text-sm">{order.id} • {order.location}</p>
                    <p className="text-gray-500 text-xs">{order.products.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </div>
                    <p className={`text-sm mt-1 ${getUrgencyColor(order.urgency)}`}>
                      {order.urgency} urgency
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Retailer Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Retailer Sales</h3>
            <Store className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {wholesalerData.retailerSales.map((sale, index) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{sale.retailer}</h4>
                    <p className="text-gray-400 text-sm">{sale.id} • {sale.location}</p>
                    <p className="text-gray-500 text-xs">{sale.products.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(sale.status)}`}>
                      {sale.status.replace('_', ' ').toUpperCase()}
                    </div>
                    <p className="text-sm mt-1 text-green-400">
                      {sale.margin}% margin
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Value</p>
                    <p className="text-white font-medium">KES {sale.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Delivery Date</p>
                    <p className="text-white font-medium">{sale.deliveryDate}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

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
          {wholesalerData.alerts.map((alert, index) => (
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

export default WholesalerDashboard;
