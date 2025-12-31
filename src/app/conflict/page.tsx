import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorsChoiceV2 } from "@/components/section/EditorChoiseV2";
import { client } from "@/sanity/client";
import { conflictQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Conflict News - Conflict News Portal",
  description: "Latest conflict news and analysis from around the world.",
};

async function getConflictArticles() {
  try {
    const articles = await client.fetch(conflictQuery, { tag: "Conflict" } as any);
    return articles;
  } catch (error) {
    console.error("Error fetching conflict articles:", error);
    return [];
  }
}

export default async function ConflictPage() {
  const articles = await getConflictArticles();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Conflict</h1>
            <p className="text-xl opacity-90">
              Latest conflict news and analysis from around the world
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <section className="py-12">
          <EditorsChoiceV2
            title="CONFLICT NEWS"
            articles={articles}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
