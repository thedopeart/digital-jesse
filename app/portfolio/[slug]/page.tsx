import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPortfolioPage, portfolioPages } from '@/lib/portfolio-pages';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPortfolioPage(slug);
  if (!page) return { title: 'Not Found' };

  return {
    title: page.title,
    description: page.description,
  };
}

const categoryColors: Record<string, string> = {
  seo: 'bg-[#282F59]',
  design: 'bg-[#4A5568]',
  ecommerce: 'bg-[#2D3748]',
  art: 'bg-[#553C9A]',
  brands: 'bg-[#1A365D]',
};

const categoryLabels: Record<string, string> = {
  seo: 'SEO & Content',
  design: 'Design',
  ecommerce: 'E-Commerce & Social',
  art: 'Digital Art',
  brands: 'Brand Management',
};

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getPortfolioPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Back Link */}
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>

      {/* Header */}
      <div className="mb-12">
        <span className={`inline-block px-3 py-1 text-sm text-white rounded-full mb-4 ${categoryColors[page.category]}`}>
          {categoryLabels[page.category]}
        </span>
        <h1 className="text-4xl font-bold text-gray-900">{page.title}</h1>
        {page.subtitle && (
          <p className="mt-2 text-xl text-gray-500">{page.subtitle}</p>
        )}
        <p className="mt-4 text-lg text-gray-600">{page.description}</p>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {page.sections.map((section, index) => (
          <section key={index} className="border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.heading}</h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>

            {/* Metrics */}
            {section.metrics && section.metrics.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.metrics.map((metric, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-500">{metric.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Bullets */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="mt-6 space-y-2">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <span className="text-blue-600 mt-1">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {/* Images */}
            {section.images && section.images.length > 0 && (
              <div className={`mt-6 grid gap-4 ${section.images.length === 1 ? 'grid-cols-1' : section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                {section.images.map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 p-8 bg-gray-50 rounded-lg text-center">
        <h3 className="text-xl font-bold text-gray-900">Want similar results?</h3>
        <p className="mt-2 text-gray-600">Let's talk about how I can help with your project.</p>
        <Link
          href="/contact"
          className="mt-4 inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
