'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type ServiceType =
  | 'ecommerce-management'
  | 'seo-content'
  | 'project-management'
  | 'digital-marketing'
  | 'design-creative'
  | 'tool-building';

interface AnimatedServiceIllustrationProps {
  type: ServiceType;
  variant?: 'dark' | 'light';
  className?: string;
}

interface ColorSet {
  primary: string;
  secondary: string;
  stroke: string;
  fill: string;
  muted: string;
}

function getColors(variant: 'dark' | 'light'): ColorSet {
  if (variant === 'dark') {
    return {
      primary: '#d4a847',
      secondary: '#cd7f32',
      stroke: '#d4a847',
      fill: 'rgba(212, 168, 71, 0.15)',
      muted: 'rgba(212, 168, 71, 0.08)',
    };
  }
  return {
    primary: '#b8860b',
    secondary: '#8B6914',
    stroke: '#6b5c3e',
    fill: 'rgba(184, 134, 11, 0.12)',
    muted: 'rgba(184, 134, 11, 0.06)',
  };
}

// ─── Gradient Defs ──────────────────────────────────────────────
function GradientDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5d78e" />
        <stop offset="35%" stopColor="#d4a847" />
        <stop offset="100%" stopColor="#cd7f32" />
      </linearGradient>
      <linearGradient id={`${id}-gold-v`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f5d78e" />
        <stop offset="100%" stopColor="#cd7f32" />
      </linearGradient>
      <linearGradient id={`${id}-gold-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffe6a0" />
        <stop offset="50%" stopColor="#d4a847" />
        <stop offset="100%" stopColor="#a67c2e" />
      </linearGradient>
      <linearGradient id={`${id}-dark`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3a3a3a" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
      <linearGradient id={`${id}-dark-deep`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2e2e2e" />
        <stop offset="100%" stopColor="#141414" />
      </linearGradient>
      <linearGradient id={`${id}-screen`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(212,168,71,0.08)" />
        <stop offset="100%" stopColor="rgba(212,168,71,0.02)" />
      </linearGradient>
      <linearGradient id={`${id}-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
      <linearGradient id={`${id}-subtle`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(212,168,71,0.25)" />
        <stop offset="100%" stopColor="rgba(205,127,50,0.1)" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(212,168,71,0.15)" />
        <stop offset="70%" stopColor="rgba(212,168,71,0.05)" />
        <stop offset="100%" stopColor="rgba(212,168,71,0)" />
      </radialGradient>
      <radialGradient id={`${id}-badge-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(212,168,71,0.12)" />
        <stop offset="100%" stopColor="rgba(212,168,71,0)" />
      </radialGradient>
      {/* Drop shadow filter */}
      <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.3" />
      </filter>
      <filter id={`${id}-shadow-sm`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
      </filter>
      <filter id={`${id}-glow-filter`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

// ─── SVG Illustrations (Bold Gradient-Filled Style) ─────────────

function EcommerceIllustration(c: ColorSet) {
  const id = 'ecom';
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <GradientDefs id={id} />

      {/* Background glow - larger, softer */}
      <circle cx={200} cy={145} r={140} fill={`url(#${id}-glow)`}
        data-anim="scale-in" data-delay="0" style={{ opacity: 0 }} />

      {/* Monitor/screen - with shadow for depth */}
      <g data-anim="fade-up" data-delay="0.05" style={{ opacity: 0 }} filter={`url(#${id}-shadow)`}>
        {/* Monitor body */}
        <rect x={90} y={38} width={220} height={165} rx={18} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        {/* Screen area with gradient */}
        <rect x={103} y={51} width={194} height={135} rx={10} fill={`url(#${id}-screen)`} />
        {/* Shine/reflection overlay on top-left */}
        <rect x={103} y={51} width={194} height={135} rx={10} fill={`url(#${id}-shine)`} />
        {/* Bezel highlight - top edge */}
        <line x1={110} y1={40} x2={290} y2={40} stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeLinecap="round" />
      </g>

      {/* Stand + base - separate group for layering */}
      <g data-anim="fade-up" data-delay="0.08" style={{ opacity: 0 }}>
        {/* Neck */}
        <rect x={180} y={203} width={40} height={18} rx={4} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        {/* Base */}
        <ellipse cx={200} cy={228} rx={52} ry={6} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        {/* Base highlight */}
        <ellipse cx={200} cy={226} rx={35} ry={3} fill="rgba(212,168,71,0.1)" />
      </g>

      {/* Cart icon inside screen - rides the growth curve */}
      <g data-anim="scale-in" data-delay="0.18" style={{ opacity: 0 }} className="ecom-cart">
        {/* Cart bag shape */}
        <path
          d="M 168 88 L 176 88 L 182 125 L 226 125 L 232 88 L 240 88"
          stroke={`url(#${id}-gold-shine)`}
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Cart body fill - subtle gradient */}
        <path
          d="M 182 125 L 226 125 L 232 92 L 176 92 Z"
          fill="rgba(212,168,71,0.12)"
          stroke="none"
        />
        {/* Items in cart - two clean boxes */}
        <rect x={190} y={97} width={15} height={22} rx={4} fill="rgba(212,168,71,0.18)" stroke={c.primary} strokeWidth={1.2} />
        <rect x={209} y={94} width={13} height={25} rx={4} fill="rgba(245,215,142,0.15)" stroke={c.primary} strokeWidth={1.2} />
        {/* Cart wheels with inner dot */}
        <circle cx={190} cy={134} r={5.5} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <circle cx={190} cy={134} r={1.5} fill={c.primary} />
        <circle cx={220} cy={134} r={5.5} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <circle cx={220} cy={134} r={1.5} fill={c.primary} />
      </g>

      {/* Growth curve with glow */}
      <g data-anim="draw" data-delay="0.32" style={{ opacity: 0 }}>
        {/* Glow behind the line */}
        <path
          d="M 135 172 Q 170 155 200 148 T 265 112"
          stroke={c.primary}
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
          opacity={0.15}
        />
        {/* Main line */}
        <path
          d="M 135 172 Q 170 155 200 148 T 265 112"
          stroke={`url(#${id}-gold-shine)`}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
      </g>
      {/* Arrow tip */}
      <g data-anim="pop" data-delay="0.45" style={{ opacity: 0 }}>
        <path
          d="M 257 107 L 270 110 L 263 122"
          stroke={`url(#${id}-gold-shine)`}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Platform badges - 6 badges arranged around the monitor */}
      {/* Shopify - top left */}
      <g data-anim="pop" data-delay="0.22" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={28} y={48} width={52} height={52} rx={15} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={30} y={49} width={48} height={24} rx={14} fill="rgba(255,255,255,0.03)" />
        {/* Shopify bag - using nested svg for auto-centering */}
        <svg x={38} y={54} width={32} height={36} viewBox="-10 30 270 310" overflow="visible">
          <path d="M223.7 73.1c-1.5-1.2-3.5-1.2-5.2-.9 0 0-37.2 8-44.7 9.6-7.4-21.5-20.5-41.2-43.6-41.2h-2c-3.4-4.5-7.7-6.5-11.4-6.5-31.7 0-46.9 39.7-51.7 59.9l-29.8 9.2c-9.2 2.9-9.5 3.2-10.7 11.8L0 310.5l163.4 30.7 88.3-19.1S224.3 74 223.7 73.1zm-72 15.7l-25.4 7.9c3.5-13.4 10-26.7 17.6-35.4 2.8-3.2 6.9-6.8 11.4-8.8 4.7 9.3 6.6 22.3 6.4 36.3zm-28.9-48.6c3.5 0 6.4 1.3 9 3.7C119 52.2 107.5 73.4 103.3 93l-23.2 7.2C86.5 77.4 99 40.2 122.8 40.2zm-7.7 143c1 16.3 43.8 19.9 46.2 58.2 1.9 30.2-16 50.8-41.8 52.4-30.9 1.9-47.9-16.3-47.9-16.3l6.6-27.9s17.1 12.9 30.8 12.1c9-.5 12.2-7.9 11.9-13.1-1.3-21.3-36.2-20-38.3-55.1-1.8-29.5 17.5-59.4 60.3-62.1 16.5-1 24.9 3.2 24.9 3.2l-9.8 36.8s-10.9-5-23.8-4.2c-18.9 1.2-19.1 13.1-18.1 16z"
            fill={`url(#${id}-gold-shine)`} />
        </svg>
      </g>

      {/* Amazon - top right */}
      <g data-anim="pop" data-delay="0.28" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={318} y={38} width={52} height={52} rx={15} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={320} y={39} width={48} height={24} rx={14} fill="rgba(255,255,255,0.03)" />
        {/* Amazon "a" + smile arrow */}
        <text x={344} y={68} textAnchor="middle" fill={`url(#${id}-gold-shine)`} fontSize={28} fontWeight="bold" fontFamily="'Amazon Ember', 'Arial', sans-serif" letterSpacing="-1">a</text>
        {/* Smile arrow under the "a" */}
        <path d="M 330 74 Q 344 80 358 74" stroke={`url(#${id}-gold-shine)`} strokeWidth={2} fill="none" strokeLinecap="round" />
        <path d="M 355 73 L 360 71 L 358 76" fill={`url(#${id}-gold-shine)`} />
      </g>

      {/* Etsy - mid left */}
      <g data-anim="pop" data-delay="0.33" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={20} y={118} width={48} height={48} rx={14} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={22} y={119} width={44} height={22} rx={13} fill="rgba(255,255,255,0.03)" />
        <text x={44} y={148} textAnchor="middle" fill={`url(#${id}-gold-shine)`} fontSize={17} fontWeight="bold" fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="-0.5">etsy</text>
      </g>

      {/* TikTok - mid right */}
      <g data-anim="pop" data-delay="0.38" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={328} y={118} width={48} height={48} rx={14} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={330} y={119} width={44} height={22} rx={13} fill="rgba(255,255,255,0.03)" />
        {/* TikTok - using nested svg for auto-centering */}
        <svg x={339} y={126} width={28} height={30} viewBox="80 -20 400 500" overflow="visible">
          <path d="M 354 113 C 354 113 354 0 354 0 L 288 0 L 288 342 C 288 342 288 343 288 344 C 284 372 260 393 231 393 C 198 393 172 367 172 334 C 172 301 198 275 231 275 C 238 275 244 276 250 278 L 250 210 C 244 209 237 208 231 208 C 161 208 104 265 104 334 C 104 403 161 460 231 460 C 301 460 358 403 358 334 L 358 183 C 382 200 412 210 444 210 L 444 144 C 410 140 380 123 354 113 Z"
            fill={`url(#${id}-gold-shine)`} />
        </svg>
      </g>

      {/* Walmart - bottom left */}
      <g data-anim="pop" data-delay="0.42" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={35} y={185} width={48} height={48} rx={14} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={37} y={186} width={44} height={22} rx={13} fill="rgba(255,255,255,0.03)" />
        {/* Walmart spark - 6 rounded rays from center */}
        <g transform="translate(59, 209)">
          {/* Top ray */}
          <path d="M -3.5 -5 L 0 -15 L 3.5 -5 Z" fill={`url(#${id}-gold-shine)`} />
          {/* Top-right ray */}
          <path d="M 3 -4 L 13 -7.5 L 7 1 Z" fill={`url(#${id}-gold-shine)`} />
          {/* Bottom-right ray */}
          <path d="M 7 -1 L 13 7.5 L 3 4 Z" fill={`url(#${id}-gold-shine)`} />
          {/* Bottom ray */}
          <path d="M 3.5 5 L 0 15 L -3.5 5 Z" fill={`url(#${id}-gold-shine)`} />
          {/* Bottom-left ray */}
          <path d="M -3 4 L -13 7.5 L -7 -1 Z" fill={`url(#${id}-gold-shine)`} />
          {/* Top-left ray */}
          <path d="M -7 1 L -13 -7.5 L -3 -4 Z" fill={`url(#${id}-gold-shine)`} />
          {/* Center dot */}
          <circle cx={0} cy={0} r={2.5} fill={`url(#${id}-gold-shine)`} />
        </g>
      </g>

      {/* Meta - bottom right */}
      <g data-anim="pop" data-delay="0.45" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={320} y={185} width={48} height={48} rx={14} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={322} y={186} width={44} height={22} rx={13} fill="rgba(255,255,255,0.03)" />
        {/* Meta infinity logo - real logo from Bootstrap Icons */}
        <svg x={330} y={195} width={28} height={28} viewBox="0 0 16 16" overflow="visible">
          <path d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a55 55 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q.477-.001.924.122c.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714m1.516 2.224q-.378-.615-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87zM4.846 4.756c.725.1 1.385.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q.137 0 .27.018"
            fillRule="evenodd" fill={`url(#${id}-gold-shine)`} />
        </svg>
      </g>

      {/* Connecting dashed lines from badges to monitor */}
      <g data-anim="draw" data-delay="0.15" style={{ opacity: 0 }}>
        <line x1={80} y1={74} x2={92} y2={80} stroke={c.primary} strokeWidth={1} strokeOpacity={0.15} strokeDasharray="3 4" />
        <line x1={318} y1={64} x2={308} y2={68} stroke={c.primary} strokeWidth={1} strokeOpacity={0.15} strokeDasharray="3 4" />
        <line x1={68} y1={142} x2={92} y2={130} stroke={c.primary} strokeWidth={1} strokeOpacity={0.12} strokeDasharray="3 4" />
        <line x1={328} y1={142} x2={308} y2={135} stroke={c.primary} strokeWidth={1} strokeOpacity={0.12} strokeDasharray="3 4" />
        <line x1={83} y1={209} x2={92} y2={190} stroke={c.primary} strokeWidth={1} strokeOpacity={0.1} strokeDasharray="3 4" />
        <line x1={320} y1={209} x2={308} y2={190} stroke={c.primary} strokeWidth={1} strokeOpacity={0.1} strokeDasharray="3 4" />
      </g>

      {/* Revenue badge - premium with double border effect */}
      <g data-anim="fade-up" data-delay="0.5" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        {/* Outer glow */}
        <rect x={108} y={243} width={184} height={48} rx={24} fill="rgba(212,168,71,0.05)" />
        {/* Badge body */}
        <rect x={112} y={245} width={176} height={44} rx={22} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        {/* Inner highlight */}
        <rect x={114} y={246} width={172} height={20} rx={20} fill="rgba(255,255,255,0.02)" />
        <text x={200} y={265} textAnchor="middle" fill={`url(#${id}-gold-shine)`} fontSize={15} fontWeight="bold">$2M+ / year</text>
        <text x={200} y={280} textAnchor="middle" fill={c.primary} fontSize={9} opacity={0.5}>Revenue Managed</text>
      </g>
    </svg>
  );
}

function SEOIllustration(c: ColorSet) {
  const id = 'seo';
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <GradientDefs id={id} />

      <circle cx={200} cy={145} r={140} fill={`url(#${id}-glow)`}
        data-anim="scale-in" data-delay="0" style={{ opacity: 0 }} />

      {/* Monitor */}
      <g data-anim="fade-up" data-delay="0.05" style={{ opacity: 0 }} filter={`url(#${id}-shadow)`}>
        <rect x={80} y={35} width={240} height={175} rx={18} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <rect x={94} y={49} width={212} height={143} rx={10} fill={`url(#${id}-screen)`} />
        <rect x={94} y={49} width={212} height={143} rx={10} fill={`url(#${id}-shine)`} />
        <line x1={100} y1={37} x2={300} y2={37} stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeLinecap="round" />
      </g>
      <g data-anim="fade-up" data-delay="0.08" style={{ opacity: 0 }}>
        <rect x={178} y={210} width={44} height={16} rx={4} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <ellipse cx={200} cy={233} rx={50} ry={6} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <ellipse cx={200} cy={231} rx={34} ry={3} fill="rgba(212,168,71,0.1)" />
      </g>

      {/* Bar chart - exponential growth, animated upward */}
      <g>
        <rect className="seo-bar" x={115} y={186} width={36} height={0} rx={5} fill={`url(#${id}-subtle)`} stroke={c.primary} strokeWidth={1.5}
          data-anim="fade-up" data-delay="0.15" style={{ opacity: 0 }} />
        <rect className="seo-bar" x={160} y={186} width={36} height={0} rx={5} fill={`url(#${id}-subtle)`} stroke={c.primary} strokeWidth={1.5}
          data-anim="fade-up" data-delay="0.22" style={{ opacity: 0 }} />
        <rect className="seo-bar" x={205} y={186} width={36} height={0} rx={5} fill={`url(#${id}-gold-v)`} stroke={c.primary} strokeWidth={1.5}
          data-anim="fade-up" data-delay="0.3" style={{ opacity: 0 }} />
      </g>

      <line x1={108} y1={186} x2={250} y2={186} stroke={c.stroke} strokeWidth={1.5} strokeOpacity={0.2}
        data-anim="draw" data-delay="0.1" style={{ opacity: 0 }} />

      {/* Magnifying glass */}
      <g data-anim="scale-in" data-delay="0.2" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <circle cx={315} cy={130} r={44} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={3} />
        <circle cx={315} cy={130} r={34} fill="rgba(212,168,71,0.06)" />
        <circle cx={305} cy={120} r={18} fill="rgba(255,255,255,0.02)" />
        <line x1={345} y1={162} x2={370} y2={187} stroke={`url(#${id}-gold-shine)`} strokeWidth={7} strokeLinecap="round" />
        <line x1={345} y1={162} x2={370} y2={187} stroke={`url(#${id}-gold)`} strokeWidth={5} strokeLinecap="round" />
        <line x1={293} y1={120} x2={332} y2={120} stroke={c.primary} strokeWidth={2.5} strokeOpacity={0.45} strokeLinecap="round" />
        <line x1={296} y1={133} x2={328} y2={133} stroke={c.primary} strokeWidth={2} strokeOpacity={0.3} strokeLinecap="round" />
        <line x1={299} y1={146} x2={322} y2={146} stroke={c.primary} strokeWidth={2} strokeOpacity={0.18} strokeLinecap="round" />
      </g>

      {/* Keyword tags */}
      <g data-anim="slide-left" data-delay="0.45" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={90} y={250} width={82} height={32} rx={16} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <text x={131} y={271} textAnchor="middle" fill={`url(#${id}-gold-shine)`} fontSize={11} fontWeight="600">Keywords</text>
      </g>
      <g data-anim="slide-left" data-delay="0.5" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={182} y={250} width={72} height={32} rx={16} fill={`url(#${id}-dark-deep)`} stroke={c.primary} strokeWidth={1.5} />
        <text x={218} y={271} textAnchor="middle" fill={c.primary} fontSize={11} fontWeight="600" opacity={0.7}>Ranking</text>
      </g>
      <g data-anim="slide-left" data-delay="0.55" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={264} y={250} width={72} height={32} rx={16} fill={`url(#${id}-dark-deep)`} stroke={c.secondary} strokeWidth={1.5} />
        <text x={300} y={271} textAnchor="middle" fill={c.secondary} fontSize={11} fontWeight="600">Traffic</text>
      </g>
    </svg>
  );
}

