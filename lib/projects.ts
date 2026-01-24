export interface Project {
  slug: string;
  title: string;
  description: string;
  category: 'employment' | 'personal' | 'freelance' | 'tool';
  featured?: boolean;
  url?: string;
  metrics?: { label: string; value: string }[];
  tags: string[];
  content: {
    overview: string;
    challenge?: string;
    solution?: string;
    results?: string[];
    tools?: string[];
  };
}

export const projects: Project[] = [
  {
    slug: 'quality-sewing',
    title: 'Quality Sewing',
    description: 'Running e-commerce for a family sewing retailer. 5K+ products, $2M+/year in sales.',
    category: 'employment',
    featured: true,
    url: 'https://qualitysewing.com',
    metrics: [
      { label: 'Annual Revenue', value: '$2M+' },
      { label: 'Products', value: '5,000+' },
      { label: 'Organic Growth', value: '5K→22K' },
      { label: 'Tools Built', value: '10+' },
    ],
    tags: ['Shopify', 'SEO', 'E-commerce', 'Multi-channel'],
    content: {
      overview: 'Quality Sewing sells sewing machines, fabric, and quilting supplies. Family-owned since 1985, based in Oregon. I run the e-commerce side: product listings, SEO, conversion optimization, marketplace expansion.',
      challenge: 'When I joined, organic traffic sat around 5K visitors/month. Most sales came from paid ads. Returns on that spend were declining, and there was no real SEO strategy in place.',
      solution: 'I flipped the approach. Built 10+ quilting calculators (backing, binding, borders) that actually help customers and rank well. Fixed technical SEO issues. Rewrote product pages. Created content that quilters actually search for.',
      results: [
        'Organic traffic went from 5K to 22K monthly',
        'Cut ad spend significantly, revenue stayed flat',
        '10+ interactive tools now drive traffic and engagement',
        'Conversion rate up through UI/UX changes',
        'Now selling on Amazon, Walmart, and TikTok Shop too',
      ],
      tools: ['Shopify', 'Google Analytics', 'Ahrefs', 'Amazon', 'Walmart', 'TikTok Shop'],
    },
  },
  {
    slug: 'masterpieces',
    title: 'Masterpiece Locator',
    description: 'A tool I built to find famous paintings in museums. 4,094 paintings, 455 museums.',
    category: 'tool',
    featured: true,
    url: 'https://luxurywallart.com/apps/masterpieces',
    metrics: [
      { label: 'Paintings', value: '4,094' },
      { label: 'Museums', value: '455+' },
      { label: 'Years of Art', value: '600' },
      { label: 'Updated', value: 'Weekly' },
    ],
    tags: ['Full-Stack', 'Database', 'SEO', 'Tool Building'],
    content: {
      overview: 'Ever wanted to know where a famous painting actually is? I built this to answer that. Search by painting, artist, or museum. Browse by era. Find out that Rembrandt has 225 works across dozens of museums.',
      challenge: 'Needed something that would drive organic traffic to my art store. Also just thought it would be cool to have a searchable database of famous paintings.',
      solution: 'Built a full database with artworks, artists, museums, and movements all linked together. Users can search or browse. Each artist, museum, and era gets its own SEO-optimized page.',
      results: [
        '4,094 paintings indexed from museums worldwide',
        'Search by artwork, artist, or museum',
        'Browse by Renaissance, Baroque, 19th Century, Modern',
        'Each page ranks for relevant art queries',
        'Ties into the e-commerce store for canvas prints',
      ],
      tools: ['Shopify', 'JavaScript', 'Database Design', 'SEO'],
    },
  },
  {
    slug: 'luxury-wall-art',
    title: 'Luxury Wall Art',
    description: 'My side project. Canvas art on Shopify and Etsy. $120K in sales from scratch.',
    category: 'personal',
    featured: true,
    url: 'https://luxurywallart.com',
    metrics: [
      { label: 'Total Revenue', value: '$120K' },
      { label: 'Shopify', value: '$67K' },
      { label: 'Etsy', value: '$53K' },
      { label: 'Keywords', value: '9,200' },
    ],
    tags: ['Shopify', 'Etsy', 'SEO', 'Paid Ads'],
    content: {
      overview: 'Canvas art store I started as a side project. Sells on both Shopify and Etsy. Thousands of products, mostly created with AI-assisted workflows to keep it manageable solo.',
      challenge: 'Starting with zero audience, zero domain authority, zero everything. Competitive market. Had to build the catalog and the traffic at the same time.',
      solution: 'Multi-channel approach: SEO for long-term, paid ads for quick wins, Etsy marketplace for built-in traffic. Built the Masterpiece Locator specifically to drive organic visitors.',
      results: [
        '$120K in sales total ($67K Shopify, $53K Etsy)',
        'Keywords went from 0 to 9,200',
        'Domain Authority from 1 to 20',
        '2.84 ROAS on paid ads',
        '3,000+ products listed',
        '80K+ views on Etsy',
      ],
      tools: ['Shopify', 'Etsy', 'Google Ads', 'Meta Ads', 'Ahrefs', 'AI Tools'],
    },
  },
  {
    slug: 'the-dope-art',
    title: 'The Dope Art',
    description: 'Another canvas art brand. This one focuses more on social, less on SEO.',
    category: 'personal',
    url: 'https://thedopeart.com',
    metrics: [
      { label: 'Keywords', value: '8,000' },
      { label: 'Monthly Traffic', value: '5,437' },
      { label: 'Pinterest Views', value: '1.6M/mo' },
      { label: 'TikTok Views', value: '150K+' },
    ],
    tags: ['Shopify', 'Social Media', 'SEO', 'Content'],
    content: {
      overview: 'My second art brand. Bolder, more eye-catching stuff. This one leans heavier into social media than SEO. Younger audience.',
      challenge: 'Needed to be different from Luxury Wall Art. Different vibe, different channels, different customers.',
      solution: 'Heavy focus on TikTok and Pinterest. Original digital artwork. Print-on-demand keeps operations simple.',
      results: [
        'Keywords grew from 300 to 8,000',
        '5,437 monthly organic visitors',
        '1.6M Pinterest views per month',
        '150K+ views on TikTok content',
        'Active social community',
      ],
      tools: ['Shopify', 'TikTok', 'Pinterest', 'Instagram', 'Canva'],
    },
  },
  {
    slug: 'rocky-mountain-steel',
    title: 'Rocky Mountain Steel',
    description: 'Branding and marketing materials for a steel fabrication company in Colorado.',
    category: 'freelance',
    metrics: [
      { label: 'Deliverables', value: '5+' },
      { label: 'Industry', value: 'B2B Steel' },
    ],
    tags: ['Branding', 'Design', 'B2B', 'Marketing'],
    content: {
      overview: 'Full branding package for a steel fabrication company. Company profile, service descriptions, case study layouts, the works.',
      challenge: 'Make industrial services look good on paper. B2B clients still need to be sold.',
      solution: 'Designed everything from scratch: company profile brochure, service descriptions with visuals, case studies, marketing collateral.',
      results: [
        'Company profile/brochure',
        'Service descriptions with infographics',
        'Case study layouts',
        '"Why Choose Us" materials',
        'Project types overview',
      ],
      tools: ['Photoshop', 'Canva', 'InDesign'],
    },
  },
  {
    slug: 'american-nutriceuticals',
    title: 'American Nutriceuticals',
    description: 'Ongoing freelance work. SEO, graphic design, 3D mockups for a supplements brand.',
    category: 'freelance',
    url: 'https://amnutri.com',
    metrics: [
      { label: 'Industry', value: 'Health/Pharma' },
      { label: 'Services', value: 'SEO, Design, 3D' },
    ],
    tags: ['SEO', 'Design', '3D Mockups', 'Health'],
    content: {
      overview: 'Health supplements brand. I handle their SEO strategy, all graphic design, and create 3D product mockups for marketing.',
      challenge: 'Health industry is regulated. Content needs to be accurate while still ranking.',
      solution: 'Keyword research to find what people actually search for. Write content that answers those queries. Design everything visual for the brand.',
      results: [
        'Keyword research for health/wellness topics',
        'Blog articles (vitamins, mood support, etc.)',
        'All graphic design assets',
        '3D product mockups for marketing',
        'Topic clusters for SEO',
      ],
      tools: ['Ahrefs', 'Photoshop', 'Figma', '3D Software'],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((p) => p.category === category);
}
