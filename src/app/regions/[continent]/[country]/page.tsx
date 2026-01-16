
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorsChoiceV2 } from "@/components/section/EditorChoiseV2";
import { client } from "@/sanity/client";
import { articlesByCountryQuery, countryBySlugQuery } from "@/sanity/queries.region";

// Cache for 1 hour
export const revalidate = 3600;

interface PageProps {
    params: Promise<{
        continent: string;
        country: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { country } = await params;
    // Fetch country title for better metadata
    try {
        const countryData = await client.fetch(countryBySlugQuery, { slug: country });
        const title = countryData?.title ? `${countryData.title} News` : "Region News";
        return {
            title: `${title} - Conflict News Portal`,
            description: `Latest news and analysis from ${countryData?.title || country}.`,
        };
    } catch (e) {
        return {
            title: "Region News - Conflict News Portal"
        }
    }
}

export default async function RegionCountryPage({ params }: PageProps) {
    const { country } = await params;

    // Fetch country details for the header
    const countryData = await client.fetch(countryBySlugQuery, { slug: country });
    // Fetch articles
    const articles = await client.fetch(articlesByCountryQuery, { countrySlug: country });

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <div className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4 sm:px-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-unbounded uppercase">
                            {countryData?.title || country}
                        </h1>
                        <p className="text-xl opacity-90">
                            Latest news and updates from {countryData?.title || country}
                        </p>
                    </div>
                </div>

                {/* Articles Section */}
                <section className="py-12">
                    {articles.length > 0 ? (
                        <EditorsChoiceV2
                            title={`LATEST FROM ${countryData?.title || country.toUpperCase()}`}
                            articles={articles}
                        />
                    ) : (
                        <div className="container mx-auto px-4 text-center py-20">
                            <h2 className="text-2xl font-bold text-gray-500">No articles found for this region.</h2>
                        </div>
                    )}

                </section>
            </main>
            <Footer />
        </>
    );
}
