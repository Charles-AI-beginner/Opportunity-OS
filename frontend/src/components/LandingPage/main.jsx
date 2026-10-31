import React from "react";

export default function Main() {

    const handleMortarboardClick = () => {
        alert("Mortarboard element clicked! Navigating to education...");
    };

    const handleEnvelopeClick = () => {
        alert("Envelope element clicked! Navigating to messages...");
    };
    
    return (
        <div className="w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-6 py-20 overflow-hidden relative min-h-screen">
            
            {/* Background Ambient Glow */}
            <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

            {/* 1. Interactive Logo Wrapper (Floating Animation) */}
            <div className="relative w-32 h-32 select-none group animate-in fade-in zoom-in-95 duration-700">
                
                {/* Glowing Aura behind logo on hover */}
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Floating Logo Image */}
                <img 
                    src="/logo/logo-img.png"
                    alt="Opportunity OS Logo" 
                    className="w-full h-full object-contain relative z-10 animate-[bounce_4s_easeInOut_infinite] group-hover:scale-105 transition-transform duration-300" 
                />

                {/* Mortarboard Hitbox */}
                <button 
                    onClick={handleMortarboardClick}
                    aria-label="Academic Dashboard"
                    className="absolute top-[22%] left-[24%] w-[26%] h-[24%] rounded-full cursor-pointer bg-purple-700/0 hover:bg-indigo-500/30 ring-2 ring-transparent hover:ring-indigo-400/50 transition-all duration-300 z-20"
                />

                {/* Envelope Hitbox */}
                <button 
                    onClick={handleEnvelopeClick}
                    aria-label="Message Inbox"
                    className="absolute bottom-[28%] right-[8%] w-[24%] h-[24%] rotate-[28deg] rounded-sm cursor-pointer bg-orange-500/0 hover:bg-amber-500/30 ring-2 ring-transparent hover:ring-amber-400/50 transition-all duration-300 z-20"
                />
            </div>

            {/* 2. Main Title Brand (Gradient Accent & Entry Animation) */}
            <h1 className="flex items-center justify-center gap-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                <span>Opportunity</span> 
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    OS
                </span>
            </h1>

            {/* 3. Subtext Tagline */}
            <p className="max-w-md text-lg text-slate-400 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 px-4">
                Empowering your future, organized. Click on the elements above to navigate your journey.
            </p>

            {/* 4. Action Buttons with Pulse & Hover Glow */}
            <div className="mt-4 flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <button className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white text-sm shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200">
                    Get Started
                </button>
                <button className="rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-3 font-medium text-slate-300 text-sm hover:bg-slate-800 hover:text-white hover:border-slate-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200">
                    Learn More
                </button>
            </div>

        </div>
    );
}