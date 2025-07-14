"use client";

import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import MobileHeader from "./MobileHeader";
import TabletHeader from "./TabletHeader";
import DesktopHeader from "./DesktopHeader";

// 반응형에 따른 헤더 보여주기 위한 커스텀 훅 (useMediaQuery) 적용하는 부분
const useResponsiveBreakpoints = () => {
  const isMobile = useMediaQuery("(max-width: 743px)");
  const isTablet = useMediaQuery("(min-width: 744px) and (max-width: 1399px)");
  const isDesktop = useMediaQuery("(min-width: 1400px)");

  return { isMobile, isTablet, isDesktop };
};

export default function GlobalHeader() {
  const { isMobile, isTablet, isDesktop } = useResponsiveBreakpoints();

  if (isMobile) return <MobileHeader />;
  if (isTablet) return <TabletHeader />;
  if (isDesktop) return <DesktopHeader />;

  return <MobileHeader />;
}
