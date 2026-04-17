import Link from 'next/link';

/**
 * Artikel-specifik 404-side.
 *
 * Vises når getArticleById() returnerer null og artikelsiden
 * kalder notFound(). Next.js vælger denne fil fremfor den globale
 * not-found.tsx fordi den ligger i samme route-segment.
 *
 * Giver en mere kontekstuel besked end den generelle 404 —
 * brugeren ved at URL'en lignede en artikel, men at den ikke
 * kunne findes (slettet, forkert link, Guardian API ændring).
 */
export default function ArticleNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl font-bold text-decorative">404</p>
      <h1 className="mt-4 text-2xl font-bold text-heading">
        Artiklen blev ikke fundet
      </h1>
      <p className="mt-2 text-muted">
        Artiklen kan være blevet fjernet eller linket er ugyldigt.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
        >
          Gå til forsiden
        </Link>
        <Link
          href="/search"
          className="rounded-full border border-line-strong px-6 py-2 text-sm font-medium text-body hover:bg-surface-hover transition-colors"
        >
          Søg efter artikler
        </Link>
      </div>
    </div>
  );
}
