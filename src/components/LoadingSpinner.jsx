// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizes[size]} border-t-2 border-emerald-500 border-solid rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;