import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Upload,
  Save,
  X,
  Camera,
  Tag,
  DollarSign,
  Warehouse,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Star,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';

const ProductManagement = ({ userRole = 'manufacturer', userId }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    minOrderQuantity: '',
    stockQuantity: '',
    unit: '',
    sku: '',
    images: [],
    specifications: {},
    tags: [],
    isActive: true
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = () => {
    // Simulate product data
    const sampleProducts = [
      {
        id: 'PROD-001',
        name: 'Premium Maize Flour 50kg',
        description: 'High-quality maize flour perfect for wholesale distribution. Milled from selected grade A maize.',
        category: 'Grains & Cereals',
        price: 4500,
        minOrderQuantity: 20,
        stockQuantity: 850,
        unit: 'bags',
        sku: 'MF-50KG-001',
        images: ['/api/placeholder/300/300', '/api/placeholder/300/300'],
        specifications: {
          'Protein Content': '8-10%',
          'Moisture': 'Max 13.5%',
          'Ash Content': 'Max 1.5%',
          'Packaging': '50kg PP bags',
          'Shelf Life': '12 months'
        },
        tags: ['organic', 'grade-a', 'bulk'],
        isActive: true,
        totalOrders: 245,
        revenue: 1102500,
        rating: 4.8,
        reviewCount: 67,
        createdDate: '2024-01-15',
        lastUpdated: '2024-08-01'
      },
      {
        id: 'PROD-002',
        name: 'Refined Cooking Oil 20L',
        description: 'Premium refined cooking oil in bulk containers. Suitable for commercial and retail distribution.',
        category: 'Oils & Fats',
        price: 5800,
        minOrderQuantity: 10,
        stockQuantity: 420,
        unit: 'containers',
        sku: 'CO-20L-002',
        images: ['/api/placeholder/300/300'],
        specifications: {
          'Volume': '20 liters',
          'Type': 'Refined Sunflower Oil',
          'Packaging': 'Food grade plastic container',
          'Shelf Life': '18 months',
          'Free Fatty Acid': 'Max 0.1%'
        },
        tags: ['refined', 'sunflower', 'commercial'],
        isActive: true,
        totalOrders: 189,
        revenue: 1096200,
        rating: 4.6,
        reviewCount: 43,
        createdDate: '2024-02-20',
        lastUpdated: '2024-07-28'
      },
      {
        id: 'PROD-003',
        name: 'Long Grain White Rice 25kg',
        description: 'Premium long grain white rice, perfect for wholesale and retail markets across Africa.',
        category: 'Grains & Cereals',
        price: 3200,
        minOrderQuantity: 50,
        stockQuantity: 1200,
        unit: 'bags',
        sku: 'RIC-25KG-003',
        images: ['/api/placeholder/300/300', '/api/placeholder/300/300', '/api/placeholder/300/300'],
        specifications: {
          'Grain Length': '6-7mm',
          'Broken Rice': 'Max 5%',
          'Moisture': 'Max 14%',
          'Packaging': '25kg polypropylene bags',
          'Origin': 'East Africa'
        },
        tags: ['long-grain', 'premium', 'east-african'],
        isActive: true,
        totalOrders: 567,
        revenue: 1814400,
        rating: 4.9,
        reviewCount: 123,
        createdDate: '2024-03-10',
        lastUpdated: '2024-08-05'
      },
      {
        id: 'PROD-004',
        name: 'Granulated Sugar 50kg',
        description: 'Pure white granulated sugar in industrial packaging for wholesale distribution.',
        category: 'Sugar & Sweeteners',
        price: 4200,
        minOrderQuantity: 30,
        stockQuantity: 0,
        unit: 'bags',
        sku: 'SUG-50KG-004',
        images: ['/api/placeholder/300/300'],
        specifications: {
          'Purity': '99.8%',
          'Color': 'White',
          'Crystal Size': 'Medium',
          'Packaging': '50kg paper bags with inner liner',
          'Shelf Life': 'Indefinite if stored properly'
        },
        tags: ['granulated', 'pure', 'industrial'],
        isActive: false,
        totalOrders: 78,
        revenue: 327600,
        rating: 4.3,
        reviewCount: 21,
        createdDate: '2024-04-05',
        lastUpdated: '2024-07-15'
      }
    ];

    setProducts(sampleProducts);
  };

  const loadCategories = () => {
    const sampleCategories = [
      { id: 'grains', name: 'Grains & Cereals', count: 245, icon: '🌾' },
      { id: 'oils', name: 'Oils & Fats', count: 89, icon: '🫗' },
      { id: 'sugar', name: 'Sugar & Sweeteners', count: 34, icon: '🧂' },
      { id: 'dairy', name: 'Dairy Products', count: 67, icon: '🥛' },
      { id: 'beverages', name: 'Beverages', count: 123, icon: '🥤' },
      { id: 'spices', name: 'Spices & Seasonings', count: 156, icon: '🌶️' }
    ];

    setCategories(sampleCategories);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return b.price - a.price;
      case 'stock':
        return b.stockQuantity - a.stockQuantity;
      case 'orders':
        return b.totalOrders - a.totalOrders;
      case 'revenue':
        return b.revenue - a.revenue;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
          : p
      ));
    } else {
      // Create new product
      const newProduct = {
        ...formData,
        id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
        totalOrders: 0,
        revenue: 0,
        rating: 0,
        reviewCount: 0,
        createdDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setProducts([newProduct, ...products]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      minOrderQuantity: '',
      stockQuantity: '',
      unit: '',
      sku: '',
      images: [],
      specifications: {},
      tags: [],
      isActive: true
    });
    setEditingProduct(null);
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      minOrderQuantity: product.minOrderQuantity.toString(),
      stockQuantity: product.stockQuantity.toString(),
      unit: product.unit,
      sku: product.sku,
      images: product.images,
      specifications: product.specifications,
      tags: product.tags,
      isActive: product.isActive
    });
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const toggleProductStatus = (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: 'Out of Stock', color: 'text-red-400 bg-red-500/20' };
    if (quantity < 50) return { label: 'Low Stock', color: 'text-yellow-400 bg-yellow-500/20' };
    return { label: 'In Stock', color: 'text-green-400 bg-green-500/20' };
  };

  const ProductModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Basic Information</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white mb-4">Pricing & Inventory</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (KES)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="e.g., bags, containers, kg"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Order Quantity</label>
                  <input
                    type="number"
                    value={formData.minOrderQuantity}
                    onChange={(e) => setFormData({ ...formData, minOrderQuantity: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-300">
                    Product is active and available for ordering
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Management</h2>
          <p className="text-gray-400">Manage your product catalog and inventory</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
          
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
          
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

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
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
          <option value="orders">Sort by Orders</option>
          <option value="revenue">Sort by Revenue</option>
          <option value="rating">Sort by Rating</option>
        </select>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">
            {sortedProducts.length} products
          </span>
          <RefreshCw className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product, index) => {
          const stockStatus = getStockStatus(product.stockQuantity);
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-blue-500/30 transition-all"
            >
              {/* Product Image */}
              <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                {product.images.length > 0 ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Package className="h-16 w-16 text-gray-500" />
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white line-clamp-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.sku}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300">{product.rating}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-400">
                    KES {product.price.toLocaleString()}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${stockStatus.color}`}>
                    {stockStatus.label}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="text-white font-semibold">{product.stockQuantity}</div>
                    <div className="text-gray-400 text-xs">Stock</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{product.totalOrders}</div>
                    <div className="text-gray-400 text-xs">Orders</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      KES {(product.revenue / 1000).toFixed(0)}k
                    </div>
                    <div className="text-gray-400 text-xs">Revenue</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => toggleProductStatus(product.id)}
                    className={`px-4 py-2 rounded-lg transition ${
                      product.isActive 
                        ? 'bg-yellow-600 hover:bg-yellow-500 text-white' 
                        : 'bg-green-600 hover:bg-green-500 text-white'
                    }`}
                  >
                    {product.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-4 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start by adding your first product to the catalog'
            }
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            Add Product
          </button>
        </div>
      )}

      {/* Product Modal */}
      {showModal && <ProductModal />}
    </div>
  );
};

export default ProductManagement;
