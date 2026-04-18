import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleById } from '@/lib/guardian';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { toBookmarkData } from '@/lib/bookmark-data';
import BookmarkButton from '@/components/BookmarkButton';
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

  return (
    <>
      {/* Full-width hero-billede */}
      {article.fields?.thumbnail && (
        <div className="relative w-full max-h-[28rem] overflow-hidden bg-skeleton">
          <Image
            src={article.fields.thumbnail}
            alt=""
            width={1600}
            height={900}
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-page" />
        </div>
      )}

      <div className={`max-w-3xl mx-auto px-4 relative z-10 ${article.fields?.thumbnail ? '-mt-16' : 'pt-12'}`}>
        {/* Breadcrumb */}
        <nav className="text-sm text-muted mb-6" aria-label="Brødkrumme">
          <Link href="/" className="hover:text-accent transition-colors">Forside</Link>
          <span className="mx-2 text-faint">›</span>
          <Link href={`/category/${article.id.split('/')[0]}`} className="hover:text-accent transition-colors">
            {article.sectionName}
          </Link>
        </nav>

        {/* Sektionsbadge */}
        <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-accent">
          {article.sectionName}
        </span>

        {/* Titel */}
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] text-heading">
          {article.webTitle}
        </h1>

        {/* Trail text som undertitel */}
        {article.fields?.trailText && (
          <p className="mt-4 text-lg sm:text-xl text-muted leading-relaxed">
            {article.fields.trailText.replace(/<[^>]+>/g, '')}
          </p>
        )}

        {/* Meta-bar */}
        <div className="mt-6 flex items-center gap-4 py-4 border-y border-line">
          <span className="text-sm text-faint">
            {formatDate(article.webPublicationDate)}
          </span>
          <span className="text-faint">·</span>
          <span className="text-sm text-faint">
            {calculateReadingTime(article.fields?.wordcount)} læsetid
          </span>
          <BookmarkButton article={toBookmarkData(article)} className="ml-auto" />
        </div>

        {/* Artikeltekst — HTML fra Guardian API med prose-styling */}
        <article className="mt-10 prose prose-lg dark:prose-invert max-w-none prose-headings:text-heading prose-headings:font-bold prose-headings:leading-tight prose-p:text-body prose-p:leading-[1.8] prose-a:text-accent prose-a:underline prose-a:decoration-accent/30 hover:prose-a:decoration-accent prose-blockquote:border-l-accent prose-blockquote:text-muted prose-blockquote:not-italic prose-strong:text-heading prose-img:rounded-xl prose-li:text-body prose-li:leading-[1.8] prose-hr:border-line">
          {article.fields?.body ? (
            <div dangerouslySetInnerHTML={{ __html: article.fields.body }} />
          ) : (
            <p className="text-faint italic">Artikelindhold ikke tilgængeligt via gratis API-plan.</p>
          )}
        </article>

        {/* Relaterede artikler fra samme sektion */}
        <RelatedArticles
          sectionId={article.id.split('/')[0]}
          currentArticleId={article.id}
        />
      </div>
    </>
  );
}
