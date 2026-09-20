import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  ShieldAlert, 
  Zap, 
  Compass, 
  CheckCircle2, 
  Flame,
  HelpCircle
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../../services/demoData';
import { checkEmergencySituation } from '../../utils/safetyCheck';
import EmergencyBanner from '../common/EmergencyBanner';

export default function Hero() {
  const navigate = useNavigate();
  const [problemText, setProblemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setProblemText(val);
    const emergency = checkEmergencySituation(val);
    setEmergencyAlert(emergency);
  };

  const handlePresetClick = (preset) => {
    setProblemText(preset.prompt);
    setSelectedCategory(preset.category);
    const emergency = checkEmergencySituation(preset.prompt);
    setEmergencyAlert(emergency);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problemText.trim()) return;
    setIsSubmitting(true);
    // Navigate to analyze page with state
    navigate('/analyze', {
      state: {
        problem: problemText.trim(),
        category: selectedCategory
      }
    });
  };

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-radial-gradient">
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-600/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-accent-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Product Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-medium mb-6 shadow-glow-indigo backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-accent-cyan animate-ping" />
          <span>LifeBridge AI • Action Navigation Engine</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Not a Generic Chatbot</span>
        </div>

        {/* Hero Headlines */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          You have a problem. <br />
          <span className="bg-gradient-to-r from-brand-300 via-accent-cyan to-accent-violet bg-clip-text text-transparent">
            Let’s find your next step.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          LifeBridge AI turns confusing real-life problems into clear, personalized action plans, interactive flow graphs, and step-by-step checklists.
        </p>

        {/* Emergency Detection Banner (if user types emergency keywords) */}
        {emergencyAlert && (
          <div className="mt-6 text-left">
            <EmergencyBanner data={emergencyAlert} onClose={() => setEmergencyAlert(null)} />
          </div>
        )}

        {/* Main Input Form Container */}
        <div id="input-section" className="mt-10 max-w-3xl mx-auto text-left">
          <form 
            onSubmit={handleSubmit}
            className="glass-panel p-3 sm:p-4 rounded-3xl border border-slate-700/70 shadow-2xl relative transition-all focus-within:border-brand-500/60 focus-within:shadow-glow-indigo"
          >
            <div className="flex items-center gap-2 px-3 pt-2 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-brand-400" />
              <span>What are you dealing with?</span>
            </div>

            <div className="relative">
              <textarea
                value={problemText}
                onChange={handleInputChange}
                rows={3}
                required
                placeholder="Describe your problem in your own words... e.g., 'My scholarship application was rejected and I don't know what to do next' or 'I got a threatening SMS to block my bank account.'"
                className="w-full bg-transparent px-3 py-2 text-slate-100 placeholder-slate-500 text-sm sm:text-base resize-none focus:outline-none leading-relaxed font-sans"
              />
            </div>

            {/* Bottom Bar inside Form */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80 px-2 pb-1">
              
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="hidden sm:inline">💡 Tip:</span>
                <span>Type freely — AI will extract deadlines, documents, & action steps.</span>
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  type="submit"
                  disabled={!problemText.trim() || isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white text-sm sm:text-base font-semibold shadow-glow-indigo transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>{isSubmitting ? 'Analyzing...' : 'Start Action Plan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </form>

          {/* Instant Demo Presets Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Or Try A Demo Scenario (1-Click):</span>
              </div>
              <span className="text-[11px] text-slate-500">Live Hackathon Presets</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {DEMO_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handlePresetClick(scenario)}
                  className="glass-card p-3 rounded-2xl text-left flex items-start gap-3 group transition-all"
                >
                  <div className="p-2 rounded-xl bg-slate-800/90 group-hover:bg-brand-500/20 text-brand-400 shrink-0 border border-slate-700/60 group-hover:border-brand-500/40 transition-colors">
                    <span className="text-base">{scenario.badge.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-brand-300 truncate transition-colors">
                        {scenario.title}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                        {scenario.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 leading-snug">
                      "{scenario.prompt}"
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 text-left">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center mb-2">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200">Action, Not Chat</h4>
            <p className="text-[11px] text-slate-400 mt-1">Structured milestones with clear dependencies.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-7 h-7 rounded-lg bg-accent-cyan/10 text-accent-cyan flex items-center justify-center mb-2">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200">Interactive Graph</h4>
            <p className="text-[11px] text-slate-400 mt-1">Visual roadmap connecting docs, steps, & portal.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200">Real-Time Checklist</h4>
            <p className="text-[11px] text-slate-400 mt-1">Track case completion with persistent progress.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200">Verified Portals</h4>
            <p className="text-[11px] text-slate-400 mt-1">Official government & institutional links only.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
