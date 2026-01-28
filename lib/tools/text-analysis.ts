/**
 * Text analysis utilities for SEO tools.
 * TF-IDF keyword extraction, stop word removal, and relevance scoring.
 */

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'it', 'its', 'this', 'that', 'was',
  'are', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does',
  'did', 'will', 'would', 'could', 'should', 'may', 'might', 'shall',
  'can', 'not', 'no', 'so', 'if', 'then', 'than', 'too', 'very', 'just',
  'about', 'above', 'after', 'again', 'all', 'also', 'am', 'any', 'as',
  'because', 'before', 'below', 'between', 'both', 'each', 'few', 'get',
  'got', 'he', 'her', 'here', 'him', 'his', 'how', 'i', 'into', 'me',
  'more', 'most', 'my', 'new', 'now', 'off', 'only', 'our', 'out', 'own',
  'over', 're', 'same', 'she', 'some', 'such', 'take', 'their', 'them',
  'there', 'these', 'they', 'through', 'under', 'up', 'use', 'used',
  'using', 'we', 'well', 'what', 'when', 'where', 'which', 'while', 'who',
  'why', 'you', 'your', 'one', 'two', 'also', 'like', 'make', 'made',
  'many', 'much', 'need', 'other', 'way', 'even', 'back', 'still', 'find',
  'here', 'thing', 'things', 'those', 'right', 'look', 'think', 'see',
  'come', 'know', 'want', 'give', 'tell', 'say', 'said', 'go', 'going',
  'went', 'let', 'put', 'set', 'keep', 'help', 'every', 'first', 'last',
  'long', 'great', 'little', 'own', 'old', 'big', 'high', 'different',
  'small', 'large', 'next', 'early', 'young', 'important', 'public',
  'good', 'best', 'right', 'sure', 'really', 'already', 'always',
  'must', 'home', 'never', 'point', 'read', 'https', 'http', 'www', 'com',
  'org', 'net', 'html', 'page', 'site', 'web', 'click', 'learn',
]);

/** Tokenize text into lowercase words, removing punctuation and stop words */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

/** Extract n-grams (phrases) of a given size from tokens */
export function ngrams(tokens: string[], n: number): string[] {
  const result: string[] = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    result.push(tokens.slice(i, i + n).join(' '));
  }
  return result;
}

/** Count term frequencies in a list of tokens */
export function termFrequency(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const token of tokens) {
    freq.set(token, (freq.get(token) || 0) + 1);
  }
  return freq;
}

/** Calculate TF-IDF scores for terms across a corpus of documents */
export function tfidf(
  documents: string[][],
  targetDocIndex: number
): Map<string, number> {
  const totalDocs = documents.length;
  const targetTokens = documents[targetDocIndex];
  const tf = termFrequency(targetTokens);
  const totalTerms = targetTokens.length || 1;

  // Document frequency: how many docs contain each term
  const df = new Map<string, number>();
  for (const doc of documents) {
    const uniqueTerms = new Set(doc);
    for (const term of uniqueTerms) {
      df.set(term, (df.get(term) || 0) + 1);
    }
  }

  const scores = new Map<string, number>();
  for (const [term, count] of tf) {
    const termDf = df.get(term) || 1;
    const idf = Math.log(totalDocs / termDf);
    scores.set(term, (count / totalTerms) * idf);
  }

  return scores;
}

/** Extract top keywords from text using TF-IDF within a corpus context */
export function extractKeywords(
  text: string,
  allTexts: string[],
  topN: number = 15
): string[] {
  const documents = allTexts.map(t => tokenize(t));
  const targetIndex = allTexts.indexOf(text);
  if (targetIndex === -1) return [];

  const scores = tfidf(documents, targetIndex);
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([term]) => term);
}

/** Extract key phrases (2-3 word combinations) that appear multiple times */
export function extractPhrases(text: string, minCount: number = 2): string[] {
  const tokens = tokenize(text);
  const bigrams = ngrams(tokens, 2);
  const trigrams = ngrams(tokens, 3);

  const phraseCount = new Map<string, number>();
  for (const phrase of [...bigrams, ...trigrams]) {
    phraseCount.set(phrase, (phraseCount.get(phrase) || 0) + 1);
  }

  return [...phraseCount.entries()]
    .filter(([, count]) => count >= minCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([phrase]) => phrase);
}

