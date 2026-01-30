'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientMesh from '@/components/backgrounds/GradientMesh';
import FloatingShapes from '@/components/backgrounds/FloatingShapes';
import AnimatedSection from '@/components/animations/AnimatedSection';
import CountUp from '@/components/animations/CountUp';
import MagneticButton from '@/components/animations/MagneticButton';
import ProjectCard from '@/components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '$4.5M+', label: 'Revenue Generated' },
  { value: '340%', label: 'Organic Growth' },
  { value: '3K+', label: 'Customers Served' },
  { value: '6 Years', label: 'Shopify Experience' },
];

const featuredProjects = [
  {
    slug: 'quality-sewing',
    title: 'Quality Sewing',
    description: 'E-commerce for a family-owned sewing retailer. $2M+ annual sales, 5K+ products.',
    metric: '5K to 22K organic traffic',
    tags: ['Shopify', 'SEO'],
  },
  {
    slug: 'masterpieces',
    title: 'Masterpiece Locator',
    description: 'Tool to find famous paintings in museums. 4,094 paintings across 455+ museums.',
    metric: '4,094 paintings indexed',
    tags: ['Full-Stack', 'SEO'],
  },
  {
    slug: 'luxury-wall-art',
    title: 'Luxury Wall Art',
    description: 'Art e-commerce brand built from zero. Part of a portfolio that generated $2.5M+ across art and NFT brands.',
    metric: '5-star Etsy shop',
    tags: ['Shopify', 'Etsy'],
  },
  {
    slug: 'date-ideas',
    title: 'Date Ideas',
    description: 'Full dating platform built from scratch in React. 10+ interactive tools and generators.',
    metric: '10+ tools built',
    tags: ['React', 'Vibe Coding'],
  },
];

const skills = [
  {
    title: 'SEO & Growth',
    desc: 'Data-driven strategies',
    href: '/portfolio#seo',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'E-commerce',
    desc: '6 years Shopify expertise',
    href: '/portfolio#ecommerce',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Design',
    desc: 'Wireframes to production',
    href: '/portfolio#design',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Vibe Coding',
    desc: '30+ tools built',
    href: '/portfolio/masterpieces',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Analytics',
    desc: 'GA4, Search Console',
    href: '/portfolio#seo',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Paid Ads',
    desc: 'Google, Meta, TikTok',
    href: '/portfolio/paid-sm-marketing',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
  },
  {
    title: 'Content',
    desc: 'Blogs, copy, strategy',
    href: '/portfolio/blog-example-1',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: 'Social Media',
    desc: '200K+ followers built',
    href: '/portfolio/social-media-management',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Web Development',
    desc: 'Next.js, React, Shopify',
    href: '/tools',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: 'Photography',
    desc: 'Product & lifestyle shots',
    href: '/portfolio#ecommerce',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Video & Animation',
    desc: 'Motion graphics, product video',
    href: '/portfolio/animation',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Email Marketing',
    desc: 'Campaigns & automations',
    href: '/portfolio#ecommerce',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Marketplaces',
    desc: 'Amazon, Etsy, Walmart, TikTok',
    href: '/portfolio#ecommerce',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Digital Art',
    desc: '$2M+ in art sales',
    href: '/portfolio/art-design',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Product Management',
    desc: '5,000+ SKUs managed',
    href: '/portfolio#ecommerce',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      photoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 }
    )
    .fromTo(
      nameRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      bioRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    )
    .fromTo(
      buttonsRef.current?.children || [],
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 },
      '-=0.2'
    );

    gsap.to(photoRef.current, {
      y: -8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: heroRef });

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-[#1e1e1e]">
        <GradientMesh variant="hero" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Photo */}
            <div ref={photoRef} className="relative flex-shrink-0">
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white/20 shadow-xl">
                <Image
                  src="/images/headshots/jesse-pfp.jpg"
                  alt="Jesse Johnson"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left flex-1 max-w-xl">
              <h1 ref={nameRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Jesse Johnson
              </h1>
              <div ref={bioRef}>
                <p className="mt-4 text-lg md:text-xl text-gray-200 leading-relaxed">
                  E-commerce manager and growth specialist. I build tools, optimize funnels, and turn traffic into revenue.
                </p>
                <p className="mt-3 text-gray-400 text-sm">
                  Currently at{' '}
                  <a
                    href="https://qualitysewing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4a847] hover:text-[#f5d78e] transition-colors"
                  >
                    Quality Sewing
                  </a>
                  {' '}in Seattle.
                </p>
              </div>

              <div ref={buttonsRef} className="mt-5 flex flex-wrap justify-center md:justify-start gap-3">
                <MagneticButton href="/portfolio" variant="primary">
                  View My Work
                </MagneticButton>
                <MagneticButton href="/contact" variant="secondary">
                  Get in Touch
                </MagneticButton>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:grid grid-cols-2 gap-4 flex-shrink-0">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl px-7 py-6 text-center hover-lift min-w-[160px]"
                >
                  <p className="text-[2rem] font-bold gradient-text whitespace-nowrap">
                    <CountUp end={stat.value} delay={index * 0.15} />
                  </p>
                  <p className="mt-2 text-gray-300 text-xs uppercase tracking-wider font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="md:hidden mt-8 grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-lg p-3 text-center hover-lift"
              >
                <p className="text-xl font-bold gradient-text">
                  <CountUp end={stat.value} delay={index * 0.15} />
                </p>
                <p className="mt-1 text-gray-300 text-[11px] uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Featured Work
              </h2>
              <Link
                href="/portfolio"
                className="hidden md:flex items-center gap-2 text-gray-500 hover:text-[#d4a847] font-medium transition-colors group"
              >
                View all
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection stagger={0.12}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} variant="dark" />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-8">
            <span className="text-[#d4a847] font-medium tracking-wider uppercase text-sm">Expertise</span>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              What I Bring to the Table
            </h2>
          </AnimatedSection>

          <AnimatedSection stagger={0.05}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <Link
                  key={skill.title}
                  href={skill.href}
                  className="bg-white rounded-xl p-6 hover-lift group border border-gray-200 hover:border-[#d4a847]/40 transition-all text-center block"
                >
                  <div className="text-[#d4a847] flex justify-center [&>svg]:w-8 [&>svg]:h-8">
                    {skill.icon}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-[#b8860b] transition-colors">
                    {skill.title}
                  </h3>
                  <p className="mt-1 text-gray-600 text-base">
                    {skill.desc}
                  </p>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden bg-[#1e1e1e]">
        <div className="absolute inset-0 border-t border-[#d4a847]/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to work together?
            </h2>
            <p className="mt-4 text-gray-300 max-w-xl mx-auto">
              Looking for my next role in e-commerce, digital marketing, or growth. Remote or Seattle.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <MagneticButton href="/contact" variant="primary">
                Let's Talk
              </MagneticButton>
              <MagneticButton href="/about" variant="secondary">
                About Me
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
