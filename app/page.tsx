import { getLatestArticlesPaginated } from '@/lib/guardian';
import { loadMoreLatest } from '@/lib/actions';
import TrendingSection from '@/components/TrendingSection';
import LoadMoreButton from '@/components/LoadMoreButton';

export default async function HomePage() {
  const { articles, totalPages } = await getLatestArticlesPaginated();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Redaktionelt kurateret sektion — vises før kronologisk feed */}
      <TrendingSection />

      <h2 className="text-3xl font-bold mb-8">Seneste nyheder</h2>
      <LoadMoreButton
        initialArticles={articles}
        totalPages={totalPages}
        loadMore={loadMoreLatest}
      />
    </div>
  );
}
