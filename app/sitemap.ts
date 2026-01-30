import { MetadataRoute } from 'next';
import { portfolioPages } from '@/lib/portfolio-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://digitaljesse.com';

  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/about`, priority: 0.9 },
    { url: `${baseUrl}/portfolio`, priority: 0.9 },
    { url: `${baseUrl}/services`, priority: 0.8 },
    { url: `${baseUrl}/contact`, priority: 0.8 },
    { url: `${baseUrl}/tools`, priority: 0.7 },
    { url: `${baseUrl}/tools/seo/internal-link-finder`, priority: 0.6 },
    { url: `${baseUrl}/tools/seo/affiliate-opportunity-finder`, priority: 0.6 },
    { url: `${baseUrl}/tools/social/link-in-bio-builder`, priority: 0.6 },
  ];

  const portfolioRoutes = portfolioPages.map((page) => ({
    url: `${baseUrl}/portfolio/${page.slug}`,
    priority: 0.7,
  }));

  // art-publications has its own static page
  const artPubExists = portfolioRoutes.some((r) => r.url.endsWith('/art-publications'));
  const extras = artPubExists
    ? []
    : [{ url: `${baseUrl}/portfolio/art-publications`, priority: 0.7 }];

  return [...staticPages, ...portfolioRoutes, ...extras].map((entry) => ({
    ...entry,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
  }));
}
