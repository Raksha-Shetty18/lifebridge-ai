import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Heart, AlertTriangle, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-20 text-slate-400 text-sm">
      {/* Disclaimer Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 mb-10">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-200 mb-0.5">
              Important Safety & Authority Disclaimer
            </p>
            <p className="text-slate-400 leading-relaxed">
              LifeBridge AI is an informational action-navigation assistant designed to structure practical problems into roadmaps. LifeBridge is <strong className="text-slate-200">NOT</strong> a legal authority, medical provider, financial fiduciary, or government agency. Always confirm information with official institutional and governmental portals.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="font-extrabold text-base text-white">
                LifeBridge<span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transforming overwhelming real-life situations into structured, personalized action plans with verified pathways.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>National Hackathon Project</span>
              <span>•</span>
              <span className="text-brand-400 font-mono">v1.0.0</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Action Domains
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/#categories" className="hover:text-white transition-colors">🎓 Education & Scholarships</Link></li>
              <li><Link to="/#categories" className="hover:text-white transition-colors">💼 Career & Internship Roadmap</Link></li>
              <li><Link to="/#categories" className="hover:text-white transition-colors">🏛️ Civic Grievances (CPGRAMS)</Link></li>
              <li><Link to="/#categories" className="hover:text-white transition-colors">💰 Financial Scam Defense (1930)</Link></li>
              <li><Link to="/#categories" className="hover:text-white transition-colors">📄 Lost Documents & DigiLocker</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Navigator Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Problem Input Center</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Saved Cases & Checklists</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Verified Official Portals</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Non-Chatbot Paradigm</Link></li>
            </ul>
          </div>

          {/* Emergency Helpline Directory */}
          <div>
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-3">
              Emergency Hotlines
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between">
                <span>National Emergency:</span>
                <span className="font-mono font-bold text-red-400">112</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Cyber Financial Fraud:</span>
                <span className="font-mono font-bold text-amber-400">1930</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tele-MANAS Mental Health:</span>
                <span className="font-mono font-bold text-blue-400">14416</span>
              </li>
              <li className="flex items-center justify-between">
                <span>National Consumer Helpline:</span>
                <span className="font-mono font-bold text-emerald-400">1915</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LifeBridge AI. Built for real people facing real problems.</p>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-semibold text-slate-300">Structured AI Reasoning</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
