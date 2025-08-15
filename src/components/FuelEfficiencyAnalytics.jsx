import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Fuel,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Truck,
  MapPin,
  Clock,
  Settings,
  Download,
  RefreshCw,
  Zap,
  Activity,
  Navigation,
  Gauge,
  Leaf,
  Route as RouteIcon,
  BatteryCharging,
  Users,
  Package,
  Smartphone
} from 'lucide-react';

const FuelEfficiencyAnalytics = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [fuelData, setFuelData] = useState(null);

  useEffect(() => {
    // Enhanced sample data for African logistics context
    const sampleData = {
      overview: {
        totalConsumption: 12847.5, // liters
        avgEfficiency: 8.2, // km/liter
        fuelCosts: 18650, // USD
        monthlySavings: 2340, // USD saved through optimization
        efficiencyImprovement: 15.3, // % improvement
        targetEfficiency: 9.5, // km/liter target
        carbonReduction: 12.8, // tons CO2 reduced
        vehiclesOptimized: 23 // number of vehicles
      },
      trends: [
        { week: 'W1', consumption: 2980, efficiency: 7.8, cost: 4320 },
        { week: 'W2', consumption: 3120, efficiency: 8.1, cost: 4530 },
        { week: 'W3', consumption: 2750, efficiency: 8.4, cost: 3990 },
        { week: 'W4', consumption: 2890, efficiency: 8.2, cost: 4190 },
        { week: 'W5', consumption: 2650, efficiency: 8.6, cost: 3850 },
        { week: 'W6', consumption: 2457, efficiency: 8.9, cost: 3570 }
      ],
      vehicles: [
        {
          id: 'TRK-001',
          type: 'Heavy Truck',
          model: 'Volvo FH16',
          efficiency: 6.2,
          consumption: 3420,
          distance: 21204,
          cost: 4956,
          fuelType: 'Diesel',
          status: 'optimal',
          lastMaintenance: '2024-07-15',
          alerts: [],
          region: 'East Africa'
        },
        {
          id: 'TRK-002',
          type: 'Medium Truck',
          model: 'Mercedes Actros',
          efficiency: 8.7,
          consumption: 2856,
          distance: 24847,
          cost: 4140,
          fuelType: 'Diesel',
          status: 'good',
          lastMaintenance: '2024-06-28',
          alerts: ['tire_pressure'],
          region: 'West Africa'
        },
        {
          id: 'TRK-003',
          type: 'Light Truck',
          model: 'Isuzu NPR',
          efficiency: 12.1,
          consumption: 1890,
          distance: 22869,
          cost: 2741,
          fuelType: 'Diesel',
          status: 'excellent',
          lastMaintenance: '2024-07-22',
          alerts: [],
          region: 'Southern Africa'
        },
        {
          id: 'VAN-001',
          type: 'Electric Van',
          model: 'Mercedes eVito',
          efficiency: 4.2,
          consumption: 1245,
          distance: 5229,
          cost: 187,
          fuelType: 'Electric',
          status: 'excellent',
          lastMaintenance: '2024-08-01',
          alerts: [],
          region: 'East Africa'
        }
      ],
      routes: [
        {
          id: 'RT-001',
          name: 'Lagos - Abuja',
          distance: 462,
          avgEfficiency: 7.8,
          bestEfficiency: 9.2,
          worstEfficiency: 6.4,
          fuelCost: 890,
          optimizationPotential: 18.5,
          trafficFactor: 0.85,
          weatherFactor: 0.92,
          region: 'West Africa'
        },
        {
          id: 'RT-002', 
          name: 'Nairobi - Mombasa',
          distance: 489,
          avgEfficiency: 8.4,
          bestEfficiency: 10.1,
          worstEfficiency: 7.2,
          fuelCost: 945,
          optimizationPotential: 20.2,
          trafficFactor: 0.78,
          weatherFactor: 0.88,
          region: 'East Africa'
        },
        {
          id: 'RT-003',
          name: 'Cape Town - Johannesburg',
          distance: 1402,
          avgEfficiency: 9.1,
          bestEfficiency: 11.8,
          worstEfficiency: 7.9,
          fuelCost: 2340,
          optimizationPotential: 29.7,
          trafficFactor: 0.82,
          weatherFactor: 0.94,
          region: 'Southern Africa'
        }
      ],
      recommendations: [
        {
          type: 'route_optimization',
          title: 'Optimize Nairobi-Mombasa Route',
          impact: 'KSh 42,000/month savings',
          priority: 'high',
          description: 'Alternative routing via Thika Road can improve efficiency by 15%'
        },
        {
          type: 'maintenance',
          title: 'Service TRK-002 in Lagos',
          impact: '8% efficiency gain',
          priority: 'medium',
          description: 'Tire pressure and air filter replacement needed'
        },
        {
          type: 'driving_behavior',
          title: 'Eco-Driving Training',
          impact: 'KSh 89,000/month savings',
          priority: 'high',
          description: 'Implement training program for 15 drivers'
        },
        {
          type: 'vehicle_upgrade',
          title: 'Electric Fleet Expansion',
          impact: 'KSh 120,000/month savings',
          priority: 'medium',
          description: 'Replace 2 diesel vehicles with electric alternatives'
        }
      ],
      costBreakdown: {
        fuel: 15420,
        maintenance: 2890,
        optimization: -2340,
        efficiency_programs: 890
      },
      regions: [
        { name: 'East Africa', vehicles: 12, efficiency: 8.5 },
        { name: 'West Africa', vehicles: 8, efficiency: 7.2 },
        { name: 'Southern Africa', vehicles: 7, efficiency: 9.1 }
      ]
    };

    setFuelData(sampleData);
  }, [timeframe]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'optimal':
      case 'good': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getRegionColor = (region) => {
    switch (region) {
      case 'East Africa': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'West Africa': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Southern Africa': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (!fuelData) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-gray-400">Loading analytics...</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with regional filter */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Fuel Efficiency Analytics</h2>
          <p className="text-gray-400 mt-1">AI-powered fuel optimization for African logistics</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          >
            <option value="all">All Regions</option>
            {fuelData.regions.map(region => (
              <option key={region.name} value={region.name}>{region.name}</option>
            ))}
          </select>
          
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg text-white transition-colors text-sm">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics - Added carbon reduction */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 col-span-2"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Fuel className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{fuelData.overview.totalConsumption.toLocaleString()}</h3>
            <p className="text-gray-400 text-xs">Liters Consumed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Gauge className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-green-400 flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">+{fuelData.overview.efficiencyImprovement}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{fuelData.overview.avgEfficiency}</h3>
            <p className="text-gray-400 text-xs">km/L Avg</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-red-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">KSh {(fuelData.overview.fuelCosts * 100).toLocaleString()}</h3>
            <p className="text-gray-400 text-xs">Fuel Costs</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <TrendingDown className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">KSh {(fuelData.overview.monthlySavings * 100).toLocaleString()}</h3>
            <p className="text-gray-400 text-xs">Monthly Savings</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <Leaf className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{fuelData.overview.carbonReduction} t</h3>
            <p className="text-gray-400 text-xs">CO₂ Reduced</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{fuelData.overview.vehiclesOptimized}</h3>
            <p className="text-gray-400 text-xs">Vehicles Optimized</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="space-y-4 lg:col-span-2">
          {/* Efficiency Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Activity className="h-5 w-5 text-blue-400 mr-2" />
                Efficiency Trends
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Region:</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getRegionColor(selectedRegion === 'all' ? 'East Africa' : selectedRegion)}`}>
                  {selectedRegion === 'all' ? 'All' : selectedRegion}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {fuelData.trends.map((week, index) => (
                <div key={week.week} className="flex items-center space-x-4">
                  <div className="w-10 text-gray-400 text-xs">{week.week}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm">{week.efficiency} km/L</span>
                      <span className="text-gray-400 text-xs">KSh {(week.cost * 100).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(week.efficiency / 10) * 100}%` }}
                        transition={{ delay: index * 0.05 }}
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {week.consumption}L consumed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vehicle Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Truck className="h-5 w-5 text-amber-400 mr-2" />
                Fleet Performance
              </h3>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Vehicles</option>
                {fuelData.vehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>{vehicle.id}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fuelData.vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium text-sm">{vehicle.id}</h4>
                      <p className="text-gray-400 text-xs">{vehicle.model}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-0.5 rounded-full text-xs border ${getStatusColor(vehicle.status)}`}>
                        {vehicle.status}
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-xs border ${getRegionColor(vehicle.region)}`}>
                        {vehicle.region.split(' ')[0]}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-2">
                    <div>
                      <p className="text-gray-400 text-xxs mb-0.5">Efficiency</p>
                      <p className="text-white font-bold text-sm">
                        {vehicle.efficiency} {vehicle.fuelType === 'Electric' ? 'km/kWh' : 'km/L'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xxs mb-0.5">Distance</p>
                      <p className="text-white font-bold text-sm">{(vehicle.distance/1000).toFixed(0)}k km</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xxs mb-0.5">Cost</p>
                      <p className="text-white font-bold text-sm">KSh {(vehicle.cost * 100).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xxs mb-0.5">Type</p>
                      <p className="text-white font-bold text-sm">{vehicle.fuelType}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xxs text-gray-400">
                    <span>Last service: {vehicle.lastMaintenance}</span>
                    {vehicle.alerts.length > 0 && (
                      <span className="text-yellow-400 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {vehicle.alerts.length} alert{vehicle.alerts.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Regional Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Globe className="h-5 w-5 text-purple-400 mr-2" />
                Regional Performance
              </h3>
            </div>

            <div className="space-y-4">
              {fuelData.regions.map((region, index) => (
                <div key={region.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{region.name}</span>
                    <span className="text-white font-bold text-sm">{region.efficiency} km/L</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(region.efficiency / 12) * 100}%` }}
                      transition={{ delay: index * 0.1 }}
                      className={`h-2 rounded-full ${
                        region.name === 'East Africa' ? 'bg-blue-500' :
                        region.name === 'West Africa' ? 'bg-purple-500' : 'bg-green-500'
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{region.vehicles} vehicles</span>
                    <span>{(region.efficiency / 12 * 100).toFixed(0)}% of target</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Route Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white flex items-center">
                <RouteIcon className="h-5 w-5 text-emerald-400 mr-2" />
                Top Routes
              </h3>
            </div>

            <div className="space-y-4">
              {fuelData.routes.map((route, index) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700/30 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium text-sm">{route.name}</h4>
                      <p className="text-gray-400 text-xs">{route.distance} km • {route.region}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold text-sm">{route.optimizationPotential}%</p>
                      <p className="text-gray-400 text-xxs">Potential</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div>
                      <p className="text-gray-400 text-xxs mb-0.5">Avg</p>
                      <p className="text-white font-bold text-sm">{route.avgEfficiency} km/L</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xxs mb-0.5">Best</p>
                      <p className="text-green-400 font-bold text-sm">{route.bestEfficiency} km/L</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xxs mb-0.5">Cost</p>
                      <p className="text-white font-bold text-sm">KSh {(route.fuelCost * 100).toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Zap className="h-5 w-5 text-yellow-400 mr-2" />
                Recommendations
              </h3>
            </div>

            <div className="space-y-3">
              {fuelData.recommendations.map((rec, index) => (
                <motion.div
                  key={rec.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-medium text-sm">{rec.title}</h4>
                      <p className="text-gray-400 text-xs">{rec.description}</p>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xxs border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold text-sm">{rec.impact}</span>
                    <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">
                      View Details →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FuelEfficiencyAnalytics;