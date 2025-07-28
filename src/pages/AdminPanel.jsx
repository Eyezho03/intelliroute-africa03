import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  Plus, 
  Trash2, 
  Download, 
  FileText, 
  Bell, 
  User, 
  Truck, 
  BarChart2,
  Settings,
  RefreshCw,
  Check,
  X
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [fleetReports, setFleetReports] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: 'driver', email: '' });
  const [newVehicle, setNewVehicle] = useState({ vehicle: '', status: 'Active', lastService: '' });
  const [toast, setToast] = useState(null);
  const [fleetLabels, setFleetLabels] = useState(['Active', 'Maintenance', 'Inactive']);
  const [fleetData, setFleetData] = useState([8, 3, 1]);
  const [userLabels, setUserLabels] = useState([]);
  const [userData, setUserData] = useState([]);
  const [fleetChartType, setFleetChartType] = useState('pie');
  const [userChartType, setUserChartType] = useState('bar');
  const [fleetColors, setFleetColors] = useState(['#10b981', '#f59e0b', '#ef4444']);
  const [userColor, setUserColor] = useState('#6366f1');
  const [activeTab, setActiveTab] = useState('users');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fleetFormRef = useRef(null);
  const userFormRef = useRef(null);

  // Initialize with sample data
  useEffect(() => {
    const initialUsers = [
      { id: 1, name: 'Alice Kimani', role: 'fleet_manager', email: 'alice@swifthaul.co.ke' },
      { id: 2, name: 'Bob Omondi', role: 'driver', email: 'bob@swifthaul.co.ke' },
      { id: 3, name: 'Carol Atieno', role: 'admin', email: 'carol@swifthaul.co.ke' },
    ];
    
    const initialFleet = [
      { id: 1, vehicle: 'KBT 123J (Isuzu NPR)', status: 'Active', lastService: '2024-06-01' },
      { id: 2, vehicle: 'KCN 456K (Toyota Hiace)', status: 'Maintenance', lastService: '2024-05-20' },
      { id: 3, vehicle: 'KDA 789L (Mitsubishi Fuso)', status: 'Active', lastService: '2024-05-15' },
    ];
    
    const initialNotifications = [
      { id: 1, message: 'Vehicle KCN 456K requires maintenance', timestamp: '2 hours ago', read: false },
      { id: 2, message: '3 new users registered today', timestamp: '5 hours ago', read: true },
      { id: 3, message: 'Monthly report is ready for download', timestamp: '1 day ago', read: true },
    ];
    
    setUsers(initialUsers);
    setFleetReports(initialFleet);
    setNotifications(initialNotifications);
    setUserLabels(initialUsers.map(u => u.name));
    setUserData(initialUsers.map(() => Math.floor(Math.random() * 10) + 1));
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (fleetReports.length > 0 && Math.random() > 0.7) {
        const randomIndex = Math.floor(Math.random() * fleetReports.length);
        const updatedFleet = [...fleetReports];
        updatedFleet[randomIndex] = {
          ...updatedFleet[randomIndex],
          status: updatedFleet[randomIndex].status === 'Active' ? 'Maintenance' : 'Active'
        };
        setFleetReports(updatedFleet);
        
        setNotifications(prev => [{
          id: Date.now(),
          message: `Status updated for ${updatedFleet[randomIndex].vehicle}`,
          timestamp: 'Just now',
          read: false
        }, ...prev.slice(0, 4)]);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [fleetReports]);

  // Update fleet data when reports change
  useEffect(() => {
    const statusCounts = fleetReports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, {});
    
    const newData = fleetLabels.map(label => statusCounts[label] || 0);
    setFleetData(newData);
  }, [fleetReports, fleetLabels]);

  // User management actions
  const addUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      const newUserObj = {
        id: Date.now(),
        ...newUser,
        createdAt: new Date().toISOString()
      };
      
      setUsers(prev => [...prev, newUserObj]);
      setUserLabels(prev => [...prev, newUser.name]);
      setUserData(prev => [...prev, Math.floor(Math.random() * 10) + 1]);
      
      setNewUser({ name: '', role: 'driver', email: '' });
      showToast('User added successfully');
      userFormRef.current.reset();
    }
  };

  const removeUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast('User removed');
  };

  // Fleet management actions
  const addVehicle = (e) => {
    e.preventDefault();
    if (newVehicle.vehicle) {
      const newVehicleObj = {
        id: Date.now(),
        ...newVehicle,
        lastService: newVehicle.lastService || new Date().toISOString().split('T')[0]
      };
      
      setFleetReports(prev => [...prev, newVehicleObj]);
      setNewVehicle({ vehicle: '', status: 'Active', lastService: '' });
      showToast('Vehicle added to fleet');
      fleetFormRef.current.reset();
    }
  };

  const removeVehicle = (id) => {
    setFleetReports(prev => prev.filter(v => v.id !== id));
    showToast('Vehicle removed from fleet');
  };

  // Notification actions
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? {...n, read: true} : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
    showToast('All notifications marked as read');
  };

  // Toast notification system
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Refresh data
  const refreshData = () => {
    setLastRefresh(new Date());
    showToast('Data refreshed');
  };

  // Chart data objects
  const fleetStatusData = {
    labels: fleetLabels,
    datasets: [{
      label: 'Vehicle Status',
      data: fleetData,
      backgroundColor: fleetColors,
      borderColor: ['#047857', '#b45309', '#b91c1c'],
      borderWidth: 1
    }],
  };

  const userActivityData = {
    labels: userLabels,
    datasets: [{
      label: 'Logins This Week',
      data: userData,
      backgroundColor: userColor,
      borderColor: '#4f46e5',
      borderWidth: 1
    }],
  };

  // Export to PNG
  const exportChart = (id) => {
    const canvas = document.getElementById(id);
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${id}-${new Date().toISOString().split('T')[0]}.png`;
      link.click();
    }
  };

  // CSV export
  const exportToCSV = (data, filename) => {
    let csv = '';
    if (data === 'users') {
      csv = 'Name,Role,Email\n';
      users.forEach(user => {
        csv += `${user.name},${user.role},${user.email}\n`;
      });
    } else if (data === 'fleet') {
      csv = 'Vehicle,Status,Last Service\n';
      fleetReports.forEach(vehicle => {
        csv += `${vehicle.vehicle},${vehicle.status},${vehicle.lastService}\n`;
      });
    }
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Render chart based on type
  const renderChart = (type, data, id) => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#d1d5db', font: { size: 12 } }
        },
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#f9fafb',
          bodyColor: '#f9fafb',
          padding: 12,
          cornerRadius: 4
        }
      },
      scales: {
        ...(type === 'bar' && {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            ticks: { color: '#9ca3af' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af' }
          }
        })
      }
    };

    return (
      <Chart
        id={id}
        type={type}
        data={data}
        options={options}
      />
    );
  };

  // Tab navigation
  const renderTabContent = () => {
    switch(activeTab) {
      case 'users':
        return (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-emerald-400">User Management</h3>
              <button 
                onClick={() => exportToCSV('users', 'intelliroute-users')}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                <FileText size={16} />
                <span>Export CSV</span>
              </button>
            </div>
            
            <form ref={userFormRef} onSubmit={addUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Full name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="admin">Admin</option>
                  <option value="fleet_manager">Fleet Manager</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  placeholder="user@company.com"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition"
                >
                  <Plus size={16} />
                  <span>Add User</span>
                </button>
              </div>
            </form>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-4 py-3 text-gray-300 font-medium">Name</th>
                    <th className="px-4 py-3 text-gray-300 font-medium">Role</th>
                    <th className="px-4 py-3 text-gray-300 font-medium">Email</th>
                    <th className="px-4 py-3 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-purple-900 text-purple-300' :
                          user.role === 'fleet_manager' ? 'bg-blue-900 text-blue-300' :
                          'bg-amber-900 text-amber-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{user.email}</td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => removeUser(user.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition"
                          title="Remove user"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'fleet':
        return (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-emerald-400">Fleet Management</h3>
              <button 
                onClick={() => exportToCSV('fleet', 'intelliroute-fleet')}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                <FileText size={16} />
                <span>Export CSV</span>
              </button>
            </div>
            
            <form ref={fleetFormRef} onSubmit={addVehicle} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Vehicle</label>
                <input
                  type="text"
                  value={newVehicle.vehicle}
                  onChange={e => setNewVehicle({...newVehicle, vehicle: e.target.value})}
                  placeholder="Vehicle identifier"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Status</label>
                <select
                  value={newVehicle.status}
                  onChange={e => setNewVehicle({...newVehicle, status: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Last Service</label>
                <input
                  type="date"
                  value={newVehicle.lastService}
                  onChange={e => setNewVehicle({...newVehicle, lastService: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition"
                >
                  <Plus size={16} />
                  <span>Add Vehicle</span>
                </button>
              </div>
            </form>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="px-4 py-3 text-gray-300 font-medium">Vehicle</th>
                    <th className="px-4 py-3 text-gray-300 font-medium">Status</th>
                    <th className="px-4 py-3 text-gray-300 font-medium">Last Service</th>
                    <th className="px-4 py-3 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fleetReports.map(vehicle => (
                    <tr key={vehicle.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="px-4 py-3">{vehicle.vehicle}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          vehicle.status === 'Active' ? 'bg-emerald-900 text-emerald-300' :
                          vehicle.status === 'Maintenance' ? 'bg-amber-900 text-amber-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{vehicle.lastService || 'N/A'}</td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => removeVehicle(vehicle.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition"
                          title="Remove vehicle"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-emerald-400">Fleet Analytics</h3>
              <div className="flex items-center gap-3">
                <button 
                  onClick={refreshData}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition"
                  title="Refresh data"
                >
                  <RefreshCw size={16} />
                </button>
                <span className="text-sm text-gray-400">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-750 rounded-xl p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-emerald-300 flex items-center gap-2">
                    <Truck size={18} />
                    <span>Fleet Status</span>
                  </h4>
                  <div className="flex gap-2">
                    <select 
                      value={fleetChartType} 
                      onChange={e => setFleetChartType(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="pie">Pie</option>
                      <option value="bar">Bar</option>
                      <option value="doughnut">Doughnut</option>
                      <option value="radar">Radar</option>
                    </select>
                    <button 
                      onClick={() => exportChart('fleetChart')}
                      className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm transition"
                    >
                      <Download size={16} />
                      <span>PNG</span>
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  {renderChart(fleetChartType, fleetStatusData, 'fleetChart')}
                </div>
              </div>
              
              <div className="bg-gray-750 rounded-xl p-4 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-emerald-300 flex items-center gap-2">
                    <User size={18} />
                    <span>User Activity</span>
                  </h4>
                  <div className="flex gap-2">
                    <select 
                      value={userChartType} 
                      onChange={e => setUserChartType(e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="bar">Bar</option>
                      <option value="pie">Pie</option>
                      <option value="doughnut">Doughnut</option>
                      <option value="radar">Radar</option>
                    </select>
                    <button 
                      onClick={() => exportChart('userChart')}
                      className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm transition"
                    >
                      <Download size={16} />
                      <span>PNG</span>
                    </button>
                  </div>
                </div>
                <div className="h-80">
                  {renderChart(userChartType, userActivityData, 'userChart')}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200 p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Settings className="text-emerald-400" size={24} />
            <span>Admin Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-1">
            Manage users, fleet, and analytics for IntelliRoute Africa
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-750 transition relative">
              <Bell size={20} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2">
            <div className="bg-gray-700 border-2 border-dashed rounded-xl w-8 h-8" />
            <div>
              <div className="font-medium">{user?.name || 'Admin'}</div>
              <div className="text-xs text-gray-400">Administrator</div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check size={18} />
            <span>{toast}</span>
          </div>
        </div>
      )}
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-800 pb-2">
        <button
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'users' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-800 hover:bg-gray-750'
          }`}
          onClick={() => setActiveTab('users')}
        >
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>Users</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'fleet' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-800 hover:bg-gray-750'
          }`}
          onClick={() => setActiveTab('fleet')}
        >
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>Fleet</span>
          </div>
        </button>
        <button
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'analytics' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-800 hover:bg-gray-750'
          }`}
          onClick={() => setActiveTab('analytics')}
        >
          <div className="flex items-center gap-2">
            <BarChart2 size={16} />
            <span>Analytics</span>
          </div>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="mb-8">
        {renderTabContent()}
      </div>
      
      {/* Notifications */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <Bell size={20} />
            <span>Notifications</span>
          </h3>
          <button 
            onClick={markAllAsRead}
            className="text-sm text-emerald-400 hover:text-emerald-300 transition"
          >
            Mark all as read
          </button>
        </div>
        
        <div className="space-y-3">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-lg border ${
                notification.read 
                  ? 'border-gray-700 bg-gray-750' 
                  : 'border-emerald-700 bg-emerald-900/20'
              }`}
            >
              <div className="flex justify-between items-start">
                <p className={notification.read ? 'text-gray-300' : 'text-emerald-300'}>
                  {notification.message}
                </p>
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 text-gray-400 hover:text-emerald-400 transition"
                    title="Mark as read"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {notification.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;