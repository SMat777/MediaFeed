import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Nav from '@/components/Nav';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: { default: 'MediaFeed', template: '%s – MediaFeed' },
  description: 'Nyhedsaggregator drevet af Guardian API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        {/* Nav er Client Component (usePathname) – resten af layout er Server Component */}
        <Nav />
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
