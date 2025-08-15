import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  TrendingDown,
  TrendingUp,
  Globe,
  Zap,
  Recycle,
  Award,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  Truck,
  MapPin,
  Wind,
  Sun,
  BatteryCharging,
  CloudRain,
  Coins,
  TreePine,
  Route
} from 'lucide-react';

const CarbonFootprintDashboard = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [carbonData, setCarbonData] = useState(null);
  const [kenyanInitiatives, setKenyanInitiatives] = useState([]);

  useEffect(() => {
    // Simulate carbon footprint data with Kenyan context
    const sampleData = {
      overview: {
        totalEmissions: 1845.3, // kg CO2
        monthlyReduction: -18.7, // percentage
        offsetCredits: 245.2,
        sustainabilityScore: 84,
        treesEquivalent: 38,
        costSavings: 125600, // KES
        waterSaved: 45000, // liters
        wasteReduced: 780 // kg
      },
      breakdown: {
        transportation: { value: 1180.5, percentage: 63.9 },
        packaging: { value: 312.8, percentage: 16.9 },
        warehousing: { value: 241.2, percentage: 13.1 },
        processing: { value: 111.2, percentage: 6.1 }
      },
      routes: [
        {
          id: 'route-1',
          name: 'Nairobi to Mombasa',
          emissions: 345.2,
          distance: 480,
          efficiency: 0.719, // kg CO2 per km
          optimization: 22.4, // % improvement
          status: 'optimized',
          cost: 18500, // KES
          vehicles: 12,
          stops: 3
        },
        {
          id: 'route-2',
          name: 'Kisumu to Kampala',
          emissions: 423.8,
          distance: 310,
          efficiency: 1.367,
          optimization: 15.7,
          status: 'good',
          cost: 21500, // KES
          vehicles: 8,
          stops: 4
        },
        {
          id: 'route-3',
          name: 'Nakuru to Dar es Salaam',
          emissions: 576.4,
          distance: 780,
          efficiency: 0.739,
          optimization: 28.1,
          status: 'excellent',
          cost: 32400, // KES
          vehicles: 15,
          stops: 5
        }
      ],
      timeline: [
        { month: 'Jan', emissions: 2450, target: 2200, offset: 120 },
        { month: 'Feb', emissions: 2280, target: 2100, offset: 135 },
        { month: 'Mar', emissions: 2150, target: 2000, offset: 140 },
        { month: 'Apr', emissions: 1990, target: 1900, offset: 142 },
        { month: 'May', emissions: 1850, target: 1800, offset: 145 },
        { month: 'Jun', emissions: 1845, target: 1700, offset: 148 }
      ],
      initiatives: [
        {
          title: 'Kenyan EV Fleet Expansion',
          impact: -420,
          status: 'active',
          completion: 75,
          cost: 4500000, // KES
          location: 'Nairobi Depot'
        },
        {
          title: 'Solar-Powered Warehouses',
          impact: -210,
          status: 'active',
          completion: 85,
          cost: 3200000, // KES
          location: 'Mombasa Terminal'
        },
        {
          title: 'Sustainable Packaging Initiative',
          impact: -180,
          status: 'completed',
          completion: 100,
          cost: 1850000, // KES
          location: 'All Facilities'
        },
        {
          title: 'Route Optimization AI',
          impact: -320,
          status: 'active',
          completion: 65,
          cost: 2750000, // KES
          location: 'Central Operations'
        }
      ],
      regionalImpact: [
        { region: 'Nairobi', reduction: 28.4, score: 87 },
        { region: 'Coastal', reduction: 22.1, score: 82 },
        { region: 'Western', reduction: 18.7, score: 79 },
        { region: 'Rift Valley', reduction: 15.3, score: 76 }
      ]
    };

    setCarbonData(sampleData);
    
    // Kenyan sustainability initiatives
    setKenyanInitiatives([
      {
        title: "Lake Victoria Clean Transport",
        description: "Electric ferries for lake transport reducing diesel emissions",
        impact: "-150 tCO2/year",
        status: "Pilot Phase"
      },
      {
        title: "Mombasa Port Solar Project",
        description: "10MW solar installation to power port operations",
        impact: "-420 tCO2/year",
        status: "Implementation"
      },
      {
        title: "Nairobi Urban Reforestation",
        description: "Planting 50,000 trees in urban logistics centers",
        impact: "-85 tCO2/year",
        status: "Active"
      },
      {
        title: "Eco-Routing for Maasai Mara",
        description: "Protected area routing to minimize ecological impact",
        impact: "-65 tCO2/year",
        status: "Planning"
      }
    ]);
  }, [timeframe]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
      case 'completed':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'optimized':
      case 'active':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'good':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'planned':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  if (!carbonData) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-white text-lg">Loading Kenyan Carbon Data...</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Leaf className="mr-2 text-green-400" />
            IntelliRoute Africa Carbon Tracker
          </h2>
          <p className="text-gray-400 mt-1">Monitoring environmental impact across Kenyan logistics operations</p>
        </div>

        <div className="flex items-center space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg text-white transition-colors">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics - Kenyan Focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-400" />
            </div>
            <div className="text-green-400 flex items-center space-x-1">
              <TrendingDown className="h-4 w-4" />
              <span className="text-xs">{carbonData.overview.monthlyReduction}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{carbonData.overview.totalEmissions.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">kg CO₂ Emissions</p>
            <p className="text-green-300 text-xs">Kenyan operations</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Coins className="h-6 w-6 text-blue-400" />
            </div>
            <CheckCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">KES {carbonData.overview.costSavings.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Cost Savings</p>
            <p className="text-blue-300 text-xs">From efficiency gains</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <TreePine className="h-6 w-6 text-emerald-400" />
            </div>
            <Target className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{carbonData.overview.treesEquivalent}</h3>
            <p className="text-gray-400 text-sm">Trees Equivalent</p>
            <p className="text-emerald-300 text-xs">Carbon offset</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <Recycle className="h-6 w-6 text-yellow-400" />
            </div>
            <Info className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{carbonData.overview.wasteReduced} kg</h3>
            <p className="text-gray-400 text-sm">Waste Reduced</p>
            <p className="text-yellow-300 text-xs">Monthly reduction</p>
          </div>
        </motion.div>
      </div>

      {/* Kenyan Logistics Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emissions Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Kenyan Operations Emissions</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {Object.entries(carbonData.breakdown).map(([category, data], index) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white capitalize">{category}</span>
                    <div className="text-right">
                      <span className="text-white font-bold">{data.value.toFixed(1)} kg</span>
                      <span className="text-gray-400 text-sm ml-2">{data.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.percentage}%` }}
                      transition={{ delay: index * 0.1 }}
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-red-500' :
                        index === 1 ? 'bg-orange-500' :
                        index === 2 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Doughnut chart representation */}
                <div className="absolute inset-0 rounded-full border-[12px] border-red-500" 
                     style={{ clipPath: 'inset(0 0 0 50%)' }}></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-orange-500" 
                     style={{ clipPath: 'inset(0 0 0 50%) rotate(230deg)' }}></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-yellow-500" 
                     style={{ clipPath: 'inset(0 0 0 50%) rotate(320deg)' }}></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-green-500" 
                     style={{ clipPath: 'inset(0 0 0 50%) rotate(20deg)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{carbonData.overview.sustainabilityScore}/100</div>
                    <div className="text-emerald-400 text-sm">Sustainability Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Regional Impact */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Regional Impact</h3>
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {carbonData.regionalImpact.map((region, index) => (
              <div key={region.region} className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-medium">{region.region}</h4>
                  <span className="text-green-400 font-bold">-{region.reduction}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Eco Score</span>
                  <div className="flex items-center">
                    <span className="text-white mr-2">{region.score}/100</span>
                    <div className="w-16 bg-gray-600 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                        style={{ width: `${region.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Kenyan Route Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Kenyan Route Efficiency</h3>
          <div className="flex items-center space-x-3">
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Routes</option>
              {carbonData.routes.map(route => (
                <option key={route.id} value={route.id}>{route.name}</option>
              ))}
            </select>
            <button className="p-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg">
              <Route className="h-4 w-4 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {carbonData.routes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-700/30 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{route.name}</h4>
                  <p className="text-gray-400 text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{route.distance} km • {route.stops} stops</span>
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(route.status)}`}>
                  {route.status.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-800/50 p-2 rounded">
                  <p className="text-gray-400 text-xs mb-1">Emissions</p>
                  <p className="text-white font-bold">{route.emissions} kg</p>
                </div>
                <div className="bg-gray-800/50 p-2 rounded">
                  <p className="text-gray-400 text-xs mb-1">Cost (KES)</p>
                  <p className="text-white font-bold">{route.cost.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800/50 p-2 rounded">
                  <p className="text-gray-400 text-xs mb-1">Efficiency</p>
                  <p className="text-white font-bold">{route.efficiency} kg/km</p>
                </div>
                <div className="bg-gray-800/50 p-2 rounded">
                  <p className="text-gray-400 text-xs mb-1">Optimization</p>
                  <p className="text-green-400 font-bold">-{route.optimization}%</p>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-400 text-xs">Eco Score</span>
                  <span className="text-gray-400 text-xs">{Math.round((1 - route.efficiency / 1.5) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((1 - route.efficiency / 1.5) * 100)}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Kenyan Sustainability Initiatives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Initiatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">IntelliRoute Sustainability Initiatives</h3>
            <div className="text-sm text-green-400">
              Total Impact: <span className="font-bold">-1,130 kg CO₂</span>
            </div>
          </div>

          <div className="space-y-4">
            {carbonData.initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{initiative.title}</h4>
                    <p className="text-green-400 text-sm font-bold">{initiative.impact} kg CO₂ reduction</p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {initiative.location}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(initiative.status)}`}>
                    {initiative.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-xs">Progress</span>
                      <span className="text-white text-xs font-medium">{initiative.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${initiative.completion}%` }}
                        transition={{ delay: index * 0.1 }}
                        className={`h-2 rounded-full ${
                          initiative.status === 'active' ? 'bg-emerald-500' : 
                          initiative.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-gray-400 text-xs">Investment</div>
                    <div className="text-white font-bold">KES {initiative.cost.toLocaleString()}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* National Initiatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Kenyan National Green Projects</h3>
            <div className="text-sm text-emerald-400">
              <TreePine className="inline mr-1" />
              Supported by IntelliRoute
            </div>
          </div>

          <div className="space-y-4">
            {kenyanInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 rounded-lg p-4 border border-emerald-500/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{initiative.title}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    initiative.status === "Active" ? "bg-emerald-500/20 text-emerald-400" :
                    initiative.status === "Pilot Phase" ? "bg-blue-500/20 text-blue-400" :
                    initiative.status === "Implementation" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-gray-500/20 text-gray-400"
                  }`}>
                    {initiative.status}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{initiative.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 text-sm font-bold">{initiative.impact}</span>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded">
                      Learn More
                    </button>
                    <button className="text-xs bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded">
                      Support
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Environmental Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Kenyan Environmental Progress</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {carbonData.timeline.map((month, index) => (
            <div key={month.month} className="flex items-center space-x-4">
              <div className="w-12 text-gray-400 text-sm">{month.month}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm">Actual: {month.emissions} kg</span>
                  <span className="text-gray-400 text-sm">Target: {month.target} kg</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(month.emissions / 2500) * 100}%` }}
                    transition={{ delay: index * 0.05 }}
                    className={`h-2 rounded-full ${
                      month.emissions <= month.target ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <div 
                    className="absolute top-0 h-2 w-1 bg-yellow-400 rounded"
                    style={{ left: `${(month.target / 2500) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1 flex justify-between">
                  <span>Offset: {month.offset} credits</span>
                  <span className="text-emerald-400">
                    {month.emissions <= month.target ? 'Target Achieved ✓' : 'Needs Improvement'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CarbonFootprintDashboard;