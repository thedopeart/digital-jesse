/**
 * Affiliate opportunity analysis.
 * Scans page content for brand mentions, cross-references against
 * the affiliate programs database, and scores opportunities.
 */

import type { PageData } from './text-analysis';

export interface AffiliateProgram {
  brand: string;
  variations: string[];
  program: string;
  commission: string;
  type: 'flat' | 'percentage' | 'recurring' | 'none';
  network: string;
  signupUrl: string;
  category: string;
  description?: string;
}

export interface BrandMention {
  brand: string;
  page: string;
  pageTitle: string;
  context: string;
  isLinked: boolean;
  linkUrl: string | null;
}

export interface AffiliateOpportunity {
  brand: string;
  program: AffiliateProgram;
  totalMentions: number;
  unlinkedMentions: number;
  linkedMentions: number;
  pages: {
    url: string;
    title: string;
    mentions: number;
    unlinked: number;
    contexts: string[];
  }[];
  hasAffiliateProgram: boolean;
  score: number;
}

export interface SuggestedProgram {
  program: AffiliateProgram;
  reason: string;
  nicheMatch: string;
}

export interface AffiliateReport {
  domain: string;
  pagesAnalyzed: number;
  totalBrandsFound: number;
  detectedNiches: string[];
  opportunities: AffiliateOpportunity[];
  alreadyLinked: AffiliateOpportunity[];
  outreachOpportunities: AffiliateOpportunity[];
  quickWins: AffiliateOpportunity[];
  suggestedPrograms: SuggestedProgram[];
}

// -------------------------------------------------------------------
// Common-word brand filter
// -------------------------------------------------------------------
// Brands whose primary variation is a common English word.
// These need stricter matching to avoid false positives like
// "make a reservation" matching the automation tool "Make".
const COMMON_WORD_BRANDS: Set<string> = new Set([
  'make', 'ghost', 'later', 'close', 'drip', 'buffer', 'stripe',
  'wave', 'notion', 'surfer', 'otter', 'copper', 'loom', 'slack',
  'sketch', 'paddle', 'render', 'hover', 'anchor', 'maze',
  'spring', 'rover', 'bark', 'ring', 'nest', 'flow', 'spark',
  'tray', 'miro', 'instantly', 'jasper', 'scale', 'circle',
  'going', 'booking', 'kayak', 'factor', 'calm',
  'brilliant', 'hinge', 'remote', 'fiber', 'rise',
  'harvest', 'pipe', 'bench', 'sage', 'orbit',
  'durable', 'impact', 'majestic', 'away', 'purple',
  'canvas', 'abstract', 'bold', 'frame',
  'crisp', 'ritual', 'article', 'square', 'treehouse', 'riverside',
  'tidal', 'primer', 'grove', 'ferry', 'relay',
  'plum', 'scout', 'ember', 'flare', 'atlas',
]);

// Context clues that suggest a word is being used as a brand/tool name
// rather than as a common English word. These must be specific enough
// to avoid false matches on non-tech sites. Generic words like "plan",
// "review", "premium", "tool", "app", "platform" are excluded because
// they appear naturally on all kinds of sites.
const TECH_CONTEXT_WORDS = [
  'software', 'integration', 'plugin',
  'api', 'automat', 'workflow', 'dashboard', 'saas',
  'signup page', 'sign up for',
  'enterprise plan', 'pro plan', 'starter plan',
  'alternative to', 'versus', 'compared to',
  'crm', 'cms', 'seo tool', 'email marketing tool',
  'zapier', 'integromat', 'webhook', 'no-code',
  'affiliate', 'martech',
];

/**
 * Check if a common-word match is actually referring to the brand
 * rather than the English word.
 *
 * For single common words (make, ghost, later, etc.) we require strong
 * evidence: mid-sentence capitalization combined with tech context,
 * or a domain-style match. A single signal alone is not enough because
 * capitalized words appear in headings/titles, and generic context
 * words appear on all types of sites.
 */
