import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Navigation,
  MapPin,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  Route,
  Car,
  Truck,
  RefreshCw,
  Eye,
  Filter,
  Search,
  BarChart3,
  Activity,
  Timer,
  Gauge
} from 'lucide-react';

const TrafficMonitor = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [liveUpdates, setLiveUpdates] = useState(true);

  useEffect(() => {
    // Simulate live traffic data for major African routes
    setTrafficData([
      {
        id: 1,
        routeName: 'Lagos-Ibadan Expressway',
        country: 'Nigeria',
        distance: '127 km',
        currentSpeed: 35,
        normalSpeed: 80,
        congestionLevel: 'high',
        incidents: 3,
        estimatedDelay: '45 min',
        alternativeRoutes: 2,
        trafficFlow: 'heavy',
        coordinates: { lat: 6.5244, lng: 3.3792 },
        segments: [
          { name: 'Lagos Toll Plaza', speed: 25, status: 'congested' },
          { name: 'Berger Area', speed: 40, status: 'moderate' },
          { name: 'Kara Bridge', speed: 30, status: 'congested' },
          { name: 'Ibadan Interchange', speed: 60, status: 'clear' }
        ]
      },
      {
        id: 2,
        routeName: 'Nairobi-Mombasa Highway (A109)',
        country: 'Kenya',
        distance: '480 km',
        currentSpeed: 65,
        normalSpeed: 80,
        congestionLevel: 'moderate',
        incidents: 1,
        estimatedDelay: '15 min',
        alternativeRoutes: 1,
        trafficFlow: 'moderate',
        coordinates: { lat: -1.2921, lng: 36.8219 },
        segments: [
          { name: 'Nairobi CBD', speed: 45, status: 'moderate' },
          { name: 'Machakos Junction', speed: 70, status: 'clear' },
          { name: 'Mtito Andei', speed: 75, status: 'clear' },
          { name: 'Mombasa Approach', speed: 55, status: 'moderate' }
        ]
      },
      {
        id: 3,
        routeName: 'Cairo Ring Road',
        country: 'Egypt',
        distance: '89 km',
        currentSpeed: 45,
        normalSpeed: 70,
        congestionLevel: 'moderate',
        incidents: 2,
        estimatedDelay: '25 min',
        alternativeRoutes: 3,
        trafficFlow: 'moderate',
        coordinates: { lat: 30.0444, lng: 31.2357 },
        segments: [
          { name: 'Heliopolis Section', speed: 35, status: 'congested' },
          { name: 'New Cairo Exit', speed: 50, status: 'moderate' },
          { name: 'October Bridge', speed: 40, status: 'moderate' },
          { name: 'Airport Road', speed: 60, status: 'clear' }
        ]
      },
      {
        id: 4,
        routeName: 'Cape Town-Johannesburg (N1)',
        country: 'South Africa',
        distance: '1,400 km',
        currentSpeed: 75,
        normalSpeed: 90,
        congestionLevel: 'low',
        incidents: 0,
        estimatedDelay: '0 min',
        alternativeRoutes: 1,
        trafficFlow: 'light',
        coordinates: { lat: -33.9249, lng: 18.4241 },
        segments: [
          { name: 'Cape Town N1 Start', speed: 80, status: 'clear' },
          { name: 'Paarl Section', speed: 85, status: 'clear' },
          { name: 'Bloemfontein Area', speed: 70, status: 'clear' },
          { name: 'Johannesburg Approach', speed: 65, status: 'moderate' }
        ]
      },
      {
        id: 5,
        routeName: 'Accra-Kumasi Highway',
        country: 'Ghana',
        distance: '270 km',
        currentSpeed: 55,
        normalSpeed: 70,
        congestionLevel: 'moderate',
        incidents: 1,
        estimatedDelay: '20 min',
        alternativeRoutes: 2,
        trafficFlow: 'moderate',
        coordinates: { lat: 5.6037, lng: -0.1870 },
        segments: [
          { name: 'Accra Bypass', speed: 50, status: 'moderate' },
          { name: 'Nsawam Area', speed: 60, status: 'moderate' },
          { name: 'Konongo Junction', speed: 55, status: 'moderate' },
          { name: 'Kumasi Entry', speed: 45, status: 'congested' }
        ]
      }
    ]);
  }, []);

  // Simulate live updates
  useEffect(() => {
    if (!liveUpdates) return;

    const interval = setInterval(() => {
      setTrafficData(prev => prev.map(route => ({
        ...route,
        currentSpeed: Math.max(20, Math.min(90, route.currentSpeed + (Math.random() * 10 - 5))),
        incidents: Math.max(0, route.incidents + Math.floor(Math.random() * 3 - 1)),
        congestionLevel: route.currentSpeed < 40 ? 'high' : route.currentSpeed < 60 ? 'moderate' : 'low'
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, [liveUpdates]);

  const getCongestionColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'moderate':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getSegmentStatus = (status) => {
    switch (status) {
      case 'congested':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-yellow-500';
      case 'clear':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const trafficSummary = {
    totalRoutes: trafficData.length,
    heavyCongestion: trafficData.filter(r => r.congestionLevel === 'high').length,
    activeIncidents: trafficData.reduce((sum, r) => sum + r.incidents, 0),
    avgDelay: Math.round(trafficData.reduce((sum, r) => sum + parseInt(r.estimatedDelay), 0) / trafficData.length)
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Traffic Monitor</h2>
          <p className="text-gray-400 mt-1">Real-time traffic intelligence across major African highways</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setLiveUpdates(!liveUpdates)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              liveUpdates 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${liveUpdates ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
            <span>Live Traffic</span>
          </button>
          <button 
            onClick={() => console.log('Optimizing all routes')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            <Route className="h-4 w-4" />
            <span>Optimize All</span>
          </button>
        </div>
      </div>

      {/* Traffic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Navigation className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{trafficSummary.totalRoutes}</h3>
            <p className="text-gray-400 text-sm">Monitored Routes</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{trafficSummary.heavyCongestion}</h3>
            <p className="text-gray-400 text-sm">Heavy Congestion</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Activity className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{trafficSummary.activeIncidents}</h3>
            <p className="text-gray-400 text-sm">Active Incidents</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Timer className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{trafficSummary.avgDelay}min</h3>
            <p className="text-gray-400 text-sm">Average Delay</p>
          </div>
        </motion.div>
      </div>

      {/* Traffic Routes Grid */}
      <div className="grid grid-cols-1 gap-6">
        {trafficData.map((route, index) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-emerald-500/30 transition-all cursor-pointer"
            onClick={() => setSelectedRoute(selectedRoute?.id === route.id ? null : route)}
          >
            {/* Route Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                  <Navigation className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{route.routeName}</h3>
                  <p className="text-gray-400 flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{route.country} • {route.distance}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm border ${getCongestionColor(route.congestionLevel)}`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="capitalize">{route.congestionLevel} Traffic</span>
                </div>
              </div>
            </div>

            {/* Traffic Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-3">
                <Gauge className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-white text-sm font-medium">
                    {Math.round(route.currentSpeed)} km/h
                  </div>
                  <div className="text-gray-400 text-xs">
                    Normal: {route.normalSpeed} km/h
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div>
                  <div className="text-white text-sm font-medium">
                    {route.incidents} incidents
                  </div>
                  <div className="text-gray-400 text-xs">Active issues</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-white text-sm font-medium">
                    +{route.estimatedDelay}
                  </div>
                  <div className="text-gray-400 text-xs">Estimated delay</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Route className="h-5 w-5 text-green-400" />
                <div>
                  <div className="text-white text-sm font-medium">
                    {route.alternativeRoutes} alternatives
                  </div>
                  <div className="text-gray-400 text-xs">Available routes</div>
                </div>
              </div>
            </div>

            {/* Speed Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Traffic Flow</span>
                <span className="text-sm text-white font-medium capitalize">{route.trafficFlow}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full transition-all ${
                    route.currentSpeed < 40 ? 'bg-red-500' :
                    route.currentSpeed < 60 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(route.currentSpeed / route.normalSpeed) * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Expanded Route Segments */}
            {selectedRoute?.id === route.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-700 pt-4 mt-4"
              >
                <h4 className="text-white font-medium mb-4 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-emerald-400" />
                  Route Segments Analysis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {route.segments.map((segment, segmentIndex) => (
                    <div key={segmentIndex} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getSegmentStatus(segment.status)}`}></div>
                        <div>
                          <div className="text-white text-sm font-medium">{segment.name}</div>
                          <div className="text-gray-400 text-xs capitalize">{segment.status}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm font-medium">{segment.speed} km/h</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-4">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => console.log(`Opening live view for ${route.routeName}`)}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-all"
                >
                  <Eye className="h-4 w-4" />
                  <span>Live View</span>
                </button>
                <button 
                  onClick={() => console.log(`Optimizing route: ${route.routeName}`)}
                  className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-all"
                >
                  <Route className="h-4 w-4" />
                  <span>Optimize</span>
                </button>
              </div>
              <div className="text-emerald-400 text-sm">
                🚗 {Math.floor(Math.random() * 50 + 20)} vehicles/min
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* API Integration Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-400" />
            Traffic API Integration Status
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">Google Maps Traffic API</span>
            </div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">TomTom Traffic Flow</span>
            </div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-white">Local Traffic Providers</span>
            </div>
            <span className="text-yellow-400 text-sm">Partial</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrafficMonitor;
