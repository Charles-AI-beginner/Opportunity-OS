import React, { useRef, useState } from "react";

export function SpotlightCard({ children, className = "" }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition-all duration-300 group h-full flex flex-col ${className}`}
    >
      {/* 1. Cursor Border Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(129, 140, 248, 0.4), transparent 80%)`,
        }}
      />

      {/* 2. Radial Content Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(250px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.12), transparent 70%)`,
        }}
      />

      {/* 3. Inner Content Wrapper (ADDED h-full flex flex-col justify-between) */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}