'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number | string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function CountUp({
  end,
  prefix = '',
  suffix = '',
  duration = 2,
  delay = 0,
  className = '',
}: CountUpProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState('0');

  useGSAP(() => {
    const element = containerRef.current;
    if (!element) return;

    // Handle string values like "6 Years" or "340%"
    const numericMatch = String(end).match(/[\d.]+/);
    const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: numericValue,
      duration: duration,
      delay: delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        // Preserve original format
        const formatted = String(end).replace(
          /[\d.]+/,
          numericValue >= 1000
            ? Math.round(obj.value).toLocaleString()
            : numericValue % 1 !== 0
            ? obj.value.toFixed(1)
            : Math.round(obj.value).toString()
        );
        setDisplayValue(formatted);
      },
      onComplete: () => {
        setDisplayValue(String(end));
      },
    });
  }, { scope: containerRef });

  return (
    <span ref={containerRef} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
