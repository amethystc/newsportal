import { Clock } from "lucide-react";

export default function EditorChoise({ background }: { background: string }) {
  return (
    <section className="container mx-auto my-2">
      <div className={`${background} p-2 flex flex-col`}>
        <h3 className="text-2xl uppercase font-extrabold">
          Editors <span className="text-red-500">Choice</span>
        </h3>
        <div className="w-full flex flex-col md:flex-row md:justify-around md:items-start gap-4 mt-4">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="w-full md:w-1/4 flex relative flex-col gap-2"
              >
                <div className="w-full relative">
                  <div className="w-full h-52 bg-white" />
                  {/* category */}
                  <div className="w-24 p-1 text-center font-bold text-sm text-white bg-red-500 absolute top-0 left-0">
                    WAR
                  </div>
                </div>
                {/* content */}
                <div className="w-full">
                  {/* title */}
                  <h3 className="font-semibold text-sm md:text-base">
                    Armoured Columns Move Toward River Crossings
                  </h3>
                  {/* credit */}
                  <div className="text-sm flex flex-wrap items-center gap-2 mt-1">
                    <span>
                      by <span className="font-bold">Jonh Doe</span>
                    </span>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Clock size={14} />
                      <span>October 10, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
