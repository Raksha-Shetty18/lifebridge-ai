import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Clock, 
  Compass,
  Layers,
  ChevronDown
} from 'lucide-react';
import Button from './ui/Button';

export default function Hero({ onStartClick, onHowItWorksClick }) {
  // Interactive simulation state for right-side visual card
  const [activeStep, setActiveStep] = useState(2);
  const [completedSteps, setCompletedSteps] = useState([1, 2]);

  const toggleStep = (stepNum) => {
    if (completedSteps.includes(stepNum)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNum));
    } else {
      setCompletedSteps([...completedSteps, stepNum]);
    }
  };

  const handleStart = () => {
    if (onStartClick) {
      onStartClick();
    } else {
      const el = document.getElementById('problem-input-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        const textarea = el.querySelector('textarea');
        if (textarea) textarea.focus();
      }
    }
  };

  const handleHowItWorks = () => {
    if (onHowItWorksClick) {
      onHowItWorksClick();
    } else {
      const el = document.getElementById('how-it-works-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headings & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span>AI ACTION NAVIGATOR</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              You have a problem. <br />
              <span className="bg-gradient-to-r from-brand-300 via-accent-cyan to-accent-violet bg-clip-text text-transparent">
                Let’s find your next step.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              LifeBridge AI turns confusing real-world situations into clear, personalized actions you can actually follow.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStart}
                className="group"
              >
                <span>Find My Next Step</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleHowItWorks}
              >
                <span>See How It Works</span>
              </Button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Action-Oriented Roadmaps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Official Portals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Conversational Fluff</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Interactive Workflow Simulation Visual */}
          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              
              {/* Outer Glow container */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-600/30 to-accent-cyan/30 rounded-3xl blur-lg opacity-70 pointer-events-none" />

              <div className="relative glass-panel rounded-3xl border border-slate-700/80 p-5 sm:p-6 shadow-2xl space-y-4">
                
                {/* Visual Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    LIFEBRIDGE SIMULATOR
                  </span>
                </div>

                {/* Step 1: User Situation */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-brand-400" />
                    Your Situation
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-100">
                    “My scholarship was rejected. What now?”
                  </p>
                </div>

                {/* Arrow Down Connector */}
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-300">
                    <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                  </div>
                </div>

                {/* Step 2: AI Triage Badge */}
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>AI understands & triages</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-200 border border-cyan-700/50">
                    MEDIUM URGENCY
                  </span>
                </div>

                {/* Arrow Down Connector */}
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Step 3: Action Plan Ready */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Action Plan Ready
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Progress: <strong className="text-emerald-400">{completedSteps.length} / 3</strong>
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSteps.length / 3) * 100}%` }}
                    />
                  </div>

                  {/* Interactive Steps list inside card */}
                  <div className="space-y-1.5 pt-1">
                    {[
                      { num: '01', title: 'Check rejection reason on student portal' },
                      { num: '02', title: 'Verify income & domicile certificates' },
                      { num: '03', title: 'Contact college scholarship nodal officer' }
                    ].map((step, idx) => {
                      const isDone = completedSteps.includes(idx + 1);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleStep(idx + 1)}
                          className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors select-none ${
                            isDone 
                              ? 'bg-emerald-950/30 border border-emerald-500/30 text-slate-300' 
                              : 'bg-slate-850 hover:bg-slate-800 border border-slate-700/60 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="font-mono text-[10px] text-slate-400 font-bold">{step.num}</span>
                            <span className={`truncate ${isDone ? 'line-through text-slate-400' : ''}`}>{step.title}</span>
                          </div>
                          <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
