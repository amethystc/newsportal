
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorsChoiceV2 } from "@/components/section/EditorChoiseV2";
import { client } from "@/sanity/client";
import { articlesByContinentQuery, continentBySlugQuery } from "@/sanity/queries.region";
import { notFound } from "next/navigation";

// Cache for 1 hour
export const revalidate = 3600;

interface PageProps {
    params: {
        continent: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { continent } = params;
    try {
        const continentData = await client.fetch(continentBySlugQuery, { slug: continent });
        if (!continentData) return { title: "Region Not Found" };
        return {
            title: `${continentData.title} News - Conflict News Portal`,
            description: `Latest news and events from ${continentData.title}.`,
        };
    } catch (e) {
        return {
            title: "Region News - Conflict News Portal"
        }
    }
}

export default async function ContinentPage({ params }: PageProps) {
    const { continent } = params;

    const continentData = await client.fetch(continentBySlugQuery, { slug: continent });
    if (!continentData) {
        notFound();
    }

    const articles = await client.fetch(articlesByContinentQuery, { continentSlug: continent });

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <div className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4 sm:px-6">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-unbounded uppercase">
                            {continentData.title}
                        </h1>
                        <p className="text-xl opacity-90">
                            Coverage and updates from {continentData.title}
                        </p>
                    </div>
                </div>

                {/* Countries List */}
                <section className="py-8 bg-gray-50 border-b">
                    <div className="container mx-auto px-4">
                        <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Countries in {continentData.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {continentData.countries?.map((country: any) => (
                                <a
                                    key={country._id}
                                    href={`/regions/${continent}/${country.slug.current}`}
                                    className="text-sm px-3 py-1 bg-white border rounded-full hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                                >
                                    {country.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Articles Section */}
                <section className="py-12">
                    {articles.length > 0 ? (
                        <EditorsChoiceV2
                            title={`LATEST FROM ${continentData.title.toUpperCase()}`}
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
