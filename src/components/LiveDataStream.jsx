import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, Satellite, Activity, Zap, Wifi, AlertTriangle } from 'lucide-react';

const LiveDataStream = () => {
  const [dataStreams] = useState([
    { 
      id: 1, 
      source: 'Vehicle Telemetry', 
      status: 'active', 
      rate: '45 updates/sec',
      icon: Truck,
      description: 'Real-time GPS and vehicle sensor data from fleet',
      color: 'text-blue-400'
    },
    { 
      id: 2, 
      source: 'Traffic Conditions', 
      status: 'active', 
      rate: '30 updates/min',
      icon: MapPin,
      description: 'Live traffic flow and incident reports across routes',
      color: 'text-emerald-400'
    },
    { 
      id: 3, 
      source: 'Weather Alerts', 
      status: 'active', 
      rate: '5 updates/hour',
      icon: Satellite,
      description: 'Hyperlocal weather conditions along delivery routes',
      color: 'text-purple-400'
    },
    { 
      id: 4, 
      source: 'Driver Status', 
      status: 'active', 
      rate: '15 updates/min',
      icon: Activity,
      description: 'Driver availability and shift monitoring',
      color: 'text-amber-400'
    },
    { 
      id: 5, 
      source: 'Border Crossings', 
      status: 'partial', 
      rate: '2 updates/hour',
      icon: AlertTriangle,
      description: 'Regional border wait times and documentation status',
      color: 'text-yellow-400'
    },
    { 
      id: 6, 
      source: 'Network Health', 
      status: 'active', 
      rate: '60 updates/sec',
      icon: Wifi,
      description: 'IoT device connectivity across the fleet',
      color: 'text-cyan-400'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'partial': return 'bg-yellow-500/20 text-yellow-400';
      case 'inactive': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Route Intelligence Dashboard</h2>
          <p className="text-gray-400">Real-time data streams powering IntelliRoute optimizations</p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
            <span className="text-gray-400">Active</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
            <span className="text-gray-400">Partial</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataStreams.map((stream, index) => {
          const Icon = stream.icon;
          return (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-${stream.color.split('-')[1]}-400 transition-all`}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`p-2 rounded-lg ${stream.color} bg-opacity-20`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{stream.source}</h3>
                  <p className="text-gray-400 text-sm mt-1">{stream.description}</p>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(stream.status)}`}>
                  {stream.status}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700/50 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Update Rate</div>
                  <div className="text-lg font-semibold text-white">{stream.rate}</div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white">
                    <Clock className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white">
                    <Zap className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Last system refresh: {new Date().toLocaleTimeString()}</p>
        <p className="mt-1">Data latency <span className="text-green-400">{"<"}500ms across all active streams</span></p>
      </div>
    </div>
  );
};

export default LiveDataStream;