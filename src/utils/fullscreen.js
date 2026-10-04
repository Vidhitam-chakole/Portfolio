/**
 * Mobile Fullscreen Utilities
 * Provides cross-browser support for entering, exiting, and toggling fullscreen,
 * as well as detecting mobile/touch devices and locking screen orientation.
 */

export const isMobileDevice = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent || navigator.vendor || window.opera || "";
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 1024 || window.innerHeight <= 1024;
  return mobileRegex.test(userAgent) || (isTouch && isSmallScreen);
};

export const isFullscreen = () => {
  if (typeof document === "undefined") return false;
  return Boolean(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
};

export const requestFullscreen = async (targetElement) => {
  if (typeof window === "undefined" || typeof document === "undefined") return false;

  const element = targetElement || document.documentElement;

  if (isFullscreen()) {
    return true;
  }

  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen({ navigationUI: "hide" });
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      await element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen();
    }
  } catch (err) {
    // Browsers may block if called without user gesture
    return false;
  }

  // Attempt to lock orientation to landscape on devices that support Screen Orientation API
  try {
    if (window.screen?.orientation?.lock) {
      window.screen.orientation.lock("landscape").catch(() => {});
    } else if (window.screen?.lockOrientation) {
      window.screen.lockOrientation("landscape");
    }
  } catch (err) {
    // Ignore if not supported
  }

  return true;
};

export const exitFullscreen = async () => {
  if (typeof document === "undefined") return false;

  if (!isFullscreen()) {
    return true;
  }

  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      await document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      await document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      await document.msExitFullscreen();
    }
  } catch (err) {
    return false;
  }

  try {
    if (window.screen?.orientation?.unlock) {
      window.screen.orientation.unlock();
    } else if (window.screen?.unlockOrientation) {
      window.screen.unlockOrientation();
    }
  } catch (err) {
    // Ignore
  }

  return true;
};

export const toggleFullscreen = async (targetElement) => {
  if (isFullscreen()) {
    return await exitFullscreen();
  } else {
    return await requestFullscreen(targetElement);
  }
};
