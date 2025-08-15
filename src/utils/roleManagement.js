// Role management utilities for IntelliRoute Africa B2B platform

export const ROLES = {
  MANUFACTURER: 'manufacturer',
  WHOLESALER: 'wholesaler',
  RETAILER: 'retailer',
  DRIVER: 'driver',
  ADMIN: 'admin' // Special admin role granted to selected retailers
};

export const ROLE_DISPLAY_NAMES = {
  [ROLES.MANUFACTURER]: 'Manufacturer',
  [ROLES.WHOLESALER]: 'Wholesaler',
  [ROLES.RETAILER]: 'Retailer',
  [ROLES.DRIVER]: 'Driver',
  [ROLES.ADMIN]: 'Administrator'
};

export const ROLE_DESCRIPTIONS = {
  [ROLES.MANUFACTURER]: 'Creates and supplies products to wholesalers and retailers',
  [ROLES.WHOLESALER]: 'Purchases from manufacturers and sells to retailers in bulk',
  [ROLES.RETAILER]: 'Purchases from wholesalers/manufacturers for retail sales',
  [ROLES.DRIVER]: 'Handles delivery operations across all supply chain tiers',
  [ROLES.ADMIN]: 'Administrative oversight with cross-role capabilities'
};

// Define permissions for each role
export const PERMISSIONS = {
  // Product Management
  MANAGE_PRODUCTS: 'manage_products',
  VIEW_PRODUCTS: 'view_products',
  CREATE_PRODUCTS: 'create_products',
  EDIT_PRODUCTS: 'edit_products',
  DELETE_PRODUCTS: 'delete_products',
  
  // Order Management
  PLACE_ORDERS: 'place_orders',
  VIEW_ORDERS: 'view_orders',
  MANAGE_ORDERS: 'manage_orders',
  CANCEL_ORDERS: 'cancel_orders',
  PROCESS_ORDERS: 'process_orders',
  
  // Delivery Management
  ASSIGN_DELIVERIES: 'assign_deliveries',
  VIEW_DELIVERIES: 'view_deliveries',
  MANAGE_DELIVERIES: 'manage_deliveries',
  TRACK_DELIVERIES: 'track_deliveries',
  COMPLETE_DELIVERIES: 'complete_deliveries',
  
  // User Management
  VIEW_USERS: 'view_users',
  MANAGE_USERS: 'manage_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  
  // Fleet Management
  MANAGE_FLEET: 'manage_fleet',
  VIEW_FLEET: 'view_fleet',
  ASSIGN_VEHICLES: 'assign_vehicles',
  
  // Analytics & Reports
  VIEW_ANALYTICS: 'view_analytics',
  VIEW_REPORTS: 'view_reports',
  GENERATE_REPORTS: 'generate_reports',
  
  // System Administration
  MANAGE_SYSTEM: 'manage_system',
  CONFIGURE_SETTINGS: 'configure_settings',
  MANAGE_ROLES: 'manage_roles',
  VIEW_LOGS: 'view_logs',
  
  // Financial Management
  VIEW_FINANCIALS: 'view_financials',
  MANAGE_PAYMENTS: 'manage_payments',
  PROCESS_REFUNDS: 'process_refunds',
  
  // Marketplace
  VIEW_MARKETPLACE: 'view_marketplace',
  MANAGE_MARKETPLACE: 'manage_marketplace'
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.MANUFACTURER]: [
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    PERMISSIONS.DELETE_PRODUCTS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.PROCESS_ORDERS,
    PERMISSIONS.VIEW_DELIVERIES,
    PERMISSIONS.ASSIGN_DELIVERIES,
    PERMISSIONS.TRACK_DELIVERIES,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.GENERATE_REPORTS,
    PERMISSIONS.VIEW_FINANCIALS,
    PERMISSIONS.MANAGE_PAYMENTS,
    PERMISSIONS.VIEW_MARKETPLACE
  ],
  
  [ROLES.WHOLESALER]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.PLACE_ORDERS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CANCEL_ORDERS,
    PERMISSIONS.VIEW_DELIVERIES,
    PERMISSIONS.TRACK_DELIVERIES,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_FINANCIALS,
    PERMISSIONS.MANAGE_PAYMENTS,
    PERMISSIONS.VIEW_MARKETPLACE,
    // Wholesalers can also sell to retailers, so they have some product management capabilities
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS
  ],
  
  [ROLES.RETAILER]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.PLACE_ORDERS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.MANAGE_ORDERS,
    PERMISSIONS.CANCEL_ORDERS,
    PERMISSIONS.VIEW_DELIVERIES,
    PERMISSIONS.TRACK_DELIVERIES,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_FINANCIALS,
    PERMISSIONS.MANAGE_PAYMENTS,
    PERMISSIONS.VIEW_MARKETPLACE
  ],
  
  [ROLES.DRIVER]: [
    PERMISSIONS.VIEW_DELIVERIES,
    PERMISSIONS.MANAGE_DELIVERIES,
    PERMISSIONS.COMPLETE_DELIVERIES,
    PERMISSIONS.TRACK_DELIVERIES,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.VIEW_FLEET,
    PERMISSIONS.VIEW_REPORTS
  ],
  
  [ROLES.ADMIN]: [
    // Admin has all permissions - they can perform any role's functions
    ...Object.values(PERMISSIONS)
  ]
};

