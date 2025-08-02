import React, { useEffect, useState } from 'react';
import { MapPin, Truck, AlertTriangle, BarChart2, Settings, Users, Activity, TrendingUp, Clock, CheckCircle, X, Plus, Download, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const OperationManagerDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalVehicles: 24,
    activeRoutes: 18,
    pendingRoutes: 6,
    completedToday: 12,
    onTimeDelivery: 94.5,
    totalDrivers: 32
  });
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Traffic', message: 'Heavy traffic on Nairobi-Mombasa highway', priority: 'high', timestamp: '2 hours ago' },
    { id: 2, type: 'Weather', message: 'Heavy rains expected in Kampala region', priority: 'medium', timestamp: '4 hours ago' },
    { id: 3, type: 'Maintenance', message: 'Vehicle KBT-123J requires scheduled maintenance', priority: 'low', timestamp: '1 day ago' }
  ]);
  
  const [recentOperations, setRecentOperations] = useState([
    { id: 1, route: 'Nairobi → Dar es Salaam', driver: 'John Mwangi', status: 'In Transit', progress: 75 },
    { id: 2, route: 'Kampala → Kigali', driver: 'Mary Achieng', status: 'Completed', progress: 100 },
    { id: 3, route: 'Mombasa → Lusaka', driver: 'Peter Otieno', status: 'Loading', progress: 10 }
  ]);
  
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Sample chart data
  const performanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Deliveries Completed',
      data: [12, 15, 8, 20, 18, 14, 16],
      backgroundColor: '#10b981',
      borderColor: '#047857',
      borderWidth: 1
    }]
  };

  const routeStatusData = {
    labels: ['Active', 'Pending', 'Completed'],
    datasets: [{
      data: [18, 6, 12],
      backgroundColor: ['#10b981', '#f59e0b', '#6366f1'],
      borderWidth: 0
    }]
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    showToast('Alert dismissed');
  };

  const exportData = () => {
    showToast('Operations data exported successfully!');
  };

  const refreshData = () => {
    showToast('Dashboard data refreshed!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200 p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Settings className="text-emerald-400" size={32} />
            <span className="text-emerald-400">Operations Manager</span>
            <span className="text-gray-300">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <Activity size={16} />
            Comprehensive operations oversight and management
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={refreshData}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button 
            onClick={exportData}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Truck className="text-blue-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Total Vehicles</p>
              <p className="text-2xl font-bold text-blue-400">{metrics.totalVehicles}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <MapPin className="text-green-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Active Routes</p>
              <p className="text-2xl font-bold text-green-400">{metrics.activeRoutes}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Clock className="text-yellow-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Pending Routes</p>
              <p className="text-2xl font-bold text-yellow-400">{metrics.pendingRoutes}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-emerald-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Completed Today</p>
              <p className="text-2xl font-bold text-emerald-400">{metrics.completedToday}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-purple-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">On-Time Delivery</p>
              <p className="text-2xl font-bold text-purple-400">{metrics.onTimeDelivery}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Users className="text-cyan-400" size={24} />
            <div>
              <p className="text-sm text-gray-400">Total Drivers</p>
              <p className="text-2xl font-bold text-cyan-400">{metrics.totalDrivers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <BarChart2 size={20} />
            Weekly Performance
          </h3>
          <Bar data={performanceData} options={{
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#9ca3af' } },
              x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
            }
          }} />
        </div>
        
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Activity size={20} />
            Route Status Distribution
          </h3>
          <Doughnut data={routeStatusData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { color: '#d1d5db', font: { size: 12 } }
              }
            }
          }} />
        </div>
      </div>

      {/* Recent Operations */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
        <h3 className="text-xl font-bold text-emerald-400 mb-4">Recent Operations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-750">
              <tr>
                <th className="px-4 py-3 text-gray-300 font-medium">Route</th>
                <th className="px-4 py-3 text-gray-300 font-medium">Driver</th>
                <th className="px-4 py-3 text-gray-300 font-medium">Status</th>
                <th className="px-4 py-3 text-gray-300 font-medium">Progress</th>
              </tr>
            </thead>
            <tbody>
              {recentOperations.map(operation => (
                <tr key={operation.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="px-4 py-3">{operation.route}</td>
                  <td className="px-4 py-3">{operation.driver}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      operation.status === 'Completed' ? 'bg-emerald-900 text-emerald-300' :
                      operation.status === 'In Transit' ? 'bg-blue-900 text-blue-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {operation.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full" 
                          style={{ width: `${operation.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{operation.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
          <AlertTriangle size={20} />
          Active Alerts
        </h3>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.priority === 'high' ? 'border-red-500 bg-red-900/20' :
              alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-900/20' :
              'border-blue-500 bg-blue-900/20'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{alert.type}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.priority === 'high' ? 'bg-red-500 text-red-100' :
                      alert.priority === 'medium' ? 'bg-yellow-500 text-yellow-100' :
                      'bg-blue-500 text-blue-100'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>
                  <p className="text-gray-300">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                </div>
                <button 
                  onClick={() => dismissAlert(alert.id)}
                  className="p-1 text-gray-400 hover:text-red-400 transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationManagerDashboard;
