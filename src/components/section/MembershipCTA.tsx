"use client";

import Link from "next/link";
import { Crown, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

export default function MembershipCTA() {
    return (
        <section className="bg-white py-12 md:py-20 overflow-hidden relative border-y border-gray-100">
            <div className="cw-container">
                <div className="bg-gray-50 border-4 border-black p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-none" />

                    <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                        {/* Left Column: Content */}
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 py-1 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <Crown size={12} fill="white" />
                                <span className="font-black uppercase tracking-widest text-[9px]">Premium Access</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-black leading-[1.1] tracking-tight mb-8">
                                Support <span className="text-red-600 underline decoration-4 underline-offset-8">Independent Stories</span>.
                            </h2>

                            <p className="text-gray-600 text-base md:text-lg mb-10 max-w-xl leading-relaxed font-medium">
                                Our field reports are funded entirely by readers. Join our community of subscribers supporting independent global news.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                                {[
                                    "Weekly Story Reports",
                                    "Deep Regional Analysis",
                                    "Ad-Free Reading Experience",
                                    "Downloadable Deep-Dives"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-red-600" />
                                        <span className="text-black font-black uppercase tracking-tight text-[10px]">{text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-8 pt-8 border-t border-gray-200">
                                <Link
                                    href="/membership"
                                    className="w-full sm:w-auto px-10 py-5 bg-black text-white hover:bg-red-600 font-black uppercase text-xs tracking-[0.2em] transition-all shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex items-center justify-center gap-3"
                                >
                                    Access All Stories <TrendingUp size={16} />
                                </Link>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <ShieldCheck size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Reader Funded • Verify Daily</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Pricing Focused */}
                        <div className="lg:col-span-5">
                            <div className="bg-white border-4 border-black p-10 relative shadow-[12px_12px_0px_0px_rgba(220,38,38,0.1)]">
                                <div className="absolute -top-4 -right-4 bg-red-600 text-white font-black uppercase px-4 py-2 rotate-6 shadow-lg tracking-tighter text-center">
                                    <span className="block text-xl leading-none">33% OFF</span>
                                </div>

                                <h3 className="text-black font-black text-xl uppercase mb-6 tracking-tight flex items-center justify-between">
                                    <span>Annual Plan</span>
                                    <span className="text-red-600 text-[10px] tracking-widest">Recommended</span>
                                </h3>

                                <div className="mb-0">
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 italic">Standard Rate</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-black tracking-tighter">$79.99</span>
                                        <span className="text-gray-400 text-sm uppercase font-black tracking-widest">/ Year</span>
                                    </div>
                                    <p className="text-red-600 font-black text-xs uppercase mt-4 tracking-widest border-l-4 border-red-600 pl-3 py-1 bg-red-50">
                                        Best value for supporters
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
