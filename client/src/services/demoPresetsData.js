/**
 * Client presets mirror
 */

export const DEMO_PRESETS = {
  scholarship: {
    title: 'Scholarship Application Rejection Appeal & Correction Plan',
    category: 'education',
    urgency: 'medium',
    problem_summary: 'Your scholarship renewal or initial grant application was rejected, defected, or stalled in the verification cycle.',
    immediate_action: {
      title: 'Check Application Portal for Exact Defect Code & Reason',
      why: 'Crucial to determine if this is an uploaded document defect (which has a quick re-submission window) or an eligibility cutoff issue before filing an appeal.'
    },
    missing_information: [
      'Specific rejection or defect code from portal dashboard',
      'Institute nodal verification deadline date',
      'Current status of domicile and income certificate validation'
    ],
    warnings: [
      'Beware of unauthorized agents charging fees to "unblock" or approve scholarships. Official portals do not charge appeal or correction fees.',
      'Defect correction windows are strictly time-bound (usually 7-14 days from notification).'
    ],
    follow_up_questions: [
      {
        id: 'q_defect_type',
        question: 'What status is shown in your student portal login?',
        options: ['Application Defective (Re-upload allowed)', 'Rejected by Nodal Officer', 'Rejected at State Level', 'Status Not Specified']
      },
      {
        id: 'q_income_cert',
        question: 'Is your family income certificate issued for the current financial year?',
        options: ['Yes, valid and current', 'It might be expired/from last year', 'Awaiting renewal', 'Not sure']
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Retrieve Official Defect Notice and Screenshot Error Code',
        description: 'Log into your state or national scholarship portal (e.g. NSP, MahaDBT, SSP). Go to "Check Application Status" and download the detailed remarks PDF.',
        why_it_matters: 'The nodal officer and helpdesk require the exact defect clause (e.g., "Income mismatch", "College AISHE code invalid", or "Fee receipt missing").',
        documents: ['Portal Login Credentials', 'Application Reference ID', 'Registered Mobile Number for OTP'],
        action_type: 'portal_check',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'Verify & Re-procure Defective Documents',
        description: 'Cross-check the identified document with official government guidelines. Ensure dates, names, seal, and digital signatures are legible and within valid financial year.',
        why_it_matters: 'Over 78% of initial scholarship rejections occur due to blurry scans, expired income certificates, or spelling discrepancies with Aadhaar.',
        documents: ['Current FY Income Certificate', 'College Bonafide/Fee Receipt', 'Aadhaar Card', 'Bank Passbook with active Aadhaar NPCI seeding'],
        action_type: 'document_prep',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Meet the Institute Scholarship Nodal Officer',
        description: 'Visit your college or university administrative scholarship cell in person. Present the defective application ID and rectified document copy, requesting them to unlock the portal.',
        why_it_matters: 'Institutes hold the primary digital signature key to mark your application as "Re-verified & Forwarded" to the state/central ministry.',
        documents: ['Written Representation Letter', 'Original Certificates', 'College ID Card'],
        action_type: 'in_person',
        status: 'pending'
      },
      {
        step_number: 4,
        title: 'Submit Grievance / Appeal on Central Portal if Unresolved',
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
        source_type: 'official_government',
        verified: true
      },
      {
        title: 'CPGRAMS Centralized Public Grievance Portal',
        description: 'Official Government of India portal for escalating unresolved scholarship grievances to respective ministries.',
        url: 'https://pgportal.gov.in',
        source_type: 'official_government',
        verified: true
      },
      {
        title: 'UIDAI NPCI Bank Aadhaar Seeding Checker',
        description: 'Verify if your bank account is linked for Direct Benefit Transfer (DBT).',
        url: 'https://myaadhaar.uidai.gov.in',
        source_type: 'official_government',
        verified: true
      }
    ]
  },

  scam: {
    title: 'Financial Scam & Suspicious Transaction Emergency Response Plan',
    category: 'financial_safety',
    urgency: 'high',
    problem_summary: 'You encountered a suspicious SMS/call claiming your bank account/SIM is blocked or you made an inadvertent transfer to an unauthorized party.',
    immediate_action: {
      title: 'Immediately Freeze/Block Payment Card & UPI / Call 1930 Helpline',
      why: 'Financial fraud reporting within the "Golden Hour" (first 2-3 hours) enables law enforcement and nodal banks to freeze the money trail before fraudsters siphon funds.'
    },
    missing_information: [
      'Transaction UTR / Reference Number if money was deducted',
      'Sender phone number, URL link, or UPI handle involved',
      'Exact time elapsed since the event'
    ],
    warnings: [
      'Do NOT click any links, install remote desktop apps (AnyDesk, TeamViewer, RustDesk), or share OTPs with anyone claiming to be bank support.',
      'Banks will NEVER ask you to enter your UPI PIN to receive a refund or lottery prize.'
    ],
    follow_up_questions: [
      {
        id: 'q_money_lost',
        question: 'Was money actually debited from your account?',
        options: ['Yes, money was deducted', 'No, but I clicked a link/shared info', 'No, just received a threatening message']
      },
      {
        id: 'q_time_elapsed',
        question: 'When did this incident happen?',
        options: ['Within the last 2 hours (Golden Hour)', 'Earlier today (2-24 hours ago)', 'More than 24 hours ago']
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Call Bank Emergency Helpline to Block Accounts & NetBanking',
        description: 'Dial your bank official toll-free card blocking hotline. Request immediate freezing of debit/credit cards, UPI services, and temporary suspension of Internet Banking access.',
        why_it_matters: 'Prevents further unauthorized automated sweeps, recurring mandates, or loan disbursements in your name.',
        documents: ['Bank Account Number', 'Debit Card Last 4 Digits'],
        action_type: 'emergency_contact',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'Call 1930 National Cyber Financial Crime Helpline',
        description: 'Call 1930 (National Cyber Fraud Reporting Helpline). State your bank name, account number, transaction UTR number, and time of transfer.',
        why_it_matters: '1930 operates the Citizen Financial Cyber Fraud Reporting System (CFCFRMS) which coordinates with 250+ banks to immediately place holds on beneficiary accounts.',
        documents: ['Transaction UTR Number', 'Fraudulent Account/UPI ID', 'SMS Alert Screenshots'],
        action_type: 'helpline',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'File Formal Complaint on National Cyber Crime Portal',
        description: 'Visit cybercrime.gov.in. Register an incident under "Report Financial Fraud". Upload screenshots of SMS/WhatsApp chats, call logs, and bank statement extracts.',
        why_it_matters: 'Generates an official Acknowledgement Number (FIR track) required by your bank to process chargebacks and compensation under RBI Zero Liability guidelines.',
        documents: ['Bank Statement PDF', 'Screenshots of fraudulent chats/SMS', 'Identity Proof (Aadhaar/PAN)'],
        action_type: 'portal_check',
        status: 'pending'
      },
      {
        step_number: 4,
        title: 'Submit Written Dispute & Claim under RBI Limited Liability Framework',
        description: 'Visit your home bank branch within 3 business days. Submit a formal written dispute with the Cyber Crime Acknowledgement Number and copy of police complaint.',
        why_it_matters: 'Under RBI circular on Customer Protection, reporting third-party fraud within 3 days caps customer liability at ZERO.',
        documents: ['Cyber Complaint Ack Copy', 'Bank Dispute Form', 'Written Incident Narrative'],
        action_type: 'in_person',
        status: 'pending'
      }
    ],
    checklist: [
      { id: 'c1', title: 'Block compromised Debit/Credit cards via Bank App or Hotline', category: 'immediate', completed: false },
      { id: 'c2', title: 'Dial 1930 Cyber Fraud Helpline and register financial complaint', category: 'immediate', completed: false },
      { id: 'c3', title: 'Take full-screen screenshots of fraudulent SMS, links, and transactions', category: 'documents', completed: false },
      { id: 'c4', title: 'Lodge online complaint at www.cybercrime.gov.in', category: 'authority', completed: false },
      { id: 'c5', title: 'Visit home bank branch with cyber acknowledgement for RBI dispute filing', category: 'authority', completed: false },
      { id: 'c6', title: 'Scan phone with trusted antivirus or factory reset if remote apps were installed', category: 'security', completed: false }
    ],
    resources: [
      {
        title: 'National Cyber Crime Reporting Portal (1930 Helpline)',
        description: 'Official Ministry of Home Affairs portal for reporting financial fraud and cyber crimes.',
        url: 'https://cybercrime.gov.in',
        source_type: 'official_government',
        verified: true
      },
      {
        title: 'RBI Ombudsman - Grievance Portal',
        description: 'Reserve Bank of India banking ombudsman if your bank refuses to accept a timely fraud dispute.',
        url: 'https://cms.rbi.org.in',
        source_type: 'official_government',
        verified: true
      },
      {
        title: 'Chakshu - Sanchar Saathi Portal',
        description: 'Official Department of Telecommunications portal to report fraudulent calls, WhatsApp scams, and SMS sender IDs.',
        url: 'https://sancharsaathi.gov.in/sfc/',
        source_type: 'official_government',
        verified: true
      }
    ]
  },

  lost_document: {
    title: 'Lost Educational/Identity Document Replacement Plan',
    category: 'documents',
    urgency: 'medium',
    problem_summary: 'You lost an important document (10th/12th Marksheet, Degree Certificate, Aadhaar, or Passport) required for upcoming admission or verification.',
    immediate_action: {
      title: 'File Online Police Lost Article Report (LDR / NCR)',
      why: 'Most educational boards and government issuers strictly require a Police Lost Document Report reference number before issuing duplicates, and it protects you against identity misuse.'
    },
    missing_information: [
      'Document type (CBSE/State Board Marksheet, University Degree, PAN, Aadhaar)',
      'Roll number, Registration number, or passing year',
      'Target admission/employment deadline'
    ],
    warnings: [
      'Never purchase duplicate certificates from unauthorized agents offering "instant verification". They are forged and result in permanent disqualification/criminal action.',
      'Official duplicate procedures take 7 to 20 working days. Request a provisional certificate or DigiLocker copy in the interim.'
    ],
    follow_up_questions: [
      {
        id: 'q_doc_type',
        question: 'Which specific document did you lose?',
        options: ['10th / 12th Board Marksheet', 'University Degree Certificate', 'Aadhaar / Voter ID / PAN', 'Passport']
      },
      {
        id: 'q_digilocker',
        question: 'Do you have access to your DigiLocker account?',
        options: ['Yes, I can access DigiLocker', 'No, never set it up', 'Not sure']
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Download Legally Valid Digital Copy from DigiLocker',
        description: 'Log into DigiLocker (digilocker.gov.in). Search your board/university and pull the digitally signed certificate using your roll number and Aadhaar.',
        why_it_matters: 'Under Rule 9A of the IT Rules 2016, DigiLocker issued digital certificates are legally equivalent to original physical documents for admissions.',
        documents: ['Aadhaar Number', 'Roll Number / Passing Year'],
        action_type: 'instant_download',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'File Online Police Lost Property Report (Non-Cognizable Report)',
        description: 'Visit your state police citizen portal (or state police mobile app). Select "Lost Article Report", enter the document details, and download the stamped NCR/LDR PDF.',
        why_it_matters: 'Boards (e.g. CBSE, ICSE, State Universities) require the police NCR number in the formal duplicate application form.',
        documents: ['Personal ID Proof', 'Details of loss (Date, Location, Document type)'],
        action_type: 'police_report',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Apply for Official Duplicate via Board/University Portal',
        description: 'Go to the official examination portal (e.g., CBSE Parinam Manjusha/DADS, or University Examination Cell). Fill the duplicate certificate request, upload the police report, and pay the nominal fee.',
        why_it_matters: 'Triggers official printing of the duplicate certificate with security hologram dispatched to your registered address.',
        documents: ['Police Lost Report Copy', 'Affidavit (if required by university)', 'ID Proof'],
        action_type: 'portal_check',
        status: 'pending'
      },
      {
        step_number: 4,
        title: 'Request an Urgent Provisional Verification Letter for Admission',
        description: 'If your admission deadline is imminent, present the DigiLocker copy + Duplicate Application receipt to your college admissions nodal team to request provisional enrollment.',
        why_it_matters: 'Colleges routinely grant a 30-day grace period for submission of physical originals when proof of formal re-issuance is presented.',
        documents: ['Duplicate Application Ack Slip', 'DigiLocker Printout', 'Written Undertaking Form'],
        action_type: 'in_person',
        status: 'pending'
      }
    ],
    checklist: [
      { id: 'c1', title: 'Check and download digitally verified copy from DigiLocker', category: 'immediate', completed: false },
      { id: 'c2', title: 'File Online Lost Article Report on State Police Citizen Portal', category: 'immediate', completed: false },
      { id: 'c3', title: 'Retrieve Roll Number and Registration details from old records / institution', category: 'documents', completed: false },
      { id: 'c4', title: 'Submit duplicate application on Board / University online portal', category: 'authority', completed: false },
      { id: 'c5', title: 'Submit provisional undertaking with application receipt to admissions office', category: 'authority', completed: false }
    ],
    resources: [
      {
        title: 'DigiLocker Official Portal',
        description: 'National digital document repository providing legally recognized certified copies of marksheet and degrees.',
        url: 'https://www.digilocker.gov.in',
        source_type: 'official_government',
        verified: true
      },
      {
        title: 'CBSE DADS (Duplicate Academic Document System)',
        description: 'Official CBSE portal to order duplicate marksheets, migration certificates, and passing certificates.',
        url: 'https://cbseit.in/cbse/web/dads/home.aspx',
        source_type: 'official_government',
        verified: true
      },
      {
        title: 'National Police Citizen Services Portal',
        description: 'Directory for state-wise online Lost Document / Non-Cognizable report filings.',
        url: 'https://digitalpolice.gov.in',
        source_type: 'official_government',
        verified: true
      }
    ]
  },

  career: {
    title: 'Software Internship Readiness & Skill Gap Action Plan',
    category: 'career',
    urgency: 'medium',
    problem_summary: 'You are targeting software development internships but lack clarity on skill gaps, portfolio projects, and structured hiring pipelines.',
    immediate_action: {
      title: 'Benchmark Profile Against 3 Live Internship Role Descriptions',
      why: 'Avoids spending months on irrelevant tutorials and pinpoints the exact 3-4 core technologies in demand for current hiring season.'
    },
    missing_information: [
      'Current degree/graduation year (e.g. 2nd year vs pre-final year)',
      'Primary language preference (JavaScript/TypeScript, Python, Java, C++)',
      'Target domain (Full-Stack Web, Backend, Mobile, AI/Data)'
    ],
    warnings: [
      'Avoid paying for unpaid "internship training programs" that guarantee jobs in exchange for registration fees. Legitimate internships always pay stipends.',
      'Do not submit 100 generic applications. 20 tailored applications with proof-of-work yield 5x higher callback rates.'
    ],
    follow_up_questions: [
      {
        id: 'q_domain',
        question: 'Which software track are you most interested in?',
        options: ['Full Stack Web (React / Node.js)', 'Backend Systems (Java / Go / Python)', 'Mobile App Dev (Flutter / React Native)', 'AI / Data Engineering']
      },
      {
        id: 'q_projects',
        question: 'Do you have at least 1 deployed full-stack project on GitHub?',
        options: ['Yes, deployed and live', 'Built locally but not deployed', 'Only follow-along tutorial projects', 'No projects yet']
      }
    ],
    action_steps: [
      {
        step_number: 1,
        title: 'Build One High-Impact End-to-End Deployed Project',
        description: 'Build a project that solves a real operational problem (e.g. LifeBridge action navigator, SaaS dashboard, or API microservice) with authentication, database, clean README, and live URL.',
        why_it_matters: 'Engineering managers look at live URLs and clean git commit history rather than certificate counts.',
        documents: ['GitHub Repository URL', 'Live Demo URL (Vercel / Render / Supabase)'],
        action_type: 'portfolio_build',
        status: 'pending'
      },
      {
        step_number: 2,
        title: 'Optimize Resume with Action-Result Bullet Points (XYZ Formula)',
        description: 'Rewrite resume bullets using Google XYZ format: "Accomplished [X] as measured by [Y], by doing [Z]". Single-page ATS-friendly markdown/LaTeX format.',
        why_it_matters: 'ATS parsers discard complex multi-column graphic resumes within 2 seconds.',
        documents: ['Single-page ATS PDF Resume', 'LinkedIn Profile URL'],
        action_type: 'document_prep',
        status: 'pending'
      },
      {
        step_number: 3,
        title: 'Execute Targeted Outreach & Open-Source Contributions',
        description: 'Identify 15 engineering leads or founders at growing startups on LinkedIn/GitHub. Send a concise 3-line message referencing their open issues or expressing informed interest in their tech stack.',
        why_it_matters: 'Over 60% of high-quality internships are filled via direct founder/engineering outreach rather than mass job boards.',
        documents: ['Brief Cold Outreach Draft', 'Portfolio Link'],
        action_type: 'networking',
        status: 'pending'
      },
      {
        step_number: 4,
        title: 'Master Core Data Structures & System Problem Patterns',
        description: 'Practice 40 essential patterns (Arrays, Hashmaps, Two Pointers, Trees, Basic Graphs) and prepare 2 stories on challenging technical bugs you resolved.',
        why_it_matters: 'Standard technical interview rounds test fundamental problem-solving intuition and code clarity.',
        documents: ['LeetCode / Codeforces Profile'],
        action_type: 'prep',
        status: 'pending'
      }
    ],
    checklist: [
      { id: 'c1', title: 'Audit current skills against 3 target job descriptions', category: 'immediate', completed: false },
      { id: 'c2', title: 'Deploy 1 standout full-stack project on GitHub with live link and demo video', category: 'projects', completed: false },
      { id: 'c3', title: 'Format single-page ATS-compliant PDF resume', category: 'documents', completed: false },
      { id: 'c4', title: 'Create concise cold-outreach template for engineering leads', category: 'networking', completed: false },
      { id: 'c5', title: 'Solve 30 foundational DSA patterns (Array/Hashmap/Trees)', category: 'prep', completed: false },
      { id: 'c6', title: 'Apply to 5 verified early-stage startups weekly with custom cover notes', category: 'applications', completed: false }
    ],
    resources: [
      {
        title: 'GitHub Student Developer Pack',
        description: 'Free access to professional developer tools, cloud hosting credits, and domains for students.',
        url: 'https://education.github.com/pack',
        source_type: 'guide',
        verified: true
      },
      {
        title: 'Wellfound (AngelList Talent)',
        description: 'Direct platform for discovering startup internships and messaging hiring founders directly without recruiters.',
        url: 'https://wellfound.com',
        source_type: 'guide',
        verified: true
      },
      {
        title: 'National Career Service (NCS Portal)',
        description: 'Official Ministry of Labour & Employment verified internship and apprenticeship exchange.',
        url: 'https://www.ncs.gov.in',
        source_type: 'official_government',
        verified: true
      }
    ]
  }
};
