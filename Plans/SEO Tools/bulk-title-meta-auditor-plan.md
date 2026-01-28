# Bulk Title/Meta Auditor — Build Plan

## Quick Summary

**What:** A free tool that crawls your site and audits every page's title tag and meta description. Flags issues: too long, too short, duplicate, missing, keyword stuffing.

**Cost to build & run:** $0 — uses only free tools and no paid APIs.

**Tech:** Next.js + Cheerio. Reuses same crawler as your other tools.

**Differentiator:** Simple, fast, exportable. No $100/month subscription required to see your own meta tags.

---

## The Core Problem

Title tags and meta descriptions are SEO basics, but:
- Most site owners have never audited them across their whole site
- Duplicates creep in as sites grow
- CMS defaults create generic or missing metas
- Checking manually is tedious (open page → view source → repeat 200 times)
- Expensive tools bury this in complex dashboards

**Your tool makes the invisible visible in 30 seconds.**

This is a "hygiene" tool — not sexy, but everyone needs it, and they need it regularly.

---

## What Makes This Tool Different

**Existing tools:**
- Screaming Frog — Powerful but desktop-only, overwhelming interface
- Ahrefs/SEMrush — Buried in $99+/month subscriptions
- Random free checkers — Single page only, not bulk

**Your tool:**
- Paste sitemap → get full audit in one click
- Clean table format, sortable and filterable
- Export to CSV for your spreadsheet
- Free, unlimited pages (within reason)

**Positioning:** "Audit every title and meta description on your site. Free. 30 seconds."

---

## Core User Flow

### Step 1: Input
User provides:
- Sitemap URL (preferred — faster, more complete)
- Or domain URL (crawl from homepage)
- (Optional) Filter to specific sections (/blog/, /products/)

### Step 2: Crawl
Tool fetches each page and extracts:
- URL
- Title tag
- Meta description
- H1 (for comparison)

### Step 3: Analysis
For each page, check:
- Title: present? length? duplicate? keyword stuffing?
- Meta: present? length? duplicate?
- Title vs H1 match (often indicates template issues)

### Step 4: Output — Audit Report

```
TITLE & META AUDIT
digitaljesse.com — 156 pages analyzed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SUMMARY

✓ 127 pages — No issues
⚠ 18 pages — Warnings (minor issues)
✗ 11 pages — Errors (needs attention)

ISSUES BREAKDOWN:
• Missing title: 2 pages
• Missing meta description: 8 pages
• Title too long (>60 chars): 12 pages
• Meta too long (>160 chars): 6 pages
• Title too short (<30 chars): 3 pages
• Meta too short (<70 chars): 5 pages
• Duplicate titles: 4 pages (2 groups)
• Duplicate metas: 6 pages (3 groups)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✗ ERRORS (Fix these first)

┌──────────────────────────────────────────────────────────────────────┐
│ MISSING TITLE                                                        │
├──────────────────────────────────────────────────────────────────────┤
│ /blog/draft-post-old                                                 │
│ Title: (none)                                                        │
│ Meta: "This is an old draft that..."                                 │
│ → Add a title tag or consider removing this page                     │
├──────────────────────────────────────────────────────────────────────┤
│ /products/widget-123                                                 │
│ Title: (none)                                                        │
│ Meta: (none)                                                         │
│ → This page has no SEO metadata at all                               │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│ DUPLICATE TITLES (2 pages sharing same title)                        │
├──────────────────────────────────────────────────────────────────────┤
│ Title: "Blog | DigitalJesse"                                         │
│                                                                      │
│ • /blog/page/2                                                       │
│ • /blog/page/3                                                       │
│ • /blog/page/4                                                       │
│                                                                      │
│ → Pagination pages often have this issue. Consider adding            │
│   "Page 2", "Page 3" etc. or using canonical tags.                   │
└──────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ WARNINGS (Should fix when possible)

┌──────────────────────────────────────────────────────────────────────┐
│ TITLE TOO LONG                                                       │
├──────────────────────────────────────────────────────────────────────┤
│ /blog/complete-guide-to-shopify-seo-for-beginners-2024               │
│                                                                      │
│ Title (73 chars): "The Complete Guide to Shopify SEO for             │
│ Beginners: Everything You Need to Know in 2024"                      │
│                                                                      │
│ Google will truncate to: "The Complete Guide to Shopify SEO for      │
│ Beginners: Everything You Need to..."                                │
│                                                                      │
│ → Shorten to under 60 characters for full display                    │
└──────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 FULL PAGE LIST

[Filter: All ▼] [Sort: Issues first ▼] [Search: ________]

| URL | Title | Title Len | Meta | Meta Len | Issues |
|-----|-------|-----------|------|----------|--------|
| /blog/seo-guide | Complete SEO G... | 58 ✓ | Learn everything... | 142 ✓ | None |
| /blog/old-post | Blog | Digital... | 18 ⚠ | (missing) | 2 issues |
| ... | ... | ... | ... | ... | ... |

[Export CSV] [Export JSON] [Copy Table]
```

