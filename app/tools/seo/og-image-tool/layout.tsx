import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OG Image Generator & Preview | Free SEO Tool',
  description:
    'Create professional Open Graph images from templates and preview how any URL looks on Twitter, LinkedIn, Facebook, and more. Free, no signup required.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
