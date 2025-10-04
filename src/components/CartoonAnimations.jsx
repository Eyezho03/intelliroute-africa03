import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  MapPin, 
  Zap, 
  Globe, 
  Star, 
  Heart,
  Sparkles,
  Rocket,
  Crown,
  Shield,
  Target
} from 'lucide-react';

// Animated Cartoon Truck Character
export const AnimatedTruck = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        x: [0, 5, 0, -5, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Truck className="w-full h-full text-emerald-500" />
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Bouncing Package Character
export const BouncingPackage = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Package className="w-full h-full text-blue-500" />
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Floating Map Pin
export const FloatingMapPin = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        y: [0, -8, 0],
        rotate: [0, 3, 0, -3, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MapPin className="w-full h-full text-red-500" />
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Sparkling Star Animation
export const SparklingStar = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Star className="w-full h-full text-yellow-400 fill-current" />
    </motion.div>
  );
};

// Bouncing Heart
export const BouncingHeart = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Heart className="w-full h-full text-red-500 fill-current" />
    </motion.div>
  );
};

// Rocket Ship Animation
export const RocketShip = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Rocket className="w-full h-full text-purple-500" />
        {/* Rocket trail */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gradient-to-t from-orange-400 to-transparent rounded-full"
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Crown Animation
export const AnimatedCrown = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        y: [0, -5, 0],
        rotate: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="relative"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Crown className="w-full h-full text-yellow-500" />
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Shield Animation
export const AnimatedShield = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Shield className="w-full h-full text-green-500" />
    </motion.div>
  );
};

// Target Animation
export const AnimatedTarget = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Target className="w-full h-full text-red-500" />
    </motion.div>
  );
};

// Particle System Component
export const ParticleSystem = ({ count = 20, className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Floating Elements Background
export const FloatingElements = ({ className = '' }) => {
  const elements = [
    { icon: <Truck className="w-6 h-6 text-emerald-400" />, delay: 0 },
    { icon: <Package className="w-5 h-5 text-blue-400" />, delay: 0.5 },
    { icon: <MapPin className="w-4 h-4 text-red-400" />, delay: 1 },
    { icon: <Globe className="w-5 h-5 text-purple-400" />, delay: 1.5 },
    { icon: <Zap className="w-4 h-4 text-yellow-400" />, delay: 2 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute opacity-20"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

// Cartoon-style Button with Animation
export const CartoonButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 cursor-pointer select-none";
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25',
    secondary: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={!disabled ? { 
        scale: 1.05, 
        y: -2,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      animate={{
        boxShadow: [
          "0 4px 15px rgba(0,0,0,0.1)",
          "0 6px 20px rgba(0,0,0,0.15)",
          "0 4px 15px rgba(0,0,0,0.1)"
        ]
      }}
      transition={{
        boxShadow: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <motion.span
        animate={{
          textShadow: [
            "0 0 0px rgba(255,255,255,0)",
            "0 0 10px rgba(255,255,255,0.3)",
            "0 0 0px rgba(255,255,255,0)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

// Cartoon-style Card with Bounce Animation
export const CartoonCard = ({ 
  children, 
  className = '',
  hover = true,
  delay = 0 
}) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut"
      }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      } : {}}
    >
      {children}
    </motion.div>
  );
};

export default {
  AnimatedTruck,
  BouncingPackage,
  FloatingMapPin,
  SparklingStar,
  BouncingHeart,
  RocketShip,
  AnimatedCrown,
  AnimatedShield,
  AnimatedTarget,
  ParticleSystem,
  FloatingElements,
  CartoonButton,
  CartoonCard
};
