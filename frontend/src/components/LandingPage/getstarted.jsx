import React from "react";

export default function GetStarted(){
    return(
        <div className="flex flex-row items-center justify-between gap-x-12 max-w-5xl mx-auto px-6 py-12">

            <div className="flex flex-col items-start justify-center gap-y-5 flex-1">
                <p className="text-5xl text-gray-900 font-medium leading-tight">
                Never miss an {' '}
                <br />
                <span className="text-purple-400 font-bold">Opportunity</span>{' '}
                again
                </p>
                <p className="text-xl text-gray-600 font-medium">
                Opportunity OS tracks internships, scholarships, and notices from your emails and DTU website, and helps you manage every application in one place.
                </p>
            </div>

            <div className="flex flex-row items-center justify-center gap-x-4 shrink-0 whitespace-nowrap">
                
                <a 
                href="/login" 
                className="flex flex-row items-center justify-between gap-x-2 rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-600 hover:bg-purple-900 hover:text-white transition-colors"
                ><img src="/icons/google.png" alt="google-Logo" className="w-5 h-5 object-contain"/>
                Connect with Google
                </a>
                <a 
                href="/dashboard" 
                className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-800 transition-colors shadow-sm"
                >
                Explore Demo {"->"}
                </a>
            </div>

        </div>
    )
}