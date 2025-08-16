import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  MapPin,
  Clock,
  Package,
  Route,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Search,
  Filter,
  Calendar,
  Navigation,
  Users,
  DollarSign,
  BarChart3,
  RefreshCw,
  Phone,
  Mail,
  Star,
  ArrowRight,
  Zap,
  Globe,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

const ShipmentTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  useEffect(() => {
    // Simulate shipment data
    setShipments([
      {
        id: 'SC-2024-001',
        recipient: 'Lagos Medical Center',
        origin: 'Cairo Distribution Center',
        destination: 'Lagos, Nigeria',
        status: 'in_transit',
        priority: 'high',
        estimatedDelivery: '2024-01-09 14:30',
        actualDelivery: null,
        distance: '2,847 km',
        progress: 67,
        driver: {
          name: 'Ahmed Hassan',
          phone: '+234-901-234-5678',
          rating: 4.8,
          vehicle: 'Mercedes Actros - NIG-2024-TR'
        },
        cargo: {
          type: 'Medical Supplies',
          weight: '2,500 kg',
          value: '$45,000',
          packages: 156
        },
        timeline: [
          { status: 'picked_up', time: '2024-01-08 09:15', location: 'Cairo Distribution Center', completed: true },
          { status: 'in_transit', time: '2024-01-08 11:30', location: 'Border Crossing - Egypt/Sudan', completed: true },
          { status: 'customs_cleared', time: '2024-01-08 16:45', location: 'Khartoum Checkpoint', completed: true },
          { status: 'current', time: '2024-01-09 08:20', location: 'En route to Abuja', completed: false },
          { status: 'out_for_delivery', time: '2024-01-09 12:00', location: 'Lagos Distribution Hub', completed: false },
          { status: 'delivered', time: '2024-01-09 14:30', location: 'Lagos Medical Center', completed: false }
        ],
        alerts: [
          { type: 'info', message: 'Vehicle passed through customs successfully' },
          { type: 'warning', message: 'Expected 2-hour delay due to traffic congestion' }
        ]
      },
      {
        id: 'SC-2024-002',
        recipient: 'TechHub Nairobi',
        origin: 'Cape Town Facility',
        destination: 'Nairobi, Kenya',
        status: 'delivered',
        priority: 'medium',
        estimatedDelivery: '2024-01-08 16:00',
        actualDelivery: '2024-01-08 15:45',
        distance: '3,421 km',
        progress: 100,
        driver: {
          name: 'Sarah Mwangi',
          phone: '+254-712-345-678',
          rating: 4.9,
          vehicle: 'Volvo FH16 - KEN-2024-DL'
        },
        cargo: {
          type: 'Electronics',
          weight: '1,200 kg',
          value: '$28,500',
          packages: 89
        },
        timeline: [
          { status: 'picked_up', time: '2024-01-06 10:00', location: 'Cape Town Facility', completed: true },
          { status: 'in_transit', time: '2024-01-06 14:30', location: 'Johannesburg Hub', completed: true },
          { status: 'customs_cleared', time: '2024-01-07 09:15', location: 'Border - South Africa/Zimbabwe', completed: true },
          { status: 'in_transit', time: '2024-01-07 18:20', location: 'Harare Transit', completed: true },
          { status: 'out_for_delivery', time: '2024-01-08 12:30', location: 'Nairobi Distribution', completed: true },
          { status: 'delivered', time: '2024-01-08 15:45', location: 'TechHub Nairobi', completed: true }
        ],
        alerts: []
      },
      {
        id: 'SC-2024-003',
        recipient: 'Accra Food Distributors',
        origin: 'Lagos Central',
        destination: 'Accra, Ghana',
        status: 'delayed',
        priority: 'high',
        estimatedDelivery: '2024-01-08 18:00',
        actualDelivery: null,
        distance: '567 km',
        progress: 45,
        driver: {
          name: 'Kwame Asante',
          phone: '+233-244-567-890',
          rating: 4.6,
          vehicle: 'DAF XF - GHA-2024-FD'
        },
        cargo: {
          type: 'Food & Beverages',
          weight: '5,800 kg',
          value: '$18,200',
          packages: 234
        },
        timeline: [
          { status: 'picked_up', time: '2024-01-08 06:00', location: 'Lagos Central', completed: true },
          { status: 'in_transit', time: '2024-01-08 08:30', location: 'Benin City', completed: true },
          { status: 'delayed', time: '2024-01-08 14:20', location: 'Border - Nigeria/Benin', completed: true },
          { status: 'customs_processing', time: '2024-01-09 10:15', location: 'Border Checkpoint', completed: false },
          { status: 'out_for_delivery', time: 'Pending', location: 'Accra Hub', completed: false },
          { status: 'delivered', time: 'Pending', location: 'Accra Food Distributors', completed: false }
        ],
        alerts: [
          { type: 'error', message: 'Vehicle breakdown - mechanical issue resolved' },
          { type: 'warning', message: 'Customs documentation under review' }
        ]
      },
      {
        id: 'SC-2024-004',
        recipient: 'Cairo Auto Parts',
        origin: 'Nairobi Hub',
        destination: 'Cairo, Egypt',
        status: 'pending',
        priority: 'low',
        estimatedDelivery: '2024-01-12 10:00',
        actualDelivery: null,
        distance: '1,642 km',
        progress: 0,
        driver: {
          name: 'Omar Ibrahim',
          phone: '+20-100-123-4567',
          rating: 4.7,
          vehicle: 'MAN TGX - EGY-2024-CP'
        },
        cargo: {
          type: 'Automotive Parts',
          weight: '3,200 kg',
          value: '$67,800',
          packages: 45
        },
        timeline: [
          { status: 'scheduled', time: '2024-01-10 08:00', location: 'Nairobi Hub', completed: false },
          { status: 'picked_up', time: 'Scheduled', location: 'Nairobi Hub', completed: false },
          { status: 'in_transit', time: 'Pending', location: 'Route to Cairo', completed: false },
          { status: 'customs_cleared', time: 'Pending', location: 'Border Crossing', completed: false },
          { status: 'out_for_delivery', time: 'Pending', location: 'Cairo Distribution', completed: false },
          { status: 'delivered', time: 'Pending', location: 'Cairo Auto Parts', completed: false }
        ],
        alerts: []
      }
    ]);

    // Simulate real-time updates
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        setShipments(prev => prev.map(shipment => {
          if (shipment.status === 'in_transit' && shipment.progress < 100) {
            return {
              ...shipment,
              progress: Math.min(shipment.progress + Math.random() * 2, 100)
            };
          }
          return shipment;
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [realTimeUpdates]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'in_transit':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'delayed':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return CheckCircle;
      case 'in_transit':
        return Truck;
      case 'delayed':
        return AlertTriangle;
      case 'pending':
        return Clock;
      default:
        return Package;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: shipments.length,
    in_transit: shipments.filter(s => s.status === 'in_transit').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
    delayed: shipments.filter(s => s.status === 'delayed').length,
    pending: shipments.filter(s => s.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Shipment Tracking</h2>
          <p className="text-gray-400 mt-1">Monitor and manage shipments across Africa in real-time</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              realTimeUpdates 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white'
            }`}
          >
            {realTimeUpdates ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{realTimeUpdates ? 'Live Updates' : 'Start Live'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
            <Route className="h-4 w-4" />
            <span>Optimize Routes</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count], index) => (
          <motion.button
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setStatusFilter(status)}
            className={`p-4 rounded-xl border transition-all text-left ${
              statusFilter === status
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-gray-600'
            }`}
          >
            <div className="text-2xl font-bold text-white">{count}</div>
            <div className="text-sm capitalize">{status.replace('_', ' ')}</div>
          </motion.button>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by shipment ID, recipient, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white rounded-lg transition-all">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </motion.div>

      {/* Shipments List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredShipments.map((shipment, index) => {
          const StatusIcon = getStatusIcon(shipment.status);
          
          return (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-emerald-500/30 transition-all cursor-pointer"
              onClick={() => setSelectedShipment(selectedShipment?.id === shipment.id ? null : shipment)}
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                    <StatusIcon className={`h-6 w-6 ${getStatusColor(shipment.status).split(' ')[0]}`} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-white">{shipment.id}</h3>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(shipment.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{shipment.status.replace('_', ' ')}</span>
                      </div>
                      <Star className={`h-4 w-4 ${getPriorityColor(shipment.priority)}`} />
                    </div>
                    <p className="text-gray-400 mt-1">{shipment.recipient}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{shipment.estimatedDelivery}</div>
                  <div className="text-gray-400 text-sm">ETA</div>
                </div>
              </div>

              {/* Route Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="text-white text-sm">From</div>
                    <div className="text-gray-400 text-xs">{shipment.origin}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Navigation className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white text-sm">To</div>
                    <div className="text-gray-400 text-xs">{shipment.destination}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Route className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="text-white text-sm">{shipment.distance}</div>
                    <div className="text-gray-400 text-xs">Total Distance</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progress</span>
                  <span className="text-sm text-white font-medium">{Math.round(shipment.progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      shipment.status === 'delivered' ? 'bg-green-500' :
                      shipment.status === 'delayed' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${shipment.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Cargo & Driver Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Package className="h-4 w-4 mr-2 text-emerald-400" />
                    Cargo Details
                  </h4>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div>Type: {shipment.cargo.type}</div>
                    <div>Weight: {shipment.cargo.weight}</div>
                    <div>Value: {shipment.cargo.value}</div>
                    <div>Packages: {shipment.cargo.packages}</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-400" />
                    Driver Info
                  </h4>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div>Name: {shipment.driver.name}</div>
                    <div className="flex items-center space-x-2">
                      <span>Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-white ml-1">{shipment.driver.rating}</span>
                      </div>
                    </div>
                    <div>Vehicle: {shipment.driver.vehicle}</div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>{shipment.driver.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {shipment.alerts.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
                    Recent Alerts
                  </h4>
                  <div className="space-y-2">
                    {shipment.alerts.map((alert, alertIndex) => (
                      <div
                        key={alertIndex}
                        className={`p-3 rounded-lg border text-sm ${
                          alert.type === 'error' ? 'bg-red-900/20 border-red-500/30 text-red-200' :
                          alert.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500/30 text-yellow-200' :
                          'bg-blue-900/20 border-blue-500/30 text-blue-200'
                        }`}
                      >
                        {alert.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Expanded Timeline */}
              {selectedShipment?.id === shipment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-700 pt-4 mt-4"
                >
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-purple-400" />
                    Shipment Timeline
                  </h4>
                  <div className="space-y-3">
                    {shipment.timeline.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-start space-x-4">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          event.completed ? 'bg-green-400' : 'bg-gray-600'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${
                              event.completed ? 'text-white' : 'text-gray-400'
                            }`}>
                              {event.status.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500">{event.time}</span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1">{event.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-4">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-all">
                    <Eye className="h-4 w-4" />
                    <span>Track Live</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white rounded-lg text-sm transition-all">
                    <Phone className="h-4 w-4" />
                    <span>Contact Driver</span>
                  </button>
                </div>
                <button className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center space-x-1">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredShipments.length === 0 && (
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-12 text-center">
          <Truck className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No shipments found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ShipmentTracking;
