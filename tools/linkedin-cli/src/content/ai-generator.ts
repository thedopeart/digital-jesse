import Anthropic from '@anthropic-ai/sdk';
import { PostType, getTemplate } from './templates.js';
import { validate, formatViolations, getBannedWordsForPrompt, getBannedPhrasesForPrompt } from './validator.js';
import {
  getPortfolioPages,
  getProjects,
  getPortfolioPage,
  getProject,
  summarizePortfolioPage,
  summarizeProject,
  type PortfolioPage,
  type Project,
} from './extractor.js';
import { getHistory } from '../storage/history-store.js';

const SYSTEM_PROMPT = `You are writing a LinkedIn post for Jesse Johnson, a digital marketer and e-commerce specialist based in Seattle, WA.

ABOUT JESSE:
- E-commerce Manager at Quality Sewing (qualitysewing.com): $2M+/year revenue, grew organic traffic from 5K to 22K monthly
- Founded Luxury Wall Art ($120K revenue, 0 to 9,200 keywords), The Dope Art ($400K+ sales, 26K+ followers), Eternal Royals ($2M+ NFT sales)
- $4.5M+ total sales across e-commerce, NFTs, and digital products
- Built 30+ tools including Masterpiece Locator (4,094 paintings, 455 museums) and 12+ quilting calculators
- 6 years Shopify expertise, 10+ years in online business
- 3,000+ customers across brands, all 5-star rated
- University of Oregon graduate (BS Political Science, Business Admin & CS minors)

VOICE RULES (CRITICAL):
- Write in first person. Use contractions: "don't" not "do not", "I've" not "I have"
- Confident but not arrogant. Let results speak for themselves.
- Vary sentence length dramatically. Short punchy lines mixed with longer ones.
- Use specific numbers over vague claims. "$2M in sales" beats "successful entrepreneur"
- Round big numbers naturally: "4,100+" not "4,094"
- NO em dashes (— or --). Use periods, commas, or colons instead.
- Sound human. Read it aloud. If it sounds like a LinkedIn bot, rewrite it.
- Get to the point quickly. No padding or filler.
- NEVER use "honestly," "because honestly," "here's the deal," "the thing is," "but here's the thing" or similar filler transitions. They sound AI-generated and corny. Just state the point directly.
- NEVER use section headers like "Key features:" or "But here's the real strategy:" in posts. Let it flow naturally without announcing sections.
- Use positive active framing. Say what IS, not what ISN'T. "I found this info was scattered" beats "there wasn't a simple way to find this."

LENGTH RULES (CRITICAL):
- Keep posts SHORT. Target 400-700 characters. Absolute max 900.
- Every sentence must earn its place. If you can cut it without losing meaning, cut it.
- No rambling introductions. Hook, value, done.
- Two goals per post: (1) show the value of what you're presenting, (2) show YOUR value for being the person who built/did it. That's it.

BANNED WORDS (NEVER USE): ${getBannedWordsForPrompt()}

BANNED PHRASES (NEVER USE): ${getBannedPhrasesForPrompt()}

FORMATTING:
- NEVER use emojis. Not even one. No emoji characters anywhere in the post.
- End with 3-5 relevant hashtags
- Keep line breaks natural for LinkedIn readability (blank lines between sections)
- Return ONLY the post text. No explanations, no "here's your post" preamble.`;

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not set. Create a .env file in tools/linkedin-cli/ with your key.');
    }
    client = new Anthropic({ apiKey });
  }
  return client;
}

// Strip preamble lines and emojis from AI output
function cleanOutput(text: string): string {
  // Remove common AI preambles
  let cleaned = text
    .replace(/^here['']?s?\s*(your|the|a)?\s*linkedin\s*post[:\s]*/i, '')
    .replace(/^here\s*is\s*(your|the|a)?\s*(linkedin\s*)?post[:\s]*/i, '')
    .replace(/^(sure[!,.]?\s*)?here['']?s?\s*(the|your|a)\s*post[:\s]*/i, '')
    .replace(/^linkedin\s*post[:\s]*/i, '')
    .trim();

  // Remove emoji characters (Unicode emoji ranges)
  cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}]/gu, ''); // emoticons
  cleaned = cleaned.replace(/[\u{1F300}-\u{1F5FF}]/gu, ''); // symbols & pictographs
  cleaned = cleaned.replace(/[\u{1F680}-\u{1F6FF}]/gu, ''); // transport & map
  cleaned = cleaned.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, ''); // flags
  cleaned = cleaned.replace(/[\u{2600}-\u{26FF}]/gu, '');   // misc symbols
  cleaned = cleaned.replace(/[\u{2700}-\u{27BF}]/gu, '');   // dingbats
  cleaned = cleaned.replace(/[\u{FE00}-\u{FE0F}]/gu, '');   // variation selectors
  cleaned = cleaned.replace(/[\u{1F900}-\u{1F9FF}]/gu, ''); // supplemental symbols
  cleaned = cleaned.replace(/[\u{200D}]/gu, '');             // zero width joiner
  cleaned = cleaned.replace(/[\u{20E3}]/gu, '');             // combining enclosing keycap
  cleaned = cleaned.replace(/[\u{E0020}-\u{E007F}]/gu, ''); // tags

  // Clean up any double spaces left by emoji removal
  cleaned = cleaned.replace(/  +/g, ' ').trim();

  return cleaned;
}

