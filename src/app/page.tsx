import { Metadata } from "next";
import Header from "@/components/layout/Header";
import { ArticleSection } from "@/components/section/ArticleSection";
import Exclusive from "@/components/section/Exclusive";
import { Footer } from "@/components/section/Footer";
import Hero from "@/components/section/Hero";
import { RegionSpotlight } from "@/components/section/RegionSpotlight";
import { SubscriptionCTA } from "@/components/section/SubscriptionCTA";
import { BackToTop } from "@/components/ui/BackToTop";
import { HomepageData } from "@/types";
import { client } from "@/sanity/client";
import {
  heroQuery,
  EditoChoiceQuery,
  spacesQuery,
  geopoliticsQuery,
  tradeQuery,
  humanitarianQuery,
  conflictQuery,
  regionSpotlightQuery,
  exclusiveQuery,
} from "@/sanity/queries";

// SEO Metadata
export const metadata: Metadata = {
  title: "Conflict Wire - Latest Global Conflict & Humanitarian News",
  description:
    "Stay informed with comprehensive coverage of global conflicts, humanitarian crises, and peacebuilding efforts. Expert analysis and on-the-ground reporting from conflict zones worldwide.",
  keywords:
    "conflict news, humanitarian crisis, war reporting, peacebuilding, global security, military analysis, diplomatic relations",
  authors: [{ name: "Conflict Wire" }],
  openGraph: {
    title: "Conflict Wire - Latest Global Conflict & Humanitarian News",
    description:
      "Comprehensive coverage of global conflicts and humanitarian crises with expert analysis.",
    type: "website",
    locale: "en_US",
    siteName: "Conflict Wire",
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

// Data fetching function directly from Sanity
async function getHomepageData(): Promise<HomepageData> {
  try {
    console.log("Fetching homepage data directly from Sanity...");

    // We can fetch all data in parallel for better performance
    const [
      hero,
      editoChoice,
      spaces,
      geopolitics,
      trade,
      humanitarian,
      conflict,
      regionSpotlight,
      exclusive,
    ] = await Promise.all([
      client.fetch(heroQuery),
      client.fetch(EditoChoiceQuery),
      client.fetch(spacesQuery),
      client.fetch(geopoliticsQuery),
      client.fetch(tradeQuery),
      client.fetch(humanitarianQuery),
      client.fetch(conflictQuery),
      client.fetch(regionSpotlightQuery),
      client.fetch(exclusiveQuery),
    ]);

    return {
      hero,
      editoChoice,
      spaces,
      geopolitics,
      trade,
      humanitarian,
      conflict,
      regionSpotlight,
      exclusive,
    };
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
    name: "Conflict Wire",
    description:
      "Comprehensive coverage of global conflicts and humanitarian crises",
    url: "https://conflictwire.co.uk",
    logo: `https://conflictwire.co.uk/logo.png`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: data.hero.length,
      itemListElement: data.hero.map((article, index) => ({
        "@type": "NewsArticle",
        position: index + 1,
        name: article.title,
        url: `https://conflictwire.co.uk/article/${article.slug.current}`,
        datePublished: article.publishedAt,
        author: {
          "@type": "Person",
          name: article.author.name,
        },
        publisher: {
          "@type": "Organization",
          name: "Conflict Wire",
        },
      })),
    },
  };
}

import MembershipCTA from "@/components/section/MembershipCTA";

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

        <ArticleSection
          title="Latest Field Stories"
          articles={data.conflict}
          columns={4}
        />

        <Exclusive articles={data.exclusive} />

        <MembershipCTA />

        <ArticleSection
          title="Humanitarian News"
          articles={data.humanitarian}
        />

        <ArticleSection
          title="Trade & Security"
          articles={data.trade}
          columns={3}
        />

        <SubscriptionCTA />

        <RegionSpotlight articles={data.regionSpotlight} />

        <ArticleSection
          title="Geopolitics"
          articles={data.geopolitics}
          columns={4}
        />

        <Footer />
      </main>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}
