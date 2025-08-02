import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hero_img from '../assets/intellirouteafrica2.jpg';
import dashboard_preview from '../assets/intellirouteafrica3.jpg';
import { 
  Truck, MapPin, BarChart, Zap, Globe, ShieldCheck, ArrowRight, 
  CheckCircle, Star, Users, Clock, TrendingUp, Award, Play,
  Sparkles, Target, Lightbulb, ArrowUpRight
} from 'lucide-react';

const HeroSection = () => {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { value: '75%', label: 'Cost Reduction', icon: <TrendingUp className="w-5 h-5" />, trend: '+15% vs competitors' },
    { value: '85%', label: 'Delivery Time Saved', icon: <Clock className="w-5 h-5" />, trend: 'Average 4.2 days faster' },
    { value: '99.8%', label: 'On-time Deliveries', icon: <Target className="w-5 h-5" />, trend: 'Industry leading' },
    { value: '24/7', label: 'AI Route Optimization', icon: <Lightbulb className="w-5 h-5" />, trend: 'Real-time updates' },
  ];

  const features = [
    { 
      icon: <Truck className="w-6 h-6" />, 
      text: 'AI-Powered Fleet Intelligence', 
      desc: 'Real-time tracking with predictive maintenance alerts',
      highlight: true
    },
    { 
      icon: <MapPin className="w-6 h-6" />, 
      text: 'Smart Border Crossing', 
      desc: 'Automated customs clearance and documentation',
      highlight: false
    },
    { 
      icon: <BarChart className="w-6 h-6" />, 
      text: 'Advanced Analytics Dashboard', 
      desc: 'Real-time insights and performance metrics',
      highlight: false
    },
  ];

  const achievements = [
    { icon: <Award className="w-5 h-5" />, text: '2024 Africa Tech Pioneer Award' },
    { icon: <Users className="w-5 h-5" />, text: '50,000+ Active Users' },
    { icon: <Globe className="w-5 h-5" />, text: '35 Countries Covered' },
  ];

  // Auto-cycle through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen text-white overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-300/20 via-transparent to-transparent" />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Enhanced route visualization */}
        <svg className="absolute top-1/3 left-0 w-full h-1/3" viewBox="0 0 100 20" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M0,10 Q25,5 50,10 T100,8"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="0.5"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
          />
          {/* Moving dots along the path */}
          {[...Array(3)].map((_, i) => (
            <motion.circle
              key={i}
              r="0.3"
              fill="#10b981"
              filter="url(#glow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                cx: [0, 100],
                cy: [10, 8]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
            />
          ))}
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