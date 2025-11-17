import { Metadata } from "next";
import Header from "@/components/layout/Header";
import EditorChoise from "@/components/section/EditorChoise";
import { EditorsChoiceV2 } from "@/components/section/EditorChoiseV2";
import Exclusive from "@/components/section/Exclusive";
import { Footer } from "@/components/section/Footer";
import Hero from "@/components/section/Hero";
import { RegionSpotlight } from "@/components/section/RegionSpotLight";
import { SubscriptionCTA } from "@/components/section/SubscribtionCTA";
import { BackToTop } from "@/components/ui/BackToTop";
import { HomepageData } from "@/types";

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

// Data fetching function
async function getHomepageData(): Promise<HomepageData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/news`, {
      next: { revalidate: 30 },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // console.log(result);
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
        <EditorChoise background="bg-gray-200" article={data.conflict} />
        <Exclusive />
        <EditorsChoiceV2 articles={data.geopolitics} />
        <EditorsChoiceV2 articles={data.trade} />
        <SubscriptionCTA />
        <RegionSpotlight articles={data.regionSpotlight} />
        <EditorChoise background="bg-gray-200" article={data.spaces} />
        <Footer />
      </main>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}
