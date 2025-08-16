import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle,
  Route,
  MapPin,
  Clock,
  Navigation,
  Zap,
  RefreshCw,
  TrendingUp,
  Activity,
  Gauge,
  Umbrella,
  Snowflake
} from 'lucide-react';

const WeatherRouting = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [liveWeather, setLiveWeather] = useState(true);

  useEffect(() => {
    // Simulate weather data for major African regions
    setWeatherData([
      {
        id: 1,
        city: 'Lagos',
        country: 'Nigeria',
        coordinates: { lat: 6.5244, lng: 3.3792 },
        current: {
          condition: 'heavy_rain',
          temperature: 28,
          humidity: 85,
          windSpeed: 15,
          visibility: 2.5,
          precipitation: 8.2
        },
        forecast: [
          { time: 'Now', condition: 'heavy_rain', temp: 28, rain: 8.2 },
          { time: '1h', condition: 'rain', temp: 27, rain: 5.1 },
          { time: '2h', condition: 'cloudy', temp: 26, rain: 1.2 },
          { time: '3h', condition: 'partly_cloudy', temp: 27, rain: 0.0 }
        ],
        routeImpact: {
          severity: 'high',
          affectedRoutes: 8,
          recommendedAction: 'Delay departures for 2-3 hours',
          alternativeRoutes: ['A1 Highway (inland route)', 'Lagos-Ibadan via Ogun'],
          visibilityIssues: true,
          floodRisk: 'moderate'
        }
      },
      {
        id: 2,
        city: 'Nairobi',
        country: 'Kenya',
        coordinates: { lat: -1.2921, lng: 36.8219 },
        current: {
          condition: 'partly_cloudy',
          temperature: 22,
          humidity: 65,
          windSpeed: 8,
          visibility: 15,
          precipitation: 0
        },
        forecast: [
          { time: 'Now', condition: 'partly_cloudy', temp: 22, rain: 0.0 },
          { time: '1h', condition: 'cloudy', temp: 21, rain: 0.0 },
          { time: '2h', condition: 'light_rain', temp: 20, rain: 2.1 },
          { time: '3h', condition: 'rain', temp: 19, rain: 4.8 }
        ],
        routeImpact: {
          severity: 'low',
          affectedRoutes: 2,
          recommendedAction: 'Monitor conditions, proceed with caution after 2h',
          alternativeRoutes: ['Southern Bypass', 'Thika Superhighway'],
          visibilityIssues: false,
          floodRisk: 'low'
        }
      },
      {
        id: 3,
        city: 'Cairo',
        country: 'Egypt',
        coordinates: { lat: 30.0444, lng: 31.2357 },
        current: {
          condition: 'clear',
          temperature: 35,
          humidity: 35,
          windSpeed: 22,
          visibility: 20,
          precipitation: 0
        },
        forecast: [
          { time: 'Now', condition: 'clear', temp: 35, rain: 0.0 },
          { time: '1h', condition: 'clear', temp: 37, rain: 0.0 },
          { time: '2h', condition: 'partly_cloudy', temp: 38, rain: 0.0 },
          { time: '3h', condition: 'windy', temp: 36, rain: 0.0 }
        ],
        routeImpact: {
          severity: 'medium',
          affectedRoutes: 3,
          recommendedAction: 'High winds expected, secure cargo',
          alternativeRoutes: ['Ring Road East', 'Desert Highway'],
          visibilityIssues: false,
          floodRisk: 'none'
        }
      },
      {
        id: 4,
        city: 'Cape Town',
        country: 'South Africa',
        coordinates: { lat: -33.9249, lng: 18.4241 },
        current: {
          condition: 'windy',
          temperature: 18,
          humidity: 70,
          windSpeed: 35,
          visibility: 12,
          precipitation: 0
        },
        forecast: [
          { time: 'Now', condition: 'windy', temp: 18, rain: 0.0 },
          { time: '1h', condition: 'windy', temp: 17, rain: 0.0 },
          { time: '2h', condition: 'rain', temp: 16, rain: 6.5 },
          { time: '3h', condition: 'heavy_rain', temp: 15, rain: 12.8 }
        ],
        routeImpact: {
          severity: 'high',
          affectedRoutes: 5,
          recommendedAction: 'Strong winds now, heavy rain incoming',
          alternativeRoutes: ['N7 Inland Route', 'Mountain passes (avoid)'],
          visibilityIssues: true,
          floodRisk: 'high'
        }
      },
      {
        id: 5,
        city: 'Accra',
        country: 'Ghana',
        coordinates: { lat: 5.6037, lng: -0.1870 },
        current: {
          condition: 'light_rain',
          temperature: 26,
          humidity: 78,
          windSpeed: 12,
          visibility: 8,
          precipitation: 3.2
        },
        forecast: [
          { time: 'Now', condition: 'light_rain', temp: 26, rain: 3.2 },
          { time: '1h', condition: 'cloudy', temp: 25, rain: 1.1 },
          { time: '2h', condition: 'partly_cloudy', temp: 26, rain: 0.2 },
          { time: '3h', condition: 'clear', temp: 27, rain: 0.0 }
        ],
        routeImpact: {
          severity: 'low',
          affectedRoutes: 1,
          recommendedAction: 'Conditions improving, safe to proceed',
          alternativeRoutes: ['Tema Motorway', 'Coastal Road'],
          visibilityIssues: false,
          floodRisk: 'low'
        }
      }
    ]);

    // Set weather alerts
    setWeatherAlerts([
      {
        id: 1,
        type: 'heavy_rain',
        severity: 'high',
        region: 'Lagos-Ogun State',
        title: 'Heavy Rainfall Warning',
        description: 'Intense rainfall expected for the next 4 hours. Risk of flash flooding on major highways.',
        duration: '4 hours',
        affectedRoutes: ['Lagos-Ibadan Expressway', 'Third Mainland Bridge', 'Lekki-Epe Expressway']
      },
      {
        id: 2,
        type: 'strong_wind',
        severity: 'medium',
        region: 'Western Cape',
        title: 'Strong Wind Advisory',
        description: 'Sustained winds of 35+ km/h with gusts up to 55 km/h. High-profile vehicles advised caution.',
        duration: '6 hours',
        affectedRoutes: ['N1 Highway', 'N2 Coastal Route', 'Mountain passes']
      },
      {
        id: 3,
        type: 'dust_storm',
        severity: 'medium',
        region: 'Northern Egypt',
        title: 'Dust Storm Alert',
        description: 'Reduced visibility due to dust storm. Visibility may drop below 500 meters.',
        duration: '3 hours',
        affectedRoutes: ['Cairo-Alexandria Highway', 'Suez Canal Road']
      }
    ]);
  }, []);

  // Simulate live weather updates
  useEffect(() => {
    if (!liveWeather) return;

    const interval = setInterval(() => {
      setWeatherData(prev => prev.map(location => ({
        ...location,
        current: {
          ...location.current,
          temperature: location.current.temperature + (Math.random() * 4 - 2),
          windSpeed: Math.max(0, location.current.windSpeed + (Math.random() * 6 - 3)),
          precipitation: Math.max(0, location.current.precipitation + (Math.random() * 2 - 1))
        }
      })));
    }, 20000);

    return () => clearInterval(interval);
  }, [liveWeather]);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'clear':
        return Sun;
      case 'partly_cloudy':
        return Cloud;
      case 'cloudy':
        return Cloud;
      case 'light_rain':
      case 'rain':
      case 'heavy_rain':
        return CloudRain;
      case 'windy':
        return Wind;
      case 'snow':
        return CloudSnow;
      default:
        return Cloud;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'heavy_rain':
        return CloudRain;
      case 'strong_wind':
        return Wind;
      case 'dust_storm':
        return Eye;
      default:
        return AlertTriangle;
    }
  };

  const weatherSummary = {
    totalLocations: weatherData.length,
    activeAlerts: weatherAlerts.length,
    severeWeather: weatherData.filter(w => w.routeImpact.severity === 'high').length,
    avgVisibility: Math.round(weatherData.reduce((sum, w) => sum + w.current.visibility, 0) / weatherData.length)
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Weather-Based Route Intelligence</h2>
          <p className="text-gray-400 mt-1">Real-time weather monitoring and route optimization across Africa</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setLiveWeather(!liveWeather)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              liveWeather 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${liveWeather ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
            <span>Live Weather</span>
          </button>
          <button 
            onClick={() => console.log('Enabling auto-routing based on weather')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            <Route className="h-4 w-4" />
            <span>Auto-Route</span>
          </button>
        </div>
      </div>

      {/* Weather Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <MapPin className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{weatherSummary.totalLocations}</h3>
            <p className="text-gray-400 text-sm">Monitored Locations</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{weatherSummary.activeAlerts}</h3>
            <p className="text-gray-400 text-sm">Active Weather Alerts</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <CloudRain className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{weatherSummary.severeWeather}</h3>
            <p className="text-gray-400 text-sm">Severe Weather Zones</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Eye className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">{weatherSummary.avgVisibility}km</h3>
            <p className="text-gray-400 text-sm">Average Visibility</p>
          </div>
        </motion.div>
      </div>

      {/* Active Weather Alerts */}
      {weatherAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Zap className="mr-2 h-5 w-5 text-yellow-400" />
              Active Weather Alerts
            </h3>
          </div>
          
          <div className="space-y-4">
            {weatherAlerts.map((alert, index) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <AlertIcon className="h-6 w-6 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{alert.title}</h4>
                        <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                        <div className="flex items-center space-x-4 text-xs opacity-70">
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.region}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{alert.duration}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                      alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-opacity-20 border-current">
                    <div className="text-sm">
                      <strong>Affected Routes:</strong> {alert.affectedRoutes.join(', ')}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Weather Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {weatherData.map((location, index) => {
          const WeatherIcon = getWeatherIcon(location.current.condition);
          
          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 hover:border-emerald-500/30 transition-all cursor-pointer"
              onClick={() => setSelectedRegion(selectedRegion?.id === location.id ? null : location)}
            >
              {/* Location Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                    <WeatherIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{location.city}</h3>
                    <p className="text-gray-400">{location.country}</p>
                  </div>
                </div>
                <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm border ${getSeverityColor(location.routeImpact.severity)}`}>
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="capitalize">{location.routeImpact.severity} Impact</span>
                </div>
              </div>

              {/* Current Conditions */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{Math.round(location.current.temperature)}°C</div>
                  <div className="text-gray-400 text-sm">Temperature</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{Math.round(location.current.windSpeed)}</div>
                  <div className="text-gray-400 text-sm">Wind km/h</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{location.current.visibility}</div>
                  <div className="text-gray-400 text-sm">Visibility km</div>
                </div>
              </div>

              {/* Weather Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-3">
                  <Droplets className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white text-sm font-medium">{location.current.humidity}%</div>
                    <div className="text-gray-400 text-xs">Humidity</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Umbrella className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="text-white text-sm font-medium">{location.current.precipitation.toFixed(1)}mm</div>
                    <div className="text-gray-400 text-xs">Precipitation</div>
                  </div>
                </div>
              </div>

              {/* Route Impact Summary */}
              <div className="bg-gray-900/30 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Route Impact</span>
                  <span className="text-emerald-400 text-sm">{location.routeImpact.affectedRoutes} routes affected</span>
                </div>
                <p className="text-gray-300 text-sm">{location.routeImpact.recommendedAction}</p>
              </div>

              {/* 4-Hour Forecast */}
              <div className="mb-4">
                <h4 className="text-white font-medium mb-3">4-Hour Forecast</h4>
                <div className="grid grid-cols-4 gap-2">
                  {location.forecast.map((hour, hourIndex) => {
                    const HourIcon = getWeatherIcon(hour.condition);
                    return (
                      <div key={hourIndex} className="text-center p-2 bg-gray-900/20 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">{hour.time}</div>
                        <HourIcon className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                        <div className="text-xs text-white font-medium">{Math.round(hour.temp)}°</div>
                        {hour.rain > 0 && (
                          <div className="text-xs text-blue-400">{hour.rain.toFixed(1)}mm</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedRegion?.id === location.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-700 pt-4 mt-4"
                >
                  <h4 className="text-white font-medium mb-4">Route Recommendations</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Alternative Routes:</span>
                      <div className="mt-1">
                        {location.routeImpact.alternativeRoutes.map((route, routeIndex) => (
                          <div key={routeIndex} className="text-white text-sm bg-gray-900/20 px-2 py-1 rounded mt-1 inline-block mr-2">
                            {route}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-white">
                          Visibility Issues: {location.routeImpact.visibilityIssues ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplets className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-white">
                          Flood Risk: {location.routeImpact.floodRisk}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => console.log(`Routing around weather in ${location.city}`)}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-all"
                  >
                    <Route className="h-4 w-4" />
                    <span>Route Around</span>
                  </button>
                  <button 
                    onClick={() => console.log(`Setting delay alert for ${location.city}`)}
                    className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-all"
                  >
                    <Clock className="h-4 w-4" />
                    <span>Delay Alert</span>
                  </button>
                </div>
                <div className="text-emerald-400 text-sm">
                  Updated {Math.floor(Math.random() * 10 + 1)} min ago
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Weather API Integration Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-400" />
            Weather API Integration Status
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">OpenWeatherMap API</span>
            </div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">AccuWeather API</span>
            </div>
            <span className="text-green-400 text-sm">Active</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-white">Local Weather Stations</span>
            </div>
            <span className="text-yellow-400 text-sm">Partial</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherRouting;
