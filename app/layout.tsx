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
    // suppressHydrationWarning: inline scriptet sætter data-theme før hydration,
    // hvilket skaber en forventet mismatch mellem server-renderet og klient-DOM.
    <html lang="da" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Sætter tema FØR browseren maler indhold — forhindrer FOUC.
            Prioritet: 1) brugerens gemte valg, 2) systemets farveindstilling. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-page text-heading">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="bg-surface border-t border-line py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-sm text-faint text-center">
            Powered by{' '}
            <a
              href="https://open-platform.theguardian.com/"
              className="underline hover:text-muted"
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
