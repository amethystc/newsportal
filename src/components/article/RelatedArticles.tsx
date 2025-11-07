import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Related Articles
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((relatedArticle: Article) => (
          <Link
            key={relatedArticle.slug.current}
            href={`/article/${relatedArticle.slug.current}`}
            className="group block"
          >
            <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {relatedArticle.mainImage?.asset && (
                <div className="relative h-48">
                  <Image
                    src={
                      "url" in relatedArticle.mainImage.asset
                        ? relatedArticle.mainImage.asset.url
                        : ""
                    }
                    alt={
                      relatedArticle.mainImage.alt ||
                      relatedArticle.title
                    }
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {relatedArticle.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {relatedArticle.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>By {relatedArticle.author.name}</span>
                  <span>•</span>
                  <span>
                    {moment(relatedArticle.publishedAt).format(
                      "MMM DD, YYYY",
                    )}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}