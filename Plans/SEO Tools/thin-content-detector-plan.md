# Thin Content Detector — Build Plan

## Quick Summary

**What:** A free tool that crawls your site and identifies pages with low word counts that might be hurting your SEO. Shows word count for every page, flags thin content, and suggests whether to expand, consolidate, or remove.

**Cost to build & run:** $0 — uses only free tools and no paid APIs.

**Tech:** Next.js + Cheerio. Reuses same crawler as your other tools.

**Differentiator:** Simple, visual word count audit with actionable recommendations — not just data.

---

## The Core Problem

Thin content is a silent SEO killer:
- Google's Panda algorithm specifically targets thin content
- Pages with <300 words often can't rank for anything meaningful
- Site owners don't know which pages are thin (they don't check word counts)
- Thin pages can drag down entire site quality scores

**Common causes:**
- Old blog posts that were "quick updates"
- Category/tag pages with just listings
- Product pages with only specs, no description
- Placeholder pages that were never finished
- Pages that got their content removed over time

**Your tool surfaces the problem so they can fix it.**

---

## What Makes This Tool Different

**Existing tools:**
- Screaming Frog shows word count but buried in data overload
- SEO audits mention "thin content" but don't show you where
- Manual checking is tedious

**Your tool:**
- One-click audit of entire site
- Visual distribution of content length
- Clear categories: Thin / Adequate / Strong
- Specific recommendations per page

**Positioning:** "Find the pages dragging down your site. Fix or remove them."

---

## Core User Flow

### Step 1: Input
User provides:
- Sitemap URL or domain
- (Optional) Thin threshold adjustment (default: 300 words)
- (Optional) Section filter (/blog/, /products/)

### Step 2: Crawl
Tool fetches each page and extracts:
- URL
- Title
- Main content word count (excluding nav, footer, sidebar)
- Page type guess (blog, product, category, etc.)

### Step 3: Analysis
Categorize each page:
- **Thin:** <300 words — likely hurting you
- **Light:** 300-600 words — could be improved
- **Adequate:** 600-1500 words — probably fine
- **Comprehensive:** 1500+ words — strong content

### Step 4: Output — Thin Content Report

```
THIN CONTENT AUDIT
digitaljesse.com — 156 pages analyzed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 CONTENT DISTRIBUTION

[Visual bar chart]
Thin (<300):        ████████ 23 pages (15%)
Light (300-600):    ██████████████ 41 pages (26%)
Adequate (600-1500): ████████████████████████ 67 pages (43%)
Comprehensive (1500+): ████████ 25 pages (16%)

Average word count: 847 words
Median word count: 612 words

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 THIN CONTENT (23 pages need attention)

Sorted by word count (lowest first)

┌──────────────────────────────────────────────────────────────────────┐
│ /blog/quick-tip-seo                                                  │
│ Title: "Quick SEO Tip"                                               │
│ Word count: 87 words                                                 │
│                                                                      │
│ Recommendation: CONSOLIDATE                                          │
│ This looks like a short tip. Consider merging into a larger          │
│ "SEO Tips" roundup post or expanding significantly.                  │
│                                                                      │
│ [View Page] [Find related pages to merge]                            │
├──────────────────────────────────────────────────────────────────────┤
│ /blog/update-january-2023                                            │
│ Title: "January 2023 Update"                                         │
│ Word count: 124 words                                                │
│                                                                      │
│ Recommendation: REMOVE or NOINDEX                                    │
│ Dated update posts rarely provide lasting value. Consider            │
│ removing or adding noindex if you want to keep it.                   │
│                                                                      │
│ [View Page]                                                          │
├──────────────────────────────────────────────────────────────────────┤
│ /products/widget-blue                                                │
│ Title: "Blue Widget"                                                 │
│ Word count: 156 words                                                │
│                                                                      │
│ Recommendation: EXPAND                                               │
│ Product pages benefit from detailed descriptions. Add features,      │
│ benefits, use cases, FAQs, and customer reviews.                     │
│                                                                      │
│ [View Page] [Generate content brief]                                 │
└──────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 QUICK STATS BY SECTION

| Section | Pages | Avg Words | Thin Pages |
|---------|-------|-----------|------------|
| /blog/ | 87 | 1,124 | 12 (14%) |
| /products/ | 45 | 342 | 8 (18%) |
| /resources/ | 15 | 1,890 | 0 (0%) |
| Other | 9 | 256 | 3 (33%) |

Your /products/ section has the most thin content issues.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 FULL PAGE LIST

[Filter: All ▼] [Sort: Word count ▼] [Search: ________]

| URL | Title | Words | Category | Action |
|-----|-------|-------|----------|--------|
| /blog/quick-tip | Quick SEO Tip | 87 🔴 | Thin | Consolidate |
| /blog/update-jan | January Update | 124 🔴 | Thin | Remove |
| /products/widget | Blue Widget | 156 🔴 | Thin | Expand |
| /blog/seo-guide | Complete Guide | 3,420 🟢 | Strong | — |
| ... | ... | ... | ... | ... |

[Export CSV] [Export to Content Brief Generator]
```

