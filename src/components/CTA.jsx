import React from "react";
import ctaBg from "../assets/intellirouteafrica5.jpg"; // Ensure this path is correct

const CTASection = () => {
  return (
    <section
      className="relative py-24"
      style={{
        backgroundImage: `url(${ctaBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Light Overlay with blue tint */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-40 backdrop-blur-sm"></div>

      {/* CTA Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
          Ready to Transform Your Logistics Operations?
        </h2>
        <p className="text-lg mb-10 text-gray-200 drop-shadow">
          Join Intelliroute Africa and experience seamless fleet management, real-time tracking, and intelligent route optimization.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default CTASection;
