'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, { scope: headerRef });

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Skills' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4a847]/10"
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-[129px]">
          {/* Logo/Name */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4a847] to-[#cd7f32] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-amber-900/30 transition-all">
              <span className="text-black font-bold text-xl">JJ</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white group-hover:text-[#d4a847] transition-colors">
                Jesse Johnson
              </span>
              <p className="text-xs text-gray-400">E-commerce & Growth</p>
            </div>
          </Link>

          {/* Desktop nav - centered with pill background */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center gap-1 bg-white/5 rounded-full px-2 py-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-[#d4a847] text-black shadow-md'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-amber-900/30 hover:scale-[1.03] transition-all duration-200"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#d4a847]/10">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3.5 rounded-xl font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-[#d4a847] text-black'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-[#d4a847]/10">
              <Link
                href="/contact"
                className="block w-full px-4 py-3.5 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black text-center rounded-xl font-semibold shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Let's Talk
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
