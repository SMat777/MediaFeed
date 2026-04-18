import type { Metadata } from 'next';
import BookmarksList from '@/components/BookmarksList';

export const metadata: Metadata = {
  title: 'Bogmærker',
  description: 'Dine gemte artikler',
};

/**
 * Server component wrapper — eksporterer metadata til Next.js.
 * Selve bogmærke-listen er en client component (BookmarksList)
 * fordi den læser fra localStorage via useBookmarks.
 */
export default function BookmarksPage() {
  return <BookmarksList />;
}
