import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  ShieldAlert, 
  FileText, 
  Flame 
} from 'lucide-react';
import Button from './ui/Button';
import { checkEmergencySituation } from '../utils/safetyCheck';
import EmergencyBanner from './common/EmergencyBanner';

const CATEGORY_PILLS = [
  { id: 'education', label: '🎓 Education', icon: GraduationCap },
  { id: 'career', label: '💼 Career', icon: Briefcase },
  { id: 'civic', label: '🏛️ Civic Services', icon: Landmark },
  { id: 'financial_safety', label: '💰 Financial Safety', icon: ShieldAlert },
  { id: 'documents', label: '📄 Documents', icon: FileText },
  { id: 'urgent', label: '🚨 Urgent Help', icon: Flame }
];

const DEMO_SCENARIO_ITEMS = [
  {
    id: 'scholarship',
    label: 'Scholarship deadline problem',
    category: 'education',
    prompt: 'I missed a scholarship deadline and want to know what I can still do.',
    icon: GraduationCap,
    categoryName: 'Education'
  },
  {
    id: 'upi_scam',
    label: 'Suspicious UPI/OTP scam',
    category: 'financial_safety',
    prompt: 'I received a suspicious UPI payment request from someone pretending to be my bank.',
    icon: ShieldAlert,
    categoryName: 'Financial Safety'
  },
  {
    id: 'lost_id',
    label: 'Lost identity document',
    category: 'documents',
    prompt: 'I lost my Aadhaar card while travelling.',
    icon: FileText,
    categoryName: 'Documents'
  },
  {
    id: 'internship',
    label: 'Software internship skill gap',
    category: 'career',
    prompt: "I want to find a software internship but don't know what skills to learn.",
    icon: Briefcase,
    categoryName: 'Career'
  }
];

export default function ProblemInput({ 
  value = '', 
  onChange, 
  selectedCategory = null, 
  onSelectCategory, 
  onSubmit, 
  isLoading = false 
}) {
  const [internalText, setInternalText] = useState(value);
  const [internalCategory, setInternalCategory] = useState(selectedCategory);
  const [emergencyAlert, setEmergencyAlert] = useState(null);

  const text = value !== undefined ? value : internalText;
  const category = selectedCategory !== undefined ? selectedCategory : internalCategory;

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (onChange) onChange(val);
    else setInternalText(val);

    const alert = checkEmergencySituation(val);
    setEmergencyAlert(alert);
  };

  const handleCategoryClick = (catId) => {
    const next = category === catId ? null : catId;
    if (onSelectCategory) onSelectCategory(next);
    else setInternalCategory(next);
  };

  const handleSelectDemo = (scenario) => {
    if (onChange) onChange(scenario.prompt);
    else setInternalText(scenario.prompt);

    if (onSelectCategory) onSelectCategory(scenario.category);
    else setInternalCategory(scenario.category);

    const alert = checkEmergencySituation(scenario.prompt);
    setEmergencyAlert(alert);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (onSubmit) {
      onSubmit({ problem: text.trim(), category });
    }
  };

  return (
    <section id="problem-input-section" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          What are you dealing with?
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Type your situation in your own words. LifeBridge will convert it into a structured, trackable action pathway.
        </p>
      </div>

      {/* Emergency banner if emergency keywords triggered */}
      {emergencyAlert && (
        <div className="mb-6">
          <EmergencyBanner data={emergencyAlert} onClose={() => setEmergencyAlert(null)} />
        </div>
      )}

      {/* Problem Input Card */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-700/80 shadow-2xl focus-within:border-brand-500/60 focus-within:shadow-glow-indigo transition-all space-y-4"
      >
        {/* Category Pill Selectors */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-2 border-b border-slate-800">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
            Category (Optional):
          </span>
          {CATEGORY_PILLS.map((pill) => {
            const isSelected = category === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => handleCategoryClick(pill.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-glow-indigo border border-brand-400'
                    : 'bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Large Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            rows={4}
            required
            placeholder="Tell me what's happening in your own words..."
            className="w-full bg-transparent p-2 text-slate-100 placeholder-slate-500 text-sm sm:text-base resize-none focus:outline-none leading-relaxed font-sans"
          />
        </div>

        {/* Demo Scenario Quick-Pills */}
        <div className="pt-2 pb-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Try a demo scenario:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DEMO_SCENARIO_ITEMS.map((item) => {
              const Icon = item.icon;
              const isSelected = text === item.prompt;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectDemo(item)}
                  className={`text-left p-2.5 rounded-xl text-xs transition-all border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-brand-950/60 border-brand-400 text-white shadow-glow-indigo'
                      : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-1">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-brand-300 shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="font-semibold block truncate">{item.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Demo scenario • {item.categoryName}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-brand-400 font-mono shrink-0 group-hover:translate-x-0.5 transition-transform">Use ↗</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Submission Row */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span>AI generates: Immediate Next Action, Required Documents, & Checklist.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            disabled={!text.trim() || isLoading}
            className="w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Analyze My Situation</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </section>
  );
}
