import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Opportunity Finder | Free SEO Tool',
  description:
    'Find affiliate revenue hiding in your existing content. Scans your site for brand mentions and matches them to affiliate programs. Free, no signup required.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
