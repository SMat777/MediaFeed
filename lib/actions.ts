'use server';

/**
 * Server Actions til pagination.
 *
 * Server Actions er funktioner der kører på serveren men kan kaldes
 * direkte fra Client Components — uden at oprette en API route.
 * Next.js serialiserer automatisk argumenter og returværdi over netværket.
 *
 * 'use server' direktivet er påkrævet og fortæller Next.js at disse
 * funktioner aldrig må bundles til klienten (API-nøglen forbliver skjult).
 */

import {
  getLatestArticlesPaginated,
  getArticlesBySectionPaginated,
  type PaginatedResult,
} from '@/lib/guardian';

/** Henter næste side af seneste artikler (bruges af forsiden). */
export async function loadMoreLatest(page: number): Promise<PaginatedResult> {
  return getLatestArticlesPaginated(page);
}

/** Henter næste side af artikler i en sektion (bruges af kategorisider). */
export async function loadMoreBySection(
  section: string,
  page: number
): Promise<PaginatedResult> {
  return getArticlesBySectionPaginated(section, page);
}
