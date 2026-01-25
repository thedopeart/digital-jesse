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
        backgroundPosition: `${100 + index * 30}% ${100 + index * 20}%`,
        duration: 25 + index * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, { scope: containerRef });

  const variants = {
    dark: 'bg-[#0a0a0a]',
    light: 'bg-gray-50',
    hero: 'bg-[#0a0a0a]',
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${variants[variant]} ${className}`}
    >
      {/* Subtle warm gradient layer */}
      <div
        className="mesh-gradient absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(212,168,71,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 80% 60%, rgba(205,127,50,0.06) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Secondary gradient layer */}
      <div
        className="mesh-gradient absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 40% 50% at 70% 20%, rgba(245,158,11,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 30% 80%, rgba(212,168,71,0.04) 0%, transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
}
