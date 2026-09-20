import React, { useState } from 'react';
import { HelpCircle, Sparkles, Check, ArrowRight, Loader2 } from 'lucide-react';

export default function SmartFollowups({ questions = [], onAnswerQuestion, isRefining }) {
  const [answeredMap, setAnsweredMap] = useState({});

  if (!questions || questions.length === 0) return null;

  const handleSelectOption = (qId, option) => {
    setAnsweredMap(prev => ({ ...prev, [qId]: option }));
    if (onAnswerQuestion) {
      onAnswerQuestion(qId, option);
    }
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-brand-500/30 bg-gradient-to-b from-brand-950/20 to-slate-900/80">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-300">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Help me refine this plan</h3>
            <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-brand-500/30 text-brand-200">
              ADAPTIVE ROADMAP
            </span>
          </div>
          <p className="text-xs text-slate-400">Answer a few quick questions so I can adapt your next steps.</p>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q) => {
          const selected = answeredMap[q.id];

          return (
            <div 
              key={q.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800"
            >
              <h4 className="text-xs sm:text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-400"></span>
                {q.question}
              </h4>

              <div className="flex flex-wrap gap-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selected === opt;

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={isRefining}
                      onClick={() => handleSelectOption(q.id, opt)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-brand-600 text-white shadow-glow-indigo border border-brand-400'
                          : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      )}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isRefining && (
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-brand-300 font-medium py-1">
          <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
          <span>Refining Action Roadmap in real-time...</span>
        </div>
      )}
    </div>
  );
}
