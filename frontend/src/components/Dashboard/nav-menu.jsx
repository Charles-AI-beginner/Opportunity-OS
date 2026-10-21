import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Megaphone, 
  Calendar,
  LogOut 
} from 'lucide-react';

import Logout from './Logout';

// Export the options array so other files can check valid IDs if needed
export const navOptions = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'apps', label: 'Applications', icon: Layers },
  { id: 'notices', label: 'Notices', icon: Megaphone },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
];

// Accept activeTab and setActiveTab as props from the parent
export default function NavMenu({ activeTab, setActiveTab }) {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            O
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight leading-none">Opportunity OS</h1>
            <span className="text-xs text-indigo-400 font-medium tracking-wide">CAREER TRACKER</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5">
          {navOptions.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)} // Changes state in the parent
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-inner' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <IconComponent size={18} className={isActive ? 'text-indigo-400' : 'text-slate-400'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-slate-800/80">
        <button
          onClick={() => setIsLogoutOpen(true)}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 text-sm font-medium"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <Logout 
        isOpen={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)} 
      />
    </aside>
  );
}