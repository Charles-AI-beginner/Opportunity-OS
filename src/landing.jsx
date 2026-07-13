import React from "react"
import "./index.css"

import {FeatureGrid,StepList} from "./features.jsx";
import { useScrollThreshold } from "./animations.js";
import Dashboard from "./dashboard.jsx";

export default function LandingPage(){

    const handleMortarboardClick = () => {
        alert("Mortarboard element clicked! Navigating to education...");
    };

    const handleEnvelopeClick = () => {
        alert("Envelope element clicked! Navigating to messages...");
    };

    const hideOnScrollClass = useScrollThreshold();
    console.log(hideOnScrollClass);
    console.log("hello")

    const handleNavigation = (e) => {
        e.preventDefault(); 
        Dashboard();
    };

    return(
        <>
            <header class="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 font-sans">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                    <span className="text-xl"><img src="/logo/logo-img.png" alt="logo image" className="w-10 h-10 object-contain" /></span>
                    <span className="flex items-centre justify-between">Opportunity OS</span>
                </div>

                <nav className="flex gap-6">
                    <a href="/" class="font-medium text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                    <a href="/about" class="font-medium text-gray-600 hover:text-blue-600 transition-colors">About</a>
                    <a href="/services" class="font-medium text-gray-600 hover:text-blue-600 transition-colors">Services</a>
                    <a href="/contact" class="font-medium text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                </nav>
    
                <div class="flex items-center gap-4">
                    <a href="/login" class="font-medium text-gray-600 hover:text-gray-900">Log In</a>
                    <a href="/signup" class="rounded-md bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700 transition-colors shadow-sm">Sign Up</a>
                </div>
            </header>
            <body 
                className="h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed"
            >
                <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white/60 gap-y-12">
            
                    {/* Main Content Card Wrapper */}
                    <div className={`h-screen w-full flex flex-col items-center justify-center gap-6  bg-purple-50 ${hideOnScrollClass}`}>
                        
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
                            href="/demo" 
                            onClick={handleNavigation} 
                            className="rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-800 transition-colors shadow-sm"
                            >
                            Explore Demo {"->"}
                            </a>
                        </div>

                    </div>
                        
                    <div className="flex flex-col items-center justify-between gap-y-4 p-5">
                        <p className="rounded-lg px-3 bg-purple-100 text-[15px] font-medium text-purple-900">Everything you need</p>
                        <p className="text-3xl text-gray-900 font-medium leading-tight">
                           Your Opportunity journey,{' '}
                           <span className="text-purple-600">simplified</span>
                        </p>
                        <FeatureGrid/>
                    </div>
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
                    
                    
                </main>
                
            </body>
            <footer className="bg-[#fbfcff] text-slate-600 py-12 px-6 border-t border-slate-100 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100">
                
                {/* Brand Column */}
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                    {/* Simple SVG fallback for the logo */}
                    <div className="w-6 h-6 bg-[#6366f1] rounded flex items-center justify-center text-white text-xs font-bold">
                        O
                    </div>
                    <span className="font-bold text-slate-900 text-lg">Opportunity OS</span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500">
                    Your all-in-one system to discover, track and manage opportunities.
                    </p>
                </div>

                {/* Product Links */}
                <div>
                    <h4 className="font-semibold text-slate-900 mb-4 text-sm">Product</h4>
                    <ul className="space-y-3 text-sm">
                    <li><a href="#" className="hover:text-slate-900">Features</a></li>
                    <li><a href="#" className="hover:text-slate-900">How it works</a></li>
                    <li><a href="#" className="hover:text-slate-900">Pricing</a></li>
                    <li><a href="#" className="hover:text-slate-900">Roadmap</a></li>
                    </ul>
                </div>

                {/* Resources Links */}
                <div>
                    <h4 className="font-semibold text-slate-900 mb-4 text-sm">Resources</h4>
                    <ul className="space-y-3 text-sm">
                    <li><a href="#" className="hover:text-slate-900">Blog</a></li>
                    <li><a href="#" className="hover:text-slate-900">Help Center</a></li>
                    <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h4 className="font-semibold text-slate-900 mb-4 text-sm">Company</h4>
                    <ul className="space-y-3 text-sm">
                    <li><a href="#" className="hover:text-slate-900">About Us</a></li>
                    <li><a href="#" className="hover:text-slate-900">Contact</a></li>
                    <li><a href="#" className="hover:text-slate-900">Careers</a></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div>
                    <h4 className="font-semibold text-slate-900 mb-4 text-sm">Stay in the loop</h4>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                    Get weekly updates on new opportunities and features.
                    </p>
                    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:border-slate-400 placeholder-slate-400 text-slate-900"
                    />
                    <button 
                        type="submit" 
                        className="bg-[#4f46e5] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#4338ca] transition-colors"
                    >
                        Subscribe
                    </button>
                    </form>
                </div>

                </div>

                {/* Bottom Section */}
                <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
                <div>
                    &copy; 2026 Opportunity OS. All rights reserved.
                </div>
                
                {/* Social Icons (Using simple text/SVGs placeholders) */}
                <div className="flex gap-4">
                    <a href="#" className="hover:text-slate-600" aria-label="Twitter">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="#" className="hover:text-slate-600" aria-label="LinkedIn">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="#" className="hover:text-slate-600" aria-label="Instagram">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                </div>
                </div>

            </div>
            </footer>
        </>
    )
};

