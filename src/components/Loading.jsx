import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Truck, Route, Package, Globe } from 'lucide-react';
import { 
  AnimatedTruck, 
  BouncingPackage, 
  FloatingMapPin, 
  SparklingStar,
  ParticleSystem 
} from './CartoonAnimations';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ 
        rotate: 360,
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        ease: 'linear',
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <Loader2 className="w-full h-full text-emerald-500" />
    </motion.div>
  );
};

const LoadingDots = ({ className = '' }) => {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-emerald-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
};

const LoadingPulse = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};

const LoadingSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 rounded mb-2 ${
            index === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

const LoadingCard = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

const LoadingPage = ({ message = 'Loading...', showIcon = true }) => {
  const icons = [Truck, Route, Package, Globe];
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background particles */}
      <ParticleSystem count={20} />
      
      <div className="text-center relative z-10">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="mb-6"
        >
          {showIcon && (
            <motion.div 
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center relative"
              animate={{
                boxShadow: [
                  "0 10px 25px rgba(16, 185, 129, 0.3)",
                  "0 15px 35px rgba(16, 185, 129, 0.4)",
                  "0 10px 25px rgba(16, 185, 129, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <RandomIcon className="w-10 h-10 text-white" />
              
              {/* Floating cartoon characters around the main icon */}
              <div className="absolute -top-2 -right-2">
                <AnimatedTruck size="sm" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <BouncingPackage size="sm" />
              </div>
              <div className="absolute top-1/2 -left-4">
                <FloatingMapPin size="sm" />
              </div>
              <div className="absolute top-1/2 -right-4">
                <SparklingStar size="sm" />
              </div>
            </motion.div>
          )}
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-semibold text-gray-900 mb-2"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          {message}
        </motion.h2>
        
        <div className="flex justify-center">
          <LoadingDots />
        </div>
      </div>
    </div>
  );
};

const LoadingOverlay = ({ isLoading, children, message = 'Loading...' }) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600 font-medium">{message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export {
  LoadingSpinner,
  LoadingDots,
  LoadingPulse,
  LoadingSkeleton,
  LoadingCard,
  LoadingPage,
  LoadingOverlay,
};
