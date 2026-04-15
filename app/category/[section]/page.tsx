import { getArticlesBySection } from '@/lib/guardian';
import ArticleCard from '@/components/ArticleCard';

interface Props {
  params: Promise<{ section: string }>;
}

// Fortæller Next.js hvilke sektioner der skal pre-renderes ved build.
// Øvrige sektioner renderes on-demand og caches derefter.
export function generateStaticParams() {
  return ['world', 'sport', 'culture', 'technology', 'business'].map((section) => ({
    section,
  }));
}

/** Kapitaliserer første bogstav – bruges til visningsnavn fra Guardian-sektionsnøgle. */
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata({ params }: Props) {
  const { section } = await params;
  const label = capitalize(section);
  return {
    title: label,
    description: `Seneste ${label}-nyheder fra Guardian`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { section } = await params;
  const articles = await getArticlesBySection(section);
  const label = capitalize(section);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">{label}</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500">Ingen artikler fundet i denne sektion.</p>
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
