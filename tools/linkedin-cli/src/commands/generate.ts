import ora from 'ora';
import chalk from 'chalk';
import { writeFileSync } from 'fs';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createInterface } from 'readline';
import { generatePost, type GenerateOptions, type GeneratedPost } from '../content/ai-generator.js';
import { validate, formatViolations } from '../content/validator.js';
import { addToQueue, approvePost, markPosted } from '../storage/queue-store.js';
import { recordPost } from '../storage/history-store.js';
import { getAllPostTypes, getRandomPostType, type PostType } from '../content/templates.js';
import { getAllSources } from '../content/extractor.js';
import { copyAndOpen, copyToClipboard } from '../utils/clipboard.js';
import { log } from '../utils/logger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REVIEW_DIR = resolve(__dirname, '..', '..', 'data');
const REVIEW_FILE = resolve(REVIEW_DIR, 'review.md');

function ask(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

interface GeneratedOption {
  post: GeneratedPost;
  validation: ReturnType<typeof validate>;
  queueId: string;
}

function buildReviewMarkdown(options: GeneratedOption[]): string {
  const lines: string[] = [];
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  lines.push(`# LinkedIn Post Options`);
  lines.push(`Generated: ${dateStr} at ${timeStr}`);
  lines.push('');
  lines.push(`Pick a number in the terminal to copy it to your clipboard.`);
  lines.push('');
  lines.push('---');
  lines.push('');

  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const num = i + 1;
    const cleanStatus = opt.validation.isClean ? 'CLEAN' : 'HAS ISSUES';

    lines.push(`## Option ${num}: ${opt.post.type}`);
    lines.push(`Source: ${opt.post.sourceTitle} | ${opt.validation.charCount} chars | ${cleanStatus}`);
    lines.push('');

    if (!opt.validation.isClean) {
      lines.push(`> Issues: ${formatViolations(opt.validation)}`);
      lines.push('');
    }

    lines.push('```');
    lines.push(opt.post.content);
    lines.push('```');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

export async function runGenerate(options: { type?: string; source?: string; context?: string }): Promise<void> {
  const genOptions: GenerateOptions = {};

  if (options.type) {
    const validTypes = getAllPostTypes();
    if (!validTypes.includes(options.type as PostType)) {
      log.error(`Invalid post type: ${options.type}`);
      log.info(`Valid types: ${validTypes.join(', ')}`);
      return;
    }
    genOptions.type = options.type as PostType;
  }

  if (options.source) {
    genOptions.source = options.source;
  }

  if (options.context) {
    genOptions.extraContext = options.context;
  }

  const COUNT = 3;
  const spinner = ora(`Generating ${COUNT} LinkedIn post options...`).start();

  try {
    const generated: GeneratedOption[] = [];

    for (let i = 0; i < COUNT; i++) {
      spinner.text = `Generating option ${i + 1} of ${COUNT}...`;

      const thisOptions: GenerateOptions = { ...genOptions };
      if (!genOptions.type) {
        thisOptions.type = getRandomPostType();
      }

      const post = await generatePost(thisOptions);
      const validation = validate(post.content);
      const queued = addToQueue(post.content, post.type, post.sourceSlug, post.sourceTitle);

      generated.push({ post, validation, queueId: queued.id });
    }

    spinner.stop();

    // Write review markdown and open in VS Code
    if (!existsSync(REVIEW_DIR)) mkdirSync(REVIEW_DIR, { recursive: true });
    writeFileSync(REVIEW_FILE, buildReviewMarkdown(generated));
    try {
      execSync(`code "${REVIEW_FILE}"`, { stdio: 'ignore' });
    } catch {
      try { execSync(`open "${REVIEW_FILE}"`, { stdio: 'ignore' }); } catch { /* ok */ }
    }

    // Show options in terminal
    console.log('');
    for (let i = 0; i < generated.length; i++) {
      const opt = generated[i];
      const status = opt.validation.isClean ? chalk.green('clean') : chalk.yellow('issues');
      const firstLine = opt.post.content.split('\n')[0].slice(0, 75);
      console.log(chalk.bold.white(`  [${i + 1}] ${opt.post.type}`) + `  ${chalk.dim(`(${opt.post.sourceTitle})`)}  [${status}]`);
      console.log(`      ${chalk.dim(firstLine)}`);
      console.log('');
    }

    // Interactive: pick a number
    console.log(chalk.bold('  [r] Regenerate all'));
    console.log(chalk.bold('  [q] Quit (drafts saved)'));
    console.log('');

    const answer = await ask(chalk.bold('Pick an option (1-3), r, or q: '));

    const picked = parseInt(answer);
    if (picked >= 1 && picked <= COUNT) {
      const chosen = generated[picked - 1];
      log.heading(`Option ${picked} selected`);
      console.log('');
      log.post(chosen.content);

      const action = await ask(chalk.bold('Copy to clipboard? ') + chalk.dim('(y)es / (e)dit first / (n)o: '));

      if (action === 'y' || action === 'yes' || action === '') {
        approvePost(chosen.queueId);
        markPosted(chosen.queueId);
        await recordPost(chosen.queueId, chosen.post.content, chosen.post.type, chosen.post.sourceSlug, chosen.post.sourceTitle);
        await copyAndOpen(chosen.post.content);
        log.success('Done! Paste it on LinkedIn.');
      } else if (action === 'e' || action === 'edit') {
        log.info('Opening in your editor...');
        const { runQueueEdit } = await import('./queue.js');
        await runQueueEdit(chosen.queueId);
        // After editing, ask again
        const postNow = await ask(chalk.bold('Copy edited post to clipboard? ') + chalk.dim('(y/n): '));
        if (postNow === 'y' || postNow === 'yes') {
          const { getQueuedPost } = await import('../storage/queue-store.js');
          const updated = getQueuedPost(chosen.queueId);
          if (updated) {
            approvePost(chosen.queueId);
            markPosted(chosen.queueId);
            await recordPost(chosen.queueId, updated.content, chosen.post.type, chosen.post.sourceSlug, chosen.post.sourceTitle);
            await copyAndOpen(updated.content);
            log.success('Done! Paste it on LinkedIn.');
          }
        } else {
          approvePost(chosen.queueId);
          log.success(`Saved as approved draft (ID: ${chosen.queueId})`);
          log.dim('Run "npx tsx src/index.ts post" when ready.');
        }
      } else {
        approvePost(chosen.queueId);
        log.success(`Saved as approved draft (ID: ${chosen.queueId})`);
        log.dim('Run "npx tsx src/index.ts post" when ready.');
      }
    } else if (answer === 'r') {
      log.info('Regenerating...');
      await runGenerate(options);
    } else {
      log.dim('All 3 saved as drafts. Run "npx tsx src/index.ts queue list" to see them.');
    }

  } catch (error) {
    spinner.stop();
    if (error instanceof Error) {
      log.error(error.message);
    } else {
      log.error('Failed to generate posts');
    }
  }
}

export async function runSources(): Promise<void> {
  const sources = await getAllSources();

  log.heading('Available Content Sources');
  console.log('');

  const portfolioSources = sources.filter((s) => s.type === 'portfolio');
  const projectSources = sources.filter((s) => s.type === 'project');

  console.log(chalk.bold('Portfolio Pages:'));
  for (const s of portfolioSources) {
    console.log(`  ${chalk.cyan(s.slug)} - ${s.title}`);
  }
  console.log('');

  console.log(chalk.bold('Projects:'));
  for (const s of projectSources) {
    console.log(`  ${chalk.cyan(s.slug)} - ${s.title}`);
  }

  console.log('');
  log.dim('Use with: jesse-linkedin generate --source <slug>');
}
