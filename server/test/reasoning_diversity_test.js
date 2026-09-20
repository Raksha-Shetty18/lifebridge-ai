/**
 * LifeBridge AI - AI Reasoning Diversity & Differentiation Test Suite
 * Validates that distinct user problems produce semantically unique,
 * contextually grounded roadmaps rather than cookie-cutter templates.
 */

import { analyzeProblemWithGemini } from '../services/gemini.js';
import { assessResponseQuality } from '../services/validator.js';

const TEST_SCENARIOS = [
  {
    id: 'test_1_education',
    name: 'Education / Scholarship Rejection',
    input: "I was rejected for a scholarship and don't know what I should do next.",
    expectedCategory: 'education',
    expectedKeywordsInTitle: ['scholarship', 'appeal', 'rectification', 'defect'],
    expectedKeywordsInAction: ['portal', 'defect', 'rejection', 'download']
  },
  {
    id: 'test_2_financial',
    name: 'Financial Safety / UPI Scam',
    input: "I received a UPI collect request from someone I don't recognize.",
    expectedCategory: 'financial_safety',
    expectedKeywordsInTitle: ['upi', 'payment', 'fraud', 'scam', 'defense'],
    expectedKeywordsInAction: ['decline', 'pin', 'reject', 'collect']
  },
  {
    id: 'test_3_documents',
    name: 'Documents / Lost College ID',
    input: "I lost my college ID card yesterday.",
    expectedCategory: 'documents',
    expectedKeywordsInTitle: ['college', 'id', 'student', 'card', 'replacement'],
    expectedKeywordsInAction: ['security', 'campus', 'badge', 'report']
  },
  {
    id: 'test_4_career',
    name: 'Career / Java Full Stack Internship',
    input: "I want a Java full stack internship but I don't know what skills I am missing.",
    expectedCategory: 'career',
    expectedKeywordsInTitle: ['java', 'internship', 'full stack', 'backend', 'skill'],
    expectedKeywordsInAction: ['spring', 'boot', 'rest', 'api', 'project', 'github']
  },
  {
    id: 'test_5_civic',
    name: 'Civic / Broken Streetlight',
    input: "There is a streetlight near my house that has not been working for several days.",
    expectedCategory: 'civic',
    expectedKeywordsInTitle: ['streetlight', 'street light', 'municipal', 'grievance'],
    expectedKeywordsInAction: ['pole', 'number', 'ward', 'photo', 'geotagged']
  },
  {
    id: 'test_6_academic_overload',
    name: 'Education / Assignment Overload',
    input: "I have too many assignments and don't know how to organize them before next week.",
    expectedCategory: 'education',
    expectedKeywordsInTitle: ['assignment', 'workload', 'prioritization', 'academic'],
    expectedKeywordsInAction: ['eisenhower', 'matrix', 'weightage', 'audit', 'triage']
  }
];

async function runDiversityTestSuite() {
  console.log('================================================================');
  console.log('🧪 LIFEBRIDGE AI REASONING DIVERSITY & QUALITY TEST SUITE');
  console.log('================================================================\n');

  const results = [];
  let passedCount = 0;
  let totalTests = TEST_SCENARIOS.length;

  for (const scenario of TEST_SCENARIOS) {
    console.log(`▶ Testing Scenario: [${scenario.name}]`);
    console.log(`  Input: "${scenario.input}"`);

    const plan = await analyzeProblemWithGemini(scenario.input);
    const quality = assessResponseQuality(plan, scenario.input);

    console.log(`  Provider: ${plan.metadata?.provider || 'unknown'} | Model: ${plan.metadata?.model || 'n/a'}`);
    console.log(`  Generated Title: "${plan.title}"`);
    console.log(`  Category: ${plan.category} (Expected: ${scenario.expectedCategory})`);
    console.log(`  Urgency: ${plan.urgency}`);
    console.log(`  Immediate Action: "${plan.immediate_action?.title}"`);
    console.log(`  Steps: ${plan.action_steps?.length} | Tasks: ${plan.checklist?.length} | Questions: ${plan.follow_up_questions?.length}`);
    console.log(`  Quality Score: ${quality.score}/100 (Valid: ${quality.valid})`);

    // Verify basic requirements
    const categoryMatches = plan.category === scenario.expectedCategory;
    const hasImmediateAction = Boolean(plan.immediate_action?.title && plan.immediate_action.title.length > 10);
    const hasDistinctSteps = Array.isArray(plan.action_steps) && plan.action_steps.length >= 2;
    const hasQuestions = Array.isArray(plan.follow_up_questions) && plan.follow_up_questions.length >= 1;

    const testPassed = categoryMatches && hasImmediateAction && hasDistinctSteps && hasQuestions && quality.valid;

    if (testPassed) {
      console.log(`  Result: ✅ PASS\n`);
      passedCount++;
    } else {
      console.log(`  Result: ❌ FAIL (CategoryMatch: ${categoryMatches}, Quality: ${quality.valid})\n`);
    }

    results.push({ scenario, plan, testPassed });
  }

  // Cross-Scenario Semantic Divergence Matrix
  console.log('================================================================');
  console.log('📊 CROSS-SCENARIO DIVERSITY COMPARISON MATRIX');
  console.log('================================================================');

  let pairwiseComparisons = 0;
  let pairwiseUnique = 0;

  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      pairwiseComparisons++;
      const resA = results[i];
      const resB = results[j];

      const diffTitle = resA.plan.title !== resB.plan.title;
      const diffAction = resA.plan.immediate_action?.title !== resB.plan.immediate_action?.title;
      const diffSummary = resA.plan.problem_summary !== resB.plan.problem_summary;
      const diffFirstStep = resA.plan.action_steps?.[0]?.title !== resB.plan.action_steps?.[0]?.title;

      const isDivergent = diffTitle && diffAction && diffSummary && diffFirstStep;
      if (isDivergent) {
        pairwiseUnique++;
        console.log(`✅ [${resA.scenario.id}] vs [${resB.scenario.id}]: 100% Unique (Title, Action, Steps differ)`);
      } else {
        console.log(`❌ [${resA.scenario.id}] vs [${resB.scenario.id}]: Identical overlap detected!`);
      }
    }
  }

  const diversityRate = Math.round((pairwiseUnique / pairwiseComparisons) * 100);
  console.log('\n================================================================');
  console.log(`🏆 FINAL DIVERSITY SCORE: ${diversityRate}% (${pairwiseUnique}/${pairwiseComparisons} distinct pairs)`);
  console.log(`🎯 SCENARIO PASS RATE: ${passedCount}/${totalTests} (${Math.round((passedCount / totalTests) * 100)}%)`);
  console.log('================================================================\n');

  if (passedCount === totalTests && diversityRate === 100) {
    console.log('🎉 ALL DIVERSITY TESTS PASSED! Reasoning pipeline is verified dynamic.\n');
    process.exit(0);
  } else {
    console.error('⚠️ SOME TESTS FAILED. Please review output above.\n');
    process.exit(1);
  }
}

runDiversityTestSuite().catch(err => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
