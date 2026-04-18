import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Nav from '@/components/Nav';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });

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
        <footer className="bg-surface border-t border-line py-10 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-sm font-black tracking-tight">
                <span className="text-accent">Media</span>
                <span className="text-heading">Feed</span>
              </span>
              <p className="text-xs text-faint">
                Indhold leveret af{' '}
                <a
                  href="https://open-platform.theguardian.com/"
                  className="underline decoration-faint hover:text-muted hover:decoration-muted transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Guardian Open Platform
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
