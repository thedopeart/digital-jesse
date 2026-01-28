import { promises as fs } from 'fs';
import path from 'path';

const STATS_FILE = path.join(process.cwd(), 'data', 'tool-stats.json');

export interface ToolStats {
  sites_analyzed: number;
  links_found: number;
  pages_crawled: number;
}

interface AllStats {
  [toolName: string]: ToolStats;
}

export async function readToolStats(tool: string): Promise<ToolStats> {
  try {
    const raw = await fs.readFile(STATS_FILE, 'utf-8');
    const stats: AllStats = JSON.parse(raw);
    return stats[tool] || { sites_analyzed: 0, links_found: 0, pages_crawled: 0 };
  } catch {
    return { sites_analyzed: 0, links_found: 0, pages_crawled: 0 };
  }
}

export async function incrementToolStats(
  tool: string,
  increments: { pages_crawled?: number; links_found?: number }
): Promise<ToolStats> {
  let allStats: AllStats;
  try {
    const raw = await fs.readFile(STATS_FILE, 'utf-8');
    allStats = JSON.parse(raw);
  } catch {
    allStats = {};
  }

  if (!allStats[tool]) {
    allStats[tool] = { sites_analyzed: 0, links_found: 0, pages_crawled: 0 };
  }

  allStats[tool].sites_analyzed += 1;
  allStats[tool].pages_crawled += increments.pages_crawled || 0;
  allStats[tool].links_found += increments.links_found || 0;

  await fs.writeFile(STATS_FILE, JSON.stringify(allStats, null, 2) + '\n');
  return allStats[tool];
}
