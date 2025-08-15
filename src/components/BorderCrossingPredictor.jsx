import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flag, Clock, TrendingUp, Brain, MapPin, AlertTriangle, 
  CheckCircle, Users, FileText, Activity, Zap, Route, 
  Eye, Timer, Truck, ChevronDown, ChevronUp, Globe, 
  BarChart2, RefreshCw, Download, BookOpen, Shield, 
  HardHat, Scale, File, AlertOctagon, ArrowRight
} from 'lucide-react';

const BorderCrossingPredictor = () => {
  const [borderData, setBorderData] = useState([
    {
      id: 1,
      name: 'Busia Border (Kenya-Uganda)',
      countries: ['Kenya', 'Uganda'],
      flag: '🇰🇪↔️🇺🇬',
      currentDelay: '45 minutes',
      predictedDelay: '1.1 hours',
      confidence: 93,
      queueLength: 67,
      processingRate: '18 vehicles/hour',
      documentation: 'Expedited',
      riskLevel: 'low',
      coordinates: { lat: 0.4606, lng: 34.0922 },
      operatingHours: '6:00 AM - 10:00 PM',
      averageProcessingTime: '12 minutes',
      peakHours: '2:00 PM - 6:00 PM',
      facilityStatus: 'Operational',
      trucksInQueue: 31,
      carsInQueue: 36,
      commercialLanes: 3,
      privateLanes: 4,
      temperature: '28°C',
      humidity: '65%',
      roadConditions: 'Good',
      borderFees: {
        truck: 'KES 12,500',
        car: 'KES 3,200',
        bus: 'KES 8,700'
      },
      documentationRequired: ['Passport', 'Vehicle Logbook', 'COVID Certificate', 'Customs Declaration'],
      alerts: ['Increased agricultural inspections', 'Roadworks on A104 approaching border']
    },
    {
      id: 2,
      name: 'Namanga Border (Kenya-Tanzania)',
      countries: ['Kenya', 'Tanzania'],
      flag: '🇰🇪↔️🇹🇿',
      currentDelay: '1.8 hours',
      predictedDelay: '2.3 hours',
      confidence: 85,
      queueLength: 142,
      processingRate: '14 vehicles/hour',
      documentation: 'Standard',
      riskLevel: 'medium',
      coordinates: { lat: -2.5533, lng: 36.7906 },
      operatingHours: '6:00 AM - 6:00 PM',
      averageProcessingTime: '15 minutes',
      peakHours: '10:00 AM - 2:00 PM',
      facilityStatus: 'Operational',
      trucksInQueue: 98,
      carsInQueue: 44,
      commercialLanes: 4,
      privateLanes: 3,
      temperature: '32°C',
      humidity: '55%',
      roadConditions: 'Moderate',
      borderFees: {
        truck: 'KES 15,000',
        car: 'KES 4,500',
        bus: 'KES 10,000'
      },
      documentationRequired: ['Passport', 'Vehicle Insurance', 'Yellow Fever Certificate', 'Cargo Manifest'],
      alerts: ['New customs system implementation', 'Temporary lane closures']
    },
    {
      id: 3,
      name: 'Malaba Border (Kenya-Uganda)',
      countries: ['Kenya', 'Uganda'],
      flag: '🇰🇪↔️🇺🇬',
      currentDelay: '1.2 hours',
      predictedDelay: '1.8 hours',
      confidence: 88,
      queueLength: 89,
      processingRate: '16 vehicles/hour',
      documentation: 'Expedited',
      riskLevel: 'low',
      coordinates: { lat: 0.6321, lng: 34.2708 },
      operatingHours: '24/7',
      averageProcessingTime: '14 minutes',
      peakHours: '3:00 PM - 7:00 PM',
      facilityStatus: 'Operational',
      trucksInQueue: 57,
      carsInQueue: 32,
      commercialLanes: 3,
      privateLanes: 4,
      temperature: '30°C',
      humidity: '60%',
      roadConditions: 'Good',
      borderFees: {
        truck: 'KES 11,800',
        car: 'KES 3,500',
        bus: 'KES 9,200'
      },
      documentationRequired: ['Passport', 'Vehicle Registration', 'COVID Certificate', 'Goods Declaration'],
      alerts: ['New weighbridge installed', 'Increased security checks']
    },
    {
      id: 4,
      name: 'Isebania Border (Kenya-Tanzania)',
      countries: ['Kenya', 'Tanzania'],
      flag: '🇰🇪↔️🇹🇿',
      currentDelay: '2.5 hours',
      predictedDelay: '3.0 hours',
      confidence: 79,
      queueLength: 124,
      processingRate: '12 vehicles/hour',
      documentation: 'Standard',
      riskLevel: 'medium',
      coordinates: { lat: -1.2200, lng: 34.4800 },
      operatingHours: '7:00 AM - 7:00 PM',
      averageProcessingTime: '18 minutes',
      peakHours: '9:00 AM - 1:00 PM',
      facilityStatus: 'Operational',
      trucksInQueue: 86,
      carsInQueue: 38,
      commercialLanes: 2,
      privateLanes: 3,
      temperature: '29°C',
      humidity: '68%',
      roadConditions: 'Poor',
      borderFees: {
        truck: 'KES 13,500',
        car: 'KES 4,000',
        bus: 'KES 9,500'
      },
      documentationRequired: ['Passport', 'Vehicle Logbook', 'Cargo Manifest', 'TIN Certificate'],
      alerts: ['Flooding on approach roads', 'Customs system upgrade in progress']
    }
  ]);
  
  const [selectedBorder, setSelectedBorder] = useState(null);
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [documentationModal, setDocumentationModal] = useState(null);
  const [aiInsights, setAiInsights] = useState(false);

  // Simulate live updates for border crossings
  useEffect(() => {
    if (!liveUpdates) return;

    const interval = setInterval(() => {
      setBorderData(prev => prev.map(border => {
        const change = Math.floor(Math.random() * 20 - 10);
        const newQueue = Math.max(10, border.queueLength + change);
        const delayChange = (Math.random() * 0.8 - 0.4);
        const newDelay = Math.max(0.2, parseFloat(border.currentDelay) + delayChange);
        
        return {
          ...border,
          queueLength: newQueue,
          currentDelay: `${newDelay.toFixed(1)} hours`,
          confidence: Math.max(60, Math.min(95, border.confidence + Math.floor(Math.random() * 10 - 5))),
          trucksInQueue: Math.max(5, border.trucksInQueue + Math.floor(Math.random() * 15 - 7)),
          carsInQueue: Math.max(5, border.carsInQueue + Math.floor(Math.random() * 10 - 5))
        };
      }));
    }, 25000);

    return () => clearInterval(interval);
  }, [liveUpdates]);

  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const borderSummary = {
    totalBorders: borderData.length,
    highRisk: borderData.filter(b => b.riskLevel === 'high').length,
    avgDelay: (borderData.reduce((sum, b) => sum + parseFloat(b.currentDelay), 0) / borderData.length).toFixed(1),
    totalQueued: borderData.reduce((sum, b) => sum + b.queueLength, 0),
    efficiency: (borderData.reduce((sum, b) => sum + parseInt(b.processingRate), 0) / borderData.length).toFixed(0)
  };

  // Filter borders based on active tab
  const filteredBorders = activeTab === 'all' 
    ? borderData 
    : borderData.filter(border => border.riskLevel === activeTab);

  // Documentation modal content
  const renderDocumentationModal = () => {
    if (!documentationModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">
                <File className="inline mr-2" />
                Documentation for {documentationModal.name}
              </h3>
              <button 
                onClick={() => setDocumentationModal(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-400" />
                  Required Documents
                </h4>
                <ul className="space-y-2">
                  {documentationModal.documentationRequired.map((doc, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-yellow-400" />
                  Border Fees (KES)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(documentationModal.borderFees).map(([type, fee]) => (
                    <div key={type} className="bg-gray-700/50 rounded-lg p-3">
                      <div className="font-medium text-gray-300 capitalize">{type}</div>
                      <div className="text-white font-bold">{fee}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <AlertOctagon className="h-5 w-5 mr-2 text-red-400" />
                  Important Notes
                </h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>• All documents must be original copies</p>
                  <p>• Vehicle insurance must be valid for East Africa region</p>
                  <p>• COVID certificates must be issued within 72 hours</p>
                  <p>• Commercial vehicles require additional clearance from KRA</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                onClick={() => {
                  // Handle document download
                  alert(`Downloading documentation for ${documentationModal.name}`);
                  setDocumentationModal(null);
                }}
              >
                <Download className="h-4 w-4" />
                Download Checklist
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Globe className="mr-2 text-emerald-400" />
            Kenya Border Crossing Intelligence
          </h2>
          <p className="text-gray-400 mt-1">AI-powered predictions for Kenya's major border crossings</p>
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
            <span>Live Tracking</span>
          </button>
          <button 
            onClick={() => setAiInsights(!aiInsights)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            <Brain className="h-4 w-4" />
            <span>{aiInsights ? 'Hide Insights' : 'AI Insights'}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Flag className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{borderSummary.totalBorders}</h3>
            <p className="text-gray-400 text-sm">Kenyan Borders</p>
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
            <h3 className="text-2xl font-bold text-white">{borderSummary.highRisk}</h3>
            <p className="text-gray-400 text-sm">High Risk Borders</p>
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
              <Timer className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{borderSummary.avgDelay}h</h3>
            <p className="text-gray-400 text-sm">Average Delay</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Truck className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{borderSummary.efficiency}/hr</h3>
            <p className="text-gray-400 text-sm">Avg Processing Rate</p>
          </div>
        </motion.div>
      </div>

      {/* Risk Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-700 pb-4">
        {['all', 'low', 'medium', 'high'].map(risk => (
          <button
            key={risk}
            onClick={() => setActiveTab(risk)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === risk
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {risk === 'all' ? 'All Borders' : `${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk`}
          </button>
        ))}
      </div>
      
      {/* AI Insights Panel */}
      {aiInsights && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gray-800/50 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-emerald-400 flex items-center">
              <Brain className="mr-2" />
              AI Logistics Insights
            </h3>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <BarChart2 className="mr-2 text-blue-400" />
                Optimal Crossing Times
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between">
                  <span>Busia Border:</span>
                  <span className="text-white">9:00 AM - 11:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Namanga Border:</span>
                  <span className="text-white">7:00 AM - 9:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Malaba Border:</span>
                  <span className="text-white">10:00 AM - 12:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Isebania Border:</span>
                  <span className="text-white">3:00 PM - 5:00 PM</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <AlertTriangle className="mr-2 text-yellow-400" />
                Risk Predictions
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between">
                  <span>Namanga:</span>
                  <span className="text-yellow-400">Customs system upgrade delays</span>
                </li>
                <li className="flex justify-between">
                  <span>Isebania:</span>
                  <span className="text-red-400">Road condition deterioration</span>
                </li>
                <li className="flex justify-between">
                  <span>Malaba:</span>
                  <span className="text-green-400">Efficiency improvements detected</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-900/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center">
                <Route className="mr-2 text-purple-400" />
                Route Recommendations
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <div className="text-white">Nairobi to Kampala:</div>
                  <div className="flex items-center text-sm">
                    <ArrowRight className="h-4 w-4 mr-1 text-emerald-400" />
                    Prefer Busia over Malaba for afternoon crossings
                  </div>
                </li>
                <li>
                  <div className="text-white">Mombasa to Dar es Salaam:</div>
                  <div className="flex items-center text-sm">
                    <ArrowRight className="h-4 w-4 mr-1 text-emerald-400" />
                    Use Isebania but expect delays before 10AM
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Border Crossing Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredBorders.map((border, index) => (
          <motion.div
            key={border.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all"
          >
            {/* Border Header */}
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setSelectedBorder(selectedBorder?.id === border.id ? null : border)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-xl">
                    {border.flag}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{border.name}</h3>
                    <p className="text-gray-400 flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{border.countries.join(' ↔ ')}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm border ${getRiskColor(border.riskLevel)}`}>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    <span className="capitalize">{border.riskLevel} Risk</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {selectedBorder?.id === border.id ? (
                      <span className="flex items-center">
                        Hide details <ChevronUp className="ml-1 h-4 w-4" />
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Show details <ChevronDown className="ml-1 h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white text-sm font-medium">{border.currentDelay}</div>
                    <div className="text-gray-400 text-xs">Current Wait</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="h-5 w-5 text-emerald-400" />
                  <div>
                    <div className="text-white text-sm font-medium">{border.predictedDelay}</div>
                    <div className="text-gray-400 text-xs">AI Prediction</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="text-white text-sm font-medium">{border.confidence}%</div>
                    <div className="text-gray-400 text-xs">Confidence</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-yellow-400" />
                  <div>
                    <div className="text-white text-sm font-medium">{border.queueLength}</div>
                    <div className="text-gray-400 text-xs">In Queue</div>
                  </div>
                </div>
              </div>

              {/* Processing Rate Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Processing Efficiency</span>
                  <span className="text-sm text-white font-medium">{border.processingRate}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full transition-all ${
                      parseInt(border.processingRate) > 15 ? 'bg-green-500' :
                      parseInt(border.processingRate) > 10 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (parseInt(border.processingRate) / 20) * 100)}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedBorder?.id === border.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-gray-700 px-6 pt-4 pb-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-900/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-emerald-400" />
                        Facility Details
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-gray-400 text-sm">Operating Hours</div>
                          <div className="text-white">{border.operatingHours}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Avg Processing Time</div>
                          <div className="text-white">{border.averageProcessingTime}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Peak Hours</div>
                          <div className="text-white">{border.peakHours}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Status</div>
                          <div className={`${border.facilityStatus === 'Operational' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {border.facilityStatus}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Temperature</div>
                          <div className="text-white">{border.temperature}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Road Conditions</div>
                          <div className="text-white">{border.roadConditions}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
                        Current Alerts
                      </h4>
                      <ul className="space-y-2">
                        {border.alerts.map((alert, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-1.5 mr-2"></div>
                            {alert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-blue-400" />
                        Queue Breakdown
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-400 text-sm">Commercial Trucks</div>
                          <div className="text-white text-xl font-bold">{border.trucksInQueue}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Private Vehicles</div>
                          <div className="text-white text-xl font-bold">{border.carsInQueue}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Commercial Lanes</div>
                          <div className="text-white text-xl font-bold">{border.commercialLanes}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Private Lanes</div>
                          <div className="text-white text-xl font-bold">{border.privateLanes}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <HardHat className="h-5 w-5 mr-2 text-orange-400" />
                        Infrastructure Status
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-gray-400 text-sm">Weighbridges</div>
                          <div className="text-white">Operational</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Scanners</div>
                          <div className="text-white">2/3 Operational</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Parking Capacity</div>
                          <div className="text-white">85% Full</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Connectivity</div>
                          <div className="text-white">Stable</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Opening live view for ${border.name}`)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span>Live Camera Feed</span>
                    </button>
                    <button 
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Setting alert for ${border.name}`)
                      }}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>Set Delay Alert</span>
                    </button>
                    <button 
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDocumentationModal(border);
                      }}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Documentation</span>
                    </button>
                  </div>
                  <div className="text-emerald-400 text-sm">
                    📊 {Math.floor(Math.random() * 30 + 10)} predictions/hour
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* ML Model Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Brain className="mr-2 h-5 w-5 text-emerald-400" />
            Kenya Border Prediction Model
          </h3>
          <div className="text-emerald-400">Accuracy: 92.4%</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">Kenya Revenue Authority API</span>
            </div>
            <span className="text-green-400 text-sm">Live</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">Traffic Camera Analysis</span>
            </div>
            <span className="text-green-400 text-sm">92% Accuracy</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-white">Weather Integration</span>
            </div>
            <span className="text-yellow-400 text-sm">In Development</span>
          </div>
        </div>
      </motion.div>
      
      {renderDocumentationModal()}
    </div>
  );
};

export default BorderCrossingPredictor;