import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kortio Logo"
    >
      <rect width="100" height="100" rx="24" fill="#2563EB" />
      <text 
        x="50" 
        y="72" 
        fontFamily="ui-sans-serif, system-ui, sans-serif" 
        fontWeight="bold" 
        fontSize="65" 
        fill="white" 
        textAnchor="middle"
      >
        K
      </text>
    </svg>
  );
};