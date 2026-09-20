import React from 'react';
import { 
  FileEdit, 
  Cpu, 
  GitFork, 
  CheckSquare, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: FileEdit,
      title: 'Describe Your Problem',
      desc: 'Type your situation in simple words without needing technical or legal terminology.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      num: '02',
      icon: Cpu,
      title: 'AI Understanding',
      desc: 'Our engine identifies urgency, bottlenecks, missing information, and required documents.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      num: '03',
      icon: GitFork,
      title: 'Interactive Action Graph',
      desc: 'Visual roadmap connecting your situation, official steps, evidence, and authority handoffs.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      num: '04',
      icon: CheckSquare,
      title: 'Checklist & Resolution',
      desc: 'Track completed items, download verified forms, and resolve your case with confidence.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <section className="py-20 bg-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            The LifeBridge Paradigm
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Why LifeBridge is Not Just Another Chatbot
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Chatbots give you endless conversational text. LifeBridge delivers an execution-ready, step-by-step roadmap with real-time tracking.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-slate-800 relative group hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-brand-400 transition-colors">
                    {step.num}
                  </span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} p-0.5 flex items-center justify-center shadow-md`}>
                    <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout */}
        <div className="mt-14 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Grounded in Real Government & Institutional Workflows
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                Zero hallucinated phone numbers or fake procedures. When in doubt, LifeBridge marks unverified items clearly and routes to official government nodal systems.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
