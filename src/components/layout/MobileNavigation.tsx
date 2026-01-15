"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/client";
import { allContinentsWithCountriesQuery } from "@/sanity/queries.region";

import { useMember } from "@/context/MemberContext";
import { User, LogOut } from "lucide-react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const { member, logout, setIsSignInModalOpen } = useMember();
  const [searchQuery, setSearchQuery] = useState("");
  const [continents, setContinents] = useState<any[]>([]);
  const [expandedContinent, setExpandedContinent] = useState<string | null>(null);
  const [isWorldExpanded, setIsWorldExpanded] = useState(false);
  const [isArticlesExpanded, setIsArticlesExpanded] = useState(false);

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

            {/* Navigation Menu */}
            <nav className="p-4 bg-white z-30">
              {/* Member Access (Mobile) */}
              <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                {!member ? (
                  <button
                    onClick={() => {
                      setIsSignInModalOpen(true);
                      onClose();
                    }}
                    className="flex items-center gap-3 w-full font-unbounded-bold text-xs uppercase tracking-wider text-red-600"
                  >
                    <User size={18} />
                    Member Sign In
                  </button>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {member.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">
                          {member.membershipType.replace('_', ' ')}
                        </p>
                        <p className="text-sm font-unbounded-bold uppercase leading-none">
                          {member.fullName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        onClose();
                      }}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">

                {/* MAGAZINE */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/magazine"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    MAGAZINE
                  </Link>
                </div>

                {/* ARTICLES - Accordion */}
                <div className="border-b border-gray-200 pb-2">
                  <button
                    className="flex items-center justify-between w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setIsArticlesExpanded(!isArticlesExpanded)}
                  >
                    <span>ARTICLES</span>
                    {isArticlesExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>

                  {isArticlesExpanded && (
                    <div className="ml-4 mt-2 space-y-1">
                      {[
                        { label: "Conflict", href: "/conflict" },
                        { label: "Humanitarian", href: "/humanitarian" },
                        { label: "Trade", href: "/trade" },
                        { label: "Geopolitics", href: "/geopolitics" },
                        { label: "Spaces", href: "/spaces" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-sm text-gray-600 py-2 px-2 hover:bg-gray-100 rounded transition-colors"
                          onClick={onClose}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
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
                              {continent.countries?.slice(0, 5).map((country: any) => (
                                <Link
                                  key={country._id}
                                  href={`/regions/${continent.slug.current}/${country.slug.current}`}
                                  className="text-sm text-gray-600 py-1.5 px-2 hover:bg-gray-100 rounded transition-colors"
                                  onClick={onClose}
                                >
                                  {country.title}
                                </Link>
                              ))}
                              {continent.countries && continent.countries.length > 5 && (
                                <Link
                                  href={`/regions/${continent.slug.current}`}
                                  className="text-sm text-gray-400 py-1.5 px-2 hover:bg-gray-100 rounded transition-colors"
                                  onClick={onClose}
                                >
                                  ...
                                </Link>
                              )}
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

                {/* ABOUT */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/about"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    ABOUT
                  </Link>
                </div>

                {/* CONTACT */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/contact"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    CONTACT
                  </Link>
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
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
