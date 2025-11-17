import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { client } from "@/sanity/client";
import { articleQuery } from "@/sanity/queries";
import { Tag } from "@/types";
import { PortableText } from "@/components/ui/portable-text";
import { ArticleBreadcrumb } from "@/components/article/ArticleBreadcrumb";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleMainImage } from "@/components/article/ArticleMainImage";
import { ArticleTags } from "@/components/article/ArticleTags";
import { RelatedArticles } from "@/components/article/RelatedArticles";

// Direct article fetching function
async function getArticleBySlug(slug: string) {
  try {
    const article = await client.fetch(articleQuery, { slug });
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

// Generate metadata untuk SEO
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
        title: "Article Not Found - Conflict News Portal",
        description: "The article you're looking for doesn't exist.",
      };
    }

    return {
      title: `${article.title} - Conflict News Portal`,
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
                width:
                  article.mainImage.asset.metadata?.dimensions?.width || 1200,
                height:
                  article.mainImage.asset.metadata?.dimensions?.height || 630,
                alt: article.mainImage.alt || article.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: article.mainImage?.asset?.url
          ? [article.mainImage.asset.url]
          : [],
      },
    };
  } catch {
    return {
      title: "Article - Conflict News Portal",
      description: "Read latest articles from Conflict News Portal.",
    };
  }
}

// Main article page component
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  // Handle not found
  if (!article) {
    notFound();
  }

  // Structured data untuk SEO
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
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/author/${article.author.slug.current}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Conflict News Portal",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL}/article/${article.slug.current}`,
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />

        {/* Breadcrumb */}
        <ArticleBreadcrumb article={article} />

        {/* Article Content */}
        <article className="container mx-auto px-4 sm:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <ArticleHeader article={article} />

            {/* Main Image */}
            <ArticleMainImage article={article} />

            {/* Article Body */}
            {article.body && (
              <PortableText
                value={article.body}
                className="max-w-none mb-12 text-gray-800 leading-relaxed"
              />
            )}

            {/* Tags */}
            <ArticleTags article={article} />

            {/* Back Button */}
            <div className="mb-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Articles
              </Link>
            </div>

            {/* Related Articles */}
            <RelatedArticles articles={article.relatedArticles || []} />
          </div>
        </article>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
