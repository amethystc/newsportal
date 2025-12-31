import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { EditorsChoiceV2 } from "@/components/section/EditorChoiseV2";
import { client } from "@/sanity/client";
import { tradeQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Trade News - Conflict News Portal",
  description: "Trade relations, economic sanctions, and business impact of global conflicts.",
};

async function getTradeArticles() {
  try {
    const articles = await client.fetch(tradeQuery, { tag: "Trade" } as any);
    return articles;
  } catch (error) {
    console.error("Error fetching trade articles:", error);
    return [];
  }
}

export default async function TradePage() {
  const articles = await getTradeArticles();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-green-600 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Trade</h1>
            <p className="text-xl opacity-90">
              Trade relations, economic sanctions, and business impact of global conflicts
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <section className="py-12">
          <EditorsChoiceV2
            title="TRADE NEWS"
            articles={articles}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
