'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HexColorPicker } from 'react-colorful';
import type {
  PageData,
  PageElement,
  ProfileElement,
  LinkElement,
  SocialIconsElement,
  HeaderElement,
  TextBlockElement,
  StyleConfig,
} from '@/lib/tools/link-in-bio/types';
import { templates } from '@/lib/tools/link-in-bio/templates';
import { socialPlatforms } from '@/lib/tools/link-in-bio/social-platforms';
import { linkIcons } from '@/lib/tools/link-in-bio/link-icons';
import { generateHTML } from '@/lib/tools/link-in-bio/generate-html';

/* ───────── helpers ───────── */
const uid = () => Math.random().toString(36).slice(2, 10);

const FONTS = [
  'Inter', 'DM Sans', 'Poppins', 'Space Grotesk', 'Playfair Display',
  'Roboto', 'Open Sans', 'Montserrat', 'Lato', 'Nunito',
];

function defaultPageData(): PageData {
  return {
    meta: { title: 'My Links', description: '' },
    style: { ...templates[0].style },
    elements: [
      { id: uid(), type: 'profile', name: 'Your Name', bio: 'Your bio goes here', photoUrl: '', photoShape: 'circle' },
    ],
    analytics: { googleAnalyticsId: '', customScript: '' },
  };
}

/* ───────── SVG icon renderer (for React) ───────── */
function SvgIcon({ svg, viewBox, size = 18, className = '' }: { svg: string; viewBox: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      className={className}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/* ───────── Color picker popover ───────── */
function ColorPicker({ color, onChange, label }: { color: string; onChange: (c: string) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-9 rounded-lg border border-gray-300 flex items-center gap-2 px-2"
      >
        <span className="w-5 h-5 rounded-md border border-gray-200 shrink-0" style={{ background: color }} />
        <span className="text-sm text-gray-700 truncate">{color}</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 p-3">
          <HexColorPicker color={color} onChange={onChange} />
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 w-full text-sm border border-gray-300 rounded-lg px-2 py-1 text-gray-800"
          />
        </div>
      )}
    </div>
  );
}

