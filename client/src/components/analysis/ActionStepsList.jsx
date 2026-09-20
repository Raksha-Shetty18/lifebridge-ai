import React, { useState } from 'react';
import { 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  ShieldCheck,
  Building,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export default function ActionStepsList({ steps = [], onStepStatusChange }) {
  const [stepStatuses, setStepStatuses] = useState({});

  const handleToggleStatus = (stepNumber) => {
    const current = stepStatuses[stepNumber] || 'pending';
    const next = current === 'completed' ? 'pending' : 'completed';
    const updated = { ...stepStatuses, [stepNumber]: next };
    setStepStatuses(updated);
    if (onStepStatusChange) {
      onStepStatusChange(stepNumber, next);
    }
  };

  const getActionTypeBadge = (type) => {
    const map = {
      portal_check: { label: 'Online Portal', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      document_prep: { label: 'Document Prep', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      in_person: { label: 'In-Person Visit', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      helpline: { label: 'Helpline Call', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      appeal: { label: 'Grievance / Appeal', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
      instant_download: { label: 'Instant Download', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
      police_report: { label: 'Police Report', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
      portfolio_build: { label: 'Portfolio Project', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
      networking: { label: 'Direct Outreach', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
      emergency_contact: { label: 'Emergency Contact', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
    };
    const current = map[type] || { label: 'Action Task', color: 'bg-slate-800 text-slate-300 border-slate-700' };
    return (
      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${current.color}`}>
        {current.label}
      </span>
    );
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="p-8 text-center glass-panel rounded-2xl text-slate-400 text-sm">
        No action steps generated.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, idx) => {
        const isDone = (stepStatuses[step.step_number] || step.status) === 'completed';

        return (
          <div
            key={step.step_number || idx}
            className={`glass-panel p-5 sm:p-6 rounded-3xl border transition-all duration-200 ${
              isDone 
                ? 'border-emerald-500/40 bg-emerald-950/10 shadow-glow-emerald' 
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Header: Step Number, Title, Type, Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-colors ${
                  isDone 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-brand-600/30 text-brand-300 border border-brand-500/40'
                }`}>
                  {step.step_number || idx + 1}
                </span>

                <div>
                  <h3 className={`text-base sm:text-lg font-bold leading-tight ${
                    isDone ? 'text-emerald-200 line-through' : 'text-white'
                  }`}>
                    {step.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {getActionTypeBadge(step.action_type)}

                <button
                  type="button"
                  onClick={() => handleToggleStatus(step.step_number || idx + 1)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed pl-0 sm:pl-11 mb-4">
              {step.description}
            </p>

            {/* Why It Matters Callout */}
            {step.why_it_matters && (
              <div className="sm:ml-11 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/90 text-xs mb-3 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-accent-cyan font-semibold">Why this step matters: </strong>
                  {step.why_it_matters}
                </p>
              </div>
            )}

            {/* Documents Required */}
            {step.documents && step.documents.length > 0 && (
              <div className="sm:ml-11 flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1 mr-1">
                  <FileText className="w-3 h-3 text-slate-400" />
                  Required:
                </span>
                {step.documents.map((doc, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-800/90 border border-slate-700 text-[11px] font-medium text-slate-200"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
