# Social Media Image Resizer — Build Plan

## Quick Summary

**What:** Upload multiple images, select which platform sizes you need, get perfectly cropped versions for each. The tool intelligently picks the best source image for each aspect ratio to avoid ugly cropping.

**Cost to build & run:** $0 — Pure frontend using Canvas API, no server processing needed.

**Tech:** Next.js + Browser Canvas API + JSZip for downloads.

**Differentiator:** Multi-image input means better results. Upload a landscape AND portrait shot, tool picks the right one for each output. No more awkward crops.

---

## The Core Problem

Creating images for social media is frustrating:
- Each platform has different optimal dimensions
- One image doesn't fit all aspect ratios well
- Cropping a landscape image for Stories cuts off the subject
- Manually resizing in Canva/Photoshop takes forever
- Existing tools are either paid, ad-covered, or single-image only
- You end up with awkward crops or skipping platforms entirely

**The solution:** Upload 2-3 versions of your image (landscape, portrait, square), and let the tool pick the best source for each platform.

---

## What Makes This Different

| Single-Image Resizers | Your Tool |
|----------------------|-----------|
| Upload 1 image | Upload multiple images |
| Force-crop everything | Smart source selection |
| Awkward results | Best fit for each aspect ratio |
| All or nothing | Choose which outputs you need |
| Re-upload for each platform | One session, all exports |

**The Key Insight:**

If you upload:
- 1 landscape image (16:9)
- 1 portrait image (4:5)
- 1 square image (1:1)

The tool automatically uses:
- Landscape → Twitter, YouTube thumbnail, LinkedIn
- Portrait → Instagram Story, TikTok, Pinterest
- Square → Instagram post, Facebook, profile pictures

**Result:** Every output looks intentional, not forced.

---

## Platform Dimensions Reference

### All Supported Outputs

| Platform | Type | Dimensions | Aspect Ratio | Best Source |
|----------|------|------------|--------------|-------------|
| Instagram | Post (Square) | 1080 × 1080 | 1:1 | Square |
| Instagram | Post (Portrait) | 1080 × 1350 | 4:5 | Portrait |
| Instagram | Post (Landscape) | 1080 × 566 | 1.91:1 | Landscape |
| Instagram | Story/Reel | 1080 × 1920 | 9:16 | Portrait |
| Instagram | Profile Picture | 320 × 320 | 1:1 | Square |
| Twitter/X | Post | 1600 × 900 | 16:9 | Landscape |
| Twitter/X | Header | 1500 × 500 | 3:1 | Landscape (wide) |
| Twitter/X | Profile Picture | 400 × 400 | 1:1 | Square |
| LinkedIn | Post | 1200 × 627 | 1.91:1 | Landscape |
| LinkedIn | Cover | 1584 × 396 | 4:1 | Landscape (wide) |
| LinkedIn | Profile Picture | 400 × 400 | 1:1 | Square |
| Facebook | Post | 1200 × 630 | 1.91:1 | Landscape |
| Facebook | Cover | 820 × 312 | 2.63:1 | Landscape (wide) |
| Facebook | Profile Picture | 170 × 170 | 1:1 | Square |
| YouTube | Thumbnail | 1280 × 720 | 16:9 | Landscape |
| YouTube | Channel Banner | 2560 × 1440 | 16:9 | Landscape |
| TikTok | Post/Cover | 1080 × 1920 | 9:16 | Portrait |
| Pinterest | Pin | 1000 × 1500 | 2:3 | Portrait |
| Threads | Post | 1080 × 1350 | 4:5 | Portrait |
| Open Graph | Social Share | 1200 × 630 | 1.91:1 | Landscape |

### Aspect Ratio Groups

| Group | Ratio | Best Source | Platforms |
|-------|-------|-------------|-----------|
| Square | 1:1 | Square or any | IG Post, Profile pics |
| Standard Portrait | 4:5 | Portrait | IG Portrait, Threads |
| Tall Portrait | 9:16 | Portrait | Stories, Reels, TikTok |
| Pinterest Portrait | 2:3 | Portrait | Pinterest |
| Standard Landscape | 16:9 | Landscape | Twitter, YouTube |
| Social Landscape | 1.91:1 | Landscape | LinkedIn, Facebook, OG |
| Wide Banner | 3:1 to 4:1 | Landscape (wide) | Headers, covers |

---

## User Flow

### Step 1: Upload Images

