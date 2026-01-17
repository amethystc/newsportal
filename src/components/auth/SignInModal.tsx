"use client";

import { useState } from "react";
import { useMember } from "@/context/MemberContext";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, Lock, CheckCircle2, XCircle } from "lucide-react";

export default function SignInModal() {
    const { isSignInModalOpen, setIsSignInModalOpen, login } = useMember();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        const success = await login(email);

        if (success) {
            setStatus("success");
            setMessage("Welcome back to Conflict Wire Exclusive.");
            setTimeout(() => {
                setIsSignInModalOpen(false);
                setStatus("idle");
                setEmail("");
            }, 2000);
        } else {
            setStatus("error");
            setMessage("Access denied. Please ensure your membership is active.");
        }
    };

    return (
        <Dialog isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)}>
            <div className="sm:max-w-[400px] bg-white">
                <div className="pb-4">
                    <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                        <Lock size={24} />
                    </div>
                    <h2 className="text-center font-bold text-xl uppercase mb-2">
                        Member Access
                    </h2>
                    <p className="text-center text-gray-500 font-medium pt-2 text-sm">
                        Enter your email to access exclusive member-only investigations and reports.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            type="email"
                            placeholder="Email address"
                            className="pl-10 h-12 border-gray-200 focus:border-red-500 focus:ring-red-500 rounded-none font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === "loading" || status === "success"}
                            required
                        />
                    </div>

                    {status === "error" && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs font-bold border border-red-100">
                            <XCircle size={14} />
                            {message}
                        </div>
                    )}

                    {status === "success" && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                            <CheckCircle2 size={14} />
                            {message}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-12 bg-black hover:bg-red-600 text-white font-bold uppercase text-xs tracking-widest transition-all"
                        disabled={status === "loading" || status === "success"}
                    >
                        {status === "loading" ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            "Sign In"
                        )}
                    </Button>

                    <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed px-4">
                        Not a member yet? Members are selected from our waitlist.
                        <br />
                        Join the waitlist to get exclusive access.
                    </p>
                </form>
            </div>
        </Dialog>
    );
}
