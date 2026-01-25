import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'E-commerce management, digital marketing, SEO strategy, and project management services by Jesse Johnson.',
};

const services = [
  {
    id: 'ecommerce-management',
    title: 'E-Commerce Management',
    description:
      'End-to-end management of online stores across Shopify, Amazon, Walmart, Etsy, and TikTok Shop. I handle product listings, inventory coordination, pricing strategy, and platform optimization to maximize sales and efficiency.',
    bullets: [
      'Multi-channel selling strategy and execution',
      'Product catalog management (5,000+ SKUs experience)',
      'Inventory forecasting and coordination',
      'Platform-specific optimization',
      'Conversion rate optimization',
      'Customer experience improvements',
    ],
    image: '/images/services/analytics.png',
    color: 'blue',
    stats: [
      { value: '$2M+', label: 'Annual Revenue Managed' },
      { value: '5,000+', label: 'Products Managed' },
      { value: '340%', label: 'Traffic Growth' },
    ],
  },
  {
    id: 'seo-content',
    title: 'SEO & Content Strategy',
    description:
      'Data-driven SEO strategy that actually moves the needle. I use Ahrefs, Screaming Frog, and Google Search Console to find opportunities, then execute with targeted content and technical fixes.',
    bullets: [
      'Keyword research and competitor analysis',
      'Technical SEO audits and implementation',
      'Content strategy and blog development',
      'On-page optimization',
      'Link building strategy',
      'Performance tracking and reporting',
    ],
    image: '/images/services/seo-blog.png',
    color: 'green',
    stats: [
      { value: '5K→22K', label: 'Organic Traffic Growth' },
      { value: '9,200+', label: 'Ranking Keywords' },
      { value: '0→DA 20', label: 'Domain Authority' },
    ],
  },
  {
    id: 'project-management',
    title: 'Project & Operations Management',
    description:
      'I keep projects moving and teams aligned. From coordinating cross-functional initiatives to building processes that scale, I focus on outcomes over activity.',
    bullets: [
      'Cross-functional team coordination',
      'Process documentation and optimization',
      'Vendor and contractor management',
      'Timeline and milestone tracking',
      'Resource allocation and prioritization',
      'Stakeholder communication',
    ],
    image: '/images/services/workflow.png',
    color: 'purple',
    stats: [
      { value: '10+', label: 'Tools Built' },
      { value: '6 Years', label: 'E-commerce Experience' },
      { value: '$2.6M+', label: 'Total Sales Managed' },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'Full-funnel marketing from awareness to conversion. I plan and execute campaigns across paid and organic channels, always focused on ROI.',
    bullets: [
      'Paid advertising (Google, Meta, TikTok)',
      'Email marketing and automation',
      'Social media strategy and execution',
      'Campaign performance analysis',
      'A/B testing and optimization',
      'Marketing calendar management',
    ],
    image: '/images/services/social-icons.png',
    color: 'orange',
    stats: [
      { value: '852%', label: 'Sales Growth' },
      { value: '$60K+', label: 'Organic Conversions' },
      { value: '200K+', label: 'Social Followers Built' },
    ],
  },
  {
    id: 'design-creative',
    title: 'Design & Creative Direction',
    description:
      'Visual communication that converts. From product mockups to pitch decks, I create polished materials that tell your story clearly.',
    bullets: [
      'Product photography direction',
      'Pitch deck and presentation design',
      'Brand identity and guidelines',
      'Infographics and data visualization',
      'UI/UX wireframes and mockups',
      'Marketing collateral design',
    ],
    image: '/images/services/art-design.png',
    color: 'pink',
    stats: [
      { value: 'Adobe CC', label: 'Photoshop, Illustrator, Premiere' },
      { value: 'Figma', label: 'UI/UX Design' },
      { value: '9,000+', label: 'Digital Assets Created' },
    ],
  },
  {
    id: 'tool-building',
    title: 'Tool & App Development',
    description:
      'Custom tools that solve real problems. I build calculators, databases, and interactive features that improve user engagement and drive organic traffic.',
    bullets: [
      'Custom Shopify app development',
      'Interactive calculators and tools',
      'Database design and implementation',
      'API integrations',
      'Automation and workflow tools',
      'SEO-driven content tools',
    ],
    image: '/images/services/workflow.png',
    color: 'teal',
    stats: [
      { value: '4,094', label: 'Paintings in Masterpiece Locator' },
      { value: '455+', label: 'Museums Indexed' },
      { value: '10+', label: 'Custom Tools Built' },
    ],
  },
];

const tools = [
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'Google Analytics', category: 'Analytics' },
  { name: 'Ahrefs', category: 'SEO' },
  { name: 'Screaming Frog', category: 'SEO' },
  { name: 'Photoshop', category: 'Design' },
  { name: 'Figma', category: 'Design' },
  { name: 'Google Ads', category: 'Marketing' },
  { name: 'Meta Ads', category: 'Marketing' },
  { name: 'Klaviyo', category: 'Email' },
  { name: 'Asana', category: 'Project Management' },
  { name: 'Notion', category: 'Documentation' },
  { name: 'Slack', category: 'Communication' },
];

