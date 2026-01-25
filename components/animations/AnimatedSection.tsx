'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 60,
  stagger = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = containerRef.current;
    if (!element) return;

    const childElements = element.children;

    gsap.fromTo(
      childElements.length > 1 ? childElements : element,
      {
        opacity: 0,
        y: y,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        stagger: childElements.length > 1 ? stagger : 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: once,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
