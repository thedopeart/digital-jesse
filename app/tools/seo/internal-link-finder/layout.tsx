import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Link Finder | Free SEO Tool',
  description:
    'Find internal linking opportunities on any website. Get specific anchor text suggestions with relevance scoring. Free, no signup required.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
