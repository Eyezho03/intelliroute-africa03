import React from 'react';
import { motion } from 'framer-motion';
import hero_img from '../assets/features4.png';
import dashboard_preview from '../assets/features1.jpg'; // Add this asset
import { Truck, MapPin, BarChart, Zap, Globe, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  const stats = [
    { value: '50%', label: 'Cost Reduction' },
    { value: '65%', label: 'Delivery Time Saved' },
    { value: '99%', label: 'On-time Deliveries' },
  ];

  const features = [
    { icon: <Truck className="w-5 h-5" />, text: 'Real-time Fleet Tracking' },
    { icon: <MapPin className="w-5 h-5" />, text: 'Border Crossing Optimization' },
    { icon: <BarChart className="w-5 h-5" />, text: 'Predictive Analytics' },
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gray-800 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Route visualization */}
        <svg className="absolute top-1/4 left-0 w-full h-1/2" viewBox="0 0 100 10" preserveAspectRatio="none">
          <motion.path
            d="M0,5 Q20,0 40,5 T80,5 T100,5"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="0.3"
            strokeDasharray="0.1 0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
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
              Now powered by AI route optimization
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
            >
              <span className="block">Transform African Logistics</span>
              <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                With Intelligent Routing
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-6 text-lg text-gray-300 max-w-2xl"
            >
              IntelliRoute Africa leverages AI to optimize delivery networks, reduce transit times by up to 65%, and cut operational costs for businesses across 24 African countries.
            </motion.p>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 grid gap-3"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                    {feature.icon}
                  </div>
                  <span className="ml-3 text-gray-200">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20 transition-all duration-300"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <span className="flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-teal-400" />
                  Live Demo
                </span>
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-md"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
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
                alt="Dashboard Preview" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute top-1/4 right-8 bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg w-48"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-xs text-emerald-400 font-medium">Route Optimized</div>
                <div className="text-white font-bold mt-1">Nairobi → Lagos</div>
                <div className="text-xs text-gray-400 mt-2">Saved 12 hours</div>
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
                <div className="text-white font-bold mt-1">KT 123J • 45 mins</div>
                <div className="text-xs text-gray-400 mt-2">On schedule</div>
              </motion.div>
            </div>
            
            {/* Security badge */}
            <div className="absolute -bottom-4 -right-4 flex items-center px-4 py-2 bg-gray-900 rounded-full border border-gray-800 shadow-lg">
              <ShieldCheck className="h-5 w-5 text-emerald-400 mr-2" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
          </motion.div>
        </section>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 md:mt-32 pb-20"
        >
          <div className="text-center">
            <p className="text-gray-400 mb-2">Trusted by logistics leaders across Africa</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mt-8 opacity-80">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-emerald-400">DHL</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-blue-400">Maersk</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-orange-400">Bolloré</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-yellow-400">Imperial</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                <div className="text-xl font-bold text-red-400">Safaricom</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;