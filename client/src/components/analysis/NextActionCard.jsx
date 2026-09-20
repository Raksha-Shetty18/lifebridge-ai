import React, { useState } from 'react';
import { Target, HelpCircle, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function NextActionCard({ immediateAction, onMarkDone }) {
  const [isCompleted, setIsCompleted] = useState(false);

  if (!immediateAction) return null;

  const handleToggle = () => {
    const nextState = !isCompleted;
    setIsCompleted(nextState);
    if (onMarkDone) onMarkDone(nextState);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900/60 via-indigo-950/70 to-slate-900/80 border-2 border-brand-500/50 p-5 sm:p-7 shadow-glow-indigo backdrop-blur-xl">
      {/* Background Accent Pill */}
      <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-36 h-36 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-brand-500/30">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-500/30 border border-brand-400/50 flex items-center justify-center text-brand-300">
            <Target className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono font-black uppercase tracking-wider text-brand-300 block">
              WHAT SHOULD I DO NOW?
            </span>
            <span className="text-[11px] text-slate-300">Your prioritized immediate next action</span>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isCompleted
              ? 'bg-emerald-500 text-white shadow-glow-emerald'
              : 'bg-slate-800 hover:bg-brand-600 text-slate-100 hover:text-white border border-slate-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Marked as Done!' : 'Mark Next Action Done'}</span>
        </button>
      </div>

      <div className="space-y-4">
        <h2 className={`text-xl sm:text-2xl font-black text-white leading-tight ${
          isCompleted ? 'line-through text-emerald-300' : ''
        }`}>
          {immediateAction.title}
        </h2>

        <div className="p-4 rounded-2xl bg-slate-900/85 border border-slate-800 flex items-start gap-3">
          <div className="p-1 rounded bg-accent-cyan/10 text-accent-cyan shrink-0 mt-0.5">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan block mb-0.5">
              WHY THIS MATTERS
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {immediateAction.why}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
