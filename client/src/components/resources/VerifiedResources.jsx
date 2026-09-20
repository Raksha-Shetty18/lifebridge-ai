import React, { useState } from 'react';
import { ShieldCheck, Building2, ExternalLink } from 'lucide-react';
import ResourceCard from './ResourceCard';
import ResourceDetailDrawer from './ResourceDetailDrawer';
import { VerifiedSourceBadge } from '../common/Badges';

export default function VerifiedResources({ resources = [] }) {
  const [activeResource, setActiveResource] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!resources || resources.length === 0) {
    return null;
  }

  const handleOpenDetail = (resource) => {
    setActiveResource(resource);
    setDrawerOpen(true);
  };

  return (
    <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-slate-800 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Relevant Official & Verified Resources</h3>
              <VerifiedSourceBadge />
            </div>
            <p className="text-xs text-slate-400">
              Direct access to competent administrative portals, statutory grievance channels, and verified hotlines.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res, idx) => (
          <ResourceCard
            key={res.id || idx}
            resource={res}
            onOpenDetail={handleOpenDetail}
          />
        ))}
      </div>

      {/* Resource Detail Drawer */}
      <ResourceDetailDrawer
        resource={activeResource}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
