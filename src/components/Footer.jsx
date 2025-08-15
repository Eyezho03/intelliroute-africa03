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
  Instagram,
  MessageCircle,
  Calendar,
  User,
  Building,
  Package,
  Smartphone
} from "lucide-react";
import { Link } from 'react-router-dom';

const FooterSection = () => {
  // Updated services to match core features from blueprint
  const services = [
    { name: "SME Dashboard", icon: <BarChart3 className="w-4 h-4 text-emerald-500" />, path: "/features#dashboard" },
    { name: "Driver App", icon: <Smartphone className="w-4 h-4 text-blue-500" />, path: "/features#driver" },
    { name: "Route Optimization", icon: <Route className="w-4 h-4 text-amber-500" />, path: "/features#optimization" },
    { name: "Retailer-Wholesaler Network", icon: <Package className="w-4 h-4 text-purple-500" />, path: "/features#network" },
  ];

  // Focused coverage on initial launch countries
  const countries = [
    "Kenya", "Nigeria", "South Africa", "Ghana",
    "Tanzania", "Uganda", "Rwanda"
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white pt-20 pb-12 border-t border-gray-200">
      {/* Simplified animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/pattern.svg')] bg-repeat"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Info - Updated messaging */}
          <div>
            <div className="flex items-center mb-6">
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                IntelliRoute Africa
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Revolutionizing African logistics with AI-powered route optimization for SMEs, wholesalers, and retailers.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              <a href="#" aria-label="Twitter" className="p-2 bg-gray-100 rounded-full hover:bg-emerald-500 transition-colors">
                <Twitter className="w-5 h-5 text-gray-500 hover:text-white" />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 bg-gray-100 rounded-full hover:bg-emerald-500 transition-colors">
                <Linkedin className="w-5 h-5 text-gray-500 hover:text-white" />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 bg-gray-100 rounded-full hover:bg-emerald-500 transition-colors">
                <Facebook className="w-5 h-5 text-gray-500 hover:text-white" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 bg-gray-100 rounded-full hover:bg-emerald-500 transition-colors">
                <Instagram className="w-5 h-5 text-gray-500 hover:text-white" />
              </a>
            </div>
            
            {/* Newsletter - Connected to CRM */}
            <div>
              <h4 className="text-gray-800 font-medium mb-3">Get Logistics Insights</h4>
              <form action="/api/subscribe" method="POST" className="flex">
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Your email" 
                  className="px-4 py-2 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 w-full"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Services - Aligned with core features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Package className="mr-2 text-emerald-500" />
              Our Platform
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-center">
                  {service.icon}
                  <Link to={service.path} className="text-gray-600 hover:text-emerald-600 ml-3 transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  See pricing plans <span className="ml-1">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links - For important pages */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Route className="mr-2 text-blue-500" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/onboarding" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center">
                  <User className="w-4 h-4 mr-2" /> SME Onboarding
                </Link>
              </li>
              <li>
                <Link to="/driver-signup" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center">
                  <Truck className="w-4 h-4 mr-2" /> Driver Registration
                </Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center">
                  <Calendar className="w-4 h-4 mr-2" /> Request Demo
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" /> Logistics Blog
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center">
                  <Building className="w-4 h-4 mr-2" /> Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - With WhatsApp emphasis */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <MapPin className="mr-2 text-amber-500" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <span className="text-gray-600">
                  Nairobi Hub: ABC Place, Westlands<br />
                  Lagos Office: Victoria Island<br />
                  Johannesburg: Sandton City
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <a href="mailto:info@intelliroute.africa" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  info@intelliroute.africa
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-3" />
                <a href="tel:+254712345678" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  +254 712 345 678
                </a>
              </li>
            </ul>
            
            {/* WhatsApp CTA */}
            <div className="mt-6">
              <a 
                href="https://wa.me/254712345678" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors w-full"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} IntelliRoute Africa. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-emerald-600 transition-colors">Privacy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-emerald-600 transition-colors">Terms</Link>
            <Link to="/security" className="text-gray-500 hover:text-emerald-600 transition-colors">Security</Link>
            <Link to="/sla" className="text-gray-500 hover:text-emerald-600 transition-colors">SLA</Link>
            <Link to="/compliance" className="text-gray-500 hover:text-emerald-600 transition-colors">Compliance</Link>
          </div>
        </div>
      </div>
      
      {/* Floating CTA - Now opens chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => window.openChatWidget()}
          aria-label="Open chat"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-200 hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>
    </footer>
  );
};

export default FooterSection;