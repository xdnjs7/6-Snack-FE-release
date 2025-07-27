import { useMediaQuery } from "react-responsive";

export const useDeviceType = () => {
  const isMobile = useMediaQuery({ maxWidth: 743 });
  const isTablet = useMediaQuery({ minWidth: 744, maxWidth: 1399 });
  const isDesktop = useMediaQuery({ minWidth: 1400 });

  return { isMobile, isTablet, isDesktop };
};
