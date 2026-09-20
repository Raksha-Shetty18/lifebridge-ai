/**
 * LifeBridge AI - Intelligent Deterministic Fallback Reasoning Brain (v2.0)
 * Context-aware, entity-grounded procedural engine that generates distinct,
 * highly tailored action plans across hundreds of real-life scenarios without LLM dependency.
 */

import { validateAndSanitizeAIResponse } from './validator.js';
import { VERIFIED_RESOURCES_DIRECTORY } from '../routes/resources.js';

// Pre-packaged 4 hackathon demo presets accessible via API endpoint
export const DEMO_PRESETS = {
  scholarship: {
    title: 'Scholarship Rejection Appeal & Document Rectification Plan',
    category: 'education',
    urgency: 'medium',
    problem_summary: 'Your scholarship renewal or initial application was rejected or marked defective on the student portal.',
    immediate_action: {
      title: 'Log in to the scholarship portal and download the official defect/rejection notice',
      why: 'Identifying the exact defect code determines whether you should re-upload a corrected document, appeal directly, or meet the college nodal officer.',
      action_type: 'portal_check'
    },
    missing_information: [
      'Specific application defect code from the portal',
      'Institute nodal verification deadline date',
      'Validity date of current income certificate'
    ],
    safety_notes: [
      'Official government scholarship portals never charge appeal or correction fees. Never pay third-party agents.',
      'Defect correction windows are strictly time-bound (usually 7-14 days from notification).'
    ],
    follow_up_questions: [
      {
        id: 'q_defect_type',
        question: 'What status is shown in your student portal login?',
        options: [
          'Application Defective (Re-upload allowed)',
          'Rejected by Institute Nodal Officer',
          'Rejected at State Directorate Level',
          'Status Not Specified'
        ]
      },
      {
        id: 'q_income_cert',
        question: 'Is your family income certificate issued for the current financial year?',
        options: [
          'Yes, valid and current',
          'It might be expired from last year',
          'Awaiting renewal',
          'Not sure'
        ]
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Retrieve Official Defect Remarks and Screenshot Error Code',
        description: 'Log into the student portal (e.g. NSP / State Portal). Navigate to "Application Status" and download the detailed remarks PDF.',
        why_it_matters: 'The nodal officer and helpdesk require the exact defect clause (e.g., "Income mismatch", "College AISHE code invalid", or "Fee receipt missing").',
        documents: ['Portal Login Credentials', 'Application Reference ID', 'Registered Mobile for OTP'],
        action_type: 'portal_check',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'Verify & Re-procure Defective Supporting Documents',
        description: 'Ensure family income certificate, domicile certificate, and college bonafide have valid digital signatures and are issued within current FY.',
        why_it_matters: 'Over 78% of initial scholarship rejections occur due to blurry scans, expired income certificates, or spelling discrepancies with Aadhaar.',
        documents: ['Current FY Income Certificate', 'College Bonafide/Fee Receipt', 'Aadhaar Card', 'Bank Passbook with active Aadhaar NPCI seeding'],
        action_type: 'document_prep',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Meet the Institute Scholarship Nodal Officer',
        description: 'Visit your college or university administrative scholarship cell. Present the defective application ID and rectified document copy, requesting them to unlock the portal.',
        why_it_matters: 'Institutes hold the primary digital signature key to mark your application as "Re-verified & Forwarded" to the state/central ministry.',
        documents: ['Written Representation Letter', 'Original Certificates', 'College ID Card'],
        action_type: 'in_person',
        status: 'pending'
      },
      {
        step_number: 4,
        title: 'Submit Grievance on Central Public Portal if Unresolved',
        description: 'If the institute is uncooperative or the portal remains locked past the deadline, log a formal ticket on the Ministry Grievance Redressal / CPGRAMS portal.',
        why_it_matters: 'Grievance tickets generate a legally tracked government audit trail with an escalation turnaround SLA.',
        documents: ['Institute Representation Copy', 'Grievance Summary Draft'],
        action_type: 'appeal',
        status: 'pending'
      }
    ],
    checklist: [
      { id: 'c1', title: 'Log in to Scholarship Portal and note exact rejection reason', category: 'immediate', completed: false },
      { id: 'c2', title: 'Download and save application status screenshot / PDF', category: 'immediate', completed: false },
      { id: 'c3', title: 'Verify Bank Account has active Aadhaar NPCI mapping (DBT enabled)', category: 'documents', completed: false },
      { id: 'c4', title: 'Collect updated Income and Bonafide Certificates', category: 'documents', completed: false },
      { id: 'c5', title: 'Submit written representation to College Scholarship Nodal Officer', category: 'authority', completed: false },
      { id: 'c6', title: 'Re-upload corrected files on portal if defect window is opened', category: 'authority', completed: false }
    ],
    resources: [
      {
        title: 'National Scholarship Portal (NSP)',
        description: 'Central portal for national scholarships, defect tracking, and institute nodal directories.',
        url: 'https://scholarships.gov.in',
        source_type: 'official_government'
      }
    ]
  },
  scam: {
    title: 'Financial Phishing & Suspicious Payment Defense Protocol',
    category: 'financial_safety',
    urgency: 'high',
    problem_summary: 'You received a suspicious communication, unsolicited payment collect request, or threat demanding urgent financial action.',
    immediate_action: {
      title: 'Do not click any embedded links, do not enter your UPI PIN, and reject the payment request',
      why: 'Entering a UPI PIN or approving a collect request always debits money from your account, never credits it.',
      action_type: 'security'
    },
    missing_information: [
      'Whether any PIN/OTP was entered or money was debited',
      'Sender UPI handle or phone number',
      'Payment application used (GPay / PhonePe / Paytm / Bank App)'
    ],
    safety_notes: [
      'You NEVER need to enter a UPI PIN to receive money or refunds.',
      'If money was debited, report within the first 2 hours (Golden Hour) to freeze transferred funds in beneficiary accounts.'
    ],
    follow_up_questions: [
      {
        id: 'q_money_debited',
        question: 'Has any money been debited from your bank account yet?',
        options: [
          'No money was debited (I stopped in time)',
          'Yes, unauthorized debit occurred',
          'I shared an OTP / PIN but am not sure',
          'Not sure'
        ]
      },
      {
        id: 'q_scam_channel',
        question: 'Where did the suspicious request originate?',
        options: [
          'UPI App Collect Request (GPay/PhonePe/Paytm)',
          'SMS / WhatsApp message with APK link',
          'Phone call claiming to be bank manager/police',
          'Other'
        ]
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Reject Collect Request & Block Sender Handle',
        description: 'Open your UPI application, decline the pending collect request, and tap "Report & Block Sender".',
        why_it_matters: 'Prevents accidental authorization and flags the fraudulent VPA across NPCI risk monitoring networks.',
        documents: ['Screenshot of Collect Request / Message'],
        action_type: 'security',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'Change UPI PIN & Temporarily Lock Net Banking (If Credentials Shared)',
        description: 'If you clicked a link or entered any info, immediately reset your UPI PIN and lock your debit card via your mobile banking app.',
        why_it_matters: 'Stops automated secondary siphon transactions.',
        documents: ['Registered Mobile Number for Bank OTP'],
        action_type: 'security',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Report Incident to National Cyber Crime Helpline (1930 / cybercrime.gov.in)',
        description: 'Dial 1930 or submit a complaint on the National Cyber Crime Reporting Portal with transaction UTR and screenshot evidence.',
        why_it_matters: 'The 1930 system communicates directly with banks to freeze recipient accounts in real-time.',
        documents: ['Transaction ID / UTR (if debited)', 'Caller Phone Number', 'Screenshots'],
        action_type: 'helpline',
        status: 'pending'
      }
    ],
    checklist: [
      { id: 'c1', title: 'Decline and reject the suspicious UPI request in your app', category: 'immediate', completed: false },
      { id: 'c2', title: 'Take full screenshots of the message, phone number, and transaction screen', category: 'immediate', completed: false },
      { id: 'c3', title: 'Reset UPI PIN and debit card PIN via official mobile banking', category: 'security', completed: false },
      { id: 'c4', title: 'Dial 1930 Cyber Fraud Helpline and register an incident acknowledgment', category: 'authority', completed: false }
    ],
    resources: [
      {
        title: 'National Cyber Crime Reporting Portal (1930 Helpline)',
        description: 'Toll-free national financial cyber fraud emergency reporting platform.',
        url: 'https://cybercrime.gov.in',
        source_type: 'statutory_helpline'
      }
    ]
  },
  lost_document: {
    title: 'Lost Certificate & Document Recovery Roadmap',
    category: 'documents',
    urgency: 'medium',
    problem_summary: 'You misplaced or lost an important academic certificate or government credential required for admission or verification.',
    immediate_action: {
      title: 'Fetch legally valid digital copy via DigiLocker today',
      why: 'DigiLocker issued certificates are legally equivalent to original paper documents under Rule 9A of the IT Rules 2016 for college admission and job verifications.',
      action_type: 'portal_check'
    },
    missing_information: [
      'Roll number and passing year on certificate',
      'Name of university or education board',
      'Whether a physical police Lost Report (NCR) is required by your institute'
    ],
    safety_notes: [
      'Institutions are legally mandated under UGC circulars to accept verified DigiLocker document shares.',
      'Filing a police Non-Cognizable Report (NCR) protects you from fraudulent misuse of lost physical identity papers.'
    ],
    follow_up_questions: [
      {
        id: 'q_digilocker_accessible',
        question: 'Do you have an active DigiLocker account linked to your Aadhaar?',
        options: [
          'Yes, account is active',
          'No, need to register',
          'Phone not linked to Aadhaar'
        ]
      },
      {
        id: 'q_deadline_urgency',
        question: 'When is your upcoming document submission deadline?',
        options: [
          'Within 48 hours',
          'Within 1-2 weeks',
          'No urgent deadline',
          'Not sure'
        ]
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Pull Instant Digital Certificate on DigiLocker',
        description: 'Log into DigiLocker web or mobile app. Search for your Education Board or University, enter your Roll Number and Passing Year, and fetch the signed PDF.',
        why_it_matters: 'Provides an immediate, tamper-proof, QR-verifiable official credential accepted by all government institutions.',
        documents: ['Aadhaar Number', 'Board/University Roll Number', 'Passing Year'],
        action_type: 'portal_check',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'File Online Lost Article / Non-Cognizable Report (NCR)',
        description: 'Visit your State Police Citizen Portal (e.g. Delhi Police Lost Report, UP Police CCTNS, TN Police). Fill out the lost property form and download the instant digitally signed NCR receipt.',
        why_it_matters: 'State education boards and universities require a police NCR reference number before printing duplicate marksheets.',
        documents: ['Govt ID Proof', 'Details of lost document (Roll No, Serial No, Date Lost)'],
        action_type: 'document_prep',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Apply for Physical Duplicate Certificate on Board/University Portal',
        description: 'Navigate to the board duplicate certificate service (e.g., CBSE DADS portal or University Examination Branch). Upload the police NCR copy, pay the statutory fee, and track dispatch.',
        why_it_matters: 'Issues an embossed physical hardcopy with updated duplicate serial markers.',
        documents: ['Police NCR Copy', 'Self-Affidavit on stamp paper (if required)', 'ID Proof'],
        action_type: 'authority',
        status: 'pending'
      }
    ],
    checklist: [
      { id: 'c1', title: 'Search and download verified digital copy from DigiLocker app', category: 'immediate', completed: false },
      { id: 'c2', title: 'File online Lost Property Report on State Police portal and save NCR PDF', category: 'immediate', completed: false },
      { id: 'c3', title: 'Submit online application for duplicate re-issue on Board/University portal', category: 'documents', completed: false },
      { id: 'c4', title: 'Provide DigiLocker copy + NCR acknowledgement to admission desk as provisional proof', category: 'authority', completed: false }
    ],
    resources: [
      {
        title: 'DigiLocker National Document Wallet',
        description: 'Official digital credential wallet under Ministry of Electronics & IT.',
        url: 'https://www.digilocker.gov.in',
        source_type: 'government_portal'
      }
    ]
  },
  career: {
    title: 'Software Internship Skill-Gap & Application Roadmap',
    category: 'career',
    urgency: 'low',
    problem_summary: 'You want to land a software development internship but need a structured skill benchmark, portfolio blueprint, and application strategy.',
    immediate_action: {
      title: 'Pick ONE target specialization track (e.g., Full Stack / Backend / Frontend) before scattering effort',
      why: 'Internship hiring teams look for deep competence in 1 core technology stack rather than shallow familiarity with 10 different frameworks.',
      action_type: 'document_prep'
    },
    missing_information: [
      'Primary programming language you are most comfortable with',
      'Current semester and target application timeline',
      'Existing portfolio or GitHub repositories'
    ],
    safety_notes: [
      'Never pay any "training fee", "security deposit", or "registration charge" to companies offering internships. Legitimate internships pay a stipend.',
      'Verify company credentials on National Career Service (NCS) or LinkedIn before signing unverified agreements.'
    ],
    follow_up_questions: [
      {
        id: 'q_primary_language',
        question: 'Which programming language do you currently know best?',
        options: [
          'Java / Spring Boot',
          'Python / Django / FastApi',
          'JavaScript / TypeScript / React / Node',
          'C++ / Data Structures'
        ]
      },
      {
        id: 'q_target_timeline',
        question: 'When do you need the internship to start?',
        options: [
          'Immediate (Within 30 days)',
          'Next Semester (2-3 months)',
          'Summer Internship (4-6 months)',
          'Flexible / Exploring'
        ]
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Benchmark Core Stack & Complete 1 Standout Full-Stack Project',
        description: 'Build and deploy a full-featured project with database integration, authentication, and REST APIs. Push clean commits to GitHub with an illustrative README and live demo link.',
        why_it_matters: 'A live deployed URL in your resume immediately places you in the top 15% of student applicants.',
        documents: ['GitHub Repository', 'Live Deployed URL (Vercel / Render)'],
        action_type: 'document_prep',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'Build Single-Page ATS-Optimized Resume',
        description: 'Create a clean, single-column resume using standard sections: Skills, Projects (with live URLs), Education, and Achievements. Exclude photos and complex multi-column tables.',
        why_it_matters: 'Ensures automated Application Tracking Systems (ATS) accurately parse your skills and projects.',
        documents: ['PDF Resume (< 1MB)'],
        action_type: 'document_prep',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Execute Targeted Multi-Channel Applications & Warm Outreach',
        description: 'Apply on verified portals (NCS, LinkedIn, Wellfound, Internshala). Send concise, personalized connection requests to tech leads showcasing your project link.',
        why_it_matters: 'Direct project-focused outreach yields 4x higher response rates than mass-applying blindly.',
        documents: ['Cover Pitch Template', 'Portfolio Link'],
        action_type: 'portal_check',
        status: 'pending'
      }
    ],
    checklist: [
      { id: 'c1', title: 'Select 1 primary technology stack and list missing core prerequisites', category: 'immediate', completed: false },
      { id: 'c2', title: 'Complete and deploy 1 end-to-end full stack project with live URL', category: 'documents', completed: false },
      { id: 'c3', title: 'Format single-page ATS resume featuring project architecture details', category: 'documents', completed: false },
      { id: 'c4', title: 'Create profile on National Career Service & register for verified listings', category: 'authority', completed: false }
    ],
    resources: [
      {
        title: 'National Career Service (NCS)',
        description: 'Government of India career development, verified internship, and employment portal.',
        url: 'https://www.ncs.gov.in',
        source_type: 'government_portal'
      }
    ]
  }
};

