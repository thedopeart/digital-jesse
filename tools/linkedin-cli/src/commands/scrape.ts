import ora from 'ora';
import chalk from 'chalk';
import { scrapeAll, scrapeSite, type ScrapeResult } from '../content/scraper.js';
import { log } from '../utils/logger.js';

function displayResult(result: ScrapeResult): void {
  console.log(
    `  ${chalk.bold(result.site)}: ${result.totalFound} items found, ${chalk.green(
      `${result.newItems.length} new`
    )}`
  );

  for (const item of result.newItems) {
    console.log(`    ${chalk.cyan('NEW')} ${item.title}`);
    console.log(`         ${chalk.dim(item.url)}`);
  }
}

export async function runScrape(options: { site?: string }): Promise<void> {
  const spinner = ora('Scraping sites for new content...').start();

  try {
    if (options.site) {
      const result = await scrapeSite(options.site);
      spinner.stop();

      log.heading('Scrape Results');
      console.log('');
      displayResult(result);

      if (result.newItems.length > 0) {
        console.log('');
        log.info(
          'New content found! Use "jesse-linkedin generate --type new-content" to create a post about it.'
        );
      } else {
        console.log('');
        log.dim('No new content detected since last scrape.');
      }
    } else {
      const results = await scrapeAll();
      spinner.stop();

      log.heading('Scrape Results (All Sites)');
      console.log('');

      for (const result of results) {
        displayResult(result);
        console.log('');
      }

      const totalNew = results.reduce((sum, r) => sum + r.newItems.length, 0);
      if (totalNew > 0) {
        log.info(
          `${totalNew} new items found. Use "jesse-linkedin generate --type new-content" to create posts.`
        );
      } else {
        log.dim('No new content detected across any sites.');
      }
    }
  } catch (error) {
    spinner.stop();
    if (error instanceof Error) {
      log.error(error.message);
    } else {
      log.error('Scraping failed');
    }
  }
}
