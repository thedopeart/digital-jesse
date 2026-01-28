# Topical Authority Map — Build Plan

## Quick Summary

**What:** A free tool that crawls a website and visualizes all content as an interactive topic cluster diagram. Shows topical coverage, gaps, orphan pages, and how well content connects.

**Cost to build & run:** $0 — uses only free tools and no paid APIs.

**Tech:** Next.js + Cheerio + D3.js (or similar) for visualization. No AI APIs required.

**Differentiator:** Makes the abstract concept of "topical authority" visual and concrete. Nobody does this well for free.

---

## The Core Problem

"Topical authority" is the most-discussed, least-understood concept in modern SEO:
- Everyone knows you should "build topical authority"
- Nobody can actually see what their current authority looks like
- It's hard to identify gaps without a visual overview
- Content strategies are built blindly without seeing the full picture

**Your tool makes the invisible visible.**

This is the "wow factor" tool. When someone sees their content mapped as an interactive diagram, they understand their site in a new way. It's the tool people screenshot and share.

---

## What Makes This Tool Different

**Existing tools:** 
- Screaming Frog can export data, but no visualization
- Expensive enterprise tools have this buried in complex dashboards
- Most site maps are flat lists, not topical clusters

**Your tool:** 
- One input → beautiful interactive visualization
- Immediately shows topical clusters, orphans, and gaps
- Shareable/embeddable output

**Positioning:** "See your content strategy. Literally."

---

## Core User Flow

### Step 1: Input
User provides:
- Domain URL or sitemap URL
- (Optional) Filter to blog/content section only

### Step 2: Crawl
Tool fetches and analyzes:
- All page URLs
- Page titles
- H1 headings
- Meta descriptions
- Internal links between pages
- Primary topic/keywords per page

### Step 3: Analysis
- Group pages into topic clusters based on keyword similarity
- Identify internal link relationships
- Find orphan pages (no internal links pointing to them)
- Find hub pages (many outbound links)
- Calculate cluster coverage and depth

### Step 4: Output — Interactive Visualization

**Visual Map:**
```
                    ┌─────────────┐
                    │   SITE      │
                    │   ROOT      │
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  SHOPIFY    │ │    SEO      │ │  MARKETING  │
    │  CLUSTER    │ │  CLUSTER    │ │  CLUSTER    │
    │  (12 pages) │ │  (8 pages)  │ │  (5 pages)  │
    └──────┬──────┘ └──────┬──────┘ └─────────────┘
           │               │
     ┌─────┼─────┐    ┌────┼────┐
     ▼     ▼     ▼    ▼    ▼    ▼
   [page][page][page][page][page][page]
```

**Interactive Features:**
- Click cluster to expand/collapse
- Hover page to see connections
- Orphan pages highlighted in red
- Weak connections shown as dotted lines
- Filter by cluster, connection strength

**Data Panel (alongside visual):**
- Total pages analyzed
- Number of topic clusters identified
- Orphan pages list
- Top hub pages
- Cluster health scores

---

## Feature Set

### MVP (Launch Version)

1. **Site Crawl**
   - Input domain or sitemap
   - Crawl up to 200 pages (free tier)
   - Respect robots.txt
   - Rate limiting to not hammer servers

2. **Topic Clustering**
   - Extract keywords from each page
   - Group pages by keyword similarity
   - Identify natural topic clusters
   - Name clusters based on dominant keywords

3. **Link Mapping**
   - Track internal links between pages
   - Identify which pages link to which
   - Calculate link depth from homepage

4. **Orphan Detection**
   - Find pages with zero internal links pointing to them
   - These are "invisible" to both users and Google

5. **Interactive Visualization**
   - Force-directed graph or tree diagram
   - Zoomable and pannable
   - Color-coded by cluster
   - Click to see page details

6. **Summary Stats**
   - Total pages, clusters, orphans
   - Average internal links per page
   - Deepest page (clicks from homepage)

