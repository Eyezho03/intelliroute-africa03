import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  AlertTriangle,
  MapPin,
  Calendar,
  DollarSign,
  RefreshCw,
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Route
} from 'lucide-react';

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inventoryData, setInventoryData] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urgentDeliveries, setUrgentDeliveries] = useState([]);

  useEffect(() => {
    // African-focused warehouse data
    setWarehouses([
      { id: 'all', name: 'All Locations', location: '' },
      { id: 'nairobi', name: 'Nairobi Hub', location: 'Nairobi, Kenya' },
      { id: 'lagos', name: 'Lagos Depot', location: 'Lagos, Nigeria' },
      { id: 'johannesburg', name: 'Johannesburg Center', location: 'Johannesburg, SA' },
      { id: 'accra', name: 'Accra Warehouse', location: 'Accra, Ghana' }
    ]);

    // Sample inventory data for African SMEs
    setInventoryData([
      {
        id: 'inv001',
        sku: 'AGR-001',
        name: 'Maize Flour (50kg)',
        category: 'Agriculture',
        warehouse: 'Nairobi Hub',
        currentStock: 120,
        minThreshold: 50,
        maxCapacity: 500,
        unitPrice: 45.00,
        totalValue: 5400.00,
        status: 'in_stock',
        lastUpdated: '2024-01-15',
        supplier: 'Nakuru Farmers Co-op',
        deliveryNeeded: false
      },
      {
        id: 'inv002',
        sku: 'BEV-002',
        name: 'Bottled Water (500ml)',
        category: 'Beverages',
        warehouse: 'Lagos Depot',
        currentStock: 30,
        minThreshold: 100,
        maxCapacity: 1000,
        unitPrice: 1.20,
        totalValue: 36.00,
        status: 'low_stock',
        lastUpdated: '2024-01-14',
        supplier: 'AquaPure Nigeria',
        deliveryNeeded: true
      },
      {
        id: 'inv003',
        sku: 'CON-003',
        name: 'Cement (50kg)',
        category: 'Construction',
        warehouse: 'Johannesburg Center',
        currentStock: 80,
        minThreshold: 40,
        maxCapacity: 200,
        unitPrice: 8.50,
        totalValue: 680.00,
        status: 'in_stock',
        lastUpdated: '2024-01-15',
        supplier: 'BuildIt Materials',
        deliveryNeeded: false
      },
      {
        id: 'inv004',
        sku: 'PHM-004',
        name: 'Malaria Medication',
        category: 'Pharmaceuticals',
        warehouse: 'Accra Warehouse',
        currentStock: 0,
        minThreshold: 20,
        maxCapacity: 100,
        unitPrice: 12.75,
        totalValue: 0,
        status: 'out_of_stock',
        lastUpdated: '2024-01-10',
        supplier: 'HealthPlus Ghana',
        deliveryNeeded: true
      }
    ]);

    // Identify urgent deliveries
    setUrgentDeliveries([
      {
        inventoryId: 'inv002',
        destination: 'Victoria Island, Lagos',
        priority: 'high',
        deadline: '2024-01-18'
      },
      {
        inventoryId: 'inv004',
        destination: 'Kumasi Central Hospital',
        priority: 'critical',
        deadline: '2024-01-16'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'low_stock':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'out_of_stock':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock':
        return CheckCircle;
      case 'low_stock':
        return AlertTriangle;
      case 'out_of_stock':
        return XCircle;
      default:
        return Package;
    }
  };

  const getStockPercentage = (current, max) => {
    return Math.round((current / max) * 100);
  };

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWarehouse = selectedWarehouse === 'all' || 
                           (selectedWarehouse === 'nairobi' && item.warehouse.includes('Nairobi')) ||
                           (selectedWarehouse === 'lagos' && item.warehouse.includes('Lagos')) ||
                           (selectedWarehouse === 'johannesburg' && item.warehouse.includes('Johannesburg')) ||
                           (selectedWarehouse === 'accra' && item.warehouse.includes('Accra'));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesWarehouse && matchesCategory;
  });

  const categories = ['all', 'Agriculture', 'Beverages', 'Construction', 'Pharmaceuticals'];

  const totalInventoryValue = inventoryData.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventoryData.filter(item => item.status === 'low_stock').length;
  const outOfStockItems = inventoryData.filter(item => item.status === 'out_of_stock').length;
  const totalItems = inventoryData.reduce((sum, item) => sum + item.currentStock, 0);
  const urgentDeliveryCount = urgentDeliveries.length;

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">SME Inventory Dashboard</h2>
          <p className="text-gray-400 mt-1">Manage stock and coordinate deliveries with IntelliRoute</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
            <Route className="h-4 w-4" />
            <span>Request Delivery</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Inventory Value Card */}
        <motion.div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <DollarSign className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">
              ${totalInventoryValue.toLocaleString()}
            </h3>
            <p className="text-gray-400 text-sm">Total Inventory Value</p>
          </div>
        </motion.div>

        {/* Urgent Deliveries Card */}
        <motion.div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <Clock className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">
              {urgentDeliveryCount}
            </h3>
            <p className="text-gray-400 text-sm">Urgent Deliveries</p>
          </div>
        </motion.div>

        {/* Low Stock Card */}
        <motion.div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{lowStockItems}</h3>
            <p className="text-gray-400 text-sm">Low Stock Alerts</p>
          </div>
        </motion.div>

        {/* Out of Stock Card */}
        <motion.div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <XCircle className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{outOfStockItems}</h3>
            <p className="text-gray-400 text-sm">Out of Stock</p>
          </div>
        </motion.div>
      </div>

      {/* Delivery Alerts Section */}
      {urgentDeliveries.length > 0 && (
        <motion.div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Urgent Deliveries Required
            </h3>
            <button className="text-red-300 hover:text-white">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {urgentDeliveries.map((delivery, index) => {
              const item = inventoryData.find(i => i.id === delivery.inventoryId);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-red-900/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="text-white font-medium">{item?.name}</p>
                      <p className="text-red-300 text-sm">{delivery.destination}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white">Deadline: {delivery.deadline}</p>
                    <button className="mt-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md">
                      Schedule Delivery
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Inventory Table */}
      <motion.div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">
            Your Inventory ({filteredInventory.length} items)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Stock Level</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Value</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, index) => {
                const StatusIcon = getStatusIcon(item.status);
                const stockPercentage = getStockPercentage(item.currentStock, item.maxCapacity);
                const isUrgent = urgentDeliveries.some(d => d.inventoryId === item.id);
                
                return (
                  <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-800/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isUrgent ? 'bg-red-900/30' : 'bg-gray-700'
                        }`}>
                          <Package className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{item.name}</div>
                          <div className="text-gray-400 text-sm">SKU: {item.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{item.warehouse}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">
                            {item.currentStock.toLocaleString()}
                          </span>
                          <span className="text-gray-400 text-sm">
                            / {item.maxCapacity.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              stockPercentage < 25 ? 'bg-red-500' :
                              stockPercentage < 50 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${stockPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">
                          ${item.totalValue.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-sm">
                          ${item.unitPrice} per unit
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm border ${getStatusColor(item.status)}`}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="capitalize">{item.status.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                          <Truck className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No inventory items found</h3>
            <p className="text-gray-500">Try adjusting your search or add new products</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InventoryManagement;