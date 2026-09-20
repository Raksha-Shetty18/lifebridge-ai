import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-brand-400" />
  };

  const borders = {
    success: 'border-emerald-500/40 bg-slate-900/95 shadow-glow-emerald',
    error: 'border-rose-500/40 bg-slate-900/95 shadow-glow-rose',
    info: 'border-brand-500/40 bg-slate-900/95 shadow-glow-indigo'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${borders[toast.type || 'info']} text-white text-sm backdrop-blur-xl shadow-2xl max-w-md`}>
        {icons[toast.type || 'info']}
        <p className="flex-1 text-slate-100 font-medium">{toast.message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
