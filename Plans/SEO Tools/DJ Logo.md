# Affiliate & Link Opportunity Finder — Build Plan

## Quick Summary

**What:** A free tool that crawls your site, finds every mention of brands, tools, and products — then identifies which ones have affiliate programs and where you're missing monetization opportunities.

**Cost to build & run:** $0 — uses only free tools and no paid APIs.

**Tech:** Next.js + Cheerio + a curated database of affiliate programs. No AI APIs required.

**Differentiator:** Everyone says "add affiliate links." This tool shows you exactly where to add them in content you've already written.

---

## The Core Problem

Most affiliate advice is backwards:
- "Find high-commission products, then write content"
- Feels spammy, hard to rank, low trust

The smarter approach:
- You've already written content that mentions products
- You're already ranking for terms
- You're leaving money on the table by not linking

**Your tool finds money hiding in existing content.**

This is the difference between "content marketer who monetizes" and "affiliate site." You're helping people monetize authentically.

---

## What Makes This Tool Different

**Existing tools:** 
- Affiliate networks show you programs but not where to use them
- SEO tools show unlinked mentions for backlink outreach
- Nobody connects "you mentioned X" with "X has an affiliate program"

**Your tool:**
- Scans your content for brand/product mentions
- Cross-references against affiliate program database
- Shows exactly where in your content the opportunity exists
- Calculates potential value based on mention frequency

**Positioning:** "Find affiliate revenue hiding in your existing content."

---

## Core User Flow

### Step 1: Input
User provides:
- Domain URL or sitemap URL
- (Optional) Specific pages to analyze
- (Optional) Their existing affiliate networks (to prioritize)

### Step 2: Crawl & Extract
Tool analyzes each page for:
- Brand mentions (Shopify, Canva, ConvertKit, etc.)
- Product mentions (specific tools, software, services)
- Whether mention is already linked or not
- Context around the mention

### Step 3: Cross-Reference
Match mentions against:
- Known affiliate programs database
- Commission rates where available
- Affiliate network (ShareASale, Impact, direct, etc.)

### Step 4: Output — Opportunity Report

```
AFFILIATE OPPORTUNITY REPORT
digitaljesse.com — 156 pages analyzed

💰 ESTIMATED MONTHLY OPPORTUNITY: $850-2,400
   Based on typical conversion rates and your traffic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔥 HIGH-VALUE OPPORTUNITIES (Unlinked mentions with affiliate programs)

┌─────────────────────────────────────────────────────────────────┐
│ SHOPIFY                                                         │
│ Mentioned 23 times across 8 pages — NOT LINKED                  │
│                                                                 │
│ Affiliate: Shopify Partners Program                             │
│ Commission: $150 per paid signup (or 200% first payment)        │
│ Network: Direct                                                 │
│                                                                 │
│ Pages with mentions:                                            │
│ • /blog/ecommerce-platforms → mentioned 7x                      │
│   "...Shopify is the most popular option for beginners..."      │
│ • /blog/start-online-store → mentioned 5x                       │
│   "...platforms like Shopify make it easy to..."                │
│ • /blog/shopify-vs-woocommerce → mentioned 11x                  │
│   [Already comparing — high intent page!]                       │
│                                                                 │
│ [Copy affiliate link template] [View all mentions]              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CONVERTKIT                                                      │
│ Mentioned 12 times across 4 pages — NOT LINKED                  │
│                                                                 │
│ Affiliate: ConvertKit Affiliate Program                         │
│ Commission: 30% recurring for 24 months                         │
│ Network: Direct                                                 │
│                                                                 │
│ Pages with mentions:                                            │
│ • /blog/email-marketing-tools → mentioned 6x                    │
│ • /blog/newsletter-setup → mentioned 4x                         │
│ • /blog/creator-stack → mentioned 2x                            │
│                                                                 │
│ [Copy affiliate link template] [View all mentions]              │
└─────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 ALREADY LINKED (Good job!)

• Ahrefs — 8 mentions, all linked ✓
• Notion — 5 mentions, all linked ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 OUTREACH OPPORTUNITIES (Mentioned but no affiliate program)

These brands don't have public affiliate programs, but you mention
them frequently. Consider reaching out for partnerships:

• Figma — mentioned 15 times (they have an influencer program)
• Linear — mentioned 8 times
• Obsidian — mentioned 6 times

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 QUICK WINS (Add these links today)

Sorted by: Mentions × Commission potential

1. Shopify on /blog/ecommerce-platforms (7 mentions, $150/signup)
2. ConvertKit on /blog/email-marketing-tools (6 mentions, 30% recurring)
3. Teachable on /blog/online-courses (4 mentions, 30% recurring)
```

