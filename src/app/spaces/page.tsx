import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorsChoiceV2 } from "@/components/section/EditorChoiseV2";
import { client } from "@/sanity/client";
import { spacesQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Space News - Conflict News Portal",
  description: "Space militarization, satellite technology, and space-based surveillance.",
};

async function getSpacesArticles() {
  try {
    const articles = await client.fetch(spacesQuery, { tag: "Space" } as any);
    return articles;
  } catch (error) {
    console.error("Error fetching spaces articles:", error);
    return [];
  }
}

export default async function SpacesPage() {
  const articles = await getSpacesArticles();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-indigo-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Spaces</h1>
            <p className="text-xl opacity-90">
              Space militarization, satellite technology, and space-based surveillance
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <section className="py-12">
          <EditorsChoiceV2
            title="SPACE NEWS"
            articles={articles}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
