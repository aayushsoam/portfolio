
import React from 'react';
import { cn } from '../../lib/utils';

interface RoundedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ 
  children, 
  onClick,
  className
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center text-white cursor-pointer", 
        className
      )}
    >
      {children}
    </div>
  );
};

export default RoundedButton;
