'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';

const SECTIONS = [
  { label: 'World', slug: 'world' },
  { label: 'Sport', slug: 'sport' },
  { label: 'Culture', slug: 'culture' },
  { label: 'Tech', slug: 'technology' },
  { label: 'Business', slug: 'business' },
];

/**
 * Topnavigation med sektionslinks og dark mode toggle.
 * Markerer aktiv sektion baseret på URL-pathname.
 *
 * Kræver 'use client' fordi usePathname() kun virker i Client Components.
 * Alt andet i layout.tsx forbliver Server Component.
 */
export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="bg-surface/90 backdrop-blur-lg border-b border-line sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-14">
        <Link href="/" className="text-xl font-black tracking-tight">
          <span className="text-accent">Media</span>
          <span className="text-heading">Feed</span>
        </Link>
        <div className="h-5 w-px bg-line" />
        <nav className="flex gap-1" aria-label="Sektioner">
          {SECTIONS.map(({ label, slug }) => {
            const isActive = pathname === `/category/${slug}`;
            return (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-muted hover:bg-surface-hover hover:text-heading'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <SearchBar />
        <Link
          href="/bookmarks"
          aria-label="Bogmærker"
          className={`p-1.5 rounded-full transition-colors ${
            pathname === '/bookmarks'
              ? 'text-accent'
              : 'text-muted hover:bg-surface-hover hover:text-heading'
          }`}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3h9A1.5 1.5 0 0 1 16 4.5V18l-6-4-6 4V4.5Z" />
          </svg>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
