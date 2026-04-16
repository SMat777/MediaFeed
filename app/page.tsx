import { getLatestArticles } from '@/lib/guardian';
import ArticleCard from '@/components/ArticleCard';
import TrendingSection from '@/components/TrendingSection';

export default async function HomePage() {
  const articles = await getLatestArticles(10);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Redaktionelt kurateret sektion — vises før kronologisk feed */}
      <TrendingSection />

      <h2 className="text-3xl font-bold mb-8">Seneste nyheder</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
