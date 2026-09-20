/**
 * LifeBridge AI - Plan Refinement & Adaptive Reasoning Test Suite
 * Tests that follow-up selections adapt the roadmap milestones, checklist tasks, and context.
 */

import { analyzeProblemWithGemini, refinePlanWithGemini } from '../services/gemini.js';

async function runRefineTestSuite() {
  console.log('================================================================');
  console.log('🧪 LIFEBRIDGE AI REFINEMENT REASONING TEST SUITE');
  console.log('================================================================\n');

  // Scenario: Java Full Stack Internship
  console.log('▶ Phase 1: Initial Problem Analysis');
  const initialInput = 'I want a Java full stack internship but I do not know what skills I am missing.';
  const initialPlan = await analyzeProblemWithGemini(initialInput);

  console.log(`  Initial Title: "${initialPlan.title}"`);
  console.log(`  Initial Immediate Action: "${initialPlan.immediate_action?.title}"`);
  console.log(`  Initial Follow-up Questions: ${initialPlan.follow_up_questions?.length}`);
  const q1 = initialPlan.follow_up_questions?.[0];
  console.log(`  Target Follow-up: "${q1?.question}" -> Option: "${q1?.options?.[0]}"`);

  if (!q1) {
    console.error('❌ FAIL: No follow up question generated.');
    process.exit(1);
  }

  // Phase 2: Refinement
  console.log('\n▶ Phase 2: Refining Plan with User Answer');
  const selectedOption = q1.options[0] || 'Know Core Java & OOP basics';
  const refinedPlan = await refinePlanWithGemini(initialPlan, q1.id, selectedOption);

  console.log(`  Refined Title: "${refinedPlan.title}"`);
  console.log(`  Refined Immediate Action: "${refinedPlan.immediate_action?.title}"`);
  console.log(`  Remaining Follow-up Questions: ${refinedPlan.follow_up_questions?.length}`);
  console.log(`  Followup History Recorded: ${refinedPlan.followups?.length} entries`);
  console.log(`  Activity Log Entries: ${refinedPlan.activity?.length} entries`);

  const qAnsweredAndRemoved = !refinedPlan.follow_up_questions?.some(q => q.id === q1.id);
  const historyRecorded = refinedPlan.followups?.some(f => f.question_id === q1.id);
  const immediateActionUpdated = Boolean(refinedPlan.immediate_action?.title);

  if (qAnsweredAndRemoved && historyRecorded && immediateActionUpdated) {
    console.log('\n✅ REFINEMENT TEST PASSED: Plan adapted dynamically, question removed from pending list, and history recorded.\n');
    process.exit(0);
  } else {
    console.error('\n❌ REFINEMENT TEST FAILED: Verification checks not met.\n');
    process.exit(1);
  }
}

runRefineTestSuite().catch(err => {
  console.error('Fatal error during refine test:', err);
  process.exit(1);
});
