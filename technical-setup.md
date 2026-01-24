# Technical Setup

Stack and deployment configuration for the new digitaljesse.com.

---

## Stack Decision

### Recommended: Next.js + Vercel

| Component | Choice | Why |
|-----------|--------|-----|
| Framework | Next.js 14 | Fast, SEO-friendly, easy to customize with Claude |
| Hosting | Vercel | Free tier, instant GitHub deploys, great performance |
| Styling | Tailwind CSS | Rapid development, easy to modify |
| Content | MDX or JSON | No database needed, content lives in repo |
| Forms | Formspree or Resend | Simple contact form handling |
| Analytics | Vercel Analytics or Plausible | Privacy-friendly, lightweight |

### Why Not Shopify?

- Overkill for a portfolio (no products to sell)
- Monthly cost ($29+/month)
- Harder to customize quickly
- Liquid templating is slower to iterate on

### Why Vercel?

- Free for personal projects
- Deploys automatically on git push
- Built-in analytics
- Edge functions if needed later
- Perfect Next.js integration

---

## Project Structure

```
digitaljesse.com/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── about/page.tsx           # About page
│   ├── portfolio/
│   │   ├── page.tsx             # Portfolio overview
│   │   ├── [slug]/page.tsx      # Individual case studies
│   ├── contact/page.tsx         # Contact page
│   └── layout.tsx               # Root layout (nav, footer)
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── ContactForm.tsx
│   └── Stats.tsx
├── content/
│   ├── projects/                # Case study content (MDX or JSON)
│   │   ├── quality-sewing.mdx
│   │   ├── masterpieces.mdx
│   │   ├── luxury-wall-art.mdx
│   │   └── ...
│   └── about.mdx
├── public/
│   ├── images/                  # Screenshots, logos, headshot
│   └── resume.pdf
├── styles/
│   └── globals.css              # Tailwind base styles
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## Setup Steps

### 1. Create GitHub Repository

```bash
# Create new repo on GitHub: digitaljesse-site
# Clone locally
git clone https://github.com/[your-username]/digitaljesse-site.git
cd digitaljesse-site
```

### 2. Initialize Next.js Project

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

### 3. Connect to Vercel

1. Go to vercel.com
2. Import GitHub repository
3. Deploy (automatic on every push)
4. Add custom domain: digitaljesse.com

### 4. Domain Configuration

Point your domain to Vercel:
- Add CNAME record: `cname.vercel-dns.com`
- Or use Vercel nameservers for full DNS control

---

## Design System

### Colors

```css
:root {
  --primary: #1a1a1a;        /* Near black - text */
  --secondary: #4a4a4a;      /* Dark gray - secondary text */
  --accent: #2563eb;         /* Blue - links, CTAs */
  --background: #ffffff;     /* White - main background */
  --surface: #f5f5f5;        /* Light gray - cards, sections */
  --border: #e5e5e5;         /* Border color */
}
```

### Typography

```css
/* Headings */
font-family: 'Inter', system-ui, sans-serif;

/* Body */
font-family: 'Inter', system-ui, sans-serif;

/* Code/Monospace */
font-family: 'JetBrains Mono', monospace;
```

### Spacing Scale

Use Tailwind defaults (4px base unit):
- `p-4` = 16px
- `p-6` = 24px
- `p-8` = 32px
- `gap-4`, `gap-6`, `gap-8` for grids

---

## Key Pages

### Homepage
- Hero with name, title, one-liner
- Quick stats (3-4 key numbers)
- Featured projects (3 cards)
- CTA to portfolio or contact

### About
- Brief bio
- Work history highlights
- Skills organized by category
- What I'm looking for

### Portfolio
- Grid of project cards
- Filter by category (optional)
- Each card links to full case study

### Case Study Template
- Hero image
- Project overview
- Challenge/Solution/Results
- Screenshots and metrics
- Next project link

### Contact
- Simple form (name, email, message)
- Direct email link
- LinkedIn link
- Location (Seattle, WA)

---

## Content Management

### Option A: MDX Files (Recommended)

Store case studies as MDX in `/content/projects/`:

```mdx
---
title: "Quality Sewing"
slug: "quality-sewing"
description: "E-commerce Manager driving $2M+/year in revenue"
featured: true
metrics:
  - label: "Annual Revenue"
    value: "$2M+"
  - label: "Organic Traffic Growth"
    value: "340%"
  - label: "Products Managed"
    value: "5,000+"
---

# Quality Sewing

E-commerce Manager for a family-owned sewing retailer since 1985...
```

### Option B: JSON Data

```json
{
  "projects": [
    {
      "slug": "quality-sewing",
      "title": "Quality Sewing",
      "description": "E-commerce Manager driving $2M+/year",
      "featured": true,
      "metrics": [...]
    }
  ]
}
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Core Web Vitals | All green |

---

## SEO Checklist

- [ ] Meta titles for each page (50-60 chars)
- [ ] Meta descriptions (140-160 chars)
- [ ] Open Graph images for social sharing
- [ ] Sitemap.xml (auto-generated by Next.js)
- [ ] robots.txt
- [ ] Structured data (JSON-LD for Person schema)
- [ ] Canonical URLs
- [ ] Alt text on all images

---

## Contact Form Options

### Option 1: Formspree (Free tier)
```html
<form action="https://formspree.io/f/[your-id]" method="POST">
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

### Option 2: Resend (More control)
- API-based email sending
- Free tier: 100 emails/day
- Better for custom confirmation emails

---

## Deployment Workflow

1. Make changes locally
2. Push to GitHub
3. Vercel auto-deploys (preview URL for branches)
4. Merge to main = production deploy

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
# Deployed in ~30 seconds
```

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| Vercel Hosting | $0 (Hobby tier) |
| Domain (if transferring) | ~$12/year |
| Formspree | $0 (50 submissions/month) |
| **Total** | **~$12/year** |

vs. Shopify: $348/year minimum

---

## Next Steps

1. [ ] Create GitHub repository
2. [ ] Initialize Next.js project
3. [ ] Connect to Vercel
4. [ ] Set up basic layout (Header, Footer)
5. [ ] Build Homepage
6. [ ] Build About page
7. [ ] Build Portfolio grid
8. [ ] Create case study template
9. [ ] Add case study content
10. [ ] Build Contact page with form
11. [ ] Add SEO meta tags
12. [ ] Test on mobile
13. [ ] Point domain to Vercel
14. [ ] Launch