```
┌─────────────────────────────────────────────────────────────────────┐
│ SOCIAL MEDIA IMAGE RESIZER                                          │
│ Upload multiple images for best results across all platforms        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │         📁 Drag & drop your images here                    │   │
│  │            or click to browse                               │   │
│  │                                                             │   │
│  │         Upload 1-5 images for best results                 │   │
│  │         Supports: JPG, PNG, WEBP (max 20MB each)           │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  💡 TIP: Upload a landscape, portrait, AND square version for      │
│     perfect crops on every platform.                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

After upload:

┌─────────────────────────────────────────────────────────────────────┐
│ YOUR IMAGES (3)                                                     │
│                                                                     │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐     │
│ │                  │ │                  │ │                  │     │
│ │   [Landscape     │ │   [Portrait      │ │   [Square        │     │
│ │    preview]      │ │    preview]      │ │    preview]      │     │
│ │                  │ │                  │ │                  │     │
│ │ 1920 × 1080      │ │ 1080 × 1350      │ │ 1080 × 1080      │     │
│ │ 16:9 Landscape   │ │ 4:5 Portrait     │ │ 1:1 Square       │     │
│ │ [🗑️ Remove]      │ │ [🗑️ Remove]      │ │ [🗑️ Remove]      │     │
│ └──────────────────┘ └──────────────────┘ └──────────────────┘     │
│                                                                     │
│ [+ Add another image]                                               │
│                                                                     │
│ ✓ Great! You have landscape, portrait, and square covered.         │
│                                                                     │
│ [Continue →]                                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 2: Select Outputs

```
┌─────────────────────────────────────────────────────────────────────┐
│ SELECT OUTPUTS                                                      │
│ Choose which sizes you need (we'll pick the best source image)     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ QUICK SELECT                                                        │
│                                                                     │
│ [All Platforms] [Instagram Only] [Twitter Only] [LinkedIn Only]    │
│ [My Favorites ★]                                                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ INSTAGRAM                                                           │
│                                                                     │
│ ☑ Post (Square)      1080×1080    ← Will use: Square image         │
│ ☑ Post (Portrait)    1080×1350    ← Will use: Portrait image       │
│ ☐ Post (Landscape)   1080×566     ← Would use: Landscape image     │
│ ☑ Story/Reel         1080×1920    ← Will use: Portrait image       │
│ ☐ Profile Picture    320×320      ← Would use: Square image        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ TWITTER/X                                                           │
│                                                                     │
│ ☑ Post               1600×900     ← Will use: Landscape image      │
│ ☐ Header             1500×500     ← Would use: Landscape image     │
│ ☐ Profile Picture    400×400      ← Would use: Square image        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ LINKEDIN                                                            │
│                                                                     │
│ ☑ Post               1200×627     ← Will use: Landscape image      │
│ ☐ Cover              1584×396     ← Would use: Landscape image     │
│ ☐ Profile Picture    400×400      ← Would use: Square image        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ FACEBOOK                                                            │
│                                                                     │
│ ☐ Post               1200×630     ← Would use: Landscape image     │
│ ☐ Cover              820×312      ← Would use: Landscape image     │
│ ☐ Profile Picture    170×170      ← Would use: Square image        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ YOUTUBE                                                             │
│                                                                     │
│ ☑ Thumbnail          1280×720     ← Will use: Landscape image      │
│ ☐ Channel Banner     2560×1440    ← Would use: Landscape image     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ OTHER                                                               │
│                                                                     │
│ ☑ TikTok Cover       1080×1920    ← Will use: Portrait image       │
│ ☐ Pinterest Pin      1000×1500    ← Would use: Portrait image      │
│ ☐ Threads Post       1080×1350    ← Would use: Portrait image      │
│ ☐ Open Graph         1200×630     ← Would use: Landscape image     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ SUMMARY                                                             │
│                                                                     │
│ Selected: 7 outputs                                                 │
│ • 2 from landscape source                                          │
│ • 3 from portrait source                                           │
│ • 2 from square source                                             │
│                                                                     │
│ [Save as "My Favorites" ★]                                          │
│                                                                     │
│ [Generate Images →]                                                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 3: Preview & Adjust

```
┌─────────────────────────────────────────────────────────────────────┐
│ PREVIEW & ADJUST                                                    │
│ Click any image to adjust the crop                                 │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐              │
│ │               │ │               │ │               │              │
│ │  IG Square    │ │  IG Portrait  │ │  IG Story     │              │
│ │  1080×1080    │ │  1080×1350    │ │  1080×1920    │              │
│ │               │ │               │ │               │              │
│ │ Source:Square │ │ Source:Portrait│ │ Source:Portrait│             │
│ │   [Adjust]    │ │   [Adjust]    │ │   [Adjust]    │              │
│ │   ✓ Looks good│ │   ✓ Looks good│ │   ✓ Looks good│              │
│ └───────────────┘ └───────────────┘ └───────────────┘              │
│                                                                     │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐              │
│ │               │ │               │ │               │              │
│ │  Twitter      │ │  LinkedIn     │ │  YouTube      │              │
│ │  1600×900     │ │  1200×627     │ │  1280×720     │              │
│ │               │ │               │ │               │              │
│ │ Source:Landsc.│ │ Source:Landsc.│ │ Source:Landsc.│              │
│ │   [Adjust]    │ │   [Adjust]    │ │   [Adjust]    │              │
│ │   ✓ Looks good│ │   ✓ Looks good│ │   ✓ Looks good│              │
│ └───────────────┘ └───────────────┘ └───────────────┘              │
│                                                                     │
│ ┌───────────────┐                                                  │
│ │               │                                                  │
│ │  TikTok       │                                                  │
│ │  1080×1920    │                                                  │
│ │               │                                                  │
│ │ Source:Portrait│                                                  │
│ │   [Adjust]    │                                                  │
│ │   ✓ Looks good│                                                  │
│ └───────────────┘                                                  │
│                                                                     │
│ [← Back] [Download All →]                                           │
└─────────────────────────────────────────────────────────────────────┘
```

### Crop Adjustment Modal

```
┌─────────────────────────────────────────────────────────────────────┐
│ ADJUST CROP: Instagram Story (1080×1920)                           │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │                                                                 │ │
│ │                    ┌─────────────┐                              │ │
│ │                    │             │                              │ │
│ │     [Full         │  CROP AREA  │                              │ │
│ │      source       │             │                              │ │
│ │      image        │  Drag to    │                              │ │
│ │      shown        │  reposition │                              │ │
│ │      with crop    │             │                              │ │
│ │      overlay]     │             │                              │ │
│ │                    │             │                              │ │
│ │                    └─────────────┘                              │ │
│ │                                                                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ Source image: [Portrait ▼] (Change source)                          │
│                                                                     │
│ Zoom: [=====●======] 100%                                          │
│                                                                     │
│ Quick position:                                                     │
│ [Top] [Center] [Bottom] [Left] [Right]                             │
│                                                                     │
│ [Cancel] [Apply]                                                    │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 4: Download

```
┌─────────────────────────────────────────────────────────────────────┐
│ DOWNLOAD YOUR IMAGES                                                │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│ Format: ● PNG (best quality)  ○ JPG (smaller file)  ○ WEBP        │
│                                                                     │
│ Quality (JPG only): [=======●===] 85%                              │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ [📥 Download All as ZIP]                                            │
│                                                                     │
│ Files included (7):                                                 │
│ • image-instagram-square-1080x1080.png                             │
│ • image-instagram-portrait-1080x1350.png                           │
│ • image-instagram-story-1080x1920.png                              │
│ • image-twitter-post-1600x900.png                                  │
│ • image-linkedin-post-1200x627.png                                 │
│ • image-youtube-thumbnail-1280x720.png                             │
│ • image-tiktok-cover-1080x1920.png                                 │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Or download individually:                                           │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Instagram Square    1080×1080    [Download]                     │ │
│ │ Instagram Portrait  1080×1350    [Download]                     │ │
│ │ Instagram Story     1080×1920    [Download]                     │ │
│ │ Twitter Post        1600×900     [Download]                     │ │
│ │ LinkedIn Post       1200×627     [Download]                     │ │
│ │ YouTube Thumbnail   1280×720     [Download]                     │ │
│ │ TikTok Cover        1080×1920    [Download]                     │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ [Start Over]                                                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Smart Source Selection Algorithm

### How It Works

```javascript
function selectBestSource(images, targetAspectRatio) {
  // Calculate aspect ratio for each uploaded image
  const imageAspectRatios = images.map(img => ({
    image: img,
    ratio: img.width / img.height,
    type: categorizeAspectRatio(img.width / img.height)
  }));
  
  // Categorize target
  const targetType = categorizeAspectRatio(targetAspectRatio);
  
  // Priority 1: Exact or near match
  const exactMatch = imageAspectRatios.find(
    img => Math.abs(img.ratio - targetAspectRatio) < 0.1
  );
  if (exactMatch) return exactMatch.image;
  
  // Priority 2: Same orientation category
  const sameCategory = imageAspectRatios.find(
    img => img.type === targetType
  );
  if (sameCategory) return sameCategory.image;
  
  // Priority 3: Closest ratio (will require more cropping)
  return imageAspectRatios.reduce((closest, current) => {
    const closestDiff = Math.abs(closest.ratio - targetAspectRatio);
    const currentDiff = Math.abs(current.ratio - targetAspectRatio);
    return currentDiff < closestDiff ? current : closest;
  }).image;
}

function categorizeAspectRatio(ratio) {
  if (ratio > 1.5) return 'landscape';
  if (ratio < 0.75) return 'portrait';
  return 'square';
}
```

### Source Selection Matrix

| Target Output | Aspect Ratio | 1st Choice | 2nd Choice | 3rd Choice |
|--------------|--------------|------------|------------|------------|
| IG Square | 1:1 | Square | Any (center crop) | — |
| IG Portrait | 4:5 | Portrait | Square (top align) | Landscape (heavy crop) |
| IG Story | 9:16 | Tall Portrait | Portrait (pad or crop) | Not recommended |
| Twitter Post | 16:9 | Landscape | Square (side crop) | Portrait (heavy crop) |
| LinkedIn Post | 1.91:1 | Landscape | Square (side crop) | Portrait (heavy crop) |
| YouTube Thumb | 16:9 | Landscape | Square (side crop) | Portrait (heavy crop) |
| Pinterest Pin | 2:3 | Portrait | Square (top align) | Landscape (heavy crop) |

---

## Feature Set

### MVP Features

1. **Multi-Image Upload**
   - Upload 1-5 images
   - Drag and drop or browse
   - Preview with dimensions shown
   - Automatic aspect ratio detection

2. **Platform Selection**
   - Checkboxes for each output
   - Quick select presets (All, Instagram Only, etc.)
   - Save custom "My Favorites" preset
   - Shows which source image will be used

3. **Smart Source Selection**
   - Automatic best-fit selection
   - User can override (change source per output)
   - Visual indicator of source used

4. **Crop Adjustment**
   - Click to adjust any output
   - Drag to reposition crop area
   - Zoom control
   - Quick position buttons

5. **Preview Grid**
   - See all outputs at once
   - Visual confirmation before download

6. **Download**
   - ZIP download with all images
   - Individual downloads
   - Format selection (PNG, JPG, WEBP)
   - Quality control for JPG
   - Descriptive filenames

### V2 Features

7. **Focus Point**
   - Click on subject in source image
   - All crops center on that point
   - Especially useful for portraits/headshots

8. **Batch Processing**
   - Upload multiple "sets" of images
   - Process multiple products/posts at once

9. **Text Overlay**
   - Add text to all outputs
   - Consistent branding across sizes

10. **Watermark**
    - Add logo to all outputs
    - Position and opacity control

11. **Filters**
    - Apply same filter to all outputs
    - Brightness, contrast, saturation

12. **Brand Kit Integration**
    - Save color palette
    - Save logo
    - Apply to overlays/backgrounds

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| Image Processing | Browser Canvas API | Free |
| ZIP Generation | JSZip | Free |
| Drag & Drop | react-dropzone | Free |
| Cropping UI | react-image-crop | Free |
| Styling | Tailwind CSS | Free |

**Total recurring cost: $0**

### Client-Side Processing

All image processing happens in the browser:
- No server upload (privacy + speed)
- No file size limits from server
- Works offline after page load
- Faster for users

### Canvas-Based Resizing

```javascript
function resizeImage(sourceImage, targetWidth, targetHeight, cropArea) {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  
  // Calculate source crop coordinates
  const { x, y, width, height } = cropArea;
  
  // Draw cropped and resized image
  ctx.drawImage(
    sourceImage,
    x, y, width, height,           // Source crop
    0, 0, targetWidth, targetHeight // Destination
  );
  
  return canvas;
}

function canvasToBlob(canvas, format = 'image/png', quality = 0.92) {
  return new Promise(resolve => {
    canvas.toBlob(resolve, format, quality);
  });
}
```

### ZIP Generation

```javascript
import JSZip from 'jszip';

async function generateZip(images, format) {
  const zip = new JSZip();
  
  for (const img of images) {
    const blob = await canvasToBlob(img.canvas, format);
    zip.file(img.filename, blob);
  }
  
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  
  // Trigger download
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'social-media-images.zip';
  a.click();
}
```

---

## UX Considerations

### Single Image Fallback

If user uploads only one image:
- Show warning for poorly-matched aspect ratios
- "Your landscape image may not crop well for Stories"
- Suggest uploading additional images
- Still allow proceeding (user's choice)

### Mobile Experience

- Full functionality on mobile
- Touch-friendly crop adjustment
- Simplified UI on small screens
- Download to camera roll

### Error Handling

- Max file size warning (20MB)
- Unsupported format warning
- Image too small for target size warning
- Graceful handling of CORS issues with URLs

---

## SEO Strategy

### Target Keywords
- "social media image resizer"
- "resize image for instagram"
- "image resizer all social media"
- "social media image sizes"
- "resize image for all platforms"
- "instagram image size"
- "twitter image size"
- "multi platform image resizer"

### Long-tail Opportunities
- "resize one image for all social media"
- "instagram story dimensions"
- "youtube thumbnail size"
- "best image size for linkedin"

---

## Blog Content Strategy

### Pillar Article

**Title:** "Social Media Image Sizes: The Complete Guide for 2026 (Free Resizer Tool)"

**URL:** /blog/social-media-image-sizes

**Target length:** 3,500-4,000 words

**Structure:**
1. Why image sizes matter (algorithm, display, engagement)
2. Complete dimension reference by platform:
   - Instagram (all formats)
   - Twitter/X
   - LinkedIn
   - Facebook
   - YouTube
   - TikTok
   - Pinterest
3. Aspect ratios explained
4. How to create images that work everywhere
5. Introduce the tool: "Or resize automatically →"
6. Tips for each platform
7. Common mistakes to avoid

### Supporting Posts

**Post 1: "Instagram Image Sizes: Every Format Explained"**
- URL: /blog/instagram-image-sizes
- Length: 2,000 words
- Covers: Posts, Stories, Reels, profile pics
- Links to: Tool

**Post 2: "Why Your Images Look Blurry on Social Media"**
- URL: /blog/blurry-social-media-images
- Length: 1,500 words
- Covers: Resolution, compression, dimensions
- Links to: Tool

**Post 3: "One Image, Seven Platforms: The Smart Creator's Guide"**
- URL: /blog/one-image-all-platforms
- Length: 1,800 words
- Covers: Multi-image strategy, cropping tips
- Links to: Tool

**Post 4: "LinkedIn Image Sizes That Get Engagement"**
- URL: /blog/linkedin-image-sizes
- Length: 1,500 words
- Covers: Posts, articles, company pages
- Links to: Tool

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch tool + pillar article | Core assets |
| 2 | Instagram sizes deep dive | Platform-specific |
| 3 | Blurry images troubleshooting | Problem-solving |
| 4 | One image, all platforms guide | Strategy |

---

## Lead Capture Strategy

### Free Tier (Everything)
- All features, no limits
- All platforms
- Unlimited resizing

### Email Capture Triggers
- "Save 'My Favorites' preset across sessions" — requires email
- "Get notified when platform sizes change" — requires email
- "Download our printable size cheat sheet" — requires email

---

## Development Phases

### Phase 1: Core MVP (1 week)
- [ ] Multi-image upload
- [ ] Aspect ratio detection
- [ ] Platform output checkboxes
- [ ] Smart source selection algorithm
- [ ] Basic crop and resize
- [ ] Preview grid
- [ ] Download (single and ZIP)

### Phase 2: Crop Adjustment (3-5 days)
- [ ] Click to adjust modal
- [ ] Drag to reposition
- [ ] Zoom control
- [ ] Change source per output
- [ ] Quick position buttons

### Phase 3: Polish (3-5 days)
- [ ] Format selection (PNG/JPG/WEBP)
- [ ] Quality slider
- [ ] "My Favorites" preset saving
- [ ] Mobile optimization
- [ ] Loading states

### Phase 4: Content (1 week)
- [ ] Publish pillar article
- [ ] Publish platform-specific guides
- [ ] Printable cheat sheet

### Phase 5: Enhancements (Future)
- [ ] Focus point feature
- [ ] Text overlay
- [ ] Watermark
- [ ] Batch processing
- [ ] Filters

---

## Success Metrics

- **Usage:** Images processed per week
- **Engagement:** Average outputs selected per session
- **Multi-image:** % who upload more than one image
- **Content:** Pillar article ranking for "social media image sizes"
- **Conversion:** Email capture rate
- **Return visits:** Users who come back
