import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  CheckSquare, 
  Trash2, 
  ShieldAlert, 
  Compass, 
  Zap,
  Clock,
  ListTodo
} from 'lucide-react';
import { CategoryBadge, StatusBadge, UrgencyBadge } from '../common/Badges';

export default function CaseCard({ caseItem, onDelete }) {
  if (!caseItem) return null;

  const checklist = caseItem.checklist || [];
  const completedCount = checklist.filter(i => i.completed).length;
  const totalCount = checklist.length;
  const percent = typeof caseItem.progress === 'number' 
    ? caseItem.progress 
    : (totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0);

  const formattedDate = new Date(caseItem.updated_at || caseItem.created_at || Date.now()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Determine current next action title
  const nextActionTitle = caseItem.immediate_action?.title || 
    (caseItem.action_steps && caseItem.action_steps.find(s => s.status !== 'completed')?.title) || 
    'Review next procedural step';

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group relative overflow-hidden">
      {/* Top Background Gradient Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-accent-cyan to-emerald-400 opacity-60" />

      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <CategoryBadge category={caseItem.category} />
            <UrgencyBadge urgency={caseItem.urgency} />
            <StatusBadge status={caseItem.status || 'active'} />
          </div>
          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-500" />
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1 mb-1.5">
          {caseItem.title}
        </h3>

        {/* Problem summary */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {caseItem.problem_summary || caseItem.original_description}
        </p>

        {/* Current Next Action Spotlight Callout */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 mb-4 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-400">
            <Zap className="w-3 h-3 text-brand-400" />
            <span>Next Action:</span>
          </div>
          <p className="text-xs font-semibold text-slate-200 line-clamp-1">
            {nextActionTitle}
          </p>
        </div>
      </div>

      {/* Progress & Actions */}
      <div className="pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="flex items-center gap-1">
            <ListTodo className="w-3.5 h-3.5 text-emerald-400" />
            Task Progress
          </span>
          <span className="font-semibold text-slate-200 font-mono">
            {completedCount} / {totalCount} ({percent}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-4 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          {onDelete ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(caseItem.id);
              }}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              title="Delete Case"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : <div />}

          <Link
            to={`/cases/${caseItem.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-indigo transition-all transform group-hover:translate-x-0.5"
          >
            <span>Continue Case</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
