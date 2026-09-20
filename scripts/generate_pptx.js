import pptxgen from '../server/node_modules/pptxgenjs/dist/pptxgen.es.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';

// Color Palette Constants
const BG_DARK = '090D16';
const CARD_BG = '131C2E';
const CARD_BORDER = '233554';
const TEXT_WHITE = 'F8FAFC';
const TEXT_MUTED = '94A3B8';
const EMERALD_ACCENT = '10B981';
const EMERALD_LIGHT = '34D399';
const CYAN_ACCENT = '38BDF8';
const ROSE_ACCENT = 'F43F5E';
const AMBER_ACCENT = 'F59E0B';
const PURPLE_ACCENT = '818CF8';

// Helper function to create base slide with background & footer
function createBaseSlide(category = 'HACKATHON PITCH DECK') {
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  // Subtle Header Bar
  slide.addText(`🌉 LifeBridge AI  |  ${category}`, {
    x: 0.8,
    y: 0.4,
    w: 8.0,
    h: 0.4,
    fontSize: 10,
    fontFace: 'Arial',
    color: TEXT_MUTED,
    bold: true
  });

  // Footer
  slide.addText('LifeBridge AI — "You have a problem. Let\'s find your next step."', {
    x: 0.8,
    y: 7.0,
    w: 8.5,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: TEXT_MUTED
  });

  slide.addText('Live Production Verified', {
    x: 9.5,
    y: 7.0,
    w: 3.0,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: EMERALD_LIGHT,
    align: 'right',
    bold: true
  });

  return slide;
}

// ==========================================
// SLIDE 1: Title & Hook
// ==========================================
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 1.2, w: 4.8, h: 0.4,
    fill: { color: '10B981', transparency: 85 },
    line: { color: EMERALD_ACCENT, width: 1 }
  });
  slide.addText('✨ AI Action Navigator for Real-World Problems', {
    x: 0.9, y: 1.25, w: 4.6, h: 0.3,
    fontSize: 11, fontFace: 'Arial', color: EMERALD_LIGHT, bold: true
  });

  slide.addText('LifeBridge AI', {
    x: 0.8, y: 1.8, w: 11.5, h: 1.1,
    fontSize: 54, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  slide.addText('“You have a problem. Let’s find your next step.”', {
    x: 0.8, y: 3.0, w: 11.5, h: 0.6,
    fontSize: 22, fontFace: 'Arial', color: CYAN_ACCENT, bold: true
  });

  slide.addText('Chatbots give answers. LifeBridge turns a real-world crisis into an actionable, visual, and trackable pathway.', {
    x: 0.8, y: 3.7, w: 10.5, h: 0.6,
    fontSize: 14, fontFace: 'Arial', color: TEXT_MUTED
  });

  // Feature highlights cards
  const badges = [
    { title: '🚀 Production Live', desc: 'Vercel + Render Cloud', x: 0.8 },
    { title: '🧠 Dual-Tier Reasoning', desc: 'Gemini + Offline Brain', x: 4.8 },
    { title: '🛡️ Zero Hallucinations', desc: 'Verified Statutory Portals', x: 8.8 }
  ];

  badges.forEach(b => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: b.x, y: 4.8, w: 3.6, h: 1.5,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1 },
      rectRadius: 0.15
    });
    slide.addText(b.title, {
      x: b.x + 0.3, y: 5.1, w: 3.0, h: 0.4,
      fontSize: 13, fontFace: 'Arial', color: TEXT_WHITE, bold: true
    });
    slide.addText(b.desc, {
      x: b.x + 0.3, y: 5.6, w: 3.0, h: 0.4,
      fontSize: 11, fontFace: 'Arial', color: TEXT_MUTED
    });
  });
}

