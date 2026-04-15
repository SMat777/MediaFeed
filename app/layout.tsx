import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: { default: 'MediaFeed', template: '%s – MediaFeed' },
  description: 'Nyhedsaggregator drevet af Guardian API',
};

const SECTIONS = [
  { label: 'World', slug: 'world' },
  { label: 'Sport', slug: 'sport' },
  { label: 'Culture', slug: 'culture' },
  { label: 'Tech', slug: 'technology' },
  { label: 'Business', slug: 'business' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 h-14">
            <Link href="/" className="text-xl font-bold tracking-tight text-red-700">
              MediaFeed
            </Link>
            <nav className="flex gap-1" aria-label="Sektioner">
              {SECTIONS.map(({ label, slug }) => (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-sm text-gray-400 text-center">
            Powered by{' '}
            <a
              href="https://open-platform.theguardian.com/"
              className="underline hover:text-gray-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Guardian Open Platform
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
