import React from "react";
import { motion } from "framer-motion";
import { 
  Truck, 
  MapPin, 
  BarChart, 
  CheckCircle,
  ChevronRight
} from "lucide-react";

const CTASection = () => {
  const benefits = [
    { icon: <Truck className="w-5 h-5 text-emerald-400" />, text: "Real-time fleet tracking" },
    { icon: <MapPin className="w-5 h-5 text-blue-400" />, text: "Border crossing optimization" },
    { icon: <BarChart className="w-5 h-5 text-amber-400" />, text: "Predictive analytics" },
    { icon: <CheckCircle className="w-5 h-5 text-green-400" />, text: "30-day satisfaction guarantee" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
      {/* Animated route visualization */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="absolute top-1/4 left-0 w-full h-1/2" viewBox="0 0 100 10" preserveAspectRatio="none">
          <motion.path
            d="M0,5 Q20,0 40,5 T80,5 T100,5"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="0.3"
            strokeDasharray="0.1 0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Animated elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(8)].map((_, i) => (
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
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl border border-gray-700 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text Content */}
            <div className="p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800 mb-6"
              >
                <span>Limited Time Offer</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="block">Transform Your African Logistics</span>
                <span className="block mt-3 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Start Your Free Trial Today
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 mb-8"
              >
                Join hundreds of logistics companies using IntelliRoute Africa to optimize operations across 24 African countries.
              </motion.p>
              
              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0">
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
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20 flex items-center justify-center"
                >
                  <span>Start Free Trial</span>
                  <ChevronRight className="ml-2 h-5 w-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 text-white font-semibold rounded-lg flex items-center justify-center"
                >
                  <span>Schedule Demo</span>
                </motion.button>
              </motion.div>
              
              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
              >
                <div>Trusted by 200+ logistics companies</div>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2">4.9/5 Rating</span>
                </div>
              </motion.div>
            </div>
            
            {/* Visual Section */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-l border-gray-800 hidden lg:block relative">
              <div className="absolute inset-0 flex items-center justify-center p-12">
                {/* Floating dashboard elements */}
                <div className="relative w-full h-full max-w-md">
                  {/* Main dashboard card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm text-gray-400">Current Route</div>
                        <div className="text-lg font-bold text-white">Nairobi → Lagos</div>
                      </div>
                      <div className="px-3 py-1 bg-emerald-900/30 rounded-full text-emerald-400 text-sm">
                        Optimized
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-6">
                      <div>
                        <div className="text-sm text-gray-400">Distance</div>
                        <div className="text-white font-medium">2,380 km</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Time Saved</div>
                        <div className="text-white font-medium">12 hours</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Fuel Saved</div>
                        <div className="text-white font-medium">210 L</div>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-xs text-gray-400">Route optimization progress</div>
                  </motion.div>
                  
                  {/* Vehicle status card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-[70%] left-[10%] w-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-5"
                  >
                    <div className="flex items-center mb-3">
                      <div className="h-3 w-3 bg-emerald-400 rounded-full mr-2"></div>
                      <div className="text-sm font-medium text-white">Vehicle KT 123J</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="text-gray-400">Status</div>
                        <div className="text-white">In Transit</div>
                      </div>
                      <div>
                        <div className="text-gray-400">ETA</div>
                        <div className="text-white">45 mins</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Border crossing card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-[20%] right-[5%] w-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-xl p-5"
                  >
                    <div className="flex items-center mb-3">
                      <div className="text-sm font-medium text-white">Border Crossing</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400">Malaba Border</div>
                      <div className="text-white">Documents Ready</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;