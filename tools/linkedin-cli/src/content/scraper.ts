import * as cheerio from 'cheerio';
import { getKnownUrls, recordScrapedUrls } from '../storage/history-store.js';

export interface ScrapedContent {
  url: string;
  title: string;
  description: string;
  isNew: boolean;
}

export interface ScrapeResult {
  site: string;
  newItems: ScrapedContent[];
  totalFound: number;
}

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.text();
}

export async function scrapeDateIdeas(): Promise<ScrapeResult> {
  const site = 'dateideas.com';
  try {
    const html = await fetchPage('https://dateideas.com');
    const $ = cheerio.load(html);

    const urls: ScrapedContent[] = [];

    // Look for blog links and tool links
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href && text && (href.includes('/blog') || href.includes('/tools') || href.includes('/generator'))) {
        const fullUrl = href.startsWith('http') ? href : `https://dateideas.com${href}`;
        if (!urls.find((u) => u.url === fullUrl)) {
          urls.push({
            url: fullUrl,
            title: text,
            description: '',
            isNew: false,
          });
        }
      }
    });

    const knownUrls = await getKnownUrls(site);
    const allUrls = urls.map((u) => u.url);

    for (const item of urls) {
      item.isNew = !knownUrls.includes(item.url);
    }

    await recordScrapedUrls(site, allUrls);

    return {
      site,
      newItems: urls.filter((u) => u.isNew),
      totalFound: urls.length,
    };
  } catch (error) {
    return { site, newItems: [], totalFound: 0 };
  }
}

export async function scrapeQualitySewing(): Promise<ScrapeResult> {
  const site = 'qualitysewing.com';
  try {
    const html = await fetchPage('https://qualitysewing.com/pages/sewing-calculators');
    const $ = cheerio.load(html);

    const urls: ScrapedContent[] = [];

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href && text && (href.includes('calculator') || href.includes('/pages/'))) {
        const fullUrl = href.startsWith('http') ? href : `https://qualitysewing.com${href}`;
        if (!urls.find((u) => u.url === fullUrl)) {
          urls.push({
            url: fullUrl,
            title: text,
            description: '',
            isNew: false,
          });
        }
      }
    });

    const knownUrls = await getKnownUrls(site);
    const allUrls = urls.map((u) => u.url);

    for (const item of urls) {
      item.isNew = !knownUrls.includes(item.url);
    }

    await recordScrapedUrls(site, allUrls);

    return {
      site,
      newItems: urls.filter((u) => u.isNew),
      totalFound: urls.length,
    };
  } catch (error) {
    return { site, newItems: [], totalFound: 0 };
  }
}

export async function scrapeMasterpieces(): Promise<ScrapeResult> {
  const site = 'luxurywallart.com';
  try {
    const html = await fetchPage('https://luxurywallart.com/apps/masterpieces');
    const $ = cheerio.load(html);

    // Look for stats on the page
    const pageText = $('body').text();

    const urls: ScrapedContent[] = [];

    // Look for artist pages or new content links
    $('a[href*="masterpieces"]').each((_, el) => {
      const href = $(el).attr('href');
      const text = $(el).text().trim();
      if (href && text) {
        const fullUrl = href.startsWith('http') ? href : `https://luxurywallart.com${href}`;
        if (!urls.find((u) => u.url === fullUrl)) {
          urls.push({
            url: fullUrl,
            title: text,
            description: '',
            isNew: false,
          });
        }
      }
    });

    const knownUrls = await getKnownUrls(site);
    const allUrls = urls.map((u) => u.url);

    for (const item of urls) {
      item.isNew = !knownUrls.includes(item.url);
    }

    await recordScrapedUrls(site, allUrls);

    return {
      site,
      newItems: urls.filter((u) => u.isNew),
      totalFound: urls.length,
    };
  } catch (error) {
    return { site, newItems: [], totalFound: 0 };
  }
}

export async function scrapeAll(): Promise<ScrapeResult[]> {
  const results = await Promise.allSettled([
    scrapeDateIdeas(),
    scrapeQualitySewing(),
    scrapeMasterpieces(),
  ]);

  return results
    .filter((r): r is PromiseFulfilledResult<ScrapeResult> => r.status === 'fulfilled')
    .map((r) => r.value);
}

export async function scrapeSite(site: string): Promise<ScrapeResult> {
  switch (site.toLowerCase()) {
    case 'dateideas':
    case 'dateideas.com':
      return scrapeDateIdeas();
    case 'qualitysewing':
    case 'qualitysewing.com':
      return scrapeQualitySewing();
    case 'masterpieces':
    case 'luxurywallart':
    case 'luxurywallart.com':
      return scrapeMasterpieces();
    default:
      throw new Error(`Unknown site: ${site}. Options: dateideas, qualitysewing, masterpieces`);
  }
}
