"use client";

import { useMember } from "@/context/MemberContext";
import { useEffect, useState, use } from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import { client } from "@/sanity/client";
import { exclusiveDetailQuery } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { Lock, Loader2, Clock, User as UserIcon, ArrowLeft } from "lucide-react";
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
                <h1 className="text-2xl font-unbounded-bold uppercase mb-4">Content Not Found</h1>
                <Link href="/" className="text-red-600 font-bold hover:underline">Return Home</Link>
            </div>
        );
    }

    // PROTECTION LOGIC
    if (!member) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
                    <div className="max-w-xl w-full bg-white border-2 border-black p-8 md:p-12 text-center shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-unbounded-bold uppercase mb-4 leading-tight">
                            Exclusive Investigation
                        </h1>
                        <p className="text-gray-600 mb-8 font-medium">
                            This intelligence report is available exclusively to active Conflict Wire members.
                        </p>

                        <div className="bg-gray-50 border border-dashed border-gray-300 p-6 mb-8 text-left">
                            <p className="text-xs uppercase font-bold text-gray-400 mb-2">Public Preview</p>
                            <p className="text-gray-800 italic font-serif leading-relaxed line-clamp-3">
                                "{content.excerpt}"
                            </p>
                        </div>

                        <Link
                            href="/#waitlist"
                            className="w-full h-14 bg-black hover:bg-red-600 text-white font-unbounded-bold uppercase text-sm tracking-widest transition-all mb-4 flex items-center justify-center"
                        >
                            Join Waitlist to Read
                        </Link>

                        <p className="text-xs text-gray-400">
                            Approved members from the waitlist can sign in with their email.
                        </p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <article className="min-h-screen bg-white">
                {/* HERO SECTION */}
                <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-red-600 font-bold text-sm mb-8 hover:underline">
                        <ArrowLeft size={16} /> Back to News
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-black text-white text-[10px] font-unbounded-bold px-3 py-1 uppercase tracking-wider">
                            EXCLUSIVE {content.contentType}
                        </span>
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                            REPORT NO. {resolvedParams.slug.substring(0, 6).toUpperCase()}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-unbounded-bold uppercase mb-8 leading-[1.1] tracking-tighter">
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
                            <UserIcon size={16} />
                            <p className="text-xs font-unbounded-bold uppercase">Member Only Access</p>
                        </div>
                    </div>

                    {/* PROTECTED CONTENT */}
                    <div className="prose prose-lg max-w-none pt-4 pb-20 prose-headings:font-unbounded-bold prose-headings:uppercase prose-p:leading-relaxed prose-p:text-gray-800 prose-img:rounded-none">
                        <PortableText value={content.content} />
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
}
