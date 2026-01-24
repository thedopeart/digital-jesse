import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Jesse Johnson is a digital marketer and e-commerce specialist based in Seattle. 6 years Shopify experience, $2.6M+ in sales.',
};

const workHistory = [
  {
    role: 'E-commerce Manager',
    company: 'Quality Sewing',
    period: '2022 - Present',
    achievement: '$2M+/year revenue, 340% organic traffic growth',
  },
  {
    role: 'Business Consultant',
    company: 'Self-Employed',
    period: '2022 - Present',
    achievement: 'Freelance SEO, design, content for Pharma, Finance, E-commerce',
  },
  {
    role: 'Founder',
    company: 'Luxury Wall Art & The Dope Art',
    period: '2019 - Present',
    achievement: '$120K+ revenue, 9,000+ digital assets, 2,700+ products',
  },
  {
    role: 'Real Estate Agent',
    company: 'Premiere Property Group',
    period: '2013 - 2019',
    achievement: '$20M in closed sales',
  },
  {
    role: 'Customer Service Representative',
    company: 'Netflix',
    period: '2011 - 2013',
    achievement: 'Top 1% for satisfaction and problem-solving',
  },
];

const skills = {
  'SEO & Analytics': [
    'Google Analytics',
    'Google Search Console',
    'Ahrefs',
    'Screaming Frog',
    'Keyword Research',
    'YouTube SEO',
  ],
  'E-commerce': [
    'Shopify (6 years)',
    'Etsy',
    'Amazon',
    'Walmart Marketplace',
    'TikTok Shop',
    'WooCommerce',
  ],
  'Design & Creative': [
    'Photoshop',
    'Illustrator',
    'Figma',
    'Canva',
    'Premiere Pro',
    '3D Modeling',
  ],
  'Marketing': [
    'Google Ads',
    'Meta Ads',
    'Email Marketing',
    'Content Strategy',
    'Social Media',
  ],
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Intro */}
      <section className="max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900">About Me</h1>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          I'm Jesse Johnson, a digital marketer and e-commerce specialist based in Seattle.
          I've been building and selling online since I was 15, starting with eBay and growing
          into multiple six-figure e-commerce brands.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Currently, I manage all e-commerce operations at Quality Sewing, a family-owned
          sewing retailer. I grew their organic traffic from 5K to 22K monthly visitors
          while reducing ad spend through strategic SEO investments.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          I also run Luxury Wall Art and The Dope Art, my own canvas art brands that have
          generated over $120K in revenue. On the side, I build tools like the Masterpiece
          Locator, a database of 4,094+ paintings across 455 museums worldwide.
        </p>
      </section>

      {/* Education */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-100">
          <p className="font-semibold text-gray-900">University of Oregon</p>
          <p className="text-gray-600 mt-1">BS Political Science</p>
          <p className="text-gray-500 text-sm mt-1">
            Minors: Business Administration, Computer Science
          </p>
          <p className="text-gray-400 text-sm mt-2">Class of 2012</p>
        </div>
      </section>

      {/* Work History */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Work History</h2>
        <div className="mt-6 space-y-6">
          {workHistory.map((job, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-900">{job.role}</p>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <p className="text-gray-400 text-sm">{job.period}</p>
              </div>
              <p className="mt-3 text-blue-600 text-sm font-medium">
                {job.achievement}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">Skills & Tools</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What I'm Looking For */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900">What I'm Looking For</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          I'm open to full-time opportunities in digital marketing, e-commerce management,
          and growth roles. I'm based in Seattle but open to remote work.
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed">
          I thrive in roles where I can own outcomes, build tools, and make data-driven
          decisions. If you're looking for someone who can grow traffic, optimize conversions,
          and think strategically about e-commerce, let's talk.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
