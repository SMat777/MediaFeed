import Link from 'next/link';
import type { GuardianArticle } from '@/lib/guardian';

interface Props {
  articles: GuardianArticle[];
}

/**
 * "Populært nu"-sidebar til forsiden.
 *
 * Viser trending artikler i en vertikal nummereret liste.
 * Modtager artikler som props fra forsiden, der henter dem
 * via getTrendingArticles med Guardian API's relevans-sortering.
 */
export default function TrendingSection({ articles }: Props) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-surface border border-line rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-line">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-accent">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 0 0-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 0 0-.613 3.58 2.64 2.64 0 0 1-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 0 0 5.05 6.05 6.981 6.981 0 0 0 3 11a7 7 0 0 0 11.95 4.95c.592-.591.98-1.298 1.175-2.134.215-.92.151-1.862-.101-2.766-.272-.97-.758-1.86-1.33-2.573a6.36 6.36 0 0 0-.845-.89c-.348-.302-.722-.543-1.1-.71a1 1 0 0 0-1.354.854A5.975 5.975 0 0 1 12.395 2.553Z" clipRule="evenodd" />
        </svg>
        <span className="text-xs font-bold uppercase tracking-widest text-heading">
          Populært nu
        </span>
      </div>
      <div className="flex flex-col flex-1">
        {articles.map((article, i) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="group flex gap-4 items-start py-4 border-b border-line last:border-b-0 first:pt-0 last:pb-0"
          >
            <span className="text-2xl font-black text-accent/25 leading-none shrink-0 tabular-nums w-8">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold leading-snug text-heading group-hover:text-accent transition-colors line-clamp-3">
                {article.webTitle}
              </h3>
              <p className="mt-1 text-xs text-muted">{article.sectionName}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
