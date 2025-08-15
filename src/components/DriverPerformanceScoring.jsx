import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Award,
  AlertTriangle,
  Shield,
  Speedometer,
  Clock,
  TrendingUp,
  TrendingDown,
  Star,
  MapPin,
  Phone,
  Calendar,
  Target,
  Activity,
  Zap,
  BarChart3,
  Eye,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Gauge,
  Fuel,
  Route,
  Map,
  User,
  ChevronDown,
  ChevronRight,
  Circle,
  Loader
} from 'lucide-react';

const DriverPerformanceScoring = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [viewMode, setViewMode] = useState('overview');
  const [driverData, setDriverData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [selectedDriverData, setSelectedDriverData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simulate driver performance data
      const sampleData = {
        overview: {
          totalDrivers: 24,
          avgSafetyScore: 87.3,
          avgEfficiencyScore: 82.1,
          topPerformers: 6,
          improvementNeeded: 3,
          activeDrivers: 21,
          monthlyImprovement: 5.2,
          fuelSavings: 12500, // KES
          reducedIncidents: 42,
          onTimeDeliveries: 95.7,
          regionalStats: {
            nairobi: { drivers: 8, avgScore: 89.2 },
            mombasa: { drivers: 5, avgScore: 84.5 },
            kisumu: { drivers: 4, avgScore: 82.3 },
            nakuru: { drivers: 3, avgScore: 80.7 },
            eldoret: { drivers: 4, avgScore: 83.1 }
          }
        },
        drivers: [
          {
            id: 'DRV-001',
            name: 'James Mwangi',
            location: 'Nairobi, Kenya',
            phone: '+254-712-345-678',
            vehicleAssigned: 'TRK-001',
            experience: '8 years',
            totalScore: 92,
            safetyScore: 95,
            efficiencyScore: 88,
            status: 'excellent',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
            metrics: {
              trips: 156,
              distance: 18430, // km
              fuelEfficiency: 8.9, // km/L
              accidents: 0,
              incidents: 1,
              onTimeDeliveries: 152,
              customerRating: 4.8,
              maintenanceAlerts: 2,
              fuelSaved: 420, // liters
              co2Reduced: 1100 // kg
            },
            trends: {
              safety: [88, 90, 92, 93, 94, 95],
              efficiency: [82, 84, 85, 87, 88, 88],
              punctuality: [95, 94, 96, 95, 97, 96]
            },
            strengths: ['Fuel Efficiency', 'Safety Record', 'Customer Service'],
            improvements: ['Route Optimization'],
            certifications: ['Defensive Driving', 'Eco-Driving', 'First Aid'],
            lastActive: '2024-08-09T14:30:00Z'
          },
          {
            id: 'DRV-002',
            name: 'Fatima Diallo',
            location: 'Mombasa, Kenya',
            phone: '+254-803-123-456',
            vehicleAssigned: 'TRK-002',
            experience: '5 years',
            totalScore: 86,
            safetyScore: 82,
            efficiencyScore: 89,
            status: 'good',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332b786?w=150',
            metrics: {
              trips: 142,
              distance: 16720,
              fuelEfficiency: 9.2,
              accidents: 0,
              incidents: 3,
              onTimeDeliveries: 138,
              customerRating: 4.6,
              maintenanceAlerts: 1,
              fuelSaved: 380,
              co2Reduced: 990
            },
            trends: {
              safety: [78, 79, 80, 81, 82, 82],
              efficiency: [85, 87, 88, 89, 89, 89],
              punctuality: [92, 93, 94, 95, 97, 97]
            },
            strengths: ['Fuel Efficiency', 'Punctuality'],
            improvements: ['Safety Awareness', 'Incident Reduction'],
            certifications: ['Commercial License', 'Eco-Driving'],
            lastActive: '2024-08-09T16:45:00Z'
          },
          {
            id: 'DRV-003',
            name: 'Mohammed Al-Rashid',
            location: 'Kisumu, Kenya',
            phone: '+254-100-123-456',
            vehicleAssigned: 'VAN-001',
            experience: '12 years',
            totalScore: 94,
            safetyScore: 98,
            efficiencyScore: 91,
            status: 'excellent',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            metrics: {
              trips: 189,
              distance: 12450,
              fuelEfficiency: 4.3, // km/kWh for electric
              accidents: 0,
              incidents: 0,
              onTimeDeliveries: 185,
              customerRating: 4.9,
              maintenanceAlerts: 0,
              fuelSaved: 510,
              co2Reduced: 1330
            },
            trends: {
              safety: [95, 96, 97, 97, 98, 98],
              efficiency: [88, 89, 90, 90, 91, 91],
              punctuality: [96, 97, 98, 98, 98, 98]
            },
            strengths: ['Safety Record', 'Experience', 'Customer Service', 'Zero Incidents'],
            improvements: ['None - Exemplary Performance'],
            certifications: ['Master Driver', 'Safety Instructor', 'EV Specialist', 'First Aid'],
            lastActive: '2024-08-09T13:15:00Z'
          },
          {
            id: 'DRV-004',
            name: 'Sarah Okonkwo',
            location: 'Nakuru, Kenya',
            phone: '+254-244-123-456',
            vehicleAssigned: 'TRK-003',
            experience: '3 years',
            totalScore: 74,
            safetyScore: 71,
            efficiencyScore: 77,
            status: 'needs_improvement',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
            metrics: {
              trips: 98,
              distance: 11280,
              fuelEfficiency: 7.1,
              accidents: 1,
              incidents: 5,
              onTimeDeliveries: 89,
              customerRating: 4.2,
              maintenanceAlerts: 4,
              fuelSaved: 190,
              co2Reduced: 490
            },
            trends: {
              safety: [65, 67, 68, 70, 71, 71],
              efficiency: [72, 74, 75, 76, 77, 77],
              punctuality: [85, 87, 89, 90, 91, 91]
            },
            strengths: ['Improving Steadily', 'Punctuality'],
            improvements: ['Safety Training', 'Incident Reduction', 'Maintenance Awareness'],
            certifications: ['Commercial License'],
            lastActive: '2024-08-09T15:20:00Z'
          }
        ],
        leaderboard: [
          { rank: 1, driverId: 'DRV-003', name: 'Mohammed Al-Rashid', score: 94, change: '+2' },
          { rank: 2, driverId: 'DRV-001', name: 'James Mwangi', score: 92, change: '+1' },
          { rank: 3, driverId: 'DRV-002', name: 'Fatima Diallo', score: 86, change: '+3' },
          { rank: 4, driverId: 'DRV-004', name: 'Sarah Okonkwo', score: 74, change: '+5' }
        ],
        incidents: [
          {
            id: 'INC-001',
            driverId: 'DRV-004',
            driverName: 'Sarah Okonkwo',
            type: 'Minor Collision',
            severity: 'medium',
            date: '2024-08-05',
            location: 'Nakuru-Nairobi Highway',
            status: 'resolved',
            description: 'Minor rear-end collision in traffic'
          },
          {
            id: 'INC-002',
            driverId: 'DRV-002',
            driverName: 'Fatima Diallo',
            type: 'Speed Violation',
            severity: 'low',
            date: '2024-08-07',
            location: 'Mombasa-Nairobi Expressway',
            status: 'training_scheduled',
            description: 'Exceeded speed limit by 15km/h'
          },
          {
            id: 'INC-003',
            driverId: 'DRV-001',
            driverName: 'James Mwangi',
            type: 'Late Delivery',
            severity: 'low',
            date: '2024-08-08',
            location: 'Nairobi CBD',
            status: 'resolved',
            description: 'Delivery delayed by 45 minutes due to traffic'
          }
        ],
        performanceDistribution: {
          excellent: 8, // 90-100
          good: 11,     // 80-89
          average: 3,   // 70-79
          needs_improvement: 2 // <70
        },
        trainingPrograms: [
          {
            id: 'TRN-001',
            title: 'Advanced Safety Training',
            enrolled: 6,
            completion: 67,
            duration: '2 weeks',
            priority: 'high',
            location: 'Nairobi Training Center'
          },
          {
            id: 'TRN-002',
            title: 'Fuel Efficiency Optimization',
            enrolled: 12,
            completion: 85,
            duration: '1 week',
            priority: 'medium',
            location: 'Regional Hubs'
          },
          {
            id: 'TRN-003',
            title: 'Customer Service Excellence',
            enrolled: 8,
            completion: 92,
            duration: '3 days',
            priority: 'low',
            location: 'Online'
          }
        ]
      };

      setDriverData(sampleData);
      setIsLoading(false);
    }, 1200);
  }, [timeframe]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'good':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'average':
        return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'needs_improvement':
        return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
      case 'medium':
        return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'low':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-rose-400';
  };

  const viewDriverDetails = (driver) => {
    setSelectedDriverData(driver);
    setShowDriverDetails(true);
  };

  const closeDriverDetails = () => {
    setShowDriverDetails(false);
    setSelectedDriverData(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="text-center">
          <Loader className="h-12 w-12 text-blue-400 animate-spin mx-auto" />
          <p className="mt-4 text-blue-300">Loading driver performance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Driver Performance Analytics</h2>
          <p className="text-blue-400 mt-1">Comprehensive driver scoring with safety and efficiency metrics</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex border border-blue-700/50 rounded-lg overflow-hidden bg-blue-900/20">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'overview' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                  : 'bg-transparent text-blue-300 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewMode('individual')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'individual' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                  : 'bg-transparent text-blue-300 hover:text-white'
              }`}
            >
              Individual
            </button>
          </div>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-blue-900/20 border border-blue-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-900/20 hover:bg-blue-800/30 border border-blue-700/50 rounded-lg text-blue-300 hover:text-white transition-colors">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{driverData.overview.totalDrivers}</h3>
            <p className="text-blue-400 text-sm">Total Drivers</p>
            <p className="text-blue-300 text-xs">{driverData.overview.activeDrivers} active</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="text-emerald-400 flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs">+{driverData.overview.monthlyImprovement}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{driverData.overview.avgSafetyScore}</h3>
            <p className="text-blue-400 text-sm">Avg Safety Score</p>
            <p className="text-emerald-300 text-xs">Fleet average</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{driverData.overview.avgEfficiencyScore}</h3>
            <p className="text-blue-400 text-sm">Avg Efficiency</p>
            <p className="text-purple-300 text-xs">Performance score</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Award className="h-5 w-5 text-amber-400" />
            </div>
            <CheckCircle className="h-4 w-4 text-amber-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{driverData.overview.topPerformers}</h3>
            <p className="text-blue-400 text-sm">Top Performers</p>
            <p className="text-amber-300 text-xs">Score 90+</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-rose-400" />
            </div>
            <XCircle className="h-4 w-4 text-rose-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{driverData.overview.improvementNeeded}</h3>
            <p className="text-blue-400 text-sm">Need Improvement</p>
            <p className="text-rose-300 text-xs">Score below 80</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{driverData.incidents.filter(i => i.status === 'resolved').length}</h3>
            <p className="text-blue-400 text-sm">Incidents Resolved</p>
            <p className="text-emerald-300 text-xs">This month</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{Math.round((driverData.trainingPrograms.reduce((sum, p) => sum + p.completion, 0) / driverData.trainingPrograms.length))}%</h3>
            <p className="text-blue-400 text-sm">Training Complete</p>
            <p className="text-indigo-300 text-xs">Average progress</p>
          </div>
        </motion.div>
      </div>

      {viewMode === 'overview' && (
        <>
          {/* Performance Distribution & Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Performance Distribution</h3>
                <BarChart3 className="h-5 w-5 text-blue-400" />
              </div>

              <div className="space-y-4">
                {Object.entries(driverData.performanceDistribution).map(([category, count], index) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white capitalize">{category.replace('_', ' ')}</span>
                      <span className="text-white font-bold">{count} drivers</span>
                    </div>
                    <div className="w-full bg-blue-800/30 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / driverData.overview.totalDrivers) * 100}%` }}
                        transition={{ delay: index * 0.1 }}
                        className={`h-3 rounded-full ${
                          index === 0 ? 'bg-emerald-500' :
                          index === 1 ? 'bg-blue-500' :
                          index === 2 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                      />
                    </div>
                    <div className="text-xs text-blue-400">
                      {Math.round((count / driverData.overview.totalDrivers) * 100)}% of fleet
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Performance Leaderboard</h3>
                <Award className="h-5 w-5 text-amber-400" />
              </div>

              <div className="space-y-4">
                {driverData.leaderboard.map((driver, index) => (
                  <motion.div
                    key={driver.driverId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-blue-800/20 rounded-lg border border-blue-700/30 hover:border-blue-500/50 transition cursor-pointer"
                    onClick={() => viewDriverDetails(driverData.drivers.find(d => d.id === driver.driverId))}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-amber-500 text-black' :
                      index === 1 ? 'bg-blue-400 text-black' :
                      index === 2 ? 'bg-orange-500 text-black' : 'bg-blue-600 text-white'
                    }`}>
                      {driver.rank}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{driver.name}</h4>
                      <p className="text-blue-400 text-sm">{driver.driverId}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(driver.score)}`}>
                        {driver.score}
                      </div>
                      <div className="text-emerald-400 text-sm flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {driver.change}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-blue-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Regional Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Regional Performance</h3>
              <Map className="h-5 w-5 text-blue-400" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(driverData.overview.regionalStats).map(([region, stats], index) => (
                <div key={region} className="text-center p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
                  <div className="text-xl font-bold text-white mb-2">{stats.avgScore}</div>
                  <div className="text-blue-300 text-sm capitalize">{region}</div>
                  <div className="text-blue-400 text-xs">{stats.drivers} drivers</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Incidents</h3>
              <AlertTriangle className="h-5 w-5 text-rose-400" />
            </div>

            <div className="space-y-4">
              {driverData.incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-800/20 rounded-lg p-4 border border-blue-700/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{incident.type}</h4>
                      <p className="text-blue-400 text-sm">{incident.driverName} • {incident.id}</p>
                      <p className="text-blue-500 text-xs">{incident.location}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </div>
                      <p className="text-blue-400 text-xs mt-1">{incident.date}</p>
                    </div>
                  </div>
                  <p className="text-blue-300 text-sm mb-3">{incident.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs border ${
                      incident.status === 'resolved' ? 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' :
                      incident.status === 'training_scheduled' ? 'text-amber-400 bg-amber-500/20 border-amber-500/30' :
                      'text-rose-400 bg-rose-500/20 border-rose-500/30'
                    }`}>
                      {incident.status.replace('_', ' ')}
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      View Details →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Training Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Training Programs</h3>
              <Target className="h-5 w-5 text-indigo-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {driverData.trainingPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-800/20 rounded-lg p-4 border border-blue-700/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{program.title}</h4>
                      <p className="text-blue-400 text-sm">{program.location}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs border ${
                      program.priority === 'high' ? 'text-rose-400 bg-rose-500/20 border-rose-500/30' :
                      program.priority === 'medium' ? 'text-amber-400 bg-amber-500/20 border-amber-500/30' :
                      'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'
                    }`}>
                      {program.priority}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 text-sm">Enrolled</span>
                      <span className="text-white text-sm font-medium">{program.enrolled} drivers</span>
                    </div>
                    <div className="w-full bg-blue-700/30 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${program.completion}%` }}
                        transition={{ delay: index * 0.1 }}
                        className={`h-2 rounded-full ${
                          program.priority === 'high' ? 'bg-rose-500' :
                          program.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 text-sm">Progress</span>
                      <span className="text-white text-sm font-medium">{program.completion}%</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-blue-700/30">
                      <span className="text-blue-400 text-xs">{program.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {viewMode === 'individual' && (
        <>
          {/* Driver Selection */}
          <div className="flex items-center justify-between mb-6">
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="px-4 py-2 bg-blue-900/20 border border-blue-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">Select a Driver</option>
              {driverData.drivers.map(driver => (
                <option key={driver.id} value={driver.id}>{driver.name} ({driver.id})</option>
              ))}
            </select>
          </div>

          {/* Individual Driver Details */}
          {selectedDriver !== 'all' && (
            <>
              {driverData.drivers.filter(d => d.id === selectedDriver).map(driver => (
                <div key={driver.id} className="space-y-6">
                  {/* Driver Profile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
                  >
                    <div className="flex items-start space-x-6 mb-6">
                      <img
                        src={driver.avatar}
                        alt={driver.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-white">{driver.name}</h3>
                            <p className="text-blue-400">{driver.id} • {driver.experience}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-2 text-blue-400 text-sm">
                                <MapPin className="h-4 w-4" />
                                <span>{driver.location}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-blue-400 text-sm">
                                <Phone className="h-4 w-4" />
                                <span>{driver.phone}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(driver.status)}`}>
                            {driver.status.replace('_', ' ')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Driver Scores */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
                        <div className={`text-3xl font-bold ${getScoreColor(driver.totalScore)} mb-2`}>
                          {driver.totalScore}
                        </div>
                        <p className="text-blue-400 text-sm">Overall Score</p>
                      </div>
                      <div className="text-center p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
                        <div className={`text-3xl font-bold ${getScoreColor(driver.safetyScore)} mb-2`}>
                          {driver.safetyScore}
                        </div>
                        <p className="text-blue-400 text-sm">Safety Score</p>
                      </div>
                      <div className="text-center p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
                        <div className={`text-3xl font-bold ${getScoreColor(driver.efficiencyScore)} mb-2`}>
                          {driver.efficiencyScore}
                        </div>
                        <p className="text-blue-400 text-sm">Efficiency Score</p>
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-blue-400 text-xs mb-1">Trips</p>
                        <p className="text-white font-bold">{driver.metrics.trips}</p>
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs mb-1">Distance</p>
                        <p className="text-white font-bold">{driver.metrics.distance.toLocaleString()} km</p>
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs mb-1">Fuel Efficiency</p>
                        <p className="text-white font-bold">{driver.metrics.fuelEfficiency} km/L</p>
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs mb-1">Customer Rating</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-amber-400 fill-current" />
                          <span className="text-white font-bold">{driver.metrics.customerRating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs mb-1">Fuel Saved</p>
                        <p className="text-white font-bold">{driver.metrics.fuelSaved} L</p>
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs mb-1">CO2 Reduced</p>
                        <p className="text-white font-bold">{driver.metrics.co2Reduced} kg</p>
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs mb-1">On-Time %</p>
                        <p className="text-white font-bold">
                          {Math.round((driver.metrics.onTimeDeliveries / driver.metrics.trips) * 100)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-blue-400 text-xs mb-1">Incidents</p>
                        <p className="text-white font-bold">{driver.metrics.incidents}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Performance Trends */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-white mb-6">Performance Trends</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {Object.entries(driver.trends).map(([metric, values], index) => (
                        <div key={metric} className="space-y-3">
                          <h4 className="text-white font-medium capitalize">{metric}</h4>
                          <div className="space-y-2">
                            {values.map((value, idx) => (
                              <div key={idx} className="flex items-center space-x-3">
                                <div className="w-8 text-blue-400 text-xs">M{idx + 1}</div>
                                <div className="flex-1">
                                  <div className="w-full bg-blue-700/30 rounded-full h-2">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${value}%` }}
                                      transition={{ delay: (index * 0.1) + (idx * 0.05) }}
                                      className={`h-2 rounded-full ${
                                        metric === 'safety' ? 'bg-emerald-500' :
                                        metric === 'efficiency' ? 'bg-purple-500' : 'bg-blue-500'
                                      }`}
                                    />
                                  </div>
                                </div>
                                <div className="w-8 text-white text-xs text-right">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                        <ThumbsUp className="h-5 w-5 text-emerald-400" />
                        <span>Strengths</span>
                      </h3>
                      <div className="space-y-2">
                        {driver.strengths.map((strength, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                            <span className="text-blue-300">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                        <Target className="h-5 w-5 text-amber-400" />
                        <span>Areas for Improvement</span>
                      </h3>
                      <div className="space-y-2">
                        {driver.improvements.map((improvement, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                            <span className="text-blue-300">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Certifications */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Certifications & Training</h3>
                    <div className="flex flex-wrap gap-2">
                      {driver.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full text-sm"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </>
          )}
        </>
      )}
      
      {/* Driver Detail Modal */}
      {showDriverDetails && selectedDriverData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-lg rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-700/50"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Driver Performance Details</h3>
                <button
                  onClick={closeDriverDetails}
                  className="p-2 hover:bg-blue-800/30 rounded-lg transition"
                >
                  <XCircle className="h-5 w-5 text-blue-300" />
                </button>
              </div>

              <div className="flex items-start space-x-6 mb-6">
                <img
                  src={selectedDriverData.avatar}
                  alt={selectedDriverData.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedDriverData.name}</h3>
                      <p className="text-blue-400">{selectedDriverData.id} • {selectedDriverData.experience}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-2 text-blue-400 text-sm">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedDriverData.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-400 text-sm">
                          <Phone className="h-4 w-4" />
                          <span>{selectedDriverData.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedDriverData.status)}`}>
                      {selectedDriverData.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedDriverData.totalScore)} mb-2`}>
                    {selectedDriverData.totalScore}
                  </div>
                  <p className="text-blue-400 text-sm">Overall Score</p>
                </div>
                <div className="text-center p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedDriverData.safetyScore)} mb-2`}>
                    {selectedDriverData.safetyScore}
                  </div>
                  <p className="text-blue-400 text-sm">Safety Score</p>
                </div>
                <div className="text-center p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
                  <div className={`text-3xl font-bold ${getScoreColor(selectedDriverData.efficiencyScore)} mb-2`}>
                    {selectedDriverData.efficiencyScore}
                  </div>
                  <p className="text-blue-400 text-sm">Efficiency Score</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-800/20 rounded-lg p-4 border border-blue-700/30">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <ThumbsUp className="h-5 w-5 text-emerald-400" />
                    <span>Strengths</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedDriverData.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <span className="text-blue-300">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-800/20 rounded-lg p-4 border border-blue-700/30">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Target className="h-5 w-5 text-amber-400" />
                    <span>Areas for Improvement</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedDriverData.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <span className="text-blue-300">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-800/20 rounded-lg p-6 border border-blue-700/30">
                <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-blue-400 text-xs mb-1">Trips</p>
                    <p className="text-white font-bold">{selectedDriverData.metrics.trips}</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs mb-1">Distance</p>
                    <p className="text-white font-bold">{selectedDriverData.metrics.distance.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs mb-1">Fuel Efficiency</p>
                    <p className="text-white font-bold">{selectedDriverData.metrics.fuelEfficiency} km/L</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs mb-1">Customer Rating</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="text-white font-bold">{selectedDriverData.metrics.customerRating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs mb-1">On-Time %</p>
                    <p className="text-white font-bold">
                      {Math.round((selectedDriverData.metrics.onTimeDeliveries / selectedDriverData.metrics.trips) * 100)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs mb-1">Incidents</p>
                    <p className="text-white font-bold">{selectedDriverData.metrics.incidents}</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs mb-1">Fuel Saved</p>
                    <p className="text-white font-bold">{selectedDriverData.metrics.fuelSaved} L</p>
                  </div>
                  <div>
                    <p className="text-blue-400 text-xs mb-1">CO2 Reduced</p>
                    <p className="text-white font-bold">{selectedDriverData.metrics.co2Reduced} kg</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DriverPerformanceScoring;