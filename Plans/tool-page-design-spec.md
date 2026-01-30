# Tool Page Design Spec

Reference implementation: `/app/tools/seo/internal-link-finder/page.tsx`

Use this as the design system for every tool page on digitaljesse.com. Copy the section structure, color values, and component patterns exactly. Adapt the content to fit the specific tool.

---

## File Structure

Each tool gets three files:

```
app/tools/{category}/{tool-slug}/
  layout.tsx    # Metadata only (title, description)
  page.tsx      # Full page component ('use client')
```

The layout exports metadata and returns `children`. All logic lives in page.tsx.

---

## Color System

| Token | Hex | Usage |
|-------|-----|-------|
| Dark bg | `#1e1e1e` | Hero, dark sections, bottom CTA |
| Light bg | `#f5f5f0` | Tool section, content sections |
| Gold primary | `#d4a847` | Buttons, accents, active states |
| Gold mid | `#cd7f32` | Gradient endpoints |
| Gold dark | `#b8860b` | Links on light backgrounds |
| Gold light | `#f5d78e` | Gradient midpoint (text shimmer) |
| Gold text on dark | `#d4a847` | Category badges, accents on dark bg |
| Gold muted | `#9a7b1f` | Anchor text, hover states on light bg |
| White card | `bg-white border border-gray-200 rounded-2xl shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]` | Input cards, FAQ, How It Works |
| Dark card | `bg-white/[0.03] border border-white/[0.08] rounded-xl` | Feature cards on dark bg |

### Gold Gradient Text
```tsx
<span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">
  Gradient Word
</span>
```

### Gold Gradient Button
```tsx
<button className="bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black font-semibold rounded-lg hover:shadow-md hover:shadow-amber-900/15 hover:scale-[1.02] transition-all duration-200">
```

### Gold Number Badge
```tsx
<div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-sm flex items-center justify-center">
  1
</div>
```

Small variant (for feature cards):
```tsx
<span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-xs flex items-center justify-center shrink-0">
  1
</span>
```

---

## Page Section Flow

Every tool page follows this exact order:

```
1. Hero (dark #1e1e1e)      - breadcrumb, title, subtitle, pills, stats
2. Tool section (light)      - input card, results, how it works
3. What You Get (dark)       - feature cards + action steps
4. Educational + FAQ (light) - topic explainer + common questions
5. Bottom CTA (dark)         - scroll-back-to-tool button
```

Sections alternate dark/light. Never put two sections of the same background color back-to-back.

---

## Section 1: Hero (Dark)

```tsx
<section className="bg-[#1e1e1e] pt-2 pb-8 md:pb-10">
```

### Breadcrumb
```tsx
<div className="max-w-7xl mx-auto px-6 mb-1.5 md:mb-2">
  <Link href="/tools" className="text-gray-500 hover:text-[#d4a847] text-sm transition-colors inline-flex items-center gap-1.5">
    <svg ...chevron left />
    All Tools
  </Link>
</div>
```

### Title Block
- Container: `max-w-3xl mx-auto px-6 text-center`
- H1: `text-5xl md:text-6xl font-bold text-white mb-3 leading-tight`
- One keyword in gold gradient text
- Subtitle: `text-gray-400 text-lg mb-4 leading-relaxed max-w-2xl mx-auto`
- Bold key phrases with `<strong className="text-gray-200">`

### Pills Row
```tsx
<div className="flex flex-wrap justify-center gap-2.5 mb-8">
  {/* Category pill (gold) */}
  <span className="px-3 py-1 text-xs font-semibold bg-[#d4a847]/10 text-[#d4a847] rounded-full border border-[#d4a847]/20 uppercase tracking-wide">
    SEO
  </span>
  {/* Feature pills (muted) */}
  <span className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/10">
    100% Free
  </span>
</div>
```

### Stats Row (optional, from API)
Only show when real usage data exists. Use `useCountUp` hook for animated numbers.
```tsx
<div className="flex justify-center gap-8 md:gap-12">
  <div className="text-center">
    <p className="text-2xl md:text-3xl font-bold text-white tabular-nums">{value}+</p>
    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
  </div>
</div>
```

---

## Section 2: Tool (Light)

```tsx
<section className="bg-[#f5f5f0] py-12 md:py-16">
```

Container widens when results exist:
```tsx
<div className={`${hasResults ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-6 transition-all duration-300`}>
```

### Input Card
```tsx
<div id="tool-input" className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03] text-left max-w-3xl mx-auto">
```

**Mode toggles** (if tool has modes):
```tsx
<button className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
  active
    ? 'bg-[#d4a847] text-black shadow-sm shadow-[#d4a847]/25'
    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100'
}`}>
```

**Text inputs:**
```tsx
<input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-2 focus:ring-[#d4a847]/20 focus:bg-white transition-colors" />
```

**Primary action button (full width):**
```tsx
<button className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
  isLoading
    ? 'bg-[#d4a847]/40 text-black/50 cursor-wait'
    : 'bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black hover:shadow-lg hover:shadow-amber-900/20 hover:scale-[1.01]'
}`}>
```

