import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Shield,
  Settings,
  BarChart3,
  FileText,
  HelpCircle,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Package,
  Truck,
  Store,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Eye,
  MoreHorizontal,
  Activity,
  Database,
  Server,
  Wifi,
  ShieldCheck,
  UserCheck,
  Ban,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Globe,
  MapPin,
  Phone,
  Mail,
  Calendar,
  PieChart,
  ChevronDown,
  ChevronRight,
  Plus,
  User,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { ROLES, ROLE_DISPLAY_NAMES, hasPermission, PERMISSIONS } from '../utils/roleManagement';

const AdminDashboard = ({ userRole = 'admin', userId = 'ADM-001' }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [systemStats, setSystemStats] = useState({});
  const [platformMetrics, setPlatformMetrics] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockUsers = [
        // ... existing mock users data
        {
          id: 'USR-001',
          name: 'John Kamau',
          email: 'j.kamau@ungafarmcare.co.ke',
          role: ROLES.MANUFACTURER,
          status: 'active',
          phone: '+254701234567',
          location: 'Nairobi, Kenya',
          joinDate: '2024-01-15',
          lastLogin: '2024-08-15T10:30:00Z',
          totalOrders: 567,
          totalRevenue: 12500000,
          rating: 4.8,
          isVerified: true,
          companyName: 'Unga Farm Care Ltd',
          deliveryStats: {
            onTime: 92,
            late: 8
          },
          performanceHistory: [
            { month: 'Jun', orders: 120 },
            { month: 'Jul', orders: 145 },
            { month: 'Aug', orders: 167 }
          ]
        },
        {
          id: 'USR-002',
          name: 'Sarah Wanjiku',
          email: 'sarah.w@wholesale.co.ke',
          role: ROLES.WHOLESALER,
          status: 'active',
          phone: '+254702345678',
          location: 'Mombasa, Kenya',
          joinDate: '2024-02-20',
          lastLogin: '2024-08-15T09:15:00Z',
          totalOrders: 234,
          totalRevenue: 5600000,
          rating: 4.6,
          isVerified: true,
          companyName: 'Coast Wholesale Hub',
          deliveryStats: {
            onTime: 87,
            late: 13
          },
          performanceHistory: [
            { month: 'Jun', orders: 80 },
            { month: 'Jul', orders: 95 },
            { month: 'Aug', orders: 112 }
          ]
        },
        {
          id: 'USR-003',
          name: 'Peter Otieno',
          email: 'p.otieno@retail.co.ke',
          role: ROLES.RETAILER,
          status: 'suspended',
          phone: '+254703456789',
          location: 'Kisumu, Kenya',
          joinDate: '2024-03-10',
          lastLogin: '2024-08-10T16:45:00Z',
          totalOrders: 89,
          totalRevenue: 890000,
          rating: 4.2,
          isVerified: false,
          companyName: 'Kisumu Central Market',
          deliveryStats: {
            onTime: 78,
            late: 22
          },
          performanceHistory: [
            { month: 'Jun', orders: 25 },
            { month: 'Jul', orders: 32 },
            { month: 'Aug', orders: 28 }
          ]
        },
        {
          id: 'USR-004',
          name: 'David Kiprop',
          email: 'd.kiprop@driver.co.ke',
          role: ROLES.DRIVER,
          status: 'active',
          phone: '+254704567890',
          location: 'Nakuru, Kenya',
          joinDate: '2024-04-05',
          lastLogin: '2024-08-15T12:20:00Z',
          totalDeliveries: 456,
          totalEarnings: 1200000,
          rating: 4.9,
          isVerified: true,
          vehicleType: 'Isuzu NQR 500',
          deliveryStats: {
            onTime: 98,
            late: 2
          },
          performanceHistory: [
            { month: 'Jun', deliveries: 135 },
            { month: 'Jul', deliveries: 142 },
            { month: 'Aug', deliveries: 156 }
          ]
        },
        {
          id: 'USR-005',
          name: 'Esther Muthoni',
          email: 'e.muthoni@agro.co.ke',
          role: ROLES.MANUFACTURER,
          status: 'pending',
          phone: '+254705678901',
          location: 'Eldoret, Kenya',
          joinDate: '2024-05-12',
          lastLogin: '2024-08-14T14:10:00Z',
          totalOrders: 321,
          totalRevenue: 7800000,
          rating: 4.7,
          isVerified: true,
          companyName: 'Eldoret Agro Products',
          deliveryStats: {
            onTime: 90,
            late: 10
          },
          performanceHistory: [
            { month: 'Jun', orders: 85 },
            { month: 'Jul', orders: 105 },
            { month: 'Aug', orders: 120 }
          ]
        },
        {
          id: 'USR-006',
          name: 'Michael Omondi',
          email: 'm.omondi@distro.co.ke',
          role: ROLES.WHOLESALER,
          status: 'active',
          phone: '+254706789012',
          location: 'Thika, Kenya',
          joinDate: '2024-06-18',
          lastLogin: '2024-08-15T08:45:00Z',
          totalOrders: 198,
          totalRevenue: 4300000,
          rating: 4.5,
          isVerified: true,
          companyName: 'Thika Distribution Hub',
          deliveryStats: {
            onTime: 85,
            late: 15
          },
          performanceHistory: [
            { month: 'Jun', orders: 45 },
            { month: 'Jul', orders: 62 },
            { month: 'Aug', orders: 78 }
          ]
        },
        {
          id: 'USR-007',
          name: 'Grace Atieno',
          email: 'g.atieno@driver.co.ke',
          role: ROLES.DRIVER,
          status: 'inactive',
          phone: '+254707890123',
          location: 'Kisii, Kenya',
          joinDate: '2024-07-22',
          lastLogin: '2024-08-05T11:20:00Z',
          totalDeliveries: 123,
          totalEarnings: 320000,
          rating: 4.3,
          isVerified: true,
          vehicleType: 'Toyota Hilux',
          deliveryStats: {
            onTime: 82,
            late: 18
          },
          performanceHistory: [
            { month: 'Jul', deliveries: 85 },
            { month: 'Aug', deliveries: 92 }
          ]
        }
      ];

      const mockSystemStats = {
        totalUsers: 1247,
        activeUsers: 1156,
        newUsersToday: 12,
        totalOrders: 15678,
        pendingOrders: 234,
        completedDeliveries: 12456,
        totalRevenue: 45600000,
        systemUptime: 99.8,
        averageResponseTime: 120,
        storageUsed: 67,
        bandwidthUsage: 45,
        performanceTrends: {
          users: [1120, 1150, 1180, 1200, 1220, 1240, 1247],
          orders: [12000, 12800, 13600, 14200, 14800, 15300, 15678],
          revenue: [32, 36, 39, 41, 43, 45, 45.6] // in millions
        }
      };

      const mockPlatformMetrics = {
        manufacturers: { count: 89, growth: 12.5, revenue: 25600000 },
        wholesalers: { count: 234, growth: 8.3, revenue: 15800000 },
        retailers: { count: 567, growth: 15.7, revenue: 4200000 },
        drivers: { count: 357, growth: 18.2, earnings: 8900000 }
      };

      const mockRecentActivity = [
        // ... existing recent activity
      ];

      const mockAlerts = [
        // ... existing alerts
      ];

      setUsers(mockUsers);
      setSystemStats(mockSystemStats);
      setPlatformMetrics(mockPlatformMetrics);
      setRecentActivity(mockRecentActivity);
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'inactive': return 'text-gray-400 bg-gray-500/20';
      case 'suspended': return 'text-red-400 bg-red-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case ROLES.MANUFACTURER: return 'text-purple-400 bg-purple-500/20';
      case ROLES.WHOLESALER: return 'text-blue-400 bg-blue-500/20';
      case ROLES.RETAILER: return 'text-green-400 bg-green-500/20';
      case ROLES.DRIVER: return 'text-orange-400 bg-orange-500/20';
      case ROLES.ADMIN: return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchQuery || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.companyName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue', trend, onClick }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 ${onClick ? 'cursor-pointer hover:border-blue-500/30' : ''} transition-all`}
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 bg-${color}-500/20 rounded-lg`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-gray-400 text-sm">{title}</p>
        {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );

  const PerformanceChart = ({ data, color }) => (
    <div className="flex items-end gap-1 h-10 mt-2">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${item}%` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`w-2 rounded-t ${color}`}
          style={{ height: `${item * 0.3}px` }}
        />
      ))}
    </div>
  );

  const UserModal = () => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              {selectedUser ? `${selectedUser.name}'s Profile` : 'Add New User'}
            </h3>
            <button
              onClick={() => {
                setShowUserModal(false);
                setSelectedUser(null);
              }}
              className="p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <XCircle className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {selectedUser && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-gray-700/50 rounded-xl p-5">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">{selectedUser.name}</h4>
                      <p className="text-gray-400">{selectedUser.email}</p>
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getRoleColor(selectedUser.role)}`}>
                          {ROLE_DISPLAY_NAMES[selectedUser.role]}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status.toUpperCase()}
                        </span>
                        {selectedUser.isVerified && (
                          <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{selectedUser.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-white">{selectedUser.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-white">
                          Joined {new Date(selectedUser.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-white">
                          Last login: {new Date(selectedUser.lastLogin).toLocaleString()}
                        </span>
                      </div>
                      {selectedUser.companyName && (
                        <div className="flex items-center gap-3">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{selectedUser.companyName}</span>
                        </div>
                      )}
                      {selectedUser.vehicleType && (
                        <div className="flex items-center gap-3">
                          <Truck className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{selectedUser.vehicleType}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 space-y-6">
                  <div className="bg-gray-700/50 rounded-xl p-5">
                    <h4 className="text-md font-semibold text-white mb-4">Performance Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">
                          {selectedUser.role === ROLES.DRIVER ? 'Total Deliveries' : 'Total Orders'}
                        </div>
                        <div className="text-2xl font-bold text-white mt-1">
                          {selectedUser.totalDeliveries || selectedUser.totalOrders || 0}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">
                          {selectedUser.role === ROLES.DRIVER ? 'Total Earnings' : 'Total Revenue'}
                        </div>
                        <div className="text-2xl font-bold text-green-400 mt-1">
                          KES {(selectedUser.totalEarnings || selectedUser.totalRevenue || 0).toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">On-Time Rate</div>
                        <div className="text-2xl font-bold text-white mt-1">
                          {selectedUser.deliveryStats?.onTime || 0}%
                        </div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">User Rating</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-4 h-4 rounded mx-0.5 ${
                                  i < selectedUser.rating ? 'bg-yellow-400' : 'bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-white">{selectedUser.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h5 className="text-gray-400 text-sm mb-3">Performance History</h5>
                      <PerformanceChart 
                        data={selectedUser.performanceHistory.map(item => 
                          selectedUser.role === ROLES.DRIVER ? item.deliveries : item.orders
                        )} 
                        color="bg-blue-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {selectedUser.performanceHistory.map(item => (
                          <span key={item.month}>{item.month}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700/50 rounded-xl p-5">
                    <h4 className="text-md font-semibold text-white mb-4">Account Actions</h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </button>
                      <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
                        {selectedUser.status === 'active' ? <Ban className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        {selectedUser.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                      </button>
                      <button className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  const toggleUserDetails = (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-white"
          >
            Admin Dashboard
          </motion.h2>
          <p className="text-gray-400">System overview and management controls</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-2 rounded-lg">
            <AlertTriangle className="h-4 w-4" />
            {alerts.filter(a => !a.isRead).length} alerts
          </div>
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition">
            <Download className="h-4 w-4" />
            Export Report
          </button>
          
          <button 
            onClick={loadAdminData}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Users}
              title="Total Users"
              value={systemStats.totalUsers?.toLocaleString()}
              subtitle={`${systemStats.newUsersToday} new today`}
              color="blue"
              trend={12.5}
              onClick={() => setSelectedTab('users')}
            />
            <StatCard
              icon={Package}
              title="Total Orders"
              value={systemStats.totalOrders?.toLocaleString()}
              subtitle={`${systemStats.pendingOrders} pending`}
              color="green"
              trend={8.3}
            />
            <StatCard
              icon={DollarSign}
              title="Total Revenue"
              value={`KES ${(systemStats.totalRevenue / 1000000).toFixed(1)}M`}
              subtitle="This month"
              color="yellow"
              trend={15.7}
            />
            <StatCard
              icon={Activity}
              title="System Health"
              value={`${systemStats.systemUptime}%`}
              subtitle={`${systemStats.averageResponseTime}ms avg response`}
              color="purple"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'orders', label: 'Orders', icon: Package },
              { id: 'system', label: 'System', icon: Server },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-md transition flex items-center gap-2 whitespace-nowrap ${
                  selectedTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Platform Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* ... existing platform metrics cards ... */}
              </div>

              {/* Recent Activity & System Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ... existing recent activity and alerts cards ... */}
              </div>
              
              {/* Performance Trends */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">User Growth</h4>
                    <PerformanceChart 
                      data={systemStats.performanceTrends?.users.map(u => u/10)} 
                      color="bg-blue-500" 
                    />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Order Volume</h4>
                    <PerformanceChart 
                      data={systemStats.performanceTrends?.orders.map(o => o/500)} 
                      color="bg-green-500" 
                    />
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm mb-2">Revenue (KES M)</h4>
                    <PerformanceChart 
                      data={systemStats.performanceTrends?.revenue} 
                      color="bg-yellow-500" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {selectedTab === 'users' && (
            <div className="space-y-6">
              {/* User Management Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Roles</option>
                      {Object.entries(ROLE_DISPLAY_NAMES).map(([role, displayName]) => (
                        <option key={role} value={role}>{displayName}</option>
                      ))}
                    </select>
                    
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setShowUserModal(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserPlus className="h-4 w-4" />
                  Add User
                </motion.button>
              </div>

              {/* Users List */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Performance
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Last Login
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {currentUsers.map((user, index) => (
                        <React.Fragment key={user.id}>
                          <motion.tr
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-gray-700/30 transition-colors cursor-pointer"
                            onClick={() => toggleUserDetails(user.id)}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                  <Users className="h-5 w-5 text-gray-400" />
                                </div>
                                <div>
                                  <div className="text-white font-medium">{user.name}</div>
                                  <div className="text-gray-400 text-sm">{user.email}</div>
                                  {user.companyName && (
                                    <div className="text-gray-500 text-xs">{user.companyName}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                {ROLE_DISPLAY_NAMES[user.role]}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                  {user.status.toUpperCase()}
                                </span>
                                {user.isVerified && (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-3 h-3 rounded ${
                                        i < user.rating ? 'bg-yellow-400' : 'bg-gray-600'
                                      }`}
                                    />
                                  ))}
                                  <span className="text-white text-sm ml-1">{user.rating}</span>
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {user.role === ROLES.DRIVER
                                    ? `${user.totalDeliveries || 0} deliveries`
                                    : `${user.totalOrders || 0} orders`
                                  }
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white text-sm">
                                {new Date(user.lastLogin).toLocaleDateString()}
                              </div>
                              <div className="text-gray-400 text-xs">
                                {new Date(user.lastLogin).toLocaleTimeString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedUser(user);
                                    setShowUserModal(true);
                                  }}
                                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                                >
                                  <Eye className="h-4 w-4 text-gray-400" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
                                >
                                  <Edit className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                          
                          {expandedUser === user.id && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="bg-gray-800"
                            >
                              <td colSpan="6" className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="bg-gray-700/50 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">Contact</h4>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span>{user.phone}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span>{user.email}</span>
                                      </div>
                                      <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span>{user.location}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-700/50 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">Performance</h4>
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span>On-time Rate:</span>
                                        <span className="font-medium">{user.deliveryStats?.onTime || 0}%</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Rating:</span>
                                        <div className="flex items-center gap-1">
                                          {[...Array(5)].map((_, i) => (
                                            <div
                                              key={i}
                                              className={`w-3 h-3 rounded ${
                                                i < user.rating ? 'bg-yellow-400' : 'bg-gray-600'
                                              }`}
                                            />
                                          ))}
                                          <span className="ml-1">{user.rating}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="bg-gray-700/50 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-gray-300 mb-2">Activity</h4>
                                    <div className="space-y-1 text-sm">
                                      <div className="flex justify-between">
                                        <span>Last Login:</span>
                                        <span>{new Date(user.lastLogin).toLocaleDateString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Join Date:</span>
                                        <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing {Math.min(indexOfFirstItem + 1, filteredUsers.length)} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} users
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === i + 1 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No users found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}

          {/* System Tab */}
          {selectedTab === 'system' && (
            <div className="space-y-6">
              {/* ... existing system stats ... */}
            </div>
          )}

          {/* User Modal */}
          {showUserModal && <UserModal />}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;