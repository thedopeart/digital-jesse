# Internal Link Finder Tool — Build Plan

## Quick Summary

**What:** A free tool that finds internal linking opportunities between pages on any website.

**Cost to build & run:** $0 — uses only free tools and no paid APIs.

**Tech:** Next.js + Cheerio + plain JavaScript text analysis. No AI APIs required.

**Differentiator:** Tells users exactly which phrase to use as anchor text, not just "these pages are related."

---

## The Core Problem

Internal linking is one of the highest-leverage SEO activities, yet almost nobody does it well because:

- It's tedious to manually review old content when publishing something new
- Most people forget what they've already written
- There's no simple tool that surfaces opportunities without requiring a $200/month subscription
- Content creators know they *should* do it but don't have a system

Your tool solves this by making internal linking effortless and visual.

---

## What Makes This Tool Different

Most SEO tools show you *that* you have internal linking problems. Yours tells you *exactly what to link and where*. It's prescriptive, not diagnostic.

**Positioning:** "Stop guessing which pages to link. Get specific recommendations in 30 seconds."

---

## Core User Flow

### Step 1: Input
User provides either:
- **Option A:** A single URL (new post they just published)
- **Option B:** Their domain/sitemap URL (for a full site audit)

### Step 2: Crawl
Tool fetches and analyzes:
- Page titles
- H1, H2, H3 headings
- Body text (first 2-3 paragraphs or full content)
- Existing internal links already on each page
- Meta descriptions

### Step 3: Analysis
For each page, extract:
- Primary topic/keywords (use keyword extraction or simple TF-IDF)
- Semantic themes
- Key phrases that could serve as anchor text

### Step 4: Output — Two Clear Sections

**"Pages that should link TO your new post"**
| Page | Suggested Anchor Text | Why |
|------|----------------------|-----|
| /blog/shopify-speed-tips | "internal linking strategy" | Mentions SEO in section 3 |
| /blog/seo-basics | "link building" | Directly relevant topic |

**"Pages your new post should link OUT to"**
| Your Text | Suggested Link | Why |
|-----------|---------------|-----|
| "...when optimizing images..." | /blog/image-compression-guide | Exact topic match |
| "...page speed matters..." | /blog/shopify-speed-tips | Related concept |

---

## Feature Set

### MVP (Launch Version)

1. **Single URL Analysis**
   - Paste URL of new content
   - Paste sitemap URL or domain
   - Get link recommendations in both directions

2. **Smart Anchor Text Suggestions**
   - Don't just say "link these pages"
   - Identify the specific phrase to use as anchor text
   - Highlight where in the content the link should go

3. **Relevance Scoring**
   - Show confidence level (High / Medium / Low)
   - Explain *why* each link makes sense (builds trust, teaches users)

4. **Copy-Friendly Output**
   - One-click copy for each recommendation
   - Export full list as CSV
   - Markdown format option for content teams

5. **Already Linked Detection**
   - Don't recommend links that already exist
   - Show "You're already linking to this page" where relevant

### Version 2 Features

6. **Full Site Audit Mode**
   - Crawl entire site, show all internal linking opportunities
   - Identify orphan pages (no internal links pointing to them)
   - Find pages with too few outbound internal links

7. **Priority Scoring**
   - Factor in page performance (if they connect Search Console)
   - "This page ranks #8 for 'shopify seo' — adding internal links could push it higher"

8. **Historical Tracking**
   - Save past analyses
   - "You added 5 of 12 recommended links — here's what's left"

9. **WordPress / Shopify Integrations**
   - Direct connection to pull content without manual sitemap entry
   - One-click "add this link" if technically feasible

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| HTML Parsing | Cheerio (npm) | Free |
| Styling | Tailwind CSS | Free |
| Text Analysis | Custom JS (TF-IDF) | Free |
| Database | None for MVP | Free |
| AI/APIs | None required | Free |

**Total recurring cost: $0**

No API keys needed. No usage-based billing. No OpenAI. Everything runs on your own code.

### Key NPM Packages (All Free)

