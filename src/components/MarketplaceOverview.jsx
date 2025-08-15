import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Star,
  MapPin,
  Clock,
  Eye,
  Heart,
  Filter,
  Search,
  ArrowRight,
  Truck,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const MarketplaceOverview = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [marketplaceMetrics, setMarketplaceMetrics] = useState({
    totalProducts: 15420,
    activeSuppliers: 1250,
    totalOrders: 8945,
    revenueToday: 145820,
    avgRating: 4.6,
    newListings: 89,
    pendingDeliveries: 342,
    urgentOrders: 28
  });

  useEffect(() => {
    // Simulate featured products data with African B2B focus
    setFeaturedProducts([
      {
        id: 1,
        name: 'Premium Coffee Beans (50kg)',
        supplier: 'Ethiopian Coffee Collective',
        price: 1250.00,
        originalPrice: 1500.00,
        rating: 4.8,
        reviews: 42,
        location: 'Addis Ababa, Ethiopia',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
        category: 'Beverage Ingredients',
        inStock: true,
        stockCount: 145,
        discount: 17,
        minOrder: 5,
        deliveryTime: '2-4 days',
        featured: true,
        tags: ['Bulk', 'Wholesale', 'Export Quality']
      },
      {
        id: 2,
        name: 'Ankara Fabric Rolls (100m)',
        supplier: 'Lagos Textile Distributors',
        price: 850.00,
        rating: 4.5,
        reviews: 36,
        location: 'Lagos, Nigeria',
        image: 'https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?w=400',
        category: 'Textiles',
        inStock: true,
        stockCount: 23,
        minOrder: 2,
        deliveryTime: '3-5 days',
        featured: true,
        tags: ['Wholesale', 'Bulk Purchase', 'African Print']
      },
      {
        id: 3,
        name: 'Shea Butter (25kg)',
        supplier: 'West African Naturals',
        price: 450.00,
        originalPrice: 600.00,
        rating: 4.7,
        reviews: 29,
        location: 'Accra, Ghana',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
        category: 'Beauty Ingredients',
        inStock: true,
        stockCount: 78,
        discount: 25,
        minOrder: 1,
        deliveryTime: '1-3 days',
        featured: true,
        tags: ['Bulk', 'Cosmetic Grade', 'Organic']
      },
      {
        id: 4,
        name: 'Maize Flour (50kg bags)',
        supplier: 'East African Grains',
        price: 35.00,
        rating: 4.6,
        reviews: 124,
        location: 'Nairobi, Kenya',
        image: 'https://images.unsplash.com/photo-1595475207225-428b62bda831?w=400',
        category: 'Food Staples',
        inStock: true,
        stockCount: 267,
        minOrder: 10,
        deliveryTime: '2-4 days',
        featured: true,
        tags: ['Bulk', 'Wholesale', 'Staple Food']
      },
      {
        id: 5,
        name: 'Palm Oil (20L)',
        supplier: 'Central African Oils',
        price: 72.00,
        originalPrice: 90.00,
        rating: 4.4,
        reviews: 18,
        location: 'Douala, Cameroon',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31e8?w=400',
        category: 'Cooking Ingredients',
        inStock: true,
        stockCount: 92,
        discount: 20,
        minOrder: 5,
        deliveryTime: '3-6 days',
        featured: true,
        tags: ['Bulk', 'Food Grade', 'Pure']
      },
      {
        id: 6,
        name: 'Ceramic Tableware (Set of 12)',
        supplier: 'North African Crafts',
        price: 280.00,
        rating: 4.9,
        reviews: 67,
        location: 'Tunis, Tunisia',
        image: 'https://images.unsplash.com/photo-1583248369069-9d91f1640fe6?w=400',
        category: 'Home Goods',
        inStock: true,
        stockCount: 56,
        minOrder: 1,
        deliveryTime: '5-8 days',
        featured: true,
        tags: ['Wholesale', 'Restaurant Supply', 'Handmade']
      }
    ]);
  }, []);

  const categories = [
    { name: 'Beverage Ingredients', count: 2840, icon: '☕' },
    { name: 'Textiles', count: 1956, icon: '👕' },
    { name: 'Beauty Ingredients', count: 1234, icon: '🧴' },
    { name: 'Food Staples', count: 2876, icon: '🌾' },
    { name: 'Cooking Ingredients', count: 1654, icon: '🍯' },
    { name: 'Home Goods', count: 532, icon: '🍽️' }
  ];

  const getDeliveryStatus = (deliveryTime) => {
    if (deliveryTime.includes('1-3')) return 'text-green-400';
    if (deliveryTime.includes('2-4')) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 col-span-2"
        >
          <div className="flex items-center justify-between mb-2">
            <Package className="h-6 w-6 text-blue-400" />
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{marketplaceMetrics.totalProducts.toLocaleString()}</h3>
            <p className="text-gray-400 text-xs">B2B Products Listed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Truck className="h-6 w-6 text-emerald-400" />
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{marketplaceMetrics.urgentOrders}</h3>
            <p className="text-gray-400 text-xs">Urgent Orders</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="h-6 w-6 text-purple-400" />
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{marketplaceMetrics.totalOrders.toLocaleString()}</h3>
            <p className="text-gray-400 text-xs">Total Orders</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4 col-span-2"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-6 w-6 text-yellow-400" />
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">${marketplaceMetrics.revenueToday.toLocaleString()}</h3>
            <p className="text-gray-400 text-xs">Today's GMV</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-6 w-6 text-orange-400" />
            <div className="text-green-400 text-xs">+{marketplaceMetrics.pendingDeliveries}</div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{marketplaceMetrics.pendingDeliveries}</h3>
            <p className="text-gray-400 text-xs">Pending Deliveries</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="h-6 w-6 text-cyan-400" />
            <div className="text-green-400 text-xs">+{marketplaceMetrics.newListings}</div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">{marketplaceMetrics.activeSuppliers.toLocaleString()}</h3>
            <p className="text-gray-400 text-xs">Verified Suppliers</p>
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Top B2B Categories</h2>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center space-x-1">
            <span>View All Categories</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-gray-900/30 rounded-lg p-4 text-center hover:bg-gray-700/30 transition-all cursor-pointer border border-gray-700 hover:border-emerald-400/30"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <h3 className="text-white text-sm font-medium mb-1">{category.name}</h3>
              <p className="text-gray-400 text-xs">{category.count.toLocaleString()} listings</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Wholesale Products</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search wholesale products..."
                className="pl-10 pr-4 py-1.5 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none text-sm"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700/50 rounded-lg text-gray-300 hover:text-white transition-colors text-sm">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="bg-gray-900/30 rounded-xl overflow-hidden hover:bg-gray-700/30 transition-all cursor-pointer group border border-gray-700 hover:border-emerald-400/50"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    -{product.discount}%
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">
                      Min Order: {product.minOrder}
                    </span>
                    <div className={`text-xs ${getDeliveryStatus(product.deliveryTime)} flex items-center`}>
                      <Clock className="h-3 w-3 mr-1" />
                      {product.deliveryTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{product.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-400 text-xs mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{product.location}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-gray-400 text-xs">
                    Available: {product.stockCount}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">
                    {product.supplier}
                  </span>
                  <button 
                    onClick={() => console.log(`Adding ${product.name} to cart`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center"
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    <span>Request Quote</span>
                  </button>
                </div>

                {product.tags && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {product.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center mx-auto">
            <span>View All Wholesale Products</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketplaceOverview;