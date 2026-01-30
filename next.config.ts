import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // === Old Shopify /pages/ routes ===
      { source: '/pages/about-me', destination: '/about', permanent: true },
      { source: '/pages/portfolio', destination: '/portfolio', permanent: true },
      { source: '/pages/services', destination: '/services', permanent: true },
      { source: '/pages/organic-seo-growth', destination: '/portfolio/organic-seo-growth', permanent: true },
      { source: '/pages/organic-seo-growth-2', destination: '/portfolio/seo-organic-growth-case-studies', permanent: true },
      { source: '/pages/etsy-keyword-research', destination: '/portfolio/etsy-keyword-research', permanent: true },
      { source: '/pages/blog-example-1', destination: '/portfolio/blog-example-1', permanent: true },
      { source: '/pages/figma-design', destination: '/portfolio/figma-design', permanent: true },
      { source: '/pages/company-profile', destination: '/portfolio/company-profile', permanent: true },
      { source: '/pages/paid-sm-marketing', destination: '/portfolio/paid-sm-marketing', permanent: true },
      { source: '/pages/social-media-management', destination: '/portfolio/social-media-management', permanent: true },
      { source: '/pages/social-media-management-2', destination: '/portfolio/social-media-management', permanent: true },
      { source: '/pages/social-media-management-3', destination: '/portfolio/social-media-management', permanent: true },
      { source: '/pages/art-design', destination: '/portfolio/art-design', permanent: true },
      { source: '/pages/animation', destination: '/portfolio/animation', permanent: true },
      { source: '/pages/art-publications', destination: '/portfolio/art-publications', permanent: true },
      { source: '/pages/crypto-nfts', destination: '/portfolio/crypto-nfts', permanent: true },
      { source: '/pages/publications', destination: '/portfolio/art-publications', permanent: true },
      { source: '/pages/seo-keyword-research', destination: '/portfolio/etsy-keyword-research', permanent: true },
      { source: '/pages/social-media-content', destination: '/portfolio/social-media-management', permanent: true },
      { source: '/pages/infographics-pitchdecks', destination: '/portfolio/company-profile', permanent: true },
      { source: '/pages/mockups-design', destination: '/portfolio/figma-design', permanent: true },
      { source: '/pages/social-media-posts-example', destination: '/portfolio/social-media-management', permanent: true },
      { source: '/pages/collaborations', destination: '/portfolio', permanent: true },
      { source: '/pages/automated-blogging', destination: '/portfolio', permanent: true },
      { source: '/pages/blogs', destination: '/portfolio', permanent: true },
      { source: '/pages/blog-example-2', destination: '/portfolio', permanent: true },
      { source: '/pages/blog-example-3', destination: '/portfolio', permanent: true },

      // === Old Shopify /collections/ routes ===
      { source: '/collections/frontpage', destination: '/', permanent: true },

      // === Old Shopify /blogs/ routes ===
      { source: '/blogs/jesse/seo-and-copywriting', destination: '/portfolio/organic-seo-growth', permanent: true },
      { source: '/blogs/jesse/seo-blogging', destination: '/portfolio/blog-example-1', permanent: true },
      { source: '/blogs/jesse/art-design', destination: '/portfolio/art-design', permanent: true },
      { source: '/blogs/jesse/animations', destination: '/portfolio/animation', permanent: true },
      { source: '/blogs/jesse/publications-collections', destination: '/portfolio/art-publications', permanent: true },
      { source: '/blogs/jesse/content-socials', destination: '/portfolio/social-media-management', permanent: true },
      { source: '/blogs/jesse/luxury-wall-art', destination: '/portfolio', permanent: true },
      { source: '/blogs/jesse/eternal-royals-project', destination: '/portfolio/crypto-nfts', permanent: true },
      { source: '/blogs/jesse/brands-projects', destination: '/portfolio', permanent: true },
      { source: '/blogs/jesse/brand-projects', destination: '/portfolio', permanent: true },
      { source: '/blogs/jesse', destination: '/portfolio', permanent: true },
      { source: '/blogs/news', destination: '/portfolio', permanent: true },
      { source: '/blogs/designing-artwork', destination: '/portfolio/art-design', permanent: true },
      { source: '/blogs/about-page', destination: '/about', permanent: true },
      { source: '/blogs/youtube-test', destination: '/portfolio', permanent: true },
    ];
  },
};

export default nextConfig;
