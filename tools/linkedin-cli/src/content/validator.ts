// Banned words and phrases from writing-guidelines.md and CLAUDE.md

const BANNED_WORDS: string[] = [
  'exceptional', 'unparalleled', 'cutting-edge', 'groundbreaking',
  'revolutionary', 'transformative', 'remarkable', 'game-changing',
  'leverage', 'synergy', 'robust', 'seamless', 'holistic', 'paradigm',
  'streamline', 'optimize', 'utilize', 'comprehensive', 'vital',
  'pivotal', 'compelling', 'intriguing', 'thought-provoking',
  'incredible', 'amazing', 'captivating', 'exquisite', 'stunning',
  'unleash', 'unlock', 'empower', 'embark', 'delve', 'foster',
  'navigate', 'harness', 'elevate', 'furthermore', 'moreover',
  'additionally', 'consequently', 'thus', 'hence',
  'tapestry', 'multifaceted', 'meticulous', 'testament', 'endeavors',
  'realm', 'myriad', 'plethora', 'paramount', 'intricate', 'bespoke',
  'curated', 'passionate', 'innovative',
];

const BANNED_PHRASES: string[] = [
  "whether you're",
  "in today's world",
  "in the ever-evolving landscape",
  "in an age where",
  "passionate about",
  "it's important to note that",
  "it's important to note",
  "this means that",
  "when it comes to",
  "at its core",
  "it's worth noting",
  "i bring ideas to life",
  "i craft experiences",
  "i tell stories through design",
  "detail-oriented professional",
  "detail-oriented",
  "digital dreamweaver",
  "results-driven",
  "self-starter",
  "team player",
  "think outside the box",
  "wear many hats",
  "take your",
  "next level",
  "craft compelling",
  "in today's fast-paced",
  "in today's fast-paced world",
  "transformative growth",
  "digital dreams",
  "birthing a digital experience",
];

export interface ValidationResult {
  isClean: boolean;
  bannedWordsFound: string[];
  bannedPhrasesFound: string[];
  hasEmDash: boolean;
  charCount: number;
  isOverLimit: boolean;
}

const MAX_CHARS = 3000; // LinkedIn's max is 3000 for regular posts

export function validate(text: string): ValidationResult {
  const lower = text.toLowerCase();

  const bannedWordsFound: string[] = [];
  for (const word of BANNED_WORDS) {
    // Match whole word only (word boundaries)
    const regex = new RegExp(`\\b${word.replace(/-/g, '[-\\s]')}\\b`, 'i');
    if (regex.test(lower)) {
      bannedWordsFound.push(word);
    }
  }

  const bannedPhrasesFound: string[] = [];
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase.toLowerCase())) {
      bannedPhrasesFound.push(phrase);
    }
  }

  // Check for em dashes (— or --)
  const hasEmDash = text.includes('—') || text.includes('--');

  const charCount = text.length;
  const isOverLimit = charCount > MAX_CHARS;

  return {
    isClean: bannedWordsFound.length === 0 && bannedPhrasesFound.length === 0 && !hasEmDash && !isOverLimit,
    bannedWordsFound,
    bannedPhrasesFound,
    hasEmDash,
    charCount,
    isOverLimit,
  };
}

export function formatViolations(result: ValidationResult): string {
  const lines: string[] = [];

  if (result.bannedWordsFound.length > 0) {
    lines.push(`Banned words: ${result.bannedWordsFound.join(', ')}`);
  }
  if (result.bannedPhrasesFound.length > 0) {
    lines.push(`Banned phrases: ${result.bannedPhrasesFound.join('; ')}`);
  }
  if (result.hasEmDash) {
    lines.push('Contains em dash (use commas, periods, or colons instead)');
  }
  if (result.isOverLimit) {
    lines.push(`Over character limit: ${result.charCount}/${MAX_CHARS}`);
  }

  return lines.join('\n');
}

export function getBannedWordsForPrompt(): string {
  return BANNED_WORDS.join(', ');
}

export function getBannedPhrasesForPrompt(): string {
  return BANNED_PHRASES.join('; ');
}
