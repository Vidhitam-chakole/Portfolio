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
        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 select-none text-white text-center pointer-events-auto"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-sm w-full bg-[#1e1e1e]/90 border border-white/15 p-8 rounded-2xl shadow-2xl flex flex-col items-center backdrop-blur-md"
        >
          <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-25" />
            <motion.div
              animate={{ rotate: [0, 90, 90, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", times: [0, 0.4, 0.7, 1], repeatDelay: 0.8 }}
              className="w-16 h-16 rounded-xl border-2 border-blue-400 bg-neutral-900/90 shadow-lg flex items-center justify-center text-blue-400"
            >
              <MdScreenRotation size={32} />
            </motion.div>
          </div>

          <h2 className="text-2xl font-bold mb-2 tracking-tight text-white">
            Please Rotate Your Device
          </h2>

          <p className="text-neutral-300 text-sm leading-relaxed font-light">
            Please rotate your phone horizontally for the desktop experience.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
