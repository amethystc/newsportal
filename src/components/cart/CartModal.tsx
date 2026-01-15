"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2, ShoppingBag, ExternalLink } from "lucide-react";

export default function CartModal() {
    const { isOpen, setIsOpen, items, removeFromCart, cartTotal } = useCart();

    // TODO: User needs to replace this with their actual Wise Payment Link
    // If it's a generic link where user inputs amount:
    const WISE_PAYMENT_URL = "https://wise.com/pay/me/conflictnews";

    const handleCheckout = () => {
        // You might want to append amount if the payment provider supports it, e.g. ?amount=
        // For Wise generic links, the user usually types the amount.
        // We can copy the amount to clipboard or just redirect.
        window.open(WISE_PAYMENT_URL, "_blank");
    };

    return (
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-xl">
            <div className="flex flex-col h-full max-h-[80vh]">
                <div className="flex items-center gap-2 mb-6 border-b pb-4">
                    <ShoppingBag className="w-6 h-6" />
                    <h2 className="text-2xl font-bold font-unbounded">Your Cart</h2>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                        <p>Your cart is empty.</p>
                        <Button
                            variant="link"
                            onClick={() => setIsOpen(false)}
                            className="mt-4"
                        >
                            Continue Browsing
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 border p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="relative w-20 h-28 bg-gray-200 flex-shrink-0">
                                        {item.coverImage ? (
                                            <Image
                                                src={item.coverImage}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold font-unbounded text-sm leading-tight mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-600">Digital PDF</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-lg">${item.price}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                                                title="Remove"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t bg-gray-50 -mx-6 -mb-12 px-6 pb-6 rounded-b-lg">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 font-medium">Total:</span>
                                <span className="text-3xl font-bold font-unbounded text-gray-900">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    className="w-full h-12 text-lg bg-[#9fe870] hover:bg-[#8bd160] text-black font-bold font-unbounded flex items-center justify-center gap-2"
                                    onClick={handleCheckout}
                                >
                                    Pay with Wise <ExternalLink size={18} />
                                </Button>
                                <p className="text-xs text-center text-gray-500 max-w-sm mx-auto">
                                    You will be redirected to Wise to complete your payment securely.
                                    Please verify the amount matches your cart total.
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Dialog>
    );
}
