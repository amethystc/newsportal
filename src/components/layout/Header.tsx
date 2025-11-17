"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="w-full min-h-[15vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-1000">
      {/*SEARCH*/}
      <div className="hidden md:flex flex-row justify-end items-center gap-2 w-[90%] p-2 ">
        <form className="flex flex-row gap-2 items-center border border-gray-800 p-1 rounded-md">
          <Search size="20" className="text-gray-600" />
          <input
            type="text"
            placeholder="Search"
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
      <Link href="/" className="hidden text-xl font-bold z-100 md:block">
        <Image
          src="/conflict-wire-logo.png"
          alt="Logo"
          width={180}
          height={180}
          className="fixed top-2 sm:left-[0em] xl:left-[7em]  lg:w-[200px] lg:h-[200px] md:absolute "
          priority
          unoptimized
        />
      </Link>
      <Link href="/" className="text-xl font-bold  z-100 md:hidden">
        <Image
          src="/conflict-wire-logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="md:hidden fixed top-2 sm:left-[0em] xl:left-[7em] md:w-[215px] md:h-[215px] "
          priority
          unoptimized
        />
      </Link>
      <nav
        className="mx-auto px-4 py-4 w-full"
        style={{ width: windowWidth > 1050 ? "55%" : "100%" }}
      >
        <div className="flex">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-start space-x-6 w-full" style={{ display: windowWidth > 1050 ? "flex" : "none" }}>
            <NavigationMenu style={{ marginRight: "auto" }}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className="border-r-2 border-black text-red-600 group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    MYANMAR
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    CONFLICT
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    HIUMANTARIAN
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    TRADE
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    GEOPOLITICS
                  </Link>
                  <Link
                    href="/"
                    className="border-r-2 border-black group inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
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
            className="md:hidden ml-auto rounded-full flex items-center justify-center"
            style={{ 
              display: windowWidth <= 1050 ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={() => {
              console.log("Burger button clicked");
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("openMobileMenu"));
              }
            }}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
      {/*FOOTER Headers*/}
      <div className="bg-red-500 w-full min-h-[20px]"></div>
      <div className="bg-black w-full p-2 flex">
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
