"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Lock, ArrowRight } from "lucide-react";
import moment from "moment";
import { Article } from "@/types";

interface ArticleSectionProps {
    title: string;
    articles: Article[];
    columns?: 2 | 3 | 4;
}

export function ArticleSection({
    title,
    articles = [],
    columns = 3,
}: ArticleSectionProps) {
    if (!articles || articles.length === 0) return null;

    // Logic for "Humanitarian" / Single Article cases
    const isSingle = articles.length === 1;

    return (
        <section className="w-full bg-white py-16 lg:py-24">
            <div className="cw-container">
                {/* Standardized Section Header */}
                <div className="flex items-center justify-between mb-12 border-b-2 border-black pb-4">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-4">
                        <span className="w-8 h-[2px] bg-red-600 hidden md:block" />
                        {title}
                    </h2>
                    <Link
                        href={`/${title.toLowerCase()}`}
                        className="text-[10px] font-black uppercase tracking-widest hover:text-red-600 flex items-center gap-2 group transition-colors"
                    >
                        View Full Access <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {isSingle ? (
                    /* High-Impact Single Article (Horizontal) */
                    <Link
                        href={`/article/${articles[0].slug.current}`}
                        className="group flex flex-col md:flex-row gap-8 lg:gap-12 bg-gray-50 border border-gray-100 p-6 md:p-10 transition-all hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]"
                    >
                        <div className="relative w-full md:w-1/2 lg:w-3/5 aspect-[16/9] overflow-hidden shadow-xl">
                            {articles[0].mainImage?.asset ? (
                                <Image
                                    src={"url" in articles[0].mainImage.asset ? articles[0].mainImage.asset.url : ""}
                                    alt={articles[0].title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200" />
                            )}
                            {articles[0].exclusive && (
                                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <Lock size={12} /> Intelligence Only
                                </div>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                            <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                {articles[0].tags?.[0]?.title || "Field Analysis"}
                            </span>
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 group-hover:text-red-500 transition-colors">
                                {articles[0].title}
                            </h3>
                            <p className="text-gray-600 text-lg line-clamp-3 mb-8 leading-relaxed">
                                {articles[0].excerpt}
                            </p>
                            <div className="flex items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <span>{articles[0].author.name}</span>
                                <span>•</span>
                                <span>{moment(articles[0].publishedAt).format("MMM DD, YYYY")}</span>
                            </div>
                        </div>
                    </Link>
                ) : (
                    /* Standardized Grid */
                    <div className={`grid gap-x-8 gap-y-12 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
                        {articles.map((post) => (
                            <Link
                                key={post.slug.current}
                                href={`/article/${post.slug.current}`}
                                className="group flex flex-col gap-5"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 border border-transparent group-hover:border-gray-200 transition-all">
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
                                        <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-2xl">
                                            <Lock size={10} /> Exclusive
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-red-600 text-[9px] font-black uppercase tracking-[0.2em]">
                                        {post.tags?.[0]?.title || "News Update"}
                                    </span>
                                    <h3 className="text-lg font-bold leading-tight group-hover:text-red-500 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center justify-between text-[9px] text-gray-400 font-bold uppercase tracking-widest pt-4 border-t border-gray-100">
                                        <span>{post.author.name}</span>
                                        <div className="flex items-center gap-1.5 opacity-60">
                                            <Clock size={12} />
                                            <span>{moment(post.publishedAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
