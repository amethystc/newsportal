import Link from "next/link";
import { Article } from "@/types";

interface ArticleBreadcrumbProps {
  article: Article;
}

export function ArticleBreadcrumb({ article }: ArticleBreadcrumbProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 mt-10">
      <nav className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-red-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/region/${article.region.slug.current}`}
          className="hover:text-red-600 transition-colors"
        >
          {article.region.title}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{article.title}</span>
      </nav>
    </div>
  );
}
