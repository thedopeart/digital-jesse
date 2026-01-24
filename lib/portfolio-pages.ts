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
    slug: 'organic-seo-growth-2',
    title: 'SEO Success: The Dope Art',
    subtitle: 'Two Years of Organic Growth',
    category: 'seo',
    description: 'Building organic traffic for a digital art brand through strategic keyword targeting, consistent content development, and technical SEO optimization over a two-year period.',
    sections: [
      {
        heading: 'Building From Zero',
        content: 'The Dope Art launched in November 2022 as my primary digital art brand. Unlike many e-commerce sites that rely on paid traffic from day one, I committed to building **sustainable organic growth** through SEO. The strategy was simple but required patience: create content that people actually search for, optimize every page for relevant keywords, and let the **compound effect** of good SEO work over time. Starting with minimal visibility meant competing against established art retailers with years of domain authority. The approach required identifying gaps in the market where we could win.',
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
        heading: 'The SEO Approach',
        content: 'The strategy combined **aggressive keyword research**, consistent content development, and ongoing technical optimization. I used **Ahrefs** to identify keywords where The Dope Art could realistically rank, focusing on specific art styles and themes rather than generic terms. Every product page received a unique, keyword-optimized description. Blog posts targeted informational queries that would attract potential customers earlier in their buying journey. Technical SEO work included fixing site speed issues, implementing proper **schema markup** for products and articles, and building a logical site structure that search engines could easily crawl. The key was consistency: showing up month after month with quality content and improvements.',
        bullets: [
          '**Keyword gap analysis** to find opportunities competitors were missing',
          '**Product page optimization** with unique descriptions for each artwork',
          '**Blog content strategy** targeting informational and commercial queries',
          '**Site architecture** improvements for better crawling and indexing',
          '**Regular SEO audits** using Screaming Frog and Search Console',
          '**Backlink monitoring** and toxic link disavowal when needed',
        ],
      },
      {
        heading: 'Two-Year Results',
        content: 'After two years of consistent SEO work, The Dope Art achieved **544% growth in organic search traffic**. The site now attracts over 5,000 monthly visitors without spending on ads. Direct traffic also increased 53.9%, indicating growing **brand awareness** driven by organic visibility. With 120+ keywords in the top 3 positions and 590 in the top 10, the site captures traffic for a wide range of art-related searches. Total sessions reached 46,000, providing a solid foundation of data for understanding customer behavior and optimizing the sales funnel. The SEO work continues to pay dividends as the domain authority grows.',
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
    ],
  },
  {
    slug: 'blog-example-1',
    title: 'Blogging and Copywriting',
    subtitle: 'Content That Ranks and Converts',
    category: 'seo',
    description: 'Creating strategic blog content that ranks for high-value keywords, drives organic traffic, and guides visitors toward purchases through informative, engaging articles.',
    sections: [
      {
        heading: 'Content Strategy Overview',
        content: 'The rapid growth in organic traffic and keyword rankings for my e-commerce sites came from a deliberate **content marketing strategy** built around SEO. Rather than writing random blog posts, every article targets specific search queries with **commercial intent**. The goal is to attract potential customers who are researching topics related to wall art, home decor, and interior design. These visitors arrive through informational searches but discover products that solve their needs. Each blog post is optimized for a primary keyword while naturally incorporating related terms, creating comprehensive content that search engines reward with rankings.',
      },
      {
        heading: 'Content Categories & Topics',
        content: 'I developed content across multiple niches to capture diverse search traffic and appeal to different customer segments. The blog covers everything from **investment office design** to **gothic home decor**, each topic chosen based on keyword research showing real search volume. The content isn\'t thin or generic. Articles typically run 1,500-3,000 words and provide genuine value to readers. This depth helps with rankings and keeps visitors on the site longer, sending positive **engagement signals** to search engines. Internal links within each article guide readers to relevant product collections, creating natural pathways to purchase.',
        bullets: [
          '**Wall Street & Finance**: Investment office design, bull market art, trader aesthetics',
          '**Macabre & Gothic**: Dark art collector guides, Halloween decor, skull artwork',
          '**Poker & Gaming**: Casino art, card game room design, man cave aesthetics',
          '**Royalty & Luxury**: King and queen artwork, luxury home decor, gold accents',
          '**Nature & Animals**: Wildlife art guides, ocean themes, forest imagery',
        ],
        images: [
          { src: '/images/portfolio/detail/seo/blog-luxury-art.jpg', alt: 'Luxury Art Blog' },
          { src: '/images/portfolio/detail/seo/blog-macabre.jpg', alt: 'Macabre Blog Examples' },
          { src: '/images/portfolio/detail/seo/blog-queen-spades.jpg', alt: 'Queen of Spades Blog' },
          { src: '/images/portfolio/detail/seo/seo-score-100.png', alt: 'SEO Score 100' },
        ],
      },
      {
        heading: 'Writing Process & Results',
        content: 'Each blog post follows a proven process: **keyword research** to identify the target term and related queries, **competitive analysis** to understand what\'s already ranking, outline creation with proper heading structure, and writing that balances SEO optimization with readability. I use tools like Clearscope and SurferSEO to ensure comprehensive coverage of topics. Posts include custom images, internal links to products, and clear calls-to-action. Multiple blog posts now rank on **page one of Google** for their target keywords, driving consistent organic traffic that converts into sales. The content library continues to grow, compounding traffic gains over time.',
      },
    ],
  },
  {
    slug: 'company-profile',
    title: 'Company Profile & Design',
    subtitle: 'Professional Marketing Materials',
    category: 'design',
    description: 'Creating professional company profiles, investor pitch decks, brochures, and marketing materials that communicate brand value and drive business results.',
    sections: [
      {
        heading: 'Company Profile Design',
        content: 'I designed a complete company profile for **Rocky Mountain Steel, Inc.**, a steel fabrication company in Colorado. The project required translating industrial services into polished marketing materials that would resonate with B2B clients and potential partners. Using **Canva** and **Photoshop**, I created a multi-page company profile that emphasizes precision, strength, and reliability. The design incorporates the company\'s branding while showcasing their history, capabilities, and industry expertise. Each section was crafted to address common questions prospects have during the sales process, making the profile a practical sales tool beyond just a brochure.',
        images: [
          { src: '/images/portfolio/detail/design/lwa-site-1.jpg', alt: 'LWA Site Design' },
          { src: '/images/portfolio/detail/design/lwa-site-2.jpg', alt: 'LWA Site Interior' },
        ],
      },
      {
        heading: 'Investor Pitch Decks',
        content: 'I created an **investor-focused pitch deck** for an art e-commerce business seeking funding. The deck told a compelling story backed by data: market opportunity, growth trajectory, competitive advantages, and financial projections. I included detailed **market research** on the online art industry, showing the total addressable market and growth trends. Analytics screenshots demonstrated actual SEO growth, keyword rankings, and marketplace performance. The design balanced professional polish with authentic brand personality. Every slide was crafted to answer investor questions and build confidence in the business model. The pitch deck has been used in conversations with potential investors and business partners.',
        images: [
          { src: '/images/portfolio/detail/design/er-site.png', alt: 'Eternal Royals Site Design' },
          { src: '/images/portfolio/detail/design/lwa-site-3.jpg', alt: 'LWA Site Design 3' },
        ],
      },
      {
        heading: 'Infographics & Visual Content',
        content: 'Beyond traditional documents, I design **infographics** and visual content for various industries. For pharmaceutical and health clients, I\'ve created infographics about wellness topics, sleep improvement, and stress management. Finance industry projects include visual guides on loan processes, credit improvement steps, and business funding options. Process infographics help companies explain complex workflows in digestible formats. The key is combining **clear information hierarchy** with engaging visuals that hold attention. Each infographic is designed to be shareable on social media while also working in print and presentation contexts.',
        bullets: [
          '**Pharmaceutical/Health**: Wellness infographics, supplement guides, health tips',
          '**Finance**: Loan process guides, credit score explainers, funding roadmaps',
          '**Process Documentation**: Workflow visualizations, step-by-step guides, timelines',
          '**Social Media**: Shareable graphics optimized for different platforms',
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
    title: 'Web Design & Prototyping',
    subtitle: 'From Wireframe to Final Design',
    category: 'design',
    description: 'Creating user-friendly website designs using Figma, from initial wireframes through high-fidelity mockups ready for development handoff.',
    sections: [
      {
        heading: 'Design Philosophy',
        content: 'Good web design isn\'t just about looking nice. It\'s about creating experiences that guide users toward their goals while achieving business objectives. I approach every project with **user-centered design** principles: understanding who will use the site, what they\'re trying to accomplish, and what barriers might prevent them from succeeding. This means research before design, testing assumptions, and iterating based on feedback. The visual layer comes after the structural decisions are solid. Typography, color, and imagery should reinforce the brand while maintaining **clarity and usability** across all devices.',
        bullets: [
          '**User research** to understand audience needs and behaviors before designing',
          '**Wireframing** to establish layout and information hierarchy',
          '**High-fidelity mockups** with full visual design for desktop and mobile',
          '**Interactive prototypes** for testing user flows before development',
          '**Design systems** with reusable components for consistency and efficiency',
          '**Developer handoff** with organized files, specs, and assets',
        ],
      },
      {
        heading: 'Featured Project: QuickLenders.com',
        content: 'I designed the complete website for **QuickLenders**, a business finance company helping entrepreneurs access funding. The project started with understanding their target audience: business owners seeking loans, equipment financing, or invoice factoring. I created **wireframes** mapping out the user journey from landing page through application. High-fidelity mockups in Figma established the visual identity: professional yet approachable, with clear calls-to-action and trust signals throughout. The responsive design ensures the experience works on desktop, tablet, and mobile. After client approval, I prepared detailed specs and assets for the development team.',
        images: [
          { src: '/images/portfolio/detail/design/lwa-site-1.jpg', alt: 'Website Design Example' },
          { src: '/images/portfolio/detail/design/er-site.png', alt: 'Eternal Royals Website' },
        ],
      },
      {
        heading: 'Product Mockups & Visualization',
        content: 'Beyond website design, I create **2D and 3D product mockups** for marketing materials. Using **Adobe Photoshop** and specialized mockup tools, I produce realistic visualizations showing products in context. For e-commerce, this means room scenes showing wall art in realistic settings, helping customers envision pieces in their own spaces. For product launches, I create packaging mockups, promotional graphics, and social media assets. The goal is always to present products in the most compelling way while remaining honest about what customers will receive. High-quality visuals directly impact conversion rates and customer confidence.',
        bullets: [
          '**Room scene mockups** showing wall art in realistic interior settings',
          '**Product photography enhancement** and background removal',
          '**Packaging design** and 3D box/label mockups',
          '**Social media templates** optimized for different platform dimensions',
          '**Banner and ad creative** for marketing campaigns',
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
    subtitle: 'Meta & Google Ads Management',
    category: 'ecommerce',
    description: 'Managing paid advertising campaigns on Meta (Facebook/Instagram) and Google with focus on positive ROAS through strategic targeting, creative testing, and continuous optimization.',
    sections: [
      {
        heading: 'Ad Campaign Management',
        content: 'I manage paid advertising campaigns on **Meta (Facebook/Instagram)** and **Google Ads** for e-commerce businesses. My approach focuses on sustainable, profitable growth rather than vanity metrics. Every campaign starts with clear goals and KPIs tied to actual business outcomes: **ROAS** (return on ad spend), cost per acquisition, and customer lifetime value. I build campaigns with proper structure: broad awareness at the top of funnel, retargeting for warm audiences, and conversion campaigns for ready-to-buy customers. Creative testing is ongoing, with new ad variations constantly tested against controls. Budget allocation shifts based on performance data, not assumptions.',
        images: [
          { src: '/images/portfolio/detail/ecommerce/paid-ads-cover.png', alt: 'Paid Ads Dashboard' },
          { src: '/images/portfolio/detail/ecommerce/paid-ads-1.png', alt: 'Ad Performance' },
        ],
      },
      {
        heading: 'E-Commerce Results',
        content: 'My combined paid and organic strategies have driven significant sales across multiple platforms. For my own e-commerce brands, I\'ve generated over **$213K in Shopify sales** and approximately **$143K on Etsy**. The Etsy store has accumulated over 315K views, demonstrating strong visibility in the marketplace. What matters most is the efficiency of ad spend. I consistently achieve positive ROAS, meaning every dollar spent on ads generates more than a dollar in revenue. This is accomplished through careful **audience targeting**, creative optimization, and rigorous analysis of which products and campaigns perform best.',
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
        heading: 'Strategic Approach',
        content: 'Long-term success in paid advertising comes from building a **strong overall online presence**, not just throwing money at ads. I integrate paid campaigns with organic SEO, social media content, and email marketing to create multiple touchpoints with potential customers. Product positioning matters: understanding what makes your offering unique and communicating that clearly in ad creative. I analyze performance data constantly, looking for patterns that indicate what\'s working and what isn\'t. The best campaigns are built on deep understanding of the target customer, compelling creative that stops the scroll, and landing pages optimized for conversion.',
      },
    ],
  },
  {
    slug: 'social-media-posts-example',
    title: 'Social Media Content Creation',
    subtitle: 'Graphics, Copy & Engagement',
    category: 'ecommerce',
    description: 'Creating scroll-stopping social media content that builds brand presence, engages audiences, and drives traffic through strategic visual storytelling and platform-specific optimization.',
    sections: [
      {
        heading: 'Content Creation Services',
        content: 'I create social media content designed to **stop the scroll** and drive meaningful engagement. This goes beyond pretty graphics. Every piece of content has a purpose: building brand awareness, educating the audience, entertaining followers, or driving specific actions. I develop content strategies based on platform best practices and audience behavior. Instagram requires different content than LinkedIn or TikTok. Understanding these nuances is critical for performance. My process includes **content calendars**, brand voice guidelines, and consistent visual identity across all posts while maintaining the variety needed to keep feeds interesting.',
        bullets: [
          '**Visual Storytelling**: Eye-catching graphics that communicate brand messages instantly',
          '**Engagement-Driven Content**: Posts designed to spark comments, shares, and saves',
          '**Brand Consistency**: Cohesive look and voice across all platforms',
          '**Platform Optimization**: Content sized and formatted for each network',
          '**Call-to-Action Design**: Clear next steps that drive traffic and conversions',
        ],
      },
      {
        heading: 'Client Work: QuickLenders.com',
        content: 'I created a full suite of social media graphics for **QuickLenders**, a business finance company. The content needed to make complex financial topics accessible and engaging for small business owners. Topics included business funding options, **ESOP funding** explanations, invoice factoring benefits, and credit improvement tips. Each post balanced educational value with brand promotion. The visual style was professional but approachable, using clean layouts, readable typography, and strategic use of color to highlight key information. Content was optimized for both feed posts and stories, maximizing reach across different formats.',
        images: [
          { src: '/images/portfolio/detail/ecommerce/creator-cover.png', alt: 'Creator Cover' },
          { src: '/images/portfolio/detail/ecommerce/creator-2.jpg', alt: 'Content Creation 2' },
          { src: '/images/portfolio/detail/ecommerce/creator-3.jpg', alt: 'Content Creation 3' },
        ],
      },
      {
        heading: 'Educational Content Series',
        content: 'I\'ve developed educational content series that position brands as authorities in their space. The **Social Media Hacks** series shared actionable tips for growing social presence, while **SEO Hacks** taught basic search optimization concepts. This type of content builds trust by providing genuine value before asking for anything in return. Educational posts tend to get saved and shared more than promotional content, extending organic reach. The key is making complex topics digestible without being condescending. Each post should leave the viewer feeling like they learned something useful.',
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
    subtitle: 'Multi-Platform Growth Strategy',
    category: 'ecommerce',
    description: 'Managing social media presence across TikTok, Instagram, Facebook, Pinterest, and more with focus on audience growth, engagement, and driving traffic to e-commerce stores.',
    sections: [
      {
        heading: 'Platform Strategy',
        content: 'I manage social media accounts across multiple platforms with tailored strategies for each. **TikTok** requires short, engaging video content that hooks viewers in the first second. **Instagram** rewards consistent posting and strong visual aesthetics. **Pinterest** functions more like a search engine, requiring keyword-optimized pins and boards. **Facebook** remains valuable for community building and certain demographics. **Reddit** requires authentic participation and value-first content. Rather than posting the same content everywhere, I create platform-native content that works with each algorithm and audience expectation.',
        bullets: [
          '**Content calendar** planning and scheduling across all platforms',
          '**Video creation** optimized for TikTok, Reels, and Shorts formats',
          '**Visual identity** maintained consistently across different networks',
          '**Community management** including comments, DMs, and engagement',
          '**Analytics tracking** with monthly reporting on key metrics',
          '**Trend monitoring** to capitalize on viral moments and formats',
        ],
        images: [
          { src: '/images/portfolio/detail/ecommerce/social-media-management.jpg', alt: 'Social Media Management' },
          { src: '/images/portfolio/detail/ecommerce/tiktok-viral.png', alt: 'TikTok Viral Content' },
        ],
      },
      {
        heading: 'Case Study: The Dope Art Instagram',
        content: 'I grew **The Dope Art Instagram** from zero to over 26,000 followers through strategic content planning and consistent engagement. The growth came from understanding what the target audience wants to see: bold, eye-catching artwork presented in inspiring contexts. I developed content themes, created a consistent posting schedule, and actively engaged with the art community. **User-generated content** from customers showing their purchases built social proof. Behind-the-scenes content humanized the brand. Collaborations with other artists and accounts expanded reach to new audiences. The key was consistency combined with genuine community participation.',
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
        heading: 'Tools & Workflow',
        content: 'Managing multiple accounts efficiently requires the right tools and systems. I use **scheduling tools** like Hootsuite and Facebook Business Suite to batch content creation and ensure consistent posting. **Zapier** automates repetitive tasks like cross-posting and notifications. Platform-native analytics provide insights into what\'s working and what needs adjustment. I track key metrics including follower growth, engagement rate, reach, and most importantly, traffic and conversions driven to the e-commerce stores. Social media should ultimately support business goals, not just accumulate vanity metrics.',
        bullets: [
          '**Hootsuite** for multi-platform scheduling and management',
          '**Facebook Business Suite** for Meta platform management',
          '**Zapier** for automation and workflow optimization',
          '**Canva** for quick graphic creation and templates',
          '**Platform analytics** for performance tracking and optimization',
        ],
      },
    ],
  },
  {
    slug: 'art-design',
    title: 'Digital Art & Design',
    subtitle: 'Original Artwork Collections',
    category: 'art',
    description: 'Creating digital artwork that resonates with entrepreneurs and dreamers, exploring themes of ambition, success, struggle, and triumph through bold visual storytelling.',
    sections: [
      {
        heading: 'The Dope Art Brand',
        content: 'The Dope Art is my primary **digital art brand**, featuring diverse artwork collections that speak to entrepreneurs, hustlers, and dreamers. The pieces explore themes of **ambition**, success, and the entrepreneurial journey. This isn\'t generic wall art. Every piece is designed to inspire and motivate, whether it\'s a roaring lion representing courage, a bull symbolizing market optimism, or abstract expressions of the creative process. The brand has built a loyal following of customers who connect with the message behind the art. Quality printing on premium canvas ensures the digital designs translate into impressive physical products.',
        images: [
          { src: '/images/portfolio/detail/art/tda-site-1.jpg', alt: 'The Dope Art Website' },
          { src: '/images/portfolio/detail/art/tda-site-2.jpg', alt: 'The Dope Art Products' },
        ],
      },
      {
        heading: 'Art Collections',
        content: 'I\'ve developed multiple themed collections, each with its own aesthetic and audience appeal. The **Royalty Collection** features kings, queens, and luxury themes that resonate with those who see themselves as rulers of their domain. The **Wall Street Collection** captures bull and bear market energy for traders and investors. **Surrealism pieces** explore dream-like imagery and abstract concepts. **Money and Finance** artwork speaks directly to wealth mindset and financial ambition. Each collection is curated rather than random, creating cohesive groups that work together in customer spaces.',
        bullets: [
          '**Royalty Collection**: Kings, queens, crowns, and luxury themes',
          '**Wall Street Collection**: Bulls, bears, trading floors, market energy',
          '**Surrealism Series**: Dream-like imagery, abstract concepts, mind-bending visuals',
          '**Money & Finance**: Currency imagery, wealth symbols, success themes',
          '**Animals & Nature**: Powerful creatures, natural beauty, wildlife majesty',
        ],
        images: [
          { src: '/images/portfolio/detail/art/lwa-royalty.jpg', alt: 'Royalty Collection' },
          { src: '/images/portfolio/detail/art/lwa-abstracts.jpg', alt: 'Abstracts Collection' },
          { src: '/images/portfolio/detail/art/moon-boat.jpg', alt: 'Moon Boat Art' },
          { src: '/images/portfolio/detail/art/outrun.jpg', alt: 'Outrun Art' },
        ],
      },
      {
        heading: 'Luxury Wall Art Brand',
        content: 'I also operate **Luxury Wall Art**, a second brand with a different positioning. While The Dope Art has a bolder, more streetwear-influenced aesthetic, Luxury Wall Art targets customers seeking elegant, sophisticated pieces for upscale spaces. This brand incorporates **AI-integrated art creation**, demonstrating how technology can enhance rather than replace artistic vision. The AI tools help generate initial concepts and variations, but human curation and refinement ensure quality and coherence. Running two brands in the same space provides valuable data on different customer segments and marketing approaches.',
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
    title: 'Publications & Collaborations',
    subtitle: 'Press Coverage & Brand Partnerships',
    category: 'art',
    description: 'Featured publications, media coverage, and brand collaborations that have expanded reach and established credibility in the digital art space.',
    sections: [
      {
        heading: 'Tiger King Comic Book Cover',
        content: 'When **Tiger King** became a cultural phenomenon in 2020, I recognized an opportunity to create relevant art while the moment was hot. I partnered with **TidalWave Productions**, a comic book publisher known for biographical and pop culture titles. My artwork was used as variant cover art for their Tiger King comic book series. The project gained media attention from **TMZ** and other entertainment outlets, exposing my work to audiences far beyond the typical art collector community. This collaboration demonstrated the value of timing, trend awareness, and proactive outreach in building an art career.',
        images: [
          { src: '/images/portfolio/detail/art/tiger-king-cover.jpg', alt: 'Tiger King Comic Art' },
          { src: '/images/portfolio/detail/art/tiger-king-pics.jpg', alt: 'Tiger King Pics' },
          { src: '/images/portfolio/detail/art/tiger-king-site.jpg', alt: 'Tiger King Site' },
        ],
      },
      {
        heading: 'ShoutOut LA Feature',
        content: 'I was featured in **ShoutOut LA**, a publication highlighting entrepreneurs and creatives in the Los Angeles area. The interview covered my journey building The Dope Art, the challenges of running an art business, and my approach to balancing creativity with commerce. Being featured in publications like this builds credibility and provides social proof that helps in conversations with potential partners, collectors, and collaborators. It also drives traffic and awareness to the brand. I actively pursue media coverage as part of my overall marketing strategy, not waiting for journalists to find me.',
        images: [
          { src: '/images/portfolio/detail/art/shoutout-la.jpg', alt: 'ShoutOut LA Feature' },
        ],
      },
      {
        heading: 'Brand Collaborations',
        content: 'I\'ve partnered with various brands and events in the art and NFT space. At **NFT LA 2022**, I collaborated with Jondo Prints on an interactive booth where attendees could engage with digital art displays and physical prints. The **Wall Street Prints** partnership focused on bull and bear market artwork, combining my designs with their printing and distribution capabilities. These collaborations expand reach to new audiences, provide learning opportunities, and often generate revenue that would be difficult to achieve solo. I actively seek partnerships where both parties benefit and the collaboration feels authentic to my brand.',
        bullets: [
          '**NFT LA 2022**: Interactive booth collaboration with Jondo Prints',
          '**Wall Street Prints**: Bull and bear artwork licensing partnership',
          '**TidalWave Productions**: Tiger King comic book cover art',
          '**Various galleries**: Digital art displays and exhibitions',
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
    description: 'Bridging digital art with blockchain technology through the Eternal Royals NFT collection, combining on-chain ownership with physical canvas prints and real-world utility.',
    sections: [
      {
        heading: 'The Eternal Royals Project',
        content: 'Eternal Royals is a collection of **9,224 unique Kings and Queens** NFTs that bridges digital art with physical products. Unlike many NFT projects focused purely on speculation, Eternal Royals was built around **real utility**: holders receive access to limited edition art drops, invitations to IRL and virtual events, and the ability to order **1-of-1 canvas prints** of their specific NFT. The artwork features detailed, regal characters with hundreds of unique traits and combinations. Each piece was crafted to work both as a digital collectible and a striking physical print that owners would proudly display.',
        images: [
          { src: '/images/portfolio/detail/art/er-cover.jpg', alt: 'Eternal Royals Collection' },
          { src: '/images/portfolio/detail/art/er-king.jpg', alt: 'Eternal Royals King' },
          { src: '/images/portfolio/detail/art/er-queen.jpg', alt: 'Eternal Royals Queen' },
        ],
      },
      {
        heading: 'Sales & Market Performance',
        content: 'The collection achieved significant success in both primary and secondary markets. Primary sales exceeded **$2 million**, with the collection selling out during the initial mint. Secondary trading volume also surpassed **$2 million** on OpenSea, demonstrating sustained interest beyond the initial launch. The project incorporated innovative features including **NFC chips** embedded in physical prints that link to the blockchain record, verifying authenticity. This combination of digital ownership with physical collectibles represented a new model for how NFTs could provide tangible value beyond speculation.',
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
        heading: 'Eternal Guardians (Unreleased)',
        content: 'Following Eternal Royals, I developed **Eternal Guardians**, an ambitious collection representing six months of intensive work. Using advanced **Photoshop** techniques and photo manipulation, I created artwork featuring over 400 distinct traits with interconnected storylines. Each Guardian was designed to work individually while also fitting into a larger narrative universe. The collection pushed the boundaries of what\'s possible with generative art, maintaining artistic coherence across thousands of unique combinations. While market conditions led to pausing the launch, the project demonstrated advanced technical and artistic capabilities in the NFT space.',
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
