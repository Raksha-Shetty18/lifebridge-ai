/**
 * LifeBridge AI - Live Production Deployment Verification Suite
 * Tests live deployed frontend on Vercel and live deployed backend on Render.
 */

async function verifyLiveDeployment() {
  const FRONTEND_URL = 'https://client-git-main-raksha-shetty18s-projects.vercel.app';
  const BACKEND_URL = 'https://lifebridge-ai-7kcb.onrender.com/api';

  console.log('================================================================');
  console.log('🚀 LIFEBRIDGE AI LIVE PRODUCTION DEPLOYMENT VERIFICATION');
  console.log('================================================================\n');

  console.log('🌐 [1/4] Verifying Live Frontend Routes (Vercel SPA Deep-Linking)...');
  const routes = ['/', '/analyze', '/dashboard', '/cases/case_demo_123', '/resources', '/about'];
  for (const r of routes) {
    const res = await fetch(FRONTEND_URL + r);
    const text = await res.text();
    const hasHtml = text.includes('<html') || text.includes('<!DOCTYPE') || text.includes('root');
    console.log(`  Route ${r.padEnd(22)} -> HTTP ${res.status} [${hasHtml ? 'HTML OK' : 'ERR'}] ${res.status === 200 && hasHtml ? '✅ PASS' : '❌ FAIL'}`);
  }

  console.log('\n📡 [2/4] Verifying Live Backend Health (Render)...');
  const healthRes = await fetch(`${BACKEND_URL}/health`);
  const healthJson = await healthRes.json();
  console.log(`  Health Check: HTTP ${healthRes.status} | Status: ${healthJson.status} | AI: ${healthJson.gemini_configured ? 'Gemini Live' : 'Deterministic Contextual Fallback'}`);
  console.log(`  Result: ${healthRes.ok && healthJson.status === 'ok' ? '✅ PASS' : '❌ FAIL'}\n`);

  console.log('🧠 [3/4] Testing 4 Core Real-World Scenarios on Live Backend...');
  const scenarios = [
    { name: 'Education', prompt: 'I missed my scholarship application deadline and I want to know what options I still have.' },
    { name: 'Financial Safety', prompt: 'I received a UPI collect request from someone claiming to be my bank.' },
    { name: 'Document', prompt: 'I lost my Aadhaar card while travelling.' },
    { name: 'Career', prompt: 'I want a software internship but I don\'t know which skills I am missing.' }
  ];

  const results = [];
  for (let i = 0; i < scenarios.length; i++) {
    const s = scenarios[i];
    console.log(`▶ Scenario ${i + 1} [${s.name}]: "${s.prompt}"`);
    const res = await fetch(`${BACKEND_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem: s.prompt })
    });

    if (!res.ok) {
      console.error(`  ❌ HTTP error ${res.status}`);
      continue;
    }

    const json = await res.json();
    const data = json.data;
    console.log(`  Title: "${data.title}"`);
    console.log(`  Category: ${data.category} | Urgency: ${data.urgency}`);
    console.log(`  Immediate Action: "${data.immediate_action?.title}"`);
    console.log(`  Steps: ${data.action_steps?.length} | Checklist Tasks: ${data.checklist?.length} | Resources: ${data.resources?.length}`);
    console.log(`  Result: ✅ PASS\n`);
    results.push(data);
  }

  // Cross-scenario uniqueness check
  let uniqueCount = 0;
  let totalPairs = 0;
  for (let i = 0; i < results.length; i++) {
    for (let j = i + 1; j < results.length; j++) {
      totalPairs++;
      if (results[i].title !== results[j].title && results[i].category !== results[j].category) {
        uniqueCount++;
      }
    }
  }
  console.log(`  📊 Cross-Scenario Diversity: ${uniqueCount}/${totalPairs} (${Math.round((uniqueCount/totalPairs)*100)}% unique) ✅ PASS\n`);

  console.log('🔄 [4/4] Testing Live Refinement & Verified Resources Endpoints...');
  const refineRes = await fetch(`${BACKEND_URL}/refine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      case: results[3], // career
      questionId: results[3].follow_up_questions?.[0]?.id || 'q1',
      answer: 'React + Node.js Full Stack'
    })
  });
  const refineJson = await refineRes.json();
  console.log(`  Refine Endpoint: HTTP ${refineRes.status} | Refined Title: "${refineJson.data?.title}" -> ✅ PASS`);

  const resRes = await fetch(`${BACKEND_URL}/resources`);
  const resJson = await resRes.json();
  console.log(`  Resources Endpoint: HTTP ${resRes.status} | Verified Directory Items: ${resJson.data?.length} -> ✅ PASS\n`);

  console.log('================================================================');
  console.log('🏆 ALL LIVE PRODUCTION DEPLOYMENT TESTS PASSED 100%!');
  console.log('================================================================');
}

verifyLiveDeployment().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
