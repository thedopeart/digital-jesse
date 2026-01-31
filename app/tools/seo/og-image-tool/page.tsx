'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';

type ToolMode = 'generator' | 'preview';
type TemplateName = 'gradient' | 'clean' | 'split' | 'bar' | 'blog' | 'minimal' | 'overlay' | 'photo-left' | 'photo-right' | 'quote' | 'stats' | 'magazine' | 'photo-both';
type PatternType = 'none' | 'dots' | 'grid' | 'diagonal';
type FontId = 'inter' | 'playfair' | 'space-grotesk' | 'jetbrains-mono' | 'bebas-neue';
type TextPosition = 'top-left' | 'top-center' | 'center' | 'bottom-left' | 'bottom-center';

const FONTS: { id: FontId; name: string }[] = [
  { id: 'inter', name: 'Inter' },
  { id: 'playfair', name: 'Playfair' },
  { id: 'space-grotesk', name: 'Space' },
  { id: 'jetbrains-mono', name: 'Mono' },
  { id: 'bebas-neue', name: 'Bebas' },
];

const TEXT_POSITIONS: { id: TextPosition; label: string }[] = [
  { id: 'top-left', label: 'Top L' },
  { id: 'top-center', label: 'Top C' },
  { id: 'center', label: 'Center' },
  { id: 'bottom-left', label: 'Btm L' },
  { id: 'bottom-center', label: 'Btm C' },
];

