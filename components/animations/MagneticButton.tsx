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
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: buttonRef });

  const baseStyles = 'inline-flex items-center justify-center px-7 py-3.5 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group';

  const variants = {
    primary: `${baseStyles} bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black shadow-lg hover:shadow-xl hover:shadow-amber-900/20 hover:scale-[1.02]`,
    secondary: `${baseStyles} bg-white/5 backdrop-blur-sm border border-[#d4a847]/30 text-white hover:bg-white/10 hover:border-[#d4a847]/50 hover:scale-[1.02]`,
    ghost: `${baseStyles} bg-transparent border border-gray-300 text-gray-700 hover:border-[#d4a847] hover:text-[#d4a847]`,
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
