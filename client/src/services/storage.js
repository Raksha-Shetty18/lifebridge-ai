/**
 * LifeBridge AI - Persistent Storage & Case Management Service
 * Local-First architecture: LocalStorage + State with optimistic background sync to backend / Supabase.
 */

import { API_BASE } from './api.js';

const STORAGE_KEY = 'lifebridge_cases_v1';
const ACTIVE_CASE_KEY = 'lifebridge_active_case_id';

/**
 * Calculates deterministic progress percentage from checklist and action steps.
 * Single source of truth formula: (completed checklist items / total checklist items) * 100
 */
export function calculateProgress(checklist = [], actionSteps = []) {
  if (!Array.isArray(checklist) || checklist.length === 0) {
    if (Array.isArray(actionSteps) && actionSteps.length > 0) {
      const completedSteps = actionSteps.filter(s => s.status === 'completed').length;
      return Math.round((completedSteps / actionSteps.length) * 100);
    }
    return 0;
  }
  const completed = checklist.filter(item => Boolean(item.completed)).length;
  const total = checklist.length;
  return Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
}

/**
 * Normalize and sanitize a case object with all required fields.
 */
export function normalizeCase(caseData) {
  const id = caseData.id || `case_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const now = new Date().toISOString();

  // Ensure checklist items have unique IDs
  const rawChecklist = Array.isArray(caseData.checklist) ? caseData.checklist : [];
  const checklist = rawChecklist.map((item, idx) => ({
    id: item.id || `chk_${id}_${idx}_${Math.random().toString(36).substr(2, 4)}`,
    title: item.title || 'Task',
    category: item.category || 'general',
    completed: Boolean(item.completed),
    linked_step: item.linked_step || null
  }));

  // Ensure action steps have structured data
  const rawSteps = Array.isArray(caseData.action_steps) ? caseData.action_steps : [];
  const action_steps = rawSteps.map((step, idx) => ({
    step_number: step.step_number || idx + 1,
    title: step.title || `Step ${idx + 1}`,
    description: step.description || '',
    why_it_matters: step.why_it_matters || '',
    documents: Array.isArray(step.documents) ? step.documents : [],
    action_type: step.action_type || 'portal_check',
    status: step.status || 'pending'
  }));

  const progress = calculateProgress(checklist, action_steps);

  const rawActivity = Array.isArray(caseData.activity) ? caseData.activity : [];
  const activity = rawActivity.length > 0 ? rawActivity : [
    {
      id: `act_${Date.now()}_init`,
      type: 'case_created',
      title: 'Case Created',
      description: 'AI action roadmap structured and initialized.',
      timestamp: caseData.created_at || now
    }
  ];

  const rawFollowups = Array.isArray(caseData.followups) ? caseData.followups : [];

  return {
    id,
    title: caseData.title || 'Problem Action Plan',
    category: caseData.category || 'civic',
    urgency: caseData.urgency || 'medium',
    problem_summary: caseData.problem_summary || caseData.description || '',
    original_description: caseData.original_description || caseData.problem_summary || '',
    immediate_action: caseData.immediate_action || {
      title: 'Review action roadmap',
      why: 'Understand key milestones before starting.',
      action_type: 'portal_check'
    },
    action_steps,
    checklist,
    resources: Array.isArray(caseData.resources) ? caseData.resources : [],
    safety_notes: Array.isArray(caseData.safety_notes) ? caseData.safety_notes : (caseData.warnings || []),
    missing_information: Array.isArray(caseData.missing_information) ? caseData.missing_information : [],
    follow_up_questions: Array.isArray(caseData.follow_up_questions) ? caseData.follow_up_questions : [],
    followups: rawFollowups,
    activity,
    status: caseData.status || (progress === 100 ? 'completed' : 'active'),
    progress,
    sync_status: caseData.sync_status || 'synced',
    created_at: caseData.created_at || now,
    updated_at: now,
    completed_at: caseData.completed_at || (progress === 100 ? now : null)
  };
}

/**
 * Fetch all saved cases from LocalStorage.
 */
export function getSavedCases() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(c => normalizeCase(c));
  } catch (e) {
    console.error('[LifeBridge Storage] Failed to read cases:', e);
    return [];
  }
}

/**
 * Fetch a single case by ID.
 */
export function getCaseById(caseId) {
  if (!caseId) return null;
  const cases = getSavedCases();
  return cases.find(c => c.id === caseId) || null;
}

/**
 * Save or update a case locally and fire background sync to backend.
 */
export function saveCase(caseData) {
  try {
    const normalized = normalizeCase(caseData);
    const cases = getSavedCases();

    const existingIndex = cases.findIndex(c => c.id === normalized.id);
    if (existingIndex >= 0) {
      cases[existingIndex] = {
        ...cases[existingIndex],
        ...normalized,
        created_at: cases[existingIndex].created_at || normalized.created_at
      };
    } else {
      cases.unshift(normalized);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
    localStorage.setItem(ACTIVE_CASE_KEY, normalized.id);

    // Background sync to backend (non-blocking)
    fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(normalized)
    }).catch(err => {
      console.warn('[LifeBridge Storage] Background case sync pending:', err.message);
    });

    return normalized;
  } catch (e) {
    console.error('[LifeBridge Storage] Failed to save case:', e);
    return normalizeCase(caseData);
  }
}

/**
 * Update case status ('active' | 'in_progress' | 'waiting' | 'completed').
 */
export function updateCaseStatus(caseId, newStatus) {
  const cases = getSavedCases();
  const target = cases.find(c => c.id === caseId);
  if (target) {
    target.status = newStatus;
    target.updated_at = new Date().toISOString();
    if (newStatus === 'completed') {
      target.completed_at = target.updated_at;
    }

    // Log activity
    target.activity = target.activity || [];
    target.activity.push({
      id: `act_${Date.now()}_status`,
      type: 'status_changed',
      title: 'Status Updated',
      description: `Case marked as ${newStatus.replace('_', ' ').toUpperCase()}`,
      timestamp: target.updated_at
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));

    fetch(`${API_BASE}/cases/${caseId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }).catch(() => {});
  }
  return target;
}

