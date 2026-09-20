/**
 * LifeBridge AI - Output Validator, Sanitizer & Anti-Generic Quality Assurance
 * Ensures strict adherence to the Pragmatic Problem Navigator JSON schema,
 * verified resource grounding, and content specificity.
 */

import { VERIFIED_RESOURCES_DIRECTORY, isSafeUrl } from '../routes/resources.js';

export const ALLOWED_CATEGORIES = ['education', 'career', 'civic', 'financial_safety', 'documents', 'urgent'];
export const ALLOWED_URGENCIES = ['low', 'medium', 'high', 'emergency'];

// Generic phrases that signal lazy or canned template responses
const GENERIC_REJECT_PATTERNS = [
  /understand your problem/i,
  /gather general information/i,
  /contact the relevant authority/i,
  /complete the required process/i,
  /track your progress/i,
  /take appropriate steps/i,
  /do what is necessary/i,
  /consult an expert to solve it/i,
  /follow standard protocol/i
];

/**
 * Assesses whether a generated plan is overly generic or repetitive.
 */
export function assessResponseQuality(plan, userInput = '') {
  const issues = [];
  const inputLower = (userInput || '').toLowerCase();

  if (!plan || typeof plan !== 'object') {
    return { valid: false, score: 0, issues: ['Response is not a valid object'] };
  }

  // 1. Check title & summary specificity
  if (!plan.title || plan.title.length < 5 || plan.title.toLowerCase() === 'action navigation roadmap') {
    issues.push('Title is missing or completely generic');
  }

  // 2. Check immediate action specificity
  if (!plan.immediate_action || !plan.immediate_action.title || plan.immediate_action.title.length < 10) {
    issues.push('Immediate action is missing or too brief');
  } else {
    for (const pattern of GENERIC_REJECT_PATTERNS) {
      if (pattern.test(plan.immediate_action.title)) {
        issues.push(`Immediate action contains generic boilerplate: "${plan.immediate_action.title}"`);
        break;
      }
    }
  }

  // 3. Check action steps
  if (!Array.isArray(plan.action_steps) || plan.action_steps.length < 2) {
    issues.push('Action plan has fewer than 2 steps');
  } else {
    let genericStepCount = 0;
    plan.action_steps.forEach((step, idx) => {
      const stepText = `${step.title || ''} ${step.description || ''}`;
      for (const pattern of GENERIC_REJECT_PATTERNS) {
        if (pattern.test(stepText)) {
          genericStepCount++;
          break;
        }
      }
    });

    if (genericStepCount >= 2) {
      issues.push(`Multiple action steps (${genericStepCount}) contain vague boilerplate`);
    }
  }

  // 4. Check follow up questions
  if (Array.isArray(plan.follow_up_questions) && plan.follow_up_questions.length > 0) {
    plan.follow_up_questions.forEach((q, idx) => {
      if (!q.options || q.options.length < 2) {
        issues.push(`Follow-up question ${idx + 1} has insufficient choices`);
      }
    });
  }

  const score = Math.max(0, 100 - (issues.length * 25));
  return {
    valid: issues.length === 0,
    score,
    issues
  };
}

/**
 * Validates and sanitizes AI-generated or fallback responses.
 */
