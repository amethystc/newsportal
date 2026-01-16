import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorChoiceV2 } from "@/components/section/EditorChoiceV2";
import { client } from "@/sanity/client";
import { geopoliticsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Geopolitics News - Conflict News Portal",
  description: "Geopolitical analysis, international relations, and diplomatic developments.",
};

async function getGeopoliticsArticles() {
  try {
    const articles = await client.fetch(geopoliticsQuery, { tag: "Geopolitics" } as any);
    return articles;
  } catch (error) {
    console.error("Error fetching geopolitics articles:", error);
    return [];
  }
}

export default async function GeopoliticsPage() {
  const articles = await getGeopoliticsArticles();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-purple-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Geopolitics</h1>
            <p className="text-xl opacity-90">
              Geopolitical analysis, international relations, and diplomatic developments
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <section className="py-12">
          <EditorChoiceV2
            title="GEOPOLITICS NEWS"
            articles={articles}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
