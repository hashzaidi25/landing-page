"use client";
import React, { useRef, useEffect } from "react";
import { useMousePosition } from "@/lib/mouse";

interface SparklesProps {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore: React.FC<SparklesProps> = (props) => {
  const {
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 1000,
    className,
    particleColor = "#FFF",
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];

    const createParticle = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * (maxSize - minSize) + minSize;
      const speedX = Math.random() * 0.5 - 0.25;
      const speedY = Math.random() * 0.5 - 0.25;
      particles.push({ x, y, size, speedX, speedY });
    };

    for (let i = 0; i < particleDensity; i++) {
      createParticle();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.x += dx * 0.01;
          particle.y += dy * 0.01;
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [minSize, maxSize, particleDensity, particleColor, mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        background,
        width: "100%",
        height: "100%",
      }}
      className={className}
    ></canvas>
  );
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}