---

## Feature Set

### MVP (Launch Version)

1. **Site Crawl**
   - Sitemap or domain input
   - Crawl up to 200 pages (free tier)
   - Rate limiting to be respectful

2. **Smart Word Count**
   - Count only main content (not nav, footer, sidebar, comments)
   - Identify main content area using common selectors
   - Handle different page structures

3. **Content Categorization**
   - Thin: <300 words
   - Light: 300-600 words
   - Adequate: 600-1500 words
   - Comprehensive: 1500+ words
   - Adjustable thresholds

4. **Visual Distribution**
   - Bar chart or histogram of word counts
   - At-a-glance site health view
   - Section breakdown

5. **Page Type Detection**
   - Blog post (likely URL patterns: /blog/, /post/, /article/)
   - Product page (/product/, /shop/, etc.)
   - Category/tag page
   - Other
   - Helps tailor recommendations

6. **Actionable Recommendations**
   - **Expand:** Page has potential, needs more content
   - **Consolidate:** Merge with similar thin pages
   - **Remove:** No value, should be deleted
   - **Noindex:** Keep for users, hide from Google
   - Context-aware based on page type and content

7. **Export Options**
   - CSV download
   - Copy table
   - Direct link to Content Brief Generator (for pages to expand)

### Version 2 Features

8. **Merge Suggestions**
   - Identify thin pages on similar topics
   - "These 3 pages could become one strong post"
   - Link to Internal Link Finder for related content

9. **Traffic Overlay**
   - Connect Search Console
   - Show which thin pages actually get traffic
   - Prioritize: "This thin page gets 500 visits/month — expand it!"

10. **Content Quality Signals**
    - Beyond word count: images, headings, lists
    - "This page has 400 words but no images or headers"
    - More nuanced quality assessment

11. **Historical Tracking**
    - Save audits over time
    - "You fixed 15 thin pages since last month"
    - Trend visualization

12. **Bulk Action Planning**
    - Create a "fix plan" with priorities
    - Export as task list
    - Track completion

13. **Competitor Comparison**
    - "Your product pages average 300 words"
    - "Top competitors average 800 words"

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| HTML Parsing | Cheerio (npm) | Free |
| Charts | Chart.js or Recharts | Free |
| Styling | Tailwind CSS | Free |
| Database | None for MVP | Free |

**Total recurring cost: $0**

### Key NPM Packages

```bash
npm install cheerio           # HTML parsing
npm install fast-xml-parser   # Sitemap parsing
npm install recharts          # Charts (if using React)
```

### Shared Infrastructure

Reuses same crawler as other tools:
- Sitemap parser
- Page fetcher with rate limiting
- Basic HTML parsing

**New logic specific to this tool:**
- Smart content extraction (exclude nav/footer)
- Word counting
- Page type detection
- Recommendation engine

### Backend / Processing

**API Route Flow:**
```
1. Receive sitemap URL or domain
2. Parse sitemap / crawl pages
3. For each page:
   - Fetch HTML
   - Extract main content (smart selection)
   - Count words
   - Detect page type from URL/content
   - Store results
4. Post-process:
   - Categorize by word count
   - Calculate stats by section
   - Generate recommendations
5. Return structured results
```

### Smart Content Extraction

The key challenge: counting only main content, not navigation, footers, sidebars.

```javascript
function extractMainContent(html) {
  const $ = cheerio.load(html);
  
  // Remove non-content elements
  $('nav, header, footer, aside, .sidebar, .navigation, .menu').remove();
  $('script, style, noscript, iframe').remove();
  $('.comments, #comments, .related-posts').remove();
  
  // Try to find main content area
  const mainSelectors = [
    'main',
    'article',
    '[role="main"]',
    '.post-content',
    '.entry-content',
    '.article-content',
    '.content',
    '#content'
  ];
  
  for (const selector of mainSelectors) {
    const main = $(selector);
    if (main.length && main.text().trim().length > 100) {
      return main.text().trim();
    }
  }
  
  // Fallback: use body with exclusions already removed
  return $('body').text().trim();
}

function countWords(text) {
  // Remove extra whitespace, count words
  return text.split(/\s+/).filter(word => word.length > 0).length;
}
```

