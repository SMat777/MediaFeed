/**
 * Bogmærke-typer og hjælpefunktioner.
 *
 * Adskilt fra hooket (use-bookmarks.ts) så server components
 * kan importere typer og toBookmarkData uden at trække React hooks ind.
 */

import type { GuardianArticle } from '@/lib/guardian';

/** Minimal artikeldata — nok til at rendere ArticleCard uden API-kald. */
export interface BookmarkData {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  sectionName: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
    wordcount?: string;
  };
}

/** Ekstraher de felter ArticleCard behøver fra en fuld Guardian-artikel. */
export function toBookmarkData(article: GuardianArticle): BookmarkData {
  return {
    id: article.id,
    webTitle: article.webTitle,
    webPublicationDate: article.webPublicationDate,
    sectionName: article.sectionName,
    fields: {
      thumbnail: article.fields?.thumbnail,
      trailText: article.fields?.trailText,
      wordcount: article.fields?.wordcount,
    },
  };
}
