# Link in Bio Page Builder — Build Plan

## Quick Summary

**What:** A visual page builder for creating "link in bio" pages like Linktree, but with full customization and no branding. Generates a standalone HTML file you can host on your own domain.

**Cost to build & run:** $0 — Pure frontend builder, generates static HTML.

**Tech:** Next.js + React drag-and-drop + HTML/CSS generation.

**Differentiator:** You own the output. No monthly fees, no "Powered by" branding, host on your domain, full design control.

---

## The Core Problem

Link in bio tools are overpriced and limiting:
- Linktree free tier has their branding everywhere
- Linktree Pro is $9/month ($108/year) for basic features
- You don't own your page or your data
- Limited design options
- Everyone's page looks the same
- Analytics go to them, not you
- If they shut down, your links are gone

**What creators actually need:**
- Simple page with their links
- Matches their brand
- Lives on their domain
- Works forever
- Costs nothing

---

## What Makes This Different

| Linktree Free | Linktree Pro ($9/mo) | Your Builder |
|---------------|----------------------|--------------|
| Their branding | No branding | No branding |
| Limited colors | Custom colors | Full customization |
| Their domain | Custom domain (extra) | Your domain (free) |
| Basic analytics | Better analytics | You add your own |
| 5 link types | More types | All types free |
| — | $108/year | $0/year |

**Key Value Prop:** Build once, own forever, pay nothing.

---

## Page Elements

### Available Components

| Element | Description | Free on Linktree? |
|---------|-------------|-------------------|
| Profile Section | Photo, name, bio | Yes |
| Link Button | Standard clickable link | Yes |
| Link with Icon | Link with emoji or custom icon | Pro only |
| Link with Thumbnail | Link with image preview | Pro only |
| Social Icons | Row of platform icons | Pro only |
| Header/Divider | Section organization | Yes |
| Text Block | Custom text/announcement | Pro only |
| Email Signup | Capture form | Pro only |
| Embed | YouTube, Spotify, etc. | Pro only |
| Button Group | Multiple buttons in a row | No |

**Your builder: All elements free.**

---

## User Interface

### Main Builder View

