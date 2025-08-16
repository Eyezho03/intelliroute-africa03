import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Package, Truck, CheckCircle, Clock, AlertCircle,
  Factory, Store, ShoppingCart, Users, ArrowRight, Eye, 
  Filter, Search, Download, RefreshCw, Plus, Edit3, BarChart3
} from 'lucide-react';

const OrderManagementDashboard = () => {
  const [selectedTier, setSelectedTier] = useState('all');
  const [activeOrderStatus, setActiveOrderStatus] = useState('all');
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState({});

  // Sample order data across supply chain tiers
  const [orderData, setOrderData] = useState({
    producers: {
      pending: 12,
      processing: 8,
      shipped: 24,
      delivered: 156,
      revenue: 2.8
    },
    wholesalers: {
      pending: 35,
      processing: 28,
      shipped: 67,
      delivered: 234,
      revenue: 8.9
    },
    retailers: {
      pending: 189,
      processing: 145,
      shipped: 298,
      delivered: 1567,
      revenue: 15.7
    }
  });

  // Sample orders for demonstration
  const sampleOrders = [
    {
      id: 'ORD-2024-001',
      customer: 'Nakuru Fresh Markets',
      tier: 'retailer',
      type: 'Fresh Produce',
      status: 'shipped',
      value: 45000,
      items: 125,
      origin: 'Meru Farms Ltd',
      destination: 'Nakuru, Kenya',
      estimatedDelivery: '2024-01-15',
      timeline: [
        { stage: 'ordered', completed: true, timestamp: '2024-01-10 09:00' },
        { stage: 'confirmed', completed: true, timestamp: '2024-01-10 10:30' },
        { stage: 'processing', completed: true, timestamp: '2024-01-11 14:00' },
        { stage: 'shipped', completed: true, timestamp: '2024-01-12 08:00' },
        { stage: 'delivered', completed: false, timestamp: null }
      ]
    },
    {
      id: 'ORD-2024-002',
      customer: 'East Africa Distributors',
      tier: 'wholesaler',
      type: 'Packaged Foods',
      status: 'processing',
      value: 280000,
      items: 850,
      origin: 'Kenya Food Industries',
      destination: 'Mombasa, Kenya',
      estimatedDelivery: '2024-01-18',
      timeline: [
        { stage: 'ordered', completed: true, timestamp: '2024-01-12 11:00' },
        { stage: 'confirmed', completed: true, timestamp: '2024-01-12 15:00' },
        { stage: 'processing', completed: false, timestamp: null },
        { stage: 'shipped', completed: false, timestamp: null },
        { stage: 'delivered', completed: false, timestamp: null }
      ]
    },
    {
      id: 'ORD-2024-003',
      customer: 'Maasai Mara Coffee Co.',
      tier: 'producer',
      type: 'Coffee Beans',
      status: 'delivered',
      value: 150000,
      items: 200,
      origin: 'Local Farmers',
      destination: 'Nairobi Export Hub',
      estimatedDelivery: '2024-01-10',
      timeline: [
        { stage: 'ordered', completed: true, timestamp: '2024-01-05 08:00' },
        { stage: 'confirmed', completed: true, timestamp: '2024-01-05 12:00' },
        { stage: 'processing', completed: true, timestamp: '2024-01-07 16:00' },
        { stage: 'shipped', completed: true, timestamp: '2024-01-08 09:00' },
        { stage: 'delivered', completed: true, timestamp: '2024-01-10 14:30' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-900/20';
      case 'processing': return 'text-blue-400 bg-blue-900/20';
      case 'shipped': return 'text-purple-400 bg-purple-900/20';
      case 'delivered': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'producer': return <Factory className="w-4 h-4" />;
      case 'wholesaler': return <Store className="w-4 h-4" />;
      case 'retailer': return <ShoppingCart className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'producer': return 'text-emerald-400 bg-emerald-900/20';
      case 'wholesaler': return 'text-blue-400 bg-blue-900/20';
      case 'retailer': return 'text-purple-400 bg-purple-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const OrderCard = ({ order }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-emerald-500/30 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${getTierColor(order.tier)}`}>
            {getTierIcon(order.tier)}
          </div>
          <div>
            <h3 className="font-bold text-gray-200">{order.id}</h3>
            <p className="text-sm text-gray-400">{order.customer}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-400">Order Value</p>
          <p className="font-bold text-emerald-400">KES {order.value.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Items</p>
          <p className="font-bold text-gray-200">{order.items}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Product Type</p>
          <p className="font-medium text-gray-300">{order.type}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Delivery</p>
          <p className="font-medium text-gray-300">{order.estimatedDelivery}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Truck className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">Order Timeline</span>
        </div>
        <div className="flex items-center justify-between">
          {order.timeline.map((stage, index) => (
            <React.Fragment key={stage.stage}>
              <div className={`flex flex-col items-center ${stage.completed ? 'text-green-400' : 'text-gray-500'}`}>
                <div className={`w-3 h-3 rounded-full ${stage.completed ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                <span className="text-xs mt-1 capitalize">{stage.stage}</span>
              </div>
              {index < order.timeline.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${stage.completed ? 'bg-green-400' : 'bg-gray-600'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-700 pt-3">
        <span>From: {order.origin}</span>
        <ArrowRight className="w-4 h-4" />
        <span>To: {order.destination}</span>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm transition">
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg text-sm transition">
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-emerald-500/30 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-${color}-900/30 rounded-full`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        {trend && (
          <div className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div>
        <h3 className={`text-2xl font-bold text-${color}-400 mb-1`}>{value}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200 p-4 md:p-6">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <ShoppingBag className="text-emerald-400" size={32} />
            </motion.div>
            <span className="text-emerald-400">Order Management</span>
            <span className="text-gray-300">Hub</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Package size={16} />
            Multi-tier supply chain order tracking and management
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="bg-transparent text-sm text-gray-300 placeholder-gray-500 w-40 focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition text-sm">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition text-sm">
            <Plus size={16} />
            New Order
          </button>
        </div>
      </motion.header>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Orders"
          value="2,456"
          subtitle="Across all tiers"
          icon={ShoppingBag}
          color="emerald"
          trend={12.5}
        />
        <StatCard
          title="Processing"
          value="181"
          subtitle="Active orders"
          icon={Clock}
          color="blue"
          trend={-3.2}
        />
        <StatCard
          title="Revenue (Monthly)"
          value="KES 27.4M"
          subtitle="Total order value"
          icon={BarChart3}
          color="purple"
          trend={18.7}
        />
        <StatCard
          title="Delivery Rate"
          value="94.8%"
          subtitle="On-time deliveries"
          icon={CheckCircle}
          color="green"
          trend={2.1}
        />
      </div>

      {/* Supply Chain Tier Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8"
      >
        <h3 className="text-lg font-bold text-emerald-400 mb-4">Filter by Supply Chain Tier</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => setSelectedTier('all')}
            className={`p-4 rounded-lg border transition ${selectedTier === 'all' 
              ? 'border-emerald-500 bg-emerald-900/20' 
              : 'border-gray-600 hover:border-gray-500'}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-300">All Tiers</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400">2,456</p>
            <p className="text-xs text-gray-400">Total orders</p>
          </button>

          {Object.entries(orderData).map(([tier, data]) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`p-4 rounded-lg border transition ${selectedTier === tier 
                ? `border-${tier === 'producers' ? 'emerald' : tier === 'wholesalers' ? 'blue' : 'purple'}-500 bg-${tier === 'producers' ? 'emerald' : tier === 'wholesalers' ? 'blue' : 'purple'}-900/20` 
                : 'border-gray-600 hover:border-gray-500'}`}
            >
              <div className="flex items-center gap-3 mb-2">
                {getTierIcon(tier.slice(0, -1))}
                <span className="font-medium text-gray-300 capitalize">{tier}</span>
              </div>
              <p className={`text-2xl font-bold text-${tier === 'producers' ? 'emerald' : tier === 'wholesalers' ? 'blue' : 'purple'}-400`}>
                {data.pending + data.processing + data.shipped + data.delivered}
              </p>
              <p className="text-xs text-gray-400">KES {data.revenue}M revenue</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Order Status Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setActiveOrderStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeOrderStatus === status
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {sampleOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition">
          <RefreshCw size={16} />
          Load More Orders
        </button>
      </div>
    </div>
  );
};

export default OrderManagementDashboard;
