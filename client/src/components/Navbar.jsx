import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Bookmark, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  Menu, 
  X,
  PlusCircle
} from 'lucide-react';
import { getSavedCases } from '../services/storage';
import Avatar from './ui/Avatar';

export default function Navbar({ onStartCaseClick }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cases = getSavedCases();
      setSavedCount(cases.length);
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 2500);
    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'My Cases', badge: savedCount > 0 ? savedCount : null },
    { to: '/resources', label: 'Resources' },
    { to: '/about', label: 'How It Works' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname === path;
  };

  const handleStartCase = () => {
    if (onStartCaseClick) {
      onStartCaseClick();
    } else {
      const el = document.getElementById('problem-input-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        const textarea = el.querySelector('textarea');
        if (textarea) textarea.focus();
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-cyan p-0.5 shadow-glow-indigo transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-accent-cyan" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-300 transition-colors">
                  LifeBridge<span className="text-brand-400"> AI</span>
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wide uppercase text-slate-400 hidden sm:block">Action Navigator</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-slate-850 text-brand-300 border border-slate-700/60 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850/60'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side CTA & Profile */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={handleStartCase}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-glow-indigo transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-cyan-200" />
              <span>Start a Case</span>
            </button>

            <div className="pl-1">
              <Avatar name="Citizen User" size="md" />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-850 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  active
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                    : 'text-slate-300 hover:bg-slate-850'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-500/30 text-brand-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleStartCase();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-glow-indigo"
            >
              <PlusCircle className="w-4 h-4 text-cyan-200" />
              <span>Start a Case</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
