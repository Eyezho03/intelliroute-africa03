import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Package, TrendingUp, AlertTriangle, CheckCircle, Factory, Store,
  ShoppingCart, Users, BarChart3, Clock, DollarSign, Truck, 
  RefreshCw, Download, Filter, Search, Plus, Minus, Eye
} from 'lucide-react';

const SupplyChainInventory = () => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedTier, setSelectedTier] = useState('all');
  const [inventoryData, setInventoryData] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Supply chain tiers data
  const [supplyChainData, setSupplyChainData] = useState({
    producers: {
      total: 45,
      active: 42,
      inventory: { total: 125000, low: 8, critical: 3 },
      topProducts: ['Maize', 'Coffee Beans', 'Tea Leaves', 'Rice', 'Wheat']
    },
    wholesalers: {
      total: 128,
      active: 119,
      inventory: { total: 85000, low: 15, critical: 7 },
      topProducts: ['Packaged Foods', 'Beverages', 'Personal Care', 'Electronics', 'Textiles']
    },
    retailers: {
      total: 2450,
      active: 2280,
      inventory: { total: 45000, low: 125, critical: 38 },
      topProducts: ['Consumer Goods', 'Fresh Produce', 'Household Items', 'Cosmetics', 'Mobile Accessories']
    }
  });

  // Real-time supply chain metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setSupplyChainData(prev => ({
        producers: {
          ...prev.producers,
          inventory: {
            ...prev.producers.inventory,
            total: prev.producers.inventory.total + Math.floor(Math.random() * 500 - 250),
            low: Math.max(0, prev.producers.inventory.low + Math.floor(Math.random() * 3 - 1)),
            critical: Math.max(0, prev.producers.inventory.critical + Math.floor(Math.random() * 2 - 1))
          }
        },
        wholesalers: {
          ...prev.wholesalers,
          inventory: {
            ...prev.wholesalers.inventory,
            total: prev.wholesalers.inventory.total + Math.floor(Math.random() * 300 - 150),
            low: Math.max(0, prev.wholesalers.inventory.low + Math.floor(Math.random() * 5 - 2)),
            critical: Math.max(0, prev.wholesalers.inventory.critical + Math.floor(Math.random() * 3 - 1))
          }
        },
        retailers: {
          ...prev.retailers,
          inventory: {
            ...prev.retailers.inventory,
            total: prev.retailers.inventory.total + Math.floor(Math.random() * 200 - 100),
            low: Math.max(0, prev.retailers.inventory.low + Math.floor(Math.random() * 10 - 5)),
            critical: Math.max(0, prev.retailers.inventory.critical + Math.floor(Math.random() * 5 - 2))
          }
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Supply chain flow visualization data
  const supplyChainFlowData = {
    labels: ['Raw Materials', 'Production', 'Distribution', 'Wholesale', 'Retail', 'Consumer'],
    datasets: [
      {
        label: 'Product Flow (Units)',
        data: [100000, 95000, 92000, 88000, 85000, 82000],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Value Flow (KES Million)',
        data: [2.5, 4.2, 5.8, 7.1, 8.9, 12.5],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Inventory levels by category
  const inventoryByCategory = {
    labels: ['Food & Beverages', 'Electronics', 'Textiles', 'Personal Care', 'Industrial', 'Agricultural'],
    datasets: [{
      data: [35, 20, 15, 12, 10, 8],
      backgroundColor: [
        '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'
      ],
      borderWidth: 0
    }]
  };

  const SupplyChainTierCard = ({ tier, data, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-${color}-500/50 transition-all cursor-pointer ${selectedTier === tier ? `border-${color}-500` : ''}`}
      onClick={() => setSelectedTier(tier)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 bg-${color}-900/30 rounded-full`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold text-${color}-400 capitalize`}>{tier}</h3>
            <p className="text-gray-400 text-sm">{data.total} partners</p>
          </div>
        </div>
        <div className={`text-2xl font-bold text-${color}-400`}>
          {data.active}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-700/30 rounded-lg">
          <div className="text-lg font-bold text-gray-200">{data.inventory.total.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Total Items</div>
        </div>
        <div className="text-center p-2 bg-yellow-900/20 rounded-lg">
          <div className="text-lg font-bold text-yellow-400">{data.inventory.low}</div>
          <div className="text-xs text-gray-400">Low Stock</div>
        </div>
        <div className="text-center p-2 bg-red-900/20 rounded-lg">
          <div className="text-lg font-bold text-red-400">{data.inventory.critical}</div>
          <div className="text-xs text-gray-400">Critical</div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-300 mb-2">Top Products</h4>
        <div className="flex flex-wrap gap-1">
          {data.topProducts.slice(0, 3).map((product, index) => (
            <span key={index} className={`text-xs px-2 py-1 bg-${color}-900/20 text-${color}-300 rounded-full`}>
              {product}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const InventoryAlert = ({ alert, index }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-4 rounded-lg border-l-4 ${
        alert.severity === 'critical' ? 'bg-red-900/20 border-red-500' :
        alert.severity === 'warning' ? 'bg-yellow-900/20 border-yellow-500' :
        'bg-blue-900/20 border-blue-500'
      }`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className={`w-5 h-5 mt-0.5 ${
          alert.severity === 'critical' ? 'text-red-400' :
          alert.severity === 'warning' ? 'text-yellow-400' :
          'text-blue-400'
        }`} />
        <div className="flex-1">
          <h4 className="font-medium text-gray-200">{alert.title}</h4>
          <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span>{alert.location}</span>
            <span>{alert.timestamp}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-700 rounded">
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Sample alerts data
  const sampleAlerts = [
    {
      severity: 'critical',
      title: 'Critical Stock Level - Maize Supply',
      description: 'Producer "Nakuru Grains Ltd" reports only 2 days of maize stock remaining',
      location: 'Nakuru, Kenya',
      timestamp: '5 minutes ago'
    },
    {
      severity: 'warning',
      title: 'Seasonal Demand Surge - Personal Care',
      description: 'Retailers in Nairobi reporting 40% increase in personal care product demand',
      location: 'Nairobi, Kenya',
      timestamp: '15 minutes ago'
    },
    {
      severity: 'info',
      title: 'New Wholesaler Onboarded',
      description: 'East Africa Distributors Ltd has joined the platform with 500+ SKUs',
      location: 'Mombasa, Kenya',
      timestamp: '1 hour ago'
    }
  ];

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
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Package className="text-emerald-400" size={32} />
            </motion.div>
            <span className="text-emerald-400">Supply Chain</span>
            <span className="text-gray-300">Inventory Hub</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Factory size={16} />
            Managing {supplyChainData.producers.total + supplyChainData.wholesalers.total + supplyChainData.retailers.total}+ supply chain partners across East Africa
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition text-sm">
            <Download size={16} />
            Export Report
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition text-sm">
            <RefreshCw size={16} />
            Sync All
          </button>
        </div>
      </motion.header>

      {/* Supply Chain Tier Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SupplyChainTierCard 
          tier="producers"
          data={supplyChainData.producers}
          icon={Factory}
          color="emerald"
        />
        <SupplyChainTierCard 
          tier="wholesalers"
          data={supplyChainData.wholesalers}
          icon={Store}
          color="blue"
        />
        <SupplyChainTierCard 
          tier="retailers"
          data={supplyChainData.retailers}
          icon={ShoppingCart}
          color="purple"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Supply Chain Flow */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6"
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <TrendingUp size={20} />
              Supply Chain Flow Analytics
            </h3>
            <Line 
              data={supplyChainFlowData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: { color: '#9ca3af' }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#10b981',
                    bodyColor: '#fff'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#9ca3af' }
                  },
                  x: {
                    grid: { display: false },
                    ticks: { color: '#9ca3af' }
                  }
                }
              }}
            />
          </motion.div>
        </div>

        {/* Inventory Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
            <BarChart3 size={20} />
            Inventory by Category
          </h3>
          <Doughnut 
            data={inventoryByCategory}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { 
                    color: '#9ca3af',
                    usePointStyle: true,
                    pointStyle: 'circle',
                    font: { size: 11 }
                  }
                },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: '#10b981',
                  bodyColor: '#fff'
                }
              }
            }}
          />
        </motion.div>
      </div>

      {/* Supply Chain Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-xl border border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <AlertTriangle size={20} />
            Supply Chain Intelligence Alerts
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Last updated: 2 minutes ago</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="space-y-4">
          {sampleAlerts.map((alert, index) => (
            <InventoryAlert key={index} alert={alert} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SupplyChainInventory;
