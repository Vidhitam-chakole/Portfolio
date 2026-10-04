import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import LandscapePrompt from "./components/utilities/LandscapePrompt";
import { useMobileFullscreen } from "./hooks";

// Lazy-load route pages to reduce initial bundle size
const Lockscreen = lazy(() => import("./Pages/lockscreen"));
const Main = lazy(() => import("./Pages/main"));

function App() {
  // Automatically enforce fullscreen on mobile devices upon open / gesture
  useMobileFullscreen();

  return (
    <>
      <LandscapePrompt />
      <Router>
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><LoadingSpinner /></div>}>
          <Routes>
            <Route path="/" element={<Lockscreen />} />
            <Route path="/:name" element={<Main />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
