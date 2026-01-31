import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/* ── Font loading with module-level cache ── */

type FontId = 'inter' | 'playfair' | 'space-grotesk' | 'jetbrains-mono' | 'bebas-neue';

const FONT_CONFIG: Record<FontId, { name: string; google: string }> = {
  'inter': { name: 'Inter', google: 'Inter' },
  'playfair': { name: 'Playfair Display', google: 'Playfair+Display' },
  'space-grotesk': { name: 'Space Grotesk', google: 'Space+Grotesk' },
  'jetbrains-mono': { name: 'JetBrains Mono', google: 'JetBrains+Mono' },
  'bebas-neue': { name: 'Bebas Neue', google: 'Bebas+Neue' },
};

const fontCache = new Map<string, ArrayBuffer>();

async function loadFont(fontId: FontId, weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900): Promise<{ name: string; data: ArrayBuffer; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 } | null> {
  // Skip loading for 'inter' — Satori's default sans-serif is close enough
  if (fontId === 'inter') return null;

  const config = FONT_CONFIG[fontId];
  if (!config) return null;

  const cacheKey = `${fontId}-${weight}`;

  if (!fontCache.has(cacheKey)) {
    try {
      const cssUrl = `https://fonts.googleapis.com/css2?family=${config.google}:wght@${weight}&display=swap`;
      const cssRes = await fetch(cssUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
        signal: AbortSignal.timeout(4000),
      });
      const css = await cssRes.text();
      const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('woff2'\)/) ||
                    css.match(/src:\s*url\(([^)]+\.woff2)\)/);
      if (match?.[1]) {
        const fontRes = await fetch(match[1], { signal: AbortSignal.timeout(4000) });
        fontCache.set(cacheKey, await fontRes.arrayBuffer());
      }
    } catch {
      // Font loading failed, will return null
    }
  }

  const data = fontCache.get(cacheKey);
  if (!data) return null;
  return { name: config.name, data, weight };
}

/* ── Types ── */

type TextPosition = 'top-left' | 'top-center' | 'center' | 'bottom-left' | 'bottom-center';

interface GenerateParams {
  headline: string;
  subtitle: string;
  brand: string;
  template: string;
  bg1: string;
  bg2: string;
  textColor: string;
  accent: string;
  pattern: string;
  image?: string;
  logo?: string;
  imageX?: number;
  imageY?: number;
  imageZoom?: number;
  logoSize?: number;
  fontFamily?: FontId;
  textPosition?: TextPosition;
  fontSizeOverride?: number;
  badgeText?: string;
  image2?: string;
  imageX2?: number;
  imageY2?: number;
  imageZoom2?: number;
}

/* ── Position helpers ── */

