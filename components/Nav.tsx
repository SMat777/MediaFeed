'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from '@/components/SearchBar';

const SECTIONS = [
  { label: 'World', slug: 'world' },
  { label: 'Sport', slug: 'sport' },
  { label: 'Culture', slug: 'culture' },
  { label: 'Tech', slug: 'technology' },
  { label: 'Business', slug: 'business' },
];

/**
 * Topnavigation med sektionslinks.
 * Markerer aktiv sektion baseret på URL-pathname.
 *
 * Kræver 'use client' fordi usePathname() kun virker i Client Components.
 * Alt andet i layout.tsx forbliver Server Component.
 */
export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-6 h-14">
        <Link href="/" className="text-xl font-bold tracking-tight text-red-700">
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
                    ? 'bg-red-700 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <SearchBar />
      </div>
    </header>
  );
}
