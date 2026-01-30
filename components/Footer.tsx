import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-[#d4a847]/10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Row: Logo + Nav Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logos/dj-logo-176.png"
                alt="DJ Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <p className="text-white font-semibold text-lg">Jesse Johnson</p>
            </div>
            <p className="text-gray-400 text-sm mt-2">Seattle, WA</p>
            <p className="text-gray-500 text-sm mt-1">E-commerce Manager &amp; Growth Specialist</p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-[#d4a847] font-semibold text-sm uppercase tracking-wider mb-4">Pages</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors text-sm">Portfolio</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">Services</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h4 className="text-[#d4a847] font-semibold text-sm uppercase tracking-wider mb-4">Portfolio</h4>
            <ul className="space-y-2">
              <li><Link href="/portfolio/organic-seo-growth" className="text-gray-400 hover:text-white transition-colors text-sm">SEO Growth</Link></li>
              <li><Link href="/portfolio/figma-design" className="text-gray-400 hover:text-white transition-colors text-sm">Figma Designs</Link></li>
              <li><Link href="/portfolio/paid-sm-marketing" className="text-gray-400 hover:text-white transition-colors text-sm">Paid Marketing</Link></li>
              <li><Link href="/portfolio/art-design" className="text-gray-400 hover:text-white transition-colors text-sm">Digital Art</Link></li>
              <li><Link href="/portfolio/company-profile" className="text-gray-400 hover:text-white transition-colors text-sm">Company Profiles</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-[#d4a847] font-semibold text-sm uppercase tracking-wider mb-4">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tools" className="text-gray-400 hover:text-white transition-colors text-sm">All Tools</Link></li>
              <li><Link href="/tools/seo/internal-link-finder" className="text-gray-400 hover:text-white transition-colors text-sm">Internal Link Finder</Link></li>
              <li><Link href="/tools/seo/affiliate-opportunity-finder" className="text-gray-400 hover:text-white transition-colors text-sm">Affiliate Finder</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[#d4a847] font-semibold text-sm uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.linkedin.com/in/digitaljesse/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:jesse@digitaljesse.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  jesse@digitaljesse.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-[#d4a847]/10">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Jesse Johnson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
