import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  Plus, 
  Sparkles, 
  Filter,
  ListTodo
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveChecklist({ checklist = [], onChecklistChange }) {
  const [items, setItems] = useState(checklist);
  const [filter, setFilter] = useState('all');
  const [newItemText, setNewItemText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setItems(checklist);
  }, [checklist]);

  const toggleItem = (id) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setItems(updated);
    if (onChecklistChange) {
      onChecklistChange(updated);
    }

    // Check if 100% completed
    const completedCount = updated.filter(i => i.completed).length;
    if (completedCount === updated.length && updated.length > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: `custom_${Date.now()}`,
      title: newItemText.trim(),
      category: 'custom',
      completed: false
    };

    const updated = [...items, newItem];
    setItems(updated);
    setNewItemText('');
    setIsAdding(false);
    if (onChecklistChange) {
      onChecklistChange(updated);
    }
  };

  const completedCount = items.filter(i => i.completed).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(i => filter === 'completed' ? i.completed : !i.completed);

  return (
    <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-slate-800">
      {/* Header & Progress Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Interactive Action Checklist</h3>
            <p className="text-xs text-slate-400">Tick off tasks as you execute each procedural milestone.</p>
          </div>
        </div>

        <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
          <div className="text-sm font-bold text-slate-200">
            <span className="text-emerald-400 font-mono text-base">{completedCount}</span> / {totalCount} completed
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {progressPercent}% resolution progress
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden mb-6 border border-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-brand-500 via-accent-cyan to-emerald-400 transition-all duration-300 rounded-full shadow-glow-emerald"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'pending' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending ({totalCount - completedCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filter === 'completed' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Done ({completedCount})
          </button>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Add Custom Task Form */}
      {isAdding && (
        <form onSubmit={handleAddItem} className="mb-4 flex gap-2">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Add personal step, e.g., 'Call College Office on Monday at 10 AM'..."
            className="flex-1 bg-slate-900 border border-brand-500/50 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold"
          >
            Add
          </button>
        </form>
      )}

      {/* Checklist Items List */}
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 flex items-start gap-3 select-none ${
              item.completed
                ? 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-200'
            }`}
          >
            <div className="pt-0.5 shrink-0">
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Square className="w-5 h-5 text-slate-500 hover:text-brand-400 transition-colors" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <span className={`text-xs sm:text-sm font-medium leading-relaxed block ${
                item.completed ? 'line-through text-slate-500' : 'text-slate-200'
              }`}>
                {item.title}
              </span>
              {item.category && item.category !== 'general' && (
                <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                  {item.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
