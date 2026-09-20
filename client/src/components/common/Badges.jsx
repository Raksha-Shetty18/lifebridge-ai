import React from 'react';
import { ShieldCheck, AlertTriangle, Flame, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function UrgencyBadge({ urgency }) {
  const map = {
    low: {
      label: 'Standard Priority',
      bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      icon: Clock
    },
    medium: {
      label: 'Action Required',
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: AlertCircle
    },
    high: {
      label: 'High Urgency (Time-Sensitive)',
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse',
      icon: AlertTriangle
    },
    emergency: {
      label: '🚨 Immediate Emergency',
      bg: 'bg-red-600/20 text-red-300 border-red-500/50 animate-pulse font-bold',
      icon: Flame
    }
  };

  const current = map[urgency] || map.medium;
  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${current.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {current.label}
    </span>
  );
}

export function CategoryBadge({ category }) {
  const map = {
    education: { label: '🎓 Education', color: 'bg-blue-900/30 text-blue-300 border-blue-700/40' },
    career: { label: '💼 Career', color: 'bg-purple-900/30 text-purple-300 border-purple-700/40' },
    civic: { label: '🏛️ Civic Services', color: 'bg-cyan-900/30 text-cyan-300 border-cyan-700/40' },
    financial_safety: { label: '💰 Financial Safety', color: 'bg-amber-900/30 text-amber-300 border-amber-700/40' },
    documents: { label: '📄 Documents', color: 'bg-emerald-900/30 text-emerald-300 border-emerald-700/40' },
    urgent: { label: '🚨 Urgent Crisis', color: 'bg-rose-900/30 text-rose-300 border-rose-700/40' }
  };

  const current = map[category] || { label: category, color: 'bg-slate-800 text-slate-300 border-slate-700' };

  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border ${current.color}`}>
      {current.label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    active: { label: 'Active', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    in_progress: { label: 'In Progress', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    waiting: { label: 'Waiting on Authority', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    resolved: { label: 'Resolved', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' }
  };

  const current = map[status] || map.active;

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${current.bg}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {current.label}
    </span>
  );
}

export function VerifiedSourceBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
      <ShieldCheck className="w-3 h-3 text-emerald-400" />
      Verified Official Source
    </span>
  );
}
