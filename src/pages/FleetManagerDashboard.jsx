import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
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
import {
  Truck,
  MapPin,
  Settings,
  Download,
  FileText,
  Bell,
  RefreshCw,
  BarChart3,
  Fuel,
  Route,
  Plus,
  X
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: -1.2921,
  lng: 36.8219,
};

const initialMetrics = {
  activeRoutes: 12,
  fuelUsage: '1,250 L',
  deliveryStatus: '87% On Time',
};

const initialVehicles = [
  { id: 1, lat: -1.2921, lng: 36.8219, label: 'Truck 1' },
  { id: 2, lat: -1.3000, lng: 36.8200, label: 'Truck 2' },
  { id: 3, lat: -1.2800, lng: 36.8300, label: 'Van 1' },
];

const initialNotifications = [
  { id: 1, message: 'Route 5 delayed due to traffic.' },
  { id: 2, message: 'Vehicle 2 requires maintenance.' },
  { id: 3, message: 'New delivery assigned to Truck 1.' },
];

// Editable analytics data
const defaultFuelLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const defaultFuelData = [200, 180, 220, 210, 190, 230, 250];
const defaultRouteLabels = ['Route 1', 'Route 2', 'Route 3', 'Route 4', 'Route 5'];
const defaultRouteData = [95, 87, 92, 80, 99];

const STORAGE_KEY = 'fleet_manager_dashboard';

const chartTypes = ['line', 'bar', 'doughnut'];

