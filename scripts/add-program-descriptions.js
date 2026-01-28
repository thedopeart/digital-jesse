#!/usr/bin/env node
/**
 * Add short descriptions to affiliate programs
 */

const fs = require('fs');
const path = require('path');

const DESCRIPTIONS = {
  // E-commerce platforms
  'Shopify': 'Leading e-commerce platform for building online stores. Powers over 4 million businesses worldwide.',
  'BigCommerce': 'Enterprise e-commerce platform with built-in SEO, multi-channel selling, and B2B features.',
  'WooCommerce': 'Free WordPress plugin that turns any website into a full e-commerce store.',
  'Squarespace': 'All-in-one website builder with beautiful templates and built-in e-commerce.',
  'Etsy': 'Marketplace for handmade, vintage, and unique goods. Great for crafters and artists.',

  // Website builders
  'Wix': 'Drag-and-drop website builder with AI-powered design tools and app market.',
  'Webflow': 'Visual web design tool that generates clean code. Popular with designers.',
  'Framer': 'Interactive design tool with production-ready publishing features.',
  'Carrd': 'Simple one-page site builder. Perfect for landing pages and portfolios.',
  'WordPress.com': 'Hosted WordPress platform with managed hosting and security.',
  'Ghost': 'Modern publishing platform focused on newsletters and memberships.',

  // Email marketing
  'ConvertKit': 'Email marketing for creators. Built for bloggers, podcasters, and YouTubers.',
  'Mailchimp': 'Popular email marketing platform with free tier and automation features.',
  'ActiveCampaign': 'Advanced email marketing with CRM and sales automation.',
  'Beehiiv': 'Newsletter platform built for growth. Used by major publications.',
  'GetResponse': 'Email marketing with landing pages, webinars, and automation.',
  'AWeber': 'Email marketing since 1998. Simple and reliable for small businesses.',
  'Drip': 'E-commerce email marketing with advanced segmentation and automation.',
  'Klaviyo': 'Email and SMS marketing built specifically for e-commerce brands.',
  'MailerLite': 'Affordable email marketing with a generous free plan.',
  'Constant Contact': 'Email marketing for small businesses with event management tools.',
  'Brevo': 'Email and SMS marketing platform (formerly Sendinblue).',

  // SEO tools
  'Ahrefs': 'All-in-one SEO toolset for backlink analysis, keyword research, and site audits.',
  'Semrush': 'Comprehensive digital marketing suite with SEO, PPC, and content tools.',
  'Moz Pro': 'SEO software with keyword research, link building, and site audits.',
  'Surfer SEO': 'Content optimization tool that helps you rank higher with data-driven recommendations.',
  'Mangools': 'Affordable SEO tools including KWFinder for keyword research.',
  'SE Ranking': 'All-in-one SEO platform for agencies and businesses.',
  'Serpstat': 'Growth hacking tool for SEO, PPC, and content marketing.',
  'Ubersuggest': 'Free SEO tool by Neil Patel for keyword research and site audits.',
  'SpyFu': 'Competitor research tool for SEO and PPC campaigns.',

  // Hosting
  'Bluehost': 'WordPress-recommended hosting with free domain and SSL.',
  'SiteGround': 'Premium web hosting with excellent support and speed.',
  'Hostinger': 'Affordable hosting with good performance for beginners.',
  'Cloudways': 'Managed cloud hosting on AWS, Google Cloud, and DigitalOcean.',
  'WP Engine': 'Premium managed WordPress hosting for businesses.',
  'Kinsta': 'High-performance managed WordPress hosting on Google Cloud.',
  'A2 Hosting': 'Fast hosting with turbo servers and developer-friendly features.',
  'DreamHost': 'Reliable hosting with strong privacy focus and WordPress support.',
  'DigitalOcean': 'Cloud infrastructure for developers. Simple and scalable.',
  'Vultr': 'Cloud compute with data centers worldwide. Developer-focused.',
  'Linode': 'Cloud hosting platform for developers and businesses.',

  // Design tools
  'Canva': 'Easy graphic design tool for social media, presentations, and marketing materials.',
  'Figma': 'Collaborative design tool for UI/UX design and prototyping.',
  'Adobe Creative Cloud': 'Industry-standard creative software including Photoshop and Illustrator.',
  'Envato Elements': 'Unlimited downloads of templates, graphics, and stock assets.',
  'Creative Market': 'Marketplace for design assets, fonts, and templates.',
  'Placeit': 'Mockup generator and logo maker for quick branded visuals.',

  // Project management
  'Notion': 'All-in-one workspace for notes, docs, wikis, and project management.',
  'ClickUp': 'Project management platform with docs, goals, and time tracking.',
  'Monday.com': 'Work management platform for teams of all sizes.',
  'Asana': 'Project and task management for teams.',
  'Basecamp': 'Simple project management and team communication.',
  'Trello': 'Visual project management with kanban boards.',
  'Todoist': 'Task management app for personal productivity.',
  'Airtable': 'Spreadsheet-database hybrid for organizing anything.',

  // CRM and sales
  'HubSpot': 'CRM platform with marketing, sales, and service tools.',
  'Salesforce': 'Enterprise CRM and business software platform.',
  'Pipedrive': 'Sales CRM designed by salespeople for salespeople.',
  'Close': 'CRM built for inside sales teams with calling and email.',
  'Freshsales': 'AI-powered CRM for high-velocity sales teams.',

  // Analytics
  'Hotjar': 'Heatmaps and session recordings to understand user behavior.',
  'Mixpanel': 'Product analytics for user behavior and conversion tracking.',
  'Amplitude': 'Digital analytics platform for product intelligence.',
  'Heap': 'Automatic event tracking for product analytics.',

  // Customer support
  'Zendesk': 'Customer service software with ticketing and live chat.',
  'Intercom': 'Customer messaging platform with live chat and bots.',
  'Freshdesk': 'Helpdesk software with ticketing and automation.',
  'Help Scout': 'Customer support platform built for growing teams.',
  'Crisp': 'Customer messaging platform with live chat, chatbot, and CRM.',
  'Drift': 'Conversational marketing platform with chatbots.',
  'LiveChat': 'Live chat software for customer service and sales.',

  // Automation
  'Zapier': 'Connect apps and automate workflows without code.',
  'Make': 'Visual automation platform (formerly Integromat).',

  // Learning platforms
  'Teachable': 'Create and sell online courses with no technical skills.',
  'Thinkific': 'All-in-one platform to create and sell online courses.',
  'Kajabi': 'All-in-one platform for courses, memberships, and coaching.',
  'Skillshare': 'Online learning community for creative skills.',
  'Coursera': 'Online courses from universities and companies.',
  'Udemy': 'Marketplace for online courses on any topic.',
  'LinkedIn Learning': 'Professional courses for career development.',
  'MasterClass': 'Celebrity-taught classes in various fields.',
  'Domestika': 'Creative courses taught by industry professionals.',

  // Finance
  'QuickBooks': 'Accounting software for small businesses.',
  'FreshBooks': 'Invoicing and accounting for freelancers and small businesses.',
  'Wave': 'Free accounting software for small businesses.',
  'Xero': 'Cloud-based accounting for small businesses.',
  'Gusto': 'Payroll and HR for small businesses.',

  // Legal
  'LegalZoom': 'Online legal services for businesses and individuals.',
  'Rocket Lawyer': 'Legal documents and attorney consultations online.',
  'Incfile': 'LLC and corporation formation services.',

  // VPN and security
  'NordVPN': 'Popular VPN service with strong security features.',
  'ExpressVPN': 'Fast VPN with servers in 94 countries.',
  'Surfshark': 'Affordable VPN with unlimited device connections.',
  'Private Internet Access': 'VPN with strong privacy focus.',
  'CyberGhost': 'User-friendly VPN for streaming and privacy.',
  'Dashlane': 'Password manager with dark web monitoring.',
  '1Password': 'Password manager for families and businesses.',
  'LastPass': 'Popular password manager with free tier.',
  'Bitwarden': 'Open-source password manager.',

  // Stock media
  'Shutterstock': 'Stock photos, vectors, and videos for any project.',
  'Adobe Stock': 'Premium stock content integrated with Creative Cloud.',
  'iStock': 'Stock photos and videos by Getty Images.',
  'Depositphotos': 'Stock photos, vectors, and videos at competitive prices.',
  'Envato Elements': 'Unlimited stock assets with one subscription.',

  // Writing tools
  'Grammarly': 'AI writing assistant for grammar, spelling, and style.',
  'ProWritingAid': 'Writing software with style and grammar checking.',
  'Jasper': 'AI writing tool for marketing content.',
  'Copy.ai': 'AI copywriting for ads, emails, and social posts.',
  'Writesonic': 'AI writer for blogs, ads, and product descriptions.',
  'Surfer SEO': 'Content optimization for better search rankings.',

  // Travel
  'Booking.com': 'Travel booking for hotels, flights, and car rentals.',
  'Expedia': 'Travel booking with package deals and rewards.',
  'Hotels.com': 'Hotel booking with rewards program.',
  'Airbnb': 'Vacation rentals and unique accommodations.',
  'VRBO': 'Vacation home rentals for families and groups.',
  'TripAdvisor': 'Travel reviews and booking for hotels and attractions.',
  'Kayak': 'Travel search engine for flights, hotels, and cars.',
  'Skyscanner': 'Flight search engine with price alerts.',
  'Viator': 'Tours and activities booking worldwide.',
  'GetYourGuide': 'Book tours, attractions, and activities.',

  // Art and home decor
  'Saatchi Art': 'Online gallery for original contemporary art. Curated collection from artists worldwide.',
  'Society6': 'Artist-designed products from wall art to home decor and apparel.',
  'Fine Art America': 'Marketplace for art prints, wall art, and home decor.',
  'Minted': 'Curated art prints and home decor from independent artists.',
  'Artfinder': 'Original art directly from artists. Unique paintings and sculptures.',
  'Framebridge': 'Custom framing made easy. Upload any image for professional framing.',
  'iCanvas': 'Canvas prints of famous artworks and contemporary designs.',
  'Artsy': 'Online art marketplace for collecting and discovering art.',
  'Zazzle': 'Create and sell custom products with your designs.',
  'AllPosters': 'Art prints, posters, and framed art for every taste.',
  'Desenio': 'Scandinavian-style art prints and frames.',
  'Juniper Print Shop': 'Vintage-inspired art prints for modern homes.',
  'Blick Art Materials': 'Art supplies and materials for all skill levels.',
  'Jerry\'s Artarama': 'Discount art supplies for artists and crafters.',
  'Wayfair': 'Online home goods and furniture with huge selection.',
  'Pottery Barn': 'Classic home furnishings and decor.',
  'West Elm': 'Modern furniture and home decor with sustainable options.',
  'CB2': 'Modern furniture and decor by Crate & Barrel.',
  'Crate & Barrel': 'Contemporary furniture and home accessories.',
  'Williams Sonoma': 'Premium cookware and kitchen supplies.',
  'Anthropologie': 'Bohemian clothing, accessories, and home decor.',
  'World Market': 'Unique global-inspired furniture and decor.',
  'Havenly': 'Online interior design service with professional designers.',

  // Print on demand
  'Printful': 'Print-on-demand and dropshipping for custom products.',
  'Printify': 'Print-on-demand platform with global production network.',
  'Redbubble': 'Marketplace for independent artists to sell their designs.',
  'TeeSpring': 'Create and sell custom merchandise with no upfront costs.',
  'SPOD': 'Fast print-on-demand for Shopify and e-commerce stores.',
  'Gooten': 'Print-on-demand with global manufacturing network.',

  // Dating/relationships
  'eHarmony': 'Dating site focused on long-term relationships.',
  'Match.com': 'Dating site with millions of active users.',
  'Bumble': 'Dating app where women make the first move.',
  'Hinge': 'Dating app designed to be deleted. Relationship-focused.',
  'Tinder': 'Popular dating app for meeting new people.',
  'OkCupid': 'Dating app with personality-based matching.',
  'Zoosk': 'AI-powered dating app for all ages.',
  'Christian Mingle': 'Dating site for Christian singles.',
  'JDate': 'Dating site for Jewish singles.',
  'EliteSingles': 'Dating for educated professionals.',
  'Silver Singles': 'Dating site for 50+ singles.',

  // Fitness and health
  'Peloton': 'Connected fitness with bikes, treadmills, and classes.',
  'Noom': 'Psychology-based weight loss program.',
  'MyFitnessPal': 'Calorie counting and diet tracking app.',
  'Headspace': 'Meditation and mindfulness app.',
  'Calm': 'Sleep and meditation app.',
  'Fitbit': 'Fitness trackers and health monitoring devices.',
  'Whoop': 'Advanced fitness and sleep tracking wearable.',
  'Tonal': 'Smart home gym with AI-powered strength training.',
  'Mirror': 'Interactive home workout mirror.',
  'Obe Fitness': 'Live and on-demand fitness classes.',

  // Food and meal kits
  'HelloFresh': 'Meal kit delivery with easy recipes.',
  'Blue Apron': 'Meal kits with chef-designed recipes.',
  'Home Chef': 'Flexible meal kits with customization options.',
  'Factor': 'Prepared meal delivery for healthy eating.',
  'Daily Harvest': 'Plant-based frozen meals and smoothies.',
  'Thrive Market': 'Online organic grocery store with membership.',
  'Butcher Box': 'Grass-fed beef and organic meat delivery.',
  'Wine.com': 'Online wine retailer with expert recommendations.',
};

const filePath = path.join(__dirname, '..', 'data', 'affiliate-programs.json');
const programs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

let updated = 0;
for (const program of programs) {
  if (DESCRIPTIONS[program.brand] && !program.description) {
    program.description = DESCRIPTIONS[program.brand];
    updated++;
  }
}

fs.writeFileSync(filePath, JSON.stringify(programs, null, 2));
console.log(`Updated ${updated} programs with descriptions`);
