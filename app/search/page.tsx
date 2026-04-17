import { searchArticles } from '@/lib/guardian';
import ArticleCard from '@/components/ArticleCard';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return { title: q ? `"${q}"` : 'Søg' };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  // Ingen søgeord – vis opfordring til at søge
  if (!q?.trim()) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-faint">
        Begynd at skrive i søgefeltet øverst for at finde artikler.
      </div>
    );
  }

  const articles = await searchArticles(q.trim());

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Søgeresultater</h1>
      <p className="text-muted mb-8">
        {articles.length} {articles.length === 1 ? 'resultat' : 'resultater'} for &ldquo;{q}&rdquo;
      </p>

      {articles.length === 0 ? (
        <p className="text-faint">Ingen artikler matchede din søgning. Prøv et andet søgeord.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