export interface PageData {
  url: string;
  title: string;
  h1: string;
  headings: string[];
  metaDescription: string;
  bodyText: string;
  internalLinks: string[];
}

export interface LinkRecommendation {
  sourceUrl: string;
  sourceTitle: string;
  targetUrl: string;
  targetTitle: string;
  suggestedAnchorText: string;
  relevanceScore: number;
  relevance: 'High' | 'Medium' | 'Low';
  reason: string;
  alreadyLinked: boolean;
}

/**
 * Score relevance between two pages based on keyword overlap.
 * Weighted by where keywords appear (title > headings > body).
 */
export function scoreRelevance(
  source: PageData,
  target: PageData,
  boilerplate: Set<string> = new Set(),
  domainStopWords: Set<string> = new Set()
): { score: number; reason: string; anchorText: string } {
  // Filter out domain stop words (words appearing on 50%+ of pages)
  const filterDSW = (tokens: string[]) =>
    domainStopWords.size > 0 ? tokens.filter(t => !domainStopWords.has(t)) : tokens;

  const sourceTitle = filterDSW(tokenize(source.title));
  const sourceHeadings = filterDSW(tokenize(source.headings.join(' ')));
  const sourceBody = filterDSW(tokenize(source.bodyText));

  const targetTitle = filterDSW(tokenize(target.title));
  const targetHeadings = filterDSW(tokenize(target.headings.join(' ')));
  const targetKeyTerms = new Set([...targetTitle, ...targetHeadings]);

  let score = 0;
  const reasons: string[] = [];

  // Title-to-title overlap (highest weight)
  const titleOverlap = sourceTitle.filter(t => targetKeyTerms.has(t));
  if (titleOverlap.length > 0) {
    score += titleOverlap.length * 5;
    reasons.push(`Titles share keywords: "${titleOverlap.slice(0, 3).join(', ')}"`);
  }

  // Source headings match target key terms
  const headingOverlap = sourceHeadings.filter(t => targetKeyTerms.has(t));
  if (headingOverlap.length > 0) {
    score += headingOverlap.length * 3;
    reasons.push(`Heading overlap on: "${headingOverlap.slice(0, 3).join(', ')}"`);
  }

  // Body keyword overlap with target's key terms
  const bodyTermFreq = termFrequency(sourceBody);
  let bodyScore = 0;
  for (const term of targetKeyTerms) {
    const count = bodyTermFreq.get(term) || 0;
    if (count > 0) bodyScore += Math.min(count, 5);
  }
  if (bodyScore > 0) {
    score += bodyScore;
    reasons.push(`Body text covers related topics`);
  }

  // Find best anchor text suggestion
  const anchorText = findAnchorText(source, target, boilerplate, domainStopWords);

  return {
    score,
    reason: reasons.slice(0, 2).join('. ') || 'General topic similarity',
    anchorText,
  };
}

/**
 * Build an index of phrases that appear across many pages (boilerplate).
 * Any phrase appearing on 40%+ of pages is considered template content.
 */
