import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Bell,
  User,
  Factory,
  Store,
  Building2,
  Map,
  Car,
  DollarSign,
  Clock,
  FileText,
  Shield,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getNavigationItems, ROLES, ROLE_DISPLAY_NAMES } from '../utils/roleManagement';

// Icon mapping for navigation items
const ICON_MAP = {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Settings,
  Factory,
  Store,
  Building2,
  Map,
  Car,
  DollarSign,
  Clock,
  FileText,
  Shield,
  HelpCircle,
  Briefcase
};

const RoleBasedNavigation = ({ isCollapsed, onToggleCollapsed }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [notifications, setNotifications] = useState([]);
  
  // Get navigation items based on user role
  const navigationItems = user ? getNavigationItems(user.role) : [];

  useEffect(() => {
    // Load mock notifications
    setNotifications([
      { id: 1, message: 'New order received', type: 'info', unread: true },
      { id: 2, message: 'Delivery completed', type: 'success', unread: true },
      { id: 3, message: 'Low inventory alert', type: 'warning', unread: false }
    ]);
  }, []);

  const handleItemClick = (item) => {
    if (item.submenu) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(item.key)) {
          newSet.delete(item.key);
        } else {
          newSet.add(item.key);
        }
        return newSet;
      });
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const NavItem = ({ item, level = 0 }) => {
    const IconComponent = ICON_MAP[item.icon] || Package;
    const isActive = location.pathname === item.path;
    const isExpanded = expandedItems.has(item.key);
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <div className="mb-1">
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleItemClick(item)}
          className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all duration-200 ${
            isActive
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          } ${level > 0 ? 'ml-4' : ''}`}
        >
          <IconComponent className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
          
          {!isCollapsed && (
            <>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              {hasSubmenu && (
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              )}
            </>
          )}
        </motion.button>

        {/* Submenu */}
        <AnimatePresence>
          {hasSubmenu && isExpanded && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden ml-4"
            >
              {item.submenu.map((subItem) => (
                <NavItem key={subItem.key} item={subItem} level={level + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-gray-900 border-r border-gray-800 h-screen flex flex-col shadow-xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{user.name || user.email}</h3>
                <p className="text-gray-400 text-xs">{ROLE_DISPLAY_NAMES[user.role]}</p>
              </div>
            </div>
          )}
          
          <button
            onClick={onToggleCollapsed}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navigationItems.map((item) => (
          <NavItem key={item.key} item={item} />
        ))}
      </div>

      {/* Notifications */}
      {!isCollapsed && (
        <div className="px-3 mb-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-gray-300 text-sm font-medium">Notifications</h4>
              <div className="flex items-center space-x-1">
                <Bell className="h-4 w-4 text-gray-400" />
                <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                  {notifications.filter(n => n.unread).length}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {notifications.slice(0, 2).map((notification) => (
                <div
                  key={notification.id}
                  className={`text-xs p-2 rounded ${
                    notification.unread
                      ? 'bg-blue-900/30 text-blue-300 border border-blue-800'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {notification.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        {!isCollapsed && (
          <div className="text-gray-400 text-xs">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-400">Online</span>
            </div>
            <div className="flex justify-between">
              <span>Version:</span>
              <span>v1.0.0</span>
            </div>
          </div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-colors"
        >
          <LogOut className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
          {!isCollapsed && <span className="text-sm font-medium">Sign Out</span>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RoleBasedNavigation;
