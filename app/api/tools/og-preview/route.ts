import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required.' }, { status: 400 });
    }

    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http')) fullUrl = 'https://' + fullUrl;

    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OGPreviewBot/1.0)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch URL (${response.status}).` }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const getMeta = (property: string): string => {
      return (
        $(`meta[property="${property}"]`).attr('content') ||
        $(`meta[name="${property}"]`).attr('content') ||
        ''
      );
    };

    const ogImage = getMeta('og:image');
    const ogTitle = getMeta('og:title') || $('title').text() || '';
    const ogDescription = getMeta('og:description') || getMeta('description') || '';
    const ogUrl = getMeta('og:url') || fullUrl;
    const ogType = getMeta('og:type') || '';
    const ogSiteName = getMeta('og:site_name') || '';
    const ogImageWidth = getMeta('og:image:width') || '';
    const ogImageHeight = getMeta('og:image:height') || '';

    const twitterCard = getMeta('twitter:card') || '';
    const twitterTitle = getMeta('twitter:title') || '';
    const twitterDescription = getMeta('twitter:description') || '';
    const twitterImage = getMeta('twitter:image') || '';

    // Detect issues
    const issues: { type: 'error' | 'warning'; message: string; fix?: string }[] = [];

    // Try to get actual image dimensions
    let actualWidth = 0;
    let actualHeight = 0;
    let imageLoadable = true;

    const imageToCheck = ogImage && !ogImage.startsWith('http')
      ? (() => { try { return new URL(ogImage, fullUrl).href; } catch { return ogImage; } })()
      : ogImage;

    if (imageToCheck) {
      try {
        const imgRes = await fetch(imageToCheck, {
          method: 'HEAD',
          signal: AbortSignal.timeout(5000),
        });
        if (!imgRes.ok) {
          imageLoadable = false;
          issues.push({ type: 'error', message: `og:image returned ${imgRes.status}. The image won't load when shared.`, fix: 'Update og:image to point to a working image URL.' });
        }
      } catch {
        // HEAD failed, try GET with range to check if image loads at all
        try {
          const imgRes = await fetch(imageToCheck, {
            headers: { Range: 'bytes=0-0' },
            signal: AbortSignal.timeout(5000),
          });
          if (!imgRes.ok && imgRes.status !== 206) {
            imageLoadable = false;
          }
        } catch {
          imageLoadable = false;
        }
        if (!imageLoadable) {
          issues.push({ type: 'error', message: 'og:image URL could not be reached. The image may be broken or blocked.', fix: 'Make sure the og:image URL is publicly accessible.' });
        }
      }

      // Check dimensions from meta tags or content-type hints
      if (ogImageWidth && ogImageHeight) {
        actualWidth = parseInt(ogImageWidth, 10);
        actualHeight = parseInt(ogImageHeight, 10);
      }

      if (actualWidth && actualHeight) {
        const ratio = actualWidth / actualHeight;
        const idealRatio = 1.91;

        if (actualWidth < 1200 || actualHeight < 630) {
          issues.push({
            type: 'warning',
            message: `Image is ${actualWidth}x${actualHeight}px. Recommended minimum is 1200x630px. It may look blurry or get cropped poorly on most platforms.`,
            fix: 'Create a new image at 1200x630px. Use the Generator tab to make one.',
          });
        }

        if (Math.abs(ratio - idealRatio) > 0.3) {
          issues.push({
            type: 'warning',
            message: `Image aspect ratio is ${ratio.toFixed(2)}:1 (${actualWidth}x${actualHeight}). The ideal ratio is 1.91:1 (1200x630). Platforms will crop this image, cutting off content on the sides or top/bottom.`,
            fix: 'Resize your image to 1200x630px for the best results across all platforms.',
          });
        }
      } else if (imageLoadable && !ogImageWidth) {
        issues.push({
          type: 'warning',
          message: 'No og:image:width or og:image:height tags found. Platforms may render the image incorrectly until they fetch and cache the actual dimensions.',
          fix: '<meta property="og:image:width" content="1200" />\n<meta property="og:image:height" content="630" />',
        });
      }
    }

    if (!ogImage) {
      issues.push({ type: 'error', message: 'Missing og:image tag. No image will show when shared.', fix: '<meta property="og:image" content="https://yoursite.com/image.jpg" />' });
    }
    if (!ogTitle) {
      issues.push({ type: 'error', message: 'Missing og:title tag.', fix: '<meta property="og:title" content="Your Page Title" />' });
    }
    if (!ogDescription) {
      issues.push({ type: 'warning', message: 'Missing og:description tag.', fix: '<meta property="og:description" content="Your description here" />' });
    }
    if (!twitterCard) {
      issues.push({ type: 'warning', message: 'No twitter:card tag. Twitter will default to a small summary card.', fix: '<meta name="twitter:card" content="summary_large_image" />' });
    }
    if (ogTitle && ogTitle.length > 70) {
      issues.push({ type: 'warning', message: `Title is ${ogTitle.length} characters. It may be truncated on some platforms (recommended: under 70).` });
    }
    if (ogDescription && ogDescription.length > 200) {
      issues.push({ type: 'warning', message: `Description is ${ogDescription.length} characters. It may be truncated (recommended: under 200).` });
    }

    // Try to resolve relative og:image URLs
    let resolvedImage = ogImage;
    if (ogImage && !ogImage.startsWith('http')) {
      try {
        resolvedImage = new URL(ogImage, fullUrl).href;
      } catch {
        resolvedImage = ogImage;
      }
    }

    let resolvedTwitterImage = twitterImage;
    if (twitterImage && !twitterImage.startsWith('http')) {
      try {
        resolvedTwitterImage = new URL(twitterImage, fullUrl).href;
      } catch {
        resolvedTwitterImage = twitterImage;
      }
    }

    const domain = new URL(fullUrl).hostname.replace('www.', '');

    return NextResponse.json({
      og: {
        image: resolvedImage,
        title: ogTitle,
        description: ogDescription,
        url: ogUrl,
        type: ogType,
        siteName: ogSiteName,
        imageWidth: ogImageWidth,
        imageHeight: ogImageHeight,
      },
      twitter: {
        card: twitterCard,
        title: twitterTitle,
        description: twitterDescription,
        image: resolvedTwitterImage,
      },
      domain,
      issues,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch URL.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