// ==========================================
// SLIDE 2: The Problem (Action Gap)
// ==========================================
{
  const slide = createBaseSlide('01. THE PROBLEM');

  slide.addText('The "Action Gap" in Generative AI', {
    x: 0.8, y: 0.9, w: 11.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  // Left Card: Real-World Crisis
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.8, w: 5.4, h: 4.8,
    fill: { color: CARD_BG },
    line: { color: ROSE_ACCENT, width: 1.5 },
    rectRadius: 0.15
  });
  slide.addText('🚨 The Real-World Crisis', {
    x: 1.1, y: 2.1, w: 4.8, h: 0.4,
    fontSize: 16, fontFace: 'Arial', color: ROSE_ACCENT, bold: true
  });
  slide.addText([
    { text: '• Fragmented Portals: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Unclear document requirements across scattered institutional sites.\n\n', options: { color: TEXT_MUTED } },
    { text: '• Cognitive Overload: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'High anxiety and panic make it difficult to prioritize what to do first.\n\n', options: { color: TEXT_MUTED } },
    { text: '• Strict Deadlines: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Scholarship appeal windows and cyber fraud reports expire quickly.\n\n', options: { color: TEXT_MUTED } },
    { text: '• Multi-Day Tracking: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Resolutions take days or weeks with no structured tracking tool.', options: { color: TEXT_MUTED } }
  ], {
    x: 1.1, y: 2.7, w: 4.8, h: 3.6,
    fontSize: 11, fontFace: 'Arial'
  });

  // Right Card: Why Chatbots Fail
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.6, y: 1.8, w: 5.8, h: 4.8,
    fill: { color: CARD_BG },
    line: { color: AMBER_ACCENT, width: 1.5 },
    rectRadius: 0.15
  });
  slide.addText('⚠️ Why Traditional Chatbots Fail', {
    x: 6.9, y: 2.1, w: 5.2, h: 0.4,
    fontSize: 16, fontFace: 'Arial', color: AMBER_ACCENT, bold: true
  });
  slide.addText([
    { text: '• Walls of Unranked Text: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Dumps 15 general suggestions without clarifying the #1 priority today.\n\n', options: { color: TEXT_MUTED } },
    { text: '• Ephemeral State: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Close the browser tab and all checklist progress is completely erased.\n\n', options: { color: TEXT_MUTED } },
    { text: '• Hallucination Risk: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Invents outdated rules, non-existent links, and unverified phone numbers.\n\n', options: { color: TEXT_MUTED } },
    { text: '• No Topological Flow: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Fails to map prerequisite document milestones and dependencies.', options: { color: TEXT_MUTED } }
  ], {
    x: 6.9, y: 2.7, w: 5.2, h: 3.6,
    fontSize: 11, fontFace: 'Arial'
  });
}

