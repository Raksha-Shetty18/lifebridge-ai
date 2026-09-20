import React from 'react';
import { ShieldAlert, FileText, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
          <FileText className="w-4 h-4" />
          <span>Terms of Use & Disclaimer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-400">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>1. Informational Navigation Disclaimer</span>
          </h2>
          <p>
            LifeBridge AI is an informational decision-support tool. It assists users by breaking down complex administrative, career, academic, and document processes into organized roadmaps. LifeBridge AI does <strong>not</strong> provide binding legal, medical, financial, or governmental decisions.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>2. Emergency Situations</span>
          </h2>
          <p>
            If you are in immediate physical danger, experiencing medical distress, or facing urgent emergency situations, you must contact local emergency dispatch (e.g. 112 / 1930 / 14416) or law enforcement immediately.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <span>3. Verification of Official Rules & Deadlines</span>
          </h2>
          <p>
            Government and institutional policies, deadlines, and fee structures change over time. Users are advised to verify all critical submissions directly through official nodal officers or statutory government websites.
          </p>
        </div>
      </div>
    </div>
  );
}
