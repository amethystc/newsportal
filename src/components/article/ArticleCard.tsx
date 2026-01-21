import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { Clock, Lock } from 'lucide-react';

interface ArticleCardProps {
    article: {
        title: string;
        slug: { current: string };
        excerpt?: string;
        mainImage?: {
            asset: {
                url: string;
                metadata?: {
                    dimensions: {
                        width: number;
                        height: number;
                    };
                };
            };
            alt?: string;
        };
        author?: {
            name: string;
            slug?: { current: string };
        };
        publishedAt: string;
        exclusive?: boolean;
        region?: {
            title: string;
            slug?: { current: string };
        };
        tags?: Array<{
            title: string;
            slug?: { current: string };
        }>;
    };
    showExcerpt?: boolean;
    imageHeight?: string;
}

export function ArticleCard({
    article,
    showExcerpt = true,
    imageHeight = "h-48"
}: ArticleCardProps) {
    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = article.excerpt ? article.excerpt.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 50)); // Rough estimate from excerpt

    return (
        <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
            {/* Exclusive Badge for whole card */}
            {article.exclusive && (
                <div className="absolute top-0 right-0 z-20">
                    <div className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-tighter flex items-center gap-1.5 rounded-bl-lg shadow-lg">
                        <Lock size={10} strokeWidth={3} />
                        Exclusive
                    </div>
                </div>
            )}

            {/* Article Image */}
            {article.mainImage?.asset?.url && (
                <Link href={`/article/${article.slug.current}`} className="block relative overflow-hidden">
                    <div className={`relative ${imageHeight} w-full`}>
                        <Image
                            src={article.mainImage.asset.url}
                            alt={article.mainImage.alt || article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Overlay for exclusive content */}
                        {article.exclusive && (
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                        )}
                    </div>

                    {/* Category Badge */}
                    {article.region && (
                        <div className="absolute top-3 left-3">
                            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                {article.region.title}
                            </span>
                        </div>
                    )}
                </Link>
            )}

            {/* Article Content */}
            <div className="p-5">
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag.slug?.current || tag.title}
                                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                            >
                                {tag.title}
                            </span>
                        ))}
                    </div>
                )}

                {/* Title */}
                <Link href={`/article/${article.slug.current}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors flex items-start gap-2">
                        {article.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                {showExcerpt && article.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                    </p>
                )}

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        {/* Author */}
                        {article.author && (
                            <>
                                {article.author.slug ? (
                                    <Link
                                        href={`/author/${article.author.slug.current}`}
                                        className="hover:text-red-600 transition-colors font-medium"
                                    >
                                        {article.author.name}
                                    </Link>
                                ) : (
                                    <span className="font-medium">{article.author.name}</span>
                                )}
                            </>
                        )}

                        {/* Date */}
                        <time dateTime={article.publishedAt} className="text-xs">
                            {moment(article.publishedAt).format('MMM D, YYYY')}
                        </time>
                    </div>

                    {/* Reading Time */}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{readingTime} min</span>
                        {article.exclusive && <span className="text-red-600 font-bold ml-1">• Premium</span>}
                    </div>
                </div>
            </div>
        </article>
    );
}
