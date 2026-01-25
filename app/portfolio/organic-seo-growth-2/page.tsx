import { Metadata } from 'next';
import Link from 'next/link';
import ImageLightbox from '@/components/ImageLightbox';

export const metadata: Metadata = {
  title: 'SEO Success: The Dope Art',
  description: 'Building organic traffic for a digital art brand through strategic keyword targeting, consistent content development, and technical SEO optimization over a two-year period.',
};

export default function OrganicSeoGrowth2Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back Link */}
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Portfolio
      </Link>

      {/* Header */}
      <div className="mb-10 text-center">
        <span className="inline-block px-4 py-1.5 text-sm font-medium text-white rounded-full mb-4 bg-[#282F59] shadow-sm">
          SEO & Content
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Driving SEO Success</h1>
        <p className="mt-2 text-gray-500">(The Dope Art Case Study)</p>
      </div>

      {/* Section 1: The Results of On-Page SEO - Side by Side */}
      <section className="mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left - Images Stacked */}
          <div className="space-y-4">
            <ImageLightbox
              src="/images/portfolio/detail/seo/tda-organic-traffic.png"
              alt="The Dope Art Organic Traffic Overview"
              className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white"
              contain
            />
            <ImageLightbox
              src="/images/portfolio/detail/seo/tda-seo.jpg"
              alt="The Dope Art SEO Performance"
              className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white"
              contain
            />
          </div>

          {/* Right - Text */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">The Results of On-Page SEO</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Two years ago, I set out to improve the SEO for{' '}
              <a href="https://thedopeart.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-700 underline">
                The Dope Art
              </a>
              , starting with just a handful of ranking keywords and minimal organic traffic. By focusing on strategic keyword integration, on-page optimization, and regular, targeted blog posts, I was able to dramatically increase the site&apos;s visibility.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              What began as a small online presence has now grown to <strong className="font-semibold text-gray-900">well over 5,000 monthly organic visitors</strong>, with steady growth continuing month after month.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Additionally, growing from 10 to <strong className="font-semibold text-gray-900">over 120 keywords in the top 3</strong>, and 590 in the top 10 has dramatically enhanced steady organic traffic performance.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-gray-900">5,000+</p>
                <p className="text-xs text-gray-500">Monthly Organic Visitors</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-gray-900">120+</p>
                <p className="text-xs text-gray-500">Top 3 Keywords</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xl font-bold text-gray-900">590</p>
                <p className="text-xs text-gray-500">Top 10 Keywords</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: KW Strategy Banner */}
      <section className="mb-12">
        <div className="bg-[#282F59] text-white text-center py-4 rounded-lg mb-6">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-wide">KW Strategy, Content Development & SEO</h2>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">
          To grow the site&apos;s search engine rankings, a holistic strategy was implemented, focusing on keyword research, on-page optimization, and technical SEO. This approach targeted both high-traffic and niche keywords relevant to the brand, while also ensuring that the site&apos;s structure was fully optimized for search engines and user engagement.
        </p>

        {/* Bullet Points - 2 Column */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
          <li className="flex items-start gap-2 text-gray-600 text-sm">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong className="text-gray-900 font-semibold underline">High-traffic keywords</strong> targeting popular search terms</span>
          </li>
          <li className="flex items-start gap-2 text-gray-600 text-sm">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong className="text-gray-900 font-semibold underline">Niche keywords</strong> relevant to specific products or services</span>
          </li>
          <li className="flex items-start gap-2 text-gray-600 text-sm">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong className="text-gray-900 font-semibold underline">Content optimization</strong> for search engines and users</span>
          </li>
          <li className="flex items-start gap-2 text-gray-600 text-sm">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong className="text-gray-900 font-semibold underline">Meta tags</strong> for improved search engine visibility</span>
          </li>
          <li className="flex items-start gap-2 text-gray-600 text-sm">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong className="text-gray-900 font-semibold underline">Optimized site structure</strong> for better crawling and indexing</span>
          </li>
          <li className="flex items-start gap-2 text-gray-600 text-sm">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong className="text-gray-900 font-semibold underline">Technical SEO audits</strong> to ensure site performance</span>
          </li>
        </ul>
      </section>

      {/* Section 3: Massive Organic Traffic Growth - Side by Side */}
      <section className="mb-12 border-t border-gray-200 pt-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Text */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">Massive Organic Traffic Growth</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Over the past year, Google Analytics has shown a <strong className="font-semibold text-gray-900">544% increase in organic search</strong> traffic for The Dope Art, LLC, reaching 46,000 sessions.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              This growth stems from strategic keyword targeting, content optimization, and diligent monitoring, also <strong className="font-semibold text-gray-900">boosting direct traffic by 53.9%</strong>.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              This growth underscores the power of a well-executed SEO strategy in transforming an online presence and <strong className="font-semibold text-gray-900">driving consistent traffic growth</strong>.
            </p>
            <p className="text-gray-500 text-sm italic">- Last updated Aug 2024</p>

            {/* Key Metrics */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="text-2xl font-bold text-gray-900">544%</p>
                <p className="text-sm text-gray-500">Organic Search Growth</p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <p className="text-2xl font-bold text-gray-900">53.9%</p>
                <p className="text-sm text-gray-500">Direct Traffic Growth</p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div>
            <ImageLightbox
              src="/images/portfolio/detail/seo/tda-traffic.png"
              alt="The Dope Art Traffic Growth Chart"
              className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white"
              contain
            />
          </div>
        </div>
      </section>

      {/* Section 4: Additional Insights Gallery */}
      <section className="mb-12 border-t border-gray-200 pt-10">
        <h2 className="text-lg font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">Additional Insights</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ImageLightbox
            src="/images/portfolio/detail/seo/tda-organic-traffic-2.jpg"
            alt="Google Analytics Traffic Data"
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 bg-white"
            contain
          />
          <ImageLightbox
            src="/images/portfolio/detail/seo/ubersuggest.png"
            alt="Ubersuggest Keyword Research"
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 bg-white"
            contain
          />
          <ImageLightbox
            src="/images/portfolio/detail/seo/seo-score-100.png"
            alt="SEO Score 100"
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 bg-white"
            contain
          />
          <ImageLightbox
            src="/images/portfolio/detail/seo/blog-luxury-art.jpg"
            alt="Blog Content: Luxury Art"
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 bg-white"
            contain
          />
          <ImageLightbox
            src="/images/portfolio/detail/seo/blog-macabre.jpg"
            alt="Blog Content: Macabre Art"
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 bg-white"
            contain
          />
          <ImageLightbox
            src="/images/portfolio/detail/seo/blog-queen-spades.jpg"
            alt="Blog Content: Queen of Spades"
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 bg-white"
            contain
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 text-center py-8 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900">Want similar results?</h2>
        <p className="mt-1 text-gray-600 text-sm">Let&apos;s talk about how I can help with your project.</p>
        <div className="mt-4">
          <Link
            href="/contact"
            className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