function ProjectManagementIllustration(c: ColorSet) {
  const id = 'pm';
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <GradientDefs id={id} />

      <circle cx={200} cy={145} r={140} fill={`url(#${id}-glow)`}
        data-anim="scale-in" data-delay="0" style={{ opacity: 0 }} />

      {/* Kanban board */}
      <g data-anim="fade-up" data-delay="0.05" style={{ opacity: 0 }} filter={`url(#${id}-shadow)`}>
        <rect x={50} y={30} width={250} height={210} rx={18} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <rect x={50} y={30} width={250} height={210} rx={18} fill={`url(#${id}-shine)`} />
        <line x1={133} y1={68} x2={133} y2={225} stroke={c.primary} strokeWidth={1} strokeOpacity={0.15} />
        <line x1={217} y1={68} x2={217} y2={225} stroke={c.primary} strokeWidth={1} strokeOpacity={0.15} />
        <rect x={63} y={42} width={58} height={22} rx={11} fill="rgba(212,168,71,0.12)" />
        <text x={92} y={57} textAnchor="middle" fill={c.primary} fontSize={9} fontWeight="bold">TO DO</text>
        <rect x={146} y={42} width={58} height={22} rx={11} fill="rgba(212,168,71,0.18)" />
        <text x={175} y={57} textAnchor="middle" fill={c.primary} fontSize={9} fontWeight="bold">DOING</text>
        <rect x={230} y={42} width={58} height={22} rx={11} fill="rgba(212,168,71,0.25)" />
        <text x={259} y={57} textAnchor="middle" fill={c.primary} fontSize={9} fontWeight="bold">DONE</text>
      </g>

      {/* Cards Col 1 */}
      <g data-anim="fade-up" data-delay="0.15" style={{ opacity: 0 }}>
        <rect x={62} y={76} width={60} height={38} rx={9} fill={`url(#${id}-subtle)`} stroke={c.primary} strokeWidth={1.5} />
        <line x1={70} y1={89} x2={112} y2={89} stroke={c.primary} strokeWidth={2} strokeOpacity={0.35} strokeLinecap="round" />
        <line x1={70} y1={100} x2={102} y2={100} stroke={c.primary} strokeWidth={1.5} strokeOpacity={0.2} strokeLinecap="round" />
      </g>
      <g data-anim="fade-up" data-delay="0.2" style={{ opacity: 0 }}>
        <rect x={62} y={122} width={60} height={38} rx={9} fill={`url(#${id}-subtle)`} stroke={c.primary} strokeWidth={1.5} />
        <line x1={70} y1={135} x2={112} y2={135} stroke={c.primary} strokeWidth={2} strokeOpacity={0.35} strokeLinecap="round" />
        <line x1={70} y1={146} x2={98} y2={146} stroke={c.primary} strokeWidth={1.5} strokeOpacity={0.2} strokeLinecap="round" />
      </g>

      {/* Cards Col 2 */}
      <g data-anim="fade-up" data-delay="0.25" style={{ opacity: 0 }}>
        <rect x={145} y={76} width={60} height={38} rx={9} fill="rgba(212,168,71,0.18)" stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <line x1={153} y1={89} x2={195} y2={89} stroke={c.primary} strokeWidth={2} strokeOpacity={0.4} strokeLinecap="round" />
        <line x1={153} y1={100} x2={188} y2={100} stroke={c.primary} strokeWidth={1.5} strokeOpacity={0.25} strokeLinecap="round" />
      </g>

      {/* Cards Col 3 */}
      <g data-anim="fade-up" data-delay="0.3" style={{ opacity: 0 }}>
        <rect x={229} y={76} width={60} height={38} rx={9} fill={`url(#${id}-subtle)`} stroke={c.primary} strokeWidth={1.5} />
        <rect x={229} y={122} width={60} height={38} rx={9} fill={`url(#${id}-subtle)`} stroke={c.primary} strokeWidth={1.5} />
        <rect x={229} y={168} width={60} height={38} rx={9} fill={`url(#${id}-subtle)`} stroke={c.primary} strokeWidth={1.5} />
      </g>

      {/* Checkmarks with glow */}
      {[
        { y: 93, delay: '0.45' }, { y: 139, delay: '0.5' }, { y: 185, delay: '0.55' },
      ].map((ch, i) => (
        <g key={i}>
          <path d={`M 243 ${ch.y} L 253 ${ch.y + 10} L 275 ${ch.y - 8}`}
            stroke={c.primary} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" opacity={0.1}
            data-anim="draw" data-delay={ch.delay} style={{ opacity: 0 }} />
          <path d={`M 243 ${ch.y} L 253 ${ch.y + 10} L 275 ${ch.y - 8}`}
            stroke={`url(#${id}-gold-shine)`} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
            data-anim="draw" data-delay={ch.delay} style={{ opacity: 0 }} />
        </g>
      ))}

      {/* Gears with shadows */}
      <g data-anim="scale-in" data-delay="0.3" style={{ opacity: 0 }} className="gear-large" filter={`url(#${id}-shadow-sm)`}>
        <circle cx={342} cy={95} r={32} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2.5} />
        <circle cx={342} cy={95} r={12} fill={`url(#${id}-gold-shine)`} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return <line key={angle} x1={342 + 28 * Math.cos(rad)} y1={95 + 28 * Math.sin(rad)} x2={342 + 38 * Math.cos(rad)} y2={95 + 38 * Math.sin(rad)}
            stroke={`url(#${id}-gold-shine)`} strokeWidth={5} strokeLinecap="round" />;
        })}
      </g>
      <g data-anim="scale-in" data-delay="0.38" style={{ opacity: 0 }} className="gear-small" filter={`url(#${id}-shadow-sm)`}>
        <circle cx={370} cy={152} r={21} fill={`url(#${id}-dark-deep)`} stroke={c.secondary} strokeWidth={2} />
        <circle cx={370} cy={152} r={7} fill={c.secondary} />
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return <line key={angle} x1={370 + 18 * Math.cos(rad)} y1={152 + 18 * Math.sin(rad)} x2={370 + 26 * Math.cos(rad)} y2={152 + 26 * Math.sin(rad)}
            stroke={c.secondary} strokeWidth={4} strokeLinecap="round" />;
        })}
      </g>

      {/* Timeline */}
      <g data-anim="draw" data-delay="0.35" style={{ opacity: 0 }}>
        <line x1={55} y1={268} x2={345} y2={268} stroke={c.primary} strokeWidth={2.5} strokeOpacity={0.2} strokeLinecap="round" />
      </g>
      {[100, 170, 240, 310].map((x, i) => (
        <g key={x} data-anim="pop" data-delay={`${0.52 + i * 0.05}`} style={{ opacity: 0 }}>
          <circle cx={x} cy={268} r={9} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
          <circle cx={x} cy={268} r={4} fill={`url(#${id}-gold-shine)`} />
        </g>
      ))}
    </svg>
  );
}

