# Keyword Cannibalization Checker — Build Plan

## Quick Summary

**What:** A free tool that identifies pages on your site competing for the same keywords — hurting each other's rankings.

**Cost to build & run:** $0 — uses only free tools and no paid APIs.

**Tech:** Next.js + Cheerio + plain JavaScript text analysis. No AI APIs required.

**Differentiator:** Most SEO tools mention cannibalization exists. Yours shows exactly which pages are fighting and what to do about it.

---

## The Core Problem

Keyword cannibalization is when multiple pages on the same site target the same keyword. Google gets confused about which page to rank, so it often ranks neither well — or keeps switching between them.

This is a silent killer because:
- Most site owners don't know it's happening
- It's tedious to manually check every page against every other page
- Expensive tools bury this feature in $99+/month subscriptions
- The fix is usually simple once you identify the problem

**Your tool makes the invisible visible.**

---

## What Makes This Tool Different

**Existing tools:** Show a vague "you might have cannibalization" warning.

**Your tool:** Shows a clear table — "These 3 pages are all targeting 'shopify speed optimization' — here's what to do."

**Positioning:** "Stop your pages from competing against each other. Find cannibalization issues in 60 seconds."

---

## Core User Flow

### Step 1: Input
User provides:
- Domain URL or sitemap URL
- (Optional) Specific keyword to check

### Step 2: Crawl
Tool fetches and analyzes:
- Page URLs
- Title tags
- H1 headings
- Meta descriptions
- First 500 words of body content
- URL slugs

### Step 3: Analysis
For each page, extract:
- Primary keyword (from title, H1, URL)
- Secondary keywords (from content)
- Keyword density for top terms

Then compare all pages to find overlaps.

### Step 4: Output

**Cannibalization Report**

| Keyword | Competing Pages | Severity | Recommended Action |
|---------|-----------------|----------|-------------------|
| "shopify seo tips" | /blog/shopify-seo-guide, /blog/seo-tips-shopify | High | Merge into one post |
| "page speed" | /blog/speed-optimization, /tools/speed-checker | Medium | Differentiate intent |
| "internal linking" | /blog/internal-links, /blog/link-building-101 | Low | Add canonical or distinct focus |

**For each conflict, show:**
- The competing pages (clickable)
- The overlapping keywords
- Severity score (based on how similar they are)
- Specific recommendation

---

## Feature Set

### MVP (Launch Version)

1. **Domain/Sitemap Input**
   - Accept domain (crawl from homepage)
   - Accept sitemap URL (faster, more complete)
   - Limit to 100 pages on free tier

2. **Keyword Extraction**
   - Pull keywords from title, H1, meta description, URL slug
   - Extract top 5-10 terms from body content
   - Weight by position (title > H1 > body)

3. **Conflict Detection**
   - Compare every page against every other page
   - Score similarity based on keyword overlap
   - Group pages targeting same primary keyword

4. **Severity Scoring**
   - **High:** Same primary keyword in title/H1
   - **Medium:** Significant body content overlap
   - **Low:** Similar but distinct intent

5. **Actionable Recommendations**
   - "Merge these pages" — when nearly identical
   - "Add canonical tag" — when one is clearly better
   - "Differentiate focus" — when intent differs
   - "Update titles to be distinct" — quick fix

6. **Export Options**
   - Copy results
   - Download CSV
   - Print-friendly view

### Version 2 Features

7. **Specific Keyword Check**
   - "Which pages on my site target [keyword]?"
   - Useful for pre-publish checks

8. **Historical Comparison**
   - Save results, compare over time
   - "You fixed 3 issues, 2 new ones appeared"

9. **Search Console Integration**
   - Pull actual ranking data
   - Show "these pages are both ranking #15-25 for same term"
   - Much more accurate than guessing

10. **Bulk Fix Suggestions**
    - Generate redirect map
    - Suggest canonical tag code
    - Priority queue by traffic impact

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| HTML Parsing | Cheerio (npm) | Free |
| Styling | Tailwind CSS | Free |
| Text Analysis | Custom JS | Free |
| Database | None for MVP | Free |
| AI/APIs | None required | Free |

**Total recurring cost: $0**

### Key NPM Packages (All Free)

```bash
npm install cheerio        # HTML parsing
npm install stopword       # Remove common words  
npm install fast-xml-parser # Parse sitemaps
```

