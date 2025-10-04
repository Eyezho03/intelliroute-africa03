import React from "react";
import { motion } from "framer-motion";
import { 
  Truck, 
  MapPin, 
  BarChart, 
  Globe, 
  Quote,
  ChevronRight
} from "lucide-react";

const testimonials = [
  {
    name: "Nego Adams",
    role: "Operations Manager, SwiftHaul Kenya",
    feedback:
      "Revolutionary fleet management. Saved 35% in costs and improved on-time deliveries by 65%.",
    stats: [
      { value: "35%", label: "Cost Reduction" },
      { value: "65%", label: "On-time Delivery" }
    ]
  },
  {
    name: "Carolyne Benson",
    role: "Logistics Lead, FastMove Uganda",
    feedback:
      "Powerful dashboard reduced delivery times by 40%. Border optimization saves us 8 hours per shipment.",
    stats: [
      { value: "40%", label: "Faster Deliveries" },
      { value: "8hrs", label: "Border Time Saved" }
    ]
  },
  {
    name: "Den Orina",
    role: "CEO, Financia-Ke",
    feedback:
      "Complete visibility across 5 countries. Fuel consumption decreased by 25% with optimized routes.",
    stats: [
      { value: "25%", label: "Fuel Savings" },
      { value: "5", label: "Countries" }
    ]
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gray-200 rounded-full"
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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 mb-6"
          >
            <Truck className="mr-2 h-4 w-4" />
            Trusted by African Logistics Leaders
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            <span className="block">Success Stories</span>
            <span className="block mt-3 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Real Results from Customers
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            See how African logistics companies are achieving better efficiency and cost savings.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Quote className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {testimonial.feedback}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {testimonial.stats.map((stat, idx) => (
                    <div key={idx} className="px-3 py-2 bg-emerald-50 rounded-lg">
                      <div className="text-lg font-bold text-emerald-700">{stat.value}</div>
                      <div className="text-xs text-emerald-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  </div>
                  <div className="flex items-center text-sm text-emerald-600 font-medium">
                    <span>View Case Study</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="p-8 text-center border-b md:border-b-0 md:border-r border-emerald-500/30">
              <div className="text-4xl font-bold text-white">200+</div>
              <div className="text-emerald-100 mt-2">Logistics Companies</div>
            </div>
            <div className="p-8 text-center border-b md:border-b-0 md:border-r border-emerald-500/30">
              <div className="text-4xl font-bold text-white">24</div>
              <div className="text-emerald-100 mt-2">African Countries</div>
            </div>
            <div className="p-8 text-center border-b md:border-b-0 md:border-r border-emerald-500/30">
              <div className="text-4xl font-bold text-white">65%</div>
              <div className="text-emerald-100 mt-2">Avg. Delivery Time Saved</div>
            </div>
            <div className="p-8 text-center">
              <div className="text-4xl font-bold text-white">45%</div>
              <div className="text-emerald-100 mt-2">Avg. Cost Reduction</div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-lg shadow-lg flex items-center mx-auto"
          >
            <span>More Success Stories</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;