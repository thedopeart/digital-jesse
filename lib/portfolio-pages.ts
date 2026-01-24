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
          { src: 'https://digitaljesse.com/cdn/shop/files/organic_seo_growth.png?v=1722477109', alt: 'Organic SEO Growth Overview' },
          { src: 'https://digitaljesse.com/cdn/shop/files/SEO_Growth.png?v=1722477109', alt: 'SEO Growth Chart' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Google_Traffic.png?v=1722477109', alt: 'Google Traffic Growth' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Top_3_Keywords.png?v=1722477109', alt: 'Top 3 Keywords' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Conversions.png?v=1722477109', alt: 'Conversion Growth' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Organic_Impressions.png?v=1722477109', alt: 'Organic Impressions' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/organic_seo_growth_TDA.png?v=1722477536', alt: 'The Dope Art SEO Overview' },
          { src: 'https://digitaljesse.com/cdn/shop/files/TDA_Traffic.png?v=1722477537', alt: 'TDA Traffic Growth' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/google_traffic_TDA.png?v=1722477536', alt: 'TDA Google Traffic' },
          { src: 'https://digitaljesse.com/cdn/shop/files/TDA_Top_3_Keywords.png?v=1722477537', alt: 'TDA Top 3 Keywords' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Etsy_Keyword_Research_1.png?v=1722449912', alt: 'Etsy Keyword Research Before' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Etsy_Keyword_Research_2.png?v=1722449912', alt: 'Etsy Keyword Research After' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Etsy_Keyword_Research_3.png?v=1722449912', alt: 'Keyword Research Tools' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Etsy_Keyword_Research_4.png?v=1722449912', alt: 'SEO Results' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Blog_Example_1.png?v=1722450455', alt: 'Wall Street Blog Examples' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Blog_Example_2.png?v=1722450455', alt: 'Macabre Blog Examples' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Blog_Example_4.png?v=1722450455', alt: 'Poker Blog Examples' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Blog_Example_6.png?v=1722450455', alt: 'Royalty Blog Examples' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Company_Profile_1.png?v=1722444728', alt: 'Company Profile Page 1' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Company_Profile_2.png?v=1722444727', alt: 'Company Profile Page 2' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Company_Profile_3.png?v=1722444727', alt: 'Company Profile Page 3' },
        ],
      },
      {
        heading: 'Pitch Deck & Market Research',
        content: 'Created an investor-focused pitch deck for an art e-commerce business. Included market research, analytics on the online art space, SEO growth data, keyword rankings, and marketplace performance demonstrating scalability and ROI potential.',
        images: [
          { src: 'https://digitaljesse.com/cdn/shop/files/Pitch_Deck_1.png?v=1722444728', alt: 'Pitch Deck Cover' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Pitch_Deck_2.png?v=1722444728', alt: 'Pitch Deck Market Research' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Pitch_Deck_3.png?v=1722444728', alt: 'Pitch Deck Analytics' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Infographic_1.png?v=1722444728', alt: 'Pharmaceutical Infographic' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Infographic_2.png?v=1722444728', alt: 'Finance Infographic' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Infographic_3.png?v=1722444728', alt: 'Process Infographic' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Figma_Design_1.png?v=1722445191', alt: 'QuickLenders Homepage Design' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Figma_Design_2.png?v=1722445191', alt: 'QuickLenders Interior Pages' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Figma_Design_3.png?v=1722445191', alt: 'QuickLenders Mobile Design' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Product_Mockup_1.png?v=1722445191', alt: '3D Product Mockup' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Product_Mockup_2.png?v=1722445191', alt: 'Product Visualization' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Paid_SM_1.png?v=1722446239', alt: 'Meta Ads Dashboard' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Paid_SM_2.png?v=1722446239', alt: 'Ad Performance' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Paid_SM_3.png?v=1722446239', alt: 'Shopify Revenue' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Paid_SM_4.png?v=1722446239', alt: 'Etsy Performance' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Posts_5.png?v=1722446755', alt: 'QuickLenders Social Post 1' },
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Posts_6.png?v=1722446756', alt: 'QuickLenders Social Post 2' },
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Posts_7.png?v=1722446756', alt: 'QuickLenders Social Post 3' },
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Posts_8.png?v=1722446756', alt: 'QuickLenders Social Post 4' },
        ],
      },
      {
        heading: 'Educational Content',
        content: 'Designed educational graphics series including Social Media Hacks and SEO Hacks, helping audiences learn while building brand authority.',
        images: [
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Posts_15.png?v=1722447243', alt: 'Social Media Hacks' },
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Posts_16.png?v=1722447243', alt: 'SEO Hacks' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Management_1.png?v=1722448063', alt: 'Social Media Content Examples' },
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Management_2.png?v=1722448063', alt: 'Platform Content' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Management_3.png?v=1722448063', alt: 'Instagram Growth' },
          { src: 'https://digitaljesse.com/cdn/shop/files/SM_Management_5.png?v=1722448064', alt: 'Engagement Analytics' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Design_1.png?v=1722448586', alt: 'Digital Art Sample 1' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Design_2.png?v=1722448586', alt: 'Digital Art Sample 2' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Design_5.png?v=1722448586', alt: 'Royalty Collection' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Design_6.png?v=1722448587', alt: 'Wall Street Collection' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Design_7.png?v=1722448587', alt: 'Surrealism Series' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Design_8.png?v=1722448587', alt: 'Money Collection' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Animation_1.png?v=1722448822', alt: 'Animation Sample' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Publications_1.png?v=1722449150', alt: 'Tiger King Comic Art' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Publications_2.png?v=1722449151', alt: 'TMZ Coverage' },
        ],
      },
      {
        heading: 'ShoutOut LA Feature',
        content: 'Featured in ShoutOut LA: "Jesse Johnson, the visionary behind thedopeart.com, attributes his success to three critical elements: passion, organization, and balance."',
        images: [
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Publications_4.png?v=1722449151', alt: 'ShoutOut LA Feature' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Publications_6.png?v=1722449151', alt: 'NFT LA Booth' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Art_Publications_7.png?v=1722449151', alt: 'Wall Street Prints Collab' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Crypto_NFT_1.png?v=1722449593', alt: 'Eternal Royals Collection' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Crypto_NFT_3.png?v=1722449593', alt: 'NFT Examples' },
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
          { src: 'https://digitaljesse.com/cdn/shop/files/Crypto_NFT_8.png?v=1722449593', alt: 'NFT LA Event' },
          { src: 'https://digitaljesse.com/cdn/shop/files/Crypto_NFT_9.png?v=1722449593', alt: 'Trading Activity' },
        ],
      },
      {
        heading: 'Eternal Guardians',
        content: 'An unreleased digital art collection representing six months of work using advanced Photoshop and photo manipulation techniques. Features over 400 distinct traits with interconnected pieces.',
        images: [
          { src: 'https://digitaljesse.com/cdn/shop/files/Crypto_NFT_10.png?v=1722449594', alt: 'Eternal Guardians Preview' },
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
