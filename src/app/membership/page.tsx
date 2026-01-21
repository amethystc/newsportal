"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/section/Footer";
import Link from "next/link";
import {
    Check,
    Lock,
    Zap,
    TrendingUp,
    Eye,
    FileText,
    Award,
    Users,
    Bell,
    Download,
    Shield,
    Star
} from "lucide-react";

export default function MembershipPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

    const plans = {
        monthly: {
            price: "9.99",
            period: "month",
            savings: null,
        },
        yearly: {
            price: "79.99",
            period: "year",
            savings: "33%",
            monthlyEquivalent: "6.67",
        },
    };

    const currentPlan = plans[billingCycle];

    const memberBenefits = [
        {
            icon: Lock,
            title: "Exclusive Reports",
            description: "Access in-depth investigative reports unavailable to the public",
        },
        {
            icon: Eye,
            title: "Behind-the-Scenes Analysis",
            description: "Detailed analysis and context from our expert team",
        },
        {
            icon: Zap,
            title: "Breaking News First",
            description: "Get alerts on developing stories before they go public",
        },
        {
            icon: FileText,
            title: "Premium Long-Form Content",
            description: "Extended articles with comprehensive coverage",
        },
        {
            icon: Download,
            title: "Downloadable Reports",
            description: "Save and reference exclusive content offline",
        },
        {
            icon: Bell,
            title: "Priority Notifications",
            description: "Customizable alerts for topics that matter to you",
        },
        {
            icon: Award,
            title: "Member-Only Events",
            description: "Join exclusive Q&A sessions with journalists and experts",
        },
        {
            icon: Users,
            title: "Community Access",
            description: "Connect with like-minded readers and professionals",
        },
    ];

    const featureComparison = [
        { feature: "Daily news articles", free: true, member: true },
        { feature: "Basic category browsing", free: true, member: true },
        { feature: "Email newsletter", free: true, member: true },
        { feature: "Exclusive investigations", free: false, member: true },
        { feature: "Premium analysis", free: false, member: true },
        { feature: "Download reports", free: false, member: true },
        { feature: "Ad-free experience", free: false, member: true },
        { feature: "Early access to stories", free: false, member: true },
        { feature: "Member events & webinars", free: false, member: true },
        { feature: "Community forum", free: false, member: true },
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* HERO SECTION */}
                <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-8">
                        <Star size={16} className="fill-current" />
                        <span className="text-xs font-bold uppercase tracking-widest">Premium Membership</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 leading-[1.05] tracking-tighter">
                        Support Independent<br />Conflict Journalism
                    </h1>

                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Join our community of informed readers and gain access to exclusive reports,
                        in-depth analysis, and premium content from the frontlines.
                    </p>

                    {/* PRICING TOGGLE */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-3 font-bold uppercase text-sm transition-all ${billingCycle === "monthly"
                                ? "bg-black text-white"
                                : "bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-400"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-3 font-bold uppercase text-sm transition-all relative ${billingCycle === "yearly"
                                ? "bg-black text-white"
                                : "bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-400"
                                }`}
                        >
                            Yearly
                            {billingCycle === "yearly" && (
                                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                    SAVE 33%
                                </span>
                            )}
                        </button>
                    </div>

                    {/* PRICING CARD */}
                    <div className="max-w-lg mx-auto bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(220,38,38,1)] transition-all">
                        <div className="flex items-baseline justify-center mb-6">
                            <span className="text-6xl md:text-7xl font-bold tracking-tighter">${currentPlan.price}</span>
                            <span className="text-2xl text-gray-500 ml-2">/{currentPlan.period}</span>
                        </div>

                        {billingCycle === "yearly" && (
                            <div className="bg-green-50 border-2 border-green-200 p-4 mb-8">
                                <p className="text-sm font-bold text-green-800">
                                    That's only <span className="text-2xl">${(currentPlan as any).monthlyEquivalent}</span>/month
                                </p>
                                <p className="text-xs text-green-600 mt-1">Save ${(9.99 * 12 - 79.99).toFixed(2)} per year</p>
                            </div>
                        )}

                        <Link
                            href="/#waitlist"
                            className="w-full h-16 bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-base tracking-widest transition-all flex items-center justify-center mb-6 group"
                        >
                            <span>Get Started</span>
                            <TrendingUp size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <p className="text-xs text-gray-500">
                            Cancel anytime. No hidden fees. 30-day money-back guarantee.
                        </p>
                    </div>
                </section>

                {/* BENEFITS GRID */}
                <section className="max-w-6xl mx-auto px-4 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 tracking-tighter">
                            What You'll Get
                        </h2>
                        <p className="text-gray-600 text-lg">Full access to premium stories and analysis</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {memberBenefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white border-2 border-gray-200 p-6 hover:border-red-600 hover:shadow-lg transition-all group"
                            >
                                <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                                    <benefit.icon className="text-red-600 group-hover:text-white transition-colors" size={24} />
                                </div>
                                <h3 className="font-bold uppercase text-sm mb-2 leading-tight">
                                    {benefit.title}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* COMPARISON TABLE */}
                <section className="max-w-4xl mx-auto px-4 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 tracking-tighter">
                            Free vs. Member
                        </h2>
                        <p className="text-gray-600 text-lg">See what makes membership worth it</p>
                    </div>

                    <div className="bg-white border-2 border-black overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 bg-black text-white font-bold uppercase text-xs md:text-sm">
                            <div className="p-4 border-r border-white/20">Feature</div>
                            <div className="p-4 border-r border-white/20 text-center">Free Reader</div>
                            <div className="p-4 text-center bg-red-600">Member</div>
                        </div>

                        {/* Table Body */}
                        {featureComparison.map((item, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-3 border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                            >
                                <div className="p-4 font-medium text-sm">{item.feature}</div>
                                <div className="p-4 text-center border-l border-gray-200">
                                    {item.free ? (
                                        <Check size={20} className="text-green-600 mx-auto" />
                                    ) : (
                                        <span className="text-gray-300 text-xl">—</span>
                                    )}
                                </div>
                                <div className="p-4 text-center border-l border-gray-200 bg-red-50/50">
                                    {item.member ? (
                                        <Check size={20} className="text-red-600 mx-auto font-bold" />
                                    ) : (
                                        <span className="text-gray-300 text-xl">—</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TRUST SECTION */}
                <section className="max-w-4xl mx-auto px-4 py-20 text-center">
                    <Shield size={48} className="mx-auto mb-6 text-red-600" />
                    <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6 tracking-tighter">
                        Why Support Conflict Wire?
                    </h2>
                    <div className="space-y-4 text-left md:text-center max-w-2xl mx-auto">
                        <p className="text-gray-700 leading-relaxed">
                            Your membership directly funds independent journalism on the ground in conflict zones.
                            We don't run ads, and we don't rely on corporate sponsors.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Every dollar helps us send reporters to underreported regions, verify critical information,
                            and provide unbiased coverage of global conflicts.
                        </p>
                        <p className="font-bold text-lg text-black mt-6">
                            Independent. Fearless. Funded by readers like you.
                        </p>
                    </div>

                    <Link
                        href="/#waitlist"
                        className="inline-flex items-center justify-center mt-12 px-12 py-5 bg-black text-white font-bold uppercase text-sm tracking-widest hover:bg-red-600 transition-all group"
                    >
                        <span>Become a Member</span>
                        <TrendingUp size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    );
}
