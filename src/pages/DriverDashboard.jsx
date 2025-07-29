import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2/dist/react-chartjs-2.esm';
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

const initialRoutes = [
  { id: 1, name: 'Route A', status: 'In Progress' },
  { id: 2, name: 'Route B', status: 'Pending' },
];

const initialChecklist = [
  { id: 1, task: 'Check vehicle', done: false },
  { id: 2, task: 'Confirm cargo', done: false },
  { id: 3, task: 'Start route', done: false },
];

const initialNotifications = [
  { id: 1, message: 'New route assigned: Route B.' },
  { id: 2, message: 'Complete your checklist before departure.' },
];

const defaultRouteLabels = ['Route A', 'Route B', 'Route C', 'Route D'];
const defaultRouteData = [100, 80, 90, 70];
const defaultActivityLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const defaultActivityData = [5, 7, 6, 8, 4, 9, 10];
const chartTypes = ['line', 'bar', 'doughnut'];

const STORAGE_KEY = 'driver_dashboard';

const DriverDashboard = () => {
  const [routes, setRoutes] = useState(initialRoutes);
  const [checklist, setChecklist] = useState(initialChecklist);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [newRoute, setNewRoute] = useState('');
  const [newTask, setNewTask] = useState('');
  const [toast, setToast] = useState(null);
  const [routeLabels, setRouteLabels] = useState(defaultRouteLabels);
  const [routeData, setRouteData] = useState(defaultRouteData);
  const [activityLabels, setActivityLabels] = useState(defaultActivityLabels);
  const [activityData, setActivityData] = useState(defaultActivityData);
  const [routeChartType, setRouteChartType] = useState('bar');
  const [activityChartType, setActivityChartType] = useState('line');
  const [routeColor, setRouteColor] = useState('#6366f1');
  const [activityColor, setActivityColor] = useState('#10b981');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { routes, checklist, notifications, routeLabels, routeData, activityLabels, activityData } = JSON.parse(saved);
      if (routes) setRoutes(routes);
      if (checklist) setChecklist(checklist);
      if (notifications) setNotifications(notifications);
      if (routeLabels) setRouteLabels(routeLabels);
      if (routeData) setRouteData(routeData);
      if (activityLabels) setActivityLabels(activityLabels);
      if (activityData) setActivityData(activityData);
    }
  }, []);
  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ routes, checklist, notifications, routeLabels, routeData, activityLabels, activityData }));
  }, [routes, checklist, notifications, routeLabels, routeData, activityLabels, activityData]);

  // Connect analytics to dashboard actions (e.g., add to activityData when a task is completed)
  useEffect(() => {
    // Example: increment today's activity when a task is checked
    // (Assume last label is today)
    const completed = checklist.filter(t => t.done).length;
    setActivityData(prev => [...prev.slice(0, -1), completed]);
  }, [checklist]);

  // Add route
  const addRoute = () => {
    if (newRoute.trim()) {
      setRoutes(prev => [...prev, { id: Date.now(), name: newRoute, status: 'Pending' }]);
      setNewRoute('');
      showToast('Route added!');
    }
  };
  // Remove route
  const removeRoute = (id) => {
    setRoutes(prev => prev.filter(r => r.id !== id));
    showToast('Route removed.');
  };
  // Edit route name
  const editRoute = (id, name) => {
    setRoutes(prev => prev.map(r => r.id === id ? { ...r, name } : r));
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
    setChecklist(prev => prev.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };
  // Edit checklist task
  const editTask = (id, task) => {
    setChecklist(prev => prev.map(t => t.id === id ? { ...t, task } : t));
  };

  // Toast notification system
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  // SOS button
  const handleSOS = () => {
    showToast('SOS sent! Help is on the way.');
  };

  // Chart data objects
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
  const userActivityData = {
    labels: activityLabels,
    datasets: [
      {
        label: 'Tasks Completed',
        data: activityData,
        borderColor: activityColor,
        backgroundColor: [activityColor + '33', ...Array(activityData.length - 1).fill(activityColor + '11')],
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Editable chart handlers
  const handleRouteLabelChange = (i, value) => {
    setRouteLabels(labels => labels.map((l, idx) => (idx === i ? value : l)));
  };
  const handleRouteDataChange = (i, value) => {
    setRouteData(data => data.map((d, idx) => (idx === i ? Number(value) : d)));
  };
  const handleActivityLabelChange = (i, value) => {
    setActivityLabels(labels => labels.map((l, idx) => (idx === i ? value : l)));
  };
  const handleActivityDataChange = (i, value) => {
    setActivityData(data => data.map((d, idx) => (idx === i ? Number(value) : d)));
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
    if (type === 'route') {
      csv += 'Label,Value\n';
      routeLabels.forEach((l, i) => {
        csv += `${l},${routeData[i]}\n`;
      });
    } else if (type === 'activity') {
      csv += 'Label,Value\n';
      activityLabels.forEach((l, i) => {
        csv += `${l},${activityData[i]}\n`;
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
    <div className="bg-[#0e0e1a] min-h-screen text-white px-2 sm:px-4 md:px-8 py-4 md:py-8 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-400">Driver Dashboard</h2>
      {/* Assigned Routes */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h3 className="text-lg md:text-xl font-semibold text-emerald-300">Assigned Routes</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newRoute}
              onChange={e => setNewRoute(e.target.value)}
              placeholder="Add route..."
              className="border-b-2 border-emerald-300 focus:outline-none px-2 py-1 w-full sm:w-auto text-sm md:text-base"
            />
            <button onClick={addRoute} className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition w-full sm:w-auto text-sm md:text-base">Add</button>
          </div>
        </div>
        <div className="bg-[#18182a] shadow rounded p-4 min-w-0">
          <ul className="space-y-1">
            {routes.map(route => (
              <li key={route.id} className="flex flex-col sm:flex-row justify-between items-center group hover:bg-emerald-50 px-2 rounded transition gap-2">
                <input
                  type="text"
                  value={route.name}
                  onChange={e => editRoute(route.id, e.target.value)}
                  className="border-b border-gray-200 focus:outline-none px-1 mr-0 sm:mr-2 bg-transparent w-full sm:w-auto text-sm md:text-base"
                />
                <span className="text-xs md:text-sm text-gray-500 mr-0 sm:mr-2">{route.status}</span>
                <button onClick={() => removeRoute(route.id)} className="text-red-500 opacity-0 group-hover:opacity-100 transition text-sm md:text-base">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Task Checklist */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
          <h3 className="text-lg md:text-xl font-semibold text-emerald-300">Task Checklist</h3>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="Add task..."
              className="border-b-2 border-emerald-300 focus:outline-none px-2 py-1 w-full sm:w-auto text-sm md:text-base"
            />
            <button onClick={addTask} className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition w-full sm:w-auto text-sm md:text-base">Add</button>
          </div>
        </div>
        <ul className="bg-[#18182a] shadow rounded p-4 list-none min-w-0">
          {checklist.map(task => (
            <li key={task.id} className="flex flex-col sm:flex-row items-center mb-2 group hover:bg-emerald-50 px-2 rounded transition gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                className="mr-2 accent-green-600"
              />
              <input
                type="text"
                value={task.task}
                onChange={e => editTask(task.id, e.target.value)}
                className={"border-b border-gray-200 focus:outline-none px-1 bg-transparent flex-1 w-full sm:w-auto text-sm md:text-base " + (task.done ? 'line-through text-gray-400' : '')}
              />
              <button onClick={() => removeTask(task.id)} className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition text-sm md:text-base">Remove</button>
            </li>
          ))}
        </ul>
      </div>
      {/* Analytics Charts */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
        <div className="bg-[#18182a] shadow rounded p-4 min-w-0 overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">User Activity (Tasks Completed)</h3>
            <div className="flex gap-2">
              <select value={activityChartType} onChange={e => setActivityChartType(e.target.value)} className="border rounded px-2 py-1">
                {chartTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <input type="color" value={activityColor} onChange={e => setActivityColor(e.target.value)} title="Chart Color" />
              <button onClick={() => exportChart('activityChart')} className="bg-emerald-600 text-white px-2 py-1 rounded">Export PNG</button>
              <button onClick={() => exportCSV('activity')} className="bg-blue-600 text-white px-2 py-1 rounded">Export CSV</button>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            {activityLabels.map((label, i) => (
              <div key={i} className="flex flex-col items-center">
                <input value={label} onChange={e => handleActivityLabelChange(i, e.target.value)} className="w-14 text-xs border rounded mb-1 px-1" />
                <input type="number" value={activityData[i]} onChange={e => handleActivityDataChange(i, e.target.value)} className="w-14 text-xs border rounded px-1" />
              </div>
            ))}
          </div>
          {activityChartType === 'line' && <Line id="activityChart" data={userActivityData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
          {activityChartType === 'bar' && <Bar id="activityChart" data={userActivityData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
          {activityChartType === 'doughnut' && <Doughnut id="activityChart" data={userActivityData} options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } } }} />}
        </div>
      </div>
      {/* SOS/Emergency Button */}
      <div className="mb-8">
        <button onClick={handleSOS} className="px-6 py-3 bg-red-600 text-white rounded font-bold shadow-lg hover:bg-red-700 transition w-full sm:w-auto text-sm md:text-base">SOS / Emergency</button>
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

export default DriverDashboard; 