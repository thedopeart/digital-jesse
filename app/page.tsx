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
  { value: '$2.6M+', label: 'Sales Managed' },
  { value: '340%', label: 'Organic Growth' },
  { value: '5K+', label: 'Products Managed' },
  { value: '6 Years', label: 'Shopify' },
];

const featuredProjects = [
  {
    slug: 'quality-sewing',
    title: 'Quality Sewing',
    description: 'Running the e-commerce side of a family-owned sewing retailer. $2M+ in annual sales, 5K+ products.',
    metric: '5K→22K monthly organic traffic',
    tags: ['Shopify', 'SEO', 'E-commerce'],
  },
  {
    slug: 'masterpieces',
    title: 'Masterpiece Locator',
    description: 'Built a tool to find famous paintings in museums. 4,094 paintings across 455+ museums, all searchable.',
    metric: '4,094 paintings indexed',
    tags: ['Full-Stack', 'Database', 'SEO'],
  },
  {
    slug: 'luxury-wall-art',
    title: 'Luxury Wall Art',
    description: 'My side project. Started from zero, grew to $120K in sales across Shopify and Etsy.',
    metric: '$120K total revenue',
    tags: ['Shopify', 'Etsy', 'SEO'],
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

    // Hero entrance animation sequence
    tl.fromTo(
      photoRef.current,
      { scale: 0, opacity: 0, rotation: -10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8 }
    )
    .fromTo(
      nameRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      bioRef.current?.children || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    )
    .fromTo(
      buttonsRef.current?.children || [],
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 },
      '-=0.2'
    );

    // Continuous floating animation for photo
    gsap.to(photoRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: heroRef });

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Dark with animated gradient */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <GradientMesh variant="hero" />
        <FloatingShapes />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo with glow */}
            <div
              ref={photoRef}
              className="relative flex-shrink-0"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-xl opacity-50 scale-110" />
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image
                  src="/images/headshots/jesse-pfp.jpg"
                  alt="Jesse Johnson"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-lg">
                Available for hire
              </div>
            </div>

            {/* Text content */}
            <div className="text-center md:text-left">
              <h1
                ref={nameRef}
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
              >
                <span className="gradient-text-animated">Jesse Johnson</span>
              </h1>
              <div ref={bioRef}>
                <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
                  E-commerce manager and growth specialist. I build tools, optimize funnels, and turn traffic into revenue.
                </p>
                <p className="mt-4 text-gray-400">
                  Currently at{' '}
                  <a
                    href="https://qualitysewing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline-grow"
                  >
                    Quality Sewing
                  </a>
                  {' '}in Seattle. Open to new opportunities.
                </p>
              </div>

              {/* CTA Buttons */}
              <div ref={buttonsRef} className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
                <MagneticButton href="/portfolio" variant="primary">
                  View My Work
                </MagneticButton>
                <MagneticButton href="/contact" variant="secondary">
                  Let's Connect
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section - Glass cards */}
      <section className="relative py-20 bg-gradient-to-b from-[#0f0f23] to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center hover-lift group"
              >
                <p className="text-4xl md:text-5xl font-bold gradient-text">
                  <CountUp end={stat.value} delay={index * 0.2} />
                </p>
                <p className="mt-3 text-gray-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">
                  Portfolio
                </span>
                <h2 className="mt-2 text-4xl font-bold text-gray-900">
                  Featured Work
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden md:flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium transition-colors group"
              >
                View all projects
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

          <AnimatedSection stagger={0.15}>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-purple-600 font-medium"
            >
              View all projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills/Tools Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">
              Expertise
            </span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              What I Bring to the Table
            </h2>
          </AnimatedSection>

          <AnimatedSection stagger={0.1}>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '📈', title: 'SEO & Growth', desc: 'Data-driven strategies that actually work' },
                { icon: '🛒', title: 'E-commerce', desc: '6 years of Shopify mastery' },
                { icon: '🎨', title: 'Design', desc: 'From mockups to polished assets' },
                { icon: '⚡', title: 'Tool Building', desc: 'Custom solutions for real problems' },
              ].map((skill) => (
                <div
                  key={skill.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift group"
                >
                  <span className="text-4xl">{skill.icon}</span>
                  <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section - Animated gradient */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(147,51,234,0.3) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 70% 50%, rgba(79,70,229,0.3) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to work together?
            </h2>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
              I'm looking for my next full-time role in e-commerce, digital marketing, or growth. Remote or Seattle area.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                Let's Talk
              </MagneticButton>
              <MagneticButton href="/about" variant="secondary">
                Learn More About Me
              </MagneticButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
