# Blog to Social Snippets Tool — Build Plan

## Quick Summary

**What:** A content repurposing tool that extracts shareable snippets from blog posts and formats them for specific social platforms. Paste a URL or text, get 10-15 ready-to-post social media pieces.

**Cost to build & run:** $0 — Pure frontend with HTML parsing, no AI APIs needed.

**Tech:** Next.js + Cheerio for URL parsing + pattern matching for extraction.

**Differentiator:** Platform-specific formatting with proper lengths, not generic shortening. Outputs are ready to copy and post, not "ideas to work from."

---

## The Core Problem

Content creators face a repurposing gap:
- Spend hours writing a blog post
- Share it once on social media
- Content dies after one publish
- Manually pulling quotes is tedious
- Each platform has different optimal formats
- Good content never reaches its full audience

**The math:**
- 1 blog post = 1 share = maybe 100 views
- 1 blog post = 10-15 social posts = potentially 10,000+ impressions

**Your tool automates the extraction and formatting.**

---

## What Makes This Different

| Manual Repurposing | Your Tool |
|-------------------|-----------|
| Read through, find quotes | Auto-extracts shareable content |
| Guess at formatting | Platform-specific optimization |
| Same content everywhere | Tailored for each platform's style |
| Takes 30-60 minutes | Takes 30 seconds |
| Often forgotten | Built into workflow |

---

## Platform Specifications

### Character Limits & Style Guidelines

| Platform | Max Length | Optimal Length | Style Notes |
|----------|------------|----------------|-------------|
| Twitter/X | 280 chars | 200-250 chars | Punchy, hooks, line breaks for readability |
| LinkedIn | 3,000 chars | 500-650 words | Professional, storytelling, ends with question or CTA |
| Instagram | 2,200 chars | 300-500 words | Emoji-friendly, line breaks, hashtag section |
| Threads | 500 chars | 300-400 chars | Conversational, casual, thread-friendly |
| Facebook | 63,206 chars | 100-250 words | Question-based, shareable, less formal than LinkedIn |

**Word Count Caps:**
- All outputs capped at 650 words maximum
- Most outputs will be much shorter (platform-appropriate)
- Tool optimizes for engagement, not length

---

## Smart Extraction Logic

### What Gets Extracted (No AI Required)

**High-Priority Patterns:**

1. **Statistics & Numbers**
   - "increased by 40%"
   - "3 out of 4 businesses"
   - "$50,000 in revenue"
   - Any sentence with compelling data

2. **Strong Statements**
   - Sentences starting with "The truth is..."
   - "Most people think... but actually..."
   - "The biggest mistake..."
   - Contrarian or opinion-based statements

3. **Lessons & Takeaways**
   - "I learned that..."
   - "The key insight..."
   - "What this taught me..."
   - "Here's what works..."

4. **Lists & Tips**
   - Numbered lists
   - Bullet points
   - "Step 1, Step 2..."
   - Natural snippet boundaries

5. **Questions**
   - Any question in the article
   - Great for engagement posts
   - "Have you ever wondered..."

6. **Emphasized Text**
   - Bold or italic text (author already highlighted it)
   - Blockquotes
   - Callout boxes

7. **First/Last Sentences**
   - Section openers often summarize the point
   - Conclusions are naturally quotable

### Extraction Algorithm

```javascript
function extractSnippets(content) {
  const snippets = [];
  
  // 1. Find sentences with numbers/stats
  const statsRegex = /[^.]*\d+[%$]?[^.]*\./g;
  
  // 2. Find strong statement patterns
  const strongPatterns = [
    /the truth is[^.]+\./gi,
    /most people[^.]+but[^.]+\./gi,
    /the biggest mistake[^.]+\./gi,
    /here'?s what[^.]+\./gi,
    /I learned[^.]+\./gi,
  ];
  
  // 3. Extract list items
  const listItems = content.match(/<li>([^<]+)<\/li>/g);
  
  // 4. Find questions
  const questions = content.match(/[^.]*\?/g);
  
  // 5. Get emphasized text
  const emphasized = content.match(/<(strong|b|em|i)>([^<]+)<\/\1>/g);
  
  // 6. Score and rank snippets
  // 7. Return top 15 unique snippets
  
  return snippets;
}
```

