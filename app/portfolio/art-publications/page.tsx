import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Art Publications',
  description: 'Featured publications, media coverage, and brand collaborations that have expanded reach and established credibility in the digital art space.',
};

export default function ArtPublicationsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
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
      <div className="mb-16 text-center">
        <span className="inline-block px-3 py-1 text-sm text-white rounded-full mb-4 bg-[#553C9A]">
          Digital Art
        </span>
        <h1 className="text-5xl font-bold text-gray-900">Art Publications</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Press Coverage & Brand Partnerships
        </p>
      </div>

      {/* Tiger King Section - Side by Side */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/portfolio/detail/art/tiger-king-cover.jpg"
              alt="Tiger King Comic Book Cover Art"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tiger King Comic Book Cover Art</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              When <strong className="font-semibold text-gray-900">Tiger King</strong> became a cultural phenomenon in 2020, I partnered with{' '}
              <a href="https://tidalwavecomics.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">
                TidalWave Productions
              </a>{' '}
              to create a comic book that captured the show&apos;s wild energy.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              The collaboration gained traction, with mentions from cast members and media outlets like{' '}
              <a href="https://www.tmz.com/2020/05/31/tiger-king-comic-book-first-pages-special-edition-cover-joe-exotic-origin-story-carole-baskin/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">
                TMZ
              </a>
              . This project was a great example of leveraging current trends to create engaging content that resonates with a broad audience.
            </p>
          </div>
        </div>
      </section>

      {/* ShoutOut LA Section - Editorial Style */}
      <section className="mb-20 border-t border-gray-200 pt-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Quote */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Headline</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              &quot;Jesse Johnson, the visionary behind thedopeart.com, attributes his success to three critical elements: passion, organization, and balance. With a fervor for creating distinctive pieces of art, he devoted two years to honing his skills, eventually finding a unique style resonating with entrepreneurial spirits seeking inspiring decor.&quot;
            </p>
            <a
              href="https://shoutoutla.com/meet-jesse-johnson-digital-artist/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border-2 border-gray-900 rounded text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wide"
            >
              View All
            </a>
          </div>

          {/* Right Column - Article Preview */}
          <div>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              {/* ShoutOut LA Header */}
              <div className="bg-white p-4 border-b border-gray-100">
                <h3 className="text-2xl font-serif font-normal text-gray-900 tracking-tight">SHOUTOUT LA</h3>
                <div className="h-px bg-gray-300 w-12 mt-2"></div>
              </div>

              {/* Article Card */}
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Local Stories</p>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Meet Jesse Johnson: Digital Artist</h4>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/portfolio/detail/art/shoutout-la-canvases.jpg"
                    alt="Jesse with Canvas Art Collection"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborations Header */}
      <section className="mb-12 pt-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center uppercase tracking-widest">
          Collaborations
        </h2>
      </section>

      {/* Jondo Prints Section - Side by Side */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/portfolio/detail/art/nft-la-booth.jpg"
              alt="NFT LA Booth with Jondo Prints"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Jondo Prints</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              For the 2022 NFT LA event, I partnered with Jondo Prints to create an interactive booth showcasing high-quality digital prints from{' '}
              <a href="https://thedopeart.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">
                The Dope Art
              </a>{' '}
              and{' '}
              <a href="https://eternalroyals.io/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">
                Eternal Royals
              </a>
              .
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              I designed our booth layout and featured artwork, blending physical art with digital innovation. This collaboration was a fantastic way to highlight both my art and Jondo&apos;s print quality, while engaging with the NFT and digital art community, expanding The Dope Art&apos;s reach.
            </p>
          </div>
        </div>
      </section>

      {/* NFT LA Gallery */}
      <section className="mb-20 border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">NFT LA</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: '/images/portfolio/detail/art/nft-la.jpg', alt: 'NFT LA Event Display' },
            { src: '/images/portfolio/detail/art/nft-la-booth-2.jpg', alt: 'NFT LA Booth Setup' },
            { src: '/images/portfolio/detail/art/nft-la-booth-3.jpg', alt: 'NFT LA Art Display' },
            { src: '/images/portfolio/detail/art/nft-la-booth-4.jpg', alt: 'NFT LA Booth Overview' },
            { src: '/images/portfolio/detail/art/nft-la-booth-5.jpg', alt: 'Eternal Royals Display' },
            { src: '/images/portfolio/detail/art/nft-la-booth-6.jpg', alt: 'Canvas Prints at NFT LA' },
            { src: '/images/portfolio/detail/art/nft-la-booth-7.jpg', alt: 'Art Collection Display' },
            { src: '/images/portfolio/detail/art/nft-la-booth-8.jpg', alt: 'Event Booth with Visitors' },
          ].map((img, i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>

      {/* Wall Street Prints Section - Full Width */}
      <section className="mb-20 border-t border-gray-200 pt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Wall Street Prints</h3>
        <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl">
          My collaboration with{' '}
          <a href="https://wallstreetprints.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 underline">
            Wall Street Prints
          </a>{' '}
          reflects the depth of my creativity over the years. I&apos;ve channeled my artistic passion into producing digital art using Photoshop, each piece tailored to resonate with the distinct character and needs of different businesses. The positive reception to these characters serves as a testament to the power of creative digital art in brand storytelling and engagement.
        </p>

        {/* Bull Bear Image - Centered */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/portfolio/detail/art/bull-bear-collab.png"
              alt="Bull and Bear Collaboration Art"
              fill
              className="object-contain bg-white"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-20 p-12 bg-gray-50 rounded-2xl text-center">
        <h3 className="text-2xl font-bold text-gray-900">Want similar results?</h3>
        <p className="mt-3 text-lg text-gray-600">Let&apos;s talk about how I can help with your project.</p>
        <Link
          href="/contact"
          className="mt-6 inline-block px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
