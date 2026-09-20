import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  ShieldAlert, 
  FileText, 
  Flame, 
  ArrowRight 
} from 'lucide-react';
import { CATEGORIES_CONFIG } from '../../services/demoData';

const iconMap = {
  GraduationCap,
  Briefcase,
  Landmark,
  ShieldAlert,
  FileText,
  Flame
};

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleCategoryExampleClick = (catId, exampleText) => {
    navigate('/analyze', {
      state: {
        problem: exampleText,
        category: catId
      }
    });
  };

  return (
    <section id="categories" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Explore by Life Category
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-400">
          Click a common real-world problem below to instantly generate an action roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES_CONFIG.map((cat) => {
          const Icon = iconMap[cat.icon] || GraduationCap;
          return (
            <div 
              key={cat.id}
              className={`glass-panel p-6 rounded-3xl border border-slate-800 hover:${cat.borderColor} transition-all duration-300 flex flex-col justify-between group hover:shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} p-0.5 shadow-md flex items-center justify-center`}>
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
                    Verified Workflows
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  {cat.title}
                </h3>
                
                <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                {/* Example Quick-Pick Chips */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                    Common Situations:
                  </span>
                  {cat.examples.map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCategoryExampleClick(cat.id, ex)}
                      className="w-full text-left px-3 py-1.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 hover:border-brand-500/40 text-slate-300 hover:text-white text-xs transition-colors flex items-center justify-between group/item"
                    >
                      <span className="truncate pr-2">"{ex}"</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 text-brand-400 shrink-0 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
