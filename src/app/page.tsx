import { Metadata } from "next";
import Header from "@/components/layout/Header";
import EditorChoice from "@/components/section/EditorChoice";
import { EditorChoiceV2 } from "@/components/section/EditorChoiceV2";
import Exclusive from "@/components/section/Exclusive";
import { Footer } from "@/components/section/Footer";
import Hero from "@/components/section/Hero";
import { RegionSpotlight } from "@/components/section/RegionSpotlight";
import { SubscriptionCTA } from "@/components/section/SubscriptionCTA";
import { BackToTop } from "@/components/ui/BackToTop";
import { HomepageData, NewsResponse } from "@/types";

// SEO Metadata
export const metadata: Metadata = {
  title: "Conflict News Portal - Latest Global Conflict & Humanitarian News",
  description:
    "Stay informed with comprehensive coverage of global conflicts, humanitarian crises, and peacebuilding efforts. Expert analysis and on-the-ground reporting from conflict zones worldwide.",
  keywords:
    "conflict news, humanitarian crisis, war reporting, peacebuilding, global security, military analysis, diplomatic relations",
  authors: [{ name: "Conflict News Portal" }],
  openGraph: {
    title: "Conflict News Portal - Latest Global Conflict & Humanitarian News",
    description:
      "Comprehensive coverage of global conflicts and humanitarian crises with expert analysis.",
    type: "website",
    locale: "en_US",
    siteName: "Conflict News Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conflict News Portal",
    description:
      "Latest global conflict and humanitarian news with expert analysis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Data fetching function through API
async function getHomepageData(): Promise<HomepageData> {
  try {
    console.log("Fetching homepage data from API...");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/news`,
      {
        next: { revalidate: 0 }, // No caching - always fetch fresh data
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: NewsResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || "API request failed");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    // Return empty data as fallback
    return {
      hero: [],
      editoChoice: [],
      spaces: [],
      geopolitics: [],
      trade: [],
      humanitarian: [],
      conflict: [],
      regionSpotlight: [],
      exclusive: [],
    };
  }
}

// Structured data generator
function generateStructuredData(data: HomepageData) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "Conflict News Portal",
    description:
      "Comprehensive coverage of global conflicts and humanitarian crises",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    logo: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: data.hero.length,
      itemListElement: data.hero.map((article, index) => ({
        "@type": "NewsArticle",
        position: index + 1,
        name: article.title,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/article/${article.slug.current}`,
        datePublished: article.publishedAt,
        author: {
          "@type": "Person",
          name: article.author.name,
        },
        publisher: {
          "@type": "Organization",
          name: "Conflict News Portal",
        },
      })),
    },
  };
}

// Main page component
export default async function Home() {
  const data = await getHomepageData();
  const structuredData = generateStructuredData(data);
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Main Content */}
      <main>
        <Header />
        <Hero articles={data.hero} />
        <EditorChoice
          title="Conflict"
          background="bg-gray-200"
          article={data.conflict}
        />
        <Exclusive articles={data.exclusive} />
        <EditorChoiceV2 title="HUMANITARIAN" articles={data.humanitarian} />
        <EditorChoiceV2 title="TRADE" articles={data.trade} />
        <SubscriptionCTA />
        <RegionSpotlight articles={data.regionSpotlight} />
        <EditorChoice
          title="GEOPOLITICS"
          background="bg-gray-200"
          article={data.geopolitics}
        />
        <Footer />
      </main>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}
