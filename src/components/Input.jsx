import React from 'react';

export const Input = ({
  label,
  error,
  helper,
  className = '',
  id,
  type = 'text',
  as = 'input',
  rows = 4,
  ...props
}) => {
  const inputId = id || props.name || Math.random().toString(36).substring(2, 9);
  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <Component
        id={inputId}
        type={as === 'textarea' ? undefined : type}
        rows={as === 'textarea' ? rows : undefined}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500 ${
          error ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-300'
        }`}
        {...props}
      />
      {helper && !error && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
      {error && <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