export function buildBoilerplateIndex(pages: PageData[], threshold = 0.4): Set<string> {
  const phraseCounts = new Map<string, number>();
  const totalPages = pages.length;

  for (const page of pages) {
    const tokens = tokenize(page.bodyText);
    const allPhrases = new Set([
      ...ngrams(tokens, 2),
      ...ngrams(tokens, 3),
    ]);
    // Also check headings for boilerplate
    for (const heading of page.headings) {
      allPhrases.add(heading.toLowerCase().replace(/[^a-z0-9\s'-]/g, '').trim());
    }

    for (const phrase of allPhrases) {
      phraseCounts.set(phrase, (phraseCounts.get(phrase) || 0) + 1);
    }
  }

  const boilerplate = new Set<string>();
  for (const [phrase, count] of phraseCounts) {
    if (count / totalPages >= threshold) {
      boilerplate.add(phrase);
    }
  }
  return boilerplate;
}

/**
 * Detect domain-level stop words: single words appearing on 50%+ of pages.
 * On an art store, "art", "print", "wall" appear everywhere and carry no
 * linking signal. These get excluded from relevance scoring.
 */
export function buildDomainStopWords(pages: PageData[], threshold = 0.5): Set<string> {
  const wordPageCount = new Map<string, number>();
  const totalPages = pages.length;

  for (const page of pages) {
    // Collect unique words across title, headings, and body for this page
    const allText = [page.title, ...page.headings, page.bodyText].join(' ');
    const uniqueWords = new Set(tokenize(allText));
    for (const word of uniqueWords) {
      wordPageCount.set(word, (wordPageCount.get(word) || 0) + 1);
    }
  }

  const domainStopWords = new Set<string>();
  for (const [word, count] of wordPageCount) {
    if (count / totalPages >= threshold) {
      domainStopWords.add(word);
    }
  }
  return domainStopWords;
}

/** Find the best anchor text phrase in source that relates to target */
function findAnchorText(
  source: PageData,
  target: PageData,
  boilerplate: Set<string>,
  domainStopWords: Set<string> = new Set()
): string {
  // Build target key terms, excluding domain stop words
  const rawTargetTerms = [
    ...tokenize(target.title),
    ...tokenize(target.headings.join(' ')),
  ];
  const targetKeyTerms = new Set(
    domainStopWords.size > 0
      ? rawTargetTerms.filter(t => !domainStopWords.has(t))
      : rawTargetTerms
  );

  // If all target terms were domain stop words, fall back to target title
  if (targetKeyTerms.size === 0) {
    return target.title.length > 50
      ? target.title.slice(0, 50).trim()
      : target.title;
  }

  // Look for 2-3 word phrases in source body that contain target keywords
  const sourceTokens = tokenize(source.bodyText);
  const sourceBigrams = ngrams(sourceTokens, 2);
  const sourceTrigrams = ngrams(sourceTokens, 3);

  const candidates: { phrase: string; score: number }[] = [];

  for (const phrase of [...sourceTrigrams, ...sourceBigrams]) {
    // Skip boilerplate phrases
    if (boilerplate.has(phrase)) continue;

    const words = phrase.split(' ');
    // Only count matches on non-domain-stop-word terms
    const meaningfulWords = words.filter(w => !domainStopWords.has(w));
    const matchCount = meaningfulWords.filter(w => targetKeyTerms.has(w)).length;
    if (matchCount > 0 && meaningfulWords.length > 0) {
      candidates.push({ phrase, score: matchCount / words.length });
    }
  }

  // Also check source headings for good anchor text
  for (const heading of source.headings) {
    const normalized = heading.toLowerCase().replace(/[^a-z0-9\s'-]/g, '').trim();
    // Skip boilerplate headings
    if (boilerplate.has(normalized)) continue;

    const headingTokens = tokenize(heading);
    const meaningfulTokens = headingTokens.filter(w => !domainStopWords.has(w));
    const matchCount = meaningfulTokens.filter(w => targetKeyTerms.has(w)).length;
    if (matchCount > 0 && headingTokens.length <= 5) {
      candidates.push({
        phrase: normalized,
        score: (matchCount / headingTokens.length) * 1.5, // bonus for heading
      });
    }
  }

  if (candidates.length === 0) {
    // Fall back to target's title as anchor text
    return target.title.length > 50
      ? target.title.slice(0, 50).trim()
      : target.title;
  }

  // Return the highest scoring, deduplicated
  candidates.sort((a, b) => b.score - a.score);
  return candidates[0].phrase;
}

/**
 * Find all internal link recommendations for a set of pages.
 * Returns recommendations sorted by relevance score.
 */
export function findLinkOpportunities(
  pages: PageData[],
  focusUrl?: string
): LinkRecommendation[] {
  const recommendations: LinkRecommendation[] = [];

  // Build boilerplate index: phrases appearing on 40%+ of pages are template junk
  const boilerplate = buildBoilerplateIndex(pages);

  // Build domain stop words: single words on 50%+ of pages carry no linking signal
  const domainStopWords = buildDomainStopWords(pages);

  // Pre-compute outbound link counts for priority boosting
  const outboundCounts = new Map<string, number>();
  for (const page of pages) {
    outboundCounts.set(normalizeUrl(page.url), page.internalLinks.length);
  }

  // Dynamic minimum threshold: if domain stop words were found, the site has
  // lots of similar content, so raise the bar to filter out weak matches
  const minScore = domainStopWords.size > 5 ? 8 : 5;

  for (let i = 0; i < pages.length; i++) {
    for (let j = 0; j < pages.length; j++) {
      if (i === j) continue;

      const source = pages[i];
      const target = pages[j];

      // If a focus URL is set, only show recommendations involving it
      if (focusUrl) {
        const normalizedFocus = normalizeUrl(focusUrl);
        const normalizedSource = normalizeUrl(source.url);
        const normalizedTarget = normalizeUrl(target.url);
        if (normalizedSource !== normalizedFocus && normalizedTarget !== normalizedFocus) {
          continue;
        }
      }

      // Check if link already exists
      const alreadyLinked = source.internalLinks.some(
        link => normalizeUrl(link) === normalizeUrl(target.url)
      );

      const { score, reason, anchorText } = scoreRelevance(source, target, boilerplate, domainStopWords);

      if (score < minScore) continue;

      // Boost score for source pages with fewer outbound links (they need links most)
      const sourceOutbound = outboundCounts.get(normalizeUrl(source.url)) || 0;
      let priorityBoost = 1;
      if (sourceOutbound < 3) priorityBoost = 1.5;
      else if (sourceOutbound < 10) priorityBoost = 1.2;
      const boostedScore = score * priorityBoost;

      // Relevance label is based on raw score (not boosted), so labels stay consistent
      let relevance: 'High' | 'Medium' | 'Low';
      if (score >= 15) relevance = 'High';
      else if (score >= 8) relevance = 'Medium';
      else relevance = 'Low';

      recommendations.push({
        sourceUrl: source.url,
        sourceTitle: source.title,
        targetUrl: target.url,
        targetTitle: target.title,
        suggestedAnchorText: anchorText,
        relevanceScore: boostedScore,
        relevance,
        reason,
        alreadyLinked,
      });
    }
  }

  // Sort all by score, then cap per source page to keep only the best
  recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Determine per-page cap: longer pages get up to 5, shorter ones get 3
  const pageBodyLength = new Map<string, number>();
  for (const page of pages) {
    pageBodyLength.set(normalizeUrl(page.url), page.bodyText.length);
  }

  const perSourceCount = new Map<string, number>();
  const capped: LinkRecommendation[] = [];

  for (const rec of recommendations) {
    const sourceKey = normalizeUrl(rec.sourceUrl);
    const count = perSourceCount.get(sourceKey) || 0;
    const bodyLen = pageBodyLength.get(sourceKey) || 0;
    const maxPerPage = bodyLen > 3000 ? 5 : 3;

    if (count >= maxPerPage) continue;
    perSourceCount.set(sourceKey, count + 1);
    capped.push(rec);
  }

  return capped;
}

function normalizeUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname.replace(/\/+$/, '').toLowerCase();
  } catch {
    return url.replace(/\/+$/, '').toLowerCase();
  }
}

export interface PageLinkStats {
  url: string;
  title: string;
  outboundInternalLinks: number;
  inboundInternalLinks: number;
}

/** Calculate internal link stats for each page: how many link out and how many link in */
export function getPageLinkStats(pages: PageData[]): PageLinkStats[] {
  const inboundCounts = new Map<string, number>();

  // Count inbound links for each page
  for (const page of pages) {
    for (const link of page.internalLinks) {
      const normalized = normalizeUrl(link);
      inboundCounts.set(normalized, (inboundCounts.get(normalized) || 0) + 1);
    }
  }

  return pages.map(page => ({
    url: page.url,
    title: page.title,
    outboundInternalLinks: page.internalLinks.length,
    inboundInternalLinks: inboundCounts.get(normalizeUrl(page.url)) || 0,
  }));
}
