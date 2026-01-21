import Image from "next/image";
import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import moment from "moment";
import { Article } from "@/types";

// Extended Article type for local use if needed, but we'll check the property dynamically
interface HeroProps {
  articles: (Article & { exclusive?: boolean })[];
}

export default function Hero({ articles }: HeroProps) {
  const heroArticles = articles.slice(0, 3);
  const cardArticles = articles.slice(3, 7);

  return (
    <section className="max-w-full p-2 sm:p-0 relative z-0">
      {/* mobile: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden">
        {heroArticles.map((post, idx) => (
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
            <div
              className="relative h-full flex flex-col justify-end gap-3 p-5"
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block ${idx === 0
                    ? "bg-red-600"
                    : idx === 1
                      ? "bg-yellow-500"
                      : "bg-green-600"
                    } px-3 py-1 text-[10px] font-bold uppercase rounded text-white tracking-widest`}
                >
                  {post.tags[0]?.title || "NEWS"}
                </span>
                {post.exclusive && (
                  <span className="bg-white/20 backdrop-blur-md text-white px-2 py-1 text-[10px] font-bold uppercase rounded flex items-center gap-1 border border-white/30">
                    <Lock size={10} /> Exclusive
                  </span>
                )}
              </div>
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
        {heroArticles.map((post, idx) => {
          const publishAt = moment(post.publishedAt).format("YYYY-MM-DD HH:mm");
          return (
            <Link
              key={post.slug.current}
              href={`/article/${post.slug.current}`}
              className={`relative overflow-hidden min-h-[280px] block group ${idx === 0 ? "md:col-span-1" : ""
                }`}
              style={{ zIndex: 1 }}
            >
              {/* wrapper buat image */}
              <div className="relative h-full min-h-[480px]">
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
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gray-400" />
                )}
              </div>

              {/* text */}
              <div
                className="absolute inset-0 flex flex-col justify-end gap-3 p-8 md:p-10"
                style={{ zIndex: 2 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white"
                  >
                    {post.tags[0]?.title || "NEWS"}
                  </span>
                  {post.exclusive && (
                    <span className="bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-1.5 shadow-xl">
                      <Lock size={10} strokeWidth={3} /> Exclusive
                    </span>
                  )}
                </div>
                <h2
                  className={`text-white font-black uppercase leading-[1] tracking-tighter transition-colors group-hover:text-red-500 ${idx === 0 ? "text-4xl md:text-5xl" : "text-3xl"
                    }`}
                >
                  {post.title}
                </h2>
                <div className="flex flex-col gap-1 border-t border-white/20 pt-4">
                  <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">
                    Report by <span className="text-white">{post.author.name}</span>
                  </p>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.1em]">
                    {moment(post.publishedAt).format("MMM DD, YYYY")}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/*Card One*/}
      <div className="w-full my-16">
        {/* mobile: horizontal scroll */}
        <div className="flex md:hidden items-center gap-4 overflow-x-auto snap-x snap-mandatory px-4">
          {cardArticles.map((post, idx) => (
            <Link
              key={post.slug.current}
              href={`/article/${post.slug.current}`}
              className="relative flex flex-row gap-4 p-4 border border-gray-100 bg-white rounded-xl min-w-[90%] snap-center block shadow-sm"
              style={{ zIndex: 1 }}
            >
              {/* image left */}
              <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-lg">
                {post.mainImage?.asset ? (
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
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                {post.exclusive && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Lock size={16} className="text-white" />
                  </div>
                )}
              </div>

              {/* text right */}
              <div className="flex flex-col justify-center flex-1">
                <span className="text-red-600 text-[9px] font-black uppercase tracking-widest mb-1">
                  {post.tags[0]?.title || "NEWS"}
                </span>
                <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                  <Clock size={10} />
                  <span>{moment(post.publishedAt).format("MMM DD")}</span>
                  {post.exclusive && <span className="text-red-600 ml-1">• Premium</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* desktop: container + grid */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {cardArticles.map((post, idx) => {
                const publishAt = moment(post.publishedAt).format(
                  "MMM DD, YYYY",
                );
                return (
                  <Link
                    key={post.slug.current}
                    href={`/article/${post.slug.current}`}
                    className="group relative flex flex-col gap-4 p-2 border border-transparent hover:border-gray-100 bg-white hover:shadow-xl transition-all duration-300 rounded-2xl block"
                    style={{ zIndex: 1 }}
                  >
                    {/* image top */}
                    <div className="relative w-full h-48 overflow-hidden rounded-xl">
                      {post.mainImage?.asset ? (
                        <Image
                          src={
                            "url" in post.mainImage.asset
                              ? post.mainImage.asset.url
                              : ""
                          }
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}

                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest rounded-sm">
                          {post.tags[0]?.title || "NEWS"}
                        </span>
                        {post.exclusive && (
                          <span className="bg-black text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest rounded-sm flex items-center gap-1">
                            <Lock size={8} /> Exclusive
                          </span>
                        )}
                      </div>
                    </div>

                    {/* text bottom */}
                    <div className="flex flex-col gap-2 p-2">
                      <h3 className="font-black text-base uppercase tracking-tight leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        <span>{post.author.name}</span>
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          <span>{publishAt}</span>
                        </div>
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
