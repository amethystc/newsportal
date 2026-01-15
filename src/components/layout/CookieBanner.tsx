"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted/declined
        const hasConsent = localStorage.getItem("cookie-consent");
        if (!hasConsent) {
            // Delay showing it slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[2000] w-[95%] max-w-2xl">
            <div className="bg-black text-white p-6 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md bg-black/95 flex flex-col md:flex-row items-start md:items-center gap-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-red-600/20 items-center justify-center text-red-500">
                    <Cookie size={24} />
                </div>

                <div className="flex-1">
                    <h4 className="font-unbounded-bold text-sm uppercase tracking-tight mb-1">
                        Cookie Consent
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        Conflict Wire uses cookies to enhance your experience, analyze site traffic, and for essential features like your shopping cart. See our{" "}
                        <Link href="/cookies" className="text-red-500 hover:underline font-bold">
                            Cookie Policy
                        </Link>{" "}
                        for details.
                    </p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        className="flex-1 md:flex-none h-10 border-white/20 bg-transparent text-white hover:bg-white/5 text-[11px] font-bold uppercase tracking-wider"
                        onClick={handleDecline}
                    >
                        Decline
                    </Button>
                    <Button
                        className="flex-1 md:flex-none h-10 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold uppercase tracking-wider"
                        onClick={handleAccept}
                    >
                        Accept
                    </Button>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
