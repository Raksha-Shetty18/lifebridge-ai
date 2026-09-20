import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Flame, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  GitFork,
  HeartHandshake
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <Compass className="w-4 h-4" />
          <span>About LifeBridge AI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Turning Confusing Real-Life Crises into <br />
          <span className="bg-gradient-to-r from-brand-300 via-accent-cyan to-accent-violet bg-clip-text text-transparent">
            Clear, Actionable Roadmaps
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Most platforms give you search results or conversational text. When you are facing a scholarship defect, lost certificate, or cyber threat, what you really need is one answer: <strong>"What should I do next?"</strong>
        </p>
      </div>

      {/* The Core Problem & Differentiator */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">The Core Differentiator: Action, Not Chat</h2>
            <p className="text-xs text-slate-400">Why LifeBridge is built differently from generic AI assistants.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <h3 className="text-sm font-bold text-rose-300">❌ Generic AI Chatbot</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>Endless conversational filler and polite small talk</li>
              <li>Wall of unstructured text that causes cognitive fatigue</li>
              <li>Asks 10 interrogation questions before being helpful</li>
              <li>No visual dependency graph or progress tracking</li>
              <li>Advice is lost forever as soon as the tab closes</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <h3 className="text-sm font-bold text-emerald-300">✅ LifeBridge AI Action Navigator</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>Instant preliminary roadmap on the very first prompt</li>
              <li>"What should I do now?" single immediate action spotlight</li>
              <li>Interactive Action Graph showing node dependencies & required docs</li>
              <li>Persistent Case Management with live checklist completion tracking</li>
              <li>Strict zero-hallucination policy with verified official portals</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Safety */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Responsible AI & Safety Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Built from day one with strict ethical and procedural guardrails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Emergency Triage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Immediate triage for life-safety, medical emergencies, and crisis distress, directly routing users to 112 / 1930 / 14416 rather than conversational AI.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero Fake Contact Info</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never fabricate government portal URLs, phone numbers, or procedural fees. Unverified details are prominently tagged for official confirmation.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Non-Authority Handoff</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              LifeBridge clearly positions itself as a navigator, guiding users to competent nodal officers, statutory ombudsmen, and certified advisors.
            </p>
          </div>
        </div>
      </div>

      {/* System Architecture Pipeline */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">System Architecture & Pipeline</h2>
            <p className="text-xs text-slate-400">How your situation is converted into an execution-ready pathway.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-800">
          {[
            { step: '01', title: 'User Situation', desc: 'Natural problem description' },
            { step: '02', title: 'AI Understanding', desc: 'Urgency & bottleneck triage' },
            { step: '03', title: 'Action Plan', desc: 'Sequential milestone steps' },
            { step: '04', title: 'Resources', desc: 'Verified official portals' },
            { step: '05', title: 'Checklist', desc: 'Interactive task tracker' },
            { step: '06', title: 'Tracking', desc: 'Persistent case lifecycle' }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-mono font-bold text-brand-400">{item.step}</span>
              <h4 className="text-xs font-bold text-white leading-tight">{item.title}</h4>
              <p className="text-[10px] text-slate-400 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Built for Action, Not Authority */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/30 bg-slate-900/60 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Built for Action, Not Authority</h3>
            <p className="text-xs text-slate-400">Understanding the boundary between AI navigation and official administration.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
          <p className="leading-relaxed">
            LifeBridge provides guidance and organization. Important legal, financial, medical, safety, and government requirements should be confirmed through the relevant official source.
          </p>
          <p className="leading-relaxed">
            All official decisions, application reviews, and grievance resolutions remain under the sole jurisdiction of the respective governmental or institutional bodies.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-500/30 text-center space-y-4 bg-gradient-to-b from-brand-950/40 to-slate-900/90">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to map out your next step?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Describe any practical problem you are facing in your own natural words.
        </p>
        <div className="pt-2">
          <Link
            to="/#input-section"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-violet hover:from-brand-500 text-white text-sm font-semibold shadow-glow-indigo transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Launch Problem Navigator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
