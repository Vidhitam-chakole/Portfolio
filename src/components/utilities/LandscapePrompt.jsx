import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdScreenRotation } from "react-icons/md";

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
        className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-lg flex flex-col items-center justify-center p-6 select-none text-white text-center pointer-events-auto"
      >
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 90, 90, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", times: [0, 0.4, 0.7, 1], repeatDelay: 0.8 }}
            className="w-16 h-16 rounded-xl border border-white/30 bg-neutral-900/60 backdrop-blur-sm shadow-xl flex items-center justify-center text-white/90"
          >
            <MdScreenRotation size={32} />
          </motion.div>
        </div>

        <div className="space-y-2 max-w-xs">
          <h3 className="text-xl font-semibold text-white tracking-wide">
            Rotate Your Device
          </h3>
          <p className="text-xs text-neutral-300 font-normal leading-relaxed">
            Please turn your phone to landscape mode for the desktop experience.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
