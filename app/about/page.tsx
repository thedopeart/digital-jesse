import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Jesse Johnson is a digital marketer and e-commerce manager in Seattle. 6 years on Shopify, $2.6M+ in sales, 340% organic traffic growth.',
};

const highlights = [
  { value: '$2.6M+', label: 'Total Sales Managed', color: 'from-blue-500 to-blue-600' },
  { value: '340%', label: 'Organic Traffic Growth', color: 'from-green-500 to-green-600' },
  { value: '6 Years', label: 'Shopify Experience', color: 'from-purple-500 to-purple-600' },
  { value: '5,000+', label: 'Products Managed', color: 'from-orange-500 to-orange-600' },
];

const workHistory = [
  {
    role: 'E-commerce Manager',
    company: 'Quality Sewing',
    companyUrl: 'https://qualitysewing.com',
    period: '2022 - Present',
    location: 'Seattle, WA',
    description: 'Running the full e-commerce operation for a family-owned sewing and vacuum retailer with 50+ years of history.',
    achievements: [
      'Grew organic traffic from 5K to 22K monthly visitors (340% increase)',
      'Managing $2M+ in annual online revenue across multiple channels',
      'Oversee 5,000+ product catalog with pricing, inventory, and merchandising',
      'Shifted strategy from paid ads to SEO, dramatically reducing ad spend while increasing revenue',
      'Built 10+ custom tools including interactive calculators that drive engagement and reduce bounce rate',
      'Expanded to multi-channel selling: Amazon, Walmart, TikTok Shop',
      'Developed YouTube SEO strategy for product tutorials and brand content',
    ],
    tags: ['Shopify', 'SEO', 'Multi-channel', 'Team Leadership'],
  },
  {
    role: 'Freelance Consultant',
    company: 'Self-Employed',
    period: '2022 - Present',
    location: 'Remote',
    description: 'Providing SEO, design, and digital marketing services to clients in pharma, finance, and e-commerce.',
    achievements: [
      'Rocky Mountain Steel: Full branding package including company profile, infographics, case studies',
      'American Nutriceuticals: SEO blogging, keyword research, 3D product mockups, content strategy',
      'Multiple e-commerce clients: Store audits, conversion optimization, paid ad management',
    ],
    tags: ['SEO', 'Design', 'Consulting'],
  },
  {
    role: 'Founder & Operator',
    company: 'Luxury Wall Art & The Dope Art',
    companyUrl: 'https://thedopeart.com',
    period: '2019 - Present',
    location: 'Online',
    description: 'Built two profitable digital art brands from scratch, handling everything from product creation to marketing to fulfillment.',
    achievements: [
      '$120K+ in combined revenue ($67K Shopify, $53K Etsy)',
      'Grew The Dope Art to 200K+ social media followers across platforms',
      'Created 9,000+ digital art assets and 2,700+ products',
      'Built domain authority from 0 to DA 20, ranking for 9,200+ keywords',
      'Featured in ShoutOut LA and collaborated with TidalWave Productions on Tiger King comic',
      'Developed Masterpiece Locator tool: 4,094 paintings across 455+ museums',
    ],
    tags: ['E-commerce', 'Brand Building', 'Digital Art', 'SEO'],
  },
  {
    role: 'Real Estate Agent',
    company: 'Premiere Property Group',
    period: '2013 - 2019',
    location: 'Portland, OR',
    description: 'Residential real estate sales with focus on first-time homebuyers and investment properties.',
    achievements: [
      'Closed $20M+ in total sales volume',
      'Developed client relationships through digital marketing and referral networks',
      'Managed full transaction lifecycle from lead generation to closing',
    ],
    tags: ['Sales', 'Client Relations', 'Marketing'],
  },
  {
    role: 'Customer Service Representative',
    company: 'Netflix',
    period: '2011 - 2013',
    location: 'Hillsboro, OR',
    description: 'Frontline customer support during Netflix\'s rapid growth phase, handling billing, technical issues, and account management.',
    achievements: [
      'Ranked in top 1% for customer satisfaction scores',
      'Recognized for creative problem-solving and de-escalation skills',
      'Trained new team members on company policies and best practices',
    ],
    tags: ['Customer Service', 'Problem Solving'],
  },
];

