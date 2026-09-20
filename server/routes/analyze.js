import express from 'express';
import { analyzeProblemWithGemini, refinePlanWithGemini } from '../services/gemini.js';
import { DEMO_PRESETS } from '../services/fallbackBrain.js';

const router = express.Router();

// POST /api/analyze - Analyze user problem description
router.post('/analyze', async (req, res) => {
  try {
    const rawInput = req.body.description || req.body.problem;
    const category = req.body.category || null;

    if (!rawInput || typeof rawInput !== 'string' || rawInput.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Please provide a valid problem description.' 
      });
    }

    const descriptionText = rawInput.trim();
    console.log(`[LifeBridge AI] Analyzing situation: "${descriptionText.slice(0, 80)}..." (Category Hint: ${category || 'Auto-Infer'})`);

    const plan = await analyzeProblemWithGemini(descriptionText, category);

    return res.json({
      success: true,
      data: plan
    });
  } catch (err) {
    console.error('[LifeBridge AI] Error in /api/analyze:', err);
    return res.status(500).json({
      error: 'We could not reach the AI service, so LifeBridge switched to its built-in guidance mode.',
      details: err.message
    });
  }
});

// POST /api/refine - Refine an existing plan with follow-up user answer
router.post('/refine', async (req, res) => {
  try {
    const existingPlan = req.body.case || req.body.existingPlan;
    const questionId = req.body.question_id || req.body.questionId;
    const selectedAnswer = req.body.answer || req.body.selectedAnswer;

    if (!existingPlan || !questionId || !selectedAnswer) {
      return res.status(400).json({ 
        error: 'Missing required parameters for plan refinement (case, question_id, answer).' 
      });
    }

    console.log(`[LifeBridge AI] Refining plan for question: ${questionId} -> Selection: "${selectedAnswer}"`);
    const updatedPlan = await refinePlanWithGemini(existingPlan, questionId, selectedAnswer);

    return res.json({
      success: true,
      data: updatedPlan
    });
  } catch (err) {
    console.error('[LifeBridge AI] Error in /api/refine:', err);
    return res.status(500).json({
      error: 'Failed to refine plan.',
      details: err.message
    });
  }
});

// GET /api/presets/:scenarioKey - Quick load preset for demo scenarios
router.get('/presets/:scenarioKey', (req, res) => {
  const { scenarioKey } = req.params;
  const preset = DEMO_PRESETS[scenarioKey];

  if (!preset) {
    return res.status(404).json({ error: `Preset '${scenarioKey}' not found.` });
  }

  return res.json({
    success: true,
    data: preset
  });
});

export default router;
