/**
 * LifeBridge AI - Google Gemini Integration Service
 * High-precision, context-grounded AI Action Navigator reasoning engine.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateAndSanitizeAIResponse, assessResponseQuality } from './validator.js';
import { generateHeuristicPlan, refineHeuristicPlan } from './fallbackBrain.js';

const SYSTEM_INSTRUCTION = `
You are LifeBridge AI, an expert Pragmatic Action Navigator.
Your role is to convert real-life citizen, student, and consumer problems into clear, structured, sequential procedural action plans.

CRITICAL REASONING RULES:
1. SPECIFICITY OVER GENERALITY:
   - Analyze the EXACT entities, documents, institutions, and constraints mentioned in the user input.
   - If the user lost a college ID, DO NOT give advice about high school marksheets.
   - If the user received a suspicious UPI payment collect request, DO NOT give advice for general credit card chargebacks.
   - If the user wants a Java Full Stack internship, DO NOT give generic "learn computer science" advice—give specific Java/Spring/REST/SQL/portfolio milestones.
   - If the user reports a broken streetlight or civic issue, DO NOT advise them to meet an academic nodal officer.

2. IMMEDIATE ACTION FOCUS:
   - Generate EXACTLY ONE single most critical immediate action for "immediate_action".
   - It must be the single safest, most productive thing the user can do in the next 15-60 minutes specifically for THIS problem.

3. DYNAMIC RELEVANT FOLLOW-UP QUESTIONS:
   - Generate 1 to 3 high-value multiple choice questions that will genuinely reduce uncertainty for THIS specific problem.
   - For financial fraud: ask about OTP sharing, payment apps used, or time elapsed.
   - For lost documents: ask about police report status, digital copy availability, or urgent deadline.
   - For career/internships: ask about current programming languages known, graduation year, or target company tier.
   - For civic problems: ask about locality jurisdiction, duration of issue, or prior complaint reference numbers.
   - DO NOT provide generic questions like "Are you sure?" or "Do you have questions?".

4. GROUNDED PROCEDURAL ROADMAP:
   - Generate 3 to 6 sequential milestones in "action_steps".
   - Each step must have:
     * title: Actionable, imperative title.
     * description: Practical, step-by-step instruction mentioning specific portals, forms, or offices.
     * why_it_matters: Why this step is crucial and what bottleneck it unblocks.
     * documents: Precise array of documents/items required for this specific step.
     * action_type: "portal_check" | "document_prep" | "in_person" | "helpline" | "appeal" | "emergency_contact"
     * status: "pending"

5. NEVER USE LAZY BOILERPLATE:
   - STRICTLY FORBIDDEN phrases: "Understand your problem", "Gather information", "Contact relevant authority", "Complete the required process", "Track your progress". Every step must be substantive.

6. ZERO HALLUCINATION FOR OFFICIAL PORTALS:
   - For India, refer exclusively to real verified portals (e.g. scholarships.gov.in, cybercrime.gov.in, digilocker.gov.in, pgportal.gov.in, ncs.gov.in, uidai.gov.in, 112, 1930, 14416).

7. EXACT JSON OUTPUT:
   - Return ONLY a valid JSON object matching this schema:
{
  "title": "Action-oriented title tailored to the exact situation",
  "category": "education" | "career" | "civic" | "financial_safety" | "documents" | "urgent",
  "urgency": "low" | "medium" | "high" | "emergency",
  "problem_summary": "1-2 sentence precise summary of the situation and core bottleneck.",
  "immediate_action": {
    "title": "Single most important immediate action tailored to this problem",
    "why": "Why this specific step is critical now",
    "action_type": "portal_check" | "document_prep" | "in_person" | "helpline" | "appeal" | "emergency_contact"
  },
  "missing_information": [
    "Specific detail 1 that affects the roadmap",
    "Specific detail 2"
  ],
  "follow_up_questions": [
    {
      "id": "q1",
      "question": "Specific question directly clarifying this problem?",
      "options": ["Specific Option A", "Specific Option B", "Specific Option C"]
    }
  ],
  "action_steps": [
    {
      "step_number": 1,
      "title": "Specific step title",
      "description": "Concrete instructions.",
      "why_it_matters": "Why this unlocks progress.",
      "documents": ["Specific document 1", "Specific document 2"],
      "action_type": "portal_check",
      "status": "pending"
    }
  ],
  "checklist": [
    {
      "title": "Specific checklist task",
      "category": "immediate" | "documents" | "authority" | "security",
      "completed": false
    }
  ],
  "resources": [
    {
      "title": "Official Portal Name",
      "description": "What this verified portal is used for.",
      "url": "https://...",
      "source_type": "official_government" | "statutory_helpline" | "government_portal" | "legal_aid"
    }
  ],
  "safety_notes": [
    "Crucial safety, legal, or procedural warning"
  ]
}
`;

/**
 * Checks if a valid Gemini API key is configured.
 */
