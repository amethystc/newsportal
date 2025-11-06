// src/components/SubscriptionCTA.tsx
"use client";

import Image from "next/image";

export function SubscriptionCTA() {
  return (
    <section className="w-full py-10">
      <div className="relative w-full mx-auto h-56 md:h-84  overflow-hidden">
        {/* background image */}
        {/*<Image
          src="/images/subscription-bg.jpg" // ganti ke image kamu
          alt="Exclusive membership"
          fill
          className="object-cover"
          priority={false}
        />*/}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-600" />

        {/* overlay tipis biar teks kebaca */}
        <div className="absolute inset-0 bg-black/20" />

        {/* content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
            Get the inside story on the world’s update
          </h2>
          <p className="text-white/90 text-sm md:text-base mb-5">
            Become an exclusive member today
          </p>
          <button className="bg-white text-red-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-red-50 transition">
            JOIN NOW
          </button>
        </div>
      </div>
    </section>
  );
}
