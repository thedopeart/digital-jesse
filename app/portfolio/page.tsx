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
    description: `I create content that ranks. Using Google Analytics, Ahrefs, Screaming Frog, and Search Console, I find what people actually search for and build content around it. At Quality Sewing, I grew organic traffic from 5K to 22K monthly visitors.`,
    bullets: [
      { bold: 'Advanced SEO techniques', text: 'for higher rankings' },
      { bold: 'Strategic content', text: 'for engagement and conversions' },
      { bold: 'Keyword research', text: 'for optimized relevance' },
      { bold: 'Content analysis', text: 'to improve performance' },
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
    description: `I make things look good. Product mockups, pitch decks, brochures, infographics. Photoshop, Illustrator, Figma, Canva. Whatever the project needs.`,
    bullets: [
      { bold: 'Expert in Photoshop', text: 'for mockups and visual design' },
      { bold: 'Canva', text: 'for pitch decks and marketing materials' },
      { bold: 'Creative mind', text: 'with a strong eye for detail' },
      { bold: 'Experience', text: 'in crafting infographics that tell a story' },
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
    description: `I run e-commerce stores and manage social content. Shopify, Etsy, Amazon, Walmart, TikTok Shop. I've managed $2M+ in annual sales and grown multiple stores from zero.`,
    bullets: [
      { bold: 'Adobe Suite', text: '(Photoshop, Illustrator, Premiere Pro)' },
      { bold: 'Content Management Systems', text: '(CMS)' },
      { bold: 'Social Media Algorithms', text: '& Engagement' },
      { bold: 'Video Production', text: '& Graphic Design' },
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
    description: `I create digital art and have built two art brands: The Dope Art and Luxury Wall Art. Combined $120K in sales. I also launched Eternal Royals, an NFT project with physical prints and NFC chips.`,
    bullets: [
      { bold: 'Built a recognized digital art brand', text: 'with "The Dope Art"' },
      { bold: 'Collaborated with top brands', text: 'to produce impactful visuals' },
      { bold: 'Created viral digital art pieces', text: 'shared widely online' },
      { bold: 'Pioneered blockchain technology', text: 'for art distribution' },
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
    description: `I've built and managed multiple brands from scratch. Quick Lenders (finance), Luxury Wall Art (e-commerce), The Dope Art (social-driven art), Eternal Royals (blockchain + physical), and Date Ideas (lifestyle content).`,
    bullets: [
      { bold: 'Quick Lenders', text: 'finance sector website' },
      { bold: 'Luxury Wall Art', text: 'profitable art collection' },
      { bold: 'The Dope Art', text: 'large social following' },
      { bold: 'Eternal Royals', text: 'blockchain technology' },
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
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header with Laptop */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="relative w-full md:w-1/2">
          <Image
            src="/images/portfolio/laptop-hero.png"
            alt="Digital Jesse Portfolio"
            width={600}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Jesse Johnson Digital Portfolio</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            I'm Jesse Johnson, focused on crafting web designs, developing e-commerce platforms, and creating impactful branding.
          </p>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.id} className="mb-16">
          {/* Section Header */}
          <div className={`${section.color} text-white text-center py-5 rounded-lg mb-6`}>
            <h2 className="text-2xl font-bold">{section.title}</h2>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {section.description}
          </p>

          {/* Bullet Points */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {section.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#2e563c] font-bold">•</span>
                <span>
                  <strong className="text-blue-600">{bullet.bold}</strong> {bullet.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Images */}
          <div className={`grid gap-4 ${section.id === 'brands' ? 'grid-cols-5' : 'grid-cols-2 md:grid-cols-4'}`}>
            {section.images.map((img, i) => {
              const ImageCard = (
                <div className="group text-center">
                  <div className={`relative ${img.isLogo ? 'aspect-square p-4' : 'aspect-[16/9]'} rounded-lg overflow-hidden border border-gray-200 bg-white ${img.href ? 'cursor-pointer' : ''}`}>
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className={`${img.isLogo ? 'object-contain p-2' : 'object-contain'} group-hover:scale-105 transition-transform duration-300`}
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
      <section className="mt-16 text-center py-12 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900">Want to work together?</h2>
        <p className="mt-2 text-gray-600">I'm open to full-time roles and freelance projects.</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
