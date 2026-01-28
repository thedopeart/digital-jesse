import chalk from 'chalk';

export const log = {
  info: (msg: string) => console.log(chalk.blue('ℹ'), msg),
  success: (msg: string) => console.log(chalk.green('✓'), msg),
  warn: (msg: string) => console.log(chalk.yellow('⚠'), msg),
  error: (msg: string) => console.log(chalk.red('✗'), msg),
  dim: (msg: string) => console.log(chalk.dim(msg)),
  bold: (msg: string) => console.log(chalk.bold(msg)),
  heading: (msg: string) => console.log('\n' + chalk.bold.underline(msg)),
  divider: () => console.log(chalk.dim('─'.repeat(60))),
  post: (content: string) => {
    log.divider();
    console.log(chalk.white(content));
    log.divider();
  },
  stats: (label: string, value: string) => {
    console.log(`  ${chalk.dim(label + ':')} ${chalk.bold(value)}`);
  },
};
