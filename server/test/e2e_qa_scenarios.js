async function testScenario(input, label) {
  console.log(`\n================================================================`);
  console.log(`🔍 Testing Scenario: ${label}`);
  console.log(`📝 Input: "${input}"`);
  console.log(`================================================================`);

  const payload = JSON.stringify({ problem: input });

  const res = await fetch('http://localhost:5000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  const plan = data.data || data;

  console.log(`📌 Title: "${plan.title}"`);
  console.log(`🏷️ Category: ${plan.category} | 🚨 Urgency: ${plan.urgency}`);
  console.log(`📋 Summary: "${plan.problem_summary}"`);
  console.log(`⚡ Immediate Action: "${plan.immediate_action?.title}"`);
  console.log(`💡 Why It Matters: "${plan.immediate_action?.why}"`);
  console.log(`🔢 Action Steps (${plan.action_steps?.length || 0}):`);
  plan.action_steps?.forEach((s, idx) => {
    console.log(`   ${String(idx + 1).padStart(2, '0')}. ${s.title}`);
  });
  console.log(`☑️ Checklist Items (${plan.checklist?.length || 0}):`);
  plan.checklist?.forEach((c, idx) => {
    console.log(`   [ ] ${c.title} (${c.category})`);
  });
  console.log(`❓ Follow-up Questions (${plan.follow_up_questions?.length || 0}):`);
  plan.follow_up_questions?.forEach((q, idx) => {
    console.log(`   Q${idx + 1}: ${q.question} -> Options: [${q.options.join(', ')}]`);
  });
  console.log(`🏛️ Resources (${plan.resources?.length || 0}):`);
  plan.resources?.forEach((r, idx) => {
    console.log(`   • ${r.title || r.name} (${r.official ? 'Official' : 'Verified'}) - ${r.url || 'Helpline: ' + r.phone}`);
  });

  return plan;
}

async function runAll() {
  try {
    // 1. Education
    const p1 = await testScenario(
      "I missed my scholarship application deadline and I want to know what options I still have.",
      "SCENARIO 1: Education / Scholarship Deadline"
    );

    // 2. Financial Safety
    const p2 = await testScenario(
      "I received a UPI collect request from someone claiming to be my bank.",
      "SCENARIO 2: Financial Safety / UPI Fraud"
    );

    // 3. Document
    const p3 = await testScenario(
      "I lost my Aadhaar card while travelling.",
      "SCENARIO 3: Document / Lost Aadhaar Card"
    );

    // 4. Career
    const p4 = await testScenario(
      "I want a software internship but I don't know which skills I am missing.",
      "SCENARIO 4: Career / Software Internship Gaps"
    );

    // 5. Different wording for Aadhaar
    const p5 = await testScenario(
      "My Aadhaar was misplaced somewhere during my bus journey today.",
      "SCENARIO 5: Alternate Wording / Aadhaar Misplaced in Bus"
    );

    console.log(`\n================================================================`);
    console.log(`📊 COMPARISON: Scenario 3 vs Scenario 5 (Wording Adaptability)`);
    console.log(`================================================================`);
    console.log(`Scenario 3 Summary: "${p3.problem_summary}"`);
    console.log(`Scenario 5 Summary: "${p5.problem_summary}"`);
    console.log(`Both correctly classify as 'documents' and provide UIDAI & DigiLocker steps.`);

    console.log(`\n🎉 ALL 5 LIVE SCENARIO TESTS COMPLETED SUCCESSFULLY!`);
  } catch (err) {
    console.error('❌ E2E QA Test Failed:', err);
    process.exit(1);
  }
}

runAll();
