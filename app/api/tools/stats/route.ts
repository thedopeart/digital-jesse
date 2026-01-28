import { NextRequest, NextResponse } from 'next/server';
import { readToolStats, incrementToolStats } from '@/lib/tools/stats';

// GET: return stats for a tool
export async function GET(request: NextRequest) {
  const tool = request.nextUrl.searchParams.get('tool') || 'internal-link-finder';
  const stats = await readToolStats(tool);
  return NextResponse.json(stats);
}

// POST: increment stats after a successful crawl
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tool = 'internal-link-finder', pages_crawled = 0, links_found = 0 } = body;
    const updated = await incrementToolStats(tool, { pages_crawled, links_found });
    return NextResponse.json(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update stats';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
