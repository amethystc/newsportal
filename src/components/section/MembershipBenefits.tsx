"use client";

import Link from "next/link";
import {
    Lock,
    Eye,
    Zap,
    FileText,
    Download,
    Bell,
    Award,
    Users,
    TrendingUp,
    Crown
} from "lucide-react";

interface MembershipBenefitsProps {
    variant?: "compact" | "full";
    showCTA?: boolean;
}

export default function MembershipBenefits({
    variant = "full",
    showCTA = true
}: MembershipBenefitsProps) {
    const benefits = [
        {
            icon: Lock,
            title: "Exclusive Intelligence",
            description: "Access in-depth investigative reports unavailable to the public",
        },
        {
            icon: Eye,
            title: "Expert Analysis",
            description: "Detailed analysis and context from our expert team",
        },
        {
            icon: Zap,
            title: "Breaking News First",
            description: "Get alerts on developing stories before they go public",
        },
        {
            icon: FileText,
            title: "Premium Long-Form",
            description: "Extended articles with comprehensive coverage",
        },
        {
            icon: Download,
            title: "Downloadable Reports",
            description: "Save and reference exclusive content offline",
        },
        {
            icon: Bell,
            title: "Priority Alerts",
            description: "Customizable notifications for topics that matter",
        },
        {
            icon: Award,
            title: "Member Events",
            description: "Join exclusive Q&A sessions with journalists",
        },
        {
            icon: Users,
            title: "Community Access",
            description: "Connect with professionals and analysts",
        },
    ];

    const displayBenefits = variant === "compact" ? benefits.slice(0, 4) : benefits;

    return (
        <div className="bg-gradient-to-br from-black to-gray-900 text-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
                <Crown className="text-yellow-400" size={32} />
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">
                    Member Benefits
                </h3>
            </div>

            <div className={`grid ${variant === "compact" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"} gap-6 mb-8`}>
                {displayBenefits.map((benefit, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 group"
                    >
                        <div className="w-10 h-10 bg-red-600 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-400 transition-colors">
                            <benefit.icon size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-1 leading-tight">
                                {benefit.title}
                            </h4>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {showCTA && (
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-2xl font-bold mb-2">
                                <span className="text-yellow-400">$9.99/mo</span> or <span className="text-yellow-400">$79.99/yr</span>
                            </p>
                            <p className="text-sm text-gray-400">
                                Save 33% with annual membership
                            </p>
                        </div>
                        <Link
                            href="/membership"
                            className="w-full md:w-auto px-8 py-4 bg-red-600 hover:bg-yellow-400 hover:text-black text-white font-bold uppercase text-sm tracking-widest transition-all flex items-center justify-center gap-2 group"
                        >
                            <span>View Plans</span>
                            <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
