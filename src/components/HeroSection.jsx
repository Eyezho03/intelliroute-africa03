import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dashboard_preview from '../assets/intellirouteafrica3.jpg';
import { 
  Truck, MapPin, BarChart, Zap, Globe, ShieldCheck, ArrowRight, 
  CheckCircle, Star, Users, Clock, TrendingUp, Award, Play,
  Sparkles, Target, Lightbulb, ArrowUpRight, Factory, Building2,
  ShoppingCart, UserCheck, Network, Layers, ArrowRightLeft,
  Package, Route, Smartphone, BatteryCharging, Gauge, Leaf
} from 'lucide-react';

const HeroSection = () => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // Updated stats with African logistics context
  const stats = [
    { 
      value: '75%', 
      label: 'Cost Reduction', 
      icon: <TrendingUp className="w-5 h-5" />, 
      trend: 'KSh 15,000 avg savings per route' 
    },
    { 
      value: '85%', 
      label: 'Delivery Time Saved', 
      icon: <Clock className="w-5 h-5" />, 
      trend: '4.2 days faster cross-border' 
    },
    { 
      value: '99.8%', 
      label: 'On-time Deliveries', 
      icon: <Target className="w-5 h-5" />, 
      trend: 'Best in East Africa' 
    },
    { 
      value: '24/7', 
      label: 'AI Optimization', 
      icon: <Lightbulb className="w-5 h-5" />, 
      trend: 'Real-time traffic updates' 
    },
  ];

  // Enhanced features with African logistics focus
  const features = [
    { 
      icon: <Route className="w-6 h-6" />, 
      text: 'AI Route Optimization', 
      desc: 'Smart routing for African road conditions',
      highlight: true
    },
    { 
      icon: <Package className="w-6 h-6" />, 
      text: 'Multi-Tier Supply Chain', 
      desc: 'Connect producers to retailers seamlessly',
      highlight: true
    },
    { 
      icon: <Smartphone className="w-6 h-6" />, 
      text: 'Driver Mobile App', 
      desc: 'Real-time tracking & updates',
      highlight: false
    },
    { 
      icon: <BarChart className="w-6 h-6" />, 
      text: 'Supply Chain Analytics', 
      desc: 'Demand forecasting & insights',
      highlight: false
    },
  ];

  // Auto-cycle through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen text-white overflow-hidden">
      {/* Enhanced African-themed background */}
      <div className="absolute inset-0 z-0">
        {/* African map silhouette overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('/africa-silhouette.svg')] bg-center bg-no-repeat bg-contain"></div>
        
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-300/20 via-transparent to-transparent" />
        
        {/* Animated route visualization */}
        <svg className="absolute top-1/3 left-0 w-full h-1/3" viewBox="0 0 100 20" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,10 Q25,5 50,10 T100,8"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between pt-24 md:pt-32 pb-16">
          <div className="lg:w-1/2 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800 mb-4"
            >
              <Zap className="mr-2 h-4 w-4" />
              AI-Powered African Logistics
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              <span className="block">Optimize Your African</span>
              <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Supply Chain
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-6 text-lg text-gray-300 max-w-2xl leading-relaxed"
            >
              IntelliRoute Africa transforms logistics across the continent with intelligent routing, real-time tracking, and seamless coordination between <span className="text-emerald-400 font-semibold">producers, wholesalers, retailers, and transporters</span>. Reduce costs by up to 40% with our AI-powered platform.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 grid gap-4"
            >
              {features.map((feature, index) => (
                <div key={index} className={`flex items-start p-3 rounded-lg ${feature.highlight ? 'bg-gray-800/50 border border-gray-700' : ''}`}>
                  <div className={`flex-shrink-0 p-1.5 rounded-lg ${feature.highlight ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400'}`}>
                    {feature.icon}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-gray-100 font-medium">{feature.text}</h4>
                    <p className="text-gray-400 text-sm mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-300 flex items-center"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center"
              >
                <Play className="mr-2 h-5 w-5 text-teal-400" />
                Watch Demo
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 bg-gray-900/50 border border-gray-800 rounded-xl p-6 max-w-md"
            >
              <div className="flex items-center mb-4">
                <Gauge className="w-5 h-5 text-emerald-400 mr-2" />
                <h3 className="text-lg font-semibold">Performance Metrics</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className={`p-3 rounded-lg ${index === currentStatIndex ? 'bg-gray-800 border border-gray-700' : ''}`}>
                    <div className="flex items-center">
                      <div className="p-1 bg-emerald-500/10 rounded-full mr-2">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-emerald-400">{stat.value}</div>
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </div>
                    </div>
                    {index === currentStatIndex && (
                      <div className="text-xs text-gray-400 mt-2">{stat.trend}</div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16 lg:mt-0 lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950">
              <img 
                src={dashboard_preview} 
                alt="IntelliRoute Africa Dashboard" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              
              {/* Floating elements with African context */}
              <motion.div
                className="absolute top-1/4 right-8 bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg w-48"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-xs text-emerald-400 font-medium">Route Optimized</div>
                <div className="text-white font-bold mt-1">Nairobi → Kampala</div>
                <div className="text-xs text-gray-400 mt-2">Saved 8 hours</div>
              </motion.div>
              
              <motion.div
                className="absolute bottom-1/4 left-8 bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg w-56"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-emerald-400 rounded-full mr-2"></div>
                  <div className="text-xs text-gray-300">Vehicle ETA</div>
                </div>
                <div className="text-white font-bold mt-1">KCD 123A • 2.5 hrs</div>
                <div className="text-xs text-gray-400 mt-2">Malaba Border</div>
              </motion.div>
            </div>
            
            {/* Trust badges */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-4">
              <div className="flex items-center px-3 py-1.5 bg-gray-900 rounded-full border border-gray-800 shadow-lg text-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-400 mr-2" />
                <span className="font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center px-3 py-1.5 bg-gray-900 rounded-full border border-gray-800 shadow-lg text-sm">
                <Leaf className="h-4 w-4 text-green-400 mr-2" />
                <span className="font-medium">Carbon Neutral</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Multi-Tier Supply Chain Flow Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-20 md:mt-32 py-16"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="text-emerald-400">End-to-End</span> African Logistics
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Connect every stage of your supply chain with our platform designed for Africa's unique challenges
            </p>
          </div>

          {/* Supply Chain Flow - African context */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
            {/* Producer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center flex-1 max-w-sm"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <Factory className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-900">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">African Producers</h3>
              <p className="text-gray-400 text-sm mb-4">Farmers & manufacturers</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  Bulk order management
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  Quality assurance
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  Cross-border documentation
                </div>
              </div>
            </motion.div>

            {/* Arrow 1 */}
            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-8 h-8 text-emerald-400" />
            </div>

            {/* Wholesaler */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-900">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Distributors</h3>
              <p className="text-gray-400 text-sm mb-4">Regional wholesalers</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Smart inventory routing
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Border clearance
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Last-mile coordination
                </div>
              </div>
            </motion.div>

            {/* Arrow 2 */}
            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-8 h-8 text-blue-400" />
            </div>

            {/* Retailer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-purple-500/20">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-900">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Retailers</h3>
              <p className="text-gray-400 text-sm mb-4">Local shops & markets</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Automated replenishment
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  M-Pesa integration
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Delivery tracking
                </div>
              </div>
            </motion.div>

            {/* Arrow 3 */}
            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-8 h-8 text-purple-400" />
            </div>

            {/* Transporters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
                  <Truck className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-orange-900">4</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Transporters</h3>
              <p className="text-gray-400 text-sm mb-4">Fleet operators & drivers</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                  Route optimization
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                  Border wait times
                </div>
                <div className="flex items-center text-xs text-gray-300">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                  Fuel efficiency
                </div>
              </div>
            </motion.div>
          </div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-800/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                🌍 Built for Africa's Unique Challenges
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                Our platform addresses Africa-specific logistics pain points including border delays, road conditions, and fragmented supply chains with localized intelligence and real-time adaptation.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center text-emerald-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  Border crossing optimization
                </div>
                <div className="flex items-center text-blue-400">
                  <BatteryCharging className="w-4 h-4 mr-2" />
                  Fuel cost reduction
                </div>
                <div className="flex items-center text-purple-400">
                  <Clock className="w-4 h-4 mr-2" />
                  Real-time ETA updates
                </div>
                <div className="flex items-center text-orange-400">
                  <Network className="w-4 h-4 mr-2" />
                  Multi-party coordination
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* African Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 md:mt-32 pb-20"
        >
          <div className="text-center">
            <p className="text-gray-400 mb-2">Trusted by leading African logistics providers</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mt-8 opacity-80">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-emerald-400">Safaricom</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-blue-400">Kuehne+Nagel</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-orange-400">Bolloré Africa</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-yellow-400">Imperial Logistics</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-red-400">DHL Africa</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;