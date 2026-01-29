import React from 'react';
import logo from '../../assets/logo1.png';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    // image preserves size, rounded corners and covers the box
    <img
      src={logo}
      className={`${className} rounded-lg object-cover`}
      alt="Kortio logo"
    />
  );
};