function DigitalMarketingIllustration(c: ColorSet) {
  const id = 'dm';
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <GradientDefs id={id} />

      <circle cx={200} cy={145} r={140} fill={`url(#${id}-glow)`}
        data-anim="scale-in" data-delay="0" style={{ opacity: 0 }} />

      {/* Megaphone with shadow */}
      <g data-anim="slide-left" data-delay="0.1" style={{ opacity: 0 }} filter={`url(#${id}-shadow)`}>
        <path d="M 55 128 L 55 187 L 140 215 L 140 100 Z"
          fill={`url(#${id}-gold-shine)`} stroke={c.primary} strokeWidth={2} strokeLinejoin="round" />
        {/* Body rectangle */}
        <rect x={140} y={115} width={58} height={84} rx={8} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={142} y={116} width={54} height={40} rx={7} fill="rgba(255,255,255,0.03)" />
        <path d="M 49 150 Q 30 157 49 165" stroke={`url(#${id}-gold-shine)`} strokeWidth={4} fill="none" strokeLinecap="round" />
        <line x1={150} y1={136} x2={188} y2={136} stroke={c.primary} strokeWidth={2} strokeOpacity={0.25} strokeLinecap="round" />
        <line x1={150} y1={150} x2={182} y2={150} stroke={c.primary} strokeWidth={2} strokeOpacity={0.18} strokeLinecap="round" />
        <line x1={150} y1={164} x2={177} y2={164} stroke={c.primary} strokeWidth={2} strokeOpacity={0.12} strokeLinecap="round" />
      </g>

      {/* Sound waves with glow */}
      <path d="M 208 128 Q 235 157 208 187" stroke={c.primary} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.08}
        data-anim="draw" data-delay="0.3" style={{ opacity: 0 }} className="sound-wave" />
      <path d="M 208 128 Q 235 157 208 187" stroke={`url(#${id}-gold-shine)`} strokeWidth={3} strokeLinecap="round" fill="none"
        data-anim="draw" data-delay="0.3" style={{ opacity: 0 }} className="sound-wave" />
      <path d="M 226 110 Q 264 157 226 204" stroke={c.primary} strokeWidth={3} strokeLinecap="round" fill="none" strokeOpacity={0.5}
        data-anim="draw" data-delay="0.38" style={{ opacity: 0 }} className="sound-wave" />
      <path d="M 244 92 Q 292 157 244 222" stroke={c.primary} strokeWidth={2.5} strokeLinecap="round" fill="none" strokeOpacity={0.25}
        data-anim="draw" data-delay="0.45" style={{ opacity: 0 }} className="sound-wave" />

      {/* Target/bullseye with shadow */}
      <g data-anim="scale-in" data-delay="0.2" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <circle cx={322} cy={118} r={50} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2.5} />
        <circle cx={322} cy={118} r={36} fill="rgba(212,168,71,0.08)" stroke={c.primary} strokeWidth={2} />
        <circle cx={322} cy={118} r={22} fill="rgba(212,168,71,0.12)" stroke={c.primary} strokeWidth={1.5} />
        <circle cx={322} cy={118} r={9} fill={`url(#${id}-gold-shine)`} />
        {/* Crosshair highlight */}
        <circle cx={318} cy={112} r={14} fill="rgba(255,255,255,0.03)" />
      </g>

      {/* Envelope with shadow */}
      <g data-anim="fade-up" data-delay="0.25" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={42} y={46} width={68} height={48} rx={10} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={44} y={47} width={64} height={22} rx={9} fill="rgba(255,255,255,0.03)" />
        <path d="M 44 52 L 76 80 L 108 52" stroke={`url(#${id}-gold-shine)`} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Chat bubble with shadow */}
      <g data-anim="pop" data-delay="0.4" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <path
          d="M 272 208 Q 272 188 292 188 L 335 188 Q 355 188 355 208 L 355 228 Q 355 248 335 248 L 302 248 L 286 264 L 290 248 Q 272 248 272 228 Z"
          fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5}
        />
        <line x1={288} y1={208} x2={340} y2={208} stroke={c.primary} strokeWidth={2} strokeOpacity={0.35} strokeLinecap="round" />
        <line x1={288} y1={220} x2={332} y2={220} stroke={c.primary} strokeWidth={2} strokeOpacity={0.25} strokeLinecap="round" />
        <line x1={288} y1={232} x2={318} y2={232} stroke={c.primary} strokeWidth={2} strokeOpacity={0.15} strokeLinecap="round" />
      </g>

      {/* Heart */}
      <path
        d="M 158 238 C 158 225 171 217 182 226 C 193 217 206 225 206 238 C 206 257 182 270 182 270 C 182 270 158 257 158 238 Z"
        fill={`url(#${id}-gold-shine)`} stroke={c.primary} strokeWidth={1.5} opacity={0.75}
        data-anim="pop" data-delay="0.48" style={{ opacity: 0 }}
      />

      {/* Share nodes with shadow */}
      <g data-anim="pop" data-delay="0.52" style={{ opacity: 0 }}>
        <line x1={123} y1={245} x2={112} y2={234} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <line x1={123} y1={255} x2={112} y2={266} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <circle cx={130} cy={250} r={9} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <circle cx={130} cy={250} r={3} fill={`url(#${id}-gold-shine)`} />
        <circle cx={106} cy={268} r={7} fill={`url(#${id}-dark-deep)`} stroke={c.primary} strokeWidth={1.5} />
        <circle cx={106} cy={268} r={2.5} fill={c.primary} />
        <circle cx={106} cy={232} r={7} fill={`url(#${id}-dark-deep)`} stroke={c.primary} strokeWidth={1.5} />
        <circle cx={106} cy={232} r={2.5} fill={c.primary} />
      </g>
    </svg>
  );
}

