"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  // Disable/enable body scroll when sidebar is open/closed
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full min-h-[15vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-100">
      {/*SEARCH*/}
      <div className="hidden md:flex flex-row justify-end items-center gap-2 w-full p-2">
        <form
          onSubmit={handleSearch}
          className="flex flex-row gap-2 items-center border border-gray-800 p-1 rounded-md"
        >
          <Search size="20" className="text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[200px] border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </form>
        <Button
          variant="outline"
          className="border-2 border-red-500 bg-red-400/10 font-semibold xl:text-lg text-red-500 hover:text-red-600 hover:bg-red-400/20"
        >
          JOIN NOW
        </Button>
      </div>
      {/*NAVIGATION*/}
      {/* Logo */}
      <Link href="/" className="text-xl font-bold ">
        <Image
          src="/conflict-wire-logo.png"
          alt="Logo"
          width={60}
          height={60}
          className="fixed top-2 sm:left-[0em] xl:left-[7em] md:w-[115px] md:h-[115px]"
          priority
          unoptimized
        />
      </Link>
      <nav className=" mx-auto px-4 py-4">
        <div className="flex">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-start space-x-6 w-full">
            <NavigationMenu className="ml-auto sm:ml-auto md:ml-auto lg:mx-auto">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="border-r-2 border-black text-red-600 group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    MYANMAR
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    CONFLICT
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    HIUMANTARIAN
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    TRADE
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    GEOPOLITICS
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    SPACES
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="default"
            size="icon-lg"
            className="md:hidden ml-auto rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-[9999] md:hidden"
            style={{
              zIndex: 9999,
              isolation: "isolate",
              transform: "translateZ(0)",
            }}
          >
            {/* Disable body scroll */}
            <div
              className="absolute inset-0 bg-black/50"
              style={{ zIndex: 1 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <div
              className="absolute right-0 top-0 h-screen w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
              style={{ zIndex: 2, transform: "translateZ(0)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
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
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        MYANMAR
                      </Link>
                    </div>

                    {/* CONFLICT */}
                    <div className="border-b border-gray-200 pb-2">
                      <Link
                        href="/"
                        className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        CONFLICT
                      </Link>
                    </div>

                    {/* HIUMANTARIAN */}
                    <div className="border-b border-gray-200 pb-2">
                      <Link
                        href="/"
                        className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        HIUMANTARIAN
                      </Link>
                    </div>

                    {/* TRADE */}
                    <div className="border-b border-gray-200 pb-2">
                      <Link
                        href="/"
                        className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        TRADE
                      </Link>
                    </div>

                    {/* GEOPOLITICS */}
                    <div className="border-b border-gray-200 pb-2">
                      <Link
                        href="/"
                        className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        GEOPOLITICS
                      </Link>
                    </div>

                    {/* SPACES */}
                    <div className="pb-4">
                      <Link
                        href="/"
                        className="block w-full text-left font-bold py-3 px-4 hover:bg-gray-50 rounded transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
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
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      JOIN NOW
                    </Button>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/*FOOTER Headers*/}
      <div className="bg-red-500 w-full min-h-[20px]"></div>
      <div className="bg-black w-full min-h-[20px] flex">
        <div className="w-[90%] md:w-1/2 mx-auto">
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover
            className="flex flex-row items-center gap-10 p-2"
          >
            <p className="text-white font-bold text-[12px] whitespace-nowrap mr-2">
              LIVE NEWS UPDATE!
            </p>
            <p className="text-white text-sm mr-2">
              Port Blockade Chokes Grain Exports
            </p>
            <button className="hidden md:block p-1 bg-green-700 text-white font-bold text-sm">
              MYANMAR
            </button>
          </Marquee>
        </div>
      </div>
    </header>
  );
};

export default Header;
