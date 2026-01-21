import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useMember } from "@/context/MemberContext";
import { ShoppingBag, User, LogOut } from "lucide-react";

const UtilityNav = () => {
    const { setIsOpen, items } = useCart();
    const { member, logout, setIsSignInModalOpen } = useMember();

    return (
        <div className="w-full bg-red-600 border-b border-white/10 py-2 px-4 hidden md:block">
            <div className="container mx-auto flex justify-between items-center max-w-[1400px]">
                {/* Left: Support Call to Action */}
                <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-sm leading-tight uppercase tracking-tight">
                            Support Conflict Wire
                        </span>
                        <span className="text-white/80 text-[10px] m-0 p-0 font-medium">
                            Fund independent conflict reporting
                        </span>
                    </div>
                    <Link
                        href="/#waitlist"
                        className="bg-[#ffe500] hover:bg-[#ffe500]/90 text-black text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1 transition-colors transition-transform active:scale-95 shadow-sm"
                    >
                        Support us <span className="text-lg leading-none">→</span>
                    </Link>
                </div>

                {/* Right: Essential Links & Auth */}
                <div className="flex items-center">
                    <div className="flex gap-4 items-center">
                        <Link
                            href="/magazine"
                            className="text-[11px] font-bold text-white hover:text-black transition-colors uppercase tracking-wider px-3 border-r border-white/20"
                        >
                            Magazine
                        </Link>
                        <Link
                            href="/articles"
                            className="text-[11px] font-bold text-white hover:text-black transition-colors uppercase tracking-wider px-3 border-r border-white/20"
                        >
                            Articles
                        </Link>
                        <Link
                            href="/membership"
                            className="text-[11px] font-bold text-white hover:text-black transition-colors uppercase tracking-wider px-3 border-r border-white/20"
                        >
                            Membership
                        </Link>
                        <Link
                            href="/about"
                            className="text-[11px] font-light text-white hover:text-black transition-colors uppercase tracking-wider px-3 border-r border-white/20"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-[11px] font-light text-white hover:text-black transition-colors uppercase tracking-wider px-3"
                        >
                            Contact
                        </Link>
                    </div>

                    <div className="ml-6 pl-6 border-l border-white/30 flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center gap-2 text-white hover:text-black transition-colors relative"
                        >
                            <ShoppingBag size={18} />
                            <span className="text-[11px] font-bold uppercase">Cart</span>
                            {items.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#ffe500] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </button>

                        {/* Hide Sign In for early stage/waitlist as requested by user */}
                        {/* 
                        <div className="flex items-center border-l border-white/30 pl-4 gap-4">
                            {!member ? (
                                <button
                                    onClick={() => setIsSignInModalOpen(true)}
                                    className="flex items-center gap-2 text-white font-unbounded-bold text-[11px] hover:text-black transition-colors uppercase tracking-wider"
                                >
                                    <User size={16} />
                                    Sign in
                                </button>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] text-white/70 font-bold uppercase tracking-tighter leading-none">
                                            {member.membershipType.replace('_', ' ')}
                                        </span>
                                        <span className="text-[11px] text-white font-unbounded-bold uppercase leading-tight">
                                            {member.fullName.split(' ')[0]}
                                        </span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="text-white hover:text-black transition-colors"
                                        title="Sign out"
                                    >
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                        */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UtilityNav;