export interface GenerateOptions {
  type?: PostType;
  source?: string; // slug of a specific portfolio page or project
  customContext?: string; // replaces source data entirely (e.g., scraped content)
  extraContext?: string; // additional angle/framing added alongside source data
}

export interface GeneratedPost {
  content: string;
  type: PostType;
  sourceSlug: string;
  sourceTitle: string;
  sourceType: 'portfolio' | 'project' | 'custom';
}

// Pick a source, weighted toward least-used ones
async function pickSource(
  preferredType?: 'portfolio' | 'project'
): Promise<{ data: string; slug: string; title: string; type: 'portfolio' | 'project' }> {
  const [pages, projects] = await Promise.all([getPortfolioPages(), getProjects()]);
  const history = await getHistory();
  const usageCount = history.sourceUsageCount || {};

  type SourceOption = {
    slug: string;
    title: string;
    type: 'portfolio' | 'project';
    data: string;
    usage: number;
  };

  const options: SourceOption[] = [];

  if (!preferredType || preferredType === 'portfolio') {
    for (const page of pages) {
      options.push({
        slug: page.slug,
        title: page.title,
        type: 'portfolio',
        data: summarizePortfolioPage(page),
        usage: usageCount[page.slug] || 0,
      });
    }
  }

  if (!preferredType || preferredType === 'project') {
    for (const proj of projects) {
      options.push({
        slug: proj.slug,
        title: proj.title,
        type: 'project',
        data: summarizeProject(proj),
        usage: usageCount[proj.slug] || 0,
      });
    }
  }

  if (options.length === 0) {
    throw new Error('No content sources available');
  }

  // Sort by least used, then pick randomly from the bottom 5
  options.sort((a, b) => a.usage - b.usage);
  const candidates = options.slice(0, Math.min(5, options.length));
  const pick = candidates[Math.floor(Math.random() * candidates.length)];

  return { data: pick.data, slug: pick.slug, title: pick.title, type: pick.type };
}

export async function generatePost(options: GenerateOptions = {}): Promise<GeneratedPost> {
  const type = options.type || (await import('./templates.js')).getRandomPostType();
  const template = getTemplate(type);

  let sourceData: string;
  let sourceSlug: string;
  let sourceTitle: string;
  let sourceType: 'portfolio' | 'project' | 'custom';

  if (options.customContext) {
    sourceData = options.customContext;
    sourceSlug = 'custom';
    sourceTitle = 'Custom Content';
    sourceType = 'custom';
  } else if (options.source) {
    // Try portfolio page first, then project
    const page = await getPortfolioPage(options.source);
    if (page) {
      sourceData = summarizePortfolioPage(page);
      sourceSlug = page.slug;
      sourceTitle = page.title;
      sourceType = 'portfolio';
    } else {
      const proj = await getProject(options.source);
      if (proj) {
        sourceData = summarizeProject(proj);
        sourceSlug = proj.slug;
        sourceTitle = proj.title;
        sourceType = 'project';
      } else {
        throw new Error(`Source "${options.source}" not found. Run "jesse-linkedin sources" to see available options.`);
      }
    }
  } else {
    const picked = await pickSource(
      template.bestSources.length === 1 ? template.bestSources[0] : undefined
    );
    sourceData = picked.data;
    sourceSlug = picked.slug;
    sourceTitle = picked.title;
    sourceType = picked.type;
  }

  const extraContextBlock = options.extraContext
    ? `\nADDITIONAL CONTEXT FROM THE AUTHOR (use this to guide the angle and framing):\n${options.extraContext}\n`
    : '';

  const userPrompt = `POST TYPE: ${template.label}

${template.promptInstructions}

SOURCE DATA TO WORK WITH:
${sourceData}
${extraContextBlock}
Write the LinkedIn post now. Return ONLY the post text. No preamble, no "here's your post", just the post itself.`;

  const anthropic = getClient();

  let content = '';
  const MAX_RETRIES = 3;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const retryContext = attempt > 0
      ? `\n\nPREVIOUS ATTEMPT HAD THESE VIOLATIONS - FIX THEM:\n${content}\n`
      : '';

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt + retryContext,
        },
      ],
    });

    const block = response.content[0];
    if (block.type !== 'text') {
      throw new Error('Unexpected response type from Claude API');
    }

    content = cleanOutput(block.text.trim());

    const validation = validate(content);
    if (validation.isClean) {
      return { content, type, sourceSlug, sourceTitle, sourceType };
    }

    // On retry, include the violations in the next attempt
    const violations = formatViolations(validation);
    content = violations;
  }

  // After max retries, return what we have with a warning
  return { content: content, type, sourceSlug, sourceTitle, sourceType };
}
