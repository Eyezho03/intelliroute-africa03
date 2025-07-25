import React from 'react';
import { motion } from 'framer-motion';
import hero_img from '../assets/features4.png';
import oracle from '../assets/oracle-logo.svg';

const HeroSection = () => {
  return (
    <div className="relative bg-[#0e0e1a] min-h-screen text-white overflow-hidden">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-10 md:mt-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Revolutionize Your African Logistics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mt-4 text-gray-300 max-w-2xl"
        >
          IntelliRoute Africa provides AI-powered solutions to optimize delivery routes, reduce costs, and enhance supply chain efficiency for SMEs across the continent.
        </motion.p>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button className="bg-gradient-to-r from-orange-400 to-pink-500 hover:brightness-110 text-white px-8 py-3 rounded-full text-sm shadow-lg transition duration-300">
            Start Free Trial
          </button>
          <button className="bg-white text-blue-900 hover:bg-blue-100 px-8 py-3 rounded-full text-sm shadow-lg transition duration-300">
            How it works
          </button>
        </div>

        <motion.img
          src={hero_img}
          alt="Hero"
          className="w-[90%] md:w-[900px] h-auto rounded-3xl mt-10 shadow-2xl object-cover"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      </section>

      {/* Partners Section */}
      <div className="mt-20 text-center">
        <h2 className="text-xl md:text-2xl font-semibold">Over 2,000 Organizations use our Platform</h2>
        <div className="flex justify-center items-center gap-8 mt-8 opacity-80">
          <img src={oracle} alt="Oracle" className="h-10 grayscale hover:grayscale-0 transition duration-300" />
          {/* Add more logos later as needed */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
