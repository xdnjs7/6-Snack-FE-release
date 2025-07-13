"use client";

import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Custom hook for responsive logic
const useResponsiveBreakpoints = () => {
  const isMobile = useMediaQuery("(max-width: 743px)");
  const isTablet = useMediaQuery("(min-width: 744px) and (max-width: 1400px)");
  const isDesktop = useMediaQuery("(min-width: 1401px)");

  return { isMobile, isTablet, isDesktop };
};

const GlobalHeader = () => {
  const { isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();

  if (isMobile) return <MobileHeader />;
  if (isTablet) return <TabletHeader />;
  if (isDesktop) return <DesktopHeader />;

  return <MobileHeader />;
};

const MobileHeader = () => {
  return (
    <header className="block sm:hidden">
      {/* Mobile specific structure */}
      <div className="w-full h-14 flex justify-between overflow-hidden"></div>
        {/* 1. snack logo */}
        {/* 2. menu btn */}
      <div>Mobile Header</div>
    </header>
  );
};

const TabletHeader = () => {
  return (
    <header className="hidden sm:block md:hidden">
      <div>Tablet Header</div>
    </header>
  );
};

const DesktopHeader = () => {
  return (
    <header className="hidden md:block">
      <div>Desktop Header</div>
    </header>
  );
};

export default GlobalHeader;
