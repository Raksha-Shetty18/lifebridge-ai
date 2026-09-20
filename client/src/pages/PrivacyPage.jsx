import React from 'react';
import { ShieldCheck, Lock, EyeOff, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Data Sovereignty</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-400">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-400" />
            <span>1. Local-First Case Storage</span>
          </h2>
          <p>
            LifeBridge AI defaults to local browser storage (`localStorage`) for your cases, action steps, and checklists. Your personal situation descriptions are not sold, broadcasted, or retained for commercial tracking.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-cyan-400" />
            <span>2. Zero Third-Party Advertising</span>
          </h2>
          <p>
            We do not host third-party tracking cookies or behavioral advertisers. When you query our reasoning engine, inputs are processed strictly to structure your procedural action roadmap.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            <span>3. External Official Portals</span>
          </h2>
          <p>
            Links provided within LifeBridge point directly to verified government portals (e.g., National Scholarship Portal, DigiLocker, Cyber Crime Reporting Portal). When navigating external statutory portals, their respective privacy policies apply.
          </p>
        </div>
      </div>
    </div>
  );
}
