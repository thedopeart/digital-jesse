'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

/* ───────── Platform configs ───────── */
interface Platform {
  key: string;
  name: string;
  icon: string;
  viewBox: string;
  maxChars: number;
  color: string;
  description: string;
}

const platforms: Platform[] = [
  {
    key: 'twitter',
    name: 'Twitter / X',
    icon: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    viewBox: '0 0 24 24',
    maxChars: 280,
    color: '#000000',
    description: 'Short, punchy takes. Thread-friendly.',
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    icon: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
    viewBox: '0 0 24 24',
    maxChars: 3000,
    color: '#0A66C2',
    description: 'Professional tone. Story-driven posts.',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    icon: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>',
    viewBox: '0 0 24 24',
    maxChars: 2200,
    color: '#E4405F',
    description: 'Caption-style with hashtags and CTA.',
  },
  {
    key: 'facebook',
    name: 'Facebook',
    icon: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
    viewBox: '0 0 24 24',
    maxChars: 5000,
    color: '#1877F2',
    description: 'Conversational. Question-driven engagement.',
  },
  {
    key: 'threads',
    name: 'Threads',
    icon: '<path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.166.408-2.26 1.333-3.08.857-.76 2.037-1.218 3.412-1.325 1.167-.091 2.228.033 3.163.316-.025-1.078-.353-1.884-.972-2.395-.71-.586-1.786-.882-3.196-.882l-.046.001c-1.424.016-2.53.47-3.286 1.352l-1.513-1.326C7.847 4.373 9.494 3.74 11.547 3.714l.063-.001c1.878 0 3.378.462 4.46 1.373.98.826 1.584 2.012 1.787 3.519.888.282 1.672.68 2.338 1.192 1.036.797 1.79 1.86 2.176 3.07.504 1.582.358 3.489-.942 4.932-1.755 1.945-4.076 2.778-7.262 2.8zM11.53 14.59c-1.166.091-2.406.55-2.406 1.717.034.597.353 1.063.898 1.31.478.217 1.073.3 1.606.273 1.122-.06 2.5-.587 2.666-3.457-.788-.24-1.72-.359-2.764-.288z"/>',
    viewBox: '0 0 24 24',
    maxChars: 500,
    color: '#000000',
    description: 'Casual, conversational. Similar to Twitter.',
  },
];

/* ───────── Snippet type ───────── */
interface Snippet {
  platform: string;
  text: string;
  type: string; // e.g. "Hook", "Key Takeaway", "Thread Opener"
}

/* ───────── Text analysis helpers ───────── */

/** Normalize whitespace issues from HTML extraction before splitting */
function normalizeText(text: string): string {
  return text
    // Fix missing space after period when next char is uppercase (HTML join artifact)
    .replace(/\.([A-Z])/g, '. $1')
    // Fix missing space after period when followed by common sentence starters
    .replace(/\.(\s*)([A-Z][a-z])/g, '. $2')
    // Normalize multiple spaces
    .replace(/\s{2,}/g, ' ')
    // Remove zero-width chars
    .replace(/[\u200B\u200C\u200D\uFEFF]/g, '');
}

function extractSentences(text: string): string[] {
  const normalized = normalizeText(text);
  return normalized
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    // Must be a real sentence: 20+ chars, 4+ words, starts with letter/number
    .filter((s) => s.length > 20 && s.split(/\s+/).length >= 4 && /^[A-Za-z0-9""\u201C]/.test(s))
    // Filter out obvious non-content
    .filter((s) => !/^(share|tweet|pin|subscribe|follow|copyright|©|image|photo|source|credit|fig|click here|read more)/i.test(s));
}