### Page Type Detection

```javascript
function detectPageType(url, title, content) {
  const urlLower = url.toLowerCase();
  
  // URL-based detection
  if (urlLower.match(/\/(blog|post|article|news)\//)) return 'blog';
  if (urlLower.match(/\/(product|shop|item|store)\//)) return 'product';
  if (urlLower.match(/\/(category|tag|topic)\//)) return 'category';
  if (urlLower.match(/\/(about|contact|team)\b/)) return 'static';
  
  // Content-based hints
  if (content.includes('Add to cart') || content.includes('Buy now')) return 'product';
  if (content.match(/Posted on|Published|Author:/)) return 'blog';
  
  return 'other';
}
```

### Recommendation Engine

```javascript
function getRecommendation(page) {
  const { wordCount, pageType, title } = page;
  
  // Very thin content
  if (wordCount < 150) {
    // Check if it's a dated post (updates, announcements)
    if (title.match(/update|announcement|news|20\d{2}/i)) {
      return {
        action: 'remove',
        reason: 'Dated content with minimal value. Consider removing or noindexing.'
      };
    }
    return {
      action: 'consolidate',
      reason: 'Very thin content. Merge with related pages or expand significantly.'
    };
  }
  
  // Thin content by page type
  if (wordCount < 300) {
    if (pageType === 'product') {
      return {
        action: 'expand',
        reason: 'Product pages benefit from detailed descriptions, features, and FAQs.'
      };
    }
    if (pageType === 'blog') {
      return {
        action: 'consolidate',
        reason: 'Short blog posts rarely rank. Merge into comprehensive guides.'
      };
    }
    return {
      action: 'expand',
      reason: 'Add more valuable content or consider removing.'
    };
  }
  
  // Light content
  if (wordCount < 600) {
    return {
      action: 'consider-expanding',
      reason: 'Content is adequate but could benefit from more depth.'
    };
  }
  
  // Adequate+
  return {
    action: 'none',
    reason: 'Content length is good.'
  };
}
```

---

## UX Details That Matter

### Visual Distribution Chart

Show content health at a glance:

```
Word Count Distribution

0-300    ████████████████ 23 pages    🔴 Fix these
300-600  ████████████████████████ 41 pages    🟡 Could improve  
600-1500 ████████████████████████████████████████ 67 pages    🟢 Good
1500+    ████████████████ 25 pages    🟢 Strong
```

### Section Breakdown

Help identify problem areas:

```
Your /products/ section has 18% thin pages.
Your /blog/ section averages 1,124 words. 👍
```

### Priority Sorting

Default sort: lowest word count first (worst problems at top)

But also offer:
- Sort by page type
- Sort by section
- Sort by potential (thin pages that could rank with expansion)

### Actionable CTAs

Don't just show data — help them act:
- "Expand this page" → links to Content Brief Generator
- "Find related pages to merge" → links to Internal Link Finder
- "View page" → opens in new tab
- "Add to fix list" → builds exportable task list

---

## Making It Look Credible

