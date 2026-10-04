import { useState, useEffect, useCallback } from "react";
import {
  isFullscreen as checkIsFullscreen,
  requestFullscreen,
  exitFullscreen,
  toggleFullscreen,
  isMobileDevice,
} from "../utils/fullscreen";

/**
 * Custom React hook to automatically and forcefully enforce full screen mode
 * on mobile devices when users open the website or interact with it.
 */
export function useMobileFullscreen() {
  const [isFullscreenState, setIsFullscreenState] = useState(() => checkIsFullscreen());
  const [isMobile, setIsMobile] = useState(() => isMobileDevice());

  // Update fullscreen state on browser fullscreen events
  const handleFullscreenChange = useCallback(() => {
    setIsFullscreenState(checkIsFullscreen());
  }, []);

  useEffect(() => {
    const mobile = isMobileDevice();
    setIsMobile(mobile);

    // Initial check
    setIsFullscreenState(checkIsFullscreen());

    // Register vendor-prefixed and standard fullscreen change events
    const changeEvents = [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
      "MSFullscreenChange",
    ];

    changeEvents.forEach((evt) => {
      document.addEventListener(evt, handleFullscreenChange);
    });

    if (!mobile) {
      return () => {
        changeEvents.forEach((evt) => {
          document.removeEventListener(evt, handleFullscreenChange);
        });
      };
    }

    // Forceful mobile full screen:
    // 1. Attempt immediately on load (in case browser/webview or standalone mode permits it)
    requestFullscreen().catch(() => {});

    // 2. Capture the very first user gesture anywhere on the screen
    // Mobile browsers require a user gesture (touchstart, pointerdown, click) to allow requestFullscreen()
    const handleGesture = () => {
      if (!checkIsFullscreen()) {
        requestFullscreen().catch(() => {});
      }
    };

    const gestureEvents = ["touchstart", "touchend", "pointerdown", "click"];
    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { passive: true });
    });

    // Also handle orientation changes (e.g. user turning phone to landscape)
    const handleOrientation = () => {
      if (!checkIsFullscreen()) {
        requestFullscreen().catch(() => {});
      }
    };
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      changeEvents.forEach((evt) => {
        document.removeEventListener(evt, handleFullscreenChange);
      });
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGesture);
      });
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, [handleFullscreenChange]);

  return {
    isFullscreen: isFullscreenState,
    isMobile,
    enterFullscreen: requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
}

export default useMobileFullscreen;