const FleetManagerDashboard = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyD02jv-35JMXT3AH-oNACQjRhXghnZvR6o',
  });

  const [metrics, setMetrics] = useState(initialMetrics);
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newNotification, setNewNotification] = useState('');
  // Editable analytics state
  const [fuelLabels, setFuelLabels] = useState(defaultFuelLabels);
  const [fuelData, setFuelData] = useState(defaultFuelData);
  const [routeLabels, setRouteLabels] = useState(defaultRouteLabels);
  const [routeData, setRouteData] = useState(defaultRouteData);
  const [fuelChartType, setFuelChartType] = useState('line');
  const [routeChartType, setRouteChartType] = useState('bar');
  // Add color state
  const [fuelColor, setFuelColor] = useState('#10b981');
  const [routeColor, setRouteColor] = useState('#6366f1');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { metrics, vehicles, notifications, fuelLabels, fuelData, routeLabels, routeData } = JSON.parse(saved);
      if (metrics) setMetrics(metrics);
      if (vehicles) setVehicles(vehicles);
      if (notifications) setNotifications(notifications);
      if (fuelLabels) setFuelLabels(fuelLabels);
      if (fuelData) setFuelData(fuelData);
      if (routeLabels) setRouteLabels(routeLabels);
      if (routeData) setRouteData(routeData);
    }
  }, []);
  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ metrics, vehicles, notifications, fuelLabels, fuelData, routeLabels, routeData }));
  }, [metrics, vehicles, notifications, fuelLabels, fuelData, routeLabels, routeData]);

  // Connect analytics to dashboard actions (example: update fuel usage on metric change)
  useEffect(() => {
    // Optionally, push new fuel usage to chart when metrics.fuelUsage changes
    // (Assume fuelUsage is a string like '1,250 L')
    const val = parseInt(metrics.fuelUsage.replace(/[^0-9]/g, ''));
    if (!isNaN(val)) {
      setFuelData(prev => [...prev.slice(1), val]);
    }
  }, [metrics.fuelUsage]);

  // Edit metrics
  const handleMetricChange = (e) => {
    const { name, value } = e.target;
    setMetrics((prev) => ({ ...prev, [name]: value }));
  };

  // Add notification
  const addNotification = () => {
    if (newNotification.trim()) {
      setNotifications((prev) => [
        { id: Date.now(), message: newNotification },
        ...prev,
      ]);
      setNewNotification('');
    }
  };

  // Dismiss notification
  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Move vehicle (for demo, just randomize positions)
  const moveVehicles = () => {
    setVehicles((prev) =>
      prev.map((v) => ({
        ...v,
        lat: v.lat + (Math.random() - 0.5) * 0.01,
        lng: v.lng + (Math.random() - 0.5) * 0.01,
      }))
    );
  };

  // Chart data objects
  const fuelUsageData = {
    labels: fuelLabels,
    datasets: [
      {
        label: 'Fuel Usage (L)',
        data: fuelData,
        borderColor: fuelColor,
        backgroundColor: [fuelColor + '33', ...Array(fuelData.length - 1).fill(fuelColor + '11')],
        tension: 0.4,
        fill: true,
      },
    ],
  };
  const routeCompletionData = {
    labels: routeLabels,
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: routeData,
        backgroundColor: routeColor,
      },
    ],
  };

  // Editable chart handlers
  const handleFuelLabelChange = (i, value) => {
    setFuelLabels(labels => labels.map((l, idx) => (idx === i ? value : l)));
  };
  const handleFuelDataChange = (i, value) => {
    setFuelData(data => data.map((d, idx) => (idx === i ? Number(value) : d)));
  };
  const handleRouteLabelChange = (i, value) => {
    setRouteLabels(labels => labels.map((l, idx) => (idx === i ? value : l)));
  };
  const handleRouteDataChange = (i, value) => {
    setRouteData(data => data.map((d, idx) => (idx === i ? Number(value) : d)));
  };

  // Chart export to PNG
  const _exportChart = (id) => {
    const chart = document.getElementById(id);
    if (chart) {
      const url = chart.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${id}.png`;
      link.click();
    }
  };

  // CSV export
  const exportCSV = (type) => {
    let csv = '';
    if (type === 'fuel') {
      csv += 'Label,Value\n';
      fuelLabels.forEach((l, i) => {
        csv += `${l},${fuelData[i]}\n`;
      });
    } else if (type === 'route') {
      csv += 'Label,Value\n';
      routeLabels.forEach((l, i) => {
        csv += `${l},${routeData[i]}\n`;
      });
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}_analytics.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const [toast, setToast] = useState(null);

  // Toast notification system
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const _enhancedExportChart = (id) => {
    exportChart(id);
    showToast('Chart exported successfully!');
  };

  const _enhancedExportCSV = (type) => {
    exportCSV(type);
    showToast(`${type} data exported to CSV!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-gray-200 p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Truck className="text-emerald-400" size={32} />
            <span className="text-emerald-400">Fleet Manager</span>
            <span className="text-gray-300">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <BarChart3 size={16} />
            Comprehensive fleet management and analytics
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Data refreshed!')}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </header>
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8">
        <div className="bg-[#18182a] shadow rounded p-4 md:p-6 flex flex-col items-center min-w-0">
          <label className="text-base md:text-lg font-semibold mb-1">Active Routes</label>
          <input
            type="number"
            name="activeRoutes"
            value={metrics.activeRoutes}
            onChange={handleMetricChange}
            className="text-xl md:text-2xl text-center border-b-2 border-emerald-300 focus:outline-none w-full md:w-20 mb-2 bg-transparent text-white"
          />
        </div>
        <div className="bg-[#18182a] shadow rounded p-4 md:p-6 flex flex-col items-center min-w-0">
          <label className="text-base md:text-lg font-semibold mb-1">Fuel Usage</label>
          <input
            type="text"
            name="fuelUsage"
            value={metrics.fuelUsage}
            onChange={handleMetricChange}
            className="text-xl md:text-2xl text-center border-b-2 border-emerald-300 focus:outline-none w-full md:w-28 mb-2 bg-transparent text-white"
          />
        </div>
        <div className="bg-[#18182a] shadow rounded p-4 md:p-6 flex flex-col items-center min-w-0">
          <label className="text-base md:text-lg font-semibold mb-1">Delivery Status</label>
          <input
            type="text"
            name="deliveryStatus"
            value={metrics.deliveryStatus}
            onChange={handleMetricChange}
            className="text-xl md:text-2xl text-center border-b-2 border-emerald-300 focus:outline-none w-full md:w-32 mb-2 bg-transparent text-white"
          />
        </div>
      </div>
      {/* Analytics Charts */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-[#18182a] shadow rounded p-4 min-w-0 overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Fuel Usage Over Time</h3>
            <div className="flex gap-2">
              <select value={fuelChartType} onChange={e => setFuelChartType(e.target.value)} className="border rounded px-2 py-1">
                {chartTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <input type="color" value={fuelColor} onChange={e => setFuelColor(e.target.value)} title="Chart Color" />
              <button onClick={() => exportChart('fuelChart')} className="bg-emerald-600 text-white px-2 py-1 rounded">Export PNG</button>
              <button onClick={() => exportCSV('fuel')} className="bg-blue-600 text-white px-2 py-1 rounded">Export CSV</button>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            {fuelLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center">
                <input value={label} onChange={e => handleFuelLabelChange(i, e.target.value)} className="w-14 text-xs border rounded mb-1 px-1" />
                <input type="number" value={fuelData[i]} onChange={e => handleFuelDataChange(i, e.target.value)} className="w-14 text-xs border rounded px-1" />
              </div>
            ))}
          </div>
          {fuelChartType === 'line' && <Line id="fuelChart" data={fuelUsageData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
          {fuelChartType === 'bar' && <Bar id="fuelChart" data={fuelUsageData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
          {fuelChartType === 'doughnut' && <Doughnut id="fuelChart" data={fuelUsageData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
        </div>
        <div className="bg-[#18182a] shadow rounded p-4 min-w-0 overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Route Completion Rates</h3>
            <div className="flex gap-2">
              <select value={routeChartType} onChange={e => setRouteChartType(e.target.value)} className="border rounded px-2 py-1">
                {chartTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <input type="color" value={routeColor} onChange={e => setRouteColor(e.target.value)} title="Chart Color" />
              <button onClick={() => exportChart('routeChart')} className="bg-emerald-600 text-white px-2 py-1 rounded">Export PNG</button>
              <button onClick={() => exportCSV('route')} className="bg-blue-600 text-white px-2 py-1 rounded">Export CSV</button>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            {routeLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center">
                <input value={label} onChange={e => handleRouteLabelChange(i, e.target.value)} className="w-14 text-xs border rounded mb-1 px-1" />
                <input type="number" value={routeData[i]} onChange={e => handleRouteDataChange(i, e.target.value)} className="w-14 text-xs border rounded px-1" />
              </div>
            ))}
          </div>
          {routeChartType === 'line' && <Line id="routeChart" data={routeCompletionData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
          {routeChartType === 'bar' && <Bar id="routeChart" data={routeCompletionData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
          {routeChartType === 'doughnut' && <Doughnut id="routeChart" data={routeCompletionData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
        </div>
      </div>
      {/* Live Vehicle Tracking Map */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h3 className="text-lg md:text-xl font-semibold text-emerald-300">Live Vehicle Tracking</h3>
          <button onClick={moveVehicles} className="bg-emerald-600 text-white px-4 py-1 rounded shadow hover:bg-emerald-700 transition w-full sm:w-auto text-sm md:text-base">Move Vehicles</button>
        </div>
        <div className="bg-[#18182a] rounded shadow min-w-0 w-full overflow-x-auto">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              {vehicles.map(vehicle => (
                <Marker
                  key={vehicle.id}
                  position={{ lat: vehicle.lat, lng: vehicle.lng }}
                  label={vehicle.label}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-64">Loading Map...</div>
          )}
        </div>
      </div>
      {/* Editable Notifications */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-emerald-300">Alerts & Notifications</h3>
        <div className="bg-[#18182a] shadow rounded p-4 min-w-0">
          <div className="flex flex-col sm:flex-row mb-4 gap-2">
            <input
              type="text"
              value={newNotification}
              onChange={e => setNewNotification(e.target.value)}
              placeholder="Add notification..."
              className="flex-1 border-b-2 border-emerald-300 focus:outline-none px-2 py-1 mr-0 sm:mr-2 w-full sm:w-auto text-sm md:text-base"
            />
            <button onClick={addNotification} className="bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-700 transition w-full sm:w-auto text-sm md:text-base">Add</button>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {notifications.map(n => (
              <li key={n.id} className="flex justify-between items-center group hover:bg-emerald-50 px-2 rounded transition">
                <span>{n.message}</span>
                <button onClick={() => dismissNotification(n.id)} className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition text-sm md:text-base">Dismiss</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FleetManagerDashboard; 