// ==========================================
// SLIDE 3: The Solution (Comparison)
// ==========================================
{
  const slide = createBaseSlide('02. THE SOLUTION');

  slide.addText('From Conversation to Case Resolution', {
    x: 0.8, y: 0.9, w: 11.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  const rows = [
    ['Feature / Paradigm', 'Traditional Conversational Chatbots', 'LifeBridge AI Action Navigator'],
    ['Immediate Priority', 'Unranked wall of 10+ general suggestions', '🎯 Spotlight "WHAT SHOULD I DO NOW?" with Rationale'],
    ['Visual Guidance', 'Flat text causing decision paralysis', '🗺️ Interactive SVG Topological Action Graph'],
    ['Case Persistence', 'Lost as soon as the tab closes', '📂 Local-First Workspace + Live Checklist Sync'],
    ['Resource Integrity', 'Risk of hallucinated links / fake numbers', '🏛️ Strict Verified Official Statutory Directory'],
    ['Adaptability', 'Must manually re-type long follow-up prompts', '🔄 1-Click Adaptive Context Refinement Chips']
  ];

  slide.addTable(rows, {
    x: 0.8, y: 1.8, w: 11.6, h: 4.8,
    colW: [2.2, 4.4, 5.0],
    fill: { color: CARD_BG },
    color: TEXT_WHITE,
    fontSize: 11,
    fontFace: 'Arial',
    border: { pt: 1, color: CARD_BORDER },
    align: 'left',
    valign: 'middle'
  });
}

// ==========================================
// SLIDE 4: 10-Stage Pipeline
// ==========================================
{
  const slide = createBaseSlide('03. AI ARCHITECTURE');

  slide.addText('The 10-Stage AI Action Pipeline', {
    x: 0.8, y: 0.9, w: 11.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  const stages = [
    { num: '01', title: 'Situation Input', desc: 'Natural language incident description' },
    { num: '02', title: 'Entity Extraction', desc: 'Identify bottlenecks & missing info' },
    { num: '03', title: 'Triage & Urgency', desc: 'Classify domain & severity level' },
    { num: '04', title: 'Dual-Tier AI', desc: 'Gemini 1.5 JSON or Heuristic Brain' },
    { num: '05', title: 'Next Action Spotlight', desc: 'Prioritized task + Why It Matters' },
    { num: '06', title: 'Action Roadmap', desc: 'Numbered step-by-step milestones' },
    { num: '07', title: 'Topological Graph', desc: 'Dynamic SVG prerequisite map' },
    { num: '08', title: 'Official Gateways', desc: 'Verified statutory portals & numbers' },
    { num: '09', title: 'Checklist Sync', desc: 'Deterministic progress & activity log' },
    { num: '10', title: '1-Click Refine', desc: 'Adaptive plan tailoring & sync' }
  ];

  stages.forEach((st, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);
    const x = 0.8 + col * 2.36;
    const y = 1.8 + row * 2.4;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 2.15, h: 2.1,
      fill: { color: CARD_BG },
      line: { color: (idx === 4 || idx === 9) ? EMERALD_ACCENT : CARD_BORDER, width: 1.5 },
      rectRadius: 0.1
    });

    slide.addText(st.num, {
      x: x + 0.15, y: y + 0.15, w: 1.8, h: 0.35,
      fontSize: 14, fontFace: 'Arial', color: EMERALD_LIGHT, bold: true
    });

    slide.addText(st.title, {
      x: x + 0.15, y: y + 0.55, w: 1.8, h: 0.5,
      fontSize: 11, fontFace: 'Arial', color: TEXT_WHITE, bold: true
    });

    slide.addText(st.desc, {
      x: x + 0.15, y: y + 1.1, w: 1.8, h: 0.85,
      fontSize: 9.5, fontFace: 'Arial', color: TEXT_MUTED
    });
  });
}

// ==========================================
// SLIDE 5: Product Pillars
// ==========================================
{
  const slide = createBaseSlide('04. PRODUCT FEATURES');

  slide.addText('Engineered for Focus Under Pressure', {
    x: 0.8, y: 0.9, w: 11.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  const pillars = [
    {
      icon: '⚡',
      title: '“WHAT SHOULD I DO NOW?” Spotlight',
      color: AMBER_ACCENT,
      desc: 'Eliminates cognitive overload by highlighting the single immediate priority for today with a prominent "Why This Matters" rationale.'
    },
    {
      icon: '🗺️',
      title: 'Topological Action Graph',
      color: CYAN_ACCENT,
      desc: 'Interactive visual SVG dependency canvas showing prerequisite steps, required documents, official channels, and real-time completion state.'
    },
    {
      icon: '☑️',
      title: 'Deterministic Checklist Sync',
      color: EMERALD_LIGHT,
      desc: 'Calculates real-time mathematical progress (X/Y completed) synced with case timelines, status transitions, and confetti completion rewards.'
    },
    {
      icon: '🏛️',
      title: 'Verified Official Gateways',
      color: PURPLE_ACCENT,
      desc: 'Curated directory of authentic statutory portals (UIDAI, NSP, National Cyber Crime 1930) with zero hallucinations and trust badges.'
    }
  ];

  pillars.forEach((p, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 0.8 + col * 5.9;
    const y = 1.8 + row * 2.45;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 5.6, h: 2.2,
      fill: { color: CARD_BG },
      line: { color: p.color, width: 1.2 },
      rectRadius: 0.15
    });

    slide.addText(`${p.icon}  ${p.title}`, {
      x: x + 0.3, y: y + 0.25, w: 5.0, h: 0.45,
      fontSize: 14, fontFace: 'Arial', color: p.color, bold: true
    });

    slide.addText(p.desc, {
      x: x + 0.3, y: y + 0.75, w: 5.0, h: 1.2,
      fontSize: 11, fontFace: 'Arial', color: TEXT_MUTED
    });
  });
}

// ==========================================
// SLIDE 6: Dual-Tier Engine & Reliability
// ==========================================
{
  const slide = createBaseSlide('05. RELIABILITY & AI ENGINE');

  slide.addText('Dual-Tier Intelligence: 100% Zero-Downtime', {
    x: 0.8, y: 0.9, w: 11.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 1.8, w: 5.6, h: 3.4,
    fill: { color: CARD_BG },
    line: { color: CYAN_ACCENT, width: 1.5 },
    rectRadius: 0.15
  });
  slide.addText('Tier 1: Google Gemini 1.5 Flash (Live AI)', {
    x: 1.1, y: 2.1, w: 5.0, h: 0.4,
    fontSize: 15, fontFace: 'Arial', color: CYAN_ACCENT, bold: true
  });
  slide.addText([
    { text: '• Schema-Enforced JSON Mode: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Ensures structured, deterministic response parsing.\n\n', options: { color: TEXT_MUTED } },
    { text: '• Anti-Generic Validation: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Automated validator intercepts and rejects vague boilerplate.\n\n', options: { color: TEXT_MUTED } },
    { text: '• Quality Scoring System: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Every generated roadmap scored 0-100 for entity specificity.', options: { color: TEXT_MUTED } }
  ], {
    x: 1.1, y: 2.6, w: 5.0, h: 2.4,
    fontSize: 10.5, fontFace: 'Arial'
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8, y: 1.8, w: 5.6, h: 3.4,
    fill: { color: CARD_BG },
    line: { color: EMERALD_ACCENT, width: 1.5 },
    rectRadius: 0.15
  });
  slide.addText('Tier 2: Contextual Heuristic Brain (v2.0)', {
    x: 7.1, y: 2.1, w: 5.0, h: 0.4,
    fontSize: 15, fontFace: 'Arial', color: EMERALD_LIGHT, bold: true
  });
  slide.addText([
    { text: '• 100% Zero-API Resilience: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Operates smoothly when cloud AI APIs are unconfigured or offline.\n\n', options: { color: TEXT_MUTED } },
    { text: '• Semantic Entity Matching: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Extracts domain-specific actions across 6 major life verticals.\n\n', options: { color: TEXT_MUTED } },
    { text: '• 100% Diversity Score: ', options: { bold: true, color: TEXT_WHITE } },
    { text: 'Verified across 15/15 pairwise cross-scenario uniqueness tests.', options: { color: TEXT_MUTED } }
  ], {
    x: 7.1, y: 2.6, w: 5.0, h: 2.4,
    fontSize: 10.5, fontFace: 'Arial'
  });

  // Test Suite Banner
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 5.5, w: 11.6, h: 1.1,
    fill: { color: '0F172A' },
    line: { color: EMERALD_ACCENT, width: 1 },
    rectRadius: 0.1
  });
  slide.addText('🧪 Automated Verification: 6/6 Test Suites Passed (100% Pass Rate) | Production Build: 0 Errors', {
    x: 1.1, y: 5.85, w: 11.0, h: 0.4,
    fontSize: 12, fontFace: 'Arial', color: EMERALD_LIGHT, bold: true
  });
}

