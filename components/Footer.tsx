import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#d4a847]/10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a847] to-[#cd7f32] flex items-center justify-center">
                <span className="text-black font-bold text-sm">JJ</span>
              </div>
              <p className="text-white font-medium">Jesse Johnson</p>
            </div>
            <p className="text-gray-500 text-sm mt-2">Seattle, WA</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/jessejohnson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#d4a847] transition-colors underline-grow"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jesse@digitaljesse.com"
              className="text-gray-500 hover:text-[#d4a847] transition-colors underline-grow"
            >
              Email
            </a>
            <Link
              href="/resume.pdf"
              className="text-gray-500 hover:text-[#d4a847] transition-colors underline-grow"
            >
              Resume
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#d4a847]/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Jesse Johnson. All rights reserved.
            </p>
            <p className="text-gray-700 text-xs">
              E-commerce Manager & Growth Specialist
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
