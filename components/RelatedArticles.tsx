import { getArticlesBySection } from '@/lib/guardian';
import ArticleCard from '@/components/ArticleCard';

interface Props {
  sectionId: string;
  currentArticleId: string;
}

/**
 * Viser relaterede artikler fra samme Guardian-sektion.
 *
 * Server Component — data hentes på serveren og caches via ISR (5 min).
 * Ekskluderer den aktuelle artikel fra listen så brugeren ikke ser
 * den artikel de allerede læser.
 *
 * Henter 5 artikler fra API'et og filtrerer 1 fra → viser max 4.
 * Hvis sektionen kun har den aktuelle artikel, vises ingenting.
 */
export default async function RelatedArticles({ sectionId, currentArticleId }: Props) {
  const articles = await getArticlesBySection(sectionId, 5);
  const related = articles.filter((a) => a.id !== currentArticleId);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="text-xl font-bold mb-6">Relaterede artikler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.slice(0, 3).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