function getPositionStyles(pos: TextPosition): { justifyContent: string; alignItems: string; textAlign: string } {
  switch (pos) {
    case 'top-left': return { justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left' };
    case 'top-center': return { justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center' };
    case 'center': return { justifyContent: 'center', alignItems: 'center', textAlign: 'center' };
    case 'bottom-left': return { justifyContent: 'flex-end', alignItems: 'flex-start', textAlign: 'left' };
    case 'bottom-center': return { justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center' };
    default: return { justifyContent: 'center', alignItems: 'center', textAlign: 'center' };
  }
}

/* ── Build element ── */

function buildElement(params: GenerateParams): React.ReactElement {
  const { headline, subtitle, brand, template, bg1, bg2, textColor, accent, pattern, image, logo, image2 } = params;
  const imgX = params.imageX ?? 50;
  const imgY = params.imageY ?? 50;
  const imgZoom = params.imageZoom ?? 100;
  const imgX2 = params.imageX2 ?? 50;
  const imgY2 = params.imageY2 ?? 50;
  const imgZoom2 = params.imageZoom2 ?? 100;
  const ls = params.logoSize ?? 60;
  const fontName = FONT_CONFIG[params.fontFamily || 'inter']?.name || 'Inter';
  const pos = params.textPosition || 'center';
  const badgeText = params.badgeText || '';

  const autoFontSize = headline.length > 60 ? 42 : headline.length > 40 ? 52 : 64;
  const fontSize = (params.fontSizeOverride && params.fontSizeOverride > 0) ? params.fontSizeOverride : autoFontSize;
  const patternOverlay = getPatternOverlay(pattern, textColor);
  const posStyles = getPositionStyles(pos);

  const badgeElement = badgeText ? (
    <div
      style={{
        display: 'flex',
        background: accent,
        color: bg1,
        fontSize: 14,
        fontWeight: 700,
        fontFamily: fontName,
        padding: '6px 16px',
        borderRadius: 20,
        marginBottom: 24,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}
    >
      {badgeText}
    </div>
  ) : null;

  const logoElement = logo ? (
    <div style={{ position: 'absolute', bottom: 30, display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src={logo} width={ls} height={ls} style={{ borderRadius: 6, objectFit: 'contain' }} />
      {brand && <p style={{ fontSize: 20, fontFamily: fontName, color: textColor, opacity: 0.7, margin: 0 }}>{brand}</p>}
    </div>
  ) : brand ? (
    <p style={{ fontSize: 22, fontFamily: fontName, color: textColor, opacity: 0.6, position: 'absolute', bottom: 40, margin: 0 }}>
      {brand}
    </p>
  ) : null;

  const templates: Record<string, React.ReactElement> = {
    gradient: (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: posStyles.justifyContent,
          alignItems: posStyles.alignItems,
          background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`,
          padding: 60,
          position: 'relative',
        }}
      >
        {patternOverlay}
        {badgeElement}
        <h1 style={{ fontSize, fontFamily: fontName, color: textColor, textAlign: posStyles.textAlign as 'left' | 'center', margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
          {headline}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 28, fontFamily: fontName, color: textColor, opacity: 0.85, marginTop: 20, textAlign: posStyles.textAlign as 'left' | 'center', maxWidth: 800 }}>
            {subtitle}
          </p>
        )}
        {logoElement}
      </div>
    ),

    clean: (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: posStyles.justifyContent,
          alignItems: posStyles.alignItems,
          background: bg1,
          padding: 60,
          position: 'relative',
        }}
      >
        {patternOverlay}
        {badgeElement}
        <h1 style={{ fontSize, fontFamily: fontName, color: textColor, textAlign: posStyles.textAlign as 'left' | 'center', margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
          {headline}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 28, fontFamily: fontName, color: textColor, opacity: 0.85, marginTop: 20, textAlign: posStyles.textAlign as 'left' | 'center', maxWidth: 800 }}>
            {subtitle}
          </p>
        )}
        {logoElement}
      </div>
    ),

    split: (
      <div style={{ width: 1200, height: 630, display: 'flex', position: 'relative' }}>
        <div style={{ width: 400, height: 630, display: 'flex', overflow: 'hidden', position: 'relative', background: accent }}>
          {image ? (
            <div style={{ position: 'absolute', width: Math.round(400 * imgZoom / 100), height: Math.round(630 * imgZoom / 100), top: `${imgY}%`, left: `${imgX}%`, transform: `translate(-${imgX}%, -${imgY}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : null}
        </div>
        <div
          style={{
            width: 800,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: posStyles.justifyContent,
            background: bg1,
            padding: '60px 60px 60px 50px',
            position: 'relative',
          }}
        >
          {patternOverlay}
          {badgeElement}
          <h1 style={{ fontSize: Math.min(fontSize, 56), fontFamily: fontName, color: textColor, margin: 0, fontWeight: 700, lineHeight: 1.2 }}>
            {headline}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 24, fontFamily: fontName, color: textColor, opacity: 0.85, marginTop: 16 }}>{subtitle}</p>
          )}
          {logo ? (
            <div style={{ position: 'absolute', bottom: 30, left: 50, display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={logo} width={ls} height={ls} style={{ borderRadius: 6, objectFit: 'contain' }} />
              {brand && <p style={{ fontSize: 20, fontFamily: fontName, color: textColor, opacity: 0.7, margin: 0 }}>{brand}</p>}
            </div>
          ) : brand ? (
            <p style={{ fontSize: 20, fontFamily: fontName, color: textColor, opacity: 0.6, position: 'absolute', bottom: 40, left: 50, margin: 0 }}>{brand}</p>
          ) : null}
        </div>
      </div>
    ),

    bar: (
      <div style={{ width: 1200, height: 630, display: 'flex', flexDirection: 'column', background: bg1, position: 'relative' }}>
        <div style={{ width: 1200, height: 8, background: `linear-gradient(90deg, ${accent}, ${bg2})`, display: 'flex' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: posStyles.justifyContent, alignItems: posStyles.alignItems, padding: 60 }}>
          {patternOverlay}
          {badgeElement}
          <h1 style={{ fontSize, fontFamily: fontName, color: textColor, textAlign: posStyles.textAlign as 'left' | 'center', margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
            {headline}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 28, fontFamily: fontName, color: textColor, opacity: 0.85, marginTop: 20, textAlign: posStyles.textAlign as 'left' | 'center', maxWidth: 800 }}>
              {subtitle}
            </p>
          )}
        </div>
        {(logo || brand) && (
          <div style={{ width: 1200, display: 'flex', justifyContent: 'center', paddingBottom: 30, alignItems: 'center', gap: 12 }}>
            {logo && <img src={logo} width={ls} height={ls} style={{ borderRadius: 6, objectFit: 'contain' }} />}
            {brand && <p style={{ fontSize: 20, fontFamily: fontName, color: textColor, opacity: 0.5, margin: 0 }}>{brand}</p>}
          </div>
        )}
      </div>
    ),

    blog: (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: posStyles.justifyContent,
          alignItems: posStyles.alignItems,
          background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`,
          padding: 60,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {image ? (
          <div style={{ position: 'absolute', width: Math.round(1200 * imgZoom / 100), height: Math.round(630 * imgZoom / 100), top: `${imgY}%`, left: `${imgX}%`, transform: `translate(-${imgX}%, -${imgY}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ) : null}
        {image && <div style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)', display: 'flex' }} />}
        {patternOverlay}
        <div
          style={{
            display: 'flex',
            background: accent,
            color: bg1,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: fontName,
            padding: '6px 16px',
            borderRadius: 20,
            marginBottom: 24,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {badgeText || 'Blog Post'}
        </div>
        <h1 style={{ fontSize: Math.min(fontSize, 56), fontFamily: fontName, color: textColor, textAlign: posStyles.textAlign as 'left' | 'center', margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
          {headline}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 24, fontFamily: fontName, color: textColor, opacity: 0.85, marginTop: 20, textAlign: posStyles.textAlign as 'left' | 'center', maxWidth: 800 }}>
            {subtitle}
          </p>
        )}
        {logoElement}
      </div>
    ),

    minimal: (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: posStyles.justifyContent,
          background: bg1,
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        <div style={{ width: 60, height: 4, background: accent, marginBottom: 30, display: 'flex' }} />
        {badgeElement}
        <h1 style={{ fontSize, fontFamily: fontName, color: textColor, margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 900 }}>
          {headline}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 24, fontFamily: fontName, color: textColor, opacity: 0.7, marginTop: 16, maxWidth: 700 }}>{subtitle}</p>
        )}
        {logo ? (
          <div style={{ position: 'absolute', bottom: 30, left: 80, display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={logo} width={ls} height={ls} style={{ borderRadius: 6, objectFit: 'contain' }} />
            {brand && <p style={{ fontSize: 20, fontFamily: fontName, color: textColor, opacity: 0.5, margin: 0 }}>{brand}</p>}
          </div>
        ) : brand ? (
          <p style={{ fontSize: 20, fontFamily: fontName, color: textColor, opacity: 0.5, position: 'absolute', bottom: 40, left: 80, margin: 0 }}>{brand}</p>
        ) : null}
      </div>
    ),

    overlay: (
      <div style={{ width: 1200, height: 630, display: 'flex', position: 'relative', overflow: 'hidden', background: bg1 }}>
        {image ? (
          <div style={{ position: 'absolute', width: Math.round(1200 * imgZoom / 100), height: Math.round(630 * imgZoom / 100), top: `${imgY}%`, left: `${imgX}%`, transform: `translate(-${imgX}%, -${imgY}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        ) : (
          <div style={{ width: 1200, height: 630, background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`, display: 'flex', position: 'absolute', top: 0, left: 0 }} />
        )}
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: posStyles.justifyContent === 'center' ? 'flex-end' : posStyles.justifyContent,
            alignItems: posStyles.alignItems,
            padding: 60,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
            position: 'relative',
          }}
        >
          {badgeElement}
          <h1 style={{ fontSize, fontFamily: fontName, color: '#FFFFFF', margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000, textShadow: '0 2px 12px rgba(0,0,0,0.5)', textAlign: posStyles.textAlign as 'left' | 'center' }}>
            {headline}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 24, fontFamily: fontName, color: '#FFFFFF', opacity: 0.9, marginTop: 12, maxWidth: 800, textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
              {subtitle}
            </p>
          )}
          {(logo || brand) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
              {logo && <img src={logo} width={ls} height={ls} style={{ borderRadius: 4, objectFit: 'contain' }} />}
              {brand && <p style={{ fontSize: 18, fontFamily: fontName, color: '#FFFFFF', opacity: 0.7, margin: 0 }}>{brand}</p>}
            </div>
          )}
        </div>
      </div>
    ),

    'photo-left': (
      <div style={{ width: 1200, height: 630, display: 'flex', position: 'relative' }}>
        <div style={{ width: 480, height: 630, display: 'flex', overflow: 'hidden', position: 'relative', background: bg1 }}>
          {image ? (
            <div style={{ position: 'absolute', width: Math.round(480 * imgZoom / 100), height: Math.round(630 * imgZoom / 100), top: `${imgY}%`, left: `${imgX}%`, transform: `translate(-${imgX}%, -${imgY}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
            <div style={{ width: 480, height: 630, background: `linear-gradient(135deg, ${accent} 0%, ${bg2} 100%)`, display: 'flex' }} />
          )}
        </div>
        <div
          style={{
            width: 720,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: posStyles.justifyContent,
            background: bg1,
            padding: '60px 50px',
            position: 'relative',
          }}
        >
          {patternOverlay}
          {badgeElement}
          <h1 style={{ fontSize: Math.min(fontSize, 52), fontFamily: fontName, color: textColor, margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 620 }}>
            {headline}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 22, fontFamily: fontName, color: textColor, opacity: 0.85, marginTop: 14, maxWidth: 580 }}>{subtitle}</p>
          )}
          {logo ? (
            <div style={{ position: 'absolute', bottom: 30, left: 50, display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={logo} width={ls} height={ls} style={{ borderRadius: 6, objectFit: 'contain' }} />
              {brand && <p style={{ fontSize: 18, fontFamily: fontName, color: textColor, opacity: 0.6, margin: 0 }}>{brand}</p>}
            </div>
          ) : brand ? (
            <p style={{ fontSize: 18, fontFamily: fontName, color: textColor, opacity: 0.5, position: 'absolute', bottom: 35, left: 50, margin: 0 }}>{brand}</p>
          ) : null}
        </div>
      </div>
    ),
    'photo-right': (
      <div style={{ width: 1200, height: 630, display: 'flex', position: 'relative' }}>
        <div
          style={{
            width: 720,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: posStyles.justifyContent,
            background: bg1,
            padding: '60px 50px',
            position: 'relative',
          }}
        >
          {patternOverlay}
          {badgeElement}
          <h1 style={{ fontSize: Math.min(fontSize, 52), fontFamily: fontName, color: textColor, margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 620 }}>
            {headline}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 22, fontFamily: fontName, color: textColor, opacity: 0.85, marginTop: 14, maxWidth: 580 }}>{subtitle}</p>
          )}
          {logo ? (
            <div style={{ position: 'absolute', bottom: 30, left: 50, display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={logo} width={ls} height={ls} style={{ borderRadius: 6, objectFit: 'contain' }} />
              {brand && <p style={{ fontSize: 18, fontFamily: fontName, color: textColor, opacity: 0.6, margin: 0 }}>{brand}</p>}
            </div>
          ) : brand ? (
            <p style={{ fontSize: 18, fontFamily: fontName, color: textColor, opacity: 0.5, position: 'absolute', bottom: 35, left: 50, margin: 0 }}>{brand}</p>
          ) : null}
        </div>
        <div style={{ width: 480, height: 630, display: 'flex', overflow: 'hidden', position: 'relative', background: bg1 }}>
          {image ? (
            <div style={{ position: 'absolute', width: Math.round(480 * imgZoom / 100), height: Math.round(630 * imgZoom / 100), top: `${imgY}%`, left: `${imgX}%`, transform: `translate(-${imgX}%, -${imgY}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
            <div style={{ width: 480, height: 630, background: `linear-gradient(135deg, ${accent} 0%, ${bg2} 100%)`, display: 'flex' }} />
          )}
        </div>
      </div>
    ),
    quote: (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${bg1} 0%, ${bg2} 100%)`,
          padding: '60px 100px',
          position: 'relative',
        }}
      >
        {patternOverlay}
        <div style={{ display: 'flex', fontSize: 120, fontFamily: fontName, color: accent, opacity: 0.3, lineHeight: 0.6, marginBottom: 10 }}>&ldquo;</div>
        <h1 style={{ fontSize: Math.min(fontSize, 48), fontFamily: fontName, color: textColor, margin: 0, fontWeight: 700, lineHeight: 1.3, maxWidth: 900, textAlign: 'center' }}>
          {headline}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 22, fontFamily: fontName, color: accent, marginTop: 24, textAlign: 'center' }}>{subtitle}</p>
        )}
        {logoElement}
      </div>
    ),

    stats: (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: posStyles.alignItems,
          background: bg1,
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {patternOverlay}
        {badgeElement}
        <div style={{ display: 'flex', fontSize: 140, fontFamily: fontName, color: accent, fontWeight: 700, lineHeight: 1, margin: 0 }}>
          {brand || '100+'}
        </div>
        <h1 style={{ fontSize: Math.min(fontSize, 48), fontFamily: fontName, color: textColor, margin: 0, marginTop: 10, fontWeight: 700, lineHeight: 1.2, maxWidth: 900 }}>
          {headline}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 24, fontFamily: fontName, color: textColor, opacity: 0.7, marginTop: 12, maxWidth: 800 }}>{subtitle}</p>
        )}
      </div>
    ),

    magazine: (
      <div style={{ width: 1200, height: 630, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: 1200, height: 380, display: 'flex', overflow: 'hidden', position: 'relative', background: bg2 }}>
          {image ? (
            <div style={{ position: 'absolute', width: Math.round(1200 * imgZoom / 100), height: Math.round(380 * imgZoom / 100), top: `${imgY}%`, left: `${imgX}%`, transform: `translate(-${imgX}%, -${imgY}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
            <div style={{ width: 1200, height: 380, background: `linear-gradient(135deg, ${accent} 0%, ${bg2} 100%)`, display: 'flex' }} />
          )}
        </div>
        <div
          style={{
            width: 1200,
            height: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: bg1,
            padding: '30px 60px',
            position: 'relative',
          }}
        >
          {badgeElement}
          <h1 style={{ fontSize: Math.min(fontSize, 48), fontFamily: fontName, color: textColor, margin: 0, fontWeight: 700, lineHeight: 1.2, maxWidth: 1000 }}>
            {headline}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 20, fontFamily: fontName, color: textColor, opacity: 0.8, marginTop: 8, maxWidth: 900 }}>{subtitle}</p>
          )}
          {logo ? (
            <div style={{ position: 'absolute', bottom: 20, right: 60, display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={logo} width={ls} height={ls} style={{ borderRadius: 6, objectFit: 'contain' }} />
              {brand && <p style={{ fontSize: 16, fontFamily: fontName, color: textColor, opacity: 0.5, margin: 0 }}>{brand}</p>}
            </div>
          ) : brand ? (
            <p style={{ fontSize: 16, fontFamily: fontName, color: textColor, opacity: 0.5, position: 'absolute', bottom: 25, right: 60, margin: 0 }}>{brand}</p>
          ) : null}
        </div>
      </div>
    ),

    'photo-both': (
      <div style={{ width: 1200, height: 630, display: 'flex', position: 'relative' }}>
        {/* Left image */}
        <div style={{ width: 400, height: 630, display: 'flex', overflow: 'hidden', position: 'relative', background: bg2 }}>
          {image ? (
            <div style={{ position: 'absolute', width: Math.round(400 * imgZoom / 100), height: Math.round(630 * imgZoom / 100), top: `${imgY}%`, left: `${imgX}%`, transform: `translate(-${imgX}%, -${imgY}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
            <div style={{ width: 400, height: 630, background: `linear-gradient(135deg, ${accent} 0%, ${bg2} 100%)`, display: 'flex' }} />
          )}
        </div>
        {/* Center text */}
        <div
          style={{
            width: 400,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: bg1,
            padding: '40px 30px',
            position: 'relative',
          }}
        >
          {badgeElement}
          <h1 style={{ fontSize: Math.min(fontSize, 40), fontFamily: fontName, color: textColor, margin: 0, fontWeight: 700, lineHeight: 1.2, textAlign: 'center', maxWidth: 340 }}>
            {headline}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 18, fontFamily: fontName, color: textColor, opacity: 0.8, marginTop: 12, textAlign: 'center', maxWidth: 320 }}>{subtitle}</p>
          )}
          {logo ? (
            <div style={{ position: 'absolute', bottom: 25, display: 'flex', alignItems: 'center', gap: 8 }}>
              <img src={logo} width={Math.min(ls, 40)} height={Math.min(ls, 40)} style={{ borderRadius: 4, objectFit: 'contain' }} />
              {brand && <p style={{ fontSize: 14, fontFamily: fontName, color: textColor, opacity: 0.5, margin: 0 }}>{brand}</p>}
            </div>
          ) : brand ? (
            <p style={{ fontSize: 14, fontFamily: fontName, color: textColor, opacity: 0.5, position: 'absolute', bottom: 30, margin: 0 }}>{brand}</p>
          ) : null}
        </div>
        {/* Right image */}
        <div style={{ width: 400, height: 630, display: 'flex', overflow: 'hidden', position: 'relative', background: bg2 }}>
          {image2 ? (
            <div style={{ position: 'absolute', width: Math.round(400 * imgZoom2 / 100), height: Math.round(630 * imgZoom2 / 100), top: `${imgY2}%`, left: `${imgX2}%`, transform: `translate(-${imgX2}%, -${imgY2}%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={image2} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
            <div style={{ width: 400, height: 630, background: `linear-gradient(135deg, ${bg2} 0%, ${accent} 100%)`, display: 'flex' }} />
          )}
        </div>
      </div>
    ),
  };

  return templates[template] || templates.gradient;
}

/* ── GET handler (text-only templates, fast) ── */

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const fontId = (searchParams.get('fontFamily') || 'inter') as FontId;

  const params: GenerateParams = {
    headline: searchParams.get('headline') || 'Your Headline Here',
    subtitle: searchParams.get('subtitle') || '',
    brand: searchParams.get('brand') || '',
    template: searchParams.get('template') || 'gradient',
    bg1: searchParams.get('bg1') || '#4F46E5',
    bg2: searchParams.get('bg2') || '#7C3AED',
    textColor: searchParams.get('textColor') || '#FFFFFF',
    accent: searchParams.get('accent') || '#10B981',
    pattern: searchParams.get('pattern') || 'none',
    fontFamily: fontId,
    textPosition: (searchParams.get('textPosition') || 'center') as TextPosition,
    fontSizeOverride: parseInt(searchParams.get('fontSizeOverride') || '0', 10),
    badgeText: searchParams.get('badgeText') || '',
  };

  const font = await loadFont(fontId, 700);
  const fonts = font ? [font] : undefined;

  return new ImageResponse(buildElement(params), { width: 1200, height: 630, fonts });
}

/* ── POST handler (supports images/logos via base64) ── */

export async function POST(req: NextRequest) {
  const body = await req.json();
  const fontId = (body.fontFamily || 'inter') as FontId;

  const params: GenerateParams = {
    headline: body.headline || 'Your Headline Here',
    subtitle: body.subtitle || '',
    brand: body.brand || '',
    template: body.template || 'gradient',
    bg1: body.bg1 || '#4F46E5',
    bg2: body.bg2 || '#7C3AED',
    textColor: body.textColor || '#FFFFFF',
    accent: body.accent || '#10B981',
    pattern: body.pattern || 'none',
    image: body.image || undefined,
    logo: body.logo || undefined,
    imageX: body.imageX ?? 50,
    imageY: body.imageY ?? 50,
    imageZoom: body.imageZoom ?? 100,
    logoSize: body.logoSize ?? 60,
    fontFamily: fontId,
    textPosition: (body.textPosition || 'center') as TextPosition,
    fontSizeOverride: body.fontSizeOverride ?? 0,
    badgeText: body.badgeText || '',
    image2: body.image2 || undefined,
    imageX2: body.imageX2 ?? 50,
    imageY2: body.imageY2 ?? 50,
    imageZoom2: body.imageZoom2 ?? 100,
  };

  const font = await loadFont(fontId, 700);
  const fonts = font ? [font] : undefined;

  return new ImageResponse(buildElement(params), { width: 1200, height: 630, fonts });
}

/* ── Pattern overlay ── */

function getPatternOverlay(pattern: string, color: string): React.ReactElement | null {
  if (pattern === 'none') return null;

  const opacity = 0.06;
  const c = color;

  if (pattern === 'dots') {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          opacity,
          backgroundImage: `radial-gradient(circle, ${c} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          display: 'flex',
        }}
      />
    );
  }

  if (pattern === 'grid') {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          opacity,
          backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          display: 'flex',
        }}
      />
    );
  }

  if (pattern === 'diagonal') {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          opacity: opacity * 1.5,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${c} 20px, ${c} 21px)`,
          display: 'flex',
        }}
      />
    );
  }

  return null;
}
