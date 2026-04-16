import { getArticlesBySectionPaginated } from '@/lib/guardian';
import { loadMoreBySection } from '@/lib/actions';
import LoadMoreButton from '@/components/LoadMoreButton';

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
  const { articles, totalPages } = await getArticlesBySectionPaginated(section);
  const label = capitalize(section);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">{label}</h1>
      {articles.length === 0 ? (
        <p className="text-gray-500">Ingen artikler fundet i denne sektion.</p>
      ) : (
        <LoadMoreButton
          initialArticles={articles}
          totalPages={totalPages}
          loadMore={loadMoreBySection.bind(null, section)}
        />
      )}
    </div>
  );
}
