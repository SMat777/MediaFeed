'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/lib/bookmarks';
import type { BookmarkData } from '@/lib/bookmark-data';
import type { GuardianArticle } from '@/lib/guardian';
import ArticleCard from '@/components/ArticleCard';

/**
 * Renderer brugerens bogmærkede artikler i et grid.
 *
 * Client component fordi bogmærker lever i localStorage.
 * Viser skeleton under SSR/hydration for at undgå flash fra tom-state
 * til populated grid (useSyncExternalStore returnerer [] på serveren).
 */
export default function BookmarksList() {
  const { bookmarks } = useBookmarks();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <BookmarksSkeleton />;
  }

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl font-bold text-decorative">0</p>
        <h1 className="mt-4 text-2xl font-bold text-heading">
          Ingen bogmærker endnu
        </h1>
        <p className="mt-2 text-muted">
          Klik på bogmærke-ikonet på en artikel for at gemme den her.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
        >
          Udforsk artikler
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Bogmærker</h1>
      <p className="text-muted mb-8">
        {bookmarks.length} {bookmarks.length === 1 ? 'gemt artikel' : 'gemte artikler'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks.map((bookmark) => (
          <ArticleCard
            key={bookmark.id}
            article={bookmark as GuardianArticle}
          />
        ))}
      </div>
    </div>
  );
}

/** Skeleton der matcher grid-layoutet mens localStorage læses. */
function BookmarksSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="h-9 w-40 bg-skeleton rounded animate-pulse mb-2" />
      <div className="h-5 w-28 bg-skeleton rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-surface rounded-xl border border-line overflow-hidden animate-pulse">
            <div className="h-48 bg-skeleton" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-16 bg-skeleton rounded" />
              <div className="h-4 bg-skeleton rounded" />
              <div className="h-4 w-3/4 bg-skeleton rounded" />
              <div className="h-3 w-20 bg-skeleton rounded mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
