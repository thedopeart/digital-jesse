export type PostType =
  | 'metric-showcase'
  | 'before-after'
  | 'tool-announcement'
  | 'practical-tip'
  | 'new-content'
  | 'weekly-recap'
  | 'industry-take';

export interface PostTemplate {
  type: PostType;
  label: string;
  description: string;
  promptInstructions: string;
  bestSources: ('portfolio' | 'project')[];
}

// Every template now requires a link or concrete value-add (free resource, actionable framework, tool link, etc.)
const LINK_RULE = `
CRITICAL: Every post MUST include at least one of these value-adds:
- A direct link to a live project, tool, or page (use the URL from the source data if available)
- A specific, actionable framework or checklist the reader can steal and use today
- A free resource, template, or approach described in enough detail to be immediately useful
The reader should walk away with something concrete, not just a story.`;

export const POST_TEMPLATES: Record<PostType, PostTemplate> = {
  'metric-showcase': {
    type: 'metric-showcase',
    label: 'Metric Showcase',
    description: 'Highlight a specific metric with the playbook behind it',
    bestSources: ['portfolio', 'project'],
    promptInstructions: `Write a LinkedIn post that showcases a specific metric or achievement AND gives the reader something useful.

Structure:
1. HOOK: Open with the specific number or result (one punchy sentence)
2. CONTEXT: 2-3 sentences explaining the starting point and what changed
3. THE PLAYBOOK: 3-4 bullet points of specific actions taken. Be detailed enough that someone could follow these steps.
4. LINK OR RESOURCE: Include a link to the project/tool if a URL exists in the source data, OR describe a mini-framework the reader can apply
5. HASHTAGS: 3-5 relevant hashtags

The hook should stop scrollers. Lead with the most impressive number.
${LINK_RULE}
Keep it under 1,300 characters total.`,
  },

  'before-after': {
    type: 'before-after',
    label: 'Before/After Story',
    description: 'Challenge-to-results narrative with a takeaway others can use',
    bestSources: ['project', 'portfolio'],
    promptInstructions: `Write a LinkedIn post that tells a before/after story with a reusable lesson.

Structure:
1. HOOK: Start with the "after" state (the impressive result)
2. THE BEFORE: Paint the picture of where things started (be specific with numbers)
3. THE SHIFT: What specific approach did I take? (2-3 sentences, be concrete)
4. THE AFTER: Results with numbers
5. STEAL THIS: A 2-3 step mini-framework the reader can apply to their own work. Frame it as "here's how you can do this too" or similar.
6. LINK: If a project URL exists, include it
7. HASHTAGS: 3-5 relevant hashtags

Make the contrast dramatic but honest. The "steal this" section is what makes this post worth reading.
${LINK_RULE}
Keep it under 1,300 characters total.`,
  },

  'tool-announcement': {
    type: 'tool-announcement',
    label: 'Tool/Build Announcement',
    description: 'Showcase a tool with a direct link',
    bestSources: ['project'],
    promptInstructions: `Write a LinkedIn post showcasing a tool or project I built. This MUST include a link.

Structure:
1. HOOK: What the tool does and why someone would care (one sentence)
2. WHY I BUILT IT: The problem it solves (1-2 sentences)
3. KEY FEATURES: 3-4 standout features or stats as bullet points
4. LINK: Direct URL to try it out (use the URL from source data). Frame it naturally like "check it out here:" or "try it yourself:"
5. HASHTAGS: 3-5 relevant hashtags

Focus on the "why" more than the "how." People care about problems solved.
${LINK_RULE}
Keep it under 1,300 characters total.`,
  },

  'practical-tip': {
    type: 'practical-tip',
    label: 'Practical Tip',
    description: 'Actionable technique with steps someone can follow today',
    bestSources: ['portfolio'],
    promptInstructions: `Write a LinkedIn post sharing a specific, actionable technique I've used. The reader should be able to do this themselves after reading.

Structure:
1. HOOK: The tip or insight in one sentence (make it immediately actionable)
2. CONTEXT: Where I used this (1-2 sentences, brief)
3. THE METHOD: Step-by-step instructions or a clear framework. Be specific enough that a stranger could follow along. Use numbered steps or bullet points.
4. PROOF: The specific result this produced (numbers)
5. LINK: If there's a relevant URL, include it as a reference
6. HASHTAGS: 3-5 relevant hashtags

This is the most valuable post type. The reader should think "I'm saving this." Give away real knowledge, not vague advice.
${LINK_RULE}
Keep it under 1,300 characters total.`,
  },

  'new-content': {
    type: 'new-content',
    label: 'New Content Alert',
    description: 'Announce new content with a direct link',
    bestSources: ['project'],
    promptInstructions: `Write a LinkedIn post announcing new content (blog post, feature, or tool). This MUST include a link.

Structure:
1. HOOK: What's new and why someone should care (one sentence)
2. WHAT IT IS: Brief description of what I built/wrote (2-3 sentences)
3. WHO IT'S FOR: One sentence on who benefits from this
4. LINK: Direct URL to the content. This is required.
5. HASHTAGS: 3-5 relevant hashtags

Short and punchy. This is an announcement, not an essay.
${LINK_RULE}
Keep it under 800 characters total.`,
  },

  'weekly-recap': {
    type: 'weekly-recap',
    label: 'Weekly Recap',
    description: 'Summary of recent work with links to what shipped',
    bestSources: ['project', 'portfolio'],
    promptInstructions: `Write a LinkedIn post recapping recent work across multiple projects.

Structure:
1. HOOK: One sentence framing what you've been working on
2. PROJECT UPDATES: 3-5 bullet points, each covering a different project with a specific detail and a link if available
3. ONE THING I LEARNED: A genuine insight or lesson from the week
4. HASHTAGS: 3-5 relevant hashtags

Each bullet should mention the project name, a concrete detail, and a URL where relevant.
${LINK_RULE}
Keep it under 1,000 characters total.`,
  },

  'industry-take': {
    type: 'industry-take',
    label: 'Industry Take',
    description: 'Opinion backed by data with something useful for the reader',
    bestSources: ['portfolio', 'project'],
    promptInstructions: `Write a LinkedIn post sharing an opinion on an industry trend, backed by real experience.

Structure:
1. HOOK: A bold or contrarian statement (one sentence)
2. WHY I THINK THIS: 2-3 sentences backing it up with specific experience
3. EVIDENCE: A concrete example from your work with real numbers
4. ACTIONABLE ADVICE: 2-3 sentences telling the reader what to do about this. Be specific. Don't just say "think about it." Give them steps.
5. QUESTION: Ask a question to drive engagement
6. HASHTAGS: 3-5 relevant hashtags

Be opinionated but back it up. The actionable advice section is what separates this from a hot take.
${LINK_RULE}
Keep it under 1,300 characters total.`,
  },
};

export function getTemplate(type: PostType): PostTemplate {
  return POST_TEMPLATES[type];
}

export function getAllPostTypes(): PostType[] {
  return Object.keys(POST_TEMPLATES) as PostType[];
}

export function getRandomPostType(): PostType {
  const types = getAllPostTypes();
  // Weight toward the first 4 types (more useful for regular posting)
  const weights = [3, 3, 2, 3, 1, 1, 2];
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < types.length; i++) {
    random -= weights[i];
    if (random <= 0) return types[i];
  }

  return types[0];
}
