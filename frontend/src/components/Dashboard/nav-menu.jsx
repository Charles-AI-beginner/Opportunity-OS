import React, { useState } from 'react';
// Step A: Import your required icons from the package
import { 
  LayoutDashboard, 
  Layers, 
  Megaphone, 
  Calendar 
} from 'lucide-react';

// Step B: Pass the icon components directly into your data array object
const options = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'apps', label: 'Applications', icon: Layers },
  { id: 'notices', label: 'Notices', icon: Megaphone },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
];

export default function NavMenu() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <>
    <div className="flex items-center gap-2 font-bold text-gray-900 text-lg py-5 px-3">
        <span className="text-xl"><img src="/logo/logo-img.png" alt="logo image" className="w-10 h-10 object-contain" /></span>
        <span className="flex items-center justify-between">Opportunity OS</span>
    </div>
    <div className="w-64 space-y-1 p-4">
      {options.map((item) => {
        // Step C: Assign the object property to a Capitalized variable name
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            {/* Step D: Render the variable as a standard self-closing JSX tag */}
            <IconComponent size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
    </>
  );
}
