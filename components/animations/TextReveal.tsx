'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  gradient?: boolean;
  scrollTrigger?: boolean;
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.05,
  stagger = 0.03,
  as: Tag = 'span',
  gradient = false,
  scrollTrigger = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = containerRef.current;
    if (!element) return;

    const chars = element.querySelectorAll('.char');

    const animationConfig: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: 'power2.out',
    };

    if (scrollTrigger) {
      animationConfig.scrollTrigger = {
        trigger: element,
        start: 'top 85%',
        once: true,
      };
    }

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
        rotateX: -90,
      },
      animationConfig
    );
  }, { scope: containerRef });

  const words = text.split(' ');

  const gradientClass = gradient
    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'
    : '';

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={`${className} ${gradientClass}`}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="char inline-block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="char inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
