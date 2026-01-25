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
  { value: '6 Years', label: 'Shopify Experience' },
];

const featuredProjects = [
  {
    slug: 'quality-sewing',
    title: 'Quality Sewing',
    description: 'Running the e-commerce side of a family-owned sewing retailer. $2M+ in annual sales, 5K+ products.',
    metric: '5K to 22K monthly organic traffic',
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

const skills = [
  {
    title: 'SEO & Growth',
    desc: 'Data-driven strategies that deliver measurable results',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'E-commerce',
    desc: '6 years of Shopify expertise, multi-channel selling',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Design',
    desc: 'From wireframes to polished production assets',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Tool Building',
    desc: 'Custom solutions for real business problems',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
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
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center">
        <GradientMesh variant="hero" />
        <FloatingShapes />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Photo */}
            <div ref={photoRef} className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4a847]/30 to-[#cd7f32]/20 blur-2xl scale-110" />
              <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#d4a847]/30 shadow-2xl">
                <Image
                  src="/images/headshots/jesse-pfp.jpg"
                  alt="Jesse Johnson"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-emerald-600 rounded-full text-white text-sm font-medium shadow-lg whitespace-nowrap">
                Available for hire
              </div>
            </div>

            {/* Text */}
            <div className="text-center md:text-left max-w-2xl">
              <h1 ref={nameRef} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                <span className="gradient-text-animated">Jesse Johnson</span>
              </h1>
              <div ref={bioRef}>
                <p className="mt-6 text-xl md:text-2xl text-gray-300 leading-relaxed">
                  E-commerce manager and growth specialist. I build tools, optimize funnels, and turn traffic into revenue.
                </p>
                <p className="mt-4 text-gray-500">
                  Currently at{' '}
                  <a
                    href="https://qualitysewing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d4a847] hover:text-[#f5d78e] transition-colors underline-grow"
                  >
                    Quality Sewing
                  </a>
                  {' '}in Seattle. Open to new opportunities.
                </p>
              </div>

              <div ref={buttonsRef} className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
                <MagneticButton href="/portfolio" variant="primary">
                  View My Work
                </MagneticButton>
                <MagneticButton href="/contact" variant="secondary">
                  Get in Touch
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <svg className="w-5 h-5 text-gray-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4a847]/[0.02] to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-6 text-center hover-lift"
              >
                <p className="text-3xl md:text-4xl font-bold gradient-text">
                  <CountUp end={stat.value} delay={index * 0.15} />
                </p>
                <p className="mt-2 text-gray-500 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-[#d4a847] font-medium tracking-wider uppercase text-sm">
                  Portfolio
                </span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
                  Featured Work
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden md:flex items-center gap-2 text-gray-500 hover:text-[#d4a847] font-medium transition-colors group"
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

          <AnimatedSection stagger={0.12}>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-[#d4a847] font-medium"
            >
              View all projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-[#d4a847] font-medium tracking-wider uppercase text-sm">
              Expertise
            </span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              What I Bring to the Table
            </h2>
          </AnimatedSection>

          <AnimatedSection stagger={0.1}>
            <div className="grid md:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover-lift group"
                >
                  <div className="text-[#d4a847] group-hover:text-[#cd7f32] transition-colors">
                    {skill.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    {skill.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(212,168,71,0.1) 0%, transparent 50%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 70% 50%, rgba(205,127,50,0.08) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to work together?
            </h2>
            <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
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
