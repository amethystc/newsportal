"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const [searchQuery, setSearchQuery] = useState("");

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

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className="fixed inset-0 z-[9999] md:hidden"
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
                    href="/"
                    className="block w-full text-left font-bold text-red-600 py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    MYANMAR
                  </Link>
                </div>

                {/* CONFLICT */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    CONFLICT
                  </Link>
                </div>

                {/* HIUMANTARIAN */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    HIUMANTARIAN
                  </Link>
                </div>

                {/* TRADE */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    TRADE
                  </Link>
                </div>

                {/* GEOPOLITICS */}
                <div className="border-b border-gray-200 pb-2">
                  <Link
                    href="/"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    GEOPOLITICS
                  </Link>
                </div>

                {/* SPACES */}
                <div className="pb-4">
                  <Link
                    href="/"
                    className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                    onClick={onClose}
                  >
                    SPACES
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