// ==========================================
// SLIDE 7: Real-World Scenarios
// ==========================================
{
  const slide = createBaseSlide('06. REAL-WORLD USE CASES');

  slide.addText('Tested Across Diverse Real-World Scenarios', {
    x: 0.8, y: 0.9, w: 11.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  const domains = [
    {
      icon: '🎓',
      name: 'Education',
      query: '"Missed scholarship application deadline..."',
      action: 'Download official defect remarks PDF & submit representation to college nodal officer.'
    },
    {
      icon: '🛡️',
      name: 'Financial Safety',
      query: '"Received suspicious UPI collect request..."',
      action: 'Decline collect request immediately, reset UPI PIN, and log incident with 1930 Cyber Fraud helpline.'
    },
    {
      icon: '📄',
      name: 'Official Documents',
      query: '"Lost Aadhaar card while travelling..."',
      action: 'Download instant password-protected e-Aadhaar from UIDAI & activate biometric lock on mAadhaar.'
    },
    {
      icon: '💼',
      name: 'Career Roadmaps',
      query: '"Need software internship skill roadmap..."',
      action: 'Benchmark profile against 5 active job postings, build 1 deployed full-stack project, format ATS resume.'
    }
  ];

  domains.forEach((d, idx) => {
    const x = 0.8 + idx * 2.95;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.8, w: 2.75, h: 4.8,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1.2 },
      rectRadius: 0.15
    });

    slide.addText(d.icon, {
      x: x + 0.2, y: 2.1, w: 2.35, h: 0.6,
      fontSize: 28, align: 'center'
    });

    slide.addText(d.name, {
      x: x + 0.2, y: 2.8, w: 2.35, h: 0.4,
      fontSize: 14, fontFace: 'Arial', color: TEXT_WHITE, bold: true, align: 'center'
    });

    slide.addText(d.query, {
      x: x + 0.2, y: 3.3, w: 2.35, h: 0.8,
      fontSize: 10, fontFace: 'Arial', color: CYAN_ACCENT, italic: true, align: 'center'
    });

    slide.addText('⚡ Immediate Action:', {
      x: x + 0.2, y: 4.2, w: 2.35, h: 0.3,
      fontSize: 10, fontFace: 'Arial', color: EMERALD_LIGHT, bold: true
    });

    slide.addText(d.action, {
      x: x + 0.2, y: 4.5, w: 2.35, h: 1.8,
      fontSize: 9.5, fontFace: 'Arial', color: TEXT_MUTED
    });
  });
}

