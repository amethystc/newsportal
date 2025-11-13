"use client";

import { useState, useEffect } from "react";
import MobileNavigation from "./MobileNavigation";

interface MobileNavigationWrapperProps {
  children: React.ReactNode;
}

export default function MobileNavigationWrapper({ children }: MobileNavigationWrapperProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Listen for custom events from Header component
  useEffect(() => {
    setIsMounted(true);
    
    const handleOpenMenu = () => {
      console.log("Open menu event received");
      setIsMobileMenuOpen(true);
    };
    const handleCloseMenu = () => {
      console.log("Close menu event received");
      setIsMobileMenuOpen(false);
    };
    
    window.addEventListener('openMobileMenu', handleOpenMenu);
    window.addEventListener('closeMobileMenu', handleCloseMenu);
    
    return () => {
      window.removeEventListener('openMobileMenu', handleOpenMenu);
      window.removeEventListener('closeMobileMenu', handleCloseMenu);
    };
  }, []);

  return (
    <>
      {children}
      {isMounted && (
        <MobileNavigation 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      )}
    </>
  );
}