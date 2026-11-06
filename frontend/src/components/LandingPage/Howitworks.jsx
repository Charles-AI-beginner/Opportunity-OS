import React from "react";
import { FeatureGrid, StepList } from "./features.jsx";

export default function HowItWorks(){
    return(
        <div id="about" className="w-full bg-slate-950 flex flex-col lg:flex-row items-center justify-between gap-x-5 p-5 text-slate-100">
            <div className="flex flex-col items-start justify-between gap-y-3">
                <p className="rounded-xl px-3.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-[15px] font-medium text-indigo-400">
                    How it works
                </p>
                <p className="text-3xl text-white font-medium leading-tight">
                    Get Started in {" "} <span className="text-indigo-400 font-semibold">in 3 simple steps</span>
                </p>
                <StepList/>
            </div>

            <div className="flex flex-col items-center justify-between gap-y-6 bg-slate-900/80 border border-slate-800/80 px-6 py-8 rounded-2xl shadow-xl hover:border-slate-700/80 transition-all duration-300">
                <div className="flex flex-row items-center justify-between gap-x-6 px-2 py-4">
                    <div className="flex flex-col items-start justify-between gap-y-4">
                        <p className="text-3xl text-white font-semibold leading-tight tracking-tight">
                            Ready to never miss an 
                            <br/>
                            opportunity again?
                        </p>
                        <p className="text-[20px] text-slate-400 leading-snug">
                            Join thousands of students who are already 
                            <br/>
                            ahead in their career journey
                        </p>
                        {/* ADDED: hover:-translate-y-0.5 hover:shadow-indigo-500/40 */}
                        <a 
                            href="/login" 
                            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 font-medium text-white transition-all duration-300 text-sm shadow-lg shadow-indigo-600/25 hover:-translate-y-0.5 hover:shadow-indigo-500/40 active:scale-95"
                        >
                            Get Started for Free {"->"}
                        </a>
                    </div>
                    {/* ADDED: hover:scale-105 transition-transform duration-500 */}
                    <img 
                      src="/icons/rocket.png" 
                      alt="rocket" 
                      className="w-52 shrink-0 object-contain hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(99,102,241,0.2)]"
                    />
                </div>

                <div className="flex flex-row items-center justify-between gap-x-6 text-sm text-slate-400 font-medium pt-2 border-t border-slate-800/60 w-full">
                    <p className="flex flex-row items-center justify-center gap-x-2">
                        <img src="/icons/check-mark.png" alt="check" className="w-3.5 h-3.5 object-contain"/>
                        Free to get started
                    </p>
                    <p className="flex flex-row items-center justify-center gap-x-2">
                        <img src="/icons/check-mark.png" alt="check" className="w-3.5 h-3.5 object-contain"/>
                        No credit card required
                    </p>
                    <p className="flex flex-row items-center justify-center gap-x-2">
                        <img src="/icons/check-mark.png" alt="check" className="w-3.5 h-3.5 object-contain"/>
                        Cancel anytime
                    </p>
                </div>
            </div>
        </div>
    )
}