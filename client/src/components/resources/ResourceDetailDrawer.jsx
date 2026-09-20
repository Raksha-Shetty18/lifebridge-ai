import React, { useEffect } from 'react';
import { 
  X, 
  Building2, 
  ExternalLink, 
  PhoneCall, 
  ShieldCheck, 
  Info, 
  Clock, 
  MapPin, 
  FileText,
  ShieldAlert
} from 'lucide-react';

export default function ResourceDetailDrawer({ resource, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  const isOfficial = resource.official === true || resource.trust_level === 'OFFICIAL';
  const isVerified = resource.verified === true || resource.trust_level === 'VERIFIED';
  const isHelpline = resource.source_type === 'statutory_helpline' || resource.source_type === 'helpline';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
          
          <div className="space-y-6">
            {/* Header with Close */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Resource Details
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badge & Title */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isOfficial ? (
                  <span className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>✓ Official Government Source</span>
                  </span>
                ) : isVerified ? (
                  <span className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-700/50 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>✓ Verified Service</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>General Information</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                {resource.title || resource.name}
              </h2>

              {resource.organization && (
                <p className="text-xs font-semibold text-brand-300">
                  {resource.organization}
                </p>
              )}
            </div>

            {/* Description & Purpose */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Purpose & Statutory Mandate
                </span>
                <p className="leading-relaxed text-slate-200">
                  {resource.description || resource.purpose}
                </p>
              </div>

              {/* Metadata Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>Jurisdiction</span>
                  </div>
                  <span className="text-xs font-bold text-white">
                    {resource.region || 'India (National)'}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>Availability</span>
                  </div>
                  <span className="text-xs font-bold text-white">
                    {resource.availability || '24x7 Portal'}
                  </span>
                </div>
              </div>

              {/* Helpline Contact */}
              {(resource.phone || resource.helpline) && (
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-amber-200 font-bold block">Official Helpline</span>
                      <span className="text-[11px] text-slate-400">Toll-free / Statutory assistance</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${resource.phone || resource.helpline}`}
                    className="text-sm font-mono font-black text-amber-300 hover:underline"
                  >
                    {resource.phone || resource.helpline}
                  </a>
                </div>
              )}
            </div>

            {/* Non-Authority Disclaimer */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldAlert className="w-4 h-4 text-brand-400" />
                <span>LifeBridge Trust Policy</span>
              </div>
              <p className="leading-relaxed">
                LifeBridge provides structured problem navigation and does not act as an official administrative authority. Official deadlines, dispute resolutions, and formal application approvals are governed solely by the respective department or portal.
              </p>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-6 border-t border-slate-800">
            {resource.url ? (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-glow-indigo transition-all"
              >
                <span>{isOfficial ? 'Open Official Portal' : 'Open Resource Website'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <button
                disabled
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed text-center"
              >
                Online Portal Not Required / Dial Helpline
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
