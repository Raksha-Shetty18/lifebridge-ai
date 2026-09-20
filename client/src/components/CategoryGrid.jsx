import React from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  ShieldAlert, 
  FileText, 
  Flame 
} from 'lucide-react';
import CategoryCard from './CategoryCard';

const CATEGORIES = [
  {
    id: 'education',
    icon: GraduationCap,
    badge: 'ACADEMIC',
    title: '🎓 Education',
    description: 'Scholarships, admissions, exams, and academic issues.'
  },
  {
    id: 'career',
    icon: Briefcase,
    badge: 'EMPLOYMENT',
    title: '💼 Career',
    description: 'Jobs, internships, resumes, and skill gaps.'
  },
  {
    id: 'civic',
    icon: Landmark,
    badge: 'GOVERNMENT',
    title: '🏛️ Civic Services',
    description: 'Government services and civic problems.'
  },
  {
    id: 'financial_safety',
    icon: ShieldAlert,
    badge: 'SECURITY',
    title: '💰 Financial Safety',
    description: 'Suspicious messages, scams, and financial concerns.'
  },
  {
    id: 'documents',
    icon: FileText,
    badge: 'VERIFICATION',
    title: '📄 Documents',
    description: 'Lost, expired, or incorrect documents.'
  },
  {
    id: 'urgent',
    icon: Flame,
    badge: 'CRISIS',
    title: '🚨 Urgent Help',
    description: 'Immediate safety-oriented guidance and emergency hotline handoffs.'
  }
];

export default function CategoryGrid({ selectedCategory, onSelectCategory }) {
  const handleCategorySelect = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const el = document.getElementById('problem-input-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const textarea = el.querySelector('textarea');
      if (textarea) textarea.focus();
    }
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
          Domain Specializations
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight mt-3">
          Explore by Life Category
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Select a domain below to focus your action navigation plan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.id}
            icon={cat.icon}
            badge={cat.badge}
            title={cat.title}
            description={cat.description}
            isSelected={selectedCategory === cat.id}
            onClick={() => handleCategorySelect(cat.id)}
          />
        ))}
      </div>
    </section>
  );
}
