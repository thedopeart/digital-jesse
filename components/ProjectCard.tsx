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
}

export default function ProjectCard({
  slug,
  title,
  description,
  metric,
  tags,
}: ProjectCardProps) {
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
      className="group relative block bg-white rounded-xl p-6 overflow-hidden transition-shadow duration-300"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Border */}
      <div className="absolute inset-0 rounded-xl border border-gray-200 group-hover:border-[#d4a847]/40 transition-colors duration-300" />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(212,168,71,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#b8860b] transition-colors duration-300">
            {title}
          </h3>
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#d4a847] flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-0.5">
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>

        <p className="mt-3 text-gray-600 flex-1 leading-relaxed">
          {description}
        </p>

        {metric && (
          <p className="mt-4 text-[#b8860b] font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a847]" />
            {metric}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full group-hover:bg-amber-50 group-hover:text-[#b8860b] transition-colors duration-300"
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
