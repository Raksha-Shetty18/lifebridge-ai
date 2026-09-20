import express from 'express';

const router = express.Router();

/**
 * LifeBridge AI - Verified Statutory Resources Directory
 * 
 * Strict Trust Classification:
 * - OFFICIAL: Official Government Portals and Apex Statutory Bodies
 * - VERIFIED: Statutory Helplines & Accredited Public Grievance Channels
 * - GENERAL_INFORMATION: Procedural Reference Information (Non-Authority)
 * 
 * Regional Scope: India (National & Inter-State)
 */
export const VERIFIED_RESOURCES_DIRECTORY = [
  {
    id: 'education-nsp',
    name: 'National Scholarship Portal (NSP)',
    title: 'National Scholarship Portal (NSP)',
    organization: 'Ministry of Electronics and Information Technology (MeitY)',
    category: 'education',
    source_type: 'government_portal',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://scholarships.gov.in',
    phone: '0120-6619540',
    helpline: '0120-6619540',
    availability: 'Working Days (10:00 AM - 5:30 PM)',
    region: 'India',
    description: 'Centralized single-window platform for national scholarship applications, defective form rectification, institute verification tracking, and Direct Benefit Transfer (DBT) disbursement.',
    purpose: 'Scholarship application, defect correction, tracking student verification status and stipend release.',
    badge: 'Official Government Portal'
  },
  {
    id: 'financial-cybercrime-1930',
    name: 'National Cyber Crime Reporting Portal & 1930 Helpline',
    title: 'National Cyber Crime Reporting Portal (1930 Helpline)',
    organization: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    category: 'financial_safety',
    source_type: 'statutory_helpline',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://cybercrime.gov.in',
    phone: '1930',
    helpline: '1930',
    availability: '24x7 Toll-Free Emergency Support',
    region: 'India',
    description: 'National emergency platform to report financial cyber fraud, freeze stolen funds in bank accounts during the Golden Hour, and register formal Cyber Crime FIRs.',
    purpose: 'Emergency financial fraud reporting, stopping illicit bank transfers, reporting OTP/phishing scams.',
    badge: 'National Emergency Helpline'
  },
  {
    id: 'documents-digilocker',
    name: 'DigiLocker National Document Wallet',
    title: 'DigiLocker India',
    organization: 'Digital India Corporation, MeitY',
    category: 'documents',
    source_type: 'government_portal',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://www.digilocker.gov.in',
    phone: null,
    helpline: 'Online Helpdesk via App/Portal',
    availability: '24x7 Online Access',
    region: 'India',
    description: 'Government digital cloud repository under Rule 9A of the Information Technology Rules 2016 for fetching and verifying legally valid digital marksheets, degrees, caste certificates, and driving licenses.',
    purpose: 'Instant recovery and official verification of lost educational certificates and government IDs.',
    badge: 'Official Digital Repository'
  },
  {
    id: 'career-ncs',
    name: 'National Career Service (NCS)',
    title: 'National Career Service (NCS)',
    organization: 'Ministry of Labour & Employment',
    category: 'career',
    source_type: 'government_portal',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://www.ncs.gov.in',
    phone: '1800-425-1514',
    helpline: '1800-425-1514',
    availability: 'Mon-Sat (08:00 AM - 08:00 PM)',
    region: 'India',
    description: 'Apex national portal providing verified public & private job listings, model career counseling centers, skill development roadmaps, and central apprenticeship listings.',
    purpose: 'Verified employment matching, career counseling, vocational training, and apprenticeship registrations.',
    badge: 'Official Employment Portal'
  },
  {
    id: 'civic-cpgrams',
    name: 'CPGRAMS Central Public Grievance Redressal System',
    title: 'CPGRAMS Central Grievance Portal',
    organization: 'Department of Administrative Reforms and Public Grievances (DARPG)',
    category: 'civic',
    source_type: 'government_portal',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://pgportal.gov.in',
    phone: '1800-11-2000',
    helpline: '1800-11-2000',
    availability: '24x7 Online Grievance Submission',
    region: 'India',
    description: 'Single national online portal allowing citizens to submit binding public grievances against any central or state ministry, public utility, or department with strict SLA tracking.',
    purpose: 'Escalating unresolved citizen complaints, municipal failures, administrative delays, and utility grievances.',
    badge: 'Apex Grievance Portal'
  },
  {
    id: 'financial-rbi-cms',
    name: 'Reserve Bank of India - Complaint Management System (CMS)',
    title: 'RBI Complaint Management System (CMS)',
    organization: 'Reserve Bank of India (RBI)',
    category: 'financial_safety',
    source_type: 'government_portal',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://cms.rbi.org.in',
    phone: '14448',
    helpline: '14448',
    availability: 'Mon-Fri (09:30 AM - 05:15 PM)',
    region: 'India',
    description: 'Statutory portal to lodge complaints with the Banking Ombudsman if your bank or financial service provider fails to resolve a fraud dispute, unauthorized transaction, or unfair fee within 30 days.',
    purpose: 'Independent banking ombudsman escalation for unauthorized debit disputes and non-responsive bank branches.',
    badge: 'Banking Ombudsman'
  },
  {
    id: 'urgent-erss-112',
    name: 'Emergency Response Support System (ERSS - 112)',
    title: 'National Emergency Response Support System (ERSS - 112)',
    organization: 'Ministry of Home Affairs',
    category: 'urgent',
    source_type: 'statutory_helpline',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://112.gov.in',
    phone: '112',
    helpline: '112',
    availability: '24x7 All-India Emergency Dispatch',
    region: 'India',
    description: 'Unified single 24x7 emergency helpline for Police assistance, Ambulance medical rescue, Fire & Rescue services, and Women safety across all Indian states and Union Territories.',
    purpose: 'Immediate life-safety dispatch, accidents, physical threats, and medical crisis intervention.',
    badge: 'Emergency Services 24/7'
  },
  {
    id: 'urgent-telemanas-14416',
    name: 'Tele-MANAS National Mental Health Assistance',
    title: 'Tele-MANAS Mental Health Support Helpline',
    organization: 'Ministry of Health and Family Welfare (MoHFW)',
    category: 'urgent',
    source_type: 'statutory_helpline',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://telemanas.mohfw.gov.in',
    phone: '14416 / 1800-891-4416',
    helpline: '14416 / 1800-891-4416',
    availability: '24x7 Free & Confidential Tele-Counseling',
    region: 'India',
    description: 'Free, confidential, 24/7 tele-mental health counseling and crisis support delivered by trained clinical psychologists across 20+ regional Indian languages.',
    purpose: 'Immediate emotional distress support, crisis counseling, and psychological intervention.',
    badge: 'Mental Health 24/7'
  },
  {
    id: 'documents-uidai',
    name: 'Unique Identification Authority of India (UIDAI)',
    title: 'UIDAI Self Service Portal (m-Aadhaar)',
    organization: 'Unique Identification Authority of India',
    category: 'documents',
    source_type: 'government_portal',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://myaadhaar.uidai.gov.in',
    phone: '1947',
    helpline: '1947',
    availability: '24x7 IVR / Mon-Sat 7 AM - 11 PM',
    region: 'India',
    description: 'Official self-service portal to download lost e-Aadhaar, lock biometric credentials against fraud, update demographic addresses, and verify identity card validity.',
    purpose: 'Downloading digital e-Aadhaar copy, re-ordering PVC cards, and securing biometric authentication.',
    badge: 'Official Identity Portal'
  },
  {
    id: 'civic-nalsa-legal-aid',
    name: 'National Legal Services Authority (NALSA)',
    title: 'NALSA Free Legal Aid Portal',
    organization: 'National Legal Services Authority, Supreme Court of India',
    category: 'civic',
    source_type: 'government_portal',
    trust_level: 'OFFICIAL',
    official: true,
    verified: true,
    url: 'https://nalsa.gov.in',
    phone: '15100',
    helpline: '15100',
    availability: '24x7 Free Legal Aid Helpline',
    region: 'India',
    description: 'Apex statutory body providing free and competent legal services to eligible citizens, women, marginalized groups, and undertrial prisoners throughout India.',
    purpose: 'Free legal representation, legal advice clinics, and dispute mediation before Lok Adalats.',
    badge: 'Statutory Legal Aid'
  }
];

