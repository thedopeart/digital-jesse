import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Jesse Johnson for e-commerce, digital marketing, and freelance opportunities.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Dark Header */}
      <div className="bg-[#1e1e1e] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#d4a847] font-medium tracking-wider uppercase text-sm">Contact</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-white">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Looking for my next full-time gig. Also open to freelance if the project makes sense. Send me a note and I'll get back to you.
          </p>
        </div>
      </div>

      {/* White Form Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reach Out Directly</h2>
              <div className="space-y-4">
                <a
                  href="mailto:jesse@digitaljesse.com"
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#d4a847] hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-[#b8860b] group-hover:bg-amber-100 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Email</p>
                    <p className="text-gray-600 text-sm">jesse@digitaljesse.com</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/jessejohnson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#d4a847] hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-[#b8860b] group-hover:bg-amber-100 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">LinkedIn</p>
                    <p className="text-gray-600 text-sm">Connect with me</p>
                  </div>
                </a>
              </div>

              {/* Location */}
              <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-[#b8860b]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Seattle, WA</p>
                    <p className="text-gray-500 text-sm">Remote works too</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <form
                action="https://formspree.io/f/your-form-id"
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#d4a847]/50 focus:border-[#d4a847] outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#d4a847]/50 focus:border-[#d4a847] outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#d4a847]/50 focus:border-[#d4a847] outline-none transition-all"
                  >
                    <option value="job">Job Opportunity</option>
                    <option value="freelance">Freelance Project</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#d4a847]/50 focus:border-[#d4a847] outline-none transition-all resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#d4a847] to-[#cd7f32] text-black rounded-lg hover:shadow-lg hover:shadow-amber-900/30 transition-all font-semibold text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
