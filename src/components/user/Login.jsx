import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../user/UserProfile";
import {
  MdWifi,
  MdAccessibilityNew,
  MdPowerSettingsNew,
  MdArrowForward,
  MdRestartAlt,
} from "react-icons/md";
import { requestFullscreen } from "../../utils/fullscreen";

function Login() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [powerOpen, setPowerOpen] = useState(false);
  const [powerAction, setPowerAction] = useState(null); // 'restart' | 'shutdown' | 'off' | null
  const navigate = useNavigate();

  async function login(e) {
    if (e) e.preventDefault();
    // Trigger mobile fullscreen on login gesture
    requestFullscreen().catch(() => {});
    try {
      setLoading(true);
      const trimmedName = name.trim() || "User";
      localStorage.setItem("name", trimmedName);
      setTimeout(() => {
        navigate(`/${trimmedName}`);
        setLoading(false);
      }, 400);
    } catch (err) {
      console.error(err);
      setError("Failed to log in. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  }

  function handleRestart() {
    setPowerOpen(false);
    setPowerAction("restart");
    try {
      const audio = new Audio("/audio/shutdown.mp3");
      audio.play().catch(() => {});
    } catch (e) {}

    setTimeout(() => {
      if (window.location.pathname !== "/") {
        window.location.replace("/");
      } else {
        window.location.reload();
      }
    }, 2000);
  }

  function handleShutdown() {
    setPowerOpen(false);
    setPowerAction("shutdown");
    try {
      const audio = new Audio("/audio/shutdown.mp3");
      audio.play().catch(() => {});
    } catch (e) {}

    setTimeout(() => {
      try {
        window.close();
      } catch (e) {}
      try {
        window.open("", "_self");
        window.close();
      } catch (e) {}
      setPowerAction("off");
    }, 2200);
  }

  return (
    <>
      {/* Restart Screen */}
      {powerAction === "restart" && (
        <div className="fixed inset-0 bg-[#000000] z-[9999] flex flex-col items-center justify-center select-none text-white transition-opacity duration-300">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            </div>
            <div className="text-xl sm:text-2xl font-light tracking-wide">
              Restarting
            </div>
          </div>
        </div>
      )}

      {/* Shutting Down Screen */}
      {powerAction === "shutdown" && (
        <div className="fixed inset-0 bg-[#000000] z-[9999] flex flex-col items-center justify-center select-none text-white transition-opacity duration-300">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            </div>
            <div className="text-xl sm:text-2xl font-light tracking-wide">
              Shutting down
            </div>
          </div>
        </div>
      )}

      {/* Powered Off Screen (Fallback if browser tab close is blocked) */}
      {powerAction === "off" && (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center select-none text-white p-6">
          <div className="flex flex-col items-center gap-6 text-center max-w-md">
            <button
              onClick={() => {
                setPowerAction(null);
                window.location.reload();
              }}
              title="Click to turn on PC"
              className="w-20 h-20 rounded-full bg-white/5 border border-white/20 hover:bg-white/15 hover:border-white/40 active:scale-95 flex items-center justify-center transition-all cursor-pointer group shadow-lg"
            >
              <MdPowerSettingsNew className="text-4xl text-neutral-400 group-hover:text-blue-400 transition-colors" />
            </button>
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-medium text-neutral-200">
                Your PC is turned off
              </h2>
              <p className="text-sm text-neutral-400">
                You can safely close this browser tab, or click the power button above to turn your PC back on.
              </p>
            </div>
            <button
              onClick={() => {
                try {
                  window.close();
                } catch (e) {}
              }}
              className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded border border-neutral-700 hover:border-neutral-500 transition-colors cursor-pointer"
            >
              Close Tab
            </button>
          </div>
        </div>
      )}

      {!loading && error && (
        <div
          role="alert"
          className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2 z-50 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={login}>
        <div className="flex flex-col items-center z-10">
          <div className="aspect-square w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 -ml-3">
            <UserProfile name={name} />
          </div>
          <input
            className="my-3 sm:my-4 md:my-5 text-xl sm:text-2xl md:text-3xl text-white bg-transparent text-center outline-none w-64 sm:w-80 md:w-96 placeholder-white/70"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter yourname here"
            autoFocus
          />

          {loading ? (
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="inline-block animate-spin rounded-full border-4 border-solid border-white border-e-transparent h-8 w-8">
                <span className="sr-only">Loading...</span>
              </div>
              <span className="text-white text-sm font-light tracking-wide">
                Welcome
              </span>
            </div>
          ) : (
            <button
              type="submit"
              className="btn btn-sm sm:btn-md bg-white/20 hover:bg-white/30 border border-white/40 text-white mt-4 px-6 rounded-md flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>Sign in</span>
              <MdArrowForward className="text-base" />
            </button>
          )}
        </div>
      </form>

      {/* Lockscreen System Tray Icons */}
      <div className="absolute flex gap-4 sm:gap-6 md:gap-9 text-white bottom-3 sm:bottom-4 md:bottom-5 right-6 sm:right-9 md:right-12 select-none items-center z-20">
        <span
          className="text-xl sm:text-2xl md:text-3xl p-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
          title="Network"
        >
          <MdWifi />
        </span>
        <span
          className="text-xl sm:text-2xl md:text-3xl p-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer"
          title="Accessibility"
        >
          <MdAccessibilityNew />
        </span>

        {/* Power Button & Flyout */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setPowerOpen((prev) => !prev)}
            className={`text-xl sm:text-2xl md:text-3xl p-1.5 rounded transition-all cursor-pointer flex items-center justify-center ${
              powerOpen
                ? "bg-white/25 ring-1 ring-white/40"
                : "hover:bg-white/20 active:bg-white/30"
            }`}
            title="Power"
            aria-label="Power"
          >
            <MdPowerSettingsNew />
          </button>

          {powerOpen && (
            <>
              {/* Invisible clickaway listener */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setPowerOpen(false)}
              />

              {/* Windows 11 Power Menu Flyout */}
              <div
                className="absolute bottom-full right-0 mb-3 w-48 bg-neutral-900/95 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl p-1.5 z-40 text-white"
                style={{
                  boxShadow:
                    "0 16px 36px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.15)",
                }}
              >
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors cursor-pointer text-left text-neutral-100 hover:text-white"
                >
                  <MdRestartAlt className="text-xl text-blue-400" />
                  <span className="font-normal text-sm">Restart</span>
                </button>
                <button
                  type="button"
                  onClick={handleShutdown}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors cursor-pointer text-left text-neutral-100 hover:text-white"
                >
                  <MdPowerSettingsNew className="text-xl text-red-400" />
                  <span className="font-normal text-sm">Shut down</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
