import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/intellirouteafrica5.jpg';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSidebar, useSearch } from '../stores/appStore';
import { showToast } from './Toast';
import { cn, debounce } from '../utils';
import {
  Menu,
  X,
  Bell,
  MapPin,
  Truck,
  BarChart3,
  User,
  Settings,
  ChevronDown,
  Search,
  Brain,
  Package2,
  Satellite,
  Route,
  Clock,
  Layers,
  Shield,
  ArrowRight,
  HelpCircle,
  Sun,
  Moon,
  Command,
  Keyboard,
  Zap
} from 'lucide-react';
import { 
  AnimatedTruck, 
  BouncingPackage, 
  FloatingMapPin, 
  SparklingStar 
} from './CartoonAnimations';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import NotificationSystem from './NotificationSystem';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const menuRef = useRef(null);
  const userDropdownRef = useRef(null);
  const searchRef = useRef(null);
  
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { isOpen: sidebarOpen, toggle: toggleSidebar } = useSidebar();
  const { query: searchQuery, results: searchResults, setQuery, setResults } = useSearch();
  
  const navigate = useNavigate();
  const location = useLocation();

  // Set active route based on current path
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  const handleLogin = () => {
    login({
      name: 'Amara Okoye',
      role: 'Supply Chain Manager',
      company: 'IntelliRoute Africa Partner',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    });
    navigate('/dashboard');
  };

  // Mock data for search functionality
  const searchableItems = [
    { id: 1, title: 'Lagos to Accra Route', type: 'route', category: 'Routes', url: '/route-optimizer' },
    { id: 2, title: 'Vehicle KTN-001', type: 'vehicle', category: 'Vehicles', url: '/fleet' },
    { id: 3, title: 'Shipment #SH2024001', type: 'shipment', category: 'Shipments', url: '/tracking' },
    { id: 4, title: 'Weekly Analytics Report', type: 'report', category: 'Analytics', url: '/analytics' },
    { id: 5, title: 'AI Route Suggestions', type: 'intelligence', category: 'Intelligence', url: '/intelligence' },
    { id: 6, title: 'Inventory Stock Check', type: 'inventory', category: 'Inventory', url: '/inventory' },
    { id: 7, title: 'New Delivery Order', type: 'delivery', category: 'Orders', url: '/new-delivery' },
    { id: 8, title: 'Schedule Route Planning', type: 'schedule', category: 'Planning', url: '/schedule-route' }
  ];

  // Debounced search functionality
  const debouncedSearch = debounce((query) => {
    if (query.trim() === '') {
      setResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = searchableItems.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered.slice(0, 5)); // Limit to 5 results
    setShowSearchResults(true);
  }, 300);

  const handleSearch = (query) => {
    setQuery(query);
    debouncedSearch(query);
  };

  const handleSearchItemClick = (item) => {
    setQuery('');
    setShowSearchResults(false);
    navigate(item.url);
    showToast.success(`Navigating to ${item.title}`);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + K for search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = searchRef.current?.querySelector('input');
        if (searchInput) {
          searchInput.focus();
        }
      }
      
      // Escape to close dropdowns
      if (event.key === 'Escape') {
        setIsOpen(false);
        setUserDropdownOpen(false);
        setShowSearchResults(false);
      }
      
      // Ctrl/Cmd + B for sidebar toggle
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // Click outside handlers for menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Logistics-focused menu items
  const menuItems = [
    {
      name: 'Route Optimizer',
      href: '/route-optimizer',
      icon: <Route size={16} />,
      beta: true
    },
    {
      name: 'Live Tracking',
      href: '/tracking',
      icon: <MapPin size={16} />
    },
    {
      name: 'Fleet Manager',
      href: '/fleet',
      icon: <Truck size={16} />
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: <BarChart3 size={16} />
    },
    {
      name: 'Intelligence Hub',
      href: '/intelligence',
      icon: <Brain size={16} />
    },
  ];

  const quickActions = [
    { name: 'New Delivery', icon: <Package2 size={16} />, href: '/new-delivery' },
    { name: 'Schedule Route', icon: <Clock size={16} />, href: '/schedule-route' },
    { name: 'Inventory Check', icon: <Layers size={16} />, href: '/inventory' }
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 border-b shadow-xl transition-all duration-300",
      theme === 'dark' 
        ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700" 
        : "bg-white/80 backdrop-blur-md border-gray-200"
    )}>
      {/* Logo with tagline */}
      <div className="flex items-center font-bold gap-2">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={logo}
              alt="Intelliroute Africa Logo"
              className="h-12 w-auto object-contain rounded-lg border transition-all duration-300 group-hover:scale-105"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            {/* Floating cartoon characters around logo */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <AnimatedTruck size="sm" />
            </div>
            <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <BouncingPackage size="sm" />
            </div>
          </motion.div>
          <div>
            <motion.div 
              className="flex items-center gap-1"
              animate={{
                textShadow: [
                  "0 0 0px rgba(16, 185, 129, 0)",
                  "0 0 10px rgba(16, 185, 129, 0.3)",
                  "0 0 0px rgba(16, 185, 129, 0)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              <span className={cn(
                "text-lg bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent",
                theme === 'light' && "from-emerald-600 to-teal-600"
              )}>
                Intelliroute-Africa
              </span>
            </motion.div>
            <motion.p 
              className={cn(
                "text-xs font-normal",
                theme === 'dark' ? "text-gray-300" : "text-gray-600"
              )}
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              AI-Powered Logistics
            </motion.p>
          </div>
        </Link>
      </div>

      {/* Desktop Search & Navigation */}
      <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
        <div className="relative w-full" ref={searchRef}>
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </motion.div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery && setShowSearchResults(true)}
            placeholder="Search shipments, routes, vehicles..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-750 px-2 py-0.5 rounded">
            Ctrl+K
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSearchItemClick(item)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-750 flex items-center gap-3 group"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white group-hover:text-emerald-400">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.category}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
                </button>
              ))}
              {searchQuery && searchResults.length === 0 && (
                <div className="px-4 py-3 text-gray-400 text-sm">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-sm text-gray-300">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.href}
            className={`flex items-center gap-1.5 group hover:text-white transition-colors ${activeRoute.includes(item.href) ? 'text-emerald-400' : ''}`}
          >
            <motion.span 
              className={activeRoute.includes(item.href) ? 'text-emerald-400' : 'text-gray-400'}
              animate={{
                rotate: activeRoute.includes(item.href) ? [0, 5, -5, 0] : 0,
                scale: activeRoute.includes(item.href) ? [1, 1.1, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              {item.icon && item.icon}
            </motion.span>
            <span className="font-medium">{item.name}</span>
            {item.beta && (
              <motion.span 
                className="text-[0.6rem] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
              >
                BETA
              </motion.span>
            )}
            <motion.span 
              className={`block h-0.5 bg-gradient-to-r from-emerald-400 to-teal-300 w-0 group-hover:w-full transition-all duration-300 ${activeRoute.includes(item.href) ? 'w-full' : ''}`}
              animate={{
                backgroundPosition: activeRoute.includes(item.href) ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%"
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            ></motion.span>
          </Link>
        ))}
      </nav>

      {/* Desktop User Area */}
      <div className="hidden md:flex items-center gap-5">
        <div className="flex items-center gap-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              <Link
                to={action.href}
                className={cn(
                  "p-2 rounded-lg transition-colors relative",
                  theme === 'dark' 
                    ? "bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-emerald-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-emerald-600"
                )}
                title={action.name}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {action.icon}
                </motion.div>
                {/* Floating cartoon character on hover */}
                <div className="absolute -top-1 -right-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <FloatingMapPin size="sm" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className={cn(
            "p-2 rounded-lg transition-colors relative",
            theme === 'dark' 
              ? "bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-yellow-600"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </motion.div>
          {/* Floating star on hover */}
          <div className="absolute -top-1 -right-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <SparklingStar size="sm" />
          </div>
        </motion.button>

        <NotificationSystem />

        {!user ? (
          <button
            onClick={handleLogin}
            className="py-2 px-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg hover:scale-[1.03] transition-transform duration-300 flex items-center gap-2 group"
          >
            <User size={16} />
            <span>Log In</span>
            <span className="ml-1 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight size={16} />
            </span>
          </button>
        ) : (
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-750 pl-2 pr-3 py-1.5 rounded-lg transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500/30"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
              <ChevronDown className={`text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} size={16} />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/30"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.company}</p>
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-750 hover:text-white"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <User size={16} className="text-emerald-400" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/dashboard/supply-chain"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-750 hover:text-white"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Package2 size={16} className="text-orange-400" />
                    <span>Supply Chain</span>
                  </Link>
                  <Link
                    to="/dashboard/intelligence-hub"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-750 hover:text-white"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Satellite size={16} className="text-cyan-400" />
                    <span>Intelligence Hub</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-750 hover:text-white"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Settings size={16} className="text-emerald-400" />
                    <span>Account Settings</span>
                  </Link>
                </div>
                <div className="px-4 py-3 border-t border-gray-700 flex justify-between">
                  <Link
                    to="/help"
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-emerald-400"
                  >
                    <HelpCircle size={14} />
                    <span>Help Center</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="text-xs bg-gray-750 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="text-white w-6 h-6" />
          ) : (
            <Menu className="text-white w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 top-16 bg-gray-900 md:hidden flex flex-col"
        >
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search shipments, routes..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
              />
            </div>
            {/* Mobile Search Results */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="mt-2 bg-gray-800 rounded-lg border border-gray-700">
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleSearchItemClick(item);
                      setIsOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-750 flex items-center gap-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            {/* Quick Actions */}
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3 mb-2">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-emerald-400"
                    onClick={() => setIsOpen(false)}
                  >
                    {action.icon}
                    <span className="text-xs mt-1 text-center">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Navigation */}
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3 mb-2">Navigation</h3>
              <div className="space-y-1">
                {menuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${activeRoute.includes(item.href) ? 'bg-gray-750 text-emerald-400' : 'bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                    {item.beta && (
                      <span className="ml-auto text-[0.6rem] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full">
                        BETA
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {user && (
              <div className="mb-6">
                <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3 mb-2">Account</h3>
                <div className="space-y-1">
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${activeRoute.includes('/dashboard') ? 'bg-gray-750 text-emerald-400' : 'bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/dashboard/supply-chain"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${activeRoute.includes('/supply-chain') ? 'bg-gray-750 text-emerald-400' : 'bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Package2 size={18} className="text-orange-400" />
                    <span>Supply Chain</span>
                  </Link>
                  <Link
                    to="/dashboard/intelligence-hub"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${activeRoute.includes('/intelligence-hub') ? 'bg-gray-750 text-emerald-400' : 'bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Satellite size={18} className="text-cyan-400" />
                    <span>Intelligence Hub</span>
                  </Link>
                  <Link
                    to="/settings"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${activeRoute.includes('/settings') ? 'bg-gray-750 text-emerald-400' : 'bg-gray-800 hover:bg-gray-750 text-gray-300 hover:text-white'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800 bg-gray-850">
            {!user ? (
              <button
                onClick={() => {
                  handleLogin();
                  setIsOpen(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg flex items-center justify-center gap-2"
              >
                <User size={16} />
                <span>Log In</span>
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <Link
                  to="/help"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 px-3 py-2"
                >
                  <HelpCircle size={16} />
                  <span>Help</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="py-2 px-4 bg-gray-800 hover:bg-gray-750 text-white text-sm font-medium rounded-lg flex items-center gap-2"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;