function isLikelyBrandMention(
  fullText: string,
  position: number,
  matchLength: number,
  variation: string
): boolean {
  // Domain-style variations (make.com, ghost.org) are always valid
  if (variation.includes('.')) return true;
  // Multi-word variations (e.g. "ghost cms") are always valid
  if (variation.includes(' ')) return true;

  // Gather signals. We require at least 2 for confidence.
  let signals = 0;

  // Signal 1: Mid-sentence capitalization (proper noun usage)
  const originalWord = fullText.slice(position, position + matchLength);
  const isCapitalized = originalWord.length > 0
    && originalWord[0] === originalWord[0].toUpperCase()
    && originalWord[0] !== originalWord[0].toLowerCase();

  if (isCapitalized) {
    // Verify it's not start-of-sentence, start-of-heading, or start-of-text
    if (position > 2) {
      const before = fullText.slice(Math.max(0, position - 3), position);
      const isAfterSentenceEnd = /[.!?\n]\s*$/.test(before);
      if (!isAfterSentenceEnd) {
        signals++;
      }
    }
    // Position 0-2 = start of text, capitalization is grammatical
  }

  // Signal 2: Tech/SaaS context within 80 chars
  const contextRadius = 80;
  const start = Math.max(0, position - contextRadius);
  const end = Math.min(fullText.length, position + matchLength + contextRadius);
  const surroundingText = fullText.slice(start, end).toLowerCase();

  for (const signal of TECH_CONTEXT_WORDS) {
    if (surroundingText.includes(signal)) {
      signals++;
      break;
    }
  }

  // Signal 3: Brand's domain appears anywhere on the page (strong corroboration)
  // e.g. if page mentions "make.com" anywhere, then "Make" is likely the brand
  const domainVariations = ['.com', '.io', '.org', '.ai', '.co', '.app'];
  const lowerVariation = variation.toLowerCase();
  const lowerFullText = fullText.toLowerCase();
  for (const ext of domainVariations) {
    if (lowerFullText.includes(lowerVariation + ext)) {
      signals++;
      break;
    }
  }

  // Require at least 2 signals for common-word brands
  return signals >= 2;
}

