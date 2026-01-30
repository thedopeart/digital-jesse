import { PageData, PageElement, ProfileElement, LinkElement, SocialIconsElement, HeaderElement, TextBlockElement } from './types';
import { socialPlatforms } from './social-platforms';
import { linkIcons } from './link-icons';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getButtonRadius(style: string): string {
  if (style === 'square') return '0';
  if (style === 'rounded') return '8px';
  return '999px';
}

function getButtonCSS(data: PageData): string {
  const { button } = data.style;
  const radius = getButtonRadius(button.style);
  const base = `display:flex;align-items:center;gap:10px;justify-content:center;width:100%;padding:14px 20px;border-radius:${radius};font-size:16px;font-weight:500;text-decoration:none;transition:transform 0.15s,box-shadow 0.15s;cursor:pointer;box-sizing:border-box;`;

  if (button.fill === 'filled') {
    return `${base}background:${button.color};color:${button.textColor};border:none;`;
  }
  if (button.fill === 'outline') {
    return `${base}background:transparent;color:${button.color};border:2px solid ${button.color};`;
  }
  // soft
  return `${base}background:${button.color}22;color:${button.color};border:none;`;
}

function getShadow(shadow: string): string {
  if (shadow === 'small') return 'box-shadow:0 2px 8px rgba(0,0,0,0.12);';
  if (shadow === 'medium') return 'box-shadow:0 4px 16px rgba(0,0,0,0.18);';
  if (shadow === 'large') return 'box-shadow:0 8px 30px rgba(0,0,0,0.25);';
  return '';
}

function getBackground(data: PageData): string {
  const { background } = data.style;
  if (background.type === 'gradient') {
    return `background:linear-gradient(135deg, ${background.color1}, ${background.color2});`;
  }
  if (background.type === 'image' && background.imageUrl) {
    return `background:url('${background.imageUrl}') center/cover no-repeat;`;
  }
  return `background:${background.color1};`;
}

function getLinkIconSvg(iconKey: string): string {
  const icon = linkIcons.find(i => i.key === iconKey);
  if (!icon) return '';
  return `<svg width="18" height="18" viewBox="${icon.viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">${icon.svg.replace(/currentColor/g, 'currentColor')}</svg>`;
}

function getSocialIconSvg(platformKey: string): string {
  const platform = socialPlatforms.find(p => p.key === platformKey);
  if (!platform) return '';
  return `<svg width="20" height="20" viewBox="${platform.viewBox}" fill="currentColor" xmlns="http://www.w3.org/2000/svg">${platform.svg}</svg>`;
}

function renderProfile(el: ProfileElement, data: PageData): string {
  const { text } = data.style;
  const shapeRadius = el.photoShape === 'circle' ? '50%' : el.photoShape === 'rounded' ? '12px' : '0';
  const photoHtml = el.photoUrl
    ? `<img src="${escapeHtml(el.photoUrl)}" alt="${escapeHtml(el.name)}" style="width:96px;height:96px;border-radius:${shapeRadius};object-fit:cover;margin-bottom:12px;" />`
    : '';
  return `<div style="text-align:center;margin-bottom:${data.style.layout.spacing}px;">
  ${photoHtml}
  <h1 style="margin:0 0 6px;font-size:${text.nameSize}px;color:${text.nameColor};font-weight:700;">${escapeHtml(el.name)}</h1>
  <p style="margin:0;font-size:15px;color:${text.bioColor};line-height:1.5;">${escapeHtml(el.bio)}</p>
</div>`;
}

function resolveIconColor(data: PageData): string {
  if (data.style.iconColor) return data.style.iconColor;
  return data.style.button.fill === 'filled' ? data.style.button.textColor : data.style.button.color;
}

function resolveSocialIconColor(data: PageData): string {
  if (data.style.socialIconColor) return data.style.socialIconColor;
  return resolveIconColor(data);
}

function renderLink(el: LinkElement, data: PageData): string {
  const iconHtml = el.icon ? `<span style="display:flex">${getLinkIconSvg(el.icon)}</span>` : '';
  const highlightStyle = el.highlight ? 'font-weight:600;' : '';
  return `<a href="${escapeHtml(el.url)}" target="_blank" rel="noopener noreferrer" class="btn" style="${highlightStyle}">
  ${iconHtml}
  <span>${escapeHtml(el.text)}</span>
</a>`;
}

function renderSocialIcons(el: SocialIconsElement, data: PageData): string {
  const iconColor = resolveSocialIconColor(data);
  const items = el.links
    .map(link => {
      const platform = socialPlatforms.find(p => p.key === link.platform);
      const url = platform ? platform.urlTemplate.replace('{handle}', link.handle) : '#';
      const svg = getSocialIconSvg(link.platform);
      return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(platform?.name || '')}" style="color:${iconColor};opacity:0.85;transition:opacity 0.15s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.85'">${svg}</a>`;
    })
    .join('\n    ');
  return `<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin:${data.style.layout.spacing}px 0;">
    ${items}
</div>`;
}

function renderHeader(el: HeaderElement, data: PageData): string {
  return `<h2 style="text-align:center;font-size:18px;font-weight:600;color:${data.style.text.nameColor};margin:${data.style.layout.spacing}px 0 4px;">${escapeHtml(el.text)}</h2>`;
}

function renderTextBlock(el: TextBlockElement, data: PageData): string {
  return `<p style="text-align:center;font-size:14px;color:${data.style.text.bioColor};line-height:1.6;margin:${data.style.layout.spacing}px 0;">${escapeHtml(el.text)}</p>`;
}

function renderElement(el: PageElement, data: PageData): string {
  switch (el.type) {
    case 'profile': return renderProfile(el, data);
    case 'link': return renderLink(el, data);
    case 'socialIcons': return renderSocialIcons(el, data);
    case 'header': return renderHeader(el, data);
    case 'textBlock': return renderTextBlock(el, data);
    default: return '';
  }
}

export function generateHTML(data: PageData): string {
  const { style, meta, analytics } = data;
  const font = style.text.font;
  const fontParam = font.replace(/ /g, '+');
  const bg = getBackground(data);
  const btnCSS = getButtonCSS(data);
  const shadow = getShadow(style.button.shadow);

  const elements = data.elements.map(el => renderElement(el, data)).join('\n');

  const gaScript = analytics.googleAnalyticsId
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(analytics.googleAnalyticsId)}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${escapeHtml(analytics.googleAnalyticsId)}');</script>`
    : '';

  const customScript = analytics.customScript
    ? `<script>${analytics.customScript}</script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}">
<meta property="og:title" content="${escapeHtml(meta.title)}">
<meta property="og:description" content="${escapeHtml(meta.description)}">
<link href="https://fonts.googleapis.com/css2?family=${fontParam}:wght@400;500;600;700&display=swap" rel="stylesheet">
${gaScript}
${customScript}
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{${bg}min-height:100vh;display:flex;justify-content:center;font-family:'${font}',sans-serif;-webkit-font-smoothing:antialiased;}
.container{width:100%;max-width:${style.layout.maxWidth}px;padding:48px 20px;display:flex;flex-direction:column;gap:${style.layout.spacing}px;}
.btn{${btnCSS}${shadow}}
.btn:hover{transform:translateY(-2px);filter:brightness(1.05);}
</style>
</head>
<body>
<div class="container">
${elements}
</div>
</body>
</html>`;
}
