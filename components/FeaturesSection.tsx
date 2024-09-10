import React from 'react';
import SectionBackground from './SectionBackground';

export default function FeaturesSection() {
  // ... existing imports and code

  return (
    <SectionBackground className="py-16" gradientStart="from-blue-50" gradientEnd="to-blue-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ... existing content */}
      </div>
    </SectionBackground>
  );
}