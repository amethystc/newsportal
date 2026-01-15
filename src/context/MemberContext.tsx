"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Member = {
    fullName: string;
    email: string;
    membershipType: string;
    status: string;
};

type MemberContextType = {
    member: Member | null;
    login: (email: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    isSignInModalOpen: boolean;
    setIsSignInModalOpen: (isOpen: boolean) => void;
};

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({ children }: { children: React.ReactNode }) => {
    const [member, setMember] = useState<Member | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

    useEffect(() => {
        const savedMember = localStorage.getItem("cw_member");
        if (savedMember) {
            setMember(JSON.parse(savedMember));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string) => {
        try {
            const response = await fetch("/api/auth/member-check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.member) {
                    setMember(data.member);
                    localStorage.setItem("cw_member", JSON.stringify(data.member));
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = () => {
        setMember(null);
        localStorage.removeItem("cw_member");
    };

    return (
        <MemberContext.Provider
            value={{
                member,
                login,
                logout,
                isLoading,
                isSignInModalOpen,
                setIsSignInModalOpen,
            }}
        >
            {children}
        </MemberContext.Provider>
    );
};

export const useMember = () => {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error("useMember must be used within a MemberProvider");
    }
    return context;
};
