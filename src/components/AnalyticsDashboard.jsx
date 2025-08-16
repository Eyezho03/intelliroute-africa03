import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Truck,
  Package,
  Target
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalRevenue: '$2,456,789',
    totalDeliveries: '1,234',
    avgDeliveryTime: '4.2 hours',
    costSavings: '18.5%'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive insights into your logistics operations</p>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 font-medium mb-2">Total Revenue</h3>
            <span className="text-2xl font-bold text-gray-900">{metrics.totalRevenue}</span>
            <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 font-medium mb-2">Total Deliveries</h3>
            <span className="text-2xl font-bold text-gray-900">{metrics.totalDeliveries}</span>
            <p className="text-sm text-green-600 mt-1">+8.3% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingDown className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 font-medium mb-2">Avg Delivery Time</h3>
            <span className="text-2xl font-bold text-gray-900">{metrics.avgDeliveryTime}</span>
            <p className="text-sm text-green-600 mt-1">-15.2% improvement</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 font-medium mb-2">Cost Savings</h3>
            <span className="text-2xl font-bold text-gray-900">{metrics.costSavings}</span>
            <p className="text-sm text-green-600 mt-1">+3.2% optimization</p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Revenue chart visualization</p>
                <p className="text-sm text-gray-400">Interactive charts would be displayed here</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Performance</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Performance chart visualization</p>
                <p className="text-sm text-gray-400">Real-time performance metrics</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Key Insights</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-lg font-semibold mb-1">Peak Performance</p>
              <p className="text-indigo-100">Tuesday-Thursday shows highest delivery efficiency with 95% on-time rate.</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Route Optimization</p>
              <p className="text-indigo-100">AI-optimized routes reduced fuel costs by 23% and delivery time by 18%.</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Customer Satisfaction</p>
              <p className="text-indigo-100">98.2% customer satisfaction rate with average rating of 4.8/5 stars.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