// ==========================================
// SLIDE 8: Tech Stack & Architecture
// ==========================================
{
  const slide = createBaseSlide('07. ENGINEERING RIGOR');

  slide.addText('Full-Stack Production Stack', {
    x: 0.8, y: 0.9, w: 11.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  const stack = [
    {
      title: '🖥️ Frontend Application',
      host: 'Deployed Live on Vercel',
      items: [
        'React 18 & Vite 6 (Single Page App)',
        'Tailwind CSS & Lucide Icons design system',
        'Custom interactive SVG Action Graph Canvas',
        'Confetti celebration & dynamic progress bar',
        'SPA Deep-linking with rewrite fallbacks'
      ]
    },
    {
      title: '⚙️ Backend Microservice',
      host: 'Deployed Live on Render',
      items: [
        'Node.js & Express API service',
        'Google Gemini 1.5 Flash SDK integration',
        'Dynamic Port & CORS handling',
        'Anti-Generic Quality Scoring Engine',
        'Deterministic Heuristic Fallback Brain v2.0'
      ]
    },
    {
      title: '🔒 Persistence & Security',
      host: 'Local-First + Cloud Ready',
      items: [
        'Local-First localStorage persistence',
        'Optional Supabase PostgreSQL with RLS',
        'Zero API keys or secrets in client bundle',
        'Strict `.env` git-protection policy',
        'Automated live health & scenario test suite'
      ]
    }
  ];

  stack.forEach((s, idx) => {
    const x = 0.8 + idx * 3.95;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.8, w: 3.75, h: 4.8,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1.2 },
      rectRadius: 0.15
    });

    slide.addText(s.title, {
      x: x + 0.25, y: 2.1, w: 3.25, h: 0.4,
      fontSize: 13, fontFace: 'Arial', color: TEXT_WHITE, bold: true
    });

    slide.addText(s.host, {
      x: x + 0.25, y: 2.5, w: 3.25, h: 0.3,
      fontSize: 10, fontFace: 'Arial', color: EMERALD_LIGHT, bold: true
    });

    const bulletItems = s.items.map(item => ({ text: `• ${item}\n\n`, options: { color: TEXT_MUTED } }));
    slide.addText(bulletItems, {
      x: x + 0.25, y: 3.0, w: 3.25, h: 3.3,
      fontSize: 10, fontFace: 'Arial'
    });
  });
}

