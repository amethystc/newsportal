"use client";

import { useMember } from "@/context/MemberContext";
import { useEffect, useState, use } from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { client } from "@/sanity/client";
import { exclusiveDetailQuery } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { Lock, Loader2, Clock, User as UserIcon, ArrowLeft, Eye, Zap, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

export default function ExclusivePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    const { member, isLoading: isAuthLoading, setIsSignInModalOpen } = useMember();
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
                <h1 className="text-2xl font-bold uppercase mb-4">Content Not Found</h1>
                <Link href="/" className="text-red-600 font-bold hover:underline">Return Home</Link>
            </div>
        );
    }

    // PROTECTION LOGIC - NON-MEMBER VIEW
    if (!member) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Premium Content Preview Card */}
                        <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] mb-8">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <Lock size={32} />
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <span className="inline-block bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider mb-4">
                                    Members-Only Investigation
                                </span>
                                <h1 className="text-3xl md:text-5xl font-bold uppercase mb-4 leading-tight tracking-tighter">
                                    {content.title}
                                </h1>
                                <p className="text-gray-600 font-medium text-lg">
                                    This exclusive intelligence report is available only to premium members
                                </p>
                            </div>

                            {/* Content Preview */}
                            <div className="relative bg-gradient-to-b from-gray-50 to-white border-2 border-gray-200 p-6 md:p-8 mb-8">
                                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase">
                                    Preview
                                </div>
                                <p className="text-gray-700 italic font-serif leading-relaxed text-lg mb-4">
                                    "{content.excerpt}"
                                </p>
                                <div className="h-32 bg-gradient-to-t from-white to-transparent absolute bottom-0 left-0 right-0"></div>
                            </div>

                            {/* Pricing Info */}
                            <div className="bg-black text-white p-6 md:p-8 mb-6">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <p className="text-xs uppercase font-bold text-gray-400 mb-2">Member Pricing</p>
                                        <p className="text-3xl font-bold">
                                            <span className="text-yellow-400">$9.99</span>/month
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            or $79.99/year <span className="text-green-400 font-bold">(Save 33%)</span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3 w-full md:w-auto">
                                        <Link
                                            href="/membership"
                                            className="px-8 py-4 bg-red-600 hover:bg-yellow-400 hover:text-black text-white font-bold uppercase text-sm tracking-widest transition-all text-center"
                                        >
                                            View Membership Plans
                                        </Link>
                                        <Link
                                            href="/#waitlist"
                                            className="px-8 py-4 bg-white hover:bg-gray-100 text-black font-bold uppercase text-sm tracking-widest transition-all text-center border-2 border-white"
                                        >
                                            Join Waitlist
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Member Benefits Quick List */}
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Lock className="text-white" size={14} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Unlimited Exclusive Content</p>
                                        <p className="text-xs text-gray-600">Access all premium investigations</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Eye className="text-white" size={14} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Expert Analysis</p>
                                        <p className="text-xs text-gray-600">In-depth coverage you can't find elsewhere</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Zap className="text-white" size={14} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Early Access</p>
                                        <p className="text-xs text-gray-600">Breaking stories before they go public</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <FileText className="text-white" size={14} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Ad-Free Experience</p>
                                        <p className="text-xs text-gray-600">No distractions, just journalism</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 text-center">
                                Already a member? <Link href="/#waitlist" className="text-red-600 font-bold hover:underline">Sign in here</Link>
                            </p>
                        </div>

                        {/* Why Support Section */}
                        <div className="bg-white border-2 border-gray-200 p-6 md:p-8 text-center">
                            <h3 className="text-xl font-bold uppercase mb-4">Why Support Independent Journalism?</h3>
                            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                                Your membership directly funds reporters in conflict zones. We don't run ads or rely on corporate sponsors.
                                Every dollar helps us provide unbiased, critical coverage of global conflicts.
                            </p>
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
            <article className="min-h-screen bg-white">
                {/* HERO SECTION */}
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-red-600 font-bold text-sm mb-8 hover:underline">
                        <ArrowLeft size={16} /> Back to News
                    </Link>

                    {/* Member Status Badge */}
                    <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <UserIcon size={16} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">You're a Member</p>
                                <p className="text-sm font-bold">Premium Access Granted</p>
                            </div>
                        </div>
                        <div className="hidden md:block text-xs uppercase font-bold tracking-widest opacity-80">
                            Ad-Free • Unlimited
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                            EXCLUSIVE {content.contentType}
                        </span>
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                            REPORT NO. {resolvedParams.slug.substring(0, 6).toUpperCase()}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-[1.1] tracking-tighter">
                        {content.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 border-y border-gray-100 py-6 mb-12">
                        <div className="flex items-center gap-3">
                            {content.author?.image?.asset?.url && (
                                <Image
                                    src={content.author.image.asset.url}
                                    alt={content.author.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                            )}
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Investigation by</p>
                                <p className="font-bold text-sm">{content.author?.name || "Intelligence Unit"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-400">
                            <Clock size={16} />
                            <p className="text-xs font-bold uppercase tracking-widest">
                                {moment(content.publishedAt).format("MMM DD, YYYY")}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 text-red-600 ml-auto">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                            <p className="text-xs font-bold uppercase">Member Only Access</p>
                        </div>
                    </div>

                    {/* PROTECTED CONTENT */}
                    <div className="prose prose-lg max-w-none pt-4 pb-20 prose-headings:font-bold prose-headings:uppercase prose-p:leading-relaxed prose-p:text-gray-800 prose-img:rounded-none">
                        <PortableText value={content.content} />
                    </div>

                    {/* Member Appreciation Footer */}
                    <div className="border-t-4 border-red-600 bg-gray-50 p-8 mt-12">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-600 flex items-center justify-center flex-shrink-0">
                                <UserIcon className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold uppercase text-lg mb-2">Thank You for Supporting Independent Journalism</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    As a premium member, you're helping fund critical reporting from conflict zones around the world.
                                    Your support makes a real difference in bringing important stories to light.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
}
