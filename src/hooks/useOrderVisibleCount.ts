"use client";
import { useMemo } from "react";
import { useDeviceType } from "./useDeviceType";

const useOrderVisibleCount = () => {
  const { isMobile, isTablet, isDesktop } = useDeviceType();

  const visibleCount = useMemo(() => {
    if (isDesktop) return 6;
    if (isTablet) return 8;
    if (isMobile) return 3;
    return 3;
  }, [isMobile, isTablet, isDesktop]);

  return { visibleCount };
};

export default useOrderVisibleCount;
