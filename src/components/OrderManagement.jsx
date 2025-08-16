import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  MapPin,
  Clock,
  DollarSign,
  User,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Calendar,
  Filter,
  Search,
  Download,
  MessageCircle,
  Phone,
  Mail,
  RefreshCw,
  Plus,
  ShoppingCart
} from 'lucide-react';
import { 
  ROLES, 
  ROLE_DISPLAY_NAMES, 
  getAvailableSuppliers, 
  canPlaceOrders, 
  isValidTransaction,
  hasPermission,
  PERMISSIONS
} from '../utils/roleManagement';

const OrderManagement = ({ userRole = 'retailer', userId }) => {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('buyer'); // buyer or seller
  const [newOrderModal, setNewOrderModal] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('intelliroute');

  useEffect(() => {
    // Load suppliers based on user role
    if (userRole === 'retailer') {
      setSuppliers([
        {
          id: 'WS001',
          name: 'Nairobi Wholesale Distribution',
          type: 'wholesaler',
          location: 'Nairobi, Kenya',
          rating: 4.8,
          minOrder: 50000,
          deliveryOptions: ['intelliroute', 'supplier', 'pickup'],
          paymentTerms: '30 days',
          categories: ['Food Products', 'Household Items']
        },
        {
          id: 'WS002',
          name: 'Lagos Central Supplies',
          type: 'wholesaler', 
          location: 'Lagos, Nigeria',
          rating: 4.6,
          minOrder: 75000,
          deliveryOptions: ['intelliroute', 'supplier'],
          paymentTerms: '45 days',
          categories: ['Electronics', 'Clothing']
        }
      ]);
    } else if (userRole === 'wholesaler') {
      setSuppliers([
        {
          id: 'MF001',
          name: 'East Africa Food Industries',
          type: 'manufacturer',
          location: 'Nakuru, Kenya',
          rating: 4.9,
          minOrder: 500000,
          deliveryOptions: ['intelliroute', 'supplier', 'pickup'],
          paymentTerms: '60 days',
          categories: ['Processed Foods', 'Beverages']
        },
        {
          id: 'MF002',
          name: 'Lagos Manufacturing Co.',
          type: 'manufacturer',
          location: 'Lagos, Nigeria', 
          rating: 4.7,
          minOrder: 750000,
          deliveryOptions: ['supplier', 'pickup'],
          paymentTerms: '45 days',
          categories: ['Household Products', 'Personal Care']
        }
      ]);
    }

    // Simulate B2B order data
    const sampleOrders = [
      {
        id: 'ORD-2024-001',
        type: 'purchase', // purchase or sale
        status: 'delivered',
        orderDate: '2024-08-05',
        deliveryDate: '2024-08-08',
        totalAmount: userRole === 'retailer' ? 125000 : 850000,
        deliveryMethod: 'intelliroute',
        deliveryCost: 5000,
        items: [
          {
            id: 1,
            name: userRole === 'retailer' ? 'Maize Flour 50kg (Bulk)' : 'Industrial Rice Mill 25kg',
            quantity: userRole === 'retailer' ? 50 : 200,
            price: userRole === 'retailer' ? 2500 : 4250,
            image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'
          }
        ],
        supplier: {
          name: userRole === 'retailer' ? 'Nairobi Wholesale Distribution' : 'East Africa Food Industries',
          type: userRole === 'retailer' ? 'wholesaler' : 'manufacturer',
          location: userRole === 'retailer' ? 'Nairobi, Kenya' : 'Nakuru, Kenya',
          contact: '+254-20-123-4567',
          email: 'orders@supplier.com'
        },
        buyer: {
          name: 'My Business',
          location: 'Nairobi, Kenya',
          contact: '+254-722-123-456',
          email: 'purchasing@mybusiness.com'
        },
        shippingAddress: '123 Business District, Nairobi, Kenya',
        trackingNumber: 'IR-2024-001234',
        paymentStatus: 'paid',
        rating: 5,
        review: 'Excellent quality and fast IntelliRoute delivery!'
      },
      {
        id: 'ORD-2024-002',
        type: 'purchase',
        status: 'shipped',
        orderDate: '2024-08-07',
        estimatedDelivery: '2024-08-12',
        totalAmount: 85.00,
        items: [
          {
            id: 2,
            name: 'Handwoven Kente Cloth',
            quantity: 1,
            price: 85.00,
            image: 'https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?w=400'
          }
        ],
        supplier: {
          name: 'Ghana Heritage Textiles',
          location: 'Kumasi, Ghana',
          contact: '+233-32-123-456',
          email: 'info@ghanaheritage.com'
        },
        buyer: {
          name: 'Sarah Johnson',
          location: 'London, UK',
          contact: '+44-20-1234-5678',
          email: 'sarah.johnson@email.com'
        },
        shippingAddress: '45 Queen St, London, UK SW1A 1AA',
        trackingNumber: 'TRK-GHA-005678',
        paymentStatus: 'paid'
      },
      {
        id: 'ORD-2024-003',
        type: 'purchase',
        status: 'processing',
        orderDate: '2024-08-09',
        estimatedDelivery: '2024-08-15',
        totalAmount: 117.00,
        items: [
          {
            id: 3,
            name: 'Shea Butter Beauty Products Set',
            quantity: 2,
            price: 45.00,
            image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400'
          },
          {
            id: 4,
            name: 'Maasai Beaded Jewelry Collection',
            quantity: 1,
            price: 35.00,
            image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400'
          }
        ],
        supplier: {
          name: 'Burkina Natural',
          location: 'Ouagadougou, Burkina Faso',
          contact: '+226-25-123-456',
          email: 'info@burkinanatural.com'
        },
        buyer: {
          name: 'Michael Chen',
          location: 'Toronto, Canada',
          contact: '+1-416-123-4567',
          email: 'michael.chen@email.com'
        },
        shippingAddress: '789 Bay St, Toronto, ON M5G 1N8',
        paymentStatus: 'paid'
      },
      {
        id: 'ORD-2024-004',
        type: 'sale',
        status: 'delivered',
        orderDate: '2024-08-03',
        deliveryDate: '2024-08-07',
        totalAmount: 72.00,
        items: [
          {
            id: 5,
            name: 'Argan Oil Hair Care Bundle',
            quantity: 1,
            price: 72.00,
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
          }
        ],
        supplier: {
          name: 'Marrakech Organics',
          location: 'Marrakech, Morocco',
          contact: '+212-524-123-456',
          email: 'info@marrakechorganics.com'
        },
        buyer: {
          name: 'Emma Wilson',
          location: 'Sydney, Australia',
          contact: '+61-2-1234-5678',
          email: 'emma.wilson@email.com'
        },
        shippingAddress: '321 George St, Sydney, NSW 2000',
        trackingNumber: 'TRK-MOR-009876',
        paymentStatus: 'paid',
        rating: 4,
        review: 'Great quality, will order again!'
      }
    ];

    setOrders(sampleOrders);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'shipped':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'processing':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'cancelled':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return CheckCircle;
      case 'shipped':
        return Truck;
      case 'processing':
        return Clock;
      case 'cancelled':
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    const matchesViewMode = viewMode === 'buyer' ? order.type === 'purchase' : order.type === 'sale';
    const matchesSearch = !searchQuery || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesViewMode && matchesSearch;
  });

  const orderSummary = {
    total: filteredOrders.length,
    delivered: filteredOrders.filter(o => o.status === 'delivered').length,
    shipped: filteredOrders.filter(o => o.status === 'shipped').length,
    processing: filteredOrders.filter(o => o.status === 'processing').length,
    totalValue: filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Order Management</h2>
          <p className="text-gray-400 mt-1">Track and manage your orders and sales</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex border border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('buyer')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'buyer' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              My Purchases
            </button>
            <button
              onClick={() => setViewMode('seller')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === 'seller' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              My Sales
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
              placeholder="Search orders..."
            />
          </div>

          {/* Export Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg text-white transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Package className="h-6 w-6 text-blue-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{orderSummary.total}</h3>
            <p className="text-gray-400 text-xs">Total Orders</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{orderSummary.delivered}</h3>
            <p className="text-gray-400 text-xs">Delivered</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Truck className="h-6 w-6 text-blue-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{orderSummary.shipped}</h3>
            <p className="text-gray-400 text-xs">Shipped</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{orderSummary.processing}</h3>
            <p className="text-gray-400 text-xs">Processing</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">${orderSummary.totalValue.toFixed(2)}</h3>
            <p className="text-gray-400 text-xs">Total Value</p>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">All Status</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <span className="text-gray-400">
          Showing {filteredOrders.length} {viewMode === 'buyer' ? 'purchases' : 'sales'}
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const StatusIcon = getStatusIcon(order.status);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-emerald-500/30 transition-all"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{order.id}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{order.orderDate}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>${order.totalAmount.toFixed(2)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm border ${getStatusColor(order.status)}`}>
                    <StatusIcon className="h-4 w-4" />
                    <span className="capitalize">{order.status}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center space-x-2 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Details</span>
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-gray-700/30 rounded-lg p-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-gray-400 text-xs">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <h5 className="text-white font-medium mb-2">
                    {viewMode === 'buyer' ? 'Supplier' : 'Customer'} Details
                  </h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <User className="h-3 w-3" />
                      <span>{viewMode === 'buyer' ? order.supplier.name : order.buyer.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin className="h-3 w-3" />
                      <span>{viewMode === 'buyer' ? order.supplier.location : order.buyer.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Phone className="h-3 w-3" />
                      <span>{viewMode === 'buyer' ? order.supplier.contact : order.buyer.contact}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-white font-medium mb-2">Shipping Details</h5>
                  <div className="space-y-1 text-sm">
                    {order.trackingNumber && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Truck className="h-3 w-3" />
                        <span>Tracking: {order.trackingNumber}</span>
                      </div>
                    )}
                    {order.deliveryDate && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <CheckCircle className="h-3 w-3" />
                        <span>Delivered: {order.deliveryDate}</span>
                      </div>
                    )}
                    {order.estimatedDelivery && !order.deliveryDate && (
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>Expected: {order.estimatedDelivery}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Rating & Review */}
              {order.rating && order.review && (
                <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white text-sm font-medium">({order.rating}/5)</span>
                  </div>
                  <p className="text-gray-300 text-sm">"{order.review}"</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Order Details</h2>
                  <p className="text-gray-400">{selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 bg-gray-700/30 rounded-lg p-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{item.name}</h4>
                            <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                            <p className="text-emerald-400 font-bold">${item.price} each</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-700 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-white">Total: ${selectedOrder.totalAmount.toFixed(2)}</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Shipping Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {viewMode === 'buyer' ? 'Supplier' : 'Customer'} Information
                    </h3>
                    <div className="bg-gray-700/30 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-white">{viewMode === 'buyer' ? selectedOrder.supplier.name : selectedOrder.buyer.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-300">{viewMode === 'buyer' ? selectedOrder.supplier.location : selectedOrder.buyer.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-300">{viewMode === 'buyer' ? selectedOrder.supplier.contact : selectedOrder.buyer.contact}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-300">{viewMode === 'buyer' ? selectedOrder.supplier.email : selectedOrder.buyer.email}</span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>Message</span>
                        </button>
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Call</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Shipping Information</h3>
                    <div className="bg-gray-700/30 rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-white">{selectedOrder.shippingAddress}</span>
                      </div>
                      {selectedOrder.trackingNumber && (
                        <div className="flex items-center space-x-3">
                          <Truck className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-300">Tracking: {selectedOrder.trackingNumber}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-300">Ordered: {selectedOrder.orderDate}</span>
                      </div>
                      {selectedOrder.deliveryDate && (
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-green-300">Delivered: {selectedOrder.deliveryDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedOrder.rating && selectedOrder.review && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Customer Review</h3>
                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < selectedOrder.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                              }`}
                            />
                          ))}
                          <span className="text-white font-medium">({selectedOrder.rating}/5)</span>
                        </div>
                        <p className="text-gray-300">"{selectedOrder.review}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
