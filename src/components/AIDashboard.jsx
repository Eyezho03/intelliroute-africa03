import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Brain,
  Route,
  Truck,
  Settings,
  TrendingUp,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Gauge,
  MapPin,
  Wrench,
  Activity,
  Target,
  Lightbulb,
  BarChart3,
  RefreshCw,
  Download,
  Play
} from 'lucide-react';
import aiEngine from '../services/aiEngine';

const AIDashboard = () => {
  const [activeTab, setActiveTab] = useState('route-optimization');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [routeForm, setRouteForm] = useState({
    origin: 'Nairobi CBD',
    destination: 'Mombasa Port',
    vehicleType: 'truck',
    cargo: 'general',
    priority: 'balanced'
  });
  const [maintenanceData, setMaintenanceData] = useState(null);
  const [loadBalanceData, setLoadBalanceData] = useState(null);
  const [toast, setToast] = useState(null);
  const [kenyanVehicles, setKenyanVehicles] = useState([]);
  const [kenyanShipments, setKenyanShipments] = useState([]);

  // Initialize with Kenyan context
  useEffect(() => {
    // Kenyan vehicle fleet
    const vehicles = [
      { 
        id: 'KBZ-001A', 
        type: 'Isuzu NPR', 
        capacity: 7000, 
        fuelEfficiency: 8.5,
        route: 'Nairobi-Nakuru',
        lastService: '2023-10-15'
      },
      { 
        id: 'KBR-002X', 
        type: 'Toyota Dyna', 
        capacity: 4000, 
        fuelEfficiency: 12.0,
        route: 'Mombasa-Nairobi',
        lastService: '2023-11-20'
      },
      { 
        id: 'KCE-003T', 
        type: 'Mitsubishi Fuso', 
        capacity: 5000, 
        fuelEfficiency: 10.5,
        route: 'Kisumu-Eldoret',
        lastService: '2023-09-25'
      }
    ];
    
    // Kenyan shipments
    const shipments = [
      { 
        id: 'SHIP-2023-001', 
        weight: 3000, 
        volume: 20, 
        priority: 'high', 
        origin: 'Nairobi', 
        destination: 'Kampala',
        contents: 'Electronics'
      },
      { 
        id: 'SHIP-2023-002', 
        weight: 1500, 
        volume: 10, 
        priority: 'medium', 
        origin: 'Mombasa', 
        destination: 'Nairobi',
        contents: 'Coffee'
      },
      { 
        id: 'SHIP-2023-003', 
        weight: 4000, 
        volume: 25, 
        priority: 'low', 
        origin: 'Kisumu', 
        destination: 'Eldoret',
        contents: 'Agricultural Products'
      }
    ];
    
    setKenyanVehicles(vehicles);
    setKenyanShipments(shipments);
  }, []);

  // Toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Handle Route Optimization for Kenyan routes
  const handleRouteOptimization = async () => {
    setIsLoading(true);
    showToast('🤖 AI is analyzing Kenyan routes...', 'info');
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Kenyan-specific route optimization
      const result = {
        name: "A104 Highway Route",
        confidence: 92,
        distance: 480,
        estimatedTime: 8.5,
        fuelCost: 18500,
        aiInsights: [
          "Avoids Nairobi-Mombasa highway traffic during peak hours",
          "Optimized for Kenya Roads Class B surfaces",
          "Includes recommended rest stops along route",
          "Bypasses known police checkpoints to save time"
        ],
        estimatedSavings: {
          time: 1.8,
          fuel: 4200,
          total: 7500
        },
        borderCrossing: {
          required: true,
          points: ["Namanga Border"],
          docsRequired: ["Customs Declaration", "Cargo Manifest"]
        },
        tolls: [
          { name: "Mai Mahiu Toll", cost: 600 },
          { name: "Mtito Andei Toll", cost: 400 }
        ]
      };
      
      setAiResults(result);
      showToast('Kenyan route optimization completed! 🎯');
    } catch (error) {
      showToast('Error during route optimization', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Load Balancing for Kenyan logistics
  const handleLoadBalancing = async () => {
    setIsLoading(true);
    showToast('🤖 AI is optimizing Kenyan load distribution...', 'info');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = {
        efficiency: 0.94,
        costSavings: 12750,
        loadPlan: [
          {
            vehicleId: 'KBZ-001A',
            shipments: ['SHIP-2023-001', 'SHIP-2023-002'],
            route: 'Nairobi-Mombasa',
            utilization: '92%'
          },
          {
            vehicleId: 'KCE-003T',
            shipments: ['SHIP-2023-003'],
            route: 'Kisumu-Eldoret',
            utilization: '85%'
          }
        ],
        recommendations: [
          "Combine Nairobi-bound shipments for Friday delivery",
          "Use alternative route for Nakuru deliveries during market days",
          "Prioritize perishable goods for morning departures"
        ]
      };
      
      setLoadBalanceData(result);
      showToast('Kenyan load balancing completed! ⚖️');
    } catch (error) {
      showToast('Error during load balancing', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Predictive Maintenance for Kenyan vehicles
  const handlePredictiveMaintenance = async (vehicleId) => {
    setIsLoading(true);
    showToast(`🤖 Analyzing ${vehicleId} maintenance...`, 'info');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const result = {
        overallScore: 76,
        predictions: {
          engine: { healthScore: 82, issues: ['Oil change needed'], estimatedCost: 8500 },
          transmission: { healthScore: 65, issues: ['Fluid degradation'], estimatedCost: 12000 },
          brakes: { healthScore: 88, issues: [], estimatedCost: 0 },
          tires: { healthScore: 70, issues: ['Front right wear'], estimatedCost: 18000 },
          electrical: { healthScore: 75, issues: ['Battery weakening'], estimatedCost: 9500 }
        },
        urgentItems: [
          { component: 'tires', healthScore: 70, estimatedCost: 18000 }
        ],
        recommendedActions: [
          "Replace front tires before rainy season",
          "Schedule transmission service in next 2 weeks",
          "Check battery performance during next trip"
        ],
        costEstimate: 37500,
        scheduleSuggestion: "Service during off-peak hours at Nairobi Service Center"
      };
      
      setMaintenanceData(result);
      showToast('Maintenance analysis completed! 🔧');
    } catch (error) {
      showToast('Error during maintenance analysis', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Chart data for Kenyan logistics insights
  const kenyanRouteData = {
    labels: ['Nairobi-Mombasa', 'Nairobi-Kisumu', 'Mombasa-Kampala', 'Nakuru-Eldoret'],
    datasets: [
      {
        label: 'Average Transit Time (hrs)',
        data: [8.5, 5.2, 18.3, 3.7],
        backgroundColor: '#10b981',
        borderColor: '#047857',
        borderWidth: 2
      },
      {
        label: 'Fuel Cost (KES)',
        data: [18500, 11200, 34500, 8500],
        backgroundColor: '#6366f1',
        borderColor: '#4f46e5',
        borderWidth: 2
      }
    ]
  };

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
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="text-emerald-400" size={32} />
            </motion.div>
            <span className="text-emerald-400">IntelliRoute Africa</span>
            <span className="text-gray-300">AI Logistics Hub</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Zap size={16} />
            AI-powered logistics optimization for East African supply chains
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          >
            <RefreshCw size={16} />
            Refresh Dashboard
          </button>
        </div>
      </motion.header>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700 pb-4">
        {[
          { id: 'route-optimization', label: 'Route Optimization', icon: <Route size={18} /> },
          { id: 'load-balancing', label: 'Load Balancing', icon: <Truck size={18} /> },
          { id: 'predictive-maintenance', label: 'Vehicle Maintenance', icon: <Wrench size={18} /> },
          { id: 'ai-insights', label: 'Kenya Insights', icon: <BarChart3 size={18} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Route Optimization Tab - Kenyan Focus */}
      <AnimatePresence mode="wait">
        {activeTab === 'route-optimization' && (
          <motion.div
            key="route-optimization"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Route Configuration */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <Settings size={20} />
                  Kenyan Route Planner
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Origin</label>
                      <select
                        value={routeForm.origin}
                        onChange={(e) => setRouteForm({...routeForm, origin: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="Nairobi CBD">Nairobi CBD</option>
                        <option value="Mombasa Port">Mombasa Port</option>
                        <option value="Kisumu Pier">Kisumu Pier</option>
                        <option value="Eldoret Town">Eldoret Town</option>
                        <option value="Nakuru CBD">Nakuru CBD</option>
                        <option value="Thika Town">Thika Town</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Destination</label>
                      <select
                        value={routeForm.destination}
                        onChange={(e) => setRouteForm({...routeForm, destination: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="Mombasa Port">Mombasa Port</option>
                        <option value="Nairobi CBD">Nairobi CBD</option>
                        <option value="Busia Border">Busia Border (UG)</option>
                        <option value="Namanga Border">Namanga Border (TZ)</option>
                        <option value="Kisumu Pier">Kisumu Pier</option>
                        <option value="Eldoret Town">Eldoret Town</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Type</label>
                      <select
                        value={routeForm.vehicleType}
                        onChange={(e) => setRouteForm({...routeForm, vehicleType: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="truck">Heavy Truck (7+ tons)</option>
                        <option value="van">Delivery Van (3-5 tons)</option>
                        <option value="pickup">Pickup Truck (1-3 tons)</option>
                        <option value="refrigerated">Refrigerated Truck</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Cargo Type</label>
                      <select
                        value={routeForm.cargo}
                        onChange={(e) => setRouteForm({...routeForm, cargo: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="general">General Cargo</option>
                        <option value="perishable">Perishable Goods</option>
                        <option value="hazardous">Hazardous Materials</option>
                        <option value="fragile">Fragile Items</option>
                        <option value="agricultural">Agricultural Products</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Optimization Priority</label>
                    <div className="flex gap-2">
                      {['speed', 'cost', 'safety', 'balanced'].map(priority => (
                        <button
                          key={priority}
                          onClick={() => setRouteForm({...routeForm, priority})}
                          className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${
                            routeForm.priority === priority
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          }`}
                        >
                          {priority === 'speed' ? 'Speed' : 
                           priority === 'cost' ? 'Cost Savings' : 
                           priority === 'safety' ? 'Safety' : 'Balanced'}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRouteOptimization}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Brain size={20} />
                        </motion.div>
                        Analyzing Kenyan Routes...
                      </>
                    ) : (
                      <>
                        <Play size={20} />
                        Optimize Kenyan Route
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* AI Results */}
              {aiResults && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6"
                >
                  <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <Target size={20} />
                    Route Optimization Results
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-emerald-900/30 rounded-lg p-4">
                        <div className="text-emerald-400 font-bold text-2xl">{aiResults.name}</div>
                        <div className="text-gray-300 text-sm">Recommended Route</div>
                      </div>
                      <div className="bg-blue-900/30 rounded-lg p-4">
                        <div className="text-blue-400 font-bold text-2xl">{Math.round(aiResults.confidence)}%</div>
                        <div className="text-gray-300 text-sm">AI Confidence</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                        <div className="text-yellow-400 font-bold">{aiResults.distance} km</div>
                        <div className="text-xs text-gray-400">Distance</div>
                      </div>
                      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                        <div className="text-green-400 font-bold">{aiResults.estimatedTime}h</div>
                        <div className="text-xs text-gray-400">Duration</div>
                      </div>
                      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                        <div className="text-purple-400 font-bold">KES {aiResults.fuelCost.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Fuel Cost</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-2">Route Insights</h4>
                      <div className="space-y-2">
                        {aiResults.aiInsights.map((insight, index) => (
                          <div key={index} className="text-sm text-gray-400 flex items-start gap-2">
                            <Lightbulb size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                            {insight}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {aiResults.estimatedSavings && (
                      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                          <DollarSign size={16} />
                          Estimated Savings
                        </h4>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <div className="text-green-400 font-bold">{Math.round(aiResults.estimatedSavings.time * 60)} min</div>
                            <div className="text-gray-400">Time Saved</div>
                          </div>
                          <div>
                            <div className="text-green-400 font-bold">KES {Math.round(aiResults.estimatedSavings.fuel).toLocaleString()}</div>
                            <div className="text-gray-400">Fuel Saved</div>
                          </div>
                          <div>
                            <div className="text-green-400 font-bold">KES {Math.round(aiResults.estimatedSavings.total).toLocaleString()}</div>
                            <div className="text-gray-400">Total Saved</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {aiResults.borderCrossing?.required && (
                      <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                          <Globe size={16} />
                          Border Crossing Information
                        </h4>
                        <div className="text-sm">
                          <p className="text-gray-300 mb-1">Border Points: {aiResults.borderCrossing.points.join(', ')}</p>
                          <p className="text-gray-300">Required Documents:</p>
                          <ul className="list-disc pl-5 text-gray-400">
                            {aiResults.borderCrossing.docsRequired.map((doc, idx) => (
                              <li key={idx}>{doc}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Kenyan Route Comparison Chart */}
            {kenyanRouteData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-xl border border-gray-700 p-6"
              >
                <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <BarChart3 size={20} />
                  Kenyan Corridor Performance
                </h3>
                <Bar
                  data={kenyanRouteData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { 
                        position: 'top',
                        labels: { color: '#9ca3af' }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#10b981',
                        bodyColor: '#fff'
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
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
            )}
          </motion.div>
        )}

        {/* Load Balancing Tab - Kenyan Focus */}
        {activeTab === 'load-balancing' && (
          <motion.div
            key="load-balancing"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <Truck size={20} />
                  Kenyan Fleet
                </h3>
                
                <div className="space-y-3">
                  {kenyanVehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-200">{vehicle.id}</div>
                          <div className="text-sm text-gray-400">{vehicle.type} • {vehicle.route}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold">{vehicle.capacity.toLocaleString()}kg</div>
                          <div className="text-xs text-gray-400">{vehicle.fuelEfficiency} km/l</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLoadBalancing}
                  disabled={isLoading}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain size={20} />
                      </motion.div>
                      Optimizing Kenyan Loads...
                    </>
                  ) : (
                    <>
                      <Play size={20} />
                      Balance Kenyan Loads
                    </>
                  )}
                </motion.button>
              </div>

              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Kenyan Shipments</h3>
                
                <div className="space-y-3">
                  {kenyanShipments.map(shipment => (
                    <div key={shipment.id} className="bg-gray-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-200">{shipment.id}</div>
                          <div className="text-sm text-gray-400">{shipment.origin} → {shipment.destination}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-yellow-400 font-bold">{shipment.weight.toLocaleString()}kg</div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            shipment.priority === 'high' ? 'bg-red-900/30 text-red-400' :
                            shipment.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                            'bg-green-900/30 text-green-400'
                          }`}>
                            {shipment.priority} priority
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{shipment.contents}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {loadBalanceData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-xl border border-gray-700 p-6"
              >
                <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <Target size={20} />
                  Load Balancing Results
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-emerald-900/30 rounded-lg p-4 text-center">
                    <div className="text-emerald-400 font-bold text-2xl">{Math.round(loadBalanceData.efficiency * 100)}%</div>
                    <div className="text-gray-300 text-sm">Load Efficiency</div>
                  </div>
                  <div className="bg-blue-900/30 rounded-lg p-4 text-center">
                    <div className="text-blue-400 font-bold text-2xl">KES {Math.round(loadBalanceData.costSavings || 2500).toLocaleString()}</div>
                    <div className="text-gray-300 text-sm">Cost Savings</div>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 text-center">
                    <div className="text-purple-400 font-bold text-2xl">{loadBalanceData.loadPlan?.length || 2}</div>
                    <div className="text-gray-300 text-sm">Vehicles Used</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-300 mb-3">Load Distribution Plan</h4>
                  <div className="space-y-4">
                    {loadBalanceData.loadPlan.map((plan, index) => (
                      <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                        <div className="font-medium text-gray-200 flex items-center gap-2">
                          <Truck size={16} />
                          {plan.vehicleId} • Utilization: {plan.utilization}
                        </div>
                        <div className="mt-2">
                          <div className="text-sm text-gray-400">Shipments:</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {plan.shipments.map((shipId, idx) => {
                              const shipment = kenyanShipments.find(s => s.id === shipId);
                              return shipment ? (
                                <div key={idx} className="text-xs bg-gray-600/50 px-2 py-1 rounded">
                                  {shipment.id} • {shipment.destination}
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Route: {plan.route}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-300 mb-3">Kenyan Logistics Recommendations</h4>
                  <div className="space-y-2">
                    {loadBalanceData.recommendations.map((rec, index) => (
                      <div key={index} className="text-sm text-gray-400 flex items-start gap-2">
                        <Lightbulb size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Predictive Maintenance Tab - Kenyan Focus */}
        {activeTab === 'predictive-maintenance' && (
          <motion.div
            key="predictive-maintenance"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {kenyanVehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <h4 className="font-bold text-gray-200 mb-3 flex items-center gap-2">
                    <Truck size={16} />
                    {vehicle.id}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-gray-200">{vehicle.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Route:</span>
                      <span className="text-gray-200">{vehicle.route}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Service:</span>
                      <span className="text-gray-200">{vehicle.lastService}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePredictiveMaintenance(vehicle.id)}
                    disabled={isLoading}
                    className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Brain size={16} />
                        </motion.div>
                        Analyzing Kenyan Vehicle...
                      </>
                    ) : (
                      <>
                        <Wrench size={16} />
                        Analyze Maintenance
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {maintenanceData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <Gauge size={20} />
                    Vehicle Health Analysis
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-3">Overall Health Score</h4>
                      <div className="relative">
                        <div className="w-32 h-32 mx-auto">
                          <Doughnut
                            data={{
                              labels: ['Health', 'Needs Attention'],
                              datasets: [{
                                data: [maintenanceData.overallScore, 100 - maintenanceData.overallScore],
                                backgroundColor: ['#10b981', '#ef4444'],
                                borderWidth: 0
                              }]
                            }}
                            options={{
                              cutout: '70%',
                              plugins: {
                                legend: { display: false },
                                tooltip: { enabled: false }
                              }
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className={`text-3xl font-bold ${
                              maintenanceData.overallScore >= 80 ? 'text-green-400' :
                              maintenanceData.overallScore >= 60 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {Math.round(maintenanceData.overallScore)}%
                            </div>
                            <div className="text-xs text-gray-400">Vehicle Health</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-300 mb-3">Component Health</h4>
                      <div className="space-y-3">
                        {Object.entries(maintenanceData.predictions).map(([component, data]) => (
                          <div key={component} className="bg-gray-700/30 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                              <span className="capitalize font-medium text-gray-300">{component}</span>
                              <span className={`font-bold ${
                                data.healthScore >= 80 ? 'text-green-400' :
                                data.healthScore >= 60 ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {Math.round(data.healthScore)}%
                              </span>
                            </div>
                            {data.issues.length > 0 && (
                              <div className="text-xs text-gray-400 mt-1">
                                Issues: {data.issues.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h4 className="font-semibold text-gray-300 mb-4 flex items-center gap-2">
                      <AlertTriangle size={18} />
                      Urgent Maintenance
                    </h4>
                    {maintenanceData.urgentItems.length > 0 ? (
                      <div className="space-y-3">
                        {maintenanceData.urgentItems.map((item, index) => (
                          <div key={index} className="bg-red-900/30 border border-red-700/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <AlertTriangle size={16} className="text-red-400" />
                              <span className="font-medium text-red-400 capitalize">{item.component}</span>
                            </div>
                            <div className="text-sm text-gray-300">
                              Health Score: {Math.round(item.healthScore)}%
                            </div>
                            {item.estimatedCost && (
                              <div className="text-sm text-gray-400">
                                Est. Cost: KES {item.estimatedCost.toLocaleString()}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-green-400 text-sm flex items-center gap-2">
                        <CheckCircle size={16} />
                        No urgent maintenance required
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                    <h4 className="font-semibold text-gray-300 mb-4 flex items-center gap-2">
                      <Lightbulb size={18} />
                      Maintenance Recommendations
                    </h4>
                    <div className="space-y-3">
                      {maintenanceData.recommendedActions.map((action, index) => (
                        <div key={index} className="text-sm text-gray-400 flex items-start gap-2">
                          <Lightbulb size={14} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                          {action}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                      <div className="text-blue-400 font-medium mb-1">Estimated Cost</div>
                      <div className="text-xl font-bold text-blue-300">
                        KES {maintenanceData.costEstimate.toLocaleString()}
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
                      <div className="text-emerald-400 font-medium mb-1">Recommended Kenyan Service Centers</div>
                      <div className="text-sm text-emerald-300">
                        {maintenanceData.scheduleSuggestion}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Kenya Insights Tab */}
        {activeTab === 'ai-insights' && (
          <motion.div
            key="ai-insights"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 rounded-xl border border-emerald-700/50 p-6">
                <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-2">
                  <TrendingUp size={18} />
                  Kenyan Route Efficiency
                </h4>
                <div className="text-3xl font-bold text-emerald-300 mb-2">89%</div>
                <div className="text-sm text-emerald-400">
                  ↗ 15% improvement over last quarter
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  AI algorithms optimizing Kenyan routes
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl border border-blue-700/50 p-6">
                <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <Activity size={18} />
                  Kenyan Load Optimization
                </h4>
                <div className="text-3xl font-bold text-blue-300 mb-2">94%</div>
                <div className="text-sm text-blue-400">
                  ↗ 12% capacity utilization increase
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Smart load balancing in Kenyan operations
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-900/30 to-red-800/20 rounded-xl border border-orange-700/50 p-6">
                <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                  <Wrench size={18} />
                  Kenyan Maintenance Savings
                </h4>
                <div className="text-3xl font-bold text-orange-300 mb-2">KES 2.8M</div>
                <div className="text-sm text-orange-400">
                  ↗ Saved through predictive maintenance
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Preventing breakdowns on Kenyan roads
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Brain size={20} />
                Kenyan Logistics Metrics
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Nairobi-Mombasa Fuel Cost</span>
                    <span className="text-emerald-400 font-bold">KES 18,500</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Average Kenyan Transit Time</span>
                    <span className="text-blue-400 font-bold">7.2 hrs</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Vehicle Utilization Rate</span>
                    <span className="text-purple-400 font-bold">87%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">On-Time Delivery Rate</span>
                    <span className="text-yellow-400 font-bold">93%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-400 h-2 rounded-full" style={{ width: '93%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Lightbulb size={20} />
                Kenyan Logistics Insights
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
                  <CheckCircle size={18} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-emerald-300">Nairobi-Mombasa Route Optimized</div>
                    <div className="text-sm text-gray-400 mt-1">
                      AI recommended bypassing Mai Mahiu during rush hours, saving 2.3 hours on average
                    </div>
                    <div className="text-xs text-emerald-400 mt-2">Implemented • 3 days ago</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
                  <Clock size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-300">Agricultural Shipments</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Schedule Nakuru-bound shipments before 6AM to avoid market traffic
                    </div>
                    <div className="text-xs text-blue-400 mt-2">Pending • 1 day ago</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-orange-900/20 border border-orange-700/50 rounded-lg">
                  <AlertTriangle size={18} className="text-orange-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-orange-300">Mombasa Port Congestion</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Expected delays at Mombasa Port next week - reroute shipments through alternative routes
                    </div>
                    <div className="text-xs text-orange-400 mt-2">Alert • 4 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg z-50 max-w-md ${
              toast.type === 'error' ? 'bg-red-600' :
              toast.type === 'info' ? 'bg-blue-600' :
              'bg-emerald-600'
            }`}
          >
            <div className="flex items-center gap-3 text-white">
              {toast.type === 'error' ? (
                <AlertTriangle size={20} />
              ) : toast.type === 'info' ? (
                <Brain size={20} />
              ) : (
                <CheckCircle size={20} />
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIDashboard;