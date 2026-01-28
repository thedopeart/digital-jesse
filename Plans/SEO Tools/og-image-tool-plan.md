# OG Image Tool — Build Plan

## Quick Summary

**What:** A free tool suite for social share images — audit your site for missing/broken OG images, preview how any URL looks across platforms, and generate beautiful OG images from templates.

**Cost to build & run:** $0 — uses Satori for image generation, no AI or paid APIs.

**Tech:** Next.js + Cheerio + Satori/Vercel OG + Canvas. No external services needed.

**Three tools in one:**
1. **OG Image Auditor** — Crawl your site, find OG image issues
2. **Social Preview Tool** — See how any URL looks on Twitter, LinkedIn, etc.
3. **OG Image Generator** — Create branded images from templates

---

## The Core Problem

When you share a link, the preview image is often:
- Missing entirely (shows nothing or a broken icon)
- Wrong dimensions (cropped weirdly, text cut off)
- Generic (same default image on every page)
- Ugly (auto-generated CMS thumbnail)
- Inconsistent (looks fine on Twitter, broken on LinkedIn)

Most people never check how their links actually appear. They share content they spent hours creating, and it shows up looking like spam.

**Your tool makes social sharing look professional.**

---

## What Makes This Tool Different

**Existing tools:**
- **Meta tag validators** — Show raw tag data, not visual preview
- **Twitter Card Validator** — Single platform, just Twitter
- **Paid generators (Placid, etc.)** — $29+/month, overkill for most

**Your tool:**
- Visual preview across ALL major platforms
- Site-wide audit (not just one URL)
- Free image generator with templates
- Copy-paste meta tag code included

**Positioning:** "See how your links actually look. Fix them in 60 seconds."

---

## Tool 1: OG Image Auditor (Site-Wide)

### What It Does

Crawl your site, check every page's Open Graph tags, flag issues.

### Issues Detected

| Issue | Severity | Description |
|-------|----------|-------------|
| Missing og:image | Error | No image specified at all |
| Broken og:image | Error | URL returns 404 or error |
| Image too small | Warning | Under 1200×630 recommended |
| Wrong aspect ratio | Warning | Not close to 1.91:1 |
| Missing og:title | Error | No title for social shares |
| Missing og:description | Warning | No description text |
| Title too long | Warning | Will be truncated (>70 chars) |
| Description too long | Warning | Will be truncated (>200 chars) |
| Duplicate images | Warning | Same image on multiple pages |
| Default/placeholder | Warning | Detected generic image |

### Output

```
OG IMAGE AUDIT
digitaljesse.com — 87 pages analyzed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 SUMMARY

✓ 52 pages — Fully optimized
⚠ 23 pages — Warnings (minor issues)  
✗ 12 pages — Errors (needs attention)

ISSUES BREAKDOWN:
• Missing og:image: 8 pages
• Broken og:image (404): 3 pages
• Image too small: 7 pages
• Missing og:description: 12 pages
• Duplicate images: 15 pages (using same image)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✗ MISSING OG:IMAGE

┌──────────────────────────────────────────────────────────────┐
│ /blog/quick-seo-tips                                         │
│ og:title: "Quick SEO Tips for Beginners"                     │
│ og:image: (none)                                             │
│                                                              │
│ [Preview how it looks now] [Generate image →]                │
├──────────────────────────────────────────────────────────────┤
│ /products/widget-pro                                         │
│ og:title: "Widget Pro - Best Widget Ever"                    │
│ og:image: (none)                                             │
│                                                              │
│ [Preview how it looks now] [Generate image →]                │
└──────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠ DUPLICATE IMAGES (15 pages using same image)

These pages all share: /images/default-og.jpg

• /blog/post-1
• /blog/post-2
• /blog/post-3
• ... 12 more

Consider creating unique images for each page.

[Generate images for all →]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 FULL PAGE LIST

| URL | og:image | Dimensions | og:title | Issues |
|-----|----------|------------|----------|--------|
| /blog/seo-guide | ✓ | 1200×630 | ✓ (42 chars) | None |
| /blog/quick-tips | ✗ missing | — | ✓ (28 chars) | 1 error |
| /products/widget | ✓ | 800×400 ⚠ | ✗ missing | 2 issues |

[Export CSV] [Generate images for pages with issues →]
```

### Integration

- "Generate image →" links to OG Image Generator with title pre-filled
- Connects to your other tools (same crawler infrastructure)
- Adds to Site Health Dashboard as new section

---

## Tool 2: Social Preview Tool (Single URL)

### What It Does

Paste any URL → see exactly how it will appear when shared on each platform.

### Platforms Supported

| Platform | Card Size | Aspect Ratio | Notes |
|----------|-----------|--------------|-------|
| Twitter/X | 1200×628 | 1.91:1 | Large card vs summary card |
| LinkedIn | 1200×627 | 1.91:1 | Very similar to Twitter |
| Facebook | 1200×630 | 1.91:1 | Has its own debugger but clunky |
| Slack | 800×418 | 1.91:1 | Inline preview |
| Discord | 1200×630 | Various | Embed preview |
| iMessage | 1200×630 | 1.91:1 | iOS link preview |
| WhatsApp | 400×400 | 1:1 | Square crop! Different |

### Output

```
SOCIAL PREVIEW
https://example.com/blog/seo-guide

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 HOW YOUR LINK APPEARS

┌─────────────────────────────────────────────────────────────┐
│ TWITTER / X                                                 │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ ┌─────────────────────────────────────────────────────┐ ││
│ │ │                                                     │ ││
│ │ │              [Your OG Image Here]                   │ ││
│ │ │                  1200 × 628                         │ ││
│ │ │                                                     │ ││
│ │ └─────────────────────────────────────────────────────┘ ││
│ │ The Complete Guide to SEO in 2026                       ││
│ │ Everything you need to know about search engine...      ││
│ │ example.com                                             ││
│ └─────────────────────────────────────────────────────────┘│
│                                                     ✓ Looks good │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ LINKEDIN                                                    │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ [Preview renders similarly]                              ││
│ │                                                          ││
│ │ The Complete Guide to SEO in 2026                        ││
│ │ example.com • 8 min read                                 ││
│ └─────────────────────────────────────────────────────────┘│
│                                                     ✓ Looks good │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ WHATSAPP                                          ⚠ Warning │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ ┌────────┐                                               ││
│ │ │  IMG   │ The Complete Guide to SEO in 2026            ││
│ │ │(square)│ Everything you need to know about...         ││
│ │ └────────┘                                               ││
│ └─────────────────────────────────────────────────────────┘│
│                                                              │
│ ⚠ WhatsApp crops to square (1:1). Your image may lose      │
│   important content on the sides.                           │
└─────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 RAW META TAGS

og:title: "The Complete Guide to SEO in 2026"
og:description: "Everything you need to know about search engine optimization. Updated for 2026 with the latest strategies."
og:image: "https://example.com/images/seo-guide-og.jpg"
og:image:width: 1200
og:image:height: 630
og:url: "https://example.com/blog/seo-guide"
og:type: "article"

twitter:card: "summary_large_image"
twitter:title: "The Complete Guide to SEO in 2026"
twitter:description: "Everything you need to know about..."
twitter:image: "https://example.com/images/seo-guide-og.jpg"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 ISSUES DETECTED

⚠ No twitter:card tag — Defaulting to summary (small image)
  Add: <meta name="twitter:card" content="summary_large_image">

⚠ Description may truncate on mobile (currently 142 chars)
  Consider shortening to under 100 characters

✓ Image dimensions are optimal
✓ Title length is good

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Copy all meta tags] [Generate better image →] [Re-check URL]
```

### Real-Time Preview

As user adjusts title/description in generator, preview updates live across all platforms.

---

## Tool 3: OG Image Generator

### What It Does

Create professional OG images using customizable templates. No design skills needed.

### User Flow

