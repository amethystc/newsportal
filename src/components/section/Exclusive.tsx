import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import { ExclusiveContent } from "@/types";

export default function Exclusive({ articles }: { articles: ExclusiveContent[] }) {
  if (!articles || articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <div className="container mx-auto my-16 px-4">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl text-red-600 font-unbounded-extrabold uppercase tracking-tighter">
          Exclusive
        </h1>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Exclusive Article */}
        <Link
          href={`/exclusive/${mainArticle.slug.current}`}
          className="group relative h-[400px] md:h-full md:col-span-2 overflow-hidden bg-black shadow-2xl"
        >
          {mainArticle.mainImage?.asset?.url ? (
            <Image
              src={mainArticle.mainImage.asset.url}
              alt={mainArticle.title}
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-900" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute top-6 left-6 flex gap-2">
            <span className="bg-red-600 text-[10px] text-white px-3 py-1 font-unbounded-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
              <Lock size={12} /> Membership Only
            </span>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            <p className="text-red-500 font-unbounded-bold text-xs uppercase tracking-widest mb-3">
              {mainArticle.contentType}
            </p>
            <h2 className="text-white text-3xl md:text-5xl font-unbounded-bold uppercase leading-[1.1] mb-4 tracking-tighter">
              {mainArticle.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-medium max-w-2xl line-clamp-2">
              {mainArticle.excerpt}
            </p>
          </div>
        </Link>

        {/* Side Articles */}
        <div className="flex flex-col gap-6">
          {sideArticles.map((article) => (
            <Link
              key={article.slug.current}
              href={`/exclusive/${article.slug.current}`}
              className="group flex gap-4 h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="w-32 h-full bg-gray-100 flex-shrink-0 relative overflow-hidden">
                {article.mainImage?.asset?.url && (
                  <Image
                    src={article.mainImage.asset.url}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Lock className="text-white" size={20} />
                </div>
              </div>
              <div className="py-4 pr-4 flex flex-col justify-center">
                <p className="text-red-600 text-[9px] font-unbounded-bold uppercase tracking-widest mb-1">
                  {article.contentType}
                </p>
                <h3 className="text-base font-unbounded-bold uppercase leading-tight group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Member Private Report
                </p>
              </div>
            </Link>
          ))}

          {/* CTA for Non-members */}
          <div className="flex-1 bg-red-600 p-8 flex flex-col justify-center items-center text-center text-white">
            <h4 className="font-unbounded-bold text-lg uppercase mb-2">Join investigation</h4>
            <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-6">Access Intelligence Unit Reports</p>
            <Link
              href="/#waitlist"
              className="w-full py-3 bg-white text-red-600 font-unbounded-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl"
            >
              Apply for Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
