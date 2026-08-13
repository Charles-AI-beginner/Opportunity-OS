import React from "react"
import "./index.css"

import NavMenu from "./components/Dashboard/nav-menu"
import OpportunityGrid from "./components/Dashboard/opportunity-track"
import DashboardLists from "./components/Dashboard/dashboard-opportunity-bar"

export default function Dashboard(){
    return(
        <>
            <div className="flex flex-row items-stretch min-h-screen bg-slate-50 w-full"> 
  
            {/* Left Sidebar Menu */}
            <div className="flex-none border-r border-slate-100 bg-white"> 
                <NavMenu /> 
            </div> 

            {/* Main Dashboard Panel - Updated from items-center to items-start */}
            <div className="flex-1 min-w-0 flex flex-col items-start justify-start gap-y-8 p-8 lg:p-10"> 
                
                {/* Welcome Header Section */}
                <div className="w-full flex flex-col items-start gap-y-1.5 text-left"> 
                <h1 className="text-3xl lg:text-4xl text-black font-bold tracking-tight">
                    Welcome back, Priyanshu
                </h1> 
                <p className="text-lg text-slate-500 font-medium">
                    Here's what's new today
                </p> 
                </div> 

                {/* Metrics Card Grid - Forced full horizontal expansion */}
                <div className="w-full">
                <OpportunityGrid /> 
                </div> 

                {/* Deadlines & Opportunities Lists - Forced full horizontal expansion */}
                <div className="w-full">
                <DashboardLists /> 
                </div> 

            </div> 
            </div>

        </>
    )
}