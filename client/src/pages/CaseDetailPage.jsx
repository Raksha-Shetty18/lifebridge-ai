import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  getCaseById, 
  updateCaseStatus, 
  updateCaseChecklist, 
  updateCaseStepStatus,
  addFollowupAnswer,
  deleteCase,
  saveCase,
  calculateProgress
} from '../services/storage';
import { refinePlan, API_BASE } from '../services/api';
import { 
  ArrowLeft, 
  Printer, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Sparkles,
  Share2,
  AlertTriangle,
  Layers,
  Award,
  Zap,
  CheckSquare,
  HelpCircle,
  RotateCcw,
  Cloud,
  Check,
  Plus
} from 'lucide-react';
import { CategoryBadge, UrgencyBadge, StatusBadge } from '../components/common/Badges';
import NextActionCard from '../components/analysis/NextActionCard';
import ActionStepsList from '../components/analysis/ActionStepsList';
import ActionGraph from '../components/graph/ActionGraph';
import InteractiveChecklist from '../components/checklist/InteractiveChecklist';
import SmartFollowups from '../components/followups/SmartFollowups';
import VerifiedResources from '../components/resources/VerifiedResources';
import CaseTimeline from '../components/cases/CaseTimeline';
import SafetyBanner from '../components/common/SafetyBanner';
import Toast from '../components/common/Toast';
import confetti from 'canvas-confetti';

