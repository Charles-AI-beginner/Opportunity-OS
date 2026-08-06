import React, { useState } from 'react';
import { X, Mail, ChevronDown } from 'lucide-react';

export default function AuthModal() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[length:400%_400%] animate-gradient bg-gradient-to-r from-indigo-950 via-purple-900 to-pink-950 font-sans text-white overflow-y-auto">
      
      {/* Main Login Card with comfortable padding around it */}
      <div className="relative w-full max-w-md my-auto p-8 bg-black rounded-3xl border border-white/10 shadow-xl shadow-black/40">
        
        {/* Top Bar: Toggle & Close */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-[#1a1a1e] p-1 rounded-full border border-white/5">
            <button
              onClick={() => setIsSignUp(true)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isSignUp ? 'bg-[#27272a] text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                !isSignUp ? 'bg-[#27272a] text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Sign in
            </button>
          </div>

          <button className="p-2 text-zinc-400 hover:text-white bg-[#1a1a1e] hover:bg-[#27272a] rounded-full border border-white/5 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold tracking-tight mb-5">
          {isSignUp ? 'Create an account' : 'Welcome back'}
        </h2>

        {/* Form Inputs */}
        <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
          {isSignUp && (
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="John"
                className="w-full px-4 py-3 bg-[#18181b] border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 bg-[#18181b] border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
              <Mail size={18} />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-11 pr-4 py-3 bg-[#18181b] border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {isSignUp && (
            <div className="flex items-center bg-[#18181b] border border-white/10 rounded-xl px-4 py-3 focus-within:border-indigo-500 transition-colors">
              <div className="flex items-center gap-2 pr-3 border-r border-white/10 text-sm">
                <span>🇺🇸</span>
                <ChevronDown size={14} className="text-zinc-500" />
              </div>
              <input
                type="tel"
                placeholder="(775) 351-6501"
                className="w-full pl-3 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            className="w-full mt-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-300 active:scale-[0.99]"
          >
            {isSignUp ? 'Create an account' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-zinc-500 text-[10px] tracking-widest uppercase">
            Or sign in with
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center py-2.5 px-4 bg-[#18181b] hover:bg-[#27272a] border border-white/10 rounded-xl transition-colors">
            {/* Google Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.21 21.34 7.27 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.19C.43 8.13 0 9.87 0 11.7c0 1.83.43 3.57 1.19 5.09l4.08-2.55z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.27 0 3.21 2.66 1.19 6.61l4.08 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
          </button>

          <button className="flex items-center justify-center py-2.5 px-4 bg-[#18181b] hover:bg-[#27272a] border border-white/10 rounded-xl transition-colors">
            {/* Apple Icon */}
            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 5.31c.65-.79 1.09-1.89.97-2.99-.96.04-2.13.64-2.81 1.43-.6.69-1.12 1.79-.98 2.86 1.08.08 2.17-.51 2.82-1.3z" />
            </svg>
          </button>
        </div>

        {/* Footer Terms */}
        <p className="text-center text-[11px] text-zinc-500 mt-5">
          By creating an account, you agree to our{' '}
          <a href="#terms" className="underline hover:text-zinc-400">Terms & Service</a>
        </p>

      </div>

      {/* Tailwind Animation Keyframes */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 12s ease infinite;
        }
      `}</style>
    </div>
  );
}