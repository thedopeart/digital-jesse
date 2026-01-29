import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';
import { YoutubeTranscript } from 'youtube-transcript';
import type { PageData } from '@/lib/tools/text-analysis';
import { buildAffiliateReport } from '@/lib/tools/affiliate-analysis';
import type { AffiliateProgram } from '@/lib/tools/affiliate-analysis';
import { incrementToolStats } from '@/lib/tools/stats';

export const maxDuration = 60;

interface ScanRequest {
  sitemapUrl?: string;
  urls?: string[];
  maxPages?: number;
}

let cachedPrograms: AffiliateProgram[] | null = null;

async function loadPrograms(): Promise<AffiliateProgram[]> {
  if (cachedPrograms) return cachedPrograms;
  const filePath = path.join(process.cwd(), 'data', 'affiliate-programs.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  cachedPrograms = JSON.parse(raw) as AffiliateProgram[];
  return cachedPrograms;
}

export async function POST(request: NextRequest) {
  try {
    const body: ScanRequest = await request.json();
    const { sitemapUrl, urls, maxPages = 50 } = body;

    let pagesToCrawl: string[] = [];

    if (urls && urls.length > 0) {
      pagesToCrawl = urls.slice(0, maxPages);
    } else if (sitemapUrl) {
      // Check if the input is a YouTube channel/handle URL
      if (isYouTubeChannelUrl(sitemapUrl)) {
        pagesToCrawl = await getYouTubeChannelVideoUrls(sitemapUrl, maxPages);
      } else if (isYouTubeVideoUrl(sitemapUrl)) {
        // Single video URL
        pagesToCrawl = [sitemapUrl];
      } else {
        pagesToCrawl = await parseSitemap(sitemapUrl, maxPages);
      }
    } else {
      return NextResponse.json(
        { error: 'Provide either a sitemap URL or a list of URLs.' },
        { status: 400 }
      );
    }

    if (pagesToCrawl.length === 0) {
      return NextResponse.json(
        { error: 'No pages found to crawl. Check the sitemap URL or provide page URLs directly.' },
        { status: 400 }
      );
    }

    // Crawl pages
    const pages: PageData[] = [];
    const errors: { url: string; error: string }[] = [];
    const batchSize = 5;

    for (let i = 0; i < pagesToCrawl.length; i += batchSize) {
      const batch = pagesToCrawl.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map(url =>
          isYouTubeVideoUrl(url) ? fetchYouTubeAsPage(url) : fetchAndParsePage(url)
        )
      );

      for (let j = 0; j < results.length; j++) {
        const result = results[j];
        if (result.status === 'fulfilled' && result.value) {
          pages.push(result.value);
        } else {
          const reason = result.status === 'rejected' ? result.reason?.message : 'Unknown error';
          errors.push({ url: batch[j], error: reason || 'Failed to fetch' });
        }
      }
    }

    if (pages.length === 0) {
      return NextResponse.json(
        { error: 'Could not crawl any pages. Check the URL and try again.' },
        { status: 400 }
      );
    }

    // Load affiliate programs and run analysis
    const programs = await loadPrograms();

    // Extract domain from first page
    let domain = '';
    try {
      domain = new URL(pages[0].url).hostname;
    } catch {
      domain = sitemapUrl || 'unknown';
    }

    const report = buildAffiliateReport(pages, programs, domain);

    // Track stats (fire-and-forget)
    const totalOpportunities = report.opportunities.length + report.alreadyLinked.length + report.outreachOpportunities.length;
    incrementToolStats('affiliate-opportunity-finder', {
      pages_crawled: pages.length,
      links_found: totalOpportunities,
    }).catch(() => {});

    return NextResponse.json({
      report,
      crawlStats: {
        found: pagesToCrawl.length,
        crawled: pages.length,
        errors: errors.length,
      },
      errors,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Reusing the same sitemap parsing and page fetching logic from the crawl route

async function parseSitemap(url: string, maxPages: number): Promise<string[]> {
  let sitemapUrl = url;
  if (!url.includes('sitemap') && !url.endsWith('.xml')) {
    const base = url.replace(/\/+$/, '');
    const candidates = [
      `${base}/sitemap.xml`,
      `${base}/sitemap_index.xml`,
      `${base}/post-sitemap.xml`,
    ];

    for (const candidate of candidates) {
      try {
        const res = await fetch(candidate, {
          headers: { 'User-Agent': 'DigitalJesse-AffiliateFinder/1.0' },
          signal: AbortSignal.timeout(8000),
        });
        if (res.ok) {
          const text = await res.text();
          if (text.includes('<urlset') || text.includes('<sitemapindex')) {
            sitemapUrl = candidate;
            break;
          }
        }
      } catch {
        continue;
      }
    }
  }

  try {
    const res = await fetch(sitemapUrl, {
      headers: { 'User-Agent': 'DigitalJesse-AffiliateFinder/1.0' },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap: ${res.status}`);
    }

    const xml = await res.text();

    if (xml.includes('<sitemapindex')) {
      const $ = cheerio.load(xml, { xml: true });
      const childSitemaps: string[] = [];
      $('sitemap loc').each((_, el) => {
        childSitemaps.push($(el).text().trim());
      });

      if (childSitemaps.length > 0) {
        const childRes = await fetch(childSitemaps[0], {
          headers: { 'User-Agent': 'DigitalJesse-AffiliateFinder/1.0' },
          signal: AbortSignal.timeout(10000),
        });
        if (childRes.ok) {
          const childXml = await childRes.text();
          return extractUrlsFromSitemap(childXml, maxPages);
        }
      }
    }

    return extractUrlsFromSitemap(xml, maxPages);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    throw new Error(`Sitemap error: ${message}`);
  }
}

function extractUrlsFromSitemap(xml: string, maxPages: number): string[] {
  const $ = cheerio.load(xml, { xml: true });
  const urls: string[] = [];
  $('url loc').each((_, el) => {
    if (urls.length < maxPages) {
      urls.push($(el).text().trim());
    }
  });
  return urls;
}

// -------------------------------------------------------------------
// YouTube support
// -------------------------------------------------------------------

function isYouTubeUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return ['www.youtube.com', 'youtube.com', 'youtu.be', 'm.youtube.com'].includes(u.hostname);
  } catch {
    return false;
  }
}

function isYouTubeChannelUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (!isYouTubeUrl(url)) return false;
    const p = u.pathname;
    return p.startsWith('/@') || p.startsWith('/channel/') || p.startsWith('/c/') || p === '/' || p === '';
  } catch {
    return false;
  }
}

function isYouTubeVideoUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return true;
    if (['www.youtube.com', 'youtube.com', 'm.youtube.com'].includes(u.hostname)) {
      return u.pathname === '/watch' && u.searchParams.has('v');
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Fetch video URLs from a YouTube channel page.
 * Scrapes the channel HTML for video links since the Data API requires a key.
 */
async function getYouTubeChannelVideoUrls(channelUrl: string, max: number): Promise<string[]> {
  // Ensure we hit the videos tab
  let videosUrl = channelUrl.replace(/\/+$/, '');
  if (!videosUrl.includes('/videos')) {
    videosUrl += '/videos';
  }

  try {
    const res = await fetch(videosUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    // YouTube embeds video data in JSON within the HTML.
    // Extract video IDs from /watch?v= patterns in the page source.
    const videoIds = new Set<string>();
    const regex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      videoIds.add(match[1]);
      if (videoIds.size >= max) break;
    }

    return [...videoIds].slice(0, max).map(id => `https://www.youtube.com/watch?v=${id}`);
  } catch {
    return [];
  }
}

/**
 * Fetch a YouTube video page and build a PageData object from its
 * title, description, and transcript (if available).
 */
async function fetchYouTubeAsPage(videoUrl: string): Promise<PageData | null> {
  // Fetch the video page HTML for metadata
  const res = await fetch(videoUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $('meta[property="og:title"]').attr('content')?.trim()
    || $('title').first().text().trim()
    || '';
  const channelName = $('link[itemprop="name"]').attr('content')?.trim() || '';
  const description = $('meta[property="og:description"]').attr('content')?.trim()
    || $('meta[name="description"]').attr('content')?.trim()
    || '';

  // Try to get the full description from the JSON-LD or ytInitialData
  let fullDescription = description;
  const descMatch = html.match(/"shortDescription":"((?:[^"\\]|\\.)*)"/);
  if (descMatch) {
    fullDescription = descMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  // Extract URLs from description for link detection
  const descriptionLinks: string[] = [];
  const urlRegex = /https?:\/\/[^\s"'<>]+/g;
  let urlMatch;
  while ((urlMatch = urlRegex.exec(fullDescription)) !== null) {
    descriptionLinks.push(urlMatch[0]);
  }

  // Fetch transcript
  let transcriptText = '';
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl, { lang: 'en' });
    transcriptText = transcript.map(t => t.text).join(' ').replace(/\s+/g, ' ').trim();
  } catch {
    // Transcript not available (disabled, auto-generated only, etc.)
    // Still useful with title + description
  }

  // Combine description and transcript as the body text
  const bodyParts = [fullDescription, transcriptText].filter(Boolean);
  const bodyText = bodyParts.join('\n\n').slice(0, 15000);

  return {
    url: videoUrl,
    title: title ? `${title}` : 'YouTube Video',
    h1: title,
    headings: [channelName, title].filter(Boolean),
    metaDescription: description.slice(0, 200),
    bodyText,
    internalLinks: descriptionLinks,
  };
}


async function fetchAndParsePage(url: string): Promise<PageData | null> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'DigitalJesse-AffiliateFinder/1.0',
      'Accept': 'text/html',
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);

  // Remove non-content elements
  $(
    'script, style, noscript, iframe, nav, footer, header, aside, ' +
    '.sidebar, .menu, .nav, .footer, .header, ' +
    '.recently-viewed, .recently-viewed-products, [data-recently-viewed], ' +
    '.related-products, .product-recommendations, .cross-sells, .upsells, ' +
    '.shopify-section-recommended, [data-section-type="recommended-products"], ' +
    '.also-purchased, .you-may-also-like, ' +
    '.cookie-banner, .newsletter-popup, .popup, .modal, ' +
    '.social-share, .share-buttons, .addthis, ' +
    '.cart-drawer, .mini-cart, .cart-notification'
  ).remove();

  const title = $('title').first().text().trim() || '';
  const h1 = $('h1').first().text().trim() || '';
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';

  const headings: string[] = [];
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim();
    if (text) headings.push(text);
  });

  let bodyText = '';
  const contentSelectors = ['main', 'article', '.content', '.post-content', '.entry-content', '[role="main"]'];
  for (const sel of contentSelectors) {
    const el = $(sel);
    if (el.length > 0) {
      bodyText = el.text().replace(/\s+/g, ' ').trim();
      break;
    }
  }
  if (!bodyText) {
    bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  }
  bodyText = bodyText.slice(0, 15000); // Slightly higher limit for affiliate scanning

  // Extract all links (internal + external) for link detection
  const pageUrl = new URL(url);
  const internalLinks: string[] = [];
  const allLinks: string[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    try {
      const linkUrl = new URL(href, url);
      allLinks.push(linkUrl.href);
      if (linkUrl.hostname === pageUrl.hostname) {
        internalLinks.push(linkUrl.href);
      }
    } catch {
      // skip malformed
    }
  });

  return {
    url,
    title,
    h1,
    headings,
    metaDescription,
    bodyText,
    internalLinks: [...internalLinks, ...allLinks], // Include all links for brand link detection
  };
}
