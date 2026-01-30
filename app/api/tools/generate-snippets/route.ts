import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const maxDuration = 30;

const PLATFORM_CONFIGS: Record<string, { maxChars: number; tone: string; count: number }> = {
  twitter: { maxChars: 280, tone: 'Short, punchy, direct. Like texting a smart friend.', count: 5 },
  linkedin: { maxChars: 3000, tone: 'Professional but human. First person. Like talking to a coworker you respect.', count: 5 },
  instagram: { maxChars: 2200, tone: 'Casual caption style. Relatable. End with a CTA or hashtags.', count: 5 },
  facebook: { maxChars: 5000, tone: 'Conversational. Like posting in a group of people who care about the topic.', count: 4 },
  threads: { maxChars: 500, tone: 'Very casual. Quick opinions. Like group chat energy.', count: 5 },
};

const SNIPPET_TYPES: Record<string, string[]> = {
  twitter: ['Short Post', 'Thread Start', 'Quote', 'Question', 'Stat'],
  linkedin: ['Post', 'List Post', 'Story', 'Data Post', 'Discussion'],
  instagram: ['Caption', 'Short Caption', 'Quote Card', 'Stat', 'CTA'],
  facebook: ['Post', 'Question', 'List', 'Stat'],
  threads: ['Post', 'Question', 'Opinion', 'Stat', 'Teaser'],
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_key_here') {
      return NextResponse.json(
        { error: 'Gemini API key not configured.' },
        { status: 500 }
      );
    }

    const { content, title, platform } = await request.json();

    if (!content || !platform) {
      return NextResponse.json(
        { error: 'Content and platform are required.' },
        { status: 400 }
      );
    }

    const config = PLATFORM_CONFIGS[platform];
    const types = SNIPPET_TYPES[platform];
    if (!config || !types) {
      return NextResponse.json(
        { error: `Unknown platform: ${platform}` },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const typeList = types.map((t, i) => `${i + 1}. "${t}"`).join('\n');

    const prompt = `You write social media posts. Your job: take the content below and write ${config.count} ${platform} posts that someone would actually publish.

VOICE AND TONE:
- ${config.tone}
- Write like YOU made this content and you're sharing it. Not like you're reporting on someone else's work.
- Use contractions: don't, I've, you'll, here's, that's, won't, it's
- Vary sentence length. Some short. Some longer with more detail.
- Be specific. Pull real numbers, quotes, and details from the content. Never make anything up.

WHAT TO AVOID:
- Don't summarize the page. Pick ONE specific angle per post and make it interesting.
- Don't frame it as "I just read this great article" or "Check out this post" or "This article covers..."
- Don't use: exceptional, unparalleled, cutting-edge, groundbreaking, revolutionary, transformative, remarkable, game-changing, leverage, synergy, robust, seamless, holistic, streamline, optimize, utilize, comprehensive, vital, pivotal, compelling, intriguing, captivating, unleash, unlock, empower, embark, delve, foster, navigate, harness, elevate, furthermore, moreover, additionally, consequently, tapestry, multifaceted, meticulous, testament, endeavors, realm, myriad, plethora, paramount, intricate, bespoke, curated
- Don't start with "Welcome to", "Introducing", "In today's world", "In the ever-evolving"
- No em dashes. Use periods, commas, or colons instead.
- Don't write like you're giving an overview or book report. Write like you have a point to make.

EXAMPLES OF BAD OUTPUT (don't do this):
- "This article breaks down the top 5 strategies for growing your business online."
- "I just came across a fascinating piece about SEO that everyone should read."
- "Here are the key takeaways from this post about content marketing."

EXAMPLES OF GOOD OUTPUT (do this):
- "Most people waste months on SEO tactics that stopped working in 2023. Here's what actually moves the needle now."
- "852% sales growth in one year. No paid ads. Just SEO and better product pages. Here's what I changed."
- "Stop writing 2,000-word blog posts nobody reads. The pages ranking #1 right now? They're 800 words with better structure."

Each post must be under ${config.maxChars} characters. Each should take a DIFFERENT angle. No repetition.

Assign each post one of these types:
${typeList}

PAGE TITLE: ${title || 'Untitled'}

PAGE CONTENT:
${content.slice(0, 6000)}

Respond with ONLY a JSON array. Each element: {"type": "the type name", "text": "the post text"}
No markdown, no code fences, no explanation. Just the JSON array.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    let cleaned = responseText;
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    let snippets: { type: string; text: string }[];
    try {
      snippets = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Try again.' },
        { status: 500 }
      );
    }

    if (!Array.isArray(snippets)) {
      return NextResponse.json(
        { error: 'Invalid AI response format.' },
        { status: 500 }
      );
    }

    const formatted = snippets
      .filter((s) => s.type && s.text)
      .map((s) => ({
        platform,
        type: s.type,
        text: s.text.slice(0, config.maxChars),
      }));

    return NextResponse.json({ snippets: formatted });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `AI generation failed: ${message}` },
      { status: 500 }
    );
  }
}
