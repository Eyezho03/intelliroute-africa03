import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ManufacturerDashboard from './pages/ManufacturerDashboard';
import WholesalerDashboard from './pages/WholesalerDashboard';
import RetailerDashboard from './pages/RetailerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminPanel from './pages/AdminPanel';
import SupplyChainDashboard from './pages/SupplyChainDashboard';
import RealTimeIntelligenceHub from './pages/RealTimeIntelligenceHub';
import FleetManagerDashboard from './pages/FleetManagerDashboard';
import OperationManagerDashboard from './pages/OperationManagerDashboard';
import AIDashboard from './components/AIDashboard';
import OrderFlow from './components/OrderFlow';
import SupplyChainInventory from './components/SupplyChainInventory';
import OrderManagementDashboard from './components/OrderManagementDashboard';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Onboarding from './components/Onboarding';
import CTA from './components/CTA';
import Footer from './components/Footer'; 
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import ErrorBoundary from './components/ErrorBoundary';
import TechShowcase from './components/TechShowcase';
import AIChatbot from './components/AIChatbot';
import EnhancedAIChat from './components/EnhancedAIChat';
import AdvancedDashboard from './components/AdvancedDashboard';
import PWAInstallBanner from './components/PWAInstallBanner';
import MainApp from './components/MainApp';
import RouteOptimizer from './components/RouteOptimizer';
import LiveTracking from './components/LiveTracking';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import NewDelivery from './components/NewDelivery';
import ScheduleRoute from './components/ScheduleRoute';


const HomeLayout = () => (
  <>
    <Navbar />
    <section id="home">
      <HeroSection />
    </section>
    <section id="features">
      <Features />
    </section>
    <section id="technology">
      <TechShowcase />
    </section>
    { /* <section id="pricing">
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
    <ErrorBoundary>
      {/* Global AI Chatbot - Available on all pages */}
      <AIChatbot />
      
      {/* PWA Install Banner - Smart timing */}
      <PWAInstallBanner />
      
      <Routes>
      {/* Demo Backend Integration Route */}
      <Route path="/demo" element={<MainApp />} />
      
      {/* Home Page Route */}
      <Route path="/" element={<HomeLayout />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Standalone Routes for Navigation */}
      <Route path="/route-optimizer" element={<RouteOptimizer />} />
      <Route path="/tracking" element={<LiveTracking />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
      <Route path="/intelligence" element={<RealTimeIntelligenceHub />} />
      <Route path="/new-delivery" element={<NewDelivery />} />
      <Route path="/schedule-route" element={<ScheduleRoute />} />
      <Route path="/inventory" element={<SupplyChainInventory />} />

      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Nested dashboard routes */}
        <Route index element={<Dashboard />} />
        <Route path="manufacturer" element={<ManufacturerDashboard />} />
        <Route path="wholesaler" element={<WholesalerDashboard />} />
        <Route path="retailer" element={<RetailerDashboard />} />
        <Route path="driver" element={<DriverDashboard />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="fleet-manager" element={<FleetManagerDashboard />} />
        <Route path="operation-manager" element={<OperationManagerDashboard />} />
        <Route path="supply-chain" element={<SupplyChainDashboard />} />
        <Route path="intelligence-hub" element={<RealTimeIntelligenceHub />} />
        <Route path="ai" element={<AIDashboard />} />
        <Route path="advanced-analytics" element={<AdvancedDashboard />} />
        <Route path="inventory" element={<SupplyChainInventory />} />
        <Route path="order-management" element={<OrderManagementDashboard />} />
        <Route path="orders" element={<OrderFlow />} />
      </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
