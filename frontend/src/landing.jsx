import React from "react"
import "./index.css"

import Header from "./components/LandingPage/header.jsx";
import Main from "./components/LandingPage/main.jsx";
import HowItWorks from "./components/LandingPage/Howitworks.jsx";
import Features from "./components/LandingPage/featureGrid.jsx";
import GetStarted from "./components/LandingPage/getstarted.jsx";
import Footer from "./components/LandingPage/footer.jsx";

import { useScrollThreshold } from "./animations.js";
import Dashboard from "./dashboard.jsx";

export default function LandingPage(){

    return(
        <>
            <Header/>
            <main className="w-full bg-cover bg-center bg-no-repeat bg-fixed flex min-h-screen flex-col items-center justify-center bg-white/60 gap-y-12">
        
                <Main/>

                <GetStarted/>

                <Features/>
                
                <HowItWorks/>
                
                
            </main>
            <Footer/>
            
        </>
    )
};

