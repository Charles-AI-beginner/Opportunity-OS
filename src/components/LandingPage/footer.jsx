import React from "react";

export default function Footer(){
    return (
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
    )
}