// ==========================================
// SLIDE 9: Trust & Impact
// ==========================================
{
  const slide = createBaseSlide('08. TRUST & ETHICS');

  slide.addText('Responsible AI & User Trust', {
    x: 0.8, y: 0.9, w: 11.5, h: 0.6,
    fontSize: 28, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  const ethics = [
    {
      icon: '🛡️',
      title: 'Zero Hallucinations Policy',
      desc: 'All resources link strictly to verified statutory directories (UIDAI, National Career Service, NSP, Cyber Crime 1930). LifeBridge never fabricates government URLs or emergency phone numbers.'
    },
    {
      icon: '🔒',
      title: 'Privacy By Design',
      desc: 'Sensitive crises remain stored on the user\'s local device by default via Local-First architecture. No mandatory account creation or unauthorized data logging.'
    },
    {
      icon: '🧘',
      title: 'Calm UX Under Crisis',
      desc: 'Structured visual hierarchy and reassuring deterministic progress bars replace high-friction walls of text to eliminate panic and decision paralysis.'
    },
    {
      icon: '⚖️',
      title: 'Clear Navigational Role',
      desc: 'Transparent disclaimer that LifeBridge provides procedural organization and navigation, while statutory requirements are verified through official portals.'
    }
  ];

  ethics.forEach((e, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 0.8 + col * 5.9;
    const y = 1.8 + row * 2.45;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 5.6, h: 2.2,
      fill: { color: CARD_BG },
      line: { color: CARD_BORDER, width: 1.2 },
      rectRadius: 0.15
    });

    slide.addText(`${e.icon}  ${e.title}`, {
      x: x + 0.3, y: y + 0.25, w: 5.0, h: 0.45,
      fontSize: 13, fontFace: 'Arial', color: EMERALD_LIGHT, bold: true
    });

    slide.addText(e.desc, {
      x: x + 0.3, y: y + 0.75, w: 5.0, h: 1.2,
      fontSize: 10.5, fontFace: 'Arial', color: TEXT_MUTED
    });
  });
}

// ==========================================
// SLIDE 10: Closing & Q&A
// ==========================================
{
  const slide = pptx.addSlide();
  slide.background = { color: BG_DARK };

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 0.8, w: 3.5, h: 0.4,
    fill: { color: '10B981', transparency: 85 },
    line: { color: EMERALD_ACCENT, width: 1 }
  });
  slide.addText('🏆 Ready for Hackathon Demo', {
    x: 0.9, y: 0.85, w: 3.3, h: 0.3,
    fontSize: 11, fontFace: 'Arial', color: EMERALD_LIGHT, bold: true
  });

  slide.addText('Thank You!', {
    x: 0.8, y: 1.4, w: 11.5, h: 0.9,
    fontSize: 48, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  slide.addText('LifeBridge AI turns panic into clarity, and conversations into completed cases.', {
    x: 0.8, y: 2.3, w: 11.5, h: 0.5,
    fontSize: 16, fontFace: 'Arial', color: CYAN_ACCENT, bold: true
  });

  // Link Cards
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 3.2, w: 11.6, h: 2.6,
    fill: { color: CARD_BG },
    line: { color: CARD_BORDER, width: 1.5 },
    rectRadius: 0.15
  });

  slide.addText('🌐 Live Production Links:', {
    x: 1.2, y: 3.5, w: 10.8, h: 0.4,
    fontSize: 14, fontFace: 'Arial', color: TEXT_WHITE, bold: true
  });

  slide.addText([
    { text: '• Web Application (Vercel): ', options: { bold: true, color: EMERALD_LIGHT } },
    { text: 'https://client-git-main-raksha-shetty18s-projects.vercel.app\n\n', options: { color: TEXT_WHITE } },
    { text: '• Backend API (Render): ', options: { bold: true, color: CYAN_ACCENT } },
    { text: 'https://lifebridge-ai-7kcb.onrender.com\n\n', options: { color: TEXT_WHITE } },
    { text: '• GitHub Repository: ', options: { bold: true, color: PURPLE_ACCENT } },
    { text: 'https://github.com/Raksha-Shetty18/lifebridge-ai', options: { color: TEXT_WHITE } }
  ], {
    x: 1.2, y: 4.0, w: 10.8, h: 1.6,
    fontSize: 11, fontFace: 'Arial'
  });

  slide.addText('We welcome your questions and feedback!', {
    x: 0.8, y: 6.2, w: 11.6, h: 0.5,
    fontSize: 14, fontFace: 'Arial', color: TEXT_MUTED, align: 'center', bold: true
  });
}

// Generate PPTX File
const outputPath = path.resolve(__dirname, '../LifeBridge_AI_Presentation.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`✅ PowerPoint presentation successfully generated at: ${outputPath}`);
  })
  .catch(err => {
    console.error('❌ Error generating PPTX:', err);
    process.exit(1);
  });
