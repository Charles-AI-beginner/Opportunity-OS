import React from "react";
import { FeatureGrid,StepList } from "./features";

export default function Features(){
    return(
       <section className="w-full bg-slate-950 py-12">
      <div className="flex flex-col items-center justify-between gap-y-4 p-5 max-w-5xl mx-auto">
        <p className="rounded-xl px-3.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-[15px] font-medium text-indigo-400 tracking-wide">
          Everything you need
        </p>
        <p className="text-3xl md:text-4xl text-white font-bold tracking-tight leading-tight text-center">
          Your Opportunity journey,{' '}
          <span className="text-indigo-400">simplified</span>
        </p>
        <FeatureGrid steps={StepList} />
      </div>
    </section>
    )
}