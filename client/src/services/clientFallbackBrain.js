/**
 * LifeBridge AI - Client-side Fallback Reasoning Brain (v2.0)
 * Mirrors the intelligent deterministic contextual reasoning engine for client-side offline resilience.
 */

import { DEMO_PRESETS } from './demoPresetsData.js';

export function generateHeuristicPlan(promptText, requestedCategory = null) {
  const text = (promptText || '').toLowerCase();

  // 1. Specific Document Matches
  if (text.includes('aadhaar') || text.includes('aadhar') || text.includes('uidai')) {
    return {
      title: 'Aadhaar Card Replacement & Biometric Security Plan',
      category: 'documents',
      urgency: 'medium',
      problem_summary: `You need to replace or secure your Aadhaar details regarding "${promptText}".`,
      immediate_action: {
        title: 'Download your official digital e-Aadhaar PDF instantly from myaadhaar.uidai.gov.in',
        why: 'e-Aadhaar is legally valid and password-protected for all official submissions today.',
        action_type: 'portal_check'
      },
      missing_information: ['12-digit Aadhaar Number or Enrolment ID', 'Whether registered mobile number is active'],
      safety_notes: ['Lock your biometrics via mAadhaar app to prevent unauthorized AePS debit attempts.'],
      follow_up_questions: [
        { id: 'q_aadhaar_phone', question: 'Is your mobile number currently receiving UIDAI OTPs?', options: ['Yes, active', 'No, need mobile update', 'Not sure'] }
      ],
      action_steps: [
        { step_number: 1, title: 'Download Instant e-Aadhaar PDF on myaadhaar.uidai.gov.in', description: 'Log in with your Aadhaar number and OTP. Download the digitally signed PDF.', why_it_matters: 'Provides legally valid identity proof immediately without waiting for postal delivery.', documents: ['Aadhaar Number', 'Registered Mobile for OTP'], action_type: 'portal_check', status: 'pending' },
        { step_number: 2, title: 'Lock Biometrics on UIDAI Portal', description: 'Enable Biometric Lock to prevent unauthorized fingerprint authentication.', why_it_matters: 'Eliminates fraudulent biometric debit misuse of your lost identity details.', documents: ['mAadhaar Credentials'], action_type: 'security', status: 'pending' },
        { step_number: 3, title: 'Order Official PVC Card (Optional)', description: 'Order PVC card on UIDAI portal for ₹50 with Speed Post delivery.', why_it_matters: 'Durable physical card with microtext and QR verification.', documents: ['Online Payment Method (₹50)'], action_type: 'portal_check', status: 'pending' }
      ],
      checklist: [
        { id: 'c1', title: 'Download password-protected e-Aadhaar PDF from myaadhaar.uidai.gov.in', category: 'immediate', completed: false },
        { id: 'c2', title: 'Enable Biometric Lock on UIDAI portal', category: 'security', completed: false },
        { id: 'c3', title: 'Order official PVC reprint if physical card is strictly required', category: 'documents', completed: false }
      ],
      resources: [
        { title: 'UIDAI Self Service Portal (m-Aadhaar)', description: 'Official portal to download e-Aadhaar and manage biometrics.', url: 'https://myaadhaar.uidai.gov.in', source_type: 'government_portal', verified: true }
      ],
      metadata: { provider: 'client_fallback', fallback_used: true, model: 'deterministic-client-v2' }
    };
  }

  if (text.includes('college id') || text.includes('student id') || text.includes('identity card') || text.includes('campus id')) {
    return {
      title: 'Lost College Student ID Card Replacement Roadmap',
      category: 'documents',
      urgency: 'medium',
      problem_summary: `Your student ID card was lost or misplaced, requiring campus clearance and re-issuance.`,
      immediate_action: {
        title: 'Notify campus security & administrative office to prevent unauthorized badge access',
        why: 'Reporting immediately clears you of liability if your badge is used to enter campus facilities or borrow library books.',
        action_type: 'in_person'
      },
      missing_information: ['College Department & Roll Number', 'Whether lost on campus or outside'],
      safety_notes: ['Report lost ID immediately to campus security to avoid being held accountable for unauthorized facility checkouts.'],
      follow_up_questions: [
        { id: 'q_lost_location', question: 'Where did you last have your college ID card?', options: ['Inside campus (Library/Classroom/Canteen)', 'Outside campus (Bus/Metro/Transit)', 'Not sure'] }
      ],
      action_steps: [
        { step_number: 1, title: 'Check Lost & Found at Campus Security & Library Desk', description: 'Visit the main security gate and library circulation desk to inspect returned items.', why_it_matters: 'Most lost student ID cards are deposited with security personnel on the same day.', documents: ['Government ID Proof (Aadhaar / DL)'], action_type: 'in_person', status: 'pending' },
        { step_number: 2, title: 'Submit Written Lost Report to Department HOD / Dean Office', description: 'Draft a brief application to the Head of Department to obtain a temporary gate pass.', why_it_matters: 'A signed provisional gate pass ensures uninterrupted class attendance and lab access.', documents: ['Written Application', 'Fee Receipt'], action_type: 'document_prep', status: 'pending' },
        { step_number: 3, title: 'Pay Statutory Duplicate ID Fee & Submit Re-issue Form', description: 'Pay the duplicate card fee at accounts counter and submit the receipt to the ID printing cell.', why_it_matters: 'Initiates RFID chip encoding and issuance of your replacement student card.', documents: ['Fee Challan', 'Passport Photo'], action_type: 'authority', status: 'pending' }
      ],
      checklist: [
        { id: 'c1', title: 'Inquire at Central Campus Security and Library Lost & Found registers', category: 'immediate', completed: false },
        { id: 'c2', title: 'Get provisional gate pass signed by Department HOD', category: 'authority', completed: false },
        { id: 'c3', title: 'Pay duplicate ID challan at college accounts window', category: 'documents', completed: false }
      ],
      resources: [
        { title: 'National Scholarship Portal (NSP)', description: 'Central student verification and educational service registry.', url: 'https://scholarships.gov.in', source_type: 'government_portal', verified: true }
      ],
      metadata: { provider: 'client_fallback', fallback_used: true, model: 'deterministic-client-v2' }
    };
  }

  // 2. Specific Financial Scams
  if (text.includes('upi') || text.includes('collect request') || text.includes('qr code')) {
    return {
      title: 'UPI Collect Request / Fraudulent Payment Defense Plan',
      category: 'financial_safety',
      urgency: 'high',
      problem_summary: 'You received an unsolicited UPI payment collect request or suspicious QR code link.',
      immediate_action: {
        title: 'Decline the collect request in your UPI app immediately—NEVER enter your UPI PIN to receive money',
        why: 'Entering a UPI PIN authorizes a DEBIT from your bank account; receiving money never requires a PIN.',
        action_type: 'security'
      },
      missing_information: ['Exact amount requested', 'UPI App used (GPay/PhonePe/Paytm/BHIM)', 'Whether OTP/PIN was shared'],
      safety_notes: ['Receiving money NEVER requires entering a UPI PIN.', 'If money was debited, call 1930 within the Golden Hour window (first 2 hours).'],
      follow_up_questions: [
        { id: 'q_debited', question: 'Was any money deducted from your bank account?', options: ['No, I rejected it in time', 'Yes, unauthorized debit occurred', 'Entered PIN but not sure'] }
      ],
      action_steps: [
        { step_number: 1, title: 'Decline Collect Request & Block Sender in Payment App', description: 'Open the UPI app, tap "Decline" on the pending collect request, and select "Report Fraud".', why_it_matters: 'Prevents accidental taps and marks the fraudster UPI handle across NPCI fraud defense databases.', documents: ['Screenshot of Request'], action_type: 'security', status: 'pending' },
        { step_number: 2, title: 'Change UPI PIN via Bank Account Settings', description: 'Navigate to Bank Accounts in your payment app, tap "Reset UPI PIN", and authenticate with debit card.', why_it_matters: 'Ensures no scheduled background mandates or unauthorized auto-debit triggers remain active.', documents: ['Debit Card Last 6 Digits'], action_type: 'security', status: 'pending' },
        { step_number: 3, title: 'Report Fraudulent VPA to Cyber Crime Portal (1930)', description: 'Submit a complaint detailing the scammer UPI ID and phone number.', why_it_matters: 'Enables National Cyber Crime Reporting Portal to flag and freeze mule bank accounts linked to the fraudster.', documents: ['Screenshot of Fraudulent Handle'], action_type: 'helpline', status: 'pending' }
      ],
      checklist: [
        { id: 'c1', title: 'Reject pending UPI request and tap "Report as Fraud"', category: 'immediate', completed: false },
        { id: 'c2', title: 'Capture clear screenshots of the message and fraudster handle', category: 'immediate', completed: false },
        { id: 'c3', title: 'Reset UPI PIN in your mobile banking app', category: 'security', completed: false }
      ],
      resources: [
        { title: 'National Cyber Crime Reporting Portal (1930 Helpline)', description: 'Toll-free national financial cyber fraud emergency reporting platform.', url: 'https://cybercrime.gov.in', source_type: 'statutory_helpline', verified: true }
      ],
      metadata: { provider: 'client_fallback', fallback_used: true, model: 'deterministic-client-v2' }
    };
  }

  // 3. Career - Java Full Stack Track
  if (text.includes('java') || text.includes('spring') || text.includes('backend')) {
    return {
      title: 'Java Full Stack & Backend Internship Roadmap',
      category: 'career',
      urgency: 'low',
      problem_summary: 'You want to land a Java full stack / backend software development internship and need an actionable skill benchmark.',
      immediate_action: {
        title: 'Build a production-style REST API with Spring Boot, Spring Data JPA, and PostgreSQL to showcase on GitHub',
        why: 'Hiring managers for Java roles evaluate understanding of OOP, dependency injection, and database transactions over basic theory.',
        action_type: 'document_prep'
      },
      missing_information: ['Current proficiency with Java Core / Collections', 'Familiarity with Spring Boot and SQL'],
      safety_notes: ['Do not pay for internship placement guarantees. Genuine companies evaluate GitHub projects and problem-solving skills.'],
      follow_up_questions: [
        { id: 'q_java_level', question: 'What is your current familiarity with Java frameworks?', options: ['Know Core Java & OOP basics', 'Know Spring Boot & REST APIs', 'Complete beginner to Java', 'Built full-stack projects'] }
      ],
      action_steps: [
        { step_number: 1, title: 'Master Core Java OOP, Collections & Streams', description: 'Solidify Collections Framework (HashMap, ArrayList, Set), Streams API, and Exception Handling.', why_it_matters: '90% of Java technical screening rounds start with live coding in Collections.', documents: ['GitHub Code Repository'], action_type: 'document_prep', status: 'pending' },
        { step_number: 2, title: 'Build and Deploy 1 Spring Boot REST API Project', description: 'Construct a modular backend with Spring Boot, Spring Data JPA, Hibernate, and PostgreSQL. Deploy to cloud.', why_it_matters: 'A working, deployed backend repository proves production readiness to recruiters.', documents: ['Deployed Backend URL', 'Swagger API Documentation'], action_type: 'document_prep', status: 'pending' },
        { step_number: 3, title: 'Create Single-Column ATS Resume Highlighting Project Metrics', description: 'Draft a concise 1-page resume focusing on tech stack used, database schemas, and API performance.', why_it_matters: 'ATS software prioritizes concrete technical keywords and measurable project descriptions.', documents: ['PDF Resume (< 1MB)'], action_type: 'document_prep', status: 'pending' }
      ],
      checklist: [
        { id: 'c1', title: 'Complete practice problems on Java Collections & Streams', category: 'immediate', completed: false },
        { id: 'c2', title: 'Build and push Spring Boot + PostgreSQL REST API to GitHub', category: 'documents', completed: false },
        { id: 'c3', title: 'Format ATS-compliant 1-page resume featuring deployed project link', category: 'documents', completed: false }
      ],
      resources: [
        { title: 'National Career Service (NCS)', description: 'Government career development and verified internship portal.', url: 'https://www.ncs.gov.in', source_type: 'government_portal', verified: true }
      ],
      metadata: { provider: 'client_fallback', fallback_used: true, model: 'deterministic-client-v2' }
    };
  }

  // 3b. General Career & Software Internship Track
  if (text.includes('internship') || text.includes('intern') || text.includes('software') || text.includes('coding') || text.includes('developer') || text.includes('career')) {
    return {
      title: 'Software Engineering Internship & Skills Roadmap',
      category: 'career',
      urgency: 'low',
      problem_summary: 'You are preparing for software developer internships and need a structured roadmap to identify and close technical skill gaps.',
      immediate_action: {
        title: 'Benchmark your current technical profile against 5 active software engineering job listings and identify your 2 core skill gaps',
        why: 'Targeting specific industry requirements (e.g. Git, REST APIs, Data Structures, or Cloud deployment) prevents tutorial paralysis and accelerates interview readiness.',
        action_type: 'document_prep'
      },
      missing_information: ['Target tech domain (Full Stack, Backend, Frontend, or AI)', 'Target application timeline'],
      safety_notes: ['Never pay placement guarantee agencies or upfront fees for internship offers. Legitimate opportunities are either paid or free accredited programs.'],
      follow_up_questions: [
        { id: 'q_primary_track', question: 'Which software development domain are you most interested in?', options: ['Full Stack (React + Node/Java)', 'Backend & Cloud APIs', 'Frontend & UI Engineering', 'Data Engineering / AI'] },
        { id: 'q_project_status', question: 'Do you currently have a live project deployed online?', options: ['Yes, deployed on Vercel/Render/Cloud', 'Have local code on GitHub only', 'Currently building fundamentals'] }
      ],
      action_steps: [
        { step_number: 1, title: 'Audit Core CS Fundamentals & Pick 1 Primary Tech Stack', description: 'Choose one primary language (Java, Python, or TypeScript) and practice Data Structures with focused problem sets.', why_it_matters: 'Technical interviewers prioritize deep problem-solving in 1 language over surface-level knowledge of 10 frameworks.', documents: ['GitHub Code Repository'], action_type: 'document_prep', status: 'pending' },
        { step_number: 2, title: 'Build and Deploy One End-to-End Production-Grade Project', description: 'Construct a complete application with user authentication, database CRUD operations, and responsive UI. Deploy live to Vercel, Render, or Railway.', why_it_matters: 'A working live URL in your resume header proves you can ship production code independently.', documents: ['Deployed Application URL', 'Clean GitHub README with architecture diagram'], action_type: 'portfolio_build', status: 'pending' },
        { step_number: 3, title: 'Structure ATS-Optimized One-Page Resume', description: 'Format a single-column markdown/PDF resume highlighting tech stack, system design choices, and quantifiable project metrics.', why_it_matters: 'ATS parsers reject multi-column templates before human recruiters ever see them.', documents: ['ATS-Compliant PDF Resume (< 1MB)'], action_type: 'document_prep', status: 'pending' }
      ],
      checklist: [
        { id: 'c1', title: 'Select 1 primary language and complete core Data Structures practice problems', category: 'immediate', completed: false },
        { id: 'c2', title: 'Build and deploy a full-stack application with live hosted URL and GitHub repo', category: 'immediate', completed: false },
        { id: 'c3', title: 'Format single-column ATS resume with deployed project links', category: 'documents', completed: false }
      ],
      resources: [
        { title: 'National Career Service (NCS)', description: 'Government career development and verified internship portal.', url: 'https://www.ncs.gov.in', source_type: 'government_portal', verified: true }
      ],
      metadata: { provider: 'client_fallback', fallback_used: true, model: 'deterministic-client-v2' }
    };
  }

  // 4. Civic - Streetlight
  if (text.includes('streetlight') || text.includes('street light') || text.includes('lamp post')) {
    return {
      title: 'Broken Streetlight Municipal Grievance & Escalation Plan',
      category: 'civic',
      urgency: 'medium',
      problem_summary: 'A public streetlight near your residence is non-functional, creating safety and visibility concerns.',
      immediate_action: {
        title: 'Locate the exact Pole Number / Ward Name and snap a geotagged photo of the dark area',
        why: 'Municipal electrical engineering departments dispatch repair crews strictly based on Pole Numbers and Ward asset IDs.',
        action_type: 'document_prep'
      },
      missing_information: ['Exact Pole Number / Landmark', 'Municipal Ward Name / Zone Number'],
      safety_notes: ['Avoid dark, unlit streets at night and inform neighbors to register parallel complaints.'],
      follow_up_questions: [
        { id: 'q_dark_duration', question: 'How long has the streetlight been malfunctioning?', options: ['More than 1 week', '2-3 days', 'Flickering / Intermittent', 'Multiple lights out'] }
      ],
      action_steps: [
        { step_number: 1, title: 'Locate Pole Number & Capture Geotagged Night Photo', description: 'Inspect the streetlight pole for its painted asset/pole number. Take a clear geotagged photo showing the dark street section.', why_it_matters: 'Municipal electrical squads require exact pole numbers to assign field repair technicians.', documents: ['Geotagged Photo', 'Streetlight Pole Number'], action_type: 'document_prep', status: 'pending' },
        { step_number: 2, title: 'Register Online Grievance on Municipal Citizen Portal', description: 'Log into your city municipal app or State Public Grievance Portal. Select "Street Lighting Department" and attach the photo.', why_it_matters: 'Generates a tracked grievance docket number with a binding 48-72 hour service level agreement (SLA).', documents: ['Complaint Reference Form', 'Geotagged Photo'], action_type: 'portal_check', status: 'pending' },
        { step_number: 3, title: 'Escalate to Local Ward Councilor / Junior Engineer if Unresolved', description: 'If the light is not restored within 72 hours, send the grievance docket number to the local ward office.', why_it_matters: 'Direct administrative escalation triggers supervisory inspection.', documents: ['Grievance Ticket ID'], action_type: 'authority', status: 'pending' }
      ],
      checklist: [
        { id: 'c1', title: 'Note down painted Streetlight Pole Number and nearest landmark', category: 'immediate', completed: false },
        { id: 'c2', title: 'Submit complaint on city municipal portal and save Grievance Docket ID', category: 'immediate', completed: false }
      ],
      resources: [
        { title: 'CPGRAMS Central Grievance Portal', description: 'National grievance portal for administrative departments.', url: 'https://pgportal.gov.in', source_type: 'official_government', verified: true }
      ],
      metadata: { provider: 'client_fallback', fallback_used: true, model: 'deterministic-client-v2' }
    };
  }

  // 5. Education - Scholarship Rejection
  if (text.includes('scholarship') || text.includes('fellowship') || text.includes('fee waiver')) {
    return JSON.parse(JSON.stringify(DEMO_PRESETS.scholarship));
  }

  // Fallback - General Contextual
  let category = requestedCategory || 'civic';
  let urgency = 'medium';

  if (text.includes('urgent') || text.includes('emergency') || text.includes('threat') || text.includes('danger') || text.includes('violence')) {
    category = 'urgent';
    urgency = 'high';
  } else if (text.includes('exam') || text.includes('admission') || text.includes('college')) {
    category = 'education';
  } else if (text.includes('money') || text.includes('tax') || text.includes('pension')) {
    category = 'financial_safety';
  }

  return {
    title: `Action Plan: ${promptText.length > 45 ? promptText.slice(0, 42) + '...' : promptText}`,
    category,
    urgency,
    problem_summary: `Your issue regarding "${promptText}" has been analyzed and organized into sequential procedural milestones.`,
    immediate_action: {
      title: 'Consolidate reference records and verify the designated official nodal department',
      why: 'Identifying the exact responsible government department or institutional cell prevents wasted efforts and redirection.',
      action_type: 'portal_check'
    },
    missing_information: [
      'Specific reference or registration ID (if previously submitted)',
      'Local administrative jurisdiction (District / State)'
    ],
    safety_notes: [
      'Ensure all official correspondence is conducted through registered institutional or governmental portals.',
      'Always retain physical or digital acknowledgement receipts for every application submitted.'
    ],
    follow_up_questions: [
      {
        id: 'q_written_notice',
        question: 'Have you received any written or electronic notice from the authority?',
        options: ['Yes, I have an official notice', 'No, waiting for response', 'Not yet applied']
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Gather Baseline Records & Official Proof of Application',
        description: 'Collect all relevant identity proofs, previous application copies, and correspondence into a single folder.',
        why_it_matters: 'Having complete documentation ready prevents repeated delays during nodal verification.',
        documents: ['Government ID Proof (Aadhaar / Voter ID)', 'Previous Application / Notice Copy'],
        action_type: 'document_prep',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'Check Status on Designated Official Service Portal',
        description: 'Navigate to the relevant nodal department web portal and query the status using your registration details.',
        why_it_matters: 'Digital records identify where your case is currently queued or flagged for pending action.',
        documents: ['Registration ID / Application Number'],
        action_type: 'portal_check',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Submit Formal Written Representation / In-Person Grievance',
        description: 'Draft a concise representation letter clearly highlighting the delay/issue and submit it to the designated Public Information or Nodal Officer.',
        why_it_matters: 'Official written submissions trigger administrative accountability under citizen service charters.',
        documents: ['Representation Letter', 'Enclosed Supporting Documents'],
        action_type: 'authority',
        status: 'pending'
      }
    ],
    checklist: [
      { id: 'c1', title: 'Locate and organize all existing application IDs and receipts', category: 'immediate', completed: false },
      { id: 'c2', title: 'Query current case status on the official department portal', category: 'immediate', completed: false },
      { id: 'c3', title: 'Submit formal grievance ticket or visit nodal officer in person', category: 'authority', completed: false }
    ],
    resources: [
      {
        title: 'CPGRAMS Citizen Grievance Portal',
        description: 'Apex portal for registering grievances directly with administrative ministries.',
        url: 'https://pgportal.gov.in',
        source_type: 'official_government',
        verified: true
      }
    ],
    metadata: { provider: 'client_fallback', fallback_used: true, model: 'deterministic-client-v2' }
  };
}
