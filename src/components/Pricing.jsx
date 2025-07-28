import React from 'react';
import { motion } from 'framer-motion';
import { Route } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  BarChart, 
  Globe, 
  Zap, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small delivery businesses',
      price: 'Free',
      popular: false,
      features: [
        '5 route optimizations per month',
        'Basic fleet tracking (3 vehicles)',
        'Email support',
        'Standard analytics',
        '100km coverage radius'
      ],
      savings: null
    },
    {
      name: 'Professional',
      description: 'For growing logistics operations',
      price: '$89/month',
      popular: true,
      features: [
        'Unlimited route optimizations',
        'Advanced fleet tracking (20 vehicles)',
        '24/7 priority support',
        'Predictive analytics',
        'Multi-country coverage',
        'Border crossing assistance',
        'Fuel consumption reports'
      ],
      savings: 'Save up to $1,200 annually'
    },
    {
      name: 'Enterprise',
      description: 'For large-scale logistics providers',
      price: 'Custom',
      popular: false,
      features: [
        'Unlimited vehicles & routes',
        'Dedicated account manager',
        'Custom API integration',
        'Advanced reporting suite',
        'AI-powered predictive maintenance',
        'Carbon emissions tracking',
        'Custom SLAs',
        'On-premise deployment'
      ],
      savings: 'Average 65% cost reduction'
    }
  ];

  const features = [
    { name: 'Route Optimization', icon: <Route className="w-5 h-5 text-emerald-400" /> },
    { name: 'Real-time Tracking', icon: <MapPin className="w-5 h-5 text-blue-400" /> },
    { name: 'Fleet Analytics', icon: <BarChart className="w-5 h-5 text-amber-400" /> },
    { name: 'Multi-country Coverage', icon: <Globe className="w-5 h-5 text-purple-400" /> },
    { name: 'Predictive Maintenance', icon: <Zap className="w-5 h-5 text-green-400" /> },
  ];

  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
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
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-800 mb-6"
          >
            <Zap className="mr-2 h-4 w-4" />
            Transparent Pricing
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-center mb-6"
          >
            <span className="block">Optimized Logistics Solutions</span>
            <span className="block mt-3 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              At Competitive Prices
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Choose the perfect plan for your logistics operations and start saving time and money immediately.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-2xl border overflow-hidden ${
                plan.popular 
                  ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' 
                  : 'border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-6 py-1.5 rounded-full text-sm">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-gray-800 to-gray-900' 
                  : 'bg-gray-800/50 backdrop-blur-sm'
              }`}>
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold ${
                    plan.popular ? 'text-white' : 'text-gray-300'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className="text-gray-400">{plan.description}</p>
                </div>
                
                <div className="mb-8">
                  <div className={`text-4xl font-bold ${
                    plan.popular 
                      ? 'text-white' 
                      : plan.price === 'Free' 
                        ? 'text-emerald-400' 
                        : 'text-white'
                  }`}>
                    {plan.price}
                  </div>
                  {plan.savings && (
                    <div className="mt-2 text-sm text-emerald-400">
                      {plan.savings}
                    </div>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 font-semibold rounded-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                      : plan.price === 'Free'
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white'
                  }`}
                >
                  {plan.price === 'Free' ? 'Get Started Free' : plan.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
                </motion.button>
              </div>
              
              {plan.popular && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  ROI: 3.5x average
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Feature Comparison
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See how our plans stack up against each other for your logistics needs.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-6 text-left text-gray-400 font-medium">Key Features</th>
                  <th className="pb-6 text-center">Starter</th>
                  <th className="pb-6 text-center">Professional</th>
                  <th className="pb-6 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="py-4 flex items-center">
                      <span className="mr-3">{feature.icon}</span>
                      <span className="text-gray-300">{feature.name}</span>
                    </td>
                    <td className="py-4 text-center">
                      {idx < 3 ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                    </td>
                    <td className="py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="py-4 flex items-center">
                    <Truck className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-300">Vehicles Included</span>
                  </td>
                  <td className="py-4 text-center text-gray-300">3</td>
                  <td className="py-4 text-center text-gray-300">20</td>
                  <td className="py-4 text-center text-gray-300">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 flex items-center">
                    <Globe className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-300">Countries Covered</span>
                  </td>
                  <td className="py-4 text-center text-gray-300">1</td>
                  <td className="py-4 text-center text-gray-300">All African</td>
                  <td className="py-4 text-center text-gray-300">Global</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-8 md:p-10 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-6 md:mb-0 md:mr-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Need Custom Enterprise Solutions?
            </h3>
            <p className="text-gray-400 max-w-xl">
              Our team will build a tailored logistics platform for your specific operational needs.
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg shadow-emerald-500/20 flex items-center"
          >
            <span>Contact Enterprise Team</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
        
        {/* Satisfaction Guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center px-5 py-3 bg-gray-800 rounded-lg border border-gray-700">
            <CheckCircle className="w-6 h-6 text-emerald-400 mr-3" />
            <div>
              <div className="font-medium text-white">30-Day Satisfaction Guarantee</div>
              <div className="text-sm text-gray-400">Get a full refund if you're not satisfied</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;