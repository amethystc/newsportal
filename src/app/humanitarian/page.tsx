import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorChoiceV2 } from "@/components/section/EditorChoiceV2";
import { client } from "@/sanity/client";
import { humanitarianQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Humanitarian News - Conflict News Portal",
  description: "Humanitarian crises coverage, relief efforts, and aid organizations worldwide.",
};

async function getHumanitarianArticles() {
  try {
    const articles = await client.fetch(humanitarianQuery, { tag: "Humanitarian" } as any);
    return articles;
  } catch (error) {
    console.error("Error fetching humanitarian articles:", error);
    return [];
  }
}

export default async function HumanitarianPage() {
  const articles = await getHumanitarianArticles();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Humanitarian</h1>
            <p className="text-xl opacity-90">
              Humanitarian crises coverage, relief efforts, and aid organizations
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <section className="py-12">
          <EditorChoiceV2
            title="HUMANITARIAN NEWS"
            articles={articles}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
