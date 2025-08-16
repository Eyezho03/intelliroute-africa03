import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Route,
  MapPin,
  Truck,
  Clock,
  Zap,
  TrendingDown,
  BarChart3,
  Settings,
  RefreshCw,
  Navigation,
  Fuel,
  DollarSign
} from 'lucide-react';

const RouteOptimizer = () => {
  const [routes, setRoutes] = useState([]);
  const [optimizing, setOptimizing] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  const mockRoutes = [
    {
      id: 1,
      name: 'Lagos to Accra Route',
      origin: 'Lagos, Nigeria',
      destination: 'Accra, Ghana',
      distance: '342 km',
      duration: '4h 30m',
      fuelCost: '$120',
      savings: '15%',
      status: 'optimized',
      waypoints: 5
    },
    {
      id: 2,
      name: 'Nairobi to Mombasa Route',
      origin: 'Nairobi, Kenya',
      destination: 'Mombasa, Kenya',
      distance: '485 km',
      duration: '6h 15m',
      fuelCost: '$85',
      savings: '22%',
      status: 'pending',
      waypoints: 3
    },
    {
      id: 3,
      name: 'Cape Town Distribution',
      origin: 'Cape Town, South Africa',
      destination: 'Multiple Stops',
      distance: '267 km',
      duration: '8h 45m',
      fuelCost: '$95',
      savings: '18%',
      status: 'optimized',
      waypoints: 12
    }
  ];

  useEffect(() => {
    setRoutes(mockRoutes);
  }, []);

  const optimizeRoute = (routeId) => {
    setOptimizing(true);
    setTimeout(() => {
      setRoutes(prev => prev.map(route => 
        route.id === routeId 
          ? { ...route, status: 'optimized', savings: `${Math.floor(Math.random() * 10 + 15)}%` }
          : route
      ));
      setOptimizing(false);
    }, 2000);
  };

  const optimizeAllRoutes = () => {
    setOptimizing(true);
    setTimeout(() => {
      setRoutes(prev => prev.map(route => ({
        ...route,
        status: 'optimized',
        savings: `${Math.floor(Math.random() * 10 + 15)}%`
      })));
      setOptimizing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Route className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Route Optimizer</h1>
                <p className="text-gray-600">AI-Powered Route Planning & Optimization</p>
              </div>
            </div>
            <button
              onClick={optimizeAllRoutes}
              disabled={optimizing}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {optimizing ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Zap className="w-5 h-5" />
              )}
              {optimizing ? 'Optimizing...' : 'Optimize All Routes'}
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Navigation className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Routes</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">18%</span>
            </div>
            <h3 className="text-gray-600 font-medium">Avg. Cost Savings</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">2.4h</span>
            </div>
            <h3 className="text-gray-600 font-medium">Time Saved</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Fuel className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">$2,340</span>
            </div>
            <h3 className="text-gray-600 font-medium">Fuel Savings</h3>
          </div>
        </motion.div>

        {/* Routes List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Current Routes</h2>
            <p className="text-gray-600">Manage and optimize your delivery routes</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {routes.map((route, index) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        route.status === 'optimized' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        <Route className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                        <p className="text-gray-600">
                          {route.origin} → {route.destination}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        route.status === 'optimized'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {route.status === 'optimized' ? 'Optimized' : 'Pending'}
                      </span>
                      {route.status !== 'optimized' && (
                        <button
                          onClick={() => optimizeRoute(route.id)}
                          disabled={optimizing}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          <Zap className="w-4 h-4" />
                          Optimize
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-6 gap-4">
                    <div className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="font-semibold">{route.distance}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold">{route.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Fuel Cost</p>
                        <p className="font-semibold">{route.fuelCost}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Savings</p>
                        <p className="font-semibold text-green-600">{route.savings}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Waypoints</p>
                        <p className="font-semibold">{route.waypoints}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                        Configure
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Insights Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">AI Insights</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-lg font-semibold mb-1">Traffic Optimization</p>
              <p className="text-purple-100">Routes adjusted for current traffic patterns, saving 2.4 hours daily</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Fuel Efficiency</p>
              <p className="text-purple-100">AI suggests alternative routes reducing fuel consumption by 18%</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Weather Impact</p>
              <p className="text-purple-100">Weather-aware routing prevents delays and ensures on-time delivery</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RouteOptimizer;
