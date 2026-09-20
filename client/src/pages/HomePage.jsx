import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProblemInput from '../components/ProblemInput';
import CategoryGrid from '../components/CategoryGrid';
import HowItWorks from '../components/HowItWorks';
import ActionGraphPreview from '../components/ActionGraphPreview';
import NextActionFeature from '../components/NextActionFeature';
import ImpactSection from '../components/ImpactSection';
import TrustSection from '../components/TrustSection';
import Toast from '../components/common/Toast';

export default function HomePage() {
  const navigate = useNavigate();
  const [problemText, setProblemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const problemInputRef = useRef(null);

  const handleStartCase = () => {
    const el = document.getElementById('problem-input-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const textarea = el.querySelector('textarea');
      if (textarea) textarea.focus();
    }
  };

  const handleHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
  };

  const handleUseCaseSelect = (quote, catId) => {
    setProblemText(quote);
    setSelectedCategory(catId);
    setToast({
      type: 'info',
      message: 'Example scenario loaded into Problem Navigator!'
    });
  };

  const handleProblemSubmit = ({ problem, category }) => {
    setIsLoading(true);
    // Temporary smooth transition to analyze page
    setTimeout(() => {
      navigate('/analyze', {
        state: {
          problem,
          category
        }
      });
    }, 450);
  };

  return (
    <main className="min-h-screen selection:bg-brand-500 selection:text-white">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* 1. Hero with Interactive Right-side Workflow Card */}
      <Hero 
        onStartClick={handleStartCase} 
        onHowItWorksClick={handleHowItWorks} 
      />

      {/* 2. Main Problem Input Section */}
      <ProblemInput
        value={problemText}
        onChange={(val) => setProblemText(val)}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        onSubmit={handleProblemSubmit}
        isLoading={isLoading}
      />

      {/* 3. Category Grid (6 Domains) */}
      <CategoryGrid
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* 4. How It Works (4 Connected Steps) */}
      <HowItWorks />

      {/* 5. Action Graph Preview ("From confusion to a clear path") */}
      <ActionGraphPreview />

      {/* 6. "What Should I Do Now?" Feature Spotlight */}
      <NextActionFeature />

      {/* 7. Impact Section (Student, Job Seeker, Citizen, Family) */}
      <ImpactSection onSelectUseCase={handleUseCaseSelect} />

      {/* 8. Trust & Safety Section */}
      <TrustSection />
    </main>
  );
}
