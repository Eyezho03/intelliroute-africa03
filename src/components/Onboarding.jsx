import React from "react";
import { motion } from "framer-motion";
import { UserPlus, ClipboardCheck, Truck, CheckCircle } from "lucide-react";
import bgImage from "../assets/intellirouteafrica5.jpg"; // your saved background image

const steps = [
  {
    icon: <UserPlus className="w-10 h-10 text-green-600" />,
    title: "Sign Up",
    description: "Create your Intelliroute Africa account in minutes and get access to your personalized dashboard.",
  },
  {
    icon: <ClipboardCheck className="w-10 h-10 text-green-600" />,
    title: "Add Your Fleet",
    description: "Easily input your vehicles and assign drivers with our simple onboarding wizard.",
  },
  {
    icon: <Truck className="w-10 h-10 text-green-600" />,
    title: "Configure Routes",
    description: "Set up geo-fences, delivery routes, and custom alerts tailored to your logistics workflow.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-green-600" />,
    title: "Start Tracking",
    description: "Monitor your fleet in real-time, optimize operations, and drive efficiency like never before.",
  },
];

const OnboardingProcess = () => {
  return (
    <section
      className="py-24 bg-gray-50 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Getting Started is Simple
        </h2>
        <p className="text-lg mb-16 text-gray-200">
          Follow these easy steps to unlock the full potential of your logistics operations with Intelliroute Africa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-90 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-300 text-gray-800"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h4 className="text-xl font-semibold mb-4">{step.title}</h4>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingProcess;
