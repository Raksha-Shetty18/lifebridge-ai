import React from 'react';
import { ArrowRight, GraduationCap, Briefcase, Landmark, Users } from 'lucide-react';

export default function UseCaseCard({
  role,
  icon: Icon,
  quote,
  category,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 hover:border-brand-500/50 hover:shadow-glow-indigo transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
              <Icon className="w-4 h-4" />
            </div>
            <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
              {role}
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-850 text-slate-400 border border-slate-700/60">
            {category}
          </span>
        </div>

        <p className="text-sm sm:text-base font-semibold text-white group-hover:text-brand-300 transition-colors leading-snug mb-3">
          "{quote}"
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:text-brand-300">
        <span>Load into Navigator</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
