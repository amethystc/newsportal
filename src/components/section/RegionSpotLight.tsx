// src/components/RegionSpotlight.tsx
export function RegionSpotlight() {
  // Skeleton data for left cards
  const leftCards = Array(6).fill(null);

  // Skeleton data for right list
  const rightList = Array(4).fill(null);

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
              {leftCards.map((_, index) => (
                <article
                  key={index}
                  className="bg-white border border-gray-200 rounded-sm overflow-hidden"
                >
                  {/* image skeleton */}
                  <div className="relative h-28 bg-gray-300 animate-pulse">
                    <span className="absolute top-2 left-2 px-2 py-2 text-[10px] font-semibold uppercase text-white bg-red-600 animate-pulse w-16 h-4 rounded"></span>
                  </div>
                  {/* content skeleton */}
                  <div className="p-3">
                    <div className="h-4 bg-gray-300 animate-pulse rounded mb-2" />
                    <div className="h-3 bg-gray-300 animate-pulse rounded w-3/4" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-4">
            {/* top big item skeleton */}
            <article className="border border-gray-200 rounded-sm overflow-hidden bg-white">
              {/* image skeleton */}
              <div className="relative h-28 bg-gray-300 animate-pulse">
                <span className="absolute top-2 left-2 bg-gray-400 text-white text-[10px] font-semibold uppercase px-2 py-1 animate-pulse w-12 h-4 rounded">
                  ...
                </span>
              </div>
              <div className="p-3">
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-2" />
                <div className="h-3 bg-gray-300 animate-pulse rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-300 animate-pulse rounded w-full" />
              </div>
            </article>

            {/* list items below */}
            <div className="flex flex-col gap-3">
              {rightList.map((_, index) => (
                <article
                  key={index}
                  className="border-b border-gray-200 pb-3 last:border-0"
                >
                  <div className="h-4 bg-gray-300 animate-pulse rounded mb-1" />
                  <div className="h-3 bg-gray-300 animate-pulse rounded w-3/4 mb-1" />
                  <div className="h-3 bg-gray-300 animate-pulse rounded w-full" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
