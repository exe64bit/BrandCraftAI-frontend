import React from 'react';
import { Tag } from 'lucide-react';

export const BrandPreview = ({ project }) => {
  if (!project) return null;

  const brandName = project.naming?.selectedName || (project.naming?.options?.find((o) => o.selected)?.name) || project.projectName;
  const category = project.positioning?.category;
  const colors = project.visualDirection?.colors;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 font-bold shrink-0">
          {brandName.charAt(0)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">{brandName}</span>
            {project.isDemo && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                DEMO PROJECT
              </span>
            )}
          </div>
          {category ? (
            <p className="text-slate-500 line-clamp-1">{category}</p>
          ) : (
            <p className="text-slate-400 italic">Positioning pending...</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {colors?.primary && (
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Palette:</span>
            <div className="flex -space-x-1">
              {[colors.primary, colors.secondary, colors.accent].filter(Boolean).map((hex, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span>Stage: <strong className="text-slate-800 capitalize">{project.currentStage?.replace('-', ' ')}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default BrandPreview;