// Helper to sanitize and validate safe URL schemes
export function isSafeUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  const trimmed = urlString.trim().toLowerCase();
  if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
    return false;
  }
  return trimmed.startsWith('https://') || trimmed.startsWith('http://');
}

// GET /api/resources - List verified resources directory with optional category and search filters
router.get('/', (req, res) => {
  try {
    const { category, search } = req.query;
    let list = [...VERIFIED_RESOURCES_DIRECTORY];

    if (category && category !== 'all') {
      list = list.filter(r => r.category === category.toLowerCase());
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      const rawQ = search.trim().toLowerCase();
      const normQ = rawQ.replace(/[\s-_]+/g, '');
      list = list.filter(r => {
        const title = (r.title || '').toLowerCase();
        const name = (r.name || '').toLowerCase();
        const desc = (r.description || '').toLowerCase();
        const org = (r.organization || '').toLowerCase();
        const cat = (r.category || '').toLowerCase();

        const titleNorm = title.replace(/[\s-_]+/g, '');
        const nameNorm = name.replace(/[\s-_]+/g, '');
        const descNorm = desc.replace(/[\s-_]+/g, '');
        const orgNorm = org.replace(/[\s-_]+/g, '');

        return title.includes(rawQ) || name.includes(rawQ) || desc.includes(rawQ) || org.includes(rawQ) || cat.includes(rawQ) ||
               titleNorm.includes(normQ) || nameNorm.includes(normQ) || descNorm.includes(normQ) || orgNorm.includes(normQ);
      });
    }

    return res.json({ 
      success: true, 
      count: list.length,
      data: list 
    });
  } catch (err) {
    console.error('[LifeBridge AI] Error in /api/resources:', err);
    return res.status(500).json({ error: 'Failed to fetch verified resources.' });
  }
});

// GET /api/resources/:id - Get single verified resource by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const found = VERIFIED_RESOURCES_DIRECTORY.find(r => r.id === id);
  if (!found) {
    return res.status(404).json({ error: `Resource with ID '${id}' not found.` });
  }
  return res.json({ success: true, data: found });
});

export default router;
