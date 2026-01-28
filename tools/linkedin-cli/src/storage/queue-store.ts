import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import type { PostType } from '../content/templates.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = resolve(__dirname, '..', '..', 'data');
const QUEUE_FILE = resolve(DATA_DIR, 'content-queue.json');

export interface QueuedPost {
  id: string;
  contentType: PostType;
  sourceSlug: string;
  sourceTitle: string;
  content: string;
  status: 'draft' | 'approved' | 'posted' | 'rejected';
  createdAt: string;
  postedAt?: string;
}

interface QueueData {
  posts: QueuedPost[];
}

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readQueue(): QueueData {
  ensureDataDir();
  if (!existsSync(QUEUE_FILE)) {
    return { posts: [] };
  }
  const raw = readFileSync(QUEUE_FILE, 'utf-8');
  return JSON.parse(raw) as QueueData;
}

function writeQueue(data: QueueData): void {
  ensureDataDir();
  writeFileSync(QUEUE_FILE, JSON.stringify(data, null, 2));
}

export function addToQueue(
  content: string,
  contentType: PostType,
  sourceSlug: string,
  sourceTitle: string
): QueuedPost {
  const queue = readQueue();
  const post: QueuedPost = {
    id: randomUUID().slice(0, 8),
    contentType,
    sourceSlug,
    sourceTitle,
    content,
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
  queue.posts.push(post);
  writeQueue(queue);
  return post;
}

export function listQueue(status?: QueuedPost['status']): QueuedPost[] {
  const queue = readQueue();
  if (status) {
    return queue.posts.filter((p) => p.status === status);
  }
  return queue.posts.filter((p) => p.status !== 'posted' && p.status !== 'rejected');
}

export function getQueuedPost(id: string): QueuedPost | undefined {
  const queue = readQueue();
  return queue.posts.find((p) => p.id === id);
}

export function approvePost(id: string): QueuedPost | undefined {
  const queue = readQueue();
  const post = queue.posts.find((p) => p.id === id);
  if (post) {
    post.status = 'approved';
    writeQueue(queue);
  }
  return post;
}

export function rejectPost(id: string): QueuedPost | undefined {
  const queue = readQueue();
  const post = queue.posts.find((p) => p.id === id);
  if (post) {
    post.status = 'rejected';
    writeQueue(queue);
  }
  return post;
}

export function markPosted(id: string): QueuedPost | undefined {
  const queue = readQueue();
  const post = queue.posts.find((p) => p.id === id);
  if (post) {
    post.status = 'posted';
    post.postedAt = new Date().toISOString();
    writeQueue(queue);
  }
  return post;
}

export function updatePostContent(id: string, content: string): QueuedPost | undefined {
  const queue = readQueue();
  const post = queue.posts.find((p) => p.id === id);
  if (post) {
    post.content = content;
    writeQueue(queue);
  }
  return post;
}

export function removePost(id: string): boolean {
  const queue = readQueue();
  const idx = queue.posts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  queue.posts.splice(idx, 1);
  writeQueue(queue);
  return true;
}

export function getNextApproved(): QueuedPost | undefined {
  const queue = readQueue();
  return queue.posts.find((p) => p.status === 'approved');
}
