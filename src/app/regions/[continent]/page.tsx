
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorsChoiceV2 } from "@/components/section/EditorChoiseV2";
import { client } from "@/sanity/client";
import { articlesByWorldTagSlugQuery, worldTagBySlugQuery } from "@/sanity/queries.region";
import { notFound } from "next/navigation";

// Cache for 1 hour
export const revalidate = 3600;

interface PageProps {
    params: Promise<{
        continent: string; // Keeping 'continent' param name to avoid folder move issues, but it represents 'tagSlug'
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { continent: slug } = await params;
    try {
        const tagData = await client.fetch(worldTagBySlugQuery, { slug });
        if (!tagData) return { title: "Region Not Found" };
        return {
            title: `${tagData.title} News - Conflict News Portal`,
            description: `Latest news and events from ${tagData.title}.`,
        };
    } catch (e) {
        return {
            title: "Region News - Conflict News Portal"
        }
    }
}

export default async function WorldTagPage({ params }: PageProps) {
    const { continent: slug } = await params;

    const tagData = await client.fetch(worldTagBySlugQuery, { slug });
    if (!tagData) {
        notFound();
    }

    const articles = await client.fetch(articlesByWorldTagSlugQuery, { slug });

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <div className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4 sm:px-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-unbounded uppercase">
                            {tagData.title}
                        </h1>
                        <p className="text-xl opacity-90">
                            {tagData.description || `Coverage and updates from ${tagData.title}`}
                        </p>
                    </div>
                </div>

                {/* Articles Section */}
                <section className="py-12">
                    {articles.length > 0 ? (
                        <EditorsChoiceV2
                            title={`LATEST FROM ${tagData.title.toUpperCase()}`}
                            articles={articles}
                        />
                    ) : (
                        <div className="container mx-auto px-4 text-center py-20">
                            <h2 className="text-2xl font-bold text-gray-500">No recent articles found for this region.</h2>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
