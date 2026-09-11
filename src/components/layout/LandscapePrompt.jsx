import React, { useCallback, useEffect, useState } from "react";
import { useIsMobile, useIsPortrait } from "../../hooks/useIsMobile";

const STORAGE_KEY = "portfolio-landscape-prompt-dismissed";

const LandscapePrompt = () => {
  const isMobile = useIsMobile();
  const isPortrait = useIsPortrait();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const visible = isMobile && isPortrait && !dismissed;

  useEffect(() => {
    if (isMobile && !isPortrait) {
      setDismissed(true);
    }
  }, [isMobile, isPortrait]);

  const continueAnyway = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setDismissed(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="not-mobile-friendly"
      className="landscape-prompt"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titolo-errore"
      aria-describedby="dettagli-errore"
    >
      <div className="landscape-prompt-card">
        <div className="landscape-phone" aria-hidden="true">
          <span className="landscape-phone-screen" />
        </div>
        <h2 id="titolo-errore">Rotate your phone</h2>
        <p id="dettagli-errore">
          Use <strong>landscape mode</strong> for the best experience with this Windows-style portfolio.
        </p>
        <button type="button" className="landscape-prompt-btn" onClick={continueAnyway}>
          Continue in portrait
        </button>
      </div>
    </div>
  );
};

export default LandscapePrompt;
