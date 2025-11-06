// src/components/RegionSpotlight.tsx
export function RegionSpotlight() {
  const leftCards = [
    {
      id: 1,
      region: "MYANMAR",
      title: "Armoured Columns Move Toward River Crossings",
    },
    {
      id: 2,
      region: "ASIA",
      title: "Armoured Columns Move Toward River Crossings",
    },
    {
      id: 3,
      region: "ASIA",
      title: "Armoured Columns Move Toward River Crossings",
    },
    {
      id: 4,
      region: "ASIA",
      title: "Armoured Columns Move Toward River Crossings",
    },
    {
      id: 5,
      region: "LATIN AMERICA",
      title: "Armoured Columns Move Toward River Crossings",
    },
    {
      id: 6,
      region: "EUROPE",
      title: "Armoured Columns Move Toward River Crossings",
    },
  ];

  const rightList = [
    {
      id: 1,
      title: "Armoured Columns Move Toward River Crossings",
      excerpt:
        "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero at velit interdum, eu aliquet orci dictum.",
    },
    {
      id: 2,
      title: "Armoured Columns Move Toward River Crossings",
      excerpt: "Worem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "Armoured Columns Move Toward River Crossings",
      excerpt: "Worem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 4,
      title: "Armoured Columns Move Toward River Crossings",
      excerpt: "Worem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <section className="w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* title */}
        <h2 className="text-lg font-bold uppercase tracking-tight mb-4">
          REGION <span className="text-red-600">SPOTLIGHT</span>
        </h2>

        {/* main layout */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* LEFT column (2/3) */}
          <div className="md:col-span-2 bg-[#f5f5f5] p-4 rounded-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {leftCards.map((card) => (
                <article
                  key={card.id}
                  className="bg-white border border-gray-200 rounded-sm overflow-hidden"
                >
                  {/* image dummy */}
                  <div className="relative h-28 bg-gray-300">
                    <span
                      className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold uppercase text-white ${
                        card.region === "MYANMAR"
                          ? "bg-red-600"
                          : card.region === "LATIN AMERICA"
                            ? "bg-blue-700"
                            : card.region === "EUROPE"
                              ? "bg-yellow-500 text-black"
                              : "bg-teal-500"
                      }`}
                    >
                      {card.region}
                    </span>
                  </div>
                  {/* content */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold leading-snug mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 flex gap-1 items-center">
                      <span>By John Doe</span>
                      <span>•</span>
                      <span>October 10, 2025</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-4">
            {/* top big item */}
            <article className="border border-gray-200 rounded-sm overflow-hidden bg-white">
              {/* image dummy */}
              <div className="relative h-28 bg-gray-300">
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold uppercase px-2 py-1">
                  WAR
                </span>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold leading-snug mb-2">
                  Armoured Columns Move Toward River Crossings
                </h3>
                <p className="text-[10px] text-gray-500 flex gap-1 items-center mb-2">
                  <span>By John Doe</span>
                  <span>•</span>
                  <span>October 10, 2025</span>
                </p>
                <p className="text-[11px] text-gray-600">
                  Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero at velit interdum, eu aliquet ornare.
                </p>
              </div>
            </article>

            {/* list items below */}
            <div className="flex flex-col gap-3">
              {rightList.map((item) => (
                <article
                  key={item.id}
                  className="border-b border-gray-200 pb-3 last:border-0"
                >
                  <h4 className="text-sm font-semibold leading-snug mb-1">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 flex gap-1 items-center mb-1">
                    <span>By John Doe</span>
                    <span>•</span>
                    <span>October 10, 2025</span>
                  </p>
                  <p className="text-[11px] text-gray-600">{item.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
