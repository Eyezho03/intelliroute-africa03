import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineElement, 
  BarElement,
  PointElement, 
  CategoryScale, 
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  ChevronDown, 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  MapPin, 
  RefreshCw,
  Download,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  LineElement, 
  BarElement,
  PointElement, 
  CategoryScale, 
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const AdvancedAnalytics = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [timeRange, setTimeRange] = useState('monthly');

  // Performance data
  const performanceData = {
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'On-Time Rate',
          data: [82, 85, 88, 87, 90, 92, 94, 96],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          fill: true
        },
        {
          label: 'Industry Avg',
          data: [78, 79, 81, 82, 84, 85, 86, 87],
          borderColor: 'rgba(153, 102, 255, 1)',
          borderDash: [5, 5],
          tension: 0.3,
          fill: false
        }
      ]
    },
    quarterly: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'On-Time Rate',
          data: [85, 88, 91, 94],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          fill: true
        }
      ]
    }
  };

  // Efficiency data
  const efficiencyData = {
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Miles per Gallon',
          data: [8.2, 8.5, 8.7, 8.9, 9.1, 9.3, 9.4, 9.6],
          backgroundColor: 'rgba(255, 159, 64, 0.7)',
        },
        {
          label: 'Idle Time %',
          data: [12, 11, 10, 9.5, 9, 8.5, 8, 7.5],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
        }
      ]
    }
  };

  // Cost data
  const costData = {
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [
        {
          label: 'Fuel Cost',
          data: [12500, 11800, 11200, 10500, 9800, 9200, 8700, 8200],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
        },
        {
          label: 'Maintenance',
          data: [7800, 7600, 7400, 7200, 7000, 6800, 6600, 6400],
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
        }
      ]
    }
  };

  // Route optimization pie data
  const routeData = {
    labels: ['Optimal Routes', 'Suboptimal Routes', 'Inefficient Routes'],
    datasets: [
      {
        data: [68, 22, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  // AI Suggestions
  const suggestions = {
    performance: [
      {
        title: 'Route Optimization',
        content: 'Reroute deliveries through the Northern Bypass during rush hours to reduce delays by 25%.',
        impact: 'Could improve on-time rate by 8%',
        icon: <MapPin className="w-5 h-5 text-blue-500" />
      },
      {
        title: 'Driver Training',
        content: 'Implement defensive driving training for 15 drivers with lowest on-time rates.',
        impact: 'Expected to reduce late deliveries by 15%',
        icon: <Zap className="w-5 h-5 text-yellow-500" />
      },
      {
        title: 'Vehicle Maintenance',
        content: 'Prioritize maintenance for 5 trucks showing decreased performance metrics.',
        impact: 'Could reduce breakdowns by 30%',
        icon: <RefreshCw className="w-5 h-5 text-green-500" />
      }
    ],
    efficiency: [
      {
        title: 'Fuel Efficiency Program',
        content: 'Implement a fuel efficiency training program targeting drivers with the highest fuel consumption.',
        impact: 'Potential savings: $2,400/month',
        icon: <TrendingUp className="w-5 h-5 text-green-500" />
      },
      {
        title: 'Idle Time Reduction',
        content: 'Install automatic engine shutoff systems for vehicles with more than 20% idle time.',
        impact: 'Could reduce fuel costs by 12%',
        icon: <Clock className="w-5 h-5 text-purple-500" />
      }
    ],
    cost: [
      {
        title: 'Bulk Fuel Purchasing',
        content: 'Negotiate bulk fuel purchasing agreements with 3 major suppliers in your region.',
        impact: 'Potential savings: $1,800/month',
        icon: <DollarSign className="w-5 h-5 text-green-500" />
      },
      {
        title: 'Predictive Maintenance',
        content: 'Implement AI-powered predictive maintenance to reduce unexpected repairs.',
        impact: 'Could lower maintenance costs by 18%',
        icon: <Lightbulb className="w-5 h-5 text-yellow-500" />
      }
    ]
  };

  // Chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#718096'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#cbd5e0',
        bodyColor: '#e2e8f0',
        padding: 12,
        cornerRadius: 4
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#a0aec0'
        }
      },
      y: {
        min: 70,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#a0aec0',
          callback: (value) => `${value}%`
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#718096'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#cbd5e0',
        bodyColor: '#e2e8f0',
        padding: 12,
        cornerRadius: 4
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#a0aec0'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#a0aec0',
          callback: (value) => `$${value/1000}k`
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#a0aec0',
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        bodyColor: '#e2e8f0',
        padding: 12,
        cornerRadius: 4
      }
    }
  };

  const currentData = () => {
    if (activeTab === 'performance') return performanceData[timeRange];
    if (activeTab === 'efficiency') return efficiencyData[timeRange];
    return costData[timeRange];
  };

  const currentSuggestions = suggestions[activeTab];
  const currentSuggestion = currentSuggestions[activeSuggestion];

  const nextSuggestion = () => {
    setActiveSuggestion((prev) => (prev + 1) % currentSuggestions.length);
  };

  const prevSuggestion = () => {
    setActiveSuggestion((prev) => (prev - 1 + currentSuggestions.length) % currentSuggestions.length);
  };

  return (
    <div className="bg-gray-900 text-gray-100 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Advanced Analytics & AI Insights
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Data-driven recommendations to optimize your logistics operations
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="pl-3 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          <button className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {[
          { id: 'performance', label: 'Performance', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'efficiency', label: 'Efficiency', icon: <Zap className="w-4 h-4" /> },
          { id: 'cost', label: 'Cost Analysis', icon: <DollarSign className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setActiveSuggestion(0);
            }}
            className={`px-5 py-3 text-sm font-medium flex items-center gap-2 transition-colors ${
              activeTab === tab.id 
                ? 'text-blue-400 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5">
        {/* Chart Container */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-4">
            {activeTab === 'performance' && (
              <Line data={currentData()} options={lineOptions} />
            )}
            {activeTab === 'efficiency' && (
              <Bar data={currentData()} options={barOptions} />
            )}
            {activeTab === 'cost' && (
              <Bar data={currentData()} options={barOptions} />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-4">
              <h3 className="font-medium text-gray-300 mb-3">Route Optimization</h3>
              <div className="h-64">
                <Pie data={routeData} options={pieOptions} />
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-4">
              <h3 className="font-medium text-gray-300 mb-3">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">On-Time Rate</span>
                  <span className="text-xl font-bold text-green-400">96%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg Delivery Time</span>
                  <span className="text-xl font-bold text-blue-400">4.2h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Cost per Mile</span>
                  <span className="text-xl font-bold text-purple-400">$1.24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Fuel Efficiency</span>
                  <span className="text-xl font-bold text-yellow-400">9.6 MPG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions Panel */}
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              AI Recommendations
            </h3>
            <div className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
              {activeSuggestion + 1}/{currentSuggestions.length}
            </div>
          </div>
          
          <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                {currentSuggestion.icon}
              </div>
              <div>
                <h4 className="font-bold text-white">{currentSuggestion.title}</h4>
                <p className="text-gray-300 mt-2">{currentSuggestion.content}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-green-400 bg-green-500/10 px-3 py-1.5 rounded">
                  <Zap className="w-4 h-4" />
                  <span>{currentSuggestion.impact}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={prevSuggestion}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Implement This
            </button>
            
            <button 
              onClick={nextSuggestion}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium text-gray-300 mb-3">Key Metrics Impacted</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">On-Time Delivery</span>
                <span className="text-green-400">+8%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Fuel Costs</span>
                <span className="text-red-400">-12%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Driver Efficiency</span>
                <span className="text-green-400">+15%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">CO2 Emissions</span>
                <span className="text-green-400">-9%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700">
            <button className="w-full text-center text-blue-400 hover:text-blue-300 transition-colors">
              View Detailed Implementation Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;