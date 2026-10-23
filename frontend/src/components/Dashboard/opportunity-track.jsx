import React from 'react';
import { Briefcase, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export default function OpportunityGrid({ opportunities = [] }) {
  // Logic calculations based on live opportunities state passed from parent
  const totalTracked = opportunities.length;
  const interviewingCount = opportunities.filter(o => o.status === 'Interviewing').length;
  const upcomingDeadlinesCount = opportunities.filter(o => o.deadlineDate).length;
  const offersCount = opportunities.filter(o => o.status === 'Offer').length;

  const features = [
    {
      id: 1,
      title: "Applications Tracked",
      value: totalTracked,
      subtext: `${opportunities.filter(o => o.status === 'Applied').length} active applications`,
      icon: Briefcase,
      color: "from-blue-500/20 to-indigo-500/20 text-indigo-400 border-indigo-500/30"
    },
    {
      id: 2,
      title: "Active Interviews",
      value: interviewingCount,
      subtext: interviewingCount > 0 ? `${interviewingCount} in pipeline` : "No active interviews",
      icon: TrendingUp,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30"
    },
    {
      id: 3,
      title: "Upcoming Deadlines",
      value: upcomingDeadlinesCount,
      subtext: upcomingDeadlinesCount > 0 ? "Requires action soon" : "No pending dates",
      icon: Clock,
      color: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30"
    },
    {
      id: 4,
      title: "Offers Received",
      value: offersCount,
      subtext: offersCount > 0 ? "Great job!" : "Awaiting responses",
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div 
            key={feature.id} 
            className="bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl transition-all duration-200 flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {feature.title}
              </span>
              <div className={`p-2 rounded-xl bg-gradient-to-br border ${feature.color}`}>
                <Icon size={18} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-bold text-white tracking-tight">
                {feature.value}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {feature.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}