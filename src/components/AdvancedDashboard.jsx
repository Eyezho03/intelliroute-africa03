import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  TrendingUp, MapPin, Truck, Clock, DollarSign, AlertTriangle,
  Users, Package, Route, Zap, Activity, Eye, RefreshCw, Download,
  Globe, Wifi, Battery, Gauge, Target, Award, BarChart3, PieChart
} from 'lucide-react';
import apiService from '../services/api';

const AdvancedDashboard = () => {
  const [realTimeData, setRealTimeData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');
  const [isLoading, setIsLoading] = useState(true);
  const [liveStats, setLiveStats] = useState({
    activeVehicles: 1247,
    dailyDeliveries: 18432,
    savedCosts: 3250000,
    efficiency: 94.2
  });

  // Kenyan focused metrics
  const [kenyanMetrics, setKenyanMetrics] = useState({
    nairobiMombasaTime: 8.2,
    kisumaNairobiLoad: 87,
    borderCrossings: 156,
    weatherDelay: 2.3
  });

  // Real-time updates
  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const [vehicleStats, routeInsights] = await Promise.all([
          apiService.getLiveVehicleStats(),
          apiService.getKenyanRouteInsights()
        ]);
        
        setLiveStats(vehicleStats);
        setRealTimeData(routeInsights);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching real-time data:', error);
        setIsLoading(false);
      }
    };

    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Live data simulation
  useEffect(() => {
    const liveUpdate = setInterval(() => {
      setLiveStats(prev => ({
        activeVehicles: prev.activeVehicles + Math.floor(Math.random() * 10 - 5),
        dailyDeliveries: prev.dailyDeliveries + Math.floor(Math.random() * 50),
        savedCosts: prev.savedCosts + Math.floor(Math.random() * 10000),
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2))
      }));

      setKenyanMetrics(prev => ({
        nairobiMombasaTime: Math.max(6, Math.min(12, prev.nairobiMombasaTime + (Math.random() - 0.5) * 0.5)),
        kisumaNairobiLoad: Math.max(60, Math.min(100, prev.kisumaNairobiLoad + Math.floor(Math.random() * 6 - 3))),
        borderCrossings: prev.borderCrossings + Math.floor(Math.random() * 5),
        weatherDelay: Math.max(0, Math.min(8, prev.weatherDelay + (Math.random() - 0.5) * 0.3))
      }));
    }, 5000);

    return () => clearInterval(liveUpdate);
  }, []);

  // Chart configurations
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Delivery Success Rate (%)',
        data: [89, 92, 88, 94, 91, 96, 94.2],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Cost Efficiency (%)',
        data: [85, 87, 86, 90, 88, 92, 91],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const kenyanRoutesData = {
    labels: ['Nairobi-Mombasa', 'Nairobi-Kisumu', 'Mombasa-Kampala', 'Nakuru-Eldoret', 'Thika-Nyeri'],
    datasets: [
      {
        label: 'Average Transit Time (hrs)',
        data: [kenyanMetrics.nairobiMombasaTime, 5.2, 18.3, 3.7, 4.1],
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
        borderWidth: 0
      }
    ]
  };

  const efficiencyRadarData = {
    labels: ['Route Optimization', 'Fuel Management', 'Time Efficiency', 'Cost Control', 'Customer Satisfaction', 'Vehicle Utilization'],
    datasets: [
      {
        label: 'Current Performance',
        data: [94, 88, 92, 85, 96, 87],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10b981',
        borderWidth: 2,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#10b981'
      },
      {
        label: 'Industry Average',
        data: [78, 75, 80, 70, 82, 74],
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        borderColor: '#9ca3af',
        borderWidth: 2,
        pointBackgroundColor: '#9ca3af',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#9ca3af'
      }
    ]
  };

  const LiveMetricCard = ({ title, value, unit, icon: Icon, trend, color = 'emerald' }) => (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-${color}-500/50 transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <motion.div 
            key={value}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-3xl font-bold text-${color}-400 mt-2 flex items-end gap-2`}
          >
            {typeof value === 'number' && value > 1000 ? value.toLocaleString() : value}
            <span className="text-base text-gray-400">{unit}</span>
          </motion.div>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp size={14} className={trend < 0 ? 'rotate-180' : ''} />
              <span className="ml-1">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className={`p-4 bg-${color}-900/30 rounded-full`}>
          <Icon className={`w-8 h-8 text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

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
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Activity className="text-emerald-400" size={32} />
            </motion.div>
            <span className="text-emerald-400">IntelliRoute</span>
            <span className="text-gray-300">Advanced Analytics</span>
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Live Data Stream Active
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wifi size={14} />
              Connected to {liveStats.activeVehicles} vehicles
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition text-sm">
            <Download size={16} />
            Export
          </button>
          
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition text-sm">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </motion.header>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetricCard
          title="Active Vehicles"
          value={liveStats.activeVehicles}
          unit="vehicles"
          icon={Truck}
          trend={3.2}
          color="emerald"
        />
        
        <LiveMetricCard
          title="Today's Deliveries"
          value={liveStats.dailyDeliveries}
          unit="packages"
          icon={Package}
          trend={12.5}
          color="blue"
        />
        
        <LiveMetricCard
          title="Cost Savings"
          value={`KES ${Math.floor(liveStats.savedCosts / 1000)}K`}
          unit="this month"
          icon={DollarSign}
          trend={8.7}
          color="yellow"
        />
        
        <LiveMetricCard
          title="Route Efficiency"
          value={liveStats.efficiency.toFixed(1)}
          unit="%"
          icon={Target}
          trend={2.1}
          color="purple"
        />
      </div>

      {/* Kenyan-Specific Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Route className="text-orange-400" size={24} />
            <div>
              <h3 className="font-bold text-orange-400">Nairobi-Mombasa</h3>
              <p className="text-sm text-gray-400">Average Transit</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-200">
            {kenyanMetrics.nairobiMombasaTime.toFixed(1)} hrs
          </div>
          <div className="text-sm text-gray-400 mt-1">
            15% faster than industry avg
          </div>
        </motion.div>

        <motion.div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gauge className="text-cyan-400" size={24} />
            <div>
              <h3 className="font-bold text-cyan-400">Load Optimization</h3>
              <p className="text-sm text-gray-400">Kisumu-Nairobi Route</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-200">
            {kenyanMetrics.kisumaNairobiLoad}%
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-cyan-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${kenyanMetrics.kisumaNairobiLoad}%` }}
            />
          </div>
        </motion.div>

        <motion.div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-indigo-400" size={24} />
            <div>
              <h3 className="font-bold text-indigo-400">Border Crossings</h3>
              <p className="text-sm text-gray-400">Today</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-200">
            {kenyanMetrics.borderCrossings}
          </div>
          <div className="text-sm text-green-400 mt-1 flex items-center gap-1">
            <TrendingUp size={12} />
            23% efficiency gain
          </div>
        </motion.div>

        <motion.div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-400" size={24} />
            <div>
              <h3 className="font-bold text-red-400">Weather Impact</h3>
              <p className="text-sm text-gray-400">Avg Delay</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-200">
            {kenyanMetrics.weatherDelay.toFixed(1)} hrs
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Rainy season factor
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <TrendingUp size={20} />
              Performance Trends
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span>Success Rate</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full ml-4"></div>
              <span>Cost Efficiency</span>
            </div>
          </div>
          <Line 
            data={performanceData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleColor: '#10b981',
                  bodyColor: '#fff'
                }
              },
              scales: {
                y: {
                  beginAtZero: false,
                  min: 80,
                  max: 100,
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

        {/* Kenyan Routes Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6"
        >
          <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
            <MapPin size={20} />
            Top Kenyan Routes
          </h3>
          <Doughnut 
            data={kenyanRoutesData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { 
                    color: '#9ca3af',
                    usePointStyle: true,
                    pointStyle: 'circle'
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

      {/* Performance Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8"
      >
        <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
          <Award size={20} />
          Performance vs Industry Benchmarks
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="h-96">
            <Radar 
              data={efficiencyRadarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#9ca3af' }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#10b981',
                    bodyColor: '#fff'
                  }
                },
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: '#9ca3af' },
                    ticks: { display: false }
                  }
                }
              }}
            />
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">94.2%</div>
              <div className="text-gray-400">Overall Performance Score</div>
              <div className="text-sm text-green-400 mt-1">↗ 16% above industry average</div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { metric: 'Route Optimization', score: 94, industry: 78 },
                { metric: 'Customer Satisfaction', score: 96, industry: 82 },
                { metric: 'Time Efficiency', score: 92, industry: 80 },
                { metric: 'Vehicle Utilization', score: 87, industry: 74 }
              ].map(item => (
                <div key={item.metric} className="bg-gray-700/50 rounded-lg p-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{item.metric}</span>
                    <span className="text-emerald-400 font-bold">{item.score}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div 
                      className="bg-emerald-400 h-2 rounded-full"
                      style={{ width: `${(item.score / 100) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Industry avg: {item.industry}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Real-time Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800 rounded-xl border border-gray-700 p-6"
      >
        <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
          <Eye size={20} />
          Real-time Logistics Intelligence
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Route Optimized</span>
            </div>
            <div className="text-sm text-gray-300">
              Nairobi-Mombasa route updated - avoiding A109 congestion
            </div>
            <div className="text-xs text-green-400 mt-1">2 minutes ago</div>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 font-medium">Border Clearance</span>
            </div>
            <div className="text-sm text-gray-300">
              Namanga border - 15 vehicles cleared successfully
            </div>
            <div className="text-xs text-blue-400 mt-1">5 minutes ago</div>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-yellow-400 font-medium">Weather Alert</span>
            </div>
            <div className="text-sm text-gray-300">
              Rain expected on Nakuru-Eldoret route in 2 hours
            </div>
            <div className="text-xs text-yellow-400 mt-1">8 minutes ago</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedDashboard;