```bash
npm install cheerio        # HTML parsing
npm install stopword       # Remove common words
npm install natural        # TF-IDF and tokenization (optional, can DIY)
```

### Frontend
- **Framework:** Next.js (you're already comfortable with it)
- **Styling:** Tailwind — clean, professional, fast to build
- **State:** React hooks, no need for Redux complexity
- **Key UI Components:**
  - URL input form with validation
  - Loading state with progress indicator (crawling can take time)
  - Results table with sorting/filtering
  - Copy buttons, export functionality

### Backend / Processing

**Option A: Client-Side + Serverless (Simpler)**
- Use a serverless function (Vercel Edge Functions or API routes) to:
  - Fetch the target URL content
  - Parse the sitemap XML
  - Fetch each page in the sitemap (with rate limiting)
  - Run analysis and return results
- Pros: Simpler architecture, no persistent backend
- Cons: May hit timeout limits on large sites

**Option B: Queue-Based (More Robust)**
- Submit job to backend queue
- Worker processes crawl asynchronously
- Results stored temporarily, user polls or gets notified
- Pros: Handles large sites, better UX
- Cons: More infrastructure to manage

**Recommendation:** Start with Option A, add queue system if needed later.

### Content Analysis Approach

**MVP uses 100% free, no-API approach. No OpenAI, no paid services, no usage costs.**

The entire analysis runs with pure JavaScript/Node.js:

```
1. Fetch page HTML using built-in fetch
2. Parse HTML with Cheerio (free npm package)
3. Extract text content, strip tags
4. Remove stop words (the, and, is, etc.)
5. Calculate word/phrase frequency (TF-IDF style)
6. Compare keyword overlap between pages
7. Score relevance based on shared terms
8. Find matching phrases for anchor text suggestions
```

This approach is 70-80% as effective as AI-powered analysis. Internal linking doesn't require semantic understanding — if two pages share words like "shopify," "speed," and "optimization," they're related. Simple keyword matching works great.

**Future V2 Upgrade (Optional):**
```
- Add embeddings API (OpenAI, Cohere, or free Hugging Face models)
- Enables semantic matching ("fast website" relates to "page speed")
- Only add this if users request smarter matching
- Cost would be minimal (~$0.01 per 100 pages)
```

**Anchor Text Extraction:**
- Scan the source page for phrases (2-5 words) that match the target page's topic
- Prioritize phrases that appear in headings or bold text
- Avoid suggesting anchor text that's already used for other links

### Data Storage

**MVP:** No database needed — process on demand, results displayed immediately, nothing persisted. Zero infrastructure cost.

**Later (Still Free Options):** 
- Vercel KV or Upstash Redis (free tier) for caching
- PlanetScale or Supabase (free tier) for user accounts
- Only add if you need saved history feature

---

## UX Details That Matter

### Loading Experience
Crawling takes time. Make it feel productive:
- Show progress: "Analyzing page 12 of 47..."
- Stream results as they're found (don't wait for full completion)
- Estimated time remaining

### Results Presentation
- **Don't overwhelm:** Show top 10 recommendations by default, expandable
- **Group intelligently:** By source page, by topic cluster, by priority
- **Make it scannable:** Use visual hierarchy, not walls of text

### Empty States
- No recommendations found? Explain why and suggest next steps
- Site has great internal linking already? Celebrate it (and suggest the audit tool)

### Error Handling
- URL not accessible? Clear message
- Sitemap not found? Offer to crawl from homepage
- Rate limited? Queue and notify

---

## Making It Look Credible

### Design Principles
- Clean, professional, not "free tool" aesthetic
- Fast — perceived performance matters
- Mobile-friendly (people will share links)

### Trust Builders
- Show your methodology (brief explanation of how it works)
- Display sample output before requiring input
- No email gate for basic usage (capture emails for advanced features)

### Branding
- "Built by Jesse — I've used internal linking to rank #5 for competitive keywords"
- Link to case study or example from Masterpiece Finder
- Your face/name visible, not anonymous tool

---

## SEO Strategy for the Tool Itself

