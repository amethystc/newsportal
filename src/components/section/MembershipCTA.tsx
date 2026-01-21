"use client";

import Link from "next/link";
import { Crown, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

export default function MembershipCTA() {
    return (
        <section className="bg-white py-24 overflow-hidden relative">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto bg-black rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-t-8 border-red-600">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-none" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column: Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-1.5 mb-6">
                                <Crown size={14} className="text-red-600" />
                                <span className="text-red-500 font-black uppercase tracking-widest text-[10px]">Conflict Wire Premium</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                                Support <span className="text-red-600">Deep</span> <br />
                                Intelligence.
                            </h2>

                            <p className="text-white/70 text-lg mb-10 max-w-lg leading-relaxed font-medium">
                                Our investigations are funded entirely by readers. Join 15,000+ members supporting independent conflict journalism.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                {[
                                    "Private Signal Reports",
                                    "Expert Regional Analysis",
                                    "Ad-Free Field Intelligence",
                                    "Downloadable Briefings"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 size={18} className="text-red-600 shrink-0" />
                                        <span className="text-white font-bold uppercase tracking-tight text-xs">{text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Link
                                    href="/membership"
                                    className="w-full sm:w-auto px-10 py-5 bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase text-xs tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] flex items-center justify-center gap-3"
                                >
                                    Join for $9.99/mo <TrendingUp size={16} />
                                </Link>
                                <div className="flex items-center gap-2 text-white/50">
                                    <ShieldCheck size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">30-Day Guarantee</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Key Value Prop Card */}
                        <div className="hidden lg:block">
                            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 p-10 rounded-3xl shadow-2xl relative">
                                <div className="absolute -top-6 -right-6 bg-red-600 text-white font-black uppercase p-4 rounded-2xl rotate-12 shadow-xl tracking-tighter text-center">
                                    <span className="block text-2xl leading-none">33%</span>
                                    <span className="block text-xs">OFF YEARLY</span>
                                </div>

                                <h3 className="text-white font-black text-2xl uppercase mb-8 tracking-tighter border-b border-white/10 pb-4">
                                    Annual <span className="text-red-600">Special</span>
                                </h3>

                                <div className="mb-10">
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Billed Annually</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-6xl font-black text-white tracking-tighter">$79.99</span>
                                        <span className="text-white/60 text-lg uppercase font-bold tracking-widest">/ Year</span>
                                    </div>
                                    <p className="text-red-500 font-black text-sm uppercase mt-2 tracking-tight">Only $6.67 per month</p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-white/60 text-xs font-medium leading-relaxed italic">
                                        "Conflict Wire is the only source I trust for raw, unedited reports from the Myanmar and Middle Eastern frontiers."
                                    </p>
                                    <p className="text-white font-bold text-[10px] uppercase tracking-widest">— Regional Analyst, Bangkok</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
