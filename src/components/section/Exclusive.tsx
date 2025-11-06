export default function Exclusive() {
  return (
    <div className="container mx-auto my-16">
      <h1 className="text-2xl text-red-500 font-extrabold uppercase">
        Exclusive
      </h1>

      <div className="grid gap-4 md:grid-cols-3 my-5">
        <article className="relative rounded-lg overflow-hidden min-w-[360px] min-h-[360px] md:col-span-2 bg-gray-300">
          {/*<div className="absolute inset-0 bg-[url('/images/exclusive-1.jpg')] bg-cover bg-center" />*/}
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/80 via-red-500/10 to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-end gap-3 p-6">
            <div className="flex gap-2">
              <span className="bg-red-600 text-[10px] text-white px-2 py-1 rounded uppercase">
                Myanmar
              </span>
              <span className="bg-purple-600 text-[10px] text-white px-2 py-1 rounded uppercase">
                Exclusive
              </span>
            </div>
            <h3 className="text-white text-2xl md:text-3xl font-bold max-w-xl leading-tight">
              Frontline Shift: Night Raids Reported Across Northern Corridor
            </h3>
            <p className="text-[11px] text-white/80 flex gap-2 items-center">
              <span>By John Doe</span>
              <span>•</span>
              <span>October 10, 2025</span>
            </p>
          </div>
        </article>

        <div className="flex flex-col gap-4">
          <article className="flex gap-3 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="w-28 h-24 bg-gray-200 flex-shrink-0" />
            <div className="py-2 pr-3 flex-1">
              <span className="bg-red-600 text-[9px] text-white px-2 py-1 rounded uppercase">
                Myanmar
              </span>
              <h4 className="text-sm font-semibold mt-2 leading-snug">
                Armoured Columns Move Toward River Crossings
              </h4>
              <p className="text-[10px] text-gray-400 mt-1 flex gap-1 items-center">
                <span>By John Doe</span>
                <span>•</span>
                <span>October 10, 2025</span>
              </p>
              <span className="inline-block mt-2 bg-purple-600 text-[9px] text-white px-2 py-1 rounded uppercase">
                Exclusive
              </span>
            </div>
          </article>

          <article className="flex gap-3 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="w-28 h-24 bg-gray-200 flex-shrink-0" />
            <div className="py-2 pr-3 flex-1">
              <span className="bg-red-600 text-[9px] text-white px-2 py-1 rounded uppercase">
                Myanmar
              </span>
              <h4 className="text-sm font-semibold mt-2 leading-snug">
                Armoured Columns Move Toward River Crossings
              </h4>
              <p className="text-[10px] text-gray-400 mt-1 flex gap-1 items-center">
                <span>By John Doe</span>
                <span>•</span>
                <span>October 10, 2025</span>
              </p>
              <span className="inline-block mt-2 bg-purple-600 text-[9px] text-white px-2 py-1 rounded uppercase">
                Exclusive
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
