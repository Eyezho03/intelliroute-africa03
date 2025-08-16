import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Download, Filter, Calendar, Target } from 'lucide-react';

const SupplyChainAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const analyticsData = {
    performance: {
      title: 'Supply Chain Performance',
      metrics: [
        { label: 'On-Time Delivery', value: '94.2%', trend: '+2.1%' },
        { label: 'Cost Efficiency', value: '$45.20', trend: '-12%' },
        { label: 'Supplier Performance', value: '91.5%', trend: '+5.3%' },
        { label: 'Inventory Turnover', value: '6.8x', trend: '+1.2x' }
      ]
    },
    costs: {
      title: 'Cost Analysis',
      metrics: [
        { label: 'Transportation Costs', value: '$2.4M', trend: '-8%' },
        { label: 'Warehousing Costs', value: '$890K', trend: '+3%' },
        { label: 'Inventory Holding', value: '$1.2M', trend: '-5%' },
        { label: 'Total Supply Chain Cost', value: '$4.5M', trend: '-6%' }
      ]
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Supply Chain Analytics</h2>
          <p className="text-gray-400 mt-1">Comprehensive analytics and reporting dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="performance">Performance Metrics</option>
            <option value="costs">Cost Analysis</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData[selectedMetric].metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <BarChart3 className="h-6 w-6 text-emerald-400" />
              </div>
              <div className={`text-sm ${
                metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.trend}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
              <p className="text-gray-400 text-sm">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{analyticsData[selectedMetric].title} Trends</h3>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
              <PieChart className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Placeholder for charts */}
        <div className="h-64 bg-gray-900/30 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">Interactive charts will be rendered here</p>
            <p className="text-gray-600 text-sm mt-2">Integration with Chart.js or similar charting library</p>
          </div>
        </div>
      </motion.div>

      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Target className="h-6 w-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Key Insights & Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-white">Performance Highlights</h4>
            <div className="space-y-2 text-gray-300">
              <p>• Delivery performance improved by 2.1% this month</p>
              <p>• Cost per delivery reduced by 12% through route optimization</p>
              <p>• Supplier reliability increased across all categories</p>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-white">Areas for Improvement</h4>
            <div className="space-y-2 text-gray-300">
              <p>• Warehousing costs showing upward trend</p>
              <p>• Inventory turnover could be optimized in electronics</p>
              <p>• Border crossing delays affecting 15% of shipments</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SupplyChainAnalytics;
