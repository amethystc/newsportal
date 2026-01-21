"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import moment from "moment";
import { Article } from "@/types";

interface HeroProps {
  articles: (Article & { exclusive?: boolean })[];
}

export default function Hero({ articles }: HeroProps) {
  const heroArticles = articles.slice(0, 3);
  const cardArticles = articles.slice(3, 7);

  return (
    <section className="w-full bg-white relative">
      {/* 1. Main Featured Grid (Full Width Viewport until Max-Width) */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px] md:h-[70vh] border-b border-gray-100">
        {/* Large Feature (Left 7 Columns) */}
        {heroArticles[0] && (
          <HeroItem
            article={heroArticles[0]}
            className="md:col-span-7 border-r border-gray-100"
            priority
            fontSize="text-3xl md:text-5xl lg:text-6xl"
          />
        )}

        {/* Side Stack (Right 5 Columns) */}
        <div className="md:col-span-5 grid grid-rows-2">
          {heroArticles.slice(1, 3).map((post, idx) => (
            <HeroItem
              key={post.slug.current}
              article={post}
              className={idx === 0 ? "border-b border-gray-100" : ""}
              fontSize="text-2xl md:text-3xl"
            />
          ))}
        </div>
      </div>

      {/* 2. Secondary Info Cards (Container Aligned) */}
      <div className="cw-container py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardArticles.map((post) => (
            <Link
              key={post.slug.current}
              href={`/article/${post.slug.current}`}
              className="group flex flex-col gap-4"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                {post.mainImage?.asset ? (
                  <Image
                    src={"url" in post.mainImage.asset ? post.mainImage.asset.url : ""}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
                {post.exclusive && (
                  <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-2xl">
                    <Lock size={10} /> Exclusive
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">
                  {post.tags[0]?.title || "Field Report"}
                </span>
                <h3 className="text-lg font-bold leading-tight group-hover:underline decoration-offset-4 decoration-red-600">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {moment(post.publishedAt).fromNow()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const HeroItem = ({
  article,
  className = "",
  priority = false,
  fontSize = "text-3xl"
}: {
  article: Article & { exclusive?: boolean },
  className?: string,
  priority?: boolean,
  fontSize?: string
}) => {
  return (
    <Link
      href={`/article/${article.slug.current}`}
      className={`relative group overflow-hidden block ${className}`}
    >
      <div className="absolute inset-0 bg-gray-100">
        {article.mainImage?.asset ? (
          <Image
            src={"url" in article.mainImage.asset ? article.mainImage.asset.url : ""}
            alt={article.mainImage.alt || article.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-400" />
        )}
      </div>

      {/* Scrim for legibility */}
      <div className="absolute inset-0 text-scrim opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="inline-block bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
            {article.tags[0]?.title || "Special Report"}
          </span>
          {article.exclusive && (
            <span className="bg-white text-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Lock size={10} strokeWidth={3} /> Member Access
            </span>
          )}
        </div>

        <h2 className={`${fontSize} text-white font-black leading-[1.1] tracking-tight group-hover:text-red-500 transition-colors mb-6`}>
          {article.title}
        </h2>

        <div className="flex items-center gap-6 pt-6 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em]">Filed By</span>
            <span className="text-[11px] text-white font-black uppercase tracking-widest">{article.author.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em]">Published</span>
            <span className="text-[11px] text-white/60 font-black uppercase tracking-widest">{moment(article.publishedAt).format("DD MMM YYYY")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
