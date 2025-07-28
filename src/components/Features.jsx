import React from "react";
import { motion } from "framer-motion";
import { 
  Route, 
  Map, 
  Gauge, 
  Cpu, 
  Bell, 
  Leaf, 
  BarChart3,
  Zap,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    title: "AI-Powered Route Optimization",
    description: "Our neural network analyzes traffic, weather, and road conditions to find the most efficient routes, reducing delivery times by up to 65% across African terrains.",
    icon: <Route className="w-8 h-8 text-emerald-400" />,
    stats: [
      { value: "65%", label: "Faster Deliveries" },
      { value: "45%", label: "Fuel Savings" }
    ]
  },
  {
    title: "Real-Time Fleet Intelligence",
    description: "Monitor your entire fleet with live GPS tracking, driver behavior analytics, and predictive ETA calculations on our military-grade dashboard.",
    icon: <Map className="w-8 h-8 text-blue-400" />,
    stats: [
      { value: "99.8%", label: "Tracking Accuracy" },
      { value: "24/7", label: "Visibility" }
    ]
  },
  {
    title: "Predictive Maintenance Engine",
    description: "Our AI predicts vehicle maintenance needs before failures occur, reducing downtime by 70% and extending vehicle lifespan.",
    icon: <Gauge className="w-8 h-8 text-amber-400" />,
    stats: [
      { value: "70%", label: "Less Downtime" },
      { value: "40%", label: "Maintenance Savings" }
    ]
  },
  {
    title: "Border Crossing Optimizer",
    description: "Automate customs documentation and reduce border wait times with our specialized African border crossing intelligence system.",
    icon: <Cpu className="w-8 h-8 text-purple-400" />,
    stats: [
      { value: "5-8 hrs", label: "Border Time Saved" },
      { value: "100+", label: "Border Protocols" }
    ]
  },
  {
    title: "Geo-Fencing & Smart Alerts",
    description: "Create virtual boundaries and receive instant notifications for zone entries/exits, speed violations, and unauthorized stops.",
    icon: <Bell className="w-8 h-8 text-red-400" />,
    stats: [
      { value: "30 sec", label: "Alert Response" },
      { value: "95%", label: "Theft Prevention" }
    ]
  },
  {
    title: "Sustainability Analytics",
    description: "Track and reduce your carbon footprint with emissions reporting and eco-routing options that prioritize environmental impact.",
    icon: <Leaf className="w-8 h-8 text-green-400" />,
    stats: [
      { value: "35%", label: "Emissions Reduced" },
      { value: "ISO 14001", label: "Compliant" }
    ]
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* Animated background elements */}
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
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800 mb-4"
          >
            <Zap className="mr-2 h-4 w-4" />
            Enterprise-Grade Logistics Platform
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            <span className="block">Transform Your Logistics Operations</span>
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              With Cutting-Edge Features
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Designed specifically for African logistics challenges, our platform helps companies optimize
            operations across 24 countries with real-time intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="p-7">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-gray-900 border border-gray-700 rounded-xl group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                    {feature.icon}
                  </div>
                  
                  <div className="ml-5">
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-5">{feature.description}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {feature.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="px-3 py-1.5 bg-gray-900/50 rounded-lg border border-gray-700">
                          <div className="text-sm font-bold text-emerald-400">{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="flex items-center text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="px-7 pb-5">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">Analytics Dashboard</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-900 text-emerald-400 rounded-full border border-emerald-500/20">
                    AI-Powered
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Revolutionize Your Logistics?
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join hundreds of logistics companies using IntelliRoute Africa to optimize their operations across the continent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white font-semibold rounded-lg"
            >
              Request Enterprise Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;