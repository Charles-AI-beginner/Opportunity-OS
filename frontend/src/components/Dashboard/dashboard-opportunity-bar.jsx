import React from "react"
import { useState } from "react"
import NavMenu from "./nav-menu"
import DashboardLists from "./dashboard-opportunity-bar"

// Placeholder components for sections in development
const Applications = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400 border border-dashed border-slate-800 rounded-2xl w-full bg-slate-900/50">
    <h2 className="text-xl font-bold text-white mb-2">Applications View</h2>
    <p className="text-sm text-slate-400">Detailed applications grid and filter view coming soon.</p>
  </div>
);

const Notices = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400 border border-dashed border-slate-800 rounded-2xl w-full bg-slate-900/50">
    <h2 className="text-xl font-bold text-white mb-2">Notices & Updates</h2>
    <p className="text-sm text-slate-400">Stay tuned for system announcements and application updates.</p>
  </div>
);

const Calendar = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400 border border-dashed border-slate-800 rounded-2xl w-full bg-slate-900/50">
    <h2 className="text-xl font-bold text-white mb-2">Calendar View</h2>
    <p className="text-sm text-slate-400">Track deadlines and interview events on your schedule.</p>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardLists />;
      case 'apps':
        return <Applications />;
      case 'notices':
        return <Notices />;
      case 'calendar':
        return <Calendar />;
      default:
        return <DashboardLists />;
    }
  };

  return (
    <div className="flex flex-row min-h-screen bg-slate-950 text-slate-100 w-full antialiased"> 
      {/* Left Sidebar Navigation */}
      <NavMenu activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col items-stretch justify-start p-6 md:p-8 lg:p-10 space-y-8 overflow-y-auto">     
        {renderPage()} 
      </main> 
    </div>
  );
}