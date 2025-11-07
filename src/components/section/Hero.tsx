import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import moment from "moment";
import { Article } from "@/types";

interface HeroProps {
  articles: Article[];
}

export default function Hero({ articles }: HeroProps) {
  return (
    <section className="max-w-full p-2 sm:p-0 relative" style={{ zIndex: 1 }}>
      {/* mobile: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden">
        {articles.slice(0, 3).map((post, idx) => (
          <Link
            key={post.slug.current}
            href={`/article/${post.slug.current}`}
            className="relative min-w-[85%] h-72 rounded-lg overflow-hidden snap-center block"
            style={{ zIndex: 1 }}
          >
            {/* image */}
            {post.mainImage?.asset ? (
              <>
                <Image
                  src={
                    "url" in post.mainImage.asset
                      ? post.mainImage.asset.url
                      : ""
                  }
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/80 via-black/30 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gray-400" />
            )}
            <div className="relative h-full flex flex-col justify-end gap-3 p-5" style={{ zIndex: 2 }}>
              <span
                className={`inline-block ${
                  idx === 0
                    ? "bg-red-600"
                    : idx === 1
                      ? "bg-yellow-500"
                      : "bg-green-600"
                } px-3 py-1 text-[10px] font-bold uppercase rounded`}
              >
                {post.region.title}
              </span>
              <h2 className="text-white text-2xl font-bold leading-tight">
                {post.title}
              </h2>
              <p className="text-xs text-white/80 flex gap-2 items-center">
                <span>By {post.author.name}</span>
                <span>•</span>
                <span>{moment(post.publishedAt).format("MMMM DD, YYYY")}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* desktop: 3 kolom */}
      <div className="hidden md:grid md:grid-cols-3">
        {articles.slice(0, 3).map((post, idx) => {
          const publishAt = moment(post.publishedAt).format("YYYY-MM-DD HH:mm");
          return (
            <Link
              key={post.slug.current}
              href={`/article/${post.slug.current}`}
              className={`relative overflow-hidden min-h-[280px] block ${
                idx === 0 ? "md:col-span-1" : ""
              }`}
              style={{ zIndex: 1 }}
            >
              {/* wrapper buat image */}
              <div className="relative h-full min-h-[380px]">
                {post.mainImage?.asset ? (
                  <>
                    <Image
                      src={
                        "url" in post.mainImage.asset
                          ? post.mainImage.asset.url
                          : ""
                      }
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-red-500/80 via-red-500/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gray-400" />
                )}
              </div>

              {/* text */}
              <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6" style={{ zIndex: 2 }}>
                <span
                  className={`inline-block bg-red-500 p-2 text-[10px] font-bold uppercase rounded w-20 text-white`}
                >
                  {post.tags[0]?.title || "NEWS"}
                </span>
                <h2
                  className={`text-white font-bold leading-tight ${
                    idx === 0 ? "text-3xl" : "text-2xl"
                  }`}
                >
                  {post.title}
                </h2>
                <p className="text-xs text-white/80 flex gap-2 items-center">
                  By<span className="font-bold"> {post.author.name}</span>
                  <span>•</span>
                  <span>{publishAt}</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/*Card One*/}
      <div className="w-full my-10">
        {/* mobile: horizontal scroll */}
        <div className="flex md:hidden items-center gap-4 overflow-x-auto snap-x snap-mandatory px-4">
          {articles.slice(0, 4).map((post, idx) => (
            <Link
              key={post.slug.current}
              href={`/article/${post.slug.current}`}
              className="relative flex flex-row gap-3 p-3 border bg-white/5 rounded-md min-w-[85%] snap-start block"
              style={{ zIndex: 1 }}
            >
              {/* image left */}
              <div className="relative w-28 h-28 shrink-0">
                {post.mainImage?.asset ? (
                  <>
                    <Image
                      src={
                        "url" in post.mainImage.asset
                          ? post.mainImage.asset.url
                          : ""
                      }
                      alt={post.mainImage.alt || post.title}
                      fill
                      priority
                      className="object-cover rounded-sm shadow-md"
                    />
                    <div className="absolute -top-2 left-0 bg-yellow-500 text-white px-2 py-1 text-[10px] font-bold rounded-sm">
                      {post.tags[0]?.title || "NEWS"}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-sm shadow-md" />
                )}
              </div>

              {/* text right */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-sm leading-snug">
                  {post.title}
                </h3>
                <div className="text-xs">
                  by <span className="font-bold">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-600">
                  <Clock size={12} />
                  <span>
                    {moment(post.publishedAt).format("MMMM DD, YYYY")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* desktop: container + grid */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
              {articles.slice(0, 4).map((post, idx) => {
                const publishAt = moment(post.publishedAt).format(
                  "YYYY-MM-DD HH:mm",
                );
                return (
                  <Link
                    key={post.slug.current}
                    href={`/article/${post.slug.current}`}
                    className="relative flex flex-row gap-3 p-3 border bg-white/5 rounded-md w-[300px] block"
                    style={{ zIndex: 1 }}
                  >
                    {/* image left */}
                    <div className="relative w-28 h-28 shrink-0">
                      {post.mainImage?.asset ? (
                        <>
                          <Image
                            src={
                              "url" in post.mainImage.asset
                                ? post.mainImage.asset.url
                                : ""
                            }
                            alt={post.mainImage.alt || post.title}
                            fill
                            priority
                            className="object-cover"
                          />
                          <div className="absolute -top-2 left-0 bg-yellow-500 text-white px-2 py-1 text-[10px] font-bold rounded-sm">
                            {post.tags[0]?.title || "No Category"}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-sm" />
                      )}
                    </div>

                    {/* text right */}
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="font-semibold text-sm leading-snug">
                        {post.title}
                      </h3>
                      <div className="text-xs">
                        by <span className="font-bold">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-600">
                        <Clock size={12} />
                        <span>{publishAt}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
