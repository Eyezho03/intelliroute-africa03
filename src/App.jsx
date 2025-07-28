import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import FleetManagerDashboard from './pages/FleetManagerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminPanel from './pages/AdminPanel';


// Components for Home Page Layout
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Onboarding from './components/Onboarding';
import CTA from './components/CTA';
import Footer from './components/Footer';
// import Pricing from './components/Pricing'; // You can uncomment later if needed

const HomeLayout = () => (
  <>
    <Navbar />
    <section id="home">
      <HeroSection />
    </section>
    <section id="features">
      <Features />
    </section>
    {/* <section id="pricing">
      <Pricing />
    </section> */}
    <section id="about">
      <AboutUs />
    </section>
    <section id="testimonials">
      <Testimonials />
    </section>
    <section id="onboarding">
      <Onboarding />
    </section>
    <section id="contact">
      <CTA />
    </section>
    <Footer />
  </>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/fleet-manager" element={<FleetManagerDashboard />} />
      <Route path="/dashboard/driver" element={<DriverDashboard />} />
      <Route path="/dashboard/admin" element={<AdminPanel />} />
      >
    </Routes>
  );
};

export default App;
