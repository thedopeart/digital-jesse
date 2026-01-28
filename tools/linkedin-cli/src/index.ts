#!/usr/bin/env node

import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Load .env, override existing empty env vars
config({ path: resolve(process.cwd(), '.env'), override: true });
config({ path: resolve(__dirname, '..', '.env'), override: true });

const program = new Command();

program
  .name('jesse-linkedin')
  .description('Generate and manage LinkedIn posts from your portfolio content')
  .version('1.0.0');

// --- generate ---
program
  .command('generate')
  .description('Generate a new LinkedIn post')
  .option('-t, --type <type>', 'Post type (metric-showcase, before-after, tool-announcement, practical-tip, new-content, weekly-recap, industry-take)')
  .option('-s, --source <slug>', 'Source project or portfolio page slug')
  .option('-c, --context <text>', 'Extra context or angle to guide the post')
  .action(async (opts) => {
    const { runGenerate } = await import('./commands/generate.js');
    await runGenerate(opts);
  });

// --- sources ---
program
  .command('sources')
  .description('List all available content sources')
  .action(async () => {
    const { runSources } = await import('./commands/generate.js');
    await runSources();
  });

// --- queue ---
const queue = program
  .command('queue')
  .description('Manage the content queue');

queue
  .command('list')
  .description('Show queued posts')
  .action(async () => {
    const { runQueueList } = await import('./commands/queue.js');
    await runQueueList();
  });

queue
  .command('show <id>')
  .description('Show a specific queued post')
  .action(async (id: string) => {
    const { runQueueShow } = await import('./commands/queue.js');
    await runQueueShow(id);
  });

queue
  .command('approve <id>')
  .description('Approve a draft post')
  .action(async (id: string) => {
    const { runQueueApprove } = await import('./commands/queue.js');
    await runQueueApprove(id);
  });

queue
  .command('reject <id>')
  .description('Reject a post')
  .action(async (id: string) => {
    const { runQueueReject } = await import('./commands/queue.js');
    await runQueueReject(id);
  });

queue
  .command('edit <id>')
  .description('Edit a post in your text editor')
  .action(async (id: string) => {
    const { runQueueEdit } = await import('./commands/queue.js');
    await runQueueEdit(id);
  });

queue
  .command('remove <id>')
  .description('Remove a post from the queue')
  .action(async (id: string) => {
    const { runQueueRemove } = await import('./commands/queue.js');
    await runQueueRemove(id);
  });

// --- post ---
program
  .command('post')
  .description('Copy an approved post to clipboard and open LinkedIn')
  .option('--id <id>', 'Post a specific approved post')
  .option('--clipboard', 'Copy to clipboard only (don\'t open browser)')
  .action(async (opts) => {
    const { runPost } = await import('./commands/post.js');
    await runPost({ id: opts.id, clipboardOnly: opts.clipboard });
  });

// --- scrape ---
program
  .command('scrape')
  .description('Check live sites for new content')
  .option('-s, --site <site>', 'Specific site to scrape (dateideas, qualitysewing, masterpieces)')
  .action(async (opts) => {
    const { runScrape } = await import('./commands/scrape.js');
    await runScrape(opts);
  });

// --- history ---
program
  .command('history')
  .description('View post history')
  .option('--stats', 'Show detailed statistics')
  .action(async (opts) => {
    const { runHistory } = await import('./commands/history.js');
    await runHistory(opts);
  });

// --- validate ---
program
  .command('validate <text>')
  .description('Check text against banned words/phrases')
  .action(async (text: string) => {
    const { validate, formatViolations } = await import('./content/validator.js');
    const { log } = await import('./utils/logger.js');

    const result = validate(text);
    if (result.isClean) {
      log.success('Text passes all validation checks');
      log.stats('Characters', `${result.charCount}`);
    } else {
      log.warn('Validation issues found:');
      console.log(formatViolations(result));
    }
  });

program.parse();