---

## Feature Set

### MVP (Launch Version)

1. **Sitemap/Domain Input**
   - Parse sitemap XML
   - Or crawl from homepage
   - Handle common sitemap locations (/sitemap.xml, /sitemap_index.xml)

2. **Metadata Extraction**
   - Title tag
   - Meta description
   - H1 heading (for comparison)
   - URL

3. **Issue Detection**
   
   **Errors (Red):**
   - Missing title tag
   - Missing meta description
   - Duplicate title (exact match with another page)
   - Duplicate meta description
   
   **Warnings (Yellow):**
   - Title too long (>60 characters)
   - Title too short (<30 characters)
   - Meta too long (>160 characters)
   - Meta too short (<70 characters)
   - Title matches H1 exactly (often indicates lazy templating)

4. **Summary Statistics**
   - Total pages analyzed
   - Pages with errors
   - Pages with warnings
   - Pages with no issues
   - Issue breakdown by type

5. **Sortable/Filterable Table**
   - Sort by: URL, title length, meta length, issue count
   - Filter by: errors only, warnings only, specific issue type
   - Search by URL or title content

6. **Export Options**
   - CSV download (for spreadsheets)
   - JSON download (for developers)
   - Copy table to clipboard

### Version 2 Features

7. **SERP Preview**
   - Show how each page appears in Google
   - Visual truncation indicator
   - Mobile vs desktop preview toggle

8. **Bulk Edit Suggestions**
   - AI-powered title suggestions (optional upgrade)
   - "Generate meta description" button
   - Template-based fixes for common issues

9. **Competitor Comparison**
   - Compare your metas to top-ranking pages for same keywords
   - "Your title is 45 chars, competitors average 55"

10. **Historical Tracking**
    - Save audits over time
    - "You fixed 8 issues since last audit"
    - Track improvements

11. **CMS-Specific Export**
    - Format for Yoast bulk import
    - Shopify CSV format
    - WordPress XML format

12. **Scheduled Audits**
    - Weekly email with new issues
    - Monitor for regressions

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| HTML Parsing | Cheerio (npm) | Free |
| XML Parsing | fast-xml-parser | Free |
| Styling | Tailwind CSS | Free |
| Database | None for MVP | Free |

**Total recurring cost: $0**

### Key NPM Packages

```bash
npm install cheerio           # HTML parsing
npm install fast-xml-parser   # Sitemap parsing
```

### Shared Infrastructure

This tool reuses the same crawler from your other tools:
- Sitemap parser (same as Internal Link Finder)
- Page fetcher with rate limiting (same as all tools)
- HTML parser (same Cheerio setup)

**New logic specific to this tool:**
- Metadata extraction
- Issue detection rules
- Duplicate detection across pages

### Backend / Processing

**API Route Flow:**
```
1. Receive sitemap URL or domain
2. Parse sitemap to get all page URLs
3. For each page:
   - Fetch HTML
   - Extract title, meta description, H1
   - Store in results array
4. Post-process:
   - Check each page against rules
   - Find duplicates (compare all titles, all metas)
   - Calculate summary stats
5. Return structured results
```

### Metadata Extraction