interface OGData {
  og: {
    image: string;
    title: string;
    description: string;
    url: string;
    type: string;
    siteName: string;
    imageWidth: string;
    imageHeight: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  domain: string;
  issues: { type: 'error' | 'warning'; message: string; fix?: string }[];
}

/* ── Hooks ── */

function useCountUp(target: number, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-gray-900 font-semibold text-base pr-4 group-hover:text-[#b8860b] transition-colors">{question}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={`shrink-0 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 text-base leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ── Template definitions ── */

const TEMPLATES: { id: TemplateName; name: string; photo?: boolean; defaults: { bg1: string; bg2: string; text: string; accent: string } }[] = [
  // Text only
  { id: 'gradient', name: 'Gradient', defaults: { bg1: '#4F46E5', bg2: '#7C3AED', text: '#FFFFFF', accent: '#10B981' } },
  { id: 'clean', name: 'Clean', defaults: { bg1: '#1e293b', bg2: '#1e293b', text: '#FFFFFF', accent: '#38bdf8' } },
  { id: 'bar', name: 'Bar', defaults: { bg1: '#18181b', bg2: '#7C3AED', text: '#FFFFFF', accent: '#22d3ee' } },
  { id: 'minimal', name: 'Minimal', defaults: { bg1: '#fafaf9', bg2: '#fafaf9', text: '#1c1917', accent: '#d4a847' } },
  { id: 'quote', name: 'Quote', defaults: { bg1: '#1a1a2e', bg2: '#2d1b69', text: '#FFFFFF', accent: '#f5d78e' } },
  { id: 'stats', name: 'Stats', defaults: { bg1: '#0f172a', bg2: '#0f172a', text: '#FFFFFF', accent: '#22d3ee' } },
  // With photo
  { id: 'overlay', name: 'Overlay', photo: true, defaults: { bg1: '#1a1a2e', bg2: '#16213e', text: '#FFFFFF', accent: '#e94560' } },
  { id: 'photo-left', name: 'Photo Left', photo: true, defaults: { bg1: '#1e1e1e', bg2: '#333333', text: '#FFFFFF', accent: '#d4a847' } },
  { id: 'photo-right', name: 'Photo Right', photo: true, defaults: { bg1: '#1e1e1e', bg2: '#333333', text: '#FFFFFF', accent: '#d4a847' } },
  { id: 'split', name: 'Split', photo: true, defaults: { bg1: '#0f172a', bg2: '#0f172a', text: '#FFFFFF', accent: '#f59e0b' } },
  { id: 'blog', name: 'Blog', photo: true, defaults: { bg1: '#1e3a5f', bg2: '#0ea5e9', text: '#FFFFFF', accent: '#34d399' } },
  { id: 'magazine', name: 'Magazine', photo: true, defaults: { bg1: '#1e1e1e', bg2: '#2a2a2a', text: '#FFFFFF', accent: '#d4a847' } },
  { id: 'photo-both', name: 'Dual Photo', photo: true, defaults: { bg1: '#1e1e1e', bg2: '#2a2a2a', text: '#FFFFFF', accent: '#d4a847' } },
];

function templateThumbnailUrl(t: typeof TEMPLATES[number]): string {
  return `/api/tools/og-generate?headline=${encodeURIComponent('Your Title Here')}&template=${t.id}&bg1=${encodeURIComponent(t.defaults.bg1)}&bg2=${encodeURIComponent(t.defaults.bg2)}&textColor=${encodeURIComponent(t.defaults.text)}&accent=${encodeURIComponent(t.defaults.accent)}&pattern=none&subtitle=&brand=`;
}

const PATTERNS: { id: PatternType; name: string }[] = [
  { id: 'none', name: 'None' },
  { id: 'dots', name: 'Dots' },
  { id: 'grid', name: 'Grid' },
  { id: 'diagonal', name: 'Diagonal' },
];

/* ── Social platform preview components ── */

function CroppedImagePreview({ image, aspectRatio, label }: { image: string; aspectRatio: string; label?: string }) {
  return (
    <div className={`aspect-[${aspectRatio}] bg-gray-100 relative overflow-hidden`}>
      {image ? (
        <>
          <img src={image} alt="" className="w-full h-full object-cover" />
          {label && (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/60 text-white text-[10px] rounded font-medium">
              {label}
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
      )}
    </div>
  );
}

function TwitterPreview({ image, title, description, domain }: { image: string; title: string; description: string; domain: string }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <CroppedImagePreview image={image} aspectRatio="1.91/1" label="1.91:1 crop" />
      <div className="p-2.5 border-t border-gray-200 bg-white">
        <p className="text-gray-500 text-[11px]">{domain}</p>
        <p className="font-bold text-sm text-gray-900 line-clamp-1">{title || 'Untitled'}</p>
        <p className="text-gray-500 text-xs line-clamp-1">{description}</p>
      </div>
    </div>
  );
}

function LinkedInPreview({ image, title, description, domain }: { image: string; title: string; description: string; domain: string }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <CroppedImagePreview image={image} aspectRatio="1.91/1" label="1.91:1 crop" />
      <div className="p-2.5 bg-gray-50">
        <p className="font-semibold text-sm text-gray-900 line-clamp-1">{title || 'Untitled'}</p>
        <p className="text-[11px] text-gray-500 mt-0.5">{domain}</p>
      </div>
    </div>
  );
}

function FacebookPreview({ image, title, description, domain }: { image: string; title: string; description: string; domain: string }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <CroppedImagePreview image={image} aspectRatio="1.91/1" label="1.91:1 crop" />
      <div className="p-2.5 bg-[#f0f2f5] border-t border-gray-200">
        <p className="text-[10px] text-gray-500 uppercase">{domain}</p>
        <p className="font-bold text-sm text-gray-900 line-clamp-1 mt-0.5">{title || 'Untitled'}</p>
        <p className="text-xs text-gray-500 line-clamp-1">{description}</p>
      </div>
    </div>
  );
}

function SlackPreview({ image, title, description, domain }: { image: string; title: string; description: string; domain: string }) {
  return (
    <div className="flex gap-2.5">
      <div className="w-1 bg-gray-300 rounded-full shrink-0" />
      <div className="min-w-0">
        <p className="font-bold text-xs text-gray-900 mb-0.5">{domain}</p>
        <p className="font-bold text-blue-600 text-xs">{title || 'Untitled'}</p>
        {description && <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{description}</p>}
        {image && (
          <div className="mt-1.5 rounded-lg overflow-hidden max-w-[280px]">
            <img src={image} alt="" className="w-full object-contain" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── File upload helper ── */

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function convertToPngBase64(file: File, maxSize = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/* ── Main Component ── */

export default function OGImageToolPage() {
  const [mode, setMode] = useState<ToolMode>('preview');

  // Generator state
  const [headline, setHeadline] = useState('Your Page Title Goes Here');
  const [subtitle, setSubtitle] = useState('');
  const [brand, setBrand] = useState('');
  const [template, setTemplate] = useState<TemplateName>('gradient');
  const [templateTab, setTemplateTab] = useState<'text' | 'photo'>('text');
  const [bg1, setBg1] = useState('#4F46E5');
  const [bg2, setBg2] = useState('#7C3AED');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [accent, setAccent] = useState('#10B981');
  const [pattern, setPattern] = useState<PatternType>('none');
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Image/logo upload state
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [uploadedLogo, setUploadedLogo] = useState<string>('');
  const [imageX, setImageX] = useState(50);
  const [imageY, setImageY] = useState(50);
  const [imageZoom, setImageZoom] = useState(100);
  const [uploadedImage2, setUploadedImage2] = useState<string>('');
  const [imageX2, setImageX2] = useState(50);
  const [imageY2, setImageY2] = useState(50);
  const [imageZoom2, setImageZoom2] = useState(100);
  const [logoSize, setLogoSize] = useState(60);
  const [fontFamily, setFontFamily] = useState<FontId>('inter');
  const [textPosition, setTextPosition] = useState<TextPosition>('center');
  const [fontSizeOverride, setFontSizeOverride] = useState(0);
  const [badgeText, setBadgeText] = useState('');
  const [showTypography, setShowTypography] = useState(true);
  const [fixLoading, setFixLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const image2InputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Draft state
  const [drafts, setDrafts] = useState<{ name: string; date: string; state: Record<string, unknown> }[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Load drafts from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('og-tool-drafts');
      if (stored) setDrafts(JSON.parse(stored));
    } catch {}
  }, []);

  // Preview state
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState('');
  const [previewData, setPreviewData] = useState<OGData | null>(null);
  const [tagsCopied, setTagsCopied] = useState(false);

  // For photo templates, we need POST to include images. For text templates, GET is fine.
  const isPhotoTemplate = !!(TEMPLATES.find(t => t.id === template)?.photo);
  const hasImageData = !!(uploadedImage || uploadedLogo || uploadedImage2);

  const generatedImageUrl = `/api/tools/og-generate?headline=${encodeURIComponent(headline)}&subtitle=${encodeURIComponent(subtitle)}&brand=${encodeURIComponent(brand)}&template=${template}&bg1=${encodeURIComponent(bg1)}&bg2=${encodeURIComponent(bg2)}&textColor=${encodeURIComponent(textColor)}&accent=${encodeURIComponent(accent)}&pattern=${pattern}&fontFamily=${fontFamily}&textPosition=${textPosition}&fontSizeOverride=${fontSizeOverride}&badgeText=${encodeURIComponent(badgeText)}`;

  // For live preview of photo templates, use a blob URL from POST
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>('');
  const photoPreviewTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!hasImageData) {
      setPhotoPreviewUrl('');
      return;
    }

    if (photoPreviewTimer.current) clearTimeout(photoPreviewTimer.current);
    photoPreviewTimer.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/tools/og-generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            headline, subtitle, brand, template, bg1, bg2, textColor, accent, pattern,
            image: uploadedImage || undefined,
            logo: uploadedLogo || undefined,
            imageX, imageY, imageZoom, logoSize,
            fontFamily, textPosition, fontSizeOverride, badgeText,
            image2: uploadedImage2 || undefined,
            imageX2, imageY2, imageZoom2,
          }),
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPhotoPreviewUrl(prev => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch (err) {
        console.error('OG generate POST failed:', err);
      }
    }, 300);

    return () => { if (photoPreviewTimer.current) clearTimeout(photoPreviewTimer.current); };
  }, [headline, subtitle, brand, template, bg1, bg2, textColor, accent, pattern, uploadedImage, uploadedLogo, uploadedImage2, hasImageData, imageX, imageY, imageZoom, imageX2, imageY2, imageZoom2, logoSize, fontFamily, textPosition, fontSizeOverride, badgeText]);

