"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, Crown, ArrowRight, CheckCircle2 } from "lucide-react";
import { ExclusiveContent } from "@/types";

export default function Exclusive({ articles }: { articles: ExclusiveContent[] }) {
  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <div className="cw-container my-24 lg:my-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-4 border-black pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4 bg-red-600 text-white px-3 py-1 w-fit shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Crown size={14} fill="white" />
            <span className="font-black uppercase tracking-[0.2em] text-[10px]">Premium Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tighter">
            Exclusive <span className="text-red-600 italic">Investigations</span>
          </h2>
        </div>
        <Link
          href="/membership"
          className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] hover:text-red-600 transition-colors border-2 border-black px-6 py-3 hover:bg-black hover:text-white"
        >
          View All premium reports <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        {/* Main Exclusive Article */}
        <div className="lg:col-span-8 flex flex-col">
          <Link
            href={`/exclusive/${mainArticle.slug.current}`}
            className="group relative h-[500px] md:h-[650px] overflow-hidden bg-black shadow-[20px_20px_0px_0px_rgba(220,38,38,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[24px_24px_0px_0px_rgba(220,38,38,1)]"
          >
            {mainArticle.mainImage?.asset?.url ? (
              <Image
                src={mainArticle.mainImage.asset.url}
                alt={mainArticle.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-900" />
            )}

            <div className="absolute inset-0 text-scrim bg-black/40" />

            <div className="absolute top-8 left-8 flex gap-2">
              <span className="bg-red-600 text-[10px] text-white px-4 py-2 font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl">
                <Lock size={12} strokeWidth={3} /> Intelligence Locked
              </span>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 lg:p-20">
              <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                {mainArticle.contentType} Archive
              </span>
              <h3 className="text-white text-3xl md:text-5xl font-black leading-[1.1] mb-6 tracking-tight max-w-4xl group-hover:text-red-500 transition-colors">
                {mainArticle.title}
              </h3>
              <p className="text-white/70 text-base md:text-xl font-medium max-w-2xl line-clamp-2 mb-8 leading-relaxed">
                {mainArticle.excerpt}
              </p>

              <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest pt-8 border-t border-white/10">
                <span>Field Investigation • {articles.length}+ Premium Files</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Side Articles & Membership CTA */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            {sideArticles.map((article) => (
              <Link
                key={article.slug.current}
                href={`/exclusive/${article.slug.current}`}
                className="group flex gap-6 bg-white border-2 border-transparent hover:border-black p-4 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0 relative overflow-hidden border border-gray-100">
                  {article.mainImage?.asset?.url && (
                    <Image
                      src={article.mainImage.asset.url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                    <Lock className="text-white" size={20} />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-red-600 text-[9px] font-black uppercase tracking-widest mb-1.5">
                    {article.contentType}
                  </span>
                  <h4 className="text-sm font-bold leading-tight group-hover:text-red-600 transition-colors line-clamp-2 mb-2 tracking-tight">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1.5 opacity-40">
                    <span className="text-[9px] text-black font-black uppercase tracking-widest">Private Intel</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Premium Membership Mini-CTA */}
          <div className="bg-gray-50 p-10 flex flex-col border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <h4 className="text-black font-black text-2xl leading-none mb-6 tracking-tight">
              Unlock <span className="text-red-600 underline">Full Access</span>
            </h4>

            <ul className="space-y-4 mb-10">
              {[
                "Unlimited Private Reports",
                "Early Intelligence Alerts",
                "Ad-Free Field Analysis"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-black text-[10px] font-black uppercase tracking-[0.1em]">
                  <div className="w-1.5 h-1.5 bg-red-600 mt-0.5 shrink-0" /> {text}
                </li>
              ))}
            </ul>

            <div className="mb-10 bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-black text-3xl font-black">$9.99</span>
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">/ Month</span>
              </div>
              <p className="text-red-600 text-[9px] font-black uppercase tracking-[0.2em]">Or $79.99/Year (Save 33%)</p>
            </div>

            <Link
              href="/membership"
              className="block w-full py-4 bg-black text-white text-center font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-600 transition-all"
            >
              UPGRADE NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
