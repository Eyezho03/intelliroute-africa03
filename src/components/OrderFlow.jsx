import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Package,
  Truck,
  User,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Star,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Users,
  Factory,
  Store,
  Building2,
  Navigation,
  RefreshCw
} from 'lucide-react';
import {
  ROLES,
  ROLE_DISPLAY_NAMES,
  getAvailableSuppliers,
  getAvailableCustomers,
  canSellTo,
  canBuyFrom,
  isValidTransaction
} from '../utils/roleManagement';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const OrderFlow = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('incoming');
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [outgoingOrders, setOutgoingOrders] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showFulfillModal, setShowFulfillModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get user info with fallback
  const userRole = user?.role || 'wholesaler';
  const userId = user?.id || 'WS-001';
  const userName = user?.name || user?.email || 'User';

  useEffect(() => {
    if (user) {
      loadOrderData();
      loadMarketplaceData();
      loadDrivers();
    }
  }, [user, userRole]);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to load orders from API
      const ordersData = await apiService.getOrders({ userId, role: userRole });
      
      if (ordersData && ordersData.incoming && ordersData.outgoing) {
        setIncomingOrders(ordersData.incoming);
        setOutgoingOrders(ordersData.outgoing);
        return;
      }
    } catch (apiError) {
      console.warn('Failed to load orders from API, using fallback data:', apiError.message);
    }
    
    // Fallback to mock data
    loadMockOrderData();
    setLoading(false);
  };
  
  const loadMockOrderData = () => {
    // Simulate incoming orders (orders TO this user from customers)
    const mockIncomingOrders = [
      {
        id: 'ORD-2024-IN-001',
        customerId: 'RET-001',
        customerName: 'Nakuru Central Market',
        customerType: ROLES.RETAILER,
        customerLocation: 'Nakuru, Kenya',
        customerContact: '+254712345678',
        orderDate: '2024-08-15T08:30:00Z',
        status: 'pending', // pending, processing, assigned, shipped, delivered, cancelled
        priority: 'high',
        totalAmount: 125000,
        deliveryAddress: 'Nakuru Town Center, Nakuru',
        requestedDeliveryDate: '2024-08-17T12:00:00Z',
        items: [
          {
            id: 1,
            name: 'Premium Maize Flour 50kg',
            quantity: 100,
            unitPrice: 1200,
            totalPrice: 120000,
            sku: 'MF-50KG-001'
          },
          {
            id: 2,
            name: 'White Rice 25kg',
            quantity: 20,
            unitPrice: 2500,
            totalPrice: 50000,
            sku: 'WR-25KG-002'
          }
        ],
        deliveryMethod: 'intelliroute',
        assignedDriver: null,
        trackingNumber: null,
        estimatedCost: 8500,
        notes: 'Please deliver before noon on requested date'
      },
      {
        id: 'ORD-2024-IN-002',
        customerId: 'RET-002',
        customerName: 'Mombasa Retail Store',
        customerType: ROLES.RETAILER,
        customerLocation: 'Mombasa, Kenya',
        customerContact: '+254723456789',
        orderDate: '2024-08-14T14:15:00Z',
        status: 'shipped',
        priority: 'medium',
        totalAmount: 85000,
        deliveryAddress: 'Nyali Area, Mombasa',
        requestedDeliveryDate: '2024-08-16T16:00:00Z',
        items: [
          {
            id: 3,
            name: 'Cooking Oil 20L',
            quantity: 25,
            unitPrice: 3400,
            totalPrice: 85000,
            sku: 'CO-20L-003'
          }
        ],
        deliveryMethod: 'supplier',
        assignedDriver: {
          id: 'DRV-001',
          name: 'John Mwangi',
          phone: '+254789123456',
          vehicle: 'KCA 123Y - Isuzu NQR'
        },
        trackingNumber: 'IR-2024-789123',
        estimatedCost: 12000
      }
    ];

    // Simulate outgoing orders (orders FROM this user to suppliers)
    const mockOutgoingOrders = [
      {
        id: 'ORD-2024-OUT-001',
        supplierId: 'MFG-001',
        supplierName: 'East Africa Food Industries',
        supplierType: ROLES.MANUFACTURER,
        supplierLocation: 'Industrial Area, Nairobi',
        supplierContact: '+254701234567',
        orderDate: '2024-08-13T10:20:00Z',
        status: 'delivered',
        priority: 'medium',
        totalAmount: 450000,
        deliveryAddress: userName + ' Warehouse, Nairobi',
        requestedDeliveryDate: '2024-08-15T09:00:00Z',
        items: [
          {
            id: 1,
            name: 'Industrial Maize Flour 50kg (Bulk)',
            quantity: 200,
            unitPrice: 2000,
            totalPrice: 400000,
            sku: 'IMF-50KG-B01'
          },
          {
            id: 2,
            name: 'Bulk Rice 25kg',
            quantity: 20,
            unitPrice: 2500,
            totalPrice: 50000,
            sku: 'BR-25KG-B02'
          }
        ],
        deliveryMethod: 'intelliroute',
        assignedDriver: {
          id: 'DRV-002',
          name: 'Mary Wanjiku',
          phone: '+254798765432',
          vehicle: 'KBZ 456X - Mercedes Actros'
        },
        trackingNumber: 'IR-2024-456789',
        actualDeliveryDate: '2024-08-15T08:45:00Z',
        rating: 5,
        review: 'Excellent quality products and on-time delivery!'
      }
    ];

    setIncomingOrders(mockIncomingOrders);
    setOutgoingOrders(mockOutgoingOrders);
    setLoading(false);
  };

  const loadMarketplaceData = async () => {
    try {
      // Try to load products from API
      const productsData = await apiService.getProducts({ userRole });
      
      if (productsData && Array.isArray(productsData)) {
        setAvailableProducts(productsData);
        return;
      }
    } catch (apiError) {
      console.warn('Failed to load products from API, using fallback data:', apiError.message);
    }
    
    // Fallback to mock data
    loadMockMarketplaceData();
  };
  
  const loadMockMarketplaceData = () => {
    // Get available suppliers based on user role
    const availableSupplierTypes = getAvailableSuppliers(userRole);
    
    // Mock marketplace products from suppliers
    const mockProducts = [
      {
        id: 'PROD-001',
        name: 'Premium Wheat Flour 50kg',
        description: 'High-grade wheat flour perfect for commercial baking and wholesale distribution.',
        price: 2800,
        minOrderQuantity: 50,
        stockQuantity: 500,
        unit: 'bags',
        supplierId: 'MFG-001',
        supplierName: 'East Africa Food Industries',
        supplierType: ROLES.MANUFACTURER,
        supplierLocation: 'Industrial Area, Nairobi',
        supplierRating: 4.8,
        category: 'Grains & Cereals',
        image: '/api/placeholder/300/300',
        deliveryOptions: [
          { type: 'intelliroute', cost: 3500, eta: '2-3 days' },
          { type: 'supplier', cost: 4200, eta: '3-4 days' },
          { type: 'pickup', cost: 0, eta: 'Same day' }
        ]
      },
      {
        id: 'PROD-002',
        name: 'Refined Sunflower Oil 20L',
        description: 'Premium refined sunflower oil in commercial packaging for wholesale distribution.',
        price: 4200,
        minOrderQuantity: 20,
        stockQuantity: 200,
        unit: 'containers',
        supplierId: 'MFG-002',
        supplierName: 'Golden Oil Mills',
        supplierType: ROLES.MANUFACTURER,
        supplierLocation: 'Nakuru, Kenya',
        supplierRating: 4.6,
        category: 'Oils & Fats',
        image: '/api/placeholder/300/300',
        deliveryOptions: [
          { type: 'intelliroute', cost: 2800, eta: '1-2 days' },
          { type: 'supplier', cost: 3500, eta: '2-3 days' }
        ]
      },
      {
        id: 'PROD-003',
        name: 'Long Grain Rice 25kg',
        description: 'Premium long grain rice suitable for retail and food service distribution.',
        price: 3200,
        minOrderQuantity: 100,
        stockQuantity: 800,
        unit: 'bags',
        supplierId: 'MFG-003',
        supplierName: 'Mwea Rice Mills',
        supplierType: ROLES.MANUFACTURER,
        supplierLocation: 'Mwea, Kenya',
        supplierRating: 4.9,
        category: 'Grains & Cereals',
        image: '/api/placeholder/300/300',
        deliveryOptions: [
          { type: 'intelliroute', cost: 4000, eta: '2-3 days' },
          { type: 'pickup', cost: 0, eta: 'Same day' }
        ]
      }
    ];

    // Filter products from valid suppliers
    const filteredProducts = mockProducts.filter(product =>
      availableSupplierTypes.some(supplier => supplier.role === product.supplierType)
    );

    setAvailableProducts(filteredProducts);
  };

  const loadDrivers = async () => {
    try {
      // Try to load drivers from API
      const driversData = await apiService.getAvailableDrivers('nairobi');
      
      if (driversData && Array.isArray(driversData)) {
        setAvailableDrivers(driversData);
        return;
      }
    } catch (apiError) {
      console.warn('Failed to load drivers from API, using fallback data:', apiError.message);
    }
    
    // Fallback to mock data
    const mockDrivers = [
      {
        id: 'DRV-001',
        name: 'John Mwangi',
        phone: '+254789123456',
        email: 'j.mwangi@intelliroute.com',
        vehicle: 'KCA 123Y - Isuzu NQR',
        capacity: '8 tons',
        location: 'Nairobi',
        status: 'available',
        rating: 4.8,
        completedDeliveries: 234
      },
      {
        id: 'DRV-002',
        name: 'Mary Wanjiku',
        phone: '+254798765432',
        email: 'm.wanjiku@intelliroute.com',
        vehicle: 'KBZ 456X - Mercedes Actros',
        capacity: '12 tons',
        location: 'Nakuru',
        status: 'busy',
        rating: 4.9,
        completedDeliveries: 189
      },
      {
        id: 'DRV-003',
        name: 'David Kiprop',
        phone: '+254756789123',
        email: 'd.kiprop@intelliroute.com',
        vehicle: 'KDA 789Z - Mitsubishi Canter',
        capacity: '5 tons',
        location: 'Mombasa',
        status: 'available',
        rating: 4.7,
        completedDeliveries: 156
      }
    ];

    setAvailableDrivers(mockDrivers);
  };

  const handleAssignDriver = async (orderId, driverId) => {
    try {
      setLoading(true);
      
      // Try to assign driver via API
      await apiService.assignDriver(orderId, driverId);
      
      // Update local state
      const driver = availableDrivers.find(d => d.id === driverId);
      
      setIncomingOrders(orders =>
        orders.map(order =>
          order.id === orderId
            ? {
                ...order,
                status: 'assigned',
                assignedDriver: driver,
                trackingNumber: `IR-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
              }
            : order
        )
      );
      
      setShowFulfillModal(false);
    } catch (error) {
      console.error('Failed to assign driver:', error);
      setError('Failed to assign driver. Please try again.');
      
      // Fallback to local update for demo
      const driver = availableDrivers.find(d => d.id === driverId);
      
      setIncomingOrders(orders =>
        orders.map(order =>
          order.id === orderId
            ? {
                ...order,
                status: 'assigned',
                assignedDriver: driver,
                trackingNumber: `IR-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
              }
            : order
        )
      );
      
      setShowFulfillModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      
      // Try to update order status via API
      await apiService.updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setIncomingOrders(orders =>
        orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Failed to update order status:', error);
      setError('Failed to update order status. Please try again.');
      
      // Fallback to local update for demo
      setIncomingOrders(orders =>
        orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'processing': return 'text-blue-400 bg-blue-500/20';
      case 'assigned': return 'text-purple-400 bg-purple-500/20';
      case 'shipped': return 'text-indigo-400 bg-indigo-500/20';
      case 'delivered': return 'text-green-400 bg-green-500/20';
      case 'cancelled': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case ROLES.MANUFACTURER: return Factory;
      case ROLES.WHOLESALER: return Building2;
      case ROLES.RETAILER: return Store;
      case ROLES.DRIVER: return Truck;
      default: return User;
    }
  };

  const OrderCard = ({ order, isIncoming = true }) => {
    const RoleIcon = getRoleIcon(isIncoming ? order.customerType : order.supplierType);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-blue-500/30 transition-all"
      >
        {/* Order Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <RoleIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {isIncoming ? order.customerName : order.supplierName}
              </h3>
              <p className="text-gray-400 text-sm">{order.id}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(order.priority)}`}>
                  {order.priority.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">
              KES {order.totalAmount.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">
              {new Date(order.orderDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Items ({order.items.length})</div>
          <div className="space-y-2">
            {order.items.slice(0, 2).map(item => (
              <div key={item.id} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-2">
                <div>
                  <div className="text-white text-sm">{item.name}</div>
                  <div className="text-gray-400 text-xs">Qty: {item.quantity} × KES {item.unitPrice.toLocaleString()}</div>
                </div>
                <div className="text-green-400 font-semibold text-sm">
                  KES {item.totalPrice.toLocaleString()}
                </div>
              </div>
            ))}
            {order.items.length > 2 && (
              <div className="text-center text-gray-400 text-sm">
                +{order.items.length - 2} more items
              </div>
            )}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="h-4 w-4" />
            <span>{isIncoming ? order.deliveryAddress : order.deliveryAddress}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="h-4 w-4" />
            <span>
              {order.status === 'delivered' && order.actualDeliveryDate
                ? `Delivered: ${new Date(order.actualDeliveryDate).toLocaleString()}`
                : `Requested: ${new Date(order.requestedDeliveryDate).toLocaleString()}`
              }
            </span>
          </div>
          {order.assignedDriver && (
            <div className="flex items-center gap-2 text-blue-400">
              <Truck className="h-4 w-4" />
              <span>{order.assignedDriver.name} - {order.assignedDriver.vehicle}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-700">
          <button
            onClick={() => setSelectedOrder(order)}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>
          
          {isIncoming && order.status === 'pending' && (
            <button
              onClick={() => setShowFulfillModal(order)}
              className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg transition"
            >
              Fulfill
            </button>
          )}
          
          {isIncoming && order.status === 'processing' && (
            <button
              onClick={() => setShowFulfillModal(order)}
              className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-lg transition"
            >
              Assign Driver
            </button>
          )}

          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-blue-500/30 transition-all"
    >
      <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
        <Package className="h-16 w-16 text-gray-500" />
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-white line-clamp-2">{product.name}</h3>
          <p className="text-gray-400 text-sm">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-400">
            KES {product.price.toLocaleString()}
          </div>
          <div className="text-right">
            <div className="text-white text-sm">Min: {product.minOrderQuantity} {product.unit}</div>
            <div className="text-gray-400 text-xs">{product.stockQuantity} available</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-300">{product.supplierRating}</span>
          </div>
          <div className="text-gray-400 text-sm">•</div>
          <div className="text-gray-400 text-sm">{product.supplierLocation}</div>
        </div>

        <div>
          <div className="text-sm text-gray-400 mb-2">Delivery Options:</div>
          <div className="space-y-1">
            {product.deliveryOptions.map((option, index) => (
              <div key={index} className="flex justify-between text-xs text-gray-300">
                <span className="capitalize">{option.type.replace('_', ' ')}</span>
                <span>KES {option.cost.toLocaleString()} • {option.eta}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Order Now
        </button>
      </div>
    </motion.div>
  );

  const FulfillModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Fulfill Order</h3>
            <button
              onClick={() => setShowFulfillModal(false)}
              className="p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <XCircle className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {showFulfillModal && (
            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Order Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order ID:</span>
                    <span className="text-white">{showFulfillModal.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer:</span>
                    <span className="text-white">{showFulfillModal.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Amount:</span>
                    <span className="text-green-400 font-semibold">KES {showFulfillModal.totalAmount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Assign Delivery Driver</h4>
                <div className="space-y-3">
                  {availableDrivers.map(driver => (
                    <div
                      key={driver.id}
                      className={`p-4 rounded-lg border transition cursor-pointer ${
                        driver.status === 'available'
                          ? 'border-gray-600 hover:border-blue-500 bg-gray-700/30'
                          : 'border-gray-700 bg-gray-800/50 opacity-50 cursor-not-allowed'
                      }`}
                      onClick={() => driver.status === 'available' && handleAssignDriver(showFulfillModal.id, driver.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">{driver.name}</div>
                          <div className="text-gray-400 text-sm">{driver.vehicle}</div>
                          <div className="text-gray-400 text-xs">
                            {driver.location} • {driver.completedDeliveries} deliveries • {driver.rating}★
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`px-2 py-1 rounded-full text-xs ${
                            driver.status === 'available'
                              ? 'text-green-400 bg-green-500/20'
                              : 'text-yellow-400 bg-yellow-500/20'
                          }`}>
                            {driver.status.toUpperCase()}
                          </div>
                          <div className="text-gray-400 text-xs mt-1">Capacity: {driver.capacity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleUpdateOrderStatus(showFulfillModal.id, 'processing');
                    setShowFulfillModal(false);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition"
                >
                  Start Processing
                </button>
                <button
                  onClick={() => setShowFulfillModal(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Order Flow Management</h2>
          <p className="text-gray-400">Manage incoming orders and place orders with suppliers</p>
          <div className="flex items-center gap-2 mt-2">
            <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor('processing')}`}>
              {ROLE_DISPLAY_NAMES[userRole]}
            </div>
            <span className="text-gray-400 text-sm">•</span>
            <span className="text-gray-400 text-sm">{userName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition">
            <Plus className="h-4 w-4" />
            New Order
          </button>
          
          <button 
            onClick={() => {
              loadOrderData();
              loadMarketplaceData();
              loadDrivers();
            }}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 overflow-x-auto">
        {[
          { id: 'incoming', label: 'Incoming Orders', icon: ShoppingCart, count: incomingOrders.length },
          { id: 'outgoing', label: 'My Orders', icon: Package, count: outgoingOrders.length },
          { id: 'marketplace', label: 'Browse & Order', icon: Store, count: availableProducts.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            <span className="bg-gray-600 text-xs px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
          />
        </div>

        {(activeTab === 'incoming' || activeTab === 'outgoing') && (
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="assigned">Assigned</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Incoming Orders */}
        {activeTab === 'incoming' && (
          <motion.div
            key="incoming"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {incomingOrders
              .filter(order => 
                statusFilter === 'all' || order.status === statusFilter
              )
              .filter(order =>
                !searchQuery ||
                order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.id.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(order => (
                <OrderCard key={order.id} order={order} isIncoming={true} />
              ))
            }
          </motion.div>
        )}

        {/* Outgoing Orders */}
        {activeTab === 'outgoing' && (
          <motion.div
            key="outgoing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {outgoingOrders
              .filter(order => 
                statusFilter === 'all' || order.status === statusFilter
              )
              .filter(order =>
                !searchQuery ||
                order.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.id.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(order => (
                <OrderCard key={order.id} order={order} isIncoming={false} />
              ))
            }
          </motion.div>
        )}

        {/* Marketplace */}
        {activeTab === 'marketplace' && (
          <motion.div
            key="marketplace"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {availableProducts
              .filter(product =>
                !searchQuery ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            }
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fulfill Modal */}
      {showFulfillModal && <FulfillModal />}
    </div>
  );
};

export default OrderFlow;
