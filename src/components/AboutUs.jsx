import React from "react";
import aboutImg from "../assets/AboutUs.jpg"; // Replace with your image

const AboutUs = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionizing African Logistics with Smart Technology
          </h2>
          <p className="text-lg text-white/80 mb-6 leading-relaxed">
            At <span className="text-orange-500 font-bold">Intelliroute-Africa</span>, 
            we’re on a mission to transform how goods move across the continent. 
            By leveraging real-time data, predictive analytics, and intelligent routing systems, 
            we empower logistics companies to achieve unmatched efficiency and cost savings.
          </p>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Our platform isn't just a tool — it’s a movement towards smarter, greener, 
            and more reliable supply chain solutions tailored for Africa’s dynamic logistics landscape.
          </p>
          <button className="py-3 px-8 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300">
            Learn More
          </button>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src={aboutImg}
            alt="About Intelliroute Africa"
            className="rounded-3xl shadow-lg object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
