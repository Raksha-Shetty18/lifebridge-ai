import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Building2, 
  AlertTriangle,
  Info,
  Compass,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import ResourceCard from '../components/resources/ResourceCard';
import ResourceDetailDrawer from '../components/resources/ResourceDetailDrawer';
import { fetchVerifiedResources } from '../services/api';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeResource, setActiveResource] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [directory, setDirectory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback initial list in case network is completely offline
  const fallbackDirectory = [
    {
      id: 'education-nsp',
      category: 'education',
      title: 'National Scholarship Portal (NSP)',
      name: 'National Scholarship Portal (NSP)',
      organization: 'Ministry of Electronics and Information Technology (MeitY)',
      description: 'Centralized single-window platform for national scholarship applications, defective form rectification, institute verification tracking, and Direct Benefit Transfer (DBT) disbursement.',
      purpose: 'Scholarship application, defect correction, tracking student verification status and stipend release.',
      url: 'https://scholarships.gov.in',
      phone: '0120-6619540',
      helpline: '0120-6619540',
      availability: 'Working Days (10:00 AM - 5:30 PM)',
      region: 'India',
      source_type: 'government_portal',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'financial-cybercrime-1930',
      category: 'financial_safety',
      title: 'National Cyber Crime Reporting Portal (1930 Helpline)',
      name: 'National Cyber Crime Reporting Portal & 1930 Helpline',
      organization: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
      description: 'National emergency platform to report financial cyber fraud, freeze stolen funds in bank accounts during the Golden Hour, and register formal Cyber Crime FIRs.',
      purpose: 'Emergency financial fraud reporting, stopping illicit bank transfers, reporting OTP/phishing scams.',
      url: 'https://cybercrime.gov.in',
      phone: '1930',
      helpline: '1930',
      availability: '24x7 Toll-Free Emergency Support',
      region: 'India',
      source_type: 'statutory_helpline',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'documents-digilocker',
      category: 'documents',
      title: 'DigiLocker India',
      name: 'DigiLocker National Document Wallet',
      organization: 'Digital India Corporation, MeitY',
      description: 'Government digital cloud repository under Rule 9A of the Information Technology Rules 2016 for fetching and verifying legally valid digital marksheets, degrees, caste certificates, and driving licenses.',
      purpose: 'Instant recovery and official verification of lost educational certificates and government IDs.',
      url: 'https://www.digilocker.gov.in',
      phone: null,
      helpline: 'Online Helpdesk via App/Portal',
      availability: '24x7 Online Access',
      region: 'India',
      source_type: 'government_portal',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'career-ncs',
      category: 'career',
      title: 'National Career Service (NCS)',
      name: 'National Career Service (NCS)',
      organization: 'Ministry of Labour & Employment',
      description: 'Apex national portal providing verified public & private job listings, model career counseling centers, skill development roadmaps, and central apprenticeship listings.',
      purpose: 'Verified employment matching, career counseling, vocational training, and apprenticeship registrations.',
      url: 'https://www.ncs.gov.in',
      phone: '1800-425-1514',
      helpline: '1800-425-1514',
      availability: 'Mon-Sat (08:00 AM - 08:00 PM)',
      region: 'India',
      source_type: 'government_portal',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'civic-cpgrams',
      category: 'civic',
      title: 'CPGRAMS Central Grievance Portal',
      name: 'CPGRAMS Central Public Grievance Redressal System',
      organization: 'Department of Administrative Reforms and Public Grievances (DARPG)',
      description: 'Single national online portal allowing citizens to submit binding public grievances against any central or state ministry, public utility, or department with strict SLA tracking.',
      purpose: 'Escalating unresolved citizen complaints, municipal failures, administrative delays, and utility grievances.',
      url: 'https://pgportal.gov.in',
      phone: '1800-11-2000',
      helpline: '1800-11-2000',
      availability: '24x7 Online Grievance Submission',
      region: 'India',
      source_type: 'government_portal',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'financial-rbi-cms',
      category: 'financial_safety',
      title: 'RBI Complaint Management System (CMS)',
      name: 'Reserve Bank of India - Complaint Management System (CMS)',
      organization: 'Reserve Bank of India (RBI)',
      description: 'Statutory portal to lodge complaints with the Banking Ombudsman if your bank or financial service provider fails to resolve a fraud dispute, unauthorized transaction, or unfair fee within 30 days.',
      purpose: 'Independent banking ombudsman escalation for unauthorized debit disputes and non-responsive bank branches.',
      url: 'https://cms.rbi.org.in',
      phone: '14448',
      helpline: '14448',
      availability: 'Mon-Fri (09:30 AM - 05:15 PM)',
      region: 'India',
      source_type: 'government_portal',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'urgent-erss-112',
      category: 'urgent',
      title: 'National Emergency Response Support System (ERSS - 112)',
      name: 'Emergency Response Support System (ERSS - 112)',
      organization: 'Ministry of Home Affairs',
      description: 'Unified single 24x7 emergency helpline for Police assistance, Ambulance medical rescue, Fire & Rescue services, and Women safety across all Indian states and Union Territories.',
      purpose: 'Immediate life-safety dispatch, accidents, physical threats, and medical crisis intervention.',
      url: 'https://112.gov.in',
      phone: '112',
      helpline: '112',
      availability: '24x7 All-India Emergency Dispatch',
      region: 'India',
      source_type: 'statutory_helpline',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'urgent-telemanas-14416',
      category: 'urgent',
      title: 'Tele-MANAS Mental Health Support Helpline',
      name: 'Tele-MANAS National Mental Health Assistance',
      organization: 'Ministry of Health and Family Welfare (MoHFW)',
      description: 'Free, confidential, 24/7 tele-mental health counseling and crisis support delivered by trained clinical psychologists across 20+ regional Indian languages.',
      purpose: 'Immediate emotional distress support, crisis counseling, and psychological intervention.',
      url: 'https://telemanas.mohfw.gov.in',
      phone: '14416 / 1800-891-4416',
      helpline: '14416 / 1800-891-4416',
      availability: '24x7 Free & Confidential Tele-Counseling',
      region: 'India',
      source_type: 'statutory_helpline',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'documents-uidai',
      category: 'documents',
      title: 'UIDAI Self Service Portal (m-Aadhaar)',
      name: 'Unique Identification Authority of India (UIDAI)',
      organization: 'Unique Identification Authority of India',
      description: 'Official self-service portal to download lost e-Aadhaar, lock biometric credentials against fraud, update demographic addresses, and verify identity card validity.',
      purpose: 'Downloading digital e-Aadhaar copy, re-ordering PVC cards, and securing biometric authentication.',
      url: 'https://myaadhaar.uidai.gov.in',
      phone: '1947',
      helpline: '1947',
      availability: '24x7 IVR / Mon-Sat 7 AM - 11 PM',
      region: 'India',
      source_type: 'government_portal',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    },
    {
      id: 'civic-nalsa-legal-aid',
      category: 'civic',
      title: 'NALSA Free Legal Aid Portal',
      name: 'National Legal Services Authority (NALSA)',
      organization: 'National Legal Services Authority, Supreme Court of India',
      description: 'Apex statutory body providing free and competent legal services to eligible citizens, women, marginalized groups, and undertrial prisoners throughout India.',
      purpose: 'Free legal representation, legal advice clinics, and dispute mediation before Lok Adalats.',
      url: 'https://nalsa.gov.in',
      phone: '15100',
      helpline: '15100',
      availability: '24x7 Free Legal Aid Helpline',
      region: 'India',
      source_type: 'government_portal',
      trust_level: 'OFFICIAL',
      official: true,
      verified: true
    }
  ];

  useEffect(() => {
    async function loadResources() {
      setLoading(true);
      try {
        const fetched = await fetchVerifiedResources('all');
        if (Array.isArray(fetched) && fetched.length > 0) {
          setDirectory(fetched);
        } else {
          setDirectory(fallbackDirectory);
        }
      } catch (e) {
        setDirectory(fallbackDirectory);
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, []);

  const handleOpenDetail = (res) => {
    setActiveResource(res);
    setDrawerOpen(true);
  };

  const filtered = directory.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      (item.title || '').toLowerCase().includes(q) ||
      (item.name || '').toLowerCase().includes(q) ||
      (item.description || '').toLowerCase().includes(q) ||
      (item.organization || '').toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl pb-6 border-b border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Strict Zero-Hallucination Policy</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Verified Official Resources Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          LifeBridge links exclusively to verified government departments, statutory helplines, and apex institutional redressal portals across India.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified portals, helplines, or ministries..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs">
          {[
            { key: 'all', label: 'All Resources' },
            { key: 'education', label: '🎓 Education' },
            { key: 'financial_safety', label: '💰 Financial Safety' },
            { key: 'documents', label: '📄 Documents' },
            { key: 'career', label: '💼 Career' },
            { key: 'civic', label: '🏛️ Civic' },
            { key: 'urgent', label: '🚨 Urgent' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedCategory === tab.key
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((res) => (
            <ResourceCard
              key={res.id}
              resource={res}
              onOpenDetail={handleOpenDetail}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-10 rounded-3xl border border-slate-800 text-center space-y-3 max-w-lg mx-auto">
          <Info className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Matching Resources</h3>
          <p className="text-xs text-slate-400">
            No official resources match your search criteria. Try clearing your search query.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="text-xs text-brand-400 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* TRUST EXPLANATION BANNER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-500/20 bg-slate-900/60 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Compass className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            How LifeBridge Trust Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="font-bold text-white block">1. Navigation, Not Authority</span>
            <p className="text-slate-400">
              LifeBridge helps you organize your situation, prioritize procedural steps, and assemble evidence. It does not replace official statutory offices.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="font-bold text-white block">2. Official Decisions Rest With Authorities</span>
            <p className="text-slate-400">
              Official application approvals, grievance redressals, and financial freeze orders come exclusively from the respective ministry or nodal ombudsman.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1">
            <span className="font-bold text-white block">3. Always Confirm Important Details</span>
            <p className="text-slate-400">
              Before submitting formal petitions or making financial transfers, verify specific deadlines and eligibility criteria directly on the official portal.
            </p>
          </div>
        </div>
      </div>

      {/* Resource Detail Drawer */}
      <ResourceDetailDrawer
        resource={activeResource}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
