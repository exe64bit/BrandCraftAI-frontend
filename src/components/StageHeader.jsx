import React from 'react';
import { RotateCcw, ArrowRight, Edit3, Check, Sparkles } from 'lucide-react';
import { Button } from './Button';

export const StageHeader = ({
  stageNumber,
  title,
  description,
  isEditing = false,
  onToggleEdit,
  onRegenerate,
  onContinue,
  isRegenerating = false,
  isSaving = false,
  showRegenerate = true,
  showContinue = true,
  continueLabel = 'Continue',
  children,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {stageNumber && (
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200 rounded-full">
                Stage {stageNumber} of 10
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Sparkles className="w-3 h-3 text-brand-500" /> AI-Generated Strategy
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {description && <p className="text-sm text-slate-600 mt-1 max-w-2xl">{description}</p>}
        </div>

        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          {onToggleEdit && (
            <Button
              variant={isEditing ? 'primary' : 'outline'}
              size="sm"
              icon={isEditing ? Check : Edit3}
              onClick={onToggleEdit}
              isLoading={isSaving}
            >
              {isEditing ? 'Save Edits' : 'Edit Output'}
            </Button>
          )}

          {showRegenerate && onRegenerate && (
            <Button
              variant="secondary"
              size="sm"
              icon={RotateCcw}
              onClick={onRegenerate}
              isLoading={isRegenerating}
              title="Generate a fresh, distinct alternative"
            >
              Regenerate
            </Button>
          )}

          {showContinue && onContinue && (
            <Button
              variant="primary"
              size="sm"
              onClick={onContinue}
              className="bg-brand-600 hover:bg-brand-700"
            >
              <span>{continueLabel}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )}
        </div>
      </div>
      {children && <div className="mt-4 pt-4 border-t border-slate-100">{children}</div>}
    </div>
  );
};

export default StageHeader;