```javascript
function extractMetadata(html, url) {
  const $ = cheerio.load(html);
  
  return {
    url,
    title: $('title').text().trim() || null,
    titleLength: $('title').text().trim().length,
    metaDescription: $('meta[name="description"]').attr('content')?.trim() || null,
    metaLength: $('meta[name="description"]').attr('content')?.trim().length || 0,
    h1: $('h1').first().text().trim() || null,
  };
}
```

### Issue Detection Rules

```javascript
const rules = {
  errors: [
    {
      id: 'missing-title',
      check: (page) => !page.title,
      message: 'Missing title tag',
      fix: 'Add a unique, descriptive title tag'
    },
    {
      id: 'missing-meta',
      check: (page) => !page.metaDescription,
      message: 'Missing meta description',
      fix: 'Add a compelling meta description (120-160 characters)'
    },
  ],
  warnings: [
    {
      id: 'title-too-long',
      check: (page) => page.titleLength > 60,
      message: `Title too long (${page.titleLength} chars)`,
      fix: 'Shorten to under 60 characters to avoid truncation'
    },
    {
      id: 'title-too-short',
      check: (page) => page.title && page.titleLength < 30,
      message: `Title too short (${page.titleLength} chars)`,
      fix: 'Expand to 30-60 characters for better visibility'
    },
    {
      id: 'meta-too-long',
      check: (page) => page.metaLength > 160,
      message: `Meta description too long (${page.metaLength} chars)`,
      fix: 'Shorten to under 160 characters'
    },
    {
      id: 'meta-too-short',
      check: (page) => page.metaDescription && page.metaLength < 70,
      message: `Meta description too short (${page.metaLength} chars)`,
      fix: 'Expand to 70-160 characters for better CTR'
    },
    {
      id: 'title-h1-match',
      check: (page) => page.title && page.h1 && 
                       page.title.toLowerCase() === page.h1.toLowerCase(),
      message: 'Title matches H1 exactly',
      fix: 'Vary your title and H1 to target more keyword variations'
    },
  ]
};
```

### Duplicate Detection

```javascript
function findDuplicates(pages, field) {
  const groups = {};
  
  pages.forEach(page => {
    const value = page[field]?.toLowerCase().trim();
    if (!value) return;
    
    if (!groups[value]) groups[value] = [];
    groups[value].push(page.url);
  });
  
  // Return only groups with more than one page
  return Object.entries(groups)
    .filter(([_, urls]) => urls.length > 1)
    .map(([value, urls]) => ({ value, urls, count: urls.length }));
}
```

---

## UX Details That Matter

### Results Presentation

**Prioritize actionable issues:**
1. Errors first (things that are definitely wrong)
2. Warnings second (things that could be better)
3. Clean pages last (just for reference)

**Make duplicates obvious:**
- Group duplicate pages together
- Show the shared title/meta once, list all URLs underneath
- Common cause: pagination, tag pages, category pages

### Character Count Visualization

For each title/meta, show:
```
Title: "Complete Guide to Shopify SEO" 
       [████████████████████░░░░░░░░░░] 32/60 chars ✓
       
Title: "The Complete and Comprehensive Guide to Shopify SEO..."
       [████████████████████████████████████] 73/60 chars ⚠
                                        ↑ truncates here
```

### Quick Filters

- "Show only errors" — for prioritizing fixes
- "Show only missing metas" — common task
- "Show only duplicates" — another common task
- "Show clean pages" — verify your good pages

### Table Features

- Click column header to sort
- Sticky header when scrolling
- URL links open in new tab
- Hover to see full title/meta (truncated in table)

---

## Making It Look Credible

### Trust Builders
- Show character count thresholds and why they matter
- Link to Google's guidelines
- Explain each issue type

### Branding
- "Built by Jesse — I run this on my sites before every launch"
- Clean, professional interface
- Fast results

---

## SEO Strategy for the Tool Itself

### Target Keywords
- "bulk title tag checker"
- "meta description audit tool"
- "title tag analyzer"
- "bulk meta tag checker"
- "SEO title checker"
- "meta description length checker"
- "duplicate title finder"
- "site meta audit"

### Low Competition, Consistent Volume
These are utility searches — people need this tool and search for it regularly.

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "Title Tags & Meta Descriptions: The Complete SEO Guide (With Audit Tool)"

