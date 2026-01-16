
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorChoiceV2 } from "@/components/section/EditorChoiceV2";
import { client } from "@/sanity/client";
import { allArticlesQuery } from "@/sanity/queries";

// Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
    title: "All Articles - Conflict News Portal",
    description: "Browse all latest articles, news, and analysis.",
};

export default async function ArticlesPage() {
    const articles = await client.fetch(allArticlesQuery);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <div className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4 sm:px-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-unbounded">All Articles</h1>
                        <p className="text-xl opacity-90">
                            Comprehensive coverage of global events, analysis, and reports.
                        </p>
                    </div>
                </div>

                {/* Articles Section */}
                <section className="py-12">
                    <EditorChoiceV2
                        title="LATEST ARTICLES"
                        articles={articles}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
}