### Version 2 Features

7. **Gap Analysis**
   - "Your SEO cluster has 12 pages, but competitors average 25"
   - Identify missing subtopics within clusters

8. **Content Recommendations**
   - "Your Shopify cluster needs a page about [topic]"
   - Based on common subtopics in similar sites

9. **Export Options**
   - Download as PNG/SVG
   - Export data as CSV
   - Embed code for sharing

10. **Historical Comparison**
    - Save snapshots
    - "You added 8 pages to your SEO cluster since last month"

11. **Competitor Comparison**
    - Map your site vs competitor
    - Side-by-side topical coverage

12. **Search Console Integration**
    - Overlay traffic data on the map
    - See which clusters drive traffic
    - Identify underperforming clusters

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| HTML Parsing | Cheerio (npm) | Free |
| Visualization | D3.js or vis.js | Free |
| Styling | Tailwind CSS | Free |
| Text Analysis | Custom JS (TF-IDF) | Free |
| Database | None for MVP | Free |
| AI/APIs | None required | Free |

**Total recurring cost: $0**

### Key NPM Packages (All Free)

```bash
npm install cheerio           # HTML parsing
npm install stopword          # Remove common words
npm install d3                # Visualization (or)
npm install vis-network       # Alternative visualization
npm install fast-xml-parser   # Parse sitemaps
```

### Frontend

**Visualization Options:**

1. **D3.js Force-Directed Graph**
   - Most flexible, best for complex networks
   - Steeper learning curve
   - Looks impressive

2. **vis.js Network**
   - Easier to implement
   - Good interactivity out of the box
   - Slightly less customizable

3. **React Flow**
   - React-native, easy to style
   - Good for tree structures
   - May need customization for clusters

**Recommendation:** Start with vis.js for faster MVP, migrate to D3 if you need more control.

**Key UI Components:**
- URL input form
- Progress indicator (crawling takes time)
- Main visualization canvas
- Sidebar with stats and filters
- Page detail modal on click
- Export buttons

### Backend / Processing

**API Route Flow:**
```
1. Receive domain or sitemap URL
2. If sitemap exists: parse and get all URLs
3. If not: crawl from homepage, follow internal links
4. For each page (up to limit):
   - Fetch HTML
   - Extract: title, H1, meta, internal links, body text
   - Extract keywords using TF-IDF
5. Build link graph (page A → page B)
6. Cluster pages by keyword similarity
7. Identify orphans (pages with no inbound internal links)
8. Return structured data for visualization
```

**Crawl Logic:**
```javascript
async function crawlSite(startUrl, maxPages = 200) {
  const visited = new Set();
  const queue = [startUrl];
  const pages = [];
  
  while (queue.length > 0 && pages.length < maxPages) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    
    visited.add(url);
    const pageData = await fetchAndParse(url);
    pages.push(pageData);
    
    // Add internal links to queue
    pageData.internalLinks.forEach(link => {
      if (!visited.has(link)) queue.push(link);
    });
    
    // Rate limit
    await sleep(100);
  }
  
  return pages;
}
```

### Topic Clustering Approach

**100% free, no-API approach:**

```javascript
// 1. Extract keywords from each page
function extractKeywords(page) {
  // Combine title, H1, meta, URL slug, body text
  // Remove stop words
  // Calculate TF-IDF scores
  // Return top 10 keywords
}

// 2. Calculate similarity between pages
function calculateSimilarity(pageA, pageB) {
  // Compare keyword sets
  // Jaccard similarity or cosine similarity
  // Return score 0-1
}

// 3. Cluster pages
function clusterPages(pages, threshold = 0.3) {
  // Simple approach: hierarchical clustering
  // Or: find pages with >threshold similarity
  // Group into clusters
  // Name cluster by most common keywords
}
```

