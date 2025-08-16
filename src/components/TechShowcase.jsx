import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Satellite, 
  Shield, 
  Zap, 
  Globe, 
  Network,
  ArrowRight,
  CheckCircle,
  Smartphone,
  Cloud,
  Lock,
  TrendingUp,
  Target,
  Cpu,
  DatabaseZap,
  GitBranch,
  Sparkles
} from 'lucide-react';

const TechShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  const technologies = [
    {
      id: 'ai-engine',
      name: 'AI Intelligence Engine',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-600',
      description: 'Advanced machine learning algorithms power every aspect of our platform',
      features: [
        'Neural network route optimization',
        'Predictive demand forecasting', 
        'Intelligent supplier matching',
        'Real-time decision making',
        'Automated anomaly detection'
      ],
      metrics: [
        { value: '99.7%', label: 'Prediction Accuracy' },
        { value: '<50ms', label: 'Response Time' },
        { value: '24/7', label: 'Learning Cycle' }
      ]
    },
    {
      id: 'blockchain',
      name: 'Blockchain Security',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-600',
      description: 'Immutable transaction ledger ensuring trust across all supply chain participants',
      features: [
        'Smart contract automation',
        'Transparent transaction history',
        'Multi-signature verification',
        'Decentralized consensus',
        'Fraud prevention protocols'
      ],
      metrics: [
        { value: '100%', label: 'Transaction Security' },
        { value: '0', label: 'Disputed Transactions' },
        { value: '256-bit', label: 'Encryption' }
      ]
    },
    {
      id: 'iot-network',
      name: 'IoT Sensor Network',
      icon: <Satellite className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600',
      description: 'Real-time monitoring through connected devices across the supply chain',
      features: [
        'Temperature & humidity sensors',
        'GPS location tracking',
        'Cargo condition monitoring',
        'Predictive maintenance alerts',
        'Environmental impact tracking'
      ],
      metrics: [
        { value: '10M+', label: 'Connected Devices' },
        { value: '1 sec', label: 'Update Frequency' },
        { value: '99.9%', label: 'Uptime' }
      ]
    },
    {
      id: 'cloud-infra',
      name: 'Cloud Infrastructure',
      icon: <Cloud className="w-8 h-8" />,
      color: 'from-orange-500 to-red-600',
      description: 'Scalable, resilient cloud architecture designed for African connectivity',
      features: [
        'Multi-region deployment',
        'Auto-scaling capabilities',
        'Disaster recovery systems',
        'Edge computing nodes',
        'Bandwidth optimization'
      ],
      metrics: [
        { value: '99.99%', label: 'Availability' },
        { value: '12 Regions', label: 'African Coverage' },
        { value: '<100ms', label: 'Latency' }
      ]
    }
  ];

  const innovations = [
    {
      title: 'Quantum-Ready Encryption',
      description: 'Future-proof security protocols preparing for quantum computing era',
      icon: <Lock className="w-6 h-6 text-purple-400" />,
      status: 'In Development'
    },
    {
      title: 'Digital Twin Supply Chains',
      description: 'Virtual replicas of physical supply chains for advanced simulation',
      icon: <GitBranch className="w-6 h-6 text-blue-400" />,
      status: 'Beta Testing'
    },
    {
      title: 'Autonomous Vehicle Integration',
      description: 'Ready for self-driving logistics vehicles and drone deliveries',
      icon: <Target className="w-6 h-6 text-green-400" />,
      status: 'Research Phase'
    },
    {
      title: 'Carbon Credit Marketplace',
      description: 'Automated carbon offset trading integrated into logistics operations',
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      status: 'Coming Soon'
    }
  ];

  // Auto-cycle through tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % technologies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [technologies.length]);

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-900/30 text-purple-400 border border-purple-800 mb-6">
            <Sparkles className="mr-2 h-4 w-4" />
            Next-Generation Technology Stack
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="block">Powered by Revolutionary</span>
            <span className="block mt-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              African Tech Innovation
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built from the ground up with cutting-edge technologies specifically designed for 
            Africa's unique challenges and opportunities.
          </p>
        </motion.div>

        {/* Technology Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Technology Navigation */}
          <div className="space-y-4">
            {technologies.map((tech, index) => (
              <motion.button
                key={tech.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gray-800 border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${tech.color} text-white mr-4`}>
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{tech.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{tech.description}</p>
                
                {activeTab === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {tech.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-lg font-bold text-purple-400">{metric.value}</div>
                          <div className="text-xs text-gray-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Technology Details */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${technologies[activeTab].color} text-white mb-6`}>
                  {technologies[activeTab].icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {technologies[activeTab].name}
                </h3>
                
                <p className="text-gray-400 mb-6">
                  {technologies[activeTab].description}
                </p>

                <div className="space-y-3 mb-8">
                  {technologies[activeTab].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg"
                >
                  <span>Explore Technology</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Innovation Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Innovation Pipeline</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Upcoming breakthroughs that will reshape African logistics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovations.map((innovation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {innovation.icon}
                  <span className={`ml-auto text-xs px-2 py-1 rounded-full ${ 
                    innovation.status === 'Beta Testing' ? 'bg-blue-900/50 text-blue-400' :
                    innovation.status === 'In Development' ? 'bg-purple-900/50 text-purple-400' :
                    innovation.status === 'Coming Soon' ? 'bg-emerald-900/50 text-emerald-400' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    {innovation.status}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-white mb-2">
                  {innovation.title}
                </h4>
                
                <p className="text-gray-400 text-sm">
                  {innovation.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechShowcase;
