import React from "react";


export default function Header(){
    return(
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 font-sans">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                <span className="text-xl"><img src="/logo/logo-img.png" alt="logo image" className="w-10 h-10 object-contain" /></span>
                <span className="flex items-center justify-between">Opportunity OS</span>
            </div>

            <nav className="flex gap-6">
                <a href="/" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Home</a>
                <a href="/about" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">About</a>
                <a href="/services" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Services</a>
                <a href="/contact" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            <div className="flex items-center gap-4">
                <a href="/login" className="font-medium text-gray-600 hover:text-gray-900">Log In</a>
                <a href="/signup" className="rounded-md bg-purple-600 px-4 py-2 font-medium text-white hover:bg-purple-700 transition-colors shadow-sm">Sign Up</a>
            </div>
        </header>
    )
}