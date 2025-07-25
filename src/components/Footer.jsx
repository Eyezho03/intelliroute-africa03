import React from "react";
import footerBg from "../assets/intellirouteafrica4.jpg"; // <-- Replace with your actual footer background image

const FooterSection = () => {
  return (
    <footer
      className="relative text-white py-16"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Intelliroute Africa</h2>
          <p className="text-gray-300">
            Revolutionizing logistics in Africa with intelligent fleet management and smart route optimization.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300">Email: info@intellirouteafrica.com</p>
          <p className="text-gray-300">Phone: +254 712 345 678</p>
          <p className="text-gray-300">Location: Nairobi, Kenya</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 text-center text-gray-400 mt-12 text-sm">
        &copy; {new Date().getFullYear()} Intelliroute Africa. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