  const previewSrc = hasImageData ? (photoPreviewUrl || generatedImageUrl) : generatedImageUrl;

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await convertToPngBase64(file, 1600);
    setUploadedImage(base64);
    // Auto-switch to a photo template if on a text-only template
    if (!TEMPLATES.find(t => t.id === template)?.photo) {
      setTemplate('overlay');
      setTemplateTab('photo');
      const t = TEMPLATES.find(t => t.id === 'overlay')!;
      setBg1(t.defaults.bg1);
      setBg2(t.defaults.bg2);
      setTextColor(t.defaults.text);
      setAccent(t.defaults.accent);
    }
  }, [template]);

  const handleImage2Upload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await convertToPngBase64(file, 1600);
    setUploadedImage2(base64);
    if (template !== 'photo-both') {
      setTemplate('photo-both');
      setTemplateTab('photo');
      const t = TEMPLATES.find(t => t.id === 'photo-both')!;
      setBg1(t.defaults.bg1);
      setBg2(t.defaults.bg2);
      setTextColor(t.defaults.text);
      setAccent(t.defaults.accent);
    }
  }, [template]);

  const handleLogoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await convertToPngBase64(file, 200);
    setUploadedLogo(base64);
  }, []);

  // Draft functions
  const saveDraft = useCallback(() => {
    const state = {
      headline, subtitle, brand, template, bg1, bg2, textColor, accent, pattern,
      fontFamily, textPosition, fontSizeOverride, badgeText,
      imageX, imageY, imageZoom, logoSize,
      uploadedImage, uploadedLogo, uploadedImage2,
      imageX2, imageY2, imageZoom2,
    };
    const name = headline.slice(0, 40) || 'Untitled';
    const date = new Date().toLocaleDateString();
    const updated = [...drafts, { name, date, state }];
    setDrafts(updated);
    try { localStorage.setItem('og-tool-drafts', JSON.stringify(updated)); } catch {}
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  }, [headline, subtitle, brand, template, bg1, bg2, textColor, accent, pattern, fontFamily, textPosition, fontSizeOverride, badgeText, imageX, imageY, imageZoom, logoSize, uploadedImage, uploadedLogo, uploadedImage2, imageX2, imageY2, imageZoom2, drafts]);

  const loadDraft = useCallback((index: number) => {
    const d = drafts[index];
    if (!d) return;
    const s = d.state as Record<string, string | number>;
    setHeadline((s.headline as string) || '');
    setSubtitle((s.subtitle as string) || '');
    setBrand((s.brand as string) || '');
    setTemplate((s.template as TemplateName) || 'gradient');
    setBg1((s.bg1 as string) || '#4F46E5');
    setBg2((s.bg2 as string) || '#7C3AED');
    setTextColor((s.textColor as string) || '#FFFFFF');
    setAccent((s.accent as string) || '#10B981');
    setPattern((s.pattern as PatternType) || 'none');
    setFontFamily((s.fontFamily as FontId) || 'inter');
    setTextPosition((s.textPosition as TextPosition) || 'center');
    setFontSizeOverride((s.fontSizeOverride as number) || 0);
    setBadgeText((s.badgeText as string) || '');
    setImageX((s.imageX as number) ?? 50);
    setImageY((s.imageY as number) ?? 50);
    setImageZoom((s.imageZoom as number) ?? 100);
    setLogoSize((s.logoSize as number) ?? 60);
    setUploadedImage((s.uploadedImage as string) || '');
    setUploadedLogo((s.uploadedLogo as string) || '');
    setUploadedImage2((s.uploadedImage2 as string) || '');
    setImageX2((s.imageX2 as number) ?? 50);
    setImageY2((s.imageY2 as number) ?? 50);
    setImageZoom2((s.imageZoom2 as number) ?? 100);
    setShowDrafts(false);
  }, [drafts]);

  const deleteDraft = useCallback((index: number) => {
    const updated = drafts.filter((_, i) => i !== index);
    setDrafts(updated);
    try { localStorage.setItem('og-tool-drafts', JSON.stringify(updated)); } catch {}
  }, [drafts]);

  const resetAll = useCallback(() => {
    setHeadline('Your Page Title Goes Here');
    setSubtitle('');
    setBrand('');
    setTemplate('gradient');
    setBg1('#4F46E5');
    setBg2('#7C3AED');
    setTextColor('#FFFFFF');
    setAccent('#10B981');
    setPattern('none');
    setFontFamily('inter');
    setTextPosition('center');
    setFontSizeOverride(0);
    setBadgeText('');
    setImageX(50);
    setImageY(50);
    setImageZoom(100);
    setLogoSize(60);
    setUploadedImage('');
    setUploadedLogo('');
    setUploadedImage2('');
    setImageX2(50);
    setImageY2(50);
    setImageZoom2(100);
  }, []);

  const handleDownload = useCallback(async () => {
    let blob: Blob;
    if (hasImageData) {
      const res = await fetch('/api/tools/og-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          headline, subtitle, brand, template, bg1, bg2, textColor, accent, pattern,
          image: uploadedImage || undefined,
          logo: uploadedLogo || undefined,
          imageX, imageY, imageZoom, logoSize,
          fontFamily, textPosition, fontSizeOverride, badgeText,
          image2: uploadedImage2 || undefined,
          imageX2, imageY2, imageZoom2,
        }),
      });
      blob = await res.blob();
    } else {
      const res = await fetch(generatedImageUrl);
      blob = await res.blob();
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'og-image.png';
    a.click();
    URL.revokeObjectURL(url);
  }, [generatedImageUrl, hasImageData, headline, subtitle, brand, template, bg1, bg2, textColor, accent, pattern, uploadedImage, uploadedLogo, uploadedImage2, imageX, imageY, imageZoom, imageX2, imageY2, imageZoom2]);

  const handleCopyMetaTags = useCallback(() => {
    const tags = `<!-- Open Graph -->
<meta property="og:title" content="${headline}" />
<meta property="og:description" content="${subtitle}" />
<meta property="og:image" content="YOUR_IMAGE_URL_HERE" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${headline}" />
<meta name="twitter:description" content="${subtitle}" />
<meta name="twitter:image" content="YOUR_IMAGE_URL_HERE" />`;

    navigator.clipboard.writeText(tags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [headline, subtitle]);

  const runPreview = useCallback(async () => {
    if (!previewUrl.trim()) {
      setPreviewError('Enter a URL to preview.');
      return;
    }
    setPreviewLoading(true);
    setPreviewError('');
    setPreviewData(null);
    try {
      const res = await fetch('/api/tools/og-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: previewUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch');
      setPreviewData(data);
    } catch (err) {
      setPreviewError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setPreviewLoading(false);
    }
  }, [previewUrl]);

  const copyPreviewTags = useCallback(() => {
    if (!previewData) return;
    const { og, twitter } = previewData;
    const lines = [
      '<!-- Open Graph -->',
      og.title ? `<meta property="og:title" content="${og.title}" />` : '',
      og.description ? `<meta property="og:description" content="${og.description}" />` : '',
      og.image ? `<meta property="og:image" content="${og.image}" />` : '',
      og.imageWidth ? `<meta property="og:image:width" content="${og.imageWidth}" />` : '',
      og.imageHeight ? `<meta property="og:image:height" content="${og.imageHeight}" />` : '',
      og.url ? `<meta property="og:url" content="${og.url}" />` : '',
      og.type ? `<meta property="og:type" content="${og.type}" />` : '',
      '',
      '<!-- Twitter -->',
      twitter.card ? `<meta name="twitter:card" content="${twitter.card}" />` : '',
      twitter.title ? `<meta name="twitter:title" content="${twitter.title}" />` : '',
      twitter.description ? `<meta name="twitter:description" content="${twitter.description}" />` : '',
      twitter.image ? `<meta name="twitter:image" content="${twitter.image}" />` : '',
    ].filter(Boolean).join('\n');
    navigator.clipboard.writeText(lines);
    setTagsCopied(true);
    setTimeout(() => setTagsCopied(false), 2000);
  }, [previewData]);

  const handleFixIt = useCallback(async () => {
    if (!previewData) return;
    setFixLoading(true);
    try {
      // Populate generator with preview data
      setHeadline(previewData.og.title || 'Your Page Title');
      setSubtitle(previewData.og.description ? previewData.og.description.slice(0, 80) : '');
      setBrand(previewData.domain || '');

      // If there's an og:image, fetch it and decide how to use it based on dimensions
      if (previewData.og.image) {
        try {
          const proxyRes = await fetch('/api/tools/og-proxy-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: previewData.og.image }),
          });
          if (proxyRes.ok) {
            const blob = await proxyRes.blob();
            const file = new File([blob], 'og-image.png', { type: blob.type });

            // Check image dimensions to decide usage
            const dims = await new Promise<{ w: number; h: number }>((resolve) => {
              const img = new window.Image();
              img.onload = () => resolve({ w: img.width, h: img.height });
              img.onerror = () => resolve({ w: 0, h: 0 });
              img.src = URL.createObjectURL(blob);
            });

            const ratio = dims.w / (dims.h || 1);
            const isWideEnough = ratio > 1.3 && dims.w >= 600;

            if (isWideEnough) {
              // Wide image: use as background photo
              const base64 = await convertToPngBase64(file, 1600);
              setUploadedImage(base64);
              setTemplate('overlay');
              const t = TEMPLATES.find(t => t.id === 'overlay')!;
              setBg1(t.defaults.bg1);
              setBg2(t.defaults.bg2);
              setTextColor(t.defaults.text);
              setAccent(t.defaults.accent);
            } else if (dims.w > 0 && dims.w <= 400) {
              // Small/square image: use as logo instead
              const base64 = await convertToPngBase64(file, 200);
              setUploadedLogo(base64);
              setTemplate('gradient');
              const t = TEMPLATES.find(t => t.id === 'gradient')!;
              setBg1(t.defaults.bg1);
              setBg2(t.defaults.bg2);
              setTextColor(t.defaults.text);
              setAccent(t.defaults.accent);
            } else {
              // Medium image but not wide: use as background anyway
              const base64 = await convertToPngBase64(file, 1600);
              setUploadedImage(base64);
              setTemplate('overlay');
              const t = TEMPLATES.find(t => t.id === 'overlay')!;
              setBg1(t.defaults.bg1);
              setBg2(t.defaults.bg2);
              setTextColor(t.defaults.text);
              setAccent(t.defaults.accent);
            }
          } else {
            setTemplate('gradient');
          }
        } catch {
          setTemplate('gradient');
        }
      } else {
        setTemplate('gradient');
      }
      setMode('generator');
    } finally {
      setFixLoading(false);
    }
  }, [previewData]);

  const handleQuickResize = useCallback(async () => {
    if (!previewData?.og.image) return;
    setFixLoading(true);
    try {
      const proxyRes = await fetch('/api/tools/og-proxy-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: previewData.og.image }),
      });
      if (!proxyRes.ok) throw new Error('Failed to fetch image');
      const blob = await proxyRes.blob();
      const imgUrl = URL.createObjectURL(blob);
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Image load failed'));
        img.src = imgUrl;
      });
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      // Cover-fit: scale to fill 1200x630, center crop
      const scale = Math.max(1200 / img.width, 630 / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (1200 - w) / 2, (630 - h) / 2, w, h);
      canvas.toBlob(b => {
        if (!b) return;
        const url = URL.createObjectURL(b);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'og-image-resized.png';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
      URL.revokeObjectURL(imgUrl);
    } catch (err) {
      console.error('Quick resize failed:', err);
    } finally {
      setFixLoading(false);
    }
  }, [previewData]);

  const hasPreviewResults = !!previewData;

  return (
    <>
      {/* ── Section 1: Hero (Dark) ── */}
      <section className="bg-[#1e1e1e] pt-2 pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto px-6 mb-1.5 md:mb-2">
          <Link href="/tools" className="text-gray-500 hover:text-[#d4a847] text-sm transition-colors inline-flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            All Tools
          </Link>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 leading-tight">
            <span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">OG Image</span> Tool
          </h1>
          <p className="text-gray-400 text-lg mb-4 leading-relaxed max-w-2xl mx-auto">
            Create professional social share images from templates, or <strong className="text-gray-200">preview how any URL looks</strong> on Twitter, LinkedIn, Facebook, and Slack.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 mb-8">
            <span className="px-3 py-1 text-xs font-semibold bg-[#d4a847]/10 text-[#d4a847] rounded-full border border-[#d4a847]/20 uppercase tracking-wide">SEO</span>
            <span className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/10">100% Free</span>
            <span className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/10">No Signup</span>
            <span className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/10">1200x630px</span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Tool (Light) ── */}
      <section className="bg-[#f5f5f0] py-12 md:py-16">
        <div className={`${mode === 'generator' || (mode === 'preview' && hasPreviewResults) ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-6 transition-all duration-300`}>

          {/* Mode toggles */}
          <div id="tool-input" className="flex gap-2 mb-4 max-w-3xl mx-auto">
            <button
              onClick={() => setMode('preview')}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                mode === 'preview'
                  ? 'bg-[#d4a847] text-black shadow-sm shadow-[#d4a847]/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              Preview URL
            </button>
            <button
              onClick={() => setMode('generator')}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                mode === 'generator'
                  ? 'bg-[#d4a847] text-black shadow-sm shadow-[#d4a847]/25'
                  : 'bg-white text-gray-600 border border-gray-200 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              Generate Image
            </button>
          </div>

          {mode === 'generator' ? (
            <div className="grid lg:grid-cols-[360px_1fr] gap-5">
              {/* Left: Controls */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03] text-left space-y-4">
                {/* Draft toolbar */}
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <button
                    onClick={saveDraft}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#d4a847] hover:text-[#9a7b1f] transition-all"
                  >
                    {draftSaved ? 'Saved!' : 'Save Draft'}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowDrafts(!showDrafts)}
                      className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#d4a847] hover:text-[#9a7b1f] transition-all"
                    >
                      Load{drafts.length > 0 ? ` (${drafts.length})` : ''}
                    </button>
                    {showDrafts && drafts.length > 0 && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                        {drafts.map((d, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                            <button onClick={() => loadDraft(i)} className="flex-1 text-left text-xs text-gray-700 truncate">{d.name}</button>
                            <span className="text-[10px] text-gray-400 shrink-0">{d.date}</span>
                            <button onClick={() => deleteDraft(i)} className="text-[10px] text-red-400 hover:text-red-600 shrink-0">x</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={resetAll}
                    className="px-3 py-1.5 text-[11px] font-medium rounded-lg bg-gray-50 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-all ml-auto"
                  >
                    Reset
                  </button>
                </div>

                {/* Text inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Headline</label>
                    <input
                      type="text"
                      value={headline}
                      onChange={e => setHeadline(e.target.value)}
                      placeholder="Your page title or headline"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-2 focus:ring-[#d4a847]/20 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={e => setSubtitle(e.target.value)}
                      placeholder="Optional tagline"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-2 focus:ring-[#d4a847]/20 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Brand / URL</label>
                    <input
                      type="text"
                      value={brand}
                      onChange={e => setBrand(e.target.value)}
                      placeholder="yoursite.com"
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-2 focus:ring-[#d4a847]/20 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Typography & Layout (collapsible) */}
                <div>
                  <button
                    onClick={() => setShowTypography(!showTypography)}
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${showTypography ? 'rotate-90' : ''}`}>
                      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Typography &amp; Layout
                  </button>
                  {showTypography && (
                    <div className="mt-2 space-y-3">
                      {/* Font */}
                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Font</label>
                        <div className="flex gap-1">
                          {FONTS.map(f => (
                            <button
                              key={f.id}
                              onClick={() => setFontFamily(f.id)}
                              className={`flex-1 px-1.5 py-2 rounded-lg text-[11px] font-medium transition-all duration-150 ${
                                fontFamily === f.id
                                  ? 'bg-[#d4a847] text-black shadow-sm'
                                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {f.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Text Position */}
                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Text Position</label>
                        <div className="flex gap-1">
                          {TEXT_POSITIONS.map(p => (
                            <button
                              key={p.id}
                              onClick={() => setTextPosition(p.id)}
                              className={`flex-1 px-1.5 py-2 rounded-lg text-[11px] font-medium transition-all duration-150 ${
                                textPosition === p.id
                                  ? 'bg-[#d4a847] text-black shadow-sm'
                                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Font Size */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <label className="text-[10px] text-gray-500">Font Size</label>
                          <button
                            onClick={() => setFontSizeOverride(0)}
                            className={`text-[9px] px-1.5 py-0.5 rounded ${fontSizeOverride === 0 ? 'bg-[#d4a847]/20 text-[#9a7b1f] font-semibold' : 'text-gray-400 hover:text-gray-600'}`}
                          >
                            Auto
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={24}
                            max={80}
                            value={fontSizeOverride || 52}
                            onChange={e => setFontSizeOverride(Number(e.target.value))}
                            className="w-full h-1 accent-[#d4a847]"
                          />
                          <span className="text-[10px] text-gray-400 w-10 text-right shrink-0">
                            {fontSizeOverride === 0 ? 'Auto' : `${fontSizeOverride}px`}
                          </span>
                        </div>
                      </div>
                      {/* Badge Text */}
                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Badge Text</label>
                        <input
                          type="text"
                          value={badgeText}
                          onChange={e => setBadgeText(e.target.value)}
                          placeholder="e.g. New, Blog, Guide"
                          className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-1 focus:ring-[#d4a847]/20 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Background Image</label>
                  <input ref={imageInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageUpload} className="hidden" />
                  {uploadedImage ? (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-8 rounded overflow-hidden border border-gray-200 shrink-0">
                        <img src={uploadedImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <button
                        onClick={() => { setUploadedImage(''); if (imageInputRef.current) imageInputRef.current.value = ''; }}
                        className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => imageInputRef.current?.click()}
                      className="w-full px-3 py-2 text-xs text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded-lg hover:border-[#d4a847] hover:text-[#9a7b1f] hover:bg-[#d4a847]/5 transition-all duration-150 text-center"
                    >
                      Upload Photo (PNG, JPG)
                    </button>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">Used by photo templates (Overlay, Photo Left/Right, Split, Blog, Magazine, Dual)</p>

                  {/* Position & Zoom controls (shown when image is uploaded) */}
                  {uploadedImage && (
                    <div className="mt-2 space-y-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-gray-500 w-8 shrink-0">X</label>
                        <input type="range" min={0} max={100} value={imageX} onChange={e => setImageX(Number(e.target.value))} className="w-full h-1 accent-[#d4a847]" />
                        <span className="text-[10px] text-gray-400 w-8 text-right">{imageX}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-gray-500 w-8 shrink-0">Y</label>
                        <input type="range" min={0} max={100} value={imageY} onChange={e => setImageY(Number(e.target.value))} className="w-full h-1 accent-[#d4a847]" />
                        <span className="text-[10px] text-gray-400 w-8 text-right">{imageY}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] text-gray-500 w-8 shrink-0">Zoom</label>
                        <input type="range" min={20} max={200} value={imageZoom} onChange={e => setImageZoom(Number(e.target.value))} className="w-full h-1 accent-[#d4a847]" />
                        <span className="text-[10px] text-gray-400 w-8 text-right">{imageZoom}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Second Image Upload (for Dual Photo template) */}
                {template === 'photo-both' && (
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Right Image</label>
                    <input ref={image2InputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage2Upload} className="hidden" />
                    {uploadedImage2 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-8 rounded overflow-hidden border border-gray-200 shrink-0">
                          <img src={uploadedImage2} alt="" className="w-full h-full object-cover" />
                        </div>
                        <button
                          onClick={() => { setUploadedImage2(''); if (image2InputRef.current) image2InputRef.current.value = ''; }}
                          className="text-xs text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => image2InputRef.current?.click()}
                        className="w-full px-3 py-2 text-xs text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded-lg hover:border-[#d4a847] hover:text-[#9a7b1f] hover:bg-[#d4a847]/5 transition-all duration-150 text-center"
                      >
                        Upload Right Photo (PNG, JPG)
                      </button>
                    )}
                    <p className="text-[10px] text-gray-400 mt-1">Right side image for the Dual Photo template</p>

                    {uploadedImage2 && (
                      <div className="mt-2 space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-gray-500 w-8 shrink-0">X</label>
                          <input type="range" min={0} max={100} value={imageX2} onChange={e => setImageX2(Number(e.target.value))} className="w-full h-1 accent-[#d4a847]" />
                          <span className="text-[10px] text-gray-400 w-8 text-right">{imageX2}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-gray-500 w-8 shrink-0">Y</label>
                          <input type="range" min={0} max={100} value={imageY2} onChange={e => setImageY2(Number(e.target.value))} className="w-full h-1 accent-[#d4a847]" />
                          <span className="text-[10px] text-gray-400 w-8 text-right">{imageY2}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-gray-500 w-8 shrink-0">Zoom</label>
                          <input type="range" min={20} max={200} value={imageZoom2} onChange={e => setImageZoom2(Number(e.target.value))} className="w-full h-1 accent-[#d4a847]" />
                          <span className="text-[10px] text-gray-400 w-8 text-right">{imageZoom2}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Logo Upload */}
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Logo</label>
                  <input ref={logoInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={handleLogoUpload} className="hidden" />
                  {uploadedLogo ? (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded overflow-hidden border border-gray-200 shrink-0 bg-white flex items-center justify-center">
                        <img src={uploadedLogo} alt="" className="max-w-full max-h-full object-contain" />
                      </div>
                      <button
                        onClick={() => { setUploadedLogo(''); if (logoInputRef.current) logoInputRef.current.value = ''; }}
                        className="text-xs text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="w-full px-3 py-1.5 text-xs text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded-lg hover:border-[#d4a847] hover:text-[#9a7b1f] hover:bg-[#d4a847]/5 transition-all duration-150 text-center"
                    >
                      Upload Logo
                    </button>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">Replaces brand text with your logo</p>
                  {uploadedLogo && (
                    <div className="mt-2 flex items-center gap-2 pt-2 border-t border-gray-100">
                      <label className="text-[10px] text-gray-500 w-8 shrink-0">Size</label>
                      <input type="range" min={20} max={120} value={logoSize} onChange={e => setLogoSize(Number(e.target.value))} className="w-full h-1 accent-[#d4a847]" />
                      <span className="text-[10px] text-gray-400 w-8 text-right">{logoSize}px</span>
                    </div>
                  )}
                </div>

                {/* Advanced: Colors + Pattern (collapsible) */}
                <div>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${showAdvanced ? 'rotate-90' : ''}`}>
                      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Colors &amp; Pattern
                  </button>
                  {showAdvanced && (
                    <div className="mt-2 space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'BG 1', value: bg1, set: setBg1 },
                          { label: 'BG 2', value: bg2, set: setBg2 },
                          { label: 'Text', value: textColor, set: setTextColor },
                          { label: 'Accent', value: accent, set: setAccent },
                        ].map(c => (
                          <div key={c.label} className="flex items-center gap-1.5">
                            <input type="color" value={c.value} onChange={e => c.set(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 shrink-0" />
                            <input type="text" value={c.value} onChange={e => c.set(e.target.value)} className="w-full px-1.5 py-1 text-[11px] bg-gray-50 border border-gray-200 rounded text-gray-700 font-mono" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Pattern</label>
                        <div className="flex gap-1.5">
                          {PATTERNS.map(p => (
                            <button
                              key={p.id}
                              onClick={() => setPattern(p.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150 ${
                                pattern === p.id
                                  ? 'bg-[#d4a847] text-black shadow-sm'
                                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Live preview + templates */}
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
                  <div className="aspect-[1200/630] relative bg-gray-100">
                    {previewSrc ? (
                      <img
                        src={previewSrc}
                        alt="OG image preview"
                        className="w-full h-full object-cover"
                        key={previewSrc}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Generating preview...
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-xs text-gray-500">1200 x 630px (1.91:1)</span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyMetaTags}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 hover:bg-[#d4a847]/10 text-gray-600 hover:text-[#9a7b1f] transition-all duration-150"
                      >
                        {copied ? 'Copied!' : 'Copy Meta Tags'}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black hover:shadow-md hover:shadow-amber-900/15 transition-all duration-150"
                      >
                        Download PNG
                      </button>
                    </div>
                  </div>
                </div>

                {/* Template selector below preview */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03] text-left">
                  <div className="flex gap-1 mb-3 bg-gray-100 rounded-lg p-0.5">
                    <button
                      onClick={() => setTemplateTab('text')}
                      className={`flex-1 text-[11px] font-semibold py-1.5 rounded-md transition-all ${
                        templateTab === 'text'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Text Only ({TEMPLATES.filter(t => !t.photo).length})
                    </button>
                    <button
                      onClick={() => setTemplateTab('photo')}
                      className={`flex-1 text-[11px] font-semibold py-1.5 rounded-md transition-all ${
                        templateTab === 'photo'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      With Photo ({TEMPLATES.filter(t => t.photo).length})
                    </button>
                  </div>
                  <div className={`grid ${templateTab === 'text' ? 'grid-cols-3' : 'grid-cols-4'} gap-2`}>
                    {TEMPLATES.filter(t => templateTab === 'text' ? !t.photo : t.photo).map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTemplate(t.id);
                          setBg1(t.defaults.bg1);
                          setBg2(t.defaults.bg2);
                          setTextColor(t.defaults.text);
                          setAccent(t.defaults.accent);
                        }}
                        className={`rounded-lg overflow-hidden transition-all duration-150 ${
                          template === t.id
                            ? 'ring-2 ring-[#d4a847] ring-offset-1'
                            : 'border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="aspect-[1.91/1] bg-gray-100">
                          <img src={templateThumbnailUrl(t)} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className={`text-[11px] font-medium py-1 text-center ${
                          template === t.id ? 'bg-[#d4a847] text-black' : 'bg-gray-50 text-gray-600'
                        }`}>
                          {t.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03] text-left max-w-3xl mx-auto">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">URL to Preview</label>
                <input
                  type="text"
                  value={previewUrl}
                  onChange={e => setPreviewUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && runPreview()}
                  placeholder="https://example.com/blog/my-post"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#d4a847] focus:ring-2 focus:ring-[#d4a847]/20 focus:bg-white transition-colors mb-4"
                />
                <button
                  onClick={runPreview}
                  disabled={previewLoading}
                  className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all duration-200 ${
                    previewLoading
                      ? 'bg-[#d4a847]/40 text-black/50 cursor-wait'
                      : 'bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black hover:shadow-lg hover:shadow-amber-900/20 hover:scale-[1.01]'
                  }`}
                >
                  {previewLoading ? 'Fetching...' : 'Preview URL'}
                </button>

                {previewLoading && (
                  <div className="mt-5 flex items-center gap-3 text-gray-500">
                    <div className="w-5 h-5 border-2 border-[#d4a847]/30 border-t-[#d4a847] rounded-full animate-spin" />
                    <span>Fetching meta tags...</span>
                  </div>
                )}

                {previewError && (
                  <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {previewError}
                  </div>
                )}
            </div>
          )}

          {/* Preview Results */}
          {mode === 'preview' && previewData && (
            <div className="mt-8 max-w-5xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <h2 className="text-lg font-bold text-gray-900">Results for {previewData.domain}</h2>
                <div className="flex gap-2 ml-auto">
                  {previewData.issues.filter(i => i.type === 'error').length > 0 && (
                    <div className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
                      <span className="text-red-700 font-semibold text-sm">{previewData.issues.filter(i => i.type === 'error').length} {previewData.issues.filter(i => i.type === 'error').length === 1 ? 'error' : 'errors'}</span>
                    </div>
                  )}
                  {previewData.issues.filter(i => i.type === 'warning').length > 0 && (
                    <div className="px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <span className="text-yellow-700 font-semibold text-sm">{previewData.issues.filter(i => i.type === 'warning').length} {previewData.issues.filter(i => i.type === 'warning').length === 1 ? 'warning' : 'warnings'}</span>
                    </div>
                  )}
                  {previewData.issues.length === 0 && (
                    <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                      <span className="text-green-700 font-semibold text-sm">All good</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid lg:grid-cols-[1fr_340px] gap-5">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
                  <h3 className="text-gray-900 font-semibold text-sm mb-3">How your link looks on each platform</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Twitter / X</p>
                      <TwitterPreview
                        image={previewData.twitter.image || previewData.og.image}
                        title={previewData.twitter.title || previewData.og.title}
                        description={previewData.twitter.description || previewData.og.description}
                        domain={previewData.domain}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">LinkedIn</p>
                      <LinkedInPreview
                        image={previewData.og.image}
                        title={previewData.og.title}
                        description={previewData.og.description}
                        domain={previewData.domain}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Facebook</p>
                      <FacebookPreview
                        image={previewData.og.image}
                        title={previewData.og.title}
                        description={previewData.og.description}
                        domain={previewData.domain}
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Slack</p>
                      <SlackPreview
                        image={previewData.og.image}
                        title={previewData.og.title}
                        description={previewData.og.description}
                        domain={previewData.domain}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {previewData.issues.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
                      <h3 className="text-gray-900 font-semibold text-sm mb-3">Issues Found</h3>
                      <div className="space-y-2.5">
                        {previewData.issues.map((issue, i) => (
                          <div key={i} className={`p-2.5 rounded-xl text-sm ${issue.type === 'error' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                            <div className="flex items-start gap-2">
                              <span className={`text-[10px] font-bold uppercase mt-0.5 shrink-0 ${issue.type === 'error' ? 'text-red-600' : 'text-yellow-600'}`}>
                                {issue.type}
                              </span>
                              <div className="min-w-0">
                                <p className={`text-xs leading-relaxed ${issue.type === 'error' ? 'text-red-700' : 'text-yellow-700'}`}>{issue.message}</p>
                                {issue.fix && (
                                  <code className="block mt-1 text-[11px] bg-white/60 px-2 py-1 rounded text-gray-600 font-mono break-all">{issue.fix}</code>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Fixes */}
                  <div className="bg-white border border-[#d4a847]/30 rounded-2xl p-4 shadow-lg shadow-black/[0.04] ring-1 ring-[#d4a847]/10">
                    <h3 className="text-gray-900 font-semibold text-sm mb-2">Quick Fixes</h3>
                    <p className="text-[11px] text-gray-500 mb-3">Jump to the generator with this page's title, description, and image pre-loaded.</p>
                    <div className="space-y-2">
                      <button
                        onClick={handleFixIt}
                        disabled={fixLoading}
                        className="w-full py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black hover:shadow-md hover:shadow-amber-900/15 transition-all duration-150 disabled:opacity-50"
                      >
                        {fixLoading ? 'Loading...' : 'Fix This in Generator'}
                      </button>
                      {previewData.og.image && (
                        <button
                          onClick={handleQuickResize}
                          disabled={fixLoading}
                          className="w-full py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-[#d4a847]/10 hover:text-[#9a7b1f] transition-all duration-150 disabled:opacity-50"
                        >
                          {fixLoading ? 'Processing...' : 'Resize Image to 1200x630'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-gray-900 font-semibold text-sm">Meta Tags Found</h3>
                      <button
                        onClick={copyPreviewTags}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-gray-100 hover:bg-[#d4a847]/10 text-gray-500 hover:text-[#9a7b1f] transition-all duration-150"
                      >
                        {tagsCopied ? 'Copied!' : 'Copy All'}
                      </button>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'og:title', value: previewData.og.title },
                        { label: 'og:description', value: previewData.og.description },
                        { label: 'og:image', value: previewData.og.image },
                        { label: 'og:type', value: previewData.og.type },
                        { label: 'og:image:width', value: previewData.og.imageWidth },
                        { label: 'og:image:height', value: previewData.og.imageHeight },
                        { label: 'twitter:card', value: previewData.twitter.card },
                        { label: 'twitter:image', value: previewData.twitter.image },
                      ].filter(t => t.value).map((tag, i) => (
                        <div key={i} className="bg-[#d4a847]/[0.06] border border-[#d4a847]/15 rounded-lg px-2.5 py-1.5">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">{tag.label}</p>
                          <code className="text-xs text-[#9a7b1f] font-medium break-all block leading-relaxed">{tag.value}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mt-12 max-w-3xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">How it works</h2>
            </FadeIn>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
              <div className="space-y-5">
                {(mode === 'preview' ? [
                  { title: 'Paste any URL', desc: 'Enter the page you want to check. We\'ll fetch it and pull all the Open Graph and Twitter Card tags.' },
                  { title: 'See how it looks on each platform', desc: 'Switch between Twitter, LinkedIn, Facebook, and Slack to see the actual preview.' },
                  { title: 'Fix any issues', desc: 'We flag missing tags, truncated titles, broken images, and wrong dimensions. Each issue includes the fix.' },
                ] : [
                  { title: 'Pick a template and customize', desc: 'Choose from 13 layouts. Six text-only templates plus seven photo templates with dual image support.' },
                  { title: 'Preview your image in real time', desc: 'The preview updates as you type. You\'ll see exactly what gets generated at 1200x630px.' },
                  { title: 'Download and add to your site', desc: 'Grab the PNG file and the meta tag code. Drop both into your page\'s <head> and you\'re done.' },
                ]).map((step, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold text-lg mb-0.5">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: What You Get (Dark) ── */}
      <section className="bg-[#1e1e1e] py-14 md:py-18 border-t border-[#d4a847]/10">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">What you get</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto text-center">
              Professional social share images and a full breakdown of your Open Graph tags.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {[
              { title: 'Ready-to-use PNG', desc: '1200x630px image that works on Twitter, LinkedIn, Facebook, Slack, Discord, and iMessage. The standard size every platform expects.' },
              { title: 'Copy-paste meta tags', desc: 'The exact HTML you need for your page\'s <head>. Includes both Open Graph and Twitter Card tags.' },
              { title: '13 template layouts', desc: 'Six text-only templates and seven photo templates. Upload one or two images with overlay, split, magazine, and dual photo layouts.' },
              { title: 'Platform-specific previews', desc: 'See how your link actually appears on each social platform before you share it.' },
              { title: 'Issue detection', desc: 'Missing tags, truncated titles, broken images. Each issue comes with the specific code to fix it.' },
              { title: 'Image & logo upload', desc: 'Add your own photos and logos to generated images. Photo templates with overlay and side-by-side layouts.' },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="h-full p-6 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:border-[#d4a847]/30 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-lg bg-gradient-to-r from-[#d4a847] via-[#f5d78e] to-[#cd7f32] bg-clip-text text-transparent">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">After you run it</h3>
          </FadeIn>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { title: 'Download your image', desc: 'Save the PNG and upload it to your site\'s media library or hosting.' },
              { title: 'Add the meta tags', desc: 'Paste the generated HTML into your page\'s <head>. Most CMS platforms have a custom code section for this.' },
              { title: 'Test with the preview tool', desc: 'Switch to Preview mode and paste your live URL. Confirm everything looks right on each platform.' },
              { title: 'Share with confidence', desc: 'Your links will show a professional image instead of a blank box or random screenshot.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="flex gap-4 items-start p-5 bg-white/[0.06] border border-white/[0.1] rounded-xl hover:border-[#d4a847]/30 hover:bg-white/[0.09] transition-all duration-200 group">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] text-black font-bold text-base flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-1">{step.title}</h4>
                    <p className="text-gray-300 text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Educational + FAQ (Light) ── */}
      <section className="bg-[#f5f5f0] py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why OG images matter</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="text-gray-700 text-base leading-relaxed space-y-4 mb-14">
              <p>
                When you share a link on Twitter, LinkedIn, or Slack, the platform looks for Open Graph meta tags in your page's HTML. Those tags tell it what image, title, and description to show. If they're missing or broken, your link shows up as a plain URL or a generic placeholder. People scroll right past it.
              </p>
              <p>
                <strong className="text-gray-900">The standard size is 1200x630 pixels</strong> with a 1.91:1 aspect ratio. That works across Twitter, LinkedIn, Facebook, Discord, and most messaging apps. WhatsApp is the exception: it crops to a square, so keep important content centered.
              </p>
              <p>
                You need both <strong className="text-gray-900">Open Graph tags</strong> (used by Facebook, LinkedIn, Slack) and <strong className="text-gray-900">Twitter Card tags</strong> (used by Twitter/X). They're similar but not identical. This tool generates both sets so you don't miss anything.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Common questions</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
              <FaqItem
                question="What size should OG images be?"
                answer="1200x630 pixels is the standard. It's a 1.91:1 aspect ratio that works on Twitter, LinkedIn, Facebook, Discord, and Slack. WhatsApp crops to square, so keep text and important content away from the edges."
              />
              <FaqItem
                question="Is my data stored anywhere?"
                answer="No. Images are generated on the fly and not saved on our servers. The preview tool fetches your URL in real time and doesn't store any results. Everything runs in your browser session."
              />
              <FaqItem
                question="Why does my link preview look different on each platform?"
                answer="Each platform renders link previews slightly differently. They use the same OG tags but apply different styling, text truncation, and image cropping. Twitter uses its own twitter:card tags as a fallback. This tool shows you exactly how each platform will display your link."
              />
              <FaqItem
                question="Do I need both OG tags and Twitter tags?"
                answer="Twitter will fall back to OG tags if twitter: tags aren't present, but it's better to include both. The twitter:card tag specifically controls whether you get a large image preview or a small thumbnail on Twitter."
              />
              <FaqItem
                question="Can I use my own photos in the generated image?"
                answer="Yes. Upload a photo using the Background Image field in the generator. The Overlay template places text over your photo with a gradient scrim, and the Photo Left template puts your photo on the left with text on the right."
              />
              <FaqItem
                question="How do I add these tags to my site?"
                answer="Paste the meta tags into your page's <head> section. In WordPress, use Yoast or RankMath. In Shopify, edit your theme.liquid. In Next.js, use the metadata export. Most CMS platforms have a custom HTML/meta section in their SEO settings."
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 5: Bottom CTA (Dark) ── */}
      <section className="bg-[#1e1e1e] py-12 md:py-16 border-t border-[#d4a847]/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stop sharing ugly links</h2>
            <p className="text-gray-400 text-base mb-6">Generate a professional OG image or check your existing tags. Free, fast, no signup.</p>
            <button
              onClick={() => document.getElementById('tool-input')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-900/20 hover:scale-[1.02] transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to the tool
            </button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
