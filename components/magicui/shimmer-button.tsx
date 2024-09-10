import React from 'react';
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 animate-shimmer"></span>
      <span className="relative">{children}</span>
    </button>
  );
};

export default ShimmerButton;
