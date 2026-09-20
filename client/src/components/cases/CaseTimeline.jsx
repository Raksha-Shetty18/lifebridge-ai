import React from 'react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  HelpCircle, 
  Clock, 
  Calendar,
  Activity,
  Award
} from 'lucide-react';

export default function CaseTimeline({ activity = [] }) {
  if (!Array.isArray(activity) || activity.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center text-xs text-slate-400">
        <Activity className="w-5 h-5 text-slate-500 mx-auto mb-2" />
        <span>No activity recorded yet. Events will appear here as you take action.</span>
      </div>
    );
  }

  // Reverse chronological order for display
  const sortedEvents = [...activity].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const getEventMeta = (type) => {
    switch (type) {
      case 'case_created':
        return {
          icon: <Compass className="w-4 h-4 text-brand-400" />,
          bgColor: 'bg-brand-500/10 border-brand-500/30',
          badgeText: 'Created'
        };
      case 'step_updated':
        return {
          icon: <Layers className="w-4 h-4 text-blue-400" />,
          bgColor: 'bg-blue-500/10 border-blue-500/30',
          badgeText: 'Action Step'
        };
      case 'checklist_completed':
      case 'checklist_toggled':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          bgColor: 'bg-emerald-500/10 border-emerald-500/30',
          badgeText: 'Checklist'
        };
      case 'followup_answered':
        return {
          icon: <HelpCircle className="w-4 h-4 text-amber-400" />,
          bgColor: 'bg-amber-500/10 border-amber-500/30',
          badgeText: 'Context'
        };
      case 'status_changed':
        return {
          icon: <Clock className="w-4 h-4 text-purple-400" />,
          bgColor: 'bg-purple-500/10 border-purple-500/30',
          badgeText: 'Status'
        };
      case 'case_completed':
        return {
          icon: <Award className="w-4 h-4 text-emerald-300" />,
          bgColor: 'bg-emerald-500/20 border-emerald-400/50 shadow-glow-emerald',
          badgeText: 'Resolved'
        };
      default:
        return {
          icon: <Sparkles className="w-4 h-4 text-slate-400" />,
          bgColor: 'bg-slate-800 border-slate-700',
          badgeText: 'Event'
        };
    }
  };

  const formatEventTime = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } catch (e) {
      return 'Just now';
    }
  };

  return (
    <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">Case Activity Timeline</h3>
            <p className="text-[11px] text-slate-400">Chronological history of problem navigation milestones</p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          {activity.length} {activity.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
        {sortedEvents.map((evt, idx) => {
          const meta = getEventMeta(evt.type);
          return (
            <div key={evt.id || idx} className="relative group">
              {/* Dot / Icon */}
              <div className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full border flex items-center justify-center text-xs ${meta.bgColor} bg-slate-950`}>
                {meta.icon}
              </div>

              {/* Content */}
              <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-200">
                    {evt.title || 'Milestone Reached'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-600" />
                    {formatEventTime(evt.timestamp)}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
