import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AccessibilityFeedback from './components/AccessibilityFeedback';
import AIChatbot from './components/AIChatbot';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const FleetManagerDashboard = React.lazy(() => import('./pages/FleetManagerDashboard'));
const DriverDashboard = React.lazy(() => import('./pages/DriverDashboard'));
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'));

// Home page components (loaded immediately)
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import Onboarding from './components/Onboarding';
import CTA from './components/CTA';
import Footer from './components/Footer';


const HomeLayout = () => (
  <>
    <Navbar />
    <section id="home">
      <HeroSection />
    </section>
    <section id="features">
      <Features />
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
    <>
      <AccessibilityFeedback />
      <AIChatbot />
      <Routes>
      {/* Home Page Route */}
      <Route path="/" element={<HomeLayout />} />

      {/* Auth Routes */}
      <Route path="/login" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      } />
      <Route path="/register" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Register />
        </Suspense>
      } />

      {/* Protected Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/dashboard/fleet-manager" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <FleetManagerDashboard />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/dashboard/driver" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <DriverDashboard />
            </Suspense>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/dashboard/admin" 
        element={
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <AdminPanel />
            </Suspense>
          </PrivateRoute>
        } 
      />
    </Routes>
    </>
  );
};

export default App;
