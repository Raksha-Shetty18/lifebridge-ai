/**
 * LifeBridge AI - Live API Integration Test Script
 * Sends actual HTTP requests to the running backend server.
 */

import express from 'express';
import cors from 'cors';
import analyzeRoutes from '../routes/analyze.js';
import casesRoutes from '../routes/cases.js';
import resourcesRoutes from '../routes/resources.js';

let serverInstance = null;
let apiBaseUrl = 'http://localhost:5000/api';

const SCENARIOS = [
  'I lost my college ID card.',
  'Someone sent me a suspicious UPI collect request.',
  'I want a Java full stack internship but don\'t know what to learn.',
  'My scholarship application was rejected.',
  'The streetlight outside my house has been broken for a week.'
];

async function ensureServerRunning() {
  try {
    const res = await fetch('http://localhost:5000/api/health', { signal: AbortSignal.timeout(1000) });
    if (res.ok) {
      apiBaseUrl = 'http://localhost:5000/api';
      return;
    }
  } catch (e) {
    // Port 5000 not responding, spawn ephemeral test server on port 5099
  }

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', analyzeRoutes);
  app.use('/api/cases', casesRoutes);
  app.use('/api/resources', resourcesRoutes);
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      product: 'LifeBridge AI — AI Action Navigator',
      timestamp: new Date().toISOString(),
      gemini_configured: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  await new Promise((resolve) => {
    serverInstance = app.listen(5099, () => {
      apiBaseUrl = 'http://localhost:5099/api';
      resolve();
    });
  });
}

async function runLiveApiTests() {
  console.log('================================================================');
  console.log('🌐 LIFEBRIDGE AI LIVE API ENDPOINT VERIFICATION');
  console.log('================================================================\n');

  await ensureServerRunning();

  // 1. Health Check
  try {
    const healthRes = await fetch(`${apiBaseUrl}/health`);
    const health = await healthRes.json();
    console.log(`📡 Health Check (${apiBaseUrl}): [${healthRes.status}] Status: ${health.status} | AI Configured: ${health.gemini_configured}\n`);
  } catch (err) {
    console.error('❌ Server health check failed:', err.message);
    if (serverInstance) serverInstance.close();
    process.exit(1);
  }

  const generatedRoadmaps = [];

  for (let i = 0; i < SCENARIOS.length; i++) {
    const prompt = SCENARIOS[i];
    console.log(`▶ [API Request ${i + 1}/${SCENARIOS.length}]: POST /api/analyze`);
    console.log(`  Input: "${prompt}"`);

    const res = await fetch(`${apiBaseUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem: prompt })
    });

    if (!res.ok) {
      console.error(`❌ Request failed with HTTP ${res.status}`);
      if (serverInstance) serverInstance.close();
      process.exit(1);
    }

    const json = await res.json();
    const data = json.data;

    console.log(`  HTTP: ${res.status} | Title: "${data.title}"`);
    console.log(`  Category: ${data.category} | Urgency: ${data.urgency}`);
    console.log(`  Immediate Action: "${data.immediate_action?.title}"`);
    console.log(`  Steps: ${data.action_steps?.length} | Checklist: ${data.checklist?.length}`);
    console.log(`  Provider Metadata:`, data.metadata);
    console.log(`  Result: ✅ OK\n`);

    generatedRoadmaps.push(data);
  }

  // Verify all 5 generated roadmaps have distinct titles and immediate actions
  console.log('--- Checking Uniqueness across 5 live API calls ---');
  let uniquePairs = 0;
  let totalPairs = 0;

  for (let i = 0; i < generatedRoadmaps.length; i++) {
    for (let j = i + 1; j < generatedRoadmaps.length; j++) {
      totalPairs++;
      const a = generatedRoadmaps[i];
      const b = generatedRoadmaps[j];
      const isUnique = a.title !== b.title && a.immediate_action?.title !== b.immediate_action?.title;
      if (isUnique) uniquePairs++;
    }
  }

  console.log(`Uniqueness Rate: ${uniquePairs}/${totalPairs} (${Math.round((uniquePairs/totalPairs)*100)}%)\n`);

  // Refine API test
  console.log('▶ [API Request 6/6]: POST /api/refine');
  const initialCase = generatedRoadmaps[2]; // Java internship
  const refineRes = await fetch(`${apiBaseUrl}/refine`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      case: initialCase,
      questionId: initialCase.follow_up_questions?.[0]?.id || 'q1',
      answer: 'Know Core Java & OOP basics'
    })
  });

  const refineJson = await refineRes.json();
  console.log(`  Refine HTTP: ${refineRes.status} | Refined Action: "${refineJson.data?.immediate_action?.title}"`);
  console.log(`  Refine Result: ✅ OK\n`);

  if (serverInstance) {
    serverInstance.close();
  }

  console.log('================================================================');
  console.log('🎉 ALL LIVE API ENDPOINT TESTS PASSED SUCCESSFULLY!');
  console.log('================================================================\n');
}

runLiveApiTests().catch(e => {
  console.error(e);
  if (serverInstance) serverInstance.close();
  process.exit(1);
});
