"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import CartModal from "@/components/cart/CartModal";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            {children}
            <CartModal />
        </CartProvider>
    );
}
