"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
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
      // Implement search functionality here
    }
  };

  return (
    <header className="w-full min-h-[15vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
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
            variant="ghost"
            size="icon-lg"
            className="md:hidden ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <nav className="flex flex-col space-y-3">
              {/* Mobile Search */}
              <div className="pb-3 border-b">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center space-x-2"
                >
                  <div className="flex flex-row gap-2 items-center border border-gray-800 p-1 rounded-md flex-1">
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

              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Beranda
              </Link>

              <Link
                href="/tentang"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tentang
              </Link>
              <Button
                variant="outline"
                className="border-2 border-red-500 bg-red-400/10 font-semibold text-red-500 hover:text-red-600 hover:bg-red-400/20 w-full"
              >
                JOIN NOW
              </Button>
            </nav>
          </div>
        )}
      </nav>
      {/*FOOTER*/}
      <div className="bg-red-500 w-full min-h-[20px]"></div>
      <div className="bg-black w-full min-h-[20px] flex">
        {/* kiri: marquee jalan */}
        <div className="w-1/2 mx-auto">
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
