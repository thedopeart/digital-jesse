import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..', '..', '..', '..');

// Types mirroring the portfolio site's data structures
export interface PortfolioSection {
  heading: string;
  content?: string;
  metrics?: { label: string; value: string }[];
  images?: { src: string; alt: string }[];
  bullets?: string[];
  layout?: string;
}

export interface PortfolioPage {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  sections: PortfolioSection[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
  url?: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  content: {
    overview: string;
    challenge?: string;
    solution?: string;
    results?: string[];
    tools?: string[];
  };
}

// We use dynamic import with tsx to load TypeScript files directly
let cachedPortfolioPages: PortfolioPage[] | null = null;
let cachedProjects: Project[] | null = null;

async function loadPortfolioPages(): Promise<PortfolioPage[]> {
  if (cachedPortfolioPages) return cachedPortfolioPages;
  const filePath = resolve(PROJECT_ROOT, 'lib', 'portfolio-pages.ts');
  // Use tsx runtime to import TypeScript directly
  const mod = await import(filePath);
  cachedPortfolioPages = mod.portfolioPages as PortfolioPage[];
  return cachedPortfolioPages;
}

async function loadProjects(): Promise<Project[]> {
  if (cachedProjects) return cachedProjects;
  const filePath = resolve(PROJECT_ROOT, 'lib', 'projects.ts');
  const mod = await import(filePath);
  cachedProjects = mod.projects as Project[];
  return cachedProjects;
}

export async function getPortfolioPages(): Promise<PortfolioPage[]> {
  return loadPortfolioPages();
}

export async function getProjects(): Promise<Project[]> {
  return loadProjects();
}

export async function getPortfolioPage(slug: string): Promise<PortfolioPage | undefined> {
  const pages = await getPortfolioPages();
  return pages.find((p) => p.slug === slug);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

// Get all available source slugs (both portfolio pages and projects)
export async function getAllSources(): Promise<{ slug: string; title: string; type: 'portfolio' | 'project' }[]> {
  const [pages, projects] = await Promise.all([getPortfolioPages(), getProjects()]);
  const sources: { slug: string; title: string; type: 'portfolio' | 'project' }[] = [];

  for (const page of pages) {
    sources.push({ slug: page.slug, title: page.title, type: 'portfolio' });
  }
  for (const project of projects) {
    sources.push({ slug: project.slug, title: project.title, type: 'project' });
  }

  return sources;
}

// Extract all metrics from a portfolio page
export function extractMetrics(page: PortfolioPage): { label: string; value: string }[] {
  const metrics: { label: string; value: string }[] = [];
  for (const section of page.sections) {
    if (section.metrics) {
      metrics.push(...section.metrics);
    }
  }
  return metrics;
}

// Extract all bullet points from a portfolio page
export function extractBullets(page: PortfolioPage): string[] {
  const bullets: string[] = [];
  for (const section of page.sections) {
    if (section.bullets) {
      bullets.push(...section.bullets);
    }
  }
  return bullets;
}

// Strip markdown bold markers for plain text
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

// Build a content summary for a portfolio page (for AI prompts)
export function summarizePortfolioPage(page: PortfolioPage): string {
  const lines: string[] = [];
  lines.push(`Title: ${page.title}`);
  if (page.subtitle) lines.push(`Subtitle: ${page.subtitle}`);
  lines.push(`Category: ${page.category}`);
  lines.push(`Description: ${page.description}`);
  lines.push('');

  for (const section of page.sections) {
    lines.push(`## ${section.heading}`);
    if (section.content) {
      lines.push(stripMarkdown(section.content));
    }
    if (section.metrics) {
      for (const m of section.metrics) {
        lines.push(`- ${m.label}: ${m.value}`);
      }
    }
    if (section.bullets) {
      for (const b of section.bullets) {
        lines.push(`- ${stripMarkdown(b)}`);
      }
    }
    lines.push('');
  }

  return lines.join('\n');
}

// Build a content summary for a project (for AI prompts)
export function summarizeProject(project: Project): string {
  const lines: string[] = [];
  lines.push(`Title: ${project.title}`);
  lines.push(`Category: ${project.category}`);
  lines.push(`Description: ${project.description}`);
  if (project.url) lines.push(`URL: ${project.url}`);
  lines.push('');

  if (project.metrics) {
    lines.push('Metrics:');
    for (const m of project.metrics) {
      lines.push(`- ${m.label}: ${m.value}`);
    }
    lines.push('');
  }

  lines.push(`Tags: ${project.tags.join(', ')}`);
  lines.push('');

  lines.push(`Overview: ${project.content.overview}`);
  if (project.content.challenge) lines.push(`Challenge: ${project.content.challenge}`);
  if (project.content.solution) lines.push(`Solution: ${project.content.solution}`);
  if (project.content.results) {
    lines.push('Results:');
    for (const r of project.content.results) {
      lines.push(`- ${r}`);
    }
  }
  if (project.content.tools) {
    lines.push(`Tools: ${project.content.tools.join(', ')}`);
  }

  return lines.join('\n');
}
