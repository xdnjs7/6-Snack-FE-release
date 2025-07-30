"use client";
import { useMemo } from "react";
import { useDeviceType } from "./useDeviceType";

export default function useOrderVisibleCount() {
  const { isMobile, isTablet, isDesktop } = useDeviceType();

  const visibleCount = useMemo(() => {
    if (isDesktop) return 6;
    if (isTablet) return 8;
    return 3; 
  }, [isMobile, isTablet, isDesktop]);

  return { visibleCount };
}
