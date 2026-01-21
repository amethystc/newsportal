"use client";

import { useMember } from "@/context/MemberContext";
import { useEffect, useState, use } from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { client } from "@/sanity/client";
import { exclusiveDetailQuery } from "@/sanity/queries";
import { PortableText } from "@/components/ui/portable-text";
import { Lock, Loader2, Clock, User as UserIcon, ArrowLeft, Eye, Zap, FileText, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

export default function ExclusivePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const { member, isLoading: isAuthLoading } = useMember();
    const [content, setContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const data = await client.fetch(exclusiveDetailQuery, { slug: resolvedParams.slug });
                setContent(data);
            } catch (error) {
                console.error("Error fetching exclusive content:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContent();
    }, [resolvedParams.slug]);

    if (isLoading || isAuthLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-red-600" size={40} />
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
                <h1 className="text-2xl font-black mb-4">Content Not Found</h1>
                <Link href="/" className="text-red-600 font-black hover:underline uppercase tracking-widest text-xs">Return Home</Link>
            </div>
        );
    }

    // PROTECTION LOGIC - NON-MEMBER VIEW
    if (!member) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white py-12 md:py-20">
                    <div className="cw-container">
                        <div className="max-w-4xl mx-auto">
                            {/* Premium Content Preview Card */}
                            <div className="bg-white border-4 border-black p-8 md:p-16 shadow-[20px_20px_0px_0px_rgba(220,38,38,1)] mb-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 -mr-16 -mt-16 rotate-45" />

                                <div className="flex flex-col items-center text-center mb-12">
                                    <div className="inline-flex items-center gap-3 bg-red-600 text-white px-4 py-1.5 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <Eye size={16} fill="white" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Member Content</span>
                                    </div>

                                    <h1 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight mb-6">
                                        {content.title}
                                    </h1>

                                    <p className="text-gray-500 font-medium text-lg max-w-2xl leading-relaxed">
                                        This special report is available to our premium members. Access is currently limited to active subscribers.
                                    </p>
                                </div>

                                {/* Content Preview / Scrimmed */}
                                <div className="relative mb-12 bg-gray-50 border-2 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                                    <div className="absolute -top-4 left-6 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                        Story Summary
                                    </div>
                                    <p className="text-black font-medium leading-relaxed text-lg italic opacity-80">
                                        "{content.excerpt}"
                                    </p>
                                    <div className="h-24 bg-gradient-to-t from-gray-50 to-transparent absolute bottom-0 left-0 right-0" />
                                </div>

                                {/* Membership CTA Box */}
                                <div className="bg-black text-white p-8 md:p-12 mb-8 border-l-[12px] border-red-600 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                                    <div className="grid md:grid-cols-2 gap-12 items-center">
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-red-500 mb-4">Subscription Required</p>
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-4xl md:text-5xl font-black">$9.99</span>
                                                <span className="text-gray-500 text-sm font-black uppercase tracking-widest">/ Month</span>
                                            </div>
                                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                                                Full Archive Access • Special Story Drops • In-Depth Reports
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <Link
                                                href="/membership"
                                                className="w-full py-5 bg-white text-black hover:bg-red-600 hover:text-white font-black uppercase text-xs tracking-[0.2em] transition-all text-center flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]"
                                            >
                                                Subscribe Now <ArrowRight size={16} />
                                            </Link>
                                            <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] text-center">
                                                Verify subscription in 30 seconds
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">
                                        Full access is currently <span className="text-red-600">limited</span> to waitlist members.
                                    </p>
                                    <Link href="/#waitlist" className="inline-block mt-4 text-xs font-black uppercase tracking-widest text-black border-b-2 border-red-600 pb-1 hover:text-red-600 transition-colors">
                                        Apply for full access &rarr;
                                    </Link>
                                </div>
                            </div>

                            {/* Trust Footer */}
                            <div className="grid md:grid-cols-3 gap-8 py-12 border-t border-gray-100">
                                {[
                                    { icon: Lock, label: "Exclusive Reports", sub: "Verified independent news" },
                                    { icon: Zap, label: "Real-Time Alerts", sub: "Live updates as they happen" },
                                    { icon: FileText, label: "In-Depth Content", sub: "Comprehensive field coverage" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center text-center">
                                        <div className="w-10 h-10 bg-gray-50 flex items-center justify-center mb-4 rounded-full">
                                            <item.icon size={18} className="text-red-600" />
                                        </div>
                                        <h3 className="font-black uppercase text-[10px] tracking-widest mb-1">{item.label}</h3>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{item.sub}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    // MEMBER VIEW - PREMIUM ACCESS
    return (
        <>
            <Header />
            <article className="min-h-screen bg-white pb-20">
                {/* Article Header */}
                <div className="bg-gray-50 border-b border-gray-100 py-12 md:py-20 lg:py-24">
                    <div className="cw-container">
                        <div className="max-w-4xl mx-auto">
                            <Link href="/" className="inline-flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest mb-12 hover:underline">
                                <ArrowLeft size={14} /> Back to Stories
                            </Link>

                            {/* Member Status Badge */}
                            <div className="bg-black text-white px-6 py-4 mb-10 flex items-center justify-between shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-600/20 flex items-center justify-center text-red-500">
                                        <UserIcon size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[8px] uppercase font-black tracking-[0.2em] text-red-500">Active Member</p>
                                        <p className="text-xs font-black uppercase tracking-widest">Premium Member Access <span className="text-green-500 ml-1">● Active</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    {content.contentType} Analysis
                                </span>
                                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                    STORY NO. {resolvedParams.slug.substring(0, 8).toUpperCase()}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter mb-12">
                                {content.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-black/5">
                                <div className="flex items-center gap-4">
                                    {content.author?.image?.asset?.url && (
                                        <Image
                                            src={content.author.image.asset.url}
                                            alt={content.author.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover border-2 border-white shadow-xl"
                                        />
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Investigation Lead</span>
                                        <span className="font-black text-sm uppercase tracking-widest">{content.author?.name || "Intelligence Unit"}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Filed Date</span>
                                    <div className="flex items-center gap-2 font-black text-sm uppercase tracking-widest">
                                        <Clock size={14} className="text-red-600" />
                                        <span>{moment(content.publishedAt).format("DD MMM YYYY")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="cw-container pt-16">
                    <div className="max-w-3xl mx-auto">
                        <div className="pb-20">
                            <PortableText value={content.content} />
                        </div>

                        {/* Member Appreciation Footer */}
                        <div className="border-t-8 border-black bg-gray-50 p-10 mt-12 shadow-[20px_20px_0px_0px_rgba(220,38,38,0.15)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 text-black opacity-5 group-hover:opacity-10 transition-opacity">
                                <FileText size={120} />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-16 h-16 bg-red-600 flex items-center justify-center shrink-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                    <Zap className="text-white" size={28} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-black uppercase text-xl md:text-2xl leading-tight mb-4 tracking-tight">Support Independent Global News</h3>
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                                        As a premium member, you fund investigations that provide clarity on complex global events. Your commitment ensures we remain independent of corporate or state interests.
                                    </p>
                                    <div className="mt-8 flex items-center gap-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-black text-white px-3 py-1">Mission Critical</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 underline">Read full transparency report &rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
}
