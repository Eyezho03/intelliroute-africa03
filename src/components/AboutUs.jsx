import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  BarChart, 
  Truck, 
  Leaf, 
  MapPin, 
  Zap,
  ChevronRight,
  Route,
  Package,
  Users,
  Shield
} from "lucide-react";

const AboutUs = () => {
  const stats = [
    { value: "24", label: "African Countries", icon: <Globe className="w-5 h-5" /> },
    { value: "65%", label: "Delivery Time Reduced", icon: <BarChart className="w-5 h-5" /> },
    { value: "15K+", label: "Daily Routes Optimized", icon: <Truck className="w-5 h-5" /> },
    { value: "35%", label: "Carbon Emissions Reduced", icon: <Leaf className="w-5 h-5" /> },
  ];

  const values = [
    {
      icon: <MapPin className="w-8 h-8 text-emerald-400" />,
      title: "African Expertise",
      description: "Designed specifically for Africa's unique logistics challenges including border crossings and infrastructure."
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-400" />,
      title: "Cutting-Edge AI",
      description: "Proprietary algorithms that continuously learn and adapt to Africa's dynamic supply chain environments."
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-400" />,
      title: "Sustainable Logistics",
      description: "Committed to reducing environmental impact through optimized routing and emissions tracking."
    }
  ];

  const features = [
    {
      icon: <Route className="w-6 h-6 text-emerald-400" />,
      title: "Intelligent Routing",
      description: "AI-powered route optimization considering traffic, weather, and road conditions"
    },
    {
      icon: <Package className="w-6 h-6 text-amber-400" />,
      title: "Multi-tier Supply Chain",
      description: "Connect manufacturers, wholesalers, retailers in one ecosystem"
    },
    {
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      title: "Role-based Dashboards",
      description: "Custom interfaces for every supply chain participant"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "End-to-End Security",
      description: "Blockchain-verified delivery confirmation and payment"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Zap className="mr-2 h-4 w-4" />
              Transforming African Logistics
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">AI-Powered Logistics</span>
              <span className="block mt-3 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Built for Africa
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              We're building the digital infrastructure for Africa's supply chains. Our AI-powered platform solves border delays, road conditions, and operational inefficiencies with intelligent routing and real-time coordination.
            </motion.p>
            
            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, staggerChildren: 0.1 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="mt-1 mr-3">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex justify-center text-emerald-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20 flex items-center group"
              >
                <span>Our Technology</span>
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>
          
          {/* Image and Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-gray-700 shadow-2xl">
              {/* Animated map visualization */}
              <div className="bg-gray-800 w-full h-[400px] md:h-[500px] relative overflow-hidden">
                {/* Simulated map routes */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover"></div>
                
                {/* Animated routes */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-0.5 bg-emerald-400 rounded-full"
                    style={{
                      top: `${15 + i * 15}%`,
                      left: "10%",
                      width: "80%",
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.8, 1],
                      scaleX: [0, 1, 1, 1],
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      repeatType: "reverse"
                    }}
                  >
                    <motion.div
                      className="absolute right-0 -mt-1 w-3 h-3 bg-emerald-400 rounded-full"
                      animate={{ 
                        x: ["-100%", "0%"],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                ))}
                
                {/* City markers */}
                {["20%", "40%", "60%", "80%"].map((left, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-10 w-4 h-4 rounded-full bg-emerald-500 shadow-lg"
                    style={{ left }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(16, 185, 129, 0.4)",
                        "0 0 0 10px rgba(16, 185, 129, 0)",
                        "0 0 0 0 rgba(16, 185, 129, 0)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>
              
              {/* Floating values cards */}
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="absolute hidden md:block bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 w-64 shadow-lg"
                  style={{
                    left: index === 0 ? '5%' : index === 1 ? '60%' : '35%',
                    bottom: index === 0 ? '15%' : index === 1 ? '25%' : '55%'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-start mb-3">
                    {value.icon}
                    <h3 className="text-lg font-bold text-white ml-3">{value.title}</h3>
                  </div>
                  <p className="text-sm text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile value cards */}
            <div className="md:hidden grid grid-cols-1 gap-4 mt-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-start mb-3">
                    {value.icon}
                    <h3 className="text-lg font-bold text-white ml-3">{value.title}</h3>
                  </div>
                  <p className="text-sm text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Core Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 md:mt-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 overflow-hidden"
        >
          <div className="max-w-3xl mx-auto text-center relative">
            <motion.h3 
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our Mission: Digitizing Africa's Supply Chain
            </motion.h3>
            
            <motion.p 
              className="text-lg text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Building the logistics operating system for Africa - empowering businesses to navigate the continent's complexities with AI-powered solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              {["Real-Time Visibility", "Border Optimization", "Cost Reduction", "Sustainability"].map((item, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-gray-700/50 rounded-full border border-gray-600 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <span className="text-emerald-400 font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;