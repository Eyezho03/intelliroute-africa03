import React from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  ClipboardCheck, 
  Truck, 
  CheckCircle, 
  Map,
  BarChart,
  Zap,
  ChevronRight
} from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Create Account",
    description: "Set up your organization profile and invite team members in minutes.",
    duration: "1-2 minutes",
    features: ["Free 14-day trial", "No credit card required"]
  },
  {
    icon: <ClipboardCheck className="w-8 h-8" />,
    title: "Configure Fleet",
    description: "Add vehicles, drivers, and set operational parameters for your logistics network.",
    duration: "3-5 minutes",
    features: ["Vehicle profiles", "Driver assignments", "Compliance checks"]
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Map Operations",
    description: "Define routes, delivery zones, and operational territories across Africa.",
    duration: "5-10 minutes",
    features: ["Geo-fencing", "Route optimization", "Border protocols"]
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Launch Operations",
    description: "Go live with real-time tracking, AI-powered insights, and automated reporting.",
    duration: "Instant",
    features: ["Live dashboards", "Predictive analytics", "24/7 support"]
  },
];

const OnboardingProcess = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
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
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800 mb-4"
          >
            <Zap className="mr-2 h-4 w-4" />
            Rapid Deployment
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            <span className="block">Operational in Under 20 Minutes</span>
            <span className="block mt-3 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Simple Onboarding Process
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Get your logistics operations running at peak efficiency with our streamlined onboarding designed for African businesses.
          </motion.p>
        </div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute left-16 right-16 top-1/2 h-0.5 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 z-0"></div>
          
          <div className="relative grid grid-cols-4 gap-8 z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Step indicator */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                  <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-emerald-400">
                    {step.icon}
                  </div>
                </div>
                
                {/* Step number */}
                <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-sm mb-6">
                  {index + 1}
                </div>
                
                {/* Step card */}
                <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 w-full hover:border-emerald-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  
                  <div className="flex items-center text-sm text-emerald-400 mb-4">
                    <ClockIcon />
                    <span className="ml-2">{step.duration}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gradient-to-b from-emerald-500/20 via-emerald-500 to-emerald-500/20 z-0"></div>
            
            <div className="relative space-y-10 pl-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex"
                >
                  {/* Step indicator */}
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 z-10">
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-emerald-400">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Step number */}
                  <div className="absolute left-0 top-0 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Step card */}
                  <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-5 w-full hover:border-emerald-500/50 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    
                    <div className="flex items-center text-sm text-emerald-400 mb-4">
                      <ClockIcon />
                      <span className="ml-2">{step.duration}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {step.features.map((feature, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-8 md:mb-0 md:mr-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Optimize Your Logistics?
            </h3>
            <p className="text-gray-400 max-w-xl">
              Join hundreds of African businesses using IntelliRoute to streamline their supply chain operations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20 flex items-center"
            >
              <span>Get Started Free</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-gray-800 hover:bg-gray-750 border border-gray-700 text-white font-semibold rounded-lg flex items-center"
            >
              <Map className="mr-2 h-5 w-5 text-teal-400" />
              <span>Live Demo</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Clock icon component
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

export default OnboardingProcess;