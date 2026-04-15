import { getLatestArticles } from '@/lib/guardian';
import { formatDate } from '@/lib/utils';

export default async function HomePage() {
  const articles = await getLatestArticles(10);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Seneste nyheder</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {article.fields?.thumbnail && (
              <img
                src={article.fields.thumbnail}
                alt={article.webTitle}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-red-700">
                {article.sectionName}
              </span>
              <h2 className="mt-2 text-base font-semibold leading-snug line-clamp-3">
                <a
                  href={`/article/${encodeURIComponent(article.id)}`}
                  className="hover:underline"
                >
                  {article.webTitle}
                </a>
              </h2>
              {article.fields?.trailText && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {/* Guardian trailText kan indeholde HTML-tags – stripes til plain text */}
                  {article.fields.trailText.replace(/<[^>]+>/g, '')}
                </p>
              )}
              <p className="mt-3 text-xs text-gray-400">{formatDate(article.webPublicationDate)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
