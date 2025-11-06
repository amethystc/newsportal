import Image from "next/image";
import { Clock } from "lucide-react";

const heroPosts = [
  {
    slug: "frontline-shift-night-raids",
    title: "Frontline Shift: Night Raids Reported Across Northern Corridor",
    category: "MYANMAR",
    date: "October 10, 2025",
    author: "John Doe",
    color: "bg-red-600",
    img: "/conflict-wire-logo.png", // dummy
  },
  {
    slug: "ceasefire-crumbles",
    title: "Ceasefire Crumbles After Supply-Route Ambush",
    category: "CONFLICT",
    date: "October 10, 2025",
    author: "John Doe",
    color: "bg-yellow-500",
    img: "/conflict-wire-logo.png",
  },
  {
    slug: "armoured-columns-move",
    title: "Armoured Columns Move Toward River Crossings",
    category: "GEOPOLITICS",
    date: "October 10, 2025",
    author: "John Doe",
    color: "bg-green-600",
    img: "/conflict-wire-logo.png",
  },
];

export default function Hero() {
  return (
    <section className="max-w-full p-2 sm:p-0">
      {/* mobile: horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory md:hidden">
        {heroPosts.map((post) => (
          <article
            key={post.slug}
            className="relative min-w-[85%] h-72 rounded-lg overflow-hidden snap-center"
          >
            {/* dummy image bg */}
            <div className="absolute inset-0 bg-gray-400" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-end gap-3 p-5">
              <span
                className={`inline-block ${post.color} px-3 py-1 text-[10px] font-bold uppercase rounded`}
              >
                {post.category}
              </span>
              <h2 className="text-white text-2xl font-bold leading-tight">
                {post.title}
              </h2>
              <p className="text-xs text-white/80 flex gap-2 items-center">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* desktop: 3 kolom */}
      <div className="hidden md:grid md:grid-cols-3">
        {heroPosts.map((post, idx) => (
          <article
            key={post.slug}
            className={`relative overflow-hidden min-h-[280px] ${
              idx === 0 ? "md:col-span-1" : ""
            }`}
          >
            {/* wrapper buat image */}
            <div className="relative h-full min-h-[380px]">
              <Image
                src={post.img}
                alt={post.title}
                width={400} // bebas, ini cuma intrinsic size
                height={600}
                className="object-cover"
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/80 via-red-500/20 to-transparent" />
            </div>

            {/* text */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end gap-3 p-6">
              <span
                className={`inline-block ${post.color} p-2 text-[10px] font-bold uppercase rounded w-20 text-white`}
              >
                {post.category}
              </span>
              <h2
                className={`text-white font-bold leading-tight ${
                  idx === 0 ? "text-3xl" : "text-2xl"
                }`}
              >
                {post.title}
              </h2>
              <p className="text-xs text-white/80 flex gap-2 items-center">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      {/*Card One*/}
      <div className="w-full my-10">
        {/* mobile: horizontal scroll */}
        <div className="flex md:hidden items-center gap-4 overflow-x-auto snap-x snap-mandatory px-4">
          {Array(4)
            .fill(null)
            .map((_, idx) => (
              <div
                key={idx}
                className="relative flex flex-row gap-3 p-3 border bg-white/5 rounded-md min-w-[85%] snap-start"
              >
                {/* image left */}
                <div className="relative w-28 h-28 shrink-0">
                  <div className="w-full h-full bg-gray-200 rounded-sm shadow-md" />
                  <div className="absolute -top-2 left-0 bg-yellow-500 text-white px-2 py-1 text-[10px] font-bold rounded-sm">
                    Category
                  </div>
                </div>

                {/* text right */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-semibold text-sm leading-snug">
                    Armoured Columns Move Toward River Crossings
                  </h3>
                  <div className="text-xs">
                    by <span className="font-bold">John Doe</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-600">
                    <Clock size={12} />
                    <span>October 10, 2025</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* desktop: container + grid */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(4)
                .fill(null)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-row gap-3 p-3 border bg-white/5 rounded-md w-[300px]"
                  >
                    {/* image left */}
                    <div className="relative w-28 h-28 shrink-0">
                      <div className="w-full h-full bg-gray-200 rounded-sm shadow-md" />
                      <div className="absolute -top-2 left-0 bg-yellow-500 text-white px-2 py-1 text-[10px] font-bold rounded-sm">
                        Category
                      </div>
                    </div>

                    {/* text right */}
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className="font-semibold text-sm leading-snug">
                        Armoured Columns Move Toward River Crossings
                      </h3>
                      <div className="text-xs">
                        by <span className="font-bold">John Doe</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-600">
                        <Clock size={12} />
                        <span>October 10, 2025</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
