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
      gsap.set(shape, {
        x: Math.random() * 50 - 25,
        y: Math.random() * 50 - 25,
      });

      gsap.to(shape, {
        y: `+=${20 + index * 8}`,
        x: `+=${15 - index * 4}`,
        rotation: 180,
        duration: 20 + index * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.fromTo(
        shape,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: 'power2.out',
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Large warm gradient - top right */}
      <div
        className="floating-shape absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,71,0.3) 0%, rgba(205,127,50,0.15) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Medium blob - left side */}
      <div
        className="floating-shape absolute top-[40%] left-[-8%] w-[300px] h-[300px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(212,168,71,0.1) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Small accent - bottom */}
      <div
        className="floating-shape absolute bottom-[15%] right-[20%] w-[200px] h-[200px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,71,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
