import React from 'react';
import { CheckCircle2, Circle, Sparkles } from 'lucide-react';

const territoryColors = {
  descriptive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  metaphorical: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  abstract: 'bg-purple-50 text-purple-700 border-purple-200',
  'action-oriented': 'bg-amber-50 text-amber-700 border-amber-200',
  'community-oriented': 'bg-sky-50 text-sky-700 border-sky-200',
};

export const NameCard = ({ option, isSelected, onSelect }) => {
  const territoryStyle = territoryColors[option.territory] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-xl p-5 border transition-all duration-200 ${
        isSelected
          ? 'bg-brand-50/40 border-brand-500 shadow-md ring-1 ring-brand-500'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {option.isNewlyAdded && (
        <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-emerald-600 text-white rounded-full shadow-sm">
          <Sparkles className="w-2.5 h-2.5" /> Fresh Generation
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">{option.name}</h3>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border capitalize ${territoryStyle}`}>
              {option.territory}
            </span>
          </div>
        </div>

        <div className="shrink-0 text-brand-600 mt-0.5">
          {isSelected ? (
            <CheckCircle2 className="w-6 h-6 fill-brand-600 text-white" />
          ) : (
            <Circle className="w-6 h-6 text-slate-300 hover:text-slate-400" />
          )}
        </div>
      </div>

      <div className="mt-3.5 space-y-2 text-xs leading-relaxed">
        <div>
          <span className="font-semibold text-slate-700">Linguistic Rationale: </span>
          <span className="text-slate-600">{option.rationale}</span>
        </div>
        <div>
          <span className="font-semibold text-slate-700">Positioning Resonance: </span>
          <span className="text-slate-600">{option.positioning}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">
          {isSelected ? '✓ Primary Chosen Name' : 'Click to select this brand name'}
        </span>
        {isSelected && (
          <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
            Active Identity
          </span>
        )}
      </div>
    </div>
  );
};

export default NameCard;