---

## User Flow

### Step 1: Input

```
┌─────────────────────────────────────────────────────────────────────┐
│ BLOG TO SOCIAL SNIPPETS                                             │
│ Turn one blog post into 15 social posts                            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│ Paste your blog post URL:                                           │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ https://yourblog.com/post-title                                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ [Extract Snippets →]                                                │
│                                                                     │
│ ─────────────────────── OR ───────────────────────                 │
│                                                                     │
│ Paste your content directly:                                        │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │                                                                 │ │
│ │ [Paste your blog post text here...]                             │ │
│ │                                                                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ [Extract Snippets →]                                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 2: Platform Selection

```
┌─────────────────────────────────────────────────────────────────────┐
│ GENERATE FOR WHICH PLATFORMS?                                       │
│                                                                     │
│ ☑ Twitter/X (single tweets)                                        │
│ ☑ Twitter/X (thread format)                                        │
│ ☑ LinkedIn (long-form posts)                                       │
│ ☑ Instagram (captions)                                             │
│ ☐ Threads                                                          │
│ ☐ Facebook                                                         │
│                                                                     │
│ [Generate All Selected →]                                           │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 3: Output

```
┌─────────────────────────────────────────────────────────────────────┐
│ YOUR SNIPPETS                                                       │
│ Source: "10 Things I Learned Running E-Commerce for 5 Years"       │
│ Generated: 14 snippets across 4 platforms                          │
│                                                                     │
│ [Filter: All ▼] [Download All (.txt)] [Copy All to Clipboard]      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ TWITTER/X — Single Tweets (5)                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Your first product idea is almost always wrong.                 │ │
│ │                                                                 │ │
│ │ Mine flopped completely.                                        │ │
│ │                                                                 │ │
│ │ But the customer feedback led me to a product that actually     │ │
│ │ sold.                                                           │ │
│ │                                                                 │ │
│ │ Failure is just expensive market research.                      │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ 187 characters • ✓ Within limit                                    │
│ [Copy] [Edit] [Regenerate]                                          │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Cash flow matters more than revenue.                            │ │
│ │                                                                 │ │
│ │ You can be "profitable" on paper while running out of money.    │ │
│ │                                                                 │ │
│ │ Revenue is vanity. Cash flow is sanity.                         │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ 156 characters • ✓ Within limit                                    │
│ [Copy] [Edit] [Regenerate]                                          │
│                                                                     │
│ [Show 3 more Twitter snippets...]                                   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ LINKEDIN — Long-Form Posts (3)                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Cash flow matters more than revenue.                            │ │
│ │                                                                 │ │
│ │ I learned this the hard way in year 2.                          │ │
│ │                                                                 │ │
│ │ We were "profitable" on paper. Invoices showed $40k/month.      │ │
│ │ But payment terms meant we didn't see that cash for 60 days.    │ │
│ │ Meanwhile, suppliers wanted payment in 30.                      │ │
│ │                                                                 │ │
│ │ The gap almost killed us.                                       │ │
│ │                                                                 │ │
│ │ Now I run everything through one filter:                        │ │
│ │ When does the money actually hit my account?                    │ │
│ │                                                                 │ │
│ │ Revenue is vanity. Cash flow is sanity.                         │ │
│ │                                                                 │ │
│ │ Anyone else learn this lesson the hard way?                     │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ 487 characters • 89 words • ✓ Optimal length                       │
│ [Copy] [Edit] [Regenerate]                                          │
│                                                                     │
│ [Show 2 more LinkedIn snippets...]                                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ INSTAGRAM — Captions (3)                                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 5 years of e-commerce taught me this 👇                         │ │
│ │                                                                 │ │
│ │ Your network is literally your net worth.                       │ │
│ │                                                                 │ │
│ │ Every major win came from:                                      │ │
│ │ → A connection who made an intro                                │ │
│ │ → A friend who shared a supplier                                │ │
│ │ → A mentor who'd seen my mistake before                         │ │
│ │                                                                 │ │
│ │ I spent year 1 trying to figure everything out alone. Dumb.     │ │
│ │                                                                 │ │
│ │ Year 2+? I invested in relationships.                           │ │
│ │ Coffees. Conferences. Communities.                              │ │
│ │                                                                 │ │
│ │ The ROI on genuine relationships is infinite.                   │ │
│ │                                                                 │ │
│ │ Save this for when you need the reminder ❤️                     │ │
│ │                                                                 │ │
│ │ ─────────────────────────────────────                           │ │
│ │ #ecommerce #entrepreneurship #businesstips #networking          │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ 612 characters • 97 words • ✓ Optimal length                       │
│ Suggested hashtags included                                         │
│ [Copy] [Edit] [Remove Hashtags] [Regenerate]                        │
│                                                                     │
│ [Show 2 more Instagram snippets...]                                 │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ TWITTER THREAD (1)                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ THREAD: 10 things I learned running e-commerce for 5 years 🧵   │ │
│ │                                                                 │ │
│ │ 1/ Your first idea is almost always wrong.                      │ │
│ │                                                                 │ │
│ │ Mine flopped completely. But the feedback led me to something   │ │
│ │ that actually worked.                                           │ │
│ │                                                                 │ │
│ │ ───────────────────────────────                                 │ │
│ │                                                                 │ │
│ │ 2/ Cash flow > Revenue                                          │ │
│ │                                                                 │ │
│ │ You can be "profitable" on paper while running out of money.    │ │
│ │ I almost learned this too late.                                 │ │
│ │                                                                 │ │
│ │ ───────────────────────────────                                 │ │
│ │                                                                 │ │
│ │ 3/ Your network is your net worth.                              │ │
│ │                                                                 │ │
│ │ Every major win came from a connection, not cold outreach.      │ │
│ │                                                                 │ │
│ │ [... continues for 10 tweets ...]                               │ │
│ │                                                                 │ │
│ │ 10/ Take care of yourself first.                                │ │
│ │                                                                 │ │
│ │ Burned out founders build burned out businesses.                │ │
│ │                                                                 │ │
│ │ ───────────────────────────────                                 │ │
│ │                                                                 │ │
│ │ That's 5 years of lessons in 10 tweets.                         │ │
│ │                                                                 │ │
│ │ Save this thread. You'll need it.                               │ │
│ │                                                                 │ │
│ │ Follow @handle for more.                                        │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ 12 tweets • All within limits                                       │
│ [Copy Thread] [Copy as Numbered List] [Edit]                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Platform-Specific Formatting Rules

### Twitter/X (Single Tweet)

```javascript
const twitterSingleRules = {
  maxChars: 280,
  targetChars: 200-250,
  formatting: {
    useLineBreaks: true,      // Break up dense text
    maxSentences: 4,          // Keep punchy
    endWithHook: true,        // Question, statement, or insight
  },
  avoid: [
    'hashtags (unless essential)',
    'links (save for reply)',
    'long words when short work',
  ]
};
```

### Twitter/X (Thread)

```javascript
const twitterThreadRules = {
  maxTweetsPerThread: 15,
  targetTweetsPerThread: 8-12,
  formatting: {
    hookTweet: 'Must be compelling, include 🧵 emoji',
    numbering: '1/, 2/, 3/ format',
    closingTweet: 'Summary + CTA + follow request',
    eachTweet: 'Standalone value, not cliffhangers',
  }
};
```

### LinkedIn

```javascript
const linkedinRules = {
  maxWords: 650,              // Hard cap per user request
  targetWords: 150-400,       // Sweet spot for engagement
  formatting: {
    openingHook: 'First line is crucial (shows in preview)',
    shortParagraphs: true,    // 1-2 sentences max
    lineBreaks: 'Between every paragraph',
    endingCTA: 'Question or call for comments',
  },
  style: {
    tone: 'Professional but personal',
    storytelling: true,
    lessonBased: true,
    avoidHashtags: 'LinkedIn algorithm doesn\'t favor them',
  }
};
```

### Instagram

```javascript
const instagramRules = {
  maxChars: 2200,
  maxWords: 650,              // Hard cap
  targetWords: 100-300,       // Most engaging length
  formatting: {
    openingHook: 'First line shows in preview',
    emojis: 'Use sparingly but intentionally',
    lineBreaks: 'Create visual breathing room',
    listFormat: 'Arrows (→) or emojis for lists',
    ctaAtEnd: 'Save, share, comment, link in bio',
  },
  hashtags: {
    count: 5-15,
    placement: 'After main content, separated',
    mix: 'Popular + niche + branded',
  }
};
```

---

## Feature Set

### MVP Features

1. **URL Input**
   - Paste blog URL
   - Fetch and parse HTML
   - Extract article content (ignore nav, footer, sidebar)

2. **Text Input**
   - Paste content directly
   - For non-public content or when URL doesn't work

3. **Smart Extraction**
   - Pattern-based snippet identification
   - Scoring and ranking
   - Deduplication

4. **Platform Formatting**
   - Twitter single tweets (5)
   - Twitter thread (1)
   - LinkedIn posts (3)
   - Instagram captions (3)

5. **Output Management**
   - Copy individual snippets
   - Edit before copying
   - Character/word counts
   - Platform compliance indicators

6. **Export**
   - Copy all snippets
   - Download as text file
   - Download as CSV (for scheduling tools)

### V2 Features

7. **Hashtag Suggestions**
   - Analyze content for topics
   - Suggest relevant hashtags by platform
   - Include mix of popular and niche

8. **Scheduling Suggestions**
   - "Post this on Monday, this on Wednesday..."
   - Based on content variety

9. **Image Suggestions**
   - "This snippet would work well with an image of..."
   - Link to image resizer tool

10. **Saved Templates**
    - Custom formatting preferences
    - Brand voice guidelines
    - Preferred hashtags

11. **Batch Processing**
    - Multiple URLs at once
    - Content calendar generation

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| HTML Parsing | Cheerio | Free |
| Text Processing | Custom regex + algorithms | Free |
| Styling | Tailwind CSS | Free |

**Total recurring cost: $0**

### URL Content Extraction

```javascript
import * as cheerio from 'cheerio';

