import Link from "next/link";
import Image from "next/image";
import { Lock, Crown, ArrowRight, CheckCircle2 } from "lucide-react";
import { ExclusiveContent } from "@/types";

export default function Exclusive({ articles }: { articles: ExclusiveContent[] }) {
  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <div className="container mx-auto my-24 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Crown size={20} className="text-red-600" />
            <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Premium Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Exclusive <span className="text-red-600">Investigations</span>
          </h2>
        </div>
        <Link
          href="/membership"
          className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
        >
          View all premium reports <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Exclusive Article */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <Link
            href={`/exclusive/${mainArticle.slug.current}`}
            className="group relative h-[450px] md:h-[550px] overflow-hidden bg-black shadow-[20px_20px_0px_0px_rgba(220,38,38,1)]"
          >
            {mainArticle.mainImage?.asset?.url ? (
              <Image
                src={mainArticle.mainImage.asset.url}
                alt={mainArticle.title}
                fill
                className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-900" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute top-8 left-8 flex gap-2">
              <span className="bg-red-600 text-[11px] text-white px-4 py-1.5 font-bold uppercase tracking-[0.1em] flex items-center gap-2 shadow-2xl">
                <Lock size={12} strokeWidth={3} /> Member Exclusive
              </span>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
              <span className="text-red-500 font-extrabold text-xs uppercase tracking-[0.2em] mb-4">
                {mainArticle.contentType}
              </span>
              <h3 className="text-white text-3xl md:text-5xl font-black uppercase leading-[1] mb-6 tracking-tighter max-w-3xl">
                {mainArticle.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-lg font-medium max-w-2xl line-clamp-2 mb-2 leading-relaxed opacity-90">
                {mainArticle.excerpt}
              </p>
            </div>
          </Link>
        </div>

        {/* Side Articles & Membership CTA */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {sideArticles.map((article) => (
              <Link
                key={article.slug.current}
                href={`/exclusive/${article.slug.current}`}
                className="group flex gap-4 bg-white border border-gray-100 p-2 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-28 h-28 bg-gray-100 flex-shrink-0 relative overflow-hidden">
                  {article.mainImage?.asset?.url && (
                    <Image
                      src={article.mainImage.asset.url}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity">
                    <Lock className="text-white drop-shadow-lg" size={24} />
                  </div>
                </div>
                <div className="py-2 pr-2 flex flex-col justify-center">
                  <span className="text-red-600 text-[9px] font-black uppercase tracking-widest mb-1.5 whitespace-nowrap">
                    {article.contentType}
                  </span>
                  <h4 className="text-sm font-bold uppercase leading-tight group-hover:text-red-600 transition-colors line-clamp-2 mb-2 tracking-tight">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Premium Only</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Premium Membership CTA */}
          <div className="flex-1 bg-black p-8 flex flex-col border-t-8 border-red-600 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Crown size={180} className="text-white" />
            </div>

            <div className="relative z-10">
              <h4 className="text-white font-black text-2xl uppercase mb-4 tracking-tighter">
                Unlock <span className="text-red-600">Full Access</span>
              </h4>

              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited Private Reports",
                  "Early Intelligence Alerts",
                  "Ad-Free Field Analysis",
                  "Downloadable Briefings"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 text-xs font-bold uppercase tracking-wide">
                    <CheckCircle2 size={16} className="text-red-600 shrink-0" /> {text}
                  </li>
                ))}
              </ul>

              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-white text-3xl font-black">$9.99</span>
                  <span className="text-white/60 text-xs font-bold uppercase">/ Month</span>
                </div>
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">Or $79.99 for full year (Save 33%)</p>
              </div>

              <Link
                href="/membership"
                className="block w-full py-4 bg-red-600 text-white text-center font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                Upgrade to Premium
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