export default function CaseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseItem, setCaseItem] = useState(null);
  const [isRefining, setIsRefining] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaseData();
  }, [id]);

  const loadCaseData = async () => {
    setLoading(true);
    let found = getCaseById(id);

    // Fallback: try fetching from server if not found locally
    if (!found) {
      try {
        const res = await fetch(`${API_BASE}/cases/${id}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            found = saveCase(json.data);
          }
        }
      } catch (e) {
        console.warn('[LifeBridge AI] Failed to fetch case from server:', e.message);
      }
    }

    setCaseItem(found);
    setLoading(false);
  };

  const handleStatusChange = (newStatus) => {
    if (!caseItem) return;
    const updated = updateCaseStatus(caseItem.id, newStatus);
    setCaseItem({ ...caseItem, status: newStatus });
    setToast({
      type: 'success',
      message: `Case status marked as "${newStatus.replace('_', ' ').toUpperCase()}".`
    });

    if (newStatus === 'completed') {
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const handleChecklistUpdate = (updatedChecklist) => {
    if (!caseItem) return;
    const updated = updateCaseChecklist(caseItem.id, updatedChecklist);
    if (updated) {
      setCaseItem({ ...updated });
    }
  };

  const handleRefineAnswer = async (qId, option) => {
    if (!caseItem) return;
    setIsRefining(true);
    try {
      const questionObj = (caseItem.follow_up_questions || []).find(q => q.id === qId);
      const questionText = questionObj ? questionObj.question : 'Follow-up Question';

      const updatedPlan = await refinePlan(caseItem, qId, option);

      const saved = saveCase({
        ...updatedPlan,
        id: caseItem.id,
        created_at: caseItem.created_at,
        original_description: caseItem.original_description,
        activity: caseItem.activity || [],
        followups: caseItem.followups || []
      });

      const finalCase = addFollowupAnswer(caseItem.id, qId, questionText, option);
      setCaseItem(finalCase || saved);

      setToast({
        type: 'info',
        message: 'Case roadmap refined and saved!'
      });
    } catch (e) {
      console.error('Failed to refine plan:', e);
    } finally {
      setIsRefining(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this case roadmap?')) {
      deleteCase(caseItem.id);
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading Case Roadmap...</p>
        </div>
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Case Not Found</h2>
          <p className="text-sm text-slate-400">This case may have been removed or does not exist on this device.</p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              <span>Create New Case</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const checklist = caseItem.checklist || [];
  const completedChecklistIds = checklist.filter(i => i.completed).map(i => i.id);
  const totalTasks = checklist.length;
  const completedTasks = completedChecklistIds.length;
  const progressPercent = typeof caseItem.progress === 'number'
    ? caseItem.progress
    : (totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0);

  const isCompleted = progressPercent === 100 || caseItem.status === 'completed' || caseItem.status === 'resolved';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Bar Navigation & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print pb-2 border-b border-slate-800/80">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Dropdown Selector */}
          <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-[11px] font-semibold text-slate-400">Status:</span>
            <select
              value={caseItem.status || 'active'}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-brand-300 focus:outline-none cursor-pointer"
            >
              <option value="active" className="bg-slate-900 text-white">Active</option>
              <option value="in_progress" className="bg-slate-900 text-amber-300">In Progress</option>
              <option value="waiting" className="bg-slate-900 text-purple-300">Waiting on Authority</option>
              <option value="completed" className="bg-slate-900 text-emerald-400">Completed</option>
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors"
            title="Export / Print Case"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 text-xs transition-colors"
            title="Delete Case"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CASE COMPLETED BANNER (Celebration) */}
      {isCompleted && (
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-glow-emerald">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Case Completed
                </span>
                <span className="text-[11px] text-slate-400">
                  • Completed {new Date(caseItem.completed_at || caseItem.updated_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                You worked through this problem!
              </h3>
              <p className="text-xs text-slate-300">
                All {totalTasks} procedural tasks have been completed. This case is stored in your history.
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-indigo shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Start Another Case</span>
          </Link>
        </div>
      )}

      {/* Case Header Details */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={caseItem.category} />
          <UrgencyBadge urgency={caseItem.urgency} />
          <StatusBadge status={caseItem.status} />
          <span className="text-xs font-mono text-slate-500 ml-auto flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Last Updated: {new Date(caseItem.updated_at).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {caseItem.title}
        </h1>

        {/* Problem Summary */}
        <div className="pt-2 border-t border-slate-800/80 space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Your Situation
          </span>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {caseItem.problem_summary || caseItem.original_description}
          </p>
        </div>

        {/* Safety Notes / Warnings */}
        {((caseItem.safety_notes && caseItem.safety_notes.length > 0) || (caseItem.warnings && caseItem.warnings.length > 0)) && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            {(caseItem.safety_notes || caseItem.warnings)?.map((w, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/30 p-3 rounded-2xl border border-amber-800/40">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Safety Notice:</strong> {w}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Immediate Focus Spotlight */}
      <NextActionCard immediateAction={caseItem.immediate_action} />

      {/* Safety & Warning Banner */}
      {(caseItem.urgency === 'emergency' || (caseItem.safety_notes && caseItem.safety_notes.length > 0) || caseItem.category === 'financial_safety') && (
        <SafetyBanner
          variant={caseItem.urgency === 'emergency' ? 'emergency' : 'high'}
          title={caseItem.urgency === 'emergency' ? 'Urgent Emergency Protocol' : 'Procedural & Financial Safety Notice'}
          notes={caseItem.safety_notes || []}
          showEmergencyHotlines={caseItem.urgency === 'emergency'}
          showFinancialReminder={caseItem.category === 'financial_safety'}
        />
      )}

      {/* Progress Bar & Summary Metric */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Your Progress</h3>
          </div>
          <span className="text-sm font-mono font-bold text-emerald-400">
            {completedTasks} / {totalTasks} Tasks ({progressPercent}%)
          </span>
        </div>

        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-brand-500 via-accent-cyan to-emerald-400 transition-all duration-300 rounded-full shadow-glow-emerald"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Dynamic Action Graph */}
      <ActionGraph
        plan={caseItem}
        checklist={checklist}
        completedChecklistIds={completedChecklistIds}
      />

      {/* Smart Follow-Up Section */}
      {caseItem.follow_up_questions && caseItem.follow_up_questions.length > 0 && (
        <SmartFollowups
          questions={caseItem.follow_up_questions}
          onAnswerQuestion={handleRefineAnswer}
          isRefining={isRefining}
        />
      )}

      {/* Answered Follow-up History */}
      {caseItem.followups && caseItem.followups.length > 0 && (
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <HelpCircle className="w-4 h-4 text-brand-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Verified Context History
            </h3>
          </div>
          <div className="space-y-2">
            {caseItem.followups.map((f, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-slate-400 font-medium">{f.question}</span>
                  <div className="text-emerald-300 font-semibold mt-0.5 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Answer: {f.answer}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {new Date(f.answered_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roadmap & Checklist Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Action Roadmap Milestones */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-400" />
            <span>Action Roadmap Steps</span>
            <span className="text-xs font-mono font-normal text-slate-400">
              ({caseItem.action_steps?.length || 0} milestones)
            </span>
          </h2>
          <ActionStepsList steps={caseItem.action_steps || []} />
        </div>

        {/* Interactive Checklist */}
        <div className="space-y-6">
          <InteractiveChecklist
            checklist={checklist}
            onChecklistChange={handleChecklistUpdate}
          />
        </div>
      </div>

      {/* Case Timeline Activity Log */}
      <CaseTimeline activity={caseItem.activity || []} />

      {/* Verified Resources */}
      <VerifiedResources resources={caseItem.resources || []} />
    </div>
  );
}
