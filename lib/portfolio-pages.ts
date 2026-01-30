export interface PortfolioSection {
  heading: string;
  subheading?: string;
  content?: string;
  metrics?: { label: string; value: string }[];
  images?: { src: string; alt: string }[];
  bullets?: string[];
  /** Layout hint for the renderer */
  layout?: 'default' | 'side-by-side' | 'image-grid' | 'section-header';
  /** Number of grid columns for image-grid layout (default: auto) */
  gridCols?: number;
  /** Whether images should use phone-mockup aspect ratio */
  phoneAspect?: boolean;
  /** Custom aspect ratio for images (e.g. '4/5', '16/9', 'auto') */
  imageAspect?: string;
  /** Scale down the image container (e.g. '80%') */
  imageMaxWidth?: string;
  /** Label displayed above heading in a dark badge (e.g. 'SEO Case Study #1') */
  sectionLabel?: string;
}

export interface PortfolioPage {
  slug: string;
  title: string;
  subtitle?: string;
  category: 'seo' | 'design' | 'ecommerce' | 'art' | 'brands';
  description: string;
  /** Hero image shown in the header alongside the description */
  heroImage?: { src: string; alt: string };
  /** Caption text for the hero image */
  heroCaption?: string;
  /** Tags displayed in the header */
  tags?: string[];
  /** Metrics displayed in the header below description */
  headerMetrics?: { label: string; value: string }[];
  sections: PortfolioSection[];
}

