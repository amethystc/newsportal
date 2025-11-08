"use client";

import { useState } from "react";
import MobileNavigation from "./MobileNavigation";

interface MobileNavigationProviderProps {
  children: React.ReactNode;
}

export default function MobileNavigationProvider({ children }: MobileNavigationProviderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {children}
      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
      {/* Pass open function to Header through context or props */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.openMobileMenu = () => {
            window.dispatchEvent(new CustomEvent('openMobileMenu'));
          };
        `
      }} />
    </>
  );
}