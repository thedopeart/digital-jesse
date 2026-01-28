# Instagram Carousel Planner & Creator — Build Plan

## Quick Summary

**What:** A comprehensive tool for planning, designing, and previewing Instagram carousels. Split content into slides, design with templates, preview the swipe experience AND how slide 1 looks on your grid, upload images, and export ready-to-post files.

**Cost to build & run:** $0 for MVP — Pure frontend with local storage. Future versions may need cloud storage for saved projects.

**Tech:** Next.js + React + Canvas API or Fabric.js for image editing + localStorage for drafts.

**Differentiator:** Most carousel tools are just content splitters. Yours is a complete creation studio with grid preview, brand consistency, and save/resume functionality.

---

## The Core Problem

Creating Instagram carousels is tedious:
- Manually splitting content across slides
- Designing each slide individually in Canva
- No way to preview the swipe experience before posting
- No visibility into how slide 1 will look on your profile grid
- Starting over if you close the browser
- Inconsistent branding across slides
- Character limits and readability issues

**Creators spend 1-2 hours per carousel. Your tool cuts that to 15 minutes.**

---

## What Makes This Different

| Basic Carousel Tools | Your Creator |
|---------------------|--------------|
| Text splitter only | Full design studio |
| No preview | Swipe preview + grid preview |
| No save | Save drafts, resume later |
| Generic output | Brand-consistent templates |
| Single image only | Multi-image upload + editing |
| No guidance | Character limits, readability tips |

---

## Core Feature Set

### 1. Content Planning Mode

**Text-Based Carousels:**
- Paste long-form content
- Smart auto-splitting (by paragraph, character count, or manual breaks)
- Slide count optimizer ("This works better as 7 slides, not 5")
- Character counter per slide
- Hook optimizer for slide 1
- CTA suggestions for final slide

