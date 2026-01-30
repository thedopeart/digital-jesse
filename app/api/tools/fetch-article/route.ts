import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required.' }, { status: 400 });
    }

    // Basic URL validation
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL.' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'URL must use http or https.' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DigitalJesse/1.0; +https://digitaljesse.com)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch page (${response.status}).` },
        { status: 400 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove non-content elements (expanded list)
    $(
      'script, style, nav, header, footer, aside, iframe, noscript, form, ' +
      '.sidebar, .comments, .comment, .nav, .menu, .ad, .advertisement, ' +
      '.share, .sharing, .social-share, .social-links, .social-icons, ' +
      '.related, .related-posts, .recommended, .popular-posts, ' +
      '.newsletter, .subscribe, .signup, .cta, .popup, .modal, ' +
      '.breadcrumb, .breadcrumbs, .pagination, .pager, ' +
      '.author-bio, .author-info, .author-box, ' +
      '.widget, .widgets, .tag-list, .tags, .categories, ' +
      '.table-of-contents, .toc, ' +
      '[role="navigation"], [role="complementary"], [role="banner"], [role="contentinfo"], ' +
      '[aria-hidden="true"], [data-ad], [data-advertisement]'
    ).remove();

    // Try to find the main article content
    const selectors = [
      'article', '[role="main"]', 'main',
      '.post-content', '.entry-content', '.article-body', '.article-content',
      '.blog-post', '.post-body', '.content-body',
      '.single-content', '.page-content', '.story-body',
      '#article-body', '#content', '.content',
    ];
    let articleEl = null;
    for (const sel of selectors) {
      const el = $(sel);
      if (el.length > 0 && el.text().trim().length > 100) {
        articleEl = el;
        break;
      }
    }

    // Fall back to body
    if (!articleEl) {
      articleEl = $('body');
    }

    // Extract title
    const title =
      $('meta[property="og:title"]').attr('content') ||
      $('h1').first().text().trim() ||
      $('title').text().trim() ||
      '';

    // Extract text content with structure, deduplicating
    const blocks: string[] = [];
    const seen = new Set<string>();

    if (title) {
      blocks.push(`# ${title}`);
      blocks.push('');
      seen.add(title.toLowerCase().trim());
    }

    articleEl.find('h1, h2, h3, h4, h5, h6, p, li, blockquote').each((_, el) => {
      const tag = (el as unknown as { tagName?: string }).tagName?.toLowerCase();
      const text = $(el).text().trim();
      if (!text || text.length < 5) return;

      // Deduplicate: skip if we've seen this exact text already
      const key = text.toLowerCase().replace(/\s+/g, ' ');
      if (seen.has(key)) return;
      seen.add(key);

      // Skip common non-article text patterns
      if (/^(share|tweet|pin|email|print|subscribe|sign up|follow us|read more|related|comments?|leave a reply)/i.test(text)) return;
      if (/^(copyright|©|\d{4}\s+all rights)/i.test(text)) return;

      if (tag?.startsWith('h')) {
        const level = parseInt(tag[1]) || 2;
        blocks.push('');
        blocks.push(`${'#'.repeat(level)} ${text}`);
        blocks.push('');
      } else if (tag === 'li') {
        blocks.push(`- ${text}`);
      } else if (tag === 'blockquote') {
        blocks.push(`> ${text}`);
      } else {
        blocks.push(text);
      }
    });

    const content = blocks.join('\n').replace(/\n{3,}/g, '\n\n').trim();

    if (content.length < 50) {
      return NextResponse.json(
        { error: 'Could not extract enough content from this page.' },
        { status: 400 }
      );
    }

    return NextResponse.json({ title, content });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.includes('timeout') || message.includes('abort')) {
      return NextResponse.json({ error: 'Request timed out. The page took too long to load.' }, { status: 400 });
    }
    return NextResponse.json({ error: `Failed to fetch article: ${message}` }, { status: 500 });
  }
}
