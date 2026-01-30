import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page to Social Posts | Turn Any Page into Social Content',
  description:
    'Paste any URL and get ready-to-post content for Twitter/X, LinkedIn, Instagram, Facebook, and Threads. Free, no signup required.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
