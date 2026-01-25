'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface GradientMeshProps {
  className?: string;
  variant?: 'dark' | 'light' | 'hero';
}

export default function GradientMesh({ className = '', variant = 'dark' }: GradientMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const gradients = containerRef.current?.querySelectorAll('.mesh-gradient');
    if (!gradients) return;

    gradients.forEach((gradient, index) => {
      gsap.to(gradient, {
        backgroundPosition: `${100 + index * 50}% ${100 + index * 30}%`,
        duration: 20 + index * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, { scope: containerRef });

  const variants = {
    dark: 'bg-[#0a0a1a]',
    light: 'bg-gray-50',
    hero: 'bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]',
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${variants[variant]} ${className}`}
    >
      {/* Animated mesh gradient layer 1 */}
      <div
        className="mesh-gradient absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(120,119,198,0.3) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(147,51,234,0.25) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Animated mesh gradient layer 2 */}
      <div
        className="mesh-gradient absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 50% 60% at 30% 70%, rgba(236,72,153,0.2) 0%, transparent 50%),
            radial-gradient(ellipse 70% 40% at 70% 20%, rgba(79,70,229,0.25) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
