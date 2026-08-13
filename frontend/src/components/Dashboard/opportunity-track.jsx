import React from 'react';

export default function OpportunityGrid() {
  
  const features = [
    {
      id: 1,
      tracked: 12,
      title: "New Opportunities",
      today: "+1 today",
      next: "Next: 1 day"
    },
    {
      id: 2,
      tracked: 12,
      title: "Applicationa Tracked",
      today: "+2 today",
      next: ""
    },
    {
      id: 3,
      tracked: 12,
      title: "Upcoming Deadines",
      today: "+1 today",
      next: "Next: 2 day"
    },
    {
      id: 4,
      tracked: 12,
      title: "Responses",
      today: "+3 today",
      next: ""
    },
  ];

  return (
    // 2. The main parent container configured for 5 layout columns on desktop
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 3. Dynamic layout generator loops through all five items in one go */}
      {features.map((feature) => (
        <div 
          key={feature.id} 
          className="flex flex-col items-start bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm px-3 py-3"
        >
          
          {/* Uniformly scales typography sizing variables exactly to your layout requirements */}
          <p className="w-full text-left text-[20px] text-black font-medium mb-1">
            {feature.title}
          </p>
          
          <p className="text-[22px] text-green-700 leading-snug">
            {feature.today}
          </p>
          <p className="text-[22px] text-gray-600 leading-snug">
            {feature.next}
          </p>
        </div>
      ))}

    </div>
  );
}