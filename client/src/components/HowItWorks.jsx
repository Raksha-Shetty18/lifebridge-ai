import React from 'react';
import { 
  FileEdit, 
  Cpu, 
  GitFork, 
  CheckSquare, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      badge: 'DESCRIBE',
      icon: FileEdit,
      title: 'Describe',
      desc: 'Tell LifeBridge what is happening in your own words, without technical or legal jargon.',
      accent: 'text-blue-400 border-blue-500/30 bg-blue-500/10'
    },
    {
      num: '02',
      badge: 'UNDERSTAND',
      icon: Cpu,
      title: 'Understand',
      desc: 'AI identifies the situation, urgency, missing information, and key constraints.',
      accent: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
    },
    {
      num: '03',
      badge: 'ACT',
      icon: GitFork,
      title: 'Act',
      desc: 'Get one clear immediate action plus a structured, sequential roadmap.',
      accent: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
    },
    {
      num: '04',
      badge: 'TRACK',
      icon: CheckSquare,
      title: 'Track',
      desc: 'Save the case, complete checklist tasks, answer follow-ups, and monitor progress until resolved.',
      accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    }
  ];

  return (
    <section id="how-it-works-section" className="py-20 bg-slate-900/30 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            The LifeBridge Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            How LifeBridge AI Works
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            From raw real-life problem description to an execution-ready resolution roadmap in 4 steps.
          </p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-slate-800 relative group hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-850 text-slate-400 border border-slate-700/60">
                      STEP {step.num}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${step.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <span>PHASE {step.num}</span>
                  <span>•</span>
                  <span>{step.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Non-Chatbot Feature Callout */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Decision Support Without Cognitive Overload
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                Rather than giving open-ended chatbot responses that leave you wondering what to click, LifeBridge provides an actionable checklist with verified official links.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