**URL:** /blog/title-meta-description-guide

**Target length:** 3,000-3,500 words

**Structure:**
1. What are title tags and meta descriptions (basics)
2. Why they matter for SEO and CTR
3. Optimal lengths (with data)
4. How to write compelling titles
5. How to write click-worthy metas
6. Common mistakes:
   - Too long/short
   - Duplicates
   - Missing
   - Keyword stuffing
   - Template defaults
7. How to audit your site manually
8. Introduce the tool: "Or audit your entire site in 30 seconds →"
9. Fixing issues in different CMS platforms
10. Advanced: Title tag formulas that work

### Supporting Blog Posts

**Post 1: "The Perfect Title Tag: Length, Format & Examples"**
- URL: /blog/perfect-title-tag
- Length: 1,500 words
- Covers: Optimal length, formulas, before/after examples
- Links to: Audit tool, pillar article

**Post 2: "Meta Description Best Practices (50+ Examples)"**
- URL: /blog/meta-description-examples
- Length: 2,000 words
- Covers: What works, examples by industry, templates
- Links to: Audit tool, pillar article
- **High value:** Example posts perform well

**Post 3: "How to Fix Duplicate Title Tags in WordPress/Shopify/Webflow"**
- URL: /blog/fix-duplicate-title-tags
- Length: 1,500 words
- Covers: Platform-specific fixes
- Links to: Audit tool

**Post 4: "Why Your Meta Descriptions Aren't Showing in Google"**
- URL: /blog/meta-descriptions-not-showing
- Length: 1,200 words
- Covers: Why Google rewrites metas, how to prevent it
- Links to: Audit tool, pillar article
- **Answers a common frustrated search**

**Post 5: "Title Tag vs H1: What's the Difference and Does It Matter?"**
- URL: /blog/title-tag-vs-h1
- Length: 1,200 words
- Covers: Difference explained, best practices, common mistakes
- Links to: Audit tool (flags when they match exactly)

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tool + pillar article | Core asset |
| 2 | "Perfect Title Tag" post | Focused keyword |
| 3 | "Meta Description Examples" post | High traffic list post |
| 4 | "Fix Duplicate Titles" post | Platform-specific help |
| 5 | "Title vs H1" post | Related concept |

---

## Lead Capture Strategy

### Free Tier
- Analyze unlimited pages (reasonable limit, say 500)
- Full audit report
- Export to CSV

### Email Capture Triggers
- "Save your audit to your account" — requires email
- "Get weekly audit reports" — requires email
- "Compare to previous audits" — requires email
- "Generate AI title suggestions" — requires email (future feature)

---

## Development Phases

### Phase 1: Core MVP (3-5 days)
- [ ] Sitemap/URL input form
- [ ] Sitemap parser
- [ ] Page crawler (reuse existing)
- [ ] Metadata extraction
- [ ] Issue detection rules
- [ ] Duplicate detection
- [ ] Summary stats
- [ ] Results table with sorting

### Phase 2: Polish (2-3 days)
- [ ] Character count visualizations
- [ ] Filters (errors, warnings, clean)
- [ ] Export to CSV
- [ ] Truncation preview
- [ ] Mobile responsiveness
- [ ] Landing page

### Phase 3: Content Launch (1 week)
- [ ] Publish pillar article
- [ ] Publish title tag post
- [ ] Publish examples post
- [ ] Social promotion

### Phase 4: Enhancements (Future)
- [ ] SERP preview per page
- [ ] Historical comparison
- [ ] AI title suggestions
- [ ] CMS-specific exports

---

## Open Questions

1. **Page limit:** 500 pages free seems reasonable. Above that, require email?
2. **Caching:** Cache audit for 24 hours? Same sitemap = same results.
3. **OG tags:** Also audit og:title and og:description for social?
4. **Canonical tags:** Flag pages with canonicals pointing elsewhere?

---

## Success Metrics

- **Usage:** Audits run per week
- **Engagement:** % who export or filter
- **Repeat usage:** Same user returning (this is a recurring need)
- **Content:** Pillar article ranking
- **Conversion:** Email capture rate
