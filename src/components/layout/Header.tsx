"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { client } from "@/sanity/client";
import { breakingNewsQuery } from "@/sanity/queries";
import { Menu, Search, X, User } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [breakingNews, setBreakingNews] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const news = await client.fetch(breakingNewsQuery, {}, { next: { revalidate: 0 } });
        setBreakingNews(news || []);
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      }
    };
    fetchBreakingNews();
    const interval = setInterval(fetchBreakingNews, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "Conflict", href: "/conflict" },
    { label: "Humanitarian", href: "/humanitarian" },
    { label: "Trade", href: "/trade" },
    { label: "Geopolitics", href: "/geopolitics" },
    { label: "Analysis", href: "/spaces" },
  ];

  return (
    <>
      <header className="w-full z-[1000] relative h-[64px] md:h-[80px] bg-red-600 border-b-2 border-black">
        <div className="cw-container h-full flex items-center justify-between relative">

          {/* Oversized Logo - Breaking the Grid */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 md:translate-y-0 md:top-2 z-[1001]">
            <Link href="/" className="block transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <Image
                src="/conflict-wire-logo.png"
                alt="Conflict Wire"
                width={150}
                height={150}
                className="object-contain w-[70px] md:w-[130px] lg:w-[150px] drop-shadow-lg"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Navigation - Tabular Grid Style */}
          <div className="flex-1 flex justify-end h-full">
            <nav className="hidden lg:flex items-center h-full border-l border-black/20">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`h-full px-10 flex items-center text-[11px] font-black uppercase tracking-[0.25em] transition-colors border-r border-black/20
                                        ${pathname === link.href ? 'bg-black text-white' : 'text-black hover:bg-black/10'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4 ml-8">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-black/80 hover:text-white transition-colors"
              >
                <Search size={22} strokeWidth={3} />
              </button>

              <Link
                href="/membership"
                className="bg-black text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 border-white hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hidden sm:block"
              >
                Subscribe
              </Link>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openMobileMenu"))}
                className="w-12 h-12 bg-black text-white hover:bg-white hover:text-black transition-all rounded-full flex items-center justify-center border-2 border-white"
              >
                <Menu size={24} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-header Marquee */}
      <div className="bg-white border-b border-gray-100 py-3.5 relative z-[999]">
        <div className="cw-container flex items-center overflow-hidden">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black whitespace-nowrap mr-8 flex items-center gap-2 pl-[80px] md:pl-[150px] lg:pl-[180px]">
            <div className="w-2 h-2 bg-red-600 animate-pulse" />
            Trending Now:
          </span>
          <div className="flex-1">
            {breakingNews.length > 0 ? (
              <Marquee gradient={false} speed={45} pauseOnHover>
                {breakingNews.map((news, index) => (
                  <Link
                    key={index}
                    href={`/article/${news.slug.current}`}
                    className="text-[11px] font-bold uppercase tracking-tight mx-12 hover:text-red-600 transition-colors flex items-center gap-3 text-gray-800"
                  >
                    <span className="text-red-600 font-black">/</span>
                    {news.title}
                  </Link>
                ))}
              </Marquee>
            ) : (
              <div className="text-[11px] font-medium uppercase tracking-tight text-gray-500 italic">
                No breaking news at the moment. Check back soon for updates.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Float Search Bar */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-red-600 z-[10001] flex items-center animate-in slide-in-from-top duration-500">
          <div className="cw-container flex items-center gap-10">
            <Search size={60} className="text-black" />
            <input
              type="text"
              className="flex-1 bg-transparent border-none text-4xl md:text-7xl font-black uppercase tracking-widest text-black placeholder:text-black/10 focus:outline-none"
              placeholder="SEARCH CONTENT..."
              autoFocus
            />
            <button onClick={() => setIsSearchOpen(false)} className="text-black hover:text-white transition-colors">
              <X size={60} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
