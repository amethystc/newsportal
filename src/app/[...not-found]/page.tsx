import Link from "next/link";
import { Metadata } from "next";
import { Home, Search } from "lucide-react";

// SEO Metadata for 404 page
export const metadata: Metadata = {
  title: "Page Not Found - Conflict News Portal",
  description:
    "The page you're looking for doesn't exist. Return to Conflict News Portal homepage for latest conflict and humanitarian news.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-600">404</h1>
          <div className="h-1 w-32 bg-red-600 mx-auto mt-2"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-gray-500">
            The article you're searching for might have been removed, had its
            name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            <Home size={20} />
            Back to Homepage
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-gray-50 rounded-lg p-6 text-left">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            You might be interested in:
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              Latest Conflict News
            </Link>
            <Link
              href="/magazine"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              Monthly Magazine
            </Link>
            <Link
              href="/glossary"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              Conflict Glossary
            </Link>
            <Link
              href="/regions"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              Regional Coverage
            </Link>
          </div>
        </div>

        {/* Report Broken Link */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you believe this is a broken link, please
            <Link
              href="/contact"
              className="text-red-600 hover:text-red-700 underline ml-1"
            >
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