/* ───────── Sortable element item ───────── */
function SortableItem({ el, onEdit, onDelete }: { el: PageElement; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: el.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const label = el.type === 'profile' ? (el as ProfileElement).name
    : el.type === 'link' ? (el as LinkElement).text
    : el.type === 'socialIcons' ? `Social Icons (${(el as SocialIconsElement).links.length})`
    : el.type === 'header' ? (el as HeaderElement).text
    : (el as TextBlockElement).text;

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 group">
      <button {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600 shrink-0" title="Drag to reorder">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="5" cy="3" r="1.5"/><circle cx="11" cy="3" r="1.5"/><circle cx="5" cy="8" r="1.5"/><circle cx="11" cy="8" r="1.5"/><circle cx="5" cy="13" r="1.5"/><circle cx="11" cy="13" r="1.5"/></svg>
      </button>
      <span className="text-xs font-medium text-gray-400 uppercase w-14 shrink-0">{el.type === 'socialIcons' ? 'social' : el.type}</span>
      <span className="text-sm text-gray-800 truncate flex-1">{label}</span>
      <button onClick={onEdit} className="text-gray-400 hover:text-[#b8860b] transition-colors" title="Edit">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button onClick={onDelete} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
      </button>
    </div>
  );
}

/* ───────── resolve icon color with fallback ───────── */
function resolveIconColor(style: PageData['style']): string {
  if (style.iconColor) return style.iconColor;
  return style.button.fill === 'filled' ? style.button.textColor : style.button.color;
}

function resolveSocialIconColor(style: PageData['style']): string {
  if (style.socialIconColor) return style.socialIconColor;
  return resolveIconColor(style);
}

/* ───────── Live Preview ───────── */
function LivePreview({ data }: { data: PageData }) {
  const { style } = data;
  const iconColor = resolveIconColor(style);
  const bgStyle: React.CSSProperties = style.background.type === 'gradient'
    ? { background: `linear-gradient(135deg, ${style.background.color1}, ${style.background.color2})` }
    : style.background.type === 'image' && style.background.imageUrl
    ? { background: `url('${style.background.imageUrl}') center/cover no-repeat` }
    : { background: style.background.color1 };

  const btnRadius = style.button.style === 'square' ? '0' : style.button.style === 'rounded' ? '8px' : '999px';
  const btnBase: React.CSSProperties = {
    borderRadius: btnRadius,
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: style.layout.buttonWidth === 'full' ? '100%' : 'auto',
    textDecoration: 'none',
    transition: 'transform 0.15s',
    cursor: 'pointer',
    boxShadow: style.button.shadow === 'small' ? '0 2px 8px rgba(0,0,0,0.12)' : style.button.shadow === 'medium' ? '0 4px 16px rgba(0,0,0,0.18)' : style.button.shadow === 'large' ? '0 8px 30px rgba(0,0,0,0.25)' : 'none',
  };

  const btnFill: React.CSSProperties = style.button.fill === 'filled'
    ? { background: style.button.color, color: style.button.textColor, border: 'none' }
    : style.button.fill === 'outline'
    ? { background: 'transparent', color: style.button.color, border: `2px solid ${style.button.color}` }
    : { background: `${style.button.color}22`, color: style.button.color, border: 'none' };

  return (
    <div className="w-full h-full overflow-auto" style={{ ...bgStyle, fontFamily: `'${style.text.font}', sans-serif` }}>
      <div className="mx-auto px-5 py-10" style={{ maxWidth: style.layout.maxWidth }}>
        <div className="flex flex-col" style={{ gap: style.layout.spacing }}>
          {data.elements.map((el) => {
            if (el.type === 'profile') {
              const p = el as ProfileElement;
              const shapeRadius = p.photoShape === 'circle' ? '50%' : p.photoShape === 'rounded' ? '12px' : '0';
              return (
                <div key={el.id} className="text-center" style={{ marginBottom: style.layout.spacing }}>
                  {p.photoUrl && (
                    <img
                      src={p.photoUrl}
                      alt={p.name}
                      className="mx-auto mb-3"
                      style={{ width: 80, height: 80, borderRadius: shapeRadius, objectFit: 'cover' }}
                    />
                  )}
                  <h1 style={{ fontSize: style.text.nameSize, color: style.text.nameColor, fontWeight: 700, margin: 0 }}>{p.name}</h1>
                  <p style={{ fontSize: 14, color: style.text.bioColor, marginTop: 4, lineHeight: 1.5 }}>{p.bio}</p>
                </div>
              );
            }
            if (el.type === 'link') {
              const l = el as LinkElement;
              const icon = linkIcons.find(i => i.key === l.icon);
              return (
                <div key={el.id} style={{ ...btnBase, ...btnFill, ...(l.highlight ? { fontWeight: 600 } : {}) }}>
                  {icon && <span style={{ display: 'flex' }}><SvgIcon svg={icon.svg} viewBox={icon.viewBox} size={16} /></span>}
                  <span>{l.text}</span>
                </div>
              );
            }
            if (el.type === 'socialIcons') {
              const s = el as SocialIconsElement;
              const socialColor = resolveSocialIconColor(style);
              return (
                <div key={el.id} className="flex flex-wrap justify-center" style={{ gap: 14, margin: `${style.layout.spacing}px 0` }}>
                  {s.links.map((link, i) => {
                    const platform = socialPlatforms.find(p => p.key === link.platform);
                    if (!platform) return null;
                    return (
                      <span key={i} style={{ color: socialColor, opacity: 0.85 }}>
                        <SvgIcon svg={platform.svg} viewBox={platform.viewBox} size={20} />
                      </span>
                    );
                  })}
                </div>
              );
            }
            if (el.type === 'header') {
              return <h2 key={el.id} style={{ textAlign: 'center', fontSize: 16, fontWeight: 600, color: style.text.nameColor }}>{(el as HeaderElement).text}</h2>;
            }
            if (el.type === 'textBlock') {
              return <p key={el.id} style={{ textAlign: 'center', fontSize: 13, color: style.text.bioColor, lineHeight: 1.6 }}>{(el as TextBlockElement).text}</p>;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────── Modal wrapper ───────── */
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-auto mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* ───────── Edit Profile Modal ───────── */
function EditProfileModal({ el, onSave, onClose }: { el: ProfileElement; onSave: (e: ProfileElement) => void; onClose: () => void }) {
  const [draft, setDraft] = useState({ ...el });
  return (
    <Modal open title="Edit Profile" onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea value={draft.bio} onChange={(e) => setDraft({ ...draft, bio: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
          <input value={draft.photoUrl} onChange={(e) => setDraft({ ...draft, photoUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo Shape</label>
          <div className="flex gap-2">
            {(['circle', 'rounded', 'square'] as const).map((s) => (
              <button key={s} onClick={() => setDraft({ ...draft, photoShape: s })} className={`px-4 py-2 rounded-lg text-sm capitalize ${draft.photoShape === s ? 'bg-[#d4a847] text-black font-semibold' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
            ))}
          </div>
        </div>
        <button onClick={() => onSave(draft)} className="w-full py-3 bg-[#d4a847] text-black rounded-lg font-semibold hover:bg-[#c49a3d] transition-colors">Save</button>
      </div>
    </Modal>
  );
}

/* ───────── Edit Link Modal ───────── */
function EditLinkModal({ el, onSave, onClose }: { el: LinkElement | null; onSave: (e: LinkElement) => void; onClose: () => void }) {
  const [draft, setDraft] = useState<LinkElement>(el || { id: uid(), type: 'link', text: '', url: '', icon: 'link', highlight: false });
  return (
    <Modal open title={el ? 'Edit Link' : 'Add Link'} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
          <input value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="My Website" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <input value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
          <div className="grid grid-cols-6 gap-2">
            {linkIcons.map((icon) => (
              <button
                key={icon.key}
                onClick={() => setDraft({ ...draft, icon: icon.key })}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs ${draft.icon === icon.key ? 'border-[#d4a847] bg-amber-50 text-[#b8860b]' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                title={icon.label}
              >
                <SvgIcon svg={icon.svg} viewBox={icon.viewBox} size={20} />
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={draft.highlight} onChange={(e) => setDraft({ ...draft, highlight: e.target.checked })} className="rounded" />
          Highlight this link
        </label>
        <button onClick={() => onSave(draft)} className="w-full py-3 bg-[#d4a847] text-black rounded-lg font-semibold hover:bg-[#c49a3d] transition-colors">Save</button>
      </div>
    </Modal>
  );
}

/* ───────── Edit Social Icons Modal ───────── */
function EditSocialModal({ el, onSave, onClose }: { el: SocialIconsElement | null; onSave: (e: SocialIconsElement) => void; onClose: () => void }) {
  const [draft, setDraft] = useState<SocialIconsElement>(el || { id: uid(), type: 'socialIcons', links: [], iconStyle: 'filled', size: 24 });
  const [addPlatform, setAddPlatform] = useState('');
  const [addHandle, setAddHandle] = useState('');

  const addLink = () => {
    if (!addPlatform || !addHandle) return;
    setDraft({ ...draft, links: [...draft.links, { platform: addPlatform, handle: addHandle }] });
    setAddPlatform('');
    setAddHandle('');
  };

  const removeLink = (idx: number) => {
    setDraft({ ...draft, links: draft.links.filter((_, i) => i !== idx) });
  };

  return (
    <Modal open title={el ? 'Edit Social Icons' : 'Add Social Icons'} onClose={onClose}>
      <div className="space-y-4">
        {draft.links.length > 0 && (
          <div className="space-y-2">
            {draft.links.map((link, i) => {
              const platform = socialPlatforms.find(p => p.key === link.platform);
              return (
                <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  {platform && <SvgIcon svg={platform.svg} viewBox={platform.viewBox} size={18} className="text-gray-600 shrink-0" />}
                  <span className="text-sm text-gray-800 flex-1">{platform?.name}: {link.handle}</span>
                  <button onClick={() => removeLink(i)} className="text-gray-400 hover:text-red-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex gap-2">
          <select value={addPlatform} onChange={(e) => setAddPlatform(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm">
            <option value="">Select platform...</option>
            {socialPlatforms.map((p) => (
              <option key={p.key} value={p.key}>{p.name}</option>
            ))}
          </select>
          <input value={addHandle} onChange={(e) => setAddHandle(e.target.value)} placeholder="username" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm" />
          <button onClick={addLink} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium shrink-0">Add</button>
        </div>
        <button onClick={() => onSave(draft)} className="w-full py-3 bg-[#d4a847] text-black rounded-lg font-semibold hover:bg-[#c49a3d] transition-colors">Save</button>
      </div>
    </Modal>
  );
}

/* ───────── Edit Header / Text Block Modal ───────── */
function EditTextModal({ el, type, onSave, onClose }: { el: HeaderElement | TextBlockElement | null; type: 'header' | 'textBlock'; onSave: (e: HeaderElement | TextBlockElement) => void; onClose: () => void }) {
  const [text, setText] = useState(el?.text || '');
  const save = () => {
    onSave(el ? { ...el, text } : { id: uid(), type, text } as HeaderElement | TextBlockElement);
  };
  return (
    <Modal open title={type === 'header' ? 'Edit Header' : 'Edit Text Block'} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{type === 'header' ? 'Heading Text' : 'Body Text'}</label>
          {type === 'header'
            ? <input value={text} onChange={(e) => setText(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900" placeholder="Section heading" />
            : <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 resize-vertical" placeholder="Write your text here..." />
          }
        </div>
        <button onClick={save} className="w-full py-3 bg-[#d4a847] text-black rounded-lg font-semibold hover:bg-[#c49a3d] transition-colors">Save</button>
      </div>
    </Modal>
  );
}

/* ───────── Export Modal ───────── */
function ExportModal({ data, onClose }: { data: PageData; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const html = generateHTML(data);

  const download = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'link-in-bio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal open title="Export Your Page" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex gap-3">
          <button onClick={download} className="flex-1 py-3 bg-[#d4a847] text-black rounded-lg font-semibold hover:bg-[#c49a3d] transition-colors">
            Download HTML
          </button>
          <button onClick={copy} className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            {copied ? 'Copied' : 'Copy HTML'}
          </button>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Analytics (Optional)</h4>
          <input
            value={data.analytics.googleAnalyticsId}
            readOnly
            placeholder="GA Measurement ID (set in builder)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm bg-gray-50"
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Free Hosting Options</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-800">Netlify Drop</p>
              <p>Drag your HTML file to <span className="text-[#b8860b]">app.netlify.com/drop</span>. Free custom domains.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">GitHub Pages</p>
              <p>Push your file to a repo, enable Pages in settings. Free at yourusername.github.io.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Vercel</p>
              <p>Create a project with just this HTML file. Deploy in seconds at vercel.app.</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Cloudflare Pages</p>
              <p>Upload via dashboard or connect a repo. Free SSL and fast global CDN.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Preview Code</h4>
          <pre className="text-xs text-gray-600 overflow-auto max-h-40 whitespace-pre-wrap">{html.slice(0, 500)}...</pre>
        </div>
      </div>
    </Modal>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function LinkInBioBuilderPage() {
  const [data, setData] = useState<PageData>(defaultPageData);
  const [editingEl, setEditingEl] = useState<PageElement | null>(null);
  const [addingType, setAddingType] = useState<'link' | 'socialIcons' | 'header' | 'textBlock' | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [showDrafts, setShowDrafts] = useState(false);
  const [drafts, setDrafts] = useState<{ name: string; data: PageData }[]>([]);
  const [controlTab, setControlTab] = useState<'settings' | 'elements' | 'templates' | 'customize'>('elements');

  // Load drafts from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lib-drafts');
      if (saved) setDrafts(JSON.parse(saved));
    } catch {}
  }, []);

  const saveDrafts = useCallback((d: { name: string; data: PageData }[]) => {
    setDrafts(d);
    localStorage.setItem('lib-drafts', JSON.stringify(d));
  }, []);

  const saveDraft = useCallback(() => {
    const name = data.meta.title || `Draft ${drafts.length + 1}`;
    saveDrafts([...drafts, { name, data: JSON.parse(JSON.stringify(data)) }]);
  }, [data, drafts, saveDrafts]);

  const loadDraft = useCallback((d: PageData) => {
    setData(JSON.parse(JSON.stringify(d)));
    setShowDrafts(false);
  }, []);

  const deleteDraft = useCallback((idx: number) => {
    saveDrafts(drafts.filter((_, i) => i !== idx));
  }, [drafts, saveDrafts]);

  const updateElement = useCallback((updated: PageElement) => {
    setData((prev) => ({
      ...prev,
      elements: prev.elements.map((el) => (el.id === updated.id ? updated : el)),
    }));
    setEditingEl(null);
  }, []);

  const addElement = useCallback((el: PageElement) => {
    setData((prev) => ({ ...prev, elements: [...prev.elements, el] }));
    setAddingType(null);
  }, []);

  const deleteElement = useCallback((id: string) => {
    setData((prev) => ({ ...prev, elements: prev.elements.filter((el) => el.id !== id) }));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = prev.elements.findIndex((el) => el.id === active.id);
        const newIndex = prev.elements.findIndex((el) => el.id === over.id);
        return { ...prev, elements: arrayMove(prev.elements, oldIndex, newIndex) };
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1e1e1e] border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
              <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
              <span>/</span>
              <span className="text-gray-300">Link in Bio Builder</span>
            </div>
            <h1 className="text-xl font-bold text-white">Link in Bio Builder</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setData(defaultPageData())} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">New</button>
            <button onClick={saveDraft} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">Save Draft</button>
            <button onClick={() => setShowDrafts(true)} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors">Load Draft</button>
            <button onClick={() => setShowExport(true)} className="px-4 py-2 bg-[#d4a847] text-black rounded-lg text-sm font-semibold hover:bg-[#c49a3d] transition-colors">Export</button>
          </div>
        </div>
      </div>

      {/* Main builder */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Live Preview</h2>
              <div className="flex gap-1 bg-gray-200 rounded-lg p-0.5">
                <button onClick={() => setPreviewMode('mobile')} className={`px-3 py-1 text-xs rounded-md font-medium ${previewMode === 'mobile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Mobile</button>
                <button onClick={() => setPreviewMode('desktop')} className={`px-3 py-1 text-xs rounded-md font-medium ${previewMode === 'desktop' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Desktop</button>
              </div>
            </div>
            <div className={`mx-auto border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg ${previewMode === 'mobile' ? 'w-[375px]' : 'w-full'}`} style={{ height: 700 }}>
              <LivePreview data={data} />
            </div>
          </div>

          {/* Right: Controls */}
          <div>
            {/* Tab navigation */}
            <div className="flex gap-1 bg-gray-200 rounded-lg p-1 mb-4">
              {([
                { key: 'elements' as const, label: 'Elements' },
                { key: 'templates' as const, label: 'Templates' },
                { key: 'customize' as const, label: 'Customize' },
                { key: 'settings' as const, label: 'Settings' },
              ]).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setControlTab(tab.key)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${controlTab === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              {/* Elements tab */}
              {controlTab === 'elements' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Add Elements</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { type: 'link' as const, label: 'Link Button', icon: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>' },
                        { type: 'socialIcons' as const, label: 'Social Icons', icon: '<circle fill="none" stroke="currentColor" stroke-width="2" cx="18" cy="5" r="3"/><circle fill="none" stroke="currentColor" stroke-width="2" cx="6" cy="12" r="3"/><circle fill="none" stroke="currentColor" stroke-width="2" cx="18" cy="19" r="3"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>' },
                        { type: 'header' as const, label: 'Header', icon: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 6h16M4 12h16M4 18h10"/>' },
                        { type: 'textBlock' as const, label: 'Text Block', icon: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 6h16M4 10h16M4 14h12M4 18h8"/>' },
                      ].map((item) => (
                        <button
                          key={item.type}
                          onClick={() => setAddingType(item.type)}
                          className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-[#d4a847] hover:text-[#b8860b] transition-colors"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0" dangerouslySetInnerHTML={{ __html: item.icon }} />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Your Elements</h3>
                    {data.elements.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">No elements yet. Add one above.</p>
                    ) : (
                      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={data.elements.map((el) => el.id)} strategy={verticalListSortingStrategy}>
                          <div className="space-y-2">
                            {data.elements.map((el) => (
                              <SortableItem key={el.id} el={el} onEdit={() => setEditingEl(el)} onDelete={() => deleteElement(el.id)} />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    )}
                  </div>
                </div>
              )}

              {/* Templates tab */}
              {controlTab === 'templates' && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Choose a Template</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {templates.map((t) => {
                      const isActive = data.style.text.font === t.style.text.font && data.style.background.color1 === t.style.background.color1 && data.style.iconColor === t.style.iconColor;
                      const bg = t.style.background.type === 'gradient'
                        ? `linear-gradient(135deg, ${t.style.background.color1}, ${t.style.background.color2})`
                        : t.style.background.color1;
                      const btnRadius = t.style.button.style === 'square' ? '0' : t.style.button.style === 'rounded' ? '6px' : '999px';
                      const btnBg = t.style.button.fill === 'filled' ? t.style.button.color
                        : t.style.button.fill === 'outline' ? 'transparent'
                        : `${t.style.button.color}22`;
                      const btnBorder = t.style.button.fill === 'outline' ? `1.5px solid ${t.style.button.color}` : 'none';
                      const btnText = t.style.button.fill === 'filled' ? t.style.button.textColor : t.style.button.color;
                      return (
                        <button
                          key={t.key}
                          onClick={() => setData({ ...data, style: JSON.parse(JSON.stringify(t.style)) })}
                          className={`rounded-xl p-3 border-2 text-left transition-all ${isActive ? 'border-[#d4a847] shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className="rounded-lg p-3 flex flex-col items-center gap-1.5" style={{ background: bg }}>
                            <div className="w-6 h-6 rounded-full" style={{ background: t.style.text.nameColor, opacity: 0.3 }} />
                            <div className="h-1.5 w-12 rounded-full" style={{ background: t.style.text.nameColor, opacity: 0.5 }} />
                            <div className="h-1 w-16 rounded-full" style={{ background: t.style.text.bioColor, opacity: 0.4 }} />
                            <div className="flex gap-1.5 mt-0.5">
                              <span style={{ color: t.style.socialIconColor || t.style.iconColor }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                              </span>
                              <span style={{ color: t.style.socialIconColor || t.style.iconColor }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                              </span>
                              <span style={{ color: t.style.socialIconColor || t.style.iconColor }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                              </span>
                            </div>
                            <div className="w-full rounded mt-0.5 flex items-center justify-center py-1.5" style={{ background: btnBg, border: btnBorder, borderRadius: btnRadius }}>
                              <span style={{ color: btnText, fontSize: 8, fontWeight: 600 }}>Link</span>
                            </div>
                            <div className="w-full rounded flex items-center justify-center py-1.5" style={{ background: btnBg, border: btnBorder, borderRadius: btnRadius }}>
                              <span style={{ color: btnText, fontSize: 8, fontWeight: 600 }}>Link</span>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-gray-700 mt-2 block">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Customize tab */}
              {controlTab === 'customize' && (
                <div className="space-y-5">
                  {/* Background */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Background</h4>
                    <div className="flex gap-2 mb-3">
                      {(['solid', 'gradient'] as const).map((t) => (
                        <button key={t} onClick={() => setData({ ...data, style: { ...data.style, background: { ...data.style.background, type: t } } })} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${data.style.background.type === t ? 'bg-[#d4a847] text-black' : 'bg-gray-100 text-gray-600'}`}>{t}</button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <ColorPicker label="Color 1" color={data.style.background.color1} onChange={(c) => setData({ ...data, style: { ...data.style, background: { ...data.style.background, color1: c } } })} />
                      {data.style.background.type === 'gradient' && (
                        <ColorPicker label="Color 2" color={data.style.background.color2} onChange={(c) => setData({ ...data, style: { ...data.style, background: { ...data.style.background, color2: c } } })} />
                      )}
                    </div>
                  </div>

                  {/* Button */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Buttons</h4>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <ColorPicker label="Button Color" color={data.style.button.color} onChange={(c) => setData({ ...data, style: { ...data.style, button: { ...data.style.button, color: c } } })} />
                      <ColorPicker label="Text Color" color={data.style.button.textColor} onChange={(c) => setData({ ...data, style: { ...data.style, button: { ...data.style.button, textColor: c } } })} />
                    </div>
                    <div className="flex gap-2 mb-2">
                      {(['square', 'rounded', 'pill'] as const).map((s) => (
                        <button key={s} onClick={() => setData({ ...data, style: { ...data.style, button: { ...data.style.button, style: s } } })} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${data.style.button.style === s ? 'bg-[#d4a847] text-black' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
                      ))}
                    </div>
                    <div className="flex gap-2 mb-2">
                      {(['filled', 'outline', 'soft'] as const).map((f) => (
                        <button key={f} onClick={() => setData({ ...data, style: { ...data.style, button: { ...data.style.button, fill: f } } })} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${data.style.button.fill === f ? 'bg-[#d4a847] text-black' : 'bg-gray-100 text-gray-600'}`}>{f}</button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {(['none', 'small', 'medium', 'large'] as const).map((s) => (
                        <button key={s} onClick={() => setData({ ...data, style: { ...data.style, button: { ...data.style.button, shadow: s } } })} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${data.style.button.shadow === s ? 'bg-[#d4a847] text-black' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
                      ))}
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Social Icons</h4>
                    <ColorPicker label="Social Icon Color" color={resolveSocialIconColor(data.style)} onChange={(c) => setData({ ...data, style: { ...data.style, socialIconColor: c } })} />
                    <p className="text-xs text-gray-400 mt-1.5">Button icons automatically match button text color.</p>
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Typography</h4>
                    <select value={data.style.text.font} onChange={(e) => setData({ ...data, style: { ...data.style, text: { ...data.style.text, font: e.target.value } } })} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 text-sm mb-3">
                      {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-3">
                      <ColorPicker label="Name Color" color={data.style.text.nameColor} onChange={(c) => setData({ ...data, style: { ...data.style, text: { ...data.style.text, nameColor: c } } })} />
                      <ColorPicker label="Bio Color" color={data.style.text.bioColor} onChange={(c) => setData({ ...data, style: { ...data.style, text: { ...data.style.text, bioColor: c } } })} />
                    </div>
                  </div>

                  {/* Layout */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Layout</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Max Width: {data.style.layout.maxWidth}px</label>
                        <input type="range" min={360} max={600} value={data.style.layout.maxWidth} onChange={(e) => setData({ ...data, style: { ...data.style, layout: { ...data.style.layout, maxWidth: +e.target.value } } })} className="w-full" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Spacing: {data.style.layout.spacing}px</label>
                        <input type="range" min={4} max={24} value={data.style.layout.spacing} onChange={(e) => setData({ ...data, style: { ...data.style, layout: { ...data.style.layout, spacing: +e.target.value } } })} className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings tab */}
              {controlTab === 'settings' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Page Settings</h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Page Title</label>
                    <input
                      value={data.meta.title}
                      onChange={(e) => setData({ ...data, meta: { ...data.meta, title: e.target.value } })}
                      placeholder="Page title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Page Description</label>
                    <input
                      value={data.meta.description}
                      onChange={(e) => setData({ ...data, meta: { ...data.meta, description: e.target.value } })}
                      placeholder="Short description for SEO"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">GA Measurement ID (optional)</label>
                    <input
                      value={data.analytics.googleAnalyticsId}
                      onChange={(e) => setData({ ...data, analytics: { ...data.analytics, googleAnalyticsId: e.target.value } })}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#f5f5f0] py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why build your own link-in-bio page?</h2>
          <div className="space-y-4 text-gray-700 text-base leading-relaxed mb-14">
            <p>
              Linktree, Beacons, and the rest charge monthly fees for features you can get for free. Worse, they own your page. If they shut down or change pricing, your links break.
            </p>
            <p>
              This builder gives you a page you actually own. Design it however you want, export clean HTML, and host it anywhere. No branding slapped on top. No $9/month for a custom color.
            </p>
            <p>
              Pick a template, add your links, customize the design, and export. The HTML works on any hosting provider: Netlify, Vercel, GitHub Pages, your own server. You keep full control.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common questions</h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.03]">
            {[
              { q: 'Is this really free?', a: 'Yes. No signup, no trial, no hidden upsell. Build your page and export it.' },
              { q: 'Where do I host the exported HTML?', a: 'Anywhere that serves static files. Netlify and Vercel both have free tiers. GitHub Pages works too. Upload the HTML file and point your domain at it.' },
              { q: 'Can I use my own domain?', a: 'Yes. Since you own the HTML file, you can host it on any domain you control. Most hosting providers let you connect a custom domain in a few clicks.' },
              { q: 'Will it look good on mobile?', a: 'The exported page is fully responsive. It looks good on phones, tablets, and desktops. Use the preview toggle in the builder to check both views.' },
              { q: 'Can I edit it after exporting?', a: 'Yes. Save a draft in the builder so you can come back and make changes. You can also edit the exported HTML directly if you know basic code.' },
              { q: 'Do you store my data?', a: 'No. Everything stays in your browser. Drafts are saved to your local storage. Nothing is sent to a server.' },
              { q: 'How is this different from Linktree?', a: 'You own the output. No monthly fees, no forced branding, no dependency on a third-party service. Export once and it works forever.' },
            ].map((item, i, arr) => (
              <div key={item.q} className={i < arr.length - 1 ? 'pb-5 mb-5 border-b border-gray-100' : ''}>
                <h3 className="font-semibold text-gray-900 text-base mb-1.5">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {editingEl?.type === 'profile' && (
        <EditProfileModal el={editingEl as ProfileElement} onSave={updateElement} onClose={() => setEditingEl(null)} />
      )}
      {(editingEl?.type === 'link' || addingType === 'link') && (
        <EditLinkModal el={editingEl?.type === 'link' ? (editingEl as LinkElement) : null} onSave={editingEl ? updateElement : addElement} onClose={() => { setEditingEl(null); setAddingType(null); }} />
      )}
      {(editingEl?.type === 'socialIcons' || addingType === 'socialIcons') && (
        <EditSocialModal el={editingEl?.type === 'socialIcons' ? (editingEl as SocialIconsElement) : null} onSave={editingEl ? updateElement : addElement} onClose={() => { setEditingEl(null); setAddingType(null); }} />
      )}
      {((editingEl?.type === 'header' || editingEl?.type === 'textBlock') || addingType === 'header' || addingType === 'textBlock') && (
        <EditTextModal
          el={editingEl?.type === 'header' || editingEl?.type === 'textBlock' ? (editingEl as HeaderElement | TextBlockElement) : null}
          type={(editingEl?.type === 'header' || addingType === 'header') ? 'header' : 'textBlock'}
          onSave={editingEl ? updateElement : addElement}
          onClose={() => { setEditingEl(null); setAddingType(null); }}
        />
      )}
      {showExport && <ExportModal data={data} onClose={() => setShowExport(false)} />}
      {showDrafts && (
        <Modal open title="Load Draft" onClose={() => setShowDrafts(false)}>
          {drafts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No saved drafts yet.</p>
          ) : (
            <div className="space-y-2">
              {drafts.map((d, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                  <span className="text-sm text-gray-800 flex-1">{d.name}</span>
                  <button onClick={() => loadDraft(d.data)} className="text-sm text-[#b8860b] font-medium hover:underline">Load</button>
                  <button onClick={() => deleteDraft(i)} className="text-sm text-red-500 hover:underline">Delete</button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
