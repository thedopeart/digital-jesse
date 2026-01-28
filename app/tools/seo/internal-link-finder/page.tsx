'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { PageData, LinkRecommendation, PageLinkStats } from '@/lib/tools/text-analysis';

type AnalysisMode = 'sitemap' | 'single';
type ViewFilter = 'all' | 'new' | 'existing';
type RelevanceFilter = 'all' | 'High' | 'Medium' | 'Low';
type ResultsTab = 'recommendations' | 'pages';

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
        className={`overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-48 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

interface CrawlResponse {
  pages: PageData[];
  errors: { url: string; error: string }[];
  totalFound: number;
  totalCrawled: number;
}

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export default function InternalLinkFinderPage() {
  const [mode, setMode] = useState<AnalysisMode>('sitemap');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [focusUrl, setFocusUrl] = useState('');
  const [maxPages, setMaxPages] = useState(50);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const [recommendations, setRecommendations] = useState<LinkRecommendation[]>([]);
  const [pageLinkStats, setPageLinkStats] = useState<PageLinkStats[]>([]);
  const [crawlStats, setCrawlStats] = useState<{ found: number; crawled: number; errors: number } | null>(null);

  const [viewFilter, setViewFilter] = useState<ViewFilter>('new');
  const [relevanceFilter, setRelevanceFilter] = useState<RelevanceFilter>('all');
  const [resultsTab, setResultsTab] = useState<ResultsTab>('recommendations');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const runAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setRecommendations([]);
    setPageLinkStats([]);
    setCrawlStats(null);
    setProgress('Fetching and parsing pages...');

    try {
      const payload: Record<string, unknown> = { maxPages };

      if (mode === 'sitemap') {
        if (!sitemapUrl.trim()) {
          setError('Enter a sitemap URL or domain to analyze.');
          setIsLoading(false);
          return;
        }
        let url = sitemapUrl.trim();
        if (!url.startsWith('http')) url = 'https://' + url;
        payload.sitemapUrl = url;
      } else {
        if (!focusUrl.trim()) {
          setError('Enter a URL to analyze.');
          setIsLoading(false);
          return;
        }
        if (!sitemapUrl.trim()) {
          setError('Enter a sitemap URL or domain so we know which pages to compare against.');
          setIsLoading(false);
          return;
        }
        let sitemap = sitemapUrl.trim();
        if (!sitemap.startsWith('http')) sitemap = 'https://' + sitemap;
        payload.sitemapUrl = sitemap;
      }

      const res = await fetch('/api/tools/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Request failed: ${res.status}`);
      }

      const data: CrawlResponse = await res.json();

      setCrawlStats({
        found: data.totalFound,
        crawled: data.totalCrawled,
        errors: data.errors.length,
      });

      if (data.pages.length < 2) {
        setError('Need at least 2 pages to find link opportunities. Try a different sitemap or add more URLs.');
        setIsLoading(false);
        return;
      }

      setProgress('Analyzing content and finding link opportunities...');

      const { findLinkOpportunities, getPageLinkStats } = await import('@/lib/tools/text-analysis');
      const focus = mode === 'single' ? focusUrl.trim() : undefined;
      const results = findLinkOpportunities(data.pages, focus);
      const stats = getPageLinkStats(data.pages);

      setRecommendations(results);
      setPageLinkStats(stats);
      setProgress('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [mode, sitemapUrl, focusUrl, maxPages]);

  const copyAnchorHtml = useCallback((rec: LinkRecommendation, index: number) => {
    const html = `<a href="${rec.targetUrl}">${rec.suggestedAnchorText}</a>`;
    navigator.clipboard.writeText(html);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  const exportCsv = useCallback(() => {
    const data = getFiltered();
    const header = 'Source URL,Source Title,Target URL,Target Title,Anchor Text,Relevance,Already Linked';
    const rows = data.map(r =>
      [
        csvEscape(r.sourceUrl),
        csvEscape(r.sourceTitle),
        csvEscape(r.targetUrl),
        csvEscape(r.targetTitle),
        csvEscape(r.suggestedAnchorText),
        r.relevance,
        r.alreadyLinked ? 'Yes' : 'No',
      ].join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internal-link-recommendations.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [recommendations, viewFilter, relevanceFilter]);

  const getFiltered = useCallback(() => {
    return recommendations.filter(r => {
      if (viewFilter === 'new' && r.alreadyLinked) return false;
      if (viewFilter === 'existing' && !r.alreadyLinked) return false;
      if (relevanceFilter !== 'all' && r.relevance !== relevanceFilter) return false;
      return true;
    });
  }, [recommendations, viewFilter, relevanceFilter]);

  const filtered = getFiltered();
  const newCount = recommendations.filter(r => !r.alreadyLinked).length;
  const existingCount = recommendations.filter(r => r.alreadyLinked).length;

  const sortedPageStats = useMemo(() => {
    return [...pageLinkStats].sort((a, b) => a.outboundInternalLinks - b.outboundInternalLinks);
  }, [pageLinkStats]);

  const orphanPages = useMemo(() => {
    return pageLinkStats.filter(p => p.inboundInternalLinks === 0);
  }, [pageLinkStats]);

  const orphanUrls = useMemo(() => {
    return new Set(orphanPages.map(p => p.url));
  }, [orphanPages]);

  // Real stats from API
  const [realStats, setRealStats] = useState<{ sites_analyzed: number; links_found: number; pages_crawled: number } | null>(null);
  useEffect(() => {
    fetch('/api/tools/stats?tool=internal-link-finder')
      .then(res => res.json())
      .then(data => setRealStats(data))
      .catch(() => {});
  }, []);

  const statSites = useCountUp(realStats?.sites_analyzed || 0, 2200, !!realStats && realStats.sites_analyzed > 0);
  const statLinks = useCountUp(realStats?.links_found || 0, 2400, !!realStats && realStats.links_found > 0);
  const statPages = useCountUp(realStats?.pages_crawled || 0, 2600, !!realStats && realStats.pages_crawled > 0);

  return (
    <div className="min-h-screen">
      {/* Header (dark section - compact) */}
      <section className="bg-[#1e1e1e] pt-2 pb-8 md:pb-10">
        {/* Breadcrumb - aligned with header logo */}
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
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
            Internal Link{' '}
            <span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">
              Finder
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-4 leading-relaxed max-w-2xl mx-auto">
            Most sites are leaving <strong className="text-gray-200">easy SEO wins</strong> on the table. <strong className="text-gray-200">Paste your sitemap or just your domain</strong> and get exact page-to-page link suggestions with copy-ready anchor text.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            <span className="px-3 py-1 text-xs font-semibold bg-[#d4a847]/10 text-[#d4a847] rounded-full border border-[#d4a847]/20 uppercase tracking-wide">
              SEO
            </span>
            {['100% Free', 'No Signup', 'CSV Export'].map((label) => (
              <span
                key={label}
                className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/10"
              >
                {label}
              </span>
            ))}
          </div>

          {/* Real stats (only shown when data exists) */}
          {realStats && realStats.sites_analyzed > 0 && (
            <div className="flex justify-center gap-8 md:gap-12">
              {[
                { value: statSites.toLocaleString() + '+', label: 'Sites analyzed' },
                { value: statLinks.toLocaleString() + '+', label: 'Links found' },
                { value: statPages.toLocaleString() + '+', label: 'Pages crawled' },
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

      {/* Tool (light section) */}
      <section className="bg-[#f5f5f0] py-12 md:py-16">
        <div className={`${recommendations.length > 0 ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-6 transition-all duration-300`}>
          {/* Input Card */}
          <div id="tool-input" className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03] text-left max-w-3xl mx-auto">
            {/* Mode Toggle + Max Pages */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => setMode('sitemap')}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  mode === 'sitemap'
                    ? 'bg-[#d4a847] text-black shadow-sm shadow-[#d4a847]/25'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                Full Site Scan
              </button>
              <button
                onClick={() => setMode('single')}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                  mode === 'single'
                    ? 'bg-[#d4a847] text-black shadow-sm shadow-[#d4a847]/25'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100'
                }`}
              >
                Single Page Focus
              </button>
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
                  {mode === 'sitemap' ? 'Sitemap URL or domain' : 'Sitemap URL (pages to compare against)'}
                </label>
                <input
                  type="text"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://example.com/sitemap.xml or example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-2 focus:ring-[#d4a847]/20 focus:bg-white transition-colors"
                />
              </div>

              {mode === 'single' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Focus URL (the page you want link recommendations for)
                  </label>
                  <input
                    type="text"
                    value={focusUrl}
                    onChange={(e) => setFocusUrl(e.target.value)}
                    placeholder="https://example.com/blog/my-new-post"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-2 focus:ring-[#d4a847]/20 focus:bg-white transition-colors"
                  />
                </div>
              )}

              <button
                onClick={runAnalysis}
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
                  isLoading
                    ? 'bg-[#d4a847]/40 text-black/50 cursor-wait'
                    : 'bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black hover:shadow-lg hover:shadow-amber-900/20 hover:scale-[1.01]'
                }`}
              >
                {isLoading ? 'Analyzing...' : 'Find Link Opportunities'}
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

          {/* Results (inline, between input and How It Works) */}
          {recommendations.length > 0 && (
            <div className="mt-10">
              {/* Results Control Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03] mb-6">
                {/* Row 1: title + stats + export */}
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-gray-900 mr-1">Results</h2>
                  {crawlStats && (
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                        <span className="text-gray-400 text-[10px] block leading-tight">Pages Crawled</span>
                        <span className="text-gray-900 font-semibold text-sm">{crawlStats.crawled}</span>
                      </div>
                      <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-gray-400 text-[10px] block leading-tight">New Links</span>
                        <span className="text-green-700 font-semibold text-sm">{newCount}</span>
                      </div>
                      {orphanPages.length > 0 && (
                        <div className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                          <span className="text-gray-400 text-[10px] block leading-tight">Orphans</span>
                          <span className="text-red-600 font-semibold text-sm">{orphanPages.length}</span>
                        </div>
                      )}
                      {crawlStats.errors > 0 && (
                        <div className="px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <span className="text-gray-400 text-[10px] block leading-tight">Errors</span>
                          <span className="text-yellow-700 font-semibold text-sm">{crawlStats.errors}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    onClick={exportCsv}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black font-semibold text-sm rounded-lg hover:shadow-md hover:shadow-amber-900/15 hover:scale-[1.02] transition-all duration-200 ml-auto"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2v7M7 9L4.5 6.5M7 9L9.5 6.5M2.5 11h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Export CSV
                  </button>
                </div>

                {/* Row 2: tabs + filters */}
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setResultsTab('recommendations')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        resultsTab === 'recommendations'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Recommendations
                    </button>
                    <button
                      onClick={() => setResultsTab('pages')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        resultsTab === 'pages'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Pages Overview
                    </button>
                  </div>
                  {resultsTab === 'recommendations' && (
                    <>
                      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                        {(['new', 'all', 'existing'] as ViewFilter[]).map((f) => (
                          <button
                            key={f}
                            onClick={() => setViewFilter(f)}
                            className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                              viewFilter === f
                                ? 'bg-[#d4a847] text-black shadow-sm'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            {f === 'new' ? `New (${newCount})` : f === 'existing' ? `Existing (${existingCount})` : `All (${recommendations.length})`}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                        {(['all', 'High', 'Medium', 'Low'] as RelevanceFilter[]).map((f) => (
                          <button
                            key={f}
                            onClick={() => setRelevanceFilter(f)}
                            className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                              relevanceFilter === f
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            {f === 'all' ? 'Any' : f}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Recommendations Tab */}
              {resultsTab === 'recommendations' && (
                <>

                  {/* Cards Grid */}
                  {filtered.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      No recommendations match your current filters.
                    </div>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-3">
                        {filtered.slice(0, 50).map((rec, i) => (
                          <div
                            key={`${rec.sourceUrl}-${rec.targetUrl}-${i}`}
                            className={`bg-white border rounded-xl p-4 transition-all duration-150 ${
                              rec.alreadyLinked
                                ? 'border-gray-200 opacity-50'
                                : 'border-gray-200 hover:border-[#d4a847]/40 hover:shadow-md hover:shadow-black/[0.04]'
                            }`}
                          >
                            {/* Top row: badges */}
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                                rec.relevance === 'High'
                                  ? 'bg-green-100 text-green-700'
                                  : rec.relevance === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-500'
                              }`}>
                                {rec.relevance}
                              </span>
                              {orphanUrls.has(rec.targetUrl) && (
                                <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
                                  Orphaned
                                </span>
                              )}
                              {rec.alreadyLinked && (
                                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                  Already linked
                                </span>
                              )}
                            </div>

                            {/* Source → Target */}
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-900 leading-snug truncate" title={rec.sourceTitle || rec.sourceUrl}>
                                {rec.sourceTitle || rec.sourceUrl}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#d4a847]">
                                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p className="text-sm text-gray-500 truncate" title={rec.targetTitle || rec.targetUrl}>
                                  {rec.targetTitle || rec.targetUrl}
                                </p>
                              </div>
                            </div>

                            {/* Anchor text */}
                            <div className="bg-[#d4a847]/[0.06] border border-[#d4a847]/15 rounded-lg px-3 py-2">
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">Anchor text</p>
                              <code className="text-sm text-[#9a7b1f] font-medium break-words">
                                {rec.suggestedAnchorText}
                              </code>
                            </div>

                            {/* Actions: Copy HTML + Open source page */}
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={() => copyAnchorHtml(rec, i)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap ${
                                  copiedIndex === i
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 hover:bg-[#d4a847]/10 text-gray-500 hover:text-[#9a7b1f]'
                                }`}
                              >
                                {copiedIndex === i ? 'Copied!' : 'Copy HTML'}
                              </button>
                              <a
                                href={rec.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-[#9a7b1f] bg-gray-100 hover:bg-[#d4a847]/10 rounded-md transition-all duration-150"
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                                  <path d="M10 6.5v3a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h3M7.5 2H10v2.5M10 2L5.5 6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Open source page
                              </a>
                            </div>

                            {/* Reason */}
                            {rec.reason && (
                              <p className="text-xs text-gray-400 mt-2.5 leading-relaxed">{rec.reason}</p>
                            )}
                          </div>
                        ))}
                      </div>
                      {filtered.length > 50 && (
                        <p className="text-center text-gray-400 text-sm py-4 mt-2">
                          Showing top 50 of {filtered.length}. Export CSV for the full list.
                        </p>
                      )}
                    </>
                  )}
                </>
              )}

              {/* Pages Overview Tab */}
              {resultsTab === 'pages' && (
                <div className="space-y-6">
                  {orphanPages.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                      <div className="px-5 py-3 border-b border-red-200 bg-red-50">
                        <h3 className="text-sm font-semibold text-red-800">
                          Orphan Pages ({orphanPages.length})
                        </h3>
                        <p className="text-xs text-red-600/80 mt-0.5">
                          No other crawled pages link to these. Search engines may not find them.
                        </p>
                      </div>
                      <div className="px-5 py-3 space-y-1.5">
                        {orphanPages.map(p => (
                          <p key={p.url} className="text-sm text-gray-700 truncate">
                            {p.title || p.url}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-sm font-semibold text-gray-900">All Pages (sorted by fewest outbound links)</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Pages at the top need internal links the most.</p>
                    </div>
                    {/* Column headers */}
                    <div className="px-5 py-2 flex items-center gap-4 border-b border-gray-100 bg-gray-50/50">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Page</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 text-center">
                        <div className="w-16" title="Internal links on this page pointing to other pages on your site">
                          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Links out</p>
                        </div>
                        <div className="w-16" title="Internal links from other pages on your site pointing to this page">
                          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Links in</p>
                        </div>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {sortedPageStats.map(page => (
                        <div key={page.url} className="px-5 py-3 flex items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 truncate">{page.title || page.url}</p>
                            <p className="text-xs text-gray-400 truncate">{page.url}</p>
                          </div>
                          <div className="flex items-center gap-4 shrink-0 text-center">
                            <div className="w-16">
                              <p className={`text-sm font-semibold ${page.outboundInternalLinks < 3 ? 'text-red-600' : page.outboundInternalLinks < 10 ? 'text-yellow-600' : 'text-gray-700'}`}>
                                {page.outboundInternalLinks}
                              </p>
                            </div>
                            <div className="w-16">
                              <p className={`text-sm font-semibold ${page.inboundInternalLinks === 0 ? 'text-red-600' : page.inboundInternalLinks < 3 ? 'text-yellow-600' : 'text-gray-700'}`}>
                                {page.inboundInternalLinks}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
                      <p className="text-xs text-gray-500">
                        <strong className="text-gray-700">Links out</strong> = internal links on this page to other pages on your site. <strong className="text-gray-700">Links in</strong> = other pages on your site that link to this page. This doesn&apos;t track external backlinks.
                      </p>
                    </div>
                  </div>
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
                  { step: '1', title: 'Drop in your URL', desc: 'Sitemap URL or just your domain. The tool finds and pulls every page it can.' },
                  { step: '2', title: 'Content gets scored', desc: 'Every page is analyzed for keywords, headings, and existing links using TF-IDF scoring to find topical overlap.' },
                  { step: '3', title: 'Get your link map', desc: 'You get specific page-to-page recommendations with anchor text ready to copy straight into your CMS.' },
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

      {/* What You Get + How to Use (combined dark section) */}
      <section className="bg-[#1e1e1e] py-14 md:py-18 border-t border-[#d4a847]/10">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">What you get</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto text-center">
              Not just a list of related pages. You get specific output you can act on right now.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {[
              { title: 'Page-to-page recommendations', desc: 'The tool tells you exactly which pages should link to which, based on keyword overlap across titles, headings, and body content.' },
              { title: 'Copy-ready anchor text', desc: 'Every recommendation includes anchor text pulled from the source page. Hit copy, paste the HTML into your CMS, done.' },
              { title: 'Relevance scoring', desc: 'Each suggestion is rated High, Medium, or Low so you know which links to add first and which ones can wait.' },
              { title: 'Orphan page detection', desc: 'Pages with zero inbound links are basically invisible to Google. This flags every one of them so you can fix it.' },
              { title: 'Full link overview', desc: 'Inbound and outbound counts for every page on your site. Sorted so the most under-linked pages are right at the top.' },
              { title: 'CSV export', desc: 'Download everything as a spreadsheet. Use it as a checklist, hand it to your team, or track progress over time.' },
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
              { step: '1', title: 'Fix orphan pages first', desc: 'Zero inbound links means Google probably can\'t find them. Check the Pages Overview tab and link to each orphan from at least 2-3 related pages.' },
              { step: '2', title: 'Hit the High relevance ones next', desc: 'Filter by "High" relevance. These have the strongest topical match and give you the biggest SEO return per link.' },
              { step: '3', title: 'Copy and paste the HTML', desc: 'Click "Copy" on any recommendation to grab the full link tag. Open the source page in your CMS, find a natural spot, paste it in.' },
              { step: '4', title: 'Export and track your progress', desc: 'Download the CSV to keep a checklist. Track what you\'ve added, hand it to your dev team, or come back to it later.' },
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

      {/* Why Internal Links Matter + FAQ (light section) */}
      <section className="bg-[#f5f5f0] py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-6">
          {/* Why it matters */}
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why internal links matter</h2>
          </FadeIn>
          <div className="space-y-4 text-gray-700 text-base leading-relaxed mb-14">
            <FadeIn delay={100}>
              <p>
                Internal links are one of the few ranking factors you have full control over. Every link between your own pages tells Google which content is connected and how your site is structured. That's how it <strong className="text-gray-900">discovers new pages, maps topic relationships, and decides where to send ranking authority</strong>.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <p>
                Here's what that looks like in practice. You've got a blog post stuck on page 2. Add 3-4 internal links to it from relevant pages and there's a real chance it moves to page 1. No backlink outreach, no new content. Just connecting what you already have.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <p>
                The problem? Most sites don't do this consistently. You publish something new, forget to link to it from older posts, and it sits there with zero inbound links. Google can't find it. <strong className="text-gray-900">This tool catches those gaps</strong> and gives you the exact links to add, anchor text included. It's one of several{' '}
                <Link href="/tools" className="text-[#b8860b] hover:text-[#d4a847] underline underline-offset-2">
                  free SEO tools
                </Link>{' '}
                I've built to cut through the tedious parts of site work.
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
                question="Do I need a sitemap?"
                answer="Nope. Just paste your domain and the tool will try to find your sitemap automatically. It checks common paths like /sitemap.xml and /sitemap_index.xml. If it can't find one, it crawls from your homepage."
              />
              <FaqItem
                question="How many pages can it analyze?"
                answer="Up to 100 per scan. For most sites that's plenty to get a solid set of recommendations. If your site is larger, run it a few times with different sitemaps or sections."
              />
              <FaqItem
                question="What's TF-IDF scoring?"
                answer="It's a way to figure out which words actually matter on a page, not just which ones show up the most. Common words like 'the' get filtered out. The tool uses this to find real topical overlap between pages, not just surface-level keyword matches."
              />
              <FaqItem
                question="Will this work on any site?"
                answer="Any publicly accessible site with crawlable pages. It works best on content-heavy sites (blogs, docs, e-commerce) where there are real opportunities to cross-link. Single-page apps or sites behind logins won't work."
              />
              <FaqItem
                question="Is my data stored anywhere?"
                answer="No. Everything runs in your browser and on our server during the scan. Nothing is saved after the page closes. Your URLs, content, and results aren't stored or shared."
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Bottom CTA (dark) */}
      <section className="bg-[#1e1e1e] py-12 md:py-16 border-t border-[#d4a847]/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to find your missing links?</h2>
            <p className="text-gray-400 text-base mb-6">Takes about 30 seconds. No signup, no cost.</p>
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
