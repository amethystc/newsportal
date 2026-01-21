import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import MobileNavigationWrapper from "@/components/layout/MobileNavigationWrapper";
import ClientProviders from "@/components/layout/ClientProviders";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://conflictwire.co.uk",
  ),
  title: {
    default:
      "Conflict Wire - Latest Global Conflict & Humanitarian News",
    template: "%s | Conflict Wire",
  },
  description:
    "Stay informed with comprehensive coverage of global conflicts, humanitarian crises, and peacebuilding efforts. Expert analysis and on-the-ground reporting from conflict zones worldwide.",
  keywords: [
    "conflict news",
    "humanitarian crisis",
    "war reporting",
    "peacebuilding",
    "global security",
    "military analysis",
    "diplomatic relations",
  ],
  authors: [{ name: "Conflict Wire" }],
  creator: "Conflict Wire",
  publisher: "Conflict Wire",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Conflict Wire - Latest Global Conflict & Humanitarian News",
    description:
      "Comprehensive coverage of global conflicts and humanitarian crises with expert analysis.",
    siteName: "Conflict Wire",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Conflict Wire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conflict Wire",
    description:
      "Latest global conflict and humanitarian news with expert analysis.",
    images: ["/twitter-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${beVietnamPro.variable} antialiased`}
      >
        <ClientProviders>
          <MobileNavigationWrapper>{children}</MobileNavigationWrapper>
        </ClientProviders>
      </body>
    </html>
  );
}