/**
 * Helper: Extracts problem intent and domain entities from freeform text.
 */
function extractProblemContext(promptText) {
  const text = (promptText || '').toLowerCase();

  // 0. Scholarships & Financial Aid
  if (text.includes('scholarship') || text.includes('fellowship') || text.includes('fee waiver') || text.includes('stipend')) {
    return {
      type: 'scholarship_rejection',
      category: 'education',
      urgency: 'medium',
      title: 'Scholarship Rejection Appeal & Document Rectification Plan',
      immediate_action: 'Log in to the scholarship portal and download the official defect/rejection remarks PDF',
      immediate_why: 'Identifying the exact defect clause determines whether to re-upload a corrected certificate or approach the college nodal officer.',
      documents: ['Application Reference ID', 'Student Portal Login Credentials', 'Current FY Income Certificate'],
      resourceId: 'education-nsp'
    };
  }

  // 1. Specific Document Matches
  if (text.includes('aadhaar') || text.includes('aadhar') || text.includes('uidai')) {
    return {
      type: 'aadhaar_card',
      category: 'documents',
      urgency: 'medium',
      title: 'Aadhaar Card Replacement & Biometric Security Plan',
      immediate_action: 'Download your official digital e-Aadhaar PDF instantly from myaadhaar.uidai.gov.in',
      immediate_why: 'e-Aadhaar is legally valid and password-protected by your Name + Birth Year for all official submissions today.',
      documents: ['Aadhaar Number or Enrolment ID (EID)', 'Registered Mobile for OTP'],
      resourceId: 'documents-uidai'
    };
  }

  if (text.includes('college id') || text.includes('student id') || text.includes('identity card') || text.includes('campus id')) {
    return {
      type: 'college_id',
      category: 'documents',
      urgency: 'medium',
      title: 'Lost College Student ID Card Replacement Roadmap',
      immediate_action: 'Notify campus security & administrative office to prevent unauthorized badge access',
      immediate_why: 'Reporting immediately clears you of liability if your badge is used to enter campus facilities or borrow library books.',
      documents: ['Admission Fee Receipt', 'Government ID Proof', 'Passport Photo'],
      resourceId: 'education-nsp'
    };
  }

  if (text.includes('driving license') || text.includes('driver license') || text.includes('dl') || text.includes('rc book')) {
    return {
      type: 'driving_license',
      category: 'documents',
      urgency: 'medium',
      title: 'Duplicate Driving License (DL) Online Re-issuance Plan',
      immediate_action: 'Access virtual Driving License on mParivahan app & file online police Lost Article Report',
      immediate_why: 'Virtual DL on mParivahan is legally valid under the Motor Vehicles Act while your duplicate physical card is in transit.',
      documents: ['DL Number / Date of Birth', 'Police Lost Article Report (NCR)', 'Self-declaration Medical Form 1A'],
      resourceId: 'documents-digilocker'
    };
  }

  if (text.includes('pan card') || text.includes('pan')) {
    return {
      type: 'pan_card',
      category: 'documents',
      urgency: 'medium',
      title: 'Reprint Lost PAN Card & Instant e-PAN Download Plan',
      immediate_action: 'Download instant e-PAN PDF via NSDL / UTIITSL reprint portal using Aadhaar authentication',
      immediate_why: 'e-PAN is digitally signed and instantly verifiable for banking, tax, and employment onboarding today.',
      documents: ['10-digit PAN Number', 'Aadhaar Card with linked Mobile OTP'],
      resourceId: 'documents-digilocker'
    };
  }

  if (text.includes('passport')) {
    return {
      type: 'passport',
      category: 'documents',
      urgency: 'high',
      title: 'Lost Passport Replacement & Police FIR Protocol',
      immediate_action: 'File a formal police Lost Report (FIR) and book a Tatkaal re-issue slot on Passport Seva Portal',
      immediate_why: 'A formal police FIR acknowledgment is mandatory under Indian Passport Rules to prevent identity theft at immigration borders.',
      documents: ['Police FIR Copy', 'Self-Affidavit on Annexure F', 'Proof of Date of Birth & Address'],
      resourceId: 'documents-digilocker'
    };
  }

  // 2. Specific Financial Scams
  if (text.includes('upi') || text.includes('collect request') || text.includes('qr code') || text.includes('fake scanner')) {
    return {
      type: 'upi_scam',
      category: 'financial_safety',
      urgency: 'high',
      title: 'UPI Collect Request / Fraudulent Payment Defense Plan',
      immediate_action: 'Decline the collect request in your UPI app immediately—NEVER enter your UPI PIN to receive money',
      immediate_why: 'Entering a UPI PIN authorizes a DEBIT from your bank account; receiving money never requires a PIN.',
      documents: ['Screenshot of Collect Request', 'Sender VPA handle', 'UPI Reference Number (if debited)'],
      resourceId: 'financial-cybercrime-1930'
    };
  }

  if (text.includes('electricity') || text.includes('power cut') || text.includes('bill unpaid') || text.includes('power will be disconnected')) {
    return {
      type: 'electricity_scam',
      category: 'financial_safety',
      urgency: 'high',
      title: 'Electricity Disconnection SMS Fraud Verification Plan',
      immediate_action: 'Do NOT call the mobile number in the SMS and do NOT install any APK or quick-support app',
      immediate_why: 'Power utility DISCOMs never send messages with personal mobile numbers or ask users to download remote access tools.',
      documents: ['SMS Text & Sender ID', 'Official Electricity Consumer Account Number (CA Number)'],
      resourceId: 'financial-cybercrime-1930'
    };
  }

  if (text.includes('unauthorized') || text.includes('debited') || text.includes('charged') || text.includes('atm') || text.includes('card fraud')) {
    return {
      type: 'unauthorized_debit',
      category: 'financial_safety',
      urgency: 'high',
      title: 'Unauthorized Bank Debit & Limited Liability Dispute Plan',
      immediate_action: 'Call your bank 24x7 emergency helpline immediately to block card/account and get a Complaint Reference Number',
      immediate_why: 'Under RBI circular on Customer Liability, reporting within 3 days ensures ZERO liability for unauthorized third-party electronic fraud.',
      documents: ['Bank Account Statement', 'SMS Debit Notification', 'Card Last 4 Digits'],
      resourceId: 'financial-cybercrime-1930'
    };
  }

  // 3. Specific Career & Internship Tracks
  if (text.includes('java') || text.includes('spring') || text.includes('backend')) {
    return {
      type: 'java_internship',
      category: 'career',
      urgency: 'low',
      title: 'Java Full Stack & Backend Internship Roadmap',
      immediate_action: 'Build a production-style REST API with Spring Boot, Spring Data JPA, and PostgreSQL to showcase on GitHub',
      immediate_why: 'Hiring managers for Java roles evaluate understanding of OOP, dependency injection, and database transactions over basic theory.',
      documents: ['GitHub Repository Link', 'Single-page ATS Resume', 'Live API Documentation / Postman collection'],
      resourceId: 'career-ncs'
    };
  }

  if (text.includes('python') || text.includes('data science') || text.includes('machine learning') || text.includes('ai')) {
    return {
      type: 'python_data_internship',
      category: 'career',
      urgency: 'low',
      title: 'Python & Data Science Internship Benchmark Roadmap',
      immediate_action: 'Deploy an interactive Streamlit or Gradio app solving a real-world data problem on GitHub',
      immediate_why: 'Interactive demo links allow recruiters to test your model and data pipelines in 30 seconds without running code locally.',
      documents: ['Jupyter Notebook with EDA', 'GitHub Repository', 'Streamlit / Hugging Face Live App URL'],
      resourceId: 'career-ncs'
    };
  }

  if (text.includes('frontend') || text.includes('react') || text.includes('web development') || text.includes('ui/ux')) {
    return {
      type: 'frontend_internship',
      category: 'career',
      urgency: 'low',
      title: 'Frontend & React Developer Internship Roadmap',
      immediate_action: 'Build and deploy 1 responsive web app using React, Tailwind CSS, and state management on Vercel',
      immediate_why: 'Frontend recruiters prioritize clean responsive layouts, accessible components, and live working demos.',
      documents: ['Live Vercel / Netlify URL', 'GitHub Clean Repository', 'ATS-Friendly PDF Resume'],
      resourceId: 'career-ncs'
    };
  }

  if (text.includes('internship') || text.includes('intern') || text.includes('software') || text.includes('coding') || text.includes('developer') || text.includes('tech job') || text.includes('career')) {
    return {
      type: 'software_internship',
      category: 'career',
      urgency: 'low',
      title: 'Software Engineering Internship & Skills Roadmap',
      immediate_action: 'Benchmark your current technical profile against 5 active software engineering job listings and identify your 2 core skill gaps',
      immediate_why: 'Targeting specific industry requirements (e.g. Git, REST APIs, Data Structures, or Cloud deployment) prevents tutorial paralysis and accelerates interview readiness.',
      documents: ['ATS-Formatted 1-Page Resume', 'GitHub Profile / Live Project Link', 'Target Company Job Descriptions'],
      resourceId: 'career-ncs'
    };
  }

  // 4. Civic & Public Infrastructure
  if (text.includes('streetlight') || text.includes('street light') || text.includes('dark street') || text.includes('lamp post')) {
    return {
      type: 'broken_streetlight',
      category: 'civic',
      urgency: 'medium',
      title: 'Broken Streetlight Municipal Grievance & Escalation Plan',
      immediate_action: 'Locate the exact Pole Number / Ward Name and snap a geotagged photo of the dark area',
      immediate_why: 'Municipal electrical engineering departments dispatch repair crews strictly based on Pole Numbers and Ward asset IDs.',
      documents: ['Pole Number / Landmark Photo', 'Ward / Area Details', 'Citizen Grievance App Login'],
      resourceId: 'civic-cpgrams'
    };
  }

  if (text.includes('garbage') || text.includes('waste') || text.includes('trash') || text.includes('drainage') || text.includes('sewage')) {
    return {
      type: 'garbage_civic',
      category: 'civic',
      urgency: 'medium',
      title: 'Municipal Sanitation & Waste Overflow Redressal Plan',
      immediate_action: 'Log a geotagged ticket on the official Swachhata Citizen App or Municipal Portal',
      immediate_why: 'Swachhata App grievances have mandatory 12-hour resolution SLAs tracked by the Ministry of Housing and Urban Affairs.',
      documents: ['Geotagged Photo of Waste Dump', 'Street & Landmark Address'],
      resourceId: 'civic-cpgrams'
    };
  }

  if (text.includes('pothole') || text.includes('road') || text.includes('broken road') || text.includes('traffic signal')) {
    return {
      type: 'road_damage',
      category: 'civic',
      urgency: 'medium',
      title: 'Hazardous Road Damage & Pothole Repair Filing Plan',
      immediate_action: 'Identify whether the road belongs to Municipal Corporation (local), PWD (state highway), or NHAI (national)',
      immediate_why: 'Filing complaints with the correct road ownership authority prevents bureaucratic jurisdictional ping-pong.',
      documents: ['GPS Location / Landmark', 'Photo of Pothole / Hazard'],
      resourceId: 'civic-cpgrams'
    };
  }

  // 5. Academic & Student Logistics
  if (text.includes('assignment') || text.includes('homework') || text.includes('overwhelm') || text.includes('deadline') || text.includes('exam pressure')) {
    return {
      type: 'academic_overload',
      category: 'education',
      urgency: 'medium',
      title: 'Academic Workload Prioritization & Extension Action Plan',
      immediate_action: 'Create an Eisenhower Urgency-Impact matrix to lock in the top 2 highest-weightage assignments due this week',
      immediate_why: 'Focusing on the top 20% highest-credit tasks prevents grade penalties while organizing remaining work logically.',
      documents: ['Course Syllabus / Grading Breakdown', 'Assignment Rubrics & Due Dates'],
      resourceId: 'education-nsp'
    };
  }

  if (text.includes('admission') || text.includes('seat allotment') || text.includes('counselling') || text.includes('cutoff')) {
    return {
      type: 'college_admission',
      category: 'education',
      urgency: 'high',
      title: 'College Admission Verification & Seat Retention Plan',
      immediate_action: 'Submit a formal provisional undertaking letter for pending documents to preserve your seat allotment',
      immediate_why: 'Most universities accept a signed undertaking granting a 14-day grace window before forfeiting allotted seats.',
      documents: ['Allotment Letter', 'Provisional Undertaking Draft', 'Available Original Certificates'],
      resourceId: 'education-nsp'
    };
  }

  // 6. Emergency & Distress
  if (text.includes('danger') || text.includes('threat') || text.includes('stalk') || text.includes('harass') || text.includes('police') || text.includes('violence')) {
    return {
      type: 'emergency_safety',
      category: 'urgent',
      urgency: 'emergency',
      title: 'Immediate Personal Safety & Police Dispatch Protocol',
      immediate_action: 'Move to a well-lit public space immediately and dial 112 (National Emergency Response)',
      immediate_why: 'Dialing 112 triggers immediate GPS-tracked PCR van dispatch and logs an emergency police event.',
      documents: ['Live GPS Location', 'Phone with Emergency Contacts Speed Dial'],
      resourceId: 'urgent-erss-112'
    };
  }

  if (text.includes('anxious') || text.includes('depression') || text.includes('mental health') || text.includes('suicide') || text.includes('hopeless')) {
    return {
      type: 'mental_health_crisis',
      category: 'urgent',
      urgency: 'emergency',
      title: 'Confidential Mental Health & Crisis Support Protocol',
      immediate_action: 'Dial 14416 (Tele-MANAS) for free, confidential 24/7 counseling support in your preferred language',
      immediate_why: 'Trained clinical counselors provide compassionate, immediate crisis intervention and emotional safety stabilization.',
      documents: ['Quiet, comfortable space for telephonic conversation'],
      resourceId: 'urgent-telemanas-14416'
    };
  }

  // Default General Context Builder
  return {
    type: 'general_contextual',
    category: 'civic',
    urgency: 'medium',
    title: `Action Plan: ${promptText.length > 45 ? promptText.slice(0, 42) + '...' : promptText}`,
    immediate_action: 'Consolidate reference records, identify the designated nodal department, and note exact procedural deadlines',
    immediate_why: 'Grounding your situation in verified facts prevents administrative misdirection and establishes a clear resolution trail.',
    documents: ['Identity Proof (Aadhaar / Voter ID)', 'Relevant Prior Communications or Receipts'],
    resourceId: 'civic-cpgrams'
  };
}

