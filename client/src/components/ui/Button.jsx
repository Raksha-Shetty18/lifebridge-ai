import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none select-none";

  const variants = {
    primary: "bg-brand-600 hover:bg-brand-500 text-white shadow-glow-indigo hover:shadow-lg hover:-translate-y-0.5 focus:ring-brand-500",
    secondary: "bg-slate-850 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 focus:ring-slate-500",
    outline: "bg-transparent hover:bg-slate-850 text-brand-300 hover:text-white border border-brand-500/40 hover:border-brand-400 focus:ring-brand-500",
    ghost: "bg-transparent hover:bg-slate-850 text-slate-300 hover:text-white focus:ring-slate-500",
    success: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-emerald focus:ring-emerald-500",
    danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-glow-rose focus:ring-rose-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3.5 text-base gap-2.5"
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : children}
    </button>
  );
}
