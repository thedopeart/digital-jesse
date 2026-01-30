import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Link in Bio Builder | Free Bio Page Generator',
  description:
    'Build a custom link-in-bio page with drag-and-drop. Choose from 10 templates, add links and social icons, then export as HTML. Free, no signup required.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
