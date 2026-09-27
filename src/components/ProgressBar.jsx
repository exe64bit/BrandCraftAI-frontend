import React from 'react';

export const ProgressBar = ({ current = 1, total = 10, percentage, className = '' }) => {
  const percent = percentage !== undefined ? percentage : Math.round((current / total) * 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
        <span>{current} / {total} stages completed</span>
        <span className="font-semibold text-brand-600">{percent}%</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className="bg-brand-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
