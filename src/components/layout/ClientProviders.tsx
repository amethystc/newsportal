"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import CartModal from "@/components/cart/CartModal";
import CookieBanner from "./CookieBanner";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            {children}
            <CartModal />
            <CookieBanner />
        </CartProvider>
    );
}
