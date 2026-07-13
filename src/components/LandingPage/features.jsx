import React from 'react';

function FeatureGrid() {
  // 1. Define the features array with paths referencing your public folder
  const features = [
    {
      id: 1,
      imgSrc: "/icons/email.png", // Update with your actual filenames
      title: "Email Tracking",
      desc: "Automatically finds internships and scholarships from your Emails"
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
      imgSrc: "/icons/school.png",
      title: "DTU Notice Tracker",
      desc: "Real-time updates from DTU website for notices, drives, events and more"
    },
    {
      id: 5,
      imgSrc: "/icons/graph.png",
      title: "Smart Dashboard",
      desc: "See everything that matters in one clean dashboard"
    }
  ];

  return (
    // 2. The main parent container configured for 5 layout columns on desktop
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      
      {/* 3. Dynamic layout generator loops through all five items in one go */}
      {features.map((feature) => (
        <div 
          key={feature.id} 
          className="flex flex-col items-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm px-3 py-3"
        >
          {/* Main card illustration image handling layout normalization */}
          <img 
            src={feature.imgSrc} 
            alt={feature.title} 
            className="w-10 h-10 object-contain mb-3" 
          />
          
          {/* Uniformly scales typography sizing variables exactly to your layout requirements */}
          <p className="text-[25px] text-black font-medium mb-1">
            {feature.title}
          </p>
          
          <p className="text-[22px] text-gray-600 leading-snug">
            {feature.desc}
          </p>
        </div>
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
          /* Added relative here so the absolute line below has a solid height to scale against */
          <div 
            key={step.id} 
            className="relative flex flex-row items-start gap-x-6 pb-12 last:pb-0"
          >
            {/* 1. FIXED LINE PLACEMENT: Attached directly to the step row container */}
            {index !== steps.length - 1 && (
              <div className="absolute top-12 bottom-0 left-6 w-[4px] -translate-x-1/2 bg-purple-100 h-full" />
            )}

            {/* Left Column: Number Circle only */}
            <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 shrink-0 select-none">
              <span className="text-xl font-bold text-purple-700">
                {step.id}
              </span>
            </div>

            {/* Right Column: Text Content */}
            <div className="flex flex-col pt-2 flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1 text-left">
                {step.title}
              </h3>
              <p className="text-gray-500 text-[17px] leading-relaxed text-left">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export {FeatureGrid, StepList};