import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  Layers, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  Bookmark, 
  Menu, 
  X,
  Activity
} from 'lucide-react';
import { getSavedCases } from '../../services/storage';

export default function Navbar() {
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
    const interval = setInterval(updateCount, 2000);
    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: Compass },
    { to: '/dashboard', label: 'My Cases', icon: Bookmark, badge: savedCount > 0 ? savedCount : null },
    { to: '/resources', label: 'Verified Resources', icon: ShieldCheck },
    { to: '/about', label: 'How It Works', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-cyan p-0.5 shadow-glow-indigo transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-accent-cyan animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-brand-300 transition-colors">
                  LifeBridge<span className="text-brand-400">AI</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                  NAVIGATOR
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Action Roadmap Engine</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-slate-800/90 text-brand-300 shadow-inner border border-slate-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-brand-400' : 'text-slate-400'}`} />
                  {link.label}
                  {link.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-brand-500/30 text-brand-300 border border-brand-500/40">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/#input-section"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-600 via-brand-500 to-accent-violet hover:from-brand-500 hover:to-accent-violet shadow-glow-indigo hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Navigate a Problem</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-300" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${
                  active
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-brand-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-brand-500/30 text-brand-300">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/#input-section"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-glow-indigo"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              <span>Navigate a Problem</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
