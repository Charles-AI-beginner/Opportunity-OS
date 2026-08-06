import React from 'react';

// Central configuration object containing both datasets
const DASHBOARD_DATA = {
  deadlines: [
    {
      id: 'd1',
      title: 'Google SWE Internship',
      subtitle: 'Applications close in 2 days',
      badge: 'May 26',
      logoText: 'G',
      logoBg: 'bg-red-50 text-red-600 border-red-100',
    },
    {
      id: 'd2',
      title: 'DRDO Summer Internship',
      subtitle: 'Applications close in 5 days',
      badge: 'May 28',
      logoText: 'D',
      logoBg: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'd3',
      title: 'Microsoft Explore 2024',
      subtitle: 'Applications close in 7 days',
      badge: 'May 30',
      logoText: 'M',
      logoBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    // Add as many extra items here as you want; the box will scroll cleanly!
  ],
  opportunities: [
    {
      id: 'o1',
      title: 'Samsung R&D Internship',
      subtitle: 'Research Intern',
      badge: '1h ago',
      logoText: 'S',
      logoBg: 'bg-slate-900 text-white border-slate-800',
    },
    {
      id: 'o2',
      title: 'IIT Bombay Research Fellow',
      subtitle: 'Research Opportunity',
      badge: '3h ago',
      logoText: 'I',
      logoBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      id: 'o3',
      title: 'Google STEP Internship',
      subtitle: 'STEP Intern',
      badge: '5h ago',
      logoText: 'G',
      logoBg: 'bg-red-50 text-red-600 border-red-100',
    },
  ]
};

export default function DashboardLists() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full w-full p-1">
      
      {/* ================= UPCOMING DEADLINES ================= */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col h-[340px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Upcoming Deadlines</h3>
          <button className="text-[14px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">View all</button>
        </div>
        
        {/* Scrollable List Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
          {DASHBOARD_DATA.deadlines.map((item) => (
            <div key={item.id} className="flex items-center justify-between group py-0.5">
              <div className="flex items-center gap-3">
                {/* Fallback stylized badge layout matching image logo spots */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border ${item.logoBg}`}>
                  {item.logoText}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[20px] text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-slate-400 mt-0.5">{item.subtitle}</span>
                </div>
              </div>
              <span className="text-[13px] font-semibold text-rose-500 bg-rose-50/60 px-2.5 py-1 rounded-lg">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RECENT OPPORTUNITIES ================= */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col h-[340px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h3 className="text-[17px] font-bold text-slate-900 tracking-tight">Recent Opportunities</h3>
          <button className="text-[14px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">View all</button>
        </div>
        
        {/* Scrollable List Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
          {DASHBOARD_DATA.opportunities.map((item) => (
            <div key={item.id} className="flex items-center justify-between group py-0.5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border ${item.logoBg}`}>
                  {item.logoText}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[px]20 text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[13px] text-slate-400 mt-0.5">{item.subtitle}</span>
                </div>
              </div>
              <span className="text-[13px] font-medium text-slate-400">
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
