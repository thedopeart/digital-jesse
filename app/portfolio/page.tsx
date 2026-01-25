import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Jesse Johnson digital portfolio: SEO, e-commerce, design, digital art, and brand management.',
};

interface SectionImage {
  src: string;
  label: string;
  isLogo?: boolean;
  href?: string;
}

interface Section {
  id: string;
  title: string;
  color: string;
  description: string;
  bullets: { bold: string; text: string }[];
  images: SectionImage[];
}

const sections: Section[] = [
  {
    id: 'seo',
    title: 'SEO, KW Research, and Blogging',
    color: 'bg-[#282F59]',
    description: `I create content that ranks. Using Google Analytics, Ahrefs, Screaming Frog, and Search Console, I find what people actually search for and build content around it. At Quality Sewing, I grew organic traffic from 5K to 22K monthly visitors. I've also taken a brand new domain from zero rankings to 1,000+ top-100 keywords in under a year through strategic content creation and technical SEO optimization.`,
    bullets: [
      { bold: 'Advanced SEO techniques', text: 'including schema markup, internal linking, and site architecture' },
      { bold: 'Strategic content creation', text: 'that drives engagement, conversions, and organic growth' },
      { bold: 'Keyword research', text: 'using Ahrefs, SEMrush, and competitor gap analysis' },
      { bold: 'Technical audits', text: 'with Screaming Frog to identify and fix crawl issues' },
    ],
    images: [
      { src: '/images/portfolio/seo/seo-growth-1.png', label: 'SEO Growth 1', href: '/portfolio/organic-seo-growth' },
      { src: '/images/portfolio/seo/seo-growth-2.png', label: 'SEO Growth 2', href: '/portfolio/organic-seo-growth-2' },
      { src: '/images/portfolio/seo/keyword-research.png', label: 'Keyword Research', href: '/portfolio/etsy-keyword-research' },
      { src: '/images/portfolio/seo/blogs-copywriting.png', label: 'Blogs & Copywriting', href: '/portfolio/blog-example-1' },
    ],
  },
  {
    id: 'design',
    title: 'Design & Illustrations',
    color: 'bg-[#282F59]',
    description: `I make things look good. Product mockups, pitch decks, brochures, infographics, company profiles, and marketing materials. I work in Photoshop, Illustrator, Figma, and Canva. Whatever the project needs, I deliver polished visuals that communicate clearly and convert browsers into buyers.`,
    bullets: [
      { bold: 'Expert in Adobe Photoshop', text: 'for mockups, composites, and product photography editing' },
      { bold: 'Pitch deck design', text: 'that has helped secure funding and close deals' },
      { bold: 'Figma wireframes', text: 'for UI/UX design and rapid prototyping' },
      { bold: 'Data visualization', text: 'through infographics that tell a clear, compelling story' },
    ],
    images: [
      { src: '/images/portfolio/design/infographics.png', label: 'Infographics, Pitchdecks, etc.', href: '/portfolio/company-profile' },
      { src: '/images/portfolio/design/wireframes.png', label: 'Wireframes & Mockups', href: '/portfolio/figma-design' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Social Media',
    color: 'bg-[#282F59]',
    description: `I run e-commerce stores and manage social content across Shopify, Etsy, Amazon, Walmart, and TikTok Shop. I've personally managed over $2M in annual sales and grown multiple stores from zero to profitability. From product listings and paid ads to organic social strategy, I handle the full e-commerce lifecycle.`,
    bullets: [
      { bold: 'Multi-platform management', text: 'across Shopify, Amazon, Etsy, Walmart, and TikTok Shop' },
      { bold: 'Paid advertising', text: 'on Meta, Google, and TikTok with proven ROAS optimization' },
      { bold: 'Social media content', text: 'that builds engaged audiences and drives traffic' },
      { bold: 'Product photography', text: 'and video production for listings and ads' },
    ],
    images: [
      { src: '/images/portfolio/ecommerce/paid-ads.png', label: 'E-Commerce & Paid Ads', href: '/portfolio/paid-sm-marketing' },
      { src: '/images/portfolio/ecommerce/content-creation.png', label: 'Content Creation', href: '/portfolio/social-media-posts-example' },
      { src: '/images/portfolio/ecommerce/social-media.png', label: 'Social Media', href: '/portfolio/social-media-management' },
    ],
  },
  {
    id: 'art',
    title: 'Digital Art & Animations',
    color: 'bg-[#282F59]',
    description: `I create digital art and have built two profitable art brands: The Dope Art (200K+ social following) and Luxury Wall Art ($120K+ in sales). My work has been featured in publications and shared by major brands. I also launched Eternal Royals, an innovative NFT project combining blockchain authenticity with physical prints and NFC chips.`,
    bullets: [
      { bold: 'Built The Dope Art', text: 'to 200K+ followers across Instagram, Facebook, and Pinterest' },
      { bold: 'Featured in publications', text: 'including online magazines and brand collaborations' },
      { bold: 'Created viral content', text: 'with individual pieces reaching millions of impressions' },
      { bold: 'Pioneered phygital art', text: 'combining NFTs with physical prints and NFC technology' },
    ],
    images: [
      { src: '/images/portfolio/art/digital-art.png', label: 'Digital Art & Prints', href: '/portfolio/art-design' },
      { src: '/images/portfolio/art/animations.png', label: 'Animations', href: '/portfolio/animation' },
      { src: '/images/portfolio/art/publications.png', label: 'Publications & Collabs', href: '/portfolio/art-publications' },
      { src: '/images/portfolio/art/crypto-nfts.jpg', label: 'Crypto & NFTs', href: '/portfolio/crypto-nfts' },
    ],
  },
  {
    id: 'brands',
    title: 'Brand Project Management',
    color: 'bg-[#282F59]',
    description: `I've built and managed multiple brands from scratch, handling everything from initial concept to profitable execution. Each project taught me different aspects of brand building: finance (Quick Lenders), e-commerce (Luxury Wall Art), social media growth (The Dope Art), blockchain technology (Eternal Royals), and content virality (Date Ideas).`,
    bullets: [
      { bold: 'Quick Lenders', text: 'finance sector brand with lead generation and SEO strategy' },
      { bold: 'Luxury Wall Art', text: 'e-commerce brand generating $120K+ in art sales' },
      { bold: 'The Dope Art', text: 'social media brand with 200K+ engaged followers' },
      { bold: 'Eternal Royals', text: 'blockchain-authenticated art with physical NFC-enabled prints' },
    ],
    images: [
      { src: '/images/portfolio/brands/quick-lenders.png', label: 'Quick Lenders', isLogo: true },
      { src: '/images/portfolio/brands/luxury-wall-art.png', label: 'Luxury Wall Art', isLogo: true },
      { src: '/images/portfolio/brands/the-dope-art.png', label: 'The Dope Art', isLogo: true },
      { src: '/images/portfolio/brands/eternal-royals.png', label: 'Eternal Royals', isLogo: true },
      { src: '/images/portfolio/brands/date-ideas.png', label: 'Date Ideas', isLogo: true },
    ],
  },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header with Laptop */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <div className="relative w-full md:w-2/5">
          <Image
            src="/images/portfolio/laptop-hero.png"
            alt="Digital Jesse Portfolio"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="md:w-3/5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-wide">Jesse Johnson Digital Portfolio</h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            I'm Jesse Johnson, focused on crafting web designs, developing e-commerce platforms, and creating impactful branding.
          </p>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.id} className="mb-12">
          {/* Section Header */}
          <div className={`${section.color} text-white text-center py-4 rounded-lg mb-5`}>
            <h2 className="text-xl md:text-2xl font-bold">{section.title}</h2>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-5">
            {section.description}
          </p>

          {/* Bullet Points */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  <strong className="text-gray-900 font-semibold">{bullet.bold}</strong> {bullet.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Images */}
          <div className={`grid gap-4 ${
            section.id === 'brands'
              ? 'grid-cols-3 md:grid-cols-5'
              : section.images.length === 2
                ? 'grid-cols-2'
                : section.images.length === 3
                  ? 'grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-2 md:grid-cols-4'
          }`}>
            {section.images.map((img, i) => {
              const ImageCard = (
                <div className={`group text-center ${img.href ? 'cursor-pointer' : ''}`}>
                  <div className={`relative overflow-hidden ${img.isLogo ? '' : 'rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'}`}>
                    <Image
                      src={img.src}
                      alt={img.label}
                      width={400}
                      height={300}
                      className={`w-full h-auto ${img.isLogo ? 'p-2' : ''} group-hover:scale-105 transition-transform duration-300`}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    {img.label}
                  </p>
                </div>
              );

              return img.href ? (
                <Link key={i} href={img.href}>
                  {ImageCard}
                </Link>
              ) : (
                <div key={i}>{ImageCard}</div>
              );
            })}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="mt-10 text-center py-8 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900">Want to work together?</h2>
        <p className="mt-1 text-gray-600">I'm open to full-time roles and freelance projects.</p>
        <div className="mt-4">
          <Link
            href="/contact"
            className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
