import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Package,
  Route,
  Star,
  Calendar,
  Navigation,
  AlertCircle,
  CheckCircle,
  XCircle,
  Fuel,
  Phone,
  MessageSquare,
  Camera,
  Users,
  BarChart3,
  TrendingUp,
  Award,
  Settings,
  Bell,
  RefreshCw,
  Filter,
  Search,
  Eye,
  Play,
  Pause,
  Square,
  ChevronRight,
  Map,
  User,
  Gauge,
  CircleDollarSign,
  Loader
} from 'lucide-react';

const DriverDashboard = ({ userRole = 'driver', userId = 'DRV-001' }) => {
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [driverStats, setDriverStats] = useState({});
  const [vehicleStatus, setVehicleStatus] = useState({});
  const [earnings, setEarnings] = useState({});
  const [selectedTab, setSelectedTab] = useState('active');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRoutePreview, setShowRoutePreview] = useState(false);

  useEffect(() => {
    loadDriverData();
  }, [userId]);

  const loadDriverData = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simulate driver data
      const mockActiveDeliveries = [
        {
          id: 'DEL-2024-001',
          orderId: 'ORD-2024-567',
          customer: {
            name: 'Nakuru Supermarket',
            phone: '+254712345678',
            address: 'Nakuru Town, West Street',
            coordinates: { lat: -0.3031, lng: 36.0800 },
            location: 'Nakuru County'
          },
          supplier: {
            name: 'Unga Farm Care Ltd',
            address: 'Industrial Area, Nairobi',
            location: 'Nairobi County'
          },
          products: [
            { name: 'Maize Flour 50kg', quantity: 100, weight: 5000 },
            { name: 'Wheat Flour 25kg', quantity: 50, weight: 1250 }
          ],
          status: 'in_transit',
          priority: 'high',
          estimatedDeliveryTime: '2024-08-15T14:30:00Z',
          pickupTime: '2024-08-15T08:00:00Z',
          distance: 156,
          deliveryFee: 12000,
          specialInstructions: 'Fragile items - Handle with care. Call customer 30 minutes before arrival.',
          route: {
            totalDistance: 156,
            estimatedTime: 180,
            currentProgress: 65,
            waypoints: [
              { name: 'Pickup Location', status: 'completed' },
              { name: 'Nakuru Highway', status: 'current' },
              { name: 'Nakuru Town Center', status: 'pending' }
            ]
          }
        },
        {
          id: 'DEL-2024-002',
          orderId: 'ORD-2024-568',
          customer: {
            name: 'Mombasa Wholesale Hub',
            phone: '+254723456789',
            address: 'Mombasa, Nyali Bridge Area',
            coordinates: { lat: -4.0435, lng: 39.6682 },
            location: 'Mombasa County'
          },
          supplier: {
            name: 'Coast Foods Manufacturing',
            address: 'Mombasa Industrial Area',
            location: 'Mombasa County'
          },
          products: [
            { name: 'Rice 25kg bags', quantity: 200, weight: 5000 },
            { name: 'Cooking Oil 20L', quantity: 100, weight: 2000 }
          ],
          status: 'pending',
          priority: 'medium',
          estimatedDeliveryTime: '2024-08-15T16:00:00Z',
          distance: 45,
          deliveryFee: 8500,
          specialInstructions: 'Delivery after 3 PM only. Use rear entrance.'
        }
      ];

      const mockCompletedDeliveries = [
        {
          id: 'DEL-2024-003',
          orderId: 'ORD-2024-565',
          customer: {
            name: 'Kisumu Central Market',
            address: 'Kisumu, Central Business District',
            location: 'Kisumu County'
          },
          completedAt: '2024-08-14T15:30:00Z',
          deliveryFee: 15000,
          rating: 5,
          feedback: 'Excellent service! On time and professional.',
          distance: 198
        },
        {
          id: 'DEL-2024-004',
          orderId: 'ORD-2024-566',
          customer: {
            name: 'Eldoret Wholesalers',
            address: 'Eldoret CBD, Uganda Road',
            location: 'Uasin Gishu County'
          },
          completedAt: '2024-08-13T12:45:00Z',
          deliveryFee: 11000,
          rating: 4,
          feedback: 'Good service, but arrived 15 minutes late',
          distance: 125
        }
      ];

      const mockDriverStats = {
        name: 'John Mwangi',
        id: 'DRV-001',
        totalDeliveries: 234,
        successfulDeliveries: 228,
        successRate: 97.4,
        averageRating: 4.8,
        totalDistance: 45678,
        totalEarnings: 890000,
        onTimeDeliveries: 215,
        onTimeRate: 94.3,
        joinedDate: '2023-03-15'
      };

      const mockVehicleStatus = {
        vehicleId: 'VH-001',
        make: 'Isuzu',
        model: 'NQR 500',
        licensePlate: 'KCA 123Y',
        fuelLevel: 75,
        mileage: 145678,
        lastService: '2024-07-15',
        nextService: '2024-09-15',
        status: 'active',
        gpsStatus: 'online',
        engineStatus: 'good',
        loadCapacity: 8000,
        currentLoad: 6250,
        location: 'Nairobi-Nakuru Highway',
        speed: 65
      };

      const mockEarnings = {
        today: 8500,
        thisWeek: 45000,
        thisMonth: 185000,
        lastMonth: 175000,
        totalEarnings: 890000,
        pendingPayments: 12000,
        averagePerDelivery: 3800,
        weeklyTarget: 50000,
        paymentMethod: 'M-Pesa',
        nextPayout: '2024-08-20'
      };

      setActiveDeliveries(mockActiveDeliveries);
      setCompletedDeliveries(mockCompletedDeliveries);
      setDriverStats(mockDriverStats);
      setVehicleStatus(mockVehicleStatus);
      setEarnings(mockEarnings);
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-400 bg-emerald-500/20';
      case 'in_transit': return 'text-blue-400 bg-blue-500/20';
      case 'pending': return 'text-amber-400 bg-amber-500/20';
      case 'cancelled': return 'text-rose-400 bg-rose-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-rose-400 bg-rose-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/20';
      case 'low': return 'text-emerald-400 bg-emerald-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const handleStartDelivery = (deliveryId) => {
    setActiveDeliveries(deliveries =>
      deliveries.map(delivery =>
        delivery.id === deliveryId
          ? { ...delivery, status: 'in_transit', startTime: new Date().toISOString() }
          : delivery
      )
    );
  };

  const handleCompleteDelivery = (deliveryId) => {
    const delivery = activeDeliveries.find(d => d.id === deliveryId);
    if (delivery) {
      const completedDelivery = {
        ...delivery,
        status: 'completed',
        completedAt: new Date().toISOString()
      };
      
      setCompletedDeliveries(prev => [completedDelivery, ...prev]);
      setActiveDeliveries(prev => prev.filter(d => d.id !== deliveryId));
    }
  };

  const viewRouteDetails = (delivery) => {
    setSelectedDelivery(delivery);
    setShowRoutePreview(true);
  };

  const closeRoutePreview = () => {
    setShowRoutePreview(false);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue', trend }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 bg-${color}-500/20 rounded-lg`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            <TrendingUp className="h-4 w-4" />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-blue-400 text-sm">{title}</p>
        {subtitle && <p className="text-blue-500 text-xs mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );

  const DeliveryCard = ({ delivery, isActive = true }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-lg border border-blue-700/30 rounded-xl p-5 hover:border-blue-500/50 transition-all shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{delivery.customer.name}</h3>
          <p className="text-blue-400 text-sm">{delivery.customer.location}</p>
          <p className="text-blue-500 text-xs">{delivery.id}</p>
        </div>
        <div className="flex items-center gap-2">
          {delivery.priority && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(delivery.priority)}`}>
              {delivery.priority.toUpperCase()}
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
            {delivery.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-blue-200">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{delivery.customer.address}</span>
        </div>
        
        <div className="flex items-center gap-2 text-blue-200">
          <Package className="h-4 w-4" />
          <span className="text-sm">
            {delivery.products?.length || 1} items • {delivery.distance}km
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-emerald-400">
          <DollarSign className="h-4 w-4" />
          <span className="text-sm font-medium">KES {delivery.deliveryFee?.toLocaleString()}</span>
        </div>

        {delivery.estimatedDeliveryTime && (
          <div className="flex items-center gap-2 text-blue-200">
            <Clock className="h-4 w-4" />
            <span className="text-sm">
              ETA: {new Date(delivery.estimatedDeliveryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}

        {delivery.route && (
          <div className="bg-blue-800/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-300">Route Progress</span>
              <span className="text-sm text-blue-400">{delivery.route.currentProgress}%</span>
            </div>
            <div className="w-full bg-blue-700/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${delivery.route.currentProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-blue-400 mt-1">
              <span>{delivery.route.estimatedTime} min</span>
              <span>{delivery.route.totalDistance} km</span>
            </div>
          </div>
        )}
      </div>

      {isActive && (
        <div className="flex gap-2 pt-4 border-t border-blue-700/30">
          {delivery.status === 'pending' && (
            <button
              onClick={() => handleStartDelivery(delivery.id)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <Play className="h-4 w-4" />
              Start Delivery
            </button>
          )}
          
          {delivery.status === 'in_transit' && (
            <button
              onClick={() => handleCompleteDelivery(delivery.id)}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 text-sm"
            >
              <CheckCircle className="h-4 w-4" />
              Complete
            </button>
          )}

          <button
            onClick={() => setSelectedDelivery(delivery)}
            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition flex items-center gap-2 text-sm"
          >
            <Eye className="h-4 w-4" />
            Details
          </button>

          <button 
            onClick={() => viewRouteDetails(delivery)}
            className="p-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition"
          >
            <Map className="h-4 w-4" />
          </button>
        </div>
      )}
    </motion.div>
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

          {selectedDelivery && (
            <div className="space-y-6">
              <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-700/30">
                <div className="flex justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{selectedDelivery.trackingNumber || selectedDelivery.id}</h4>
                    <p className="text-blue-300">{selectedDelivery.orderId}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-400">
                      KES {selectedDelivery.deliveryFee?.toLocaleString()}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedDelivery.status)}`}>
                      {selectedDelivery.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500/20 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-300">Pickup Location</div>
                      <div className="text-white">{selectedDelivery.supplier?.address}</div>
                      <div className="text-xs text-blue-400">{selectedDelivery.supplier?.location}</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="h-12 w-0.5 bg-gradient-to-b from-emerald-400 to-blue-400"></div>
                  </div>

                  {selectedDelivery.route?.waypoints?.map((waypoint, index) => (
                    <React.Fragment key={index}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          waypoint.status === 'completed' 
                            ? 'bg-emerald-500/20' 
                            : waypoint.status === 'current'
                              ? 'bg-blue-500/20'
                              : 'bg-blue-800/20'
                        }`}>
                          <div className={`h-5 w-5 rounded-full ${
                            waypoint.status === 'completed' 
                              ? 'bg-emerald-400' 
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
                      
                      {index < selectedDelivery.route.waypoints.length - 1 && (
                        <div className="flex justify-center">
                          <div className="h-12 w-0.5 bg-gradient-to-b from-blue-400 to-blue-400"></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  <div className="flex justify-center">
                    <div className="h-12 w-0.5 bg-gradient-to-b from-blue-400 to-rose-400"></div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-rose-500/20 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-rose-400" />
                    </div>
                    <div>
                      <div className="text-sm text-blue-300">Delivery Location</div>
                      <div className="text-white">{selectedDelivery.customer.address}</div>
                      <div className="text-xs text-blue-400">{selectedDelivery.customer.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700/30">
                  <div className="text-blue-300 text-sm mb-1">Total Distance</div>
                  <div className="text-white font-bold text-xl">
                    {selectedDelivery.route?.totalDistance || selectedDelivery.distance} km
                  </div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700/30">
                  <div className="text-blue-300 text-sm mb-1">Estimated Time</div>
                  <div className="text-white font-bold text-xl">
                    {selectedDelivery.route?.estimatedTime || 'N/A'} min
                  </div>
                </div>
                <div className="bg-blue-800/30 rounded-lg p-3 border border-blue-700/30">
                  <div className="text-blue-300 text-sm mb-1">Delivery Fee</div>
                  <div className="text-white font-bold text-xl">
                    KES {selectedDelivery.deliveryFee?.toLocaleString()}
                  </div>
                </div>
              </div>

              {selectedDelivery.specialInstructions && (
                <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-700/30">
                  <h4 className="text-lg font-semibold text-white mb-3">Special Instructions</h4>
                  <p className="text-blue-200">{selectedDelivery.specialInstructions}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col gap-6 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="h-8 w-64 bg-blue-900/30 rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 w-80 bg-blue-900/30 rounded-lg animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-blue-900/30 rounded-lg animate-pulse"></div>
            <div className="h-10 w-32 bg-blue-900/30 rounded-lg animate-pulse"></div>
            <div className="h-10 w-10 bg-blue-900/30 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="bg-blue-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6 animate-pulse">
              <div className="h-10 w-10 bg-blue-800/30 rounded-lg mb-4"></div>
              <div className="h-8 w-32 bg-blue-800/30 rounded mb-2"></div>
              <div className="h-4 w-48 bg-blue-800/30 rounded"></div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6 animate-pulse">
          <div className="h-8 w-64 bg-blue-800/30 rounded-lg mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-24 bg-blue-800/30 rounded-lg"></div>
            <div className="h-24 bg-blue-800/30 rounded-lg"></div>
            <div className="h-24 bg-blue-800/30 rounded-lg"></div>
            <div className="h-24 bg-blue-800/30 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Driver Dashboard</h2>
          <p className="text-blue-400">Manage your deliveries and track performance</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2 bg-blue-800/30 px-3 py-1 rounded-full">
              <User className="h-4 w-4 text-blue-300" />
              <span className="text-blue-300 text-sm">{driverStats.name} • {driverStats.id}</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full">
              <Award className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm">Top Driver</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2 text-white rounded-lg transition">
            <Navigation className="h-4 w-4" />
            Navigation
          </button>
          
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 px-4 py-2 text-white rounded-lg transition">
            <Bell className="h-4 w-4" />
            Notifications
          </button>
          
          <button 
            onClick={loadDriverData}
            className="p-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Truck}
          title="Active Deliveries"
          value={activeDeliveries.length}
          subtitle="In progress"
          color="blue"
        />
        <StatCard
          icon={CircleDollarSign}
          title="Today's Earnings"
          value={`KES ${earnings.today?.toLocaleString()}`}
          subtitle={`Target: KES ${Math.round(earnings.weeklyTarget / 7).toLocaleString()}`}
          color="emerald"
          trend={12.5}
        />
        <StatCard
          icon={Star}
          title="Rating"
          value={driverStats.averageRating}
          subtitle={`${driverStats.totalDeliveries} deliveries`}
          color="amber"
        />
        <StatCard
          icon={CheckCircle}
          title="Success Rate"
          value={`${driverStats.successRate}%`}
          subtitle={`${driverStats.onTimeRate}% on time`}
          color="emerald"
          trend={2.1}
        />
      </div>

      {/* Vehicle Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Truck className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                {vehicleStatus.make} {vehicleStatus.model}
              </h3>
              <p className="text-blue-400 text-sm">{vehicleStatus.licensePlate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm">Online</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{vehicleStatus.fuelLevel}%</div>
            <div className="text-blue-400 text-sm flex items-center justify-center gap-1">
              <Fuel className="h-4 w-4" />
              Fuel Level
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{vehicleStatus.mileage?.toLocaleString()}</div>
            <div className="text-blue-400 text-sm">Mileage (km)</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{Math.round((vehicleStatus.currentLoad / vehicleStatus.loadCapacity) * 100)}%</div>
            <div className="text-blue-400 text-sm">Load Capacity</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">Good</div>
            <div className="text-blue-400 text-sm">Engine Status</div>
          </div>
        </div>
      </motion.div>

      {/* Delivery Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-1 bg-blue-800/30 rounded-lg p-1">
          <button
            onClick={() => setSelectedTab('active')}
            className={`px-4 py-2 rounded-md transition ${
              selectedTab === 'active' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                : 'text-blue-400 hover:text-white'
            }`}
          >
            Active Deliveries ({activeDeliveries.length})
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`px-4 py-2 rounded-md transition ${
              selectedTab === 'completed' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                : 'text-blue-400 hover:text-white'
            }`}
          >
            Completed ({completedDeliveries.length})
          </button>
          <button
            onClick={() => setSelectedTab('earnings')}
            className={`px-4 py-2 rounded-md transition ${
              selectedTab === 'earnings' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                : 'text-blue-400 hover:text-white'
            }`}
          >
            Earnings
          </button>
        </div>

        {/* Active Deliveries */}
        {selectedTab === 'active' && (
          <div className="space-y-4">
            {activeDeliveries.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeDeliveries.map(delivery => (
                  <DeliveryCard key={delivery.id} delivery={delivery} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Truck className="h-16 w-16 text-blue-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-400 mb-2">No active deliveries</h3>
                <p className="text-blue-500">You're all caught up! New deliveries will appear here.</p>
              </div>
            )}
          </div>
        )}

        {/* Completed Deliveries */}
        {selectedTab === 'completed' && (
          <div className="space-y-4">
            {completedDeliveries.length > 0 ? (
              <div className="space-y-4">
                {completedDeliveries.map(delivery => (
                  <motion.div
                    key={delivery.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{delivery.customer.name}</h3>
                        <p className="text-blue-400 text-sm">{delivery.customer.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-semibold">KES {delivery.deliveryFee?.toLocaleString()}</div>
                        <div className="text-blue-400 text-sm">
                          {new Date(delivery.completedAt).toLocaleDateString('en-KE')}
                        </div>
                      </div>
                    </div>
                    
                    {delivery.rating && (
                      <div className="mt-4 p-3 bg-blue-800/20 rounded-lg border border-blue-700/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < delivery.rating ? 'text-amber-400 fill-current' : 'text-blue-700'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-blue-300">{delivery.rating}/5</span>
                        </div>
                        {delivery.feedback && (
                          <p className="text-blue-300 text-sm italic">"{delivery.feedback}"</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-blue-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-400 mb-2">No completed deliveries yet</h3>
                <p className="text-blue-500">Completed deliveries will appear here.</p>
              </div>
            )}
          </div>
        )}

        {/* Earnings Tab */}
        {selectedTab === 'earnings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Weekly Earnings</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-400">This Week</span>
                  <span className="text-emerald-400 font-semibold">KES {earnings.thisWeek?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">Target</span>
                  <span className="text-blue-300">KES {earnings.weeklyTarget?.toLocaleString()}</span>
                </div>
                <div className="w-full bg-blue-700/30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min((earnings.thisWeek / earnings.weeklyTarget) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-center text-sm text-blue-400">
                  {Math.round((earnings.thisWeek / earnings.weeklyTarget) * 100)}% of target
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-400">This Month</span>
                  <span className="text-emerald-400 font-semibold">KES {earnings.thisMonth?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">Last Month</span>
                  <span className="text-blue-300">KES {earnings.lastMonth?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">Growth</span>
                  <span className={`font-semibold ${
                    earnings.thisMonth > earnings.lastMonth ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {earnings.thisMonth > earnings.lastMonth ? '+' : ''}
                    {(((earnings.thisMonth - earnings.lastMonth) / earnings.lastMonth) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-lg border border-blue-700/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Payment Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-400">Pending</span>
                  <span className="text-amber-400 font-semibold">KES {earnings.pendingPayments?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">Avg per Delivery</span>
                  <span className="text-blue-300">KES {earnings.averagePerDelivery?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">Total Earned</span>
                  <span className="text-emerald-400 font-semibold">KES {earnings.totalEarnings?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-blue-700/30">
                  <span className="text-blue-400">Payment Method</span>
                  <span className="text-blue-300">{earnings.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-400">Next Payout</span>
                  <span className="text-blue-300">
                    {earnings.nextPayout ? new Date(earnings.nextPayout).toLocaleDateString('en-KE') : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Route Preview Modal */}
      {showRoutePreview && <RoutePreviewModal />}
    </div>
  );
};

export default DriverDashboard;