import React from 'react';

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gradientStart?: string;
  gradientEnd?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ 
  children, 
  className = '',
  gradientStart = 'from-white',
  gradientEnd = 'to-blue-50'
}) => {
  return (
    <section className={`bg-gradient-to-b ${gradientStart} ${gradientEnd} ${className}`}>
      {children}
    </section>
  );
};

export default SectionBackground;