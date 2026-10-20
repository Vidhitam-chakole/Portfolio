import React, { useState } from "react";
import { MdPowerSettingsNew, MdRestartAlt } from "react-icons/md";

function Power({ toggleStart, setIsSleeping, setActionType }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleRestart() {
    setIsDropdownOpen(false);
    if (toggleStart) toggleStart();
    if (setActionType) setActionType("restart");
    if (setIsSleeping) setIsSleeping(true);
    try {
      const audio = new Audio("/audio/shutdown.mp3");
      audio.play().catch(() => {});
    } catch (e) {}
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  }

  function handleShut() {
    setIsDropdownOpen(false);
    if (toggleStart) toggleStart();
    if (setActionType) setActionType("shutdown");
    if (setIsSleeping) setIsSleeping(true);
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
      if (setActionType) setActionType("off");
    }, 2200);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center cursor-pointer p-1.5 rounded hover:bg-white/10 active:bg-white/20 transition-colors"
        onClick={toggleDropdown}
        title="Power options"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(255, 255, 255, 0.9)"
        >
          <path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"></path>
          <path d="M11 2h2v10h-2z"></path>
        </svg>
      </div>
      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="dropdown-content z-50 menu p-1.5 shadow-2xl rounded-xl w-48 bg-neutral-900/95 backdrop-blur-2xl border border-white/15 absolute bottom-full right-0 mb-2 text-white">
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
              onClick={handleShut}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-white/15 active:bg-white/25 transition-colors cursor-pointer text-left text-neutral-100 hover:text-white"
            >
              <MdPowerSettingsNew className="text-xl text-red-400" />
              <span className="font-normal text-sm">Shut down</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Power;
