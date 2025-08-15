import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  MapPin,
  Cloud,
  AlertTriangle,
  Navigation,
  Clock,
  TrendingUp,
  Zap,
  RefreshCw,
  Satellite,
  Radio,
  Globe,
  Eye,
  Settings,
  Filter,
  Calendar,
  BarChart3,
  WindIcon as Wind,
  Thermometer,
  Droplets,
  Sun,
  CloudRain,
  AlertCircle,
  CheckCircle,
  XCircle,
  Timer,
  Truck,
  Flag
} from 'lucide-react';
import TrafficMonitor from '../components/TrafficMonitor';
import WeatherRouting from '../components/WeatherRouting';
import BorderCrossingPredictor from '../components/BorderCrossingPredictor';
import LiveDataStream from '../components/LiveDataStream';

const RealTimeIntelligenceHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [liveDataEnabled, setLiveDataEnabled] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  // Real-time intelligence metrics
  const [intelligenceMetrics, setIntelligenceMetrics] = useState({
    activeRoutes: 247,
    trafficIncidents: 18,
    weatherAlerts: 5,
    borderDelays: 12,
    avgSpeedReduction: 15.3,
    routesOptimized: 156,
    timesSaved: 4.8,
    fuelSaved: 12.5
  });

  const [realtimeAlerts, setRealtimeAlerts] = useState([
    {
      id: 1,
      type: 'traffic',
      severity: 'high',
      title: 'Major Traffic Jam - Lagos-Ibadan Expressway',
      description: 'Heavy congestion causing 45-minute delays. Alternative routes available.',
      location: 'Lagos, Nigeria',
      impact: '12 active shipments affected',
      time: '3 minutes ago',
      suggestion: 'Reroute via A1 highway'
    },
    {
      id: 2,
      type: 'weather',
      severity: 'medium',
      title: 'Heavy Rainfall - Nairobi Region',
      description: 'Moderate to heavy rainfall expected for next 4 hours.',
      location: 'Nairobi, Kenya',
      impact: '8 routes under weather watch',
      time: '8 minutes ago',
      suggestion: 'Delay departures or use covered routes'
    },
    {
      id: 3,
      type: 'border',
      severity: 'low',
      title: 'Extended Processing Times',
      description: 'Nigeria-Benin border experiencing longer than usual processing times.',
      location: 'Seme Border Crossing',
      impact: '3 shipments in queue',
      time: '12 minutes ago',
      suggestion: 'Allow extra 2 hours for crossing'
    },
    {
      id: 4,
      type: 'traffic',
      severity: 'medium',
      title: 'Road Construction - Cairo Ring Road',
      description: 'Lane closures on Ring Road affecting northbound traffic.',
      location: 'Cairo, Egypt',
      impact: '5 routes affected',
      time: '18 minutes ago',
      suggestion: 'Use inner city routes'
    }
  ]);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    if (!liveDataEnabled) return;

    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Update metrics with slight variations
      setIntelligenceMetrics(prev => ({
        ...prev,
        activeRoutes: prev.activeRoutes + Math.floor(Math.random() * 10 - 5),
        trafficIncidents: Math.max(0, prev.trafficIncidents + Math.floor(Math.random() * 6 - 3)),
        avgSpeedReduction: Math.max(0, prev.avgSpeedReduction + (Math.random() * 4 - 2)),
        routesOptimized: prev.routesOptimized + Math.floor(Math.random() * 5)
      }));
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [liveDataEnabled]);

  const tabItems = [
    { id: 'overview', label: 'Intelligence Overview', icon: Activity },
    { id: 'traffic', label: 'Traffic Monitor', icon: Navigation },
    { id: 'weather', label: 'Weather Routing', icon: Cloud },
    { id: 'borders', label: 'Border Intelligence', icon: Flag },
    { id: 'datastream', label: 'Live Data Stream', icon: Radio }
  ];

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-red-500/30 bg-red-900/20 text-red-200';
      case 'medium':
        return 'border-yellow-500/30 bg-yellow-900/20 text-yellow-200';
      case 'low':
        return 'border-blue-500/30 bg-blue-900/20 text-blue-200';
      default:
        return 'border-gray-500/30 bg-gray-900/20 text-gray-200';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'traffic':
        return Navigation;
      case 'weather':
        return Cloud;
      case 'border':
        return Flag;
      default:
        return AlertTriangle;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'traffic':
        return <TrafficMonitor />;
      case 'weather':
        return <WeatherRouting />;
      case 'borders':
        return <BorderCrossingPredictor />;
      case 'datastream':
        return <LiveDataStream />;
      default:
        return (
          <div className="space-y-6">
            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Navigation className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{intelligenceMetrics.activeRoutes}</div>
                    <div className="text-gray-400 text-sm">Active Routes</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live Monitoring</span>
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
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{intelligenceMetrics.trafficIncidents}</div>
                    <div className="text-gray-400 text-sm">Traffic Incidents</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm">+{intelligenceMetrics.avgSpeedReduction}% delay avg</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Cloud className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{intelligenceMetrics.weatherAlerts}</div>
                    <div className="text-gray-400 text-sm">Weather Alerts</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 text-sm">24/7 Monitoring</span>
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
                    <Flag className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{intelligenceMetrics.borderDelays}</div>
                    <div className="text-gray-400 text-sm">Border Delays</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-400 text-sm">ML Predictions</span>
                </div>
              </motion.div>
            </div>

            {/* Real-time Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-yellow-400" />
                  Real-Time Intelligence Alerts
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Live Updates</span>
                  <span className="text-gray-500 text-xs ml-2">
                    Last update: {lastUpdate.toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {realtimeAlerts.map((alert, index) => {
                  const AlertIcon = getAlertIcon(alert.type);
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`p-4 rounded-lg border ${getAlertColor(alert.severity)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <AlertIcon className="h-6 w-6 mt-0.5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{alert.title}</h4>
                            <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                            <div className="flex items-center space-x-4 text-xs opacity-70">
                              <span className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{alert.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Truck className="h-3 w-3" />
                                <span>{alert.impact}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{alert.time}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            alert.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                            alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-blue-500/20 text-blue-300'
                          }`}>
                            {alert.severity}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-opacity-20 border-current">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">💡 Suggestion: {alert.suggestion}</span>
                          <button 
                            onClick={() => console.log(`Viewing details for alert: ${alert.title}`)}
                            className="text-xs hover:underline opacity-80"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Routes Optimized</h4>
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-white">{intelligenceMetrics.routesOptimized}</div>
                  <div className="text-sm text-gray-400">Today</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-green-400 text-sm">+23% vs yesterday</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Time Saved</h4>
                  <Timer className="h-5 w-5 text-blue-400" />
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-white">{intelligenceMetrics.timesSaved}h</div>
                  <div className="text-sm text-gray-400">Per shipment average</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-blue-400 text-sm">AI-powered optimization</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Fuel Saved</h4>
                  <Droplets className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-white">{intelligenceMetrics.fuelSaved}%</div>
                  <div className="text-sm text-gray-400">Reduction achieved</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-emerald-400 text-sm">Smart routing impact</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Initializing Real-Time Intelligence Hub...</p>
          <p className="text-gray-500 text-sm mt-2">Connecting to traffic, weather & border APIs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Satellite className="h-8 w-8 text-emerald-400" />
                <h1 className="text-2xl font-bold text-white">Real-Time Intelligence Hub</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLiveDataEnabled(!liveDataEnabled)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    liveDataEnabled 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                      : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${liveDataEnabled ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
                  <span>{liveDataEnabled ? 'Live' : 'Paused'}</span>
                </button>
              </div>
              <button 
                onClick={() => console.log('Refreshing intelligence data')}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button 
                onClick={() => console.log('Opening intelligence settings')}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-1 bg-gray-800/30 p-1 rounded-lg border border-gray-700 mb-6 overflow-x-auto"
        >
          {tabItems.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pb-8"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default RealTimeIntelligenceHub;