// -------------------------------------------------------------------
// Niche detection
// -------------------------------------------------------------------
// Keywords that signal what a website is about, grouped by niche
const NICHE_SIGNALS: Record<string, string[]> = {
  'dating': [
    'date', 'dating', 'relationship', 'romance', 'romantic', 'couple',
    'partner', 'love', 'singles', 'first date', 'date night',
    'date idea', 'boyfriend', 'girlfriend', 'anniversary', 'valentine',
    'flirt', 'attraction', 'compatibility', 'love language',
    'together', 'surprise', 'intimate', 'honeymoon', 'engagement',
    'wedding', 'proposal', 'soulmate', 'crush',
  ],
  'travel': [
    'travel', 'hotel', 'flight', 'booking', 'vacation', 'trip', 'resort',
    'destination', 'airbnb', 'hostel', 'airline', 'cruise', 'tourism',
    'itinerary', 'passport', 'luggage', 'backpack',
  ],
  'food': [
    'recipe', 'cooking', 'restaurant', 'food', 'meal', 'kitchen',
    'ingredient', 'dinner', 'lunch', 'breakfast', 'chef', 'baking',
    'cuisine', 'dish', 'menu', 'grocery', 'nutrition',
    'wine', 'cocktail', 'brunch', 'cafe', 'coffee',
  ],
  'fitness': [
    'workout', 'exercise', 'fitness', 'gym', 'muscle', 'weight loss',
    'training', 'cardio', 'protein', 'supplement', 'yoga', 'running',
    'marathon', 'crossfit', 'strength',
  ],
  'tech': [
    'software', 'saas', 'developer', 'api', 'code', 'programming',
    'startup', 'tech', 'app', 'web development', 'framework', 'deploy',
    'hosting', 'server', 'database', 'devops', 'cloud',
  ],
  'ecommerce': [
    'ecommerce', 'e-commerce', 'online store', 'shopify', 'product',
    'shopping', 'cart', 'checkout', 'payment', 'shipping', 'inventory',
    'retail', 'dropshipping', 'wholesale', 'marketplace',
  ],
  'marketing': [
    'seo', 'marketing', 'content marketing', 'email marketing', 'social media',
    'advertising', 'ppc', 'conversion', 'funnel', 'lead generation',
    'campaign', 'brand', 'audience', 'analytics', 'traffic',
  ],
  'finance': [
    'invest', 'stock', 'crypto', 'bitcoin', 'trading', 'portfolio',
    'savings', 'budget', 'credit', 'loan', 'mortgage', 'insurance',
    'banking', 'fintech', 'retirement', 'wealth',
  ],
  'education': [
    'course', 'learn', 'tutorial', 'class', 'student', 'teacher',
    'education', 'certification', 'training', 'school', 'university',
    'lesson', 'skill', 'online course', 'bootcamp',
  ],
  'entertainment': [
    'movie', 'film', 'music', 'concert', 'show', 'theater', 'theatre',
    'streaming', 'gaming', 'game', 'event', 'ticket', 'performance',
    'comedy', 'entertainment', 'fun', 'activity', 'experience',
    'museum', 'gallery', 'spa', 'adventure', 'escape room',
    'bowling', 'karaoke', 'arcade', 'amusement',
  ],
  'health': [
    'health', 'wellness', 'medical', 'doctor', 'therapy', 'mental health',
    'supplement', 'vitamin', 'skincare', 'beauty', 'self-care',
    'meditation', 'mindfulness', 'sleep', 'diet',
  ],
  'home': [
    'home', 'interior', 'furniture', 'decor', 'renovation', 'garden',
    'kitchen', 'bedroom', 'bathroom', 'cleaning', 'organize',
    'real estate', 'property', 'apartment', 'house',
  ],
  'fashion': [
    'fashion', 'clothing', 'style', 'outfit', 'shoes', 'accessories',
    'designer', 'trend', 'wardrobe', 'wear', 'boutique', 'apparel',
  ],
  'pet': [
    'pet', 'dog', 'cat', 'puppy', 'kitten', 'veterinary', 'pet food',
    'animal', 'breed', 'adoption', 'grooming', 'pet care',
  ],
  'art': [
    'art', 'artist', 'painting', 'canvas', 'gallery', 'museum',
    'artwork', 'wall art', 'print', 'poster', 'frame', 'framing',
    'oil painting', 'watercolor', 'acrylic', 'abstract art',
    'portrait', 'landscape', 'sculpture', 'illustration',
    'masterpiece', 'collection', 'exhibition', 'fine art',
    'contemporary art', 'modern art', 'renaissance', 'baroque',
    'impressionism', 'art deco', 'decor', 'wall decor',
    'home decor', 'interior design', 'limited edition',
  ],
};

