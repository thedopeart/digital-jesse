import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';

const stats = [
  { value: '$2.6M+', label: 'Total Sales' },
  { value: '6 Years', label: 'Shopify Experience' },
  { value: '340%', label: 'Traffic Growth' },
  { value: '10+', label: 'Tools Built' },
];

const featuredProjects = [
  {
    slug: 'quality-sewing',
    title: 'Quality Sewing',
    description: 'E-commerce Manager driving $2M+/year in revenue for a family-owned sewing retailer.',
    metric: '$2M+/year revenue, 340% traffic growth',
    tags: ['Shopify', 'SEO', 'E-commerce'],
  },
  {
    slug: 'masterpieces',
    title: 'Masterpiece Locator',
    description: 'Full art discovery platform with 4,094+ paintings across 455+ museums worldwide.',
    metric: '4,094+ paintings indexed',
    tags: ['Full-Stack', 'Database', 'SEO'],
  },
  {
    slug: 'luxury-wall-art',
    title: 'Luxury Wall Art',
    description: 'Built and scaled a Shopify + Etsy art store from zero to $120K in revenue.',
    metric: '$120K revenue, 9,200 keywords',
    tags: ['Shopify', 'Etsy', 'Paid Ads'],
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Jesse Johnson
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-2xl">
          Digital marketer and e-commerce specialist. I build brands that grow.
        </p>
        <p className="mt-4 text-gray-500">
          Currently E-commerce Manager at{' '}
          <a
            href="https://qualitysewing.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Quality Sewing
          </a>
          {' '}in Seattle, WA.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
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
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-2 text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Work</h2>
          <Link
            href="/portfolio"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View all →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Looking for your next hire?
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            I'm open to full-time opportunities in digital marketing, e-commerce, and growth roles.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
