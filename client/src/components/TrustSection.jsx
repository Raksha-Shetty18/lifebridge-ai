import React from 'react';
import { ShieldCheck, Flame, PhoneCall, CheckCircle, Info } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="py-16 bg-slate-900/40 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Guidance, not authority.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Ethical AI boundaries and responsible navigation principles.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            LifeBridge helps users understand possible next steps and locate relevant resources. It does <strong className="text-white">not</strong> replace doctors, lawyers, financial professionals, emergency services, or government authorities. All procedural steps are grounded in verified statutory sources.
          </p>

          {/* Emergency Crisis Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40 shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-red-200">
                  Immediate Danger Protocol
                </h3>
                <p className="text-xs text-red-300/80 mt-0.5">
                  If you are in immediate danger, contact your local emergency service.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <a
                href="tel:112"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call 112</span>
              </a>
              <a
                href="tel:1930"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Cyber 1930</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
