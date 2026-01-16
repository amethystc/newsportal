"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { MyanmarSubscriptionModal } from "@/components/modal/MyanmarSubscriptionModal";
import { EditorChoiceV2 } from "@/components/section/EditorChoiceV2";
import { Article } from "@/types";
import { client } from "@/sanity/client";
import { myanmarQuery } from "@/sanity/queries";

export default function MyanmarPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMyanmarNews = async () => {
      try {
        const news = await client.fetch(myanmarQuery, { region: "Myanmar" } as any);
        setArticles(news);
      } catch (error) {
        console.error("Error fetching Myanmar news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyanmarNews();
  }, []);

  useEffect(() => {
    // Show modal after a short delay
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />

      {/* Myanmar Subscription Modal */}
      <MyanmarSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          router.push("/");
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-red-600 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Myanmar</h1>
            <p className="text-xl opacity-90">
              Exclusive coverage of Myanmar conflict and humanitarian situation
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <section className="py-12">
          <EditorChoiceV2
            title="MYANMAR UPDATE"
            articles={articles}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
