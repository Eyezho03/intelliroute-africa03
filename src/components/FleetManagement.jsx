import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  User,
  MapPin,
  Calendar,
  Wrench
} from 'lucide-react';

const FleetManagement = () => {
  const [vehicles, setVehicles] = useState([]);

  const mockVehicles = [
    {
      id: 'KTN-001',
      driver: 'Kwame Asante',
      status: 'active',
      location: 'Lagos, Nigeria',
      fuelLevel: 85,
      nextMaintenance: '3 days',
      mileage: '45,230 km',
      lastService: '2024-01-15'
    },
    {
      id: 'NRB-205',
      driver: 'Aisha Mwangi',
      status: 'maintenance',
      location: 'Nairobi, Kenya',
      fuelLevel: 60,
      nextMaintenance: 'Overdue',
      mileage: '67,890 km',
      lastService: '2023-11-20'
    },
    {
      id: 'JHB-112',
      driver: 'Thabo Molefe',
      status: 'inactive',
      location: 'Johannesburg, SA',
      fuelLevel: 40,
      nextMaintenance: '1 week',
      mileage: '32,567 km',
      lastService: '2024-02-01'
    }
  ];

  useEffect(() => {
    setVehicles(mockVehicles);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'maintenance': return 'bg-red-100 text-red-600';
      case 'inactive': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
              <p className="text-gray-600">Monitor and manage your vehicle fleet</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.status === 'active').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Active Vehicles</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-red-600">
                {vehicles.filter(v => v.status === 'maintenance').length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium">Under Maintenance</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Fuel className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">78%</span>
            </div>
            <h3 className="text-gray-600 font-medium">Avg Fuel Level</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">95%</span>
            </div>
            <h3 className="text-gray-600 font-medium">Uptime</h3>
          </div>
        </motion.div>

        {/* Vehicles List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Vehicle Fleet</h2>
            <p className="text-gray-600">Overview of all vehicles in your fleet</p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${getStatusColor(vehicle.status)}`}>
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Vehicle {vehicle.id}</h3>
                        <p className="text-gray-600">Driver: {vehicle.driver}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-6 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold">{vehicle.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Fuel Level</p>
                        <p className="font-semibold">{vehicle.fuelLevel}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Maintenance</p>
                        <p className="font-semibold">{vehicle.nextMaintenance}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Mileage</p>
                        <p className="font-semibold">{vehicle.mileage}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Last Service</p>
                        <p className="font-semibold">{vehicle.lastService}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                        Manage
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FleetManagement;
