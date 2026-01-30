import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free SEO & Marketing Tools',
  description:
    'Free tools built by Jesse Johnson. SEO auditors, content analyzers, social media utilities, and more. No signup required.',
};

const tools = [
  {
    category: 'SEO Tools',
    items: [
      {
        name: 'Internal Link Finder',
        description: 'Find internal linking opportunities you\'re missing. Get specific anchor text suggestions.',
        href: '/tools/seo/internal-link-finder',
        status: 'live' as const,
      },
      {
        name: 'Affiliate Opportunity Finder',
        description: 'Find affiliate revenue hiding in your existing content. Matches brand mentions to 500+ programs.',
        href: '/tools/seo/affiliate-opportunity-finder',
        status: 'live' as const,
      },
      {
        name: 'Bulk Title/Meta Auditor',
        description: 'Audit every title tag and meta description on your site in seconds.',
        href: '/tools/seo/meta-auditor',
        status: 'coming' as const,
      },
      {
        name: 'Thin Content Detector',
        description: 'Find pages with low word counts that may be hurting your rankings.',
        href: '/tools/seo/thin-content',
        status: 'coming' as const,
      },
      {
        name: 'Keyword Cannibalization Checker',
        description: 'Find pages on your site competing for the same keywords.',
        href: '/tools/seo/cannibalization',
        status: 'coming' as const,
      },
      {
        name: 'Content Brief Generator',
        description: 'Reverse-engineer top-ranking pages to build content briefs.',
        href: '/tools/seo/content-brief',
        status: 'coming' as const,
      },
      {
        name: 'Topical Authority Map',
        description: 'Visualize your content clusters and find topic gaps.',
        href: '/tools/seo/topical-map',
        status: 'coming' as const,
      },
      {
        name: 'OG Image Suite',
        description: 'Audit, preview, and generate social share images.',
        href: '/tools/seo/og-images',
        status: 'coming' as const,
      },
    ],
  },
  {
    category: 'Business Tools',
    items: [
      {
        name: 'Profit Margin Calculator',
        description: 'Compare real platform fees across Shopify, Amazon, Etsy, and more.',
        href: '/tools/business/profit-calculator',
        status: 'coming' as const,
      },
      {
        name: 'Freelance Rate Calculator',
        description: 'Work backward from your desired income to set your rates.',
        href: '/tools/business/rate-calculator',
        status: 'coming' as const,
      },
    ],
  },
  {
    category: 'Social Tools',
    items: [
      {
        name: 'Blog to Social Snippets',
        description: 'Turn one blog post into 15 ready-to-post social updates.',
        href: '/tools/social/blog-snippets',
        status: 'coming' as const,
      },
      {
        name: 'Social Media Image Resizer',
        description: 'Resize images for every platform in one click.',
        href: '/tools/social/image-resizer',
        status: 'coming' as const,
      },
      {
        name: 'Link in Bio Builder',
        description: 'Build a custom link-in-bio page. No branding, no monthly fees. Export as HTML.',
        href: '/tools/social/link-in-bio-builder',
        status: 'live' as const,
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[#d4a847] font-medium mb-3 tracking-wide uppercase text-sm">Free Tools</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SEO & Marketing Tools
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Built to solve real problems I kept running into. No signup, no paywall, no fluff.
            Just paste a URL and get answers.
          </p>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {tools.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((tool) => {
                  const isLive = tool.status === 'live';
                  const inner = (
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white font-semibold text-lg">{tool.name}</h3>
                        {isLive ? (
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                            Live
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-medium bg-white/5 text-gray-500 rounded-full border border-white/10">
                            Soon
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
                    </>
                  );
                  const cls = `block p-6 rounded-2xl border transition-all duration-200 ${
                    isLive
                      ? 'border-[#d4a847]/20 bg-white/[0.03] hover:border-[#d4a847]/40 hover:bg-white/[0.06] cursor-pointer'
                      : 'border-white/5 bg-white/[0.02] opacity-60 cursor-default'
                  }`;
                  return isLive ? (
                    <Link key={tool.name} href={tool.href} className={cls}>{inner}</Link>
                  ) : (
                    <div key={tool.name} className={cls}>{inner}</div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
