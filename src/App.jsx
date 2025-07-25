import React from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Features from './components/Features'
import AboutUs from './components/AboutUs'
import Testimonial from './components/Testimonials'
import Onboarding from './components/Onboarding'
import CTA from './components/CTA'
import Footer from './components/Footer'
const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <AboutUs />
      <Testimonial />
      <Onboarding />
      <CTA />
      <Footer />
 
    </div>
  )
}

export default App