function DesignCreativeIllustration(c: ColorSet) {
  const id = 'dc';
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <GradientDefs id={id} />

      <circle cx={200} cy={145} r={140} fill={`url(#${id}-glow)`}
        data-anim="scale-in" data-delay="0" style={{ opacity: 0 }} />

      {/* Artboard */}
      <g data-anim="fade-up" data-delay="0.05" style={{ opacity: 0 }} filter={`url(#${id}-shadow)`}>
        <rect x={75} y={35} width={250} height={210} rx={18} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <rect x={89} y={49} width={222} height={182} rx={10} fill="rgba(212,168,71,0.03)" />
        <rect x={89} y={49} width={222} height={182} rx={10} fill={`url(#${id}-shine)`} />
        {/* Corner crop marks */}
        <path d="M 75 55 L 75 35 L 95 35" stroke={`url(#${id}-gold-shine)`} strokeWidth={3} strokeLinecap="round" />
        <path d="M 305 35 L 325 35 L 325 55" stroke={`url(#${id}-gold-shine)`} strokeWidth={3} strokeLinecap="round" />
        <path d="M 75 225 L 75 245 L 95 245" stroke={`url(#${id}-gold-shine)`} strokeWidth={3} strokeLinecap="round" />
        <path d="M 305 245 L 325 245 L 325 225" stroke={`url(#${id}-gold-shine)`} strokeWidth={3} strokeLinecap="round" />
      </g>

      {/* Bezier curve with glow */}
      <path
        d="M 130 205 C 130 110 210 85 210 150 C 210 215 290 185 290 85"
        stroke={c.primary} strokeWidth={8} strokeLinecap="round" fill="none" opacity={0.1}
        data-anim="draw" data-delay="0.2" style={{ opacity: 0 }}
      />
      <path
        d="M 130 205 C 130 110 210 85 210 150 C 210 215 290 185 290 85"
        stroke={`url(#${id}-gold-shine)`} strokeWidth={3} strokeLinecap="round" fill="none"
        data-anim="draw" data-delay="0.2" style={{ opacity: 0 }}
      />

      {/* Control handles */}
      <g data-anim="fade-up" data-delay="0.4" style={{ opacity: 0 }}>
        <line x1={130} y1={205} x2={130} y2={110} stroke={c.primary} strokeWidth={1.5} strokeDasharray="5 4" strokeOpacity={0.3} />
        <circle cx={130} cy={110} r={7} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <circle cx={130} cy={110} r={2.5} fill={`url(#${id}-gold-shine)`} />
        <line x1={290} y1={85} x2={290} y2={185} stroke={c.primary} strokeWidth={1.5} strokeDasharray="5 4" strokeOpacity={0.3} />
        <circle cx={290} cy={185} r={7} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <circle cx={290} cy={185} r={2.5} fill={`url(#${id}-gold-shine)`} />
      </g>

      {/* Anchor points */}
      <g data-anim="pop" data-delay="0.35" style={{ opacity: 0 }}>
        <rect x={123} y={198} width={14} height={14} rx={3} fill={`url(#${id}-gold-shine)`} stroke={c.primary} strokeWidth={1.5} />
        <rect x={283} y={78} width={14} height={14} rx={3} fill={`url(#${id}-gold-shine)`} stroke={c.primary} strokeWidth={1.5} />
      </g>

      {/* Pen tool */}
      <g data-anim="scale-in" data-delay="0.15" style={{ opacity: 0 }}>
        <path d="M 210 138 L 200 168 L 210 160 L 220 168 Z" fill={`url(#${id}-gold-shine)`} stroke={c.primary} strokeWidth={1.5} />
        <rect x={203} y={115} width={14} height={25} rx={3} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
      </g>

      {/* Color palette with shadow */}
      <g data-anim="scale-in" data-delay="0.25" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <circle cx={48} cy={148} r={36} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2.5} />
        <circle cx={38} cy={138} r={3} fill="rgba(255,255,255,0.03)" />
        <circle cx={36} cy={135} r={9} fill={`url(#${id}-gold-shine)`} />
        <circle cx={58} cy={130} r={8} fill={c.secondary} />
        <circle cx={36} cy={158} r={8} fill="rgba(212,168,71,0.5)" />
        <circle cx={60} cy={156} r={7} fill="rgba(205,127,50,0.65)" />
      </g>

      {/* Layers with shadow */}
      <g filter={`url(#${id}-shadow-sm)`}>
        <g data-anim="fade-up" data-delay="0.3" style={{ opacity: 0 }}>
          <path d="M 350 182 L 392 198 L 350 214 L 308 198 Z" fill="rgba(212,168,71,0.06)" stroke={c.primary} strokeWidth={1.5} strokeOpacity={0.3} />
        </g>
        <g data-anim="fade-up" data-delay="0.37" style={{ opacity: 0 }}>
          <path d="M 350 163 L 392 179 L 350 195 L 308 179 Z" fill={`url(#${id}-subtle)`} stroke={c.primary} strokeWidth={1.5} />
        </g>
        <g data-anim="fade-up" data-delay="0.44" style={{ opacity: 0 }}>
          <path d="M 350 144 L 392 160 L 350 176 L 308 160 Z" fill={`url(#${id}-gold-shine)`} stroke={c.primary} strokeWidth={1.5} opacity={0.7} />
        </g>
      </g>

      {/* Badge */}
      <g data-anim="pop" data-delay="0.5" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={125} y={258} width={150} height={36} rx={18} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={127} y={259} width={146} height={16} rx={16} fill="rgba(255,255,255,0.02)" />
        <text x={200} y={281} textAnchor="middle" fill={`url(#${id}-gold-shine)`} fontSize={12} fontWeight="bold">10+ Years</text>
      </g>
    </svg>
  );
}

