import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Compass,
  Target,
  Sparkles,
  FileText,
  AlertTriangle,
  Palette,
  CheckCircle2,
  Rocket,
  BookOpen,
  ArrowLeft,
  CircleDot,
  Check,
} from 'lucide-react';
import { ProgressBar } from './ProgressBar';

const stageConfig = [
  { key: 'discovery', label: '1. Discovery', path: 'discovery', icon: Compass },
  { key: 'positioning', label: '2. Positioning', path: 'positioning', icon: Target },
  { key: 'personality', label: '3. Personality', path: 'personality', icon: Sparkles },
  { key: 'naming', label: '4. Naming', path: 'naming', icon: FileText },
  { key: 'critique', label: '5. Critique', path: 'critique', icon: AlertTriangle },
  { key: 'visual', label: '6. Visual Direction', path: 'visual', icon: Palette },
  { key: 'consistency', label: '7. Consistency Check', path: 'consistency', icon: CheckCircle2 },
  { key: 'launch', label: '8. Launch Kit', path: 'launch', icon: Rocket },
  { key: 'brand-kit', label: '9. Final Brand Kit', path: 'brand-kit', icon: BookOpen },
];

export const Sidebar = ({ project }) => {
  const { id } = useParams();
  const projectId = id || project?._id;

  const progress = project?.progress || {
    completedStagesCount: 1,
    totalStages: 10,
    percentage: 10,
    completedMap: {},
  };

  const currentStage = project?.currentStage || 'discovery';

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4">
      <div>
        {/* Back to dashboard */}
        <NavLink
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Brand Projects</span>
        </NavLink>

        {/* Project Header Info */}
        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 mb-5">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h2 className="font-bold text-slate-900 text-sm truncate" title={project?.projectName}>
              {project?.projectName || 'Brand Project'}
            </h2>
            {project?.isDemo && (
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-amber-100 text-amber-800 rounded">
                Demo
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {project?.originalIdea || 'Brand creation workflow'}
          </p>

          <ProgressBar
            current={progress.completedStagesCount}
            total={progress.totalStages}
            percentage={progress.percentage}
          />
        </div>

        {/* Staged Checklist */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
            Staged Workflow
          </p>

          {stageConfig.map((stage) => {
            const isCompleted = Boolean(progress.completedMap?.[stage.key]);
            const isCurrent = currentStage === stage.key;
            const Icon = stage.icon;

            return (
              <NavLink
                key={stage.key}
                to={`/projects/${projectId}/${stage.path}`}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isCompleted ? 'text-emerald-500' : isCurrent ? 'text-brand-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{stage.label}</span>
                </div>

                <div className="shrink-0">
                  {isCompleted ? (
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  ) : isCurrent ? (
                    <CircleDot className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-200" />
                  )}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 mt-6 border-t border-slate-100 text-[11px] text-slate-400 text-center">
        Powered by <strong className="text-slate-600 font-semibold">Gemini AI</strong> &amp; <strong className="text-slate-600 font-semibold">Pollinations</strong>
      </div>
    </aside>
  );
};

export default Sidebar;
