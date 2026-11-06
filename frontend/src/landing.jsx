import React, { useState, useEffect } from "react";
import "./index.css";

import Header from "./components/LandingPage/header.jsx";
import Main from "./components/LandingPage/main.jsx";
import HowItWorks from "./components/LandingPage/Howitworks.jsx";
import Features from "./components/LandingPage/featureGrid.jsx";
import GetStarted from "./components/LandingPage/getstarted.jsx";
import Footer from "./components/LandingPage/footer.jsx";

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target;
      const isInteractive = target.closest('button, a, input, .group, [role="button"]');
      setIsHoveringInteractive(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative bg-slate-950 text-slate-100 min-h-screen overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(${
            isHoveringInteractive ? "500px" : "350px"
          } circle at ${mousePos.x}px ${mousePos.y}px, ${
            isHoveringInteractive
              ? "rgba(129, 140, 248, 0.15)"
              : "rgba(99, 102, 241, 0.08)"
          }, transparent 70%)`,
        }}
      />

      <Header />

      <main className="w-full flex flex-col items-center justify-center bg-slate-950 relative z-10">
        <Main />
        <GetStarted />
        <Features mousePos={mousePos} />
        <HowItWorks mousePos={mousePos} />
      </main>

      <Footer />
    </div>
  );
}