### Target Keywords
- "internal link finder"
- "internal linking tool"
- "internal link opportunities"
- "find internal linking opportunities"
- "internal link checker"
- "site internal link analyzer"

### Content to Build Around It
1. **Landing page** optimized for primary keywords
2. **"How to Build an Internal Linking Strategy" guide** — links to tool as the solution
3. **"Internal Linking Mistakes" post** — problem-aware traffic
4. **Comparison post:** "Internal Linking Tools Compared" — own the narrative
5. **Case study:** How you used internal linking on Masterpiece Finder

### Link Building
- Submit to Product Hunt
- Share in SEO communities (Reddit r/SEO, Twitter, niche Discords)
- Reach out to SEO bloggers for inclusion in tool roundups
- Create a "badge" sites can embed showing their internal link score

---

## Lead Capture Strategy

### Free Tier (No Email Required)
- Analyze one URL against up to 50 pages
- Basic recommendations
- No saved history

### Email Capture Triggers
- "Save your results" — requires email
- "Analyze more than 50 pages" — requires email
- "Get weekly link opportunity alerts" — requires email
- Export to CSV — requires email

### Premium Tier (Future)
- Unlimited pages
- Full site audits
- Search Console integration
- Historical tracking
- API access

---

## Development Phases

### Phase 1: Core MVP (1-2 weeks)
- [ ] URL input form
- [ ] Sitemap parser
- [ ] Basic content fetcher (handle errors gracefully)
- [ ] Simple keyword extraction
- [ ] Relevance scoring algorithm
- [ ] Results display (both directions)
- [ ] Copy/export functionality

### Phase 2: Polish (1 week)
- [ ] Loading states and progress
- [ ] Mobile responsiveness
- [ ] Error handling and edge cases
- [ ] Basic analytics (track usage)
- [ ] Landing page with SEO optimization

### Phase 3: Growth Features (2+ weeks)
- [ ] Email capture for advanced features
- [ ] Full site audit mode
- [ ] Orphan page detection
- [ ] User accounts and saved history
- [ ] (Optional) Semantic analysis upgrade — only if free version feels limiting

### Phase 4: Monetization (Future)
- [ ] Premium tier implementation
- [ ] Search Console integration
- [ ] Team features
- [ ] API for agencies

---

## Competitive Landscape

**Existing Tools:**
- **Ahrefs Site Audit** — Has internal link reports, but buried in expensive subscription
- **Screaming Frog** — Powerful but desktop-only, technical, overwhelming
- **Link Whisper (WordPress plugin)** — Good but WordPress-only, paid
- **Sitebulb** — Similar to Screaming Frog

**Your Advantage:**
- Free for basic use
- Web-based (no download)
- Focused on one thing (not a massive suite)
- Opinionated recommendations, not just data dumps
- Works for any site, not just WordPress
- Built by someone who actually does this (credibility)

---

## Success Metrics

- **Usage:** Analyses run per week
- **Engagement:** % who export or copy recommendations
- **Conversion:** Email capture rate
- **SEO:** Rankings for target keywords within 6 months
- **Referral:** Shares, backlinks, mentions

---

## Open Questions to Resolve

1. **Rate limiting:** How to handle users analyzing competitor sites repeatedly?
2. **Large sites:** At what page count do you require email or limit free tier?
3. **JavaScript-rendered content:** Support or punt to V2?
4. **API abuse:** How to prevent scraping/automation of your tool?

---

## Quick Wins to Stand Out

- **Real-time preview:** Show how the recommendation would look as a link on their page
- **"Link this" button:** Generates the HTML `<a>` tag ready to paste
- **Competitor comparison:** "Sites ranking above you for [keyword] have 3x more internal links to their target pages"
- **Anchor text variety checker:** "You've used 'SEO tips' as anchor text 12 times — vary it"

---

## Final Thought

The goal isn't just a tool — it's a demonstration of how you think about SEO. Every detail (the UX, the recommendations, the copy) should signal "this person understands the craft." That's what converts visitors into clients.
