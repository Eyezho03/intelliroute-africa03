import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Route,
  Calendar,
  Clock,
  MapPin,
  Truck,
  User,
  Plus,
  Trash2,
  Navigation,
  Zap
} from 'lucide-react';

const ScheduleRoute = () => {
  const [routeData, setRouteData] = useState({
    routeName: '',
    vehicle: '',
    driver: '',
    scheduledDate: '',
    startTime: '',
    estimatedDuration: '',
    priority: 'standard'
  });

  const [waypoints, setWaypoints] = useState([
    { id: 1, address: '', type: 'pickup', customerName: '', timeWindow: '' },
    { id: 2, address: '', type: 'delivery', customerName: '', timeWindow: '' }
  ]);

  const addWaypoint = () => {
    const newWaypoint = {
      id: Date.now(),
      address: '',
      type: 'delivery',
      customerName: '',
      timeWindow: ''
    };
    setWaypoints([...waypoints, newWaypoint]);
  };

  const removeWaypoint = (id) => {
    setWaypoints(waypoints.filter(wp => wp.id !== id));
  };

  const updateWaypoint = (id, field, value) => {
    setWaypoints(waypoints.map(wp => 
      wp.id === id ? { ...wp, [field]: value } : wp
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Scheduled route:', { routeData, waypoints });
  };

  const vehicles = [
    { id: 'KTN-001', name: 'Vehicle KTN-001', driver: 'Kwame Asante' },
    { id: 'NRB-205', name: 'Vehicle NRB-205', driver: 'Aisha Mwangi' },
    { id: 'JHB-112', name: 'Vehicle JHB-112', driver: 'Thabo Molefe' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
              <Route className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Schedule Route</h1>
              <p className="text-gray-600">Plan and optimize delivery routes with AI assistance</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Route Planning</h2>
            <p className="text-gray-600">Configure your delivery route with multiple stops</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Route Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-500" />
                Route Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={routeData.routeName}
                    onChange={(e) => setRouteData({...routeData, routeName: e.target.value})}
                    placeholder="Enter route name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={routeData.priority}
                    onChange={(e) => setRouteData({...routeData, priority: e.target.value})}
                  >
                    <option value="standard">Standard</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle & Driver Assignment */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" />
                Vehicle Assignment
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Vehicle *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={routeData.vehicle}
                    onChange={(e) => {
                      const selectedVehicle = vehicles.find(v => v.id === e.target.value);
                      setRouteData({
                        ...routeData, 
                        vehicle: e.target.value,
                        driver: selectedVehicle?.driver || ''
                      });
                    }}
                  >
                    <option value="">Select vehicle</option>
                    {vehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name} - {vehicle.driver}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Driver
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    value={routeData.driver}
                    disabled
                    placeholder="Auto-assigned with vehicle"
                  />
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Schedule Details
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={routeData.scheduledDate}
                    onChange={(e) => setRouteData({...routeData, scheduledDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={routeData.startTime}
                    onChange={(e) => setRouteData({...routeData, startTime: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Est. Duration (hours)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={routeData.estimatedDuration}
                    onChange={(e) => setRouteData({...routeData, estimatedDuration: e.target.value})}
                    placeholder="0.0"
                  />
                </div>
              </div>
            </div>

            {/* Waypoints/Stops */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Route Waypoints
                </h3>
                <button
                  type="button"
                  onClick={addWaypoint}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Stop
                </button>
              </div>

              <div className="space-y-4">
                {waypoints.map((waypoint, index) => (
                  <motion.div
                    key={waypoint.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        Stop #{index + 1}
                      </h4>
                      {waypoints.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeWaypoint(waypoint.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Stop Type
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          value={waypoint.type}
                          onChange={(e) => updateWaypoint(waypoint.id, 'type', e.target.value)}
                        >
                          <option value="pickup">Pickup</option>
                          <option value="delivery">Delivery</option>
                          <option value="waypoint">Waypoint</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Customer/Location
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          value={waypoint.customerName}
                          onChange={(e) => updateWaypoint(waypoint.id, 'customerName', e.target.value)}
                          placeholder="Customer name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          value={waypoint.address}
                          onChange={(e) => updateWaypoint(waypoint.id, 'address', e.target.value)}
                          placeholder="Enter address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Time Window
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                          value={waypoint.timeWindow}
                          onChange={(e) => updateWaypoint(waypoint.id, 'timeWindow', e.target.value)}
                          placeholder="e.g., 9-12 AM"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Route className="w-5 h-5" />
                Create Scheduled Route
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                AI Optimize
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Save Draft
              </button>
            </div>
          </form>
        </motion.div>

        {/* Route Optimization Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">AI Route Optimization</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-lg font-semibold mb-1">Smart Sequencing</p>
              <p className="text-teal-100">AI automatically orders stops for maximum efficiency and minimal travel time.</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Traffic Awareness</p>
              <p className="text-teal-100">Real-time traffic data integration prevents delays and optimizes departure times.</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-1">Capacity Management</p>
              <p className="text-teal-100">Vehicle capacity and delivery constraints are automatically considered in planning.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleRoute;
