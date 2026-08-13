import React from "react";

export default function Main(){

    const handleMortarboardClick = () => {
        alert("Mortarboard element clicked! Navigating to education...");
    };

    const handleEnvelopeClick = () => {
        alert("Envelope element clicked! Navigating to messages...");
    };
    
    return(
        <div className="h-screen w-full flex flex-col items-center justify-center gap-6  bg-purple-50">
                    
                    {/* 1. Interactive Logo Wrapper (Perfectly Centered) */}
            <div className="relative w-32 h-32 select-none group">
                
                {/* The Base Logo Image */}
                <img 
                    src= "/logo/logo-img.png"
                    alt="Opportunity OS Logo" 
                    className="w-full h-full object-contain" 
                />

                {/* Mortarboard Hitbox (Invisible button positioned over the cap) */}
                <button 
                    onClick={handleMortarboardClick}
                    aria-label="Academic Dashboard"
                    className="absolute top-[22%] left-[24%] w-[26%] h-[24%] rounded-full cursor-pointer bg-purple-700/0 hover:bg-blue-500/10 transition-colors"
                />

                {/* Envelope Hitbox (Invisible button positioned over the mail envelope) */}
                <button 
                    onClick={handleEnvelopeClick}
                    aria-label="Message Inbox"
                    className="absolute bottom-[28%] right-[8%] w-[24%] h-[24%] rotate-[28deg] rounded-sm cursor-pointer bg-orange-500/0 hover:bg-orange-500/10 transition-colors"
                />
            </div>

            {/* 2. Main Title Brand (Perfectly Centered with Color Accents) */}
            <h1 className="flex items-center justify-center gap-2 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                <span>Opportunity</span> 
                <span className="text-purple-700">OS</span>
            </h1>

            {/* 3. Subtext Tagline */}
            <p className="max-w-md text-lg text-gray-600">
                Empowering your future, organized. Click on the elements above to navigate your journey.
            </p>

            {/* Optional call to action buttons under the center logo */}
            <div className="mt-4 flex gap-4">
                <button className="rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white shadow-md hover:bg-purple-800 transition">
                    Get Started
                </button>
                <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition">
                    Learn More
                </button>
            </div>

        </div>
    )
}