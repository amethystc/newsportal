import Image from "next/image";
import Link from "next/link";
import { Clock, Lock } from "lucide-react";
import moment from "moment";
import { Article } from "@/types";

interface EditorChoiceV2Props {
    title?: string;
    articles?: Article[];
}

export function EditorChoiceV2({
    articles = [],
    title,
}: EditorChoiceV2Props) {
    return (
        <section className="w-full bg-white my-16">
            <div className="container mx-auto px-4 sm:px-6 pt-6">
                <div className="relative mb-5">
                    <div className="h-[1px] w-full bg-black" />
                    <div className="absolute -top-10 left-0 bg-white px-3 py-1 rounded-t-md border-x border-t border-black">
                        <span className="text-2xl font-bold tracking-tight">
                            {title?.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
                    {articles.length > 0
                        ? articles.map((post, index) => (
                            <Link
                                key={post.slug.current}
                                href={`/article/${post.slug.current}`}
                                className="block border border-gray-200 rounded-md overflow-hidden bg-white"
                            >
                                <div className="relative w-full h-48 bg-gray-200">
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
                                        <div className="w-full h-full bg-gray-300 animate-pulse" />
                                    )}
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded">
                                        {post.tags[0]?.title || "NEWS"}
                                    </span>
                                </div>
                                <div className="p-3 flex flex-col gap-2">
                                    <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                        <span>By {post.author.name}</span>
                                        <span>•</span>
                                        <span>
                                            {moment(post.publishedAt).format("MMMM DD, YYYY")}
                                        </span>
                                        {post.exclusive && <Lock size={10} className="text-red-600 ml-1" />}
                                    </p>
                                </div>
                            </Link>
                        ))
                        : Array(4)
                            .fill(null)
                            .map((_, index) => (
                                <article
                                    key={index}
                                    className="border border-gray-200 rounded-md overflow-hidden bg-white"
                                >
                                    <div className="relative w-full h-48 bg-gray-200">
                                        <div className="w-full h-full bg-gray-300 animate-pulse" />
                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded">
                                            Loading...
                                        </span>
                                    </div>
                                    <div className="p-3 flex flex-col gap-2">
                                        <div className="h-4 bg-gray-300 animate-pulse rounded" />
                                        <div className="h-3 bg-gray-300 animate-pulse rounded w-3/4" />
                                        <div className="h-3 bg-gray-300 animate-pulse rounded w-1/2" />
                                    </div>
                                </article>
                            ))}
                </div>
            </div>
        </section>
    );
}
