import chalk from 'chalk';
import { getPostStats } from '../storage/history-store.js';
import { log } from '../utils/logger.js';

export async function runHistory(options: { stats?: boolean }): Promise<void> {
  const data = await getPostStats();

  if (data.totalPosts === 0) {
    log.info('No posts in history yet. Start by running "jesse-linkedin generate".');
    return;
  }

  if (options.stats) {
    log.heading('Post Statistics');
    console.log('');
    log.stats('Total Posts', `${data.totalPosts}`);

    console.log('');
    console.log(chalk.bold('  By Type:'));
    for (const [type, count] of Object.entries(data.byType).sort((a, b) => b[1] - a[1])) {
      const bar = chalk.cyan('█'.repeat(Math.min(count * 3, 30)));
      console.log(`    ${type.padEnd(20)} ${bar} ${count}`);
    }

    console.log('');
    console.log(chalk.bold('  By Source:'));
    for (const [source, count] of Object.entries(data.bySource).sort((a, b) => b[1] - a[1])) {
      const bar = chalk.green('█'.repeat(Math.min(count * 3, 30)));
      console.log(`    ${source.padEnd(25)} ${bar} ${count}`);
    }
  } else {
    log.heading('Recent Posts');
    console.log('');

    for (const post of data.recentPosts) {
      const date = new Date(post.postedAt).toLocaleDateString();
      console.log(
        `  ${chalk.dim(date)}  ${chalk.cyan(post.contentType.padEnd(18))}  ${chalk.dim(post.sourceTitle)}`
      );
      const firstLine = post.content.split('\n')[0].slice(0, 70);
      console.log(`    ${chalk.dim(firstLine)}...`);
      console.log('');
    }

    log.dim(`${data.totalPosts} total posts. Use --stats for detailed breakdown.`);
  }
}
