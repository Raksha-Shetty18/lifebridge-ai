import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getSavedCases, 
  deleteCase, 
  getDashboardStats, 
  getMostRecentActiveCase 
} from '../services/storage';
import CaseCard from '../components/cases/CaseCard';
import { 
  Bookmark, 
  Sparkles, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Hourglass, 
  Layers,
  ArrowRight,
  ListTodo,
  TrendingUp,
  Zap,
  Calendar,
  Compass,
  Plus
} from 'lucide-react';
import { CategoryBadge, UrgencyBadge, StatusBadge } from '../components/common/Badges';
import { DEMO_SCENARIOS } from '../services/demoData';

export default function DashboardPage() {
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    activeCount: 0,
    completedCount: 0,
    tasksRemaining: 0,
    overallProgress: 0
  });
  const [recentCase, setRecentCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = () => {
    const list = getSavedCases();
    setCases(list);
    setStats(getDashboardStats());
    setRecentCase(getMostRecentActiveCase());
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this case roadmap?')) {
      deleteCase(id);
      loadDashboard();
    }
  };

  // Personalized Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Filtered List
  const filteredCases = cases.filter((c) => {
    const matchesSearch = 
      (c.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.problem_summary || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === 'active') {
      matchesStatus = c.status === 'active' || c.status === 'in_progress';
    } else if (statusFilter === 'completed') {
      matchesStatus = c.status === 'completed' || c.status === 'resolved';
    } else if (statusFilter === 'waiting') {
      matchesStatus = c.status === 'waiting';
    }

    const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categoriesList = [
    { key: 'all', label: 'All Domains' },
    { key: 'education', label: 'Education' },
    { key: 'career', label: 'Career' },
    { key: 'financial_safety', label: 'Financial Safety' },
    { key: 'civic', label: 'Civic' },
    { key: 'documents', label: 'Documents' },
    { key: 'urgent', label: 'Urgent' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header with Greeting & New Case CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {getGreeting()}, Navigator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              {stats.total} {stats.total === 1 ? 'CASE' : 'CASES'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Your LifeBridge Command Center — track active problem roadmaps, checklist tasks, and resolutions.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white text-xs sm:text-sm font-semibold shadow-glow-indigo transition-all transform hover:-translate-y-0.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-cyan-200" />
          <span>New Case</span>
        </Link>
      </div>

      {/* Dynamic Calculated Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Active Cases</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-white font-mono">{stats.activeCount}</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Completed Cases</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{stats.completedCount}</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Tasks Remaining</span>
            <ListTodo className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{stats.tasksRemaining}</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Overall Progress</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">{stats.overallProgress}%</p>
        </div>
      </div>

      {/* "CONTINUE WHERE YOU LEFT OFF" Spotlight Card */}
      {recentCase && (
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-brand-500/30 bg-gradient-to-r from-brand-950/40 via-slate-900 to-slate-950 relative overflow-hidden space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-brand-500/20 text-brand-300 text-[10px] font-mono font-bold tracking-wider uppercase border border-brand-500/40 flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-brand-300 animate-spin" />
                Continue Where You Left Off
              </span>
              <CategoryBadge category={recentCase.category} />
              <UrgencyBadge urgency={recentCase.urgency} />
            </div>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Last updated: {new Date(recentCase.updated_at).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {recentCase.title}
              </h2>
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="text-slate-400">Current Next Action: </span>
                  <span className="text-white font-semibold">
                    {recentCase.immediate_action?.title || 'Review roadmap steps'}
                  </span>
                  {recentCase.immediate_action?.why && (
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {recentCase.immediate_action.why}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Roadmap Progress</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {recentCase.progress || 0}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full"
                  style={{ width: `${recentCase.progress || 0}%` }}
                />
              </div>
              <div className="text-right">
                <Link
                  to={`/cases/${recentCase.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-indigo transition-all w-full justify-center"
                >
                  <span>Continue Case</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cases by problem title, summary, or category..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500/50"
            />
          </div>

          {/* Status Tab Filter */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs">
            {[
              { key: 'all', label: `All (${cases.length})` },
              { key: 'active', label: `Active (${stats.activeCount})` },
              { key: 'waiting', label: 'Waiting' },
              { key: 'completed', label: `Completed (${stats.completedCount})` }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  statusFilter === tab.key
                    ? 'bg-brand-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categoriesList.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategoryFilter(cat.key)}
              className={`px-3 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all border ${
                categoryFilter === cat.key
                  ? 'bg-slate-800 text-brand-300 border-brand-500/40 shadow'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid or Empty States */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((c) => (
            <CaseCard key={c.id} caseItem={c} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-10 rounded-3xl border border-slate-800 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>

          {statusFilter === 'completed' ? (
            <>
              <h3 className="text-lg font-bold text-white">No Completed Cases Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Keep moving forward — complete all required checklist items in an active case and it will be archived here.
              </p>
            </>
          ) : cases.length === 0 ? (
            <>
              <h3 className="text-xl font-bold text-white">Your next step starts here.</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Describe a situation and LifeBridge will help you find the next step.
              </p>
              <div className="pt-2">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow-indigo transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Start a case</span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-white">No Matching Cases Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                No cases match your selected filter or search term. Try resetting your filters.
              </p>
              <button
                onClick={() => { setSearchTerm(''); setStatusFilter('all'); setCategoryFilter('all'); }}
                className="text-xs text-brand-400 hover:underline font-semibold"
              >
                Clear all filters
              </button>
            </>
          )}

          {/* Quick Demo Starters */}
          {cases.length === 0 && (
            <div className="pt-4 border-t border-slate-800 text-left">
              <span className="text-[11px] uppercase font-semibold text-slate-500 block mb-3">
                Or Start With a Common Scenario:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DEMO_SCENARIOS.slice(0, 4).map((s) => (
                  <Link
                    key={s.id}
                    to="/analyze"
                    state={{ problem: s.prompt, category: s.category }}
                    className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs transition-colors group flex items-center justify-between"
                  >
                    <span className="text-slate-200 font-semibold group-hover:text-brand-300">
                      {s.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-400" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
