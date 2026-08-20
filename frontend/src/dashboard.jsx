import React from "react"
import { useState } from "react"
import "./index.css"

import NavMenu from "./components/Dashboard/nav-menu"
import OpportunityGrid from "./components/Dashboard/opportunity-track"

import DashboardLists from "./components/Dashboard/dashboard-opportunity-bar"
import Applications from "./components/Dashboard/Applications"
import Notices from "./components/Dashboard/Notices"
import Calendar from "./components/Dashboard/Calendar"

export default function Dashboard(){
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

    return(
        <>
           <div className="flex flex-row items-stretch min-h-screen bg-slate-50 w-full"> 
  
            {/* Left Sidebar Menu */}
            <div className="flex-none border-r border-slate-100 bg-white"> 
                <NavMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            </div> 

            {/* Main Dashboard Panel */}
            <div className="flex-1 min-w-0 flex flex-col items-start justify-start gap-y-8 p-8 lg:p-10">     
                {/* 1. Added parentheses () to execute the function dynamically */}
                {renderPage()} 
            </div> 
            {/* 2. Removed the extra disconnected </div> tag that was broken down here */}

            </div>

        </>
    )
}