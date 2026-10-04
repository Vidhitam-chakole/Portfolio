import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdFullscreen } from "react-icons/md";
import { requestFullscreen } from "../../utils/fullscreen";

export default function LandscapePrompt() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobileOrTablet =
        window.innerWidth <= 1024 ||
        (window.innerHeight <= 1024 && isPortrait) ||
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);

      if (isPortrait && isMobileOrTablet) {
        setIsPortraitMobile(true);
      } else {
        setIsPortraitMobile(false);
      }
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  const handleFullscreenTrigger = () => {
    requestFullscreen();
  };

  if (!isPortraitMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleFullscreenTrigger}
        onTouchStart={handleFullscreenTrigger}
        className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 select-none text-white text-center cursor-pointer pointer-events-auto"
      >
        {/* Animated Phone to Landscape */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          {/* Subtle rotation guide circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-white/20"
          />

          {/* Minimal rotating phone */}
          <motion.div
            animate={{
              rotate: [0, 0, 90, 90, 0],
              scale: [1, 1, 1.05, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.8,
              times: [0, 0.15, 0.55, 0.85, 1],
              ease: "easeInOut",
            }}
            className="w-14 h-24 rounded-2xl border-2 border-white/80 bg-neutral-900/60 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-between p-2 relative overflow-hidden"
          >
            {/* Screen shine reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Top speaker */}
            <div className="w-3.5 h-1 bg-white/50 rounded-full z-10" />

            {/* Inner screen graphics */}
            <div className="w-full flex-1 my-1.5 rounded-lg border border-white/15 bg-blue-600/10 flex flex-col items-center justify-center gap-1 z-10">
              <div className="w-6 h-1 bg-blue-400/60 rounded-full" />
              <div className="w-4 h-1 bg-blue-400/40 rounded-full" />
            </div>

            {/* Bottom home bar */}
            <div className="w-5 h-1 bg-white/50 rounded-full z-10" />
          </motion.div>
        </div>

        {/* Minimal Text Information */}
        <div className="space-y-3 max-w-xs flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white tracking-wide">
            Rotate Your Device
          </h3>
          <p className="text-xs text-neutral-300 font-normal leading-relaxed">
            Please turn your phone to landscape mode for the desktop experience.
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleFullscreenTrigger();
            }}
            className="mt-2 flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600/90 hover:bg-blue-600 active:scale-95 text-white text-xs font-medium rounded-lg shadow-lg border border-blue-400/30 transition-all cursor-pointer"
          >
            <MdFullscreen className="text-lg" />
            <span>Go Fullscreen</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
