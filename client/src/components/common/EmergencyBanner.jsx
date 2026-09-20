import React from 'react';
import { Flame, PhoneCall, AlertTriangle, X } from 'lucide-react';

export default function EmergencyBanner({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="bg-gradient-to-r from-red-950/90 via-rose-950/90 to-red-950/90 border-y sm:border border-red-500/50 p-4 sm:p-5 rounded-none sm:rounded-2xl my-4 text-white shadow-glow-rose backdrop-blur-md relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-300 hover:text-white p-1 rounded-lg hover:bg-red-900/50"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-start gap-3.5">
        <div className="p-2.5 rounded-xl bg-red-600/30 border border-red-500/50 text-red-400 shrink-0">
          <Flame className="w-6 h-6 animate-pulse" />
        </div>

        <div className="flex-1 pr-6">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-red-200">
              Emergency & Safety Notice
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-600/40 border border-red-400/40 text-white">
              Immediate Danger Protocol
            </span>
          </div>

          <p className="text-sm text-red-100/90 mb-3 leading-relaxed">
            {data.message || 'If you or someone around you is in immediate physical danger, experiencing medical distress, or facing severe crisis, contact official emergency services immediately.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1">
            {(data.helplines || [
              { name: 'National Emergency', number: '112' },
              { name: 'Cyber Crime Helpline', number: '1930' },
              { name: 'Tele-MANAS Crisis Support', number: '14416' },
              { name: 'Women Helpline', number: '1091' }
            ]).map((h, i) => (
              <a
                key={i}
                href={`tel:${h.number.split('/')[0].trim()}`}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-900/40 hover:bg-red-800/60 border border-red-500/40 transition-colors text-xs"
              >
                <span className="text-red-200 font-medium truncate mr-2">{h.name}</span>
                <span className="font-mono font-bold text-white flex items-center gap-1 bg-red-600/50 px-2 py-0.5 rounded">
                  <PhoneCall className="w-3 h-3" />
                  {h.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
