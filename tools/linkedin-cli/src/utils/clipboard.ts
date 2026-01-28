import clipboard from 'clipboardy';
import open from 'open';
import { log } from './logger.js';

export async function copyAndOpen(content: string): Promise<void> {
  await clipboard.write(content);
  log.success('Post copied to clipboard');
  log.info('Opening LinkedIn...');
  await open('https://www.linkedin.com/feed/');
  log.dim('Paste your post and publish!');
}

export async function copyToClipboard(content: string): Promise<void> {
  await clipboard.write(content);
  log.success('Post copied to clipboard');
}