**Loading state:**
```tsx
<div className="mt-5 flex items-center gap-3 text-gray-500">
  <div className="w-5 h-5 border-2 border-[#d4a847]/30 border-t-[#d4a847] rounded-full animate-spin" />
  <span>{progress}</span>
</div>
```

**Error state:**
```tsx
<div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
  {error}
</div>
```

### Results Control Card
Put all results controls (title, stats, export, tabs, filters) in one white card:

```tsx
<div className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03] mb-6">
  {/* Row 1: title + stat pills + export button (ml-auto) */}
  {/* Row 2: tab toggle + filters (border-t border-gray-100 mt-4 pt-4) */}
</div>
```

**Stat pills (inline with title):**
```tsx
<div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
  <span className="text-gray-400 text-[10px] block leading-tight">Label</span>
  <span className="text-green-700 font-semibold text-sm">{value}</span>
</div>
```

Colors: gray (neutral), green (positive), red (warning), yellow (errors).

**Tab toggle:**
```tsx
<div className="flex gap-1 bg-gray-100 rounded-lg p-1">
  <button className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
    active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
  }`}>
```

**Filter pills (gold active state):**
```tsx
<button className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
  active ? 'bg-[#d4a847] text-black shadow-sm' : 'text-gray-500 hover:text-gray-800'
}`}>
```

### Result Cards (2-column grid)
```tsx
<div className="grid md:grid-cols-2 gap-3">
  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#d4a847]/40 hover:shadow-md hover:shadow-black/[0.04] transition-all duration-150">
```

**Badge styles:**
- Relevance High: `bg-green-100 text-green-700`
- Relevance Medium: `bg-yellow-100 text-yellow-700`
- Relevance Low: `bg-gray-100 text-gray-500`
- Warning tag: `text-red-600 bg-red-50 border border-red-200`
- Info tag: `text-gray-400 bg-gray-100`

All badges: `px-2 py-0.5 text-[10px] font-bold rounded-full`

**Highlighted code/value box:**
```tsx
<div className="bg-[#d4a847]/[0.06] border border-[#d4a847]/15 rounded-lg px-3 py-2">
  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">Label</p>
  <code className="text-sm text-[#9a7b1f] font-medium break-words">{value}</code>
</div>
```

**Action buttons (small, inline):**
```tsx
{/* Primary action */}
<button className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 hover:bg-[#d4a847]/10 text-gray-500 hover:text-[#9a7b1f] transition-all duration-150">

{/* Success state */}
<button className="px-3 py-1.5 text-xs font-medium rounded-md bg-green-100 text-green-700">
```

### How It Works (always visible, below results)
```tsx
<div className="mt-12 max-w-3xl mx-auto">
  <FadeIn>
    <h2 className="text-3xl font-bold text-gray-900 mb-8">How it works</h2>
  </FadeIn>
  <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
    {/* Stacked steps with gold number badges */}
    <div className="space-y-5">
      <div className="flex gap-4 items-start group">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          1
        </div>
        <div>
          <h3 className="text-gray-900 font-semibold text-lg mb-0.5">Step title</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Description.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

3 steps. Keep descriptions to 1-2 sentences. Plain language.

---

## Section 3: What You Get + After You Run It (Dark)

```tsx
<section className="bg-[#1e1e1e] py-14 md:py-18 border-t border-[#d4a847]/10">
  <div className="max-w-5xl mx-auto px-6">
```

### "What you get" heading
```tsx
<h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
  <span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">What you get</span>
</h2>
<p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto text-center">
  One sentence about the output.
</p>
```

### Feature Cards (2-column grid, `sm:grid-cols-2 gap-5 mb-16`)
```tsx
<div className="h-full p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:border-[#d4a847]/30 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-200">
  <div className="flex items-center gap-3 mb-1.5">
    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-xs flex items-center justify-center shrink-0">
      {i + 1}
    </span>
    <h3 className="font-semibold text-lg bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">Title</h3>
  </div>
  <p className="text-gray-300 text-base leading-relaxed">Description</p>
