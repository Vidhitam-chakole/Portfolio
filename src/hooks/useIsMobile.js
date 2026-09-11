import { useWindowSize } from "./useWindowSize";

const MOBILE_BREAKPOINT = 1024;

export const useIsMobile = () => {
  const { width } = useWindowSize();
  return width < MOBILE_BREAKPOINT;
};

export const useIsPortrait = () => {
  const { width, height } = useWindowSize();
  return height > width;
};