// Role hierarchy for supply chain ordering
export const SUPPLY_CHAIN_HIERARCHY = {
  [ROLES.MANUFACTURER]: {
    canSellTo: [ROLES.WHOLESALER, ROLES.RETAILER],
    canBuyFrom: [],
    level: 1
  },
  [ROLES.WHOLESALER]: {
    canSellTo: [ROLES.RETAILER],
    canBuyFrom: [ROLES.MANUFACTURER],
    level: 2
  },
  [ROLES.RETAILER]: {
    canSellTo: [],
    canBuyFrom: [ROLES.MANUFACTURER, ROLES.WHOLESALER],
    level: 3
  },
  [ROLES.DRIVER]: {
    canSellTo: [],
    canBuyFrom: [],
    level: 0 // Drivers operate across all levels
  },
  [ROLES.ADMIN]: {
    canSellTo: [ROLES.MANUFACTURER, ROLES.WHOLESALER, ROLES.RETAILER],
    canBuyFrom: [ROLES.MANUFACTURER, ROLES.WHOLESALER, ROLES.RETAILER],
    level: 0 // Admins can operate at any level
  }
};

// FIXED: Define base dashboard features first
const BASE_DASHBOARD_FEATURES = {
  [ROLES.MANUFACTURER]: [
    'product_management',
    'order_fulfillment',
    'production_analytics',
    'supplier_network',
    'inventory_overview',
    'delivery_coordination',
    'revenue_tracking'
  ],
  
  [ROLES.WHOLESALER]: [
    'order_management',
    'supplier_sourcing',
    'inventory_management',
    'customer_orders',
    'delivery_tracking',
    'bulk_pricing',
    'profit_margins'
  ],
  
  [ROLES.RETAILER]: [
    'product_catalog',
    'order_placement',
    'inventory_tracking',
    'delivery_status',
    'customer_management',
    'sales_analytics',
    'payment_processing'
  ],
  
  [ROLES.DRIVER]: [
    'delivery_assignments',
    'route_optimization',
    'delivery_tracking',
    'vehicle_status',
    'earnings_tracker',
    'delivery_history',
    'performance_metrics'
  ]
};

// Now define ROLE_DASHBOARD_FEATURES with admin using BASE_DASHBOARD_FEATURES
export const ROLE_DASHBOARD_FEATURES = {
  ...BASE_DASHBOARD_FEATURES,
  [ROLES.ADMIN]: [
    'user_management',
    'system_overview',
    'platform_analytics',
    'role_management',
    'configuration_settings',
    'audit_logs',
    'performance_monitoring',
    'financial_oversight',
    ...BASE_DASHBOARD_FEATURES[ROLES.MANUFACTURER],
    ...BASE_DASHBOARD_FEATURES[ROLES.WHOLESALER],
    ...BASE_DASHBOARD_FEATURES[ROLES.RETAILER],
    ...BASE_DASHBOARD_FEATURES[ROLES.DRIVER]
  ]
};