function ToolBuildingIllustration(c: ColorSet) {
  const id = 'tb';
  return (
    <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
      <GradientDefs id={id} />

      <circle cx={200} cy={145} r={140} fill={`url(#${id}-glow)`}
        data-anim="scale-in" data-delay="0" style={{ opacity: 0 }} />

      {/* Code editor with shadow */}
      <g data-anim="fade-up" data-delay="0.05" style={{ opacity: 0 }} filter={`url(#${id}-shadow)`}>
        <rect x={60} y={38} width={210} height={190} rx={16} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <rect x={60} y={38} width={210} height={190} rx={16} fill={`url(#${id}-shine)`} />
        {/* Title bar */}
        <circle cx={82} cy={56} r={4.5} fill="#ff5f57" />
        <circle cx={97} cy={56} r={4.5} fill="#febc2e" />
        <circle cx={112} cy={56} r={4.5} fill="#28c840" />
        <line x1={60} y1={70} x2={270} y2={70} stroke={c.primary} strokeWidth={1} strokeOpacity={0.15} />
      </g>

      {/* Code brackets with glow */}
      <g data-anim="scale-in" data-delay="0.15" style={{ opacity: 0 }}>
        {/* Glow behind brackets */}
        <path d="M 128 105 L 90 142 L 128 180" stroke={c.primary} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={0.08} />
        <path d="M 202 105 L 240 142 L 202 180" stroke={c.primary} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" opacity={0.08} />
        {/* Brackets */}
        <path d="M 128 105 L 90 142 L 128 180" stroke={`url(#${id}-gold-shine)`} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 202 105 L 240 142 L 202 180" stroke={`url(#${id}-gold-shine)`} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
        <line x1={178} y1={100} x2={152} y2={185} stroke={c.secondary} strokeWidth={3} strokeLinecap="round" />
      </g>

      {/* Code lines */}
      <g data-anim="fade-up" data-delay="0.3" style={{ opacity: 0 }}>
        <line x1={105} y1={195} x2={148} y2={195} stroke={c.primary} strokeWidth={2} strokeOpacity={0.2} strokeLinecap="round" />
        <line x1={155} y1={195} x2={205} y2={195} stroke={c.primary} strokeWidth={2} strokeOpacity={0.12} strokeLinecap="round" />
        <line x1={105} y1={208} x2={172} y2={208} stroke={c.primary} strokeWidth={2} strokeOpacity={0.15} strokeLinecap="round" />
      </g>

      {/* Database with shadow */}
      <g data-anim="scale-in" data-delay="0.2" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <ellipse cx={328} cy={75} rx={44} ry={17} fill={`url(#${id}-gold-shine)`} stroke={c.primary} strokeWidth={2} />
        <rect x={284} y={75} width={88} height={75} fill={`url(#${id}-dark-deep)`} stroke="none" />
        <line x1={284} y1={75} x2={284} y2={150} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <line x1={372} y1={75} x2={372} y2={150} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <ellipse cx={328} cy={150} rx={44} ry={17} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={2} />
        <ellipse cx={328} cy={112} rx={44} ry={15} stroke={c.primary} strokeWidth={1} strokeOpacity={0.2} fill="none" />
        <ellipse cx={328} cy={75} rx={32} ry={11} fill="rgba(255,255,255,0.05)" />
      </g>

      {/* Calculator with shadow */}
      <g data-anim="fade-up" data-delay="0.35" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={45} y={238} width={80} height={58} rx={14} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={47} y={239} width={76} height={26} rx={13} fill="rgba(255,255,255,0.02)" />
        <rect x={56} y={246} width={58} height={18} rx={5} fill="rgba(212,168,71,0.1)" stroke={c.primary} strokeWidth={1} />
        {[0, 1].map((row) =>
          [0, 1, 2].map((col) => (
            <rect key={`${row}-${col}`}
              x={58 + col * 19} y={270 + row * 13}
              width={15} height={9} rx={3}
              fill={col === 2 && row === 1 ? `url(#${id}-gold-shine)` : `url(#${id}-subtle)`}
              stroke={c.primary} strokeWidth={0.8} />
          ))
        )}
      </g>

      {/* API network with glow lines */}
      <g data-anim="draw" data-delay="0.3" style={{ opacity: 0 }}>
        <line x1={292} y1={208} x2={332} y2={235} stroke={c.primary} strokeWidth={6} opacity={0.08} />
        <line x1={332} y1={235} x2={372} y2={208} stroke={c.primary} strokeWidth={6} opacity={0.08} />
        <line x1={332} y1={235} x2={332} y2={278} stroke={c.primary} strokeWidth={6} opacity={0.08} />
        <line x1={292} y1={208} x2={332} y2={235} stroke={`url(#${id}-gold-shine)`} strokeWidth={2.5} />
        <line x1={332} y1={235} x2={372} y2={208} stroke={`url(#${id}-gold-shine)`} strokeWidth={2.5} />
        <line x1={332} y1={235} x2={332} y2={278} stroke={`url(#${id}-gold-shine)`} strokeWidth={2.5} />
      </g>
      {[
        { cx: 292, cy: 208, r: 11, d: '0.45', big: false },
        { cx: 372, cy: 208, r: 11, d: '0.48', big: false },
        { cx: 332, cy: 235, r: 13, d: '0.42', big: true },
        { cx: 332, cy: 278, r: 11, d: '0.52', big: false },
      ].map((n, i) => (
        <g key={i} data-anim="pop" data-delay={n.d} style={{ opacity: 0 }}>
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.big ? `url(#${id}-gold-shine)` : `url(#${id}-dark-deep)`}
            stroke={`url(#${id}-gold-shine)`} strokeWidth={n.big ? 0 : 2} />
          {!n.big && <circle cx={n.cx} cy={n.cy} r={4} fill={`url(#${id}-gold-shine)`} />}
        </g>
      ))}

      {/* Badge */}
      <g data-anim="pop" data-delay="0.55" style={{ opacity: 0 }} filter={`url(#${id}-shadow-sm)`}>
        <rect x={145} y={258} width={110} height={36} rx={18} fill={`url(#${id}-dark-deep)`} stroke={`url(#${id}-gold-shine)`} strokeWidth={1.5} />
        <rect x={147} y={259} width={106} height={16} rx={16} fill="rgba(255,255,255,0.02)" />
        <text x={200} y={281} textAnchor="middle" fill={`url(#${id}-gold-shine)`} fontSize={12} fontWeight="bold">30+ Tools</text>
      </g>
    </svg>
  );
}

