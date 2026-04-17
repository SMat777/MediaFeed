import { getTrendingArticles } from '@/lib/guardian';
import ArticleCard from '@/components/ArticleCard';

/**
 * "Populært nu"-sektion til forsiden.
 *
 * Adskiller sig fra det kronologiske feed ved at bruge Guardian API's
 * relevans-sortering — et redaktionelt signal der svarer til hvad en
 * nyhedsredaktør ville placere øverst på forsiden.
 *
 * Visuelt adskilt med mørkere baggrund og horisontal scroll på mobil
 * for at signalere at dette er kurateret indhold, ikke bare "nyeste".
 */
export default async function TrendingSection() {
  const articles = await getTrendingArticles(4);

  if (articles.length === 0) return null;

  return (
    <section className="bg-gray-900 dark:bg-gray-800 text-white py-10 -mx-4 px-4 mb-12 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Populært nu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article, i) => (
          <article key={article.id} className="group">
            <span className="text-3xl font-bold text-gray-600">{i + 1}</span>
            <h3 className="mt-1 text-sm font-semibold leading-snug group-hover:underline">
              <a href={`/article/${article.id}`}>
                {article.webTitle}
              </a>
            </h3>
            <p className="mt-1 text-xs text-gray-400">{article.sectionName}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
