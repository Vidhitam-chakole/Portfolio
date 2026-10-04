import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../user/UserProfile";
import { MdWifi, MdAccessibilityNew, MdPowerSettingsNew, MdArrowForward } from "react-icons/md";
import { requestFullscreen } from "../../utils/fullscreen";

function Login({ toggleLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <>
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
            className="my-3 sm:my-4 md:my-5 text-xl sm:text-2xl md:text-3xl text-white bg-transparent text-center outline-none w-64 sm:w-80 md:w-96"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter username here"
          />

          {loading ? (
            <div className="mt-4">
              <div className="inline-block animate-spin rounded-full border-4 border-solid border-white border-e-transparent h-8 w-8">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-full max-w-xs flex items-center">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="input bg-opacity-30 w-full max-w-xs focus:outline-none border-[0.5px] border-b-white mt-2 sm:mt-3 md:mt-4 placeholder-white opacity-100::placeholder text-sm sm:text-base pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="current-password"
                />
                <button
                  type="submit"
                  aria-label="Sign in"
                  className="absolute right-2 top-[60%] -translate-y-1/2 w-8 h-8 rounded hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <MdArrowForward className="text-xl" />
                </button>
              </div>

              {/* Sign In button for mobile / touch */}
              <button
                type="submit"
                className="btn btn-sm sm:btn-md bg-white/20 hover:bg-white/30 border border-white/40 text-white mt-3 px-6 rounded-md flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Sign in</span>
                <MdArrowForward className="text-base" />
              </button>

              <div
                className="text-white mt-3 text-sm btn btn-ghost hover:text-black tooltip tooltip-bottom flex w-auto cursor-pointer"
                onClick={toggleLogin}
                data-tip="Apne bhai ka name dalo (vidhitam)"
              >
                I forgot my PIN
              </div>
            </>
          )}
        </div>
      </form>
      <div className="absolute flex gap-4 sm:gap-6 md:gap-9 text-white bottom-3 sm:bottom-4 md:bottom-5 right-6 sm:right-9 md:right-12 select-none">
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdWifi />
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdAccessibilityNew />
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl">
          <MdPowerSettingsNew />
        </span>
      </div>
    </>
  );
}

export default Login;