### Trust Builders
- Explain why word count matters (link to Google's content guidelines)
- Note that word count isn't everything (quality > quantity)
- Show thresholds are industry standards

### Balanced Messaging
- Don't scare them — thin content is fixable
- Emphasize opportunity, not just problems
- "23 pages could be improved" not "23 pages are failing"

### Your Angle
- "Built by Jesse — I found 30 thin pages on my site and fixed them. Here's what happened."
- Show before/after from your own experience

---

## SEO Strategy for the Tool Itself

### Target Keywords
- "thin content checker"
- "thin content finder"
- "word count checker website"
- "content audit tool"
- "find thin content"
- "page word count analyzer"
- "SEO content length checker"

### Related Searches to Target
- "what is thin content"
- "how many words should a blog post be"
- "thin content penalty"
- "minimum word count for SEO"

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "Thin Content: What It Is, How to Find It, and How to Fix It"

**URL:** /blog/thin-content-guide

**Target length:** 3,000-3,500 words

**Structure:**
1. What is thin content (Google's definition)
2. Why thin content hurts your rankings (Panda, quality scores)
3. Common causes of thin content:
   - Short blog posts
   - Sparse product pages
   - Auto-generated pages
   - Duplicate/similar content
   - Tag/category pages
4. How to identify thin content manually
5. Introduce the tool: "Or scan your entire site →"
6. What to do with thin pages:
   - Expand with valuable content
   - Consolidate into comprehensive guides
   - Remove or noindex
   - Add canonical tags
7. How much content is enough? (by page type)
8. Case study: Fixing thin content on your own site
9. Preventing thin content in the future

### Supporting Blog Posts

**Post 1: "How Long Should a Blog Post Be? (2026 Data)"**
- URL: /blog/blog-post-length
- Length: 2,000 words
- Covers: Word count benchmarks, data from studies, by industry
- Links to: Thin Content Detector, pillar article
- **High traffic:** This is a frequently searched question

**Post 2: "How to Write Longer Content Without Fluff"**
- URL: /blog/write-longer-content
- Length: 1,800 words
- Covers: Adding value not filler, expansion techniques
- Links to: Thin Content Detector, Content Brief Generator

**Post 3: "Should You Delete Thin Content? A Decision Framework"**
- URL: /blog/delete-thin-content
- Length: 1,500 words
- Covers: When to remove, noindex, redirect, or improve
- Links to: Thin Content Detector

**Post 4: "How to Combine Blog Posts for Better SEO"**
- URL: /blog/combine-blog-posts
- Length: 1,800 words
- Covers: Step-by-step merging process, redirect setup
- Links to: Thin Content Detector, Internal Link Finder, Cannibalization Checker

**Post 5: "Product Page SEO: How to Write Descriptions That Rank"**
- URL: /blog/product-page-seo
- Length: 2,000 words
- Covers: Product page content strategy
- Links to: Thin Content Detector
- **Good for e-commerce audience**

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tool + pillar article | Core asset |
| 2 | "Blog post length" data post | High-traffic question |
| 3 | "Write longer without fluff" | How-to content |
| 4 | "Should you delete?" decision guide | Addresses objections |
| 5 | "Combine blog posts" guide | Practical how-to |

---

## Lead Capture Strategy

### Free Tier
- Analyze up to 200 pages
- Full audit report
- Export to CSV

### Email Capture Triggers
- "Save your audit" — requires email
- "Compare to previous audits" — requires email
- "Get a fix plan with priorities" — requires email
- "Analyze more than 200 pages" — requires email

---

## Development Phases

### Phase 1: Core MVP (3-5 days)
- [ ] Sitemap/URL input
- [ ] Site crawler (reuse existing)
- [ ] Smart content extraction
- [ ] Word counting
- [ ] Categorization (thin/light/adequate/strong)
- [ ] Basic recommendations
- [ ] Results table
- [ ] Summary stats

### Phase 2: Polish (2-3 days)
- [ ] Distribution chart visualization
- [ ] Section breakdown stats
- [ ] Page type detection
- [ ] Filters and sorting
- [ ] Export to CSV
- [ ] Landing page

### Phase 3: Content Launch (1 week)
- [ ] Publish pillar article
- [ ] Publish "blog post length" post
- [ ] Publish "combine posts" guide
- [ ] Social promotion

### Phase 4: Enhancements (Future)
- [ ] Merge suggestions (similar thin pages)
- [ ] Traffic overlay (Search Console)
- [ ] Historical tracking
- [ ] Link to Content Brief Generator

---

## Integration with Other Tools

This tool connects naturally to your other tools:

| Tool | Connection |
|------|------------|
| **Content Brief Generator** | "Expand this page" → Generate brief for the topic |
| **Internal Link Finder** | "Find related pages" → Find merge candidates |
| **Keyword Cannibalization** | Multiple thin pages on same topic = merge opportunity |
| **Topical Authority Map** | Thin pages show as weak nodes in your clusters |

**Ecosystem play:** Position the suite as "find problems → fix problems" workflow.

---

## Open Questions

1. **Threshold customization:** Let users adjust what counts as "thin"? (Some niches have different standards)
2. **Content beyond text:** Factor in images, videos, embedded content?
3. **Template content:** Detect and exclude repeated template text (appears on every page)?
4. **Word count accuracy:** How to handle tables, lists, code blocks?

---

## Success Metrics

- **Usage:** Audits run per week
- **Engagement:** % who export or click "expand" actions
- **Repeat usage:** Return visits (content changes over time)
- **Content:** Pillar article ranking for "thin content"
- **Cross-tool flow:** Users who go from this tool → Content Brief Generator
- **Conversion:** Email capture rate