**Cluster Naming:**
```javascript
function nameCluster(pages) {
  // Aggregate all keywords from pages in cluster
  // Find top 2-3 most common terms
  // Return as cluster name: "Shopify SEO", "Email Marketing", etc.
}
```

### Link Graph Structure

```javascript
// Data structure for visualization
const graphData = {
  nodes: [
    { id: 'page-1', url: '/blog/seo-guide', title: 'SEO Guide', cluster: 'seo', isOrphan: false },
    { id: 'page-2', url: '/blog/keyword-research', title: 'Keyword Research', cluster: 'seo', isOrphan: false },
    // ...
  ],
  edges: [
    { from: 'page-1', to: 'page-2' },
    { from: 'page-2', to: 'page-1' },
    // ...
  ],
  clusters: [
    { id: 'seo', name: 'SEO', pageCount: 12, color: '#4F46E5' },
    { id: 'shopify', name: 'Shopify', pageCount: 8, color: '#10B981' },
    // ...
  ]
};
```

### Data Storage

**MVP:** No database — generate on demand, display immediately.

**Challenge:** Crawling takes time (30 seconds - 2 minutes for larger sites).

**Options:**
1. **Show progress, stream results** — Best UX, more complex
2. **Generate and cache** — Store result for 24 hours, instant on revisit
3. **Background job with email** — "We'll email you when ready"

**Recommendation:** Option 1 for MVP. Show visualization building in real-time as pages are crawled. This is actually more engaging than a loading spinner.

---

## UX Details That Matter

### Visualization Design

**Color Coding:**
- Each cluster gets a distinct color
- Orphan pages: Red border or red color
- Hub pages (many links): Larger nodes
- Weak connections: Dotted/faded lines

**Interactivity:**
- Zoom with scroll
- Pan with drag
- Click node → show page details
- Click cluster → expand/focus
- Hover → highlight connections

**Layout:**
- Clusters should visually group together
- Homepage/main pages near center
- Orphans pushed to edges (visually "disconnected")

### Page Detail Modal

When user clicks a node:
```
┌──────────────────────────────────────────┐
│ /blog/shopify-seo-guide                  │
│                                          │
│ Title: Complete Shopify SEO Guide (2024) │
│ Cluster: SEO                             │
│                                          │
│ Inbound links: 5                         │
│   - /blog/seo-basics                     │
│   - /blog/ecommerce-seo                  │
│   - ...                                  │
│                                          │
│ Outbound links: 8                        │
│   - /blog/keyword-research               │
│   - /tools/seo-checker                   │
│   - ...                                  │
│                                          │
│ Keywords: shopify, seo, ecommerce, guide │
│                                          │
│ [View Page] [Copy URL]                   │
└──────────────────────────────────────────┘
```

### Summary Dashboard

Above or beside the visualization:

```
┌────────────────────────────────────────────────────┐
│ YOUR TOPICAL AUTHORITY MAP                         │
│                                                    │
│ 📊 156 pages analyzed                              │
│ 🗂️ 8 topic clusters identified                     │
│ ⚠️ 12 orphan pages (need internal links!)          │
│ 🔗 Average 4.2 internal links per page             │
│ 📍 Deepest page: 6 clicks from homepage            │
│                                                    │
│ CLUSTERS:                                          │
│ ████████████ SEO (42 pages)                        │
│ ████████ Shopify (28 pages)                        │
│ ██████ Marketing (21 pages)                        │
│ ████ Tools (15 pages)                              │
│ ... more                                           │
│                                                    │
│ [Export PNG] [Export CSV] [Share Map]              │
└────────────────────────────────────────────────────┘
```

### Loading/Progress Experience

```
Analyzing digitaljesse.com...

[████████████░░░░░░░░] 62%

✓ Found sitemap (156 pages)
✓ Crawled 97 pages
⟳ Extracting topics...

Pages discovered:
• /blog/seo-guide (SEO cluster)
• /blog/shopify-tips (Shopify cluster)
• /tools/keyword-checker (Tools cluster)
...
```

