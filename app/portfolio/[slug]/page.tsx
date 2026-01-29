import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPortfolioPage, portfolioPages } from '@/lib/portfolio-pages';
import Image from 'next/image';
import ImageLightbox from '@/components/ImageLightbox';
import FormattedText from '@/components/FormattedText';

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
    <div>
      {/* Dark Header */}
      <section className="bg-[#1e1e1e] pt-2 pb-10">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <Link
            href="/portfolio"
            className="text-gray-500 hover:text-[#d4a847] text-sm transition-colors inline-flex items-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Portfolio
          </Link>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight gradient-text">{page.title}</h1>
          {page.subtitle && (
            <p className="mt-2 text-lg text-gray-400">{page.subtitle}</p>
          )}
          <p className="mt-4 text-gray-300 leading-relaxed">
            <FormattedText text={page.description} boldClassName="text-white" />
          </p>
          {page.tags && page.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {page.tags.map((tag, i) => (
                <span key={i} className="inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide border border-[#d4a847]/40 text-[#d4a847]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="space-y-16">
        {page.sections.map((section, index) => {
          const layout = section.layout || 'default';
          const isImageGrid = layout === 'image-grid';
          const isSectionHeader = layout === 'section-header' || (!section.content && !section.images && !section.metrics && !section.bullets);
          const isSideBySide = layout === 'side-by-side';
          const phoneAspect = section.phoneAspect;

          // Image grid layout: heading + grid of images
          if (isImageGrid) {
            const cols = section.gridCols || 5;
            const gridClass =
              cols === 1 ? 'grid-cols-1 max-w-2xl mx-auto'
              : cols === 2 ? 'grid-cols-1 md:grid-cols-2'
              : cols === 3 ? 'grid-cols-2 md:grid-cols-3'
              : cols === 4 ? 'grid-cols-2 md:grid-cols-4'
              : 'grid-cols-3 md:grid-cols-5';
            const aspectClass = phoneAspect
              ? 'aspect-[1/2]'
              : !section.imageAspect
                ? 'aspect-[4/5]'
                : '';
            const aspectStyle = section.imageAspect && !phoneAspect
              ? { aspectRatio: section.imageAspect }
              : undefined;

            return (
              <section key={index} className="pt-8">
                {section.heading && (
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                      {section.heading}
                    </h2>
                    <div className="mt-3 mx-auto w-16 h-0.5 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] rounded-full" />
                    {section.content && (
                      <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        <FormattedText text={section.content} />
                      </p>
                    )}
                  </div>
                )}
                {section.images && section.images.length > 0 && (
                  <div className={`grid ${gridClass} gap-3`}>
                    {section.images.map((img, i) => (
                      <ImageLightbox
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        className={`relative ${aspectClass} rounded-lg overflow-hidden bg-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300`}
                        style={aspectStyle}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          }

          // Side-by-side layout: image on one side, content on the other
          if (isSideBySide && section.images && section.images.length > 0) {
            const isEven = index % 2 === 0;
            const singleAspect = section.imageAspect ? '' : 'aspect-square';
            const singleStyle = section.imageAspect
              ? { aspectRatio: section.imageAspect }
              : undefined;

            return (
              <section key={index} className="border-t border-gray-100 pt-8">
                <div className={`grid md:grid-cols-2 gap-8 items-center ${isEven ? '' : 'md:[direction:rtl]'}`}>
                  {/* Image side */}
                  <div className={isEven ? '' : 'md:[direction:ltr]'} style={section.imageMaxWidth ? { maxWidth: section.imageMaxWidth } : undefined}>
                    {section.images.length === 1 ? (
                      <ImageLightbox
                        src={section.images[0].src}
                        alt={section.images[0].alt}
                        className={`relative ${singleAspect} rounded-xl overflow-hidden`}
                        style={singleStyle}
                        contain
                      />
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        {section.images.map((img, i) => (
                          <ImageLightbox
                            key={i}
                            src={img.src}
                            alt={img.alt}
                            className="relative aspect-[9/16] rounded-lg overflow-hidden bg-gray-100"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content side */}
                  <div className={isEven ? '' : 'md:[direction:ltr]'}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {section.heading}
                    </h2>
                    {section.subheading && (
                      <p className="text-sm text-gray-400 mb-4">{section.subheading}</p>
                    )}
                    {!section.subheading && <div className="mb-3" />}

                    {section.content && (
                      <p className="text-gray-600 leading-relaxed">
                        <FormattedText text={section.content} />
                      </p>
                    )}

                    {section.metrics && section.metrics.length > 0 && (
                      <div className="mt-6 grid grid-cols-3 gap-3">
                        {section.metrics.map((metric, i) => (
                          <div key={i} className="bg-[#1e1e1e] p-4 rounded-xl text-center">
                            <p className="text-2xl font-bold gradient-text">{metric.value}</p>
                            <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider font-medium">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {section.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <span className="text-blue-600 mt-1">•</span>
                            <FormattedText text={bullet} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </section>
            );
          }

          // Default layout
          return (
            <section key={index} className={isSectionHeader ? 'pt-8' : 'border-t border-gray-100 pt-8'}>
              {isSectionHeader ? (
                <div className="bg-[#1e1e1e] rounded-2xl py-8 px-8 md:px-12 max-w-4xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold text-white text-center uppercase tracking-wide">
                    {section.heading}
                  </h2>
                  <div className="mt-3 mx-auto w-16 h-0.5 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] rounded-full mb-6" />
                  {section.content && (
                    <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mb-6">
                      <FormattedText text={section.content} boldClassName="text-white" />
                    </p>
                  )}
                  {section.bullets && section.bullets.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-x-8 gap-y-4 max-w-3xl mx-auto">
                      {section.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                          <span className="text-[#d4a847] mt-0.5 flex-shrink-0">•</span>
                          <FormattedText text={bullet} boldClassName="text-[#d4a847]" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.heading}
                  </h2>

                  {section.content && (
                    <p className="text-gray-600 leading-relaxed">
                      <FormattedText text={section.content} />
                    </p>
                  )}

                  {/* Metrics */}
                  {section.metrics && section.metrics.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {section.metrics.map((metric, i) => (
                        <div key={i} className="bg-[#1e1e1e] p-5 rounded-xl text-center">
                          <p className="text-3xl font-bold gradient-text">{metric.value}</p>
                          <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider font-medium">{metric.label}</p>
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
                          <FormattedText text={bullet} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Images */}
                  {section.images && section.images.length > 0 && (() => {
                    const defaultAspect = section.imageAspect ? '' : 'aspect-[4/3]';
                    const defaultStyle = section.imageAspect
                      ? { aspectRatio: section.imageAspect }
                      : undefined;
                    const useContain = !!section.imageAspect;

                    return (
                      <div className={`mt-6 grid gap-4 ${
                        section.images.length === 1
                          ? 'grid-cols-1 max-w-2xl'
                          : section.images.length === 2
                            ? 'grid-cols-1 md:grid-cols-2'
                            : section.images.length <= 4
                              ? 'grid-cols-2 md:grid-cols-2'
                              : 'grid-cols-2 md:grid-cols-4'
                      }`}>
                        {section.images.map((img, i) => (
                          <ImageLightbox
                            key={i}
                            src={img.src}
                            alt={img.alt}
                            className={`relative ${defaultAspect} rounded-lg overflow-hidden border border-gray-200 bg-gray-50`}
                            style={defaultStyle}
                            contain={useContain}
                          />
                        ))}
                      </div>
                    );
                  })()}
                </>
              )}
            </section>
          );
        })}
      </div>
      </div>
    </div>
  );
}
