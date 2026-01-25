import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-gray-900 font-medium">Jesse Johnson</p>
            <p className="text-gray-500 text-sm mt-1">Seattle, WA</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/jessejohnson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jesse@digitaljesse.com"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Email
            </a>
            <Link
              href="/resume.pdf"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Resume
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Jesse Johnson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