```
Step 1: Choose Template
┌─────────────────────────────────────────────────────────────────┐
│ Choose a template                                               │
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│ │ ░░░░░░░░░░░ │ │ ▓▓▓▓▓▓▓▓▓▓▓ │ │ ┌─────────┐ │ │ ═══════════ ││
│ │             │ │             │ │ │         │ │ │             ││
│ │  Headline   │ │  Headline   │ │ │  LOGO   │ │ │  Headline   ││
│ │             │ │             │ │ │         │ │ │  ─────────  ││
│ │ └─────────┘ │ │             │ │ │ Headline│ │ │  subtitle   ││
│ │   Simple    │ │   Gradient  │ │ │  Brand  │ │ │   Minimal   ││
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│
│ │ ┼┼┼┼┼┼┼┼┼┼┼ │ │ ╔═══════╗   │ │  ▲▲▲▲▲▲▲▲▲ │ │ ▒▒▒▒▒▒▒▒▒▒▒ ││
│ │ ┼┼┼┼┼┼┼┼┼┼┼ │ │ ║ HEAD  ║   │ │  ▲▲▲▲▲▲▲▲▲ │ │ ▒▒▒▒▒▒▒▒▒▒▒ ││
│ │  Headline   │ │ ╚═══════╝   │ │  Headline   │ │  Headline   ││
│ │             │ │  Headline   │ │             │ │             ││
│ │   Pattern   │ │   Boxed     │ │  Geometric  │ │    Photo    ││
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│
└─────────────────────────────────────────────────────────────────┘

Step 2: Customize
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│ ┌───────────────────────────────┐  ┌─────────────────────────┐ │
│ │                               │  │ HEADLINE                │ │
│ │                               │  │ [The Complete Guide to  │ │
│ │      LIVE PREVIEW             │  │  SEO in 2026          ] │ │
│ │      (updates as you type)    │  │                         │ │
│ │                               │  │ SUBTITLE (optional)     │ │
│ │  ┌─────────────────────────┐  │  │ [Everything you need to │ │
│ │  │                         │  │  │  know                 ] │ │
│ │  │   The Complete Guide    │  │  │                         │ │
│ │  │     to SEO in 2026      │  │  │ BRAND NAME              │ │
│ │  │                         │  │  │ [digitaljesse.com     ] │ │
│ │  │   Everything you need   │  │  │                         │ │
│ │  │       to know           │  │  │ COLORS                  │ │
│ │  │                         │  │  │ Background: [■ #4F46E5] │ │
│ │  │    digitaljesse.com     │  │  │ Text: [■ #FFFFFF]       │ │
│ │  │         [logo]          │  │  │ Accent: [■ #10B981]     │ │
│ │  └─────────────────────────┘  │  │                         │ │
│ │                               │  │ LOGO                    │ │
│ │   1200 × 630px               │  │ [Upload logo] or [None]  │ │
│ └───────────────────────────────┘  │                         │ │
│                                    │ PATTERN (if applicable) │ │
│                                    │ [Dots ▼] Opacity: [20%] │ │
│                                    └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

Step 3: Preview Across Platforms
┌─────────────────────────────────────────────────────────────────┐
│ How it will look:                                               │
│                                                                 │
│ [Twitter] [LinkedIn] [Facebook] [Slack] [WhatsApp]              │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │         [Platform-specific preview of your image]           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ✓ Looks good on Twitter                                        │
│ ✓ Looks good on LinkedIn                                       │
│ ⚠ Text may be small on WhatsApp (square crop)                  │
└─────────────────────────────────────────────────────────────────┘

Step 4: Download & Get Code
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│ [Download PNG (1200×630)]  [Download WebP]  [Copy to Clipboard] │
│                                                                 │
│ ───────────────────────────────────────────────────────────── │
│                                                                 │
│ Add this to your page's <head>:                                │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ <!-- Open Graph -->                                         │ │
│ │ <meta property="og:title" content="The Complete Guide..."/> │ │
│ │ <meta property="og:description" content="Everything..."/>   │ │
│ │ <meta property="og:image" content="https://yoursite..."/>   │ │
│ │ <meta property="og:image:width" content="1200"/>            │ │
│ │ <meta property="og:image:height" content="630"/>            │ │
│ │                                                             │ │
│ │ <!-- Twitter -->                                            │ │
│ │ <meta name="twitter:card" content="summary_large_image"/>   │ │
│ │ <meta name="twitter:title" content="The Complete Guide..."/>│ │
│ │ <meta name="twitter:image" content="https://yoursite..."/>  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Copy Code]                                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Template Library

Start with 8-12 templates covering common needs:

**Minimal Templates:**
1. **Clean** — Solid color, centered headline, subtle brand
2. **Gradient** — Two-color gradient background
3. **Split** — Color block on left, text on right

**Branded Templates:**
4. **Logo Focus** — Large logo top, headline below
5. **Corner Brand** — Logo in corner, headline centered
6. **Bar** — Colored bar top or bottom with brand

**Visual Templates:**
7. **Pattern** — Subtle geometric pattern background
8. **Dots** — Dot grid pattern
9. **Waves** — Abstract wave shapes

**Content Templates:**
10. **Blog Post** — "READ TIME: X MIN" badge, headline, author
11. **Product** — Space for product name, tagline, price
12. **Event** — Date badge, event name, location

**Photo Templates:**
13. **Overlay** — User uploads photo, text overlaid with scrim
14. **Photo Left** — Photo on left, text on right

### Customization Options

| Option | Type | Notes |
|--------|------|-------|
| Headline | Text input | Auto-size to fit |
| Subtitle | Text input | Optional |
| Brand/URL | Text input | Shown at bottom |
| Logo | Image upload | PNG with transparency |
| Background color | Color picker | Primary background |
| Text color | Color picker | Auto-contrast check |
| Accent color | Color picker | For highlights |
| Pattern | Dropdown | Dots, lines, grid, waves, none |
| Pattern opacity | Slider | 5-50% |
| Font | Dropdown | 3-5 web-safe options |

### Auto-Generated from URL

If user pastes a URL:
- Auto-pull og:title as headline
- Auto-pull og:description as subtitle
- Detect site name from URL for brand

One-click starting point they can customize.

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| HTML Parsing | Cheerio (npm) | Free |
| Image Generation | @vercel/og or Satori | Free |
| Styling | Tailwind CSS | Free |
| Database | None needed | Free |
| AI | None needed | Free |

**Total recurring cost: $0**

### Key NPM Packages

```bash
npm install @vercel/og          # OG image generation (uses Satori)
npm install cheerio             # HTML parsing for auditor
npm install sharp               # Image processing (dimensions, validation)
```

### Image Generation with Satori/@vercel/og

Satori converts JSX to SVG, then to PNG. Templates are just React components:

```jsx
// Example template component
export function GradientTemplate({ headline, subtitle, brand, colors }) {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        padding: 60,
      }}
    >
      <h1
        style={{
          fontSize: headline.length > 40 ? 48 : 64,
          color: colors.text,
          textAlign: 'center',
          margin: 0,
          fontWeight: 700,
        }}
      >
        {headline}
      </h1>
      
      {subtitle && (
        <p style={{ fontSize: 28, color: colors.text, opacity: 0.9, marginTop: 20 }}>
          {subtitle}
        </p>
      )}
      
      <p style={{ fontSize: 24, color: colors.text, opacity: 0.7, marginTop: 'auto' }}>
        {brand}
      </p>
    </div>
  );
}
```

**API route to generate image:**

```javascript
// /app/api/og/route.jsx
import { ImageResponse } from '@vercel/og';
import { GradientTemplate } from '@/templates/gradient';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const headline = searchParams.get('headline') || 'Your Headline';
  const subtitle = searchParams.get('subtitle') || '';
  const brand = searchParams.get('brand') || '';
  const template = searchParams.get('template') || 'gradient';
  const colors = {
    primary: searchParams.get('color1') || '#4F46E5',
    secondary: searchParams.get('color2') || '#7C3AED',
    text: searchParams.get('textColor') || '#FFFFFF',
  };

  return new ImageResponse(
    <GradientTemplate 
      headline={headline}
      subtitle={subtitle}
      brand={brand}
      colors={colors}
    />,
    {
      width: 1200,
      height: 630,
    }
  );
}
```

**Result:** Hit `/api/og?headline=My+Title&template=gradient` → get PNG image.

### Font Handling

Satori requires fonts to be loaded explicitly. Use a few reliable options:

```javascript
// Load fonts at build time or first request
const interBold = fetch(
  new URL('../../assets/Inter-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

// In ImageResponse options
{
  fonts: [
    {
      name: 'Inter',
      data: await interBold,
      weight: 700,
    },
  ],
}
```

### Logo Handling

For uploaded logos:
1. User uploads PNG
2. Store temporarily (or convert to base64 data URL)
3. Pass to template as image source
4. Satori renders it in the image

For MVP: Allow base64 data URL (no storage needed).

### Social Preview Rendering

Platform previews are just CSS mockups — not actual image generation:

```jsx
function TwitterPreview({ ogImage, ogTitle, ogDescription, domain }) {
  return (
    <div className="twitter-card-mock border rounded-xl overflow-hidden max-w-[500px]">
      <div className="aspect-[1.91/1] bg-gray-100">
        <img src={ogImage} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="p-3 border-t">
        <p className="text-gray-500 text-sm">{domain}</p>
        <p className="font-bold text-[15px] line-clamp-2">{ogTitle}</p>
        <p className="text-gray-500 text-[15px] line-clamp-2">{ogDescription}</p>
      </div>
    </div>
  );
}
```

Create similar components for LinkedIn, Facebook, Slack, etc. with their specific styling.

---

## UX Details That Matter

### Live Preview

As user types headline, the preview updates in real-time. This is the magic moment — they see their content looking professional instantly.

### Auto-Contrast

When user picks a background color, automatically adjust text color if contrast is too low:

```javascript
function getContrastColor(bgColor) {
  // Calculate luminance
  const luminance = getLuminance(bgColor);
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
```

Show warning if contrast ratio is below WCAG guidelines.

### Template Recommendations

Based on content type:
- Long headline → recommend minimal templates
- Has logo → recommend branded templates
- Blog post → recommend blog template
- E-commerce → recommend product template

### One-Click from Auditor

When auditor finds pages missing OG images:
- "Generate image" button pre-fills headline from og:title
- User just picks template and colors
- Instant solution

### Batch Generation (V2)

For sites with many pages missing images:
- Select multiple pages
- Apply same template with different headlines
- Generate all at once
- Download as ZIP

---

## Making It Look Credible

### Trust Builders
- Show the templates are used by real sites
- Display image dimensions and why they matter
- Explain each platform's quirks

### Your Angle
- "I got tired of my links looking broken. So I built a tool to fix it."
- Show before/after of your own site
- Templates designed by someone who actually shares content

---

## SEO Strategy for the Tool

### Target Keywords

**Auditor:**
- "og image checker"
- "open graph checker"
- "social share preview checker"
- "meta image validator"

**Preview:**
- "twitter card preview"
- "social media preview tool"
- "link preview checker"
- "og tag tester"

**Generator:**
- "og image generator free"
- "social share image maker"
- "open graph image creator"
- "twitter card image generator"
- "free og image maker"

### Combined Opportunity

"og image" keywords have decent volume and the existing tools are either paid or terrible. Room to own this space.

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "Open Graph Images: The Complete Guide (Plus Free Generator)"

**URL:** /blog/open-graph-images-guide

**Target length:** 3,000-3,500 words

**Structure:**
1. What are Open Graph images
2. Why they matter (with before/after examples)
3. Optimal sizes for each platform
4. Required meta tags (og:image, twitter:card, etc.)
5. Common mistakes:
   - Missing images
   - Wrong dimensions
   - Text cut off
   - Generic/duplicate images
6. How to add OG images to WordPress/Shopify/Next.js/etc.
7. Introduce the tool: "Or generate perfect images in 60 seconds →"
8. Testing your images (link to preview tool)
9. Bulk auditing your site (link to auditor)

### Supporting Blog Posts

**Post 1: "OG Image Size Guide: Every Platform in 2026"**
- URL: /blog/og-image-sizes
- Length: 1,500 words
- Covers: Exact dimensions for Twitter, LinkedIn, Facebook, etc.
- Includes: Downloadable cheat sheet
- Links to: Generator, pillar article
- **High traffic:** People search this constantly

**Post 2: "Why Your Link Previews Look Broken (And How to Fix Them)"**
- URL: /blog/fix-broken-link-previews
- Length: 1,500 words
- Covers: Common causes, debugging steps, solutions
- Links to: Preview tool, auditor

**Post 3: "How to Add OG Images to [Platform]"**
- Create multiple: WordPress, Shopify, Next.js, Webflow, Squarespace
- URL: /blog/og-images-wordpress, etc.
- Length: 1,200 words each
- Links to: Generator

**Post 4: "I Audited 100 Websites' OG Images — Here's What I Found"**
- URL: /blog/og-image-audit-study
- Length: 2,000 words
- Covers: Common issues, statistics, examples
- Links to: Auditor, generator
- **Shareable:** Original research performs well

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tools + pillar article | Core asset |
| 2 | "OG Image Size Guide" | High-search reference |
| 3 | "Fix Broken Previews" guide | Problem-aware traffic |
| 4 | Platform-specific guides (2-3) | Long-tail keywords |
| 5 | Audit study post | Shareable research |

---

## Lead Capture Strategy

### Free Tier (Everything)
- Full auditor (up to 200 pages)
- All preview features
- All templates
- Unlimited image generation
- Download PNG

### Email Capture Triggers
- "Email me my audit report" — requires email
- "Save your brand settings" — requires email (future)
- "Get new templates when we add them" — requires email
- "Download all meta tag code as file" — requires email

### Upgrade Path (Future)
- Custom branded templates
- Remove "Made with digitaljesse.com" watermark (if you add one)
- API access
- White-label for agencies

---

## Integration with Tool Suite

### Connects To:

| Tool | Connection |
|------|------------|
| **Site Health Dashboard** | OG audit becomes a new section |
| **Title/Meta Auditor** | Already checking meta tags, add OG checks |
| **Content Brief Generator** | Suggest OG image specs in brief |

### Dashboard Addition

```
┌──────────────────────────────────────────────────────────────────────┐
│ 🖼️ SOCIAL IMAGES                                                     │
│                                                                      │
│ ✗ 8 pages missing og:image                                          │
│ ⚠ 7 pages with images too small                                     │
│ ⚠ 15 pages using duplicate default image                            │
│                                                                      │
│ [View Full OG Audit →] [Generate missing images →]                  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Development Phases

### Phase 1: Preview Tool (3-5 days)
- [ ] URL input
- [ ] Meta tag extractor
- [ ] Platform preview components (Twitter, LinkedIn, Facebook, Slack)
- [ ] Issue detection (missing tags, truncation)
- [ ] Copy meta tags feature

### Phase 2: Generator MVP (1 week)
- [ ] 4-6 initial templates
- [ ] Template selector UI
- [ ] Customization form (headline, subtitle, brand, colors)
- [ ] Live preview
- [ ] Satori image generation API route
- [ ] Download PNG button
- [ ] Meta tag code generator

### Phase 3: Auditor (3-5 days)
- [ ] Sitemap/domain input (reuse existing crawler)
- [ ] OG meta extraction
- [ ] Image URL validation (check if loads, get dimensions)
- [ ] Issue detection
- [ ] Results table
- [ ] "Generate image" links to generator

### Phase 4: Polish (3-5 days)
- [ ] More templates (8-12 total)
- [ ] Logo upload support
- [ ] Font options
- [ ] Pattern options
- [ ] Mobile responsiveness
- [ ] Landing page

### Phase 5: Content Launch (1 week)
- [ ] Publish pillar article
- [ ] Publish size guide
- [ ] Publish platform-specific guides
- [ ] Social promotion

### Phase 6: Integration
- [ ] Add to Site Health Dashboard
- [ ] Link from Title/Meta Auditor
- [ ] Add to Tools Hub

---

## Open Questions

1. **Watermark?** Add subtle "Made with digitaljesse.com" watermark? (Drives awareness but may annoy users)
2. **Custom fonts?** Allow font upload? (Complex, probably V2)
3. **Photo backgrounds?** User uploads photo for background? (Storage implications)
4. **Aspect ratio variants?** Generate square version for WhatsApp automatically?
5. **API access?** Let developers generate images programmatically? (Future paid feature)

---

## Differentiation Ideas

### "Smart Crop Preview"
Show danger zones for WhatsApp/Instagram where image gets cropped to square. Overlay guides on preview.

### "One-Click Fix"
From auditor: select pages with issues → apply same template → generate all images with their respective titles.

### "Brand Kit"
Save brand colors + logo + preferred template. One-click generate for any new page.

### Template Marketplace (Future)
Let designers submit templates. Curate the best ones. Potential for premium templates.

---

## Success Metrics

- **Usage:** Images generated per week
- **Engagement:** Downloads, code copies
- **Auditor:** Sites audited, issues found
- **Content:** Pillar article ranking for "open graph images"
- **Conversion:** Email capture rate
- **Sharing:** Screenshots of generated images on social (organic promotion)