```
┌─────────────────────────────────────────────────────────────────────┐
│ LINK IN BIO BUILDER                                                 │
│ [New] [Save Draft] [Load Draft] [Preview] [Export]                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│ ┌───────────────────────┐  ┌──────────────────────────────────────┐│
│ │                       │  │ ADD ELEMENTS                         ││
│ │    LIVE PREVIEW       │  │                                      ││
│ │                       │  │ [+ Profile Section]                  ││
│ │ ┌───────────────────┐ │  │ [+ Link Button]                      ││
│ │ │                   │ │  │ [+ Link with Icon]                   ││
│ │ │   ┌───────────┐   │ │  │ [+ Social Icons]                     ││
│ │ │   │  [Photo]  │   │ │  │ [+ Header/Divider]                   ││
│ │ │   └───────────┘   │ │  │ [+ Text Block]                       ││
│ │ │   Jesse Smith     │ │  │ [+ Email Signup]                     ││
│ │ │   E-commerce &    │ │  │ [+ Embed]                            ││
│ │ │   Marketing       │ │  │                                      ││
│ │ │                   │ │  ├──────────────────────────────────────┤│
│ │ │ ┌───────────────┐ │ │  │ YOUR ELEMENTS                        ││
│ │ │ │ 🛒 My Store   │ │ │  │ (drag to reorder)                    ││
│ │ │ └───────────────┘ │ │  │                                      ││
│ │ │                   │ │  │ ≡ Profile Section                    ││
│ │ │ ┌───────────────┐ │ │  │   [Edit] [Delete]                    ││
│ │ │ │ 📧 Newsletter │ │ │  │                                      ││
│ │ │ └───────────────┘ │ │  │ ≡ 🛒 My Store                        ││
│ │ │                   │ │  │   luxurywallart.com                  ││
│ │ │ ┌───────────────┐ │ │  │   [Edit] [Delete]                    ││
│ │ │ │ 🎨 Masterpiece│ │ │  │                                      ││
│ │ │ │    Finder     │ │ │  │ ≡ 📧 Newsletter                      ││
│ │ │ └───────────────┘ │ │  │   subscribe link                     ││
│ │ │                   │ │  │   [Edit] [Delete]                    ││
│ │ │ ┌───────────────┐ │ │  │                                      ││
│ │ │ │ 📅 Book a Call│ │ │  │ ≡ 🎨 Masterpiece Finder              ││
│ │ │ └───────────────┘ │ │  │   masterpiecefinder.com              ││
│ │ │                   │ │  │   [Edit] [Delete]                    ││
│ │ │  [f] [t] [in] [ig]│ │  │                                      ││
│ │ │                   │ │  │ ≡ 📅 Book a Call                     ││
│ │ └───────────────────┘ │  │   calendly.com/...                   ││
│ │                       │  │   [Edit] [Delete]                    ││
│ │ Mobile preview        │  │                                      ││
│ │ [Toggle desktop view] │  │ ≡ Social Icons                       ││
│ └───────────────────────┘  │   [Edit] [Delete]                    ││
│                            │                                      ││
│                            └──────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Style Panel

```
┌─────────────────────────────────────────────────────────────────────┐
│ STYLE YOUR PAGE                                                     │
│ [Basic] [Advanced]                                                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ STARTER TEMPLATES                                                   │
│                                                                     │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│ │ ░░░░░░ │ │ ▓▓▓▓▓▓ │ │ ▒▒▒▒▒▒ │ │ ██████ │ │ ◊◊◊◊◊◊ │            │
│ │ Clean  │ │ Bold   │ │ Soft   │ │ Dark   │ │ Minimal│            │
│ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘            │
│                                                                     │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│ │ ▓░▓░▓░ │ │ ╔════╗ │ │ ~~~~~~ │ │ ▲▲▲▲▲▲ │ │ ██░░██ │            │
│ │Gradient│ │ Boxed  │ │ Waves  │ │ Geo    │ │ Split  │            │
│ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ CUSTOMIZE                                                           │
│                                                                     │
│ Background                                                          │
│ ○ Solid color      [■ #FFFFFF]                                     │
│ ● Gradient         [■ #667eea] → [■ #764ba2]                       │
│ ○ Image            [Upload...]                                      │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Buttons                                                             │
│ Color:             [■ #4F46E5]                                     │
│ Text color:        [■ #FFFFFF]                                     │
│ Style:             [Rounded ▼]  ○ Square ○ Rounded ● Pill          │
│ Fill:              [Filled ▼]   ● Filled ○ Outline ○ Soft          │
│ Shadow:            [=====●===]  Medium                             │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Text                                                                │
│ Name font:         [Inter ▼]                                        │
│ Name size:         [=====●===]  24px                               │
│ Name color:        [■ #1F2937]                                     │
│                                                                     │
│ Bio font:          [Inter ▼]                                        │
│ Bio color:         [■ #6B7280]                                     │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Layout                                                              │
│ Max width:         [====●=====]  480px                             │
│ Spacing:           [=====●====]  16px                              │
│ Button width:      ● Full width  ○ Auto                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Element Edit Modals

**Link Button Edit:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ EDIT LINK                                                           │
│                                                                     │
│ Link text:                                                          │
│ [My Shopify Store___________________]                               │
│                                                                     │
│ URL:                                                                │
│ [https://luxurywallart.com__________]                               │
│                                                                     │
│ Icon (optional):                                                    │
│ [🛒 ▼] or [Upload custom...]                                       │
│                                                                     │
│ Common icons:                                                       │
│ 🛒 🎨 📧 📱 🎵 📺 📷 💼 📝 🔗 🎯 💡                                │
│                                                                     │
│ Thumbnail (optional):                                               │
│ [Upload image...] Shows preview next to link                        │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Advanced:                                                           │
│ ☐ Open in new tab                                                  │
│ ☐ Highlight this link (featured style)                             │
│ ☐ Add click tracking parameter                                     │
│                                                                     │
│ [Cancel] [Save]                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Profile Section Edit:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ EDIT PROFILE                                                        │
│                                                                     │
│ Profile photo:                                                      │
│ ┌─────────────┐                                                    │
│ │             │  [Upload new photo]                                │
│ │   [Photo]   │  [Remove photo]                                    │
│ │             │                                                    │
│ └─────────────┘                                                    │
│                                                                     │
│ Photo shape: ● Circle  ○ Square  ○ Rounded square                  │
│                                                                     │
│ Name:                                                               │
│ [Jesse Smith_________________________]                              │
│                                                                     │
│ Bio (optional):                                                     │
│ [E-commerce & Marketing______________]                              │
│ [Building tools for creators_________]                              │
│                                                                     │
│ Character count: 62/150                                             │
│                                                                     │
│ [Cancel] [Save]                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Social Icons Edit:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ EDIT SOCIAL ICONS                                                   │
│                                                                     │
│ Add your social links:                                              │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ [Instagram ▼]  [@jessesmit_______________] [🗑️]                 │ │
│ │ [Twitter/X ▼]  [@jessesmit_______________] [🗑️]                 │ │
│ │ [LinkedIn ▼]   [/in/jessesmit____________] [🗑️]                 │ │
│ │ [YouTube ▼]    [@jessesmit_______________] [🗑️]                 │ │
│ │                                                                 │ │
│ │ [+ Add another social link]                                     │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ Available platforms:                                                │
│ Instagram, Twitter/X, LinkedIn, YouTube, TikTok, Facebook,         │
│ Pinterest, Snapchat, Discord, Twitch, GitHub, Dribbble,            │
│ Behance, Medium, Substack, Threads, WhatsApp, Telegram, Email      │
│                                                                     │
│ Icon style: ● Filled  ○ Outline  ○ Minimal                         │
│ Icon size:  [=====●====]  32px                                     │
│                                                                     │
│ [Cancel] [Save]                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Email Signup Edit:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ EDIT EMAIL SIGNUP                                                   │
│                                                                     │
│ Headline:                                                           │
│ [Join my newsletter__________________]                              │
│                                                                     │
│ Description (optional):                                             │
│ [Get weekly tips on marketing________]                              │
│                                                                     │
│ Button text:                                                        │
│ [Subscribe___________________________]                              │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Where should signups go?                                            │
│                                                                     │
│ ○ Email to me (just collects, you export)                          │
│ ● External service:                                                 │
│   [Mailchimp form action URL_________]                              │
│                                                                     │
│ Supported: Mailchimp, ConvertKit, Buttondown, or any form URL      │
│                                                                     │
│ [Cancel] [Save]                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Export Options

### Export Modal

```
┌─────────────────────────────────────────────────────────────────────┐
│ EXPORT YOUR PAGE                                                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ OPTION 1: Download & Self-Host (Recommended)                        │
│                                                                     │
│ Download your page as a single HTML file. Upload it to your        │
│ website to host it on your own domain.                             │
│                                                                     │
│ [📥 Download HTML File]                                             │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ HOW TO HOST ON YOUR DOMAIN:                                        │
│                                                                     │
│ For yourdomain.com/links:                                          │
│                                                                     │
│ 1. Download the file (it's named "index.html")                     │
│ 2. Create a folder called "links" on your web server               │
│ 3. Upload index.html to that folder                                │
│ 4. Visit yourdomain.com/links — your page is live!                 │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ HOSTING GUIDES:                                                     │
│ [Shopify] [WordPress] [Squarespace] [Webflow] [Vercel] [Netlify]   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ OPTION 2: Copy HTML Code                                            │
│                                                                     │
│ Copy the raw HTML to paste into your existing site.                │
│                                                                     │
│ [📋 Copy HTML to Clipboard]                                         │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ OPTION 3: Host on Our Subdomain (Free)                              │
│                                                                     │
│ Don't have a website? We'll host it for you.                       │
│                                                                     │
│ Your URL: digitaljesse.com/u/[________]                            │
│                                                                     │
│ ⓘ Requires email to save and edit later                           │
│                                                                     │
│ [Create Hosted Page] (Coming soon)                                  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ANALYTICS TIP                                                       │
│                                                                     │
│ Add your own tracking by pasting your analytics code:              │
│                                                                     │
│ Google Analytics ID (optional):                                     │
│ [G-XXXXXXXXXX_______]                                               │
│                                                                     │
│ Or paste any tracking script:                                       │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ <!-- Your tracking code here -->                                │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ This will be included in your exported HTML.                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Generated HTML Output

### Sample Output (Clean, Self-Contained)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jesse Smith | Links</title>
  
  <!-- Open Graph -->
  <meta property="og:title" content="Jesse Smith | Links">
  <meta property="og:description" content="E-commerce & Marketing">
  <meta property="og:image" content="https://yourdomain.com/profile.jpg">
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }
    
    .container {
      width: 100%;
      max-width: 480px;
    }
    
    .profile {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .profile-photo {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      margin-bottom: 16px;
    }
    
    .profile-name {
      font-size: 24px;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    
    .profile-bio {
      font-size: 14px;
      color: rgba(255,255,255,0.8);
    }
    
    .link-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      padding: 16px 24px;
      margin-bottom: 16px;
      background: #FFFFFF;
      color: #1F2937;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 500;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .link-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
    
    .link-icon {
      font-size: 20px;
    }
    
    .social-icons {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 32px;
    }
    
    .social-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      color: #FFFFFF;
      text-decoration: none;
      transition: background 0.2s;
    }
    
    .social-icon:hover {
      background: rgba(255,255,255,0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Profile -->
    <div class="profile">
      <img src="profile.jpg" alt="Jesse Smith" class="profile-photo">
      <h1 class="profile-name">Jesse Smith</h1>
      <p class="profile-bio">E-commerce & Marketing</p>
    </div>
    
    <!-- Links -->
    <a href="https://luxurywallart.com" class="link-button" target="_blank">
      <span class="link-icon">🛒</span>
      My Shopify Store
    </a>
    
    <a href="https://masterpiecefinder.com" class="link-button" target="_blank">
      <span class="link-icon">🎨</span>
      Masterpiece Finder
    </a>
    
    <a href="https://newsletter.com/subscribe" class="link-button" target="_blank">
      <span class="link-icon">📧</span>
      Join My Newsletter
    </a>
    
    <a href="https://calendly.com/jesse" class="link-button" target="_blank">
      <span class="link-icon">📅</span>
      Book a Call
    </a>
    
    <!-- Social Icons -->
    <div class="social-icons">
      <a href="https://instagram.com/jessesmit" class="social-icon" target="_blank">
        <svg><!-- Instagram icon --></svg>
      </a>
      <a href="https://twitter.com/jessesmit" class="social-icon" target="_blank">
        <svg><!-- Twitter icon --></svg>
      </a>
      <a href="https://linkedin.com/in/jessesmit" class="social-icon" target="_blank">
        <svg><!-- LinkedIn icon --></svg>
      </a>
    </div>
  </div>
  
  <!-- Optional: Your analytics code -->
</body>
</html>
```

**Key attributes of the output:**
- Single file (no external dependencies except fonts)
- Fully responsive
- Fast loading
- SEO-friendly meta tags
- Clean, readable code
- No tracking or branding
- Works offline

---

## Feature Set

### MVP Features

1. **Profile Section**
   - Photo upload (stored as base64 or URL)
   - Name and bio
   - Photo shape options

2. **Link Buttons**
   - Unlimited links
   - Custom text and URL
   - Emoji or icon
   - Drag to reorder

3. **Social Icons**
   - 15+ platforms
   - Icon style options
   - Auto-generates correct URLs

4. **Styling**
   - 8-10 starter templates
   - Background (solid, gradient, image)
   - Button colors and styles
   - Font selection
   - Spacing controls

5. **Live Preview**
   - Real-time updates
   - Mobile/desktop toggle

6. **Export**
   - Download as HTML
   - Copy HTML code
   - Platform-specific hosting guides

7. **Local Save**
   - Save draft to localStorage
   - Resume editing later

### V2 Features

8. **Header/Divider**
   - Section titles
   - Visual breaks

9. **Text Blocks**
   - Announcements
   - Custom messages

10. **Email Signup**
    - Built-in form
    - Integration with email services

11. **Embeds**
    - YouTube videos
    - Spotify playlists
    - SoundCloud tracks

12. **Thumbnails**
    - Image preview for links
    - Product images

13. **Hosted Option**
    - Host on your subdomain
    - Cloud save with account

14. **Analytics Dashboard**
    - Click tracking (for hosted pages)
    - Basic stats

15. **Multiple Pages**
    - Different pages for different purposes
    - Seasonal variations

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| Drag & Drop | @dnd-kit or react-beautiful-dnd | Free |
| Color Picker | react-colorful | Free |
| Icons | Lucide React or Simple Icons | Free |
| Local Storage | Browser localStorage | Free |
| Styling | Tailwind CSS | Free |

**Total recurring cost: $0**

### Data Structure

```javascript
const pageData = {
  meta: {
    title: "Jesse Smith | Links",
    description: "E-commerce & Marketing",
  },
  
  style: {
    background: {
      type: "gradient",
      color1: "#667eea",
      color2: "#764ba2",
    },
    button: {
      color: "#FFFFFF",
      textColor: "#1F2937",
      style: "pill",      // square, rounded, pill
      fill: "filled",     // filled, outline, soft
      shadow: "medium",
    },
    text: {
      font: "Inter",
      nameColor: "#FFFFFF",
      bioColor: "rgba(255,255,255,0.8)",
    },
    layout: {
      maxWidth: 480,
      spacing: 16,
    },
  },
  
  elements: [
    {
      id: "profile",
      type: "profile",
      photo: "data:image/jpeg;base64,...", // or URL
      photoShape: "circle",
      name: "Jesse Smith",
      bio: "E-commerce & Marketing",
    },
    {
      id: "link-1",
      type: "link",
      text: "My Shopify Store",
      url: "https://luxurywallart.com",
      icon: "🛒",
      thumbnail: null,
      highlight: false,
    },
    {
      id: "link-2",
      type: "link",
      text: "Masterpiece Finder",
      url: "https://masterpiecefinder.com",
      icon: "🎨",
      thumbnail: null,
      highlight: false,
    },
    {
      id: "social",
      type: "socialIcons",
      links: [
        { platform: "instagram", handle: "jessesmit" },
        { platform: "twitter", handle: "jessesmit" },
        { platform: "linkedin", handle: "jessesmit" },
      ],
      style: "filled",
      size: 32,
    },
  ],
  
  analytics: {
    googleAnalyticsId: null,
    customScript: null,
  },
};
```

### HTML Generation

```javascript
function generateHTML(pageData) {
  const { meta, style, elements, analytics } = pageData;
  
  const css = generateCSS(style);
  const body = elements.map(el => renderElement(el, style)).join('\n');
  const analyticsCode = generateAnalytics(analytics);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title}</title>
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <link href="https://fonts.googleapis.com/css2?family=${style.text.font}:wght@400;500;600&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
  <div class="container">
    ${body}
  </div>
  ${analyticsCode}
</body>
</html>
  `.trim();
}
```

---

## SEO Strategy

### Target Keywords
- "linktree alternative free"
- "link in bio page builder"
- "free linktree alternative"
- "custom link in bio"
- "link in bio maker"
- "linktree alternative no branding"
- "self hosted link in bio"
- "bio link page creator"

### Long-tail Opportunities
- "linktree alternative for instagram"
- "how to create link in bio page"
- "free link in bio with no watermark"
- "host link in bio on own domain"

---

## Blog Content Strategy

### Pillar Article

**Title:** "Link in Bio: Create Your Own Page (Free, No Branding)"

**URL:** /blog/link-in-bio-guide

**Target length:** 3,500-4,000 words

**Structure:**
1. What is a link in bio page
2. Why you should own your page (not rent it)
3. Linktree alternatives compared
4. What makes a great link in bio page:
   - Design
   - Organization
   - Calls to action
5. Introduce the builder: "Create yours free →"
6. How to host on your own domain:
   - Shopify
   - WordPress
   - Squarespace
   - Webflow
   - Static hosting (Vercel, Netlify)
7. Link in bio best practices
8. Common mistakes

### Supporting Posts

**Post 1: "Linktree Alternatives: 10 Free Options Compared"**
- URL: /blog/linktree-alternatives
- Length: 2,500 words
- Covers: Feature comparison, pricing, pros/cons
- Links to: Builder
- **High traffic:** People search this constantly

**Post 2: "How to Host Your Link in Bio on Your Own Domain"**
- URL: /blog/host-link-in-bio-own-domain
- Length: 2,000 words
- Covers: Step-by-step guides per platform
- Links to: Builder

**Post 3: "Link in Bio Design Tips: What Actually Works"**
- URL: /blog/link-in-bio-design-tips
- Length: 1,800 words
- Covers: Design principles, examples, CTAs
- Links to: Builder

**Post 4: "Why I Ditched Linktree (And What I Use Instead)"**
- URL: /blog/ditched-linktree
- Length: 1,500 words
- Covers: Personal story, costs, ownership
- Links to: Builder

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch builder + pillar article | Core assets |
| 2 | Linktree alternatives comparison | High-traffic comparison |
| 3 | Host on own domain guide | Practical how-to |
| 4 | Why I ditched Linktree story | Personal angle |

---

## Lead Capture Strategy

### Free Tier (Everything)
- Full builder functionality
- All templates
- Unlimited links
- Download HTML

### Email Capture Triggers
- "Save your page to edit across devices" — requires email
- "Get notified of new templates" — requires email
- "Download 5 bonus templates pack" — requires email
- "Host on our subdomain" — requires email (future)

---

## Development Phases

### Phase 1: Core Builder (1.5 weeks)
- [ ] Profile section element
- [ ] Link button element
- [ ] Social icons element
- [ ] Drag and drop reordering
- [ ] Live preview
- [ ] Basic styling options (colors, fonts)

### Phase 2: Templates & Export (1 week)
- [ ] 8-10 starter templates
- [ ] Advanced styling (gradients, shadows)
- [ ] HTML generation
- [ ] Download functionality
- [ ] Copy HTML functionality

### Phase 3: Polish (3-5 days)
- [ ] Local storage save/load
- [ ] Mobile responsiveness
- [ ] Hosting guides
- [ ] Analytics code injection option

### Phase 4: Content (1 week)
- [ ] Publish pillar article
- [ ] Publish Linktree alternatives comparison
- [ ] Platform-specific hosting guides

### Phase 5: Enhancements (Future)
- [ ] Header/divider element
- [ ] Text block element
- [ ] Email signup element
- [ ] Embeds (YouTube, Spotify)
- [ ] Hosted option with accounts
- [ ] Click analytics

---

## You'd Use This For

**Your businesses:**
- digitaljesse.com/links — Personal brand
- luxurywallart.com/links — Store links
- Each project gets its own branded page

**Client work:**
- Quick deliverable for consulting clients
- Show portfolio piece

**Demonstrates your skills:**
- Full-stack capability
- Design sensibility
- Understanding of creator needs

---

## Success Metrics

- **Usage:** Pages created per week
- **Engagement:** % who download HTML vs just preview
- **Templates:** Which templates are most popular
- **Content:** Pillar article ranking for "linktree alternative"
- **Conversion:** Email capture rate
- **Sharing:** Pages that link back or mention the builder
