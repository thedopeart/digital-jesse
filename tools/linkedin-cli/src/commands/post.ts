import { getNextApproved, getQueuedPost, markPosted } from '../storage/queue-store.js';
import { recordPost } from '../storage/history-store.js';
import { copyAndOpen, copyToClipboard } from '../utils/clipboard.js';
import { log } from '../utils/logger.js';

export async function runPost(options: { id?: string; clipboardOnly?: boolean }): Promise<void> {
  let post;

  if (options.id) {
    post = getQueuedPost(options.id);
    if (!post) {
      log.error(`Post not found: ${options.id}`);
      return;
    }
    if (post.status !== 'approved') {
      log.warn(`Post ${options.id} is not approved (status: ${post.status})`);
      log.info(`Run "jesse-linkedin queue approve ${options.id}" first`);
      return;
    }
  } else {
    post = getNextApproved();
    if (!post) {
      log.info('No approved posts in queue.');
      log.info('Run "jesse-linkedin generate" to create a post, or "jesse-linkedin queue list" to see drafts.');
      return;
    }
  }

  log.heading('Posting to LinkedIn');
  log.stats('Post ID', post.id);
  log.stats('Type', post.contentType);
  log.stats('Source', post.sourceTitle);
  console.log('');

  log.post(post.content);

  if (options.clipboardOnly) {
    await copyToClipboard(post.content);
  } else {
    await copyAndOpen(post.content);
  }

  // Mark as posted and record in history
  markPosted(post.id);
  await recordPost(post.id, post.content, post.contentType, post.sourceSlug, post.sourceTitle);

  log.success('Post marked as posted in history');
}
