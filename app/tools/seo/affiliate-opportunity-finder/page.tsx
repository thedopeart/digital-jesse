'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { AffiliateOpportunity, AffiliateReport, SuggestedProgram } from '@/lib/tools/affiliate-analysis';

type ResultsTab = 'suggested' | 'opportunities' | 'linked' | 'outreach';

// Major platforms that aren't useful for outreach suggestions
const MAJOR_PLATFORMS = new Set([
  'YouTube', 'Instagram', 'Twitter / X', 'Pinterest', 'Steam',
  'Supabase', 'Mint', 'Reddit', 'TikTok', 'Facebook', 'LinkedIn',
  'Spotify', 'Netflix', 'Amazon', 'Google', 'Apple', 'Microsoft',
  'Yelp', 'Discord', 'Slack', 'GitHub', 'GitLab', 'Twitch',
]);

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

/* ── Scroll fade-in hook ── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── FAQ Accordion ── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-gray-900 font-semibold text-base pr-4 group-hover:text-[#b8860b] transition-colors">{question}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-60 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export default function AffiliateOpportunityFinderPage() {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [maxPages, setMaxPages] = useState(50);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const [report, setReport] = useState<AffiliateReport | null>(null);
  const [crawlStats, setCrawlStats] = useState<{ found: number; crawled: number; errors: number } | null>(null);

  const [resultsTab, setResultsTab] = useState<ResultsTab>('suggested');
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  const runScan = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setReport(null);
    setCrawlStats(null);
    setProgress('Fetching and parsing pages...');

    try {
      if (!sitemapUrl.trim()) {
        setError('Enter a domain, sitemap URL, or YouTube channel to analyze.');
        setIsLoading(false);
        return;
      }

      let url = sitemapUrl.trim();
      if (!url.startsWith('http')) url = 'https://' + url;

      const res = await fetch('/api/tools/affiliate-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sitemapUrl: url, maxPages }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Request failed: ${res.status}`);
      }

      setProgress('Scanning content for brand mentions...');

      const data = await res.json();
      setReport(data.report);
      setCrawlStats(data.crawlStats);
      setProgress('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [sitemapUrl, maxPages]);

  const hasResults = report !== null;

  const exportCsv = useCallback(() => {
    if (!report) return;
    const sections: string[] = [];

    // Suggested programs (main focus)
    if (report.suggestedPrograms && report.suggestedPrograms.length > 0) {
      sections.push('--- Suggested Programs ---');
      sections.push('Brand,Commission,Type,Network,Category,Signup URL,Content Strategy,Description');
      for (const sp of report.suggestedPrograms) {
        sections.push([
          csvEscape(sp.program.brand),
          csvEscape(sp.program.commission),
          csvEscape(sp.program.type),
          csvEscape(sp.program.network || 'Direct'),
          csvEscape(sp.program.category),
          csvEscape(sp.program.signupUrl || ''),
          csvEscape(sp.reason),
          csvEscape(sp.program.description || ''),
        ].join(','));
      }
    }

    // Existing opportunities
    if (report.opportunities.length > 0) {
      sections.push('');
      sections.push('--- Unlinked Opportunities ---');
      sections.push('Brand,Commission,Network,Unlinked Mentions,Top Page');
      for (const o of report.opportunities) {
        sections.push([
          csvEscape(o.brand),
          csvEscape(o.program.commission || 'N/A'),
          csvEscape(o.program.network),
          o.unlinkedMentions,
          csvEscape(o.pages[0]?.url || ''),
        ].join(','));
      }
    }

    // Already linked
    if (report.alreadyLinked.length > 0) {
      sections.push('');
      sections.push('--- Already Linked ---');
      sections.push('Brand,Commission,Network,Linked Mentions,Top Page');
      for (const o of report.alreadyLinked) {
        sections.push([
          csvEscape(o.brand),
          csvEscape(o.program.commission || 'N/A'),
          csvEscape(o.program.network),
          o.linkedMentions,
          csvEscape(o.pages[0]?.url || ''),
        ].join(','));
      }
    }

    const csv = sections.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `affiliate-report-${report.domain}.csv`;
    a.click();
    URL.revokeObjectURL(blobUrl);
  }, [report]);

  // Filter outreach to remove major platforms that aren't realistic for outreach
  const filteredOutreach = useMemo(() => {
    if (!report) return [];
    return report.outreachOpportunities.filter(o => !MAJOR_PLATFORMS.has(o.brand));
  }, [report]);

  const currentTabData = useMemo(() => {
    if (!report) return [];
    switch (resultsTab) {
      case 'opportunities': return report.opportunities;
      case 'linked': return report.alreadyLinked;
      case 'outreach': return filteredOutreach;
      default: return [];
    }
  }, [report, resultsTab, filteredOutreach]);

  const opportunityCount = report?.opportunities.length || 0;
  const linkedCount = report?.alreadyLinked.length || 0;
  const outreachCount = filteredOutreach.length;
  const suggestedCount = report?.suggestedPrograms?.length || 0;

  // Real stats from API
  const [realStats, setRealStats] = useState<{ sites_analyzed: number; links_found: number; pages_crawled: number } | null>(null);
  useEffect(() => {
    fetch('/api/tools/stats?tool=affiliate-opportunity-finder')
      .then(res => res.json())
      .then(data => setRealStats(data))
      .catch(() => {});
  }, []);

  const statSites = useCountUp(realStats?.sites_analyzed || 0, 2200, !!realStats && realStats.sites_analyzed > 0);
  const statBrands = useCountUp(realStats?.links_found || 0, 2400, !!realStats && realStats.links_found > 0);
  const statPages = useCountUp(realStats?.pages_crawled || 0, 2600, !!realStats && realStats.pages_crawled > 0);

  return (
    <div className="min-h-screen">
      {/* Hero (dark) */}
      <section className="bg-[#1e1e1e] pt-2 pb-8 md:pb-10">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 mb-1.5 md:mb-2">
          <Link
            href="/tools"
            className="text-gray-500 hover:text-[#d4a847] text-sm transition-colors inline-flex items-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Tools
          </Link>
        </div>

        {/* Title + description */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight whitespace-nowrap">
            Affiliate{' '}
            <span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">
              Opportunity
            </span>
            {' '}Finder
          </h1>

          <p className="text-gray-400 text-lg mb-4 leading-relaxed max-w-2xl mx-auto">
            You're already mentioning brands in your content. This tool finds which ones <strong className="text-gray-200">have affiliate programs</strong> so you can <strong className="text-gray-200">monetize what you've already written</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            <span className="px-3 py-1 text-xs font-semibold bg-[#d4a847]/10 text-[#d4a847] rounded-full border border-[#d4a847]/20 uppercase tracking-wide">
              SEO
            </span>
            {['100% Free', 'No Signup', '500+ Programs', 'CSV Export'].map((label) => (
              <span
                key={label}
                className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/10"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Real stats */}
          {realStats && realStats.sites_analyzed > 0 && (
            <div className="flex justify-center gap-8 md:gap-12">
              {[
                { value: statSites.toLocaleString() + '+', label: 'Sites scanned' },
                { value: statBrands.toLocaleString() + '+', label: 'Brands found' },
                { value: statPages.toLocaleString() + '+', label: 'Pages analyzed' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white tabular-nums">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tool section (light) */}
      <section className="bg-[#f5f5f0] py-12 md:py-16">
        <div className={`${hasResults ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-6 transition-all duration-300`}>
          {/* Input Card */}
          <div id="tool-input" className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03] text-left max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Scan your site</h2>
              <select
                value={maxPages}
                onChange={(e) => setMaxPages(Number(e.target.value))}
                className="ml-auto px-4 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#d4a847]/50 transition-colors appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              >
                <option value={10}>10 pages</option>
                <option value={25}>25 pages</option>
                <option value={50}>50 pages</option>
                <option value={100}>100 pages</option>
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Website or YouTube channel URL
                </label>
                <input
                  type="text"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="example.com or youtube.com/@channel"
                  onKeyDown={(e) => { if (e.key === 'Enter' && !isLoading) runScan(); }}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-2 focus:ring-[#d4a847]/20 focus:bg-white transition-colors"
                />
              </div>

              <button
                onClick={runScan}
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
                  isLoading
                    ? 'bg-[#d4a847]/40 text-black/50 cursor-wait'
                    : 'bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black hover:shadow-lg hover:shadow-amber-900/20 hover:scale-[1.01]'
                }`}
              >
                {isLoading ? 'Scanning...' : 'Find Affiliate Opportunities'}
              </button>
            </div>

            {isLoading && progress && (
              <div className="mt-5 flex items-center gap-3 text-gray-500">
                <div className="w-5 h-5 border-2 border-[#d4a847]/30 border-t-[#d4a847] rounded-full animate-spin" />
                <span>{progress}</span>
              </div>
            )}

            {error && (
              <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Results */}
          {hasResults && report && (
            <div className="mt-10">
              {/* Results tabs + actions */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <div className="flex gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                  {suggestedCount > 0 && (
                    <button
                      onClick={() => setResultsTab('suggested')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        resultsTab === 'suggested'
                          ? 'bg-gray-900 text-white shadow-sm'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Suggested ({suggestedCount})
                    </button>
                  )}
                  <button
                    onClick={() => setResultsTab('opportunities')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      resultsTab === 'opportunities'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Opportunities ({opportunityCount})
                  </button>
                  <button
                    onClick={() => setResultsTab('linked')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      resultsTab === 'linked'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Linked ({linkedCount})
                  </button>
                  <button
                    onClick={() => setResultsTab('outreach')}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      resultsTab === 'outreach'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    Outreach ({outreachCount})
                  </button>
                </div>

                {/* Niche badges */}
                {report.detectedNiches && report.detectedNiches.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {report.detectedNiches.slice(0, 2).map(n => (
                      <span key={n} className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#d4a847]/10 text-[#9a7b1f] border border-[#d4a847]/15 capitalize">
                        {n}
                      </span>
                    ))}
                  </div>
                )}

                {/* Export */}
                <button
                  onClick={exportCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 font-medium text-xs rounded-lg hover:border-[#d4a847]/40 hover:text-[#9a7b1f] transition-all duration-150 ml-auto shadow-sm"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2v7M7 9L4.5 6.5M7 9L9.5 6.5M2.5 11h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Export CSV
                </button>
              </div>

              {/* Quick Wins Banner (only on opportunities tab) */}
              {resultsTab === 'opportunities' && report.quickWins.length > 0 && (
                <div className="bg-white border border-[#d4a847]/20 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-xs flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1.5L8.5 5H12L9.25 7.25L10.25 11L7 8.75L3.75 11L4.75 7.25L2 5H5.5L7 1.5Z" fill="currentColor"/>
                      </svg>
                    </span>
                    <h3 className="text-gray-900 font-semibold text-base">Quick wins: add these links today</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {report.quickWins.map(qw => (
                      <span key={qw.brand} className="px-3 py-1.5 bg-[#d4a847]/[0.06] border border-[#d4a847]/15 rounded-lg text-sm text-[#9a7b1f] font-medium">
                        {qw.brand} ({qw.unlinkedMentions} unlinked)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Cards */}
              {resultsTab === 'suggested' ? (
                <SuggestedProgramsList programs={report.suggestedPrograms || []} scannedPages={report.scannedPages || []} />
              ) : currentTabData.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  {resultsTab === 'opportunities'
                    ? 'No unlinked affiliate opportunities found. Your content might already be well-monetized.'
                    : resultsTab === 'linked'
                    ? 'No already-linked brands detected.'
                    : 'No brands without affiliate programs found.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentTabData.map((opp) => (
                    <OpportunityCard
                      key={opp.brand}
                      opportunity={opp}
                      isExpanded={expandedBrand === opp.brand}
                      onToggle={() => setExpandedBrand(expandedBrand === opp.brand ? null : opp.brand)}
                      tab={resultsTab}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* How It Works */}
          <div className="mt-12 max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">How it works</h2>
            </FadeIn>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
              <div className="space-y-5">
                {[
                  { step: '1', title: 'Drop in your URL', desc: 'Domain, sitemap URL, or YouTube channel. The tool crawls pages or scans video descriptions and transcripts.' },
                  { step: '2', title: 'Content gets scanned', desc: 'Every page is checked for brand mentions against 500+ affiliate programs. Your site\'s niche is auto-detected too.' },
                  { step: '3', title: 'Get your full report', desc: 'Unlinked opportunities in existing content, niche-matched program suggestions with content ideas, network signup shortcuts, and CSV export.' },
                ].map((item, i) => (
                  <FadeIn key={item.step} delay={i * 100}>
                    <div className="flex gap-4 items-start group">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-semibold text-lg mb-0.5">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get + After You Run It (dark) */}
      <section className="bg-[#1e1e1e] py-14 md:py-18 border-t border-[#d4a847]/10">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">What you get</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto text-center">
              Not generic advice to &quot;try affiliate marketing.&quot; Specific opportunities hiding in content you&apos;ve already published.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {[
              { title: 'Niche-matched suggestions', desc: 'Your site\'s niche is auto-detected, and you get a list of programs you don\'t mention yet but should. Each comes with content ideas to help you rank.' },
              { title: 'Network signup shortcuts', desc: 'Programs are grouped by affiliate network (CJ, Impact, ShareASale, etc.). One signup per network unlocks multiple programs. Expand any network to see all its programs.' },
              { title: 'Unlinked brand detection', desc: 'Every mention of a brand in your content that isn\'t wrapped in a link yet. These are the fastest wins since the content already exists.' },
              { title: 'Sort and filter', desc: 'Sort suggested programs by best fit, highest earning potential, or recurring revenue first. Find the opportunities that match your strategy.' },
              { title: 'Context snippets', desc: 'See the exact sentence where each brand is mentioned so you can judge whether an affiliate link fits naturally.' },
              { title: 'CSV export', desc: 'Download the full report with all programs, commissions, networks, and content strategies. Hand it to your team or track implementation.' },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 80} className="h-full">
                <div className="h-full p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:border-[#d4a847]/30 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-lg bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">{item.title}</h3>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* After you run it */}
          <FadeIn>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">After you run it</h3>
          </FadeIn>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { step: '1', title: 'Join the affiliate networks', desc: 'Use the network shortcuts to sign up for CJ, Impact, or ShareASale. One signup per network gives you access to dozens of programs at once.' },
              { step: '2', title: 'Add links to existing mentions', desc: 'Check the Opportunities tab for brands you already mention. These are the fastest wins since the content is already written and ranking.' },
              { step: '3', title: 'Create content for suggested programs', desc: 'Use the content ideas from the Suggested tab to write new posts. These are programs matched to your niche that you\'re not covering yet.' },
              { step: '4', title: 'Add disclosure to those pages', desc: 'FTC requires affiliate disclosure. Add a note at the top of any page with affiliate links. It builds trust and keeps you legal.' },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 120}>
                <div className="flex gap-4 items-start p-5 bg-white/[0.06] border border-white/[0.1] rounded-xl hover:border-[#d4a847]/30 hover:bg-white/[0.09] transition-all duration-200 group">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-base flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Educational + FAQ (light) */}
      <section className="bg-[#f5f5f0] py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why this approach works better</h2>
          </FadeIn>
          <div className="space-y-4 text-gray-700 text-base leading-relaxed mb-14">
            <FadeIn delay={100}>
              <p>
                Most affiliate advice tells you to find high-commission products first, then write content around them. That's backwards. It leads to <strong className="text-gray-900">thin, salesy content that readers don't trust and search engines don't rank</strong>.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <p>
                The smarter play: you've already written content that mentions tools, platforms, and products. You're already ranking for terms. You're already getting traffic. You're just not linking. That means <strong className="text-gray-900">potential affiliate revenue is sitting in your existing content right now</strong>, waiting for you to connect the dots.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <p>
                This tool automates the discovery step. It scans your site, finds every brand mention, matches them to 500+ affiliate programs, and suggests new programs based on your niche. You get network signup shortcuts, content ideas, and sorting tools to prioritize what to tackle first. It's one of several{' '}
                <Link href="/tools" className="text-[#b8860b] hover:text-[#d4a847] underline underline-offset-2">
                  free SEO tools
                </Link>{' '}
                I've built to help content creators get more from the work they've already done.
              </p>
            </FadeIn>
          </div>

          {/* FAQ */}
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Common questions</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
              <FaqItem
                question="How many affiliate programs does it check?"
                answer="Over 500 across 20+ categories: e-commerce, email marketing, SEO tools, hosting, design, courses, travel, dating, art, home decor, and more. New programs are added regularly."
              />
              <FaqItem
                question="How does it know if a brand is already linked?"
                answer="It checks whether any outbound links on the page contain the brand's domain. If you already link to shopify.com from a page that mentions Shopify, it's marked as 'already linked.'"
              />
              <FaqItem
                question="Are the commission numbers accurate?"
                answer="They're based on publicly available program details and are approximate. Commission structures change, and some programs have tiers. Always verify current rates on the affiliate program's signup page."
              />
              <FaqItem
                question="What about negative mentions?"
                answer="The tool shows you the context around each mention so you can decide. If you wrote 'I stopped using Mailchimp because...' you probably don't want to add an affiliate link there. Use your judgment."
              />
              <FaqItem
                question="Is my data stored anywhere?"
                answer="No. Everything runs during the scan. Your URLs, content, and results aren't saved or shared. Close the page and it's gone."
              />
              <FaqItem
                question="Do I need to disclose affiliate links?"
                answer="Yes. The FTC requires clear disclosure on any page with affiliate links. A simple note at the top of the page works. This is good practice anyway because it builds reader trust."
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bottom CTA (dark) */}
      <section className="bg-[#1e1e1e] py-12 md:py-16 border-t border-[#d4a847]/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Find the revenue in your content</h2>
            <p className="text-gray-400 text-base mb-6">Free scan. No signup. Takes about 30 seconds.</p>
            <button
              onClick={() => document.getElementById('tool-input')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-900/20 hover:scale-[1.02] transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to the tool
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

/* ── Opportunity Card Component ── */
function OpportunityCard({
  opportunity,
  isExpanded,
  onToggle,
  tab,
}: {
  opportunity: AffiliateOpportunity;
  isExpanded: boolean;
  onToggle: () => void;
  tab: ResultsTab;
}) {
  const opp = opportunity;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#d4a847]/40 hover:shadow-md hover:shadow-black/[0.04] transition-all duration-150">
      {/* Header row (always visible) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-gray-900 font-semibold text-base">{opp.brand}</h3>
            {tab === 'opportunities' && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-green-100 text-green-700">
                {opp.unlinkedMentions} unlinked
              </span>
            )}
            {tab === 'linked' && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                {opp.linkedMentions} linked
              </span>
            )}
            {tab === 'outreach' && (
              <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-gray-100 text-gray-500">
                No program
              </span>
            )}
            {opp.hasAffiliateProgram && opp.program.commission && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700 hidden sm:inline">
                {opp.program.commission}
              </span>
            )}
          </div>
          {/* Show description preview in collapsed state */}
          <p className="text-sm text-gray-500 line-clamp-1">
            {opp.program.description || `${opp.totalMentions} mention${opp.totalMentions !== 1 ? 's' : ''} across ${opp.pages.length} page${opp.pages.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        >
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-4 pb-4 pt-3">
          {/* What is this product? */}
          {opp.program.description && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">What is {opp.brand}?</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{opp.program.description}</p>
            </div>
          )}

          {/* Program details */}
          {opp.hasAffiliateProgram && (
            <div className="bg-gradient-to-r from-[#d4a847]/[0.08] to-[#d4a847]/[0.03] border border-[#d4a847]/15 rounded-lg px-4 py-3 mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Affiliate Program Details</h4>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider font-medium block">Commission</span>
                  <span className="text-green-700 font-semibold">{opp.program.commission}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider font-medium block">Type</span>
                  <span className="text-[#9a7b1f] font-medium capitalize">
                    {opp.program.type === 'recurring' ? 'Recurring (monthly)' : opp.program.type === 'flat' ? 'One-time payment' : opp.program.type === 'percentage' ? 'Percentage of sale' : opp.program.type}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider font-medium block">Network</span>
                  <span className="text-[#9a7b1f] font-medium capitalize">{NETWORK_NAMES[opp.program.network] || opp.program.network}</span>
                </div>
              </div>
              {opp.program.signupUrl && (
                <a
                  href={opp.program.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#d4a847] to-[#cd7f32] hover:shadow-md hover:shadow-amber-900/20 hover:scale-[1.02] rounded-lg transition-all duration-150"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                    <path d="M10 6.5v3a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h3M7.5 2H10v2.5M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Join {opp.brand} Affiliate Program
                </a>
              )}
            </div>
          )}

          {/* Pages where you can add links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {tab === 'opportunities' ? 'Pages where you can add affiliate links' : tab === 'linked' ? 'Pages with existing links' : 'Pages mentioning this brand'}
            </h4>
            <div className="space-y-3">
              {opp.pages.slice(0, 5).map((page) => (
                <div key={page.url} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-900 hover:text-[#d4a847] truncate flex-1 underline-offset-2 hover:underline"
                    >
                      {page.title || page.url}
                    </a>
                    <span className="text-xs text-gray-400 shrink-0">
                      {page.mentions}x mentioned
                      {page.unlinked > 0 && <span className="text-red-500 ml-1">({page.unlinked} need links)</span>}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mb-2">{page.url}</p>
                  {page.contexts.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Context where {opp.brand} appears:</p>
                      {page.contexts.slice(0, 2).map((ctx, i) => (
                        <p key={i} className="text-xs text-gray-600 leading-relaxed bg-white rounded px-2.5 py-1.5 border border-gray-100">
                          &ldquo;...{ctx}...&rdquo;
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {opp.pages.length > 5 && (
                <p className="text-xs text-gray-400 text-center">
                  +{opp.pages.length - 5} more page{opp.pages.length - 5 !== 1 ? 's' : ''} with mentions
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Content idea generator for suggestions ── */
function getContentIdeas(brand: string, category: string): string[] {
  const ideas: Record<string, string[]> = {
    'art': [
      `"Best places to buy ${brand} prints" comparison article`,
      `"${brand} review: Is it worth it?" honest assessment`,
      `"How to decorate with ${brand}" styling guide`,
    ],
    'home': [
      `"${brand} vs competitors" comparison post`,
      `"My honest ${brand} review after 6 months"`,
      `"Best ${brand} products for small spaces"`,
    ],
    'ecommerce': [
      `"How to set up ${brand}" beginner tutorial`,
      `"${brand} pricing breakdown" analysis`,
      `"Why I switched to ${brand}" case study`,
    ],
    'email': [
      `"${brand} review for beginners" walkthrough`,
      `"Best email marketing tools" (include ${brand})`,
      `"How to grow your list with ${brand}"`,
    ],
    'seo': [
      `"${brand} tutorial for beginners"`,
      `"Is ${brand} worth the price?" analysis`,
      `"How I use ${brand} for keyword research"`,
    ],
    'hosting': [
      `"${brand} review: Speed, uptime, support"`,
      `"Best web hosting for [your niche]" roundup`,
      `"How to migrate to ${brand}" guide`,
    ],
    'design': [
      `"${brand} tutorial for beginners"`,
      `"Best design tools" comparison (include ${brand})`,
      `"How I use ${brand} in my workflow"`,
    ],
    'courses': [
      `"${brand} course review" honest assessment`,
      `"Best online learning platforms" roundup`,
      `"What I learned from ${brand}"`,
    ],
    'travel': [
      `"How to save money with ${brand}"`,
      `"${brand} vs competitors" booking comparison`,
      `"My experience booking through ${brand}"`,
    ],
    'food': [
      `"${brand} review: Is it worth trying?"`,
      `"Best meal kits compared" (include ${brand})`,
      `"My week with ${brand}" honest review`,
    ],
    'print-on-demand': [
      `"${brand} for artists: Complete guide"`,
      `"Best print-on-demand services" comparison`,
      `"How to sell art prints with ${brand}"`,
    ],
    'dating': [
      `"${brand} review: Does it work?"`,
      `"Best dating apps compared" roundup`,
      `"My experience with ${brand}"`,
    ],
    'health': [
      `"${brand} review: Worth the subscription?"`,
      `"Best wellness apps" comparison`,
      `"How ${brand} helped my routine"`,
    ],
    'craft': [
      `"${brand} review for sewers and crafters"`,
      `"Best ${brand} products for beginners"`,
      `"${brand} vs competitors" comparison guide`,
    ],
  };

  return ideas[category] || [
    `"${brand} review" honest assessment`,
    `"Best [category] tools" comparison article`,
    `"How to use ${brand}" tutorial`,
  ];
}

/* ── Friendly network names ── */
const NETWORK_NAMES: Record<string, string> = {
  cj: 'CJ Affiliate',
  impact: 'Impact',
  shareasale: 'ShareASale',
  awin: 'Awin',
  flexoffers: 'FlexOffers',
  rakuten: 'Rakuten',
  partnerstack: 'PartnerStack',
  clickbank: 'ClickBank',
  direct: 'Direct',
  none: '',
};

/* ── Commission value parser for sorting ── */
function parseCommissionValue(commission: string): number {
  // Extract the highest numeric value from commission strings
  // e.g. "$150 per paid signup" → 150, "30% recurring" → 30, "3-5% per sale" → 5
  const numbers = commission.match(/[\d.]+/g);
  if (!numbers) return 0;
  const vals = numbers.map(Number).filter(n => !isNaN(n));
  if (vals.length === 0) return 0;

  const maxVal = Math.max(...vals);
  const isPercentage = commission.includes('%');
  const isRecurring = /recurring|monthly|month/i.test(commission);

  // Flat fees are generally higher value than percentages
  // Weight: flat $100+ > recurring % > one-time %
  if (!isPercentage) return maxVal * 10; // flat fees weighted higher
  if (isRecurring) return maxVal * 5; // recurring % weighted medium
  return maxVal; // one-time percentage
}

type SuggestedSort = 'best-fit' | 'highest-earning' | 'recurring-first';

/* ── Page matching for suggested programs ── */
const CATEGORY_PAGE_KEYWORDS: Record<string, string[]> = {
  'art': ['art', 'paint', 'canvas', 'gallery', 'print', 'poster', 'frame', 'decor', 'wall art', 'artist'],
  'home': ['home', 'decor', 'interior', 'furniture', 'living', 'room', 'design', 'style'],
  'ecommerce': ['shop', 'store', 'buy', 'product', 'sell', 'price', 'collection'],
  'print-on-demand': ['print', 'custom', 'merch', 'product', 'design', 'create'],
  'design': ['design', 'creative', 'graphic', 'logo', 'brand', 'visual'],
  'photography': ['photo', 'camera', 'image', 'picture', 'shoot'],
  'stock-media': ['stock', 'image', 'photo', 'asset', 'media', 'resource'],
  'courses': ['course', 'learn', 'class', 'tutorial', 'workshop', 'guide'],
  'dating': ['date', 'dating', 'relationship', 'couple', 'romance', 'love'],
  'travel': ['travel', 'hotel', 'flight', 'trip', 'vacation', 'destination', 'booking'],
  'food': ['food', 'recipe', 'cook', 'meal', 'restaurant', 'kitchen', 'dinner'],
  'entertainment': ['movie', 'music', 'show', 'event', 'ticket', 'game', 'fun', 'activity'],
  'health': ['health', 'wellness', 'fitness', 'meditation', 'sleep', 'self-care'],
  'email': ['email', 'newsletter', 'subscriber', 'list', 'marketing'],
  'seo': ['seo', 'keyword', 'ranking', 'search', 'traffic', 'organic'],
  'hosting': ['hosting', 'server', 'website', 'domain', 'wordpress'],
  'finance': ['finance', 'money', 'budget', 'invest', 'accounting', 'tax'],
  'fashion': ['fashion', 'style', 'outfit', 'clothing', 'wear', 'trend'],
  'craft': ['sewing', 'quilt', 'craft', 'fabric', 'stitch', 'embroidery', 'pattern', 'machine', 'vacuum', 'diy'],
};

function findBestPages(
  category: string,
  scannedPages: { url: string; title: string }[],
  max = 3
): { url: string; title: string }[] {
  const keywords = CATEGORY_PAGE_KEYWORDS[category];
  if (!keywords || scannedPages.length === 0) return [];

  const scored = scannedPages.map(page => {
    const text = `${page.title} ${page.url}`.toLowerCase();
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score++;
    }
    return { page, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(s => s.page);
}

/* ── Suggested Programs List ── */
function SuggestedProgramsList({ programs, scannedPages }: { programs: SuggestedProgram[]; scannedPages: { url: string; title: string }[] }) {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [expandedNetwork, setExpandedNetwork] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SuggestedSort>('best-fit');

  if (programs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        Could not detect a clear site niche to generate suggestions.
      </div>
    );
  }

  // Group by content angle (reason) so similar suggestions cluster together
  const grouped = new Map<string, SuggestedProgram[]>();
  for (const sp of programs) {
    const key = sp.reason;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(sp);
  }

  // Aggregate affiliate networks across suggested programs
  const NETWORK_INFO: Record<string, { name: string; description: string; url: string }> = {
    cj: { name: 'CJ Affiliate', description: 'One of the largest affiliate networks with thousands of merchants across every category.', url: 'https://signup.cj.com/member/signup/publisher/' },
    impact: { name: 'Impact', description: 'Modern affiliate platform used by major brands across e-commerce, SaaS, and more.', url: 'https://impact.com/' },
    shareasale: { name: 'ShareASale', description: 'Popular network with 30,000+ merchants across every category.', url: 'https://www.shareasale.com/newsignup.cfm' },
    awin: { name: 'Awin', description: 'Global affiliate network (owns ShareASale). Strong in travel, retail, and finance.', url: 'https://www.awin.com/us/publishers' },
    flexoffers: { name: 'FlexOffers', description: 'Growing network with 12,000+ advertisers across all niches.', url: 'https://www.flexoffers.com/' },
    rakuten: { name: 'Rakuten Advertising', description: 'Premium network with major retail and lifestyle brands.', url: 'https://rakutenadvertising.com/' },
    partnerstack: { name: 'PartnerStack', description: 'B2B SaaS affiliate network for software partnerships.', url: 'https://partnerstack.com/' },
  };

  const networkCounts = new Map<string, { count: number; brands: { name: string; commission: string; type: string }[] }>();
  for (const sp of programs) {
    const net = sp.program.network;
    if (net && net !== 'none' && net !== 'direct' && NETWORK_INFO[net]) {
      const entry = networkCounts.get(net) || { count: 0, brands: [] };
      entry.count++;
      entry.brands.push({ name: sp.program.brand, commission: sp.program.commission, type: sp.program.type || '' });
      networkCounts.set(net, entry);
    }
  }

  const topNetworks = [...networkCounts.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3)
    .filter(([, data]) => data.count >= 2);

  // Programs that require direct signup (not through a network)
  const topNetworkKeys = new Set(topNetworks.map(([k]) => k));
  const directPrograms = programs.filter(sp => {
    const net = sp.program.network;
    return !net || net === 'none' || net === 'direct' || !topNetworkKeys.has(net);
  });

  // Compute insights for the summary panel
  const recurringPrograms = programs.filter(sp => sp.program.type === 'recurring');
  const flatPrograms = programs.filter(sp => sp.program.type === 'flat');
  const percentagePrograms = programs.filter(sp => sp.program.type === 'percentage');

  // Top earners by parsed commission value
  const programsByEarning = [...programs].sort((a, b) =>
    parseCommissionValue(b.program.commission) - parseCommissionValue(a.program.commission)
  );
  const topEarners = programsByEarning.slice(0, 5);

  // Category breakdown
  const categoryBreakdown = new Map<string, number>();
  for (const sp of programs) {
    categoryBreakdown.set(sp.program.category, (categoryBreakdown.get(sp.program.category) || 0) + 1);
  }
  const topCategories = [...categoryBreakdown.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Content strategy count
  const strategyCount = grouped.size;

  // Network count
  const uniqueNetworks = new Set(programs.map(sp => sp.program.network).filter(n => n && n !== 'none' && n !== 'direct'));

  const [insightsOpen, setInsightsOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Insights panel */}
      <div className="bg-white border border-[#d4a847]/20 rounded-xl overflow-hidden shadow-sm">
        <button
          onClick={() => setInsightsOpen(!insightsOpen)}
          className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-[#d4a847]/[0.02] transition-colors"
        >
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black flex items-center justify-center shrink-0 shadow-sm">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 2.5L10.5 6.5H15L11.5 9L12.5 13.5L9 11L5.5 13.5L6.5 9L3 6.5H7.5L9 2.5Z" fill="currentColor"/>
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-gray-900">
              {programs.length} programs matched to your niche
            </p>
            <p className="text-sm text-gray-500">
              {strategyCount} content strategies across {uniqueNetworks.size} network{uniqueNetworks.size !== 1 ? 's' : ''}. Click to see the full breakdown.
            </p>
          </div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`shrink-0 text-gray-400 transition-transform duration-200 ${insightsOpen ? 'rotate-180' : ''}`}
          >
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {insightsOpen && (
          <div className="border-t border-[#d4a847]/10 px-5 pb-5">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mb-5">
              {[
                { value: programs.length.toString(), label: 'Total programs', color: 'text-gray-900' },
                { value: recurringPrograms.length.toString(), label: 'Recurring revenue', color: 'text-green-700' },
                { value: uniqueNetworks.size.toString(), label: 'Networks to join', color: 'text-[#9a7b1f]' },
                { value: strategyCount.toString(), label: 'Content strategies', color: 'text-blue-700' },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Two-column layout */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Left: Top earners */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Highest earning potential</h4>
                <div className="space-y-1.5">
                  {topEarners.map((sp, i) => (
                    <button
                      key={sp.program.brand}
                      onClick={() => {
                        setInsightsOpen(false);
                        setExpandedProgram(sp.program.brand);
                        setTimeout(() => {
                          document.getElementById(`suggested-${sp.program.brand}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 150);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#d4a847]/[0.06] transition-colors text-left group cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-[10px] flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-sm font-medium text-gray-900 group-hover:text-[#9a7b1f] transition-colors truncate">{sp.program.brand}</span>
                      <span className="text-sm font-semibold text-green-700 shrink-0">{sp.program.commission}</span>
                      {sp.program.type === 'recurring' && (
                        <span className="text-[10px] font-bold text-[#9a7b1f] bg-[#d4a847]/10 px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider">Recurring</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Category breakdown + revenue types */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Programs by category</h4>
                  <div className="space-y-1.5">
                    {topCategories.map(([cat, count]) => {
                      const pct = Math.round((count / programs.length) * 100);
                      return (
                        <div key={cat} className="flex items-center gap-3">
                          <span className="text-sm text-gray-700 capitalize flex-1 min-w-0 truncate">{cat.replace(/-/g, ' ')}</span>
                          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden shrink-0">
                            <div
                              className="h-full bg-gradient-to-r from-[#d4a847] to-[#cd7f32] rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 font-medium w-6 text-right shrink-0">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Revenue types</h4>
                  <div className="flex flex-wrap gap-2">
                    {recurringPrograms.length > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg text-xs font-medium text-green-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {recurringPrograms.length} recurring
                      </span>
                    )}
                    {flatPrograms.length > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs font-medium text-blue-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {flatPrograms.length} one-time
                      </span>
                    )}
                    {percentagePrograms.length > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-lg text-xs font-medium text-amber-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {percentagePrograms.length} percentage
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick tip at the bottom */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-start gap-2.5">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#9a7b1f] shrink-0 mt-0.5">
                <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-sm text-gray-600">
                <strong className="text-gray-800">Start with recurring programs.</strong> They pay monthly as long as the customer stays subscribed. {recurringPrograms.length > 0 ? `${recurringPrograms[0].program.brand}${recurringPrograms.length > 1 ? `, ${recurringPrograms[1].program.brand},` : ''} and others offer recurring commissions here.` : 'Sort by "Recurring First" below to find them.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Signup shortcuts: networks + direct programs side by side */}
      {(topNetworks.length > 0 || directPrograms.length > 0) && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="text-[#9a7b1f] shrink-0">
              <path d="M9 3v4l3 2M15 9a6 6 0 11-12 0 6 6 0 0112 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm font-semibold text-gray-600">Where to sign up</p>
          </div>

          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {/* Left: Networks */}
            {topNetworks.length > 0 && (
              <div className="flex-1 p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Networks ({topNetworks.reduce((sum, [, d]) => sum + d.count, 0)} programs)</p>
                <p className="text-sm text-gray-600 mb-3">One signup gives you access to multiple programs.</p>
                <div className="space-y-3">
                  {topNetworks.map(([netKey, data]) => {
                    const info = NETWORK_INFO[netKey];
                    const isExpanded = expandedNetwork === netKey;
                    const previewBrands = data.brands.slice(0, 4);
                    const remaining = data.count - previewBrands.length;
                    return (
                      <div key={netKey} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">{info.name}</span>
                              <span className="text-xs font-bold text-[#9a7b1f] bg-[#d4a847]/10 px-2 py-0.5 rounded-full shrink-0">
                                {data.count} programs
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{info.description}</p>
                          </div>
                          <a
                            href={info.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-black bg-gradient-to-r from-[#d4a847] to-[#cd7f32] hover:shadow-md hover:shadow-amber-900/15 hover:scale-[1.02] rounded-lg transition-all duration-150"
                          >
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="shrink-0">
                              <path d="M10 6.5v3a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h3M7.5 2H10v2.5M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Join
                          </a>
                        </div>
                        {/* Brand preview / expanded list */}
                        {!isExpanded ? (
                          <p className="text-xs text-gray-400 mt-2">
                            {previewBrands.map(b => b.name).join(', ')}
                            {remaining > 0 && (
                              <button
                                onClick={() => setExpandedNetwork(netKey)}
                                className="ml-1 text-[#9a7b1f] hover:text-[#7a5f0f] font-medium cursor-pointer"
                              >
                                +{remaining} more
                              </button>
                            )}
                          </p>
                        ) : (
                          <div className="mt-2 space-y-1">
                            {data.brands.map((b, i) => (
                              <div key={b.name} className={`flex items-center justify-between text-xs py-1 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                                <span className="text-gray-700 font-medium">{b.name}</span>
                                <span className="text-green-700 font-medium">{b.commission}</span>
                              </div>
                            ))}
                            <button
                              onClick={() => setExpandedNetwork(null)}
                              className="text-xs text-[#9a7b1f] hover:text-[#7a5f0f] font-medium mt-1 cursor-pointer"
                            >
                              Show less
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Right: Direct signup chips */}
            {directPrograms.length > 0 && (
              <div className={`${topNetworks.length > 0 ? 'md:w-[45%]' : 'w-full'} p-4`}>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Direct signup ({directPrograms.length})</p>
                <p className="text-sm text-gray-600 mb-3">Sign up through each brand&apos;s website.</p>
                <div className="flex flex-wrap gap-1.5">
                  {directPrograms.map(sp => (
                    <button
                      key={sp.program.brand}
                      onClick={() => {
                        setExpandedProgram(sp.program.brand);
                        setTimeout(() => {
                          document.getElementById(`suggested-${sp.program.brand}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-700 hover:border-[#d4a847]/40 hover:bg-[#d4a847]/5 transition-colors cursor-pointer"
                    >
                      {sp.program.brand}
                      <span className="text-green-700 font-medium">{sp.program.commission}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sort controls */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Sort:</span>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {([
            ['best-fit', 'Best Fit'],
            ['highest-earning', 'Highest Earning'],
            ['recurring-first', 'Recurring First'],
          ] as [SuggestedSort, string][]).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSortBy(value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                sortBy === value
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Program listings */}
      {(() => {
        // Build sorted flat list for non-default sorts
        const sortedPrograms = sortBy === 'best-fit' ? null : [...programs].sort((a, b) => {
          if (sortBy === 'highest-earning') {
            return parseCommissionValue(b.program.commission) - parseCommissionValue(a.program.commission);
          }
          // recurring-first
          const typeOrder = { recurring: 0, flat: 1, percentage: 2, none: 3 };
          const diff = (typeOrder[a.program.type] ?? 3) - (typeOrder[b.program.type] ?? 3);
          if (diff !== 0) return diff;
          return parseCommissionValue(b.program.commission) - parseCommissionValue(a.program.commission);
        });

        const renderProgramRow = (sp: SuggestedProgram, idx: number) => {
          const isExpanded = expandedProgram === sp.program.brand;
          const contentIdeas = getContentIdeas(sp.program.brand, sp.program.category);
          const bestPages = findBestPages(sp.program.category, scannedPages);

          return (
            <div key={sp.program.brand} id={`suggested-${sp.program.brand}`} className={`transition-colors ${idx % 2 === 1 ? 'bg-[#d4a847]/[0.04]' : 'hover:bg-gray-50/50'}`}>
              <button
                onClick={() => setExpandedProgram(isExpanded ? null : sp.program.brand)}
                className="w-full px-5 py-4 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-gray-900 font-semibold text-lg">{sp.program.brand}</h4>
                      <span className="font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded text-sm">
                        {sp.program.commission}
                      </span>
                      {sp.program.network && sp.program.network !== 'none' && sp.program.network !== 'direct' && NETWORK_NAMES[sp.program.network] ? (
                        <span className="text-sm text-gray-400 font-medium">
                          via {NETWORK_NAMES[sp.program.network]}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400 font-medium">
                          Direct signup
                        </span>
                      )}
                      {sortBy === 'recurring-first' && sp.program.type === 'recurring' && (
                        <span className="text-xs font-semibold text-[#9a7b1f] bg-[#d4a847]/10 px-2 py-0.5 rounded-full">
                          Recurring
                        </span>
                      )}
                    </div>
                    <p className="text-base text-gray-500 line-clamp-1">
                      {sp.program.description || `${sp.program.category.replace(/-/g, ' ')} affiliate program`}
                    </p>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`shrink-0 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {isExpanded && (() => {
                const net = sp.program.network;
                const isNetworkProgram = net && net !== 'none' && net !== 'direct' && NETWORK_INFO[net];
                const networkUrl = isNetworkProgram ? NETWORK_INFO[net].url : null;
                const networkName = isNetworkProgram ? NETWORK_INFO[net].name : null;

                return (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Content ideas</h5>
                      <ul className="space-y-1">
                        {contentIdeas.map((idea, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-[#d4a847] font-semibold shrink-0">{i + 1}.</span>
                            {idea}
                          </li>
                        ))}
                      </ul>

                      {bestPages.length > 0 && (
                        <div className="mt-4">
                          <h5 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Best pages to add this</h5>
                          <div className="space-y-1">
                            {bestPages.map((page) => (
                              <a
                                key={page.url}
                                href={page.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#b8860b] transition-colors group"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-gray-300 group-hover:text-[#d4a847] transition-colors">
                                  <path d="M2 3h8M2 6h8M2 9h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                                </svg>
                                <span className="truncate">{page.title || page.url}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:w-96 shrink-0">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                        <div className="space-y-3 mb-5">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Commission</span>
                            <span className="text-green-700 font-semibold text-base">{sp.program.commission}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Type</span>
                            <span className="text-gray-700 font-medium text-base capitalize">
                              {sp.program.type === 'recurring' ? 'Recurring' : sp.program.type === 'flat' ? 'One-time' : sp.program.type === 'percentage' ? '% of Sale' : sp.program.type}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">Network</span>
                            <span className="text-gray-700 font-medium text-base">{NETWORK_NAMES[sp.program.network] || sp.program.network || 'Direct'}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {isNetworkProgram && networkUrl ? (
                            <a
                              href={networkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#d4a847] to-[#cd7f32] hover:shadow-md hover:shadow-amber-900/20 hover:scale-[1.02] rounded-lg transition-all duration-150"
                            >
                              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="shrink-0">
                                <path d="M10 6.5v3a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h3M7.5 2H10v2.5M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Join via {networkName}
                            </a>
                          ) : sp.program.signupUrl ? (
                            <a
                              href={sp.program.signupUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-black bg-gradient-to-r from-[#d4a847] to-[#cd7f32] hover:shadow-md hover:shadow-amber-900/20 hover:scale-[1.02] rounded-lg transition-all duration-150"
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                                <path d="M10 6.5v3a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h3M7.5 2H10v2.5M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Join Affiliate Program
                            </a>
                          ) : null}

                          {sp.program.signupUrl && (
                            <a
                              href={sp.program.signupUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
                            >
                              Visit {sp.program.brand}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })()}
            </div>
          );
        };

        if (sortedPrograms) {
          // Flat sorted list
          return (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#9a7b1f] shrink-0">
                  <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-sm font-semibold text-gray-600">
                  {sortBy === 'highest-earning' ? 'Sorted by earning potential' : 'Recurring revenue first'}
                </p>
                <span className="text-xs text-gray-400 ml-auto">{sortedPrograms.length} programs</span>
              </div>
              <div className="divide-y divide-gray-100">
                {sortedPrograms.map((sp, idx) => renderProgramRow(sp, idx))}
              </div>
            </div>
          );
        }

        // Default: grouped by content strategy
        return [...grouped.entries()].map(([reason, items]) => (
          <div key={reason} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#9a7b1f] shrink-0">
                <path d="M2 4h12M2 8h12M2 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="text-sm font-semibold text-gray-600">{reason}</p>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((sp, idx) => renderProgramRow(sp, idx))}
            </div>
          </div>
        ));
      })()}

    </div>
  );
}
