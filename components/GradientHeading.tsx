import React from 'react';

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const GradientHeading: React.FC<GradientHeadingProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h2' 
}) => {
  return (
    <Component className={`font-bold text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 ${className}`}>
      {children}
    </Component>
  );
};

export default GradientHeading;