// Navigation menu items for each role
export const ROLE_NAVIGATION = {
  [ROLES.MANUFACTURER]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'products', label: 'Products', icon: 'Package', path: '/products' },
    { key: 'orders', label: 'Orders', icon: 'ShoppingCart', path: '/orders' },
    { key: 'production', label: 'Production', icon: 'Factory', path: '/production' },
    { key: 'suppliers', label: 'Suppliers', icon: 'Users', path: '/suppliers' },
    { key: 'deliveries', label: 'Deliveries', icon: 'Truck', path: '/deliveries' },
    { key: 'analytics', label: 'Analytics', icon: 'BarChart3', path: '/analytics' },
    { key: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' }
  ],
  
  [ROLES.WHOLESALER]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'marketplace', label: 'Marketplace', icon: 'Store', path: '/marketplace' },
    { key: 'orders', label: 'My Orders', icon: 'ShoppingCart', path: '/orders' },
    { key: 'inventory', label: 'Inventory', icon: 'Package', path: '/inventory' },
    { key: 'customers', label: 'Customers', icon: 'Users', path: '/customers' },
    { key: 'deliveries', label: 'Deliveries', icon: 'Truck', path: '/deliveries' },
    { key: 'pricing', label: 'Pricing', icon: 'DollarSign', path: '/pricing' },
    { key: 'reports', label: 'Reports', icon: 'FileText', path: '/reports' },
    { key: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' }
  ],
  
  [ROLES.RETAILER]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'marketplace', label: 'Marketplace', icon: 'Store', path: '/marketplace' },
    { key: 'orders', label: 'My Orders', icon: 'ShoppingCart', path: '/orders' },
    { key: 'inventory', label: 'Inventory', icon: 'Package', path: '/inventory' },
    { key: 'deliveries', label: 'Deliveries', icon: 'Truck', path: '/deliveries' },
    { key: 'customers', label: 'Customers', icon: 'Users', path: '/customers' },
    { key: 'payments', label: 'Payments', icon: 'CreditCard', path: '/payments' },
    { key: 'analytics', label: 'Analytics', icon: 'BarChart3', path: '/analytics' },
    { key: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' }
  ],
  
  [ROLES.DRIVER]: [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
    { key: 'deliveries', label: 'My Deliveries', icon: 'Truck', path: '/deliveries' },
    { key: 'routes', label: 'Routes', icon: 'Map', path: '/routes' },
    { key: 'vehicle', label: 'My Vehicle', icon: 'Car', path: '/vehicle' },
    { key: 'earnings', label: 'Earnings', icon: 'DollarSign', path: '/earnings' },
    { key: 'history', label: 'History', icon: 'Clock', path: '/history' },
    { key: 'profile', label: 'Profile', icon: 'User', path: '/profile' }
  ],
  
  [ROLES.ADMIN]: [
    { key: 'dashboard', label: 'Admin Dashboard', icon: 'LayoutDashboard', path: '/admin' },
    { key: 'users', label: 'User Management', icon: 'Users', path: '/admin/users' },
    { key: 'roles', label: 'Role Management', icon: 'Shield', path: '/admin/roles' },
    { key: 'system', label: 'System Config', icon: 'Settings', path: '/admin/system' },
    { key: 'analytics', label: 'Platform Analytics', icon: 'BarChart3', path: '/admin/analytics' },
    { key: 'audit', label: 'Audit Logs', icon: 'FileText', path: '/admin/audit' },
    { key: 'support', label: 'Support Center', icon: 'HelpCircle', path: '/admin/support' },
    { 
      key: 'operations', 
      label: 'Operations', 
      icon: 'Briefcase', 
      submenu: [
        { key: 'marketplace', label: 'Marketplace Overview', path: '/admin/marketplace' },
        { key: 'orders', label: 'All Orders', path: '/admin/orders' },
        { key: 'deliveries', label: 'All Deliveries', path: '/admin/deliveries' },
        { key: 'fleet', label: 'Fleet Management', path: '/admin/fleet' }
      ]
    }
  ]
};

// Utility functions
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};

export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
};

export const canSellTo = (sellerRole, buyerRole) => {
  return SUPPLY_CHAIN_HIERARCHY[sellerRole]?.canSellTo?.includes(buyerRole) || false;
};

