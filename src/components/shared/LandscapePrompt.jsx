import React, { useEffect, useState } from "react";

const isLikelyMobile = () => {
  if (typeof window === "undefined") return false;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const shortSide = Math.min(window.innerWidth, window.innerHeight) < 768;
  const ua = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return coarse || ua || shortSide;
};

function LandscapePrompt() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const update = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      setIsPortraitMobile(isLikelyMobile() && portrait);
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    const mq = window.matchMedia("(orientation: portrait)");
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  if (!isPortraitMobile || dismissed) return null;

  return (
    <div
      className="landscape-prompt"
      role="dialog"
      aria-modal="true"
      aria-labelledby="landscape-prompt-title"
    >
      <div className="landscape-prompt-card">
        <div className="landscape-prompt-icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="w-16 h-16">
            <rect
              x="20"
              y="8"
              width="24"
              height="48"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle cx="32" cy="50" r="2" fill="currentColor" />
            <path
              d="M44 22h10a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H44"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M50 18l8 8-8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 id="landscape-prompt-title">Use landscape mode</h2>
        <p>
          Rotate your phone sideways for the best experience on this Windows-style
          desktop.
        </p>
        <button
          type="button"
          className="landscape-prompt-btn"
          onClick={() => setDismissed(true)}
        >
          Continue in portrait
        </button>
      </div>
    </div>
  );
}

export default LandscapePrompt;
