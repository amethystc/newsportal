"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, ChevronRight, ShieldAlert, Zap, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/client";
import { allWorldTagsQuery } from "@/sanity/queries.region";
import { useMember } from "@/context/MemberContext";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const { member } = useMember();
  const [searchQuery, setSearchQuery] = useState("");
  const [worldTags, setWorldTags] = useState<any[]>([]);
  const [isWorldExpanded, setIsWorldExpanded] = useState(false);
  const [isArticlesExpanded, setIsArticlesExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Logic for search redirect would go here
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchWorldTags = async () => {
      try {
        const data = await client.fetch(allWorldTagsQuery);
        setWorldTags(data);
      } catch (error) {
        console.error("Error fetching world tags:", error);
      }
    };
    if (isOpen) {
      fetchWorldTags();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="relative w-full max-w-sm bg-white h-full shadow-[-20px_0px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-300 transform translate-x-0">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center text-white">
              <ShieldAlert size={18} fill="white" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">Sections</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-100">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="SEARCH CONTENT..."
              className="w-full bg-gray-50 border-2 border-gray-100 px-5 py-4 text-[10px] font-black uppercase tracking-widest focus:border-red-600 focus:bg-white outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600">
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Navigation Scroll Area */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-2">

          {/* Main Links */}
          <MobileLink href="/magazine" label="Magazine" icon={Zap} onClick={onClose} />

          {/* Articles Accordion */}
          <div className="border-b border-gray-50 pb-2">
            <button
              onClick={() => setIsArticlesExpanded(!isArticlesExpanded)}
              className="flex items-center justify-between w-full py-4 px-2 hover:bg-gray-50 group transition-colors"
            >
              <span className="text-sm font-black uppercase tracking-widest group-hover:text-red-600">Stories</span>
              {isArticlesExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {isArticlesExpanded && (
              <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                {["Conflict", "Humanitarian", "Trade", "Geopolitics", "Space"].map(cat => (
                  <Link
                    key={cat}
                    href={`/${cat.toLowerCase()}`}
                    className="block py-3 px-4 text-[11px] font-bold uppercase tracking-tight text-gray-500 hover:text-red-600 hover:bg-gray-50"
                    onClick={onClose}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* World Accordion */}
          <div className="border-b border-gray-50 pb-2">
            <button
              onClick={() => setIsWorldExpanded(!isWorldExpanded)}
              className="flex items-center justify-between w-full py-4 px-2 hover:bg-gray-50 group transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-red-600" />
                <span className="text-sm font-black uppercase tracking-widest group-hover:text-red-600">World</span>
              </div>
              {isWorldExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {isWorldExpanded && (
              <div className="pl-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
                {worldTags.map(tag => (
                  <Link
                    key={tag._id}
                    href={`/regions/${tag.slug.current}`}
                    className="block py-3 px-4 text-[11px] font-bold uppercase tracking-tight text-gray-500 hover:text-red-600"
                    onClick={onClose}
                  >
                    {tag.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Secondary Links */}
          <MobileLink href="/about" label="About Us" onClick={onClose} />
          <MobileLink href="/contact" label="Contact Us" icon={Mail} onClick={onClose} />

          <div className="pt-8">
            <Link
              href="/membership"
              className="block w-full py-5 bg-black text-white text-center text-xs font-black uppercase tracking-[0.3em] hover:bg-red-600 transition-all shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]"
              onClick={onClose}
            >
              Subscribe
            </Link>
          </div>
        </nav>

        {/* Footer info */}
        <div className="p-8 bg-gray-50 border-t border-gray-100">
          <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 text-center">
            Conflict Wire v1.0.4 <br />
            © 2026 Independent Field Reporting
          </p>
        </div>
      </div>
    </div>
  );
};

const MobileLink = ({ href, label, icon: Icon, onClick }: { href: string, label: string, icon?: any, onClick: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center justify-between w-full py-4 px-2 hover:bg-gray-50 group transition-colors border-b border-gray-50"
  >
    <div className="flex items-center gap-3">
      {Icon && <Icon size={18} className="text-red-600" />}
      <span className="text-sm font-black uppercase tracking-widest group-hover:text-red-600">{label}</span>
    </div>
    <ChevronRight size={16} className="text-gray-300" />
  </Link>
);

export default MobileNavigation;
