'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Søgeinput med 300ms debounce.
 *
 * Debounce-mønsteret: useEffect starter en timer ved hvert tastetryk.
 * Cleanup-funktionen rydder den forrige timer – så kun det sidst
 * indtastede ord efter 300ms ro trigger en navigation til /search.
 * Uden debounce ville hvert enkelt tastetryk lave et API-kald.
 */
export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }, 300);

    return () => clearTimeout(timer); // ryd timer hvis query ændres inden 300ms
  }, [query, router]);

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Søg artikler..."
      aria-label="Søg"
      className="ml-auto w-48 rounded-full border border-line bg-surface px-3 py-1 text-sm text-body placeholder-faint focus:outline-none focus:ring-2 focus:ring-accent/40"
    />
  );
}
