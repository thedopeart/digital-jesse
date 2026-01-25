'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface FloatingShapesProps {
  className?: string;
}

export default function FloatingShapes({ className = '' }: FloatingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const shapes = containerRef.current?.querySelectorAll('.floating-shape');
    if (!shapes) return;

    shapes.forEach((shape, index) => {
      // Random starting position
      gsap.set(shape, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      });

      // Continuous floating animation
      gsap.to(shape, {
        y: `+=${30 + index * 10}`,
        x: `+=${20 - index * 5}`,
        rotation: 360,
        duration: 15 + index * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Fade in on load
      gsap.fromTo(
        shape,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          delay: index * 0.2,
          ease: 'elastic.out(1, 0.5)',
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Large gradient blob - top right */}
      <div
        className="floating-shape absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, rgba(79,70,229,0.2) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Medium blob - left side */}
      <div
        className="floating-shape absolute top-[30%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(147,51,234,0.2) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Small accent blob - bottom right */}
      <div
        className="floating-shape absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(79,70,229,0.2) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Tiny accent - top left */}
      <div
        className="floating-shape absolute top-[15%] left-[20%] w-[150px] h-[150px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.5) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Small circle decorations */}
      <div className="floating-shape absolute top-[40%] right-[30%] w-4 h-4 rounded-full bg-purple-500/30" />
      <div className="floating-shape absolute bottom-[40%] left-[25%] w-3 h-3 rounded-full bg-blue-500/40" />
      <div className="floating-shape absolute top-[60%] right-[15%] w-2 h-2 rounded-full bg-pink-500/50" />
    </div>
  );
}