const skillCategories = [
  {
    title: 'E-commerce & Platforms',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    skills: [
      { name: 'Shopify', level: 95 },
      { name: 'Etsy', level: 90 },
      { name: 'Amazon Seller Central', level: 85 },
      { name: 'Walmart Marketplace', level: 80 },
      { name: 'TikTok Shop', level: 75 },
      { name: 'WooCommerce', level: 70 },
    ],
  },
  {
    title: 'SEO & Analytics',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    skills: [
      { name: 'Google Analytics 4', level: 95 },
      { name: 'Google Search Console', level: 95 },
      { name: 'Ahrefs', level: 90 },
      { name: 'Screaming Frog', level: 85 },
      { name: 'SEMrush', level: 80 },
      { name: 'YouTube SEO', level: 85 },
    ],
  },
  {
    title: 'Design & Creative',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    skills: [
      { name: 'Adobe Photoshop', level: 95 },
      { name: 'Adobe Illustrator', level: 85 },
      { name: 'Figma', level: 80 },
      { name: 'Canva', level: 90 },
      { name: 'Adobe Premiere Pro', level: 75 },
      { name: '3D Mockups', level: 85 },
    ],
  },
  {
    title: 'Marketing & Ads',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    skills: [
      { name: 'Google Ads', level: 85 },
      { name: 'Meta Ads (Facebook/Instagram)', level: 90 },
      { name: 'Email Marketing (Klaviyo)', level: 85 },
      { name: 'Content Strategy', level: 90 },
      { name: 'Social Media Management', level: 95 },
      { name: 'Influencer Marketing', level: 75 },
    ],
  },
];

const values = [
  {
    title: 'Results Over Activity',
    description: 'I care about moving numbers, not checking boxes. Every project starts with "what does success look like?" and works backward from there.',
    icon: '🎯',
  },
  {
    title: 'Own the Outcome',
    description: 'I don\'t wait to be told what to do. If something needs fixing, I fix it. If there\'s an opportunity, I chase it.',
    icon: '💪',
  },
  {
    title: 'Learn by Doing',
    description: 'I\'ve built multiple businesses from scratch. That hands-on experience is worth more than any certification.',
    icon: '🔧',
  },
  {
    title: 'Data-Informed Decisions',
    description: 'Gut feelings are fine for brainstorming. But when it\'s time to commit resources, I want data backing the decision.',
    icon: '📊',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Image & Quick Facts */}
            <div className="text-center md:text-left">
              <div className="relative inline-block">
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-2xl mx-auto md:mx-0">
                  <Image
                    src="/images/headshots/jesse-pfp.jpg"
                    alt="Jesse Johnson"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-2 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">Seattle, WA</p>
                  <p className="text-xs text-gray-500">Available for hire</p>
                </div>
              </div>
            </div>

            {/* Right - Bio */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Hey, I'm Jesse
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-4">
                I've been selling things online since I was 15, starting on eBay and eventually building multiple e-commerce brands. Now I manage digital operations for a Seattle retailer while running my own projects on the side.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                At Quality Sewing, I took organic traffic from 5K to 22K monthly visitors while managing $2M+ in annual sales. I handle everything: product catalog, SEO, paid ads, email, social, and the custom tools that tie it all together.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                I also run The Dope Art and Luxury Wall Art, two art brands I built from scratch to $120K+ in sales with 200K+ social followers. And when I see a problem worth solving, I build tools for it. Like my Masterpiece Locator that indexes 4,000+ paintings across 455 museums.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/portfolio"
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  View My Work
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="mt-1 text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work History */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Work Experience</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            From customer service to real estate to e-commerce, each role taught me something different about business, people, and getting things done.
          </p>
        </div>

        <div className="space-y-8">
          {workHistory.map((job, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{job.role}</h3>
                    {index === 0 && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-gray-600">
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                    <span className="text-gray-400 mx-2">•</span>
                    <span className="text-gray-500">{job.location}</span>
                  </p>
                </div>
                <p className="text-gray-500 font-medium whitespace-nowrap">{job.period}</p>
              </div>

              <p className="text-gray-600 mb-6">{job.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Key Achievements</h4>
                <ul className="grid md:grid-cols-2 gap-2">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Education</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">UO</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">University of Oregon</h3>
                <p className="text-gray-600 mt-1">Bachelor of Science in Political Science</p>
                <p className="text-gray-500 text-sm mt-2">
                  Minors in Business Administration and Computer Science
                </p>
                <p className="text-gray-400 text-sm mt-2">Class of 2012 • Eugene, OR</p>
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                  The poli-sci degree taught me how to research, analyze, and argue a position. The business minor gave me fundamentals. The CS minor sparked my interest in building things. The combination has served me well in e-commerce where you're constantly analyzing data, making decisions, and building solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Skills & Tools</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            I'm a generalist by nature. I'd rather be good at many things than great at one. Here's what I work with regularly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How I Work</h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              These are the principles that guide how I approach work. They're not just words on a page; they're how I actually operate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I'm Looking For */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What I'm Looking For</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            I want a role where I can own outcomes and actually move the needle. E-commerce management, digital marketing, growth. A place where good ideas get implemented, not stuck in committee.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Based in Seattle, open to remote. Full-time preferred, but I'll consider the right freelance project. If you need someone who can grow traffic, improve conversion rates, and build the tools to make it happen, let's talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
            >
              Get in Touch
            </Link>
            <a
              href="/resume.pdf"
              className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
