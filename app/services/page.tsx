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
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
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
    icon: (
      <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
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

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          What I Do
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          E-commerce management, digital marketing, and project leadership. I help businesses grow online through strategic execution and hands-on management.
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-16">
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`scroll-mt-20 ${index % 2 === 1 ? 'bg-gray-50 -mx-6 px-6 py-12 rounded-2xl' : ''}`}
          >
            <div className={`grid md:grid-cols-2 gap-10 items-start ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                <div className="flex items-center gap-4 mb-4">
                  {service.icon}
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {service.title}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats Card */}
              <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-8 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                  Results & Experience
                </h3>
                <div className="space-y-6">
                  {service.stats.map((stat, i) => (
                    <div key={i} className="border-l-4 border-blue-500 pl-4">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Tools Section */}
      <section className="mt-20 pt-12 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Tools & Platforms
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {tools.map((tool) => (
            <span
              key={tool.name}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {tool.name}
            </span>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="mt-20 bg-gray-900 text-white -mx-6 px-6 py-16 rounded-2xl">
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
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-4">
                {phase.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
              <p className="text-gray-400 text-sm">{phase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 text-center py-12 bg-gray-50 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Ready to work together?
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          I'm looking for my next full-time role in e-commerce management, digital marketing, or growth. Also open to freelance projects that make sense.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Get in Touch
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium"
          >
            View Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
}
