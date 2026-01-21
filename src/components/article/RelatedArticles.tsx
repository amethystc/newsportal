import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types";
import { ArrowRight } from "lucide-react";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="pt-20">
      <div className="flex items-center justify-between mb-12 border-b-2 border-black pb-4">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
          Related <span className="text-red-600">Intelligence</span>
        </h2>
      </div>

      <div className="grid gap-12 md:grid-cols-3">
        {articles.map((relatedArticle: Article) => (
          <Link
            key={relatedArticle.slug.current}
            href={`/article/${relatedArticle.slug.current}`}
            className="group block"
          >
            <article className="flex flex-col gap-4">
              {relatedArticle.mainImage?.asset && (
                <div className="relative aspect-[16/10] overflow-hidden border border-gray-100">
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
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 text-[8px] font-black uppercase text-white bg-black">
                    Related Intel
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="font-black text-base leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                  {relatedArticle.title}
                </h3>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-[9px] font-black uppercase tracking-widest text-gray-400">
                  <span>{relatedArticle.author.name}</span>
                  <span>{moment(relatedArticle.publishedAt).format("DD MMM YYYY")}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}