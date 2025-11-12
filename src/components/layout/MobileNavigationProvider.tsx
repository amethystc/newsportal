"use client";

import { useState, useEffect } from "react";
import MobileNavigation from "./MobileNavigation";

interface MobileNavigationProviderProps {
  children: React.ReactNode;
}

export default function MobileNavigationProvider({ children }: MobileNavigationProviderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    setIsMounted(true);
    (window as any).openMobileMenu = () => {
      window.dispatchEvent(new CustomEvent('openMobileMenu'));
    };
  }, []);

  return (
    <>
      {children}
      {isMounted && (
        <MobileNavigation 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu} 
        />
      )}
    </>
  );
}