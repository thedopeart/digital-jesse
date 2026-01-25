import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';

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
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg flex-shrink-0">
            <Image
              src="/images/headshots/jesse-pfp.jpg"
              alt="Jesse Johnson"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Jesse Johnson
            </h1>
            <p className="mt-3 text-xl text-gray-600 max-w-xl">
              E-commerce manager by day. I run the digital side of things for a sewing retailer in Seattle. On the side, I build tools and grow brands.
            </p>
            <p className="mt-3 text-gray-500">
              Currently at{' '}
              <a
                href="https://qualitysewing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Quality Sewing
              </a>
              . Open to new opportunities.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/portfolio"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            See My Work
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
        <div className="max-w-7xl mx-auto px-6 py-12">
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
      <section className="max-w-7xl mx-auto px-6 py-20">
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
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Want to work together?
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            I'm looking for my next full-time role in e-commerce, digital marketing, or growth. Remote or Seattle area.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Let's Talk
          </Link>
        </div>
      </section>
    </div>
  );
}