// ─── Illustration Map ────────────────────────────────────────────

const illustrationMap: Record<ServiceType, (colors: ColorSet) => ReactNode> = {
  'ecommerce-management': EcommerceIllustration,
  'seo-content': SEOIllustration,
  'project-management': ProjectManagementIllustration,
  'digital-marketing': DigitalMarketingIllustration,
  'design-creative': DesignCreativeIllustration,
  'tool-building': ToolBuildingIllustration,
};

// ─── Main Component ──────────────────────────────────────────────

export default function AnimatedServiceIllustration({
  type,
  variant = 'dark',
  className = '',
}: AnimatedServiceIllustrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = getColors(variant);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const animElements = container.querySelectorAll('[data-anim]');

    // Set initial states
    animElements.forEach((el) => {
      const animType = el.getAttribute('data-anim');

      switch (animType) {
        case 'fade-up':
          gsap.set(el, { opacity: 0, y: 30 });
          break;
        case 'scale-in':
          gsap.set(el, { opacity: 0, scale: 0, transformOrigin: 'center center' });
          break;
        case 'draw': {
          try {
            const pathEl = el as SVGGeometryElement;
            const len = pathEl.getTotalLength();
            gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
          } catch {
            gsap.set(el, { opacity: 0 });
          }
          break;
        }
        case 'slide-left':
          gsap.set(el, { opacity: 0, x: -40 });
          break;
        case 'slide-right':
          gsap.set(el, { opacity: 0, x: 40 });
          break;
        case 'pop':
          gsap.set(el, { opacity: 0, scale: 0, transformOrigin: 'center center' });
          break;
        default:
          gsap.set(el, { opacity: 0 });
      }
    });

    // Create scroll-triggered timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    });

    // Animate each element
    animElements.forEach((el) => {
      const animType = el.getAttribute('data-anim');
      const delay = parseFloat(el.getAttribute('data-delay') || '0');

      switch (animType) {
        case 'fade-up':
          tl.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, delay);
          break;
        case 'scale-in':
          tl.to(el, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' }, delay);
          break;
        case 'draw': {
          try {
            (el as SVGGeometryElement).getTotalLength();
            tl.to(el, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, delay);
          } catch {
            tl.to(el, { opacity: 1, duration: 0.6, ease: 'power3.out' }, delay);
          }
          break;
        }
        case 'slide-left':
          tl.to(el, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, delay);
          break;
        case 'slide-right':
          tl.to(el, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, delay);
          break;
        case 'pop':
          tl.to(el, { opacity: 1, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, delay);
          break;
        default:
          tl.to(el, { opacity: 1, duration: 0.5 }, delay);
      }
    });

    // Post-entry continuous animations
    tl.add(() => {
      // Rotate gears
      const gearLarge = container.querySelector('.gear-large');
      const gearSmall = container.querySelector('.gear-small');
      if (gearLarge) {
        gsap.to(gearLarge, { rotation: 360, duration: 20, repeat: -1, ease: 'none', transformOrigin: 'center center' });
      }
      if (gearSmall) {
        gsap.to(gearSmall, { rotation: -360, duration: 15, repeat: -1, ease: 'none', transformOrigin: 'center center' });
      }

      // Pulse sound waves
      const soundWaves = container.querySelectorAll('.sound-wave');
      soundWaves.forEach((wave, i) => {
        gsap.to(wave, {
          opacity: 0.3,
          duration: 1.2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // SEO bars grow upward with exponential heights
      const seoBars = container.querySelectorAll('.seo-bar');
      if (seoBars.length === 3) {
        // Exponential growth: 28, 52, 120
        const barData = [
          { height: 28, y: 186 - 28 },
          { height: 52, y: 186 - 52 },
          { height: 120, y: 186 - 120 },
        ];
        seoBars.forEach((bar, i) => {
          gsap.to(bar, {
            attr: { height: barData[i].height, y: barData[i].y },
            duration: 0.8 + i * 0.2,
            delay: 0.15 + i * 0.15,
            ease: 'power2.out',
          });
        });
      }

      // Cart rides up the growth curve
      const cart = container.querySelector('.ecom-cart');
      if (cart) {
        const cartTl = gsap.timeline({ delay: 1 });
        // Cart center ~(204,110). Curve: (135,172) -> (200,148) -> (265,112)
        // Offsets from cart center: start=(-69,+62), mid=(-4,+38), end=(+61,+2)
        cartTl
          // Jump to curve start (bottom-left), small & invisible
          .set(cart, { x: -69, y: 62, scale: 0.7, opacity: 0, transformOrigin: 'center center' })
          // Fade in at curve start
          .to(cart, { opacity: 1, duration: 0.3, ease: 'power1.in' })
          // Ride up along the curve: start -> mid
          .to(cart, { x: -35, y: 50, scale: 0.75, duration: 0.5, ease: 'power1.out' })
          .to(cart, { x: -4, y: 38, scale: 0.8, duration: 0.5, ease: 'none' })
          // Mid -> end
          .to(cart, { x: 30, y: 18, scale: 0.85, duration: 0.5, ease: 'none' })
          .to(cart, { x: 61, y: 2, scale: 0.9, duration: 0.5, ease: 'power1.in' })
          // Settle into resting position
          .to(cart, { x: 0, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
      }

    });
  }, { scope: containerRef });

  const renderIllustration = illustrationMap[type];

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {renderIllustration ? renderIllustration(colors) : null}
    </div>
  );
}
