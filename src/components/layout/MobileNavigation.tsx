"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/client";
import { allContinentsWithCountriesQuery } from "@/sanity/queries.region";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [continents, setContinents] = useState<any[]>([]);
  const [expandedContinent, setExpandedContinent] = useState<string | null>(null);
  const [isWorldExpanded, setIsWorldExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  // Disable/enable body scroll when sidebar is open/closed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await client.fetch(allContinentsWithCountriesQuery);
        setContinents(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    if (isOpen) {
      fetchRegions();
    }
  }, [isOpen]);

  const toggleContinent = (id: string) => {
    setExpandedContinent(expandedContinent === id ? null : id);
  };

  console.log("MobileNavigation render, isOpen:", isOpen);
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className="fixed inset-0 z-[9999]"
        style={{
          zIndex: 9999,
          isolation: "isolate",
          transform: "translateZ(0)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "auto",
        }}
      >
        {/* Disable body scroll */}
        <div
          className="absolute inset-0 bg-black/50"
          style={{
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onClick={onClose}
        />

        {/* Sidebar */}
        <div
          className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
          style={{
            zIndex: 2,
            transform: "translateZ(0)",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "20rem",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Mobile Search */}
            <div className="p-4 border-b">
              <form
                onSubmit={handleSearch}
                className="flex items-center space-x-2"
              >
                <div className="flex flex-row gap-2 items-center border border-gray-800 p-2 rounded-md flex-1">
                  <Search size="20" className="text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </form>
            </div>

            {/* Navigation Menu - Same as Desktop */}
            <nav className="p-4 bg-white z-30">
              <div className="space-y-2">
                {/* MYANMAR */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/myanmar"
                    className="block w-full text-left font-bold text-red-600 py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    MYANMAR
                  </Link>
                </div>

                {/* CONFLICT */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/conflict"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    CONFLICT
                  </Link>
                </div>

                {/* HUMANITARIAN */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/humanitarian"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    HUMANITARIAN
                  </Link>
                </div>

                {/* TRADE */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/trade"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    TRADE
                  </Link>
                </div>

                {/* GEOPOLITICS */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/geopolitics"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    GEOPOLITICS
                  </Link>
                </div>

                {/* SPACES */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/spaces"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    SPACES
                  </Link>
                </div>

                {/* WORLD / REGIONS - Dynamic */}
                <div className="border-b border-gray-200 pb-2">
                  <button
                    className="flex items-center justify-between w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setIsWorldExpanded(!isWorldExpanded)}
                  >
                    <span>WORLD</span>
                    {isWorldExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>

                  {isWorldExpanded && (
                    <div className="ml-4 mt-2 space-y-1">
                      {continents.map((continent) => (
                        <div key={continent._id} className="border-l-2 border-gray-100 pl-2">
                          <button
                            className="flex items-center justify-between w-full text-left font-semibold py-2 px-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                            onClick={() => toggleContinent(continent._id)}
                          >
                            <span className="uppercase tracking-wider">{continent.title}</span>
                            {expandedContinent === continent._id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </button>

                          {expandedContinent === continent._id && (
                            <div className="ml-4 flex flex-col space-y-1 py-1">
                              {continent.countries?.map((country: any) => (
                                <Link
                                  key={country._id}
                                  href={`/regions/${continent.slug.current}/${country.slug.current}`}
                                  className="text-sm text-gray-600 py-1.5 px-2 hover:bg-gray-100 rounded transition-colors"
                                  onClick={onClose}
                                >
                                  {country.title}
                                </Link>
                              ))}
                              {(!continent.countries || continent.countries.length === 0) && (
                                <span className="text-xs text-gray-400 italic px-2">No countries</span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      {continents.length === 0 && (
                        <div className="text-sm text-gray-500 italic p-2">Loading regions...</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* JOIN NOW Button */}
              <div className="mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  className="border-2 border-red-500 bg-red-400/10 font-semibold text-red-500 hover:text-red-600 hover:bg-red-400/20 w-full"
                  onClick={onClose}
                >
                  JOIN NOW
                </Button>
              </div>

              {/* Utility Links (New for Mobile) */}
              <div className="mt-8 pt-6 border-t grid grid-cols-2 gap-4">
                <Link
                  href="/magazine"
                  className="text-xs font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-wider px-4"
                  onClick={onClose}
                >
                  Magazine
                </Link>
                <Link
                  href="/articles"
                  className="text-xs font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-wider px-4"
                  onClick={onClose}
                >
                  Articles
                </Link>
                <Link
                  href="/about"
                  className="text-xs font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-wider px-4"
                  onClick={onClose}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-wider px-4"
                  onClick={onClose}
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