function extractTitle(text: string): string {
  const lines = text.trim().split('\n').filter((l) => l.trim().length > 0);
  return lines[0]?.replace(/^#+\s*/, '').trim() || 'This post';
}

/** Find sentences with hard numbers/stats */
function extractStats(sentences: string[]): string[] {
  return sentences.filter((s) => /\d+%|\$[\d,]+|\b\d{3,}\b/.test(s) && s.length > 30 && s.length < 250);
}

/** Find quoted text in the article */
function extractQuotes(text: string): string[] {
  const matches: string[] = [];
  const quoteRegex = /[""\u201C]([^""\u201D]{20,200})[""\u201D]/g;
  let m;
  while ((m = quoteRegex.exec(text)) !== null) {
    matches.push(m[1].trim());
  }
  return matches;
}

/** Score and pick the best standalone sentences. Returns diverse, non-overlapping picks. */
function extractKeyPoints(sentences: string[]): string[] {
  const total = sentences.length;
  const genericPatterns = [
    /^(in this (article|post|guide|blog))/i,
    /^(let's (take a look|dive|explore|get started))/i,
    /^(as (we|you) (can see|know|mentioned))/i,
    /^(thank(s| you) for reading)/i,
    /^(if you (liked|enjoyed|found))/i,
    /^(don't forget to)/i,
    /^(subscribe|follow|share|like|comment)/i,
    /^(table of contents)/i,
    /^(click here|read more|see also|check out)/i,
    /^(note:|disclaimer:|editor)/i,
  ];

  const scored = sentences.map((s, i) => {
    if (genericPatterns.some((p) => p.test(s))) return { text: s, score: -10 };

    let score = 0;

    // Stats and numbers
    if (s.includes('%') || /\$[\d,]+/.test(s) || /\b\d{2,}\b/.test(s)) score += 4;

    // Good standalone length
    if (s.length > 50 && s.length < 180) score += 3;
    else if (s.length > 30 && s.length < 250) score += 1;
    if (s.length > 250) score -= 2;

    // Strong insight signals
    if (/\b(key|important|critical|biggest|best|worst|never|always|secret|mistake|tip|lesson|result|growth|revenue|increase|decrease|problem|solution|strategy|data|study|research|found|showed|proved|wrong|right|truth|myth|reality|actually|turns out|surprising|overlooked|missed|forgot)\b/i.test(s)) score += 3;

    // Questions
    if (s.endsWith('?') && s.length > 30) score += 2;

    // Quotes
    if (s.startsWith('"') || s.startsWith('\u201C')) score += 3;

    // Clear claim starters
    if (/^(the |most |every |stop |start |don't |you |we |if you|here's|this is|that's|one of|nobody|people|companies)/i.test(s)) score += 1;

    // Position: intro thesis + conclusion takeaway
    const position = i / total;
    if (position < 0.15) score += 2;
    if (position > 0.85) score += 2;

    // Penalize fragments
    if (s.length < 25) score -= 3;
    if (s.split(' ').length < 5) score -= 2;

    return { text: s, score };
  });

  // Sort by score, then deduplicate by checking word overlap
  const sorted = scored.sort((a, b) => b.score - a.score).filter((s) => s.score > 0);
  const picked: string[] = [];

  for (const item of sorted) {
    if (picked.length >= 8) break;
    // Check this sentence doesn't heavily overlap with already-picked ones
    const words = new Set(item.text.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
    const tooSimilar = picked.some((existing) => {
      const existingWords = new Set(existing.toLowerCase().split(/\s+/).filter((w) => w.length > 3));
      let overlap = 0;
      for (const w of words) { if (existingWords.has(w)) overlap++; }
      return overlap > Math.min(words.size, existingWords.size) * 0.5;
    });
    if (!tooSimilar) picked.push(item.text);
  }

  return picked;
}

/** Extract 3-6 relevant hashtags from article content */
function extractHashtags(text: string, title: string): string[] {
  const combined = `${title} ${text}`.toLowerCase();
  const topicMap: Record<string, string> = {
    'seo': 'SEO', 'marketing': 'marketing', 'ecommerce': 'ecommerce', 'e-commerce': 'ecommerce',
    'shopify': 'Shopify', 'business': 'business', 'startup': 'startup', 'entrepreneur': 'entrepreneur',
    'design': 'design', 'branding': 'branding', 'social media': 'socialmedia', 'content': 'contentmarketing',
    'email': 'emailmarketing', 'analytics': 'analytics',
    'sales': 'sales', 'revenue': 'revenue', 'growth': 'growth', 'traffic': 'organictraffic',
    'blogging': 'blogging', 'writing': 'writing', 'freelance': 'freelance', 'productivity': 'productivity',
    'leadership': 'leadership', 'management': 'management', 'strategy': 'strategy', 'tech': 'tech',
    'software': 'software', 'development': 'webdev', 'coding': 'coding', 'react': 'React',
    'javascript': 'JavaScript', 'python': 'Python', 'data': 'data', 'automation': 'automation',
    'finance': 'finance', 'investing': 'investing', 'crypto': 'crypto', 'real estate': 'realestate',
    'health': 'health', 'fitness': 'fitness', 'wellness': 'wellness',
    'remote work': 'remotework', 'career': 'career', 'hiring': 'hiring', 'jobs': 'jobs',
    'customer': 'customerexperience', 'brand': 'branding', 'advertising': 'advertising',
    'conversion': 'CRO', 'copywriting': 'copywriting', 'podcast': 'podcast', 'video': 'videomarketing',
    'amazon': 'Amazon', 'etsy': 'Etsy', 'wordpress': 'WordPress',
  };

  const found: string[] = [];
  for (const [keyword, hashtag] of Object.entries(topicMap)) {
    if (combined.includes(keyword) && !found.includes(hashtag)) {
      found.push(hashtag);
    }
    if (found.length >= 8) break;
  }

  // Pull a hashtag from the title if we don't have enough
  const titleWords = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter((w) => w.length > 3);
  if (titleWords.length >= 2 && found.length < 6) {
    const titleTag = titleWords.slice(0, 3).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    if (!found.includes(titleTag)) found.push(titleTag);
  }

  return found.slice(0, 6);
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#+\s+/gm, '') // headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
    .replace(/!\[.*?\]\(.+?\)/g, '') // images
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // code
    .replace(/^[-*]\s+/gm, '') // list markers
    .replace(/^\d+\.\s+/gm, '') // numbered lists
    .replace(/^>\s+/gm, '') // blockquotes
    .trim();
}

/** Trim text to fit a character limit, breaking at word boundary */
function trimTo(text: string, max: number): string {
  if (text.length <= max) return text;
  const trimmed = text.slice(0, max - 3);
  const lastSpace = trimmed.lastIndexOf(' ');
  return (lastSpace > max * 0.5 ? trimmed.slice(0, lastSpace) : trimmed) + '...';
}

/* ───────── Snippet generators per platform ───────── */
interface GenInput {
  title: string;
  keyPoints: string[];
  sentences: string[];
  stats: string[];
  quotes: string[];
  hashtags: string[];
}

/* ───────── Snippet generators per platform ───────── */

/**
 * Each generator picks from keyPoints using different indices so the same
 * sentence doesn't appear in multiple snippets on the same platform.
 * Generators produce 5-6 snippets max. Quality over quantity.
 */

function generateTwitterSnippets(g: GenInput): Snippet[] {
  const snippets: Snippet[] = [];
  const tags = g.hashtags.slice(0, 2).map((h) => `#${h}`).join(' ');
  const t = g.title;
  const kp = g.keyPoints;

  // 1. Standalone insight (best sentence, no wrapper)
  if (kp[0]) {
    snippets.push({ platform: 'twitter', type: 'Short Post', text: trimTo(kp[0], 280) });
  }

  // 2. Thread opener (title + second-best point)
  if (kp[1]) {
    snippets.push({
      platform: 'twitter', type: 'Thread Start',
      text: trimTo(`${t}.\n\n${kp[1]}\n\nMore in the thread:`, 280),
    });
  }

  // 3. Stat (if available, otherwise skip)
  if (g.stats[0] && g.stats[0] !== kp[0] && g.stats[0] !== kp[1]) {
    snippets.push({
      platform: 'twitter', type: 'Stat',

      text: trimTo(g.stats[0], 260) + (tags ? `\n\n${tags}` : ''),
    });
  }

  // 4. Question for engagement
  if (kp[2]) {
    snippets.push({
      platform: 'twitter', type: 'Question',
      text: trimTo(`${kp[2]}\n\nWhat's been your experience?`, 280),
    });
  }

  // 5. Contrarian / hot take
  if (kp[3]) {
    snippets.push({
      platform: 'twitter', type: 'Short Post',
      text: trimTo(kp[3], 280),
    });
  }

  // 6. Quote if available
  if (g.quotes[0]) {
    snippets.push({
      platform: 'twitter', type: 'Quote',
      text: trimTo(`"${g.quotes[0]}"`, 280),
    });
  }

  return snippets;
}

function generateLinkedInSnippets(g: GenInput): Snippet[] {
  const snippets: Snippet[] = [];
  const tags = g.hashtags.slice(0, 4).map((h) => `#${h}`).join(' ');
  const t = g.title;
  const kp = g.keyPoints;

  // 1. Story-style opener with one key insight
  if (kp[0]) {
    snippets.push({
      platform: 'linkedin', type: 'Post',
      text: `${kp[0]}\n\nI wrote about why this matters and what to do about it.\n\nLink in comments.\n\n${tags}`,
    });
  }

  // 2. Numbered takeaways (uses kp 1-3)
  if (kp.length >= 3) {
    const items = kp.slice(1, 4).map((p, i) => `${i + 1}. ${trimTo(p, 200)}`).join('\n\n');
    snippets.push({
      platform: 'linkedin', type: 'List Post',
      text: `3 things that stood out to me about ${t.toLowerCase()}:\n\n${items}\n\nFull post on my site. Link in comments.\n\n${tags}`,
    });
  }

  // 3. Stat-driven (if we have a stat not already used)
  if (g.stats[0]) {
    snippets.push({
      platform: 'linkedin', type: 'Data Post',
      text: `${g.stats[0]}\n\nThat number stopped me. I wrote about what it means and what I'd do differently knowing it.\n\nLink in comments.\n\n${tags}`,
    });
  }

  // 4. Advice post using a different key point
  if (kp[4]) {
    snippets.push({
      platform: 'linkedin', type: 'Story',
      text: `If you're working on ${t.toLowerCase()}, here's something worth knowing:\n\n${trimTo(kp[4], 400)}\n\nWrote up the full context. Link in comments.\n\n${tags}`,
    });
  }

  // 5. Quote + commentary
  if (g.quotes[0] && kp[5]) {
    snippets.push({
      platform: 'linkedin', type: 'Quote',
      text: `"${trimTo(g.quotes[0], 200)}"\n\n${trimTo(kp[5], 300)}\n\nFull post on my site.\n\n${tags}`,
    });
  }

  // 6. Question for discussion
  if (kp[6]) {
    snippets.push({
      platform: 'linkedin', type: 'Discussion',

      text: `${trimTo(kp[6], 300)}\n\nI'm curious how others handle this. What's worked for you?\n\n${tags}`,
    });
  }

  return snippets;
}

function generateInstagramSnippets(g: GenInput): Snippet[] {
  const snippets: Snippet[] = [];
  const tags = g.hashtags.map((h) => `#${h}`).join(' ');
  const t = g.title;
  const kp = g.keyPoints;

  // 1. Carousel caption (numbered points, save-worthy)
  if (kp.length >= 3) {
    const pts = kp.slice(0, 4).map((p, i) => `${i + 1}. ${trimTo(p, 140)}`).join('\n\n');
    snippets.push({
      platform: 'instagram', type: 'Caption',
      text: `${t}\n\n${pts}\n\nSave this for later.\n\n${tags}`,
    });
  }

  // 2. Reel hook (short, punchy, uses a different point)
  if (kp[4]) {
    snippets.push({
      platform: 'instagram', type: 'Short Caption',
      text: `${trimTo(kp[4], 180)}\n\nFull breakdown on the site. Link in bio.\n\n${tags}`,
    });
  }

  // 3. Stat visual
  if (g.stats[0]) {
    snippets.push({
      platform: 'instagram', type: 'Stat',
      text: `${trimTo(g.stats[0], 250)}\n\nMore context on the site. Link in bio.\n\n${tags}`,
    });
  }

  // 4. Story poll
  if (kp[5]) {
    snippets.push({
      platform: 'instagram', type: 'CTA',
      text: `${trimTo(kp[5], 200)}\n\nAgree or disagree? Vote in the poll.`,
    });
  }

  // 5. Quote card
  if (g.quotes[0]) {
    snippets.push({
      platform: 'instagram', type: 'Quote Card',

      text: `"${trimTo(g.quotes[0], 200)}"\n\nFrom my latest post. Link in bio.\n\n${tags}`,
    });
  }

  // 6. Single takeaway (different from carousel points)
  if (kp[6]) {
    snippets.push({
      platform: 'instagram', type: 'Caption',
      text: `${trimTo(kp[6], 200)}\n\nMore on the site. Link in bio.\n\n${tags}`,
    });
  }

  return snippets;
}

function generateFacebookSnippets(g: GenInput): Snippet[] {
  const snippets: Snippet[] = [];
  const t = g.title;
  const kp = g.keyPoints;

  // 1. Conversational share
  if (kp[0]) {
    snippets.push({
      platform: 'facebook', type: 'Post',
      text: `Wrote something about ${t.toLowerCase()} that I've been thinking about.\n\n${kp[0]}\n\nAnyone else run into this? Would love to hear how you handled it.\n\nLink in comments.`,
    });
  }

  // 2. Question-first
  if (kp[1]) {
    snippets.push({
      platform: 'facebook', type: 'Question',
      text: `Here's something I keep seeing with ${t.toLowerCase()}:\n\n${trimTo(kp[1], 400)}\n\nWhat do you think? Am I off base here?`,
    });
  }

  // 3. List (if enough points, uses different ones)
  if (kp.length >= 4) {
    const list = kp.slice(2, 6).map((p, i) => `${i + 1}. ${trimTo(p, 200)}`).join('\n');
    snippets.push({
      platform: 'facebook', type: 'List',
      text: `Few things that stood out while writing about ${t.toLowerCase()}:\n\n${list}\n\nFull post linked in comments.`,
    });
  }

  // 4. Stat conversation
  if (g.stats[0]) {
    snippets.push({
      platform: 'facebook', type: 'Stat',
      text: `${g.stats[0]}\n\nFound this while digging into ${t.toLowerCase()}. Full context in the post. Link in comments.`,
    });
  }

  // 5. Quote share
  if (g.quotes[0]) {
    snippets.push({
      platform: 'facebook', type: 'Quote',
      text: `"${trimTo(g.quotes[0], 300)}"\n\nFrom my latest post. This part stuck with me.\n\nLink in comments.`,
    });
  }

  return snippets;
}

function generateThreadsSnippets(g: GenInput): Snippet[] {
  const snippets: Snippet[] = [];
  const t = g.title;
  const kp = g.keyPoints;

  // 1. Raw take (no framing, just the point)
  if (kp[0]) {
    snippets.push({ platform: 'threads', type: 'Post', text: trimTo(kp[0], 470) });
  }

  // 2. Casual question
  if (kp[1]) {
    snippets.push({
      platform: 'threads', type: 'Question',
      text: trimTo(`${kp[1]}\n\nAnyone else notice this?`, 500),
    });
  }

  // 3. Hot take with different point
  if (kp[2]) {
    snippets.push({
      platform: 'threads', type: 'Opinion',
      text: trimTo(kp[2], 500),
    });
  }

  // 4. Stat (if available)
  if (g.stats[0]) {
    snippets.push({
      platform: 'threads', type: 'Stat',
      text: trimTo(`${g.stats[0]}\n\nWild.`, 500),
    });
  }

  // 5. Blog teaser with yet another point
  if (kp[3]) {
    snippets.push({
      platform: 'threads', type: 'Teaser',
      text: trimTo(`${kp[3]}\n\nWrote about it. Link in bio.`, 500),
    });
  }

  // 6. Quote
  if (g.quotes[0]) {
    snippets.push({
      platform: 'threads', type: 'Quote',
      text: trimTo(`"${g.quotes[0]}"`, 500),
    });
  }

  return snippets;
}

function generateAllSnippets(rawText: string): Snippet[] {
  const text = stripMarkdown(rawText);
  const title = extractTitle(rawText);
  const sentences = extractSentences(text);
  const keyPoints = extractKeyPoints(sentences);
  const stats = extractStats(sentences);
  const quotes = extractQuotes(rawText);
  const hashtags = extractHashtags(text, title);

  const g: GenInput = { title, keyPoints, sentences, stats, quotes, hashtags };

  return [
    ...generateTwitterSnippets(g),
    ...generateLinkedInSnippets(g),
    ...generateInstagramSnippets(g),
    ...generateFacebookSnippets(g),
    ...generateThreadsSnippets(g),
  ];
}

/* ───────── Copy button ───────── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0"
      style={{
        background: copied ? '#22c55e' : '#f3f4f6',
        color: copied ? '#ffffff' : '#374151',
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

/* ───────── Snippet card ───────── */
function SnippetCard({ snippet, platform }: { snippet: Snippet; platform: Platform }) {
  const charCount = snippet.text.length;
  const isOver = charCount > platform.maxChars;
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-gray-100 text-gray-600">
            {snippet.type}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${isOver ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
            {charCount}/{platform.maxChars}
          </span>
          <CopyButton text={snippet.text} />
        </div>
      </div>
      <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{snippet.text}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
export default function BlogSnippetsPage() {
  const [inputMode, setInputMode] = useState<'paste' | 'url'>('url');
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [activePlatform, setActivePlatform] = useState('twitter');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [useAI, setUseAI] = useState(true);

  /** Try AI generation for all platforms, fall back to client-side if it fails */
  const generateWithAI = useCallback(async (text: string) => {
    const title = extractTitle(text);
    const allSnippets: Snippet[] = [];
    let aiFailed = false;

    for (const p of platforms) {
      try {
        const res = await fetch('/api/tools/generate-snippets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: text, title, platform: p.key }),
        });
        const data = await res.json();
        if (res.ok && data.snippets?.length > 0) {
          allSnippets.push(...data.snippets);
        } else {
          aiFailed = true;
          break;
        }
      } catch {
        aiFailed = true;
        break;
      }
    }

    if (aiFailed || allSnippets.length === 0) {
      // Fall back to client-side
      return generateAllSnippets(text);
    }
    return allSnippets;
  }, []);

  const generateFromText = useCallback(async (text: string) => {
    if (useAI) {
      setAiLoading(true);
      try {
        const results = await generateWithAI(text);
        setSnippets(results);
        setHasGenerated(true);
        const firstWithResults = platforms.find((p) => results.some((s) => s.platform === p.key));
        if (firstWithResults) setActivePlatform(firstWithResults.key);
      } finally {
        setAiLoading(false);
      }
    } else {
      const results = generateAllSnippets(text);
      setSnippets(results);
      setHasGenerated(true);
      const firstWithResults = platforms.find((p) => results.some((s) => s.platform === p.key));
      if (firstWithResults) setActivePlatform(firstWithResults.key);
    }
  }, [useAI, generateWithAI]);

  const generate = useCallback(() => {
    if (inputMode === 'paste') {
      if (!input.trim()) return;
      generateFromText(input);
    }
  }, [input, inputMode, generateFromText]);

  const fetchArticle = useCallback(async () => {
    if (!url.trim()) return;
    setFetching(true);
    setFetchError('');
    try {
      const res = await fetch('/api/tools/fetch-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFetchError(data.error || 'Failed to fetch article.');
        return;
      }
      setInput(data.content || '');
      await generateFromText(data.content || '');
    } catch {
      setFetchError('Network error. Check the URL and try again.');
    } finally {
      setFetching(false);
    }
  }, [url, generateFromText]);

  const activePlatformData = platforms.find((p) => p.key === activePlatform)!;
  const activeSnippets = snippets.filter((s) => s.platform === activePlatform);
  const totalSnippets = snippets.length;

  const copyAll = async () => {
    const text = activeSnippets.map((s) => `[${s.type}]\n${s.text}`).join('\n\n---\n\n');
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1e1e1e] border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-gray-300">Page to Social Posts</span>
          </div>
          <h1 className="text-xl font-bold text-white">Page to Social Posts</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Input section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          {/* Mode toggle + AI toggle */}
          <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setInputMode('url')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                inputMode === 'url' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Paste URL
            </button>
            <button
              onClick={() => setInputMode('paste')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                inputMode === 'paste' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Paste Text
            </button>
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div className={`relative w-9 h-5 rounded-full transition-colors ${useAI ? 'bg-[#d4a847]' : 'bg-gray-300'}`}>
              <input type="checkbox" checked={useAI} onChange={(e) => setUseAI(e.target.checked)} className="sr-only" />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${useAI ? 'translate-x-4' : ''}`} />
            </div>
            <span className="text-xs font-medium text-gray-600">AI mode</span>
          </label>
          </div>

          {inputMode === 'url' ? (
            <>
              <div className="mb-3">
                <h2 className="text-sm font-semibold text-gray-900">Enter a page URL</h2>
                <p className="text-xs text-gray-500 mt-0.5">We'll pull the content and generate posts automatically.</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setFetchError(''); }}
                  placeholder="https://example.com/any-page"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d4a847]/50 focus:border-[#d4a847]"
                  onKeyDown={(e) => { if (e.key === 'Enter') fetchArticle(); }}
                />
                <button
                  onClick={fetchArticle}
                  disabled={!url.trim() || fetching || aiLoading}
                  className="px-6 py-2.5 bg-[#d4a847] text-black rounded-lg text-sm font-semibold hover:bg-[#c49a3d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  {fetching || aiLoading ? (aiLoading ? 'Generating...' : 'Fetching...') : 'Generate Snippets'}
                </button>
              </div>
              {fetchError && (
                <p className="text-xs text-red-500 mt-2">{fetchError}</p>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Paste your content</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Plain text or markdown. The tool creates platform-specific posts from your content.</p>
                </div>
                {input.trim() && (
                  <span className="text-xs text-gray-400">{input.trim().split(/\s+/).length} words</span>
                )}
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your content here..."
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 resize-vertical focus:outline-none focus:ring-2 focus:ring-[#d4a847]/50 focus:border-[#d4a847]"
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-400">
                  Tip: Include your headline as the first line for better results.
                </p>
                <button
                  onClick={generate}
                  disabled={!input.trim() || aiLoading}
                  className="px-6 py-2.5 bg-[#d4a847] text-black rounded-lg text-sm font-semibold hover:bg-[#c49a3d] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {aiLoading ? 'Generating...' : 'Generate Snippets'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* AI Loading */}
        {aiLoading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center mb-6">
            <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-[#d4a847] rounded-full animate-spin mb-3" />
            <p className="text-gray-900 font-medium">Generating with AI...</p>
            <p className="text-gray-500 text-sm mt-1">Writing platform-specific posts. This takes a few seconds.</p>
          </div>
        )}

        {/* Results */}
        {!aiLoading && hasGenerated && snippets.length > 0 && (
          <div>
            {/* Stats bar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{totalSnippets}</span> snippets generated across {platforms.length} platforms
              </p>
              <button
                onClick={copyAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Copy All ({activePlatformData.name})
              </button>
            </div>

            {/* Platform tabs */}
            <div className="flex gap-1 bg-gray-200 rounded-lg p-1 mb-5 overflow-x-auto">
              {platforms.map((p) => {
                const count = snippets.filter((s) => s.platform === p.key).length;
                if (count === 0) return null;
                return (
                  <button
                    key={p.key}
                    onClick={() => setActivePlatform(p.key)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      activePlatform === p.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <svg width="16" height="16" viewBox={p.viewBox} fill="currentColor" dangerouslySetInnerHTML={{ __html: p.icon }} />
                    <span>{p.name}</span>
                    <span className={`text-xs ${activePlatform === p.key ? 'text-gray-500' : 'text-gray-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Platform info */}
            <div className="flex items-center gap-3 mb-4 px-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: activePlatformData.color + '15', color: activePlatformData.color }}
              >
                <svg width="16" height="16" viewBox={activePlatformData.viewBox} fill="currentColor" dangerouslySetInnerHTML={{ __html: activePlatformData.icon }} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{activePlatformData.name}</p>
                <p className="text-xs text-gray-500">{activePlatformData.description} Max {activePlatformData.maxChars} chars.</p>
              </div>
            </div>

            {/* Snippet cards */}
            <div className="space-y-3">
              {activeSnippets.map((snippet, i) => (
                <SnippetCard key={`${snippet.platform}-${i}`} snippet={snippet} platform={activePlatformData} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!aiLoading && hasGenerated && snippets.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">Couldn't extract enough content. Try pasting longer content (200+ words).</p>
          </div>
        )}

        {/* Pre-generate state */}
        {!aiLoading && !hasGenerated && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center gap-3 mb-4">
                {platforms.slice(0, 5).map((p) => (
                  <div
                    key={p.key}
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: p.color + '10', color: p.color }}
                  >
                    <svg width="18" height="18" viewBox={p.viewBox} fill="currentColor" dangerouslySetInnerHTML={{ __html: p.icon }} />
                  </div>
                ))}
              </div>
              <p className="text-gray-900 font-medium mb-1">Drop a URL or paste content above</p>
              <p className="text-gray-500 text-sm">
                The tool pulls key points from any page and writes platform-specific posts with the right tone and character limits.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
