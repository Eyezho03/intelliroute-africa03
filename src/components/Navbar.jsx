import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/intellirouteafrica5.jpg';
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
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New route optimization available', time: '2 min ago', read: false },
    { id: 2, text: 'Vehicle maintenance due', time: '1 hour ago', read: true }
  ]);
  const menuRef = useRef(null);
  const userDropdownRef = useRef(null);
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ 
      name: 'Eyezho',
      role: 'Operations Manager',
      company: 'TransAfrica Logistics'
    });
    navigate('/dashboard');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: 'Live Tracking', href: '#tracking', icon: <MapPin size={16} /> },
    { name: 'Fleet Management', href: '#fleet', icon: <Truck size={16} /> },
    { name: 'Route Analytics', href: '#analytics', icon: <BarChart3 size={16} /> },
    { name: 'Dispatch Center', href: '#dispatch' },
    { name: 'Documents', href: '#documents' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 shadow-xl">
      <div className="flex items-center font-bold text-white gap-2">
        <img 
          src={logo} 
          alt="Intelliroute Africa Logo" 
          className="h-12 w-auto object-contain rounded-lg border border-gray-600"
        />
        <div>
          <div className="flex items-center gap-1">
            <span className="text-lg bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Intelliroute-Africa
            </span>
            <span className="text-xs bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full ml-2">
              PRO
            </span>
          </div>
          <p className="text-xs text-gray-300 font-normal">Smart Logistics for Africa</p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search shipments, vehicles, routes..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      <nav className="hidden md:flex gap-6 text-sm text-gray-300">
        {menuItems.map((item, idx) => (
          <a 
            key={idx} 
            href={item.href} 
            className="flex items-center gap-1.5 group hover:text-white transition-colors"
          >
            {item.icon && <span className="text-emerald-400">{item.icon}</span>}
            <span className="font-medium">{item.name}</span>
            <span className="block h-0.5 bg-gradient-to-r from-emerald-400 to-teal-300 w-0 group-hover:w-full transition-all duration-300"></span>
          </a>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-5">
        <button className="relative p-1.5 text-gray-300 hover:text-white">
          <Bell className="h-5 w-5" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
        
        {!user ? (
          <button
            onClick={handleLogin}
            className="py-2 px-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg hover:scale-[1.03] transition-transform duration-300 flex items-center gap-2"
          >
            <User size={16} />
            <span>Login</span>
          </button>
        ) : (
          <div className="relative" ref={userDropdownRef}>
            <button 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-750 pl-2 pr-3 py-1.5 rounded-lg transition-colors"
            >
              <div className="bg-gray-700 border-2 border-dashed rounded-xl w-8 h-8" />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.role}</p>
              </div>
              <ChevronDown className={`text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} size={16} />
            </button>
            
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.company}</p>
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
                    to="/settings" 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-750 hover:text-white"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Settings size={16} className="text-emerald-400" />
                    <span>Account Settings</span>
                  </Link>
                </div>
                <div className="px-4 py-3 border-t border-gray-700">
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full py-2 bg-gray-750 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="md:hidden z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-750"
        >
          {isOpen ? (
            <X className="text-white w-6 h-6" /> 
          ) : (
            <Menu className="text-white w-6 h-6" />
          )}
        </button>
      </div>

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
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-4">
            {menuItems.map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                className="flex items-center gap-3 py-3 text-gray-300 hover:text-white border-b border-gray-800"
              >
                {item.icon && <span className="text-emerald-400">{item.icon}</span>}
                <span>{item.name}</span>
              </a>
            ))}
            <div className="mt-6">
              {!user ? (
                <button
                  onClick={handleLogin}
                  className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-medium rounded-lg hover:scale-[1.03] transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  <User size={16} />
                  <span>Login</span>
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 py-2 px-3 bg-gray-800 text-gray-300 hover:text-white rounded-lg"
                  >
                    <User size={16} className="text-emerald-400" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-2 py-2 px-3 bg-gray-800 text-gray-300 hover:text-white rounded-lg"
                  >
                    <Settings size={16} className="text-emerald-400" />
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full py-2 bg-gray-750 hover:bg-gray-700 text-white text-sm font-medium rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
