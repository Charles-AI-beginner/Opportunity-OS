import React from "react";

export default function Header(){
    return(
        <header className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-8 py-4 font-sans sticky top-0 z-50">
            <div className="flex items-center gap-3 font-bold text-white text-lg">
                <span className="text-xl">
                    <img src="/logo/logo-img.png" alt="logo image" className="w-10 h-10 object-contain" />
                </span>
                <span className="flex items-center justify-between tracking-tight">
                    Opportunity <span className="text-indigo-400 ml-1">OS</span>
                </span>
            </div>

            <nav className="flex gap-6">
                <a href="/" className="font-medium text-slate-400 hover:text-indigo-400 transition-colors text-sm">Home</a>
                <a href="/about" className="font-medium text-slate-400 hover:text-indigo-400 transition-colors text-sm">About</a>
                <a href="/services" className="font-medium text-slate-400 hover:text-indigo-400 transition-colors text-sm">Services</a>
                <a href="/contact" className="font-medium text-slate-400 hover:text-indigo-400 transition-colors text-sm">Contact</a>
            </nav>

            <div className="flex items-center gap-4">
                <a href="/login" className="font-medium text-slate-400 hover:text-slate-200 text-sm transition-colors">Log In</a>
                <a href="/signup" className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 transition-all text-sm shadow-lg shadow-indigo-600/20 active:scale-95">Sign Up</a>
            </div>
        </header>
    )
}