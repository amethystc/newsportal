"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2, ShoppingBag, ExternalLink, Mail, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CartModal() {
    const { isOpen, setIsOpen, items, removeFromCart, cartTotal } = useCart();
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [step, setStep] = useState(1); // 1: Cart, 2: Confirmation

    const validateEmail = (e: string) => {
        setEmail(e);
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(re.test(e));
    };

    const handleCheckout = () => {
        // Use the checkoutUrl from the first item if it exists, otherwise fallback to a default
        // In a better flow, we use the specific link you added in Sanity
        const checkoutUrl = items[0]?.checkoutUrl || "https://buy.stripe.com/8x26oJboH2b83Xfb274gg00";

        // We open the payment link
        window.open(checkoutUrl, "_blank");

        // Move to success step to show instructions
        setStep(2);
    };

    const resetAndClose = () => {
        setIsOpen(false);
        setTimeout(() => setStep(1), 300);
    };

    return (
        <Dialog isOpen={isOpen} onClose={resetAndClose} className="max-w-xl">
            <div className="flex flex-col h-full max-h-[85vh]">
                {step === 1 ? (
                    <>
                        <div className="flex items-center gap-2 mb-6 border-b pb-4">
                            <ShoppingBag className="w-6 h-6 text-red-600" />
                            <h2 className="text-2xl font-bold font-unbounded uppercase tracking-tight">Your Cart</h2>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                                <ShoppingBag className="w-16 h-16 mb-4 opacity-10" />
                                <p className="font-medium">Your cart is currently empty.</p>
                                <Button
                                    variant="link"
                                    onClick={resetAndClose}
                                    className="mt-4 text-red-600 font-bold"
                                >
                                    Browse Magazine Issues →
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-1 mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 transition-all">
                                            <div className="relative w-20 h-28 bg-white shadow-sm flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                                                {item.coverImage ? (
                                                    <Image
                                                        src={item.coverImage}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">NO COVER</div>
                                                )}
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <h3 className="font-bold font-unbounded text-sm leading-tight text-gray-900 mb-1">{item.title}</h3>
                                                    <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Digital Edition • PDF</p>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-xl text-gray-900">${item.price}</span>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-all"
                                                        title="Remove item"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="bg-red-50 p-4 rounded-xl border border-red-100/50">
                                        <label className="block text-[11px] font-bold text-red-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Mail size={14} /> Delivery Email Address
                                        </label>
                                        <Input
                                            placeholder="Enter your email for delivery..."
                                            value={email}
                                            onChange={(e) => validateEmail(e.target.value)}
                                            className="bg-white border-red-200 focus:border-red-600 h-11"
                                        />
                                        <p className="text-[10px] text-red-700 mt-2 leading-relaxed italic">
                                            Your magazine will be sent to this address once payment is verified.
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center py-2 px-1">
                                        <span className="text-gray-600 font-bold uppercase text-xs tracking-widest">Total to pay:</span>
                                        <span className="text-3xl font-black font-unbounded text-gray-900">
                                            ${cartTotal.toFixed(2)}
                                        </span>
                                    </div>

                                    <Button
                                        disabled={!isEmailValid}
                                        className={`w-full h-14 text-base font-bold font-unbounded uppercase tracking-tight shadow-lg transition-all active:scale-95 ${isEmailValid ? "bg-black hover:bg-gray-800 text-white" : "bg-gray-200 text-gray-400"
                                            }`}
                                        onClick={handleCheckout}
                                    >
                                        Complete Payment on Stripe <ExternalLink size={18} className="ml-2" />
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        SECURE CHECKOUT VIA STRIPE
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="py-8 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className="text-2xl font-black font-unbounded leading-tight mb-4">PURCHASE INITIATED!</h2>
                        <div className="space-y-4 text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
                            <p>
                                A new window has opened for your payment. Please complete the transfer of
                                <strong className="text-gray-900 ml-1 font-bold">${cartTotal.toFixed(2)}</strong>.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-left">
                                <h4 className="font-bold text-gray-900 mb-2 uppercase text-[11px] tracking-wider">What happens next?</h4>
                                <ol className="list-decimal list-inside space-y-2 text-xs">
                                    <li>Complete your payment on the Stripe page</li>
                                    <li>We will verify the transfer manually</li>
                                    <li>Your magazine will be emailed to <strong className="text-red-600">{email}</strong></li>
                                </ol>
                            </div>
                        </div>
                        <Button
                            className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-6 text-lg rounded-full"
                            onClick={resetAndClose}
                        >
                            Back to Site
                        </Button>
                    </div>
                )}
            </div>
        </Dialog>
    );
}
