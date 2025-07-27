import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Pie, Bar, Doughnut, Radar } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend);

const initialUsers = [
  { id: 1, name: 'Alice', role: 'fleet_manager', email: 'alice@example.com' },
  { id: 2, name: 'Bob', role: 'driver', email: 'bob@example.com' },
  { id: 3, name: 'Carol', role: 'admin', email: 'carol@example.com' },
];

const initialFleetReports = [
  { id: 1, vehicle: 'Truck 1', status: 'Active', lastService: '2024-06-01' },
  { id: 2, vehicle: 'Van 1', status: 'Maintenance', lastService: '2024-05-20' },
];

const initialNotifications = [
  { id: 1, message: '3 users registered today.' },
  { id: 2, message: 'Fleet report generated.' },
];

const defaultFleetLabels = ['Active', 'Maintenance', 'Inactive'];
const defaultFleetData = [5, 2, 1];
const defaultUserLabels = ['Alice', 'Bob', 'Carol'];
const defaultUserData = [10, 7, 4];
const chartTypes = ['pie', 'bar', 'doughnut', 'radar'];

const STORAGE_KEY = 'admin_panel';

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(initialUsers);
  const [fleetReports, setFleetReports] = useState(initialFleetReports);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newUser, setNewUser] = useState({ name: '', role: '', email: '' });
  const [newVehicle, setNewVehicle] = useState({ vehicle: '', status: '', lastService: '' });
  const [toast, setToast] = useState(null);
  const [fleetLabels, setFleetLabels] = useState(defaultFleetLabels);
  const [fleetData, setFleetData] = useState(defaultFleetData);
  const [userLabels, setUserLabels] = useState(defaultUserLabels);
  const [userData, setUserData] = useState(defaultUserData);
  const [fleetChartType, setFleetChartType] = useState('pie');
  const [userChartType, setUserChartType] = useState('bar');
  const [fleetColor, setFleetColor] = useState('#10b981');
  const [userColor, setUserColor] = useState('#6366f1');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { users, fleetReports, notifications, fleetLabels, fleetData, userLabels, userData } = JSON.parse(saved);
      if (users) setUsers(users);
      if (fleetReports) setFleetReports(fleetReports);
      if (notifications) setNotifications(notifications);
      if (fleetLabels) setFleetLabels(fleetLabels);
      if (fleetData) setFleetData(fleetData);
      if (userLabels) setUserLabels(userLabels);
      if (userData) setUserData(userData);
    }
  }, []);
  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ users, fleetReports, notifications, fleetLabels, fleetData, userLabels, userData }));
  }, [users, fleetReports, notifications, fleetLabels, fleetData, userLabels, userData]);

  // Connect analytics to dashboard actions (e.g., update fleet status on vehicle add/remove)
  useEffect(() => {
    // Example: update fleetData when fleetReports change
    const statusMap = { 'Active': 0, 'Maintenance': 1, 'Inactive': 2 };
    const counts = [0, 0, 0];
    fleetReports.forEach(r => {
      if (statusMap[r.status] !== undefined) counts[statusMap[r.status]]++;
    });
    setFleetData(counts);
  }, [fleetReports]);
  useEffect(() => {
    // Example: update userData when users change
    setUserData(users.map(() => Math.floor(Math.random() * 10 + 1)));
  }, [users]);

  // User management actions
  const addUser = () => {
    if (newUser.name && newUser.role && newUser.email) {
      setUsers(prev => [...prev, { ...newUser, id: Date.now() }]);
      setNewUser({ name: '', role: '', email: '' });
      showToast('User added!');
    }
  };
  const removeUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast('User removed.');
  };
  const editUser = (id, field, value) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  // Fleet management actions
  const addVehicle = () => {
    if (newVehicle.vehicle && newVehicle.status && newVehicle.lastService) {
      setFleetReports(prev => [...prev, { ...newVehicle, id: Date.now() }]);
      setNewVehicle({ vehicle: '', status: '', lastService: '' });
      showToast('Vehicle added!');
    }
  };
  const removeVehicle = (id) => {
    setFleetReports(prev => prev.filter(v => v.id !== id));
    showToast('Vehicle removed.');
  };
  const editVehicle = (id, field, value) => {
    setFleetReports(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  // Toast notification system
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  // Chart data objects
  const fleetStatusData = {
    labels: fleetLabels,
    datasets: [
      {
        label: 'Fleet Status',
        data: fleetData,
        backgroundColor: [fleetColor, '#f59e42', '#ef4444'],
      },
    ],
  };
  const userActivityData = {
    labels: userLabels,
    datasets: [
      {
        label: 'Logins This Week',
        data: userData,
        backgroundColor: userColor,
      },
    ],
  };

  // Editable chart handlers
  const handleFleetLabelChange = (i, value) => {
    setFleetLabels(labels => labels.map((l, idx) => (idx === i ? value : l)));
  };
  const handleFleetDataChange = (i, value) => {
    setFleetData(data => data.map((d, idx) => (idx === i ? Number(value) : d)));
  };
  const handleUserLabelChange = (i, value) => {
    setUserLabels(labels => labels.map((l, idx) => (idx === i ? value : l)));
  };
  const handleUserDataChange = (i, value) => {
    setUserData(data => data.map((d, idx) => (idx === i ? Number(value) : d)));
  };

  // Chart export to PNG
  const exportChart = (id) => {
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
    if (type === 'fleet') {
      csv += 'Label,Value\n';
      fleetLabels.forEach((l, i) => {
        csv += `${l},${fleetData[i]}\n`;
      });
    } else if (type === 'user') {
      csv += 'Label,Value\n';
      userLabels.forEach((l, i) => {
        csv += `${l},${userData[i]}\n`;
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

  return (
    <div className="bg-[#0e0e1a] min-h-screen text-white px-2 sm:px-4 md:px-8 py-4 md:py-8 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-400">Admin Panel</h2>
      {/* User Management */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h3 className="text-lg md:text-xl font-semibold text-emerald-300">User Management</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newUser.name}
              onChange={e => setNewUser(u => ({ ...u, name: e.target.value }))}
              placeholder="Name"
              className="border-b-2 border-emerald-300 focus:outline-none px-2 py-1 w-full sm:w-auto text-sm md:text-base"
            />
            <select
              value={newUser.role}
              onChange={e => setNewUser(u => ({ ...u, role: e.target.value }))}
              className="border-b-2 border-emerald-300 focus:outline-none px-2 py-1 w-full sm:w-auto text-sm md:text-base"
            >
              <option value="">Role</option>
              <option value="fleet_manager">Fleet Manager</option>
              <option value="driver">Driver</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="email"
              value={newUser.email}
              onChange={e => setNewUser(u => ({ ...u, email: e.target.value }))}
              placeholder="Email"
              className="border-b-2 border-emerald-300 focus:outline-none px-2 py-1 w-full sm:w-auto text-sm md:text-base"
            />
            {user?.role === 'admin' && (
              <button onClick={addUser} className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition w-full sm:w-auto text-sm md:text-base">Add</button>
            )}
          </div>
        </div>
        <div className="bg-[#18182a] shadow rounded p-4 overflow-x-auto min-w-0">
          <table className="min-w-full text-left text-xs md:text-base">
            <thead>
              <tr>
                <th className="px-2 md:px-4 py-2">Name</th>
                <th className="px-2 md:px-4 py-2">Role</th>
                <th className="px-2 md:px-4 py-2">Email</th>
                <th className="px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="px-2 md:px-4 py-2">
                    <input
                      type="text"
                      value={user.name}
                      onChange={e => editUser(user.id, 'name', e.target.value)}
                      className="border-b border-gray-200 focus:outline-none px-1 bg-transparent w-full text-sm md:text-base"
                    />
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    <select
                      value={user.role}
                      onChange={e => editUser(user.id, 'role', e.target.value)}
                      className="border-b border-gray-200 focus:outline-none px-1 bg-transparent w-full text-sm md:text-base"
                    >
                      <option value="fleet_manager">Fleet Manager</option>
                      <option value="driver">Driver</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    <input
                      type="email"
                      value={user.email}
                      onChange={e => editUser(user.id, 'email', e.target.value)}
                      className="border-b border-gray-200 focus:outline-none px-1 bg-transparent w-full text-sm md:text-base"
                    />
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    {user?.role === 'admin' && (
                      <button onClick={() => removeUser(user.id)} className="text-red-500 hover:underline text-sm md:text-base">Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Fleet Overview & Reports */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h3 className="text-lg md:text-xl font-semibold text-emerald-300">Fleet Overview & Reports</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newVehicle.vehicle}
              onChange={e => setNewVehicle(v => ({ ...v, vehicle: e.target.value }))}
              placeholder="Vehicle"
              className="border-b-2 border-emerald-300 focus:outline-none px-2 py-1 w-full sm:w-auto text-sm md:text-base"
            />
            <select
              value={newVehicle.status}
              onChange={e => setNewVehicle(v => ({ ...v, status: e.target.value }))}
              className="border-b-2 border-emerald-300 focus:outline-none px-2 py-1 w-full sm:w-auto text-sm md:text-base"
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="date"
              value={newVehicle.lastService}
              onChange={e => setNewVehicle(v => ({ ...v, lastService: e.target.value }))}
              className="border-b-2 border-emerald-300 focus:outline-none px-2 py-1 w-full sm:w-auto text-sm md:text-base"
            />
            {user?.role === 'admin' && (
              <button onClick={addVehicle} className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition w-full sm:w-auto text-sm md:text-base">Add</button>
            )}
          </div>
        </div>
        <div className="bg-[#18182a] shadow rounded p-4 overflow-x-auto min-w-0">
          <table className="min-w-full text-left text-xs md:text-base">
            <thead>
              <tr>
                <th className="px-2 md:px-4 py-2">Vehicle</th>
                <th className="px-2 md:px-4 py-2">Status</th>
                <th className="px-2 md:px-4 py-2">Last Service</th>
                <th className="px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fleetReports.map(report => (
                <tr key={report.id} className="border-t">
                  <td className="px-2 md:px-4 py-2">
                    <input
                      type="text"
                      value={report.vehicle}
                      onChange={e => editVehicle(report.id, 'vehicle', e.target.value)}
                      className="border-b border-gray-200 focus:outline-none px-1 bg-transparent w-full text-sm md:text-base"
                    />
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    <select
                      value={report.status}
                      onChange={e => editVehicle(report.id, 'status', e.target.value)}
                      className="border-b border-gray-200 focus:outline-none px-1 bg-transparent w-full text-sm md:text-base"
                    >
                      <option value="Active">Active</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    <input
                      type="date"
                      value={report.lastService}
                      onChange={e => editVehicle(report.id, 'lastService', e.target.value)}
                      className="border-b border-gray-200 focus:outline-none px-1 bg-transparent w-full text-sm md:text-base"
                    />
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    {user?.role === 'admin' && (
                      <button onClick={() => removeVehicle(report.id)} className="text-red-500 hover:underline text-sm md:text-base">Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Analytics Charts */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-[#18182a] shadow rounded p-4 min-w-0 overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Fleet Status</h3>
            <div className="flex gap-2">
              <select value={fleetChartType} onChange={e => setFleetChartType(e.target.value)} className="border rounded px-2 py-1 text-sm md:text-base">
                {chartTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <input type="color" value={fleetColor} onChange={e => setFleetColor(e.target.value)} title="Chart Color" className="text-sm md:text-base" />
              <button onClick={() => exportChart('fleetChart')} className="bg-emerald-600 text-white px-2 py-1 rounded text-sm md:text-base">Export PNG</button>
              <button onClick={() => exportCSV('fleet')} className="bg-blue-600 text-white px-2 py-1 rounded text-sm md:text-base">Export CSV</button>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            {fleetLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center">
                <input value={label} onChange={e => handleFleetLabelChange(i, e.target.value)} className="w-14 text-xs border rounded mb-1 px-1 text-sm md:text-base" />
                <input type="number" value={fleetData[i]} onChange={e => handleFleetDataChange(i, e.target.value)} className="w-14 text-xs border rounded px-1 text-sm md:text-base" />
              </div>
            ))}
          </div>
          {fleetChartType === 'pie' && <Pie id="fleetChart" data={fleetStatusData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }} />}
          {fleetChartType === 'bar' && <Bar id="fleetChart" data={fleetStatusData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
          {fleetChartType === 'doughnut' && <Doughnut id="fleetChart" data={fleetStatusData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }} />}
          {fleetChartType === 'radar' && <Radar id="fleetChart" data={fleetStatusData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }} />}
        </div>
        <div className="bg-[#18182a] shadow rounded p-4 min-w-0 overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">User Activity (Logins This Week)</h3>
            <div className="flex gap-2">
              <select value={userChartType} onChange={e => setUserChartType(e.target.value)} className="border rounded px-2 py-1 text-sm md:text-base">
                {chartTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <input type="color" value={userColor} onChange={e => setUserColor(e.target.value)} title="Chart Color" className="text-sm md:text-base" />
              <button onClick={() => exportChart('userChart')} className="bg-emerald-600 text-white px-2 py-1 rounded text-sm md:text-base">Export PNG</button>
              <button onClick={() => exportCSV('user')} className="bg-blue-600 text-white px-2 py-1 rounded text-sm md:text-base">Export CSV</button>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            {userLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center">
                <input value={label} onChange={e => handleUserLabelChange(i, e.target.value)} className="w-14 text-xs border rounded mb-1 px-1 text-sm md:text-base" />
                <input type="number" value={userData[i]} onChange={e => handleUserDataChange(i, e.target.value)} className="w-14 text-xs border rounded px-1 text-sm md:text-base" />
              </div>
            ))}
          </div>
          {userChartType === 'pie' && <Pie id="userChart" data={userActivityData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }} />}
          {userChartType === 'bar' && <Bar id="userChart" data={userActivityData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
          {userChartType === 'doughnut' && <Doughnut id="userChart" data={userActivityData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }} />}
          {userChartType === 'radar' && <Radar id="userChart" data={userActivityData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }} />}
        </div>
      </div>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-2 right-2 md:top-6 md:right-6 bg-emerald-600 text-white px-6 py-3 rounded shadow-lg z-50 animate-bounce-in">
          {toast}
        </div>
      )}
      {/* Notifications */}
      <div>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-emerald-300">Notifications</h3>
        <div className="bg-[#18182a] shadow rounded p-4 min-w-0">
          <ul className="list-disc pl-5 space-y-1">
            {notifications.map(n => (
              <li key={n.id}>{n.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 