export function validateAndSanitizeAIResponse(data, fallbackCategory = 'civic', metadata = {}) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid AI response: Expected a JSON object');
  }

  // 1. Category validation & inference
  const categoryRaw = (data.category || fallbackCategory || 'civic').toString().toLowerCase().trim();
  const category = ALLOWED_CATEGORIES.includes(categoryRaw) ? categoryRaw : 'civic';

  // 2. Urgency validation
  const urgencyRaw = (data.urgency || 'medium').toString().toLowerCase().trim();
  const urgency = ALLOWED_URGENCIES.includes(urgencyRaw) ? urgencyRaw : 'medium';

  // 3. Title & problem summary
  const title = (typeof data.title === 'string' && data.title.trim() && data.title.trim().length > 3)
    ? data.title.trim()
    : 'Action Navigation Roadmap';

  const problem_summary = (typeof data.problem_summary === 'string' && data.problem_summary.trim())
    ? data.problem_summary.trim()
    : 'Situation parsed and structured for sequential procedural resolution.';

  // 4. "What Should I Do Now?" Immediate Action (Exactly ONE single immediate step)
  let immediate_action = {
    title: 'Review official records and confirm immediate procedural deadline',
    why: 'Establishes verified factual grounding before initiating procedural steps.',
    action_type: 'portal_check'
  };

  if (data.immediate_action && typeof data.immediate_action === 'object') {
    immediate_action = {
      title: String(data.immediate_action.title || immediate_action.title).trim(),
      why: String(data.immediate_action.why || immediate_action.why).trim(),
      action_type: String(data.immediate_action.action_type || 'portal_check').trim()
    };
  }

  // 5. Missing Information list
  const missing_information = Array.isArray(data.missing_information)
    ? data.missing_information.map(item => String(item).trim()).filter(Boolean)
    : [];

  // 6. Smart Follow-Up Questions (1 to 3 questions max)
  const follow_up_questions = Array.isArray(data.follow_up_questions)
    ? data.follow_up_questions.slice(0, 3).map((q, idx) => ({
        id: q.id ? String(q.id).trim() : `q_${idx + 1}`,
        question: String(q.question || 'Please specify additional context:').trim(),
        options: Array.isArray(q.options) && q.options.length > 0
          ? q.options.map(opt => String(opt).trim()).filter(Boolean)
          : ['Yes, confirmed', 'No / Not yet', 'Need to check']
      }))
    : [];

  // 7. Action Steps (3 to 7 sequential steps)
  let action_steps = [];
  if (Array.isArray(data.action_steps) && data.action_steps.length > 0) {
    action_steps = data.action_steps.map((step, idx) => ({
      step_number: Number(step.step_number) || idx + 1,
      title: String(step.title || `Procedural Step ${idx + 1}`).trim(),
      description: String(step.description || 'Follow verified official guidelines for this step.').trim(),
      why_it_matters: String(step.why_it_matters || 'Essential procedural milestone toward resolution.').trim(),
      documents: Array.isArray(step.documents)
        ? step.documents.map(d => String(d).trim()).filter(Boolean)
        : [],
      action_type: String(step.action_type || 'action').trim(),
      status: 'pending'
    }));
  } else {
    action_steps = [
      {
        step_number: 1,
        title: 'Verify Records & Status on Designated Portal',
        description: 'Log into the designated institutional/government portal to check current status.',
        why_it_matters: 'Identifies the exact procedural bottleneck.',
        documents: ['Identity Proof', 'Application Reference ID'],
        action_type: 'portal_check',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'Prepare Rectified Supporting Documentation',
        description: 'Assemble all required supporting evidence matching official guidelines.',
        why_it_matters: 'Ensures compliance during nodal verification.',
        documents: ['Supporting Documents'],
        action_type: 'document_prep',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Submit Formal Representation to Nodal Officer',
        description: 'Submit the formal grievance or dispute ticket to the responsible department.',
        why_it_matters: 'Triggers official administrative review.',
        documents: ['Representation Letter'],
        action_type: 'authority',
        status: 'pending'
      }
    ];
  }

  // 8. Checklist items
  let checklist = [];
  if (Array.isArray(data.checklist) && data.checklist.length > 0) {
    checklist = data.checklist.map((item, idx) => ({
      id: item.id || `check_${idx + 1}`,
      title: typeof item === 'string' ? item.trim() : String(item.title || `Task ${idx + 1}`).trim(),
      category: typeof item === 'object' && item.category ? String(item.category).trim() : 'general',
      completed: Boolean(item.completed)
    }));
  } else {
    checklist = action_steps.map((step, idx) => ({
      id: `check_${idx + 1}`,
      title: step.title,
      category: 'general',
      completed: false
    }));
  }

  // 9. Verified Resources with Grounding & URL Safety
  let resources = [];
  if (Array.isArray(data.resources) && data.resources.length > 0) {
    resources = data.resources.map(res => {
      const title = String(res.title || res.name || 'Official Portal').trim();
      const rawUrl = typeof res.url === 'string' ? res.url.trim() : null;
      const safeUrl = isSafeUrl(rawUrl) ? rawUrl : null;

      // Cross-reference with trusted directory
      const matchedTrusted = VERIFIED_RESOURCES_DIRECTORY.find(tr => {
        if (safeUrl && tr.url && safeUrl.toLowerCase().includes(new URL(tr.url).hostname)) {
          return true;
        }
        return tr.title.toLowerCase().includes(title.toLowerCase()) ||
               title.toLowerCase().includes(tr.title.toLowerCase());
      });

      if (matchedTrusted) {
        return {
          id: matchedTrusted.id,
          title: matchedTrusted.title,
          name: matchedTrusted.name,
          organization: matchedTrusted.organization,
          category: matchedTrusted.category,
          source_type: matchedTrusted.source_type,
          trust_level: matchedTrusted.trust_level || 'OFFICIAL',
          official: true,
          verified: true,
          url: matchedTrusted.url,
          phone: matchedTrusted.phone,
          helpline: matchedTrusted.helpline,
          availability: matchedTrusted.availability,
          region: matchedTrusted.region || 'India',
          description: res.description && res.description.length > 10 ? res.description.trim() : matchedTrusted.description
        };
      }

      // If not in trusted directory, classify as general guidance
      return {
        id: `gen_res_${Math.random().toString(36).substr(2, 6)}`,
        title: title,
        name: title,
        organization: String(res.organization || 'General Institutional Source').trim(),
        category: category,
        source_type: String(res.source_type || 'guide').trim(),
        trust_level: 'GENERAL_INFORMATION',
        official: false,
        verified: false,
        url: safeUrl,
        phone: null,
        helpline: null,
        availability: 'Informational guidance',
        region: 'India',
        description: String(res.description || 'Procedural informational reference.').trim()
      };
    });
  }

  // Fallback: If no valid resources supplied, pull relevant verified entries for this category
  if (resources.length === 0) {
    const defaultForCategory = VERIFIED_RESOURCES_DIRECTORY.filter(r => r.category === category);
    if (defaultForCategory.length > 0) {
      resources = defaultForCategory.slice(0, 2);
    } else {
      resources = VERIFIED_RESOURCES_DIRECTORY.slice(0, 2);
    }
  }

  // 10. Safety Notes / Warnings
  const safety_notes = Array.isArray(data.safety_notes)
    ? data.safety_notes.map(s => String(s).trim()).filter(Boolean)
    : Array.isArray(data.warnings)
      ? data.warnings.map(w => String(w).trim()).filter(Boolean)
      : [];

  // Special Auto-inject for Emergency Urgency
  if (urgency === 'emergency') {
    const hasEmergencyResource = resources.some(r => r.id === 'urgent-erss-112');
    if (!hasEmergencyResource) {
      const erss = VERIFIED_RESOURCES_DIRECTORY.find(r => r.id === 'urgent-erss-112');
      if (erss) resources.unshift(erss);
    }
  }

  // 11. Metadata tracking
  const enrichedMetadata = {
    provider: metadata.provider || (data.metadata && data.metadata.provider) || 'deterministic_fallback',
    fallback_used: metadata.fallback_used !== undefined ? metadata.fallback_used : Boolean(data.metadata && data.metadata.fallback_used),
    fallback_reason: metadata.fallback_reason || (data.metadata && data.metadata.fallback_reason) || null,
    model: metadata.model || (data.metadata && data.metadata.model) || null,
    reasoning_version: '2.0.0',
    generated_at: new Date().toISOString()
  };

  return {
    title,
    category,
    urgency,
    problem_summary,
    immediate_action,
    missing_information,
    follow_up_questions,
    action_steps,
    checklist,
    resources,
    safety_notes,
    warnings: safety_notes, // backwards compat
    metadata: enrichedMetadata,
    generated_at: enrichedMetadata.generated_at
  };
}
