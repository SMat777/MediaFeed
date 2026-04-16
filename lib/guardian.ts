/**
 * Guardian Open Platform API-integration.
 * Alle funktioner er asynkrone Server-side kald – må aldrig bruges i Client Components.
 * Dokumentation: https://open-platform.theguardian.com/documentation/
 */

if (!process.env.GUARDIAN_API_KEY) {
  throw new Error('Mangler GUARDIAN_API_KEY – opret .env.local ud fra .env.example');
}

const BASE_URL = 'https://content.guardianapis.com';
const API_KEY = process.env.GUARDIAN_API_KEY;

export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  sectionName: string;
  fields?: {
    thumbnail?: string;
    trailText?: string; // Kan indeholde HTML-tags
    bodyText?: string;  // Fuld artikeltekst – kun hentet ved detailvisning
    wordcount?: string;
  };
}

/** Pagineret resultat — bruges af komponenter der har en "Vis flere"-knap. */
export interface PaginatedResult {
  articles: GuardianArticle[];
  currentPage: number;
  totalPages: number;
}

// Intern type – bruges kun til at parse Guardian API-svaret
interface GuardianResponse {
  response: {
    status: string;
    total: number;
    currentPage: number;
    pages: number;
    results: GuardianArticle[];
  };
}

// Felter der hentes til listevisning – bodyText udeladt bevidst (5-10 KB pr. artikel)
const LIST_FIELDS = 'thumbnail,trailText,wordcount';

// Felter der hentes til detailvisning – inkl. fuld brødtekst
const DETAIL_FIELDS = 'thumbnail,trailText,bodyText,wordcount';

/**
 * Henter de nyeste artikler på tværs af alle sektioner.
 * Caches i 5 minutter (ISR) – balancerer friskhed med API-kvote (500 req/dag).
 */
export async function getLatestArticles(pageSize = 10): Promise<GuardianArticle[]> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${LIST_FIELDS}&page-size=${pageSize}&order-by=newest`;
  const res = await fetch(url, { next: { revalidate: 300 } }); // 300s = 5 min ISR
  if (!res.ok) throw new Error(`Guardian API fejl: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return data.response.results;
}

/**
 * Henter de nyeste artikler inden for én Guardian-sektion (fx "world", "sport").
 * Caches i 5 minutter – samme strategi som getLatestArticles.
 */
export async function getArticlesBySection(
  section: string,
  pageSize = 12
): Promise<GuardianArticle[]> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${LIST_FIELDS}&section=${section}&page-size=${pageSize}&order-by=newest`;
  const res = await fetch(url, { next: { revalidate: 300 } }); // 300s = 5 min ISR
  if (!res.ok) throw new Error(`Guardian API fejl: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return data.response.results;
}

/**
 * Pagineret version af getLatestArticles.
 * Returnerer artikler + metadata om hvilken side vi er på og hvor mange der er.
 * Bruges af "Vis flere"-knappen til at hente næste side.
 */
export async function getLatestArticlesPaginated(
  page = 1,
  pageSize = 10
): Promise<PaginatedResult> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${LIST_FIELDS}&page-size=${pageSize}&page=${page}&order-by=newest`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Guardian API fejl: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return {
    articles: data.response.results,
    currentPage: data.response.currentPage,
    totalPages: data.response.pages,
  };
}

/**
 * Pagineret version af getArticlesBySection.
 * Bruges af "Vis flere"-knappen på kategorisider.
 */
export async function getArticlesBySectionPaginated(
  section: string,
  page = 1,
  pageSize = 12
): Promise<PaginatedResult> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${LIST_FIELDS}&section=${section}&page-size=${pageSize}&page=${page}&order-by=newest`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Guardian API fejl: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return {
    articles: data.response.results,
    currentPage: data.response.currentPage,
    totalPages: data.response.pages,
  };
}

/**
 * Henter én specifik artikel med fuld brødtekst.
 * Guardian artikel-ID er en sti, fx "world/2026/apr/15/article-slug".
 * Caches i 1 time – artikler ændres sjældent efter publicering.
 * Returnerer null hvis artiklen ikke findes (404).
 */
export async function getArticleById(id: string): Promise<GuardianArticle | null> {
  const url = `${BASE_URL}/${id}?api-key=${API_KEY}&show-fields=${DETAIL_FIELDS}`;
  const res = await fetch(url, { next: { revalidate: 3600 } }); // 3600s = 1 time
  if (!res.ok) return null;
  const data = await res.json();
  return data.response.content ?? null;
}

/**
 * Henter trending artikler sorteret efter redaktionel relevans.
 * Guardian's relevans-algoritme vægter faktorer som redaktørkuratering,
 * aktualitet og læserengagement — modsat getLatestArticles der kun
 * sorterer kronologisk. Giver en "Populært nu"-sektion på forsiden.
 */
export async function getTrendingArticles(pageSize = 5): Promise<GuardianArticle[]> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${LIST_FIELDS}&page-size=${pageSize}&order-by=relevance`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Guardian API fejl: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return data.response.results;
}

/**
 * Fritekst-søgning mod Guardian API.
 * Ikke cachet – søgeresultater skal altid afspejle aktuelle artikler.
 */
export async function searchArticles(
  query: string,
  pageSize = 12
): Promise<GuardianArticle[]> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${LIST_FIELDS}&q=${encodeURIComponent(query)}&page-size=${pageSize}`;
  const res = await fetch(url, { cache: 'no-store' }); // Ingen cache – søgning skal være aktuel
  if (!res.ok) throw new Error(`Guardian API fejl: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return data.response.results;
}
