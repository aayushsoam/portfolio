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
  return <Magnetic>
      <div ref={buttonRef} onClick={onClick} className="px-[48px] rounded-full bg-zinc-200">
        {/* Background circle - now behind the text */}
        <div ref={circleRef} className="absolute w-full h-150 rounded-full top-full left-0 z-0" style={{
        backgroundColor
      }}></div>
        
        {/* Text content - now above the background */}
        <div className="px-[55px] rounded-full bg-white/[0.29]">
          {children}
        </div>
      </div>
    </Magnetic>;
};
export default AnimatedButton;