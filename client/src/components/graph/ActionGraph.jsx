import React, { useState, useRef, useEffect } from 'react';
import { 
  GitFork, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ExternalLink, 
  X,
  Info,
  Maximize2
} from 'lucide-react';

export default function ActionGraph({ plan, checklist = [], completedChecklistIds = [] }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  if (!plan) return null;

  // Build Graph Nodes from the Plan
  const nodes = [
    {
      id: 'node_situation',
      type: 'situation',
      title: 'Your Situation',
      subtitle: plan.category?.toUpperCase() || 'GENERAL',
      desc: plan.problem_summary,
      status: 'active',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      dotColor: '#6366f1',
      x: 50,
      y: 120
    },
    {
      id: 'node_analysis',
      type: 'analysis',
      title: 'AI Understanding & Triage',
      subtitle: `URGENCY: ${plan.urgency?.toUpperCase() || 'MEDIUM'}`,
      desc: plan.immediate_action ? `Immediate priority: ${plan.immediate_action.title}` : 'Situation triaged.',
      status: 'active',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      dotColor: '#06b6d4',
      x: 280,
      y: 120
    }
  ];

  // Add Action Steps as middle nodes
  const steps = plan.action_steps || [];
  steps.forEach((step, index) => {
    const isStepDone = completedChecklistIds.length >= (index + 1);
    nodes.push({
      id: `node_step_${step.step_number || index + 1}`,
      type: 'step',
      stepNumber: step.step_number || index + 1,
      title: `Step ${step.step_number || index + 1}: ${step.title}`,
      subtitle: step.action_type || 'ACTION',
      desc: step.description,
      why: step.why_it_matters,
      documents: step.documents || [],
      status: isStepDone ? 'completed' : 'pending',
      badgeColor: isStepDone 
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
        : 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      dotColor: isStepDone ? '#10b981' : '#f59e0b',
      x: 520 + (index * 220),
      y: 120
    });
  });

  // Add Resources & Resolution Nodes at the end
  const lastStepX = 520 + (steps.length * 220);
  nodes.push(
    {
      id: 'node_resources',
      type: 'resources',
      title: 'Verified Official Gateways',
      subtitle: `${(plan.resources || []).length} VERIFIED SOURCES`,
      desc: 'Official nodal departments, grievance portals, and hotlines.',
      resources: plan.resources || [],
      status: 'active',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      dotColor: '#3b82f6',
      x: lastStepX,
      y: 60
    },
    {
      id: 'node_resolution',
      type: 'resolution',
      title: 'Case Resolution & Verification',
      subtitle: 'GOAL STATE',
      desc: 'All procedural documents filed and grievance acknowledged.',
      status: completedChecklistIds.length === checklist.length && checklist.length > 0 ? 'completed' : 'pending',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      dotColor: '#10b981',
      x: lastStepX,
      y: 180
    }
  );

  const totalWidth = lastStepX + 220;

  return (
    <div className={`glass-panel rounded-3xl border border-slate-800 p-5 sm:p-6 transition-all ${
      isFullscreen ? 'fixed inset-4 z-50 overflow-auto bg-slate-950/95 border-brand-500/50' : 'relative'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Interactive Action Graph</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                TOPOLOGY MAP
              </span>
            </div>
            <p className="text-xs text-slate-400">Click any node to inspect details, required documents, & dependencies.</p>
          </div>
        </div>

        {/* Graph Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.6))}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div 
        ref={containerRef}
        className="w-full overflow-x-auto pb-4 custom-scrollbar rounded-2xl bg-slate-950/60 border border-slate-900 p-4"
      >
        <div 
          style={{ 
            width: `${totalWidth}px`, 
            height: '270px',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left',
            transition: 'transform 0.15s ease-out'
          }}
          className="relative"
        >
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: totalWidth, height: 270 }}>
            <defs>
              <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="edgeGradientSuccess" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Path 1: Situation to Analysis */}
            <path
              d="M 230 120 L 280 120"
              stroke="url(#edgeGradient)"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              className="animate-pulse"
            />

            {/* Path 2: Analysis to Step 1 */}
            {steps.length > 0 && (
              <path
                d="M 460 120 L 520 120"
                stroke="url(#edgeGradient)"
                strokeWidth="2.5"
              />
            )}

            {/* Path 3: Between Steps */}
            {steps.map((_, idx) => {
              if (idx === steps.length - 1) return null;
              const startX = 520 + (idx * 220) + 180;
              const endX = 520 + ((idx + 1) * 220);
              return (
                <path
                  key={idx}
                  d={`M ${startX} 120 L ${endX} 120`}
                  stroke="url(#edgeGradient)"
                  strokeWidth="2.5"
                />
              );
            })}

            {/* Path 4: Last step to Resources & Resolution */}
            {steps.length > 0 && (
              <>
                <path
                  d={`M ${lastStepX - 40} 120 C ${lastStepX - 10} 120, ${lastStepX - 10} 60, ${lastStepX} 60`}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d={`M ${lastStepX - 40} 120 C ${lastStepX - 10} 120, ${lastStepX - 10} 180, ${lastStepX} 180`}
                  stroke="#10b981"
                  strokeWidth="2"
                  fill="none"
                />
              </>
            )}
          </svg>

          {/* Render Graph Nodes */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y - 45}px`,
                  width: '180px'
                }}
                className={`absolute p-3 rounded-2xl cursor-pointer transition-all duration-200 select-none ${
                  isSelected
                    ? 'ring-2 ring-brand-400 bg-slate-800 shadow-glow-indigo scale-105 z-20'
                    : 'glass-card hover:border-brand-500/50 hover:scale-102 z-10'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${node.badgeColor}`}>
                    {node.subtitle}
                  </span>
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: node.dotColor }} 
                  />
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-1">
                  {node.title}
                </h4>

                <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                  {node.desc}
                </p>

                <div className="mt-2 pt-1 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-brand-300 font-medium">
                  <span>Inspect</span>
                  <Info className="w-3 h-3 text-brand-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Inspector Modal / Drawer */}
      {selectedNode && (
        <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-brand-500/40 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase border ${selectedNode.badgeColor}`}>
                {selectedNode.subtitle}
              </span>
              <h4 className="text-sm font-bold text-white">{selectedNode.title}</h4>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            {selectedNode.desc}
          </p>

          {selectedNode.why && (
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 mb-3">
              <span className="font-semibold text-accent-cyan">Why it matters: </span>
              {selectedNode.why}
            </div>
          )}

          {selectedNode.type === 'resources' && selectedNode.resources && selectedNode.resources.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-slate-400 block">Verified Official Gateways:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedNode.resources.map((res, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200 block line-clamp-1">{res.title || res.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        {res.official ? '✓ Official Source' : 'Verified Service'}
                      </span>
                    </div>
                    {res.url && (
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white transition-colors"
                        title="Open Official Portal"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedNode.documents && selectedNode.documents.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400">Required:</span>
              {selectedNode.documents.map((doc, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-200">
                  {doc}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