// Which affiliate categories are relevant to each niche
const NICHE_CATEGORY_RELEVANCE: Record<string, string[]> = {
  'dating': [
    'dating', 'entertainment', 'food', 'travel', 'gifts',
    'courses', 'education', 'health', 'fashion',
  ],
  'travel': [
    'travel', 'insurance', 'photography', 'finance-personal',
    'health', 'sustainability', 'entertainment',
  ],
  'food': [
    'food', 'health', 'ecommerce', 'courses', 'sustainability',
    'home', 'gifts',
  ],
  'fitness': [
    'health', 'food', 'courses', 'ecommerce', 'education',
  ],
  'tech': [
    'hosting', 'developer', 'ai', 'design', 'seo', 'security',
    'automation', 'project-management', 'communication', 'analytics',
    'ecommerce', 'email', 'crm', 'website-builder', 'video',
    'wordpress', 'stock-media', 'courses',
  ],
  'ecommerce': [
    'ecommerce', 'email', 'seo', 'design', 'hosting', 'automation',
    'crm', 'social', 'analytics', 'finance', 'print-on-demand',
    'marketplace', 'affiliate-network', 'advertising', 'wordpress',
    'website-builder',
  ],
  'marketing': [
    'seo', 'email', 'social', 'analytics', 'automation', 'crm',
    'design', 'video', 'ai', 'advertising', 'stock-media',
    'website-builder', 'hosting', 'affiliate-network', 'courses',
  ],
  'finance': [
    'finance', 'finance-personal', 'insurance', 'education', 'courses',
    'security',
  ],
  'education': [
    'courses', 'education', 'ai', 'developer', 'design', 'video',
    'hosting', 'ecommerce',
  ],
  'entertainment': [
    'entertainment', 'music', 'video', 'gaming', 'travel', 'fashion',
    'photography', 'creator', 'social', 'stock-media', 'food', 'gifts',
  ],
  'health': [
    'health', 'food', 'courses', 'education', 'sustainability',
  ],
  'home': [
    'home', 'ecommerce', 'sustainability', 'real-estate', 'insurance',
    'finance-personal', 'photography',
  ],
  'fashion': [
    'fashion', 'ecommerce', 'photography', 'social', 'creator',
    'print-on-demand', 'design',
  ],
  'pet': [
    'pet', 'health', 'ecommerce', 'insurance',
  ],
  'art': [
    'art', 'print-on-demand', 'design', 'ecommerce',
    'photography', 'stock-media', 'courses', 'home',
  ],
};

// Generic tech/SaaS categories are always at least partially relevant
const UNIVERSAL_CATEGORIES = new Set([
  'website-builder', 'hosting', 'email', 'seo', 'analytics',
  'social', 'design', 'video', 'ai', 'automation',
]);

/**
 * Detect the primary niche(s) of a site from its page content.
 * Returns scored niches sorted by strength.
 */
