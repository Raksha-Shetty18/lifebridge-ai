import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import CaseDetailPage from './pages/CaseDetailPage';
import DashboardPage from './pages/DashboardPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  const handleGlobalStartCase = () => {
    const el = document.getElementById('problem-input-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const textarea = el.querySelector('textarea');
      if (textarea) textarea.focus();
    } else {
      window.location.href = '/#problem-input-section';
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white font-sans antialiased">
        <Navbar onStartCaseClick={handleGlobalStartCase} />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/cases/:id" element={<CaseDetailPage />} />
            <Route path="/case/:id" element={<CaseDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
