import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

const UtilityNav = () => {
    const { setIsOpen, items } = useCart();

    return (
        <div className="w-full bg-red-600 border-b border-black/10 py-1.5 hidden lg:block">
            <div className="cw-container flex justify-between items-center">
                {/* Left: Mission / Ticker Intro */}
                <div className="flex items-center gap-4">
                    <span className="text-white font-black text-[9px] uppercase tracking-[0.2em] italic">
                        Conflict Intelligence • Field Verified
                    </span>
                    <div className="h-3 w-px bg-white/20" />
                    <Link
                        href="/#waitlist"
                        className="text-white hover:text-black font-bold text-[9px] uppercase tracking-widest transition-colors"
                    >
                        Support Independent Journalism
                    </Link>
                </div>

                {/* Right: Secondary Links & Essential Actions */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center">
                        {[
                            { label: "Magazine", href: "/magazine" },
                            { label: "Archive", href: "/articles" },
                            { label: "About", href: "/about" },
                            { label: "Contact", href: "/contact" },
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-[9px] font-bold text-white/80 hover:text-white transition-colors uppercase tracking-[0.15em] px-3 first:pl-0 border-r border-white/10 last:border-none"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 text-white hover:text-black transition-colors relative pl-4 border-l border-white/20"
                    >
                        <ShoppingBag size={14} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Cart</span>
                        {items.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center">
                                {items.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UtilityNav;