function detectNiche(pages: PageData[]): { niche: string; score: number }[] {
  // Pool all text from every page
  const allText = pages
    .map(p => [p.title, p.h1, ...p.headings, p.metaDescription, p.bodyText].join(' '))
    .join(' ')
    .toLowerCase();

  const scores: Record<string, number> = {};

  for (const [niche, signals] of Object.entries(NICHE_SIGNALS)) {
    let count = 0;
    for (const signal of signals) {
      const escaped = signal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      const matches = allText.match(regex);
      if (matches) count += matches.length;
    }
    if (count > 0) {
      scores[niche] = count;
    }
  }

  return Object.entries(scores)
    .map(([niche, score]) => ({ niche, score }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Get a relevance multiplier for an affiliate category based on site niche.
 * Returns 1.0 for relevant categories, lower values for less relevant ones.
 */
function getNicheRelevance(
  category: string,
  detectedNiches: { niche: string; score: number }[]
): number {
  // No strong niche detected = don't penalize anything
  if (detectedNiches.length === 0) return 1.0;

  const topNiche = detectedNiches[0];
  // Weak signal = don't over-penalize
  if (topNiche.score < 5) return 1.0;

  // Check top 2 niches for relevance
  const topNicheNames = detectedNiches.slice(0, 2).map(n => n.niche);

  for (const niche of topNicheNames) {
    const relevantCategories = NICHE_CATEGORY_RELEVANCE[niche];
    if (relevantCategories && relevantCategories.includes(category)) {
      return 1.0; // Fully relevant
    }
  }

  // Universal tech categories get a mild pass
  if (UNIVERSAL_CATEGORIES.has(category)) return 0.6;

  // Not relevant to the site's niche
  return 0.2;
}


// -------------------------------------------------------------------
// Core matching and scoring
// -------------------------------------------------------------------

/**
 * Extract surrounding context for a brand mention.
 * Returns ~120 chars of text around the match position.
 */
function extractContext(text: string, position: number, matchLength: number): string {
  const padding = 60;
  const start = Math.max(0, position - padding);
  const end = Math.min(text.length, position + matchLength + padding);

  let snippet = text.slice(start, end).trim();

  // Clean up whitespace
  snippet = snippet.replace(/\s+/g, ' ');

  // Add ellipsis if truncated
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}

/**
 * Check if a mention at a given position in the raw HTML is wrapped in an <a> tag.
 * We look backward from the position for an unclosed <a and forward for </a>.
 */
function checkIfLinked(
  bodyText: string,
  position: number,
  internalLinks: string[],
  brandVariations: string[]
): { isLinked: boolean; linkUrl: string | null } {
  // Simple approach: check if any internal link URL contains the brand name
  const lowerVariations = brandVariations.map(v => v.toLowerCase());

  for (const link of internalLinks) {
    const lowerLink = link.toLowerCase();
    for (const variation of lowerVariations) {
      if (lowerLink.includes(variation.replace(/\s+/g, '').toLowerCase()) ||
          lowerLink.includes(variation.replace(/\s+/g, '-').toLowerCase())) {
        return { isLinked: true, linkUrl: link };
      }
    }
  }

  return { isLinked: false, linkUrl: null };
}

/**
 * Find all brand mentions across a set of crawled pages.
 * Filters out false positives for common-word brands.
 */
export function findBrandMentions(
  pages: PageData[],
  programs: AffiliateProgram[]
): Map<string, BrandMention[]> {
  const mentions = new Map<string, BrandMention[]>();

  for (const page of pages) {
    // Combine title, headings, and body for searching
    const fullText = [page.title, ...page.headings, page.bodyText].join(' ');
    const lowerText = fullText.toLowerCase();

    for (const program of programs) {
      for (const variation of program.variations) {
        // Build word-boundary-aware regex
        const escaped = variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
        const matches = [...lowerText.matchAll(regex)];

        if (matches.length === 0) continue;

        // Check if this variation is a common English word that needs stricter matching
        const isCommonWord = COMMON_WORD_BRANDS.has(variation.toLowerCase());

        if (!mentions.has(program.brand)) {
          mentions.set(program.brand, []);
        }

        const countBefore = mentions.get(program.brand)!.length;

        for (const match of matches) {
          const position = match.index!;

          // For common-word brands, filter out generic English usage
          if (isCommonWord && !isLikelyBrandMention(fullText, position, variation.length, variation)) {
            continue;
          }

          const context = extractContext(fullText, position, variation.length);
          const { isLinked, linkUrl } = checkIfLinked(
            fullText,
            position,
            page.internalLinks,
            program.variations
          );

          mentions.get(program.brand)!.push({
            brand: program.brand,
            page: page.url,
            pageTitle: page.title,
            context,
            isLinked,
            linkUrl,
          });
        }

        // Only break if this variation actually produced valid mentions.
        // If a common-word variation (e.g. "make") had all matches filtered,
        // continue to try more specific variations (e.g. "make.com", "integromat").
        if (mentions.get(program.brand)!.length > countBefore) {
          break;
        }
      }
    }
  }

  // Clean up: remove brands that ended up with zero mentions after filtering
  for (const [brand, brandMentions] of mentions) {
    if (brandMentions.length === 0) {
      mentions.delete(brand);
    }
  }

  return mentions;
}

/**
 * Score an affiliate opportunity.
 * Higher score = more mentions x better commission potential x niche relevance.
 */
function scoreOpportunity(
  unlinkedMentions: number,
  totalMentions: number,
  program: AffiliateProgram,
  pageCount: number,
  nicheRelevance: number
): number {
  let base = unlinkedMentions * 10;

  // Bonus for spread across multiple pages
  base += pageCount * 5;

  // Commission type multiplier
  if (program.type === 'recurring') base *= 2;
  else if (program.type === 'flat') base *= 1.5;
  else if (program.type === 'percentage') base *= 1.3;

  // No affiliate program = low score (outreach only)
  if (program.type === 'none') base = totalMentions * 2;

  // Apply niche relevance (1.0 = fully relevant, 0.2 = not relevant)
  base *= nicheRelevance;

  return Math.round(base);
}

// Readable labels for each niche
const NICHE_LABELS: Record<string, string> = {
  dating: 'Dating & Relationships',
  travel: 'Travel',
  food: 'Food & Dining',
  fitness: 'Fitness',
  tech: 'Tech & Software',
  ecommerce: 'E-Commerce',
  marketing: 'Marketing',
  finance: 'Finance',
  education: 'Education',
  entertainment: 'Entertainment',
  health: 'Health & Wellness',
  home: 'Home & Living',
  fashion: 'Fashion & Beauty',
  pet: 'Pets',
  art: 'Art & Home Decor',
};

// Content angle suggestions per category (why this program fits the niche)
const CATEGORY_CONTENT_ANGLES: Record<string, Record<string, string>> = {
  dating: {
    travel: 'Write about romantic getaways, weekend trips, and destination date ideas',
    food: 'Feature meal kit reviews, cooking-together dates, restaurant booking guides',
    entertainment: 'Cover movie night picks, concert dates, event ticket deals, escape rooms',
    education: 'Highlight couples classes, learn-together experiences, language learning for travel dates',
    courses: 'Review cooking classes, art workshops, and skill-building date ideas',
    health: 'Write about spa days, wellness retreats, couples meditation, and self-care date prep',
    fashion: 'Cover date night outfit guides, grooming tips, and gift ideas',
    photography: 'Suggest couples photoshoot ideas and camera gear for capturing memories',
    music: 'Feature playlist guides, concert date ideas, and music experience gifts',
    gifts: 'Write gift guides for anniversaries, valentines, and surprise date additions',
    dating: 'Review dating apps, compare features, and write about online dating tips',
    home: 'Cover at-home date night setups, home decor for romantic ambiance',
    gaming: 'Feature couples gaming nights, board game date ideas, arcade dates',
  },
  travel: {
    travel: 'Review destinations, booking platforms, and travel gear',
    insurance: 'Compare travel insurance options for different trip types',
    photography: 'Review travel cameras, editing tools, and photo storage',
    entertainment: 'Cover local experiences, tours, and event booking at destinations',
  },
  food: {
    food: 'Review meal kits, kitchen gear, and cooking ingredients',
    health: 'Cover nutrition tools, healthy eating guides, and wellness products',
    home: 'Feature kitchen equipment, dining setups, and entertaining guides',
    gifts: 'Write about food gift baskets, wine clubs, and kitchen gift guides',
  },
  tech: {
    hosting: 'Compare hosting providers and write setup tutorials',
    developer: 'Review dev tools and write integration guides',
    ai: 'Cover AI tools, compare features, and write use-case guides',
    design: 'Review design tools and create comparison content',
    seo: 'Write SEO tool reviews and strategy guides',
    automation: 'Compare automation platforms and write workflow tutorials',
    email: 'Review email marketing platforms and write growth guides',
  },
  ecommerce: {
    ecommerce: 'Review e-commerce platforms and write setup guides',
    email: 'Compare email marketing tools for online stores',
    seo: 'Write SEO guides specific to e-commerce',
    analytics: 'Review analytics tools for tracking store performance',
  },
  marketing: {
    seo: 'Write SEO tool comparisons and strategy guides',
    email: 'Review email platforms and write list-building content',
    social: 'Compare social media management tools',
    analytics: 'Review analytics and reporting platforms',
    advertising: 'Cover ad platforms and campaign optimization guides',
  },
  finance: {
    finance: 'Review financial tools and investment platforms',
    'finance-personal': 'Write budgeting guides and financial planning content',
    insurance: 'Compare insurance providers for different life stages',
  },
  entertainment: {
    entertainment: 'Review streaming services, event platforms, and activity booking tools',
    music: 'Cover music production tools, streaming platforms, and concert gear',
    gaming: 'Review gaming equipment, subscription services, and platforms',
    travel: 'Write about travel experiences, tours, and adventure booking',
    food: 'Feature food delivery and dining experience platforms',
    gifts: 'Write gift guides for entertainment lovers',
  },
  health: {
    health: 'Review wellness apps, supplements, and fitness trackers',
    food: 'Cover nutrition, meal planning, and healthy cooking tools',
    courses: 'Write about health certifications and wellness education',
  },
  fashion: {
    fashion: 'Review fashion brands, styling tools, and subscription boxes',
    photography: 'Cover fashion photography tools and editing software',
    social: 'Review social media tools for fashion creators',
  },
  home: {
    home: 'Review home products, furniture, and decor brands',
    'real-estate': 'Write about property tools and home buying resources',
    sustainability: 'Cover eco-friendly home products and sustainable living',
  },
  pet: {
    pet: 'Review pet food brands, supplies, and services',
    health: 'Cover pet wellness products and veterinary resources',
    insurance: 'Compare pet insurance providers',
  },
  art: {
    art: 'Review art marketplaces, print services, and framing options',
    home: 'Write about home decor trends, wall art styling guides, and interior design',
    ecommerce: 'Cover art selling platforms, e-commerce tools for artists and galleries',
    'print-on-demand': 'Review print-on-demand services for artists and art sellers',
    design: 'Feature design tools for creating art, mockups, and presentations',
    photography: 'Cover photography tools for capturing and selling artwork',
    'stock-media': 'Review stock image and art resource platforms',
    gifts: 'Write gift guides featuring art prints, custom artwork, and home decor',
    courses: 'Feature art courses, workshops, and creative skill-building platforms',
    education: 'Review art history courses, technique tutorials, and learning platforms',
  },
};

/**
 * Build suggested programs based on detected site niche.
 * Picks the best programs from categories relevant to the niche,
 * excluding any brands already found in the scan.
 */
function buildSuggestedPrograms(
  programs: AffiliateProgram[],
  detectedNiches: { niche: string; score: number }[],
  foundBrands: Set<string>
): SuggestedProgram[] {
  if (detectedNiches.length === 0 || detectedNiches[0].score < 3) return [];

  const topNiche = detectedNiches[0].niche;
  const relevantCategories = NICHE_CATEGORY_RELEVANCE[topNiche];
  if (!relevantCategories) return [];

  const nicheLabel = NICHE_LABELS[topNiche] || topNiche;
  const contentAngles = CATEGORY_CONTENT_ANGLES[topNiche] || {};

  // Collect programs from relevant categories, excluding already-found brands
  const candidates: { program: AffiliateProgram; reason: string }[] = [];

  for (const program of programs) {
    // Skip brands already mentioned on the site
    if (foundBrands.has(program.brand)) continue;
    // Only suggest programs that actually have an affiliate program
    if (program.type === 'none') continue;
    // Only suggest from niche-relevant categories
    if (!relevantCategories.includes(program.category)) continue;

    const angle = contentAngles[program.category]
      || `Relevant to ${nicheLabel.toLowerCase()} content`;

    candidates.push({ program, reason: angle });
  }

  // Sort candidates by category relevance order.
  // The relevantCategories array is ordered by importance:
  // index 0 is the most relevant category for the niche.
  const categoryRank = new Map<string, number>();
  for (let i = 0; i < relevantCategories.length; i++) {
    categoryRank.set(relevantCategories[i], i);
  }

  candidates.sort((a, b) => {
    const rankA = categoryRank.get(a.program.category) ?? 999;
    const rankB = categoryRank.get(b.program.category) ?? 999;
    return rankA - rankB;
  });

  // Limit per category so one category doesn't dominate
  const maxPerCategory = 5;
  const maxTotal = 40;
  const categoryCounts = new Map<string, number>();
  const selected: typeof candidates = [];

  for (const c of candidates) {
    if (selected.length >= maxTotal) break;
    const count = categoryCounts.get(c.program.category) || 0;
    if (count >= maxPerCategory) continue;
    selected.push(c);
    categoryCounts.set(c.program.category, count + 1);
  }

  return selected.map(c => ({
    program: c.program,
    reason: c.reason,
    nicheMatch: nicheLabel,
  }));
}

/**
 * Build the full affiliate opportunity report.
 */
export function buildAffiliateReport(
  pages: PageData[],
  programs: AffiliateProgram[],
  domain: string
): AffiliateReport {
  const mentions = findBrandMentions(pages, programs);

  // Detect site niche for relevance scoring
  const detectedNiches = detectNiche(pages);

  const opportunities: AffiliateOpportunity[] = [];

  // Build a map from brand -> program
  const programMap = new Map<string, AffiliateProgram>();
  for (const p of programs) {
    programMap.set(p.brand, p);
  }

  for (const [brand, brandMentions] of mentions) {
    const program = programMap.get(brand);
    if (!program) continue;

    // Get niche relevance for this program's category
    const nicheRelevance = getNicheRelevance(program.category, detectedNiches);

    // Group mentions by page
    const pageMap = new Map<string, {
      url: string;
      title: string;
      mentions: number;
      unlinked: number;
      contexts: string[];
    }>();

    let totalUnlinked = 0;
    let totalLinked = 0;

    for (const mention of brandMentions) {
      if (!pageMap.has(mention.page)) {
        pageMap.set(mention.page, {
          url: mention.page,
          title: mention.pageTitle,
          mentions: 0,
          unlinked: 0,
          contexts: [],
        });
      }

      const entry = pageMap.get(mention.page)!;
      entry.mentions++;

      if (mention.isLinked) {
        totalLinked++;
      } else {
        totalUnlinked++;
        entry.unlinked++;
        // Keep up to 3 context snippets per page
        if (entry.contexts.length < 3) {
          entry.contexts.push(mention.context);
        }
      }
    }

    const pageEntries = [...pageMap.values()].sort((a, b) => b.mentions - a.mentions);
    const hasAffiliateProgram = program.type !== 'none';

    const score = scoreOpportunity(
      totalUnlinked,
      brandMentions.length,
      program,
      pageEntries.length,
      nicheRelevance
    );

    opportunities.push({
      brand,
      program,
      totalMentions: brandMentions.length,
      unlinkedMentions: totalUnlinked,
      linkedMentions: totalLinked,
      pages: pageEntries,
      hasAffiliateProgram,
      score,
    });
  }

  // Sort by score
  opportunities.sort((a, b) => b.score - a.score);

  // Categorize
  const highValue = opportunities.filter(o => o.hasAffiliateProgram && o.unlinkedMentions > 0);
  const alreadyLinked = opportunities.filter(o => o.hasAffiliateProgram && o.unlinkedMentions === 0 && o.linkedMentions > 0);
  const outreach = opportunities.filter(o => !o.hasAffiliateProgram && o.totalMentions > 0);

  // Quick wins: top 5 high-value unlinked with most mentions
  const quickWins = highValue.slice(0, 5);

  // Build set of all found brands for exclusion from suggestions
  const foundBrands = new Set<string>();
  for (const o of opportunities) foundBrands.add(o.brand);

  // Generate niche-based suggestions
  const suggestedPrograms = buildSuggestedPrograms(
    programs,
    detectedNiches,
    foundBrands
  );

  return {
    domain,
    pagesAnalyzed: pages.length,
    totalBrandsFound: opportunities.length,
    detectedNiches: detectedNiches.slice(0, 3).map(n => n.niche),
    opportunities: highValue,
    alreadyLinked,
    outreachOpportunities: outreach,
    quickWins,
    suggestedPrograms,
  };
}
