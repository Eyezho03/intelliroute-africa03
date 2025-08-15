import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  MapPin,
  Clock,
  Package,
  User,
  Phone,
  Navigation,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  MessageSquare,
  Camera,
  FileText,
  Route,
  Fuel,
  Activity,
  Eye,
  RefreshCw,
  Filter,
  Search,
  Calendar,
  DollarSign,
  ArrowRight,
  PlayCircle,
  PauseCircle,
  StopCircle
} from 'lucide-react';
import {
  ROLES,
  ROLE_DISPLAY_NAMES,
  canManageDeliveries,
  hasPermission,
  PERMISSIONS
} from '../utils/roleManagement';

const DeliveryTracking = ({ userRole = 'driver', userId = 'DRV-001' }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProofModal, setShowProofModal] = useState(false);
  const [deliveryProof, setDeliveryProof] = useState({
    photos: [],
    signature: null,
    notes: '',
    recipientName: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [routePreview, setRoutePreview] = useState(null);

  useEffect(() => {
    loadDeliveryData();
  }, [userRole, userId]);

  const loadDeliveryData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simulate delivery data based on user role
      const mockDeliveries = [
        {
          id: 'DEL-2024-001',
          orderId: 'ORD-2024-567',
          trackingNumber: 'IR-2024-001234',
          status: 'in_transit', // assigned, picked_up, in_transit, delivered, failed
          priority: 'high',
          
          // Customer/Supplier Info
          customer: {
            id: 'RET-001',
            name: 'Nakuru Central Market',
            type: ROLES.RETAILER,
            contact: '+254712345678',
            email: 'orders@nakurucentral.co.ke',
            location: 'Nakuru County'
          },
          
          supplier: {
            id: 'WS-001',
            name: 'Nairobi Wholesale Hub',
            type: ROLES.WHOLESALER,
            contact: '+254701234567',
            email: 'dispatch@nairobiwholesale.co.ke',
            location: 'Nairobi County'
          },
          
          // Driver Info
          driver: {
            id: 'DRV-001',
            name: 'John Mwangi',
            phone: '+254789123456',
            vehicle: 'KCA 123Y - Isuzu NQR',
            license: 'A123456789'
          },
          
          // Route Info
          pickup: {
            address: 'Industrial Area, Nairobi',
            coordinates: { lat: -1.3194, lng: 36.8589 },
            scheduledTime: '2024-08-15T08:00:00Z',
            actualTime: '2024-08-15T08:15:00Z',
            status: 'completed'
          },
          
          delivery: {
            address: 'Nakuru Town Center, West Street',
            coordinates: { lat: -0.3031, lng: 36.0800 },
            scheduledTime: '2024-08-15T14:00:00Z',
            actualTime: null,
            status: 'in_progress'
          },
          
          // Package Info
          packages: [
            {
              id: 1,
              description: 'Premium Maize Flour 50kg',
              quantity: 100,
              weight: 5000,
              value: 120000
            },
            {
              id: 2,
              description: 'White Rice 25kg',
              quantity: 20,
              weight: 500,
              value: 50000
            }
          ],
          
          // Tracking Info
          route: {
            totalDistance: 156,
            estimatedDuration: 180,
            currentProgress: 65,
            waypoints: [
              {
                name: 'Nairobi Industrial Area',
                status: 'completed',
                timestamp: '2024-08-15T08:15:00Z',
                coordinates: { lat: -1.3194, lng: 36.8589 }
              },
              {
                name: 'Nakuru Highway Junction',
                status: 'current',
                timestamp: '2024-08-15T11:30:00Z',
                coordinates: { lat: -0.9503, lng: 36.6445 }
              },
              {
                name: 'Nakuru Town Center',
                status: 'pending',
                timestamp: null,
                coordinates: { lat: -0.3031, lng: 36.0800 }
              }
            ]
          },
          
          // Financial Info
          deliveryFee: 12000,
          totalValue: 170000,
          paymentMethod: 'cash_on_delivery',
          
          // Timestamps
          assignedAt: '2024-08-15T07:00:00Z',
          estimatedDelivery: '2024-08-15T14:00:00Z',
          
          // Additional Info
          specialInstructions: 'Fragile items - Handle with care. Call customer 30 minutes before arrival.',
          weatherConditions: 'Clear',
          fuelCost: 4500,
          
          // Delivery Proof (if completed)
          proof: null
        },
        
        {
          id: 'DEL-2024-002',
          orderId: 'ORD-2024-568',
          trackingNumber: 'IR-2024-002345',
          status: 'delivered',
          priority: 'medium',
          
          customer: {
            id: 'RET-002',
            name: 'Mombasa Retail Store',
            type: ROLES.RETAILER,
            contact: '+254723456789',
            email: 'orders@mombasaretail.co.ke',
            location: 'Mombasa County'
          },
          
          supplier: {
            id: 'WS-001',
            name: 'Nairobi Wholesale Hub',
            type: ROLES.WHOLESALER,
            contact: '+254701234567',
            email: 'dispatch@nairobiwholesale.co.ke',
            location: 'Nairobi County'
          },
          
          driver: {
            id: 'DRV-001',
            name: 'John Mwangi',
            phone: '+254789123456',
            vehicle: 'KCA 123Y - Isuzu NQR',
            license: 'A123456789'
          },
          
          pickup: {
            address: 'Industrial Area, Nairobi',
            coordinates: { lat: -1.3194, lng: 36.8589 },
            scheduledTime: '2024-08-14T09:00:00Z',
            actualTime: '2024-08-14T09:10:00Z',
            status: 'completed'
          },
          
          delivery: {
            address: 'Nyali Bridge Area, Mombasa',
            coordinates: { lat: -4.0435, lng: 39.6682 },
            scheduledTime: '2024-08-14T18:00:00Z',
            actualTime: '2024-08-14T17:45:00Z',
            status: 'completed'
          },
          
          packages: [
            {
              id: 1,
              description: 'Cooking Oil 20L containers',
              quantity: 25,
              weight: 500,
              value: 85000
            }
          ],
          
          deliveryFee: 15000,
          totalValue: 85000,
          paymentMethod: 'bank_transfer',
          
          assignedAt: '2024-08-14T08:00:00Z',
          estimatedDelivery: '2024-08-14T18:00:00Z',
          actualDelivery: '2024-08-14T17:45:00Z',
          
          proof: {
            photos: ['proof1.jpg', 'proof2.jpg'],
            signature: 'signature.png',
            recipientName: 'Sarah Wanjiku - Store Manager',
            notes: 'Delivered in perfect condition. Customer satisfied.',
            timestamp: '2024-08-14T17:45:00Z'
          },
          
          rating: 5,
          feedback: 'Excellent delivery service! Driver was professional and on time.'
        }
      ];

      // Filter deliveries based on user role
      let filteredDeliveries = mockDeliveries;
      
      if (userRole === ROLES.DRIVER) {
        // Drivers see only their assigned deliveries
        filteredDeliveries = mockDeliveries.filter(d => d.driver.id === userId);
      }
      
      setDeliveries(filteredDeliveries);
      setIsLoading(false);
    }, 800);
  };

  const handleStatusUpdate = (deliveryId, newStatus) => {
    setDeliveries(deliveries =>
      deliveries.map(delivery =>
        delivery.id === deliveryId
          ? {
              ...delivery,
              status: newStatus,
              [`${newStatus}At`]: new Date().toISOString()
            }
          : delivery
      )
    );
  };

  const handleCompleteDelivery = (deliveryId) => {
    const delivery = deliveries.find(d => d.id === deliveryId);
    if (delivery) {
      setSelectedDelivery(delivery);
      setShowProofModal(true);
    }
  };

  const handleSubmitProof = () => {
    if (selectedDelivery) {
      const completedDelivery = {
        ...selectedDelivery,
        status: 'delivered',
        deliveredAt: new Date().toISOString(),
        proof: {
          ...deliveryProof,
          timestamp: new Date().toISOString()
        }
      };
      
      setDeliveries(deliveries =>
        deliveries.map(d =>
          d.id === selectedDelivery.id ? completedDelivery : d
        )
      );
      
      setShowProofModal(false);
      setSelectedDelivery(null);
      setDeliveryProof({
        photos: [],
        signature: null,
        notes: '',
        recipientName: ''
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned': return 'text-amber-400 bg-amber-500/20';
      case 'picked_up': return 'text-blue-400 bg-blue-500/20';
      case 'in_transit': return 'text-indigo-400 bg-indigo-500/20';
      case 'delivered': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    const matchesSearch = !searchQuery ||
      delivery.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.supplier.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const viewRouteDetails = (delivery) => {
    setRoutePreview(delivery);
  };

  const closeRoutePreview = () => {
    setRoutePreview(null);
  };

  const DeliveryCard = ({ delivery }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-900/20 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5 hover:border-blue-500/50 transition-all shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Truck className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{delivery.trackingNumber}</h3>
            <p className="text-blue-300 text-sm">{delivery.orderId}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(delivery.priority)}`}>
                {delivery.priority.toUpperCase()}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(delivery.status)}`}>
                {delivery.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold text-green-400">
            KES {delivery.deliveryFee.toLocaleString()}
          </div>
          <div className="text-blue-300 text-sm">
            {new Date(delivery.assignedAt).toLocaleDateString('en-KE', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Route Progress */}
      {delivery.status === 'in_transit' && delivery.route && (
        <div className="mb-4 p-3 bg-blue-800/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-200">Route Progress</span>
            <span className="text-sm text-blue-400">{delivery.route.currentProgress}%</span>
          </div>
          <div className="w-full bg-blue-700/30 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${delivery.route.currentProgress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-blue-300">
            <span>Distance: {delivery.route.totalDistance} km</span>
            <span>ETA: {delivery.route.estimatedDuration} min</span>
          </div>
        </div>
      )}

      {/* Addresses */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-blue-200">
          <MapPin className="h-4 w-4 text-green-400" />
          <div>
            <div className="text-xs text-blue-300">Pickup</div>
            <div>{delivery.pickup.address}</div>
          </div>
          {delivery.pickup.status === 'completed' && (
            <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
          )}
        </div>
        
        <div className="h-px bg-blue-700/50 mx-2"></div>
        
        <div className="flex items-center gap-2 text-blue-200">
          <MapPin className="h-4 w-4 text-red-400" />
          <div>
            <div className="text-xs text-blue-300">Delivery</div>
            <div>{delivery.delivery.address}</div>
          </div>
          {delivery.delivery.status === 'completed' && (
            <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
          )}
        </div>
      </div>

      {/* Customer & Driver Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="bg-blue-800/20 rounded-lg p-2">
          <div className="text-blue-300 text-xs mb-1">Customer</div>
          <div className="text-white font-medium">{delivery.customer.name}</div>
          <div className="text-blue-400 text-xs">{delivery.customer.location}</div>
        </div>
        <div className="bg-blue-800/20 rounded-lg p-2">
          <div className="text-blue-300 text-xs mb-1">Driver</div>
          <div className="text-white font-medium">{delivery.driver.name}</div>
          <div className="text-blue-400 text-xs">{delivery.driver.vehicle}</div>
        </div>
      </div>

      {/* Packages Summary */}
      <div className="mb-4">
        <div className="text-sm text-blue-300 mb-2">
          Packages ({delivery.packages.length})
        </div>
        <div className="space-y-1">
          {delivery.packages.slice(0, 2).map(pkg => (
            <div key={pkg.id} className="flex justify-between text-sm bg-blue-800/30 rounded p-2">
              <span className="text-blue-200">{pkg.description}</span>
              <span className="text-blue-400">Qty: {pkg.quantity}</span>
            </div>
          ))}
          {delivery.packages.length > 2 && (
            <div className="text-center text-blue-400 text-sm">
              +{delivery.packages.length - 2} more packages
            </div>
          )}
        </div>
      </div>

      {/* Delivery Proof */}
      {delivery.proof && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Delivery Confirmed</span>
          </div>
          <div className="text-xs text-blue-200">
            Received by: {delivery.proof.recipientName}
          </div>
          <div className="text-xs text-blue-300">
            {new Date(delivery.proof.timestamp).toLocaleString('en-KE')}
          </div>
          {delivery.rating && (
            <div className="flex items-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < delivery.rating ? 'text-amber-400 fill-current' : 'text-blue-600'
                  }`}
                />
              ))}
              <span className="text-xs text-blue-200 ml-1">({delivery.rating}/5)</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-blue-700/30">
        <button
          onClick={() => setSelectedDelivery(delivery)}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm"
        >
          <Eye className="h-4 w-4" />
          View Details
        </button>
        
        {userRole === ROLES.DRIVER && delivery.status === 'assigned' && (
          <button
            onClick={() => handleStatusUpdate(delivery.id, 'picked_up')}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-2 px-3 rounded-lg transition flex items-center gap-2 text-sm"
          >
            <PlayCircle className="h-4 w-4" />
            Start
          </button>
        )}
        
        {userRole === ROLES.DRIVER && delivery.status === 'in_transit' && (
          <button
            onClick={() => handleCompleteDelivery(delivery.id)}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-2 px-3 rounded-lg transition flex items-center gap-2 text-sm"
          >
            <CheckCircle className="h-4 w-4" />
            Complete
          </button>
        )}
        
        <button 
          onClick={() => viewRouteDetails(delivery)}
          className="p-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition flex items-center justify-center"
        >
          <Route className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );

  const ProofOfDeliveryModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-lg rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-700/50"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Proof of Delivery</h3>
            <button
              onClick={() => setShowProofModal(false)}
              className="p-2 hover:bg-blue-800/30 rounded-lg transition"
            >
              <XCircle className="h-5 w-5 text-blue-300" />
            </button>
          </div>

          {selectedDelivery && (
            <div className="space-y-6">
              <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-700/30">
                <h4 className="text-lg font-semibold text-white mb-2">Delivery Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-blue-800/30">
                    <span className="text-blue-300">Tracking:</span>
                    <span className="text-white">{selectedDelivery.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-blue-800/30">
                    <span className="text-blue-300">Customer:</span>
                    <span className="text-white">{selectedDelivery.customer.name}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-blue-300">Address:</span>
                    <span className="text-white text-right">{selectedDelivery.delivery.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={deliveryProof.recipientName}
                  onChange={(e) => setDeliveryProof({ ...deliveryProof, recipientName: e.target.value })}
                  className="w-full px-3 py-2 bg-blue-800/20 border border-blue-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter recipient's full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Delivery Notes
                </label>
                <textarea
                  value={deliveryProof.notes}
                  onChange={(e) => setDeliveryProof({ ...deliveryProof, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-blue-800/20 border border-blue-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Any additional notes about the delivery"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Photo Evidence
                </label>
                <div className="border-2 border-dashed border-blue-700/50 rounded-lg p-6 text-center bg-blue-800/10">
                  <Camera className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-400 text-sm mb-2">Take photos of delivered packages</p>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg transition">
                    Capture Photos
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Digital Signature
                </label>
                <div className="border border-blue-700/50 rounded-lg p-6 text-center bg-blue-800/10">
                  <FileText className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-400 text-sm mb-2">Get recipient's signature</p>
                  <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg transition">
                    Capture Signature
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-blue-700/30">
                <button
                  onClick={handleSubmitProof}
                  disabled={!deliveryProof.recipientName.trim()}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition"
                >
                  Complete Delivery
                </button>
                <button
                  onClick={() => setShowProofModal(false)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition"
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

  const RoutePreviewModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-lg rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-blue-700/50"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Route Details</h3>
            <button
              onClick={closeRoutePreview}
              className="p-2 hover:bg-blue-800/30 rounded-lg transition"
            >
              <XCircle className="h-5 w-5 text-blue-300" />
            </button>
          </div>

          {routePreview && (
            <div className="space-y-6">
              <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-700/30">
                <div className="flex justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{routePreview.trackingNumber}</h4>
                    <p className="text-blue-300">{routePreview.orderId}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-400">
                      KES {routePreview.deliveryFee.toLocaleString()}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(routePreview.status)}`}>
                      {routePreview.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-300">Pickup Location</div>
                      <div className="text-white">{routePreview.pickup.address}</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="h-12 w-0.5 bg-gradient-to-b from-green-400 to-blue-400"></div>
                  </div>

                  {routePreview.route?.waypoints?.map((waypoint, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          waypoint.status === 'completed' 
                            ? 'bg-green-500/20' 
                            : waypoint.status === 'current'
                              ? 'bg-blue-500/20'
                              : 'bg-blue-800/20'
                        }`}>
                          <div className={`h-5 w-5 rounded-full ${
                            waypoint.status === 'completed' 
                              ? 'bg-green-400' 
                              : waypoint.status === 'current'
                                ? 'bg-blue-400 animate-pulse'
                                : 'bg-blue-700'
                          }`}></div>
                        </div>
                        <div>
                          <div className="text-sm text-blue-300">{waypoint.name}</div>
                          {waypoint.timestamp && (
                            <div className="text-xs text-blue-400">
                              {new Date(waypoint.timestamp).toLocaleTimeString('en-KE')}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {index < routePreview.route.waypoints.length - 1 && (
                        <div className="flex justify-center">
                          <div className="h-12 w-0.5 bg-gradient-to-b from-blue-400 to-blue-400"></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  <div className="flex justify-center">
                    <div className="h-12 w-0.5 bg-gradient-to-b from-blue-400 to-red-400"></div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/20 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-300">Delivery Location</div>
                      <div className="text-white">{routePreview.delivery.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700/30">
                  <div className="text-blue-300 text-sm mb-1">Total Distance</div>
                  <div className="text-white font-bold text-xl">
                    {routePreview.route?.totalDistance || 'N/A'} km
                  </div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700/30">
                  <div className="text-blue-300 text-sm mb-1">Estimated Time</div>
                  <div className="text-white font-bold text-xl">
                    {routePreview.route?.estimatedDuration || 'N/A'} min
                  </div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700/30">
                  <div className="text-blue-300 text-sm mb-1">Fuel Cost</div>
                  <div className="text-white font-bold text-xl">
                    KES {routePreview.fuelCost?.toLocaleString() || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-700/30">
                <h4 className="text-lg font-semibold text-white mb-3">Special Instructions</h4>
                <p className="text-blue-200">{routePreview.specialInstructions}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Delivery Tracking</h2>
          <p className="text-blue-300">Real-time delivery monitoring and status updates</p>
          <div className="flex items-center gap-2 mt-2">
            <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor('in_transit')}`}>
              {ROLE_DISPLAY_NAMES[userRole]}
            </div>
            {userRole === ROLES.DRIVER && (
              <>
                <span className="text-blue-400 text-sm">•</span>
                <span className="text-blue-400 text-sm">{userId}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg transition">
            <Navigation className="h-4 w-4" />
            Live Tracking
          </button>
          
          <button 
            onClick={loadDeliveryData}
            className="p-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
          <input
            type="text"
            placeholder="Search by tracking number, customer, or supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-blue-800/20 border border-blue-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-blue-800/20 border border-blue-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Status</option>
          <option value="assigned">Assigned</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Deliveries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDeliveries.map(delivery => (
          <DeliveryCard key={delivery.id} delivery={delivery} />
        ))}
      </div>

      {/* Empty State */}
      {filteredDeliveries.length === 0 && (
        <div className="text-center py-12">
          <Truck className="h-16 w-16 text-blue-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-400 mb-2">No deliveries found</h3>
          <p className="text-blue-500">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'No deliveries assigned yet'
            }
          </p>
        </div>
      )}

      {/* Proof of Delivery Modal */}
      {showProofModal && <ProofOfDeliveryModal />}
      
      {/* Route Preview Modal */}
      {routePreview && <RoutePreviewModal />}
    </div>
  );
};

export default DeliveryTracking;