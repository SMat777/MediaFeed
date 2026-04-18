'use client';

import { useState, useTransition } from 'react';
import type { GuardianArticle, PaginatedResult } from '@/lib/guardian';
import ArticleCard from '@/components/ArticleCard';

interface Props {
  /** Artikler fra den første side (server-renderet). */
  initialArticles: GuardianArticle[];
  /** Antal sider i alt — bruges til at skjule knappen når alt er hentet. */
  totalPages: number;
  /** Server Action der henter næste side. Modtager sidenummer, returnerer PaginatedResult. */
  loadMore: (page: number) => Promise<PaginatedResult>;
}

/**
 * "Vis flere"-knap med progressive loading.
 *
 * Mønstret: Server-renderet første side (SEO + hurtig load) kombineret
 * med client-side "load more" for efterfølgende sider. Bedste fra begge
 * verdener — crawlere ser indholdet, brugere kan browse videre.
 *
 * useTransition bruges i stedet for useState til loading-state fordi
 * det holder UI responsivt under async operationer — React deprioriterer
 * opdateringen så eksisterende indhold ikke fryser.
 */
export default function LoadMoreButton({ initialArticles, totalPages, loadMore }: Props) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const hasMore = page < totalPages;

  function handleLoadMore() {
    const nextPage = page + 1;
    startTransition(async () => {
      const result = await loadMore(nextPage);
      setArticles((prev) => [...prev, ...result.articles]);
      setPage(nextPage);
    });
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="group rounded-full border border-line-strong px-10 py-3 text-sm font-semibold text-body hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-wait"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Henter artikler...
              </span>
            ) : 'Vis flere artikler'}
          </button>
        </div>
      )}
    </>
  );
}
