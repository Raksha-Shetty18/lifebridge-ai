import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  analyzeProblem, 
  refinePlan 
} from '../services/api';
import { 
  saveCase, 
  updateCaseChecklist, 
  addFollowupAnswer,
  calculateProgress 
} from '../services/storage';
import { 
  Sparkles, 
  Bookmark, 
  Printer, 
  ArrowLeft, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Compass, 
  FileText,
  ListTodo,
  Layers,
  Building2,
  ExternalLink,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CategoryBadge, UrgencyBadge, StatusBadge } from '../components/common/Badges';
import NextActionCard from '../components/analysis/NextActionCard';
import ActionStepsList from '../components/analysis/ActionStepsList';
import ActionGraph from '../components/graph/ActionGraph';
import InteractiveChecklist from '../components/checklist/InteractiveChecklist';
import SmartFollowups from '../components/followups/SmartFollowups';
import VerifiedResources from '../components/resources/VerifiedResources';
import SafetyBanner from '../components/common/SafetyBanner';
import Toast from '../components/common/Toast';

const REASONING_STAGES = [
  { id: 1, text: 'Understanding your situation...' },
  { id: 2, text: 'Identifying what matters...' },
  { id: 3, text: 'Building your next steps...' },
  { id: 4, text: 'Checking relevant resources...' },
  { id: 5, text: 'Preparing your action plan...' }
];

