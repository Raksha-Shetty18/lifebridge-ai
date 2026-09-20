import React, { useState } from 'react';
import { Target, HelpCircle, CheckCircle2, Zap } from 'lucide-react';
import Button from './ui/Button';

export default function NextActionFeature() {
  const [isDone, setIsDone] = useState(false);

  return (
    <section className="py-20 bg-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            The Core Differentiator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Not another chatbot.
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Chatbots give generic lists of advice. LifeBridge turns a confusing real-world problem into one clear next action and a trackable pathway.
          </p>
        </div>

        {/* Comparison Cards: Traditional AI vs LifeBridge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400">Traditional AI</span>
            <p className="text-sm font-semibold text-slate-300 italic">
              “Here are 12 general things you could potentially try...”
            </p>
            <p className="text-xs text-slate-400">
              Leaves you wondering what to click first and what documents you actually need.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-brand-950/40 border border-brand-500/40 space-y-2 shadow-glow-indigo">
            <span className="text-[11px] font-mono uppercase font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-300" />
              LifeBridge Action Navigator
            </span>
            <p className="text-sm font-bold text-white">
              “Here is the exact next thing you should work on.”
            </p>
            <p className="text-xs text-brand-200/90">
              Surfaces one immediate action, required verification documents, and verified official portals.
            </p>
          </div>
        </div>

        {/* Feature Spotlight Card */}
        <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border-2 border-brand-500/50 shadow-glow-indigo relative">
          
          <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-brand-500/30">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-300">
              <Target className="w-4 h-4 text-accent-cyan" />
              <span>WHAT SHOULD I DO NOW?</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              ONE IMMEDIATE ACTION
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl font-bold transition-colors leading-snug mb-4 ${
            isDone ? 'text-emerald-300 line-through' : 'text-white'
          }`}>
            Check the rejection reason in your scholarship application portal.
          </h3>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 mb-6 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent-cyan block mb-0.5">
                Why this matters:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                This determines whether you should correct uploaded documents, file an appeal, or contact your institutional nodal officer before deadlines close.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-400">
              Required: Portal login credentials & registered mobile OTP.
            </span>

            <Button
              variant={isDone ? 'success' : 'secondary'}
              size="md"
              onClick={() => setIsDone(!isDone)}
              className="w-full sm:w-auto"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isDone ? 'Marked as Done!' : 'Mark as Done'}</span>
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
