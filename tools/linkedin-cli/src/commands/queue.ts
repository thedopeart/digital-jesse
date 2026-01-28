import chalk from 'chalk';
import { execSync } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  listQueue,
  getQueuedPost,
  approvePost,
  rejectPost,
  removePost,
  updatePostContent,
} from '../storage/queue-store.js';
import { validate, formatViolations } from '../content/validator.js';
import { log } from '../utils/logger.js';

export async function runQueueList(): Promise<void> {
  const posts = listQueue();

  if (posts.length === 0) {
    log.info('Queue is empty. Run "jesse-linkedin generate" to create a post.');
    return;
  }

  log.heading(`Content Queue (${posts.length} items)`);
  console.log('');

  for (const post of posts) {
    const statusColor =
      post.status === 'approved' ? chalk.green :
      post.status === 'draft' ? chalk.yellow :
      chalk.dim;

    console.log(
      `  ${chalk.bold(post.id)}  ${statusColor(`[${post.status}]`)}  ${chalk.cyan(post.contentType)}  ${chalk.dim(post.sourceTitle)}`
    );
    // Show first line of content
    const firstLine = post.content.split('\n')[0].slice(0, 80);
    console.log(`    ${chalk.dim(firstLine)}${post.content.split('\n')[0].length > 80 ? '...' : ''}`);
    console.log('');
  }

  const approved = posts.filter((p) => p.status === 'approved').length;
  const drafts = posts.filter((p) => p.status === 'draft').length;

  log.dim(`${approved} approved, ${drafts} drafts`);
}

export async function runQueueApprove(id: string): Promise<void> {
  const post = approvePost(id);
  if (!post) {
    log.error(`Post not found: ${id}`);
    return;
  }

  log.success(`Post ${id} approved`);
  log.info('Run "jesse-linkedin post" to copy to clipboard and open LinkedIn');
}

export async function runQueueReject(id: string): Promise<void> {
  const post = rejectPost(id);
  if (!post) {
    log.error(`Post not found: ${id}`);
    return;
  }

  log.success(`Post ${id} rejected`);
}

export async function runQueueRemove(id: string): Promise<void> {
  const removed = removePost(id);
  if (!removed) {
    log.error(`Post not found: ${id}`);
    return;
  }

  log.success(`Post ${id} removed from queue`);
}

export async function runQueueEdit(id: string): Promise<void> {
  const post = getQueuedPost(id);
  if (!post) {
    log.error(`Post not found: ${id}`);
    return;
  }

  // Write content to a temp file
  const tmpFile = join(tmpdir(), `jesse-linkedin-${id}.txt`);
  writeFileSync(tmpFile, post.content);

  const editor = process.env.EDITOR || process.env.VISUAL || 'nano';

  try {
    execSync(`${editor} "${tmpFile}"`, { stdio: 'inherit' });

    // Read back the edited content
    const edited = readFileSync(tmpFile, 'utf-8').trim();

    if (edited === post.content) {
      log.dim('No changes made');
    } else {
      updatePostContent(id, edited);

      // Validate the edited content
      const validation = validate(edited);
      if (!validation.isClean) {
        log.warn('Edited post has validation issues:');
        console.log(chalk.yellow(formatViolations(validation)));
      } else {
        log.success('Edited post passes all validation checks');
      }

      log.success(`Post ${id} updated`);
    }
  } catch {
    log.error(`Failed to open editor: ${editor}`);
  } finally {
    try { unlinkSync(tmpFile); } catch { /* ignore */ }
  }
}

export async function runQueueShow(id: string): Promise<void> {
  const post = getQueuedPost(id);
  if (!post) {
    log.error(`Post not found: ${id}`);
    return;
  }

  log.heading(`Post ${post.id}`);
  log.stats('Status', post.status);
  log.stats('Type', post.contentType);
  log.stats('Source', post.sourceTitle);
  log.stats('Created', new Date(post.createdAt).toLocaleDateString());
  console.log('');
  log.post(post.content);

  const validation = validate(post.content);
  log.stats('Characters', `${validation.charCount}`);
  if (!validation.isClean) {
    log.warn('Validation issues:');
    console.log(chalk.yellow(formatViolations(validation)));
  }
}
