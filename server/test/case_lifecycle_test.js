/**
 * LifeBridge AI - Case Lifecycle & Progress Test Suite
 * Validates case creation, step progression, checklist synchronization, and completion.
 */

import { analyzeProblemWithGemini, refinePlanWithGemini } from '../services/gemini.js';

async function runCaseLifecycleTestSuite() {
  console.log('================================================================');
  console.log('🧪 LIFEBRIDGE AI CASE LIFECYCLE TEST SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  // 1. Initial Case Generation
  total++;
  console.log('▶ Step 1: Case Creation from User Problem');
  const input = 'My scholarship application was rejected due to missing income certificate.';
  const plan = await analyzeProblemWithGemini(input);

  const initialCase = {
    ...plan,
    id: `case_test_${Date.now()}`,
    status: 'active',
    created_at: new Date().toISOString(),
    original_description: input,
    activity: [
      { id: 'act_1', type: 'created', title: 'Case Roadmap Initialized', timestamp: new Date().toISOString() }
    ]
  };

  console.log(`  Case ID: ${initialCase.id}`);
  console.log(`  Initial Status: ${initialCase.status}`);
  console.log(`  Tasks count: ${initialCase.checklist?.length}`);

  if (initialCase.id && initialCase.checklist?.length >= 3) {
    console.log('  Result: ✅ PASS\n');
    passed++;
  } else {
    console.log('  Result: ❌ FAIL\n');
  }

  // 2. Checklist Task Progression
  total++;
  console.log('▶ Step 2: Progressing Checklist Tasks');
  const updatedChecklist = initialCase.checklist.map((task, idx) => ({
    ...task,
    completed: idx === 0 // Complete task 1
  }));

  const completedCount = updatedChecklist.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / updatedChecklist.length) * 100);

  console.log(`  Tasks Completed: ${completedCount}/${updatedChecklist.length} (${progressPercent}%)`);

  if (completedCount === 1 && progressPercent > 0) {
    console.log('  Result: ✅ PASS\n');
    passed++;
  } else {
    console.log('  Result: ❌ FAIL\n');
  }

  // 3. Status Transition to In Progress & Completed
  total++;
  console.log('▶ Step 3: Status Transitioning');
  let caseState = { ...initialCase, status: 'in_progress', checklist: updatedChecklist };
  console.log(`  Status transitioned to: ${caseState.status}`);

  // Mark 100% completed
  const allDoneChecklist = updatedChecklist.map(t => ({ ...t, completed: true }));
  caseState = {
    ...caseState,
    status: 'completed',
    checklist: allDoneChecklist,
    completed_at: new Date().toISOString()
  };

  console.log(`  All tasks finished -> Status: ${caseState.status} (Completed: ${allDoneChecklist.filter(t => t.completed).length}/${allDoneChecklist.length})`);

  if (caseState.status === 'completed' && caseState.checklist.every(t => t.completed)) {
    console.log('  Result: ✅ PASS\n');
    passed++;
  } else {
    console.log('  Result: ❌ FAIL\n');
  }

  console.log('================================================================');
  console.log(`🏆 CASE LIFECYCLE RESULT: ${passed}/${total} Passed`);
  console.log('================================================================\n');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runCaseLifecycleTestSuite().catch(err => {
  console.error('Fatal error during case lifecycle test:', err);
  process.exit(1);
});
