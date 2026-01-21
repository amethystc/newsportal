"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import moment from "moment";
import { Article } from "@/types";

interface RegionSpotlightProps {
    articles: Article[];
}

export function RegionSpotlight({ articles }: RegionSpotlightProps) {
    const leftCards = articles.slice(0, 4);
    const rightTop = articles[4];
    const rightList = articles.slice(5, 9);

    return (
        <section className="w-full bg-white py-16 lg:py-24">
            <div className="cw-container">
                <div className="flex items-center justify-between mb-12 border-b-2 border-black pb-4">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-4">
                        <span className="w-8 h-[2px] bg-red-600 hidden md:block" />
                        Region <span className="text-red-600 italic">Spotlight</span>
                    </h2>
                    <Link
                        href="/regions"
                        className="text-[10px] font-black uppercase tracking-widest hover:text-red-600 flex items-center gap-2 group transition-colors"
                    >
                        Intel by Territory <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <div className="grid gap-8 sm:grid-cols-2">
                            {leftCards.map((article) => (
                                <Link
                                    key={article.slug.current}
                                    href={`/article/${article.slug.current}`}
                                    className="group flex flex-col gap-4"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden border border-gray-100">
                                        {article.mainImage?.asset ? (
                                            <Image
                                                src={"url" in article.mainImage.asset ? article.mainImage.asset.url : ""}
                                                alt={article.mainImage.alt || article.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200" />
                                        )}
                                        <span className="absolute top-3 left-3 px-2 py-1 text-[9px] font-black uppercase text-white bg-red-600 shadow-lg">
                                            {article.region?.country?.title || article.region?.continent?.title || "Field"}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                            <Clock size={12} />
                                            <span>{moment(article.publishedAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-8 bg-gray-50 p-8 border-l-4 border-black">
                        {rightTop && (
                            <Link
                                href={`/article/${rightTop.slug.current}`}
                                className="group flex flex-col gap-4 border-b border-gray-200 pb-8"
                            >
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    {rightTop.mainImage?.asset ? (
                                        <Image
                                            src={"url" in rightTop.mainImage.asset ? rightTop.mainImage.asset.url : ""}
                                            alt={rightTop.mainImage.alt || rightTop.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-all"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300" />
                                    )}
                                    <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-black uppercase px-2 py-1 tracking-widest">
                                        Featured Region
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-black text-xl leading-tight mb-2 group-hover:text-red-600 transition-colors">
                                        {rightTop.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-medium capitalize">
                                        {rightTop.excerpt}
                                    </p>
                                </div>
                            </Link>
                        )}

                        <div className="flex flex-col gap-6">
                            {rightList.map((article) => (
                                <Link
                                    key={article.slug.current}
                                    href={`/article/${article.slug.current}`}
                                    className="group flex flex-col gap-1 border-b border-gray-200 last:border-none pb-4"
                                >
                                    <h4 className="font-bold text-sm leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-widest">
                                        <span>{moment(article.publishedAt).format("DD MMM YYYY")}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
