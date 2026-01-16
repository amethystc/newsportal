// src/components/RegionSpotlight.tsx
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import moment from "moment";
import { Article } from "@/types";

interface RegionSpotlightProps {
    articles: Article[];
}

export function RegionSpotlight({ articles }: RegionSpotlightProps) {
    const leftCards = articles.slice(0, 6);
    const rightTop = articles[6];
    const rightList = articles.slice(7, 11);

    return (
        <section className="w-full bg-white">
            <div className="container mx-auto px-4 sm:px-6 py-6">
                <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">
                    REGION <span className="text-red-600">SPOTLIGHT</span>
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2 bg-[#f5f5f5] p-4 rounded-sm">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {leftCards.map((article, index) => (
                                <Link
                                    key={article.slug.current}
                                    href={`/article/${article.slug.current}`}
                                    className="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    <div className="relative h-48">
                                        {article.mainImage?.asset ? (
                                            <Image
                                                src={
                                                    "url" in article.mainImage.asset
                                                        ? article.mainImage.asset.url
                                                        : ""
                                                }
                                                alt={article.mainImage.alt || article.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300" />
                                        )}
                                        <span className="absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold uppercase text-white bg-red-600 rounded">
                                            {article.region?.country?.title || article.region?.continent?.title || "NEWS"}
                                        </span>
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Clock size={12} />
                                            <span>{moment(article.publishedAt).fromNow()}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {rightTop && (
                            <Link
                                href={`/article/${rightTop.slug.current}`}
                                className="border border-gray-200 rounded-sm overflow-hidden bg-white hover:shadow-md transition-shadow"
                            >
                                <div className="relative h-48">
                                    {rightTop.mainImage?.asset ? (
                                        <Image
                                            src={
                                                "url" in rightTop.mainImage.asset
                                                    ? rightTop.mainImage.asset.url
                                                    : ""
                                            }
                                            alt={rightTop.mainImage.alt || rightTop.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300" />
                                    )}
                                    <span className="absolute top-2 left-2 bg-gray-400 text-white text-[10px] font-semibold uppercase px-2 py-1 rounded">
                                        {rightTop.region?.country?.title || rightTop.region?.continent?.title || "NEWS"}
                                    </span>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">
                                        {rightTop.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 line-clamp-2">
                                        {rightTop.excerpt}
                                    </p>
                                </div>
                            </Link>
                        )}

                        <div className="flex flex-col gap-3">
                            {rightList.map((article, index) => (
                                <Link
                                    key={article.slug.current}
                                    href={`/article/${article.slug.current}`}
                                    className="border-b border-gray-200 pb-3 last:border-0 hover:bg-gray-50 transition-colors"
                                >
                                    <h4 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                                        {article.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Clock size={12} />
                                        <span>{moment(article.publishedAt).fromNow()}</span>
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
