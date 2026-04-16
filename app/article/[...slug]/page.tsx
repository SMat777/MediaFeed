import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleById } from '@/lib/guardian';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import RelatedArticles from '@/components/RelatedArticles';

interface Props {
  params: Promise<{ slug: string[] }>;
}

/**
 * Rekonstruerer Guardian artikel-ID fra URL-segmenter.
 * Guardian ID'er er stier med skråstreger, fx "world/2026/apr/15/article-slug".
 * Next.js catch-all [...slug] splitter dem til et array – her joines de igen.
 */
function idFromSlug(slug: string[]): string {
  return slug.join('/');
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleById(idFromSlug(slug));
  if (!article) return {};

  return {
    title: article.webTitle,
    description: article.fields?.trailText?.replace(/<[^>]+>/g, ''),
    openGraph: {
      title: article.webTitle,
      description: article.fields?.trailText?.replace(/<[^>]+>/g, ''),
      images: article.fields?.thumbnail ? [article.fields.thumbnail] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  // Next.js deduplicerer fetch-kald med samme URL inden for én request –
  // dette kald og kaldet i generateMetadata rammer ikke API'et to gange.
  const article = await getArticleById(idFromSlug(slug));

  if (!article) notFound();

  // bodyText er plain text – splittes på linjeskift til afsnit
  const paragraphs = article.fields?.bodyText?.split('\n').filter(Boolean) ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6" aria-label="Brødkrumme">
        <Link href={`/category/${article.id.split('/')[0]}`} className="hover:underline">
          {article.sectionName}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{article.webTitle}</span>
      </nav>

      <span className="text-xs font-semibold uppercase tracking-wide text-red-700">
        {article.sectionName}
      </span>

      <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900">
        {article.webTitle}
      </h1>

      <p className="mt-2 text-sm text-gray-400">
        {formatDate(article.webPublicationDate)}
        <span className="mx-1.5">·</span>
        {calculateReadingTime(article.fields?.wordcount)}
      </p>

      {article.fields?.thumbnail && (
        // priority: dette er LCP-elementet på siden – hentes straks, ikke lazy
        <Image
          src={article.fields.thumbnail}
          alt=""
          width={1200}
          height={630}
          priority
          className="mt-6 w-full rounded-xl object-cover"
        />
      )}

      {/* prose giver automatisk læsevenlig typografi til artikeltekst */}
      <article className="mt-8 prose prose-lg prose-gray max-w-none">
        {paragraphs.length > 0 ? (
          paragraphs.map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p className="text-gray-400 italic">Artikelindhold ikke tilgængeligt via gratis API-plan.</p>
        )}
      </article>

      {/* Relaterede artikler fra samme sektion — øger engagement og tid på siden */}
      <RelatedArticles
        sectionId={article.id.split('/')[0]}
        currentArticleId={article.id}
      />
    </div>
  );
}
