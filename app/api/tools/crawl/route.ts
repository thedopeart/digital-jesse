import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import type { PageData } from '@/lib/tools/text-analysis';
import { incrementToolStats } from '@/lib/tools/stats';

export const maxDuration = 60;

interface CrawlRequest {
  sitemapUrl?: string;
  urls?: string[];
  maxPages?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CrawlRequest = await request.json();
    const { sitemapUrl, urls, maxPages = 50 } = body;

    let pagesToCrawl: string[] = [];

    if (urls && urls.length > 0) {
      pagesToCrawl = urls.slice(0, maxPages);
    } else if (sitemapUrl) {
      pagesToCrawl = await parseSitemap(sitemapUrl, maxPages);
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

    const pages: PageData[] = [];
    const errors: { url: string; error: string }[] = [];

    // Crawl pages with concurrency limit
    const batchSize = 5;
    for (let i = 0; i < pagesToCrawl.length; i += batchSize) {
      const batch = pagesToCrawl.slice(i, i + batchSize);
      const results = await Promise.allSettled(
        batch.map(url => fetchAndParsePage(url))
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

    // Track stats (fire-and-forget, don't block response)
    const totalInternalLinks = pages.reduce((sum, p) => sum + p.internalLinks.length, 0);
    incrementToolStats('internal-link-finder', {
      pages_crawled: pages.length,
      links_found: totalInternalLinks,
    }).catch(() => {});

    return NextResponse.json({
      pages,
      errors,
      totalFound: pagesToCrawl.length,
      totalCrawled: pages.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function parseSitemap(url: string, maxPages: number): Promise<string[]> {
  // Normalize: if they gave a domain, try common sitemap paths
  let sitemapUrl = url;
  if (!url.includes('sitemap') && !url.endsWith('.xml')) {
    const base = url.replace(/\/+$/, '');
    // Try common sitemap locations
    const candidates = [
      `${base}/sitemap.xml`,
      `${base}/sitemap_index.xml`,
      `${base}/post-sitemap.xml`,
    ];

    for (const candidate of candidates) {
      try {
        const res = await fetch(candidate, {
          headers: { 'User-Agent': 'DigitalJesse-LinkFinder/1.0' },
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
      headers: { 'User-Agent': 'DigitalJesse-LinkFinder/1.0' },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap: ${res.status}`);
    }

    const xml = await res.text();

    // Check for sitemap index (contains other sitemaps)
    if (xml.includes('<sitemapindex')) {
      const $ = cheerio.load(xml, { xml: true });
      const childSitemaps: string[] = [];
      $('sitemap loc').each((_, el) => {
        childSitemaps.push($(el).text().trim());
      });

      // Fetch first child sitemap
      if (childSitemaps.length > 0) {
        const childRes = await fetch(childSitemaps[0], {
          headers: { 'User-Agent': 'DigitalJesse-LinkFinder/1.0' },
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

async function fetchAndParsePage(url: string): Promise<PageData | null> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'DigitalJesse-LinkFinder/1.0',
      'Accept': 'text/html',
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);

  // Remove non-content elements: navigation, chrome, widgets, boilerplate
  $(
    'script, style, noscript, iframe, nav, footer, header, aside, ' +
    '.sidebar, .menu, .nav, .footer, .header, ' +
    // E-commerce boilerplate widgets
    '.recently-viewed, .recently-viewed-products, [data-recently-viewed], ' +
    '.related-products, .product-recommendations, .cross-sells, .upsells, ' +
    '.shopify-section-recommended, [data-section-type="recommended-products"], ' +
    '.also-purchased, .you-may-also-like, ' +
    // Cookie/popup/newsletter
    '.cookie-banner, .newsletter-popup, .popup, .modal, ' +
    // Social/sharing widgets
    '.social-share, .share-buttons, .addthis, ' +
    // Cart/checkout widgets
    '.cart-drawer, .mini-cart, .cart-notification'
  ).remove();

  const title = $('title').first().text().trim() || '';
  const h1 = $('h1').first().text().trim() || '';
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';

  // Extract all headings
  const headings: string[] = [];
  $('h1, h2, h3').each((_, el) => {
    const text = $(el).text().trim();
    if (text) headings.push(text);
  });

  // Extract body text from main content areas
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
  // Limit body text to prevent memory issues
  bodyText = bodyText.slice(0, 10000);

  // Extract internal links
  const pageUrl = new URL(url);
  const internalLinks: string[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    try {
      const linkUrl = new URL(href, url);
      if (linkUrl.hostname === pageUrl.hostname) {
        internalLinks.push(linkUrl.href);
      }
    } catch {
      // skip malformed URLs
    }
  });

  return {
    url,
    title,
    h1,
    headings,
    metaDescription,
    bodyText,
    internalLinks,
  };
}
