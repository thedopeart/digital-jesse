import { Metadata } from 'next';
import Link from 'next/link';
import ImageLightbox from '@/components/ImageLightbox';

export const metadata: Metadata = {
  title: 'Art Publications',
  description: 'Featured publications, media coverage, and brand collaborations that have expanded reach and established credibility in the digital art space.',
};

export default function ArtPublicationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
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
      <div className="mb-12 text-center py-8 bg-gradient-to-b from-purple-50 to-white rounded-xl">
        <span className="inline-block px-4 py-1.5 text-sm font-medium text-white rounded-full mb-4 bg-[#553C9A] shadow-sm">
          Digital Art
        </span>
        <h1 className="text-4xl font-bold text-gray-900">Art Publications</h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Press coverage, media features, and brand partnerships that have expanded reach and credibility in the digital art space.
        </p>
      </div>

      {/* Tiger King Section */}
      <section className="mb-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <ImageLightbox
            src="/images/portfolio/detail/art/tiger-king-cover.jpg"
            alt="Tiger King Comic Book Cover Art"
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
          />

          {/* Text */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tiger King Comic Book Cover Art</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              When <strong className="font-semibold text-gray-900">Tiger King</strong> became a cultural phenomenon in 2020, I partnered with{' '}
              <a href="https://tidalwavecomics.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-700 underline">
                TidalWave Productions
              </a>{' '}
              to create a comic book that captured the show&apos;s wild energy. My artwork was used as variant cover art for their Tiger King comic book series.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The collaboration gained traction, with mentions from cast members and media outlets like{' '}
              <a href="https://www.tmz.com/2020/05/31/tiger-king-comic-book-first-pages-special-edition-cover-joe-exotic-origin-story-carole-baskin/" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-700 underline">
                TMZ
              </a>
              . This project showed how quickly you can capitalize on cultural moments to create relevant, engaging content.
            </p>
          </div>
        </div>
      </section>

      {/* ShoutOut LA Section */}
      <section className="mb-14 border-t border-gray-200 pt-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Column - About the Feature */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ShoutOut LA Feature</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              I was featured in{' '}
              <a href="https://shoutoutla.com/meet-jesse-johnson-digital-artist/" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-700 underline">
                ShoutOut LA
              </a>
              , a publication highlighting entrepreneurs and creatives in the Los Angeles area. The interview covered my journey building The Dope Art, the challenges of running an art business, and my approach to balancing creativity with commerce.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4 italic border-l-4 border-gray-300 pl-4">
              &quot;Jesse Johnson attributes his success to three critical elements: passion, organization, and balance. With a fervor for creating distinctive pieces of art, he devoted two years to honing his skills, eventually finding a unique style resonating with entrepreneurial spirits seeking inspiring decor.&quot;
            </p>
            <a
              href="https://shoutoutla.com/meet-jesse-johnson-digital-artist/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
            >
              Read the full article
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Right Column - Article Preview */}
          <div>
            <a
              href="https://shoutoutla.com/meet-jesse-johnson-digital-artist/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200"
            >
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 group-hover:bg-gray-100 transition-colors">
                <h3 className="text-xl font-serif text-gray-900">SHOUTOUT LA</h3>
                <div className="h-px bg-teal-500 w-10 mt-1"></div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Local Stories</p>
                <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">Meet Jesse Johnson: Digital Artist</h4>
                <ImageLightbox
                  src="/images/portfolio/detail/art/shoutout-la-canvases.jpg"
                  alt="Jesse with Canvas Art Collection"
                  className="relative aspect-[4/3] rounded overflow-hidden"
                />
                <p className="mt-3 text-sm text-teal-600 font-medium flex items-center gap-1">
                  Read article
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Collaborations Header */}
      <section className="mb-10 pt-10 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 text-center uppercase tracking-widest">
          Collaborations
        </h2>
      </section>

      {/* Jondo Prints Section */}
      <section className="mb-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <ImageLightbox
            src="/images/portfolio/detail/art/nft-la-booth.jpg"
            alt="NFT LA Booth with Jondo Prints"
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
          />

          {/* Text */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Jondo Prints</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              For the 2022 NFT LA event, I partnered with Jondo Prints to create an interactive booth showcasing high-quality digital prints from{' '}
              <a href="https://thedopeart.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-700 underline">
                The Dope Art
              </a>{' '}
              and{' '}
              <a href="https://eternalroyals.io/" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-700 underline">
                Eternal Royals
              </a>
              .
            </p>
            <p className="text-gray-600 leading-relaxed">
              I designed our booth layout and featured artwork, blending physical art with digital innovation. This collaboration was a fantastic way to highlight both my art and Jondo&apos;s print quality, while engaging with the NFT and digital art community, expanding The Dope Art&apos;s reach.
            </p>
          </div>
        </div>
      </section>

      {/* NFT LA Gallery */}
      <section className="mb-14 border-t border-gray-200 pt-10">
        <h3 className="text-lg font-bold text-gray-900 mb-6 text-center uppercase tracking-wide">NFT LA Gallery</h3>
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
            <ImageLightbox
              key={i}
              src={img.src}
              alt={img.alt}
              className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            />
          ))}
        </div>
      </section>

      {/* Wall Street Prints Section */}
      <section className="mb-14 border-t border-gray-200 pt-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <ImageLightbox
            src="/images/portfolio/detail/art/bull-bear-collab.png"
            alt="Bull and Bear Collaboration Art"
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-white border border-gray-100"
          />

          {/* Text */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Wall Street Prints</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              My collaboration with{' '}
              <a href="https://wallstreetprints.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-600 hover:text-teal-700 underline">
                Wall Street Prints
              </a>{' '}
              reflects the depth of my creativity over the years. I&apos;ve channeled my artistic passion into producing digital art using Photoshop, each piece tailored to resonate with the distinct character and needs of different businesses.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The positive reception to these characters serves as a testament to the power of creative digital art in brand storytelling and engagement.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
