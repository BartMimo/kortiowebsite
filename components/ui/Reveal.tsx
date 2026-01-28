import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // in milliseconds
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  direction = "up",
  className = ""
}) => {
  const [ref, isVisible] = useIntersectionObserver();

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up": return "translateY(2rem)";
        case "down": return "translateY(-2rem)";
        case "left": return "translateX(2rem)";
        case "right": return "translateX(-2rem)";
        default: return "none";
      }
    }
    return "translate(0, 0)";
  };

  return (
    <div ref={ref} style={{ width, overflow: 'visible' }} className={className}>
      <div
        style={{ 
          transitionDelay: `${delay}ms`,
          transitionProperty: 'all',
          transitionDuration: '700ms',
          transitionTimingFunction: 'ease-out',
          opacity: isVisible ? 1 : 0,
          transform: getTransform()
        }}
      >
        {children}
      </div>
    </div>
  );
};