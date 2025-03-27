
import React, { useRef, useEffect, useState } from 'react';
import Magnetic from './Magnetic';

interface AnimatedButtonProps {
  children: React.ReactNode;
  backgroundColor?: string;
  className?: string;
  onClick?: () => void;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  backgroundColor = "#000000",
  className = "",
  onClick
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const circle = circleRef.current;
    
    if (!button || !circle) return;
    
    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      circle.style.top = "-25%";
      circle.style.width = "150%";
      circle.style.transition = "top 0.4s cubic-bezier(0.33, 1, 0.68, 1), width 0.4s cubic-bezier(0.33, 1, 0.68, 1)";
      
      // Trigger the sliding animation
      setIsSliding(true);
      
      // Reset sliding state after animation completes
      timeoutRef.current = setTimeout(() => {
        setIsSliding(false);
      }, 500);
    };
    
    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        circle.style.top = "-150%";
        circle.style.width = "125%";
        circle.style.transition = "top 0.25s cubic-bezier(0.33, 1, 0.68, 1), width 0.25s cubic-bezier(0.33, 1, 0.68, 1)";
      }, 300);
    };
    
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Magnetic>
      <div 
        ref={buttonRef}
        className={`relative overflow-hidden rounded-full px-8 py-4 cursor-pointer border border-gray-200 ${className}`}
        onClick={onClick}
      >
        <div 
          className={`relative z-10 transition-transform duration-500 ${isSliding ? 'translate-x-1/2' : 'translate-x-0'}`}
        >
          {children}
        </div>
        <div 
          ref={circleRef}
          className="absolute w-full h-150 rounded-full top-full left-0"
          style={{ backgroundColor }}
        ></div>
      </div>
    </Magnetic>
  );
};

export default AnimatedButton;
