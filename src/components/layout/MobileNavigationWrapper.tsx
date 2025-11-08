"use client";

import { useState, useEffect } from "react";
import MobileNavigation from "./MobileNavigation";

interface MobileNavigationWrapperProps {
  children: React.ReactNode;
}

export default function MobileNavigationWrapper({ children }: MobileNavigationWrapperProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Make the function available globally for Header component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).openMobileMenu = () => setIsMobileMenuOpen(true);
      (window as any).closeMobileMenu = () => setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {children}
      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}