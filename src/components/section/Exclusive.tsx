export default function Exclusive() {
  return (
    <div className="container mx-auto my-16">
      <h1 className="text-2xl text-red-500 font-extrabold uppercase">
        Exclusive
      </h1>

      <div className="grid gap-4 md:grid-cols-3 my-5">
        {/* Main Exclusive Article */}
        <article className="relative rounded-lg overflow-hidden min-w-[360px] min-h-[360px] md:col-span-2">
          {/* Skeleton Loading */}
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/80 via-red-500/10 to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-end gap-3 p-6">
            <div className="flex gap-2">
              <div className="bg-red-600 text-[10px] text-white px-2 py-1 rounded uppercase animate-pulse w-16 h-4" />
              <div className="bg-purple-600 text-[10px] text-white px-2 py-1 rounded uppercase animate-pulse w-16 h-4" />
            </div>
            <div className="bg-white/20 animate-pulse h-8 w-full max-w-xl rounded" />
            <div className="bg-white/20 animate-pulse h-4 w-48 rounded" />
          </div>
        </article>

        {/* Side Articles */}
        <div className="flex flex-col gap-4">
          {/* Article 1 */}
          <article className="flex gap-3 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="w-28 h-24 bg-gray-300 animate-pulse flex-shrink-0" />
            <div className="py-2 pr-3 flex-1">
              <div className="bg-red-600 text-[9px] text-white px-2 py-1 rounded uppercase animate-pulse w-16 h-4" />
              <div className="bg-gray-300 animate-pulse h-4 w-full mt-2 rounded" />
              <div className="bg-gray-300 animate-pulse h-3 w-32 mt-1 rounded" />
              <div className="bg-purple-600 text-[9px] text-white px-2 py-1 rounded uppercase animate-pulse w-16 h-4 mt-2" />
            </div>
          </article>

          {/* Article 2 */}
          <article className="flex gap-3 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="w-28 h-24 bg-gray-300 animate-pulse flex-shrink-0" />
            <div className="py-2 pr-3 flex-1">
              <div className="bg-red-600 text-[9px] text-white px-2 py-1 rounded uppercase animate-pulse w-16 h-4" />
              <div className="bg-gray-300 animate-pulse h-4 w-full mt-2 rounded" />
              <div className="bg-gray-300 animate-pulse h-3 w-32 mt-1 rounded" />
              <div className="bg-purple-600 text-[9px] text-white px-2 py-1 rounded uppercase animate-pulse w-16 h-4 mt-2" />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
