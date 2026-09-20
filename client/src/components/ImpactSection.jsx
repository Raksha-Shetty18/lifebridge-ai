import React from 'react';
import { GraduationCap, Briefcase, Landmark, Users } from 'lucide-react';
import UseCaseCard from './UseCaseCard';

const USE_CASES = [
  {
    role: 'Student',
    icon: GraduationCap,
    category: 'EDUCATION',
    categoryId: 'education',
    quote: 'My scholarship was rejected and I don’t know why.'
  },
  {
    role: 'Job seeker',
    icon: Briefcase,
    category: 'CAREER',
    categoryId: 'career',
    quote: 'I don’t know why I’m not getting interviews for software internships.'
  },
  {
    role: 'Citizen',
    icon: Landmark,
    category: 'CIVIC',
    categoryId: 'civic',
    quote: 'How do I report this municipal water supply issue and escalate to CPGRAMS?'
  },
  {
    role: 'Family',
    icon: Users,
    category: 'DOCUMENTS',
    categoryId: 'documents',
    quote: 'I lost an important educational certificate right before college counseling.'
  }
];

export default function ImpactSection({ onSelectUseCase }) {
  const handleUseCaseClick = (item) => {
    if (onSelectUseCase) {
      onSelectUseCase(item.quote, item.categoryId);
    }
    const el = document.getElementById('problem-input-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const textarea = el.querySelector('textarea');
      if (textarea) textarea.focus();
    }
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
          Real-Life Scenarios
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
          Built for real-life problems.
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Click any common scenario below to populate the Problem Navigator instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {USE_CASES.map((uc, idx) => (
          <UseCaseCard
            key={idx}
            role={uc.role}
            icon={uc.icon}
            category={uc.category}
            quote={uc.quote}
            onClick={() => handleUseCaseClick(uc)}
          />
        ))}
      </div>
    </section>
  );
}
