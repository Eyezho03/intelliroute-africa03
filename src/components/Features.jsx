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


const features = [
  {
    title: "AI-Powered Multi-Tier Integration",
    description: "Revolutionary neural network connects producers, wholesalers, retailers & consumers seamlessly. Optimize order flows, inventory distribution, and delivery coordination across all supply chain tiers with intelligent matching algorithms.",
    icon: <Route className="w-8 h-8 text-emerald-400" />,
    stats: [
      { value: "85%", label: "Faster Order Processing" },
      { value: "4-Tier", label: "Complete Integration" }
    ],
    demoLink: "/features/sme-dashboard"
  },
  {
    title: "Real-Time Cross-Border Intelligence",
    description: "Monitor shipments across 24+ African countries with live GPS tracking, customs automation, and predictive border crossing analytics. Military-grade security with real-time ETA optimization.",
    icon: <Map className="w-8 h-8 text-blue-400" />,
    stats: [
      { value: "99.9%", label: "Tracking Accuracy" },
      { value: "24 Countries", label: "Coverage" }
    ],
    demoLink: "/features/driver-app"
  },
  {
    title: "Predictive Supply Chain Analytics",
    description: "AI-powered demand forecasting, inventory optimization, and supplier performance analytics. Predict market trends, optimize stock levels, and automate replenishment across all tiers.",
    icon: <Gauge className="w-8 h-8 text-amber-400" />,
    stats: [
      { value: "78%", label: "Forecast Accuracy" },
      { value: "45%", label: "Inventory Reduction" }
    ],
    demoLink: "/features/analytics"
  },
  {
    title: "Automated B2B Order Orchestration",
    description: "Streamline ordering between producers, wholesalers, and retailers with automated workflows, dynamic pricing, bulk order optimization, and multi-party coordination systems.",
    icon: <Cpu className="w-8 h-8 text-purple-400" />,
    stats: [
      { value: "92%", label: "Order Automation" },
      { value: "5-8 hrs", label: "Processing Time Saved" }
    ],
    demoLink: "/features/b2b-ordering"
  },
  {
    title: "Smart Fleet & Asset Management",
    description: "Comprehensive fleet intelligence with vehicle tracking, driver performance analytics, predictive maintenance, geo-fencing, and real-time security alerts across multiple supply chain tiers.",
    icon: <Bell className="w-8 h-8 text-red-400" />,
    stats: [
      { value: "30 sec", label: "Alert Response" },
      { value: "95%", label: "Asset Security" }
    ],
    demoLink: "/features/fleet-management"
  },
  {
    title: "Carbon-Smart Logistics",
    description: "ESG-compliant sustainability tracking with carbon footprint analytics, eco-routing optimization, emissions reporting, and green supply chain certification across all operational tiers.",
    icon: <Leaf className="w-8 h-8 text-green-400" />,
    stats: [
      { value: "42%", label: "Emissions Reduced" },
      { value: "ESG Ready", label: "Compliance" }
    ],
    demoLink: "/features/sustainability"
  },
  {
    title: "Intelligent Marketplace Hub",
    description: "Dynamic B2B marketplace connecting suppliers, distributors, and retailers. Real-time pricing, automated negotiations, quality scoring, and performance-based supplier recommendations.",
    icon: <Package2 className="w-8 h-8 text-orange-400" />,
    stats: [
      { value: "97%", label: "Delivery Success" },
      { value: "500+", label: "Active Partners" }
    ],
    demoLink: "/features/marketplace"
  },
  {
    title: "Advanced Border Crossing AI",
    description: "Specialized African customs intelligence with automated documentation, pre-clearance systems, duty optimization, and real-time border wait time predictions across major African trade routes.",
    icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
    stats: [
      { value: "6-10 hrs", label: "Border Time Saved" },
      { value: "150+", label: "Border Protocols" }
    ],
    demoLink: "/features/border-crossing"
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden" id="features">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
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
            <span className="block">Transform Your Logistics Operations</span>
            <span className="block mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              With Cutting-Edge Features
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Designed specifically for African logistics challenges, our platform helps companies optimize
            operations across 24 countries with real-time intelligence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                    {feature.icon}
                  </div>
                  
                  <div className="ml-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-5">{feature.description}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {feature.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="text-sm font-bold text-emerald-600">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    
                    <Link href={feature.demoLink} className="flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors">
                      <span>See Demo</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="px-6 pb-5">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Analytics Dashboard</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
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
          className="mt-20 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Revolutionize Your Logistics?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join hundreds of logistics companies using IntelliRoute Africa to optimize their operations across the continent.
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
              Request Enterprise Demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;