**Input:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ CONTENT PLANNING                                                    │
│                                                                     │
│ Paste your content (or start from scratch):                         │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 5 Things I Wish I Knew Before Starting My Business              │ │
│ │                                                                 │ │
│ │ 1. Your first idea is usually wrong                            │ │
│ │ Starting a business means being ready to pivot. My first       │ │
│ │ product completely flopped, but the feedback led me to...      │ │
│ │                                                                 │ │
│ │ 2. Cash flow matters more than revenue                         │ │
│ │ You can be "profitable" on paper and still run out of money.   │ │
│ │ I learned this the hard way when...                            │ │
│ │                                                                 │ │
│ │ [continues...]                                                  │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ Split options:                                                      │
│ ○ Auto-split by paragraphs                                         │
│ ● Auto-split (one point per slide)                                 │
│ ○ Manual (I'll add breaks myself)                                  │
│                                                                     │
│ Target slides: [7▼] (Recommended: 7-10 for engagement)             │
│                                                                     │
│ [Split Content →]                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

**Output:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ YOUR CAROUSEL: 7 slides                                             │
│                                                                     │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│ │ SLIDE 1    │ │ SLIDE 2    │ │ SLIDE 3    │ │ SLIDE 4    │        │
│ │ ────────   │ │ ────────   │ │ ────────   │ │ ────────   │        │
│ │ 5 Things I │ │ 1. Your    │ │ 2. Cash    │ │ 3. Your    │        │
│ │ Wish I     │ │ first idea │ │ flow       │ │ network is │        │
│ │ Knew...    │ │ is usually │ │ matters    │ │ your net   │        │
│ │            │ │ wrong      │ │ more...    │ │ worth      │        │
│ │ 45 chars ✓ │ │ 187 chars ✓│ │ 203 chars ✓│ │ 156 chars ✓│        │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │
│                                                                     │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐                       │
│ │ SLIDE 5    │ │ SLIDE 6    │ │ SLIDE 7    │                       │
│ │ ────────   │ │ ────────   │ │ ────────   │                       │
│ │ 4. Done is │ │ 5. Take    │ │ Save this  │                       │
│ │ better     │ │ care of    │ │ for when   │                       │
│ │ than       │ │ yourself   │ │ you need   │                       │
│ │ perfect    │ │ first      │ │ it! ❤️     │                       │
│ │ 178 chars ✓│ │ 192 chars ✓│ │ 67 chars ✓ │                       │
│ └────────────┘ └────────────┘ └────────────┘                       │
│                                                                     │
│ Click any slide to edit • Drag to reorder                          │
│                                                                     │
│ [← Back to content] [Continue to Design →]                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 2. Image Upload Mode

**For photo-based carousels:**
- Upload multiple images (drag-and-drop)
- Reorder via drag-and-drop
- Crop/resize for Instagram dimensions
- Add text overlays
- Apply consistent filters/treatments

```
┌─────────────────────────────────────────────────────────────────────┐
│ IMAGE CAROUSEL                                                      │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │                                                                 │ │
│ │     📁 Drag & drop images here, or click to upload             │ │
│ │                                                                 │ │
│ │     Supported: JPG, PNG, WEBP • Max 10 images                  │ │
│ │                                                                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ Uploaded (5 images):                                                │
│                                                                     │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│ │ [Image 1]  │ │ [Image 2]  │ │ [Image 3]  │ │ [Image 4]  │        │
│ │  ≡ drag    │ │  ≡ drag    │ │  ≡ drag    │ │  ≡ drag    │        │
│ │ [✂️ Crop]  │ │ [✂️ Crop]  │ │ [✂️ Crop]  │ │ [✂️ Crop]  │        │
│ │ [🗑️ Delete]│ │ [🗑️ Delete]│ │ [🗑️ Delete]│ │ [🗑️ Delete]│        │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │
│                                                                     │
│ Image format:                                                       │
│ ● Square (1:1) - 1080×1080                                         │
│ ○ Portrait (4:5) - 1080×1350 (recommended for carousels)           │
│ ○ Landscape (1.91:1) - 1080×566                                    │
│                                                                     │
│ [Continue to Design →]                                              │
└─────────────────────────────────────────────────────────────────────┘
```

### 3. Design Studio

**Template Selection:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ DESIGN STUDIO                                                       │
│                                                                     │
│ Choose a template (or start blank):                                 │
│                                                                     │
│ EDUCATIONAL                                                         │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│ │ ░░░░░░░░░░ │ │ ▓▓▓▓▓▓▓▓▓▓ │ │ ┌────────┐ │ │ ══════════ │        │
│ │            │ │ #1         │ │ │  01    │ │ │            │        │
│ │ HEADLINE   │ │            │ │ │────────│ │ │ Title Here │        │
│ │            │ │ Point text │ │ │ Text   │ │ │ ────────── │        │
│ │ @handle    │ │            │ │ │        │ │ │ @username  │        │
│ │  Clean     │ │  Gradient  │ │ │ Boxed  │ │ │  Minimal   │        │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │
│                                                                     │
│ STORYTELLING                                                        │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│ │ "Quote     │ │ ┌────────┐ │ │ Before     │ │ PHOTO      │        │
│ │  goes      │ │ │ PHOTO  │ │ │    ↓       │ │ ─────────  │        │
│ │  here"     │ │ │────────│ │ │ After      │ │ Caption    │        │
│ │            │ │ │ Caption│ │ │            │ │ text here  │        │
│ │   Quote    │ │ │  Photo │ │ │ Transform  │ │  Overlay   │        │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │
│                                                                     │
│ [Browse all templates] [Start blank]                                │
└─────────────────────────────────────────────────────────────────────┘
```

**Design Editor:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ EDITING: Slide 1 of 7                                               │
│                                                                     │
│ ┌─────────────────────────────────┐  ┌─────────────────────────┐   │
│ │                                 │  │ STYLE                   │   │
│ │                                 │  │                         │   │
│ │     ┌─────────────────────┐     │  │ Background              │   │
│ │     │                     │     │  │ [Solid ▼] [■ #4F46E5]  │   │
│ │     │   5 Things I        │     │  │                         │   │
│ │     │   Wish I Knew       │     │  │ ○ Gradient              │   │
│ │     │   Before Starting   │     │  │   [■ #4F46E5] → [■ #76] │   │
│ │     │   My Business       │     │  │                         │   │
│ │     │                     │     │  │ Pattern: [None ▼]       │   │
│ │     │                     │     │  │                         │   │
│ │     │       @jessesmit    │     │  │ ─────────────────────   │   │
│ │     │                     │     │  │                         │   │
│ │     └─────────────────────┘     │  │ TEXT                    │   │
│ │                                 │  │                         │   │
│ │  [1080 × 1350]                  │  │ Headline font           │   │
│ │                                 │  │ [Inter ▼] [Bold ▼]      │   │
│ └─────────────────────────────────┘  │ Size: [===●===] 64px    │   │
│                                      │ Color: [■ #FFFFFF]      │   │
│ ┌──────────────────────────────────┐ │                         │   │
│ │ [◀ Prev] Slide 1 [●○○○○○○] [Next ▶]│ │ Handle font           │   │
│ └──────────────────────────────────┘ │ [Inter ▼] [Regular ▼]   │   │
│                                      │ Size: [===●===] 24px    │   │
│ Apply to all slides:                 │                         │   │
│ [Apply colors] [Apply fonts]         │ ─────────────────────   │   │
│                                      │                         │   │
│                                      │ LOGO                    │   │
│                                      │ [Upload logo]           │   │
│                                      │ Position: [Bottom ▼]    │   │
│                                      └─────────────────────────┘   │
│                                                                     │
│ [← Back] [Preview Carousel →]                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 4. Preview Modes

**Carousel Swipe Preview:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ PREVIEW: Carousel                                                   │
│                                                                     │
│                    ┌──────────────────────┐                        │
│                    │ ┌──────────────────┐ │                        │
│                    │ │                  │ │                        │
│                    │ │   5 Things I     │ │                        │
│                    │ │   Wish I Knew    │ │                        │
│                    │ │   Before Starting│ │                        │
│                    │ │   My Business    │ │                        │
│                    │ │                  │ │                        │
│                    │ │     @jessesmit   │ │                        │
│                    │ │                  │ │                        │
│                    │ └──────────────────┘ │                        │
│                    │      [●○○○○○○]       │                        │
│                    │                      │                        │
│                    │ ♡ 💬 ➤ 🔖           │                        │
│                    └──────────────────────┘                        │
│                                                                     │
│         [◀ Previous]    Swipe or click arrows    [Next ▶]          │
│                                                                     │
│ Looks good?                                                         │
│ [← Edit Design] [Preview on Grid →] [Export →]                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Grid Preview (THE DIFFERENTIATOR):**
```
┌─────────────────────────────────────────────────────────────────────┐
│ PREVIEW: Your Instagram Grid                                        │
│                                                                     │
│ See how your carousel's cover (Slide 1) will look on your profile: │
│                                                                     │
│ Option 1: Upload screenshots of your current grid                   │
│ [Upload grid screenshots]                                           │
│                                                                     │
│ Option 2: Paste your Instagram username (we'll fetch your grid)     │
│ [@________________] [Load Grid]                                     │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ YOUR GRID PREVIEW:                                                  │
│                                                                     │
│ ┌─────────────────────────────────────────────────────┐            │
│ │                                                     │            │
│ │  ┌────────┐ ┌────────┐ ┌────────┐                  │            │
│ │  │████████│ │████████│ │████████│  ← Your recent   │            │
│ │  │ post 1 │ │ post 2 │ │ post 3 │    posts         │            │
│ │  └────────┘ └────────┘ └────────┘                  │            │
│ │                                                     │            │
│ │  ┌────────┐ ┌────────┐ ┌────────┐                  │            │
│ │  │████████│ │████████│ │████████│                  │            │
│ │  │ post 4 │ │ post 5 │ │ post 6 │                  │            │
│ │  └────────┘ └────────┘ └────────┘                  │            │
│ │                                                     │            │
│ │  ┌────────┐ ┌────────┐ ┌────────┐                  │            │
│ │  │▓▓▓▓▓▓▓▓│ │████████│ │████████│                  │            │
│ │  │ NEW!   │ │ post 8 │ │ post 9 │  ← Your new     │            │
│ │  │carousel│ │        │ │        │    carousel      │            │
│ │  └────────┘ └────────┘ └────────┘                  │            │
│ │                                                     │            │
│ └─────────────────────────────────────────────────────┘            │
│                                                                     │
│ ✓ Colors complement your existing grid                             │
│ ⚠ Consider: Your last 3 posts are also purple — add variety?       │
│                                                                     │
│ [← Edit Design] [Export →]                                          │
└─────────────────────────────────────────────────────────────────────┘
```

### 5. Export

```
┌─────────────────────────────────────────────────────────────────────┐
│ EXPORT YOUR CAROUSEL                                                │
│                                                                     │
│ Images:                                                             │
│                                                                     │
│ [📥 Download All Slides (ZIP)]                                      │
│                                                                     │
│ Individual slides:                                                  │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│ │ [Slide 1]  │ │ [Slide 2]  │ │ [Slide 3]  │ │ [Slide 4]  │        │
│ │ [Download] │ │ [Download] │ │ [Download] │ │ [Download] │        │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │
│                                                                     │
│ Format: ● PNG (best quality)  ○ JPG (smaller file)                 │
│ Size: 1080 × 1350 (4:5 Portrait)                                   │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Caption:                                                            │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 5 things I wish I knew before starting my business 👇          │ │
│ │                                                                 │ │
│ │ After 10 years of entrepreneurship, these lessons stand out:   │ │
│ │                                                                 │ │
│ │ 1️⃣ Your first idea is usually wrong                            │ │
│ │ 2️⃣ Cash flow > Revenue                                          │ │
│ │ 3️⃣ Your network is your net worth                               │ │
│ │ 4️⃣ Done is better than perfect                                  │ │
│ │ 5️⃣ Take care of yourself first                                  │ │
│ │                                                                 │ │
│ │ Save this for when you need it! ❤️                              │ │
│ │                                                                 │ │
│ │ #entrepreneurship #businesstips #startuptips #foundertips       │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ [Copy Caption]                                                      │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Naming convention:                                                  │
│ Files will be named: carousel-[number].png                          │
│ Example: carousel-01.png, carousel-02.png, etc.                     │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Save this project:                                                  │
│ [💾 Save Draft] (requires email to save)                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6. Saved Projects / Brand Kit

```
┌─────────────────────────────────────────────────────────────────────┐
│ MY PROJECTS                                                         │
│                                                                     │
│ ┌──────────────────────────────────────────────────────────────┐   │
│ │ BRAND KIT (Saved settings for all projects)                   │   │
│ │                                                               │   │
│ │ Colors:    [■ #4F46E5] [■ #10B981] [■ #F59E0B] [■ #FFFFFF]  │   │
│ │ Font:      Inter                                              │   │
│ │ Logo:      [logo.png] ✓                                       │   │
│ │ Handle:    @jessesmit                                         │   │
│ │                                                               │   │
│ │ [Edit Brand Kit]                                              │   │
│ └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│ RECENT PROJECTS:                                                    │
│                                                                     │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐        │
│ │ [Preview]  │ │ [Preview]  │ │ [Preview]  │ │            │        │
│ │            │ │            │ │            │ │     +      │        │
│ │ 5 Things   │ │ How I      │ │ Product    │ │            │        │
│ │ I Wish...  │ │ Grew...    │ │ Launch     │ │   New      │        │
│ │            │ │            │ │            │ │  Project   │        │
│ │ 7 slides   │ │ 10 slides  │ │ 5 slides   │ │            │        │
│ │ Jan 24     │ │ Jan 20     │ │ Jan 18     │ │            │        │
│ │            │ │            │ │            │ │            │        │
│ │ [Edit]     │ │ [Edit]     │ │ [Edit]     │ │            │        │
│ │ [Duplicate]│ │ [Duplicate]│ │ [Duplicate]│ │            │        │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Template Library

### Template Categories

**Educational:**
1. Clean — Solid color, centered text
2. Numbered — Large number, supporting text
3. Gradient — Two-tone gradient background
4. Boxed — Text in a contained box
5. Minimal — Lots of whitespace

**Storytelling:**
6. Quote — Large quotation marks
7. Photo + Caption — Image top, text bottom
8. Before/After — Split comparison
9. Timeline — Chronological story

**Lists/Tips:**
10. Checklist — Checkbox graphics
11. Bullet Points — Clean list format
12. Ranking — #1, #2, #3 style

**Brand/Promo:**
13. Product Feature — Image with callouts
14. Testimonial — Quote with photo
15. Announcement — Bold statement

### Template Technical Structure

```javascript
const templates = {
  clean: {
    id: 'clean',
    name: 'Clean',
    category: 'educational',
    thumbnail: '/templates/clean-thumb.png',
    layout: {
      background: { type: 'solid', default: '#4F46E5' },
      elements: [
        {
          type: 'text',
          id: 'headline',
          role: 'headline',
          position: { x: 'center', y: 'center' },
          style: {
            fontSize: 64,
            fontWeight: 700,
            textAlign: 'center',
            color: '#FFFFFF',
            maxWidth: '80%',
          }
        },
        {
          type: 'text',
          id: 'handle',
          role: 'handle',
          position: { x: 'center', y: 'bottom', offsetY: 60 },
          style: {
            fontSize: 24,
            fontWeight: 400,
            textAlign: 'center',
            color: '#FFFFFF',
            opacity: 0.8,
          }
        },
        {
          type: 'image',
          id: 'logo',
          role: 'logo',
          position: { x: 'center', y: 'bottom', offsetY: 100 },
          style: {
            maxWidth: 120,
            maxHeight: 40,
          },
          optional: true,
        }
      ]
    }
  },
  // ... more templates
};
```

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| Canvas/Editor | Fabric.js or Konva.js | Free |
| State Management | Zustand or React Context | Free |
| Local Storage | Browser localStorage | Free |
| Image Processing | Sharp or browser Canvas API | Free |
| Drag & Drop | react-dnd or native | Free |
| Styling | Tailwind CSS | Free |

**Total recurring cost for MVP: $0**

**Future costs (if saving to cloud):**
- Supabase storage: Free tier (1GB)
- Or Cloudinary: Free tier (25GB bandwidth)

### Image Generation Approach

**Option A: Canvas API (Simpler)**
```javascript
function generateSlideImage(slideData, dimensions) {
  const canvas = document.createElement('canvas');
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = slideData.background.color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw text
  ctx.font = `${slideData.headline.fontSize}px ${slideData.headline.font}`;
  ctx.fillStyle = slideData.headline.color;
  ctx.textAlign = 'center';
  ctx.fillText(slideData.headline.text, canvas.width / 2, canvas.height / 2);
  
  // Return as blob
  return new Promise(resolve => {
    canvas.toBlob(resolve, 'image/png');
  });
}
```

**Option B: Fabric.js (More Features)**
```javascript
import { fabric } from 'fabric';

function createSlideCanvas(containerId, dimensions) {
  const canvas = new fabric.Canvas(containerId, {
    width: dimensions.width,
    height: dimensions.height,
  });
  
  // Add background
  canvas.setBackgroundColor('#4F46E5', canvas.renderAll.bind(canvas));
  
  // Add text object
  const headline = new fabric.Textbox('Your headline', {
    left: canvas.width / 2,
    top: canvas.height / 2,
    originX: 'center',
    originY: 'center',
    fontSize: 64,
    fontWeight: 'bold',
    fill: '#FFFFFF',
    textAlign: 'center',
    width: canvas.width * 0.8,
  });
  
  canvas.add(headline);
  return canvas;
}
```

### Data Structure

```javascript
// Carousel project data structure
const carouselProject = {
  id: 'uuid',
  name: 'My Carousel',
  createdAt: '2026-01-26T...',
  updatedAt: '2026-01-26T...',
  
  settings: {
    dimensions: { width: 1080, height: 1350 },
    format: 'portrait', // portrait, square, landscape
  },
  
  brandKit: {
    colors: ['#4F46E5', '#10B981', '#FFFFFF'],
    font: 'Inter',
    handle: '@jessesmit',
    logo: 'data:image/png;base64,...', // or URL
  },
  
  slides: [
    {
      id: 'slide-1',
      order: 0,
      template: 'clean',
      content: {
        headline: '5 Things I Wish I Knew',
        subheadline: '',
        body: '',
      },
      style: {
        background: { type: 'solid', color: '#4F46E5' },
        headlineColor: '#FFFFFF',
        headlineSize: 64,
      },
      image: null, // or base64/URL for photo slides
    },
    // ... more slides
  ],
  
  caption: {
    text: '5 things I wish I knew...',
    hashtags: ['#entrepreneurship', '#business'],
  }
};
```

### Local Storage for Drafts

```javascript
// Save project to localStorage
function saveProject(project) {
  const projects = JSON.parse(localStorage.getItem('carouselProjects') || '[]');
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push({ ...project, createdAt: new Date().toISOString() });
  }
  
  localStorage.setItem('carouselProjects', JSON.stringify(projects));
}

// Load projects from localStorage
function loadProjects() {
  return JSON.parse(localStorage.getItem('carouselProjects') || '[]');
}
```

---

## SEO Strategy

### Target Keywords
- "instagram carousel maker free"
- "carousel post creator"
- "instagram carousel template"
- "instagram carousel generator"
- "carousel planner instagram"
- "instagram grid preview tool"
- "carousel post maker"

### Long-tail Opportunities
- "how to make instagram carousels"
- "instagram carousel size"
- "instagram carousel best practices"
- "free carousel templates instagram"

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "How to Create Instagram Carousels That Get Saved and Shared (Free Tool)"

**URL:** /blog/instagram-carousel-guide

**Target length:** 4,000-5,000 words

**Structure:**
1. Why carousels outperform single images (data)
2. Anatomy of a viral carousel:
   - The hook (slide 1)
   - The value (middle slides)
   - The CTA (final slide)
3. Optimal carousel length (7-10 slides)
4. Design principles:
   - Readability
   - Consistent branding
   - Visual hierarchy
5. Content types that work:
   - Educational tips
   - Storytelling
   - Before/after
   - Listicles
6. Technical specs (dimensions, file size)
7. Introduce the tool: "Create yours free →"
8. How to write carousel captions
9. Best posting times
10. Common mistakes

### Supporting Blog Posts

**Post 1: "Instagram Carousel Size Guide: Dimensions for 2026"**
- URL: /blog/instagram-carousel-size
- Length: 1,500 words
- Covers: All dimensions, aspect ratios, specs
- Links to: Creator tool

**Post 2: "50 Instagram Carousel Ideas (With Examples)"**
- URL: /blog/instagram-carousel-ideas
- Length: 3,000 words
- Covers: Categorized ideas by niche
- Links to: Creator tool
- **High traffic:** List posts perform well

**Post 3: "How to Write Hooks That Stop the Scroll"**
- URL: /blog/instagram-hooks
- Length: 2,000 words
- Covers: Hook formulas, examples, psychology
- Links to: Creator tool

**Post 4: "Instagram Grid Aesthetic: Planning Your Profile"**
- URL: /blog/instagram-grid-planning
- Length: 2,000 words
- Covers: Grid layouts, color schemes, planning tools
- Links to: Creator tool (grid preview feature)

**Post 5: "I Posted 100 Carousels — Here's What I Learned"**
- URL: /blog/instagram-carousel-lessons
- Length: 2,500 words
- Covers: Real data, what worked, what didn't
- Links to: Creator tool

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tool + pillar article | Core assets |
| 2 | Size/dimensions guide | Reference content |
| 3 | 50 carousel ideas list | High-traffic list |
| 4 | Hooks guide | Practical value |
| 5 | 100 carousels case study | Social proof |

---

## Lead Capture Strategy

### Free Tier
- Full creation functionality
- All templates
- Export images
- Local draft saving (browser)

### Email Capture Triggers
- "Save to cloud (access from any device)" — requires email
- "Get 10 new templates every month" — requires email
- "Save your brand kit" — requires email
- "Download caption templates pack" — requires email

---

## Development Phases

### Phase 1: Content Planning Mode (1 week)
- [ ] Content input and splitting
- [ ] Slide card view
- [ ] Reordering (drag-and-drop)
- [ ] Character counting
- [ ] Basic slide editing

### Phase 2: Design Studio (1.5 weeks)
- [ ] Template library (8-10 templates)
- [ ] Template rendering with Canvas/Fabric.js
- [ ] Color customization
- [ ] Font selection
- [ ] Text editing on canvas
- [ ] Logo upload

### Phase 3: Preview & Export (1 week)
- [ ] Carousel swipe preview
- [ ] Image export (PNG/ZIP)
- [ ] Caption builder
- [ ] Download with numbered filenames

### Phase 4: Grid Preview (3-5 days)
- [ ] Grid screenshot upload
- [ ] Grid mockup generation
- [ ] Position preview (where carousel fits)
- [ ] Color harmony suggestions

### Phase 5: Save/Resume (3-5 days)
- [ ] localStorage implementation
- [ ] Project list view
- [ ] Brand kit storage
- [ ] Email capture for cloud save

### Phase 6: Polish & Content (1 week)
- [ ] Mobile responsiveness
- [ ] Loading states
- [ ] Landing page
- [ ] Publish pillar article
- [ ] Publish supporting posts

### Phase 7: Enhancements (Future)
- [ ] Image upload mode
- [ ] Photo editing (crop, filter)
- [ ] Cloud storage integration
- [ ] More templates
- [ ] Scheduling integration

---

## Success Metrics

- **Usage:** Carousels created per week
- **Engagement:** % who export vs abandon
- **Templates:** Which templates are most popular
- **Content:** Pillar article ranking
- **Conversion:** Email capture rate
- **Sharing:** Carousels shared with "Made with digitaljesse.com"