---

## Feature Set

### MVP (Launch Version)

1. **Site Crawl**
   - Input domain or sitemap
   - Crawl up to 100 pages (free tier)
   - Extract all text content

2. **Brand/Product Detection**
   - Match against curated list of 500+ brands with affiliate programs
   - Case-insensitive matching
   - Handle variations (e.g., "ConvertKit" and "Convert Kit")

3. **Link Detection**
   - Check if mention is already wrapped in a link
   - Distinguish linked vs unlinked mentions
   - Note if existing link is affiliate or not (by URL pattern)

4. **Affiliate Program Database**
   - Curated list of popular affiliate programs
   - Commission structure (flat, percentage, recurring)
   - Affiliate network (ShareASale, Impact, CJ, direct)
   - Signup URL

5. **Opportunity Scoring**
   - Score based on: mention frequency × commission value
   - Prioritize highest-value opportunities
   - Separate "quick wins" section

6. **Context Extraction**
   - Show the sentence around each mention
   - Help user see if it's a good fit for affiliate link

7. **Export Options**
   - Copy individual opportunities
   - Download full report as CSV
   - Markdown format for content teams

### Version 2 Features

8. **Mention Sentiment Analysis**
   - Is the mention positive, negative, or neutral?
   - Only suggest affiliates for positive mentions
   - Flag negative mentions (don't link those)

9. **Traffic Overlay**
   - Connect Search Console
   - Prioritize by actual page traffic
   - "This page gets 500 visits/month — high priority"

10. **Affiliate Link Generator**
    - User inputs their affiliate IDs
    - Tool generates ready-to-paste links
    - Even generates HTML with proper disclosure

11. **Tracking Dashboard**
    - Save reports over time
    - Track which opportunities you've implemented
    - "You've added 15 of 32 recommended links"

12. **Custom Brand Lists**
    - User adds brands they're already affiliates for
    - Prioritize those brands in results
    - Add custom commission rates

13. **Revenue Estimator**
    - Based on traffic + typical conversion rates
    - "Adding these links could generate $X/month"
    - Obviously speculative but motivating

---

## Affiliate Program Database

This is the core asset that makes the tool valuable. Start with 500+ programs, expand over time.

### Database Structure

```javascript
const affiliatePrograms = [
  {
    brand: "Shopify",
    variations: ["shopify", "shopify.com"],
    program: "Shopify Partners",
    commission: "$150 per paid signup or 200% of first month",
    type: "flat", // flat, percentage, recurring
    network: "direct",
    signupUrl: "https://www.shopify.com/affiliates",
    category: "ecommerce",
    popularity: "high"
  },
  {
    brand: "ConvertKit",
    variations: ["convertkit", "convert kit"],
    program: "ConvertKit Affiliate Program",
    commission: "30% recurring for 24 months",
    type: "recurring",
    network: "direct",
    signupUrl: "https://convertkit.com/affiliate",
    category: "email",
    popularity: "high"
  },
  // ... 500+ more
];
```

### Categories to Cover

| Category | Example Brands |
|----------|---------------|
| E-commerce Platforms | Shopify, BigCommerce, WooCommerce, Squarespace |
| Email Marketing | ConvertKit, Mailchimp, ActiveCampaign, Beehiiv |
| SEO Tools | Ahrefs, SEMrush, Surfer, Mangools |
| Hosting | Bluehost, SiteGround, Cloudways, Kinsta |
| Design Tools | Canva, Figma, Adobe, Envato |
| Course Platforms | Teachable, Thinkific, Kajabi, Podia |
| Website Builders | Webflow, Wix, Framer, Carrd |
| CRM/Sales | HubSpot, Pipedrive, Close, Salesforce |
| Project Management | Monday, Asana, ClickUp, Notion |
| Video/Podcast | Descript, Riverside, Buzzsprout, Transistor |
| Finance/Payments | Stripe, QuickBooks, FreshBooks, Wave |
| AI Tools | Jasper, Copy.ai, Writesonic, Midjourney |
| VPN/Security | NordVPN, ExpressVPN, 1Password, LastPass |
| Stock Media | Shutterstock, Envato Elements, Adobe Stock |
| Learning Platforms | Skillshare, Udemy, Coursera, LinkedIn Learning |

### Building the Database

**Phase 1 (MVP):** Manually curate top 200 programs across categories. Focus on:
- High commission programs
- Well-known brands (more likely to be mentioned)
- Reliable programs that pay

**Phase 2:** Expand to 500+ based on user requests and common mentions found.

**Phase 3:** Allow community submissions (with verification).

**Data Sources:**
- Affiliate network directories (ShareASale, Impact, CJ)
- "Best affiliate programs" blog posts (there are hundreds)
- Your own knowledge of tools in the space

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| HTML Parsing | Cheerio (npm) | Free |
| Styling | Tailwind CSS | Free |
| Affiliate Database | JSON file (local) | Free |
| Database | None for MVP | Free |
| AI/APIs | None required | Free |

**Total recurring cost: $0**

### Key NPM Packages (All Free)

```bash
npm install cheerio        # HTML parsing
npm install fast-xml-parser # Parse sitemaps
```

### Frontend
- **Framework:** Next.js
- **Styling:** Tailwind
- **Key UI Components:**
  - URL input form
  - Progress indicator during crawl
  - Tabbed results (High Value / Already Linked / Outreach)
  - Expandable cards for each brand
  - Context snippets with highlighted mentions
  - Copy/export buttons

### Backend / Processing

**API Route Flow:**
```
1. Receive domain or sitemap URL
2. Crawl pages (reuse existing crawler logic)
3. For each page:
   - Extract all text content
   - Scan for brand name matches against database
   - For each match:
     - Check if wrapped in <a> tag (already linked)
     - Extract surrounding sentence (context)
     - Record page URL, match count, link status
4. Cross-reference matches against affiliate database
5. Calculate opportunity scores
6. Return structured results
```

### Brand Matching Logic

```javascript
function findBrandMentions(text, pageUrl, links) {
  const mentions = [];
  
  affiliatePrograms.forEach(program => {
    program.variations.forEach(variation => {
      // Case-insensitive regex with word boundaries
      const regex = new RegExp(`\\b${variation}\\b`, 'gi');
      const matches = text.matchAll(regex);
      
      for (const match of matches) {
        const isLinked = checkIfLinked(match.index, links);
        const context = extractContext(text, match.index, 100);
        
        mentions.push({
          brand: program.brand,
          page: pageUrl,
          context,
          isLinked,
          position: match.index,
          program: program
        });
      }
    });
  });
  
  return mentions;
}

function extractContext(text, position, chars) {
  const start = Math.max(0, position - chars);
  const end = Math.min(text.length, position + chars);
  return '...' + text.slice(start, end).trim() + '...';
}
```

### Link Detection

```javascript
function checkIfLinked(mentionPosition, pageHtml) {
  // Parse HTML to find all <a> tags
  // Check if the mention position falls within any <a> tag's content
  // Return { isLinked: boolean, linkUrl: string | null }
}
```

---

## UX Details That Matter

### Results Hierarchy

**Order by value, not alphabet:**
1. High-value unlinked (most mentions × highest commission)
2. Medium-value unlinked
3. Already linked (just for awareness)
4. No affiliate program (outreach opportunities)

### Context is Everything

Don't just say "Shopify mentioned 7 times on /blog/ecommerce-platforms."

Show:
```
"...when choosing a platform, Shopify is the most popular 
option for beginners who want something that just works..."
```

This helps the user decide if it's a good fit for an affiliate link or if the context is wrong (e.g., negative mention).

### Quick Win Highlighting

At the top of results, show "Add these 5 links today" — the highest ROI opportunities that take 5 minutes to implement.

### Disclosure Reminder

Include a note: "Remember to add affiliate disclosure to pages with affiliate links. Here's a template: [copy]"

This builds trust and shows you understand the space.

---

## Making It Look Credible

### Trust Builders
- Show your methodology
- Note that data comes from a curated database
- Update date visible ("Affiliate data last updated: January 2026")

### Your Angle
- "Built by Jesse — I found $2,000/month in affiliate revenue hiding in my existing content"
- Use your own site as the demo
- Show before/after from your own experience

### Honest Positioning
- This is a discovery tool, not a promise of income
- Commission rates change, programs end
- User still needs to apply and get approved

---

## SEO Strategy for the Tool Itself

### Target Keywords
- "affiliate link finder"
- "find affiliate opportunities"
- "monetize existing content"
- "affiliate opportunity tool"
- "blog monetization tool"
- "passive income from blog"
- "affiliate program finder"

### The Content Marketing Angle
This tool serves a different audience than your SEO tools — it serves content creators who want to monetize. You can reach the creator economy with this.

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "How to Find Affiliate Revenue Hiding in Your Existing Content"

**URL:** /blog/find-affiliate-opportunities

**Target length:** 3,000-4,000 words

**Structure:**
1. The backwards approach to affiliate marketing (write first, monetize later)
2. Why most affiliate advice is wrong
3. What to look for in your content:
   - Brand mentions without links
   - Product comparisons
   - Tool recommendations
   - "What I use" sections
4. Manual audit process (do it yourself)
5. How to evaluate if an affiliate link fits
6. Adding links without being sleazy
7. Disclosure requirements
8. Introduce the tool: "Or automate this process →"
9. Case study: How you found $X in hidden affiliate revenue

**Internal links:**
- Link to your SEO tools (people who monetize also care about traffic)

### Supporting Blog Posts

**Post 1: "50+ High-Paying Affiliate Programs for Content Creators (2026)"**
- URL: /blog/best-affiliate-programs
- Length: 3,000+ words (list post)
- Covers: Curated list by category with commission details
- Links to: Affiliate Finder tool
- **High traffic potential:** People search for these lists constantly

**Post 2: "How to Add Affiliate Links Without Being Sleazy"**
- URL: /blog/affiliate-links-authentically
- Length: 1,500 words
- Covers: When to link, disclosure, maintaining trust, what not to do
- Links to: Tool, pillar article

**Post 3: "I Audited My Blog for Affiliate Opportunities — Here's What I Found"**
- URL: /blog/affiliate-audit-case-study
- Length: 1,800 words
- Covers: Your actual results, which programs you joined, revenue generated
- Links to: Tool, "best programs" list

**Post 4: "FTC Affiliate Disclosure Guide: What You Actually Need"**
- URL: /blog/affiliate-disclosure-guide
- Length: 1,200 words
- Covers: Legal requirements, where to place disclosure, templates
- Links to: Tool
- **Useful and evergreen**

**Post 5: "Blog Monetization Strategies That Actually Work in 2026"**
- URL: /blog/blog-monetization-strategies
- Length: 2,500 words
- Covers: Affiliates, ads, products, sponsorships — comparison
- Links to: Affiliate Finder, your other tools
- **Broad keyword, high traffic potential**

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tool + pillar article | Core asset |
| 2 | "50+ Best Affiliate Programs" list | High-traffic list post |
| 3 | Case study post | Social proof |
| 4 | Disclosure guide | Utility + trust building |
| 5 | Monetization strategies roundup | Broader reach |

---

## Lead Capture Strategy

### Free Tier
- Analyze up to 100 pages
- Full opportunity report
- Access to affiliate program database

### Email Capture Triggers
- "Save your report" — requires email
- "Download as CSV" — requires email
- "Get notified when we add new affiliate programs" — requires email
- "Analyze unlimited pages" — requires email
- "Get the full affiliate program database" — requires email (this is valuable)

### Potential Premium Features
- Unlimited pages
- Custom brand lists
- Revenue tracking dashboard
- Search Console integration
- Priority database updates

---

## Development Phases

### Phase 1: Database First (1 week)
- [ ] Curate initial 200 affiliate programs
- [ ] Structure JSON database
- [ ] Categorize by niche
- [ ] Include commission structures

### Phase 2: Core MVP (1-2 weeks)
- [ ] URL/sitemap input form
- [ ] Site crawler (reuse from other tools)
- [ ] Brand mention detection
- [ ] Link/no-link detection
- [ ] Context extraction
- [ ] Cross-reference with database
- [ ] Opportunity scoring
- [ ] Results display

### Phase 3: Polish (1 week)
- [ ] Improve results UI
- [ ] Copy buttons for each opportunity
- [ ] Export functionality
- [ ] Landing page with example report
- [ ] Mobile responsiveness

### Phase 4: Content Launch (1 week)
- [ ] Publish pillar article
- [ ] Publish "best affiliate programs" list
- [ ] Publish case study
- [ ] Social promotion in creator communities

### Phase 5: Enhancements (Future)
- [ ] User can input their affiliate IDs
- [ ] Auto-generate ready-to-paste links
- [ ] Saved reports with tracking
- [ ] Expand database to 500+

---

## Open Questions

1. **Database maintenance:** Affiliate programs change. How often to update?
2. **Commission accuracy:** Display ranges or specific numbers? (Specific feels more valuable but goes stale)
3. **Page limit:** 100 pages free? Or unlimited for MVP to encourage adoption?
4. **Negative mentions:** How to handle "I don't recommend Shopify because..." — V2 with sentiment?
5. **User submissions:** Let users request brands be added? Could build the database faster.

---

## Differentiation Ideas

**"Revenue potential" calculator:**
- Input your monthly traffic
- We estimate potential affiliate revenue
- Very rough but motivating
- "If 1% of visitors to these 5 pages convert at average commission..."

**Comparison to direct outreach:**
- Show brands mentioned frequently without affiliate programs
- "Consider reaching out for a sponsorship deal — you're already promoting them"

**Historical tracking:**
- "Last month you had 15 opportunities, you've linked 10"
- Gamifies the implementation

**Affiliate link generator:**
- User saves their affiliate IDs to their account
- Tool generates ready-to-copy HTML with proper disclosure
- Removes all friction from implementation

---

## Competitive Landscape

**No direct competitor does this exact thing.**

Related tools:
- **Affiliate networks** (ShareASale, Impact) — Show programs, not opportunities in your content
- **Lasso (WordPress plugin)** — Link management, not discovery
- **Brand monitoring tools** — Track mentions for outreach, not monetization
- **SEO tools** — Show unlinked mentions for backlinks, not affiliates

**Your advantage:**
- First to combine mention scanning with affiliate database
- Free
- Focused specifically on existing content monetization
- Curated database (not just raw data)

---

## Success Metrics

- **Usage:** Sites analyzed per week
- **Engagement:** Users who export or copy opportunities
- **Database:** Programs in database, user requests for additions
- **Content:** Pillar article ranking for "find affiliate opportunities"
- **Conversion:** Email capture rate
- **Feedback:** User reports of actual revenue generated

---

## The Bigger Picture

This tool serves a different persona than your SEO tools:
- **SEO tools:** Marketers, agencies, SEO professionals
- **Affiliate finder:** Bloggers, creators, solopreneurs

Expanding to the creator economy opens a new audience. These people overlap (creators also need SEO) but arrive with different intent.

Combined with your other tools, you now have:
- Traffic tools (SEO)
- Content tools (briefs, structure)
- Monetization tools (affiliates)

That's a complete content business toolkit.
