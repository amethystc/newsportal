import moment from "moment";
import Image from "next/image";
import { Clock, Share2, Bookmark } from "lucide-react";
import { Article } from "@/types";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      {/* Category and Date */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded">
          {article.region?.country?.title || article.region?.continent?.title || "NEWS"}
        </span>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={14} />
          <time dateTime={article.publishedAt}>
            {moment(article.publishedAt).format("MMMM DD, YYYY")}
          </time>
        </div>
        {article.estimatedReadTime && (
          <span className="text-gray-600">
            {article.estimatedReadTime} min read
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-unbounded-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
        {article.author.image?.asset && (
          <div className="relative w-12 h-12">
            <Image
              src={
                "url" in article.author.image.asset
                  ? article.author.image.asset.url
                  : ""
              }
              alt={article.author.image.alt || article.author.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="font-semibold text-gray-900">
            By {article.author.name}
          </div>
          {article.author.bio && (
            <div className="text-sm text-gray-600">{article.author.bio}</div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