Real-time updates as crawl progresses. Possibly show the map building live as pages are added.

---

## Making It Look Credible

### The "Wow" Factor
This tool's power is visual. A well-designed map makes you look sophisticated. Invest in making the visualization beautiful.

### Trust Builders
- Show your own site's map as the example
- "Masterpiece Finder: 3,700 pages, 15 topic clusters, 0 orphans"
- Methodology explanation

### Branding
- "Built by Jesse — I mapped 3,700 pages of art content into topic clusters. Here's how."
- Link to case study on Masterpiece Finder's topical authority strategy

---

## SEO Strategy for the Tool Itself

### Target Keywords
- "topical authority tool"
- "topic cluster tool"
- "content cluster visualization"
- "site content map"
- "topical map generator"
- "visualize website structure"
- "content audit tool free"

### The Visual Advantage
This tool produces shareable visuals. Every time someone tweets their map, you get exposure.

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "Topical Authority Explained: How to Build It (With Free Mapping Tool)"

**URL:** /blog/topical-authority-guide

**Target length:** 3,500-4,500 words

**Structure:**
1. What is topical authority (clear definition, examples)
2. Why Google rewards topical authority
3. Topic clusters explained (pillar + supporting content)
4. How to audit your current topical coverage (manual method)
5. Building your topic cluster strategy
6. Internal linking within clusters
7. Measuring topical authority
8. Case study: How Masterpiece Finder built authority in the art niche
9. Introduce the tool: "Map your topical authority →"
10. Common mistakes (thin clusters, orphan pages, missing pillars)

**Internal links:**
- Link to Internal Link Finder (related: connecting clusters)
- Link to Cannibalization Checker (related: cluster confusion)
- Link to Content Brief Generator (related: expanding clusters)

### Supporting Blog Posts

**Post 1: "Topic Clusters 101: The Content Strategy That Actually Works"**
- URL: /blog/topic-clusters-guide
- Length: 2,000 words
- Covers: What topic clusters are, pillar vs cluster content, examples
- Links to: Topical Authority Map tool, pillar article

**Post 2: "How to Find Orphan Pages on Your Website (And Fix Them)"**
- URL: /blog/orphan-pages-seo
- Length: 1,500 words
- Covers: What orphan pages are, why they matter, how to find them manually
- Links to: Topical Authority Map (shows orphans automatically), Internal Link Finder

**Post 3: "Content Gap Analysis: Finding What's Missing From Your Site"**
- URL: /blog/content-gap-analysis
- Length: 2,000 words
- Covers: How to identify missing topics, competitor analysis, filling gaps
- Links to: Topical Authority Map, Content Brief Generator

**Post 4: "How I Built Topical Authority With 3,700 Pages (Masterpiece Finder Case Study)"**
- URL: /blog/topical-authority-case-study
- Length: 2,500 words
- Covers: Your actual strategy, numbers, results, mistakes
- Includes: Screenshot of your own topical map
- Links to: Tool, pillar article
- **High value:** Case studies with real data are rare and valuable

**Post 5: "Pillar Pages: What They Are and How to Create One"**
- URL: /blog/pillar-pages-guide
- Length: 2,000 words
- Covers: Pillar page definition, structure, examples, linking strategy
- Links to: Topical Authority Map, Internal Link Finder

**Post 6: "The Content Audit Checklist (Free Template)"**
- URL: /blog/content-audit-checklist
- Length: 1,500 words
- Covers: How to audit your content, what to look for
- Includes: Downloadable checklist
- Links to: Topical Authority Map (automated audit), all other tools

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tool + pillar article | Core asset |
| 2 | Topic clusters guide | Foundational concept |
| 3 | Masterpiece Finder case study | Social proof + showcase |
| 4 | Orphan pages guide | Tool feature highlight |
| 5 | Pillar pages guide | Supporting content |
| 6 | Content audit checklist | Lead magnet + traffic |

