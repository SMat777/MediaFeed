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
    <header className="bg-surface border-b border-line sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 h-14">
        <Link href="/" className="text-xl font-bold tracking-tight text-accent">
          MediaFeed
        </Link>
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
                    : 'text-muted hover:bg-surface-hover'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <SearchBar />
        <ThemeToggle />
      </div>
    </header>
  );
}
