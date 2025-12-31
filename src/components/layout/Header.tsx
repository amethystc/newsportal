"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { client } from "@/sanity/client";
import { breakingNewsQuery } from "@/sanity/queries";

const Header = () => {
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);
  const [breakingNews, setBreakingNews] = useState<any[]>([]);

  // Helper function to determine active link styling
  const getNavLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "text-red-600"
      : "text-gray-800 hover:bg-gray-300";
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const fetchOptions = {
          next: { revalidate: 0 }, // No caching - always fetch fresh data
        };
        const news = await client.fetch(breakingNewsQuery, {}, fetchOptions);
        setBreakingNews(news);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      }
    };
    fetchBreakingNews();

    // Refresh breaking news every 30 seconds
    const interval = setInterval(fetchBreakingNews, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <header className="w-full min-h-[15vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-1000">
      <Link href="/" className="hidden text-xl font-bold z-100 md:block ">
        <Image
          src="/conflict-wire-logo.png"
          alt="Logo"
          width={180}
          height={180}
          className="fixed top-0 sm:left-[0em] xl:left-[7em]  lg:w-[160px] lg:h-[160px] md:absolute "
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
        className="ml-auto px-6 py-6 w-full"
        style={{ width: windowWidth > 1650 ? "78%" : "100%" }}
      >
        <div className="flex w-full items-center">
          {/* Desktop Navigation */}
          <div
            className="hidden md:flex items-start space-x-4 lg:space-x-6 w-full"
            style={{ display: windowWidth > 1650 ? "flex" : "none" }}
          >
            <NavigationMenu style={{ marginRight: "auto" }}>
              <NavigationMenuList className="flex-nowrap">
                <NavigationMenuItem className="flex whitespace-nowrap">
                  <Link
                    href={pathname === "/myanmar" ? "/" : "/myanmar"}
                    className={`border-r-2 border-black inline-flex h-10 w-max items-center justify-center rounded-none px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold ${getNavLinkClass(pathname === "/myanmar" ? "/" : "/myanmar")}`}
                  >
                    {pathname === "/myanmar" ? "HOME" : "MYANMAR"}
                  </Link>
                  <Link
                    href="/conflict"
                    className={`border-r-2 border-black inline-flex h-10 w-max items-center justify-center rounded-none px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold ${getNavLinkClass("/conflict")}`}
                  >
                    CONFLICT
                  </Link>
                  <Link
                    href="/humanitarian"
                    className={`border-r-2 border-black inline-flex h-10 w-max items-center justify-center rounded-none px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold ${getNavLinkClass("/humanitarian")}`}
                  >
                    HUMANITARIAN
                  </Link>
                  <Link
                    href="/trade"
                    className={`border-r-2 border-black inline-flex h-10 w-max items-center justify-center rounded-none px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold ${getNavLinkClass("/trade")}`}
                  >
                    TRADE
                  </Link>
                  <Link
                    href="/geopolitics"
                    className={`border-r-2 border-black inline-flex h-10 w-max items-center justify-center rounded-none px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold ${getNavLinkClass("/geopolitics")}`}
                  >
                    GEOPOLITICS
                  </Link>
                  <Link
                    href="/spaces"
                    className={`border-r-2 border-black inline-flex h-10 w-max items-center justify-center rounded-none px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold ${getNavLinkClass("/spaces")}`}
                  >
                    SPACES
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
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
          {/* Mobile Menu Button */}
          <Button
            variant="default"
            size="icon-lg"
            className="md:hidden ml-auto rounded-full flex items-center justify-center"
            style={{
              display: windowWidth <= 1650 ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
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
            {breakingNews.map((news, index) => (
              <div key={index} className="flex items-center gap-4">
                <Link
                  href={`/article/${news.slug.current}`}
                  className="text-white text-sm mr-2 hover:text-red-400 hover:underline transition-colors ml-1"
                >
                  {news.title}
                </Link>
                {news.region && (
                  <button className="hidden md:block p-1 bg-green-700 text-white font-bold text-sm">
                    {news.region.title.toUpperCase()}
                  </button>
                )}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </header>
  );
};

export default Header;