export function isGeminiConfigured() {
  const apiKey = process.env.GEMINI_API_KEY;
  return Boolean(apiKey && apiKey.trim() !== '' && apiKey !== 'YOUR_GEMINI_API_KEY');
}

/**
 * Primary Problem Analysis Engine.
 */
export async function analyzeProblemWithGemini(descriptionText, categoryHint = null) {
  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyValid = isGeminiConfigured();

  console.log(`[LifeBridge AI] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`[LifeBridge AI] Problem Input: "${descriptionText.slice(0, 100)}${descriptionText.length > 100 ? '...' : ''}"`);
  console.log(`[LifeBridge AI] Category Hint: ${categoryHint || 'Auto-Detect'}`);

  if (!isKeyValid) {
    const reason = !apiKey ? 'GEMINI_API_KEY environment variable is not set.' : 'GEMINI_API_KEY contains placeholder value.';
    console.log(`[LifeBridge AI] AI Provider: Deterministic Fallback Engine`);
    console.log(`[LifeBridge AI] Fallback Reason: ${reason}`);
    console.log(`[LifeBridge AI] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    return generateHeuristicPlan(descriptionText, categoryHint, {
      provider: 'deterministic_fallback',
      fallback_used: true,
      fallback_reason: reason,
      model: 'deterministic-rules-v2'
    });
  }

  const modelName = 'gemini-1.5-flash';

  try {
    console.log(`[LifeBridge AI] AI Provider: Google Gemini Live (${modelName})`);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      },
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const prompt = `
USER PROBLEM STATEMENT:
"${descriptionText}"

${categoryHint ? `PREFERRED CATEGORY: ${categoryHint}` : 'Infer the category from context.'}

INSTRUCTIONS:
1. Extract the core entities, objects, institutional bodies, and specific constraints.
2. Formulate a tailored, highly specific action plan for THIS problem statement only.
3. Do NOT provide generic template advice.
4. Ensure immediate_action, action_steps, checklist, follow_up_questions, and safety_notes are uniquely tailored to this scenario.
5. Return strictly valid JSON matching the schema.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (parseErr) {
      throw new Error(`Failed to parse Gemini response as JSON: ${parseErr.message}`);
    }

    // Quality check
    const quality = assessResponseQuality(parsed, descriptionText);
    console.log(`[LifeBridge AI] Quality Assessment: Score ${quality.score}/100 | Valid: ${quality.valid}`);
    if (!quality.valid) {
      console.warn(`[LifeBridge AI] Quality Warning Issues:`, quality.issues);
    }

    const sanitized = validateAndSanitizeAIResponse(parsed, categoryHint || parsed.category || 'civic', {
      provider: 'gemini',
      fallback_used: false,
      fallback_reason: null,
      model: modelName
    });

    console.log(`[LifeBridge AI] Generated Plan: "${sanitized.title}" (${sanitized.category}, ${sanitized.urgency})`);
    console.log(`[LifeBridge AI] Steps: ${sanitized.action_steps.length} | Tasks: ${sanitized.checklist.length} | Questions: ${sanitized.follow_up_questions.length}`);
    console.log(`[LifeBridge AI] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    return sanitized;
  } catch (err) {
    const errorReason = `Gemini API Error: ${err.message}`;
    console.error(`[LifeBridge AI] ❌ Gemini Call Failed:`, err.message);
    console.log(`[LifeBridge AI] Activating Dynamic Deterministic Fallback Engine...`);
    console.log(`[LifeBridge AI] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    return generateHeuristicPlan(descriptionText, categoryHint, {
      provider: 'deterministic_fallback',
      fallback_used: true,
      fallback_reason: errorReason,
      model: 'deterministic-rules-v2'
    });
  }
}

/**
 * Intelligent Plan Refinement Engine.
 * Modifies existing plan contextually based on user follow-up selections.
 */
export async function refinePlanWithGemini(existingPlan, questionId, selectedAnswer) {
  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyValid = isGeminiConfigured();

  // Helper to safely preserve checklist completions, existing activity, and followups log
  const mergeExistingState = (newPlan, metadataOverride = {}) => {
    const merged = { ...newPlan };
    merged.id = existingPlan.id || merged.id;
    merged.created_at = existingPlan.created_at || merged.created_at;
    merged.status = existingPlan.status || merged.status;
    merged.original_description = existingPlan.original_description || merged.original_description;

    // Preserve checklist completion state
    const prevCompletedTitles = new Set(
      (existingPlan.checklist || [])
        .filter(item => item.completed)
        .map(item => (item.title || '').toLowerCase().trim())
    );

    if (Array.isArray(merged.checklist)) {
      merged.checklist = merged.checklist.map((item, idx) => {
        const titleKey = (item.title || '').toLowerCase().trim();
        const wasCompleted = prevCompletedTitles.has(titleKey) || Boolean(item.completed);
        return {
          ...item,
          id: item.id || `chk_${merged.id || 'case'}_${idx}`,
          completed: wasCompleted
        };
      });
    }

    // Preserve answered questions history and remove current question from unanswered list
    const prevFollowups = Array.isArray(existingPlan.followups) ? existingPlan.followups : [];
    const answeredQuestionObj = (existingPlan.follow_up_questions || []).find(q => q.id === questionId);
    const questionText = answeredQuestionObj ? answeredQuestionObj.question : `Question ${questionId}`;

    merged.followups = [
      ...prevFollowups,
      {
        question_id: questionId,
        question: questionText,
        answer: selectedAnswer,
        answered_at: new Date().toISOString()
      }
    ];

    if (Array.isArray(merged.follow_up_questions)) {
      merged.follow_up_questions = merged.follow_up_questions.filter(q => q.id !== questionId);
    }

    // Append activity log entry
    const prevActivity = Array.isArray(existingPlan.activity) ? existingPlan.activity : [];
    merged.activity = [
      ...prevActivity,
      {
        id: `act_${Date.now()}_refine`,
        type: 'followup_answered',
        title: 'Roadmap Refined',
        description: `Plan adapted with detail: "${selectedAnswer}"`,
        timestamp: new Date().toISOString()
      }
    ];

    merged.metadata = {
      ...(merged.metadata || {}),
      ...metadataOverride,
      refined_at: new Date().toISOString()
    };

    return merged;
  };

  if (!isKeyValid) {
    console.log(`[LifeBridge AI] Refining plan via Deterministic Refinement Engine for: "${selectedAnswer}"`);
    const updated = refineHeuristicPlan(existingPlan, questionId, selectedAnswer);
    const sanitized = validateAndSanitizeAIResponse(updated, existingPlan.category, {
      provider: 'deterministic_fallback',
      fallback_used: true,
      fallback_reason: 'GEMINI_API_KEY not configured.',
      model: 'deterministic-rules-v2'
    });
    return mergeExistingState(sanitized, { provider: 'deterministic_fallback', fallback_used: true });
  }

  const modelName = 'gemini-1.5-flash';

  try {
    console.log(`[LifeBridge AI] Refining plan with Gemini (${modelName}) for question ${questionId}: "${selectedAnswer}"`);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2
      },
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const answeredHistory = (existingPlan.followups || [])
      .map(f => `- Q: ${f.question} | Answer: ${f.answer}`)
      .join('\n');

    const prompt = `
ORIGINAL USER SITUATION:
"${existingPlan.problem_summary || existingPlan.original_description || existingPlan.title}"

EXISTING ACTION ROADMAP:
${JSON.stringify({
  title: existingPlan.title,
  category: existingPlan.category,
  urgency: existingPlan.urgency,
  immediate_action: existingPlan.immediate_action,
  action_steps: existingPlan.action_steps,
  checklist: existingPlan.checklist,
  follow_up_questions: existingPlan.follow_up_questions
}, null, 2)}

PREVIOUSLY ANSWERED QUESTIONS:
${answeredHistory || 'None'}

NEW USER ANSWER:
Question ID: ${questionId}
User Answered: "${selectedAnswer}"

TASK:
1. Adapt the Action Steps and Checklist specifically taking this new verified answer into account.
2. If the user confirmed they already know a skill or have already filed a document, DO NOT tell them to do it again—advance to the next necessary step.
3. If the user revealed a specific defect code, role, or constraint, calibrate the immediate action and steps accordingly.
4. Keep the output strictly in the required JSON format.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    const parsed = JSON.parse(responseText);
    const sanitized = validateAndSanitizeAIResponse(parsed, existingPlan.category, {
      provider: 'gemini',
      fallback_used: false,
      fallback_reason: null,
      model: modelName
    });

    return mergeExistingState(sanitized, { provider: 'gemini', fallback_used: false, model: modelName });
  } catch (err) {
    console.error(`[LifeBridge AI] Gemini Refine Error:`, err.message);
    console.log(`[LifeBridge AI] Falling back to deterministic refinement logic.`);
    const updated = refineHeuristicPlan(existingPlan, questionId, selectedAnswer);
    const sanitized = validateAndSanitizeAIResponse(updated, existingPlan.category, {
      provider: 'deterministic_fallback',
      fallback_used: true,
      fallback_reason: `Gemini refine failed: ${err.message}`,
      model: 'deterministic-rules-v2'
    });
    return mergeExistingState(sanitized, { provider: 'deterministic_fallback', fallback_used: true });
  }
}
