"use client";
import Image from "next/image";
import { useState } from "react";
import { Crown, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export function SubscriptionCTA() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) throw new Error("Failed to add to waitlist");
            setIsSubmitted(true);
            setEmail("");
            setTimeout(() => setIsSubmitted(false), 3000);
        } catch (error) {
            console.error(error);
            alert("There was an error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="waitlist" className="w-full bg-white py-32">
            <div className="cw-container">
                <div className="relative w-full min-h-[500px] md:h-[600px] overflow-hidden group border-[16px] border-white shadow-[0px_40px_100px_-20px_rgba(0,0,0,0.15)] bg-black">
                    <Image
                        src="/cta.jpg"
                        alt="Join Conflict Wire"
                        fill
                        className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-20 lg:p-24 max-w-4xl">
                        <div className="flex items-center gap-3 bg-red-600 text-white px-4 py-1.5 mb-10 w-fit shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <Crown size={16} fill="white" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Premium Updates</span>
                        </div>

                        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-8 leading-[1.1] tracking-tighter">
                            Get the <span className="text-red-600 italic">Global Perspective</span>
                        </h2>

                        <p className="text-white/60 text-base md:text-lg mb-12 max-w-2xl leading-relaxed">
                            Join our community of global readers and observers. <br className="hidden md:block" />
                            Sign up for the latest field reports and updates.
                        </p>

                        {isSubmitted ? (
                            <div className="bg-red-600 text-white p-8 border-l-[12px] border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-300">
                                <div className="flex items-center gap-4">
                                    <CheckCircle2 size={32} />
                                    <div>
                                        <h3 className="font-black uppercase tracking-[0.1em] text-xl">Sign Up Received</h3>
                                        <p className="text-sm opacity-90 italic">We'll notify you as soon as the next report is ready.</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-w-2xl">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col md:flex-row gap-0 bg-white p-2 border-4 border-black shadow-[20px_20px_0px_0px_rgba(220,38,38,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[24px_24px_0px_0px_rgba(220,38,38,1)]"
                                >
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ENTER EMAIL ADDRESS..."
                                        className="flex-grow px-10 py-6 focus:outline-none text-black font-black uppercase text-xs tracking-[0.2em] placeholder:text-gray-300"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-black text-white font-black px-12 py-6 uppercase text-xs tracking-[0.3em] hover:bg-red-600 transition-all flex items-center justify-center gap-4 min-w-[240px]"
                                    >
                                        {isSubmitting ? "PROCESSING..." : "GET UPDATES"}
                                        <ArrowRight size={18} />
                                    </button>
                                </form>

                                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/40">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">End-to-End Encrypted</span>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                                        Community: <span className="text-red-500">12,482 Readers</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
