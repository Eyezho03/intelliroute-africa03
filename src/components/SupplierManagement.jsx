import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Phone, Mail, MapPin, Package, TrendingUp, AlertTriangle } from 'lucide-react';

const SupplierManagement = () => {
  const [suppliers] = useState([
    {
      id: 1,
      name: 'East African Logistics Ltd',
      location: 'Nairobi, Kenya',
      performance: 92,
      contracts: 15,
      totalValue: 2450000,
      status: 'active'
    },
    {
      id: 2,
      name: 'West African Distributors',
      location: 'Lagos, Nigeria',
      performance: 88,
      contracts: 8,
      totalValue: 1850000,
      status: 'active'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Supplier Management</h2>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all">
          Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {suppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{supplier.name}</h3>
                  <p className="text-gray-400 flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{supplier.location}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{supplier.performance}%</span>
                </div>
                <span className="text-gray-400 text-sm">Performance</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-white">{supplier.contracts}</div>
                <div className="text-gray-400 text-sm">Active Contracts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  ${(supplier.totalValue / 1000000).toFixed(1)}M
                </div>
                <div className="text-gray-400 text-sm">Total Value</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className={`px-3 py-1 rounded-full text-sm ${
                supplier.status === 'active' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
                {supplier.status}
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                  <Phone className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SupplierManagement;
