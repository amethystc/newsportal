import type { Metadata } from "next";
import { Be_Vietnam_Pro, Unbounded } from "next/font/google";
import "./globals.css";
import MobileNavigationWrapper from "@/components/layout/MobileNavigationWrapper";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Reduced weights for performance
  display: "swap",
  preload: true, // Preload critical font
  fallback: ['system-ui', 'sans-serif'], // Better fallbacks
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Reduced weights for performance
  display: "swap",
  preload: false, // Don't preload secondary font
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "Conflict News Portal - Latest Global Conflict & Humanitarian News",
    template: "%s | Conflict News Portal"
  },
  description: "Stay informed with comprehensive coverage of global conflicts, humanitarian crises, and peacebuilding efforts. Expert analysis and on-the-ground reporting from conflict zones worldwide.",
  keywords: ["conflict news", "humanitarian crisis", "war reporting", "peacebuilding", "global security", "military analysis", "diplomatic relations"],
  authors: [{ name: "Conflict News Portal" }],
  creator: "Conflict News Portal",
  publisher: "Conflict News Portal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Conflict News Portal - Latest Global Conflict & Humanitarian News',
    description: 'Comprehensive coverage of global conflicts and humanitarian crises with expert analysis.',
    siteName: 'Conflict News Portal',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Conflict News Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conflict News Portal',
    description: 'Latest global conflict and humanitarian news with expert analysis.',
    images: ['/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: '/',
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
        {/* Preload critical font */}
        <link 
          rel="preload" 
          href="/_next/static/media/be-vietnam-pro-latin-400-normal.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${beVietnamPro.variable} ${unbounded.variable} font-sans antialiased`}
      >
        <MobileNavigationWrapper>
          {children}
        </MobileNavigationWrapper>
      </body>
    </html>
  );
}
