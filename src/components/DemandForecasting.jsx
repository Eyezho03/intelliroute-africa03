import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Target, 
  Brain, 
  Zap, 
  Box,
  ShoppingBag,
  Pill,
  CircuitBoard,
  Utensils,
  Factory,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const DemandForecasting = () => {
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d

  // Category icons mapping
  const categoryIcons = {
    'Medical Supplies': <Pill className="h-5 w-5 text-blue-400" />,
    'Electronics': <CircuitBoard className="h-5 w-5 text-amber-400" />,
    'Food & Beverage': <Utensils className="h-5 w-5 text-emerald-400" />,
    'Raw Materials': <Factory className="h-5 w-5 text-gray-400" />,
    'Consumer Goods': <ShoppingBag className="h-5 w-5 text-purple-400" />
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setForecastData([
        {
          category: 'Medical Supplies',
          currentDemand: 2450,
          forecastedDemand: 2890,
          growth: 18,
          confidence: 94,
          timeline: 'Next 30 days',
          lastMonthDemand: 2200,
          units: 'units',
          recommendation: 'Increase stock by 20%',
          keyDrivers: ['Seasonal flu outbreak', 'Hospital restocking']
        },
        {
          category: 'Electronics',
          currentDemand: 1680,
          forecastedDemand: 1520,
          growth: -9.5,
          confidence: 87,
          timeline: 'Next 30 days',
          lastMonthDemand: 1850,
          units: 'units',
          recommendation: 'Reduce inventory by 10%',
          keyDrivers: ['Post-holiday slowdown', 'New model releases']
        },
        {
          category: 'Food & Beverage',
          currentDemand: 3200,
          forecastedDemand: 3850,
          growth: 20.3,
          confidence: 91,
          timeline: 'Next 30 days',
          lastMonthDemand: 2950,
          units: 'units',
          recommendation: 'Increase stock by 25%',
          keyDrivers: ['Festival season', 'Tourism increase']
        },
        {
          category: 'Raw Materials',
          currentDemand: 890,
          forecastedDemand: 950,
          growth: 6.7,
          confidence: 82,
          timeline: 'Next 30 days',
          lastMonthDemand: 850,
          units: 'tons',
          recommendation: 'Maintain current levels',
          keyDrivers: ['Construction boom', 'Export demand']
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

const getCategoryColor = (category) => {
  switch (category) {
    case 'Medical Supplies':
      return 'bg-blue-500/20 text-blue-400';
    case 'Electronics':
      return 'bg-amber-500/20 text-amber-400';
    case 'Food & Beverage':
      return 'bg-emerald-500/20 text-emerald-400';
    case 'Raw Materials':
      return 'bg-gray-500/20 text-gray-400';
    default:
      return 'bg-purple-500/20 text-purple-400';
  }
};

const renderBarChart = (item) => {
  const maxValue = Math.max(
    item.lastMonthDemand,
    item.currentDemand,
    item.forecastedDemand
  );

  const lastMonthPercent = (item.lastMonthDemand / maxValue) * 100;
  const currentPercent = (item.currentDemand / maxValue) * 100;
  const forecastPercent = (item.forecastedDemand / maxValue) * 100;
    return (
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-xs text-gray-400">
          <div className="w-1/3">Last Month</div>
          <div className="w-1/3 text-center">Current</div>
          <div className="w-1/3 text-right">Forecast</div>
        </div>
        
        <div className="flex items-end h-24 gap-2">
          {/* Last Month */}
          <div className="flex flex-col items-center w-1/3 h-full">
            <div 
              className="w-3/4 bg-gradient-to-t from-blue-900 to-blue-700 rounded-t-md"
              style={{ height: `${lastMonthPercent}%` }}
            />
            <div className="text-xs mt-1 text-blue-300">{item.lastMonthDemand}</div>
          </div>
          
          {/* Current */}
          <div className="flex flex-col items-center w-1/3 h-full">
            <div 
              className="w-3/4 bg-gradient-to-t from-amber-900 to-amber-700 rounded-t-md"
              style={{ height: `${currentPercent}%` }}
            />
            <div className="text-xs mt-1 text-amber-300">{item.currentDemand}</div>
          </div>
          
          {/* Forecast */}
          <div className="flex flex-col items-center w-1/3 h-full">
            <div 
              className="w-3/4 bg-gradient-to-t from-emerald-900 to-emerald-700 rounded-t-md"
              style={{ height: `${forecastPercent}%` }}
            />
            <div className="text-xs mt-1 text-emerald-300">{item.forecastedDemand}</div>
          </div>
        </div>
        
        <div className="flex text-xs text-gray-400 mt-2">
          <div className="w-1/3 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
            Last Month
          </div>
          <div className="w-1/3 flex items-center justify-center">
            <div className="w-2 h-2 bg-amber-500 rounded-full mr-1"></div>
            Current
          </div>
          <div className="w-1/3 flex items-center justify-end">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></div>
            Forecast
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Demand Forecasting</h2>
            <p className="text-blue-400 mt-1">AI-powered demand predictions and trend analysis</p>
          </div>
          <div className="h-10 w-40 bg-blue-800/30 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((_, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6 animate-pulse"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-8 w-40 bg-blue-800/30 rounded"></div>
                <div className="h-6 w-16 bg-blue-800/30 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-32 bg-blue-800/30 rounded"></div>
                    <div className="h-4 w-20 bg-blue-800/30 rounded"></div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <div className="w-full h-2 bg-blue-800/30 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Demand Forecasting</h2>
          <p className="text-blue-400 mt-1">AI-powered demand predictions and trend analysis</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex border border-blue-700/50 rounded-lg bg-blue-900/20">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm ${
                  timeRange === range 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-300 hover:bg-blue-800/30'
                } rounded-md`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg transition-all">
            <Brain className="h-4 w-4" />
            <span>Generate Forecast</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {forecastData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(item.category)}`}>
                  {categoryIcons[item.category] || <Box className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.category}</h3>
                  <div className="text-xs text-blue-400">{item.units}</div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.growth > 0 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {item.growth > 0 ? (
                  <span className="flex items-center">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    {item.growth}%
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    {Math.abs(item.growth)}%
                  </span>
                )}
              </div>
            </div>

            {renderBarChart(item)}

            <div className="mt-6">
              <div className="w-full bg-blue-800/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: `${item.confidence}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-blue-400 mt-1">
                <span>AI Confidence Score</span>
                <span className="font-medium">{item.confidence}%</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-700/30">
              <h4 className="text-sm font-semibold text-blue-300 mb-2">Recommendation</h4>
              <div className="px-3 py-2 bg-blue-800/20 rounded-lg border border-blue-700/30">
                <p className="text-white">{item.recommendation}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="h-6 w-6 text-amber-400" />
          <h3 className="text-xl font-bold text-white">AI Insights & Recommendations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="text-blue-300 font-medium">Key Demand Drivers</h4>
            <ul className="space-y-3">
              {forecastData.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {categoryIcons[item.category] || <Box className="h-4 w-4" />}
                  </div>
                  <div className="ml-3">
                    <span className="text-white font-medium">{item.category}:</span>
                    <ul className="list-disc list-inside text-blue-300 text-sm mt-1">
                      {item.keyDrivers.map((driver, i) => (
                        <li key={i}>{driver}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-blue-300 font-medium">Action Plan</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <ArrowUp className="h-3 w-3 text-emerald-400" />
                </div>
                <p className="ml-3">Increase medical inventory allocation by 20% for Nairobi region</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 bg-rose-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <ArrowDown className="h-3 w-3 text-rose-400" />
                </div>
                <p className="ml-3">Reduce electronics stock in Mombasa warehouses by 15%</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <Target className="h-3 w-3 text-blue-400" />
                </div>
                <p className="ml-3">Prioritize food distribution to Western Kenya regions</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 bg-amber-500/20 rounded-full flex items-center justify-center mt-0.5">
                  <Brain className="h-3 w-3 text-amber-400" />
                </div>
                <p className="ml-3">Run promotional campaign for electronics in Q4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandForecasting;