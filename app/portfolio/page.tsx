import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Jesse Johnson digital portfolio: SEO, e-commerce, design, digital art, and brand management.',
};

const sections = [
  {
    id: 'seo',
    title: 'SEO, Keyword Research & Blogging',
    color: 'bg-[#282F59]',
    description: `I create content that ranks. Using Google Analytics, Ahrefs, Screaming Frog, and Search Console, I find what people actually search for and build content around it. At Quality Sewing, I grew organic traffic from 5K to 22K monthly visitors.`,
    bullets: [
      { bold: 'SEO audits', text: 'and technical fixes' },
      { bold: 'Keyword research', text: 'for content planning' },
      { bold: 'Blog writing', text: 'that ranks and converts' },
      { bold: 'Analytics', text: 'to track what works' },
    ],
    images: [
      { src: '/images/stats/seo-stats.png', label: 'SEO Growth' },
      { src: '/images/stats/lwa-seo.jpg', label: 'Keyword Rankings' },
    ],
  },
  {
    id: 'design',
    title: 'Design & Illustrations',
    color: 'bg-[#282F59]',
    description: `I make things look good. Product mockups, pitch decks, brochures, infographics. Photoshop, Illustrator, Figma, Canva. Whatever the project needs.`,
    bullets: [
      { bold: 'Photoshop', text: 'for mockups and visuals' },
      { bold: 'Pitch decks', text: 'and marketing materials' },
      { bold: 'Infographics', text: 'that tell a story' },
      { bold: '3D mockups', text: 'for product visualization' },
    ],
    images: [
      { src: '/images/projects/tda-website.jpg', label: 'Website Design' },
      { src: '/images/projects/lwa-website.jpg', label: 'E-commerce Design' },
    ],
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Social Media',
    color: 'bg-[#282F59]',
    description: `I run e-commerce stores and manage social content. Shopify, Etsy, Amazon, Walmart, TikTok Shop. I've managed $2M+ in annual sales and grown multiple stores from zero.`,
    bullets: [
      { bold: 'Shopify', text: '6+ years experience' },
      { bold: 'Multi-channel', text: 'Etsy, Amazon, Walmart, TikTok' },
      { bold: 'Paid ads', text: 'Google and Meta' },
      { bold: 'Social content', text: 'that gets engagement' },
    ],
    images: [
      { src: '/images/stats/shopify-sales.jpg', label: 'Shopify Sales' },
      { src: '/images/stats/etsy-earnings.jpg', label: 'Etsy Revenue' },
    ],
  },
  {
    id: 'art',
    title: 'Digital Art & Animations',
    color: 'bg-[#282F59]',
    description: `I create digital art and have built two art brands: The Dope Art and Luxury Wall Art. Combined $120K in sales. I also launched Eternal Royals, an NFT project with physical prints and NFC chips.`,
    bullets: [
      { bold: 'The Dope Art', text: 'canvas prints and social' },
      { bold: 'Luxury Wall Art', text: '$120K in sales' },
      { bold: 'Eternal Royals', text: 'NFT + physical art' },
      { bold: 'Original artwork', text: 'and animations' },
    ],
    images: [
      { src: '/images/art/tiger-king.jpg', label: 'Digital Art' },
      { src: '/images/art/eternal-king.jpg', label: 'Eternal Royals' },
    ],
  },
  {
    id: 'brands',
    title: 'Brand & Project Management',
    color: 'bg-[#282F59]',
    description: `I've built and managed multiple brands from scratch. Quick Lenders (finance), Luxury Wall Art (e-commerce), The Dope Art (social-driven art), Eternal Royals (blockchain + physical), and Date Ideas (lifestyle content).`,
    bullets: [
      { bold: 'Luxury Wall Art', text: 'canvas art e-commerce' },
      { bold: 'The Dope Art', text: 'social-first art brand' },
      { bold: 'Eternal Royals', text: 'NFT meets physical' },
      { bold: 'Date Ideas', text: 'lifestyle content site' },
    ],
    images: [
      { src: '/images/brands/eternal-royals.png', label: 'Eternal Royals' },
      { src: '/images/brands/logos.png', label: 'Brand Logos' },
    ],
  },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900">Digital Portfolio</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          SEO, e-commerce, design, digital art, and brand building. Here's what I've been working on.
        </p>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <section key={section.id} className={`mb-16 ${index > 0 ? 'pt-8' : ''}`}>
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
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong className="text-blue-600">{bullet.bold}</strong> {bullet.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {section.images.map((img, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-center text-gray-700">
                  {img.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="mt-16 text-center py-12 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900">Want to see more?</h2>
        <p className="mt-2 text-gray-600">Check out the detailed case studies or get in touch.</p>
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