export default function AnalyzePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [error, setError] = useState(null);
  const [caseObj, setCaseObj] = useState(null);
  const [isRefining, setIsRefining] = useState(false);
  const [toast, setToast] = useState(null);

  const problemText = location.state?.problem || location.state?.description || 'My scholarship application was rejected and I do not know what to do next.';
  const categoryHint = location.state?.category || null;

  useEffect(() => {
    let stageInterval = null;
    if (loading) {
      stageInterval = setInterval(() => {
        setCurrentStageIdx(prev => (prev < REASONING_STAGES.length - 1 ? prev + 1 : prev));
      }, 700);
    }
    return () => {
      if (stageInterval) clearInterval(stageInterval);
    };
  }, [loading]);

  useEffect(() => {
    let isMounted = true;
    async function runAnalysis() {
      setLoading(true);
      setCurrentStageIdx(0);
      setError(null);
      try {
        const result = await analyzeProblem(problemText, categoryHint);
        if (isMounted) {
          // Automatic Case Creation: Immediately construct and persist case locally & remotely
          const saved = saveCase({
            ...result,
            original_description: problemText,
            status: 'active'
          });
          setCaseObj(saved);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something interrupted the analysis. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    runAnalysis();
    return () => { isMounted = false; };
  }, [problemText, categoryHint]);

  const handleChecklistChange = (updatedChecklist) => {
    if (!caseObj) return;
    const updated = updateCaseChecklist(caseObj.id, updatedChecklist);
    if (updated) {
      setCaseObj({ ...updated });
    }
  };

  const handleRefineAnswer = async (qId, option) => {
    if (!caseObj) return;
    setIsRefining(true);
    try {
      const questionObj = (caseObj.follow_up_questions || []).find(q => q.id === qId);
      const questionText = questionObj ? questionObj.question : 'Follow-up Question';

      // Call refine endpoint
      const updated = await refinePlan(caseObj, qId, option);

      // Preserve previously completed checklist items & merge
      const saved = saveCase({
        ...updated,
        id: caseObj.id,
        created_at: caseObj.created_at,
        original_description: caseObj.original_description,
        activity: caseObj.activity || [],
        followups: caseObj.followups || []
      });

      // Log followup in history
      const finalCase = addFollowupAnswer(caseObj.id, qId, questionText, option);
      setCaseObj(finalCase || saved);

      setToast({
        type: 'info',
        message: 'Action roadmap refined and updated in your case!'
      });
    } catch (e) {
      console.error('Failed to refine plan:', e);
    } finally {
      setIsRefining(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-3xl bg-brand-600/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
            <Compass className="w-8 h-8 animate-spin text-brand-300" />
          </div>
          <div className="absolute -inset-2 bg-brand-500/20 blur-xl rounded-full pointer-events-none animate-pulseGlow" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">
          {REASONING_STAGES[currentStageIdx]?.text || 'Processing situation...'}
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          LifeBridge is converting your problem into an actionable, sequential roadmap.
        </p>

        {/* Staged Progress Indicator */}
        <div className="w-full max-w-md space-y-2.5 glass-panel p-5 rounded-3xl border border-slate-800 text-left">
          {REASONING_STAGES.map((stage, idx) => {
            const isDone = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            return (
              <div 
                key={stage.id} 
                className={`flex items-center justify-between text-xs px-3 py-2 rounded-xl transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-brand-950/60 border border-brand-500/40 text-brand-200' 
                    : isDone 
                      ? 'text-emerald-300 bg-slate-900/60' 
                      : 'text-slate-500 bg-slate-900/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] opacity-70">0{stage.id}</span>
                  <span className={isCurrent ? 'font-semibold' : ''}>{stage.text}</span>
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (error || !caseObj) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-3xl glass-panel border border-rose-500/30 space-y-4">
          <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Something interrupted the analysis</h2>
          <p className="text-sm text-slate-400">{error || 'Unable to build action plan right now.'}</p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow"
            >
              <span>Try Again</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const checklist = caseObj.checklist || [];
  const completedChecklistIds = checklist.filter(i => i.completed).map(i => i.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print pb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Problem Input</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Export / Print</span>
          </button>

          <Link
            to={`/cases/${caseObj.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-indigo transition-all"
          >
            <span>Open Case Tracking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Automatic Case Created Banner */}
      <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-200">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Case Created & Saved:</strong> Trackable case has been automatically added to your dashboard. Progress is saved locally in real time.
          </span>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-emerald-300 font-bold hover:underline shrink-0"
        >
          <span>View in Dashboard</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 1. TOP: Problem Title + Category + Urgency */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={caseObj.category} />
          <UrgencyBadge urgency={caseObj.urgency} />
          <StatusBadge status={caseObj.status} />
          <span className="text-xs font-mono text-slate-500 ml-auto flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Created: {new Date(caseObj.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {caseObj.title}
        </h1>

        {/* 2. MAIN: "Your Situation" Problem Summary */}
        <div className="pt-2 border-t border-slate-800/80 space-y-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Your Situation
          </span>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {caseObj.problem_summary}
          </p>
        </div>

        {/* Safety Notes / Warnings */}
        {((caseObj.safety_notes && caseObj.safety_notes.length > 0) || (caseObj.warnings && caseObj.warnings.length > 0)) && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            {(caseObj.safety_notes || caseObj.warnings)?.map((w, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/30 p-3 rounded-2xl border border-amber-800/40">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Safety Notice:</strong> {w}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. HIGHLIGHT: "What Should I Do Now?" (Immediate Action Spotlight) */}
      <NextActionCard immediateAction={caseObj.immediate_action} />

      {/* Safety & Warning Banner */}
      {(caseObj.urgency === 'emergency' || (caseObj.safety_notes && caseObj.safety_notes.length > 0) || caseObj.category === 'financial_safety') && (
        <SafetyBanner
          variant={caseObj.urgency === 'emergency' ? 'emergency' : 'high'}
          title={caseObj.urgency === 'emergency' ? 'Urgent Emergency Protocol' : 'Procedural & Financial Safety Notice'}
          notes={caseObj.safety_notes || []}
          showEmergencyHotlines={caseObj.urgency === 'emergency'}
          showFinancialReminder={caseObj.category === 'financial_safety'}
        />
      )}

      {/* 4. DYNAMIC ACTION GRAPH (Generated from actual AI response & live checklist) */}
      <ActionGraph 
        plan={caseObj} 
        checklist={checklist} 
        completedChecklistIds={completedChecklistIds} 
      />

      {/* 5. QUESTIONS THAT CAN IMPROVE YOUR PLAN (Smart Follow-Up Chips) */}
      {caseObj.follow_up_questions && caseObj.follow_up_questions.length > 0 && (
        <div className="space-y-2">
          <SmartFollowups 
            questions={caseObj.follow_up_questions} 
            onAnswerQuestion={handleRefineAnswer}
            isRefining={isRefining}
          />
        </div>
      )}

      {/* 6. TWO-COLUMN GRID: "Your Action Plan" & "What You May Need" */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: "Your Action Plan" */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-400" />
              <span>Your Action Plan</span>
              <span className="text-xs font-mono font-normal text-slate-400">
                ({caseObj.action_steps?.length || 0} milestones)
              </span>
            </h2>
          </div>
          <ActionStepsList steps={caseObj.action_steps} />
        </div>

        {/* Right Column: "What You May Need" (Checklist & Documents) */}
        <div className="space-y-6">
          <InteractiveChecklist 
            checklist={checklist} 
            onChecklistChange={handleChecklistChange} 
          />
        </div>
      </div>

      {/* 7. USEFUL RESOURCES (Verified Gateways) */}
      <VerifiedResources resources={caseObj.resources} />
    </div>
  );
}