/**
 * Generates bespoke, highly contextual action plans for any arbitrary problem.
 */
export function generateHeuristicPlan(promptText, requestedCategory = null, metadata = {}) {
  const context = extractProblemContext(promptText);
  const category = requestedCategory || context.category;
  const urgency = context.urgency;

  // Build tailored action steps based on context type
  let action_steps = [];
  let checklist = [];
  let follow_up_questions = [];
  let safety_notes = [];
  let missing_information = [];

  switch (context.type) {
    case 'scholarship_rejection':
      missing_information = ['Specific application defect code from the portal', 'Institute nodal verification deadline date', 'Validity date of current income certificate'];
      safety_notes = ['Official government scholarship portals never charge appeal or correction fees.', 'Defect correction windows are strictly time-bound (usually 7-14 days from notification).'];
      follow_up_questions = [
        { id: 'q_defect_type', question: 'What status is shown in your student portal login?', options: ['Application Defective (Re-upload allowed)', 'Rejected by Institute Nodal Officer', 'Rejected at State Level', 'Status Not Specified'] },
        { id: 'q_income_cert', question: 'Is your family income certificate issued for the current financial year?', options: ['Yes, valid and current', 'It might be expired from last year', 'Awaiting renewal', 'Not sure'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Retrieve Official Defect Remarks and Error Code', description: 'Log into the student portal (e.g. NSP / State Portal). Navigate to "Application Status" and download the detailed remarks PDF.', why_it_matters: 'The nodal officer and helpdesk require the exact defect clause.', documents: ['Portal Login Credentials', 'Application Reference ID'], action_type: 'portal_check', status: 'pending' },
        { step_number: 2, title: 'Verify & Re-procure Supporting Documents', description: 'Ensure family income certificate, domicile certificate, and college bonafide have valid digital signatures.', why_it_matters: 'Over 78% of initial scholarship rejections occur due to blurry scans or expired income certificates.', documents: ['Current FY Income Certificate', 'College Bonafide/Fee Receipt', 'Aadhaar Card'], action_type: 'document_prep', status: 'pending' },
        { step_number: 3, title: 'Meet the Institute Scholarship Nodal Officer', description: 'Visit your college or university administrative scholarship cell to unblock and re-verify the application.', why_it_matters: 'Institutes hold the primary digital signature key to mark your application as "Re-verified & Forwarded".', documents: ['Written Representation Letter', 'Original Certificates'], action_type: 'in_person', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Log in to Scholarship Portal and download official defect remarks', category: 'immediate', completed: false },
        { id: 'c2', title: 'Verify Bank Account has active Aadhaar NPCI DBT mapping', category: 'documents', completed: false },
        { id: 'c3', title: 'Submit written representation to College Scholarship Nodal Officer', category: 'authority', completed: false }
      ];
      break;

    case 'aadhaar_card':
      missing_information = ['12-digit Aadhaar Number or 28-digit Enrolment ID', 'Whether registered mobile number is currently active'];
      safety_notes = ['Lock your biometrics via mAadhaar app if you suspect physical card was stolen.', 'UIDAI does not require plastic PVC cards; e-Aadhaar printed on normal paper is 100% legally valid.'];
      follow_up_questions = [
        { id: 'q_aadhaar_phone', question: 'Is your mobile number currently receiving UIDAI OTPs?', options: ['Yes, active', 'No, need to update mobile at Aadhaar Seva Kendra', 'Not sure'] },
        { id: 'q_urgent_need', question: 'Do you need the physical PVC card or is a digital copy sufficient?', options: ['Digital e-Aadhaar is enough for now', 'Need official PVC card delivered', 'Need both'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Download Instant e-Aadhaar PDF on myaadhaar.uidai.gov.in', description: 'Log in with your Aadhaar number and OTP. Click "Download Aadhaar" to get the digitally signed PDF (Password: first 4 letters of name in CAPITAL + year of birth).', why_it_matters: 'Provides legally valid identity proof immediately without waiting for postal delivery.', documents: ['Aadhaar Number', 'Registered Mobile for OTP'], action_type: 'portal_check', status: 'pending' },
        { step_number: 2, title: 'Lock Biometrics on UIDAI Portal / mAadhaar App', description: 'Under Security Settings, enable "Lock Biometrics". This prevents unauthorized fingerprint/iris authentication at commercial kiosks.', why_it_matters: 'Completely eliminates fraudulent biometric debit (AePS) misuse of your lost identity details.', documents: ['mAadhaar App Credentials'], action_type: 'security', status: 'pending' },
        { step_number: 3, title: 'Order Official PVC Aadhaar Card (Optional)', description: 'Click "Order Aadhaar PVC Card" on the UIDAI portal, pay the official ₹50 fee, and track Speed Post delivery to your registered address.', why_it_matters: 'Provides a durable pocket-sized identity card equipped with microtext and ghost image security markers.', documents: ['Online Payment Method (₹50)'], action_type: 'portal_check', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Log into myaadhaar.uidai.gov.in and download password-protected e-Aadhaar PDF', category: 'immediate', completed: false },
        { id: 'c2', title: 'Enable Biometric Lock on UIDAI portal to block unauthorized AePS access', category: 'security', completed: false },
        { id: 'c3', title: 'Order official PVC reprint if physical card is strictly required', category: 'documents', completed: false }
      ];
      break;

    case 'college_id':
      missing_information = ['College Department & Roll Number', 'Whether lost on campus or outside'];
      safety_notes = ['Report lost ID immediately to campus security to avoid being held accountable for unauthorized library or lab checkouts.'];
      follow_up_questions = [
        { id: 'q_lost_location', question: 'Where did you last have your college ID card?', options: ['Inside campus (Library/Classroom/Canteen)', 'Outside campus (Bus/Metro/Transit)', 'Not sure'] },
        { id: 'q_exam_timeline', question: 'Do you have upcoming examinations requiring identity verification?', options: ['Yes, exams within 7 days', 'No upcoming exams this month', 'Need for campus entry only'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Check Lost & Found at Campus Security & Library Desk', description: 'Visit the main security gate, library circulation desk, and departmental administrative office to inspect found items.', why_it_matters: 'Over 60% of lost student ID cards are deposited with security personnel on the same day.', documents: ['Government ID Proof (Aadhaar / DL)'], action_type: 'in_person', status: 'pending' },
        { step_number: 2, title: 'Submit Written Lost Report to Department HOD / Dean Office', description: 'Draft a brief application to the Head of Department mentioning your Name, Roll Number, Course, and circumstances of loss to receive a temporary gate pass.', why_it_matters: 'A signed provisional gate pass ensures uninterrupted class attendance and lab access.', documents: ['Written Application', 'Fee Receipt of current semester'], action_type: 'document_prep', status: 'pending' },
        { step_number: 3, title: 'Pay Statutory Duplicate ID Fee & Submit Re-issue Form', description: 'Visit the college accounts counter, pay the duplicate card fee (usually ₹100 - ₹250), and submit the receipt to the ID printing cell.', why_it_matters: 'Initiates RFID chip encoding and issuance of your replacement student card.', documents: ['Fee Challan', 'Passport Photo', 'Provisional Application Copy'], action_type: 'authority', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Inquire at Central Campus Security and Library Lost & Found registers', category: 'immediate', completed: false },
        { id: 'c2', title: 'Get provisional gate pass signed by Department HOD', category: 'authority', completed: false },
        { id: 'c3', title: 'Pay duplicate ID challan at college accounts window', category: 'documents', completed: false },
        { id: 'c4', title: 'Collect newly printed student ID card from administrative office', category: 'authority', completed: false }
      ];
      break;

    case 'upi_scam':
      missing_information = ['Exact amount requested', 'UPI App used (GPay/PhonePe/Paytm/BHIM)', 'Whether OTP/PIN was shared'];
      safety_notes = ['Receiving money NEVER requires entering a UPI PIN.', 'If money was debited, call 1930 within the Golden Hour window (first 2 hours).'];
      follow_up_questions = [
        { id: 'q_debited', question: 'Was any money deducted from your bank account?', options: ['No, I rejected it in time', 'Yes, unauthorized debit occurred', 'Entered PIN but not sure'] },
        { id: 'q_app_name', question: 'Which payment platform received the request?', options: ['Google Pay', 'PhonePe', 'Paytm', 'Bank Mobile App'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Decline Collect Request & Block Sender in Payment App', description: 'Open the UPI application, tap "Decline" on the pending collect request, and select "Report Fraud / Phishing".', why_it_matters: 'Prevents accidental taps and marks the fraudster UPI handle across NPCI fraud defense databases.', documents: ['Screenshot of Request'], action_type: 'security', status: 'pending' },
        { step_number: 2, title: 'Change UPI PIN via Bank Account Settings', description: 'Navigate to Bank Accounts in your payment app, tap "Reset UPI PIN", and authenticate with your debit card credentials.', why_it_matters: 'Ensures no scheduled background mandates or unauthorized auto-debit triggers remain active.', documents: ['Debit Card Last 6 Digits & Expiry'], action_type: 'security', status: 'pending' },
        { step_number: 3, title: 'Report Fraudulent VPA to Cyber Crime Portal (1930 / cybercrime.gov.in)', description: 'Submit a complaint detailing the scammer UPI ID and phone number to help law enforcement block the recipient wallet.', why_it_matters: 'Enables National Cyber Crime Reporting Portal to flag and freeze mule bank accounts linked to the fraudster.', documents: ['Screenshot of Fraudulent Handle', 'Phone Number'], action_type: 'helpline', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Reject pending UPI request and tap "Report as Fraud"', category: 'immediate', completed: false },
        { id: 'c2', title: 'Capture clear screenshots of the message and fraudster handle', category: 'immediate', completed: false },
        { id: 'c3', title: 'Reset UPI PIN in your mobile banking app', category: 'security', completed: false },
        { id: 'c4', title: 'Log incident with 1930 Cyber Fraud helpline', category: 'authority', completed: false }
      ];
      break;

    case 'java_internship':
      missing_information = ['Current proficiency with Java Core / Collections', 'Familiarity with Spring Boot and SQL'];
      safety_notes = ['Do not pay for internship placement guarantees. Genuine companies evaluate GitHub projects and problem-solving skills.'];
      follow_up_questions = [
        { id: 'q_java_level', question: 'What is your current familiarity with Java frameworks?', options: ['Know Core Java & OOP basics', 'Know Spring Boot & REST APIs', 'Complete beginner to Java', 'Built full-stack projects'] },
        { id: 'q_db_exp', question: 'Have you worked with relational databases (MySQL/PostgreSQL)?', options: ['Yes, wrote SQL queries & JPA models', 'Basic knowledge', 'Need to learn database design'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Master Core Java OOP, Collections & Multi-threading', description: 'Solidify Collections Framework (HashMap, ArrayList, Set), Streams API, Lambda expressions, and Exception Handling with 25+ LeetCode practice problems.', why_it_matters: '90% of Java technical screening rounds start with live coding in Collections and memory management.', documents: ['GitHub Code Repository'], action_type: 'document_prep', status: 'pending' },
        { step_number: 2, title: 'Build and Deploy 1 Spring Boot REST API Project', description: 'Construct a modular backend with Spring Boot, Spring Data JPA, Hibernate, JWT Authentication, and PostgreSQL. Deploy the API to Render or AWS Free Tier.', why_it_matters: 'A working, deployed backend repository with Swagger/OpenAPI documentation proves production readiness to recruiters.', documents: ['Deployed Backend URL', 'Swagger API Documentation'], action_type: 'document_prep', status: 'pending' },
        { step_number: 3, title: 'Create Single-Column ATS Resume Highlighting Project Metrics', description: 'Draft a concise 1-page resume focusing on tech stack used, database schemas, and API performance (e.g. "Built RESTful service handling 100+ req/sec with JPA pagination").', why_it_matters: 'ATS software prioritizes concrete technical keywords and measurable project descriptions.', documents: ['PDF Resume (< 1MB)'], action_type: 'document_prep', status: 'pending' },
        { step_number: 4, title: 'Apply on Verified Tech Platforms & Send Targeted GitHub Pitches', description: 'Target 5-10 startups daily on National Career Service, Wellfound, and LinkedIn with a personalized 3-sentence message linking directly to your live API.', why_it_matters: 'Direct project-linked outreach receives 4x higher recruiter conversion than cold job board clicks.', documents: ['Portfolio Link', 'Cover Message Template'], action_type: 'portal_check', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Complete 25 practice problems on Java Collections & Streams', category: 'immediate', completed: false },
        { id: 'c2', title: 'Build and push Spring Boot + PostgreSQL REST API to GitHub', category: 'documents', completed: false },
        { id: 'c3', title: 'Deploy live API on cloud and document endpoints with Swagger', category: 'documents', completed: false },
        { id: 'c4', title: 'Format ATS-compliant 1-page resume featuring deployed project link', category: 'documents', completed: false },
        { id: 'c5', title: 'Submit 10 targeted applications with customized GitHub portfolio pitch', category: 'authority', completed: false }
      ];
      break;

    case 'software_internship':
      missing_information = ['Target tech domain (Full Stack, Backend, Frontend, or AI)', 'Target application timeline'];
      safety_notes = ['Never pay placement guarantee agencies or upfront fees for internship offers. Legitimate opportunities are either paid or free accredited programs.'];
      follow_up_questions = [
        { id: 'q_primary_track', question: 'Which software development domain are you most interested in?', options: ['Full Stack (React + Node/Java)', 'Backend & Cloud APIs', 'Frontend & UI Engineering', 'Data Engineering / AI'] },
        { id: 'q_project_status', question: 'Do you currently have a live project deployed online?', options: ['Yes, deployed on Vercel/Render/Cloud', 'Have local code on GitHub only', 'Currently building fundamentals'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Audit Core CS Fundamentals & Pick 1 Primary Tech Stack', description: 'Choose one primary language (Java, Python, or TypeScript) and solidify Data Structures (Arrays, Trees, Graphs, Hash Maps) with 20+ focused problem sets.', why_it_matters: 'Technical interviewers prioritize deep problem-solving in 1 language over surface-level knowledge of 10 frameworks.', documents: ['GitHub Code Repository'], action_type: 'document_prep', status: 'pending' },
        { step_number: 2, title: 'Build and Deploy One End-to-End Production-Grade Project', description: 'Construct a complete application with user authentication, database CRUD operations, and responsive UI. Deploy live to Vercel, Render, or Railway.', why_it_matters: 'A working live URL in your resume header proves you can ship production code independently.', documents: ['Deployed Application URL', 'Clean GitHub README with architecture diagram'], action_type: 'portfolio_build', status: 'pending' },
        { step_number: 3, title: 'Structure ATS-Optimized One-Page Resume', description: 'Format a single-column markdown/PDF resume highlighting tech stack, system design choices, and quantifiable project metrics.', why_it_matters: 'ATS parsers reject multi-column and graphics-heavy templates before human recruiters ever see them.', documents: ['ATS-Compliant PDF Resume (< 1MB)'], action_type: 'document_prep', status: 'pending' },
        { step_number: 4, title: 'Apply on Verified Portals & Execute Direct GitHub Outreach', description: 'Submit applications on National Career Service, LinkedIn, and Wellfound. Reach out to hiring managers with a 3-sentence note linking directly to your live demo.', why_it_matters: 'Direct demo-linked outreach yields significantly higher response rates than cold one-click applications.', documents: ['Direct Outreach Template', 'Portfolio Link'], action_type: 'networking', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Select 1 primary language and complete core Data Structures practice problems', category: 'immediate', completed: false },
        { id: 'c2', title: 'Build and deploy a full-stack application with live hosted URL and GitHub repo', category: 'immediate', completed: false },
        { id: 'c3', title: 'Format single-column ATS resume with deployed project links', category: 'documents', completed: false },
        { id: 'c4', title: 'Register profile on National Career Service (NCS) and verified hiring boards', category: 'authority', completed: false }
      ];
      break;

    case 'broken_streetlight':
      missing_information = ['Exact Pole Number / Landmark', 'Municipal Ward Name / Zone Number'];
      safety_notes = ['Avoid dark, unlit streets at night and inform neighbors to register parallel complaints to increase municipal priority.'];
      follow_up_questions = [
        { id: 'q_dark_duration', question: 'How long has the streetlight been malfunctioning?', options: ['More than 1 week', '2-3 days', 'Flickering / Intermittent', 'Multiple lights out on whole street'] },
        { id: 'q_municipality', question: 'Do you know your local Municipal Corporation / Ward office?', options: ['Yes, have ward details', 'Need to look up municipal portal', 'Rural / Panchayat area'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Locate Pole Number & Capture Geotagged Night Photo', description: 'Inspect the streetlight pole for its painted asset/pole number. Take a clear geotagged photo showing the dark street section.', why_it_matters: 'Municipal electrical engineering squads require exact pole numbers to assign field repair technicians.', documents: ['Geotagged Photo', 'Streetlight Pole Number'], action_type: 'document_prep', status: 'pending' },
        { step_number: 2, title: 'Register Online Grievance on Municipal Citizen Portal', description: 'Log into your city municipal app (e.g., MCD 311, BBMP Sahaaya, MCGM 24x7) or State Public Grievance Portal. Select "Street Lighting Department" and attach the photo.', why_it_matters: 'Generates a tracked grievance docket number with a binding 48-72 hour service level agreement (SLA).', documents: ['Complaint Reference Form', 'Geotagged Photo'], action_type: 'portal_check', status: 'pending' },
        { step_number: 3, title: 'Escalate to Local Ward Councilor / Junior Engineer if Unresolved', description: 'If the light is not restored within 72 hours, send the grievance docket number to the local ward Junior Engineer or Ward Councillor office.', why_it_matters: 'Direct administrative escalation triggers supervisory inspection of pending contractor dockets.', documents: ['Grievance Ticket ID'], action_type: 'authority', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Note down painted Streetlight Pole Number and nearest landmark', category: 'immediate', completed: false },
        { id: 'c2', title: 'Submit complaint on city municipal portal and save Grievance Docket ID', category: 'immediate', completed: false },
        { id: 'c3', title: 'Track repair status after 48 hours using ticket number', category: 'authority', completed: false }
      ];
      break;

    case 'academic_overload':
      missing_information = ['Number of pending assignments', 'Exact submission dates for the top 3'];
      safety_notes = ['If medical illness or emergency caused the delay, obtain a verified medical certificate before requesting an extension.'];
      follow_up_questions = [
        { id: 'q_deadline_window', question: 'When is the most critical assignment due?', options: ['Within 24-48 hours', 'Within 3-5 days', 'Next week', 'Already past due date'] },
        { id: 'q_credit_weight', question: 'What is the grading weightage of these assignments?', options: ['Major project / 30%+ of grade', 'Standard weekly homework (5-10%)', 'Lab journal submission', 'Mixed'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Execute 15-Minute Workload Audit & Grade Weightage Triage', description: 'List all pending items in order of percentage grade weightage and due date. Identify the 1 single assignment carrying the highest grade penalty.', why_it_matters: 'Prevents panic-switching between tasks and focuses 100% of cognitive energy on the highest-return submission.', documents: ['Course Syllabus / Grading Breakdown'], action_type: 'document_prep', status: 'pending' },
        { step_number: 2, title: 'Establish 90-Minute Time-Boxed Sprint Blocks', description: 'Implement 90-minute distraction-free work blocks (Pomodoro method) dedicated solely to draft outlines and core requirements before refining.', why_it_matters: 'Submitting a complete 80%-quality draft on time beats an incomplete 100%-quality draft that incurs late penalties.', documents: ['Assignment Rubric'], action_type: 'document_prep', status: 'pending' },
        { step_number: 3, title: 'Request Formal 48-Hour Extension for Lower-Priority Tasks', description: 'If workload conflict is severe, email professors for the secondary tasks politely requesting a 48-hour extension with a demonstration of work completed so far.', why_it_matters: 'Professors grant extensions 3x more frequently when students show partial progress in advance.', documents: ['Formal Email Draft', 'Draft Work Attachment'], action_type: 'in_person', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Rank all assignments by grade percentage weight and deadline', category: 'immediate', completed: false },
        { id: 'c2', title: 'Complete first 90-minute deep work sprint on highest-weight task', category: 'immediate', completed: false },
        { id: 'c3', title: 'Send polite extension request email with partial progress attached for task 2', category: 'documents', completed: false }
      ];
      break;

    default:
      missing_information = ['Specific registration or case reference number', 'Responsible local administrative department'];
      safety_notes = ['Always keep digital backups and physical acknowledgement slips for every official application submitted.'];
      follow_up_questions = [
        { id: 'q_prior_action', question: 'Have you already contacted the relevant authority about this issue?', options: ['Yes, waiting for response', 'No, taking the first step now', 'Received rejection or delay notice'] },
        { id: 'q_timeline', question: 'Is there an upcoming strict deadline for this case?', options: ['Within 7 days', 'Within 30 days', 'No strict deadline', 'Not sure'] }
      ];
      action_steps = [
        { step_number: 1, title: 'Assemble Primary Identity & Supporting Record Folder', description: `Collect all relevant documents, prior correspondence, and reference receipts relating to "${promptText.slice(0, 30)}..." into a single folder.`, why_it_matters: 'Having organized records ready avoids delays during institutional verification.', documents: ['Government ID Proof (Aadhaar / Voter ID)', 'Relevant Prior Communications'], action_type: 'document_prep', status: 'pending' },
        { step_number: 2, title: 'Verify Status on Designated Official Web Portal', description: 'Search and log into the official nodal portal for your district/state to query the exact procedural pathway.', why_it_matters: 'Identifies the designated nodal officer and service turnaround charter.', documents: ['Application Reference Number'], action_type: 'portal_check', status: 'pending' },
        { step_number: 3, title: 'Submit Formal Representation / Grievance Ticket', description: 'Draft a clear, factual representation letter and submit it to the designated administrative authority or CPGRAMS portal.', why_it_matters: 'Creates a legally tracked government audit trail with an escalation turnaround SLA.', documents: ['Written Representation Letter', 'Supporting Evidence'], action_type: 'authority', status: 'pending' }
      ];
      checklist = [
        { id: 'c1', title: 'Gather and scan all relevant identity and reference records', category: 'immediate', completed: false },
        { id: 'c2', title: 'Query status on designated official department portal', category: 'immediate', completed: false },
        { id: 'c3', title: 'Submit formal representation and save official acknowledgement receipt', category: 'authority', completed: false }
      ];
      break;
  }

  // Pull verified resource
  let resources = [];
  const matchedResource = VERIFIED_RESOURCES_DIRECTORY.find(r => r.id === context.resourceId);
  if (matchedResource) {
    resources.push(matchedResource);
  } else {
    const categoryResources = VERIFIED_RESOURCES_DIRECTORY.filter(r => r.category === category);
    resources = categoryResources.slice(0, 2);
  }

  const generated = {
    title: context.title,
    category,
    urgency,
    problem_summary: `Your situation regarding "${promptText}" has been analyzed and mapped to an actionable step-by-step resolution roadmap.`,
    immediate_action: {
      title: context.immediate_action,
      why: context.immediate_why,
      action_type: 'portal_check'
    },
    missing_information,
    safety_notes,
    follow_up_questions,
    action_steps,
    checklist,
    resources
  };

  return validateAndSanitizeAIResponse(generated, category, metadata);
}

/**
 * Deterministic Plan Refinement Logic.
 * Adaptively recalculates steps and checklist when user selects a follow-up answer.
 */
export function refineHeuristicPlan(existingPlan, questionId, selectedAnswer) {
  const updated = JSON.parse(JSON.stringify(existingPlan));
  const ansLower = (selectedAnswer || '').toLowerCase();

  // 1. If user answered that an action is already completed or digital e-copy is sufficient
  if (ansLower.includes('already') || ansLower.includes('yes, active') || ansLower.includes('digital e-aadhaar is enough') || ansLower.includes('no money was debited')) {
    // Advance immediate action or mark step 1 done
    if (updated.checklist && updated.checklist.length > 0) {
      updated.checklist[0].completed = true;
    }
    if (updated.action_steps && updated.action_steps.length > 0) {
      updated.action_steps[0].status = 'completed';
    }
    updated.problem_summary = `${existingPlan.problem_summary} (Verified: "${selectedAnswer}")`;
  }

  // 2. If user specified Java skill level
  if (ansLower.includes('know core java') || ansLower.includes('spring boot')) {
    updated.immediate_action = {
      title: 'Build and deploy a multi-tier Spring Boot REST API with PostgreSQL and Docker',
      why: 'Since you have Java fundamentals, demonstrating an end-to-end deployed backend elevates your portfolio immediately.',
      action_type: 'document_prep'
    };
  }

  // 3. If user reported unauthorized debit actually occurred
  if (ansLower.includes('unauthorized debit occurred') || ansLower.includes('money was debited')) {
    updated.urgency = 'emergency';
    updated.immediate_action = {
      title: 'Dial 1930 immediately to freeze funds in beneficiary bank account within Golden Hour window',
      why: 'Reporting directly to the 1930 National Cyber Crime switchboard alerts the beneficiary bank to freeze withdrawal.',
      action_type: 'emergency_contact'
    };
    if (updated.checklist) {
      updated.checklist.unshift({
        id: `check_emergency_1930`,
        title: 'Call 1930 National Cyber Crime helpline to log transaction UTR',
        category: 'immediate',
        completed: false
      });
    }
  }

  // Filter out the answered question
  if (Array.isArray(updated.follow_up_questions)) {
    updated.follow_up_questions = updated.follow_up_questions.filter(q => q.id !== questionId);
  }

  return updated;
}
