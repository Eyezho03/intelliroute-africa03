import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/intellirouteafrica5.jpg';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: 'Eyezho' });
    navigate('/dashboard');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Onboarding', href: '#onboarding' },
    { name: 'Contact us', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-20 py-4 backdrop-blur-md bg-black/60 border-b border-white/10">
      
      {/* Logo */}
      <div className="flex items-center font-bold text-white gap-2">
        Intelliroute-Africa
        <img src={logo} alt="Intelliroute Africa Logo" className="h-10 w-auto object-contain" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-10 text-sm text-white">
        {menuItems.map((item, idx) => (
          <a key={idx} href={item.href} className="relative group">
            <span className="font-semibold">{item.name}</span>
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300 ease-in-out origin-left"></span>
          </a>
        ))}
        {user && (
          <Link to="/dashboard" className="font-semibold hover:text-orange-400">
            Dashboard
          </Link>
        )}
      </nav>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {!user ? (
          <button
            onClick={handleLogin}
            className="py-2.5 px-8 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="py-2.5 px-8 bg-red-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div ref={menuRef} className="absolute top-16 right-4 bg-[#0e0e1a] w-64 rounded-xl shadow-2xl p-6 flex flex-col gap-6 text-white animate-slideDown">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-lg font-medium hover:text-orange-400 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          {user && (
            <Link
              to="/dashboard"
              className="text-lg font-medium hover:text-orange-400"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {!user ? (
            <button
              onClick={() => {
                handleLogin();
                setIsOpen(false);
              }}
              className="mt-4 py-2.5 px-6 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="mt-4 py-2.5 px-6 bg-red-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