</div>
```

4-6 feature cards. Each explains one specific output of the tool.

### "After you run it" (stacked steps, same section)
```tsx
<h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">After you run it</h3>
<div className="space-y-4 max-w-3xl mx-auto">
  <div className="flex gap-4 items-start p-5 bg-white/[0.06] border border-white/[0.1] rounded-xl hover:border-[#d4a847]/30 hover:bg-white/[0.09] transition-all duration-200 group">
    <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-base flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
      1
    </div>
    <div>
      <h4 className="text-white font-semibold text-lg mb-1">Step title</h4>
      <p className="text-gray-300 text-base leading-relaxed">What to do with the results.</p>
    </div>
  </div>
</div>
```

3-4 action steps. Tell the user exactly what to do with the output.

---

## Section 4: Educational Content + FAQ (Light)

```tsx
<section className="bg-[#f5f5f0] py-14 md:py-18">
  <div className="max-w-3xl mx-auto px-6">
```

### Educational Paragraphs
- H2: `text-3xl font-bold text-gray-900 mb-6`
- Body: `text-gray-700 text-base leading-relaxed`
- Bold key points: `<strong className="text-gray-900">`
- Internal links: `<Link href="/tools" className="text-[#b8860b] hover:text-[#d4a847] underline underline-offset-2">`
- 2-3 paragraphs. Practical, not textbook. Keep it conversational.
- Add `mb-14` between the educational content and FAQ

### FAQ
```tsx
<h2 className="text-3xl font-bold text-gray-900 mb-8">Common questions</h2>
<div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
  <FaqItem question="..." answer="..." />
</div>
```

Use the `FaqItem` accordion component. 4-6 questions. Always include:
- "Is my data stored anywhere?" (answer: no)
- One question about limitations
- One question about how it works technically

---

## Section 5: Bottom CTA (Dark)

```tsx
<section className="bg-[#1e1e1e] py-12 md:py-16 border-t border-[#d4a847]/10">
  <div className="max-w-2xl mx-auto px-6 text-center">
    <FadeIn>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">CTA headline</h2>
      <p className="text-gray-400 text-base mb-6">Short reassurance (free, fast, no signup).</p>
      <button
        onClick={() => document.getElementById('tool-input')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-900/20 hover:scale-[1.02] transition-all duration-200"
      >
        <svg ...up arrow />
        Back to the tool
      </button>
    </FadeIn>
  </div>
</section>
```

---

## Shared Components

### FadeIn (scroll-triggered)
```tsx
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

Use `<FadeIn>` on every section heading and content block below the fold. Use `delay` prop (multiples of 80-120ms) for staggered reveals within a group.

### FaqItem (accordion)
```tsx
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-gray-900 font-semibold text-base pr-4 group-hover:text-[#b8860b] transition-colors">{question}</span>
        <svg className={`shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          {/* chevron down */}
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-48 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
```

### useCountUp (animated counter)
```tsx
function useCountUp(target: number, duration = 2000, trigger = true) {
  // Counts from 0 to target over duration ms, triggered by trigger boolean
  // Returns current count as integer
}
```

Use for hero stats that animate in on page load.

---

## Typography Scale

| Element | Classes |
|---------|---------|
| Page title (h1) | `text-5xl md:text-6xl font-bold` |
| Section heading (dark bg) | `text-4xl md:text-5xl font-bold` with gold gradient |
| Section heading (light bg) | `text-3xl font-bold text-gray-900` |
| Subsection heading | `text-2xl md:text-3xl font-bold text-white` |
| Card title (dark bg) | `font-semibold text-lg` with gold gradient |
| Card title (light bg) | `text-gray-900 font-semibold text-lg` |
| Body text (dark bg) | `text-gray-300 text-base leading-relaxed` |
| Body text (light bg) | `text-gray-600 text-sm leading-relaxed` or `text-gray-700 text-base leading-relaxed` |
| Labels | `text-gray-400 text-[10px] uppercase tracking-wider font-medium` |
| Small text | `text-xs text-gray-400` or `text-xs text-gray-500` |

---

## Layout Rules

- `max-w-3xl` for centered content (input card, how it works, FAQ, educational text, bottom CTA)
- `max-w-5xl` for wide content (feature card grids, results when present)
- `max-w-7xl` for breadcrumb alignment only
- `px-6` on all containers
- Section vertical padding: `py-12 md:py-16` (tool, CTA) or `py-14 md:py-18` (content sections)
- Hero: `pt-2 pb-8 md:pb-10` (compact)

---

## Content Rules

Follow CLAUDE.md for all copy. Key points:
- No em dashes. Use periods, commas, or colons.
- Use contractions. Write conversationally.
- No banned words (see CLAUDE.md for full list).
- Lead with what the tool does, not what it is.
- Educational section: 2-3 paragraphs, practical, not textbook.
- FAQ answers: direct, conversational, no filler.
- "How it works" steps: plain language, 1-2 sentences each.
- "What you get" cards: specific outputs, not vague benefits.
- "After you run it" steps: tell them exactly what to do next.
