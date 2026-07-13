import React from "react";
import {FeatureGrid,StepList} from "./features.jsx";

export default function HowItWorks(){
    return(
        <div className="flex flex-row items-center justify-between gap-x-5 p-5">
            <div className="flex flex-col items-start justify-between gap-y-3">
                <p className="rounded-lg px-3 bg-purple-100 text-[15px] font-medium text-purple-900">How it works</p>
                <p className="text-3xl text-gray-900 font-medium leading-tight">Get Started in {" "} <span className="text-purple-600">in 3 simple steps</span></p>
                <StepList/>
            </div>
            <div className="flex flex-col items-center justify-between gap-y-2 bg-purple-50  px-5 py-7  rounded-lg">
                <div className="flex flex-row items-center justify-between gap-x-3 px-5 py-7">
                    <div className="flex flex-col items-start justify-between gap-y-2">
                        <p className="text-3xl text-gray-900 font-medium leading-tight">Ready to never miss an 
                            <br/>
                            opportunity again?
                        </p>
                        <p className="text-[22px] text-gray-600 leading-snug">Join thousands of students who are already 
                            <br/>
                            ahead in their career journey
                        </p>
                    <a 
                        href="/demo" 
                        className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-800 transition-colors shadow-sm"
                        >
                        Get Started for Free {"->"}
                        </a>
                    </div>
                    <img src="/icons/rocket.png" alt="rocket" className="w-50"/>
                </div>
                <div className="flex flex-row items-center justify-between gap-x-3">
                    <p className="flex flex-row items-center justify-between gap-x-2"><img src="/icons/check-mark.png" alt="check" className="w-3 h-full"/>Free to get started</p>
                    <p className="flex flex-row items-center justify-between gap-x-2"><img src="/icons/check-mark.png" alt="check" className="w-3 h-full"/>No credit card required</p>
                    <p className="flex flex-row items-center justify-between gap-x-2"><img src="/icons/check-mark.png" alt="check" className="w-3 h-full"/>Cancel anytime</p>
                </div>
            </div>
        </div>
    )
}