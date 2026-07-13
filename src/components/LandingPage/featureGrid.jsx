import React from "react";
import { FeatureGrid,StepList } from "./features";

export default function Features(){
    return(
        <div className="flex flex-col items-center justify-between gap-y-4 p-5">
            <p className="rounded-lg px-3 bg-purple-100 text-[15px] font-medium text-purple-900">Everything you need</p>
            <p className="text-3xl text-gray-900 font-medium leading-tight">
                Your Opportunity journey,{' '}
                <span className="text-purple-600">simplified</span>
            </p>
            <FeatureGrid/>
        </div>
    )
}