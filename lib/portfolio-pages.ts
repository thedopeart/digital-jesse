export interface PortfolioPage {
  slug: string;
  title: string;
  subtitle?: string;
  category: 'seo' | 'design' | 'ecommerce' | 'art' | 'brands';
  description: string;
  sections: {
    heading: string;
    content: string;
    metrics?: { label: string; value: string }[];
    images?: { src: string; alt: string }[];
    bullets?: string[];
  }[];
}

export const portfolioPages: PortfolioPage[] = [
  {
    slug: 'organic-seo-growth',
    title: 'Organic SEO Growth',
    subtitle: 'LuxuryWallArt.com Case Study',
    category: 'seo',
    description: 'How I grew a new art e-commerce site from zero to 7,400+ ranking keywords in under 18 months.',
    sections: [
      {
        heading: 'The Challenge',
        content: 'LuxuryWallArt.com launched in March 2023 with minimal visibility. Zero top-100 rankings, about 50 monthly visits, and only 10 backlinks. The site needed organic traffic to reduce dependence on paid ads.',
        metrics: [
          { label: 'Starting Keywords', value: '0' },
          { label: 'Starting Traffic', value: '~50/mo' },
          { label: 'Starting Backlinks', value: '10' },
        ],
        images: [
          { src: '/images/portfolio/detail/seo/lwa-stats-jan-june.png', alt: 'LWA Stats January to June' },
          { src: '/images/portfolio/detail/seo/lwa-july-stats.png', alt: 'LWA July Stats' },
        ],
      },
      {
        heading: 'The Strategy',
        content: 'I focused on building topical authority through targeted content, technical SEO fixes, and strategic internal linking. Created content clusters around high-value art niches and optimized every product page for search.',
        bullets: [
          'High-traffic and niche keyword targeting',
          'Content optimization for search engines and user experience',
          'Meta tag improvements across all pages',
          'Optimized site structure for crawling',
          'Technical SEO audits and fixes',
          'Regular, targeted blog post publishing',
        ],
      },
      {
        heading: 'The Results (August 2024)',
        content: 'In about 18 months, the site transformed from invisible to a high-performing asset with thousands of ranked keywords and strong organic traffic growth.',
        metrics: [
          { label: 'Keywords Ranking', value: '7,400+' },
          { label: 'Top 3 Rankings', value: '63' },
          { label: 'Organic Traffic', value: '662% increase' },
          { label: 'Conversions', value: '240% increase' },
          { label: 'Domain Authority', value: '+15 points' },
          { label: 'Organic Impressions', value: '700% increase' },
        ],
        images: [
          { src: '/images/portfolio/detail/seo/lwa-traffic.png', alt: 'LWA Traffic Growth' },
          { src: '/images/portfolio/detail/seo/lwa-blog.jpg', alt: 'LWA Blog Content' },
        ],
      },
    ],
  },
  {
    slug: 'organic-seo-growth-2',
    title: 'SEO Success: The Dope Art',
    subtitle: 'Two Years of Organic Growth',
    category: 'seo',
    description: 'Building organic traffic for a digital art brand through strategic keyword targeting and content development.',
    sections: [
      {
        heading: 'Overview',
        content: 'The Dope Art started in November 2022. Over two years of consistent SEO work, the site grew from minimal visibility to over 5,000 monthly organic visitors.',
        metrics: [
          { label: 'Monthly Organic Visitors', value: '5,000+' },
          { label: 'Top 3 Keywords', value: '120+' },
          { label: 'Top 10 Keywords', value: '590' },
          { label: 'Total Sessions', value: '46,000' },
        ],
        images: [
          { src: '/images/portfolio/detail/seo/tda-organic-traffic.png', alt: 'The Dope Art SEO Overview' },
          { src: '/images/portfolio/detail/seo/tda-traffic.png', alt: 'TDA Traffic Growth' },
        ],
      },
      {
        heading: 'Strategy',
        content: 'The approach combined keyword strategy, content development, and technical SEO. Every page was optimized for both search engines and user experience.',
        bullets: [
          'Targeted high-traffic and niche keywords',
          'Optimized content for search and UX',
          'Improved meta tags site-wide',
          'Fixed site structure for better crawling',
          'Regular technical SEO audits',
          'Consistent blog publishing schedule',
        ],
      },
      {
        heading: 'Results',
        content: 'Organic search traffic increased 544%. Direct traffic also grew 53.9% as brand awareness improved. The site now generates consistent organic traffic without heavy ad spend.',
        metrics: [
          { label: 'Organic Search Growth', value: '544%' },
          { label: 'Direct Traffic Growth', value: '53.9%' },
        ],
        images: [
          { src: '/images/portfolio/detail/seo/tda-organic-traffic-2.jpg', alt: 'TDA Google Traffic' },
          { src: '/images/portfolio/detail/seo/tda-lifetime-sales.jpg', alt: 'TDA Lifetime Sales' },
        ],
      },
    ],
  },
  {
    slug: 'etsy-keyword-research',
    title: 'Etsy Keyword Research & SEO',
    subtitle: 'Marketplace Optimization',
    category: 'seo',
    description: 'Optimizing Etsy listings through strategic keyword research to increase organic rankings and sales.',
    sections: [
      {
        heading: 'The Approach',
        content: 'Etsy has its own search algorithm. I revised product titles, tags, and descriptions across the art store to target valuable keywords while keeping descriptions engaging and informative.',
        images: [
          { src: '/images/portfolio/detail/seo/etsy-shark-before.jpg', alt: 'Etsy Keyword Research Before' },
          { src: '/images/portfolio/detail/seo/etsy-shark-after.jpg', alt: 'Etsy Keyword Research After' },
        ],
      },
      {
        heading: 'Services',
        content: 'My Etsy optimization process covers everything from keyword research to full listing optimization.',
        bullets: [
          'Keyword research targeting high-volume, low-competition terms',
          'Product SEO optimization (titles, tags, descriptions)',
          'Brand keyword research aligned with audience search patterns',
          'Niche keyword identification for specific art categories',
        ],
        images: [
          { src: '/images/portfolio/detail/seo/etsy-peacock-before.jpg', alt: 'Etsy Peacock Before' },
          { src: '/images/portfolio/detail/seo/etsy-peacock-after.jpg', alt: 'Etsy Peacock After' },
          { src: '/images/portfolio/detail/seo/etsy-profile.png', alt: 'Etsy Profile' },
        ],
      },
      {
        heading: 'Results',
        content: 'The optimized listings saw improved rankings in Etsy search, leading to more views and sales without additional ad spend.',
      },
    ],
  },
  {
    slug: 'blog-example-1',
    title: 'Blogging and Copywriting',
    subtitle: 'Climbing Google Ranks',
    category: 'seo',
    description: 'Creating blog content that ranks for high-value keywords and drives organic traffic.',
    sections: [
      {
        heading: 'The Strategy',
        content: 'The rapid growth in organic traffic and keyword rankings came from targeted blogging, on-page optimization, and strategic product keyword integration. Each blog post targets specific search queries with commercial intent.',
      },
      {
        heading: 'Content Categories',
        content: 'I created blog content across multiple niches, each optimized for relevant keywords.',
        bullets: [
          'Wall Street & Finance: Investment insights, office design, market analysis',
          'Macabre & Gothic: Dark art themes and collector guides',
          'Poker & Gambling: Card game art and casino aesthetics',
          'Royalty: King and queen artwork, luxury decor',
          'Pharmaceutical: Health and wellness industry content',
        ],
        images: [
          { src: '/images/portfolio/detail/seo/blog-luxury-art.jpg', alt: 'Luxury Art Blog' },
          { src: '/images/portfolio/detail/seo/blog-macabre.jpg', alt: 'Macabre Blog Examples' },
          { src: '/images/portfolio/detail/seo/blog-queen-spades.jpg', alt: 'Queen of Spades Blog' },
          { src: '/images/portfolio/detail/seo/seo-score-100.png', alt: 'SEO Score 100' },
        ],
      },
      {
        heading: 'Results',
        content: 'Multiple blog posts now rank on page one for their target keywords, driving consistent organic traffic to the store.',
      },
    ],
  },
  {
    slug: 'company-profile',
    title: 'Company Profile & Design',
    subtitle: 'Rocky Mountain Steel Case Study',
    category: 'design',
    description: 'Creating professional company profiles, pitch decks, and marketing materials.',
    sections: [
      {
        heading: 'Company Profile Design',
        content: 'Designed a complete company profile for Rocky Mountain Steel, Inc. using Canva and Photoshop. The layout emphasizes precision, strength, and reliability while showcasing company history, services, and industry expertise.',
        images: [
          { src: '/images/portfolio/detail/design/lwa-site-1.jpg', alt: 'LWA Site Design' },
          { src: '/images/portfolio/detail/design/lwa-site-2.jpg', alt: 'LWA Site Interior' },
        ],
      },
      {
        heading: 'Pitch Deck & Market Research',
        content: 'Created an investor-focused pitch deck for an art e-commerce business. Included market research, analytics on the online art space, SEO growth data, keyword rankings, and marketplace performance demonstrating scalability and ROI potential.',
        images: [
          { src: '/images/portfolio/detail/design/er-site.png', alt: 'Eternal Royals Site Design' },
          { src: '/images/portfolio/detail/design/lwa-site-3.jpg', alt: 'LWA Site Design 3' },
        ],
      },
      {
        heading: 'Infographics',
        content: 'Designed digital marketing infographics across multiple industries.',
        bullets: [
          'Pharmaceutical: Wellness, sleep, stress relief content',
          'Finance: Loan guidelines, credit myths, venture capital',
          'Process infographics: Roadmaps and workflows',
        ],
        images: [
          { src: '/images/portfolio/detail/design/ds-site-1.jpg', alt: 'Dope Stitches Site 1' },
          { src: '/images/portfolio/detail/design/ds-site-2.jpg', alt: 'Dope Stitches Site 2' },
        ],
      },
    ],
  },
  {
    slug: 'figma-design',
    title: 'Figma Design & Prototyping',
    subtitle: 'Web Design Services',
    category: 'design',
    description: 'Creating user-friendly website designs from concept to completion.',
    sections: [
      {
        heading: 'Web Design',
        content: 'I specialize in creating user-friendly and visually appealing websites. From concept to final design, I focus on delivering high-quality designs that enhance user experience and align with brand identity.',
        bullets: [
          'Full website designs from concept to completion',
          'Responsive layouts optimized for all devices',
          'Brand-consistent designs that resonate with target audiences',
          'User-centered design focusing on intuitive navigation',
        ],
      },
      {
        heading: 'Featured Project: QuickLenders.com',
        content: 'Designed the complete website for QuickLenders, a business finance company. Created wireframes, mockups, and final designs in Figma before handoff to development.',
        images: [
          { src: '/images/portfolio/detail/design/lwa-site-1.jpg', alt: 'Website Design Example' },
          { src: '/images/portfolio/detail/design/er-site.png', alt: 'Eternal Royals Website' },
        ],
      },
      {
        heading: '2D & 3D Product Mockups',
        content: 'Using Adobe Suite, Photoshop, and advanced 3D tools, I create product visualizations for marketing materials.',
        bullets: [
          '2D & 3D product mockups',
          'High-quality renders for product visualization',
          'Detailed packaging design',
          'Team collaboration on branding projects',
        ],
        images: [
          { src: '/images/portfolio/detail/art/er-parallax-mock.jpg', alt: '3D Product Mockup' },
          { src: '/images/portfolio/detail/art/er-banner-mock.jpg', alt: 'Banner Mockup' },
        ],
      },
    ],
  },
  {
    slug: 'paid-sm-marketing',
    title: 'Paid Social Media Marketing',
    subtitle: 'Meta & Google Ads',
    category: 'ecommerce',
    description: 'Managing paid advertising campaigns with positive ROI through strategic optimization.',
    sections: [
      {
        heading: 'Ad Management',
        content: 'I manage Meta and Google advertising campaigns focused on achieving positive ROIs through audience segmentation, A/B testing, and real-time campaign adjustments.',
        images: [
          { src: '/images/portfolio/detail/ecommerce/paid-ads-cover.png', alt: 'Paid Ads Dashboard' },
          { src: '/images/portfolio/detail/ecommerce/paid-ads-1.png', alt: 'Ad Performance' },
        ],
      },
      {
        heading: 'E-Commerce Results',
        content: 'My paid and organic strategies have driven significant sales across multiple platforms.',
        metrics: [
          { label: 'Shopify Sales', value: '$213K+' },
          { label: 'Etsy Views', value: '315K+' },
          { label: 'Etsy Sales', value: '~$143K' },
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/shopify-stats.jpg', alt: 'Shopify Revenue' },
          { src: '/images/portfolio/detail/ecommerce/tda-total-sales.jpg', alt: 'TDA Total Sales' },
          { src: '/images/portfolio/detail/ecommerce/successful-campaign.png', alt: 'Successful Campaign' },
        ],
      },
      {
        heading: 'Approach',
        content: 'Success comes from building a strong online presence, effectively positioning products, and driving sustained growth through data analysis and market adaptation.',
      },
    ],
  },
  {
    slug: 'social-media-posts-example',
    title: 'Social Media Content Creation',
    subtitle: 'Graphics & Engagement',
    category: 'ecommerce',
    description: 'Creating high-impact social media content that increases brand presence.',
    sections: [
      {
        heading: 'Services',
        content: 'I create social media content designed to boost engagement and drive conversions.',
        bullets: [
          'Visual Storytelling: Eye-catching graphics that highlight brand messages',
          'Engagement-Driven Posts: Content designed to boost interactions',
          'Brand Consistency: Cohesive look across all platforms',
          'Effective Call-to-Action: Posts designed for lead generation',
        ],
      },
      {
        heading: 'Featured Work: QuickLenders.com',
        content: 'Created a full suite of social media graphics for a business finance company. Topics included business funding, ESOP funding, invoice factoring, and credit improvement.',
        images: [
          { src: '/images/portfolio/detail/ecommerce/creator-cover.png', alt: 'Creator Cover' },
          { src: '/images/portfolio/detail/ecommerce/creator-2.jpg', alt: 'Content Creation 2' },
          { src: '/images/portfolio/detail/ecommerce/creator-3.jpg', alt: 'Content Creation 3' },
        ],
      },
      {
        heading: 'Educational Content',
        content: 'Designed educational graphics series including Social Media Hacks and SEO Hacks, helping audiences learn while building brand authority.',
        images: [
          { src: '/images/portfolio/detail/ecommerce/cell-phone-tda.png', alt: 'Cell Phone TDA' },
          { src: '/images/portfolio/detail/ecommerce/social-media-phones.png', alt: 'Social Media Phones' },
        ],
      },
    ],
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    subtitle: 'Multi-Platform Growth',
    category: 'ecommerce',
    description: 'Managing social media presence across TikTok, Instagram, Facebook, Pinterest, and more.',
    sections: [
      {
        heading: 'Services',
        content: 'I craft tailored strategies for diverse platforms including TikTok, Instagram, Facebook, Reddit, and Twitter.',
        bullets: [
          'Content calendar planning and scheduling',
          'Video creation for multiple platforms',
          'Cross-platform brand consistency',
          'Performance analytics and optimization',
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/social-media-management.jpg', alt: 'Social Media Management' },
          { src: '/images/portfolio/detail/ecommerce/tiktok-viral.png', alt: 'TikTok Viral Content' },
        ],
      },
      {
        heading: 'The Dope Art (Instagram)',
        content: 'Grew the Instagram following from zero to over 26,000 followers through curated content calendars, visual engagement, and analytics-driven decisions.',
        metrics: [
          { label: 'Followers Grown', value: '26,000+' },
          { label: 'Starting Point', value: '0' },
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/ig-page-2.png', alt: 'Instagram Page' },
          { src: '/images/portfolio/detail/ecommerce/ig-page-3.png', alt: 'Instagram Growth' },
          { src: '/images/portfolio/detail/ecommerce/tda-video-views.png', alt: 'TDA Video Views' },
        ],
      },
      {
        heading: 'Tools',
        content: 'I use professional scheduling and analytics tools to manage multiple accounts efficiently.',
        bullets: [
          'Facebook Planner',
          'Zapier',
          'Hootsuite',
          'Platform-native analytics',
        ],
      },
    ],
  },
  {
    slug: 'art-design',
    title: 'Digital Art & Design',
    subtitle: 'Original Artwork Collections',
    category: 'art',
    description: 'Creating digital artwork for entrepreneurs capturing innovation, struggle, and triumph.',
    sections: [
      {
        heading: 'The Dope Art',
        content: 'My primary art brand featuring diverse artwork collections. Pieces explore themes of ambition, success, and the entrepreneurial journey.',
        images: [
          { src: '/images/portfolio/detail/art/tda-site-1.jpg', alt: 'The Dope Art Website' },
          { src: '/images/portfolio/detail/art/tda-site-2.jpg', alt: 'The Dope Art Products' },
        ],
      },
      {
        heading: 'Collections',
        content: 'I create artwork across multiple themes and styles.',
        bullets: [
          'Royalty Collection: Kings, queens, and luxury themes',
          'Wall Street Collection: Bull and bear market art',
          'Surrealism Series: Dream-like and abstract pieces',
          'Money & Finance: Currency and wealth imagery',
        ],
        images: [
          { src: '/images/portfolio/detail/art/lwa-royalty.jpg', alt: 'Royalty Collection' },
          { src: '/images/portfolio/detail/art/lwa-abstracts.jpg', alt: 'Abstracts Collection' },
          { src: '/images/portfolio/detail/art/moon-boat.jpg', alt: 'Moon Boat Art' },
          { src: '/images/portfolio/detail/art/outrun.jpg', alt: 'Outrun Art' },
        ],
      },
      {
        heading: 'Luxury Wall Art',
        content: 'My second art brand featuring AI-integrated art creation. This demonstrates my commitment to utilizing technology in innovative ways while maintaining artistic quality.',
      },
    ],
  },
  {
    slug: 'animation',
    title: 'Digital Animations',
    subtitle: 'Bringing Static Images to Life',
    category: 'art',
    description: 'Creating engaging digital animations using Adobe Premiere Pro and Photoshop.',
    sections: [
      {
        heading: 'Animation Creation',
        content: 'Using Adobe Premiere Pro and Photoshop, I bring static images to life, creating engaging digital animations with enhanced storytelling and visual impact.',
        images: [
          { src: '/images/portfolio/detail/art/animations.png', alt: 'Animation Sample' },
        ],
      },
      {
        heading: 'Process',
        content: 'My animation workflow combines multiple tools for the best results.',
        bullets: [
          'Photoshop for crafting individual animation elements',
          'Premiere Pro for fine-tuning motion and flow',
          'Transform still images into dynamic visuals',
          'Add sound and music for complete experiences',
        ],
      },
      {
        heading: 'Makers Place Collection',
        content: 'My digital animations have been featured on Makers Place, an exclusive online gallery for digital art with sound. Several pieces have sold out.',
      },
    ],
  },
  {
    slug: 'art-publications',
    title: 'Art Publications & Collaborations',
    subtitle: 'Press & Partnerships',
    category: 'art',
    description: 'Featured publications, media coverage, and brand collaborations.',
    sections: [
      {
        heading: 'Tiger King Comic Book',
        content: 'When Tiger King became a cultural phenomenon in 2020, I partnered with TidalWave Productions to develop comic book cover art. The project gained media attention from TMZ and other outlets.',
        images: [
          { src: '/images/portfolio/detail/art/tiger-king-cover.jpg', alt: 'Tiger King Comic Art' },
          { src: '/images/portfolio/detail/art/tiger-king-pics.jpg', alt: 'Tiger King Pics' },
          { src: '/images/portfolio/detail/art/tiger-king-site.jpg', alt: 'Tiger King Site' },
        ],
      },
      {
        heading: 'ShoutOut LA Feature',
        content: 'Featured in ShoutOut LA: "Jesse Johnson, the visionary behind thedopeart.com, attributes his success to three critical elements: passion, organization, and balance."',
        images: [
          { src: '/images/portfolio/detail/art/shoutout-la.jpg', alt: 'ShoutOut LA Feature' },
        ],
      },
      {
        heading: 'Collaborations',
        content: 'Partnerships with brands and events in the art space.',
        bullets: [
          'Jondo Prints: NFT LA 2022 interactive booth',
          'Wall Street Prints: Bull & Bear artwork partnership',
          'Various brand collaborations for digital art',
        ],
        images: [
          { src: '/images/portfolio/detail/art/nft-la-booth.jpg', alt: 'NFT LA Booth' },
          { src: '/images/portfolio/detail/art/nft-la.jpg', alt: 'NFT LA Event' },
          { src: '/images/portfolio/detail/art/canvases.jpg', alt: 'Art Canvases' },
        ],
      },
    ],
  },
  {
    slug: 'crypto-nfts',
    title: 'Crypto & NFTs',
    subtitle: 'Eternal Royals Collection',
    category: 'art',
    description: 'Bridging digital art with blockchain technology through NFT collections.',
    sections: [
      {
        heading: 'Eternal Royals',
        content: 'A collection of 9,224 unique Kings and Queens NFTs bridging digital art with canvas prints. Holders receive access to limited edition art drops, IRL and virtual events, and 1-of-1 prints of their NFT.',
        images: [
          { src: '/images/portfolio/detail/art/er-cover.jpg', alt: 'Eternal Royals Collection' },
          { src: '/images/portfolio/detail/art/er-king.jpg', alt: 'Eternal Royals King' },
          { src: '/images/portfolio/detail/art/er-queen.jpg', alt: 'Eternal Royals Queen' },
        ],
      },
      {
        heading: 'Sales & Trading',
        content: 'The collection achieved significant primary and secondary market success.',
        metrics: [
          { label: 'Primary Sales', value: '$2M+' },
          { label: 'Trading Volume', value: '$2M+' },
          { label: 'Unique NFTs', value: '9,224' },
        ],
        images: [
          { src: '/images/portfolio/detail/art/er-opensea.jpg', alt: 'Eternal Royals on OpenSea' },
          { src: '/images/portfolio/detail/art/er-opensea-2.jpg', alt: 'OpenSea Trading' },
          { src: '/images/portfolio/detail/art/nfc-chips.jpg', alt: 'NFC Chips' },
        ],
      },
      {
        heading: 'Eternal Guardians',
        content: 'An unreleased digital art collection representing six months of work using advanced Photoshop and photo manipulation techniques. Features over 400 distinct traits with interconnected pieces.',
        images: [
          { src: '/images/portfolio/detail/art/er-mystery.jpg', alt: 'Mystery Royal Preview' },
          { src: '/images/portfolio/detail/art/miami-sign-1.jpg', alt: 'Miami Event Sign' },
        ],
      },
    ],
  },
];

export function getPortfolioPage(slug: string): PortfolioPage | undefined {
  return portfolioPages.find((p) => p.slug === slug);
}

export function getPortfolioPagesByCategory(category: PortfolioPage['category']): PortfolioPage[] {
  return portfolioPages.filter((p) => p.category === category);
}
