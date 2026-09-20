import React from 'react';
import { 
  Building2, 
  ExternalLink, 
  PhoneCall, 
  ShieldCheck, 
  Info, 
  HelpCircle,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function ResourceCard({ resource, onOpenDetail }) {
  if (!resource) return null;

  const isOfficial = resource.official === true || resource.trust_level === 'OFFICIAL';
  const isVerified = resource.verified === true || resource.trust_level === 'VERIFIED';
  const isHelpline = resource.source_type === 'statutory_helpline' || resource.source_type === 'helpline';

  const getTrustBadge = () => {
    if (isOfficial) {
      if (isHelpline) {
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-700/50 font-semibold">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>✓ Statutory Helpline</span>
          </span>
        );
      }
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 font-semibold">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>✓ Official Government Source</span>
        </span>
      );
    }

    if (isVerified) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-700/50 font-semibold">
          <ShieldCheck className="w-3 h-3 text-blue-400" />
          <span>✓ Verified Service</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-700 font-medium">
        <Info className="w-3 h-3 text-slate-400" />
        <span>General Information</span>
      </span>
    );
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group relative overflow-hidden">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          {getTrustBadge()}
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-500" />
            {resource.region || 'India'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-300 transition-colors mb-1">
          {resource.title || resource.name}
        </h3>

        {/* Organization / Ministry */}
        {resource.organization && (
          <p className="text-xs font-semibold text-slate-400 mb-2.5">
            {resource.organization}
          </p>
        )}

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
          {resource.description || resource.purpose}
        </p>

        {/* Helpline / Phone Info (if available) */}
        {(resource.phone || resource.helpline) && (
          <div className="mb-4 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Helpline:</span>
            </div>
            <a
              href={`tel:${resource.phone || resource.helpline}`}
              className="font-mono font-bold text-amber-300 hover:underline"
            >
              {resource.phone || resource.helpline}
            </a>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {onOpenDetail ? (
          <button
            type="button"
            onClick={() => onOpenDetail(resource)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>
        ) : <div />}

        {resource.url && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-xs font-semibold transition-all ml-auto shadow-sm"
          >
            <span>{isOfficial ? 'Open Official Portal' : 'Open Resource'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
