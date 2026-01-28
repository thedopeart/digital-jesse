import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '..', '..', 'data');
const HISTORY_FILE = resolve(DATA_DIR, 'post-history.json');

export interface PostedItem {
  id: string;
  content: string;
  contentType: string;
  sourceSlug: string;
  sourceTitle: string;
  postedAt: string;
}

export interface PostHistory {
  posts: PostedItem[];
  sourceUsageCount: Record<string, number>;
  scrapedUrls: Record<string, string[]>;
  lastScrapeAt: Record<string, string>;
}

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

export async function getHistory(): Promise<PostHistory> {
  ensureDataDir();
  if (!existsSync(HISTORY_FILE)) {
    return { posts: [], sourceUsageCount: {}, scrapedUrls: {}, lastScrapeAt: {} };
  }
  const raw = readFileSync(HISTORY_FILE, 'utf-8');
  return JSON.parse(raw) as PostHistory;
}

function writeHistory(data: PostHistory): void {
  ensureDataDir();
  writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
}

export async function recordPost(
  id: string,
  content: string,
  contentType: string,
  sourceSlug: string,
  sourceTitle: string
): Promise<void> {
  const history = await getHistory();

  history.posts.push({
    id,
    content,
    contentType,
    sourceSlug,
    sourceTitle,
    postedAt: new Date().toISOString(),
  });

  history.sourceUsageCount[sourceSlug] = (history.sourceUsageCount[sourceSlug] || 0) + 1;

  writeHistory(history);
}

export async function recordScrapedUrls(domain: string, urls: string[]): Promise<void> {
  const history = await getHistory();
  history.scrapedUrls[domain] = urls;
  history.lastScrapeAt[domain] = new Date().toISOString();
  writeHistory(history);
}

export async function getKnownUrls(domain: string): Promise<string[]> {
  const history = await getHistory();
  return history.scrapedUrls[domain] || [];
}

export async function getPostStats(): Promise<{
  totalPosts: number;
  byType: Record<string, number>;
  bySource: Record<string, number>;
  recentPosts: PostedItem[];
}> {
  const history = await getHistory();

  const byType: Record<string, number> = {};
  const bySource: Record<string, number> = {};

  for (const post of history.posts) {
    byType[post.contentType] = (byType[post.contentType] || 0) + 1;
    bySource[post.sourceSlug] = (bySource[post.sourceSlug] || 0) + 1;
  }

  const recentPosts = history.posts.slice(-10).reverse();

  return { totalPosts: history.posts.length, byType, bySource, recentPosts };
}
