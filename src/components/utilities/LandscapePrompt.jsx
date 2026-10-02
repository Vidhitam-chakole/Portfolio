import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdScreenRotation, MdClose } from "react-icons/md";

export default function LandscapePrompt() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobileOrTablet = window.innerWidth <= 1024 || (window.innerHeight <= 1024 && isPortrait);
      const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Show prompt if portrait on mobile/tablet or touch device
      if (isPortrait && (isMobileOrTablet || isTouchDevice)) {
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

  if (!isPortraitMobile || dismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 select-none text-white text-center"
      >
        {/* Subtle background ambient glow */}
        <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -top-10 -left-10" />
        <div className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -bottom-10 -right-10" />

        {/* Windows 11 Fluent Modal Card */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-sm w-full bg-[#1e1e1e]/90 border border-white/15 p-8 rounded-2xl shadow-2xl flex flex-col items-center backdrop-blur-md"
        >
          {/* Close / Dismiss button at top right */}
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-3 right-3 p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Dismiss and continue in portrait"
          >
            <MdClose size={20} />
          </button>

          {/* Animated Rotate Device Icon */}
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

          <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-medium rounded-full mb-3 uppercase tracking-wider">
            Landscape Mode Recommended
          </span>

          <h2 className="text-2xl font-bold mb-2 tracking-tight text-white">
            Please Rotate Your Device
          </h2>

          <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
            For the complete <strong className="text-white font-medium">Windows 11 Desktop Experience</strong>, window management, and taskbar navigation, please rotate your phone horizontally.
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => setDismissed(true)}
              className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white rounded-lg text-sm font-medium transition-all duration-150 border border-white/10 active:scale-95"
            >
              Continue in Portrait Anyway
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
