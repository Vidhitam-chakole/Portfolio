import React from "react";
import Login from "../components/user/Login";

function Lockscreen() {
  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat select-none"
      style={{
        backgroundImage: `url('/images/wallpapers/windows11.jpg')`,
      }}
    >
      {/* Windows 11 Acrylic / Vignette Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-500" />

      {/* Login / Lockscreen Interface */}
      <div className="relative h-full w-full flex flex-col items-center justify-center z-10">
        <Login />
      </div>
    </div>
  );
}

export default Lockscreen;