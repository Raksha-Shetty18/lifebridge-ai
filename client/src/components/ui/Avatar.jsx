import React from 'react';
import { User } from 'lucide-react';

export default function Avatar({ name = 'Citizen User', size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base'
  };

  const initials = name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div 
      className={`rounded-full bg-gradient-to-tr from-brand-700 to-accent-cyan p-0.5 shadow-md flex items-center justify-center shrink-0 ${className}`}
      title={name}
    >
      <div className={`w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-brand-300 ${sizes[size] || sizes.md}`}>
        {initials || <User className="w-4 h-4 text-slate-400" />}
      </div>
    </div>
  );
}
