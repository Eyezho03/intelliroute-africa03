import React, { useState, useEffect } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { 
  MapPin, 
  Truck, 
  AlertTriangle, 
  Clock, 
  Fuel, 
  CheckCircle, 
  Plus,
  X,
  Download,
  RefreshCw,
  Navigation,
  Phone,
  Home,
  Settings,
  FileText,
  DollarSign,
  Package
} from 'lucide-react';


// Register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const africanBorders = [
  { id: 1, name: 'Namanga (KE-TZ)', status: 'Heavy Traffic', delay: '2.5 hours' },
  { id: 2, name: 'Malaba (KE-UG)', status: 'Moderate', delay: '1 hour' },
  { id: 3, name: 'Beitbridge (ZA-ZW)', status: 'Severe', delay: '4 hours' },
];

const africanChecklist = [
  { id: 1, task: 'Verify border documents', done: false },
  { id: 2, task: 'Check fuel levels', done: false },
  { id: 3, task: 'Inspect refrigeration (if perishable)', done: false },
  { id: 4, task: 'Confirm cargo security', done: false },
];

const africanNotifications = [
  { id: 1, message: 'Heavy rains expected in Nairobi region tomorrow' },
  { id: 2, message: 'Road construction on A104 near Arusha' },
  { id: 3, message: 'New border policy at Malaba crossing' },
];

const africanRoutes = [
  { 
    id: 1, 
    name: 'Manufacturer to Wholesaler - Nairobi', 
    status: 'In Progress',
    distance: '250 km',
    estimatedTime: '6 hours',
    borderCrossings: [],
    progress: 65,
    orderType: 'Manufacturer → Wholesaler',
    cargo: 'Food Products'
  },
  { 
    id: 2, 
    name: 'Wholesaler to Retailer - Lagos', 
    status: 'Pending',
    distance: '80 km',
    estimatedTime: '3 hours',
    borderCrossings: [],
    progress: 0,
    orderType: 'Wholesaler → Retailer',
    cargo: 'Consumer Goods'
  },
  { 
    id: 3, 
    name: 'Cross-border Delivery - Kampala', 
    status: 'In Progress',
    distance: '850 km',
    estimatedTime: '2 days',
    borderCrossings: ['Malaba'],
    progress: 30,
    orderType: 'Manufacturer → Wholesaler',
    cargo: 'Bulk Commodities'
  },
];

const africanFuelPrices = [
  { country: 'Kenya', diesel: 159.12, petrol: 145.30 },
  { country: 'Tanzania', diesel: 142.50, petrol: 138.75 },
  { country: 'Uganda', diesel: 148.00, petrol: 140.25 },
  { country: 'Rwanda', diesel: 152.30, petrol: 147.80 },
];

