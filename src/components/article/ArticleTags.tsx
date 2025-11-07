import Link from "next/link";
import { Article, Tag } from "@/types";

interface ArticleTagsProps {
  article: Article;
}

export function ArticleTags({ article }: ArticleTagsProps) {
  if (!article.tags || article.tags.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag: Tag) => (
          <Link
            key={tag.slug.current}
            href={`/tag/${tag.slug.current}`}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            {tag.title}
          </Link>
        ))}
      </div>
    </div>
  );
}