### Frontend
- **Framework:** Next.js
- **Styling:** Tailwind
- **Key UI Components:**
  - URL input with domain validation
  - Progress indicator during crawl
  - Sortable/filterable results table
  - Expandable cards for each conflict
  - Copy/export buttons

### Backend / Processing

**API Route Flow:**
```
1. Receive domain or sitemap URL
2. If domain: fetch robots.txt, find sitemap, or crawl from homepage
3. If sitemap: parse XML, get page URLs
4. For each page (up to limit):
   - Fetch HTML
   - Extract title, H1, meta description, body text
   - Extract keywords using TF-IDF approach
5. Compare all pages pairwise
6. Group by conflicting keywords
7. Score severity
8. Return structured results
```

**Rate Limiting:**
- Crawl with delays (don't hammer servers)
- 100ms between requests minimum
- Timeout after 30 seconds per page

### Content Analysis Approach

**100% free, no-API approach:**

```javascript
// For each page, extract keyword profile
function extractKeywords(html) {
  const $ = cheerio.load(html);
  
  const title = $('title').text();
  const h1 = $('h1').first().text();
  const meta = $('meta[name="description"]').attr('content');
  const body = $('main, article, .content').text().slice(0, 2000);
  
  // Weight: title keywords 5x, h1 4x, meta 3x, body 1x
  // Remove stopwords, count frequency
  // Return top 10-15 keywords with weights
}

// Compare two pages
function calculateOverlap(pageA, pageB) {
  // Compare primary keywords (title/H1)
  // Compare secondary keywords (body)
  // Return similarity score 0-100
}
```

### Data Storage

**MVP:** No database — process on demand, return results immediately.

**Later (Free Tiers):**
- Vercel KV for caching recent crawls
- Supabase free tier for user accounts and history

---

## UX Details That Matter

### Results Presentation

**Don't just list conflicts — make them actionable:**

```
🔴 HIGH PRIORITY: "shopify seo guide"

Page 1: /blog/ultimate-shopify-seo-guide
  Title: "Ultimate Shopify SEO Guide (2024)"
  
Page 2: /blog/shopify-seo-tips-beginners  
  Title: "Shopify SEO Tips for Beginners"

Why it's a problem: Both pages have "shopify seo" in title and H1. 
Google is likely splitting authority between them.

Recommended fix: Merge into one comprehensive guide. Redirect the 
weaker page (check analytics for traffic) to the stronger one.

[Copy redirect code] [View pages side-by-side]
```

### Severity Visual Indicators
- 🔴 High — Immediate action needed
- 🟡 Medium — Should address soon
- 🟢 Low — Minor overlap, monitor

### Empty State
"No cannibalization detected! Your content is well-differentiated."
(Still valuable — peace of mind)

---

## Making It Look Credible

### Trust Builders
- Explain the methodology clearly
- Show a sample report before requiring input
- Link to resources explaining what cannibalization is

### Branding
- "Built by Jesse — I've fixed cannibalization issues that doubled page rankings"
- Show before/after case study if you have one
- Your expertise in SEO evident in the recommendations

---

## SEO Strategy for the Tool Itself

### Target Keywords
- "keyword cannibalization checker"
- "keyword cannibalization tool"
- "find keyword cannibalization"
- "cannibalization checker free"
- "SEO cannibalization tool"
- "check keyword cannibalization"

### Content Hub (See Blog Strategy Below)
Build supporting content that links to and from the tool.

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "Keyword Cannibalization: The Complete Guide to Finding and Fixing It"

**URL:** /blog/keyword-cannibalization-guide

**Target length:** 2,500-3,500 words

**Structure:**
1. What is keyword cannibalization (with visual example)
2. Why it kills your rankings (real impact data)
3. Common causes (duplicate content, poor planning, site growth)
4. How to identify it (manual method + introduce your tool)
5. How to fix each type:
   - Merge and redirect
   - Canonical tags
   - Differentiate intent
   - De-optimize one page
6. Prevention strategies
7. Case study: How you fixed cannibalization on your own site
8. Link to tool: "Check your site in 60 seconds →"

**Internal links from this article:**
- Link to Internal Link Finder tool (related concept)
- Link to any other SEO content you have

### Supporting Blog Posts

**Post 1: "How to Merge Two Blog Posts Without Losing SEO Value"**
- URL: /blog/merge-blog-posts-seo
- Length: 1,200-1,500 words
- Covers: When to merge, redirect setup, content consolidation
- Links to: Cannibalization tool, pillar article

**Post 2: "Canonical Tags Explained: When and How to Use Them"**
- URL: /blog/canonical-tags-guide
- Length: 1,500-2,000 words
- Covers: What canonicals do, implementation, common mistakes
- Links to: Cannibalization tool (canonical is a fix option)

**Post 3: "5 Signs Your SEO Strategy is Hurting Itself"**
- URL: /blog/seo-mistakes-hurting-rankings
- Length: 1,500 words
- Covers: Cannibalization, orphan pages, thin content, over-optimization, poor internal links
- Links to: All your SEO tools

**Post 4: "I Found 12 Cannibalization Issues on My Site — Here's What Happened"**
- URL: /blog/keyword-cannibalization-case-study
- Length: 1,000-1,500 words
- Covers: Your real results, before/after data, process
- Links to: Cannibalization tool, pillar article
- **High value:** Personal case studies rank well and build trust

### Blog Post Template

Each supporting post should follow this structure:

```markdown
# [Title — Include Primary Keyword]

[Hook: 2-3 sentences on the problem]

[Quick answer/summary for skimmers]

## What is [Topic]?
[Definition, 2-3 paragraphs]

## Why It Matters
[Impact on rankings/traffic, data if possible]

## How to [Action]
[Step-by-step process]
[Screenshots or examples]

## Common Mistakes
[What people get wrong]

## Quick Solution
[Introduce your tool]

Try [Tool Name] — it finds [problem] automatically so you don't have to check manually.
[CTA button to tool]

## Related Reading
- [Link to pillar article]
- [Link to related tools]
```

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tool + pillar article | Core asset |
| 2 | Case study post | Social proof |
| 3 | Canonical tags guide | Supporting content |
| 4 | Merge blog posts guide | Supporting content |
| 5 | "5 SEO mistakes" roundup | Traffic + internal links |

### Promotion Strategy

1. **Announce on social** with screenshot of tool in action
2. **Post in SEO communities** (r/SEO, r/bigseo, Twitter) — share the pillar article, not just the tool
3. **Reach out to SEO newsletters** for inclusion
4. **Answer related questions** on Quora/Reddit linking to your guide
5. **Create a short video** showing how to use it (embed in pillar article)

---

## Lead Capture Strategy

### Free Tier
- Analyze up to 100 pages
- Basic conflict detection
- Export to CSV

### Email Capture Triggers
- "Save your report" — requires email
- "Analyze more than 100 pages" — requires email
- "Get notified when we add Search Console integration" — requires email

---

## Development Phases

### Phase 1: Core MVP (1-2 weeks)
- [ ] URL/sitemap input form
- [ ] Sitemap parser
- [ ] Page crawler with rate limiting
- [ ] Keyword extraction from title, H1, meta, body
- [ ] Pairwise comparison algorithm
- [ ] Results table with severity scores
- [ ] Basic recommendations
- [ ] Copy/export functionality

### Phase 2: Polish (1 week)
- [ ] Progress indicator during crawl
- [ ] Expandable conflict cards
- [ ] Side-by-side page comparison view
- [ ] Mobile responsiveness
- [ ] Landing page with SEO optimization

### Phase 3: Content Launch (1 week)
- [ ] Publish pillar article
- [ ] Publish case study
- [ ] Internal link from/to other tools
- [ ] Social promotion

### Phase 4: Growth Features (Future)
- [ ] Specific keyword search
- [ ] Search Console integration
- [ ] Saved reports with comparison
- [ ] Email notifications

---

## Open Questions

1. **Page limit:** 100 pages free is generous — maybe 50 to encourage email signup?
2. **Crawl depth:** From homepage, how many levels deep without sitemap?
3. **JavaScript sites:** Punt for MVP? Most blogs are static anyway.
4. **Competitor analysis:** Allow checking other sites? (Good feature, potential abuse)

---

## Success Metrics

- **Usage:** Sites analyzed per week
- **Engagement:** % who export or click recommendations
- **Content:** Pillar article ranking for "keyword cannibalization"
- **Conversion:** Email capture rate
- **Trust:** Screenshots shared, mentions in communities
