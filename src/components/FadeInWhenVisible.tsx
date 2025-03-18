
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  delay = 0,
  className = '',
  direction = 'up'
}) => {
  const getDirectionValue = () => {
    switch (direction) {
      case 'up':
        return { y: 30, x: 0 };
      case 'down':
        return { y: -30, x: 0 };
      case 'left':
        return { x: 30, y: 0 };
      case 'right':
        return { x: -30, y: 0 };
      case 'none':
        return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0,
        ...getDirectionValue() 
      }}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1],
          delay
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
