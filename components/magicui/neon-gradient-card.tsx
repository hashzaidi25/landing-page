"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface NeonGradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const NeonGradientCard: React.FC<NeonGradientCardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white text-black p-6 rounded-lg shadow-lg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-white opacity-50"></div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default NeonGradientCard;