export const portfolioPages: PortfolioPage[] = [
  {
    slug: 'organic-seo-growth',
    title: 'Organic SEO Growth',
    subtitle: 'LuxuryWallArt.com Case Study',
    category: 'seo',
    description: 'How I grew a new art e-commerce site from zero to 7,400+ ranking keywords in under 18 months through strategic SEO, content marketing, and technical optimization.',
    sections: [
      {
        heading: 'The Challenge',
        content: 'LuxuryWallArt.com launched in March 2023 as a brand new domain with **zero online presence**. The site had no top-100 keyword rankings, roughly 50 monthly visits (mostly direct), and only 10 backlinks. The business model relied heavily on **paid advertising**, which was eating into margins. The goal was clear: build sustainable **organic traffic** to reduce ad dependency and create a long-term competitive advantage. Starting from scratch meant every ranking had to be earned through smart strategy, not domain authority shortcuts.',
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
        content: 'I developed a comprehensive SEO strategy focused on building **topical authority** in the wall art and home decor space. This meant creating interconnected content clusters around high-value niches like **abstract art**, **royalty themes**, and **Wall Street aesthetics**. Every product page was optimized with unique descriptions, proper schema markup, and strategic internal linking. I conducted extensive **keyword research** using Ahrefs and Google Search Console to identify opportunities where we could realistically compete. Technical SEO audits revealed crawl issues, duplicate content problems, and missing meta tags that were fixed systematically. The blog became a traffic engine, with each post targeting specific **long-tail keywords** while linking to relevant product collections.',
        bullets: [
          '**Keyword research** targeting high-traffic and niche terms with realistic ranking potential',
          '**Content clusters** built around themed collections (Royalty, Wall Street, Abstract, etc.)',
          '**Technical SEO** fixes including schema markup, canonical tags, and site speed optimization',
          '**Internal linking** strategy connecting blog posts to product pages and collections',
          '**Meta optimization** with unique titles and descriptions for 3,000+ pages',
          '**Regular publishing** schedule with 2-4 SEO-optimized blog posts per month',
        ],
      },
      {
        heading: 'The Results (August 2024)',
        content: 'In about 18 months, LuxuryWallArt.com transformed from an invisible new site into a **high-performing organic traffic asset**. The site now ranks for over 7,400 keywords, with 63 of those in the **top 3 positions** on Google. Organic traffic increased by 662%, and more importantly, organic **conversions grew 240%**. The domain authority climbed 15 points, establishing the site as a legitimate player in the art e-commerce space. Organic impressions increased 700%, meaning the brand now appears in front of thousands of potential customers daily without paying for ads. The SEO foundation built here continues to compound, with traffic and rankings growing month over month.',
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
    slug: 'seo-organic-growth-case-studies',
    title: 'SEO Case Studies',
    subtitle: 'TheDopeArt.com, LuxuryWallArt.com, QualitySewing.com',
    category: 'seo',
    description: 'Real SEO results across three brands I built or managed. Keyword research, on-page optimization, technical audits, content strategy, and organic traffic growth from scratch.',
    tags: ['SEO', 'Content Creation', 'Competitor Analysis', 'Data Analytics', 'UI/UX'],
    sections: [
      {
        heading: 'The Dope Art SEO Progress',
        sectionLabel: 'SEO Case Study #1',
        subheading: 'TheDopeArt.com',
        layout: 'side-by-side' as const,
        content: '**[The Dope Art](https://thedopeart.com)** was the first website I fully optimized for **SEO from the ground up**. Watching real traffic, rankings, and revenue grow from nothing taught me more than any course could. That hands-on experience is what got me hooked on e-commerce, SEO, and analytics, and it\'s been the **foundation of every project** I\'ve taken on since.\n\nWith my diligent efforts I was able to grow it from near-zero organic visibility to **5,400+ monthly organic visitors** and **8,000+ ranking keywords** over two years. The work included deep **keyword research** using Ahrefs and Google Search Console, **competitor analysis** to find ranking gaps, and rewriting every product listing with optimized titles, descriptions, and tags.\n\nI rebuilt the site structure for better crawling, created **targeted blog content** around high-value search terms, and ran regular **technical SEO audits** with Screaming Frog to catch issues early. The result: 120+ keywords in the top 3, 590 in the top 10, and a 544% increase in organic search traffic.',
        metrics: [
          { label: 'Monthly Organic Visitors', value: '5,400+' },
          { label: 'Top 3 Keywords', value: '120+' },
          { label: 'Top 10 Keywords', value: '590' },
        ],
        images: [
          { src: '/images/portfolio/detail/seo/lwa-progress-sept.png', alt: 'The Dope Art SEO Progress September 2024' },
        ],
      },
      {
        heading: 'The Results of On-Page SEO',
        layout: 'side-by-side' as const,
        content: 'During my peak involvement building out The Dope Art\'s SEO, Google Analytics tracked a **544% increase in organic search** traffic, hitting 46,000 sessions over a 12-month window. That growth came from consistent keyword targeting, on-page content optimization, and regular performance monitoring through Search Console and Ahrefs.\n\nDirect traffic also grew by **53.9%** during the same period, which makes sense: as more people discovered the site through search, they started coming back on their own. The site continued growing past these numbers before I shifted focus to other projects.',
        metrics: [
          { label: 'Organic Search Growth', value: '544%' },
          { label: 'Direct Traffic Growth', value: '53.9%' },
          { label: 'Total Sessions', value: '46,000' },
        ],
        images: [
          { src: '/images/portfolio/detail/seo/tda-ga-12-months.png', alt: 'TDA Google Analytics 12 Months Traffic Aug 2024' },
          { src: '/images/portfolio/detail/seo/seo-stats-nov-2022.png', alt: 'Ranking Keywords November 2022' },
          { src: '/images/portfolio/detail/seo/keywords-ranking.png', alt: 'Ranking Keywords August 2024' },
        ],
      },
      {
        heading: 'KW Strategy, Content Development & SEO',
        layout: 'section-header' as const,
        content: 'To grow the site\'s search engine rankings, I implemented a strategy focusing on keyword research, on-page optimization, and technical SEO. This approach targeted both high-traffic and niche keywords relevant to the brand, while also ensuring the site\'s structure was fully optimized for search engines and user engagement.',
        bullets: [
          '**High-traffic keywords** targeting popular search terms',
          '**Niche keywords** relevant to specific products or services',
          '**Content optimization** for search engines and users',
          '**Meta tags** for improved search engine visibility',
          '**Optimized site structure** for better crawling and indexing',
          '**Technical SEO audits** to ensure site performance',
        ],
      },
      {
        heading: 'Additional Insights',
        layout: 'image-grid' as const,
        gridCols: 3,
        images: [
          { src: '/images/portfolio/detail/seo/organic-traffic-overview.png', alt: 'Organic Traffic Overview' },
          { src: '/images/portfolio/detail/seo/keywords-close-up.png', alt: 'Keywords Close Up' },
          { src: '/images/portfolio/detail/seo/ga-impressions.png', alt: 'Google Analytics Impressions' },
        ],
        imageAspect: '2000/843',
      },
    ],
  },
  {
    slug: 'etsy-keyword-research',
    title: 'Etsy Keyword Research & SEO',
    subtitle: 'Marketplace Optimization',
    category: 'seo',
    description: 'Optimizing Etsy listings through strategic keyword research, title optimization, and tag strategy to increase organic rankings and drive sales without additional ad spend.',
    sections: [
      {
        heading: 'Understanding Etsy SEO',
        content: 'Etsy has its own **search algorithm** that differs significantly from Google. Success on the platform requires understanding how Etsy ranks listings and what factors influence visibility. I conducted extensive research into Etsy\'s ranking factors: **relevance** (how well listings match search queries), **listing quality** (conversion rates, reviews, favorites), and **recency** (how recently a listing was created or renewed). The goal was to optimize every element of our art listings to maximize visibility in Etsy search results. This meant rewriting titles, revising tags, and updating descriptions across hundreds of products while keeping the content engaging for actual buyers.',
        images: [
          { src: '/images/portfolio/detail/seo/etsy-shark-before.jpg', alt: 'Etsy Keyword Research Before' },
          { src: '/images/portfolio/detail/seo/etsy-shark-after.jpg', alt: 'Etsy Keyword Research After' },
        ],
      },
      {
        heading: 'The Optimization Process',
        content: 'My Etsy optimization process starts with **comprehensive keyword research** using tools like eRank and Marmalead to identify what buyers actually search for. I analyze search volume, competition, and click rates to prioritize the most valuable terms. For The Dope Art\'s Etsy store, I revised product titles to front-load the most important keywords while still reading naturally. All 13 tag slots were filled with relevant search terms, including **long-tail variations** that capture specific buyer intent. Descriptions were rewritten to include keywords naturally while providing the information buyers need to make purchasing decisions. I also optimized listing photos, categories, and attributes to maximize relevance signals.',
        bullets: [
          '**Keyword research** targeting high-volume, low-competition terms specific to Etsy',
          '**Title optimization** with primary keywords front-loaded for maximum impact',
          '**Tag strategy** using all 13 slots with relevant long-tail variations',
          '**Description writing** that incorporates keywords naturally while informing buyers',
          '**Category and attribute optimization** to appear in filtered searches',
          '**Competitive analysis** to identify gaps and opportunities in the marketplace',
        ],
        images: [
          { src: '/images/portfolio/detail/seo/etsy-peacock-before.jpg', alt: 'Etsy Peacock Before' },
          { src: '/images/portfolio/detail/seo/etsy-peacock-after.jpg', alt: 'Etsy Peacock After' },
          { src: '/images/portfolio/detail/seo/etsy-profile.png', alt: 'Etsy Profile' },
        ],
      },
      {
        heading: 'Results & Ongoing Optimization',
        content: 'The optimized listings showed **significant improvements** in Etsy search rankings, leading to increased views and sales without additional advertising spend. Visibility in search results improved across multiple product categories, with several listings reaching the first page for their target keywords. The work didn\'t stop at initial optimization. I continue to monitor search trends, test new keywords, and update listings based on performance data. Etsy\'s algorithm rewards active shops, so regular updates and renewals are part of the ongoing strategy. The combination of strong SEO and quality products has helped The Dope Art maintain a **5-star rating** with consistent sales.',
      },
      {
        heading: 'SEO & Keyword Stats',
        layout: 'image-grid' as const,
        gridCols: 2,
        images: [
          { src: '/images/portfolio/detail/seo/etsy-seo-stats.png', alt: 'SEO Stats Overview' },
          { src: '/images/portfolio/detail/seo/seo-keyword-research-stats.jpg', alt: 'SEO Keyword Research Stats' },
        ],
      },
    ],
  },
  {
    slug: 'blog-example-1',
    title: 'Blogging and Copywriting',
    subtitle: 'Content That Ranks and Converts',
    category: 'seo',
    description: 'Creating strategic blog content that ranks for high-value keywords, drives organic traffic, and guides visitors toward purchases through informative, engaging articles.',
    tags: ['SEO', 'Keyword Research', 'Analytics', 'Writing', 'Blogging', 'Competitive Analysis'],
    sections: [
      {
        heading: 'Content Strategy Overview',
        content: 'The rapid growth in organic traffic and keyword rankings for my e-commerce sites came from a deliberate **content marketing strategy** built around SEO. Rather than writing random blog posts, every article targets specific search queries with **commercial intent**. The goal is to attract potential customers who are researching topics related to wall art, home decor, and interior design.\n\nThese visitors arrive through informational searches but discover products that solve their needs. Each blog post is optimized for a primary keyword while naturally incorporating related terms, creating content that search engines reward with rankings.',
        images: [
          { src: '/images/portfolio/detail/blogs/hero-macabre.jpg', alt: 'Blogging and Copywriting Hero' },
        ],
      },
      {
        heading: 'Blogs: Wall Street & Finance',
        content: 'Investment office design, bull market art, trader aesthetics, and financial advisor office guides. Each article targets **high-value keywords** in the finance and investing niche, connecting readers to relevant wall art products.',
        layout: 'image-grid' as const,
        gridCols: 4,
        images: [
          { src: '/images/portfolio/detail/blogs/wallstreet-investing-insights.jpg', alt: 'Investing Insights Blog' },
          { src: '/images/portfolio/detail/blogs/wallstreet-financial-advisors-office.jpg', alt: 'Financial Advisors Office Blog' },
          { src: '/images/portfolio/detail/blogs/wallstreet-financial-advisors-2.jpg', alt: 'Financial Advisors Office Blog 2' },
          { src: '/images/portfolio/detail/blogs/wallstreet-after-hours.jpg', alt: 'After Hours Blog' },
          { src: '/images/portfolio/detail/blogs/wallstreet-anatomy-markets.jpg', alt: 'Anatomy of Markets Blog' },
          { src: '/images/portfolio/detail/blogs/wallstreet-forecasts-2.jpg', alt: 'Forecasts Blog 2' },
          { src: '/images/portfolio/detail/blogs/wallstreet-breakout-trading.jpg', alt: 'Breakout Trading Blog' },
          { src: '/images/portfolio/detail/blogs/wallstreet-forecasts.jpg', alt: 'Forecasts Blog' },
        ],
      },
      {
        heading: 'Google Ranking Results',
        content: 'Multiple blog posts ranking on **page one of Google** for their target keywords, driving consistent organic traffic that converts into sales.',
        layout: 'image-grid' as const,
        gridCols: 3,
        images: [
          { src: '/images/portfolio/detail/blogs/ranking-macabre-stats.jpg', alt: 'Macabre Blog Ranking Stats' },
          { src: '/images/portfolio/detail/blogs/ranking-luxury-stats.jpg', alt: 'Luxury Blog Ranking Stats' },
          { src: '/images/portfolio/detail/blogs/ranking-queen-spades.png', alt: 'Queen of Spades Blog Rankings' },
        ],
      },
      {
        heading: 'Blogs: Macabre, Royalty, Money',
        content: 'Dark art collector guides, Halloween decor, skull artwork, king and queen art, and money-themed content. These niches have **strong search volume** and connect well to canvas art products.',
        layout: 'image-grid' as const,
        gridCols: 3,
        images: [
          { src: '/images/portfolio/detail/blogs/macabre-poker-7.jpg', alt: 'Poker Royalty Blog' },
          { src: '/images/portfolio/detail/blogs/macabre-1.jpg', alt: 'Macabre Art Blog 1' },
          { src: '/images/portfolio/detail/blogs/macabre-2.jpg', alt: 'Macabre Art Blog 2' },
          { src: '/images/portfolio/detail/blogs/macabre-money-1.jpg', alt: 'Money Theme Blog 1' },
          { src: '/images/portfolio/detail/blogs/macabre-money-2.jpg', alt: 'Money Theme Blog 2' },
        ],
      },
      {
        heading: 'Blogs: Finance & Loans',
        content: 'Blog content written for **Quick Lenders**, targeting finance and lending keywords. Each article was built around **keyword research** to attract business owners searching for funding options.',
        layout: 'image-grid' as const,
        gridCols: 4,
        images: [
          { src: '/images/portfolio/detail/blogs/finance-1.jpg', alt: 'Finance Blog 1' },
          { src: '/images/portfolio/detail/blogs/finance-2.jpg', alt: 'Finance Blog 2' },
          { src: '/images/portfolio/detail/blogs/finance-3.jpg', alt: 'Finance Blog 3' },
          { src: '/images/portfolio/detail/blogs/finance-8.jpg', alt: 'Finance Blog 8' },
          { src: '/images/portfolio/detail/blogs/finance-4.jpg', alt: 'Finance Blog 4' },
          { src: '/images/portfolio/detail/blogs/finance-5.jpg', alt: 'Finance Blog 5' },
          { src: '/images/portfolio/detail/blogs/finance-6.jpg', alt: 'Finance Blog 6' },
          { src: '/images/portfolio/detail/blogs/finance-7.jpg', alt: 'Finance Blog 7' },
        ],
      },
      {
        heading: 'Blogs: Poker & Gambling',
        content: 'Casino art, card game room design, and man cave aesthetics. This niche performed well for **long-tail keywords** and connected directly to themed canvas art collections.',
        layout: 'image-grid' as const,
        gridCols: 4,
        images: [
          { src: '/images/portfolio/detail/blogs/poker-1.jpg', alt: 'Poker Blog 1' },
          { src: '/images/portfolio/detail/blogs/poker-2.jpg', alt: 'Poker Blog 2' },
          { src: '/images/portfolio/detail/blogs/poker-4.jpg', alt: 'Poker Blog 4' },
          { src: '/images/portfolio/detail/blogs/poker-5.jpg', alt: 'Poker Blog 5' },
          { src: '/images/portfolio/detail/blogs/poker-6.jpg', alt: 'Poker Blog 6' },
          { src: '/images/portfolio/detail/blogs/poker-9.jpg', alt: 'Poker Blog 9' },
          { src: '/images/portfolio/detail/blogs/poker-3.jpg', alt: 'Poker Blog 3' },
          { src: '/images/portfolio/detail/blogs/poker-8.jpg', alt: 'Poker Blog 8' },
        ],
      },
      {
        heading: 'Blogs: Pharmaceutical',
        content: 'SEO blog content created for **American Nutriceuticals**, a health and wellness brand. Articles targeted supplement and health-related keywords with Figma-designed blog layouts.',
        layout: 'image-grid' as const,
        gridCols: 2,
        images: [
          { src: '/images/portfolio/detail/blogs/pharma-figma-design.jpg', alt: 'Pharmaceutical Blog Figma Design' },
          { src: '/images/portfolio/detail/blogs/pharma-blog-cut.jpg', alt: 'Pharmaceutical Blog Layout' },
        ],
      },
      {
        heading: 'Writing Process & Results',
        content: 'Each blog post follows a proven process: **keyword research** to identify the target term and related queries, **competitive analysis** to understand what\'s already ranking, outline creation with proper heading structure, and writing that balances SEO optimization with readability.\n\nPosts include custom images, internal links to products, and clear calls-to-action. The content library continues to grow, compounding traffic gains over time.',
      },
    ],
  },
  {
    slug: 'company-profile',
    title: 'Company Profile & Design',
    subtitle: 'Professional Marketing Materials',
    category: 'design',
    description: 'Company profiles, investor pitch decks, infographics, and brochures designed in Canva and Photoshop. Each project is built to communicate brand value and drive real business results.',
    sections: [
      {
        heading: 'Company Profile & Case Study',
        layout: 'section-header' as const,
        bullets: [
          '**Rocky Mountain Steel, Inc.** company profile designed in Canva and Photoshop',
          '**Multi-page layout** covering company history, services, certifications, and case studies',
          '**B2B sales tool** addressing common prospect questions during the sales process',
          '**Brand identity** built around precision, strength, and reliability',
        ],
      },
      {
        heading: 'Rocky Mountain Steel Profile Pages',
        content: 'Using **Canva** and **Photoshop**, I designed a company profile for Rocky Mountain Steel, Inc. that captures their core values of precision, strength, and reliability. The layout highlights the company\'s history, services, and industry expertise in a way that is both visually appealing and professional. This project is a good example of my ability to create designs that connect with audiences and strengthen brand identity.',
        layout: 'image-grid' as const,
        gridCols: 2,
        images: [
          { src: '/images/portfolio/detail/company-profile/company-overview.jpg', alt: 'Rocky Mountain Steel - Company Overview' },
          { src: '/images/portfolio/detail/company-profile/industries-served.jpg', alt: 'Rocky Mountain Steel - Industries Served' },
          { src: '/images/portfolio/detail/company-profile/why-choose-us.jpg', alt: 'Rocky Mountain Steel - Why Choose Us' },
          { src: '/images/portfolio/detail/company-profile/aist-certified.jpg', alt: 'Rocky Mountain Steel - AIST Certified' },
          { src: '/images/portfolio/detail/company-profile/services-overview.jpg', alt: 'Rocky Mountain Steel - Services Overview' },
          { src: '/images/portfolio/detail/company-profile/case-studies.jpg', alt: 'Rocky Mountain Steel - Case Studies' },
          { src: '/images/portfolio/detail/company-profile/quality-assurance.jpg', alt: 'Rocky Mountain Steel - Quality Assurance' },
          { src: '/images/portfolio/detail/company-profile/highlighted-projects.jpg', alt: 'Rocky Mountain Steel - Highlighted Projects' },
          { src: '/images/portfolio/detail/company-profile/contact.jpg', alt: 'Rocky Mountain Steel - Contact Page' },
          { src: '/images/portfolio/detail/company-profile/rms-website.jpg', alt: 'Rocky Mountain Steel - Website Design' },
          { src: '/images/portfolio/detail/company-profile/cover-profile.jpg', alt: 'Rocky Mountain Steel - Profile Cover' },
        ],
        imageAspect: '25/9',
      },
      {
        heading: 'Pitch Deck & Market Research',
        layout: 'section-header' as const,
        bullets: [
          '**Investor pitch deck** for an art e-commerce business seeking funding',
          '**Market research and analytics** showing SEO growth, keyword rankings, and marketplace performance',
          '**Financial projections** with clear paths to ROI and visual storytelling',
          '**Growth strategy** including art collaborations and revenue diversification',
        ],
      },
      {
        heading: 'Investor Pitch Deck Slides',
        content: 'This pitch deck was built to attract investors through detailed **market research** and **performance analytics**. The deck showcased key market drivers and revenue opportunities in the online art space, focusing on brand scalability. It demonstrated growth potential with metrics on **SEO growth**, keyword ranking, and marketplace performance. By visualizing 12-month SEO results, top revenue-generating products, and growth strategies like art collaborations, the pitch deck offered investors clear paths to **ROI** with strong **financial projections** and visual storytelling.',
        layout: 'image-grid' as const,
        gridCols: 5,
        images: [
          { src: '/images/portfolio/detail/company-profile/pitch-intro.jpg', alt: 'Pitch Deck - Introduction & Vision' },
          { src: '/images/portfolio/detail/company-profile/pitch-market.jpg', alt: 'Pitch Deck - Art Market Opportunity' },
          { src: '/images/portfolio/detail/company-profile/pitch-business-model.jpg', alt: 'Pitch Deck - Scalable Business Model' },
          { src: '/images/portfolio/detail/company-profile/pitch-competitors.jpg', alt: 'Pitch Deck - Competitor Analysis' },
          { src: '/images/portfolio/detail/company-profile/pitch-seo-keywords.jpg', alt: 'Pitch Deck - SEO Keyword Research' },
          { src: '/images/portfolio/detail/company-profile/pitch-art-collections.jpg', alt: 'Pitch Deck - Art Collections' },
          { src: '/images/portfolio/detail/company-profile/pitch-top-sellers.jpg', alt: 'Pitch Deck - Top Sellers' },
          { src: '/images/portfolio/detail/company-profile/pitch-seo-stats.jpg', alt: 'Pitch Deck - SEO Stats' },
          { src: '/images/portfolio/detail/company-profile/pitch-sales-stats.jpg', alt: 'Pitch Deck - Sales Stats' },
          { src: '/images/portfolio/detail/company-profile/pitch-growth-strategy.jpg', alt: 'Pitch Deck - Growth Strategy' },
          { src: '/images/portfolio/detail/company-profile/pitch-growth-continued.jpg', alt: 'Pitch Deck - Growth Strategy Continued' },
          { src: '/images/portfolio/detail/company-profile/pitch-financial.jpg', alt: 'Pitch Deck - Financial Projections' },
          { src: '/images/portfolio/detail/company-profile/pitch-exit-strategy.jpg', alt: 'Pitch Deck - Exit Strategy' },
        ],
        imageAspect: '3/4',
      },
      {
        heading: 'Digital Marketing Infographics',
        layout: 'section-header' as const,
        bullets: [
          '**Infographics for pharmaceutical and finance clients** designed in Canva and Photoshop',
          '**SEO-driven content** created with keyword research for search visibility',
          '**Product benefits and scientific insights** presented in visually engaging formats',
          '**Cross-platform design** optimized for social media, blogs, and print',
        ],
      },
      {
        heading: 'Pharmaceutical',
        content: 'Using **Canva** and **Photoshop**, I designed a series of infographics promoting stress relief and daily wellness supplements. The content was created with a focus on keyword research to ensure visibility in digital marketing efforts. Each infographic showcases detailed information on product benefits, usage tips, and scientific insights, making the information visually appealing while optimizing for **SEO-driven content strategies**.',
        layout: 'image-grid' as const,
        gridCols: 3,
        images: [
          { src: '/images/portfolio/detail/company-profile/pharma-sleep.jpg', alt: 'Pharmaceutical - Relaxing Sleep Guide' },
          { src: '/images/portfolio/detail/company-profile/pharma-sleep-strategies.jpg', alt: 'Pharmaceutical - Sleep Enhancing Strategies' },
          { src: '/images/portfolio/detail/company-profile/pharma-stress-ease.png', alt: 'Pharmaceutical - Stress Ease & Mood Stabilizers' },
          { src: '/images/portfolio/detail/company-profile/pharma-stress-formula.png', alt: 'Pharmaceutical - Stress Formula Benefits' },
          { src: '/images/portfolio/detail/company-profile/pharma-blog-cut.jpg', alt: 'Pharmaceutical - Blog Content' },
          { src: '/images/portfolio/detail/company-profile/pharma-daily-herbs.jpg', alt: 'Pharmaceutical - Daily Herbs for Wellness' },
        ],
      },
      {
        heading: 'Finance',
        layout: 'image-grid' as const,
        gridCols: 4,
        images: [
          { src: '/images/portfolio/detail/company-profile/finance-templates.jpg', alt: 'Finance - Quick Lenders Templates' },
          { src: '/images/portfolio/detail/company-profile/finance-loan-tips.jpg', alt: 'Finance - Loan Approval Tips' },
          { src: '/images/portfolio/detail/company-profile/finance-credit-myths.jpg', alt: 'Finance - Debunked Credit Myths' },
          { src: '/images/portfolio/detail/company-profile/finance-venture-capital.jpg', alt: 'Finance - Venture Capital Funding' },
          { src: '/images/portfolio/detail/company-profile/finance-equipment.jpg', alt: 'Finance - Equipment Financing Guide' },
          { src: '/images/portfolio/detail/company-profile/finance-invoice.jpg', alt: 'Finance - Invoice Financing Options' },
          { src: '/images/portfolio/detail/company-profile/finance-loan-criteria.jpg', alt: 'Finance - Loan Qualification Criteria' },
          { src: '/images/portfolio/detail/company-profile/finance-veteran-loans.jpg', alt: 'Finance - Veteran Loan Programs' },
        ],
        imageAspect: '16/9',
      },
      {
        heading: 'Assorted Brochures',
        layout: 'image-grid' as const,
        gridCols: 4,
        images: [
          { src: '/images/portfolio/detail/company-profile/brochure-king-county.jpg', alt: 'King County Parks Brochure' },
          { src: '/images/portfolio/detail/company-profile/brochure-seo-automation.jpg', alt: 'SEO AI Automation Brochure' },
        ],
        imageAspect: '2/5',
      },
    ],
  },
  {
    slug: 'figma-design',
    title: 'Figma Designs & Product Mockups',
    subtitle: 'Web Design, Prototyping & 3D Visualization',
    category: 'design',
    description: 'I design websites in Figma and create product mockups in Photoshop. From concept to final design, I focus on user experience, brand identity, and visuals that actually convert.',
    sections: [
      {
        heading: 'Figma Designs',
        layout: 'section-header' as const,
        bullets: [
          '**Full website designs** from concept to completion',
          '**Responsive layouts** optimized for all devices',
          '**Brand-consistent** designs that resonate with target audiences',
          '**User-centered design** focusing on intuitive navigation',
        ],
      },
      {
        heading: 'Website Designs',
        content: 'Full website designs for **QuickLenders.com** (business finance) and blog layouts for **American Nutriceuticals** (health & wellness). Each project covered page structure, visual identity, responsive layouts, and developer handoff.',
        layout: 'image-grid' as const,
        gridCols: 4,
        images: [
          { src: '/images/portfolio/detail/figma-design/ql-figma-1.jpg', alt: 'QuickLenders Figma Design - Homepage' },
          { src: '/images/portfolio/detail/figma-design/ql-figma-2.jpg', alt: 'QuickLenders Figma Design - Inner Pages' },
          { src: '/images/portfolio/detail/figma-design/an-figma-blog.jpg', alt: 'American Nutriceuticals Figma Blog Design' },
        ],
        imageAspect: '1/2',
      },
      {
        heading: '2D & 3D Product Mockups',
        layout: 'section-header' as const,
        bullets: [
          '**2D & 3D product mockups** providing realistic visualizations',
          '**High-quality renders** that help clients envision products',
          '**Detailed packaging design** for marketing materials',
          '**Collaboration with teams** to build cohesive branding',
        ],
      },
      {
        heading: 'Product Packaging & Bottles',
        layout: 'image-grid' as const,
        gridCols: 5,
        images: [
          { src: '/images/portfolio/detail/figma-design/ecomer-front.jpg', alt: 'Ecomer Product Mockup' },
          { src: '/images/portfolio/detail/figma-design/essential-detox.jpg', alt: 'Essential Detox Product Mockup' },
          { src: '/images/portfolio/detail/figma-design/vitality-boost.jpg', alt: 'Vitality Boost Product Mockup' },
          { src: '/images/portfolio/detail/figma-design/partial-set.jpg', alt: 'Product Line Display - Front' },
          { src: '/images/portfolio/detail/figma-design/full-set.jpg', alt: 'Product Line Display - Full Collection' },
        ],
        imageAspect: '1/1',
      },
      {
        heading: 'Wall Art & Room Scene Mockups',
        layout: 'image-grid' as const,
        gridCols: 3,
        images: [
          { src: '/images/portfolio/detail/figma-design/peacock-room.jpg', alt: 'Peacock Enigma Room Mockup' },
          { src: '/images/portfolio/detail/figma-design/wall-size-guide.jpg', alt: 'Wall Art Size Guide' },
          { src: '/images/portfolio/detail/figma-design/sail-away.jpg', alt: 'Sail Away Room Scene Mockup' },
        ],
        imageAspect: '1/1',
      },
      {
        heading: 'Phone Cases & Accessories',
        layout: 'image-grid' as const,
        gridCols: 3,
        images: [
          { src: '/images/portfolio/detail/figma-design/phone-case-1.png', alt: 'Phone Case Mockup' },
          { src: '/images/portfolio/detail/figma-design/business-lion-iphone.jpg', alt: 'Business Lion iPhone Case' },
          { src: '/images/portfolio/detail/figma-design/amethyst-gateway.jpg', alt: 'Amethyst Gateway Art' },
        ],
        imageAspect: '1/1',
      },
    ],
  },
  {
    slug: 'paid-sm-marketing',
    title: 'Paid Social Media Marketing',
    subtitle: 'Meta & Google Ads Management',
    category: 'ecommerce',
    description: 'Managing paid advertising on Meta and Google with consistent positive ROI. Through audience segmentation, A/B testing, and real-time campaign adjustments, I optimize ad spend across platforms.',
    sections: [
      {
        heading: 'Paid Meta Ad Results',
        layout: 'section-header' as const,
        bullets: [
          '**Meta and Google ad management** with consistently positive ROI',
          '**Audience segmentation and A/B testing** for optimized spend',
          '**Real-time campaign adjustments** based on performance data',
          '**$50K+ in managed ad spend** across Facebook and Instagram',
        ],
      },
      {
        heading: 'Ad Spend',
        content: 'At The Dope Art, I managed **Meta and Google ads** and consistently achieved positive ROIs. Through audience segmentation, A/B testing, and real-time campaign adjustments, I optimized advertising spend across platforms.',
        layout: 'side-by-side' as const,
        images: [
          { src: '/images/portfolio/detail/ecommerce/paid-ads-cover.png', alt: 'Paid Ads Campaign Overview' },
        ],
      },
      {
        heading: 'Meta Ad Results',
        layout: 'image-grid' as const,
        gridCols: 4,
        images: [
          { src: '/images/portfolio/detail/ecommerce/ctr-reach.png', alt: 'CTR and Reach Performance Data' },
          { src: '/images/portfolio/detail/ecommerce/facebook-paid.png', alt: '50K+ Meta Ad Spend Breakdown' },
          { src: '/images/portfolio/detail/ecommerce/paid-ads-3.png', alt: 'Instagram Insights - 25K Impressions, 9K Interactions' },
          { src: '/images/portfolio/detail/ecommerce/paid-ads-2.png', alt: 'Reach - 153K Views, 20K Interactions' },
        ],
        imageAspect: '1/1',
      },
      {
        heading: 'E-Commerce',
        layout: 'section-header' as const,
        bullets: [
          '**$213K+ in Shopify sales** through SEO, targeted marketing, and data-driven strategies',
          '**315K+ Etsy views** with nearly $143K in sales across stores',
          '**Strong marketplace presence** built through product positioning and market adaptation',
          '**Multi-channel selling** with sustained growth across Shopify and Etsy',
        ],
      },
      {
        heading: 'E-Commerce Stores',
        content: 'Through my **e-commerce stores**, I\'ve generated substantial revenue by optimizing for both direct sales and marketplace engagement. On **Shopify**, I\'ve achieved over $213K in sales by using SEO, targeted marketing, and data-driven strategies to attract a consistent customer base. On **Etsy**, my stores have collectively garnered over 315K views, with total sales reaching nearly $143K. This reflects my ability to build a strong online presence, position products well, and drive sustained growth through data analysis and market adaptation across multiple channels.',
        layout: 'side-by-side' as const,
        metrics: [
          { label: 'Shopify Sales', value: '$213K+' },
          { label: 'Etsy Views', value: '315K+' },
          { label: 'Etsy Sales', value: '~$143K' },
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/ecommerce-cover.png', alt: 'E-Commerce Store Overview' },
        ],
      },
      {
        heading: 'Luxury Wall Art Store',
        layout: 'image-grid' as const,
        gridCols: 1,
        images: [
          { src: '/images/portfolio/detail/ecommerce/lwa-website-screenshot.png', alt: 'Luxury Wall Art Website Homepage' },
        ],
        imageAspect: '1/1',
      },
    ],
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    subtitle: 'Multi-Platform Growth Strategy',
    category: 'ecommerce',
    description: 'Managing social media presence across TikTok, Instagram, Facebook, Pinterest, and more with focus on audience growth, engagement, and driving traffic to e-commerce stores.',
    sections: [
      {
        heading: 'Platform Strategy',
        content: 'I manage social media accounts across multiple platforms with tailored strategies for each. **TikTok** requires short, engaging video content that hooks viewers in the first second. **Instagram** rewards consistent posting and strong visual aesthetics. **Pinterest** functions more like a search engine, requiring keyword-optimized pins and boards. **Facebook** remains valuable for community building and certain demographics. Rather than posting the same content everywhere, I create platform-native content that works with each algorithm and audience expectation.',
        bullets: [
          '**Content calendar** planning and scheduling across all platforms',
          '**Video creation** optimized for TikTok, Reels, and Shorts formats',
          '**Visual identity** maintained consistently across different networks',
          '**Community management** including comments, DMs, and engagement',
          '**Analytics tracking** with monthly reporting on key metrics',
          '**Trend monitoring** to capitalize on viral moments and formats',
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/social-media-phones.png', alt: 'Social Media Phone Mockups' },
        ],
        layout: 'side-by-side',
      },
      {
        heading: 'The Dope Art',
        content: 'I grew **The Dope Art** from zero to over **50,000 followers** across Instagram, TikTok, and Facebook through **strategic content planning** and consistent engagement. The growth came from understanding what the target audience wants to see: bold, eye-catching artwork presented in inspiring contexts. I developed content themes, created a consistent posting schedule, and actively engaged with the art community.\n\nCustomer content showing their purchases built **social proof**. Behind-the-scenes content humanized the brand. Collaborations with other artists and creators expanded reach to new audiences.',
        metrics: [
          { label: 'Followers Grown', value: '50,000+' },
          { label: 'Starting Point', value: '0' },
          { label: 'Platforms', value: 'IG, TikTok, FB' },
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/social-media-2-phones-tda.jpg', alt: 'The Dope Art Instagram' },
        ],
        layout: 'side-by-side',
      },
      {
        heading: '26K+ Growth on Multiple Platforms',
        images: [
          { src: '/images/portfolio/detail/ecommerce/tik-post.png', alt: 'TikTok Post' },
          { src: '/images/portfolio/detail/ecommerce/all-seeing-king.png', alt: 'All Seeing King' },
          { src: '/images/portfolio/detail/ecommerce/reels-1.png', alt: 'Instagram Reels' },
          { src: '/images/portfolio/detail/ecommerce/signing-art.png', alt: 'Signing Art' },
          { src: '/images/portfolio/detail/ecommerce/anon-king-sm.png', alt: 'Anonymous King' },
          { src: '/images/portfolio/detail/ecommerce/tiktok-viral.png', alt: 'TikTok Viral Content' },
          { src: '/images/portfolio/detail/ecommerce/tiktok-viral-2.png', alt: 'TikTok Viral' },
          { src: '/images/portfolio/detail/ecommerce/devil-royal.png', alt: 'Devil Royal' },
          { src: '/images/portfolio/detail/ecommerce/kq-set.png', alt: 'KQ Set' },
        ],
        layout: 'image-grid',
        gridCols: 5,
        phoneAspect: true,
      },
      {
        heading: 'Pinterest-Driven Organic Growth',
        content: 'For **Luxury Wall Art**, Pinterest was the biggest organic traffic driver. I treated it like a visual search engine: keyword-optimized pin titles, descriptions, and board names targeting what people actually search for when looking for wall art. Every pin linked back to the Shopify store, turning discovery into sales.\n\nThe strategy contributed to **$60K+ in organic conversions** without spending on ads. **Facebook** and **Instagram** played supporting roles for community building and showcasing art in real settings, but Pinterest SEO was the core growth engine for this brand.',
        metrics: [
          { label: 'Organic Conversions', value: '$60K+' },
          { label: 'Primary Channel', value: 'Pinterest' },
          { label: 'Platforms Managed', value: '5+' },
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/lwa-social-media.png', alt: 'Luxury Wall Art Social Media' },
        ],
        layout: 'side-by-side',
      },
      {
        heading: 'YouTube SEO',
        content: 'I handle YouTube SEO for Quality Sewing\'s channel, optimizing titles, descriptions, tags, and thumbnails to drive organic discovery. Sewing tutorials and product demos are a natural fit for search-driven video content, so I treat each upload like a blog post: keyword research first, then structured metadata that matches what people are actually searching for. I also work on playlist organization and end screen strategy to keep viewers on the channel longer.',
        bullets: [
          '**Keyword-optimized titles and descriptions** for every video upload',
          '**Custom thumbnails** designed for click-through rate',
          '**Tag strategy** targeting long-tail sewing and quilting search terms',
          '**Playlist curation** to improve session duration and channel authority',
          '**Analytics review** to identify top-performing content and double down',
        ],
        layout: 'side-by-side',
      },
      {
        heading: 'Scheduling Posts',
        content: 'Managing multiple accounts efficiently requires the right tools and systems. I use **Hootsuite** and **Facebook Business Suite** to batch content creation and ensure consistent posting. I plan content calendars weeks in advance, batch-create graphics and captions, and schedule everything out. Platform-native analytics tell me what\'s working so I can double down. I track follower growth, engagement rate, reach, and the metric that actually matters: traffic and conversions driven to the store.',
        bullets: [
          '**Hootsuite** for multi-platform scheduling and management',
          '**Facebook Business Suite** for Meta platform management',
          '**Canva** for quick graphic creation and templates',
          '**Platform analytics** for performance tracking and optimization',
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/lwa-planning.png', alt: 'Content Calendar and Planning' },
        ],
        layout: 'side-by-side',
      },
      {
        heading: 'Social Media Content Creation',
        layout: 'section-header',
        content: 'All graphics designed from scratch in **Adobe Photoshop** after researching each topic, audience, and platform. Every post starts with competitor analysis and keyword research before I touch a single layer.',
        bullets: [
          '**QuickLenders** marketing materials, social posts, and branded graphics',
          '**Social media hacks** carousel series for engagement and shares',
          '**SEO education** content designed to build authority and drive follows',
        ],
      },
      {
        heading: 'QuickLenders.com Marketing Materials',
        layout: 'image-grid',
        gridCols: 5,
        images: [
          { src: '/images/portfolio/detail/social-posts/ql-banks-maze.jpg', alt: 'Banks Are a Maze - Quick Lenders' },
          { src: '/images/portfolio/detail/social-posts/ql-esop-2.jpg', alt: 'ESOP Funding' },
          { src: '/images/portfolio/detail/social-posts/ql-esop-3.jpg', alt: 'ESOP Funding Benefits' },
          { src: '/images/portfolio/detail/social-posts/ql-unlock-potential-1.jpg', alt: 'Unlock Business Potential' },
          { src: '/images/portfolio/detail/social-posts/ql-single-1.jpg', alt: 'Quick Lenders Confidence' },
          { src: '/images/portfolio/detail/social-posts/ql-empowering.jpg', alt: 'Empowering Business Dreams' },
          { src: '/images/portfolio/detail/social-posts/ql-invoice-2.jpg', alt: 'Invoice Factoring' },
          { src: '/images/portfolio/detail/social-posts/ql-invoice-3.jpg', alt: 'Invoice Factoring Benefits' },
          { src: '/images/portfolio/detail/social-posts/ql-tired-banks.jpg', alt: 'Tired of Waiting on Banks' },
          { src: '/images/portfolio/detail/social-posts/ql-first-time.jpg', alt: 'First Time Business Owners' },
          { src: '/images/portfolio/detail/social-posts/ql-esop-1.jpg', alt: 'Build a Legacy with ESOP' },
          { src: '/images/portfolio/detail/social-posts/ql-unlock-potential-2.jpg', alt: 'Unlock Your Business Potential' },
          { src: '/images/portfolio/detail/social-posts/ql-standard-slices.jpg', alt: 'Skip the Standard Slice' },
          { src: '/images/portfolio/detail/social-posts/ql-12-ways.jpg', alt: '12 Ways to Improve Credit Score' },
          { src: '/images/portfolio/detail/social-posts/ql-100-million.jpg', alt: '$100 Million Private Lending' },
        ],
      },
      {
        heading: 'Social Media Hacks',
        layout: 'image-grid',
        gridCols: 5,
        images: [
          { src: '/images/portfolio/detail/social-posts/smh-1.jpg', alt: 'Go Viral on Social Media' },
          { src: '/images/portfolio/detail/social-posts/smh-2.jpg', alt: 'Use Eye-Catching Visuals' },
          { src: '/images/portfolio/detail/social-posts/smh-3.jpg', alt: 'Timing Your Post is Crucial' },
          { src: '/images/portfolio/detail/social-posts/smh-8.jpg', alt: 'Engage With Your Audience' },
          { src: '/images/portfolio/detail/social-posts/smh-9.jpg', alt: 'Use Memes and Pop Culture' },
          { src: '/images/portfolio/detail/social-posts/smh-6.jpg', alt: 'Timing With Trend Hijacking' },
          { src: '/images/portfolio/detail/social-posts/smh-5.jpg', alt: 'Exploit the Power of FOMO' },
          { src: '/images/portfolio/detail/social-posts/smh-4.jpg', alt: 'Utilize Emotional Triggers' },
          { src: '/images/portfolio/detail/social-posts/smh-7.jpg', alt: 'Make Shareable and Helpful Content' },
          { src: '/images/portfolio/detail/social-posts/smh-10.jpg', alt: 'Spark a Debate or Create Controversy' },
        ],
      },
      {
        heading: 'SEO Hacks',
        layout: 'image-grid',
        gridCols: 5,
        images: [
          { src: '/images/portfolio/detail/social-posts/seo-1.jpg', alt: 'Swim With the Sharks SEO' },
          { src: '/images/portfolio/detail/social-posts/seo-2.jpg', alt: 'What is SEO' },
          { src: '/images/portfolio/detail/social-posts/seo-3.jpg', alt: 'Key SEO Ranking Factors' },
          { src: '/images/portfolio/detail/social-posts/seo-4.jpg', alt: 'Quality Content for SEO' },
          { src: '/images/portfolio/detail/social-posts/seo-5.jpg', alt: 'Strengthen Your Online Authority' },
          { src: '/images/portfolio/detail/social-posts/seo-6.jpg', alt: 'Optimize Your On-Page SEO' },
          { src: '/images/portfolio/detail/social-posts/seo-7.jpg', alt: 'Optimize for User Experience' },
          { src: '/images/portfolio/detail/social-posts/seo-8.jpg', alt: 'Key Technical SEO Practices' },
          { src: '/images/portfolio/detail/social-posts/seo-9.jpg', alt: 'Maximize SEO with Social Interaction' },
          { src: '/images/portfolio/detail/social-posts/seo-10.jpg', alt: 'Stay Ahead in the Digital World' },
        ],
      },
    ],
  },
  {
    slug: 'art-design',
    title: 'Digital Art & Design',
    subtitle: 'Original Artwork Collections',
    category: 'art',
    description: 'I create digital artwork for entrepreneurs and dreamers. Every piece explores themes of ambition, success, struggle, and triumph through bold visual storytelling.',
    tags: ['Digital Art', 'Photoshop', 'E-Commerce', 'Print on Demand'],
    sections: [
      // The Dope Art Brand - side by side
      {
        heading: 'The Dope Art Brand',
        layout: 'side-by-side',
        content: '[The Dope Art](https://thedopeart.com) is my primary digital art brand, featuring collections that speak to entrepreneurs, hustlers, and dreamers. Every piece is designed to inspire and motivate, from a roaring lion representing courage to a bull symbolizing market optimism.\n\nThe brand has built a loyal customer base of **3,000+ buyers** across Shopify and Etsy, with a **5-star rating** on both platforms. Quality printing on premium canvas ensures the digital designs translate into impressive physical products. The brand has also organically grown to over **50K followers** across Instagram, Facebook, and TikTok.',
        metrics: [
          { label: 'Total Sales', value: '$400K+' },
          { label: 'Customers', value: '3,000+' },
          { label: 'Rating', value: '5 Stars' },
        ],
        images: [
          { src: '/images/portfolio/detail/art/tda-site-1.jpg', alt: 'The Dope Art Website' },
        ],
      },
      // Featured artwork grid (The Dope Art pieces)
      {
        heading: 'Featured Artwork',
        layout: 'image-grid',
        gridCols: 4,
        imageAspect: '4/5',
        images: [
          { src: '/images/portfolio/detail/art/time-is-king.jpg', alt: 'Time is King' },
          { src: '/images/portfolio/detail/art/moon-boat.jpg', alt: 'Moon Boat - Surrealism' },
          { src: '/images/portfolio/detail/art/outrun.jpg', alt: 'Outrun Art' },
          { src: '/images/portfolio/detail/art/tiger-king-art.jpg', alt: 'Tiger King Art' },
        ],
      },
      // Studio & product photos
      {
        heading: 'From Screen to Canvas',
        layout: 'image-grid',
        gridCols: 3,
        imageAspect: '1/1',
        content: 'Every design starts in Photoshop and ends as a gallery-quality canvas print. I handle the full pipeline: concept, design, mockups, product listings, and fulfillment.',
        images: [
          { src: '/images/portfolio/detail/art/jesse-studio.jpg', alt: 'Jesse in the Studio' },
          { src: '/images/portfolio/detail/art/art-boxes.jpg', alt: 'Packaged Art Products' },
          { src: '/images/portfolio/detail/art/lwa/all-acrylics.jpg', alt: 'Acrylic Art Collection Overview' },
        ],
      },
      // Customer feedback
      {
        heading: 'Customer Feedback',
        layout: 'side-by-side',
        content: 'Both The Dope Art and Luxury Wall Art maintain **5-star ratings** across Etsy and Shopify. With over **3,000 customers** served, the feedback has been consistently positive. Buyers regularly share photos of their pieces on display, and repeat customers make up a solid chunk of sales.\n\nQuality control is a big part of that. Every order is inspected before shipping, and I personally handle any issues that come up. That hands-on approach keeps return rates low and review scores high.',
        images: [
          { src: '/images/portfolio/detail/art/reviews.jpg', alt: 'Customer Reviews and Feedback' },
        ],
      },
      // Surrealism
      {
        heading: 'Surrealism',
        layout: 'image-grid',
        gridCols: 4,
        imageAspect: '4/5',
        images: [
          { src: '/images/portfolio/detail/art/lwa/surreal-1.jpg', alt: 'Cosmonaut Canvas Art' },
          { src: '/images/portfolio/detail/art/lwa/surreal-2.jpg', alt: 'Neon City Dreamscape' },
          { src: '/images/portfolio/detail/art/lwa/surreal-3.jpg', alt: 'Cosmic Butterflies' },
          { src: '/images/portfolio/detail/art/lwa/surreal-4.jpg', alt: 'Sail Away Ship' },
        ],
      },
      // Wall Street Collection
      {
        heading: 'Wall Street Collection',
        layout: 'image-grid',
        gridCols: 5,
        imageAspect: '4/5',
        images: [
          { src: '/images/portfolio/detail/art/lwa/ws-1.jpg', alt: 'Bull Boxer' },
          { src: '/images/portfolio/detail/art/lwa/ws-2.jpg', alt: 'Bear Boxer' },
          { src: '/images/portfolio/detail/art/lwa/ws-3.jpg', alt: 'Wall Street Bull' },
          { src: '/images/portfolio/detail/art/lwa/ws-4.jpg', alt: 'Seeing Red Bear' },
          { src: '/images/portfolio/detail/art/lwa/ws-5.jpg', alt: 'To The Moon' },
        ],
      },
      // Royalty Collection
      {
        heading: 'Royalty Collection',
        layout: 'image-grid',
        gridCols: 5,
        imageAspect: '4/5',
        images: [
          { src: '/images/portfolio/detail/art/lwa/royal-1.jpg', alt: 'All Seeing King' },
          { src: '/images/portfolio/detail/art/lwa/royal-2.jpg', alt: 'All Seeing Queen' },
          { src: '/images/portfolio/detail/art/lwa/royal-3.jpg', alt: 'Time is King' },
          { src: '/images/portfolio/detail/art/lwa/royal-4.jpg', alt: 'Queen with Crown' },
          { src: '/images/portfolio/detail/art/lwa/royal-5.jpg', alt: 'King of Hearts' },
          { src: '/images/portfolio/detail/art/lwa/royal-6.jpg', alt: 'Time is Money' },
          { src: '/images/portfolio/detail/art/lwa/royal-7.jpg', alt: 'Tiger King' },
          { src: '/images/portfolio/detail/art/lwa/royal-8.jpg', alt: 'Midas Touch' },
          { src: '/images/portfolio/detail/art/lwa/royal-9.jpg', alt: 'Vault King' },
          { src: '/images/portfolio/detail/art/lwa/royal-10.jpg', alt: 'Leopard Suit' },
        ],
      },
      // Luxury Wall Art - side by side
      {
        heading: 'Luxury Wall Art Brand',
        layout: 'side-by-side',
        content: 'I also operate [Luxury Wall Art](https://luxurywallart.com), a second brand with different positioning. While The Dope Art has a bolder, streetwear-influenced aesthetic, Luxury Wall Art targets customers seeking elegant pieces for upscale spaces.\n\nThe store features a **massive collection of wall art** across dozens of styles and categories. Beyond my own work, the platform supports other independent artists by hosting and selling their pieces, giving them a storefront and audience they wouldn\'t have on their own. Running two brands in the same space provides valuable data on different customer segments and marketing approaches.',
        metrics: [
          { label: 'Revenue', value: '$120K+' },
          { label: 'Keywords Ranking', value: '9,200+' },
          { label: 'Domain Authority', value: '1→20' },
        ],
        images: [
          { src: '/images/portfolio/detail/art/lwa-front-page.jpg', alt: 'Luxury Wall Art Website' },
        ],
      },
      // LWA art prints and mockups
      {
        heading: '',
        layout: 'image-grid',
        gridCols: 4,
        images: [
          { src: '/images/portfolio/detail/art/lwa/elephants.jpg', alt: 'Elephant Canvas Art Collection' },
          { src: '/images/portfolio/detail/art/lwa/lion-set.jpg', alt: 'Lion Canvas Art Set' },
          { src: '/images/portfolio/detail/art/lwa/mockup.png', alt: 'Luxury Wall Art Room Mockup' },
          { src: '/images/portfolio/detail/art/lwa/featured-artist.jpg', alt: 'Featured Artist Collaboration' },
        ],
      },
      // LWA detailed showcase
      {
        heading: '',
        layout: 'image-grid',
        gridCols: 4,
        imageAspect: '4/5',
        images: [
          { src: '/images/portfolio/detail/art/lwa/top-sellers.jpg', alt: 'Top Revenue-Generating Art' },
          { src: '/images/portfolio/detail/art/lwa/growth-strategy.jpg', alt: 'Growth Strategy' },
          { src: '/images/portfolio/detail/art/lwa/collections.jpg', alt: 'Expanding Collections' },
          { src: '/images/portfolio/detail/art/lwa/seo-stats.jpg', alt: 'Booming SEO Growth' },
        ],
      },
    ],
  },
  {
    slug: 'animation',
    title: 'Digital Animations',
    subtitle: 'Bringing Static Art to Life',
    category: 'art',
    description: 'Creating engaging digital animations that transform static images into dynamic visual experiences through motion, sound, and storytelling.',
    sections: [
      {
        heading: 'Animation as Art',
        content: 'Animation adds a new dimension to digital art, transforming static images into **dynamic visual experiences**. Using **Adobe Premiere Pro** and **Photoshop**, I bring artwork to life with motion, lighting effects, and sound design. These aren\'t simple GIFs or basic transitions. Each animation tells a micro-story, drawing viewers in and holding their attention. The movement is carefully choreographed to enhance the original piece without overwhelming it. Subtle particle effects, camera movements, and atmospheric lighting create depth and mood. Sound design adds another layer of immersion.',
        images: [
          { src: '/images/portfolio/detail/art/animations.png', alt: 'Animation Sample' },
        ],
      },
      {
        heading: 'Creative Process',
        content: 'My animation workflow combines multiple tools and techniques for the best results. It starts with **Photoshop** for preparing artwork elements, separating layers that will move independently. Then **Premiere Pro** (and sometimes After Effects) handles the actual animation, adding motion, timing, and effects. The process requires understanding how movement works: easing, anticipation, follow-through. Even simple animations benefit from these principles. Sound design is often overlooked but critical for impact. Ambient sounds, subtle music, and strategic effects transform a visual into an experience. The final output is optimized for different platforms: longer versions for web, shorter loops for social media.',
        bullets: [
          '**Photoshop** for layer preparation and element isolation',
          '**Premiere Pro** for timeline animation and video editing',
          '**After Effects** for complex motion graphics when needed',
          '**Sound design** with ambient audio, music, and effects',
          '**Multiple export formats** optimized for different platforms',
        ],
      },
      {
        heading: 'Makers Place Collection',
        content: 'My digital animations have been featured on **Makers Place**, an exclusive online gallery for digital art with sound. This platform curates high-quality digital artwork and has built a community of collectors who appreciate the medium. Several of my animated pieces have sold out on the platform, validating that collectors value the extra dimension that animation brings to digital art. The intersection of traditional artistic vision with modern technology opens new possibilities for both creation and collection. Digital art, especially animated pieces, can be displayed on digital frames and screens in ways that static prints cannot.',
      },
    ],
  },
  {
    slug: 'art-publications',
    title: 'Art Publications',
    subtitle: 'Press Coverage & Brand Partnerships',
    category: 'art',
    description: 'Press coverage, media features, and brand partnerships that have expanded reach and credibility in the digital art space.',
    tags: ['Digital Art', 'Collaborations', 'Partnerships'],
    sections: [
      {
        heading: 'Tiger King Comic Book Cover Art',
        content: 'When **Tiger King** became a cultural phenomenon in 2020, I partnered with [TidalWave Productions](https://tidalwavecomics.com/) to create a comic book that captured the show\'s wild energy. The collaboration gained traction, with mentions from cast members and media outlets like [TMZ](https://www.tmz.com/2020/05/31/tiger-king-comic-book-first-pages-special-edition-cover-joe-exotic-origin-story-carole-baskin/). This project was a great example of leveraging current trends to create engaging content that resonates with a broad audience.',
        images: [
          { src: '/images/portfolio/detail/art/tiger-king-cover.jpg', alt: 'Tiger King Comic Book Cover Art' },
        ],
      },
      {
        heading: 'ShoutOut LA',
        content: '"Jesse Johnson, the visionary behind thedopeart.com, attributes his success to three critical elements: passion, organization, and balance. With a fervor for creating distinctive pieces of art, he devoted two years to honing his skills, eventually finding a unique style resonating with entrepreneurial spirits seeking inspiring decor." [Read the full article](https://shoutoutla.com/meet-jesse-johnson-digital-artist/)',
        images: [
          { src: '/images/portfolio/detail/art/shoutout-la.jpg', alt: 'ShoutOut LA Article - Meet Jesse Johnson: Digital Artist' },
          { src: '/images/portfolio/detail/art/shoutout-la-canvases.jpg', alt: 'Jesse with Canvas Art Collection' },
        ],
      },
      {
        heading: 'Collaborations',
        content: '',
      },
      {
        heading: 'Jondo Prints',
        content: 'For the 2022 NFT LA event, I partnered with Jondo Prints to create an interactive booth showcasing high-quality digital prints from [The Dope Art](https://thedopeart.com/) and **Eternal Royals**. I designed our booth layout and featured artwork, blending physical art with digital innovation. This collaboration was a fantastic way to highlight both my art and Jondo\'s print quality, while engaging with the NFT and digital art community, expanding The Dope Art\'s reach.',
        images: [
          { src: '/images/portfolio/detail/art/nft-la-booth.jpg', alt: 'NFT LA Booth with Jondo Prints' },
        ],
      },
      {
        heading: 'NFT LA',
        content: '',
        images: [
          { src: '/images/portfolio/detail/art/nft-la.jpg', alt: 'NFT LA Event Display' },
          { src: '/images/portfolio/detail/art/nft-la-booth-2.jpg', alt: 'NFT LA Booth Setup' },
          { src: '/images/portfolio/detail/art/nft-la-booth-3.jpg', alt: 'NFT LA Art Display' },
          { src: '/images/portfolio/detail/art/nft-la-booth-4.jpg', alt: 'NFT LA Booth Overview' },
          { src: '/images/portfolio/detail/art/nft-la-booth-5.jpg', alt: 'Eternal Royals Display' },
          { src: '/images/portfolio/detail/art/nft-la-booth-6.jpg', alt: 'Canvas Prints at NFT LA' },
          { src: '/images/portfolio/detail/art/nft-la-booth-7.jpg', alt: 'Art Collection Display' },
          { src: '/images/portfolio/detail/art/nft-la-booth-8.jpg', alt: 'Event Booth with Visitors' },
        ],
      },
      {
        heading: 'Wall Street Prints',
        content: 'My collaboration with [Wall Street Prints](https://wallstreetprints.com/) reflects the depth of my creativity over the years. I\'ve channeled my artistic passion into producing digital art using Photoshop, each piece tailored to resonate with the distinct character and needs of different businesses. The positive reception to these characters serves as a testament to the power of creative digital art in brand storytelling and engagement.',
        images: [
          { src: '/images/portfolio/detail/art/bull-bear-collab.png', alt: 'Bull and Bear Collaboration Art' },
        ],
      },
    ],
  },
  {
    slug: 'crypto-nfts',
    title: 'Crypto & NFTs',
    subtitle: 'Eternal Royals Collection',
    category: 'art',
    description: 'Bridging digital art with blockchain technology through the Eternal Royals NFT collection, combining on-chain ownership with physical canvas prints and real-world utility.',
    tags: ['Photoshop', 'Blockchain', 'NFT', 'Team Management', 'Digital Art'],
    sections: [
      // Eternal Royals NFTs - side by side
      {
        heading: 'Eternal Royals NFTs',
        subheading: 'Digital Artwork by Jesse Johnson 2021',
        layout: 'side-by-side',
        content: 'In 2021, at the peak of the NFT boom, I designed and launched a collection of **9,224 unique Kings and Queens**, each built from scratch in Photoshop using thousands of layered photographs and original digital artwork.\n\nThe **Eternal Royals NFT** collection bridges digital art with physical canvas prints, making it more than just a digital collectible. Each NFT serves as your key to the realm, including access to limited edition art drops, IRL and virtual events, and **1-of-1 prints of your NFT**.\n\nThat creative process quickly built a following of eager collectors looking to grab a set. It also led to traveling across the country to collaborate with creators, investors, and entrepreneurs in the space. From **NFT NYC** to **NFT LA**, Minneapolis, and Art Week in Florida.',
        images: [
          { src: '/images/portfolio/detail/art/er-project-site.jpg', alt: 'Eternal Royals Project Site' },
        ],
      },
      // Royals Artwork - grid of kings
      {
        heading: 'Royals Artwork',
        layout: 'image-grid',
        gridCols: 3,
        imageAspect: '1/1',
        images: [
          { src: '/images/portfolio/detail/art/er-artwork/er-king-1.jpg', alt: 'Eternal Royals King 1' },
          { src: '/images/portfolio/detail/art/er-artwork/er-king-2.jpg', alt: 'Eternal Royals King 2' },
          { src: '/images/portfolio/detail/art/er-artwork/er-king-3.jpg', alt: 'Eternal Royals King 3' },
        ],
      },
      // OpenSea + Stats - side by side
      {
        heading: 'Sales & Market Performance',
        layout: 'side-by-side',
        imageAspect: '16/10',
        content: 'I led a dedicated team of professionals to launch and grow Eternal Royals, from community management to event coordination, pioneering a new marketplace in a space that was being built in real time. The project achieved over **$2 million in primary sales**, with additional revenue generated through ongoing royalties from secondary market trades.\n\nThe collection has since amassed over **$2 million in secondary trading volume** on platforms like OpenSea. Building and sustaining value in a competitive, fast-evolving market took constant execution across art, tech, and community.',
        metrics: [
          { label: 'Primary Sales', value: '$2M+' },
          { label: 'Trading Volume', value: '$2M+' },
          { label: 'Unique NFTs', value: '9,224' },
        ],
        images: [
          { src: '/images/portfolio/detail/art/er-opensea-collection.png', alt: 'Eternal Royals on OpenSea' },
          { src: '/images/portfolio/detail/art/er-opensea-stats.jpg', alt: 'OpenSea Trading Stats' },
        ],
      },
      // NFT LA - side by side with event context
      {
        heading: 'NFT LA with Jondo Global',
        layout: 'side-by-side',
        imageAspect: '4/3',
        content: 'I co-sponsored and hosted an event at **NFT LA** alongside the **founder of Jondo Global**, a premium printing company that produced physical canvas prints of the Eternal Royals artwork. We showcased the collection on their high-end products and connected with collectors, artists, and blockchain builders from across the country.\n\nThe partnership brought the digital side of the project into the real world, giving holders a tangible version of their NFTs printed on gallery-quality canvas.',
        images: [
          { src: '/images/portfolio/detail/art/er-nft-la-hero.jpg', alt: 'Co-hosting the Eternal Royals event at NFT LA with Jondo Global' },
        ],
      },
      // NFT Sales Highlights grid
      {
        heading: 'NFT Sales Highlights',
        layout: 'image-grid',
        gridCols: 5,
        imageAspect: '1/1',
        images: [
          { src: '/images/portfolio/detail/art/er-canvases/canvas-1.jpg', alt: 'Eternal Royals Canvas 1' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-2.jpg', alt: 'Eternal Royals Canvas 2' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-3.jpg', alt: 'Eternal Royals Canvas 3' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-4.jpg', alt: 'Eternal Royals Canvas 4' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-5.jpg', alt: 'Eternal Royals Canvas 5' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-6.jpg', alt: 'Eternal Royals Canvas 6' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-7.jpg', alt: 'Eternal Royals Canvas 7' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-8.jpg', alt: 'Eternal Royals Canvas 8' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-9.jpg', alt: 'Eternal Royals Canvas 9' },
          { src: '/images/portfolio/detail/art/er-canvases/canvas-10.jpg', alt: 'Eternal Royals Canvas 10' },
        ],
      },
      // Events and Promotions header
      {
        heading: 'Events and Promotions',
        layout: 'section-header',
        content: 'Merging digital and physical assets with blockchain and premium printing technologies with Jondo Global.',
      },
      // Events grid
      {
        heading: '',
        layout: 'image-grid',
        gridCols: 4,
        imageAspect: '1/1',
        images: [
          { src: '/images/portfolio/detail/art/er-events/nft-la-booth.jpg', alt: 'NFT LA Booth' },
          { src: '/images/portfolio/detail/art/er-events/veecon-royals.jpg', alt: 'VeeCon Royals' },
          { src: '/images/portfolio/detail/art/er-events/nfc-chip.jpg', alt: 'NFC Chip Technology' },
          { src: '/images/portfolio/detail/art/er-events/jesse-nyc.jpg', alt: 'Jesse in NYC' },
          { src: '/images/portfolio/detail/art/er-events/poker-chips.jpg', alt: 'Branded Poker Chips' },
          { src: '/images/portfolio/detail/art/er-events/sara-vee.jpg', alt: 'Sara at VeeCon' },
          { src: '/images/portfolio/detail/art/er-events/event-photo-1.jpg', alt: 'Event Photo' },
          { src: '/images/portfolio/detail/art/er-events/rob-nyc.jpg', alt: 'Rob in NYC' },
          { src: '/images/portfolio/detail/art/er-events/nft-la-event.jpg', alt: 'NFT LA Event' },
          { src: '/images/portfolio/detail/art/er-events/event-photo-2.jpg', alt: 'Event Photo' },
          { src: '/images/portfolio/detail/art/er-events/touch-screen.jpg', alt: 'Touch Screen Display' },
          { src: '/images/portfolio/detail/art/er-events/crowd.jpg', alt: 'Crowd at Event' },
          { src: '/images/portfolio/detail/art/er-events/signed-print.jpg', alt: 'Signed Print' },
          { src: '/images/portfolio/detail/art/er-events/jesse-times-square.png', alt: 'Jesse at Times Square' },
          { src: '/images/portfolio/detail/art/er-events/event-photo-3.jpg', alt: 'Event Photo' },
          { src: '/images/portfolio/detail/art/er-events/event-photo-4.jpg', alt: 'Event Photo' },
          { src: '/images/portfolio/detail/art/er-events/event-photo-5.jpg', alt: 'Event Photo' },
          { src: '/images/portfolio/detail/art/er-events/event-photo-6.jpg', alt: 'Event Photo' },
          { src: '/images/portfolio/detail/art/er-events/event-photo-7.jpg', alt: 'Event Photo' },
        ],
      },
      // Eternal Guardians - side by side
      {
        heading: 'Eternal Guardians',
        layout: 'side-by-side',
        content: '"The Eternal Guardians" are my newest digital art collection, crafted meticulously and yet awaiting its official debut.\n\nThis unreleased collection is the culmination of six months of rigorous work, employing advanced **Photoshop techniques** and innovative photo manipulations.\n\nWith over **400 distinct traits**, each piece is interconnected, offering a near limitless number of potential combinations.',
        images: [
          { src: '/images/portfolio/detail/art/er-guardians.jpg', alt: 'Eternal Guardians Collection' },
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
