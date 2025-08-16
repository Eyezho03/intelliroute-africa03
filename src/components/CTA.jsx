import React from "react";
import { motion } from "framer-motion";
import { 
  Truck, 
  MapPin, 
  BarChart, 
  CheckCircle,
  ChevronRight,
  Zap,
  Leaf,
  Globe,
  Award
} from "lucide-react";

const CTASection = () => {
  const benefits = [
    { icon: <Truck className="w-5 h-5 text-emerald-400" />, text: "Real-time fleet tracking across Africa" },
    { icon: <MapPin className="w-5 h-5 text-blue-400" />, text: "Border crossing optimization" },
    { icon: <BarChart className="w-5 h-5 text-amber-400" />, text: "AI-powered predictive analytics" },
    { icon: <Leaf className="w-5 h-5 text-green-400" />, text: "Carbon footprint reduction" },
    { icon: <Zap className="w-5 h-5 text-purple-400" />, text: "30-minute onboarding" },
    { icon: <CheckCircle className="w-5 h-5 text-teal-400" />, text: "30-day satisfaction guarantee" },
  ];

  const stats = [
    { value: "85%", label: "Route efficiency" },
    { value: "45%", label: "Cost reduction" },
    { value: "200+", label: "African partners" },
    { value: "24", label: "Countries covered" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
      {/* Animated African route visualization */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="absolute top-1/4 left-0 w-full h-1/2" viewBox="0 0 100 10" preserveAspectRatio="none">
          <motion.path
            d="M0,5 Q15,2 30,7 Q45,3 60,5 Q75,8 90,3 L100,5"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="0.3"
            strokeDasharray="0.1 0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Animated African map elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gray-800 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 rounded-3xl border border-gray-700 shadow-2xl overflow-hidden backdrop-blur-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text Content */}
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-600 to-teal-500 text-white mb-6"
              >
                <span>Exclusive Launch Offer</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="block text-white">Revolutionize Your African</span>
                <span className="block mt-3 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Logistics Operations
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-8"
              >
                Join Africa's leading logistics companies using IntelliRoute to optimize supply chains across 24 countries.
              </motion.p>
              
              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
              
              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {benefit.icon}
                    </div>
                    <span className="ml-3 text-gray-300">{benefit.text}</span>
                  </div>
                ))}
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20 flex items-center justify-center transition-all"
                >
                  <span>Start Free 14-Day Trial</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 text-white font-semibold rounded-lg flex items-center justify-center transition-all"
                >
                  <span>Schedule African Demo</span>
                </motion.button>
              </motion.div>
              
              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
              >
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>4.9/5 from African logistics teams</span>
                </div>
                
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-amber-400 mr-2" />
                  <span>2024 Africa Logistics Innovation Award</span>
                </div>
              </motion.div>
            </div>
            
            {/* Visual Section - African Dashboard */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-l border-gray-800 hidden lg:block relative min-h-[600px]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                {/* Floating dashboard elements */}
                <div className="relative w-full h-full max-w-md">
                  {/* Main dashboard card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Optimized Route</div>
                        <div className="text-lg font-bold text-white">Nairobi → Lagos</div>
                        <div className="text-xs text-gray-400 flex items-center mt-1">
                          <Globe className="w-3 h-3 mr-1" />
                          <span>Crossing 5 African countries</span>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-emerald-900/30 rounded-full text-emerald-400 text-sm">
                        AI Optimized
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-6">
                      <div>
                        <div className="text-sm text-gray-400">Distance</div>
                        <div className="text-white font-medium">3,850 km</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Time Saved</div>
                        <div className="text-white font-medium">18 hours</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Fuel Saved</div>
                        <div className="text-white font-medium">310 L</div>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      />
                    </div>
                    <div className="text-xs text-gray-400 flex justify-between">
                      <span>Route optimization</span>
                      <span className="text-emerald-400">85% efficiency</span>
                    </div>
                  </motion.div>
                  
                  {/* Vehicle status card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-[70%] left-[5%] w-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-5"
                  >
                    <div className="flex items-center mb-3">
                      <div className="h-3 w-3 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                      <div className="text-sm font-medium text-white">Kenyatta Transport • KCD 789J</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-gray-400">Status</div>
                        <div className="text-white">Crossing Rwanda</div>
                      </div>
                      <div>
                        <div className="text-gray-400">ETA</div>
                        <div className="text-white">2 days 4h</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Cargo</div>
                        <div className="text-white">Agricultural</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Temp</div>
                        <div className="text-white">28°C</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Carbon reduction card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-[15%] right-[5%] w-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-5"
                  >
                    <div className="flex items-center mb-3">
                      <Leaf className="h-5 w-5 text-green-400 mr-2" />
                      <div className="text-sm font-medium text-white">Carbon Reduction</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400">This shipment</div>
                      <div className="text-white text-xl font-bold text-green-400">-420 kg CO₂</div>
                      <div className="mt-1 text-xs text-gray-400">Equivalent to 7 trees planted</div>
                    </div>
                  </motion.div>
                  
                  {/* Border crossing card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-[55%] right-[10%] w-60 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-5"
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-sm font-medium text-white">Border Documentation</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400">Malaba Border</div>
                      <div className="text-white flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        <span>Ready for clearance</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Estimated wait: 45 min
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Floating African map outline */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  width="300"
                  height="300"
                  viewBox="0 0 800 800"
                  className="text-gray-700"
                  fill="currentColor"
                >
                  <path d="M413.5,167.2c-1.2-1.7-3.2-2.5-5.2-2.3c-0.6-0.1-1.3-0.1-1.9,0c-2.2-0.1-4.3,0.9-5.7,2.7c-1.4,1.8-2,4.1-1.6,6.3
                    c0.4,2.2,1.8,4.1,3.8,5.1c2,1,4.3,1.1,6.4,0.3c2.1-0.8,3.8-2.5,4.6-4.6C415.1,171.4,414.8,169,413.5,167.2z"/>
                  <path d="M420.9,180.9c-0.4-0.1-0.9-0.1-1.3-0.1c-2.8,0.3-5.4,1.9-7,4.3c-1.6,2.4-2.1,5.4-1.3,8.1c0.8,2.7,2.7,4.9,5.3,6
                    c2.6,1.1,5.5,1,8-0.2c2.5-1.2,4.4-3.5,5.1-6.2c0.7-2.7,0.2-5.6-1.4-7.9C426.9,182.8,424,180.7,420.9,180.9z"/>
                  {/* Simplified Africa outline */}
                  <path d="M250,150 Q300,100 400,120 Q500,100 550,180 Q600,250 580,320 Q550,400 500,450 Q450,500 380,520 Q300,550 250,500 Q200,450 180,380 Q160,300 200,220 Q220,180 250,150 Z" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;