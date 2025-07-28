import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  BarChart, 
  Truck, 
  Leaf, 
  MapPin, 
  Zap,
  ChevronRight
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

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
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
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800 mb-6">
              <Zap className="mr-2 h-4 w-4" />
              Transforming African Logistics
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="block">Intelligent Routing Solutions</span>
              <span className="block mt-3 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Designed for Africa
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              At <span className="text-emerald-400 font-semibold">Intelliroute Africa</span>, we're pioneering AI-powered logistics optimization to solve Africa's unique supply chain challenges. Our platform combines deep local knowledge with cutting-edge technology to revolutionize how goods move across the continent.
            </p>
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              We're not just optimizing routes - we're building the digital infrastructure for Africa's economic growth, enabling businesses to overcome infrastructure limitations, border complexities, and operational inefficiencies.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center"
                >
                  <div className="flex justify-center text-emerald-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20 flex items-center"
            >
              <span>Our Technology</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
          
          {/* Image and Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-gray-700 shadow-2xl">
              {/* Placeholder for your image */}
              <div className="bg-gray-800 border-2 border-dashed rounded-xl w-full h-[400px] md:h-[500px]" />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>
              
              {/* Floating values cards */}
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="absolute bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4 w-64 shadow-lg"
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
          </motion.div>
        </div>
        
        {/* Core Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Our Mission: Digitizing Africa's Supply Chain Infrastructure
            </h3>
            <p className="text-xl text-gray-400 mb-8">
              We're building the logistics operating system for Africa - a platform that empowers businesses to navigate the continent's complexities while driving economic growth and sustainability. By combining AI with deep local expertise, we're creating solutions that work for Africa's unique challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <div className="px-6 py-3 bg-gray-700/50 rounded-full border border-gray-600">
                <span className="text-emerald-400 font-medium">Real-Time Visibility</span>
              </div>
              <div className="px-6 py-3 bg-gray-700/50 rounded-full border border-gray-600">
                <span className="text-emerald-400 font-medium">Border Optimization</span>
              </div>
              <div className="px-6 py-3 bg-gray-700/50 rounded-full border border-gray-600">
                <span className="text-emerald-400 font-medium">Cost Reduction</span>
              </div>
              <div className="px-6 py-3 bg-gray-700/50 rounded-full border border-gray-600">
                <span className="text-emerald-400 font-medium">Sustainability Focus</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;