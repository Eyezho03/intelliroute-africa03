import React from "react";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Truck, 
  Route, 
  BarChart3,
  Globe,
  Twitter,
  Linkedin,
  Facebook,
  Instagram
} from "lucide-react";

const FooterSection = () => {
  const services = [
    { name: "Route Optimization", icon: <Route className="w-4 h-4 text-emerald-400" /> },
    { name: "Fleet Management", icon: <Truck className="w-4 h-4 text-blue-400" /> },
    { name: "Supply Chain Analytics", icon: <BarChart3 className="w-4 h-4 text-amber-400" /> },
    { name: "Border Crossing Solutions", icon: <Globe className="w-4 h-4 text-purple-400" /> },
  ];

  const countries = [
    "Kenya", "Nigeria", "South Africa", "Ghana",
    "Tanzania", "Uganda", "Rwanda", "Ethiopia",
    "Senegal", "Ivory Coast", "Angola", "Botswana"
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 pt-20 pb-12 border-t border-gray-800">
      {/* Animated elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-gray-800 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              opacity: 0.05
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Intelliroute Africa
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              AI-powered logistics optimization platform transforming supply chains across Africa with intelligent routing and real-time visibility.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-500 transition-colors">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
              </a>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-gray-300 font-medium mb-3">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white w-full"
                />
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Truck className="mr-2 text-emerald-400" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-center">
                  {service.icon}
                  <a href="#" className="text-gray-400 hover:text-white ml-3 transition-colors">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Globe className="mr-2 text-blue-400" />
              African Coverage
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {countries.map((country, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  <span className="text-gray-400">{country}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <MapPin className="mr-2 text-amber-400" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <span className="text-gray-400">Nairobi, Kenya | Lagos, Nigeria | Johannesburg, South Africa</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <a href="mailto:info@intellirouteafrica.com" className="text-gray-400 hover:text-white transition-colors">
                  info@intellirouteafrica.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-3" />
                <span className="text-gray-400">+254 712 345 678 | +234 812 345 6789</span>
              </li>
            </ul>
            
            {/* Business Hours */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-gray-300 font-medium mb-2">Business Hours</h4>
              <p className="text-gray-400 text-sm">Mon-Fri: 8:00 AM - 6:00 PM EAT</p>
              <p className="text-gray-400 text-sm">Sat: 9:00 AM - 1:00 PM EAT</p>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>
        
        {/* Bottom Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Intelliroute Africa. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Security</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">GDPR Compliance</a>
          </div>
        </div>
      </div>
      
      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="#contact" 
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;