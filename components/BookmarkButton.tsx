'use client';

import { useBookmarks } from '@/lib/bookmarks';
import type { BookmarkData } from '@/lib/bookmark-data';

interface Props {
  article: BookmarkData;
  /** Ekstra klasser — bruges til positionering i forskellige kontekster. */
  className?: string;
}

/**
 * Toggler bogmærke for en artikel.
 * Viser udfyldt ikon når bogmærket, outline når ikke.
 * preventDefault() sikrer at klik ikke trigger navigation når knappen
 * ligger inde i et Link-element (fx i ArticleCard).
 */
export default function BookmarkButton({ article, className = '' }: Props) {
  const { toggle, isBookmarked } = useBookmarks();
  const active = isBookmarked(article.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(article);
      }}
      aria-label={active ? 'Fjern bogmærke' : 'Bogmærk artikel'}
      className={`p-1.5 rounded-full transition-colors ${
        active
          ? 'text-accent'
          : 'text-faint hover:text-muted'
      } ${className}`}
    >
      {active ? <BookmarkFilledIcon /> : <BookmarkOutlineIcon />}
    </button>
  );
}

function BookmarkFilledIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3h9A1.5 1.5 0 0 1 16 4.5V18l-6-4-6 4V4.5Z" />
    </svg>
  );
}

function BookmarkOutlineIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4.5A1.5 1.5 0 0 1 5.5 3h9A1.5 1.5 0 0 1 16 4.5V18l-6-4-6 4V4.5Z" />
    </svg>
  );
}
