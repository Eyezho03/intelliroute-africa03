import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Search,
  MapPin,
  Truck,
  Clock,
  DollarSign,
  Package,
  User,
  Eye,
  Plus,
  Minus,
  X,
  Factory,
  Building2,
  Store,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  ROLES,
  ROLE_DISPLAY_NAMES,
  getAvailableSuppliers,
  isValidTransaction,
  canBuyFrom
} from '../utils/roleManagement';
import {
  Shield,
  Award,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  TrendingUp,
  Calendar
} from 'lucide-react';

const SupplierMarketplace = ({ userRole = 'retailer', userLocation = 'Nairobi, Kenya', userId = 'RET-001' }) => {
  // Check available suppliers based on user role
  const availableSupplierTypes = getAvailableSuppliers(userRole);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    loadMarketplaceData();
  }, [userRole]);

  const loadMarketplaceData = () => {
    // Define supplier data based on user role
    let supplierData = [];
    let categoryData = [];

    if (userRole === 'retailer') {
      supplierData = [
        {
          id: 'WS001',
          name: 'Nairobi Wholesale Distribution',
          type: 'wholesaler',
          tier: 'Premium',
          location: 'Nairobi, Kenya',
          description: 'Leading FMCG distributor serving East Africa with 500+ product lines',
          rating: 4.8,
          reviewCount: 342,
          minOrder: 50000,
          avgDeliveryTime: '2-3 days',
          responseTime: '< 2 hours',
          joinedDate: '2019-03-15',
          totalOrders: 1250,
          successRate: 98.5,
          categories: ['Food Products', 'Household Items', 'Beverages', 'Personal Care'],
          deliveryOptions: [
            { type: 'intelliroute', available: true, cost: 2500, timeframe: '1-2 days', description: 'IntelliRoute professional delivery' },
            { type: 'supplier', available: true, cost: 1800, timeframe: '2-3 days', description: 'Supplier arranged delivery' },
            { type: 'pickup', available: true, cost: 0, timeframe: 'Same day', description: 'Self collection from warehouse' }
          ],
          paymentTerms: ['Cash on Delivery', 'Net 30', 'Net 60'],
          certifications: ['ISO 9001', 'HACCP', 'Halal Certified'],
          contact: {
            phone: '+254-20-123-4567',
            email: 'orders@nairobiwholesale.com',
            website: 'https://nairobiwholesale.com',
            address: 'Industrial Area, Nairobi'
          },
          featured: true,
          verified: true,
          topProducts: [
            { name: 'Maize Flour 50kg', price: 2500, stock: 500, image: '/api/placeholder/100/100' },
            { name: 'Cooking Oil 20L', price: 3200, stock: 300, image: '/api/placeholder/100/100' },
            { name: 'Sugar 25kg', price: 2800, stock: 200, image: '/api/placeholder/100/100' }
          ]
        },
        {
          id: 'WS002',
          name: 'Lagos Central Supplies',
          type: 'wholesaler',
          tier: 'Standard',
          location: 'Lagos, Nigeria',
          description: 'Comprehensive wholesale solutions for West African markets',
          rating: 4.6,
          reviewCount: 189,
          minOrder: 75000,
          avgDeliveryTime: '3-5 days',
          responseTime: '< 4 hours',
          joinedDate: '2020-07-22',
          totalOrders: 892,
          successRate: 96.8,
          categories: ['Electronics', 'Clothing', 'Home & Garden', 'Sports'],
          deliveryOptions: [
            { type: 'intelliroute', available: true, cost: 4500, timeframe: '2-3 days', description: 'IntelliRoute cross-border delivery' },
            { type: 'supplier', available: true, cost: 3200, timeframe: '4-5 days', description: 'Standard supplier delivery' }
          ],
          paymentTerms: ['Cash on Delivery', 'Net 45'],
          certifications: ['CE Marking', 'Quality Assurance'],
          contact: {
            phone: '+234-1-234-5678',
            email: 'sales@lagossupplies.ng',
            website: 'https://lagossupplies.ng',
            address: 'Victoria Island, Lagos'
          },
          featured: false,
          verified: true,
          topProducts: [
            { name: 'Mobile Accessories Pack', price: 15000, stock: 150, image: '/api/placeholder/100/100' },
            { name: 'Cotton T-Shirts (Bulk)', price: 8500, stock: 300, image: '/api/placeholder/100/100' }
          ]
        },
        {
          id: 'WS003',
          name: 'Accra Trade Hub',
          type: 'wholesaler',
          tier: 'Premium',
          location: 'Accra, Ghana',
          description: 'Gateway to West African authentic products and crafts',
          rating: 4.7,
          reviewCount: 267,
          minOrder: 40000,
          avgDeliveryTime: '2-4 days',
          responseTime: '< 1 hour',
          joinedDate: '2018-11-08',
          totalOrders: 1456,
          successRate: 99.2,
          categories: ['Food Products', 'Personal Care', 'Handicrafts', 'Textiles'],
          deliveryOptions: [
            { type: 'intelliroute', available: true, cost: 3000, timeframe: '1-3 days', description: 'Premium IntelliRoute service' },
            { type: 'supplier', available: true, cost: 2200, timeframe: '3-4 days', description: 'Reliable supplier delivery' },
            { type: 'pickup', available: true, cost: 0, timeframe: 'Same day', description: 'Warehouse collection' }
          ],
          paymentTerms: ['Cash on Delivery', 'Net 30', 'Letter of Credit'],
          certifications: ['Fair Trade', 'Organic Certified', 'Export Quality'],
          contact: {
            phone: '+233-30-123-4567',
            email: 'orders@accratrade.gh',
            website: 'https://accratrade.gh',
            address: 'Tema Industrial Area, Accra'
          },
          featured: true,
          verified: true,
          topProducts: [
            { name: 'Shea Butter 10kg', price: 18000, stock: 80, image: '/api/placeholder/100/100' },
            { name: 'Kente Cloth Rolls', price: 25000, stock: 45, image: '/api/placeholder/100/100' },
            { name: 'Cocoa Products Mix', price: 12000, stock: 120, image: '/api/placeholder/100/100' }
          ]
        }
      ];

      categoryData = [
        { id: 'food', name: 'Food Products', count: 1245, icon: '🍽️' },
        { id: 'household', name: 'Household Items', count: 892, icon: '🏠' },
        { id: 'electronics', name: 'Electronics', count: 567, icon: '📱' },
        { id: 'clothing', name: 'Clothing', count: 734, icon: '👕' },
        { id: 'personal-care', name: 'Personal Care', count: 423, icon: '🧴' },
        { id: 'beverages', name: 'Beverages', count: 312, icon: '🥤' }
      ];

    } else if (userRole === 'wholesaler') {
      supplierData = [
        {
          id: 'MF001',
          name: 'East Africa Food Industries',
          type: 'manufacturer',
          tier: 'Enterprise',
          location: 'Nakuru, Kenya',
          description: 'Leading food processor with 40+ years experience, ISO certified facilities',
          rating: 4.9,
          reviewCount: 567,
          minOrder: 500000,
          avgDeliveryTime: '5-7 days',
          responseTime: '< 1 hour',
          joinedDate: '2016-02-12',
          totalOrders: 2847,
          successRate: 99.8,
          categories: ['Processed Foods', 'Beverages', 'Grains', 'Dairy Products'],
          deliveryOptions: [
            { type: 'intelliroute', available: true, cost: 15000, timeframe: '3-5 days', description: 'IntelliRoute bulk logistics' },
            { type: 'supplier', available: true, cost: 12000, timeframe: '5-7 days', description: 'Factory direct delivery' },
            { type: 'pickup', available: true, cost: 0, timeframe: '1-2 days', description: 'Ex-factory collection' }
          ],
          paymentTerms: ['Net 60', 'Net 90', 'Letter of Credit'],
          certifications: ['ISO 9001', 'ISO 22000', 'HACCP', 'Halal', 'Export License'],
          contact: {
            phone: '+254-51-234-5678',
            email: 'wholesale@eafoodindustries.com',
            website: 'https://eafoodindustries.com',
            address: 'Nakuru Industrial Park'
          },
          featured: true,
          verified: true,
          topProducts: [
            { name: 'Maize Flour 50kg (Industrial)', price: 4200, stock: 2000, image: '/api/placeholder/100/100' },
            { name: 'Cooking Oil 20L (Bulk)', price: 5800, stock: 1500, image: '/api/placeholder/100/100' },
            { name: 'Rice 25kg (Premium)', price: 3200, stock: 1800, image: '/api/placeholder/100/100' }
          ]
        },
        {
          id: 'MF002',
          name: 'Lagos Manufacturing Co.',
          type: 'manufacturer',
          tier: 'Standard',
          location: 'Lagos, Nigeria',
          description: 'Diversified manufacturer of household and personal care products',
          rating: 4.7,
          reviewCount: 298,
          minOrder: 750000,
          avgDeliveryTime: '7-10 days',
          responseTime: '< 3 hours',
          joinedDate: '2017-09-18',
          totalOrders: 1456,
          successRate: 97.5,
          categories: ['Household Products', 'Personal Care', 'Cleaning Supplies', 'Cosmetics'],
          deliveryOptions: [
            { type: 'supplier', available: true, cost: 18000, timeframe: '7-10 days', description: 'Standard manufacturing delivery' },
            { type: 'pickup', available: true, cost: 0, timeframe: '3-5 days', description: 'Factory gate collection' }
          ],
          paymentTerms: ['Net 45', 'Net 60', 'Cash on Delivery'],
          certifications: ['GMP', 'FDA Approved', 'NAFDAC'],
          contact: {
            phone: '+234-1-345-6789',
            email: 'orders@lagosmanufacturing.ng',
            website: 'https://lagosmanufacturing.ng',
            address: 'Ikeja Industrial Estate'
          },
          featured: false,
          verified: true,
          topProducts: [
            { name: 'Detergent Powder 25kg', price: 8500, stock: 800, image: '/api/placeholder/100/100' },
            { name: 'Body Lotion 500ml (Bulk)', price: 12000, stock: 600, image: '/api/placeholder/100/100' }
          ]
        }
      ];

      categoryData = [
        { id: 'processed-foods', name: 'Processed Foods', count: 2341, icon: '🏭' },
        { id: 'beverages', name: 'Beverages', count: 1456, icon: '🥤' },
        { id: 'household-products', name: 'Household Products', count: 1234, icon: '🧽' },
        { id: 'personal-care', name: 'Personal Care', count: 987, icon: '🧴' },
        { id: 'grains', name: 'Grains & Cereals', count: 765, icon: '🌾' },
        { id: 'dairy', name: 'Dairy Products', count: 543, icon: '🥛' }
      ];
    }

    setSuppliers(supplierData);
    setCategories(categoryData);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesCategory = selectedCategory === 'all' || 
      supplier.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    const matchesSearch = !searchQuery || 
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDelivery = deliveryFilter === 'all' || 
      supplier.deliveryOptions.some(option => option.type === deliveryFilter && option.available);
    
    return matchesCategory && matchesSearch && matchesDelivery;
  });

  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'orders':
        return b.totalOrders - a.totalOrders;
      case 'delivery':
        return parseFloat(a.avgDeliveryTime) - parseFloat(b.avgDeliveryTime);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const toggleFavorite = (supplierId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(supplierId)) {
      newFavorites.delete(supplierId);
    } else {
      newFavorites.add(supplierId);
    }
    setFavorites(newFavorites);
  };

  const getDeliveryIcon = (type) => {
    switch (type) {
      case 'intelliroute':
        return <Truck className="h-4 w-4 text-blue-400" />;
      case 'supplier':
        return <Building2 className="h-4 w-4 text-green-400" />;
      case 'pickup':
        return <MapPin className="h-4 w-4 text-purple-400" />;
      default:
        return <Package className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'Enterprise':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Premium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Standard':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const SupplierModal = () => {
    if (!selectedSupplier) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  {selectedSupplier.type === 'manufacturer' ? 
                    <Factory className="h-8 w-8 text-white" /> : 
                    <Store className="h-8 w-8 text-white" />
                  }
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{selectedSupplier.name}</h2>
                    {selectedSupplier.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        <CheckCircle className="h-3 w-3" />
                        <span>Verified</span>
                      </div>
                    )}
                    <div className={`px-3 py-1 rounded-full text-xs border ${getTierBadgeColor(selectedSupplier.tier)}`}>
                      {selectedSupplier.tier}
                    </div>
                  </div>
                  <p className="text-gray-300">{selectedSupplier.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedSupplier.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Joined {new Date(selectedSupplier.joinedDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSupplier(null)}
                className="p-2 hover:bg-gray-700 rounded-lg transition"
              >
                ×
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <div className="text-xl font-bold text-white">{selectedSupplier.rating}</div>
                <div className="text-xs text-gray-400">{selectedSupplier.reviewCount} reviews</div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Package className="h-5 w-5 text-blue-400" />
                </div>
                <div className="text-xl font-bold text-white">{selectedSupplier.totalOrders}</div>
                <div className="text-xs text-gray-400">Total Orders</div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="text-xl font-bold text-white">{selectedSupplier.successRate}%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-xl font-bold text-white">{selectedSupplier.avgDeliveryTime}</div>
                <div className="text-xs text-gray-400">Avg Delivery</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Delivery Options */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Delivery Options</h3>
                  <div className="space-y-3">
                    {selectedSupplier.deliveryOptions.map((option, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          {getDeliveryIcon(option.type)}
                          <div>
                            <div className="text-white font-medium">{option.description}</div>
                            <div className="text-gray-400 text-xs">{option.timeframe}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">
                            {option.cost === 0 ? 'Free' : `KES ${option.cost.toLocaleString()}`}
                          </div>
                          {option.available && (
                            <div className="text-green-400 text-xs">Available</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Popular Products</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedSupplier.topProducts.map((product, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="text-white font-medium">{product.name}</div>
                          <div className="text-gray-400 text-xs">Stock: {product.stock} units</div>
                        </div>
                        <div className="text-green-400 font-semibold">
                          KES {product.price.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                  <div className="bg-gray-700/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">{selectedSupplier.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">{selectedSupplier.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                      <a href={selectedSupplier.contact.website} className="text-blue-400 hover:text-blue-300">
                        Visit Website
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">{selectedSupplier.contact.address}</span>
                    </div>
                    
                    <div className="flex gap-2 pt-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Message
                      </button>
                      <button className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Business Terms */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Business Terms</h3>
                  <div className="bg-gray-700/30 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="text-gray-400 text-sm">Minimum Order</div>
                      <div className="text-white font-medium">KES {selectedSupplier.minOrder.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Payment Terms</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedSupplier.paymentTerms.map((term, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Response Time</div>
                      <div className="text-white font-medium">{selectedSupplier.responseTime}</div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSupplier.certifications.map((cert, index) => (
                      <span key={index} className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30">
                        <Award className="h-3 w-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Supplier Marketplace</h2>
          <p className="text-gray-400">
            Connect with verified {userRole === 'retailer' ? 'wholesalers' : 'manufacturers'} across Africa
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name} ({category.count})
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="rating">Sort by Rating</option>
          <option value="orders">Sort by Orders</option>
          <option value="delivery">Sort by Delivery Time</option>
          <option value="alphabetical">Sort Alphabetically</option>
        </select>

        <select
          value={deliveryFilter}
          onChange={(e) => setDeliveryFilter(e.target.value)}
          className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Delivery Options</option>
          <option value="intelliroute">IntelliRoute Available</option>
          <option value="supplier">Supplier Delivery</option>
          <option value="pickup">Self Pickup</option>
        </select>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">
            {sortedSuppliers.length} suppliers found
          </span>
          <Filter className="h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-blue-500/30 transition-all relative"
          >
            {/* Featured Badge */}
            {supplier.featured && (
              <div className="absolute top-4 right-4">
                <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs border border-yellow-500/30">
                  Featured
                </div>
              </div>
            )}

            {/* Supplier Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                {supplier.type === 'manufacturer' ? 
                  <Factory className="h-6 w-6 text-white" /> : 
                  <Store className="h-6 w-6 text-white" />
                }
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">{supplier.name}</h3>
                  {supplier.verified && (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-3 w-3" />
                  <span>{supplier.location}</span>
                  <div className={`px-2 py-0.5 rounded-full text-xs border ${getTierBadgeColor(supplier.tier)}`}>
                    {supplier.tier}
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(supplier.id)}
                className="p-2 hover:bg-gray-700 rounded-lg transition"
              >
                <Heart className={`h-4 w-4 ${favorites.has(supplier.id) ? 'text-red-400 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{supplier.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold text-sm">{supplier.rating}</span>
                </div>
                <div className="text-xs text-gray-400">{supplier.reviewCount} reviews</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold text-sm">{supplier.totalOrders}</div>
                <div className="text-xs text-gray-400">orders</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold text-sm">{supplier.avgDeliveryTime}</div>
                <div className="text-xs text-gray-400">delivery</div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1 mb-4">
              {supplier.categories.slice(0, 3).map((category, index) => (
                <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                  {category}
                </span>
              ))}
              {supplier.categories.length > 3 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                  +{supplier.categories.length - 3} more
                </span>
              )}
            </div>

            {/* Delivery Options */}
            <div className="flex items-center gap-2 mb-4">
              {supplier.deliveryOptions.slice(0, 3).map((option, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-gray-400">
                  {getDeliveryIcon(option.type)}
                  <span className="capitalize">{option.type}</span>
                </div>
              ))}
            </div>

            {/* Minimum Order */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-400">Min Order</div>
              <div className="text-white font-semibold">KES {supplier.minOrder.toLocaleString()}</div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedSupplier(supplier)}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm"
              >
                <Eye className="h-4 w-4" />
                View Details
              </button>
              <button className="px-4 bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition">
                <ShoppingCart className="h-4 w-4" />
              </button>
              <button className="px-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition">
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {sortedSuppliers.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No suppliers found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria or browse different categories
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setDeliveryFilter('all');
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Supplier Detail Modal */}
      <SupplierModal />
    </div>
  );
};

export default SupplierMarketplace;
