// src/components/EditorsChoice.tsx
import Image from "next/image";

const EDITORS_ARTICLES = [
  {
    id: 1,
    title: "Armoured Columns Move Toward River Crossings",
    category: "WAR",
    author: "John Doe",
    date: "October 10, 2025",
    img: "/conflict-wire-logo.png", // ganti ke gambar kamu
  },
  {
    id: 2,
    title: "Armoured Columns Move Toward River Crossings",
    category: "WAR",
    author: "John Doe",
    date: "October 10, 2025",
    img: "/conflict-wire-logo.png",
  },
  {
    id: 3,
    title: "Armoured Columns Move Toward River Crossings",
    category: "WAR",
    author: "John Doe",
    date: "October 10, 2025",
    img: "/conflict-wire-logo.png",
  },
  {
    id: 4,
    title: "Armoured Columns Move Toward River Crossings",
    category: "WAR",
    author: "John Doe",
    date: "October 10, 2025",
    img: "/conflict-wire-logo.png",
  },
];

export function EditorsChoiceV2() {
  return (
    <section className="w-full bg-white my-16">
      {/* header */}
      <div className="container mx-auto px-4 sm:px-6 pt-6">
        {/* garis abu di bawah, tapi judulnya ‘nempel’ di atas */}
        <div className="relative mb-5">
          <div className="h-[1px] w-full bg-black" />
          <div className="absolute -top-10 left-0 bg-white px-3 py-1 rounded-t-md border-x border-t border-black">
            <span className="text-2xl font-bold tracking-tight">
              EDITORS <span className="text-red-600">CHOICE</span>
            </span>
          </div>
        </div>

        {/* grid cards */}
        <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2">
          {EDITORS_ARTICLES.map((item) => (
            <article
              key={item.id}
              className="border border-gray-200 rounded-md overflow-hidden bg-white"
            >
              {/* image */}
              <div className="relative w-full bg-gray-200">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded">
                  {item.category}
                </span>
              </div>
              {/* content */}
              <div className="p-3 flex flex-col gap-2">
                <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                  <span>By {item.author}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
