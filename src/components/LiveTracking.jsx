import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Truck,
  Clock,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Eye,
  RefreshCw,
  Zap,
  Radio,
  Thermometer,
  Battery
} from 'lucide-react';

const LiveTracking = () => {
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const mockShipments = [
    {
      id: 'SH2024001',
      destination: 'Accra, Ghana',
      origin: 'Lagos, Nigeria',
      driver: 'Kwame Asante',
      vehicle: 'KTN-001',
      status: 'in_transit',
      progress: 65,
      estimatedArrival: '2h 45m',
      lastUpdate: '2 minutes ago',
      temperature: '18°C',
      batteryLevel: 89,
      coordinates: { lat: 6.5244, lng: 3.3792 }
    },
    {
      id: 'SH2024002',
      destination: 'Mombasa, Kenya',
      origin: 'Nairobi, Kenya',
      driver: 'Aisha Mwangi',
      vehicle: 'NRB-205',
      status: 'delivered',
      progress: 100,
      estimatedArrival: 'Delivered',
      lastUpdate: '1 hour ago',
      temperature: '22°C',
      batteryLevel: 94,
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    {
      id: 'SH2024003',
      destination: 'Durban, South Africa',
      origin: 'Johannesburg, South Africa',
      driver: 'Thabo Molefe',
      vehicle: 'JHB-112',
      status: 'delayed',
      progress: 45,
      estimatedArrival: '5h 20m (Delayed)',
      lastUpdate: '15 minutes ago',
      temperature: '20°C',
      batteryLevel: 67,
      coordinates: { lat: -26.2041, lng: 28.0473 }
    },
    {
      id: 'SH2024004',
      destination: 'Casablanca, Morocco',
      origin: 'Cairo, Egypt',
      driver: 'Ahmed Hassan',
      vehicle: 'CAI-089',
      status: 'loading',
      progress: 5,
      estimatedArrival: '18h 30m',
      lastUpdate: '5 minutes ago',
      temperature: '25°C',
      batteryLevel: 100,
      coordinates: { lat: 30.0444, lng: 31.2357 }
    }
  ];

  useEffect(() => {
    setShipments(mockShipments);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-600';
      case 'delivered':
        return 'bg-green-100 text-green-600';
      case 'delayed':
        return 'bg-red-100 text-red-600';
      case 'loading':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_transit':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'delayed':
        return <AlertTriangle className="w-4 h-4" />;
      case 'loading':
        return <Clock className="w-4 h-4" />;
      default:
        return <Navigation className="w-4 h-4" />;
    }
  };

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setShipments(prev => prev.map(shipment => ({
        ...shipment,
        lastUpdate: 'Just now',
        batteryLevel: Math.max(shipment.batteryLevel - Math.random() * 5, 20),
        progress: shipment.status === 'in_transit' 
          ? Math.min(shipment.progress + Math.random() * 10, 95)
          : shipment.progress
      })));
      setRefreshing(false);
    }, 1500);
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
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                <Radio className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Live Tracking</h1>
                <p className="text-gray-600">Real-time shipment monitoring and tracking</p>
              </div>
            </div>
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {shipments.filter(s => s.status === 'in_transit').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">In Transit</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">
                {shipments.filter(s => s.status === 'delivered').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Delivered Today</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-red-600">
                {shipments.filter(s => s.status === 'delayed').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Delayed</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Navigation className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {shipments.length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Total Active</h3>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipments List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Active Shipments</h2>
              <p className="text-gray-600">Monitor all your shipments in real-time</p>
            </div>

            <div className="p-6 space-y-4">
              {shipments.map((shipment, index) => (
                <motion.div
                  key={shipment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer ${
                    selectedShipment?.id === shipment.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedShipment(shipment)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getStatusColor(shipment.status)}`}>
                        {getStatusIcon(shipment.status)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Shipment #{shipment.id}
                        </h3>
                        <p className="text-gray-600">
                          {shipment.origin} → {shipment.destination}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                      {shipment.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">{shipment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${shipment.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Driver</p>
                      <p className="font-medium">{shipment.driver}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Vehicle</p>
                      <p className="font-medium">{shipment.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">ETA</p>
                      <p className="font-medium">{shipment.estimatedArrival}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Update</p>
                      <p className="font-medium">{shipment.lastUpdate}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Shipment Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Shipment Details</h2>
              <p className="text-gray-600">
                {selectedShipment ? `Tracking ${selectedShipment.id}` : 'Select a shipment to view details'}
              </p>
            </div>

            {selectedShipment ? (
              <div className="p-6 space-y-6">
                {/* Status Overview */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(selectedShipment.status)}`}>
                      {getStatusIcon(selectedShipment.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold">Current Status</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {selectedShipment.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div>
                  <h4 className="font-semibold mb-3">Route Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Origin</p>
                        <p className="font-medium">{selectedShipment.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="font-medium">{selectedShipment.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Telemetry */}
                <div>
                  <h4 className="font-semibold mb-3">Vehicle Telemetry</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-semibold">{selectedShipment.temperature}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Battery Level</span>
                      </div>
                      <span className="font-semibold">{selectedShipment.batteryLevel}%</span>
                    </div>
                  </div>
                </div>

                {/* Driver Information */}
                <div>
                  <h4 className="font-semibold mb-3">Driver Information</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">{selectedShipment.driver}</p>
                    <p className="text-sm text-gray-600">Vehicle: {selectedShipment.vehicle}</p>
                    <p className="text-sm text-gray-600">Last contact: {selectedShipment.lastUpdate}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View on Map
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Contact Driver
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Radio className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a shipment from the list to view detailed tracking information.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Real-time Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Real-time Alerts</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-lg font-semibold mb-1">Traffic Alert</p>
              <p className="text-orange-100">Heavy traffic detected on Lagos-Ibadan route. ETA updated automatically.</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Weather Update</p>
              <p className="text-orange-100">Rain expected in Accra region. Drivers notified to exercise caution.</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Delivery Complete</p>
              <p className="text-orange-100">Shipment SH2024002 successfully delivered to Mombasa port.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveTracking;
