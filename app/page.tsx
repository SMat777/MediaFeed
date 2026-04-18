import { getLatestArticlesPaginated, getTrendingArticles } from '@/lib/guardian';
import { loadMoreLatest } from '@/lib/actions';
import TrendingSection from '@/components/TrendingSection';
import LoadMoreButton from '@/components/LoadMoreButton';
import HeroArticle from '@/components/HeroArticle';

export default async function HomePage() {
  const [{ articles, totalPages }, trending] = await Promise.all([
    getLatestArticlesPaginated(),
    getTrendingArticles(5),
  ]);

  const heroArticle = trending[0] ?? articles[0];
  const trendingSidebar = trending.slice(1, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero sektion: featured artikel + trending sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
        <div className="lg:col-span-2">
          <HeroArticle article={heroArticle} />
        </div>
        <div className="lg:col-span-1">
          <TrendingSection articles={trendingSidebar} />
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-line" />
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted">
          Seneste nyheder
        </h2>
        <div className="h-px flex-1 bg-line" />
      </div>

      {/* Kronologisk feed */}
      <LoadMoreButton
        initialArticles={articles}
        totalPages={totalPages}
        loadMore={loadMoreLatest}
      />
    </div>
  );
}