async function extractArticleContent(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  // Remove non-content elements
  $('nav, header, footer, aside, .sidebar, .comments, script, style').remove();
  
  // Try common article selectors
  const selectors = [
    'article',
    '.post-content',
    '.entry-content',
    '.article-content',
    'main',
    '[role="main"]',
  ];
  
  let content = '';
  for (const selector of selectors) {
    const element = $(selector);
    if (element.length && element.text().trim().length > 500) {
      content = element.text().trim();
      break;
    }
  }
  
  // Extract metadata
  const title = $('h1').first().text() || $('title').text();
  
  return { title, content };
}
```

### Snippet Scoring

```javascript
function scoreSnippet(text, type) {
  let score = 0;
  
  // Length score (prefer medium length)
  if (text.length > 50 && text.length < 300) score += 10;
  
  // Has numbers/stats
  if (/\d+[%$]?/.test(text)) score += 15;
  
  // Strong statement patterns
  if (/^(The truth|Most people|The biggest|Here's what)/i.test(text)) score += 20;
  
  // Lesson-based
  if (/I learned|taught me|realized/i.test(text)) score += 15;
  
  // Question (great for engagement)
  if (text.includes('?')) score += 10;
  
  // First-person (more relatable)
  if (/\b(I|we|my|our)\b/i.test(text)) score += 5;
  
  // Contrarian/surprising
  if (/but actually|however|contrary|surprisingly/i.test(text)) score += 15;
  
  return score;
}
```

---

## SEO Strategy

### Target Keywords
- "blog to social media tool"
- "repurpose blog content"
- "content repurposing tool free"
- "blog to twitter thread"
- "turn blog into social posts"
- "blog to linkedin post"
- "content repurposing"

### Long-tail Opportunities
- "how to repurpose blog content for social media"
- "turn one blog post into multiple social posts"
- "blog content repurposing strategy"

---

## Blog Content Strategy

### Pillar Article

**Title:** "Content Repurposing: Turn One Blog Post Into 15 Social Posts (Free Tool)"

**URL:** /blog/content-repurposing-guide

**Target length:** 3,500-4,000 words

**Structure:**
1. Why most content dies after one share
2. The math: 1 post → 15 pieces → 10x reach
3. What makes content "repurposable"
4. Platform-by-platform breakdown:
   - What works on Twitter
   - What works on LinkedIn
   - What works on Instagram
5. Manual repurposing process (step by step)
6. Introduce the tool: "Or automate it →"
7. Content calendar from one post
8. Case study: How I repurposed this article

### Supporting Posts

**Post 1: "How to Write Blog Posts That Are Easy to Repurpose"**
- URL: /blog/repurposable-blog-posts
- Length: 2,000 words
- Covers: Structure, formatting, snippet-friendly writing
- Links to: Tool

**Post 2: "LinkedIn Post Format: What Actually Works in 2026"**
- URL: /blog/linkedin-post-format
- Length: 1,800 words
- Covers: Formatting tips, examples, hooks
- Links to: Tool

**Post 3: "Twitter Thread Strategy: Complete Guide"**
- URL: /blog/twitter-thread-strategy
- Length: 2,000 words
- Covers: When to thread, how to structure, hooks
- Links to: Tool

**Post 4: "I Repurposed One Blog Post for 30 Days — Here's What Happened"**
- URL: /blog/content-repurposing-experiment
- Length: 2,500 words
- Covers: Real data, impressions, engagement
- Links to: Tool

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tool + pillar article | Core assets |
| 2 | LinkedIn format guide | Platform-specific |
| 3 | Twitter thread strategy | Platform-specific |
| 4 | 30-day experiment case study | Social proof |

---

## Lead Capture Strategy

### Free Tier (Everything)
- Full extraction and formatting
- All platforms
- Unlimited use

### Email Capture Triggers
- "Save your snippets library" — requires email
- "Get weekly repurposing tips" — requires email
- "Download content calendar template" — requires email
- "Export to CSV for scheduling" — requires email

---

## Development Phases

### Phase 1: Core MVP (1 week)
- [ ] URL input and parsing
- [ ] Text input fallback
- [ ] Snippet extraction algorithm
- [ ] Scoring and ranking
- [ ] Basic output display

### Phase 2: Platform Formatting (1 week)
- [ ] Twitter single tweet formatting
- [ ] Twitter thread formatting
- [ ] LinkedIn post formatting
- [ ] Instagram caption formatting
- [ ] Character/word counts

### Phase 3: Polish (3-5 days)
- [ ] Platform selection
- [ ] Edit snippets inline
- [ ] Copy/export functionality
- [ ] Mobile responsiveness

### Phase 4: Content (1 week)
- [ ] Publish pillar article
- [ ] Publish platform guides
- [ ] Internal linking

### Phase 5: Enhancements (Future)
- [ ] Hashtag suggestions
- [ ] Scheduling suggestions
- [ ] Batch processing
- [ ] Threads integration

---

## Success Metrics

- **Usage:** Blog posts processed per week
- **Engagement:** Snippets copied per session
- **Content:** Pillar article ranking
- **Conversion:** Email capture rate
- **Return visits:** Users who come back (indicates value)
