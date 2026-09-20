import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({
  icon: Icon,
  badge,
  title,
  description,
  isSelected = false,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`glass-panel p-6 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group select-none ${
        isSelected
          ? 'border-brand-500 bg-brand-950/20 shadow-glow-indigo scale-[1.02]'
          : 'border-slate-800 hover:border-slate-700 hover:shadow-lg hover:-translate-y-0.5'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-105 transition-transform">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-850 px-2.5 py-1 rounded-full border border-slate-700/60">
            {badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:text-brand-300">
        <span>Select Domain</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
