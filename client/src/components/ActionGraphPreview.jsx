import React, { useState } from 'react';
import { 
  GitFork, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Building2, 
  ArrowRight,
  Info,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function ActionGraphPreview() {
  const [activeNode, setActiveNode] = useState('plan');

  const nodeDetails = {
    problem: {
      title: 'Your Situation',
      badge: 'INPUT NODE',
      desc: '“My scholarship application was marked defective on the portal.”',
      details: 'User provides problem description in plain natural language.'
    },
    analysis: {
      title: 'AI Understanding & Triage',
      badge: 'REASONING ENGINE',
      desc: 'Extracted: Income mismatch, Time-sensitive institutional window, Nodal contact required.',
      details: 'Evaluates urgency, identifies jurisdiction, and checks for document discrepancies.'
    },
    docs: {
      title: 'Required Documents',
      badge: 'EVIDENCE LAYER',
      desc: 'Current FY Income Certificate, Institute Bonafide, Portal Error Screenshot.',
      details: 'Prevents procedural rejection by verifying exact official document criteria.'
    },
    deadlines: {
      title: 'Critical Deadlines',
      badge: 'TIME-SENSITIVE',
      desc: '7-day portal unlock window prior to nodal verification closure.',
      details: 'Flags non-negotiable statutory timelines to avoid permanent lapse.'
    },
    resources: {
      title: 'Official Gateways',
      badge: 'VERIFIED REPOSITORIES',
      desc: 'National Scholarship Portal (NSP), State DTE Cell, Grievance Portal.',
      details: 'Direct statutory links without intermediate brokerages or unverified third parties.'
    },
    plan: {
      title: 'Action Plan Roadmap',
      badge: 'ACTION ENGINE',
      desc: 'Step 1: Check code → Step 2: Update cert → Step 3: Meet Nodal Officer → Step 4: Submit appeal.',
      details: 'Sequential procedural milestones mapped with rationale and actions.'
    },
    resolved: {
      title: 'Case Resolved',
      badge: 'GOAL STATE',
      desc: 'Defect unlocked, representation endorsed, and scholarship renewed.',
      details: 'Final milestone achieved with full digital audit trail.'
    }
  };

  const current = nodeDetails[activeNode] || nodeDetails.plan;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-cyan bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          Signature Innovation
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
          From confusion to a clear path.
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
          LifeBridge doesn't just answer questions. It turns your situation into an actionable pathway.
        </p>
      </div>

      {/* Main Interactive Graph Showcase Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Graph Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Node Topology Map */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Level 1: Problem */}
            <div className="flex justify-center">
              <button
                onClick={() => setActiveNode('problem')}
                className={`px-5 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
                  activeNode === 'problem'
                    ? 'bg-brand-600 text-white shadow-glow-indigo border-brand-400 scale-105'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                1. Your Problem
              </button>
            </div>

            {/* Vertical Connector */}
            <div className="flex justify-center text-slate-600">
              <div className="w-0.5 h-6 bg-slate-700" />
            </div>

            {/* Level 2: AI Analysis */}
            <div className="flex justify-center">
              <button
                onClick={() => setActiveNode('analysis')}
                className={`px-6 py-3 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeNode === 'analysis'
                    ? 'bg-accent-cyan/20 text-cyan-300 shadow-glow-cyan border-cyan-500 scale-105'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>2. AI Analysis & Triage</span>
              </button>
            </div>

            {/* Branching Connectors */}
            <div className="flex justify-center text-slate-600">
              <div className="w-0.5 h-6 bg-slate-700" />
            </div>

            {/* Level 3: Three Supporting Branches */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                onClick={() => setActiveNode('docs')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeNode === 'docs'
                    ? 'bg-brand-600 text-white shadow-glow-indigo border-brand-400'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                <FileText className="w-4 h-4 mx-auto mb-1 text-brand-400" />
                <span className="text-[11px] font-semibold block">Documents</span>
              </button>

              <button
                onClick={() => setActiveNode('deadlines')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeNode === 'deadlines'
                    ? 'bg-amber-600 text-white shadow-glow-amber border-amber-400'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                <Clock className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                <span className="text-[11px] font-semibold block">Deadlines</span>
              </button>

              <button
                onClick={() => setActiveNode('resources')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  activeNode === 'resources'
                    ? 'bg-blue-600 text-white shadow-glow-indigo border-blue-400'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                <span className="text-[11px] font-semibold block">Resources</span>
              </button>
            </div>

            {/* Vertical Connector */}
            <div className="flex justify-center text-slate-600">
              <div className="w-0.5 h-6 bg-slate-700" />
            </div>

            {/* Level 4: Action Plan */}
            <div className="flex justify-center">
              <button
                onClick={() => setActiveNode('plan')}
                className={`px-8 py-3.5 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeNode === 'plan'
                    ? 'bg-gradient-to-r from-brand-600 to-accent-violet text-white shadow-glow-indigo border-brand-400 scale-105'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <GitFork className="w-4 h-4 text-cyan-200" />
                <span>3. Action Plan Roadmap</span>
              </button>
            </div>

            {/* Vertical Connector */}
            <div className="flex justify-center text-slate-600">
              <div className="w-0.5 h-6 bg-slate-700" />
            </div>

            {/* Level 5: Resolved */}
            <div className="flex justify-center">
              <button
                onClick={() => setActiveNode('resolved')}
                className={`px-6 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeNode === 'resolved'
                    ? 'bg-emerald-600 text-white shadow-glow-emerald border-emerald-400 scale-105'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>✓ Resolved</span>
              </button>
            </div>

          </div>

          {/* Right Column: Node Inspector Showcase */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  {current.badge}
                </span>
                <span className="text-xs text-slate-400">Node Inspector</span>
              </div>

              <h3 className="text-lg font-bold text-white">
                {current.title}
              </h3>

              <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-700/60 text-xs text-slate-200 leading-relaxed font-sans">
                {current.desc}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {current.details}
              </p>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Click any node in the graph to inspect its parameters.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
