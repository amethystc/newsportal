import React from "react";
import { CartProvider } from "@/context/CartContext";
import { MemberProvider } from "@/context/MemberContext";
import CartModal from "@/components/cart/CartModal";
import SignInModal from "@/components/auth/SignInModal";
import CookieBanner from "./CookieBanner";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <MemberProvider>
            <CartProvider>
                {children}
                <CartModal />
                <SignInModal />
                <CookieBanner />
            </CartProvider>
        </MemberProvider>
    );
}
