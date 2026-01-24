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
    description: 'E-commerce Manager driving $2M+/year in revenue for a family-owned sewing retailer since 1985.',
    category: 'employment',
    featured: true,
    url: 'https://qualitysewing.com',
    metrics: [
      { label: 'Annual Revenue', value: '$2M+' },
      { label: 'Products Managed', value: '5,000+' },
      { label: 'Traffic Growth', value: '340%' },
      { label: 'Tools Built', value: '10+' },
    ],
    tags: ['Shopify', 'SEO', 'E-commerce', 'Multi-channel'],
    content: {
      overview: 'I manage all e-commerce operations for Quality Sewing, a family-owned sewing and quilting retailer based in Oregon. The company has been in business since 1985 and sells sewing machines, fabric, and quilting supplies.',
      challenge: 'When I started, the business relied heavily on paid advertising with diminishing returns. Organic traffic was stagnant at around 5,000 monthly visitors, and there was no systematic approach to SEO or content marketing.',
      solution: 'I led a strategic shift from paid ads to organic growth. This included building 10+ interactive calculators for quilters (backing, binding, border calculators), implementing technical SEO fixes, optimizing product pages, and creating valuable content that ranks for sewing-related queries.',
      results: [
        'Grew organic traffic from 5K to 22K monthly (340% increase)',
        'Dramatically reduced ad spend while maintaining revenue',
        'Built 10+ interactive tools that drive engagement and SEO',
        'Improved conversion rate through UI/UX optimizations',
        'Streamlined internal processes for efficiency',
        'Expanded to Amazon, Walmart, and TikTok Shop',
      ],
      tools: ['Shopify', 'Google Analytics', 'Ahrefs', 'Amazon Seller Central', 'Walmart Marketplace', 'TikTok Shop'],
    },
  },
  {
    slug: 'masterpieces',
    title: 'Masterpiece Locator',
    description: 'Full art discovery platform with 4,094+ paintings across 455+ museums worldwide.',
    category: 'tool',
    featured: true,
    url: 'https://luxurywallart.com/apps/masterpieces',
    metrics: [
      { label: 'Paintings Indexed', value: '4,094+' },
      { label: 'Museums', value: '455+' },
      { label: 'Years of Art History', value: '600' },
      { label: 'Updated', value: 'Weekly' },
    ],
    tags: ['Full-Stack', 'Database', 'SEO', 'Tool Building'],
    content: {
      overview: 'Masterpiece Locator is a comprehensive art discovery platform I built to help art enthusiasts find famous paintings and their museum locations. It features a searchable database of over 4,000 paintings across 455 museums worldwide.',
      challenge: 'I wanted to create a valuable resource for art lovers that would also drive organic traffic to my e-commerce store. The challenge was building a scalable database architecture that could handle thousands of artworks while remaining fast and user-friendly.',
      solution: 'I designed and built a full-stack application with a structured database for artworks, artists, museums, and art movements. Users can search by artwork name, artist, or museum, and browse by era (Renaissance, Baroque, 19th Century, Modern) or art movement.',
      results: [
        'Indexed 4,094+ paintings from major museums worldwide',
        'Built comprehensive search and filter functionality',
        'Featured artists with work counts (Rembrandt: 225, Monet: 167)',
        'SEO-optimized pages for each artist, museum, and era',
        'Integrated with e-commerce for canvas print sales',
      ],
      tools: ['Shopify', 'JavaScript', 'Database Design', 'SEO'],
    },
  },
  {
    slug: 'luxury-wall-art',
    title: 'Luxury Wall Art',
    description: 'Built and scaled a Shopify + Etsy art store from zero to $120K in revenue.',
    category: 'personal',
    featured: true,
    url: 'https://luxurywallart.com',
    metrics: [
      { label: 'Total Revenue', value: '$120K' },
      { label: 'Shopify Revenue', value: '$67K' },
      { label: 'Etsy Revenue', value: '$53K' },
      { label: 'Keywords Ranking', value: '9,200' },
    ],
    tags: ['Shopify', 'Etsy', 'SEO', 'Paid Ads'],
    content: {
      overview: 'Luxury Wall Art is my personal canvas art brand that I built from scratch. The store sells premium wall art across Shopify and Etsy, featuring thousands of products created with AI-assisted workflows.',
      challenge: 'Starting from zero in a competitive market with no existing audience or domain authority. Needed to build both product catalog and organic traffic simultaneously.',
      solution: 'I implemented a multi-channel strategy combining SEO, paid advertising, and marketplace optimization. Built the Masterpiece Locator tool specifically to drive organic traffic. Used AI tools to efficiently create and optimize product listings.',
      results: [
        '$120K total revenue ($67K Shopify, $53K Etsy)',
        'Grew keywords from 0 to 9,200',
        'Built Domain Authority from 1 to 20',
        '2.84 ROAS on paid advertising',
        '3,000+ products in catalog',
        '80K+ Etsy views, 44K+ visits',
      ],
      tools: ['Shopify', 'Etsy', 'Google Ads', 'Meta Ads', 'Ahrefs', 'AI Tools'],
    },
  },
  {
    slug: 'the-dope-art',
    title: 'The Dope Art',
    description: 'Custom canvas print brand with strong social following and SEO growth.',
    category: 'personal',
    url: 'https://thedopeart.com',
    metrics: [
      { label: 'Keywords Ranking', value: '8,000' },
      { label: 'Monthly Traffic', value: '5,437' },
      { label: 'Pinterest Views', value: '1.6M/mo' },
      { label: 'TikTok Views', value: '150K+' },
    ],
    tags: ['Shopify', 'Social Media', 'SEO', 'Content'],
    content: {
      overview: 'The Dope Art is my second e-commerce brand focused on bold, eye-catching canvas prints. This brand emphasizes social media growth and community building alongside organic search.',
      challenge: 'Differentiate from Luxury Wall Art while building a distinct brand identity. Focus on younger demographics through social channels.',
      solution: 'Built a strong presence on TikTok, Pinterest, and Instagram. Created original digital artwork and leveraged print-on-demand fulfillment for efficient operations.',
      results: [
        'Grew keywords from 300 to 8,000',
        'Monthly organic traffic of 5,437+',
        '1.6M monthly Pinterest views',
        '150K+ TikTok content views',
        'Built engaged social community',
      ],
      tools: ['Shopify', 'TikTok', 'Pinterest', 'Instagram', 'Canva'],
    },
  },
  {
    slug: 'rocky-mountain-steel',
    title: 'Rocky Mountain Steel',
    description: 'Complete branding and marketing package for a Colorado steel fabrication company.',
    category: 'freelance',
    metrics: [
      { label: 'Deliverables', value: '5+' },
      { label: 'Industry', value: 'B2B Steel' },
    ],
    tags: ['Branding', 'Design', 'B2B', 'Marketing'],
    content: {
      overview: 'I created a complete branding and marketing package for Rocky Mountain Steel, a steel fabrication company in Colorado.',
      challenge: 'Translate complex industrial services into clear, professional marketing materials that appeal to B2B clients.',
      solution: 'Designed a comprehensive company profile with infographics, service descriptions, case studies, and marketing collateral.',
      results: [
        'Created full company profile/brochure',
        'Designed service descriptions with visuals',
        'Built case study layouts',
        'Produced "Why Choose Us" marketing materials',
        'Delivered project types overview',
      ],
      tools: ['Photoshop', 'Canva', 'InDesign'],
    },
  },
  {
    slug: 'american-nutriceuticals',
    title: 'American Nutriceuticals',
    description: 'SEO content strategy, graphic design, and 3D product mockups for a health supplements brand.',
    category: 'freelance',
    url: 'https://amnutri.com',
    metrics: [
      { label: 'Industry', value: 'Health/Pharma' },
      { label: 'Services', value: 'SEO, Design, 3D' },
    ],
    tags: ['SEO', 'Design', '3D Mockups', 'Health'],
    content: {
      overview: 'I provide ongoing freelance services for American Nutriceuticals, a health supplements brand. My work spans SEO content strategy, graphic design, and 3D product visualizations.',
      challenge: 'Create content for a regulated health industry while maintaining SEO best practices and brand consistency.',
      solution: 'Built a data-driven content strategy with keyword research, wrote health blog articles, and created all graphic design and 3D product mockups for marketing materials.',
      results: [
        'Keyword research for health/wellness niche',
        'Blog content creation (mood stabilizers, vitamins, etc.)',
        'All graphic design for the brand',
        '3D product mockups and visualizations',
        'Topic clusters for organic traffic growth',
      ],
      tools: ['Ahrefs', 'Photoshop', 'Figma', '3D Modeling'],
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