### Visual Content Opportunities

This tool is inherently visual. Create:
- **Infographic:** "What Topical Authority Looks Like" — good vs bad examples
- **Twitter thread:** "I mapped my 3,700-page site. Here's what I learned." (with screenshots)
- **YouTube video:** Screen recording of using the tool, explaining the output
- **Before/after:** Show a site's map before and after fixing orphan pages

---

## Lead Capture Strategy

### Free Tier
- Analyze up to 200 pages
- Full visualization
- Basic stats and orphan detection

### Email Capture Triggers
- "Save your map to your account" — requires email
- "Analyze more than 200 pages" — requires email
- "Export high-resolution image" — requires email
- "Compare to a previous map" — requires email
- "Get notified when we add competitor comparison" — requires email

### Premium Tier (Future)
- Unlimited pages
- Historical comparisons
- Competitor analysis
- Search Console integration
- Priority crawling

---

## Development Phases

### Phase 1: Core MVP (2-3 weeks)
- [ ] URL/sitemap input form
- [ ] Site crawler with rate limiting
- [ ] Page parser (title, links, keywords)
- [ ] Basic topic clustering algorithm
- [ ] Internal link graph builder
- [ ] Orphan page detection
- [ ] Basic visualization (vis.js network)
- [ ] Summary stats panel

### Phase 2: Polish (1-2 weeks)
- [ ] Improve visualization aesthetics
- [ ] Click interactions (node details)
- [ ] Zoom/pan controls
- [ ] Progress indicator with live updates
- [ ] Mobile responsiveness (may need different view)
- [ ] Landing page with sample map

### Phase 3: Content Launch (1 week)
- [ ] Publish pillar article
- [ ] Publish case study with your own map
- [ ] Create shareable visual assets
- [ ] Social promotion

### Phase 4: Enhancements (Future)
- [ ] Export as PNG/SVG
- [ ] Export data as CSV
- [ ] Saved maps with comparison
- [ ] More clustering algorithms
- [ ] Gap analysis features

---

## Open Questions

1. **Page limit:** 200 seems generous. Maybe 100 for free tier?
2. **JavaScript sites:** Many modern sites need JS rendering. Punt for MVP?
3. **Clustering algorithm:** Simple keyword overlap, or something smarter?
4. **Visualization library:** D3 (powerful, complex) vs vis.js (easier, good enough)?
5. **Large sites:** At what point do you need a different visualization approach? (1000+ pages)

---

## Technical Challenges

### Crawl Performance
- 200 pages × 100ms minimum delay = 20+ seconds minimum
- Need to show progress, possibly stream results
- Consider web workers for parallel processing

### Visualization at Scale
- 200 nodes is manageable
- 500+ nodes needs careful layout optimization
- May need to collapse clusters by default, expand on click

### Clustering Quality
- Simple keyword matching works for most sites
- Might need manual cluster adjustment option
- Edge cases: pages that fit multiple clusters

---

## Differentiation Ideas

**Show the "story" of their content:**
- "Your SEO cluster is well-developed with 15 interconnected pages"
- "Your Marketing cluster is thin — only 3 pages, no pillar content"
- "These 5 pages are orphaned and need internal links"

**Actionable recommendations:**
- "Link your orphan pages to these relevant cluster pages"
- "Your Tools cluster needs a pillar page to tie it together"
- "These two clusters should cross-link more"

**Shareable output:**
- Easy screenshot / export
- "Analyzed by DigitalJesse.com" watermark (subtle)
- Embed code for showing map on their own site

---

## Success Metrics

- **Usage:** Sites analyzed per week
- **Engagement:** Time spent interacting with visualization
- **Virality:** Screenshots shared on social
- **Content:** Pillar article ranking for "topical authority"
- **Conversion:** Email capture rate
- **Backlinks:** Sites linking to the tool