const DriverDashboard = ({ user }) => {
  const [routes, setRoutes] = useState(africanRoutes);
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: -1.2921, lng: 36.8219 }); // Nairobi coords
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklist, setChecklist] = useState(africanChecklist);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, deliveries, reports, settings
  const [notifications, setNotifications] = useState(africanNotifications);
  const [borderCrossings] = useState(africanBorders);
  const [fuelPrices] = useState(africanFuelPrices);
  const [newRoute, setNewRoute] = useState('');
  const [newTask, setNewTask] = useState('');
  const [toast, setToast] = useState(null);
  const [sosActive, setSosActive] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('african_dashboard');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.routes) setRoutes(data.routes);
      if (data.checklist) setChecklist(data.checklist);
      if (data.notifications) setNotifications(data.notifications);
    }
    
    // Simulate getting driver's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          if (process.env.NODE_ENV === 'development') {
            console.error("Geolocation error:", error);
          }
        }
      );
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('african_dashboard', JSON.stringify({ 
      routes, 
      checklist, 
      notifications 
    }));
  }, [routes, checklist, notifications]);

  // Add route
  const addRoute = () => {
    if (newRoute.trim()) {
      const newRouteObj = {
        id: Date.now(),
        name: newRoute,
        status: 'Pending',
        distance: 'Calculating...',
        estimatedTime: 'Calculating...',
        borderCrossings: [],
        progress: 0
      };
      setRoutes(prev => [...prev, newRouteObj]);
      setNewRoute('');
      showToast('New route added!');
    }
  };

  // Remove route
  const removeRoute = (id) => {
    setRoutes(prev => prev.filter(r => r.id !== id));
    showToast('Route removed.');
  };

  // Add checklist task
  const addTask = () => {
    if (newTask.trim()) {
      setChecklist(prev => [...prev, { id: Date.now(), task: newTask, done: false }]);
      setNewTask('');
      showToast('Task added!');
    }
  };

  // Remove checklist task
  const removeTask = (id) => {
    setChecklist(prev => prev.filter(t => t.id !== id));
    showToast('Task removed.');
  };

  // Toggle checklist
  const toggleTask = (id) => {
    setChecklist(prev => prev.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // Toast notification system
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // SOS button
  const handleSOS = () => {
    setSosActive(true);
    showToast('🚨 Emergency alert sent with your location! Help is coming.');
    setTimeout(() => setSosActive(false), 10000);
  };

  // Route progress chart data
  const routeProgressData = {
    labels: routes.map(route => route.name),
    datasets: [
      {
        label: 'Route Progress (%)',
        data: routes.map(route => route.progress),
        backgroundColor: '#10b981',
        borderColor: '#047857',
        borderWidth: 1,
      },
    ],
  };

  // Border crossing delays chart data
  const borderDelayData = {
    labels: borderCrossings.map(border => border.name),
    datasets: [
      {
        label: 'Delay (hours)',
        data: borderCrossings.map(border => parseFloat(border.delay.split(' ')[0])),
        backgroundColor: '#f59e0b',
        borderColor: '#d97706',
        borderWidth: 1,
      },
    ],
  };

  // Export chart data
  const _exportChart = (chartId) => {
    const canvas = document.getElementById(chartId);
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${chartId}-${new Date().toISOString().split('T')[0]}.png`;
      link.click();
      showToast('Chart exported successfully!');
    }
  };

  // Contact support
  const contactSupport = () => {
    showToast('Contacting support team...');
  };

  const _completedTasks = checklist.filter(task => task.done).length;
  const _totalTasks = checklist.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200 p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Truck className="text-emerald-400" size={32} />
            <span className="text-emerald-400">Driver</span>
            <span className="text-gray-300">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Navigation size={16} />
            Multi-tier supply chain deliveries for manufacturers, wholesalers and retailers
          </p>
          <p className="text-sm text-gray-500">Welcome back, {user?.name || user?.fullName}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition"
          >
            <Home size={16} />
            <span>Home</span>
          </button>
          
          <div className="flex border border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 text-xs font-medium transition ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('deliveries')}
              className={`px-3 py-2 text-xs font-medium transition ${
                activeTab === 'deliveries'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              Deliveries
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-2 text-xs font-medium transition ${
                activeTab === 'reports'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-2 text-xs font-medium transition ${
                activeTab === 'settings'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>

          <button 
            onClick={contactSupport}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          >
            <Phone size={16} />
            <span>Support</span>
          </button>
          <button 
            onClick={handleSOS}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold shadow-lg transition-all ${
              sosActive 
                ? 'animate-pulse bg-red-700' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            <AlertTriangle size={20} />
            <span>SOS EMERGENCY</span>
          </button>
        </div>
      </header>

      {/* Tab Content */}
      {activeTab === 'deliveries' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Truck className="text-emerald-400" size={28} />
              My Deliveries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Active Routes</h3>
                <p className="text-2xl font-bold text-emerald-400">{routes.filter(r => r.status === 'In Progress').length}</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Pending Routes</h3>
                <p className="text-2xl font-bold text-yellow-400">{routes.filter(r => r.status === 'Pending').length}</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Completed Today</h3>
                <p className="text-2xl font-bold text-green-400">5</p>
              </div>
            </div>
            <div className="space-y-4">
              {routes.map(route => (
                <div key={route.id} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-white font-medium">{route.name}</h4>
                      <p className="text-gray-400 text-sm">{route.orderType} • {route.cargo}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      route.status === 'In Progress' ? 'bg-emerald-500/20 text-emerald-400' :
                      route.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {route.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Distance</p>
                      <p className="text-white">{route.distance}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Est. Time</p>
                      <p className="text-white">{route.estimatedTime}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{route.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${route.progress}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <FileText className="text-purple-400" size={28} />
              Driver Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-700/30 rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">Delivery Report</h3>
                <p className="text-gray-400 text-sm mb-4">Daily delivery performance and routes</p>
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg transition">
                  View Report
                </button>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">Fuel Report</h3>
                <p className="text-gray-400 text-sm mb-4">Fuel consumption and costs</p>
                <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg transition">
                  View Report
                </button>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">Time Report</h3>
                <p className="text-gray-400 text-sm mb-4">Working hours and overtime</p>
                <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg transition">
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <Settings className="text-gray-400" size={28} />
              Driver Settings
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h3 className="text-white font-medium mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Driver Name</label>
                      <input 
                        type="text" 
                        defaultValue={user?.name || user?.fullName || "Driver Name"}
                        className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">License Number</label>
                      <input 
                        type="text" 
                        defaultValue="DL123456789"
                        className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        defaultValue="+254 700 000 000"
                        className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-lg p-6">
                  <h3 className="text-white font-medium mb-4">Vehicle Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Vehicle Type</label>
                      <select className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white">
                        <option>Truck</option>
                        <option>Van</option>
                        <option>Motorcycle</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">License Plate</label>
                      <input 
                        type="text" 
                        defaultValue="KAA 123A"
                        className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Max Load (kg)</label>
                      <input 
                        type="number" 
                        defaultValue="5000"
                        className="w-full bg-gray-600/50 border border-gray-500 rounded-lg px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg transition">
                Cancel
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-lg transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dashboard' && (
        <>
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left Column - Routes & Checklist */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assigned Routes */}
          <div className="bg-[#18182a] rounded-xl shadow-lg p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl font-bold text-emerald-300 mb-2 sm:mb-0">
                Assigned Supply Chain Deliveries
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={newRoute}
                  onChange={e => setNewRoute(e.target.value)}
                  placeholder="Add delivery route (e.g. Manufacturer to Retailer)"
                  className="border-b-2 border-emerald-300 focus:outline-none px-3 py-2 bg-[#222235] rounded w-full"
                />
                <button 
                  onClick={addRoute} 
                  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition whitespace-nowrap"
                >
                  Add Route
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {routes.map(route => (
                <div key={route.id} className="border border-gray-700 rounded-lg p-4 hover:border-emerald-500 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{route.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                          📏 {route.distance}
                        </span>
                        <span className="bg-gray-700 px-2 py-1 rounded text-sm">
                          ⏱️ {route.estimatedTime}
                        </span>
                        <span className={`px-2 py-1 rounded text-sm ${
                          route.status === 'In Progress' 
                            ? 'bg-yellow-500 text-yellow-900' 
                            : 'bg-blue-500 text-blue-900'
                        }`}>
                          {route.status}
                        </span>
                        <span className="bg-emerald-700 px-2 py-1 rounded text-sm">
                          🚚 {route.orderType}
                        </span>
                        <span className="bg-purple-700 px-2 py-1 rounded text-sm">
                          📦 {route.cargo}
                        </span>
                      </div>
                      
                      {route.borderCrossings.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-400">Border Crossings:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {route.borderCrossings.map((border, idx) => (
                              <span key={idx} className="bg-amber-900 px-2 py-1 rounded text-sm">
                                {border}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => removeRoute(route.id)}
                      className="text-red-500 hover:text-red-400 transition"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{route.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-emerald-500 h-2.5 rounded-full" 
                        style={{ width: `${route.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Task Checklist */}
          <div className="bg-[#18182a] rounded-xl shadow-lg p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl font-bold text-emerald-300 mb-2 sm:mb-0">
                Pre-Journey Checklist
              </h2>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={newTask}
                  onChange={e => setNewTask(e.target.value)}
                  placeholder="Add custom task..."
                  className="border-b-2 border-emerald-300 focus:outline-none px-3 py-2 bg-[#222235] rounded w-full"
                />
                <button 
                  onClick={addTask} 
                  className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition whitespace-nowrap"
                >
                  Add Task
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              {checklist.map(task => (
                <div 
                  key={task.id} 
                  className={`flex items-center p-3 rounded-lg border ${
                    task.done 
                      ? 'border-emerald-500 bg-emerald-900/20' 
                      : 'border-gray-700 hover:border-emerald-400'
                  } transition`}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 accent-emerald-500 mr-3"
                  />
                  <span className={`flex-1 ${task.done ? 'line-through text-gray-500' : ''}`}>
                    {task.task}
                  </span>
                  <button 
                    onClick={() => removeTask(task.id)}
                    className="text-red-500 hover:text-red-400 ml-2 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Map & Key Info */}
        <div className="space-y-6">
          {/* Route Map */}
          <div className="bg-[#18182a] rounded-xl shadow-lg p-5 h-96">
            <h2 className="text-xl font-bold text-emerald-300 mb-4">
              Current Location
            </h2>
            <div className="h-full rounded-lg bg-gray-700/30 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-emerald-400" size={32} />
                </div>
                <p className="text-white font-medium">Current Location</p>
                <p className="text-gray-400 text-sm">
                  Lat: {currentLocation.lat.toFixed(4)}, Lng: {currentLocation.lng.toFixed(4)}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Map loading temporarily disabled
                </p>
              </div>
            </div>
          </div>
          
          {/* Border Crossing Info */}
          <div className="bg-[#18182a] rounded-xl shadow-lg p-5">
            <h2 className="text-xl font-bold text-emerald-300 mb-4">
              Border Crossing Status
            </h2>
            <div className="space-y-3">
              {borderCrossings.map(border => (
                <div key={border.id} className="border border-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{border.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      border.status === 'Heavy Traffic' 
                        ? 'bg-red-500 text-red-900' 
                        : border.status === 'Severe' 
                          ? 'bg-red-700 text-red-100'
                          : 'bg-yellow-500 text-yellow-900'
                    }`}>
                      {border.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">Delay: {border.delay}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fuel Prices */}
          <div className="bg-[#18182a] rounded-xl shadow-lg p-5">
            <h2 className="text-xl font-bold text-emerald-300 mb-4">
              Regional Fuel Prices (KES/L)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 text-left">Country</th>
                    <th className="py-2 text-right">Diesel</th>
                    <th className="py-2 text-right">Petrol</th>
                  </tr>
                </thead>
                <tbody>
                  {fuelPrices.map((fuel, idx) => (
                    <tr key={idx} className="border-b border-gray-800 last:border-0">
                      <td className="py-2">{fuel.country}</td>
                      <td className="py-2 text-right">KES {fuel.diesel.toFixed(2)}</td>
                      <td className="py-2 text-right">KES {fuel.petrol.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#18182a] rounded-xl shadow-lg p-5">
          <h2 className="text-xl font-bold text-emerald-300 mb-4">
            Route Progress
          </h2>
          <Bar 
            data={routeProgressData} 
            options={{ 
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  max: 100,
                  title: { display: true, text: 'Completion %' }
                }
              }
            }} 
          />
        </div>
        
        <div className="bg-[#18182a] rounded-xl shadow-lg p-5">
          <h2 className="text-xl font-bold text-emerald-300 mb-4">
            Border Crossing Delays
          </h2>
          <Line 
            data={borderDelayData} 
            options={{ 
              responsive: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  title: { display: true, text: 'Hours delay' }
                }
              }
            }} 
          />
        </div>
      </div>
      
      {/* Notifications */}
      <div className="bg-[#18182a] rounded-xl shadow-lg p-5 mb-8">
        <h2 className="text-xl font-bold text-emerald-300 mb-4">
          Logistics Notifications
        </h2>
        <div className="space-y-3">
          {notifications.map(notification => (
            <div key={notification.id} className="border-l-4 border-emerald-500 pl-4 py-2">
              <p>{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date().toLocaleDateString()} • Regional Update
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default DriverDashboard;