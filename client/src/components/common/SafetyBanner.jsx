import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  PhoneCall, 
  Info, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export default function SafetyBanner({ 
  variant = 'warning', 
  title, 
  message, 
  notes = [],
  showEmergencyHotlines = false,
  showFinancialReminder = false
}) {
  const isEmergency = variant === 'emergency';
  const isHigh = variant === 'high';
  const isWarning = variant === 'warning';

  if (isEmergency) {
    return (
      <div 
        role="alert" 
        className="p-5 sm:p-6 rounded-3xl bg-rose-950/40 border border-rose-500/40 text-rose-200 space-y-3"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 shrink-0">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-900/60 text-rose-200 border border-rose-700/60">
                Immediate Action Required
              </span>
              <span className="text-xs font-semibold text-rose-400">Emergency Protocol</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {title || 'Urgent Life-Safety Notice'}
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
              {message || 'If you or someone else is in immediate physical danger, medical crisis, or severe distress, contact official emergency dispatch directly.'}
            </p>
          </div>
        </div>

        {/* Emergency Helplines Callout */}
        <div className="pt-3 border-t border-rose-800/40 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href="tel:112"
            className="p-3 rounded-2xl bg-rose-900/40 hover:bg-rose-900/60 border border-rose-700/50 flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-rose-300" />
              <div>
                <span className="text-xs font-bold text-white block">National Emergency Dispatch</span>
                <span className="text-[11px] text-rose-300">Police, Fire, Ambulance (24/7)</span>
              </div>
            </div>
            <span className="text-base font-black font-mono text-white">112</span>
          </a>

          <a
            href="tel:14416"
            className="p-3 rounded-2xl bg-rose-900/40 hover:bg-rose-900/60 border border-rose-700/50 flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-rose-300" />
              <div>
                <span className="text-xs font-bold text-white block">Tele-MANAS Crisis Line</span>
                <span className="text-[11px] text-rose-300">Confidential Psychological Support (24/7)</span>
              </div>
            </div>
            <span className="text-base font-black font-mono text-white">14416</span>
          </a>
        </div>
      </div>
    );
  }

  if (isHigh || isWarning) {
    return (
      <div 
        role="alert" 
        className="p-5 rounded-3xl bg-amber-950/30 border border-amber-500/30 text-amber-200 space-y-3"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="space-y-1 flex-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-300 border border-amber-700/50">
              Safety & Verification Notice
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              {title || 'Important Procedural Caution'}
            </h4>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {message || 'This action roadmap is structured guidance. Official deadlines and decisions rest with the competent authority. Confirm requirements directly with the verified source.'}
            </p>

            {/* Render any specific safety notes */}
            {notes && notes.length > 0 && (
              <ul className="space-y-1.5 pt-2 text-xs text-amber-200 list-disc list-inside">
                {notes.map((note, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
            )}

            {/* Financial Safety Prompt */}
            {showFinancialReminder && (
              <div className="mt-3 p-3 rounded-2xl bg-amber-900/30 border border-amber-800/40 text-xs text-amber-100 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Financial Security Rule:</strong> Never share OTPs, banking PINs, or install remote access apps (AnyDesk, TeamViewer) from unsolicited links or SMS messages. Call <strong>1930</strong> immediately if fraudulent transfers occurred.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Info variant
  return (
    <div 
      role="region" 
      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 flex items-start gap-3"
    >
      <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
      <div className="text-xs space-y-0.5">
        <span className="font-semibold text-white block">
          {title || 'Guidance, Not Legal Authority'}
        </span>
        <p className="text-slate-400 leading-relaxed">
          {message || 'LifeBridge assists with procedural navigation. Always cross-check official eligibility rules on designated government portals before submitting formal petitions.'}
        </p>
      </div>
    </div>
  );
}
