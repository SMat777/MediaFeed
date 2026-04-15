const BASE_URL = 'https://content.guardianapis.com';
const API_KEY = process.env.GUARDIAN_API_KEY!;

export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  sectionName: string;
  fields?: {
    thumbnail?: string;
    trailText?: string;
    bodyText?: string;
    wordcount?: string;
  };
}

interface GuardianResponse {
  response: {
    status: string;
    total: number;
    results: GuardianArticle[];
  };
}

const FIELDS = 'thumbnail,trailText,bodyText,wordcount';

export async function getLatestArticles(pageSize = 10): Promise<GuardianArticle[]> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${FIELDS}&page-size=${pageSize}&order-by=newest`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Guardian API error: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return data.response.results;
}

export async function getArticlesBySection(
  section: string,
  pageSize = 12
): Promise<GuardianArticle[]> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${FIELDS}&section=${section}&page-size=${pageSize}&order-by=newest`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Guardian API error: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return data.response.results;
}

export async function getArticleById(id: string): Promise<GuardianArticle | null> {
  const url = `${BASE_URL}/${id}?api-key=${API_KEY}&show-fields=${FIELDS}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const data = await res.json();
  return data.response.content ?? null;
}

export async function searchArticles(
  query: string,
  pageSize = 12
): Promise<GuardianArticle[]> {
  const url = `${BASE_URL}/search?api-key=${API_KEY}&show-fields=${FIELDS}&q=${encodeURIComponent(query)}&page-size=${pageSize}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Guardian API error: ${res.status}`);
  const data: GuardianResponse = await res.json();
  return data.response.results;
}
