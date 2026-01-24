import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Jesse Johnson is a digital marketer and e-commerce manager in Seattle. 6 years on Shopify, over $2M in sales managed.',
};

const workHistory = [
  {
    role: 'E-commerce Manager',
    company: 'Quality Sewing',
    period: '2022 - Present',
    achievement: '5K→22K organic traffic, $2M+/year in sales, 5000+ products',
  },
  {
    role: 'Freelance Consultant',
    company: 'Self-Employed',
    period: '2022 - Present',
    achievement: 'SEO, design, 3D mockups for pharma, finance, and e-commerce clients',
  },
  {
    role: 'Founder',
    company: 'Luxury Wall Art & The Dope Art',
    period: '2019 - Present',
    achievement: '$120K in sales, 9,000+ digital assets, 2,700+ products',
  },
  {
    role: 'Real Estate Agent',
    company: 'Premiere Property Group',
    period: '2013 - 2019',
    achievement: '$20M in closed sales',
  },
  {
    role: 'Customer Service',
    company: 'Netflix',
    period: '2011 - 2013',
    achievement: 'Top 1% in satisfaction scores',
  },
];

const skills = {
  'SEO & Analytics': [
    'Google Analytics',
    'Search Console',
    'Ahrefs',
    'Screaming Frog',
    'Keyword Research',
    'YouTube SEO',
  ],
  'E-commerce': [
    'Shopify',
    'Etsy',
    'Amazon',
    'Walmart',
    'TikTok Shop',
    'WooCommerce',
  ],
  'Design': [
    'Photoshop',
    'Illustrator',
    'Figma',
    'Canva',
    'Premiere Pro',
    '3D Mockups',
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
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg flex-shrink-0">
            <Image
              src="/images/headshots/jesse-pfp.jpg"
              alt="Jesse Johnson"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">About Me</h1>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          I've been selling stuff online since I was 15. Started on eBay, moved to Craigslist, eventually figured out real e-commerce. These days I manage the digital side of a sewing retailer in Seattle.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          At Quality Sewing, I handle everything from product listings to SEO to conversion optimization. When I started, they had around 5K organic visitors a month. Now it's 22K. We've also cut ad spend significantly since most traffic is now organic.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          On the side, I run Luxury Wall Art and The Dope Art, two canvas art brands that have done about $120K in sales combined. I also like building tools. My latest one lets you search 4,000+ famous paintings to find where they're displayed.
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
          I want a role where I can own outcomes. E-commerce management, digital marketing, growth. Something where I can actually move numbers, not just check boxes.
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Based in Seattle, happy to work remote. If you need someone who can grow traffic, improve conversion rates, and figure out the rest as they go, I'm your guy.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Let's Talk
          </Link>
        </div>
      </section>
    </div>
  );
}
