/**
 * LifeBridge AI - 4 Built-In Demo Scenarios for instant hackathon demonstration
 */

export const DEMO_SCENARIOS = [
  {
    id: 'scholarship',
    badge: '🎓 Education',
    title: 'Scholarship Application Rejection',
    tag: 'Academic Grievance',
    prompt: 'My scholarship renewal application was rejected on the national student portal without a clear explanation and the college says the window is closing.',
    urgency: 'medium',
    category: 'education',
    impact: 'Unlock financial aid of ₹50,000+ before institutional deadlines.'
  },
  {
    id: 'scam',
    badge: '💰 Financial Safety',
    title: 'Suspicious Bank Threat & SMS Link',
    tag: 'Urgent Fraud Defense',
    prompt: 'I received an urgent message saying my bank account and debit card will be permanently blocked unless I immediately click a link and verify my KYC with OTP.',
    urgency: 'high',
    category: 'financial_safety',
    impact: 'Prevent unauthorized account sweep and freeze payment cards within Golden Hour.'
  },
  {
    id: 'lost_document',
    badge: '📄 Documents',
    title: 'Lost Marksheet Before Admission',
    tag: 'Duplicate Reissuance',
    prompt: 'I lost my 12th board marksheet and college admission counseling document verification is scheduled in two weeks. I do not know how to get a duplicate in time.',
    urgency: 'medium',
    category: 'documents',
    impact: 'Get legally valid DigiLocker copy today & file official board duplicate fast-track.'
  },
  {
    id: 'career',
    badge: '💼 Career Readiness',
    title: 'Software Internship Skill Gaps',
    tag: 'Tech Career Roadmap',
    prompt: 'I want to land a software development internship this summer, but I feel overwhelmed by tutorials and do not know what exact project, resume, or DSA skills I am missing.',
    urgency: 'medium',
    category: 'career',
    impact: 'Convert vague tutorial watching into 1 deployed project, ATS resume, and direct outreach.'
  }
];

export const CATEGORIES_CONFIG = [
  {
    id: 'education',
    icon: 'GraduationCap',
    title: 'Education',
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/40',
    description: 'Scholarships, admissions, exams, missing certificates, eligibility disputes.',
    examples: ['Scholarship portal rejected', 'Exam hall ticket mismatch', 'College admission dispute']
  },
  {
    id: 'career',
    icon: 'Briefcase',
    title: 'Career',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-500/40',
    description: 'Internships, skill roadmaps, resume ATS gaps, interview prep, job search.',
    examples: ['Missing tech skills for internship', 'ATS resume rejection', 'Career transition roadmap']
  },
  {
    id: 'civic',
    icon: 'Landmark',
    title: 'Civic Services',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/40',
    description: 'Government schemes, municipal complaints, public grievance (CPGRAMS), ration/voter issues.',
    examples: ['Ration card name update', 'Civic water supply complaint', 'Pension scheme delay']
  },
  {
    id: 'financial_safety',
    icon: 'ShieldAlert',
    title: 'Financial Safety',
    color: 'from-amber-500 to-rose-600',
    borderColor: 'border-amber-500/40',
    description: 'Suspicious transactions, phishing links, 1930 cyber fraud reporting, unauthorized charges.',
    examples: ['Clicked suspicious bank link', 'Fraudulent UPI debit', 'Fake job offer scam']
  },
  {
    id: 'documents',
    icon: 'FileText',
    title: 'Documents',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/40',
    description: 'Lost certificates, DigiLocker retrieval, police lost property reports, renewals.',
    examples: ['Lost 10th/12th marksheet', 'Name spelling error in Aadhaar', 'Duplicate degree application']
  },
  {
    id: 'urgent',
    icon: 'Flame',
    title: 'Urgent Help',
    color: 'from-rose-500 to-red-600',
    borderColor: 'border-rose-500/40',
    description: 'Immediate crisis navigation, 112 emergency routing, safe immediate steps.',
    examples: ['Cyber blackmail / harassment', 'Immediate consumer emergency', 'Emergency authority contact']
  }
];
