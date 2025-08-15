import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Star,
  Heart,
  Eye,
  Filter,
  Search,
  MapPin,
  Truck,
  Package,
  DollarSign,
  User,
  MessageCircle,
  Share,
  ChevronDown,
  Grid,
  List,
  ArrowUp,
  ArrowDown,
  X,
  Plus,
  Minus,
  Check,
  AlertCircle
} from 'lucide-react';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const categories = [
    'All Categories',
    'Food & Beverages',
    'Textiles & Fashion',
    'Beauty & Personal Care',
    'Jewelry & Accessories',
    'Art & Crafts',
    'Home & Living',
    'Electronics & Technology'
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  useEffect(() => {
    // Simulate product data
    const sampleProducts = [
      {
        id: 1,
        name: 'Premium Ethiopian Coffee Beans',
        supplier: 'Addis Coffee Co.',
        price: 125.00,
        originalPrice: 150.00,
        rating: 4.8,
        reviews: 342,
        location: 'Addis Ababa, Ethiopia',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
        category: 'Food & Beverages',
        inStock: true,
        stockCount: 145,
        discount: 17,
        featured: true,
        tags: ['Organic', 'Fair Trade', 'Premium'],
        description: 'Premium single-origin Ethiopian coffee beans with rich, complex flavors and notes of chocolate and citrus.',
        specifications: {
          'Origin': 'Sidama Region, Ethiopia',
          'Roast Level': 'Medium',
          'Processing': 'Washed',
          'Weight': '1kg'
        }
      },
      {
        id: 2,
        name: 'Handwoven Kente Cloth',
        supplier: 'Ghana Heritage Textiles',
        price: 85.00,
        rating: 4.9,
        reviews: 156,
        location: 'Kumasi, Ghana',
        image: 'https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?w=400',
        category: 'Textiles & Fashion',
        inStock: true,
        stockCount: 23,
        featured: true,
        tags: ['Handmade', 'Traditional', 'Authentic'],
        description: 'Authentic Kente cloth handwoven by skilled artisans in Ghana. Perfect for special occasions and cultural celebrations.',
        specifications: {
          'Material': '100% Cotton',
          'Size': '2m x 1.5m',
          'Pattern': 'Traditional Ashanti',
          'Care': 'Hand wash only'
        }
      },
      {
        id: 3,
        name: 'Shea Butter Beauty Products Set',
        supplier: 'Burkina Natural',
        price: 45.00,
        originalPrice: 60.00,
        rating: 4.7,
        reviews: 289,
        location: 'Ouagadougou, Burkina Faso',
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
        category: 'Beauty & Personal Care',
        inStock: true,
        stockCount: 78,
        discount: 25,
        featured: true,
        tags: ['Natural', 'Organic', 'Skincare'],
        description: 'Complete skincare set featuring pure shea butter products sourced directly from Burkina Faso women cooperatives.',
        specifications: {
          'Includes': 'Body butter, face cream, lip balm',
          'Ingredients': '100% Pure Shea Butter',
          'Certification': 'Fair Trade',
          'Shelf Life': '24 months'
        }
      },
      {
        id: 4,
        name: 'Maasai Beaded Jewelry Collection',
        supplier: 'Kenya Craft Collective',
        price: 35.00,
        rating: 4.6,
        reviews: 124,
        location: 'Nairobi, Kenya',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400',
        category: 'Jewelry & Accessories',
        inStock: true,
        stockCount: 67,
        featured: true,
        tags: ['Handcrafted', 'Cultural', 'Unique'],
        description: 'Beautiful traditional Maasai beaded jewelry handcrafted by Maasai women artisans in Kenya.',
        specifications: {
          'Set Includes': 'Necklace, bracelet, earrings',
          'Materials': 'Glass beads, leather',
          'Colors': 'Traditional Maasai colors',
          'Size': 'One size fits most'
        }
      },
      {
        id: 5,
        name: 'Argan Oil Hair Care Bundle',
        supplier: 'Marrakech Organics',
        price: 72.00,
        originalPrice: 90.00,
        rating: 4.8,
        reviews: 198,
        location: 'Marrakech, Morocco',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        category: 'Beauty & Personal Care',
        inStock: true,
        stockCount: 92,
        discount: 20,
        featured: true,
        tags: ['Premium', 'Moisturizing', 'Organic'],
        description: 'Premium argan oil hair care bundle featuring shampoo, conditioner, and pure argan oil treatment.',
        specifications: {
          'Bundle': 'Shampoo 250ml, Conditioner 250ml, Oil 50ml',
          'Hair Type': 'All hair types',
          'Certification': 'Organic certified',
          'Origin': 'Atlas Mountains, Morocco'
        }
      },
      {
        id: 6,
        name: 'African Print Ankara Fabric',
        supplier: 'Lagos Fashion Hub',
        price: 28.00,
        rating: 4.5,
        reviews: 267,
        location: 'Lagos, Nigeria',
        image: 'https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?w=400',
        category: 'Textiles & Fashion',
        inStock: true,
        stockCount: 156,
        featured: true,
        tags: ['Colorful', 'Vibrant', 'Quality'],
        description: 'High-quality African print Ankara fabric perfect for traditional and modern fashion designs.',
        specifications: {
          'Material': '100% Cotton wax print',
          'Length': '6 yards',
          'Width': '46 inches',
          'Care': 'Machine washable'
        }
      }
    ];

    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all' && selectedCategory !== 'All Categories') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured (default order)
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setShowCartModal(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Catalog</h2>
          <p className="text-gray-400 mt-1">Discover authentic African products from local suppliers</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
              placeholder="Search products..."
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-emerald-600' : 'bg-gray-700/50'} transition-colors`}
            >
              <Grid className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-emerald-600' : 'bg-gray-700/50'} transition-colors`}
            >
              <List className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg text-white transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setShowCartModal(true)}
            className="relative flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All Categories' ? 'all' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-1 px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-white text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1 px-2 py-1 bg-gray-700/50 border border-gray-600 rounded text-white text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="text-gray-400">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-all group cursor-pointer ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
              <img 
                src={product.image} 
                alt={product.name}
                className={`object-cover ${viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'}`}
              />
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  -{product.discount}%
                </div>
              )}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => {e.stopPropagation(); toggleWishlist(product.id);}}
                  className={`p-2 rounded-full text-white transition-colors ${
                    wishlist.includes(product.id) ? 'bg-red-500' : 'bg-gray-800/80 hover:bg-gray-700/80'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm">{product.rating}</span>
                  <span className="text-gray-400 text-xs">({product.reviews})</span>
                </div>
              </div>

              <h3 className="text-white font-medium mb-2 line-clamp-2">{product.name}</h3>
              
              <div className="flex items-center space-x-1 text-gray-400 text-xs mb-3">
                <MapPin className="h-3 w-3" />
                <span>{product.location}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-400 font-bold text-lg">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                  )}
                </div>
                <div className="text-gray-400 text-xs">
                  Stock: {product.stockCount}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-400 text-xs">
                  by {product.supplier}
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => {e.stopPropagation(); setSelectedProduct(product);}}
                    className="p-2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => {e.stopPropagation(); addToCart(product);}}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {product.tags && viewMode === 'list' && (
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

      {/* Load More Button */}
      {filteredProducts.length > 0 && (
        <div className="text-center">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors">
            Load More Products
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Product Details</h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors">
                        Add to Cart
                      </button>
                      <button className="px-4 py-2 border border-gray-600 hover:border-emerald-500 text-white rounded-lg transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="px-4 py-2 border border-gray-600 hover:border-emerald-500 text-white rounded-lg transition-colors">
                        <Share className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{selectedProduct.name}</h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white">{selectedProduct.rating}</span>
                          <span className="text-gray-400">({selectedProduct.reviews} reviews)</span>
                        </div>
                        <span className="text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded text-sm">
                          {selectedProduct.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-emerald-400 font-bold text-2xl">${selectedProduct.price}</span>
                        {selectedProduct.originalPrice && (
                          <span className="text-gray-400 line-through text-lg">${selectedProduct.originalPrice}</span>
                        )}
                      </div>

                      <p className="text-gray-300 mb-4">{selectedProduct.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{selectedProduct.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-white">by {selectedProduct.supplier}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-white">{selectedProduct.stockCount} in stock</span>
                        </div>
                      </div>
                    </div>

                    {selectedProduct.specifications && (
                      <div>
                        <h4 className="text-white font-medium mb-2">Specifications</h4>
                        <div className="space-y-2">
                          {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-gray-400">{key}:</span>
                              <span className="text-white">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedProduct.tags && (
                      <div>
                        <h4 className="text-white font-medium mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.tags.map((tag, index) => (
                            <span key={index} className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCartModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Shopping Cart ({getTotalItems()} items)</h2>
                  <button
                    onClick={() => setShowCartModal(false)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center space-x-4 bg-gray-700/30 rounded-lg p-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{item.name}</h4>
                            <p className="text-gray-400 text-sm">by {item.supplier}</p>
                            <p className="text-emerald-400 font-bold">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-600 rounded"
                            >
                              <Minus className="h-4 w-4 text-white" />
                            </button>
                            <span className="text-white w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-600 rounded"
                            >
                              <Plus className="h-4 w-4 text-white" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-red-600 rounded-lg transition-colors"
                          >
                            <X className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-white">Total: ${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setShowCartModal(false)}
                          className="flex-1 py-2 border border-gray-600 hover:border-emerald-500 text-white rounded-lg transition-colors"
                        >
                          Continue Shopping
                        </button>
                        <button
                          onClick={() => console.log('Proceeding to checkout with:', cart)}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCatalog;
