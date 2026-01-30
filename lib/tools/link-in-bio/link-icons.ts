export interface LinkIcon {
  key: string;
  label: string;
  svg: string;
  viewBox: string;
}

export const linkIcons: LinkIcon[] = [
  {
    key: 'link',
    label: 'Link',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>',
  },
  {
    key: 'globe',
    label: 'Website',
    viewBox: '0 0 24 24',
    svg: '<circle fill="none" stroke="currentColor" stroke-width="2" cx="12" cy="12" r="10"/><path fill="none" stroke="currentColor" stroke-width="2" d="M2 12h20"/><path fill="none" stroke="currentColor" stroke-width="2" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
  },
  {
    key: 'store',
    label: 'Store',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 9l1.5-5h15L21 9M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9M3 9h18M9 21V13h6v8"/>',
  },
  {
    key: 'cart',
    label: 'Shop',
    viewBox: '0 0 24 24',
    svg: '<circle fill="currentColor" cx="9" cy="21" r="1"/><circle fill="currentColor" cx="20" cy="21" r="1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>',
  },
  {
    key: 'mail',
    label: 'Email',
    viewBox: '0 0 24 24',
    svg: '<rect fill="none" stroke="currentColor" stroke-width="2" x="2" y="4" width="20" height="16" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" d="M22 7l-10 7L2 7"/>',
  },
  {
    key: 'calendar',
    label: 'Book',
    viewBox: '0 0 24 24',
    svg: '<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x="3" y="4" width="18" height="18" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 2v4M8 2v4M3 10h18"/>',
  },
  {
    key: 'music',
    label: 'Music',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 18V5l12-2v13"/><circle fill="none" stroke="currentColor" stroke-width="2" cx="6" cy="18" r="3"/><circle fill="none" stroke="currentColor" stroke-width="2" cx="18" cy="16" r="3"/>',
  },
  {
    key: 'video',
    label: 'Video',
    viewBox: '0 0 24 24',
    svg: '<polygon fill="currentColor" points="5 3 19 12 5 21 5 3"/>',
  },
  {
    key: 'camera',
    label: 'Photo',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle fill="none" stroke="currentColor" stroke-width="2" cx="12" cy="13" r="4"/>',
  },
  {
    key: 'briefcase',
    label: 'Work',
    viewBox: '0 0 24 24',
    svg: '<rect fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x="2" y="7" width="20" height="14" rx="2"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>',
  },
  {
    key: 'file',
    label: 'Document',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" points="14 2 14 8 20 8"/>',
  },
  {
    key: 'heart',
    label: 'Favorite',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>',
  },
  {
    key: 'star',
    label: 'Featured',
    viewBox: '0 0 24 24',
    svg: '<polygon fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  },
  {
    key: 'code',
    label: 'Code',
    viewBox: '0 0 24 24',
    svg: '<polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="16 18 22 12 16 6"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="8 6 2 12 8 18"/>',
  },
  {
    key: 'download',
    label: 'Download',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="7 10 12 15 17 10"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="12" y1="15" x2="12" y2="3"/>',
  },
  {
    key: 'gift',
    label: 'Gift',
    viewBox: '0 0 24 24',
    svg: '<polyline fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="20 12 20 22 4 22 4 12"/><rect fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x="2" y="7" width="20" height="5"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="12" y1="22" x2="12" y2="7"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>',
  },
  {
    key: 'coffee',
    label: 'Support',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M18 8h1a4 4 0 010 8h-1"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="6" y1="1" x2="6" y2="4"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="10" y1="1" x2="10" y2="4"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="14" y1="1" x2="14" y2="4"/>',
  },
  {
    key: 'palette',
    label: 'Art',
    viewBox: '0 0 24 24',
    svg: '<circle fill="currentColor" cx="13.5" cy="6.5" r="0.5"/><circle fill="currentColor" cx="17.5" cy="10.5" r="0.5"/><circle fill="currentColor" cx="8.5" cy="7.5" r="0.5"/><circle fill="currentColor" cx="6.5" cy="12.5" r="0.5"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
  },
  {
    key: 'podcast',
    label: 'Podcast',
    viewBox: '0 0 24 24',
    svg: '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 10v2a7 7 0 01-14 0v-2"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="12" y1="19" x2="12" y2="23"/><line fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" x1="8" y1="23" x2="16" y2="23"/>',
  },
];
