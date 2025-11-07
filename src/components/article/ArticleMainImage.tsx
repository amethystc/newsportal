import Image from "next/image";
import { Article } from "@/types";

interface ArticleMainImageProps {
  article: Article;
}

export function ArticleMainImage({ article }: ArticleMainImageProps) {
  if (!article.mainImage?.asset) return null;

  return (
    <div className="relative w-full h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden">
      <Image
        src={
          "url" in article.mainImage.asset
            ? article.mainImage.asset.url
            : ""
        }
        alt={article.mainImage.alt || article.title}
        fill
        className="object-cover"
        priority
      />
      {article.mainImage.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
          <p className="text-sm">{article.mainImage.caption}</p>
        </div>
      )}
    </div>
  );
}