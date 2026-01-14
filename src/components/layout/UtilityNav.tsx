"use client";

import Link from "next/link";

const UtilityNav = () => {
    return (
        <div className="w-full bg-red-600 border-b border-white/10 py-2 px-4 hidden md:block">
            <div className="container mx-auto flex justify-between items-center max-w-[1400px]">
                {/* Left: Support Call to Action */}
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-white font-unbounded-bold text-sm leading-tight uppercase tracking-tight">
                            Support Conflict Wire
                        </span>
                        <span className="text-white/80 text-[10px] m-0 p-0 font-medium">
                            Fund independent conflict reporting
                        </span>
                    </div>
                    <Link
                        href="/support"
                        className="bg-[#ffe500] hover:bg-[#ffe500]/90 text-black text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1 transition-colors font-unbounded transition-transform active:scale-95 shadow-sm"
                    >
                        Support us <span className="text-lg leading-none">→</span>
                    </Link>
                </div>

                {/* Right: Essential Links & Auth */}
                <div className="flex items-center">
                    <div className="flex gap-4 items-center">
                        <Link
                            href="/magazine"
                            className="text-[11px] font-unbounded-bold text-white hover:text-black transition-colors uppercase tracking-wider px-3 border-r border-white/20"
                        >
                            Magazine
                        </Link>
                        <Link
                            href="/articles"
                            className="text-[11px] font-unbounded-bold text-white hover:text-black transition-colors uppercase tracking-wider px-3 border-r border-white/20"
                        >
                            Articles
                        </Link>
                        <Link
                            href="/about"
                            className="text-[11px] font-unbounded text-white/80 hover:text-white transition-colors uppercase tracking-wider px-3 border-r border-white/20"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-[11px] font-unbounded text-white/80 hover:text-white transition-colors uppercase tracking-wider px-3"
                        >
                            Contact
                        </Link>
                    </div>

                    <div className="ml-6 pl-6 border-l border-white/30">
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-white font-unbounded-bold text-xs hover:text-black transition-colors"
                        >
                            <div className="w-5 h-5 rounded-full border border-white/50 flex items-center justify-center">
                                <span className="text-[10px]">👤</span>
                            </div>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UtilityNav;