/**
 * Update case checklist items and recalculate progress.
 */
export function updateCaseChecklist(caseId, updatedChecklist) {
  const cases = getSavedCases();
  const target = cases.find(c => c.id === caseId);
  if (target) {
    target.checklist = updatedChecklist;
    const newProgress = calculateProgress(updatedChecklist, target.action_steps);
    target.progress = newProgress;
    target.updated_at = new Date().toISOString();

    if (newProgress === 100 && target.status !== 'completed') {
      target.status = 'completed';
      target.completed_at = target.updated_at;
      target.activity = target.activity || [];
      target.activity.push({
        id: `act_${Date.now()}_complete`,
        type: 'case_completed',
        title: 'All Tasks Completed',
        description: 'You completed all required checklist tasks for this case.',
        timestamp: target.updated_at
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));

    fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(target)
    }).catch(() => {});
  }
  return target;
}

/**
 * Update step status (e.g., 'pending' | 'in_progress' | 'completed').
 */
export function updateCaseStepStatus(caseId, stepNumber, newStatus) {
  const cases = getSavedCases();
  const target = cases.find(c => c.id === caseId);
  if (target) {
    target.action_steps = (target.action_steps || []).map(s => {
      if (s.step_number === stepNumber) {
        return { ...s, status: newStatus };
      }
      return s;
    });

    target.updated_at = new Date().toISOString();
    target.activity = target.activity || [];
    target.activity.push({
      id: `act_${Date.now()}_step_${stepNumber}`,
      type: 'step_updated',
      title: `Step ${stepNumber} ${newStatus.replace('_', ' ')}`,
      description: `Marked Step ${stepNumber} as ${newStatus}`,
      timestamp: target.updated_at
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));

    fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(target)
    }).catch(() => {});
  }
  return target;
}

/**
 * Add user follow-up answer and log to case history.
 */
export function addFollowupAnswer(caseId, questionId, questionText, answerText) {
  const cases = getSavedCases();
  const target = cases.find(c => c.id === caseId);
  if (target) {
    target.followups = target.followups || [];
    target.followups.push({
      question_id: questionId,
      question: questionText,
      answer: answerText,
      answered_at: new Date().toISOString()
    });

    // Remove answered question from pending list
    if (target.follow_up_questions) {
      target.follow_up_questions = target.follow_up_questions.filter(q => q.id !== questionId);
    }

    target.activity = target.activity || [];
    target.activity.push({
      id: `act_${Date.now()}_followup`,
      type: 'followup_answered',
      title: 'Provided Additional Context',
      description: `Answered "${questionText}" with "${answerText}"`,
      timestamp: new Date().toISOString()
    });

    target.updated_at = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));

    fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(target)
    }).catch(() => {});
  }
  return target;
}

/**
 * Delete a case.
 */
export function deleteCase(caseId) {
  try {
    const cases = getSavedCases().filter(c => c.id !== caseId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));

    const activeId = localStorage.getItem(ACTIVE_CASE_KEY);
    if (activeId === caseId) {
      localStorage.removeItem(ACTIVE_CASE_KEY);
    }

    fetch(`${API_BASE}/cases/${caseId}`, {
      method: 'DELETE'
    }).catch(() => {});

    return true;
  } catch (e) {
    console.error('[LifeBridge Storage] Failed to delete case:', e);
    return false;
  }
}

/**
 * Calculate dynamic, strictly calculated dashboard metrics.
 */
export function getDashboardStats() {
  const cases = getSavedCases();
  const total = cases.length;
  const activeCases = cases.filter(c => c.status === 'active' || c.status === 'in_progress');
  const activeCount = activeCases.length;
  const completedCount = cases.filter(c => c.status === 'completed' || c.status === 'resolved').length;
  
  // Calculate total tasks remaining across all active cases
  let tasksRemaining = 0;
  let totalTasks = 0;
  let totalProgressSum = 0;

  cases.forEach(c => {
    const checklist = c.checklist || [];
    const pendingInCase = checklist.filter(item => !item.completed).length;
    tasksRemaining += pendingInCase;
    totalTasks += checklist.length;
    totalProgressSum += (c.progress || 0);
  });

  const overallProgress = total > 0 ? Math.round(totalProgressSum / total) : 0;

  return {
    total,
    activeCount,
    completedCount,
    tasksRemaining,
    overallProgress
  };
}

/**
 * Get the most recently active case for the "Continue Where You Left Off" spotlight.
 */
export function getMostRecentActiveCase() {
  const cases = getSavedCases();
  if (cases.length === 0) return null;

  // Prefer active or in_progress cases sorted by updated_at descending
  const activeCases = cases
    .filter(c => c.status !== 'completed' && c.status !== 'resolved')
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  if (activeCases.length > 0) {
    return activeCases[0];
  }

  // Fallback to most recent case overall
  return cases.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];
}
