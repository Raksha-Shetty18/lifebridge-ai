/**
 * LifeBridge AI - Frontend API Service
 */

// Resolve API base URL: defaults to '/api' locally (proxied by Vite), or uses VITE_API_URL in production
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : '';

export const API_BASE = API_URL ? (API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`) : '/api';

export async function analyzeProblem(descriptionText, category = null) {
  try {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        description: descriptionText,
        problem: descriptionText,
        category 
      })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('[LifeBridge AI] Backend API call failed or offline, switching to built-in fallback guidance mode:', err.message);
    const { generateHeuristicPlan } = await import('./clientFallbackBrain.js');
    return generateHeuristicPlan(descriptionText, category);
  }
}

export async function refinePlan(existingCase, questionId, selectedAnswer) {
  try {
    const res = await fetch(`${API_BASE}/refine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        case: existingCase,
        existingPlan: existingCase,
        question_id: questionId,
        questionId: questionId,
        answer: selectedAnswer,
        selectedAnswer: selectedAnswer
      })
    });

    if (!res.ok) {
      throw new Error('Refine API failed');
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('[LifeBridge AI] Refine fallback locally:', err.message);
    const updated = JSON.parse(JSON.stringify(existingCase));
    if (updated.follow_up_questions) {
      updated.follow_up_questions = updated.follow_up_questions.filter(q => q.id !== questionId);
    }
    updated.problem_summary += ` (Updated for: "${selectedAnswer}")`;
    return updated;
  }
}

export async function fetchVerifiedResources(category = 'all') {
  try {
    const res = await fetch(`${API_BASE}/resources?category=${category}`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (e) {
    console.warn('[LifeBridge AI] Resources API failed, using static fallback:', e);
  }
  return null;
}

export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    return { status: 'offline', details: e.message };
  }
  return { status: 'unknown' };
}
