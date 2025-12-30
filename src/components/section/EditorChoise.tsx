import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import moment from "moment";
import { Article } from "@/types";

interface EditorChoiseProps {
  title: string;
  background: string;
  article: Article[];
}

export default function EditorChoise({
  title,
  background,
  article,
}: EditorChoiseProps) {
  // Create array of 4 articles with the main article as first item
  // In real implementation, you might want to fetch 4 articles instead
  const articles = article ? article : [];
  return (
    <section className="container mx-auto my-2">
      <div className={`${background} p-2 flex flex-col p-4`}>
        <h3 className="text-2xl uppercase font-unbounded-extrabold">
          {title.toUpperCase()}
        </h3>
        <div className="w-full flex flex-col md:flex-row md:justify-around md:items-start gap-4 mt-4">
          {articles.length > 0 &&
            articles.map((post, index) => (
              <Link
                key={post.slug.current}
                href={`/article/${post.slug.current}`}
                className="w-full md:w-1/4 flex relative flex-col gap-2 "
              >
                <div className="w-full relative">
                  {post.mainImage?.asset ? (
                    <div className="w-full h-48 shrink-0">
                      <Image
                        src={
                          "url" in post.mainImage.asset
                            ? post.mainImage.asset.url
                            : ""
                        }
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover h-52 z-0"
                        sizes="(min-width: 1024px) 25vw, 100vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-52 bg-gray-300" />
                  )}
                  {/* category */}
                  <div className="w-24 p-1 uppercase text-center font-semibold text-xs text-white bg-red-500 absolute top-1 left-1 rounded">
                    {post.tags[0]?.title || "NEWS"}
                  </div>
                </div>
                {/* content */}
                <div className="w-full">
                  {/* title */}
                  <h3 className="font-semibold text-sm md:text-base">
                    {post.title}
                  </h3>
                  {/* credit */}
                  <div className="text-sm flex flex-wrap items-center gap-2 mt-1">
                    <span>
                      by <span className="font-bold">{post.author.name}</span>
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Clock size={14} />
                      <span>
                        {moment(post.publishedAt).format("MMMM DD, YYYY")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