export const canBuyFrom = (buyerRole, sellerRole) => {
  return SUPPLY_CHAIN_HIERARCHY[buyerRole]?.canBuyFrom?.includes(sellerRole) || false;
};

export const isValidTransaction = (sellerRole, buyerRole) => {
  return canSellTo(sellerRole, buyerRole) && canBuyFrom(buyerRole, sellerRole);
};

export const getRoleLevel = (role) => {
  return SUPPLY_CHAIN_HIERARCHY[role]?.level || 0;
};

export const getAvailableSuppliers = (userRole) => {
  const canBuyFromRoles = SUPPLY_CHAIN_HIERARCHY[userRole]?.canBuyFrom || [];
  return canBuyFromRoles.map(role => ({
    role,
    displayName: ROLE_DISPLAY_NAMES[role],
    description: ROLE_DESCRIPTIONS[role]
  }));
};

export const getAvailableCustomers = (userRole) => {
  const canSellToRoles = SUPPLY_CHAIN_HIERARCHY[userRole]?.canSellTo || [];
  return canSellToRoles.map(role => ({
    role,
    displayName: ROLE_DISPLAY_NAMES[role],
    description: ROLE_DESCRIPTIONS[role]
  }));
};

export const isAdmin = (userRole) => {
  return userRole === ROLES.ADMIN;
};

export const isDriver = (userRole) => {
  return userRole === ROLES.DRIVER;
};

export const isManufacturer = (userRole) => {
  return userRole === ROLES.MANUFACTURER;
};

export const isWholesaler = (userRole) => {
  return userRole === ROLES.WHOLESALER;
};

export const isRetailer = (userRole) => {
  return userRole === ROLES.RETAILER;
};

export const canManageProducts = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.MANAGE_PRODUCTS);
};

export const canPlaceOrders = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.PLACE_ORDERS);
};

export const canManageDeliveries = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.MANAGE_DELIVERIES);
};

export const canViewAnalytics = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.VIEW_ANALYTICS);
};

export const canManageUsers = (userRole) => {
  return hasPermission(userRole, PERMISSIONS.MANAGE_USERS);
};

export const getDashboardFeatures = (userRole) => {
  return ROLE_DASHBOARD_FEATURES[userRole] || [];
};

export const getNavigationItems = (userRole) => {
  return ROLE_NAVIGATION[userRole] || [];
};

export const getRolePermissions = (userRole) => {
  return ROLE_PERMISSIONS[userRole] || [];
};

export const getAllRoles = () => {
  return Object.values(ROLES);
};

export const getRoleInfo = (role) => {
  return {
    role,
    displayName: ROLE_DISPLAY_NAMES[role],
    description: ROLE_DESCRIPTIONS[role],
    permissions: ROLE_PERMISSIONS[role] || [],
    dashboardFeatures: ROLE_DASHBOARD_FEATURES[role] || [],
    navigationItems: ROLE_NAVIGATION[role] || [],
    hierarchy: SUPPLY_CHAIN_HIERARCHY[role] || {}
  };
};

// Role validation
export const isValidRole = (role) => {
  return Object.values(ROLES).includes(role);
};

export const validateRoleTransition = (fromRole, toRole) => {
  // Define rules for role transitions if needed
  // For now, only admins can change roles freely
  return true; // This would be implemented based on business rules
};

// Default export with all utilities
export default {
  ROLES,
  ROLE_DISPLAY_NAMES,
  ROLE_DESCRIPTIONS,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  SUPPLY_CHAIN_HIERARCHY,
  ROLE_DASHBOARD_FEATURES,
  ROLE_NAVIGATION,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canSellTo,
  canBuyFrom,
  isValidTransaction,
  getRoleLevel,
  getAvailableSuppliers,
  getAvailableCustomers,
  isAdmin,
  isDriver,
  isManufacturer,
  isWholesaler,
  isRetailer,
  canManageProducts,
  canPlaceOrders,
  canManageDeliveries,
  canViewAnalytics,
  canManageUsers,
  getDashboardFeatures,
  getNavigationItems,
  getRolePermissions,
  getAllRoles,
  getRoleInfo,
  isValidRole,
  validateRoleTransition
};