const colorMap: Record<string, { bg: string; border: string; text: string; light: string }> = {
  blue: { bg: 'bg-[#d4a847]', border: 'border-[#d4a847]', text: 'text-[#d4a847]', light: 'bg-[#d4a847]/10' },
  green: { bg: 'bg-[#d4a847]', border: 'border-[#d4a847]', text: 'text-[#d4a847]', light: 'bg-[#d4a847]/10' },
  purple: { bg: 'bg-[#d4a847]', border: 'border-[#d4a847]', text: 'text-[#d4a847]', light: 'bg-[#d4a847]/10' },
  orange: { bg: 'bg-[#d4a847]', border: 'border-[#d4a847]', text: 'text-[#d4a847]', light: 'bg-[#d4a847]/10' },
  pink: { bg: 'bg-[#d4a847]', border: 'border-[#d4a847]', text: 'text-[#d4a847]', light: 'bg-[#d4a847]/10' },
  teal: { bg: 'bg-[#d4a847]', border: 'border-[#d4a847]', text: 'text-[#d4a847]', light: 'bg-[#d4a847]/10' },
};

export default function ServicesPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[#d4a847] font-medium tracking-wider uppercase text-sm">
          Services
        </span>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold text-white">
          What I Do
        </h1>
        <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          E-commerce management, digital marketing, and project leadership. I help businesses grow online through strategic execution and hands-on management.
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-24">
        {services.map((service, index) => {
          const colors = colorMap[service.color];
          const isReversed = index % 2 === 1;

          return (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-20"
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image Side */}
                <div className={`${isReversed ? 'lg:order-2' : ''}`}>
                  <div className={`relative rounded-2xl overflow-hidden ${colors.light} p-8`}>
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={isReversed ? 'lg:order-1' : ''}>
                  {/* Title with colored accent */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-1.5 h-10 ${colors.bg} rounded-full`}></div>
                    <h2 className="text-3xl font-bold text-white">
                      {service.title}
                    </h2>
                  </div>

                  <p className="text-lg text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-3 mb-8">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {service.stats.map((stat, i) => (
                      <div key={i} className={`${colors.light} border border-[#d4a847]/20 rounded-xl p-4 text-center`}>
                        <p className={`text-xl font-bold ${colors.text}`}>{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Tools Section */}
      <section className="mt-24 pt-12 border-t border-[#d4a847]/10">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Tools & Platforms
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {tools.map((tool) => (
            <span
              key={tool.name}
              className="px-5 py-2.5 bg-[#111111] border border-[#d4a847]/20 text-gray-300 rounded-full text-sm font-medium hover:border-[#d4a847]/40 hover:text-[#d4a847] transition-all"
            >
              {tool.name}
            </span>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="mt-24 bg-[#111111] border border-[#d4a847]/10 text-white -mx-6 px-8 py-16 rounded-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How I Work
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Understand',
              description: 'I dig into your business, goals, and current state. No generic advice.',
            },
            {
              step: '02',
              title: 'Plan',
              description: 'Clear priorities, realistic timelines, and measurable outcomes.',
            },
            {
              step: '03',
              title: 'Execute',
              description: 'Hands-on implementation. I do the work, not just delegate it.',
            },
            {
              step: '04',
              title: 'Iterate',
              description: 'Track results, learn from data, and continuously improve.',
            },
          ].map((phase) => (
            <div key={phase.step} className="text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-900/30">
                {phase.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
              <p className="text-gray-500">{phase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 text-center py-16 bg-[#111111] border border-[#d4a847]/10 rounded-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Ready to work together?
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
          I'm looking for my next full-time role in e-commerce management, digital marketing, or growth. Also open to freelance projects that make sense.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black rounded-xl hover:shadow-lg hover:shadow-amber-900/30 transition-all font-medium"
          >
            Get in Touch
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-3.5 border border-[#d4a847]/30 text-white rounded-xl hover:border-[#d4a847]/50 hover:bg-white/5 transition-all font-medium"
          >
            View Portfolio
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
