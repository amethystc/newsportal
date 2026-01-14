"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { client } from "@/sanity/client";
import { breakingNewsQuery } from "@/sanity/queries";
import { allContinentsWithCountriesQuery } from "@/sanity/queries.region";
import UtilityNav from "./UtilityNav";
import MainNav from "./MainNav";

const Header = () => {
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);
  const [breakingNews, setBreakingNews] = useState<any[]>([]);
  const [continents, setContinents] = useState<any[]>([]);

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

    const interval = setInterval(fetchBreakingNews, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await client.fetch(allContinentsWithCountriesQuery);
        setContinents(data);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };
    fetchRegions();
  }, []);

  return (
    <header className="w-full min-h-[15vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-[1000] relative">
      {/* 1. Utility Navigation (New) */}
      <UtilityNav />

      {/* Main Bar with Logo and MainNav */}
      <div className="relative border-b border-gray-100">
        {/* Desktop Logo - Adjusted positioning to stay clear of UtilityNav */}
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-0 lg:left-[2em] xl:left-[7em] z-[101]">
          <Link href="/">
            <Image
              src="/conflict-wire-logo.png"
              alt="Logo"
              width={160}
              height={160}
              className="object-contain lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px]"
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* 2. Main Navigation (Existing but refactored) */}
        <MainNav
          pathname={pathname}
          windowWidth={windowWidth}
          continents={continents}
          getNavLinkClass={getNavLinkClass}
        />
      </div>

      {/* Breaking News Section (Existing) */}
      <div className="bg-red-500 w-full min-h-[4px]"></div>
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
                {(news.region?.country?.title || news.region?.continent?.title) && (
                  <button className="hidden md:block p-1 bg-green-700 text-white font-bold text-sm">
                    {(news.region.country?.title || news.region.continent?.title).toUpperCase()}
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
