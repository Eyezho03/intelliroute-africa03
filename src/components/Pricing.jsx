import React from 'react';
import { CheckCircle } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    features: ['5 Route Optimizations', 'Basic Analytics', 'Email Support'],
  },
  {
    name: 'Pro',
    price: '$29/month',
    popular: true,
    features: ['Unlimited Routes', 'Advanced Analytics', 'Priority Support'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Dedicated Account Manager', 'API Access', 'Custom Integrations'],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
        <p className="mb-12 text-gray-400">Choose a plan that suits your business needs.</p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-8 transition-transform transform hover:scale-105 ${
                plan.popular ? 'bg-gradient-to-r from-green-600 to-emerald-500 border-green-500 shadow-2xl' : 'bg-gray-800 border-gray-700'
              }`}
            >
              {plan.popular && (
                <span className="inline-block mb-4 text-sm font-semibold uppercase bg-white text-green-600 px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-extrabold mb-6">{plan.price}</p>
              <ul className="space-y-4 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition">
                {plan.price === 'Free' ? 'Get Started' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
