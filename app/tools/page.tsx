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
        name: 'Page to Social Posts',
        description: 'Turn any page into ready-to-post social content for every platform.',
        href: '/tools/social/blog-snippets',
        status: 'live' as const,
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

      {/* What you get (dark) */}
      <section className="bg-[#1e1e1e] py-14 md:py-18 border-t border-[#d4a847]/10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">What these tools do</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto text-center">
            Each tool solves a specific problem. Paste a URL, get answers. No accounts, no trials, no sales pitch.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {[
              { title: 'Find linking gaps', desc: 'The Internal Link Finder crawls your site and spots pages that should link to each other but don\'t. You get specific anchor text suggestions, not just a list of URLs.' },
              { title: 'Surface hidden revenue', desc: 'The Affiliate Opportunity Finder scans your content for brand mentions and matches them to 500+ affiliate programs. It shows you money you\'re leaving on the table.' },
              { title: 'Audit titles and metas at scale', desc: 'The Bulk Title/Meta Auditor checks every page on your site for missing, duplicate, or poorly written title tags and meta descriptions. Fix them before Google notices.' },
              { title: 'Catch thin content', desc: 'The Thin Content Detector flags pages with low word counts that might be dragging your site down. Know exactly which pages need more depth.' },
              { title: 'Stop competing with yourself', desc: 'The Keyword Cannibalization Checker finds pages targeting the same keywords. When two of your pages fight for the same term, neither wins.' },
              { title: 'Turn pages into posts', desc: 'Page to Social Posts takes any URL and writes platform-specific content for Twitter, LinkedIn, Instagram, Facebook, and Threads. AI-powered, not templates.' },
              { title: 'Build content briefs from SERPs', desc: 'The Content Brief Generator reverse-engineers what\'s ranking and gives you a brief: headings, word count targets, topics to cover, questions to answer.' },
              { title: 'Map your topical authority', desc: 'The Topical Authority Map shows your content clusters, highlights gaps, and tells you what to write next to own a topic in Google\'s eyes.' },
              { title: 'Create a link-in-bio page', desc: 'The Link in Bio Builder lets you design a custom landing page for your social profiles. No monthly fees, no branding. Export clean HTML you own.' },
              { title: 'Know your real margins', desc: 'The Profit Margin Calculator compares actual platform fees across Shopify, Amazon, Etsy, and others. See what you keep after every fee is deducted.' },
            ].map((item, i) => (
              <div key={item.title} className="h-full p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:border-[#d4a847]/30 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-lg bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">{item.title}</h3>
                </div>
                <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why these tools are different + FAQ (light) */}
      <section className="bg-[#f5f5f0] py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why these are different</h2>
          <div className="space-y-4 text-gray-700 text-base leading-relaxed mb-14">
            <p>
              Most free SEO tools give you a score and a list of problems with no context. They tell you something is wrong but not what to do about it. Or they gate the useful parts behind a $99/month plan.
            </p>
            <p>
              I built these because I kept hitting the same walls running my own sites. I needed to find internal linking opportunities without paying for Ahrefs. I wanted to turn a blog post into social content without spending 30 minutes rewriting it for each platform. I needed to know which pages were too thin before Google flagged them.
            </p>
            <p>
              So I built the tools myself. They&apos;re <strong className="text-gray-900">specific, opinionated, and free</strong>. No account required. No data stored. Paste a URL, get the answer, move on. More tools are in progress, and I ship them as soon as they&apos;re ready.
            </p>
          </div>

          {/* FAQ */}
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common questions</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
            {[
              { q: 'Are these tools really free?', a: 'Yes. No trials, no freemium limits, no credit card. I built them to solve my own problems and decided to share them.' },
              { q: 'Do you store my data?', a: 'No. Everything runs during the session. Your URLs, content, and results aren\'t saved anywhere. Close the tab and it\'s gone.' },
              { q: 'How is the AI-powered content generated?', a: 'Page to Social Posts uses Google Gemini to analyze your page and write platform-specific posts. It\'s not a template. Each post is written from scratch based on your actual content.' },
              { q: 'When are the "coming soon" tools launching?', a: 'I ship them as they\'re ready. The live tools were all built in the last few weeks. Follow along if you want updates.' },
              { q: 'Can I request a tool?', a: 'Sure. Reach out through the contact page. If it solves a real problem, I\'ll probably build it.' },
              { q: 'Do the SEO tools work on any website?', a: 'They work on any publicly accessible URL. Doesn\'t matter what platform your site runs on: Shopify, WordPress, Wix, custom code, whatever.' },
            ].map((item, i, arr) => (
              <div key={item.q} className={i < arr.length - 1 ? 'pb-5 mb-5 border-b border-gray-100' : ''}>
                <h3 className="font-semibold text-gray-900 text-base mb-1.5">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
