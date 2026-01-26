'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  metric?: string;
  tags?: string[];
  variant?: 'light' | 'dark';
}

export default function ProjectCard({
  slug,
  title,
  description,
  metric,
  tags,
  variant = 'light',
}: ProjectCardProps) {
  const isDark = variant === 'dark';
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x - 100,
        y: y - 100,
        duration: 0.3,
        ease: 'power2.out',
      });

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.3 });
      gsap.to(card, { scale: 1.01, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.3 });
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <Link
      ref={cardRef}
      href={`/portfolio/${slug}`}
      className={`group relative block rounded-xl p-5 overflow-hidden transition-all duration-300 ${
        isDark ? 'bg-[#1e1e1e]' : 'bg-white'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Border */}
      <div className={`absolute inset-0 rounded-xl border-2 transition-colors duration-300 ${
        isDark
          ? 'border-[#d4a847]/30 group-hover:border-[#d4a847]/70'
          : 'border-gray-200 group-hover:border-[#d4a847]/40'
      }`} />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,71,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <h3 className={`text-lg font-bold transition-colors duration-300 ${
          isDark
            ? 'text-white group-hover:text-[#d4a847]'
            : 'text-gray-900 group-hover:text-[#b8860b]'
        }`}>
          {title}
        </h3>

        <p className={`mt-2 text-sm leading-relaxed flex-1 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {description}
        </p>

        {metric && (
          <p className="mt-4 text-[#d4a847] text-sm font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a847]" />
            {metric}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${
                  isDark
                    ? 'bg-[#d4a847]/10 text-[#d4a847] border border-[#d4a847]/30'
                    : 'bg-gray-100 text-gray-600 group-hover:text-[#b8860b]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
