/**
 * LifeBridge AI - Anti-Generic Response Quality Test Suite
 * Tests that low-quality, vague, or template responses are accurately detected
 * and that high-quality, grounded responses pass validation.
 */

import { assessResponseQuality, validateAndSanitizeAIResponse } from '../services/validator.js';

async function runQualityTestSuite() {
  console.log('================================================================');
  console.log('🧪 LIFEBRIDGE AI RESPONSE QUALITY & ANTI-GENERIC TEST SUITE');
  console.log('================================================================\n');

  let passedCount = 0;
  let totalTests = 0;

  // Test 1: Flagrant generic boilerplate response
  totalTests++;
  console.log('▶ Test 1: Detecting Generic Boilerplate Response');
  const genericPlan = {
    title: 'Action Navigation Roadmap',
    category: 'civic',
    urgency: 'medium',
    problem_summary: 'Understand your problem and take appropriate steps.',
    immediate_action: {
      title: 'Understand your problem and gather general information',
      why: 'Crucial to solve problem',
      action_type: 'portal_check'
    },
    action_steps: [
      { step_number: 1, title: 'Understand your problem', description: 'Take time to understand your problem.', why_it_matters: 'Important', documents: [], action_type: 'action' },
      { step_number: 2, title: 'Contact the relevant authority', description: 'Consult an expert to solve it.', why_it_matters: 'Important', documents: [], action_type: 'action' },
      { step_number: 3, title: 'Complete the required process', description: 'Follow standard protocol.', why_it_matters: 'Important', documents: [], action_type: 'action' }
    ],
    checklist: [
      { id: 'c1', title: 'Understand your problem', completed: false }
    ],
    follow_up_questions: [
      { id: 'q1', question: 'Do you have questions?', options: ['Yes'] }
    ]
  };

  const genericQuality = assessResponseQuality(genericPlan, 'I lost my college ID card');
  console.log(`  Generic Plan Score: ${genericQuality.score}/100 (Valid: ${genericQuality.valid})`);
  console.log(`  Issues Caught:`, genericQuality.issues);

  if (!genericQuality.valid && genericQuality.issues.length >= 2) {
    console.log('  Result: ✅ PASS (Correctly identified as poor quality)\n');
    passedCount++;
  } else {
    console.log('  Result: ❌ FAIL (Failed to flag generic boilerplate)\n');
  }

  // Test 2: High-quality grounded response
  totalTests++;
  console.log('▶ Test 2: Validating High-Quality Contextual Response');
  const specificPlan = {
    title: 'Lost College Student ID Card Replacement Roadmap',
    category: 'documents',
    urgency: 'medium',
    problem_summary: 'Your student ID card was misplaced on campus, requiring security notification and departmental re-issuance.',
    immediate_action: {
      title: 'Notify campus security & administrative office to prevent unauthorized badge access',
      why: 'Reporting immediately clears you of liability if your badge is used to enter campus facilities.',
      action_type: 'in_person'
    },
    action_steps: [
      { step_number: 1, title: 'Check Lost & Found at Campus Security & Library Desk', description: 'Visit main security gate and library circulation desk.', why_it_matters: 'Most lost IDs are returned within 24 hours.', documents: ['Govt ID Proof'], action_type: 'in_person', status: 'pending' },
      { step_number: 2, title: 'Submit Written Lost Report to Department HOD', description: 'Draft a brief application to the Head of Department for a temporary gate pass.', why_it_matters: 'Ensures uninterrupted class attendance.', documents: ['Fee Receipt'], action_type: 'document_prep', status: 'pending' },
      { step_number: 3, title: 'Pay Statutory Duplicate ID Fee & Submit Re-issue Form', description: 'Pay duplicate fee at accounts counter.', why_it_matters: 'Initiates RFID chip printing.', documents: ['Fee Challan', 'Passport Photo'], action_type: 'authority', status: 'pending' }
    ],
    checklist: [
      { id: 'c1', title: 'Inquire at Central Campus Security Lost & Found', category: 'immediate', completed: false },
      { id: 'c2', title: 'Get provisional gate pass signed by Department HOD', category: 'authority', completed: false }
    ],
    follow_up_questions: [
      { id: 'q_loc', question: 'Where did you last have your college ID card?', options: ['Inside campus', 'Outside campus', 'Not sure'] }
    ]
  };

  const specificQuality = assessResponseQuality(specificPlan, 'I lost my college ID card');
  console.log(`  Specific Plan Score: ${specificQuality.score}/100 (Valid: ${specificQuality.valid})`);

  if (specificQuality.valid && specificQuality.score === 100) {
    console.log('  Result: ✅ PASS (High quality recognized with 100% score)\n');
    passedCount++;
  } else {
    console.log('  Result: ❌ FAIL (Legitimate response incorrectly penalized)\n');
  }

  // Test 3: Sanitizer & metadata enrichment
  totalTests++;
  console.log('▶ Test 3: Testing Validator Sanitization & Metadata Enrichment');
  const sanitized = validateAndSanitizeAIResponse(specificPlan, 'documents', {
    provider: 'gemini',
    fallback_used: false,
    model: 'gemini-1.5-flash'
  });

  const hasMetadata = Boolean(sanitized.metadata && sanitized.metadata.provider === 'gemini' && sanitized.metadata.model === 'gemini-1.5-flash');
  const hasValidFields = Boolean(sanitized.title && sanitized.immediate_action && sanitized.action_steps.length === 3);

  if (hasMetadata && hasValidFields) {
    console.log('  Result: ✅ PASS (Sanitizer properly structured metadata and preserved plan integrity)\n');
    passedCount++;
  } else {
    console.log('  Result: ❌ FAIL (Sanitization failed metadata enrichment)\n');
  }

  console.log('================================================================');
  console.log(`🏆 QUALITY TEST SUITE RESULT: ${passedCount}/${totalTests} Passed`);
  console.log('================================================================\n');

  if (passedCount === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runQualityTestSuite().catch(err => {
  console.error('Fatal error during quality test:', err);
  process.exit(1);
});
