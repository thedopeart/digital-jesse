'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  magnetic?: boolean;
}

export default function MagneticButton({
  children,
  href,
  className = '',
  variant = 'primary',
  magnetic = true,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!magnetic) return;

    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: buttonRef });

  const baseStyles = 'inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden group';

  const variants = {
    primary: `${baseStyles} bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105`,
    secondary: `${baseStyles} bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-105`,
    ghost: `${baseStyles} bg-transparent border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white`,
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </Link>
  );
}
