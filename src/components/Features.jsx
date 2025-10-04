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
  ArrowRight,
  Package2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  CartoonCard, 
  AnimatedTruck, 
  BouncingPackage, 
  FloatingMapPin, 
  SparklingStar,
  ParticleSystem 
} from './CartoonAnimations';


const features = [
  {
    title: "AI Route Optimization",
    description: "Smart routing across 24 African countries with real-time traffic and border optimization.",
    icon: <Route className="w-8 h-8 text-emerald-400" />,
    stats: [
      { value: "85%", label: "Time Saved" },
      { value: "24", label: "Countries" }
    ],
    demoLink: "/features/routing"
  },
  {
    title: "Supply Chain Integration",
    description: "Connect producers, wholesalers, and retailers in one seamless platform.",
    icon: <Package2 className="w-8 h-8 text-blue-400" />,
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "4-Tier", label: "Integration" }
    ],
    demoLink: "/features/integration"
  },
  {
    title: "Real-Time Tracking",
    description: "Live GPS tracking with predictive analytics and automated alerts.",
    icon: <Map className="w-8 h-8 text-amber-400" />,
    stats: [
      { value: "30 sec", label: "Update Frequency" },
      { value: "95%", label: "Accuracy" }
    ],
    demoLink: "/features/tracking"
  },
  {
    title: "Smart Analytics",
    description: "AI-powered demand forecasting and inventory optimization.",
    icon: <Gauge className="w-8 h-8 text-purple-400" />,
    stats: [
      { value: "78%", label: "Forecast Accuracy" },
      { value: "45%", label: "Cost Reduction" }
    ],
    demoLink: "/features/analytics"
  },
  {
    title: "Fleet Management",
    description: "Vehicle tracking, driver analytics, and predictive maintenance.",
    icon: <Bell className="w-8 h-8 text-red-400" />,
    stats: [
      { value: "25%", label: "Fuel Savings" },
      { value: "65%", label: "On-time Delivery" }
    ],
    demoLink: "/features/fleet"
  },
  {
    title: "Border Intelligence",
    description: "Automated customs processing and border crossing optimization.",
    icon: <BarChart3 className="w-8 h-8 text-green-400" />,
    stats: [
      { value: "8 hrs", label: "Time Saved" },
      { value: "150+", label: "Protocols" }
    ],
    demoLink: "/features/border"
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden" id="features">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 z-0">
        <ParticleSystem count={25} />
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gray-200 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.08, 0.03],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Floating cartoon characters */}
        <div className="absolute top-20 left-10">
          <AnimatedTruck size="sm" />
        </div>
        <div className="absolute top-40 right-20">
          <BouncingPackage size="sm" />
        </div>
        <div className="absolute bottom-40 left-20">
          <FloatingMapPin size="sm" />
        </div>
        <div className="absolute bottom-20 right-10">
          <SparklingStar size="sm" />
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 mb-4"
          >
            <Zap className="mr-2 h-4 w-4" />
            Enterprise-Grade Logistics Platform
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900"
          >
            <span className="block">Powerful Features</span>
            <span className="block mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Built for Africa
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to optimize logistics across 24 African countries.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <CartoonCard
              key={index}
              delay={index * 0.1}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6"
              >
                <div className="flex items-start">
                  <motion.div 
                    className="flex-shrink-0 p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <div className="ml-5">
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(0,0,0,0)",
                          "0 0 10px rgba(16, 185, 129, 0.2)",
                          "0 0 0px rgba(0,0,0,0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-gray-600 mb-5">{feature.description}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {feature.stats.map((stat, statIndex) => (
                        <motion.div 
                          key={statIndex} 
                          className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + statIndex * 0.1 }}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(16, 185, 129, 0.1)"
                          }}
                        >
                          <motion.div 
                            className="text-sm font-bold text-emerald-600"
                            animate={{
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: statIndex * 0.5
                            }}
                          >
                            {stat.value}
                          </motion.div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link href={feature.demoLink} className="flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors">
                        <span>See Demo</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              <div className="px-6 pb-5">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <motion.div 
                  className="flex items-center justify-between mt-5"
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <div className="flex items-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
                    </motion.div>
                    <span className="text-sm text-gray-500">Analytics Dashboard</span>
                  </div>
                  <motion.span 
                    className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100"
                    animate={{
                      scale: [1, 1.05, 1],
                      backgroundColor: [
                        "rgba(16, 185, 129, 0.1)",
                        "rgba(16, 185, 129, 0.2)",
                        "rgba(16, 185, 129, 0.1)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    AI-Powered
                  </motion.span>
                </motion.div>
              </div>
            </CartoonCard>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-8 text-center"
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-4"
            animate={{
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          >
            Ready to Get Started?
          </motion.h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Join logistics companies across Africa using our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="/signup"
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-200"
            >
              Start Free Trial
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="/contact"
              className="px-8 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm"
            >
              Request Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;