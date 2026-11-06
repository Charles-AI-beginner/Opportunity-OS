import React from "react";
import { SpotlightCard } from "../../animations2";
function FeatureGrid() {
  const features = [
    {
      id: 1,
      imgSrc: "/icons/email.png",
      title: "Email Tracking",
      desc: "Automatically finds internships from your Emails"
    },
    {
      id: 2,
      imgSrc: "/icons/documents.png",
      title: "Application Tracker",
      desc: "Track every application step-by-step and never lose track"
    },
    {
      id: 3,
      imgSrc: "/icons/stopwatch.png",
      title: "Follow-up Reminders",
      desc: "Get reminded to follow up on applications and emails"
    },
    {
      id: 4,
      imgSrc: "/icons/graph.png",
      title: "Smart Dashboard",
      desc: "See everything that matters in one clean dashboard"
    }
  ];

  return (
    <div className="flex flex-wrap items-stretch justify-center gap-6 w-full max-w-full lg:max-w-[90vw] mx-auto px-6 py-8">
      {features.map((feature) => (
        <SpotlightCard 
          key={feature.id} 
          className="flex-1 min-w-[220px] max-w-[280px] cursor-pointer"
        >
          {/* Top Info Section */}
          <div className="flex flex-col items-start">
            <div className="w-fit p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
              <img 
                src={feature.imgSrc} 
                alt={feature.title} 
                className="w-6 h-6 object-contain" 
              />
            </div>

            <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight leading-snug transition-colors duration-300 group-hover:text-indigo-400">
              {feature.title}
            </h3>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              {feature.desc}
            </p>
          </div>

          {/* Bottom Hover Action (Pinned cleanly to bottom across all cards) */}
          <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
            <span>Explore</span>
            <span>{"->"}</span>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
}

function StepList() {
  const steps = [
    {
      id: 1,
      title: "Connect your email",
      desc: "Securely connect your Gmail to let us find opportunities for you."
    },
    {
      id: 2,
      title: "We organize everything",
      desc: "We extract, categorize and track opportunities so you don't have to."
    },
    {
      id: 3,
      title: "Track and apply with ease",
      desc: "Stay on top of deadlines, follow-ups and application progress."
    }
  ];

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="relative flex flex-row items-start gap-x-6 pb-12 last:pb-0 group"
          >
            {index !== steps.length - 1 && (
              <div className="absolute top-12 bottom-0 left-6 w-[4px] -translate-x-1/2 bg-slate-800 h-full" />
            )}

            {/* ADDED: transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-400 */}
            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 shrink-0 select-none shadow-md shadow-indigo-500/10 transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-400/50 group-hover:bg-indigo-500/20">
              <span className="text-xl font-bold text-indigo-400">
                {step.id}
              </span>
            </div>

            <div className="flex flex-col pt-2 flex-1">
              <h3 className="text-xl font-bold text-white mb-1 text-left tracking-tight transition-colors duration-200 group-hover:text-indigo-400">
                {step.title}
              </h3>
              <p className="text-slate-400 text-[17px] leading-relaxed text-left font-normal">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { FeatureGrid, StepList };