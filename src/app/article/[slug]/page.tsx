import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User as UserIcon } from "lucide-react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { client } from "@/sanity/client";
import { articleQuery } from "@/sanity/queries";
import { Tag } from "@/types";
import { PortableText } from "@/components/ui/portable-text";
import moment from "moment";
import Image from "next/image";
import { ArticleBreadcrumb } from "@/components/article/ArticleBreadcrumb";
import { RelatedArticles } from "@/components/article/RelatedArticles";

// Direct article fetching function
async function getArticleBySlug(slug: string) {
  try {
    const article = await client.fetch(articleQuery, { slug }, { next: { revalidate: 0 } });
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
      return {
        title: "Article Not Found | Conflict Wire",
        description: "The requested intelligence report could not be located.",
      };
    }

    return {
      title: article.title,
      description: article.excerpt,
      keywords: article.tags?.map((tag: Tag) => tag.title).join(", "),
      authors: [{ name: article.author.name }],
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: "article",
        publishedTime: article.publishedAt,
        authors: [article.author.name],
        images: article.mainImage?.asset?.url
          ? [
            {
              url: article.mainImage.asset.url,
              width: article.mainImage.asset.metadata?.dimensions?.width || 1200,
              height: article.mainImage.asset.metadata?.dimensions?.height || 630,
              alt: article.mainImage.alt || article.title,
            },
          ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: article.mainImage?.asset?.url ? [article.mainImage.asset.url] : [],
      },
    };
  } catch {
    return {
      title: "Article | Conflict Wire",
      description: "Field reports and investigations from Conflict Wire.",
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: article.mainImage?.asset?.url,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      url: `https://conflictwire.co.uk/author/${article.author.slug.current}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Conflict Wire",
      logo: {
        "@type": "ImageObject",
        url: `https://conflictwire.co.uk/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://conflictwire.co.uk/article/${article.slug.current}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-white">
        <Header />

        <main className="pb-20">
          {/* 1. Impact Hero Header */}
          <div className="bg-gray-50 border-b border-gray-100 py-12 md:py-20">
            <div className="cw-container">
              <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest mb-12 hover:underline">
                  <ArrowLeft size={14} /> Back to Intel Feed
                </Link>

                <div className="flex items-center gap-4 mb-8">
                  <span className="bg-black text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-[0.2em]">
                    {article.category?.title || "Field Report"}
                  </span>
                  <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    Published {moment(article.publishedAt).format("DD MMM YYYY")}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter mb-12">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-black/5">
                  <div className="flex items-center gap-4">
                    {article.author?.image?.asset?.url && (
                      <Image
                        src={article.author.image.asset.url}
                        alt={article.author.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-white shadow-xl"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Filed By</span>
                      <span className="font-black text-sm uppercase tracking-widest">{article.author?.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-red-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {article.estimatedReadTime || 5} Min Read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Main content area */}
          <div className="cw-container pt-12">
            <div className="max-w-3xl mx-auto">
              {/* Featured Image */}
              {article.mainImage?.asset?.url && (
                <div className="relative aspect-[16/9] mb-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] border-4 border-white overflow-hidden bg-gray-100">
                  <Image
                    src={article.mainImage.asset.url}
                    alt={article.mainImage.alt || article.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  {article.mainImage.caption && (
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 text-white text-[10px] font-bold uppercase tracking-widest border-l-4 border-red-600">
                      {article.mainImage.caption}
                    </div>
                  )}
                </div>
              )}

              {/* Body text */}
              <div className="mb-20">
                {article.body && <PortableText value={article.body} />}
              </div>

              {/* Tags & Related */}
              <div className="pt-12 border-t border-gray-100">
                <div className="flex flex-wrap gap-3 mb-20">
                  {article.tags?.map((tag: Tag) => (
                    <Link
                      key={tag.slug.current}
                      href={`/tag/${tag.slug.current}`}
                      className="px-4 py-2 bg-gray-50 border border-gray-100 text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                      #{tag.title}
                    </Link>
                  ))}
                </div>

                <RelatedArticles articles={article.relatedArticles || []} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
