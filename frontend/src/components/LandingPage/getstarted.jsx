import React from "react";

export default function GetStarted(){
    return(
        <div className="w-full bg-slate-950 flex justify-center relative overflow-hidden">
            {/* Background Ambient Glows & Grid Pattern */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-row items-center justify-between gap-x-12 max-w-5xl w-full px-6 py-20 bg-slate-950/80 backdrop-blur-sm">

                <div className="flex flex-col items-start justify-center gap-y-5 flex-1">
                    {/* Badge Tagline with Glow */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide shadow-sm shadow-indigo-500/10">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                        Smart Career & Notice Tracking
                    </div>

                    <p className="text-5xl text-white font-medium leading-tight tracking-tight">
                    Never miss an {' '}
                    <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent font-extrabold drop-shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
                        Opportunity
                    </span>{' '}
                    again
                    </p>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                    Opportunity OS tracks internships, scholarships, and notices from your emails and DTU website, and helps you manage every application in one place.
                    </p>
                </div>

                <div className="flex flex-row items-center justify-center gap-x-4 shrink-0 whitespace-nowrap">
                    
                    <a 
                    href="/login" 
                    className="flex flex-row items-center justify-between gap-x-2.5 rounded-xl border border-slate-800 bg-slate-900/90 px-6 py-3 font-medium text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 text-sm shadow-md group"
                    >
                    <img 
                      src="/icons/google.png" 
                      alt="google-Logo" 
                      className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    <span>Connect with Google</span>
                    </a>

                    <a 
                    href="/dashboard" 
                    className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-500 transition-all duration-300 text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-1.5 group"
                    >
                    <span>Explore Demo</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{"->"}</span>
                    </a>
                </div>

            </div>
        </div>
    )
}